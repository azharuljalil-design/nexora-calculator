type SupportedCurrency = "GBP" | "EUR" | "USD";

const currencyLocales: Record<SupportedCurrency, string> = {
  GBP: "en-GB",
  EUR: "de-DE",
  USD: "en-US"
};

export function formatCurrency(
  value: number,
  currency: SupportedCurrency
): string {
  const locale = currencyLocales[currency] ?? "en-US";
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(digits);
}

export function formatPercent(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(digits)}%`;
}

export function formatInteger(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
}

