"use client";

import { useState } from "react";
import type { CalculatorConfig } from "@/types/calculatorTypes";
import {
  calculateLoanAmortization,
  type LoanAmortizationResult,
} from "@/lib/loanAmortization";
import { formatCurrency } from "@/lib/format";
import type { CurrencyCode } from "@/lib/conversions";

const defaults = {
  principal: "200000",
  years: "15",
  months: "0",
  annualRate: "6",
  extraMonthly: "0",
  firstPaymentDate: "",
  currency: "USD",
};
const panel =
  "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

function PrincipalChart({
  result,
  currency,
}: {
  result: LoanAmortizationResult;
  currency: CurrencyCode;
}) {
  const money = (cents: number) => formatCurrency(cents / 100, currency);
  const principalShare =
    (result.principalCents / result.totalPaymentCents) * 100;
  return (
    <figure className="my-5 rounded-xl border border-slate-100 p-4">
      <figcaption className="font-semibold text-slate-900">
        Principal and interest
      </figcaption>
      <div
        aria-hidden="true"
        className="relative mx-auto my-5 h-36 w-36 rounded-full"
        style={{
          background: `conic-gradient(#2563eb 0% ${principalShare}%, #d97706 ${principalShare}% 100%)`,
        }}
      >
        <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white text-sm font-semibold">
          {principalShare.toFixed(1)}%<span className="sr-only">principal</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>
          {" "}
          <span aria-hidden="true" className="text-blue-600">
            ●
          </span>{" "}
          Principal: {money(result.principalCents)} ({principalShare.toFixed(1)}
          %)
        </li>
        <li>
          <span aria-hidden="true" className="text-amber-600">
            ●
          </span>{" "}
          Interest: {money(result.totalInterestCents)} (
          {(100 - principalShare).toFixed(1)}%)
        </li>
      </ul>
    </figure>
  );
}

function LoanCharts({
  result,
  currency,
}: {
  result: LoanAmortizationResult;
  currency: CurrencyCode;
}) {
  const money = (cents: number) => formatCurrency(cents / 100, currency);
  const maximum = Math.max(result.principalCents, result.totalInterestCents, 1);
  let interest = 0;
  let principal = 0;
  const points = [
    { balance: result.principalCents, interest: 0, principal: 0 },
    ...result.rows.map((row) => {
      interest += row.interestCents;
      principal += row.principalCents;
      return { balance: row.balanceCents, interest, principal };
    }),
  ];
  const path = (key: "balance" | "interest" | "principal") =>
    points
      .map(
        (point, index) =>
          `${index ? "L" : "M"}${64 + (index / result.rows.length) * 480},${210 - (point[key] / maximum) * 165}`,
      )
      .join(" ");
  return (
    <div className="min-w-0">
      <figure className={`${panel} min-w-0`}>
        <figcaption className="font-semibold text-slate-900">
          Loan balance and cumulative repayments
        </figcaption>
        <svg
          className="mt-4 max-h-80 w-full"
          viewBox="0 0 570 255"
          role="img"
          aria-label={`Over ${result.rows.length} monthly payments, balance falls from ${money(result.principalCents)} to zero, cumulative principal reaches ${money(result.principalCents)}, and cumulative interest reaches ${money(result.totalInterestCents)}. The schedule provides the values in text.`}
        >
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <line
                x1="64"
                y1={210 - f * 165}
                x2="544"
                y2={210 - f * 165}
                stroke="#e2e8f0"
              />
              <text
                x="60"
                y={214 - f * 165}
                textAnchor="end"
                fontSize="10"
                fill="#475569"
              >
                {new Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format((maximum / 100) * f)}
              </text>
            </g>
          ))}
          <text x="64" y="22" fontSize="11" fill="#475569">
            Amount ({currency})
          </text>
          <path
            d={path("balance")}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
          />
          <path
            d={path("interest")}
            fill="none"
            stroke="#d97706"
            strokeDasharray="6 3"
            strokeWidth="3"
          />
          <path
            d={path("principal")}
            fill="none"
            stroke="#059669"
            strokeDasharray="2 3"
            strokeWidth="3"
          />
          <text x="64" y="230" fontSize="11">
            0
          </text>
          <text x="544" y="230" textAnchor="end" fontSize="11">
            {result.rows.length}
          </text>
          <text x="300" y="249" textAnchor="middle" fontSize="11">
            Monthly payment number
          </text>
        </svg>
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-700">
          <li>
            <span className="text-blue-600" aria-hidden="true">
              ━
            </span>{" "}
            Outstanding balance
          </li>
          <li>
            <span className="text-amber-600" aria-hidden="true">
              ┄
            </span>{" "}
            Cumulative interest
          </li>
          <li>
            <span className="text-emerald-600" aria-hidden="true">
              ┈
            </span>{" "}
            Cumulative principal
          </li>
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          The annual and monthly tables provide the underlying amounts.
        </p>
      </figure>
    </div>
  );
}

