import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { getCalculatorCardsByCategoryId } from "@/lib/calculatorCatalog";
import { routes } from "@/lib/routes";

const maxPerCategory = 8;

export function HomeCategoryColumns() {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Calculator categories
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Jump to a tool by category—quick links for finance, health, math,
            tax, and everyday planning.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {calculatorCategories.map((category) => {
          const items = getCalculatorCardsByCategoryId(category.id).slice(
            0,
            maxPerCategory,
          );

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-text">
                  {category.name}
                </h3>
                <Link
                  href={routes.category(category.id)}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View all
                </Link>
              </div>

              {items.length === 0 ? (
                <p className="text-sm text-slate-600">No calculators yet.</p>
              ) : (
                <ul className="list-disc space-y-2 pl-5">
                  {items.map((c) => (
                    <li key={c.slug} className="leading-snug">
                      <Link
                        href={routes.calculator(c.slug)}
                        className="break-words text-sm text-slate-700 hover:text-primary hover:underline"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
