"use client";

import type { CalculatorConfig } from "@/types/calculatorTypes";
import { useCalculatorEngine } from "./useCalculatorEngine";
import { MortgageScenarioResults } from "./MortgageScenarioResults";
import { renderInputControl } from "./CalculatorInputControl";
import { isInputRequired, isInputShown, resolveHelperText } from "@/lib/calculatorUi";

export function MortgageCalculator({ config }: { config: CalculatorConfig }) {
  const engine = useCalculatorEngine(config);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white">Enter your property, deposit and mortgage details, then select Calculate to view your estimated repayments.</div>
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <div className="space-y-4 rounded-lg border border-slate-300 bg-slate-100 p-4">
          <h2 className="text-base font-semibold text-slate-900">Mortgage details</h2>
          <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); engine.handleSubmit(); }}>
            {config.inputs.filter((input) => isInputShown(input, engine.values)).map((input) => {
              const value = engine.values[input.name] ?? "";
              const error = engine.errors[input.name];
              const helperText = resolveHelperText(input, engine.values);
              const helperId = `helper-${config.slug}-${input.name}`;
              const errorId = `error-${config.slug}-${input.name}`;
              const showHelper = Boolean(helperText) && !error;
              return (
                <div key={input.name} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center">
                  <label htmlFor={`${config.slug}-${input.name}`} className="flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>{input.label}</span>
                    {isInputRequired(input, engine.values) ? <span className="text-[11px] font-normal text-slate-400">Required</span> : null}
                  </label>
                  <div>{renderInputControl({
                    input: { ...input, name: `${config.slug}-${input.name}`, required: isInputRequired(input, engine.values) },
                    value, values: engine.values, onChange: (next) => engine.handleChange(input.name, next), error,
                    helperId: showHelper ? helperId : undefined, errorId: error ? errorId : undefined
                  })}{showHelper ? <p id={helperId} className="mt-1 text-[11px] leading-4 text-slate-500">{helperText}</p> : null}{error ? <p id={errorId} role="alert" className="mt-1 text-xs text-red-600">{error}</p> : null}</div>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Calculate</button>
              <button type="button" onClick={engine.handleReset} className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Reset</button>
            </div>
          </form>
        </div>
        <MortgageOverview result={engine.result} hasSubmitted={engine.hasSubmitted} />
      </div>
      {engine.result?.mortgageScenarios ? <MortgageScenarioResults data={engine.result.mortgageScenarios} /> : null}
    </div>
  );
}

function MortgageOverview({ result, hasSubmitted }: { result: any; hasSubmitted: boolean }) {
  const data = result?.mortgageScenarios;
  if (!data) return <section className="rounded-lg border border-slate-200 bg-white p-5"><h2 className="-m-5 mb-4 rounded-t-lg bg-secondary px-5 py-3 text-lg font-semibold text-white">Your monthly repayment</h2><p className="text-sm text-slate-600">{hasSubmitted ? "Please correct the highlighted inputs and calculate again." : "Your repayment estimate and mortgage summary will appear here."}</p></section>;
  const a = data.assumptions, c = data.comparison;
  const capital = a.mortgageAmount, total = c.originalTotalRepayments;
  const capitalShare = total > 0 ? capital / total * 100 : 0;
  const fmt = (n: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: data.currency, maximumFractionDigits: 2 }).format(n);
  const rows = [["Property price", fmt(a.propertyPrice)], ["Deposit", `${fmt(a.depositAmount)} (${a.depositPercentage.toFixed(2)}%)`], ["Mortgage amount", fmt(a.mortgageAmount)], ["Loan-to-value (LTV)", `${a.ltv.toFixed(2)}%`], ["Total mortgage repayments", fmt(c.originalTotalRepayments)], ["Total interest", fmt(c.originalTotalInterest)], ["Estimated payoff date", c.originalPayoffDate]];
  return <section className="overflow-hidden rounded-lg border border-slate-300 bg-white" role="status" aria-live="polite">
    <h2 className="bg-secondary px-5 py-3 text-lg font-semibold text-white">Your monthly repayment</h2>
    <p className="border-b border-slate-200 px-5 py-5 text-center text-4xl font-bold tabular-nums text-primary">{fmt(c.regularPayment)}</p>
    <div className="grid gap-5 p-5 sm:grid-cols-[minmax(0,1fr)_10rem]">
      <dl className="divide-y divide-slate-100 text-sm">{rows.map(([label,value]) => <div key={label} className="flex justify-between gap-4 py-2"><dt className="text-slate-600">{label}</dt><dd className="text-right font-semibold tabular-nums text-slate-900">{value}</dd></div>)}</dl>
      <figure className="self-center text-center"><div className="mx-auto h-32 w-32 rounded-full" style={{background:`radial-gradient(circle, white 0 48%, transparent 49%), conic-gradient(#2563eb 0 ${capitalShare}%, #f59e0b ${capitalShare}% 100%)`}} role="img" aria-label={`Capital ${fmt(capital)}; total interest ${fmt(c.originalTotalInterest)}`} /><figcaption className="mt-3 space-y-1 text-xs text-slate-700"><span className="block"><i className="mr-1 inline-block h-3 w-3 bg-blue-600" />Capital {fmt(capital)}</span><span className="block"><i className="mr-1 inline-block h-3 w-3 bg-amber-500" />Interest {fmt(c.originalTotalInterest)}</span></figcaption></figure>
    </div>
  </section>;
}
