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
import {
  addCalendarMonths,
  aggregateAmortizationByYear,
  buildAmortizationSchedule,
  formatCalendarDate,
  normalizeCalendarDate
} from "../src/lib/amortization";
import type { CalculatorConfig } from "../src/types/calculatorTypes";

type CalculatorConfigForTest = {
  calculate: (values: Record<string, number | string>) => Record<string, any>;
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
    monthlyHOA: 100,
    depositMode: "amount",
    firstRepaymentDate: "2026-09-30"
  });

  assert.deepEqual(result, { validationError: LOAN_PAYMENT_INVALID_MESSAGE });
});

const validMortgageValues = {
  currency: "GBP",
  homePrice: "350000",
  depositMode: "amount",
  downPayment: "70000",
  depositPercentage: "20",
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
  assert.equal(normal.mortgageAmount, "£280,000.00");
  assert.equal(normal.depositAmount, "£70,000.00");
  assert.equal(normal.depositPercentage, "20.00%");
  assert.equal(normal.loanToValue, "80.00%");
  assert.equal(normal.firstRepaymentDate, "2026-01-31");
  assert.equal(normal.finalRepaymentDate, "2050-12-31");
  assert.equal(normal.monthlyPrincipalAndInterest, "£1,596.33");

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
  assert.equal(optionalCosts.totalMonthlyPayment, "$2,296.33");
  assert.equal(optionalCosts.totalLoanPayment, "$478,898.58");
  assert.equal(optionalCosts.totalInterestPaid, "$198,898.58");
});

test("mortgage calculator formats all supported currencies", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  assert.equal(mortgage.calculate({ ...validMortgageValues, currency: "GBP" }).mortgageAmount, "£280,000.00");
  assert.equal(mortgage.calculate({ ...validMortgageValues, currency: "EUR" }).mortgageAmount, "280.000,00 €");
  assert.equal(mortgage.calculate({ ...validMortgageValues, currency: "USD" }).mortgageAmount, "$280,000.00");
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
});


test("mortgage deposit percentage mode converts the active deposit and enforces boundaries", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const result = mortgage.calculate({
    ...validMortgageValues,
    depositMode: "percentage",
    depositPercentage: "12.5"
  });
  assert.equal(result.depositAmount, "£43,750.00");
  assert.equal(result.depositPercentage, "12.50%");
  assert.equal(result.mortgageAmount, "£306,250.00");
  assert.equal(result.loanToValue, "87.50%");

  const validate = (overrides: Record<string, string>) =>
    validateAll(mortgage as CalculatorConfig, { ...validMortgageValues, ...overrides });
  assert.equal(validate({ depositMode: "percentage", depositPercentage: "-0.01" }).depositPercentage, "Value must be at least 0.");
  assert.equal(validate({ depositMode: "percentage", depositPercentage: "100" }).depositPercentage, "Deposit percentage must be less than 100%.");
  assert.equal(validate({ depositMode: "percentage", depositPercentage: "0" }).depositPercentage, undefined);
  assert.equal(validate({ depositMode: "percentage", depositPercentage: "20", downPayment: "350000" }).downPayment, undefined);
});

test("repayment date validation rejects missing, malformed, invalid, and non-string values", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const validate = (date: unknown) => validateAll(mortgage as CalculatorConfig, {
    ...validMortgageValues,
    firstRepaymentDate: date
  } as Record<string, string>);
  assert.equal(validate("").firstRepaymentDate, "Please choose a value.");
  assert.equal(validate("01/31/2026").firstRepaymentDate, "Enter a valid repayment date in YYYY-MM-DD format.");
  assert.equal(validate("2026-02-30").firstRepaymentDate, "Enter a valid repayment date in YYYY-MM-DD format.");
  assert.equal(validate(42).firstRepaymentDate, "Enter a valid date.");
  assert.deepEqual(mortgage.calculate({ ...validMortgageValues, firstRepaymentDate: "bad" }), {
    validationError: "A valid first repayment date in YYYY-MM-DD format is required."
  });
});

test("calendar dates preserve their anchor day and clamp month ends and leap years", () => {
  assert.equal(normalizeCalendarDate("2024-02-29"), "2024-02-29");
  assert.equal(normalizeCalendarDate("2023-02-29"), null);
  assert.equal(formatCalendarDate(addCalendarMonths({ year: 2024, month: 1, day: 31 }, 1)), "2024-02-29");
  assert.equal(formatCalendarDate(addCalendarMonths({ year: 2024, month: 1, day: 31 }, 2)), "2024-03-31");
});

