import { strict as assert } from "node:assert";
import * as fs from "node:fs";
import * as Module from "node:module";
import * as path from "node:path";
import { test } from "node:test";
import {
  LOAN_PAYMENT_INVALID_MESSAGE,
  calculateCompoundGrowth,
  calculateCompoundInterestSummary,
  calculateMonthlyPayment
} from "../src/lib/financialMath";
import { validateAll } from "../src/lib/calculatorEngine/calculatorEngine";
import { addCalendarMonths, buildAmortizationSchedule } from "../src/lib/amortization";
import type { CalculatorConfig } from "../src/types/calculatorTypes";

type CalculatorConfigForTest = {
  calculate: (values: Record<string, number | string>) => Record<string, number | string>;
  inputs: CalculatorConfig["inputs"];
  relatedSlugs?: string[];
};

function loadCalculator(slug: string): CalculatorConfigForTest {
  const resolver = Module as typeof Module & {
    _resolveFilename: (...args: unknown[]) => string;
  };
  const originalResolveFilename = resolver._resolveFilename;

  resolver._resolveFilename = function patchedResolveFilename(
    request: unknown,
    parent: unknown,
    isMain: unknown,
    options: unknown
  ) {
    if (typeof request === "string" && request.startsWith("@/")) {
      return originalResolveFilename.call(
        this,
        path.join(__dirname, "..", request.replace("@/", "src/")),
        parent,
        isMain,
        options
      );
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  try {
    const registry = require("../src/calculators/calculatorRegistry") as {
      findCalculatorBySlug: (calculatorSlug: string) => CalculatorConfigForTest | undefined;
    };
    const calculator = registry.findCalculatorBySlug(slug);
    assert.ok(calculator, `Expected calculator ${slug} to exist.`);
    return calculator;
  } finally {
    resolver._resolveFilename = originalResolveFilename;
  }
}

test("calculateMonthlyPayment handles amortized loans", () => {
  const payment = calculateMonthlyPayment({
    principal: 100000,
    annualInterestRate: 6,
    years: 30
  });

  assert.equal(Number(payment?.toFixed(2)), 599.55);
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

test("calculateMonthlyPayment returns null for invalid, negative, overflowing, or non-finite loan inputs", () => {
  assert.equal(
    calculateMonthlyPayment({ principal: 12000, annualInterestRate: 5, years: 0 }),
    null
  );
  assert.equal(
    calculateMonthlyPayment({ principal: Number.POSITIVE_INFINITY, annualInterestRate: 5, years: 2 }),
    null
  );
  assert.equal(
    calculateMonthlyPayment({ principal: 12000, annualInterestRate: Number.NaN, years: 2 }),
    null
  );
  assert.equal(
    calculateMonthlyPayment({ principal: 12000, annualInterestRate: -1, years: 2 }),
    null
  );
  assert.equal(
    calculateMonthlyPayment({ principal: 100000, annualInterestRate: 1e308, years: 1000 }),
    null
  );
});

test("loan calculator displays invalid-payment message instead of misleading totals", () => {
  const loan = loadCalculator("loan-calculator");
  const result = loan.calculate({
    currency: "USD",
    loanAmount: 100000,
    annualInterestRate: 1e308,
    loanTermYears: 1000
  });

  assert.deepEqual(result, {
    monthlyPayment: LOAN_PAYMENT_INVALID_MESSAGE,
    totalPayment: LOAN_PAYMENT_INVALID_MESSAGE,
    totalInterest: LOAN_PAYMENT_INVALID_MESSAGE
  });
});

test("mortgage calculator displays invalid-payment message instead of misleading totals", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const result = mortgage.calculate({
    region: "US",
    currency: "USD",
    homePrice: 500000,
    downPayment: 100000,
    annualInterestRate: 1e308,
    loanTermYears: 1000,
    annualPropertyTax: 6000,
    annualHomeInsurance: 1200,
    monthlyHOA: 100
  });

  assert.equal(result.loanAmount, "$400,000.00");
  assert.equal(result.monthlyPrincipalAndInterest, LOAN_PAYMENT_INVALID_MESSAGE);
  assert.equal(result.totalMonthlyPayment, LOAN_PAYMENT_INVALID_MESSAGE);
  assert.equal(result.totalLoanPayment, LOAN_PAYMENT_INVALID_MESSAGE);
  assert.equal(result.totalInterestPaid, LOAN_PAYMENT_INVALID_MESSAGE);
});

const validMortgageValues = {
  currency: "GBP",
  homePrice: "350000",
  downPayment: "70000",
  annualInterestRate: "4.75",
  loanTermYears: "25",
  annualPropertyTax: "0",
  annualHomeInsurance: "0",
  monthlyHOA: "0",
  firstRepaymentDate: "2026-01-31"
};

test("mortgage calculator returns normal, zero-interest, and optional-cost results", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const normal = mortgage.calculate(validMortgageValues);
  assert.equal(normal.loanAmount, "£280,000.00");
  assert.equal(normal.monthlyPrincipalAndInterest, "£1,596.33");
  assert.equal(normal.firstRepaymentDate, "2026-01-31");
  assert.equal(normal.finalRepaymentDate, "2050-12-31");

  const zeroInterest = mortgage.calculate({ ...validMortgageValues, annualInterestRate: 0 });
  assert.equal(zeroInterest.monthlyPrincipalAndInterest, "£933.33");
  assert.equal(zeroInterest.totalInterestPaid, "£0.00");

  const optionalCosts = mortgage.calculate({
    ...validMortgageValues,
    currency: "USD",
    annualPropertyTax: 6000,
    annualHomeInsurance: 1200,
    monthlyHOA: 100
  });
  assert.equal(optionalCosts.monthlyPropertyTax, "$500.00");
  assert.equal(optionalCosts.monthlyInsurance, "$100.00");
  assert.equal(optionalCosts.monthlyHOA, "$100.00");
  assert.equal(optionalCosts.totalMonthlyPayment, "$2,296.33");
});

test("mortgage calculator formats all supported currencies", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  assert.equal(mortgage.calculate({ ...validMortgageValues, currency: "GBP" }).loanAmount, "£280,000.00");
  assert.equal(mortgage.calculate({ ...validMortgageValues, currency: "EUR" }).loanAmount, "280.000,00 €");
  assert.equal(mortgage.calculate({ ...validMortgageValues, currency: "USD" }).loanAmount, "$280,000.00");
});

test("mortgage calculator validates price, deposit, term, and interest bounds", () => {
  const mortgage = loadCalculator("mortgage-calculator") as CalculatorConfigForTest;
  const validate = (overrides: Record<string, string>) =>
    validateAll(mortgage as CalculatorConfig, { ...validMortgageValues, ...overrides });

  assert.equal(validate({ homePrice: "0" }).homePrice, "Value must be at least 0.01.");
  assert.equal(validate({ downPayment: "350000" }).downPayment, "Deposit must be less than the property price.");
  assert.equal(validate({ downPayment: "360000" }).downPayment, "Deposit must be less than the property price.");
  assert.equal(validate({ downPayment: "-1" }).downPayment, "Value must be at least 0.");
  assert.equal(validate({ loanTermYears: "25.5" }).loanTermYears, "Mortgage term must be a whole number of years.");
  assert.equal(validate({ loanTermYears: "0" }).loanTermYears, "Value must be at least 1.");
  assert.equal(validate({ loanTermYears: "41" }).loanTermYears, "Value must be at most 40.");
  assert.equal(validate({ annualInterestRate: "-0.01" }).annualInterestRate, "Value must be at least 0.");
  assert.equal(validate({ annualInterestRate: "30.01" }).annualInterestRate, "Value must be at most 30.");
  assert.equal(validate({ firstRepaymentDate: "" }).firstRepaymentDate, "Please choose a value.");
});

test("mortgage supports deposit amount and percentage modes with equivalent results", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const amount = mortgage.calculate({ ...validMortgageValues, depositMode: "amount" });
  const percentage = mortgage.calculate({
    ...validMortgageValues,
    depositMode: "percentage",
    depositPercentage: "20",
    downPayment: "99999"
  });
  assert.equal(amount.depositAmount, "£70,000.00");
  assert.equal(amount.depositPercentage, "20.00%");
  assert.equal(amount.loanToValue, "80.00%");
  assert.equal(percentage.depositAmount, amount.depositAmount);
  assert.equal(percentage.loanAmount, amount.loanAmount);

  const zero = mortgage.calculate({ ...validMortgageValues, depositMode: "percentage", depositPercentage: "0" });
  assert.equal(zero.depositAmount, "£0.00");
  assert.equal(zero.loanToValue, "100.00%");
});

