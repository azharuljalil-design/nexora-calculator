import { strict as assert } from "node:assert";
import { test } from "node:test";
import { calculateCompoundGrowth, calculateMonthlyPayment } from "../src/lib/financialMath";

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

test("calculateMonthlyPayment returns zero for invalid loan terms", () => {
  assert.equal(
    calculateMonthlyPayment({ principal: 12000, annualInterestRate: 5, years: 0 }),
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

  assert.equal(Number(balance.toFixed(2)), 1628.89);
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
