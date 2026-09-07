import type { AmortizationRow, AmortizationSchedule } from "./amortization";
import type { CurrencyCode } from "./conversions";

export type DisplayAmortizationRow = Omit<AmortizationRow, "paymentAmount">;

function allocateCents(values: number[], target: number): number[] {
  const safe = values.map((value) => Math.max(0, Number.isFinite(value) ? value : 0) * 100);
  const floors = safe.map(Math.floor);
  let remaining = target - floors.reduce((sum, value) => sum + value, 0);
  const order = safe.map((value, index) => ({ index, fraction: value - floors[index] }))
    .sort((a, b) => b.fraction - a.fraction || a.index - b.index);
  for (let cursor = 0; remaining > 0; cursor += 1, remaining -= 1) floors[order[cursor % order.length].index] += 1;
  for (let cursor = order.length - 1; remaining < 0; cursor -= 1, remaining += 1) {
    const item = order[(cursor + order.length) % order.length];
    if (floors[item.index] > 0) floors[item.index] -= 1;
  }
  return floors.map((value) => value / 100);
}

/** Converts one full-precision engine row into a cent-reconciled presentation row. */
export function reconcileAmortizationRow(row: AmortizationRow, final = false): DisplayAmortizationRow {
  const totalCents = Math.max(0, Math.round(row.totalPayment * 100));
  const [regularPaymentAmount, monthlyOverpayment, oneTimeOverpayment] = allocateCents(
    [row.regularPaymentAmount, row.monthlyOverpayment, row.oneTimeOverpayment], totalCents
  );
  const [principal, interest] = allocateCents([row.principal, row.interest], totalCents);
  return {
    paymentNumber: row.paymentNumber,
    paymentDate: row.paymentDate,
    regularPaymentAmount,
    monthlyOverpayment,
    oneTimeOverpayment,
    totalPayment: totalCents / 100,
    principal,
    interest,
    remainingBalance: final ? 0 : Math.max(0, Math.round(row.remainingBalance * 100) / 100)
  };
}

export function reconcileSchedule(schedule: AmortizationSchedule): DisplayAmortizationRow[] {
  return schedule.rows.map((row, index) => reconcileAmortizationRow(row, index === schedule.rows.length - 1));
}

export const CSV_HEADINGS = ["Payment number", "Payment date", "Regular payment", "Monthly overpayment", "One-time overpayment", "Total payment", "Principal", "Interest", "Remaining balance"] as const;

export function escapeCsvField(value: string): string {
  const protectedValue = /^[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${protectedValue.replace(/"/g, '""')}"`;
}

export function createMortgageCsv(schedule: AmortizationSchedule, currency: CurrencyCode): string {
  const lines = [
    ["Currency code", currency],
    [...CSV_HEADINGS],
    ...reconcileSchedule(schedule).map((row) => [row.paymentNumber, row.paymentDate, row.regularPaymentAmount.toFixed(2), row.monthlyOverpayment.toFixed(2), row.oneTimeOverpayment.toFixed(2), row.totalPayment.toFixed(2), row.principal.toFixed(2), row.interest.toFixed(2), row.remainingBalance.toFixed(2)])
  ];
  return `\uFEFF${lines.map((line) => line.map((field) => escapeCsvField(String(field))).join(",")).join("\r\n")}\r\n`;
}

export function mortgageCsvFilename(scenario: "original" | "overpayment", calculationDate = new Date()): string {
  const date = calculationDate.toISOString().slice(0, 10);
  return `nexora-mortgage-${scenario}-${date}.csv`;
}
