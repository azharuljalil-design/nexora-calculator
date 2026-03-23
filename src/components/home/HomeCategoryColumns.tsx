import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { calculatorRegistry } from "@/calculators/calculatorRegistry";
import { routes } from "@/lib/routes";

const minPerCategory = 5;
const maxPerCategory = 8;

function categoryCalculators(categoryName: string) {
  return calculatorRegistry
    .filter((c) => c.category === categoryName)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function fallbackCandidates(categoryName: string, current: string[]) {
  const currentSet = new Set(current);
  const all = calculatorRegistry
    .filter((c) => !currentSet.has(c.slug))
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  const keyword = (s: string) => s.toLowerCase();
  const includesAny = (haystack: string, patterns: string[]) =>
    patterns.some((p) => haystack.includes(p));

  if (categoryName === "Date and Time Calculators") {
    return all.filter((c) =>
      includesAny(keyword(`${c.name} ${c.description}`), [
        "date",
        "time",
        "duration",
        "week",
        "month",
        "year",
        "pregnancy",
        "ovulation",
        "age"
      ])
    );
  }

  if (categoryName === "Conversion Calculators") {
    return all.filter((c) =>
      includesAny(keyword(`${c.name} ${c.description}`), [
        "convert",
        "converter",
        "currency",
        "unit",
        "pounds",
        "kilograms",
        "miles",
        "kilometers"
      ])
    );
  }

  if (categoryName === "Daily Life Calculators") {
    return all.filter((c) =>
      includesAny(keyword(`${c.name} ${c.description}`), [
        "tip",
        "salary",
        "take-home",
        "age",
        "split",
        "budget"
      ])
    );
  }

  return all;
}

export function HomeCategoryColumns() {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-text">
            Calculator categories
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Jump to a tool by category—quick links for finance, health,
            math, tax, and everyday planning.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {calculatorCategories.map((category) => {
          const primary = categoryCalculators(category.name);
          const primarySlugs = primary.map((c) => c.slug);
          const filled = [
            ...primary,
            ...fallbackCandidates(category.name, primarySlugs)
          ];
          const uniqueBySlug = Array.from(
            new Map(filled.map((c) => [c.slug, c])).values()
          );
          let items = uniqueBySlug;
          if (items.length < minPerCategory) {
            const currentSet = new Set(items.map((c) => c.slug));
            const additional = calculatorRegistry
              .filter((c) => !currentSet.has(c.slug))
              .sort((a, b) => a.name.localeCompare(b.name));
            items = [...items, ...additional];
          }
          items = items.slice(0, maxPerCategory);

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

