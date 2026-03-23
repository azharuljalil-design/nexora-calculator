import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { calculatorRegistry } from "@/calculators/calculatorRegistry";
import { routes } from "@/lib/routes";

const categoryMaxLinks = 8;

function getCategoryCalculators(categoryName: string) {
  return calculatorRegistry
    .filter((c) => c.category === categoryName)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function HomeCategoryLinkSections() {
  return (
    <section className="space-y-10">
      {calculatorCategories.map((category) => {
        const items = getCategoryCalculators(category.name);
        const shown = items.slice(0, categoryMaxLinks);

        return (
          <section key={category.id} className="space-y-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-text">
                  {category.name}
                </h2>
                <p className="text-sm text-slate-600">
                  {category.description}
                </p>
              </div>
              <Link
                href={routes.category(category.id)}
                className="text-sm font-medium text-primary hover:underline"
              >
                View all
              </Link>
            </div>

            {shown.length === 0 ? (
              <p className="text-sm text-slate-600">
                No calculators available yet.
              </p>
            ) : (
              <ul className="grid gap-2 sm:grid-cols-2">
                {shown.map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={routes.calculator(calc.slug)}
                      className="text-sm text-slate-700 hover:text-primary hover:underline"
                    >
                      {calc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </section>
  );
}

