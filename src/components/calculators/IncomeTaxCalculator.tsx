"use client";

import type { CalculatorConfig } from "@/types/calculatorTypes";
import { calculateIncomeTax, type TaxRegion, type IncomePeriod } from "@/lib/incomeTax";
import { useCalculatorEngine } from "./useCalculatorEngine";
import { renderInputControl } from "./CalculatorInputControl";
import { resolveHelperText } from "@/lib/calculatorUi";

const money = (value: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
export function IncomeTaxCalculator({ config }: { config: CalculatorConfig }) {
  const engine = useCalculatorEngine(config);
  const snapshot = engine.lastCalculatedValues;
  const result = engine.result && snapshot ? calculateIncomeTax({ income: Number(snapshot.income), period: String(snapshot.period) as IncomePeriod, region: String(snapshot.region) as TaxRegion, taxYear: String(snapshot.taxYear) }) : null;
  return <section className="space-y-5" aria-label="UK employment income tax estimate">
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50">
        <h2 className="border-b border-slate-300 bg-slate-200 px-5 py-3 font-bold">Your income details</h2>
        <form noValidate className="space-y-5 p-4 sm:p-6" onSubmit={event => { event.preventDefault(); engine.handleSubmit(); }}>
          {config.inputs.map(input => {
            const error = engine.errors[input.name], helper = resolveHelperText(input, engine.values);
            const id = `${config.slug}-${input.name}`, errorId = `${id}-error`, helperId = `${id}-help`;
            return <div key={input.name} className="space-y-1">
              <label htmlFor={id} className="block text-sm font-semibold">{input.label}<span className="sr-only"> (required)</span></label>
              {renderInputControl({ input: { ...input, name: id }, values: engine.values, value: engine.values[input.name] ?? "", onChange: value => engine.handleChange(input.name, value), error, errorId: error ? errorId : undefined, helperId: !error && helper ? helperId : undefined })}
              {error ? <p id={errorId} role="alert" className="text-sm text-red-700">{error}</p> : helper ? <p id={helperId} className="text-xs text-slate-600">{helper}</p> : null}
            </div>;
          })}
          <div className="flex flex-wrap gap-3"><button type="submit" className="min-h-11 rounded-md bg-blue-700 px-5 py-2 font-bold text-white hover:bg-blue-800">Calculate</button><button type="button" onClick={engine.handleReset} className="min-h-11 rounded-md border border-slate-400 bg-white px-5 py-2 font-semibold">Reset</button></div>
        </form>
      </div>
      <div className="min-w-0 rounded-md border border-slate-300 bg-white" aria-live="polite" role="status">
        <h2 className="rounded-t-md bg-green-700 px-5 py-3 font-bold text-white">Your estimated take-home pay</h2>
        <div className="space-y-5 p-4 sm:p-6">{!result ? <p className="text-sm text-slate-600">{engine.hasSubmitted ? "Please fix the highlighted inputs and calculate again." : "Select Calculate to see your results."}</p> : <>
          <p className="text-xs text-slate-600">{result.region} · {result.taxYear} · Results from your last calculation. Select Calculate after editing inputs.</p>
          <div className="rounded-md bg-green-50 p-4 text-center"><p className="text-sm font-semibold text-green-900">Monthly take-home estimate (annual average)</p><p className="break-words text-3xl font-bold tabular-nums text-green-800">{money(result.net / 12)}</p></div>
          <div className="overflow-x-auto" role="region" aria-label="Income and deductions by period" tabIndex={0}><table className="w-full text-right text-sm"><caption className="sr-only">Income and deductions by period; monthly and weekly figures are annual averages</caption><thead><tr><th className="py-2 text-left" scope="col">Breakdown</th>{["Annual", "Monthly", "Weekly"].map(label => <th key={label} scope="col" className="px-2">{label}</th>)}</tr></thead><tbody>{[["Gross pay", result.gross], ["Income Tax", result.incomeTax], ["National Insurance", result.nationalInsurance], ["Take-home pay", result.net]].map(([label, value]) => <tr key={label} className="border-t border-slate-200"><th scope="row" className="py-3 text-left font-medium">{label}</th>{[1, 12, 52].map(divisor => <td key={divisor} className="px-2">{money(Number(value) / divisor)}</td>)}</tr>)}</tbody></table></div>
          <p className="text-sm">Personal Allowance: <strong>{money(result.allowance)}</strong>. Taxable income: <strong>{money(result.taxable)}</strong>. Effective Income Tax rate: <strong>{result.effectiveTaxRate.toFixed(2)}%</strong>. Total deduction rate: <strong>{result.deductionRate.toFixed(2)}%</strong>.</p>
          {result.gross > 0 && <figure><figcaption className="mb-2 text-sm font-semibold">Where your annual pay goes</figcaption><div className="flex h-5 overflow-hidden rounded" role="img" aria-label={`Take-home pay ${money(result.net)}, Income Tax ${money(result.incomeTax)}, National Insurance ${money(result.nationalInsurance)}`}><div className="bg-green-700" style={{width: `${result.net / result.gross * 100}%`}}/><div className="bg-blue-700" style={{width: `${result.incomeTax / result.gross * 100}%`}}/><div className="bg-amber-600" style={{width: `${result.nationalInsurance / result.gross * 100}%`}}/></div><p className="mt-2 text-xs">Green: take-home pay · Blue: Income Tax · Amber: National Insurance</p></figure>}
          <details><summary className="cursor-pointer font-semibold">Income Tax by band</summary><div className="overflow-x-auto" role="region" aria-label="Income Tax by band" tabIndex={0}><table className="mt-2 w-full text-right text-sm"><caption className="sr-only">Tax charged on annual taxable income in each band</caption><thead><tr><th scope="col" className="text-left">Band</th><th scope="col">Rate</th><th scope="col">Income in band</th><th scope="col">Tax</th></tr></thead><tbody>{result.bands.map(band => <tr key={band.name} className="border-t border-slate-200"><th scope="row" className="py-2 text-left font-medium">{band.name}</th><td>{band.rate * 100}%</td><td>{money(band.amount)}</td><td>{money(band.tax)}</td></tr>)}</tbody></table></div></details>
        </>}</div>
      </div>
    </div>
    <aside className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700" aria-label="Calculator assumptions">
      <p><strong>Employment-income estimate only.</strong> Uses the standard Personal Allowance and its taper above £100,000, plus annualised category A employee National Insurance for someone below State Pension age. Monthly and weekly results are annual averages.</p>
      <p className="mt-2">Pensions, salary sacrifice, student loans, dividends, savings, self-employment, taxable benefits, Marriage Allowance and other reliefs are not included. Actual payroll may differ because of tax codes, pay-period thresholds and rounding. See the guide below for educational information and official sources.</p>
    </aside>
  </section>;
}
