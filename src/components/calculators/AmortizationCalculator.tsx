"use client";

import { useMemo } from "react";
import type { CalculatorConfig } from "@/types/calculatorTypes";
import { useCalculatorEngine } from "@/components/calculators/useCalculatorEngine";
import { CalculatorResult } from "@/components/calculators/CalculatorResult";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { CurrencyCode } from "@/lib/conversions";
import { renderInputControl } from "@/components/calculators/CalculatorInputControl";
import {
  isInputRequired,
  isInputShown,
  resolveHelperText
} from "@/lib/calculatorUi";

type AmortizationCalculatorProps = {
  config: CalculatorConfig;
};

type ScheduleRow = {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
};

function buildSchedule(args: {
  principal: number;
  annualRate: number;
  years: number;
}) {
  const { principal, annualRate, years } = args;
  const months = years * 12;
  const r = annualRate / 12 / 100;

  let monthlyPayment = 0;
  if (r === 0) {
    monthlyPayment = months > 0 ? principal / months : 0;
  } else {
    const factor = Math.pow(1 + r, months);
    monthlyPayment = (principal * r * factor) / (factor - 1);
  }

  const rows: ScheduleRow[] = [];
  let balance = principal;
  let totalInterest = 0;

  for (let m = 1; m <= months; m++) {
    const interest = r === 0 ? 0 : balance * r;
    const principalPaid = Math.min(monthlyPayment - interest, balance);
    balance = Math.max(balance - principalPaid, 0);
    totalInterest += interest;
    rows.push({
      month: m,
      payment: monthlyPayment,
      principal: principalPaid,
      interest,
      balance
    });
    if (balance <= 0) break;
  }

  const totalPayment = monthlyPayment * months;
  return { monthlyPayment, totalInterest, totalPayment, rows };
}

export function AmortizationCalculator({ config }: AmortizationCalculatorProps) {
  const engine = useCalculatorEngine(config);

  const currency = (engine.values.currency as CurrencyCode) || "USD";
  const principal = Number(engine.values.loanAmount || "");
  const annualRate = Number(engine.values.annualInterestRate || "");
  const years = Number(engine.values.loanTermYears || "");

  const schedule = useMemo(() => {
    if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(years)) {
      return null;
    }
    if (principal <= 0 || years <= 0 || annualRate < 0) return null;
    return buildSchedule({ principal, annualRate, years });
  }, [principal, annualRate, years]);

  return (
    <div className="space-y-6">
      {/* Use the standard form/result panels */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">Inputs</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              engine.handleSubmit();
            }}
          >
            {config.inputs.map((input) => {
              const value = engine.values[input.name] ?? "";
              const error = engine.errors[input.name];

              const helperText = resolveHelperText(input, engine.values);
              const shouldShowHelper = Boolean(helperText) && !error;
              const isShown = isInputShown(input, engine.values);
              if (!isShown) return null;

              const helperId = `helper-${config.slug}-${input.name}`;
              const errorId = `error-${config.slug}-${input.name}`;

              return (
                <div key={input.name} className="space-y-1">
                  <label className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>{input.label}</span>
                    {isInputRequired(input, engine.values) ? (
                      <span className="text-[11px] font-normal text-slate-400">
                        Required
                      </span>
                    ) : null}
                  </label>

                  {renderInputControl({
                    input,
                    value,
                    values: engine.values,
                    onChange: (val) => engine.handleChange(input.name, val),
                    error,
                    helperId: shouldShowHelper ? helperId : undefined,
                    errorId: error ? errorId : undefined
                  })}

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
                onClick={engine.handleReset}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <CalculatorResult
          config={config}
          result={engine.result}
          hasSubmitted={engine.hasSubmitted}
        />
      </div>

      {/* Schedule table (only after valid calculation) */}
      {engine.result && schedule ? (
        <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-800">
            Amortization schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-[720px] w-full text-left text-xs">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Month</th>
                  <th className="py-2 pr-3">Payment</th>
                  <th className="py-2 pr-3">Principal</th>
                  <th className="py-2 pr-3">Interest</th>
                  <th className="py-2">Balance</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {schedule.rows.slice(0, 360).map((row) => (
                  <tr key={row.month} className="border-t border-slate-100">
                    <td className="py-2 pr-3">{row.month}</td>
                    <td className="py-2 pr-3">
                      {formatCurrency(row.payment, currency)}
                    </td>
                    <td className="py-2 pr-3">
                      {formatCurrency(row.principal, currency)}
                    </td>
                    <td className="py-2 pr-3">
                      {formatCurrency(row.interest, currency)}
                    </td>
                    <td className="py-2">
                      {formatCurrency(row.balance, currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500">
            Showing up to {schedule.rows.length} months. Values are rounded for display.
          </p>
        </section>
      ) : null}
    </div>
  );
}

