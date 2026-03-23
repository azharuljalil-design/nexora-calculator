"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { calculatorSearchData } from "@/data/calculatorSearchData";
import {
  buildSearchIndex,
  highlightText,
  searchCalculators,
  type SearchIndexItem,
  type SearchResult
} from "@/lib/search";
import { routes } from "@/lib/routes";

type CalculatorSearchBoxProps = {
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  showSuggestions?: boolean;
  maxSuggestions?: number;
  className?: string;
};

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

function HighlightedText({
  text,
  terms
}: {
  text: string;
  terms: string[];
}) {
  const parts = highlightText(text, terms);
  return (
    <>
      {parts.map((p, idx) => {
        const isMatch = terms.some((t) => t && p.toLowerCase() === t.toLowerCase());
        return isMatch ? (
          <mark
            key={idx}
            className="rounded bg-accent/20 px-1 text-text"
          >
            {p}
          </mark>
        ) : (
          <span key={idx}>{p}</span>
        );
      })}
    </>
  );
}

export function CalculatorSearchBox({
  placeholder = "Search calculators...",
  defaultValue = "",
  autoFocus = false,
  showSuggestions = true,
  maxSuggestions = 6,
  className
}: CalculatorSearchBoxProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const debouncedQuery = useDebouncedValue(query, 80);

  const index: SearchIndexItem[] = useMemo(() => {
    return buildSearchIndex(calculatorSearchData);
  }, []);

  const suggestions: SearchResult[] = useMemo(() => {
    if (!showSuggestions) return [];
    const q = debouncedQuery.trim();
    if (q.length < 2) return [];
    return searchCalculators(index, q, maxSuggestions);
  }, [debouncedQuery, index, maxSuggestions, showSuggestions]);

  useEffect(() => {
    setActiveIndex(0);
  }, [suggestions.length, debouncedQuery]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function goToResults(q: string) {
    const trimmed = q.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        e.preventDefault();
        goToResults(query);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, Math.max(suggestions.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = suggestions[activeIndex];
      if (open && selected) {
        router.push(routes.calculator(selected.slug));
        setOpen(false);
      } else {
        goToResults(query);
      }
    }
  }

  return (
    <div ref={containerRef} className={`relative w-full max-w-xl ${className ?? ""}`}>
      <input
        ref={inputRef}
        type="search"
        name="q"
        value={query}
        autoFocus={autoFocus}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm shadow-sm outline-none ring-primary/10 transition focus:border-primary/60 focus:ring-2"
        placeholder={placeholder}
        aria-autocomplete={showSuggestions ? "list" : "none"}
      />
      <button
        type="button"
        onClick={() => goToResults(query)}
        className="absolute inset-y-0 right-2 my-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
        aria-label="Search"
      >
        ⌕
      </button>

      {showSuggestions && open && suggestions.length > 0 ? (
        <div
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
        >
          <ul className="max-h-80 overflow-auto py-2">
            {suggestions.map((s, idx) => (
              <li key={s.slug}>
                <Link
                  href={routes.calculator(s.slug)}
                  className={`block px-4 py-2 text-sm transition ${
                    idx === activeIndex ? "bg-primary/5" : "hover:bg-slate-50"
                  }`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setOpen(false)}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-semibold text-text">
                      <HighlightedText text={s.name} terms={s.matchedTerms} />
                    </p>
                    <p className="text-xs text-slate-500">{s.category}</p>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-600 line-clamp-2">
                    <HighlightedText text={s.description} terms={s.matchedTerms} />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
            Press <span className="font-medium text-slate-700">Enter</span> to open, or click the search icon to view all results.
          </div>
        </div>
      ) : null}
    </div>
  );
}

