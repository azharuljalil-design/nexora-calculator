"use client";

import { useState, type KeyboardEvent } from "react";
import {
  calculateInvestment,
  type InvestmentMode,
  type InvestmentResult,
} from "@/lib/investment";
import { formatCurrency } from "@/lib/format";
import type { CurrencyCode } from "@/lib/conversions";
import { InvestmentBreakdown, InvestmentGrowthChart } from "./InvestmentCharts";

const modes: { value: InvestmentMode; label: string; field: string }[] = [
  { value: "end", label: "End Amount", field: "ending balance" },
  {
    value: "contribution",
    label: "Additional Contribution",
    field: "additional contribution",
  },
  { value: "rate", label: "Return Rate", field: "nominal annual return" },
  { value: "starting", label: "Starting Amount", field: "starting investment" },
  { value: "length", label: "Investment Length", field: "investment length" },
];
const defaults = {
  starting: "20000",
  contribution: "1000",
  target: "198290.40",
  years: "10",
  months: "0",
  rate: "6",
  compounding: "1",
  frequency: "monthly",
  timing: "end",
  currency: "GBP",
};
const panel =
  "min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";
const control =
  "w-full min-w-0 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export function InvestmentCalculator() {
  const [mode, setMode] = useState<InvestmentMode>("end");
  const [values, setValues] = useState(defaults);
  const [result, setResult] = useState<InvestmentResult | null>(null);
  const [error, setError] = useState("");
  const [view, setView] = useState<"annual" | "monthly">("annual");
  const currency = values.currency as CurrencyCode;
  const money = (cents: number) => formatCurrency(cents / 100, currency);
  const active = modes.find((item) => item.value === mode)!;
  function change(name: keyof typeof defaults, value: string) {
    setValues((previous) => ({ ...previous, [name]: value }));
    setResult(null);
    setError("");
  }
  function selectMode(value: InvestmentMode) {
    setMode(value);
    setResult(null);
    setError("");
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      event.key === "ArrowRight"
        ? (index + 1) % modes.length
        : event.key === "ArrowLeft"
          ? (index + modes.length - 1) % modes.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? modes.length - 1
              : -1;
    if (next < 0) return;
    event.preventDefault();
    selectMode(modes[next].value);
    document.getElementById(`investment-tab-${modes[next].value}`)?.focus();
  }
  function field(
    name: keyof typeof defaults,
    label: string,
    min = 0,
    max = 1e12,
    step = "0.01",
  ) {
    return (
      <div className="min-w-0 space-y-1.5">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor={`investment-${name}`}
        >
          {label}
        </label>
        <input
          id={`investment-${name}`}
          name={name}
          type="number"
          inputMode="decimal"
          required
          value={values[name]}
          min={min}
          max={max}
          step={step}
          className={control}
          onChange={(event) => change(name, event.target.value)}
        />
      </div>
    );
  }
  function select(
    name: keyof typeof defaults,
    label: string,
    options: [string, string][],
  ) {
    return (
      <div className="space-y-1.5">
        <label
          className="block text-sm font-medium text-slate-700"
          htmlFor={`investment-${name}`}
        >
          {label}
        </label>
        <select
          id={`investment-${name}`}
          value={values[name]}
          className={control}
          onChange={(event) => change(name, event.target.value)}
        >
          {options.map(([value, text]) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <div className="min-w-0 space-y-6">
      <div
        role="tablist"
        aria-label="Investment calculation mode"
        className="flex flex-wrap gap-2"
      >
        {modes.map((item, index) => (
          <button
            key={item.value}
            role="tab"
            id={`investment-tab-${item.value}`}
            aria-selected={mode === item.value}
            aria-controls="investment-panel"
            tabIndex={mode === item.value ? 0 : -1}
            onKeyDown={(event) => tabKey(event, index)}
            onClick={() => selectMode(item.value)}
            className={`rounded-xl border px-4 py-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${mode === item.value ? "border-primary bg-primary text-white" : "border-slate-200 bg-white text-slate-700"}`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div
        id="investment-panel"
        role="tabpanel"
        aria-labelledby={`investment-tab-${mode}`}
        className="grid min-w-0 items-start gap-6 lg:grid-cols-2"
      >
        <section className={panel} aria-labelledby="investment-input-heading">
          <h2
            id="investment-input-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Plan your investment
          </h2>
          <p className="mb-5 mt-1 text-sm text-slate-600">
            Solve for {active.field}. Returns are assumptions, not guarantees.
          </p>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setError("");
              setResult(null);
              try {
                const names: (keyof typeof defaults)[] = [
                  ...(mode !== "starting" ? ["starting" as const] : []),
                  ...(mode !== "contribution" ? ["contribution" as const] : []),
                  ...(mode !== "end" ? ["target" as const] : []),
                  ...(mode !== "rate" ? ["rate" as const] : []),
                  ...(mode !== "length"
                    ? ["years" as const, "months" as const]
                    : []),
                ];
                if (names.some((name) => !values[name].trim()))
                  throw new Error("Complete all required investment fields.");
                const years = Number(values.years);
                const months = Number(values.months);
                if (
                  mode !== "length" &&
                  (!Number.isInteger(years) ||
                    !Number.isInteger(months) ||
                    months < 0 ||
                    months > 11)
                )
                  throw new Error(
                    "Enter whole years and 0–11 additional months.",
                  );
                setResult(
                  calculateInvestment({
                    mode,
                    startingAmount: Number(values.starting),
                    contribution: Number(values.contribution),
                    targetAmount: Number(values.target),
                    months: years * 12 + months,
                    annualRate: Number(values.rate),
                    compoundsPerYear: Number(values.compounding),
                    contributionFrequency: values.frequency as
                      "monthly" | "annual",
                    timing: values.timing as "beginning" | "end",
                  }),
                );
              } catch (cause) {
                setError(
                  cause instanceof Error
                    ? cause.message
                    : "Unable to calculate. Check your inputs.",
                );
              }
            }}
          >
            {select("currency", "Display currency", [
              ["GBP", "GBP (£)"],
              ["USD", "USD ($)"],
              ["EUR", "EUR (€)"],
            ])}
            {mode !== "end" &&
              field(
                "target",
                mode === "length"
                  ? "Target minimum ending balance"
                  : "Target ending balance",
              )}
            {mode !== "starting" && field("starting", "Starting amount")}
            {mode !== "length" && (
              <fieldset className="min-w-0">
                <legend className="mb-2 text-sm font-medium text-slate-700">
                  Investment duration (up to 100 years)
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {field("years", "Years", 0, 100, "1")}
                  {field("months", "Additional months", 0, 11, "1")}
                </div>
              </fieldset>
            )}
            {mode !== "rate" &&
              field("rate", "Expected annual return (%)", -99.99, 1000, "any")}
            {select("compounding", "Compounding frequency", [
              ["1", "Annually"],
              ["2", "Semi-annually"],
              ["4", "Quarterly"],
              ["12", "Monthly"],
              ["365", "Daily (365 periods)"],
            ])}
            {mode !== "contribution" &&
              field("contribution", "Additional contribution")}
            {select("frequency", "Contribution frequency", [
              ["monthly", "Monthly"],
              ["annual", "Annually"],
            ])}
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-slate-700">
                Contribution timing
              </legend>
              <div className="flex flex-wrap gap-4">
                {(["beginning", "end"] as const).map((timing) => (
                  <label
                    key={timing}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name="investment-timing"
                      value={timing}
                      checked={values.timing === timing}
                      onChange={() => change("timing", timing)}
                      className="h-4 w-4"
                    />
                    {timing === "beginning"
                      ? "Beginning of period"
                      : "End of period"}
                  </label>
                ))}
              </div>
            </fieldset>
            <p className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
              The annual rate is nominal. Its compounding frequency determines
              an equivalent monthly growth rate. Annual deposits occur at the
              start of months 1, 13, … or the end of months 12, 24, …; a partial
              year has no end-of-year deposit. Duration is measured in whole
              months.
            </p>
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
                className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                onClick={() => {
                  setValues(defaults);
                  setMode("end");
                  setResult(null);
                  setError("");
                  setView("annual");
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </section>
        <section
          className={panel}
          aria-labelledby="investment-result-heading"
          aria-live="polite"
          aria-atomic="true"
        >
          <h2
            id="investment-result-heading"
            className="text-lg font-semibold text-slate-900"
          >
            Your investment projection
          </h2>
          {result ? (
            <>
              <div className="my-5 rounded-xl bg-blue-50 p-5">
                <p className="text-sm text-blue-800">
                  {active.label === "End Amount"
                    ? "Ending investment balance"
                    : `Estimated ${active.field}`}
                </p>
                <p className="mt-1 break-words text-3xl font-bold tracking-tight text-blue-950">
                  {mode === "contribution"
                    ? money(Math.round(result.input.contribution * 100))
                    : mode === "starting"
                      ? money(result.initialCents)
                      : mode === "rate"
                        ? `${result.input.annualRate.toFixed(6)}%`
                        : mode === "length"
                          ? `${Math.floor(result.input.months / 12)} years, ${result.input.months % 12} months`
                          : money(result.endingCents)}
                </p>
              </div>
              <dl className="space-y-3 text-sm">
                {[
                  ["Ending balance", money(result.endingCents)],
                  ["Starting investment", money(result.initialCents)],
                  [
                    "Total additional contributions",
                    money(result.contributionCents),
                  ],
                  [
                    result.growthCents < 0
                      ? "Total investment loss"
                      : "Total investment growth",
                    money(result.growthCents),
                  ],
                  [
                    "Contribution per period",
                    money(Math.round(result.input.contribution * 100)),
                  ],
                  ["Duration", `${result.input.months} months`],
                  [
                    "Nominal annual return",
                    `${result.input.annualRate.toFixed(6)}%`,
                  ],
                  [
                    "Effective annual return",
                    `${result.effectiveAnnualRate.toFixed(6)}%`,
                  ],
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
              <InvestmentBreakdown result={result} currency={currency} />
              <p className="mt-4 text-xs leading-5 text-slate-500">
                {mode === "length"
                  ? "Length is the first monthly boundary whose cent-rounded balance reaches or exceeds the target, up to 100 years. A target already met returns zero months. "
                  : ""}
                {["contribution", "starting"].includes(mode)
                  ? "Solved amounts retain fractional cents internally; cent-rounded real deposits may reach a slightly different target. "
                  : ""}
                Cumulative rounding keeps every displayed row and total
                consistent. Fees, taxes, inflation and withdrawals are excluded.
              </p>
            </>
          ) : (
            <p className="mt-5 rounded-xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
              Choose what to calculate and enter your assumptions. Select
              Calculate to see the result, charts and accumulation schedule.
              Editing inputs or switching tabs clears the previous result.
            </p>
          )}
        </section>
      </div>
      {result && (
        <>
          <InvestmentGrowthChart result={result} currency={currency} />
          <section
            className={panel}
            aria-labelledby="investment-schedule-heading"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2
                  id="investment-schedule-heading"
                  className="text-lg font-semibold text-slate-900"
                >
                  Accumulation Schedule
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Annual groups cover up to 12 investment months. Contributions
                  exclude the starting amount.
                </p>
              </div>
              <div
                role="group"
                aria-label="Accumulation schedule view"
                className="flex flex-wrap gap-2"
              >
                {(["annual", "monthly"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={view === item}
                    onClick={() => setView(item)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold ${view === item ? "border-primary bg-primary text-white" : "border-slate-300 bg-white text-slate-700"}`}
                  >
                    {item === "annual" ? "Annual Schedule" : "Monthly Schedule"}
                  </button>
                ))}
              </div>
            </div>
            {result.monthly.length ? (
              <div
                role="region"
                tabIndex={0}
                aria-label={`${view} accumulation table; scroll horizontally on small screens`}
                className="mt-5 overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                <table className="w-full min-w-[600px] text-right text-sm">
                  <caption className="sr-only">
                    {view === "annual" ? "Annual" : "Monthly"} investment
                    accumulation in {currency}
                  </caption>
                  <thead className="bg-slate-50 text-xs text-slate-600">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left">
                        {view === "annual" ? "Year" : "Month"}
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Contributions
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Growth / loss
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Ending balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {(view === "annual" ? result.annual : result.monthly).map(
                      (row) => (
                        <tr key={row.period} className="even:bg-slate-50/60">
                          <th
                            scope="row"
                            className="px-4 py-3 text-left font-medium"
                          >
                            {row.period}
                          </th>
                          <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                            {money(row.contributionCents)}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                            {money(row.growthCents)}
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
                        Total / final
                      </th>
                      <td className="px-4 py-3">
                        {money(result.contributionCents)}
                      </td>
                      <td className="px-4 py-3">{money(result.growthCents)}</td>
                      <td className="px-4 py-3">{money(result.endingCents)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-600">
                No scheduled periods: the target is already met or the entered
                duration is zero.
              </p>
            )}
          </section>
        </>
      )}
    </div>
  );
}
