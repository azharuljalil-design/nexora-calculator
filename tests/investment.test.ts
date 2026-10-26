import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  calculateInvestment,
  type InvestmentInput,
  type InvestmentResult,
} from "../src/lib/investment";
const base: InvestmentInput = {
  mode: "end",
  startingAmount: 20000,
  contribution: 1000,
  targetAmount: 198290.4,
  months: 120,
  annualRate: 6,
  compoundsPerYear: 1,
  contributionFrequency: "monthly",
  timing: "end",
};
function reconciles(result: InvestmentResult) {
  let balance = result.initialCents;
  for (const row of result.monthly) {
    assert.equal(
      balance + row.contributionCents + row.growthCents,
      row.balanceCents,
    );
    assert.ok(Number.isSafeInteger(row.balanceCents));
    balance = row.balanceCents;
  }
  assert.equal(balance, result.endingCents);
  for (const rows of [result.monthly, result.annual]) {
    assert.equal(
      rows.reduce((sum, row) => sum + row.contributionCents, 0),
      result.contributionCents,
    );
    assert.equal(
      rows.reduce((sum, row) => sum + row.growthCents, 0),
      result.growthCents,
    );
  }
  assert.equal(
    result.initialCents + result.contributionCents + result.growthCents,
    result.endingCents,
  );
}

test("investment reference example and annual/monthly schedule match compound annuity formula", () => {
  const result = calculateInvestment(base);
  const r = Math.pow(1.06, 1 / 12) - 1;
  const expected =
    20000 * 1.06 ** 10 + (1000 * Math.expm1(120 * Math.log1p(r))) / r;
  assert.equal(result.endingCents, 19829040);
  assert.ok(Math.abs(result.endingCents / 100 - expected) < 0.005);
  assert.equal(result.contributionCents, 12000000);
  assert.equal(result.growthCents, 5829040);
  assert.equal(result.annual[0].balanceCents, 3352653);
  reconciles(result);
});

test("all five modes round-trip known projections with monthly and annual deposits", () => {
  for (const frequency of ["monthly", "annual"] as const)
    for (const timing of ["beginning", "end"] as const)
      for (const compoundsPerYear of [1, 2, 4, 12, 365])
        for (const annualRate of [-20, 0, 6]) {
          const input = {
            ...base,
            contributionFrequency: frequency,
            timing,
            compoundsPerYear,
            annualRate,
            months: 60,
          };
          const forward = calculateInvestment(input);
          // Preserve the precise target; reverse calculations must reproduce it to the nearest cent.
          const factor = Math.pow(
            1 + annualRate / 100 / compoundsPerYear,
            compoundsPerYear / 12,
          );
          let precise = input.startingAmount;
          for (let i = 0; i < input.months; i++) {
            const deposit =
              frequency === "monthly" ||
              (timing === "beginning" ? i % 12 === 0 : (i + 1) % 12 === 0)
                ? input.contribution
                : 0;
            precise =
              timing === "beginning"
                ? (precise + deposit) * factor
                : precise * factor + deposit;
          }
          for (const mode of ["contribution", "starting", "rate"] as const) {
            const result = calculateInvestment({
              ...input,
              mode,
              targetAmount: precise,
            });
            assert.equal(result.endingCents, forward.endingCents);
            if (mode === "contribution")
              assert.ok(
                Math.abs(result.input.contribution - input.contribution) <
                  0.00001,
              );
            if (mode === "starting")
              assert.ok(
                Math.abs(result.input.startingAmount - input.startingAmount) <
                  0.00001,
              );
            if (mode === "rate")
              assert.ok(
                Math.abs(result.input.annualRate - annualRate) < 0.000001,
              );
            reconciles(result);
          }
          const length = calculateInvestment({
            ...input,
            mode: "length",
            targetAmount: precise - 0.001,
          });
          assert.ok(length.input.months <= input.months);
          assert.ok(length.endingCents >= Math.round((precise - 0.001) * 100));
          reconciles(length);
          reconciles(forward);
        }
});

test("contribution timing and compounding frequency are independent", () => {
  const monthly = calculateInvestment(base);
  const beginning = calculateInvestment({ ...base, timing: "beginning" });
  assert.ok(beginning.endingCents > monthly.endingCents);
  assert.equal(beginning.contributionCents, monthly.contributionCents);
  const compoundMonthly = calculateInvestment({
    ...base,
    compoundsPerYear: 12,
  });
  assert.ok(compoundMonthly.endingCents > monthly.endingCents);
  assert.equal(compoundMonthly.contributionCents, monthly.contributionCents);
  const annual = calculateInvestment({
    ...base,
    contributionFrequency: "annual",
    months: 13,
  });
  assert.equal(annual.monthly[0].contributionCents, 0);
  assert.equal(annual.monthly[11].contributionCents, 100000);
  assert.equal(annual.monthly[12].contributionCents, 0);
  const annualBeginning = calculateInvestment({
    ...base,
    contributionFrequency: "annual",
    timing: "beginning",
    months: 13,
  });
  assert.equal(annualBeginning.monthly[0].contributionCents, 100000);
  assert.equal(annualBeginning.monthly[12].contributionCents, 100000);
});

