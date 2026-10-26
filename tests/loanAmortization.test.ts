import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  calculateLoanAmortization,
  type LoanAmortizationInput,
} from "../src/lib/loanAmortization";

const base: LoanAmortizationInput = {
  principal: 200_000,
  years: 15,
  months: 0,
  annualRate: 6,
  extraMonthly: 0,
};

test("amortization matches the reference fixed-rate example within display rounding", () => {
  const result = calculateLoanAmortization(base);
  assert.equal(result.monthlyPaymentCents, 168771);
  assert.equal(result.totalPaymentCents, 30378846);
  assert.equal(result.totalInterestCents, 10378846);
  assert.equal(result.rows.length, 180);
  assert.equal(result.annual[0].interestCents, 1176923);
  assert.equal(result.annual[0].principalCents, 848333);
  assert.equal(result.annual[0].balanceCents, 19151667);
});

test("every supported term reconciles principal, interest, balances and annual groups exactly in cents", () => {
  for (let term = 1; term <= 600; term++) {
    for (const annualRate of [0, 0.000001, 6, 50]) {
      const input = {
        ...base,
        principal: 12345.67,
        years: Math.floor(term / 12),
        months: term % 12,
        annualRate,
        extraMonthly: term % 3 === 0 ? 125.59 : 0,
      };
      const result = calculateLoanAmortization(input);
      assert.ok(result.rows.length <= term);
      assert.equal(result.rows.at(-1)?.balanceCents, 0);
      assert.equal(
        result.rows.reduce((sum, row) => sum + row.principalCents, 0),
        1234567,
      );
      assert.equal(
        result.rows.reduce((sum, row) => sum + row.interestCents, 0),
        result.totalInterestCents,
      );
      assert.equal(
        result.rows.reduce((sum, row) => sum + row.paymentCents, 0),
        result.totalPaymentCents,
      );
      assert.equal(
        result.annual.reduce((sum, row) => sum + row.principalCents, 0),
        result.principalCents,
      );
      assert.equal(
        result.annual.reduce((sum, row) => sum + row.interestCents, 0),
        result.totalInterestCents,
      );
      assert.equal(
        result.annual.reduce((sum, row) => sum + row.paymentCents, 0),
        result.totalPaymentCents,
      );
      let balance = result.principalCents;
      for (const row of result.rows) {
        assert.equal(row.paymentCents, row.principalCents + row.interestCents);
        assert.equal(balance - row.principalCents, row.balanceCents);
        assert.ok(
          row.principalCents >= 0 &&
            row.interestCents >= 0 &&
            row.balanceCents >= 0,
        );
        balance = row.balanceCents;
      }
    }
  }
});

test("zero interest, fractional-cent regular payments and final adjustment", () => {
  const result = calculateLoanAmortization({
    ...base,
    principal: 100,
    years: 0,
    months: 3,
    annualRate: 0,
  });
  assert.equal(result.totalPaymentCents, 10000);
  assert.equal(result.totalInterestCents, 0);
  assert.equal(
    result.rows.reduce((sum, row) => sum + row.principalCents, 0),
    10000,
  );
  assert.ok(result.rows.every((row) => Math.abs(row.paymentCents - 3333) <= 1));
});

test("monthly extras shorten the term, reduce interest, and cap excessive final payments", () => {
  const ordinary = calculateLoanAmortization(base);
  const extra = calculateLoanAmortization({ ...base, extraMonthly: 200 });
  assert.ok(extra.rows.length < ordinary.rows.length);
  assert.ok(extra.totalInterestCents < ordinary.totalInterestCents);
  const paidOff = calculateLoanAmortization({ ...base, extraMonthly: 1e12 });
  assert.equal(paidOff.rows.length, 1);
  assert.equal(paidOff.totalPaymentCents, 20100000);
  const zero = calculateLoanAmortization({
    ...base,
    principal: 1200,
    annualRate: 0,
    years: 1,
    extraMonthly: 100,
  });
  assert.equal(zero.rows.length, 6);
  assert.ok(zero.rows.every((row) => row.paymentCents === 20000));
});

test("optional dates preserve anchors, leap years, and final payoff date", () => {
  assert.equal(calculateLoanAmortization(base).payoffDate, undefined);
  const result = calculateLoanAmortization({
    ...base,
    years: 0,
    months: 3,
    firstPaymentDate: "2028-01-31",
  });
  assert.deepEqual(
    result.rows.map((row) => row.date),
    ["2028-01-31", "2028-02-29", "2028-03-31"],
  );
  assert.equal(result.payoffDate, "2028-03-31");
  const year = calculateLoanAmortization({
    ...base,
    years: 1,
    months: 1,
    firstPaymentDate: "2026-11-15",
  });
  assert.equal(year.annual.length, 2);
  assert.equal(year.annual[0].balanceCents, year.rows[11].balanceCents);
});

test("invalid, missing, oversized and non-finite inputs are rejected", () => {
  const invalid = [
    { principal: 0 },
    { principal: 1e13 },
    { principal: NaN },
    { principal: 1.001 },
    { principal: 0.01001 },
    { years: -1 },
    { years: 0.5 },
    { years: 0, months: 0 },
    { years: 50, months: 1 },
    { months: 12 },
    { months: 1.5 },
    { annualRate: -1 },
    { annualRate: 51 },
    { annualRate: Infinity },
    { extraMonthly: -1 },
    { extraMonthly: 0.001 },
    { extraMonthly: Infinity },
    { firstPaymentDate: "2026-02-30" },
    { firstPaymentDate: "9950-01-01" },
    { principal: undefined },
  ];
  for (const changes of invalid)
    assert.throws(() =>
      calculateLoanAmortization({
        ...base,
        ...changes,
      } as unknown as LoanAmortizationInput),
    );
});

test("minimum and maximum supported money and term boundaries remain finite", () => {
  for (const principal of [0.01, 1e12]) {
    const result = calculateLoanAmortization({
      ...base,
      principal,
      years: 50,
      annualRate: 50,
    });
    assert.equal(result.rows.at(-1)?.balanceCents, 0);
    assert.ok(Number.isSafeInteger(result.totalPaymentCents));
    assert.equal(
      result.rows.reduce((sum, row) => sum + row.principalCents, 0),
      Math.round(principal * 100),
    );
  }
});

test("near-zero positive interest converges to the zero-interest payment", () => {
  const result = calculateLoanAmortization({
    ...base,
    principal: 12000,
    years: 1,
    annualRate: 1e-10,
  });
  assert.equal(result.monthlyPaymentCents, 100000);
  assert.equal(result.totalPaymentCents, 1200000);
  assert.equal(result.rows.length, 12);
});
