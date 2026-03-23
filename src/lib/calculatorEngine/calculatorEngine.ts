import type {
  CalculatorConfig,
  CalculatorInputConfig,
  CalculatorResultShape,
  CalculatorFormValues
} from "@/types/calculatorTypes";
import { isInputRequired, isInputShown } from "@/lib/calculatorUi";

export type CalculatorErrors = Record<string, string | undefined>;

export function parseNumber(value: string): number | null {
  if (value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

export function validateInput(
  input: CalculatorInputConfig,
  rawValue: string,
  values: CalculatorFormValues
): string | undefined {
  if (!isInputShown(input, values)) return undefined;

  if (isInputRequired(input, values) && rawValue.trim() === "") {
    return input.type === "select" || input.type === "date" || input.type === "datetime"
      ? "Please choose a value."
      : "This field is required.";
  }

  if (input.type === "number" || input.type === "slider") {
    if (rawValue.trim() === "") return undefined;
    const n = parseNumber(rawValue);
    if (n === null) {
      return "Enter a valid number.";
    }
    if (input.min !== undefined && n < input.min) {
      return `Value must be at least ${input.min}.`;
    }
    if (input.max !== undefined && n > input.max) {
      return `Value must be at most ${input.max}.`;
    }
  }

  return undefined;
}

export function validateAll(
  config: CalculatorConfig,
  values: CalculatorFormValues
): CalculatorErrors {
  const errors: CalculatorErrors = {};
  for (const input of config.inputs) {
    const rawValue = values[input.name] ?? "";
    const error = validateInput(input, rawValue, values);
    if (error) errors[input.name] = error;
  }
  return errors;
}

export function parseValues(
  config: CalculatorConfig,
  values: CalculatorFormValues
): Record<string, number | string> {
  const parsed: Record<string, number | string> = {};
  for (const input of config.inputs) {
    if (!isInputShown(input, values)) continue;
    const rawValue = values[input.name] ?? "";
    if (input.type === "number" || input.type === "slider") {
      const n = parseNumber(rawValue);
      parsed[input.name] = n ?? 0;
    } else {
      parsed[input.name] = rawValue;
    }
  }
  return parsed;
}

export function runCalculation(
  config: CalculatorConfig,
  parsedValues: Record<string, number | string>
): CalculatorResultShape {
  return config.calculate(parsedValues);
}

export function getInitialValues(config: CalculatorConfig): CalculatorFormValues {
  const initial: CalculatorFormValues = {};
  config.inputs.forEach((input) => {
    initial[input.name] = input.defaultValue ?? "";
  });
  return initial;
}