test("mortgage percentage mode validates negative, 100%, and above 100% deposits", () => {
  const mortgage = loadCalculator("mortgage-calculator") as CalculatorConfigForTest;
  const values = { ...validMortgageValues, depositMode: "percentage", depositPercentage: "100" };
  assert.equal(validateAll(mortgage as CalculatorConfig, values).depositPercentage, "Deposit percentage must be less than 100%.");
  assert.equal(validateAll(mortgage as CalculatorConfig, { ...values, depositPercentage: "101" }).depositPercentage, "Deposit percentage must be less than 100%.");
  assert.equal(validateAll(mortgage as CalculatorConfig, { ...values, depositPercentage: "-1" }).depositPercentage, "Value must be at least 0.");
});

test("shared amortization engine handles zero and normal rates and reconciles totals", () => {
  const zero = buildAmortizationSchedule({ principal: 1200, annualInterestRate: 0, years: 1, firstPaymentDate: "2024-01-31" });
  assert.ok(zero);
  assert.equal(zero.rows.length, 12);
  assert.equal(zero.rows[11].remainingBalance, 0);
  assert.equal(zero.totalInterest, 0);
  assert.equal(zero.totalRepayments, zero.rows.reduce((sum, row) => sum + row.paymentAmount, 0));

  const normal = buildAmortizationSchedule({ principal: 100000, annualInterestRate: 6, years: 30, firstPaymentDate: "2026-08-18" });
  assert.ok(normal);
  assert.equal(Number(normal.monthlyPayment.toFixed(2)), 599.55);
  assert.equal(normal.rows.length, 360);
  assert.equal(normal.rows[359].remainingBalance, 0);
  assert.equal(normal.totalInterest, normal.rows.reduce((sum, row) => sum + row.interest, 0));
});