test("shared amortization schedules reconcile normal and zero-rate totals to a zero final balance", () => {
  for (const annualInterestRate of [6, 0]) {
    const schedule = buildAmortizationSchedule({
      principal: 12000,
      annualInterestRate,
      years: 2,
      firstRepaymentDate: "2024-01-31"
    });
    assert.ok(schedule);
    assert.equal(schedule.rows.length, 24);
    assert.equal(schedule.rows[23].remainingBalance, 0);
    assert.equal(schedule.rows[23].paymentDate, "2025-12-31");
    assert.ok(Math.abs(schedule.totalRepayments - schedule.rows.reduce((sum, row) => sum + row.paymentAmount, 0)) < 1e-9);
    assert.ok(Math.abs(schedule.totalInterest - schedule.rows.reduce((sum, row) => sum + row.interest, 0)) < 1e-9);
    assert.ok(Math.abs(schedule.rows.reduce((sum, row) => sum + row.principal, 0) - 12000) < 1e-8);
  }
});

test("annual amortization aggregates reconcile principal, interest, and total payments", () => {
  for (const annualInterestRate of [4.75, 0]) {
    const schedule = buildAmortizationSchedule({
      principal: 280000,
      annualInterestRate,
      years: 25,
      firstRepaymentDate: "2026-01-31"
    });
    assert.ok(schedule);
    const annual = aggregateAmortizationByYear(schedule.rows);
    assert.deepEqual(annual, schedule.annualBreakdown);
    assert.equal(annual.length, 25);
    assert.ok(Math.abs(annual.reduce((sum, year) => sum + year.principal, 0) - 280000) < 1e-7);
    assert.ok(Math.abs(annual.reduce((sum, year) => sum + year.interest, 0) - schedule.totalInterest) < 1e-7);
    assert.ok(Math.abs(annual.reduce((sum, year) => sum + year.totalPayment, 0) - schedule.totalRepayments) < 1e-7);
    if (annualInterestRate === 0) assert.ok(annual.every((year) => year.interest === 0));
  }
});

test("mortgage calculation exposes engine-generated original and overpayment schedules", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const originalResult = mortgage.calculate({ ...validMortgageValues, monthlyOverpayment: 0, oneTimeOverpayment: 0 });
  const originalData = originalResult.mortgageScenarios;
  assert.equal(originalData.hasOverpayment, false);
  assert.equal(originalData.original.rows.length, 300);
  assert.equal(originalData.original.rows.at(-1).remainingBalance, 0);
  assert.deepEqual(originalData.revised.rows, originalData.original.rows);

  const revisedResult = mortgage.calculate({ ...validMortgageValues, monthlyOverpayment: 200, oneTimeOverpayment: 5000, oneTimeOverpaymentDate: "2027-02-15" });
  const revisedData = revisedResult.mortgageScenarios;
  assert.equal(revisedData.hasOverpayment, true);
  assert.equal(revisedData.revised.rows[0].monthlyOverpayment, 200);
  assert.equal(revisedData.revised.rows[13].oneTimeOverpayment, 5000);
  assert.ok(revisedData.revised.rows.length < revisedData.original.rows.length);
  assert.equal(revisedData.revised.rows.at(-1).remainingBalance, 0);
  assert.equal(revisedData.comparison.paymentsSaved, revisedData.original.rows.length - revisedData.revised.rows.length);
  assert.ok(Math.abs(revisedData.revised.rows.reduce((sum: number, row: { totalPayment: number }) => sum + row.totalPayment, 0) - revisedData.revised.totalRepayments) < 1e-7);
});

test("a 40-year mortgage schedule is bounded at 480 engine rows", () => {
  const schedule = buildAmortizationSchedule({ principal: 300000, annualInterestRate: 5, years: 40, firstRepaymentDate: "2024-02-29" });
  assert.ok(schedule);
  assert.equal(schedule.rows.length, 480);
  assert.equal(schedule.rows[0].paymentDate, "2024-02-29");
  assert.equal(schedule.rows[12].paymentDate, "2025-02-28");
  assert.equal(schedule.rows.at(-1)?.remainingBalance, 0);
});

