"use client";

import Link from "next/link";
import type { CalculatorConfig } from "@/types/calculatorTypes";
import { useCalculatorEngine } from "./useCalculatorEngine";
import { renderInputControl } from "./CalculatorInputControl";
import { isInputRequired } from "@/lib/calculatorUi";
import { routes } from "@/lib/routes";
import { calculateMonthlyPayment } from "@/lib/financialMath";

export function LoanCalculator({ config }: { config: CalculatorConfig }) {
  const engine = useCalculatorEngine(config);
  const result = engine.result;
  const snapshot = engine.lastCalculatedValues;
  const principal = Number(snapshot?.loanAmount ?? 0);
  const months = Number(snapshot?.loanTermYears ?? 0) * 12;
  const payment = snapshot ? calculateMonthlyPayment({ principal, annualInterestRate: Number(snapshot.annualInterestRate), years: Number(snapshot.loanTermYears) }) : null;
  const total = payment === null ? 0 : payment * months;
  const interest = total - principal;
  const principalPct = total > 0 ? principal / total * 100 : 0;
  const interestPct = total > 0 ? interest / total * 100 : 0;
  const gradient = `conic-gradient(#2563eb 0 ${principalPct}%, #84cc16 ${principalPct}% 100%)`;
  const rows = [["Monthly repayment", result?.monthlyPayment], ["Number of monthly payments", months], ["Total repayment", result?.totalPayment], ["Total interest", result?.totalInterest]];

  return <section className="loan-calculator space-y-4" aria-labelledby="loan-instructions">
    <div id="loan-instructions" className="rounded-md bg-blue-700 px-4 py-3 text-center text-sm font-medium text-white">Enter your loan details, then select Calculate to view your estimated repayments.</div>
    <div className="grid items-stretch gap-5 md:grid-cols-2">
      <div className="rounded-lg border border-slate-300 bg-slate-100 p-5">
        <h2 className="mb-4 text-base font-bold text-slate-900">Loan details</h2>
        <form className="space-y-3" noValidate onSubmit={e => { e.preventDefault(); engine.handleSubmit(); }}>
          {config.inputs.map(input => {
            const error = engine.errors[input.name];
            const errorId = `loan-error-${input.name}`;
            return <div key={input.name} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:items-center">
              <label className="text-sm font-semibold text-slate-800" htmlFor={`${config.slug}-${input.name}`}>{input.label}{isInputRequired(input, engine.values) ? <span className="sr-only"> (required)</span> : null}</label>
              <div>{renderInputControl({ input: {...input, name: `${config.slug}-${input.name}`}, value: engine.values[input.name] ?? "", values: engine.values, onChange: value => engine.handleChange(input.name, value), error, errorId: error ? errorId : undefined })}{error ? <p id={errorId} role="alert" className="mt-1 text-xs font-medium text-red-700">{error}</p> : null}</div>
            </div>;
          })}
          <div className="flex gap-3 pt-2 sm:pl-44">
            <button className="min-h-11 rounded-md bg-blue-700 px-5 py-2 text-sm font-bold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" type="submit">Calculate</button>
            <button className="min-h-11 rounded-md border border-slate-400 bg-white px-5 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700" type="button" onClick={engine.handleReset}>Reset</button>
          </div>
        </form>
      </div>
      <div className="overflow-hidden rounded-lg border border-slate-300 bg-white" role="status" aria-live="polite">
        <h2 className="bg-green-700 px-5 py-3 text-lg font-bold text-white">Results</h2>
        <div className="p-5">
          {!result ? <p className="text-sm text-slate-600">{engine.hasSubmitted ? "Please fix the highlighted inputs, then calculate again." : "Your results will appear here after you select Calculate."}</p> : <>
            <p className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-xs text-slate-700">Results from your last calculation. Edit the fields and select Calculate to update them.</p>
            <dl className="divide-y divide-slate-200">{rows.map(([label, value]) => <div className="flex items-baseline justify-between gap-4 py-2" key={String(label)}><dt className="text-sm text-slate-700">{String(label)}</dt><dd className="text-right text-base font-bold text-slate-950">{String(value)}</dd></div>)}</dl>
            <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-center" aria-label="Principal and total interest proportions">
              <div className="relative h-36 w-36 shrink-0 rounded-full" style={{background: gradient}} role="img" aria-label={`Principal ${principalPct.toFixed(1)} percent; total interest ${interestPct.toFixed(1)} percent`}><div className="absolute inset-8 rounded-full bg-white" /></div>
              <ul className="space-y-2 text-sm"><li><span className="mr-2 inline-block h-3 w-3 rounded-sm bg-blue-600"/><strong>Principal:</strong> {principalPct.toFixed(1)}%</li><li><span className="mr-2 inline-block h-3 w-3 rounded-sm bg-lime-500"/><strong>Total interest:</strong> {interestPct.toFixed(1)}%</li></ul>
            </div>
          </>}
        </div>
      </div>
    </div>
    <p className="text-center text-sm"><Link className="font-semibold" href={routes.calculator("amortization-calculator")}>Use the Amortization Calculator for a month-by-month breakdown</Link></p>
  </section>;
}
