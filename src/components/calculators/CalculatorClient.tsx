"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorForm } from "@/components/calculators/CalculatorForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScientificCalculator } from "@/components/calculators/ScientificCalculator";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";
import { calculatorCategories } from "@/data/categories";
import { routes } from "@/lib/routes";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";
import { AdPlaceholderClient } from "@/components/ads/AdPlaceholderClient";

type CalculatorClientProps = {
  slug: string;
};

export function CalculatorClient({ slug }: CalculatorClientProps) {
  const calculator = findCalculatorBySlug(slug);

  if (!calculator) {
    notFound();
  }

  const category = calculatorCategories.find((c) => c.name === calculator.category) ?? null;


  return (
    <div className="space-y-8">
      <nav className="text-xs text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href={routes.home} className="hover:text-primary">
              Home
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li>
            {category ? (
              <Link
                href={routes.category(category.id)}
                className="hover:text-primary"
              >
                {category.name}
              </Link>
            ) : (
              <span>{calculator.category}</span>
            )}
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-slate-700">{calculator.name}</li>
        </ol>
      </nav>

      <SectionHeading
        title={calculator.name}
        subtitle={calculator.description}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          {calculator.renderer === "scientific" ? (
            <ScientificCalculator config={calculator} />
          ) : calculator.renderer === "amortization" ? (
            <AmortizationCalculator config={calculator} />
          ) : (
            <CalculatorForm config={calculator} />
          )}
        </div>

        <aside className="hidden lg:block">
          <AdPlaceholderClient variant="sidebar" />
        </aside>
      </div>

    </div>
  );
}

