"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { AmortizationSchedule, AnnualAmortizationSummary } from "@/lib/amortization";
import { formatCurrency } from "@/lib/format";
import type { CurrencyCode } from "@/lib/conversions";
import { createMortgageCsv, mortgageCsvFilename, reconcileSchedule, type DisplayAmortizationRow } from "@/lib/mortgageOutputs";

type ScenarioData = {
  currency: CurrencyCode;
  hasOverpayment: boolean;
  monthlyOverpayment: number;
  oneTimeOverpayment: number;
  assumptions: {
    propertyPrice: number; depositAmount: number; depositPercentage: number; mortgageAmount: number; ltv: number;
    annualInterestRate: number; termYears: number; firstRepaymentDate: string; monthlyOverpayment: number;
    oneTimeOverpayment: number; oneTimeOverpaymentDate: string | null; annualPropertyTax: number;
    annualHomeInsurance: number; monthlyHOA: number;
  };
  original: AmortizationSchedule;
  revised: AmortizationSchedule;
  comparison: {
    regularPayment: number;
    originalPayments: number;
    revisedPayments: number;
    originalPayoffDate: string;
    revisedPayoffDate: string;
    originalTotalRepayments: number;
    revisedTotalRepayments: number;
    originalTotalInterest: number;
    revisedTotalInterest: number;
    interestSaved: number;
    paymentsSaved: number;
    repaymentTimeSaved: string;
  };
};

const PAGE_SIZE = 12;

