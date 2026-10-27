import { strict as assert } from "node:assert";
import { test } from "node:test";
import { calculateIncomeTaxEstimate, type IncomeTaxBand } from "../src/lib/ukIncomeTax";

// Synthetic arithmetic fixtures, NOT HMRC tax-year rates or thresholds.
const bands: IncomeTaxBand[] = [
  { label: "Fixture first band", upperLimit: 1000, rate: 0.1 },
  { label: "Fixture second band", upperLimit: 3000, rate: 0.2 },
  { label: "Fixture final band", upperLimit: null, rate: 0.3 }
];
const run = (annualIncome: number, personalAllowance = 1000) => calculateIncomeTaxEstimate({ annualIncome, personalAllowance, bands });

test("progressive tax applies each rate only to its own taxable band", () => {
  const result = run(4500);
  assert.equal(result.allowanceCents, 100000);
  assert.equal(result.taxableCents, 350000);
  assert.deepEqual(result.breakdown.map(row => row.amountCents), [100000, 200000, 50000]);
  assert.deepEqual(result.breakdown.map(row => row.taxCents), [10000, 40000, 15000]);
  assert.equal(result.taxCents, 65000);
  assert.equal(result.afterIncomeTaxCents, 385000);
});

test("zero income and income within an allowance owe no tax", () => {
  for(const income of [0, 0.01, 999.99, 1000]) {
    const result = run(income);
    assert.equal(result.taxCents, 0);
    assert.equal(result.allowanceCents, result.grossCents);
    assert.equal(result.taxableCents, 0);
  }
  assert.equal(run(0).effectiveRate, 0);
});

test("band boundaries preserve continuity and do not tax lower bands twice", () => {
  assert.equal(run(2000).taxCents, 10000);
  assert.equal(run(4000).taxCents, 50000);
  assert.equal(run(4001).taxCents, 50030);
  assert.equal(run(4500, 0).taxCents, 95000);
});

test("cent reconciliation holds across fractional taxes and many income values", () => {
  for(let cents = 0; cents <= 1000000; cents += 137) {
    const result = run(cents / 100);
    assert.equal(result.breakdown.reduce((sum, row) => sum + row.taxCents, 0), result.taxCents);
    assert.equal(result.breakdown.reduce((sum, row) => sum + row.amountCents, 0), result.taxableCents);
    assert.equal(result.allowanceCents + result.taxableCents, result.grossCents);
    assert.equal(result.afterIncomeTaxCents + result.taxCents, result.grossCents);
    assert.ok(result.taxCents >= 0 && result.afterIncomeTaxCents >= 0);
  }
});

test("invalid monetary amounts are rejected", () => {
  for(const annualIncome of [-1, NaN, Infinity, 1e10, 1.001]) assert.throws(() => run(annualIncome));
  for(const personalAllowance of [-1, NaN, Infinity, 1.001]) assert.throws(() => run(1000, personalAllowance));
});

test("invalid or incomplete tax configurations are rejected", () => {
  for(const invalid of [[], [{ label: "No final band", upperLimit: 100, rate: 0.2 }],
    [{ label: "", upperLimit: null, rate: 0.2 }],
    [{ label: "Invalid rate", upperLimit: null, rate: 1.1 }],
    [{ label: "Invalid rate", upperLimit: null, rate: NaN }],
    [{ label: "Unordered", upperLimit: 100, rate: 0.1 }, { label: "Unordered", upperLimit: 50, rate: 0.2 }, { label: "Final", upperLimit: null, rate: 0.3 }],
    [{ label: "Early open band", upperLimit: null, rate: 0.1 }, { label: "Final", upperLimit: null, rate: 0.3 }]
  ] as IncomeTaxBand[][]) assert.throws(() => calculateIncomeTaxEstimate({annualIncome: 2000, personalAllowance: 0, bands: invalid}));
});
