import { strict as assert } from "node:assert";
import { test } from "node:test";
import { calculateRetirementProjection } from "../src/lib/retirement";

test("matches the supplied retirement example", () => {
  const result = calculateRetirementProjection({ currentAge: 30, retirementAge: 67, currentSavings: 20_000, monthlyContribution: 300, annualReturn: 5 });
  assert.equal(result.months, 444);
  assert.equal(result.totalContributions, 153_200);
  assert.ok(Math.abs(result.projectedSavings - 510_858.87) < 0.01);
  assert.ok(Math.abs(result.totalGrowth - 357_658.87) < 0.01);
});

test("handles zero return and all-zero savings", () => {
  const result = calculateRetirementProjection({ currentAge: 30, retirementAge: 40, currentSavings: 0, monthlyContribution: 0, annualReturn: 0 });
  assert.equal(result.projectedSavings, 0);
  assert.equal(result.totalContributions, 0);
  assert.equal(result.totalGrowth, 0);
});

test("handles zero starting savings and zero monthly contributions", () => {
  assert.equal(calculateRetirementProjection({ currentAge: 30, retirementAge: 31, currentSavings: 0, monthlyContribution: 100, annualReturn: 0 }).projectedSavings, 1_200);
  assert.equal(calculateRetirementProjection({ currentAge: 30, retirementAge: 31, currentSavings: 1_000, monthlyContribution: 0, annualReturn: 0 }).projectedSavings, 1_000);
});

test("preserves supported negative returns", () => {
  const result = calculateRetirementProjection({ currentAge: 30, retirementAge: 31, currentSavings: 1_000, monthlyContribution: 0, annualReturn: -12 });
  assert.ok(result.projectedSavings < 1_000);
  assert.ok(result.totalGrowth < 0);
});