test("zero returns, zero amounts and zero duration reconcile", () => {
  const result = calculateInvestment({ ...base, annualRate: 0 });
  assert.equal(result.endingCents, 14000000);
  assert.equal(result.growthCents, 0);
  const empty = calculateInvestment({
    ...base,
    startingAmount: 0,
    contribution: 0,
  });
  assert.equal(empty.endingCents, 0);
  const zeroDuration = calculateInvestment({ ...base, months: 0 });
  assert.equal(zeroDuration.endingCents, 2000000);
  assert.equal(zeroDuration.monthly.length, 0);
  assert.equal(zeroDuration.contributionCents, 0);
  for (const projection of [result, empty, zeroDuration])
    reconciles(projection);
});

test("negative return produces a genuine reconciled loss rather than zero growth", () => {
  const result = calculateInvestment({
    ...base,
    contribution: 0,
    annualRate: -50,
    months: 12,
  });
  assert.equal(result.endingCents, 1000000);
  assert.equal(result.growthCents, -1000000);
  assert.equal(result.effectiveAnnualRate, -50);
  reconciles(result);
});

test("length uses first monthly crossing including targets already met and negative-rate annual deposits", () => {
  const zero = calculateInvestment({
    ...base,
    mode: "length",
    targetAmount: 10000,
  });
  assert.equal(zero.input.months, 0);
  const noReturn = calculateInvestment({
    ...base,
    mode: "length",
    startingAmount: 0,
    contribution: 100,
    targetAmount: 250,
    annualRate: 0,
  });
  assert.equal(noReturn.input.months, 3);
  assert.equal(noReturn.endingCents, 30000);
  const annual = calculateInvestment({
    ...base,
    mode: "length",
    startingAmount: 0,
    contribution: 1000,
    contributionFrequency: "annual",
    annualRate: -10,
    targetAmount: 1500,
  });
  assert.equal(annual.input.months, 24);
  assert.equal(annual.endingCents, 190000);
});

test("unreachable or non-unique reverse calculations fail clearly", () => {
  for (const changes of [
    { mode: "length", annualRate: 0, contribution: 0, targetAmount: 20001 },
    {
      mode: "rate",
      startingAmount: 0,
      contribution: 0,
      targetAmount: 0,
      compoundsPerYear: 365,
      months: 1200,
    },
    { mode: "rate", months: 0, targetAmount: 20000 },
    {
      mode: "rate",
      months: 1,
      startingAmount: 0,
      contribution: 100,
      targetAmount: 100,
    },
    { mode: "rate", targetAmount: 0 },
    { mode: "contribution", months: 0 },
    { mode: "contribution", contributionFrequency: "annual", months: 1 },
    { mode: "starting", targetAmount: 0 },
    { mode: "contribution", targetAmount: 0 },
  ] as Partial<InvestmentInput>[])
    assert.throws(() => calculateInvestment({ ...base, ...changes }));
});

test("invalid and oversized inputs are rejected rather than returning misleading results", () => {
  for (const changes of [
    { startingAmount: -1 },
    { startingAmount: NaN },
    { contribution: Infinity },
    { contribution: -1 },
    { months: 0.5 },
    { months: -1 },
    { months: 1201 },
    { annualRate: -100 },
    { annualRate: Infinity },
    { compoundsPerYear: 0 },
    { contributionFrequency: "weekly" },
    { timing: "unknown" },
    { mode: "unknown" },
    { annualRate: 1000, compoundsPerYear: 365, months: 1200 },
    { mode: "rate", targetAmount: NaN },
  ] as Partial<InvestmentInput>[])
    assert.throws(() => calculateInvestment({ ...base, ...changes }));
});

test("fractional-cent solved deposits reconcile through cumulative rounding", () => {
  const result = calculateInvestment({
    ...base,
    mode: "contribution",
    startingAmount: 0,
    targetAmount: 100,
    annualRate: 0,
    months: 3,
  });
  assert.ok(Math.abs(result.input.contribution - 100 / 3) < 1e-10);
  assert.deepEqual(
    result.monthly.map((row) => row.contributionCents),
    [3333, 3334, 3333],
  );
  assert.equal(result.endingCents, 10000);
  reconciles(result);
});

test("all 1–1,200 month schedules reconcile across frequencies, timing and negative rates", () => {
  for (let months = 1; months <= 1200; months++) {
    const result = calculateInvestment({
      ...base,
      startingAmount: 123.45,
      contribution: 23.67,
      months,
      annualRate: months % 2 ? -12.5 : 4.25,
      compoundsPerYear: [1, 2, 4, 12, 365][months % 5],
      contributionFrequency: months % 3 ? "monthly" : "annual",
      timing: months % 2 ? "end" : "beginning",
    });
    reconciles(result);
    assert.equal(result.annual.length, Math.ceil(months / 12));
  }
});

test("length respects a cent-rounded reference target and rejects underflow rate ambiguity", () => {
  assert.equal(
    calculateInvestment({ ...base, mode: "length" }).input.months,
    120,
  );
  assert.throws(() =>
    calculateInvestment({
      ...base,
      mode: "rate",
      contribution: 0,
      targetAmount: 0,
      months: 1200,
    }),
  );
});
