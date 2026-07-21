import type { Metadata } from "next";
import type { CalculatorCategoryId } from "@/data/categories";
import { calculatorCategories } from "@/data/categories";
import { createPageMetadata } from "@/lib/seo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { getCalculatorCardsByCategoryId } from "@/lib/calculatorCatalog";

type CategoryPageProps = {
  params: {
    slug: CalculatorCategoryId;
  };
};

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = calculatorCategories.find((c) => c.id === params.slug);

  if (!category) {
    return createPageMetadata({ title: "Category not found" });
  }

  return createPageMetadata({
    title: category.name,
    path: `/category/${category.id}`,
    description: category.description,
  });
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = calculatorCategories.find((c) => c.id === params.slug);

  if (!category) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-text">Category not found</h1>
        <p className="text-sm text-slate-600">
          This calculator category does not exist yet.
        </p>
      </div>
    );
  }

  const calculators = getCalculatorCardsByCategoryId(category.id);

  return (
    <div className="space-y-8">
      <SectionHeading title={category.name} subtitle={category.description} />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
          <p>{category.intro}</p>
          <p>{category.guidance}</p>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Browse the public calculators below. Each link opens a modern
          <span className="font-medium text-slate-700">
            {" "}
            /calculators/[slug]
          </span>
          page with inputs, results, and supporting guidance for that tool.
        </p>
      </section>

      {calculators.length === 0 ? (
        <p className="text-sm text-slate-600">
          No public calculators were found for this category yet.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            {calculators.length} public calculator
            {calculators.length === 1 ? "" : "s"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {calculators.map((calculator) => (
              <Link
                key={calculator.slug}
                href={routes.calculator(calculator.slug)}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/70 hover:shadow-md"
              >
                <h3 className="mb-1 text-base font-semibold text-text group-hover:text-accent">
                  {calculator.name}
                </h3>
                <p className="text-sm text-slate-600">
                  {calculator.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