test("zero overpayments preserve every baseline amortization value", () => {
  const args = { principal: 280000, annualInterestRate: 4.75, years: 25, firstRepaymentDate: "2026-01-31" };
  const baseline = buildAmortizationSchedule(args);
  const zero = buildAmortizationSchedule({ ...args, monthlyOverpayment: 0, oneTimeOverpayment: 0 });
  assert.ok(baseline && zero);
  assert.equal(zero.monthlyPayment, baseline.monthlyPayment);
  assert.equal(zero.totalRepayments, baseline.totalRepayments);
  assert.equal(zero.totalInterest, baseline.totalInterest);
  assert.equal(zero.rows.length, baseline.rows.length);
  assert.deepEqual(zero.rows, baseline.rows);
  assert.ok(zero.rows.every((row) => row.paymentAmount === row.totalPayment));
});

test("monthly, one-time, and combined overpayments shorten schedules and reconcile", () => {
  const args = { principal: 200000, annualInterestRate: 5, years: 30, firstRepaymentDate: "2026-01-15" };
  const original = buildAmortizationSchedule(args);
  const monthly = buildAmortizationSchedule({ ...args, monthlyOverpayment: 250 });
  const oneTime = buildAmortizationSchedule({ ...args, oneTimeOverpayment: 10000, oneTimeOverpaymentDate: "2027-01-15" });
  const both = buildAmortizationSchedule({ ...args, monthlyOverpayment: 250, oneTimeOverpayment: 10000, oneTimeOverpaymentDate: "2027-01-15" });
  assert.ok(original && monthly && oneTime && both);
  assert.equal(monthly.rows[0].monthlyOverpayment, 250);
  assert.equal(monthly.rows[0].paymentNumber, 1);
  assert.equal(oneTime.rows[12].oneTimeOverpayment, 10000);
  assert.equal(oneTime.rows.filter((row) => row.oneTimeOverpayment > 0).length, 1);
  assert.ok(monthly.rows.length < original.rows.length);
  assert.ok(oneTime.rows.length < original.rows.length);
  assert.ok(both.rows.length < monthly.rows.length);
  for (const schedule of [monthly, oneTime, both]) {
    assert.equal(schedule.rows.at(-1)?.remainingBalance, 0);
    assert.ok(schedule.rows.every((row) => row.remainingBalance >= 0 && row.principal >= 0));
    assert.ok(Math.abs(schedule.totalRepayments - schedule.rows.reduce((sum, row) => sum + row.totalPayment, 0)) < 1e-8);
    assert.ok(Math.abs(schedule.totalInterest - schedule.rows.reduce((sum, row) => sum + row.interest, 0)) < 1e-8);
  }
});

test("one-time dates use the first scheduled repayment on or after the calendar date", () => {
  const args = { principal: 12000, annualInterestRate: 6, years: 2, firstRepaymentDate: "2026-01-31", oneTimeOverpayment: 1000 };
  const first = buildAmortizationSchedule({ ...args, oneTimeOverpaymentDate: "2026-01-31" });
  const between = buildAmortizationSchedule({ ...args, oneTimeOverpaymentDate: "2026-02-15" });
  assert.ok(first && between);
  assert.equal(first.rows[0].oneTimeOverpayment, 1000);
  assert.equal(between.rows[0].oneTimeOverpayment, 0);
  assert.equal(between.rows[1].paymentDate, "2026-02-28");
  assert.equal(between.rows[1].oneTimeOverpayment, 1000);
});

test("large and late overpayments are capped without negative balances", () => {
  const args = { principal: 10000, annualInterestRate: 5, years: 2, firstRepaymentDate: "2026-01-01" };
  const original = buildAmortizationSchedule(args);
  const hugeMonthly = buildAmortizationSchedule({ ...args, monthlyOverpayment: 1e9 });
  assert.ok(original && hugeMonthly);
  assert.equal(hugeMonthly.rows.length, 1);
  assert.equal(hugeMonthly.rows[0].remainingBalance, 0);
  assert.equal(hugeMonthly.rows[0].totalPayment, 10000 + hugeMonthly.rows[0].interest);
  const hugeOneTime = buildAmortizationSchedule({
    ...args,
    oneTimeOverpayment: 1e9,
    oneTimeOverpaymentDate: args.firstRepaymentDate
  });
  assert.ok(hugeOneTime);
  assert.equal(hugeOneTime.rows.length, 1);
  assert.equal(hugeOneTime.rows[0].remainingBalance, 0);
  assert.ok(hugeOneTime.rows[0].oneTimeOverpayment < 1e9);
  const late = buildAmortizationSchedule({
    ...args,
    oneTimeOverpayment: 100,
    oneTimeOverpaymentDate: original.rows[original.rows.length - 2].paymentDate
  });
  assert.ok(late);
  assert.ok(late.rows.some((row) => row.oneTimeOverpayment > 0));
  assert.equal(late.rows.at(-1)?.remainingBalance, 0);
  assert.ok(late.rows.every((row) => row.remainingBalance >= 0));
});

