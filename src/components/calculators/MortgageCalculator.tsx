"use client";

import type { CalculatorConfig } from "@/types/calculatorTypes";
import { useCalculatorEngine } from "./useCalculatorEngine";
import { CalculatorResult } from "./CalculatorResult";
import { MortgageScenarioResults } from "./MortgageScenarioResults";
import { renderInputControl } from "./CalculatorInputControl";
import { isInputRequired, isInputShown, resolveHelperText } from "@/lib/calculatorUi";

export function MortgageCalculator({ config }: { config: CalculatorConfig }) {
  const engine = useCalculatorEngine(config);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">Inputs</h2>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); engine.handleSubmit(); }}>
            {config.inputs.filter((input) => isInputShown(input, engine.values)).map((input) => {
              const value = engine.values[input.name] ?? "";
              const error = engine.errors[input.name];
              const helperText = resolveHelperText(input, engine.values);
              const helperId = `helper-${config.slug}-${input.name}`;
              const errorId = `error-${config.slug}-${input.name}`;
              const showHelper = Boolean(helperText) && !error;
              return (
                <div key={input.name} className="space-y-1">
                  <label htmlFor={`${config.slug}-${input.name}`} className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>{input.label}</span>
                    {isInputRequired(input, engine.values) ? <span className="text-[11px] font-normal text-slate-400">Required</span> : null}
                  </label>
                  {renderInputControl({
                    input: { ...input, name: `${config.slug}-${input.name}`, required: isInputRequired(input, engine.values) },
                    value,
                    values: engine.values,
                    onChange: (next) => engine.handleChange(input.name, next),
                    error,
                    helperId: showHelper ? helperId : undefined,
                    errorId: error ? errorId : undefined
                  })}
                  {showHelper ? <p id={helperId} className="text-xs text-slate-500">{helperText}</p> : null}
                  {error ? <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p> : null}
                </div>
              );
            })}
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Calculate</button>
              <button type="button" onClick={engine.handleReset} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Reset</button>
            </div>
          </form>
        </div>
        <CalculatorResult config={config} result={engine.result} hasSubmitted={engine.hasSubmitted} />
      </div>
      {engine.result?.mortgageScenarios ? <MortgageScenarioResults data={engine.result.mortgageScenarios} /> : null}
    </div>
  );
}
