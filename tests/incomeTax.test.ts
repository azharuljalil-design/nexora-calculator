import { strict as assert } from "node:assert";
import { test } from "node:test";
import { calculateIncomeTax, REGIONS, type TaxRegion, type IncomePeriod } from "../src/lib/incomeTax";
const calc = (income: number, region: TaxRegion = "England", period: IncomePeriod = "annual") => calculateIncomeTax({ income, region, period, taxYear: "2026/27" });
test("zero income and allowance threshold have no deductions", () => {
  for (const region of REGIONS) for (const income of [0, 12570]) {
    const r = calc(income, region);
    assert.equal(r.incomeTax, 0); assert.equal(r.nationalInsurance, 0); assert.equal(r.net, income);
  }
});
test("£60,000 rest-UK worked example and equivalent input periods", () => {
  for (const region of ["England", "Wales", "Northern Ireland"] as const) {
    const r = calc(60000, region);
    assert.equal(r.incomeTax, 11432); assert.equal(r.nationalInsurance, 3210.6); assert.equal(r.net, 45357.4);
    assert.deepEqual(calc(5000, region, "monthly"), r);
    assert.deepEqual(calc(60000 / 52, region, "weekly"), r);
  }
});
test("Scotland applies all six bands and UK-wide NI", () => {
  assert.equal(calc(16537, "Scotland").incomeTax, 753.73);
  assert.equal(calc(29526, "Scotland").incomeTax, 3351.53);
  assert.equal(calc(43662, "Scotland").incomeTax, 6320.09);
  assert.equal(calc(75000, "Scotland").incomeTax, 19482.05);
  assert.equal(calc(60000, "Scotland").incomeTax, 13182.05);
  assert.equal(calc(60000, "Scotland").nationalInsurance, 3210.6);
  assert.equal(calc(150000, "Scotland").bands.at(-1)?.amount, 24860);
});
test("Personal Allowance tapers without shifting the additional-rate threshold", () => {
  assert.equal(calc(100000).allowance, 12570);
  assert.equal(calc(110000).allowance, 7570);
  assert.equal(calc(110000).incomeTax, 33432);
  assert.equal(calc(125140).allowance, 0);
  assert.equal(calc(125140).incomeTax, 42516);
  assert.equal(calc(150000).incomeTax, 53703);
  assert.equal(calc(125140, "Scotland").bands.at(-1)?.amount, 0);
  assert.equal(calc(125141, "Scotland").bands.at(-1)?.amount, 1);
});
test("NI thresholds and tax boundaries stay continuous to pennies", () => {
  assert.equal(calc(50270).nationalInsurance, 3016);
  assert.equal(calc(50271).nationalInsurance, 3016.02);
  assert.equal(calc(50271).incomeTax, 7540.4);
  for (const region of REGIONS) for (const boundary of [12570, 16537, 29526, 43662, 50270, 75000, 100000, 125140]) {
    const before = calc(boundary - 1, region), after = calc(boundary + 1, region);
    assert.ok(after.incomeTax >= before.incomeTax);
    assert.ok(after.incomeTax - before.incomeTax < 2);
    assert.ok(Math.abs(after.net + after.incomeTax + after.nationalInsurance - after.gross) < .011);
  }
});
test("engine rejects invalid amounts, years, regions and periods", () => {
  for (const income of [-1, NaN, Infinity, 100000001]) assert.throws(() => calc(income));
  assert.throws(() => calc(10000000, "England", "monthly"));
  assert.throws(() => calculateIncomeTax({ income: 1, region: "USA" as TaxRegion, period: "annual", taxYear: "2026/27" }));
  assert.throws(() => calculateIncomeTax({ income: 1, region: "England", period: "daily" as IncomePeriod, taxYear: "2026/27" }));
  assert.throws(() => calculateIncomeTax({ income: 1, region: "England", period: "annual", taxYear: "2027/28" }));
});