export function AmortizationCalculator({
  config,
}: {
  config: CalculatorConfig;
}) {
  const [values, setValues] = useState(defaults);
  const [extraEnabled, setExtraEnabled] = useState(false);
  const [result, setResult] = useState<LoanAmortizationResult | null>(null);
  const [error, setError] = useState("");
  const [view, setView] = useState<"annual" | "monthly">("annual");
  const currency = values.currency as CurrencyCode;
  const money = (cents: number) => formatCurrency(cents / 100, currency);
  function change(name: keyof typeof defaults, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setResult(null);
    setError("");
  }
  function field(
    name: keyof typeof defaults,
    label: string,
    options: {
      min?: number;
      max?: number;
      step?: string;
      type?: string;
      optional?: boolean;
    } = {},
  ) {
    const id = `${config.slug}-${name}`;
    return (
      <div className="min-w-0 space-y-1.5">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor={id}
        >
          {label}
        </label>
        <input
          id={id}
          name={name}
          type={options.type || "number"}
          inputMode={options.type === "date" ? undefined : "decimal"}
          required={!options.optional}
          min={options.min}
          max={options.max}
          step={options.step || "1"}
          value={values[name]}
          onChange={(event) => change(name, event.target.value)}
          className="w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="grid min-w-0 items-start gap-6 lg:grid-cols-2">
        <section className={panel} aria-labelledby="loan-inputs-heading">
          <h2
            id="loan-inputs-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Plan your loan repayments
          </h2>
          <p className="mb-5 mt-1 text-sm text-slate-600">
            Explore a fixed-rate loan, with optional extra monthly payments.
          </p>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setError("");
              setResult(null);
              try {
                const required = [
                  values.principal,
                  values.years,
                  values.months,
                  values.annualRate,
                  ...(extraEnabled ? [values.extraMonthly] : []),
                ];
                if (required.some((value) => !value.trim()))
                  throw new Error("Complete all required loan fields.");
                setResult(
                  calculateLoanAmortization({
                    principal: Number(values.principal),
                    years: Number(values.years),
                    months: Number(values.months),
                    annualRate: Number(values.annualRate),
                    extraMonthly: extraEnabled
                      ? Number(values.extraMonthly)
                      : 0,
                    firstPaymentDate: values.firstPaymentDate || undefined,
                  }),
                );
              } catch (cause) {
                setError(
                  cause instanceof Error
                    ? cause.message
                    : "Unable to calculate. Please check your inputs.",
                );
              }
            }}
          >
            <div className="space-y-1.5">
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="amortization-currency"
              >
                Display currency
              </label>
              <select
                id="amortization-currency"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5"
                value={values.currency}
                onChange={(event) => change("currency", event.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            {field("principal", "Loan amount", {
              min: 0.01,
              max: 1e12,
              step: "0.01",
            })}
            <fieldset className="min-w-0">
              <legend className="mb-2 text-sm font-medium text-slate-700">
                Loan term (up to 50 years in total)
              </legend>
              <div className="grid grid-cols-2 gap-3">
                {field("years", "Years", { min: 0, max: 50 })}
                {field("months", "Additional months", { min: 0, max: 11 })}
              </div>
            </fieldset>
            {field("annualRate", "Annual interest rate (%)", {
              min: 0,
              max: 50,
              step: "any",
            })}
            {field("firstPaymentDate", "First payment date (optional)", {
              type: "date",
              optional: true,
            })}
            <p className="text-xs text-slate-500">
              Choose the first repayment date, not the loan application date.
              Dates do not change the monthly interest assumption.
            </p>
            <div className="rounded-xl bg-slate-50 p-3">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-800">
                <input
                  type="checkbox"
                  checked={extraEnabled}
                  onChange={(event) => {
                    setExtraEnabled(event.target.checked);
                    setResult(null);
                    setError("");
                  }}
                  className="h-4 w-4"
                />
                Make extra monthly payments
              </label>
              {extraEnabled && (
                <div className="mt-3">
                  {field("extraMonthly", "Extra payment each month", {
                    min: 0,
                    max: 1e12,
                    step: "0.01",
                  })}
                  <p className="mt-2 text-xs text-slate-600">
                    Applied after interest and the regular payment, including
                    the first month.
                  </p>
                </div>
              )}
            </div>
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800"
              >
                {error}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary/90"
              >
                Calculate
              </button>
              <button
                type="button"
                onClick={() => {
                  setValues(defaults);
                  setExtraEnabled(false);
                  setResult(null);
                  setError("");
                  setView("annual");
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Reset
              </button>
            </div>
          </form>
        </section>
        <section
          className={`${panel} lg:sticky lg:top-6`}
          aria-labelledby="loan-results-heading"
          aria-live="polite"
          aria-atomic="true"
        >
          <h2
            id="loan-results-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Your repayment estimate
          </h2>
          {result ? (
            <>
              <div className="my-5 rounded-xl bg-blue-50 p-5">
                <p className="text-sm text-blue-800">
                  Regular monthly repayment
                </p>
                <p className="mt-1 break-words text-3xl font-bold tracking-tight text-blue-950">
                  {money(result.monthlyPaymentCents)}
                </p>
                <p className="mt-2 text-xs text-blue-800">
                  Plus {money(result.extraMonthlyCents)} extra each month when
                  enabled. The last payment is adjusted to clear the balance.
                </p>
              </div>
              <PrincipalChart result={result} currency={currency} />
              <dl className="space-y-3 text-sm">
                {[
                  ["Original principal", money(result.principalCents)],
                  ["Total repayment", money(result.totalPaymentCents)],
                  ["Total interest", money(result.totalInterestCents)],
                  ["Monthly payments", String(result.rows.length)],
                  [
                    "Months saved with extra payments",
                    String(result.termMonths - result.rows.length),
                  ],
                  ...(result.payoffDate
                    ? [["Estimated payoff date", result.payoffDate]]
                    : []),
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex flex-wrap justify-between gap-2 border-b border-slate-100 pb-3"
                  >
                    <dt className="text-slate-600">{label}</dt>
                    <dd className="font-semibold text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                Fixed monthly interest model; excludes fees and early repayment
                charges. Schedule amounts are reconciled to cents from
                full-precision calculations.
              </p>
            </>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              Enter your loan details and select Calculate to see your monthly
              loan payment, interest breakdown and amortization schedule.
              Editing an input clears the previous estimate.
            </p>
          )}
        </section>
      </div>
      {result && (
        <>
          <LoanCharts result={result} currency={currency} />
          <section
            className={`${panel} min-w-0`}
            aria-labelledby="amortization-schedule-heading"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2
                  id="amortization-schedule-heading"
                  className="text-lg font-semibold text-slate-900"
                >
                  Amortization Schedule
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Annual groups cover successive 12-payment periods from the
                  first repayment.
                </p>
              </div>
              <div
                role="group"
                aria-label="Schedule view"
                className="flex flex-wrap gap-2"
              >
                {(["annual", "monthly"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={view === mode}
                    onClick={() => setView(mode)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium ${view === mode ? "border-primary bg-primary text-white" : "border-slate-300 bg-white text-slate-700"}`}
                  >
                    {mode === "annual" ? "Annual Schedule" : "Monthly Schedule"}
                  </button>
                ))}
              </div>
            </div>
            <div
              className="mt-5 overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
              tabIndex={0}
              role="region"
              aria-label={`${view} amortization table; scroll horizontally on small screens`}
            >
              <table className="w-full min-w-[640px] text-right text-sm">
                <caption className="sr-only">
                  {view === "annual" ? "Annual" : "Monthly"} loan amortization
                  table in {currency}
                </caption>
                <thead className="bg-slate-50 text-xs text-slate-600">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left">
                      {view === "annual" ? "Loan year" : "Payment / date"}
                    </th>
                    {view === "monthly" && (
                      <th scope="col" className="px-4 py-3">
                        Payment
                      </th>
                    )}
                    <th scope="col" className="px-4 py-3">
                      Interest paid
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Principal repaid
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Ending balance
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {(view === "annual" ? result.annual : result.rows).map(
                    (row) => (
                      <tr key={row.number} className="even:bg-slate-50/60">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 text-left font-medium"
                        >
                          {row.number}
                          {"date" in row && row.date ? ` / ${row.date}` : ""}
                        </th>
                        {view === "monthly" && (
                          <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                            {money(row.paymentCents)}
                          </td>
                        )}
                        <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                          {money(row.interestCents)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                          {money(row.principalCents)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                          {money(row.balanceCents)}
                        </td>
                      </tr>
                    ),
                  )}
                </tbody>
                <tfoot className="border-t border-slate-200 bg-slate-50 font-semibold">
                  <tr>
                    <th scope="row" className="px-4 py-3 text-left">
                      Total
                    </th>
                    {view === "monthly" && (
                      <td className="px-4 py-3">
                        {money(result.totalPaymentCents)}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      {money(result.totalInterestCents)}
                    </td>
                    <td className="px-4 py-3">
                      {money(result.principalCents)}
                    </td>
                    <td className="px-4 py-3">{money(0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
