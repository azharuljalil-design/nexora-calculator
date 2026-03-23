"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { CalculatorSearchBox } from "@/components/search/CalculatorSearchBox";
import { calculatorSearchData } from "@/data/calculatorSearchData";
import { buildSearchIndex, highlightText, searchCalculators } from "@/lib/search";
import { routes } from "@/lib/routes";

function Highlighted({ text, terms }: { text: string; terms: string[] }) {
  const parts = highlightText(text, terms);
  return (
    <>
      {parts.map((p, idx) => {
        const isMatch = terms.some(
          (t) => t && p.toLowerCase() === t.toLowerCase()
        );
        return isMatch ? (
          <mark key={idx} className="rounded bg-accent/20 px-1 text-text">
            {p}
          </mark>
        ) : (
          <span key={idx}>{p}</span>
        );
      })}
    </>
  );
}

export function SearchResultsClient() {
  const sp = useSearchParams();
  const q = sp.get("q") ?? "";

  const index = useMemo(() => buildSearchIndex(calculatorSearchData), []);

  const results = useMemo(() => {
    const trimmed = q.trim();
    if (trimmed.length < 2) return [];
    return searchCalculators(index, trimmed, 100);
  }, [index, q]);

  const matchedTerms = useMemo(() => {
    // Use union of matched terms from top results for highlighting
    const set = new Set<string>();
    results.slice(0, 10).forEach((r) => r.matchedTerms.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [results]);

  return (
    <div className="space-y-8">
      <CalculatorSearchBox
        defaultValue={q}
        autoFocus
        placeholder="Search calculators by name, category, or keyword..."
        showSuggestions
      />

      {q.trim().length < 2 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          Type at least <span className="font-semibold">2 characters</span> to
          search across calculator names, categories, slugs, and descriptions.
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
          <p className="font-semibold text-text">No results</p>
          <p className="mt-1">
            Try a different keyword (e.g. “mortgage”, “BMI”, “tax”, “converter”).
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            {results.length} result{results.length === 1 ? "" : "s"} for{" "}
            <span className="font-medium text-slate-700">“{q.trim()}”</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {results.map((r) => (
              <Link
                key={r.slug}
                href={routes.calculator(r.slug)}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-md"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold text-text group-hover:text-secondary">
                    <Highlighted text={r.name} terms={matchedTerms} />
                  </h3>
                  <p className="text-xs text-slate-500">{r.category}</p>
                </div>
                <p className="mt-1 text-sm text-slate-600 line-clamp-3">
                  <Highlighted text={r.description} terms={matchedTerms} />
                </p>
                <p className="mt-2 text-[11px] text-slate-400">
                  {routes.calculator(r.slug)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

