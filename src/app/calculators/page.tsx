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
    "Browse all NexoraCalculator tools alphabetically and grouped by category."
});

export default function AllCalculatorsPage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        title="All calculators"
        subtitle="Browse every calculator, grouped by category and sorted alphabetically."
      />

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
                  No calculators are available in this category yet.
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

