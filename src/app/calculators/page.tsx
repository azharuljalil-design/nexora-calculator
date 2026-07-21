import type { Metadata } from "next";
import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { createPageMetadata } from "@/lib/seo";
import { getCalculatorCardsByCategoryId } from "@/lib/calculatorCatalog";
import { routes } from "@/lib/routes";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = createPageMetadata({
  title: "All Calculators",
  path: "/calculators",
  description:
    "Browse NexoraCalculator's public tools grouped by finance, tax, health, math, conversion, date and time, and everyday categories.",
});

export default function AllCalculatorsPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        title="All calculators"
        subtitle="Browse public calculators grouped by category and sorted alphabetically."
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm sm:p-8">
        <p>
          NexoraCalculator organizes free online calculators into practical
          categories so you can quickly find the right tool for finance, tax,
          health, math, conversions, date and time, and everyday planning.
        </p>
        <p className="mt-3">
          Calculator results are estimates based on the inputs and assumptions
          you provide. For high-impact financial, tax, medical, legal, payroll,
          academic, or official-rule decisions, verify results with a qualified
          professional or relevant official source.
        </p>
      </section>

      <div className="space-y-10">
        {calculatorCategories.map((category) => {
          const cards = getCalculatorCardsByCategoryId(category.id);
          return (
            <section key={category.id} className="space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-text">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {category.description}
                  </p>
                </div>
                <Link
                  href={routes.category(category.id)}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View category
                </Link>
              </div>

              {cards.length === 0 ? (
                <p className="text-sm text-slate-600">
                  No public calculators are available in this category yet.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {cards.map((calculator) => (
                    <Link
                      key={calculator.slug}
                      href={routes.calculator(calculator.slug)}
                      className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-md"
                    >
                      <h3 className="mb-1 text-base font-semibold text-text group-hover:text-secondary">
                        {calculator.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {calculator.description}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
