export type CurrencyCode = "GBP" | "EUR" | "USD";

// Mock exchange rates (structure allows swapping to an API later).
// Rates represent: 1 unit of FROM equals X units of TO.
export const mockExchangeRates: Record<
  CurrencyCode,
  Partial<Record<CurrencyCode, number>>
> = {
  GBP: { USD: 1.25, EUR: 1.15 },
  USD: { GBP: 0.8, EUR: 0.92 },
  EUR: { GBP: 0.87, USD: 1.08 }
};

export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode
): number {
  if (from === to) return amount;
  const rate = mockExchangeRates[from]?.[to];
  if (!rate) return NaN;
  return amount * rate;
}

export type UnitCategory = "length" | "weight" | "temperature";

export const unitOptions: Record<UnitCategory, { value: string; label: string }[]> =
  {
    length: [
      { value: "meters", label: "Meters (m)" },
      { value: "kilometers", label: "Kilometers (km)" },
      { value: "miles", label: "Miles (mi)" },
      { value: "feet", label: "Feet (ft)" }
    ],
    weight: [
      { value: "kg", label: "Kilograms (kg)" },
      { value: "grams", label: "Grams (g)" },
      { value: "pounds", label: "Pounds (lb)" }
    ],
    temperature: [
      { value: "celsius", label: "Celsius (°C)" },
      { value: "fahrenheit", label: "Fahrenheit (°F)" }
    ]
  };

function toBaseLength(value: number, unit: string): number {
  // base: meters
  switch (unit) {
    case "meters":
      return value;
    case "kilometers":
      return value * 1000;
    case "miles":
      return value * 1609.344;
    case "feet":
      return value * 0.3048;
    default:
      return NaN;
  }
}

function fromBaseLength(valueMeters: number, unit: string): number {
  switch (unit) {
    case "meters":
      return valueMeters;
    case "kilometers":
      return valueMeters / 1000;
    case "miles":
      return valueMeters / 1609.344;
    case "feet":
      return valueMeters / 0.3048;
    default:
      return NaN;
  }
}

function toBaseWeight(value: number, unit: string): number {
  // base: kilograms
  switch (unit) {
    case "kg":
      return value;
    case "grams":
      return value / 1000;
    case "pounds":
      return value * 0.45359237;
    default:
      return NaN;
  }
}

function fromBaseWeight(valueKg: number, unit: string): number {
  switch (unit) {
    case "kg":
      return valueKg;
    case "grams":
      return valueKg * 1000;
    case "pounds":
      return valueKg / 0.45359237;
    default:
      return NaN;
  }
}

function convertTemperature(value: number, from: string, to: string): number {
  if (from === to) return value;
  if (from === "celsius" && to === "fahrenheit") return value * (9 / 5) + 32;
  if (from === "fahrenheit" && to === "celsius") return (value - 32) * (5 / 9);
  return NaN;
}

export function convertUnit(
  category: UnitCategory,
  value: number,
  fromUnit: string,
  toUnit: string
): number {
  if (!Number.isFinite(value)) return NaN;
  if (fromUnit === toUnit) return value;

  switch (category) {
    case "length": {
      const meters = toBaseLength(value, fromUnit);
      return fromBaseLength(meters, toUnit);
    }
    case "weight": {
      const kg = toBaseWeight(value, fromUnit);
      return fromBaseWeight(kg, toUnit);
    }
    case "temperature":
      return convertTemperature(value, fromUnit, toUnit);
    default:
      return NaN;
  }
}

