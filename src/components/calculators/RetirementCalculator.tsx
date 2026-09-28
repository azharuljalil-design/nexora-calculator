"use client";

import type { CalculatorConfig } from "@/types/calculatorTypes";
import { useCalculatorEngine } from "./useCalculatorEngine";
import { renderInputControl } from "./CalculatorInputControl";
import { isInputRequired, resolveHelperText } from "@/lib/calculatorUi";
import { calculateRetirementProjection } from "@/lib/retirement";

function money(value: number, currency: string) {
  return new Intl.NumberFormat(currency === "GBP" ? "en-GB" : currency === "EUR" ? "de-DE" : "en-US", {
    style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(value);
}

export function RetirementCalculator({ config }: { config: CalculatorConfig }) {
  const engine = useCalculatorEngine(config);
  const snapshot = engine.lastCalculatedValues;
  const projection = snapshot ? calculateRetirementProjection({
    currentAge: Number(snapshot.currentAge), retirementAge: Number(snapshot.retirementAge),
    currentSavings: Number(snapshot.currentSavings), monthlyContribution: Number(snapshot.monthlyContribution),
    annualReturn: Number(snapshot.expectedAnnualReturn)
  }) : null;
  const currency = String(snapshot?.currency ?? "GBP");

  return <section className="retirement-calculator space-y-4" aria-labelledby="retirement-instructions">
    <div id="retirement-instructions" className="rounded-md bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white">
      Enter your details, then select Calculate to project your savings at retirement.
    </div>
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-md border border-slate-300 bg-slate-100">
        <h2 className="border-b border-slate-300 bg-slate-200 px-5 py-3 text-base font-bold text-slate-900">Your retirement savings details</h2>
        <form className="space-y-3 p-5" noValidate onSubmit={event => { event.preventDefault(); engine.handleSubmit(); }}>
          {config.inputs.map(input => {
            const error = engine.errors[input.name];
            const helper = resolveHelperText(input, engine.values);
            const errorId = `retirement-error-${input.name}`;
            const helperId = `retirement-helper-${input.name}`;
            return <div key={input.name} className="grid gap-1 sm:grid-cols-[12rem_1fr] sm:items-start">
              <label className="pt-2 text-sm font-semibold text-slate-800" htmlFor={`${config.slug}-${input.name}`}>{input.label}{isInputRequired(input, engine.values) ? <span className="sr-only"> (required)</span> : null}</label>
              <div>{renderInputControl({ input: {...input, name: `${config.slug}-${input.name}`}, value: engine.values[input.name] ?? "", values: engine.values, onChange: value => engine.handleChange(input.name, value), error, errorId: error ? errorId : undefined, helperId: helper && !error ? helperId : undefined })}
                {error ? <p id={errorId} role="alert" className="mt-1 text-xs font-semibold text-red-700">{error}</p> : helper ? <p id={helperId} className="mt-1 text-xs text-slate-600">{helper}</p> : null}
              </div>
            </div>;
          })}
          <div className="flex gap-3 pt-2 sm:pl-48">
            <button className="min-h-11 rounded-md bg-blue-700 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" type="submit">Calculate</button>
            <button className="min-h-11 rounded-md border border-slate-400 bg-white px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" type="button" onClick={engine.handleReset}>Reset</button>
          </div>
        </form>
      </div>
      <div className="overflow-hidden rounded-md border border-slate-300 bg-white" role="status" aria-live="polite">
        <h2 className="bg-green-700 px-5 py-3 text-lg font-bold text-white">Your savings projection</h2>
        <div className="p-5">
          {!projection ? <p className="text-sm text-slate-600">{engine.hasSubmitted ? "Please fix the highlighted inputs, then calculate again." : "Your results will appear here after you select Calculate."}</p> : <>
            <p className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-xs text-slate-700">Results from your last calculation. Edit the fields and select Calculate to update them.</p>
            <div className="rounded-md border border-green-200 bg-green-50 p-4 text-center">
              <p className="text-sm font-semibold text-green-900">Projected savings at retirement</p>
              <p className="break-words text-3xl font-bold tracking-tight text-green-800">{money(projection.projectedSavings, currency)}</p>
            </div>
            <dl className="mt-3 divide-y divide-slate-200">
              <div className="flex justify-between gap-4 py-2"><dt className="text-sm text-slate-700">Total contributions (including starting savings)</dt><dd className="text-right font-bold">{money(projection.totalContributions, currency)}</dd></div>
              <div className="flex justify-between gap-4 py-2"><dt className="text-sm text-slate-700">Total growth</dt><dd className={`text-right font-bold ${projection.totalGrowth < 0 ? "text-red-700" : ""}`}>{projection.totalGrowth < 0 ? `Loss: ${money(Math.abs(projection.totalGrowth), currency)}` : money(projection.totalGrowth, currency)}</dd></div>
              <div className="flex justify-between gap-4 py-2"><dt className="text-sm text-slate-700">Time until retirement</dt><dd className="text-right font-bold">{projection.months % 12 === 0 ? `${projection.months / 12} years (${projection.months} months)` : `${projection.months} months`}</dd></div>
            </dl>
            <BreakdownChart contributions={projection.totalContributions} growth={projection.totalGrowth} currency={currency} />
            <SavingsChart points={projection.yearlyPoints} currency={currency} />
          </>}
        </div>
      </div>
    </div>
  </section>;
}

function BreakdownChart({ contributions, growth, currency }: { contributions: number; growth: number; currency: string }) {
  const total = contributions + growth;
  if (contributions >= 0 && growth >= 0 && total > 0) {
    const contributionPct = contributions / total * 100;
    return <figure className="mt-5 border-t border-slate-200 pt-4">
      <figcaption className="mb-3 text-center text-sm font-bold text-slate-900">Contributions versus growth</figcaption>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <div className="relative h-32 w-32 shrink-0 rounded-full" style={{background: `conic-gradient(#2563eb 0 ${contributionPct}%, #65a30d ${contributionPct}% 100%)`}} role="img" aria-label={`Contributions ${money(contributions, currency)}; growth ${money(growth, currency)}`}><div className="absolute inset-7 rounded-full bg-white" /></div>
        <ul className="space-y-2 text-sm"><li><span className="mr-2 inline-block h-3 w-3 bg-blue-600"/><strong>Contributions:</strong> {money(contributions, currency)}</li><li><span className="mr-2 inline-block h-3 w-3 bg-lime-600"/><strong>Growth:</strong> {money(growth, currency)}</li></ul>
      </div>
    </figure>;
  }
  return <figure className="mt-5 border-t border-slate-200 pt-4"><figcaption className="text-center text-sm font-bold">Contributions and growth summary</figcaption><p className="mt-2 text-center text-sm text-slate-700">Contributions: {money(contributions, currency)}. {growth < 0 ? "Investment loss" : "Growth"}: {money(Math.abs(growth), currency)}. A doughnut chart is not shown because negative or all-zero values cannot be represented accurately.</p></figure>;
}

function SavingsChart({ points, currency }: { points: Array<{month:number; balance:number; contributions:number}>; currency:string }) {
  const values = points.flatMap(point => [point.balance, point.contributions]);
  const min = Math.min(0, ...values), max = Math.max(1, ...values), span = max - min;
  const coords = (key: "balance" | "contributions") => points.map((point, index) => `${points.length === 1 ? 0 : index / (points.length - 1) * 100},${88 - (point[key] - min) / span * 78}`).join(" ");
  const last = points[points.length - 1];
  return <figure className="mt-5 border-t border-slate-200 pt-4">
    <figcaption className="text-center text-sm font-bold text-slate-900">Savings over time</figcaption>
    <svg className="mt-2 h-44 w-full overflow-visible" viewBox="0 0 100 100" role="img" aria-label={`At retirement, projected balance is ${money(last.balance, currency)} and cumulative contributions are ${money(last.contributions, currency)}`} preserveAspectRatio="none">
      <line x1="0" y1="88" x2="100" y2="88" stroke="#cbd5e1" strokeWidth=".7"/><polyline points={coords("contributions")} fill="none" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/><polyline points={coords("balance")} fill="none" stroke="#65a30d" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
    </svg>
    <ul className="flex flex-wrap justify-center gap-4 text-xs"><li><span className="mr-1 inline-block h-2.5 w-2.5 bg-lime-600"/>Projected balance: {money(last.balance, currency)}</li><li><span className="mr-1 inline-block h-2.5 w-2.5 bg-blue-600"/>Cumulative contributions: {money(last.contributions, currency)}</li></ul>
  </figure>;
}
