import { buildAmortizationSchedule, parseCalendarDate } from "./amortization";

export type LoanAmortizationInput = {
  principal: number;
  years: number;
  months: number;
  annualRate: number;
  extraMonthly: number;
  firstPaymentDate?: string;
};
export type LoanPaymentRow = {
  number: number;
  date?: string;
  paymentCents: number;
  principalCents: number;
  interestCents: number;
  balanceCents: number;
};
export type LoanYearRow = Omit<LoanPaymentRow, "date">;

/** Full-precision interest model; cumulative rounding reconciles every displayed cent. */
export function calculateLoanAmortization(input: LoanAmortizationInput) {
  const {
    principal,
    years,
    months,
    annualRate,
    extraMonthly,
    firstPaymentDate,
  } = input;
  const termMonths = years * 12 + months;
  if (
    ![principal, years, months, annualRate, extraMonthly].every(
      Number.isFinite,
    ) ||
    principal < 0.01 ||
    principal > 1e12 ||
    principal !== Math.round(principal * 100) / 100 ||
    !Number.isInteger(years) ||
    years < 0 ||
    !Number.isInteger(months) ||
    months < 0 ||
    months > 11 ||
    termMonths < 1 ||
    termMonths > 600 ||
    annualRate < 0 ||
    annualRate > 50 ||
    extraMonthly < 0 ||
    extraMonthly > 1e12 ||
    extraMonthly !== Math.round(extraMonthly * 100) / 100 ||
    (firstPaymentDate &&
      (!parseCalendarDate(firstPaymentDate) ||
        Number(firstPaymentDate.slice(0, 4)) > 9949))
  ) {
    throw new Error(
      "Enter a loan of 0.01–1 trillion, a term of 1–600 months, interest of 0–50%, and non-negative extra payments. Money amounts allow two decimal places. Use a valid first payment date before year 9950.",
    );
  }
  const schedule = buildAmortizationSchedule({
    principal,
    annualInterestRate: annualRate,
    years: termMonths / 12,
    termMonths,
    monthlyOverpayment: extraMonthly,
    firstRepaymentDate: firstPaymentDate || "2000-01-01",
  });
  if (!schedule)
    throw new Error(
      "These values cannot produce a reliable repayment schedule.",
    );
  const principalCents = Math.round(principal * 100);
  let previousPrincipal = 0;
  let previousInterest = 0;
  let cumulativeInterest = 0;
  const rows: LoanPaymentRow[] = schedule.rows.map((row, index) => {
    cumulativeInterest += row.interest;
    const paidPrincipal =
      index === schedule.rows.length - 1
        ? principalCents
        : principalCents - Math.round(row.remainingBalance * 100);
    const paidInterest = Math.round(cumulativeInterest * 100);
    const principalPart = paidPrincipal - previousPrincipal;
    const interestPart = paidInterest - previousInterest;
    previousPrincipal = paidPrincipal;
    previousInterest = paidInterest;
    return {
      number: row.paymentNumber,
      date: firstPaymentDate ? row.paymentDate : undefined,
      paymentCents: principalPart + interestPart,
      principalCents: principalPart,
      interestCents: interestPart,
      balanceCents: principalCents - paidPrincipal,
    };
  });
  const annual: LoanYearRow[] = [];
  rows.forEach((row, index) => {
    const group = Math.floor(index / 12);
    if (!annual[group])
      annual[group] = {
        number: group + 1,
        paymentCents: 0,
        principalCents: 0,
        interestCents: 0,
        balanceCents: 0,
      };
    annual[group].paymentCents += row.paymentCents;
    annual[group].principalCents += row.principalCents;
    annual[group].interestCents += row.interestCents;
    annual[group].balanceCents = row.balanceCents;
  });
  return {
    rows,
    annual,
    principalCents,
    totalInterestCents: previousInterest,
    totalPaymentCents: principalCents + previousInterest,
    monthlyPaymentCents: Math.round(schedule.monthlyPayment * 100),
    extraMonthlyCents: Math.round(extraMonthly * 100),
    payoffDate: rows[rows.length - 1].date,
    termMonths,
  };
}
export type LoanAmortizationResult = ReturnType<
  typeof calculateLoanAmortization
>;
