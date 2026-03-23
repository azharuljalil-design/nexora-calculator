"use client";

import type {
  CalculatorConfig,
  CalculatorFormValues,
  CalculatorInputConfig
} from "@/types/calculatorTypes";
import { useCalculatorEngine } from "./useCalculatorEngine";
import { CalculatorResult } from "./CalculatorResult";
import { renderInputControl } from "@/components/calculators/CalculatorInputControl";
import {
  isInputRequired,
  isInputShown,
  resolveHelperText
} from "@/lib/calculatorUi";

type CalculatorFormProps = {
  config: CalculatorConfig;
};

export function CalculatorForm({ config }: CalculatorFormProps) {
  const {
    values,
    errors,
    result,
    hasSubmitted,
    handleChange,
    handleSubmit,
    handleReset
  } = useCalculatorEngine(config);

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-800">
          Inputs
        </h2>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          {config.inputs.filter((input) => isInputShown(input, values)).map((input) => {
            const value = values[input.name] ?? "";
            const error = errors[input.name];
            const helperText = resolveHelperText(input, values);
            const helperId = `helper-${config.slug ?? ""}-${input.name}`;
            const errorId = `error-${config.slug ?? ""}-${input.name}`;
            const shouldShowHelper = Boolean(helperText) && !error;
            return (
              <div key={input.name} className="space-y-1">
                <label className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <span>{input.label}</span>
                  {isInputRequired(input, values) ? (
                    <span className="text-[11px] font-normal text-slate-400">
                      Required
                    </span>
                  ) : null}
                </label>
                {renderInputControl(
                  {
                    input,
                    value,
                    values,
                    onChange: (val) => handleChange(input.name, val),
                    error,
                    helperId: shouldShowHelper ? helperId : undefined,
                    errorId: error ? errorId : undefined
                  }
                )}
                {shouldShowHelper ? (
                  <p id={helperId} className="text-xs text-slate-500">
                    {helperText}
                  </p>
                ) : null}
                {error ? (
                  <p
                    id={errorId}
                    role="alert"
                    className="text-xs text-red-500"
                  >
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              Calculate
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <CalculatorResult
        config={config}
        result={result}
        hasSubmitted={hasSubmitted}
      />
    </div>
  );
}