test("repayment dates preserve the anchor day across month ends and leap years", () => {
  assert.equal(addCalendarMonths("2024-01-31", 1), "2024-02-29");
  assert.equal(addCalendarMonths("2024-01-31", 2), "2024-03-31");
  assert.equal(addCalendarMonths("2023-01-31", 1), "2023-02-28");
  const schedule = buildAmortizationSchedule({ principal: 1200, annualInterestRate: 0, years: 1, firstPaymentDate: "2024-01-31" });
  assert.equal(schedule?.rows[0].paymentDate, "2024-01-31");
  assert.equal(schedule?.rows[11].paymentDate, "2024-12-31");
  assert.equal(buildAmortizationSchedule({ principal: 1200, annualInterestRate: 0, years: 1, firstPaymentDate: "invalid" }), null);
});

test("mortgage calculator links only to the intended related calculators", () => {
  assert.deepEqual(loadCalculator("mortgage-calculator").relatedSlugs, [
    "loan-calculator",
    "amortization-calculator",
    "compound-interest-calculator"
  ]);
});

test("loan calculator preserves normal and zero-interest results", () => {
  const loan = loadCalculator("loan-calculator");

  assert.deepEqual(
    loan.calculate({
      currency: "USD",
      loanAmount: 100000,
      annualInterestRate: 6,
      loanTermYears: 30
    }),
    {
      monthlyPayment: "$599.55",
      totalPayment: "$215,838.19",
      totalInterest: "$115,838.19"
    }
  );

  assert.deepEqual(
    loan.calculate({
      currency: "USD",
      loanAmount: 12000,
      annualInterestRate: 0,
      loanTermYears: 2
    }),
    {
      monthlyPayment: "$500.00",
      totalPayment: "$12,000.00",
      totalInterest: "$0.00"
    }
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
