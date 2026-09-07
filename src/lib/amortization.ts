import { calculateMonthlyPayment } from "./financialMath";

export type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

export type AmortizationRow = {
  paymentNumber: number;
  paymentDate: string;
  regularPaymentAmount: number;
  monthlyOverpayment: number;
  oneTimeOverpayment: number;
  totalPayment: number;
  /** Kept as an alias of totalPayment for existing calculator consumers. */
  paymentAmount: number;
  principal: number;
  interest: number;
  remainingBalance: number;
};

export type AmortizationSchedule = {
  monthlyPayment: number;
  totalRepayments: number;
  totalInterest: number;
  rows: AmortizationRow[];
  annualBreakdown: AnnualAmortizationSummary[];
};

export type AnnualAmortizationSummary = {
  yearNumber: number;
  calendarYear: number;
  principal: number;
  interest: number;
  totalPayment: number;
};

export function aggregateAmortizationByYear(rows: AmortizationRow[]): AnnualAmortizationSummary[] {
  const summaries = new Map<number, AnnualAmortizationSummary>();
  for (const row of rows) {
    const calendarYear = Number(row.paymentDate.slice(0, 4));
    const current = summaries.get(calendarYear) ?? {
      yearNumber: summaries.size + 1,
      calendarYear,
      principal: 0,
      interest: 0,
      totalPayment: 0
    };
    current.principal += row.principal;
    current.interest += row.interest;
    current.totalPayment += row.totalPayment;
    summaries.set(calendarYear, current);
  }
  return [...summaries.values()];
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

export function parseCalendarDate(value: unknown): CalendarDate | null {
  if (typeof value !== "string") return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || year > 9999 || month < 1 || month > 12) return null;
  if (day < 1 || day > daysInMonth(year, month)) return null;
  return { year, month, day };
}

export function formatCalendarDate(date: CalendarDate): string {
  return `${String(date.year).padStart(4, "0")}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
}

export function addCalendarMonths(date: CalendarDate, months: number): CalendarDate {
  const monthIndex = date.month - 1 + months;
  const year = date.year + Math.floor(monthIndex / 12);
  const month = ((monthIndex % 12) + 12) % 12 + 1;
  return { year, month, day: Math.min(date.day, daysInMonth(year, month)) };
}

export function normalizeCalendarDate(value: unknown): string | null {
  const parsed = parseCalendarDate(value);
  return parsed ? formatCalendarDate(parsed) : null;
}

export function buildAmortizationSchedule(args: {
  principal: number;
  annualInterestRate: number;
  years: number;
  firstRepaymentDate: string;
  monthlyOverpayment?: number;
  oneTimeOverpayment?: number;
  oneTimeOverpaymentDate?: string;
}): AmortizationSchedule | null {
  const { principal, annualInterestRate, years } = args;
  const firstDate = parseCalendarDate(args.firstRepaymentDate);
  const monthlyOverpayment = args.monthlyOverpayment ?? 0;
  const oneTimeOverpayment = args.oneTimeOverpayment ?? 0;
  const oneTimeDate = oneTimeOverpayment > 0
    ? parseCalendarDate(args.oneTimeOverpaymentDate)
    : null;
  const paymentCount = years * 12;
  if (
    !firstDate || !Number.isInteger(paymentCount) || paymentCount <= 0 ||
    !Number.isFinite(monthlyOverpayment) || monthlyOverpayment < 0 ||
    !Number.isFinite(oneTimeOverpayment) || oneTimeOverpayment < 0 ||
    (oneTimeOverpayment > 0 && !oneTimeDate)
  ) return null;

  const monthlyPayment = calculateMonthlyPayment({ principal, annualInterestRate, years });
  if (monthlyPayment === null) return null;

  const monthlyRate = annualInterestRate / 12 / 100;
  const rows: AmortizationRow[] = [];
  let balance = principal;
  let oneTimeApplied = false;

  for (let index = 0; index < paymentCount; index += 1) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const paymentDate = formatCalendarDate(addCalendarMonths(firstDate, index));
    const amountDue = balance + interest;
    const regularPaymentAmount = Math.min(monthlyPayment, amountDue);
    let amountRemaining = Math.max(amountDue - regularPaymentAmount, 0);
    const appliedMonthlyOverpayment = Math.min(monthlyOverpayment, amountRemaining);
    amountRemaining = Math.max(amountRemaining - appliedMonthlyOverpayment, 0);
    const isOneTimeDue = !oneTimeApplied && oneTimeDate !== null &&
      paymentDate >= formatCalendarDate(oneTimeDate);
    const appliedOneTimeOverpayment = isOneTimeDue
      ? Math.min(oneTimeOverpayment, amountRemaining)
      : 0;
    if (isOneTimeDue) oneTimeApplied = true;
    const totalPayment = regularPaymentAmount + appliedMonthlyOverpayment + appliedOneTimeOverpayment;
    const principalPayment = Math.min(Math.max(totalPayment - interest, 0), balance);
    const isFinalPayment = index === paymentCount - 1 || principalPayment >= balance ||
      balance - principalPayment < 1e-8;
    balance = isFinalPayment ? 0 : Math.max(balance - principalPayment, 0);
    rows.push({
      paymentNumber: index + 1,
      paymentDate,
      regularPaymentAmount,
      monthlyOverpayment: appliedMonthlyOverpayment,
      oneTimeOverpayment: appliedOneTimeOverpayment,
      totalPayment,
      paymentAmount: totalPayment,
      principal: principalPayment,
      interest,
      remainingBalance: balance
    });
    if (balance === 0) break;
  }

  const totalRepayments = rows.reduce((total, row) => total + row.paymentAmount, 0);
  const totalInterest = rows.reduce((total, row) => total + row.interest, 0);
  return {
    monthlyPayment,
    totalRepayments,
    totalInterest,
    rows,
    annualBreakdown: aggregateAmortizationByYear(rows)
  };
}