test("overpayment engine supports genuine zero interest and rejects invalid amounts or dates", () => {
  const args = { principal: 12000, annualInterestRate: 0, years: 2, firstRepaymentDate: "2026-01-01" };
  const schedule = buildAmortizationSchedule({ ...args, monthlyOverpayment: 500, oneTimeOverpayment: 1000, oneTimeOverpaymentDate: "2026-06-15" });
  assert.ok(schedule);
  assert.equal(schedule.totalInterest, 0);
  assert.equal(schedule.rows.at(-1)?.remainingBalance, 0);
  assert.equal(buildAmortizationSchedule({ ...args, monthlyOverpayment: -1 }), null);
  assert.equal(buildAmortizationSchedule({ ...args, oneTimeOverpayment: -1 }), null);
  assert.equal(buildAmortizationSchedule({ ...args, monthlyOverpayment: Number.POSITIVE_INFINITY }), null);
  assert.equal(buildAmortizationSchedule({ ...args, oneTimeOverpayment: 1, oneTimeOverpaymentDate: "2026-02-30" }), null);
});

test("mortgage overpayment validation covers amount and calendar boundaries", () => {
  const mortgage = loadCalculator("mortgage-calculator") as CalculatorConfigForTest;
  const validate = (overrides: Record<string, string>) => validateAll(mortgage as CalculatorConfig, {
    ...validMortgageValues, monthlyOverpayment: "0", oneTimeOverpayment: "0", ...overrides
  });
  assert.equal(validate({ monthlyOverpayment: "-1" }).monthlyOverpayment, "Monthly overpayment cannot be negative.");
  assert.equal(validate({ oneTimeOverpayment: "-1" }).oneTimeOverpayment, "One-time overpayment cannot be negative.");
  assert.equal(validate({ monthlyOverpayment: "Infinity" }).monthlyOverpayment, "Enter a valid number.");
  assert.equal(validate({ oneTimeOverpayment: "1000", oneTimeOverpaymentDate: "" }).oneTimeOverpaymentDate, "Enter a one-time overpayment date.");
  assert.equal(validate({ oneTimeOverpayment: "1000", oneTimeOverpaymentDate: "not-a-date" }).oneTimeOverpaymentDate, "Enter a valid one-time overpayment date in YYYY-MM-DD format.");
  assert.equal(validate({ oneTimeOverpayment: "1000", oneTimeOverpaymentDate: "2025-12-31" }).oneTimeOverpaymentDate, "One-time overpayment date cannot be before the first repayment date.");
  assert.equal(validate({ oneTimeOverpayment: "1000", oneTimeOverpaymentDate: "2051-01-01" }).oneTimeOverpaymentDate, "One-time overpayment date cannot be after the original final repayment date.");
  assert.equal(validate({ oneTimeOverpayment: "0", oneTimeOverpaymentDate: "bad" }).oneTimeOverpaymentDate, undefined);
});

test("mortgage comparison reports reconciled interest and years-and-months saved in all currencies", () => {
  const mortgage = loadCalculator("mortgage-calculator");
  const baseline = mortgage.calculate({ ...validMortgageValues, monthlyOverpayment: 0, oneTimeOverpayment: 0 });
  assert.equal(baseline.revisedPayoffDate, baseline.originalPayoffDate);
  assert.equal(baseline.interestSaved, "£0.00");
  assert.equal(baseline.monthlyPaymentsSaved, 0);
  assert.equal(baseline.repaymentTimeSaved, "0 years and 0 months");
  const revised = mortgage.calculate({ ...validMortgageValues, monthlyOverpayment: 200, oneTimeOverpayment: 5000, oneTimeOverpaymentDate: "2027-02-15" });
  assert.ok(Number(revised.monthlyPaymentsSaved) > 0);
  const count = Number(revised.monthlyPaymentsSaved);
  assert.equal(revised.repaymentTimeSaved, `${Math.floor(count / 12)} years and ${count % 12} months`);
  assert.notEqual(revised.interestSaved, "£0.00");
  for (const currency of ["GBP", "EUR", "USD"]) {
    const result = mortgage.calculate({ ...validMortgageValues, currency, monthlyOverpayment: 200 });
    assert.equal(typeof result.revisedTotalInterest, "string");
    assert.equal(typeof result.interestSaved, "string");
  }
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
