"use client";

import { useMemo } from "react";
import type { CalculatorConfig } from "@/types/calculatorTypes";
import { useCalculatorEngine } from "@/components/calculators/useCalculatorEngine";
import { CalculatorResult } from "@/components/calculators/CalculatorResult";
import { isInputRequired, resolveHelperText } from "@/lib/calculatorUi";

type ScientificCalculatorProps = {
  config: CalculatorConfig;
  mode?: "default" | "homepage";
};

const keypadRows: Array<Array<{ label: string; insert: string }>> = [
  [
    { label: "(", insert: "(" },
    { label: ")", insert: ")" },
    { label: "pi", insert: "pi" },
    { label: "^", insert: "^" }
  ],
  [
    { label: "sin", insert: "sin(" },
    { label: "cos", insert: "cos(" },
    { label: "tan", insert: "tan(" },
    { label: "sqrt", insert: "sqrt(" }
  ],
  [
    { label: "log", insert: "log(" },
    { label: "ln", insert: "ln(" },
    { label: "/", insert: "/" },
    { label: "*", insert: "*" }
  ],
  [{ label: "%", insert: "/100" }],
  [
    { label: "7", insert: "7" },
    { label: "8", insert: "8" },
    { label: "9", insert: "9" },
    { label: "-", insert: "-" }
  ],
  [
    { label: "4", insert: "4" },
    { label: "5", insert: "5" },
    { label: "6", insert: "6" },
    { label: "+", insert: "+" }
  ],
  [
    { label: "1", insert: "1" },
    { label: "2", insert: "2" },
    { label: "3", insert: "3" },
    { label: ".", insert: "." }
  ],
  [
    { label: "0", insert: "0" }
  ]
];

export function ScientificCalculator({
  config,
  mode = "default"
}: ScientificCalculatorProps) {
  const isHomepage = mode === "homepage";
  const engine = useCalculatorEngine(config);
  const expression = engine.values.expression ?? "";
  const inputConfig = config.inputs.find((i) => i.name === "expression") ?? null;
  const inputError = engine.errors.expression;
  const helperText = inputConfig
    ? resolveHelperText(inputConfig, engine.values)
    : null;

  const tips = useMemo(
    () =>
      "Examples: sqrt(16), sin(0), log(100), (2+3)*4, pi^2. Use % for percentage (inserts /100).",
    []
  );

  function append(text: string) {
    engine.handleChange("expression", `${expression}${text}`);
  }

  function backspace() {
    engine.handleChange("expression", expression.slice(0, -1));
  }

  function clear() {
    engine.handleChange("expression", "");
  }

  return (
    <div
      className={
        isHomepage
          ? "grid gap-8 md:grid-cols-[minmax(0,4fr)_minmax(0,1.2fr)] md:items-start"
          : "grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
      }
    >
      <div
        className={
          isHomepage
            ? "space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            : "space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        }
      >
        <h2 className="text-sm font-semibold text-slate-800">Inputs</h2>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            engine.handleSubmit();
          }}
        >
          <div className="space-y-1">
            <label className="flex items-center justify-between text-xs font-medium text-slate-700">
              <span>Expression</span>
              <span className="text-[11px] font-normal text-slate-400">
                {inputConfig && isInputRequired(inputConfig, engine.values)
                  ? "Required"
                  : "Optional"}
              </span>
            </label>
            <input
              type="text"
              aria-invalid={inputError ? true : undefined}
              aria-describedby={
                inputError ? "expression-error" : "expression-helper"
              }
              value={expression}
              onChange={(e) => engine.handleChange("expression", e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
              placeholder="e.g. (2+3)*4"
            />
            {inputError ? (
              <p
                id="expression-error"
                role="alert"
                className="text-xs text-red-500"
              >
                {inputError}
              </p>
            ) : (
              <p id="expression-helper" className="text-xs text-slate-500">
                {helperText ?? tips}
              </p>
            )}
          </div>

          <div className={isHomepage ? "grid gap-3" : "grid gap-2"}>
            {keypadRows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 gap-2">
                {row.map((k) => (
                  <button
                    key={k.label}
                    type="button"
                    onClick={() => append(k.insert)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
                  >
                    {k.label}
                  </button>
                ))}
                {row.length === 1 ? (
                  <>
                    <div />
                    <div />
                    <div />
                  </>
                ) : null}
              </div>
            ))}

            <div className="flex flex-wrap gap-2 pt-2 md:flex-nowrap">
              <button
                type="button"
                onClick={backspace}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Backspace
              </button>
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Clear
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
              >
                Equals
              </button>
              <button
                type="button"
                onClick={engine.handleReset}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className={isHomepage ? "md:max-w-xs md:justify-self-end" : undefined}>
        <CalculatorResult
          config={config}
          result={engine.result}
          hasSubmitted={engine.hasSubmitted}
        />
      </div>
    </div>
  );
}