export function MortgageScenarioResults({ data }: { data: unknown }) {
  const scenarios = data as ScenarioData;
  const [selected, setSelected] = useState<"original" | "revised">("original");
  const [expanded, setExpanded] = useState(true);
  const [scheduleView, setScheduleView] = useState<"annual" | "monthly">("annual");
  const [visibleRows, setVisibleRows] = useState(PAGE_SIZE);
  const scheduleId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const selectedSchedule = selected === "revised" && scenarios.hasOverpayment ? scenarios.revised : scenarios.original;
  const scenarioName = selected === "revised" && scenarios.hasOverpayment ? "Overpayment" : "Original";
  const displayRows = reconcileSchedule(selectedSchedule);

  function downloadCsv() {
    const blob = new Blob([createMortgageCsv(selectedSchedule, scenarios.currency)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = mortgageCsvFilename(scenarioName === "Overpayment" ? "overpayment" : "original");
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  useEffect(() => {
    if (!scenarios.hasOverpayment && selected === "revised") setSelected("original");
    setVisibleRows(PAGE_SIZE);
  }, [scenarios, selected]);

  function chooseScenario(next: "original" | "revised") {
    setSelected(next);
    setVisibleRows(PAGE_SIZE);
  }

  return (
    <div className="mortgage-results space-y-6">
      <div className="no-print flex flex-wrap gap-3">
        <button type="button" onClick={() => window.print()} className="min-h-11 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Print / Save as PDF</button>
        <button type="button" onClick={downloadCsv} className="min-h-11 rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Download schedule CSV</button>
        <p className="basis-full text-xs text-slate-600">The CSV is created locally in your browser; no schedule data is uploaded.</p>
      </div>
      <div className="print-only"><h1>NexoraCalculator Mortgage Calculator</h1><p>Printed: {new Date().toLocaleDateString()}</p></div>
      <Assumptions data={scenarios} />
      <section aria-labelledby="scenario-heading" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <h2 id="scenario-heading" className="text-base font-semibold text-slate-800">Original versus overpayment</h2>
          <p className="mt-1 text-xs text-slate-600">Baseline and revised estimates exclude property tax, insurance, and HOA/service charges.</p>
        </div>
        {scenarios.hasOverpayment ? <Comparison data={scenarios} /> : (
          <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">Only the original scenario is shown. Enter a monthly or one-time overpayment to compare a revised outcome; any savings shown would be estimates, not guaranteed.</p>
        )}
      </section>

      <section aria-labelledby="schedule-heading" className="no-print rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="schedule-heading" className="text-xl font-bold text-slate-900">Mortgage repayment schedule</h2>
            <p className="mt-1 text-xs text-slate-600">Payments, interest and capital are taken from the selected scenario. Chart interest and payments are cumulative.</p>
          </div>
          <button ref={toggleRef} type="button" aria-expanded={expanded} aria-controls={scheduleId} onClick={() => { setExpanded((value) => !value); if (expanded) requestAnimationFrame(() => toggleRef.current?.focus()); }} className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {expanded ? "Hide repayment schedule" : "Show repayment schedule"}
          </button>
        </div>
        {!scenarios.hasOverpayment ? <p className="mt-3 text-xs text-slate-600">An overpayment schedule becomes available after entering an overpayment.</p> : null}
        {expanded ? (
          <div id={scheduleId} className="mt-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div role="group" aria-label="Repayment schedule view" className="inline-flex rounded-lg border border-slate-300 p-1"><button type="button" aria-pressed={scheduleView === "annual"} onClick={() => setScheduleView("annual")} className={`rounded px-3 py-1.5 text-xs font-semibold ${scheduleView === "annual" ? "bg-primary text-white" : "text-slate-700"}`}>Annual</button><button type="button" aria-pressed={scheduleView === "monthly"} onClick={() => setScheduleView("monthly")} className={`rounded px-3 py-1.5 text-xs font-semibold ${scheduleView === "monthly" ? "bg-primary text-white" : "text-slate-700"}`}>Monthly</button></div>
              <ScenarioSelector selected={selected} hasOverpayment={scenarios.hasOverpayment} onSelect={chooseScenario} />
            </div>
            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(20rem,2fr)]">
              {scheduleView === "monthly" ? <ScheduleTable rows={displayRows.slice(0, visibleRows)} scenario={scenarioName} currency={scenarios.currency} /> : <AnnualDataTable rows={selectedSchedule.annualBreakdown} currency={scenarios.currency} />}
              <CumulativeChart schedule={selectedSchedule} currency={scenarios.currency} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {scheduleView === "monthly" ? <><p className="text-xs text-slate-600" aria-live="polite">Showing {Math.min(visibleRows, selectedSchedule.rows.length)} of {selectedSchedule.rows.length} payments</p>{visibleRows < selectedSchedule.rows.length ? <button type="button" onClick={() => setVisibleRows((count) => Math.min(count + PAGE_SIZE, selectedSchedule.rows.length))} className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary">Show 12 more payments</button> : null}</> : <p className="text-xs text-slate-600">Annual totals are grouped by calendar year.</p>}
            </div>
          </div>
        ) : null}
      </section>
      <section className="print-only print-schedule" aria-label={`${scenarioName} complete repayment schedule`}>
        <h2>{scenarioName} complete repayment schedule</h2>
        <ScheduleTable rows={displayRows} scenario={scenarioName} currency={scenarios.currency} />
      </section>
      <p className="print-only text-xs">This fixed-rate estimate is not financial advice, an offer, or an eligibility decision. Actual lender calculations, fees, timing and terms may differ.</p>
    </div>
  );
}

function ScenarioSelector({ selected, hasOverpayment, onSelect }: { selected: "original" | "revised"; hasOverpayment: boolean; onSelect: (value: "original" | "revised") => void }) {
  if (!hasOverpayment) return null;
  return <div role="group" aria-label="Schedule and chart scenario" className="inline-flex rounded-xl border border-slate-300 p-1">
    <button type="button" aria-pressed={selected === "original"} onClick={() => onSelect("original")} className={`rounded-lg px-3 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected === "original" ? "bg-primary text-white" : "text-slate-700"}`}>Original schedule</button>
    <button type="button" aria-pressed={selected === "revised"} onClick={() => onSelect("revised")} className={`rounded-lg px-3 py-1.5 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${selected === "revised" ? "bg-primary text-white" : "text-slate-700"}`}>Overpayment schedule</button>
  </div>;
}

function ScheduleTable({ rows, scenario, currency }: { rows: DisplayAmortizationRow[]; scenario: string; currency: CurrencyCode }) {
  return <div className="max-w-full overflow-x-auto rounded-xl border border-slate-200">
    <table className="w-full min-w-[980px] text-left text-xs">
      <caption className="sr-only">{scenario} mortgage repayment schedule</caption>
      <thead className="bg-slate-50 text-slate-700"><tr>
        {["Payment number", "Payment date", "Regular payment", "Monthly overpayment", "One-time overpayment", "Total payment", "Capital repaid", "Interest", "Ending balance"].map((label) => <th key={label} scope="col" className="whitespace-nowrap px-3 py-2 font-semibold">{label}</th>)}
      </tr></thead>
      <tbody>{rows.map((row) => <tr key={row.paymentNumber} className="border-t border-slate-100 text-slate-700">
        <th scope="row" className="whitespace-nowrap px-3 py-2 font-semibold">{row.paymentNumber}</th>
        <td className="whitespace-nowrap px-3 py-2">{row.paymentDate}</td>
        {[row.regularPaymentAmount, row.monthlyOverpayment, row.oneTimeOverpayment, row.totalPayment, row.principal, row.interest, row.remainingBalance].map((value, index) => <td key={index} className="whitespace-nowrap px-3 py-2 tabular-nums">{formatCurrency(value, currency)}</td>)}
      </tr>)}</tbody>
    </table>
  </div>;
}

function Assumptions({ data }: { data: ScenarioData }) {
  const a = data.assumptions;
  const money = (value: number) => formatCurrency(value, data.currency);
  const items = [
    ["Currency", data.currency], ["Property price", money(a.propertyPrice)],
    ["Deposit", `${money(a.depositAmount)} (${a.depositPercentage.toFixed(2)}%)`], ["Mortgage amount", money(a.mortgageAmount)],
    ["LTV", `${a.ltv.toFixed(2)}%`], ["Interest rate", `${a.annualInterestRate.toFixed(2)}% fixed annually`],
    ["Term", `${a.termYears} years`], ["First repayment date", a.firstRepaymentDate],
    ["Monthly overpayment", money(a.monthlyOverpayment)],
    ...(a.oneTimeOverpayment > 0 ? [["One-time overpayment", `${money(a.oneTimeOverpayment)} on ${a.oneTimeOverpaymentDate}`]] : []),
    ["Annual property tax", money(a.annualPropertyTax)], ["Annual home insurance", money(a.annualHomeInsurance)],
    ["Monthly HOA/service charge", money(a.monthlyHOA)], ["Original payoff date", data.comparison.originalPayoffDate],
    ["Revised payoff date", data.comparison.revisedPayoffDate], ["Original interest", money(data.comparison.originalTotalInterest)],
    ["Revised interest", money(data.comparison.revisedTotalInterest)], ["Estimated interest saved", money(data.comparison.interestSaved)]
  ];
  return <section aria-labelledby="assumptions-heading" className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h2 id="assumptions-heading" className="text-base font-semibold text-slate-800">Assumptions and results summary</h2>
    <dl className="mt-3 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2 lg:grid-cols-3">{items.map(([label, value]) => <div key={label}><dt className="font-semibold text-slate-700">{label}</dt><dd className="break-words text-slate-900">{value}</dd></div>)}</dl>
    <p className="mt-3 text-xs text-slate-600">Ownership costs are shown separately and are not included in mortgage interest or repayment totals.</p>
  </section>;
}

function AnnualChart({ rows, currency, scenario }: { rows: AnnualAmortizationSummary[]; currency: CurrencyCode; scenario: string }) {
  const maximum = Math.max(...rows.map((row) => row.totalPayment), 1);
  return <figure className="space-y-4" aria-labelledby="annual-chart-caption">
    <figcaption id="annual-chart-caption" className="text-sm font-semibold text-slate-800">{scenario} annual payment split</figcaption>
    <div className="flex flex-wrap gap-4 text-xs text-slate-700" aria-label="Legend"><span><i aria-hidden="true" className="mr-1 inline-block h-3 w-3 border border-blue-900 bg-blue-700" />Principal (solid)</span><span><i aria-hidden="true" className="mr-1 inline-block h-3 w-3 border border-amber-900 bg-amber-400" />Interest (striped)</span></div>
    <ul className="max-h-[32rem] space-y-2 overflow-y-auto pr-2" aria-label={`${scenario} principal and interest annual chart`}>
      {rows.map((row) => {
        const principalWidth = row.principal / maximum * 100;
        const interestWidth = row.interest / maximum * 100;
        const label = `${row.calendarYear}: principal ${formatCurrency(row.principal, currency)}, interest ${formatCurrency(row.interest, currency)}, total ${formatCurrency(row.totalPayment, currency)}`;
        return <li key={row.calendarYear} className="grid grid-cols-[3.5rem_minmax(10rem,1fr)] items-center gap-2" aria-label={label} title={label}>
          <span className="text-xs font-medium text-slate-700">{row.calendarYear}</span>
          <div className="flex h-5 overflow-hidden rounded border border-slate-400 bg-slate-100" aria-hidden="true"><span className="bg-blue-700" style={{ width: `${principalWidth}%` }} /><span className="annual-interest-bar bg-amber-400" style={{ width: `${interestWidth}%` }} /></div>
        </li>;
      })}
    </ul>
    <details className="text-xs text-slate-700"><summary className="cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Read annual chart data</summary><AnnualDataTable rows={rows} currency={currency} /></details>
    <div className="print-only"><h3>Annual data — {scenario}</h3><AnnualDataTable rows={rows} currency={currency} /></div>
  </figure>;
}

function AnnualDataTable({ rows, currency }: { rows: AnnualAmortizationSummary[]; currency: CurrencyCode }) {
  return <div className="max-w-full overflow-x-auto rounded-lg border border-slate-200"><table className="min-w-[480px] w-full text-xs"><caption className="sr-only">Accessible annual capital and interest values</caption><thead className="bg-primary text-white"><tr><th scope="col" className="p-2 text-left">Year</th><th scope="col" className="p-2 text-right">Capital repaid</th><th scope="col" className="p-2 text-right">Interest</th><th scope="col" className="p-2 text-right">Total payments</th></tr></thead><tbody>{rows.map((row) => <tr key={row.calendarYear} className="border-t odd:bg-white even:bg-slate-50"><th scope="row" className="p-2 text-left">{row.calendarYear}</th><td className="p-2 text-right tabular-nums">{formatCurrency(row.principal, currency)}</td><td className="p-2 text-right tabular-nums">{formatCurrency(row.interest, currency)}</td><td className="p-2 text-right tabular-nums">{formatCurrency(row.totalPayment, currency)}</td></tr>)}</tbody></table></div>;
}

function CumulativeChart({ schedule, currency }: { schedule: AmortizationSchedule; currency: CurrencyCode }) {
  const rows = schedule.rows;
  let interest = 0, payments = 0;
  const points = rows.map((row) => { interest += row.interest; payments += row.totalPayment; return { balance: row.remainingBalance, interest, payments }; });
  const sampled = points.filter((_, i) => i % Math.max(1, Math.ceil(points.length / 80)) === 0 || i === points.length - 1);
  const max = Math.max(schedule.totalRepayments, ...points.map(p => p.balance), 1);
  const path = (key: "balance" | "interest" | "payments") => sampled.map((p, i) => `${i ? "L" : "M"}${(i / Math.max(sampled.length - 1, 1) * 360 + 42).toFixed(1)},${(190 - p[key] / max * 160).toFixed(1)}`).join(" ");
  return <figure className="rounded-lg border border-slate-200 p-3"><figcaption className="font-semibold text-slate-900">Mortgage balance and cumulative costs</figcaption><div className="mt-2 flex flex-wrap gap-3 text-xs"><span className="text-blue-700">● Outstanding balance</span><span className="text-emerald-700">● Cumulative interest</span><span className="text-rose-700">● Cumulative payments</span></div><svg viewBox="0 0 420 220" className="mt-2 h-auto w-full" role="img" aria-label={`Line chart ending with balance ${formatCurrency(points.at(-1)?.balance ?? 0, currency)}, cumulative interest ${formatCurrency(schedule.totalInterest, currency)}, and cumulative payments ${formatCurrency(schedule.totalRepayments, currency)}`}><line x1="42" y1="30" x2="42" y2="190" stroke="#94a3b8"/><line x1="42" y1="190" x2="402" y2="190" stroke="#94a3b8"/><text x="2" y="35" fontSize="10">{formatCurrency(max, currency).replace(/\.00$/, "")}</text><text x="18" y="194" fontSize="10">£0</text><path d={path("balance")} fill="none" stroke="#1d4ed8" strokeWidth="3"/><path d={path("interest")} fill="none" stroke="#15803d" strokeWidth="3"/><path d={path("payments")} fill="none" stroke="#be123c" strokeWidth="3"/></svg><p className="mt-2 text-xs text-slate-600">The schedule table provides the same underlying values in text.</p></figure>;
}

function Comparison({ data }: { data: ScenarioData }) {
  const c = data.comparison;
  const money = (value: number) => formatCurrency(value, data.currency);
  const rows = [
    ["Monthly regular repayment", money(c.regularPayment), money(c.regularPayment)],
    ["Monthly overpayment", money(0), money(data.monthlyOverpayment)],
    ["One-time overpayment", money(0), money(data.oneTimeOverpayment)],
    ["Total number of payments", String(c.originalPayments), String(c.revisedPayments)],
    ["Payoff date", c.originalPayoffDate, c.revisedPayoffDate],
    ["Total mortgage repayments", money(c.originalTotalRepayments), money(c.revisedTotalRepayments)],
    ["Total interest", money(c.originalTotalInterest), money(c.revisedTotalInterest)]
  ];
  return <div className="space-y-4">
    <div className="max-w-full overflow-x-auto"><table className="min-w-[600px] w-full text-left text-xs"><caption className="sr-only">Original and overpayment mortgage comparison</caption><thead><tr className="bg-slate-50"><th scope="col" className="p-3">Measure</th><th scope="col" className="p-3">Original (baseline)</th><th scope="col" className="p-3">Overpayment (revised)</th></tr></thead><tbody>{rows.map(([label, original, revised]) => <tr key={label} className="border-t"><th scope="row" className="p-3 font-semibold">{label}</th><td className="p-3">{original}</td><td className="p-3">{revised}</td></tr>)}</tbody></table></div>
    <dl className="grid gap-3 sm:grid-cols-3"><Saving label="Estimated interest saved" value={money(c.interestSaved)} /><Saving label="Payments saved" value={String(c.paymentsSaved)} /><Saving label="Estimated repayment time saved" value={c.repaymentTimeSaved} /></dl>
    <p className="text-xs text-slate-600">Savings are estimates rather than guaranteed outcomes; lender timing, fees, daily interest, and rounding can produce different results.</p>
  </div>;
}

function Saving({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border-l-4 border-emerald-700 bg-emerald-50 p-3"><dt className="text-xs font-medium text-slate-700">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd></div>;
}
