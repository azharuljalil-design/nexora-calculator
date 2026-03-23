import type { CalculatorFormValues, CalculatorInputConfig } from "@/types/calculatorTypes";

export function isInputShown(
  input: CalculatorInputConfig,
  values: CalculatorFormValues
): boolean {
  if (input.showWhen) return input.showWhen(values);
  return true;
}

export function isInputRequired(
  input: CalculatorInputConfig,
  values: CalculatorFormValues
): boolean {
  if (input.required) return true;
  if (input.requiredWhen) return input.requiredWhen(values);
  return false;
}

export function resolveHelperText(
  input: CalculatorInputConfig,
  values: CalculatorFormValues
): string | null {
  if (!input.helperText) return null;
  if (typeof input.helperText === "function") return input.helperText(values);
  return input.helperText;
}

