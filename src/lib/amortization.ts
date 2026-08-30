import { calculateMonthlyPayment } from "./financialMath";

export type CalendarDate = {
  year: number;
  month: number;
  day: number;
};

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
}): AmortizationSchedule | null {
  const { principal, annualInterestRate, years } = args;
  const firstDate = parseCalendarDate(args.firstRepaymentDate);
  const paymentCount = years * 12;
  if (!firstDate || !Number.isInteger(paymentCount) || paymentCount <= 0) return null;

  const monthlyPayment = calculateMonthlyPayment({ principal, annualInterestRate, years });
  if (monthlyPayment === null) return null;

  const monthlyRate = annualInterestRate / 12 / 100;
  const rows: AmortizationRow[] = [];
  let balance = principal;

  for (let index = 0; index < paymentCount; index += 1) {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPayment = Math.min(Math.max(monthlyPayment - interest, 0), balance);
    const isFinalPayment = index === paymentCount - 1 || principalPayment >= balance;
    const paymentAmount = isFinalPayment ? principalPayment + interest : monthlyPayment;
    balance = isFinalPayment ? 0 : Math.max(balance - principalPayment, 0);
    rows.push({
      paymentNumber: index + 1,
      paymentDate: formatCalendarDate(addCalendarMonths(firstDate, index)),
      paymentAmount,
      principal: principalPayment,
      interest,
      remainingBalance: balance
    });
    if (balance === 0) break;
  }

  const totalRepayments = rows.reduce((total, row) => total + row.paymentAmount, 0);
  const totalInterest = rows.reduce((total, row) => total + row.interest, 0);
  return { monthlyPayment, totalRepayments, totalInterest, rows };
}
