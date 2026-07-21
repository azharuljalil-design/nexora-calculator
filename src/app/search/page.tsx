import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";
import { SearchResultsClient } from "@/components/search/SearchResultsClient";
import { Suspense } from "react";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Search",
    path: "/search",
    description:
      "Search across financial, health, math, date, conversion, and daily life calculators on NexoraCalculator.",
  }),
  robots: {
    index: false,
    follow: true,
  },
};

export default function SearchPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        title="Search calculators"
        subtitle="Search public calculators by name, category, or use case."
      />
      <p className="max-w-3xl text-sm text-slate-600">
        Search only includes public calculator pages on NexoraCalculator. Use
        results as estimates based on your inputs, and verify important finance,
        tax, medical, legal, payroll, academic, or official decisions with the
        appropriate professional or source.
      </p>
      <Suspense
        fallback={
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            Loading search…
          </div>
        }
      >
        <SearchResultsClient />
      </Suspense>
    </div>
  );
}
