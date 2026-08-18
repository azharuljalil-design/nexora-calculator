import { calculateMonthlyPayment } from "./financialMath";

export type AmortizationRow = {
  paymentNumber: number;
  paymentDate: string;
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
};

/** Parse an ISO date without constructing a UTC timestamp. */
export function isValidCalendarDate(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  return day <= new Date(year, month, 0).getDate();
}

/**
 * Advance from the original calendar date, retaining its day where possible and
 * otherwise using that month's last day (31 Jan -> 28/29 Feb -> 31 Mar).
 */
export function addCalendarMonths(value: string, months: number): string {
  if (!isValidCalendarDate(value) || !Number.isInteger(months)) return "";
  const [year, month, day] = value.split("-").map(Number);
  const monthIndex = month - 1 + months;
  const targetYear = year + Math.floor(monthIndex / 12);
  const targetMonthIndex = ((monthIndex % 12) + 12) % 12;
  const targetDay = Math.min(day, new Date(targetYear, targetMonthIndex + 1, 0).getDate());
  return `${String(targetYear).padStart(4, "0")}-${String(targetMonthIndex + 1).padStart(2, "0")}-${String(targetDay).padStart(2, "0")}`;
}

export function buildAmortizationSchedule(args: {
  principal: number;
  annualInterestRate: number;
  years: number;
  firstPaymentDate?: string;
}): AmortizationSchedule | null {
  const { principal, annualInterestRate, years, firstPaymentDate = "" } = args;
  const paymentCount = years * 12;
  if (firstPaymentDate && !isValidCalendarDate(firstPaymentDate)) return null;
  if (!Number.isInteger(paymentCount) || paymentCount <= 0) return null;
  const monthlyPayment = calculateMonthlyPayment({ principal, annualInterestRate, years });
  if (monthlyPayment === null) return null;

  const monthlyRate = annualInterestRate / 12 / 100;
  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let index = 0; index < paymentCount; index += 1) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPaid = Math.min(Math.max(monthlyPayment - interest, 0), balance);
    const isFinalScheduledPayment = index === paymentCount - 1 || principalPaid >= balance;
    const finalPrincipal = isFinalScheduledPayment ? balance : principalPaid;
    const paymentAmount = finalPrincipal + interest;
    balance = isFinalScheduledPayment ? 0 : Math.max(balance - finalPrincipal, 0);
    rows.push({
      paymentNumber: index + 1,
      paymentDate: firstPaymentDate ? addCalendarMonths(firstPaymentDate, index) : "",
      paymentAmount,
      principal: finalPrincipal,
      interest,
      remainingBalance: balance
    });
    if (balance === 0) break;
  }

  const totalRepayments = rows.reduce((sum, row) => sum + row.paymentAmount, 0);
  const totalInterest = rows.reduce((sum, row) => sum + row.interest, 0);
  return { monthlyPayment, totalRepayments, totalInterest, rows };
}
