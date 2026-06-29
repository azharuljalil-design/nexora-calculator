import { strict as assert } from "node:assert";
import * as fs from "node:fs";
import { test } from "node:test";
import {
  calculateCompoundGrowth,
  calculateCompoundInterestSummary,
  calculateMonthlyPayment
} from "../src/lib/financialMath";

test("calculateMonthlyPayment handles amortized loans", () => {
  const payment = calculateMonthlyPayment({
    principal: 100000,
    annualInterestRate: 6,
    years: 30
  });

  assert.equal(Number(payment.toFixed(2)), 599.55);
});

test("calculateMonthlyPayment handles zero-interest loans", () => {
  const payment = calculateMonthlyPayment({
    principal: 12000,
    annualInterestRate: 0,
    years: 2
  });

  assert.equal(payment, 500);
});

test("calculateMonthlyPayment falls back to straight-line payment for tiny positive rates", () => {
  const payment = calculateMonthlyPayment({
    principal: 12000,
    annualInterestRate: Number.MIN_VALUE,
    years: 2
  });

  assert.equal(payment, 500);
});

test("calculateMonthlyPayment returns zero for invalid or non-finite loan inputs", () => {
  assert.equal(
    calculateMonthlyPayment({ principal: 12000, annualInterestRate: 5, years: 0 }),
    0
  );
  assert.equal(
    calculateMonthlyPayment({ principal: Number.POSITIVE_INFINITY, annualInterestRate: 5, years: 2 }),
    0
  );
  assert.equal(
    calculateMonthlyPayment({ principal: 12000, annualInterestRate: Number.NaN, years: 2 }),
    0
  );
});

test("calculateCompoundGrowth handles annual compounding", () => {
  const balance = calculateCompoundGrowth({
    principal: 1000,
    annualInterestRate: 5,
    years: 10,
    compoundsPerYear: 1
  });

  assert.equal(Number(balance?.toFixed(2)), 1628.89);
});

test("calculateCompoundGrowth preserves principal at zero rate", () => {
  assert.equal(
    calculateCompoundGrowth({
      principal: 1000,
      annualInterestRate: 0,
      years: 10,
      compoundsPerYear: 12
    }),
    1000
  );
});

test("calculateCompoundGrowth returns null for overflow or non-finite output", () => {
  assert.equal(
    calculateCompoundGrowth({
      principal: 1e308,
      annualInterestRate: 1000,
      years: 1000,
      compoundsPerYear: 365
    }),
    null
  );
});

test("calculateCompoundInterestSummary returns null for invalid or non-finite financial inputs", () => {
  assert.equal(
    calculateCompoundInterestSummary({
      initialInvestment: Number.POSITIVE_INFINITY,
      monthlyContribution: 100,
      annualInterestRate: 5,
      years: 10,
      compoundsPerYear: 12
    }),
    null
  );
  assert.equal(
    calculateCompoundInterestSummary({
      initialInvestment: 1000,
      monthlyContribution: -1,
      annualInterestRate: 5,
      years: 10,
      compoundsPerYear: 12
    }),
    null
  );
});

test("calculateCompoundInterestSummary returns null for overflow from large contributions", () => {
  assert.equal(
    calculateCompoundInterestSummary({
      initialInvestment: 1000,
      monthlyContribution: 1e308,
      annualInterestRate: 1000,
      years: 1000,
      compoundsPerYear: 365
    }),
    null
  );
});

test("npm test script uses dependency-free cross-platform Node cleanup", () => {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  assert.equal(packageJson.scripts.test, "node scripts/run-tests.js");
  assert.doesNotMatch(packageJson.scripts.test, /rm\s+-rf/);
  assert.match(fs.readFileSync("scripts/run-tests.js", "utf8"), /fs\.rmSync/);
});
