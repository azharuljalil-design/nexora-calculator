"use client";

import { useState } from "react";
import type {
  CalculatorConfig,
  CalculatorResultShape
} from "@/types/calculatorTypes";
import {
  getInitialValues,
  validateAll,
  parseValues,
  runCalculation,
  type CalculatorErrors
} from "@/lib/calculatorEngine/calculatorEngine";

export function useCalculatorEngine(config: CalculatorConfig) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    getInitialValues(config)
  );
  const [errors, setErrors] = useState<CalculatorErrors>({});
  const [result, setResult] = useState<CalculatorResultShape | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleReset() {
    setValues(getInitialValues(config));
    setErrors({});
    setResult(null);
    setHasSubmitted(false);
  }

  function handleSubmit() {
    const newErrors = validateAll(config, values);
    setErrors(newErrors);
    setHasSubmitted(true);

    const hasError = Object.keys(newErrors).length > 0;
    if (hasError) {
      setResult(null);
      return;
    }

    const parsedValues = parseValues(config, values);
    const calculation = runCalculation(config, parsedValues);
    setResult(calculation);
  }

  return {
    values,
    errors,
    result,
    hasSubmitted,
    handleChange,
    handleSubmit,
    handleReset
  };
}
