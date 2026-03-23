"use client";

import { useMemo, useState } from "react";
import { evaluateExpression } from "@/lib/mathExpression";
import { formatNumber } from "@/lib/format";

type CalcKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "."
  | "+"
  | "-"
  | "*"
  | "/"
  | "C";

const operatorLabels: Record<string, string> = {
  "*": "×",
  "/": "÷"
};

function normalizeForEval(expr: string) {
  // Keep the evaluator input compatible with what it already supports.
  return expr.replace(/[×÷]/g, (m) => (m === "×" ? "*" : "/"));
}

function canAppendDecimal(expr: string) {
  // Only allow one decimal per current number segment.
  const lastNumber = expr.split(/[+\-*/]/).pop() ?? "";
  return !lastNumber.includes(".");
}

export function QuickCalculatorWidget() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayExpr = useMemo(() => {
    return expr.replace(/[*/]/g, (m) => operatorLabels[m] ?? m);
  }, [expr]);

  function append(key: CalcKey) {
    setError(null);
    setResult(null);

    if (key === "C") {
      setExpr("");
      setResult(null);
      setError(null);
      return;
    }

    if (key === ".") {
      if (!canAppendDecimal(expr)) return;
      setExpr((prev) => prev + ".");
      return;
    }

    if (key === "+" || key === "-" || key === "*" || key === "/") {
      // If user clicks operator repeatedly, keep the last one.
      setExpr((prev) => {
        const trimmed = prev.trim();
        if (!trimmed) return key === "-" ? key : "";
        const endsWithOp = /[+\-*/]\s*$/.test(trimmed);
        if (endsWithOp) return trimmed.replace(/[+\-*/]\s*$/, key);
        return prev + key;
      });
      return;
    }

    // Digits
    setExpr((prev) => prev + key);
  }

  function onEquals() {
    const normalized = normalizeForEval(expr).trim();
    if (!normalized) return;

    try {
      const value = evaluateExpression(normalized);
      const formatted = formatNumber(value, 10);
      setResult(String(formatted));
      setError(null);
    } catch {
      setError("Invalid expression.");
      setResult(null);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-text">
            Quick Calculator
          </h2>
          <p className="max-w-prose text-sm text-slate-600">
            Type or tap basic math to get an instant result.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-3">
          <label className="block text-xs font-medium text-slate-700">
            Expression
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={displayExpr}
            onChange={(e) => {
              // Allow only a restricted character set.
              const next = e.target.value.replace(/[^\d+\-*/.×÷]/g, "");
              const normalized = normalizeForEval(next);
              setExpr(normalized);
              setError(null);
              setResult(null);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
            placeholder="e.g. 12+7/3"
            aria-label="Calculator expression"
          />

          {error ? (
            <p role="alert" className="text-xs text-red-500">
              {error}
            </p>
          ) : null}

          <div
            className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"
            aria-live="polite"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Result
            </p>
            <p className="mt-1 text-sm font-semibold text-text">
              {result ?? "—"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-4 gap-2">
            {(["7", "8", "9", "/"] as CalcKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => append(k)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                {k in operatorLabels ? operatorLabels[k] : k}
              </button>
            ))}

            {(["4", "5", "6", "*"] as CalcKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => append(k)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                {k in operatorLabels ? operatorLabels[k] : k}
              </button>
            ))}

            {(["1", "2", "3", "-"] as CalcKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => append(k)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                {k in operatorLabels ? operatorLabels[k] : k}
              </button>
            ))}

            {(["0", ".", "+"] as CalcKey[]).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => append(k)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
              >
                {k}
              </button>
            ))}

            <button
              type="button"
              onClick={() => append("C")}
              className="col-span-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={onEquals}
              className="col-span-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
            >
              Equals
            </button>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Supports +, −, ×, ÷ and decimals.
          </p>
        </div>
      </div>
    </section>
  );
}

