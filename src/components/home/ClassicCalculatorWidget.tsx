"use client";

import { useMemo, useState } from "react";
import { evaluateExpression } from "@/lib/mathExpression";
import { formatNumber } from "@/lib/format";

type Op = "+" | "-" | "*" | "/";

function mapToDisplay(expr: string) {
  // Keep ASCII-only operators for consistent rendering/encoding.
  return expr;
}

function sanitizeExpr(expr: string) {
  // Allow only digits, operators and decimal point.
  return expr.replace(/[^\d+\-*/.]/g, "");
}

export function ClassicCalculatorWidget() {
  const [expr, setExpr] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const displayExpr = useMemo(() => mapToDisplay(expr), [expr]);

  function canAppendDecimal(currentExpr: string) {
    const lastChunk = currentExpr.split(/[+\-*/]/).pop() ?? "";
    return !lastChunk.includes(".");
  }

  function appendDigit(d: string) {
    setError(null);
    setResult(null);
    setExpr((prev) => sanitizeExpr(prev + d));
  }

  function appendOperator(op: Op) {
    setError(null);
    setResult(null);
    setExpr((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return op === "-" ? op : "";
      if (/[+\-*/]$/.test(trimmed)) {
        return trimmed.replace(/[+\-*/]$/, op);
      }
      return trimmed + op;
    });
  }

  function clear() {
    setExpr("");
    setResult(null);
    setError(null);
  }

  function appendDecimal() {
    setError(null);
    setResult(null);
    setExpr((prev) => {
      if (!canAppendDecimal(prev)) return prev;
      return prev + ".";
    });
  }

  function equals() {
    const normalized = expr.trim();
    if (!normalized) return;
    try {
      const value = evaluateExpression(normalized);
      setResult(String(formatNumber(value, 10)));
      setError(null);
    } catch {
      setError("Invalid expression.");
      setResult(null);
    }
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="sr-only">Calculator</h2>

      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Calculator
          </p>
          <div className="mt-2 font-mono text-lg font-semibold text-text">
            {displayExpr || "0"}
          </div>
          <div
            className="mt-1 text-sm font-semibold text-primary"
            aria-live="polite"
          >
            {error ? error : result ?? ""}
          </div>
        </div>

        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}
        >
          <button
            type="button"
            onClick={() => appendDigit("7")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => appendDigit("8")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => appendDigit("9")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => appendOperator("/")}
            className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
          >
            /
          </button>

          <button
            type="button"
            onClick={() => appendDigit("4")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => appendDigit("5")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => appendDigit("6")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => appendOperator("*")}
            className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
          >
            *
          </button>

          <button
            type="button"
            onClick={() => appendDigit("1")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => appendDigit("2")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => appendDigit("3")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => appendOperator("-")}
            className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
          >
            -
          </button>

          <button
            type="button"
            onClick={() => appendDigit("0")}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            0
          </button>
          <button
            type="button"
            onClick={appendDecimal}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            .
          </button>
          <button
            type="button"
            onClick={clear}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => appendOperator("+")}
            className="rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
          >
            +
          </button>

          <button
            type="button"
            onClick={equals}
            className="col-span-4 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary/90"
          >
            Equals
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          Basic operations: +, -, *, / (in your browser).
        </p>
      </div>
    </section>
  );
}

