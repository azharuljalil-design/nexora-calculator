import Link from "next/link";
import { calculatorSummaries } from "@/data/calculators";
import { routes } from "@/lib/routes";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";

type CalculatorListProps = {
  variant?: "popular" | "latest";
  limit?: number;
};

export function CalculatorList({
  variant = "popular",
  limit = 4
}: CalculatorListProps) {
  const items =
    variant === "popular"
      ? [...calculatorSummaries].sort(
          (a, b) => b.popularityScore - a.popularityScore
        )
      : [...calculatorSummaries].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );

  const sliced = items
    .filter((calculator) => Boolean(findCalculatorBySlug(calculator.slug)))
    .slice(0, limit);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sliced.map((calculator) => (
        <Link
          key={calculator.slug}
          href={routes.calculator(calculator.slug)}
          className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary/60 hover:shadow-md"
        >
          <h3 className="mb-1 text-base font-semibold text-text group-hover:text-secondary">
            {calculator.name}
          </h3>
          <p className="text-sm text-slate-600">
            {calculator.shortDescription}
          </p>
        </Link>
      ))}
    </div>
  );
}

