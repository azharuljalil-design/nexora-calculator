"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorForm } from "@/components/calculators/CalculatorForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScientificCalculator } from "@/components/calculators/ScientificCalculator";
import { AmortizationCalculator } from "@/components/calculators/AmortizationCalculator";
import { MortgageCalculator } from "@/components/calculators/MortgageCalculator";
import { LoanCalculator } from "@/components/calculators/LoanCalculator";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { calculatorCategories } from "@/data/categories";
import { routes } from "@/lib/routes";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";

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

      {slug === "retirement-calculator" ? <header className="space-y-2"><h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">UK Retirement Calculator</h1><p className="max-w-3xl text-sm leading-6 text-slate-600">Estimate how your current savings and fixed monthly contributions could grow by your planned retirement age using an expected annual return.</p></header> : <SectionHeading title={slug === "loan-calculator" ? "UK Loan Calculator" : calculator.name} subtitle={calculator.description} />}

      <div className="grid gap-6">
        <div>
          {calculator.renderer === "scientific" ? (
            <ScientificCalculator config={calculator} />
          ) : calculator.renderer === "amortization" ? (
            <AmortizationCalculator config={calculator} />
          ) : calculator.renderer === "mortgage" ? (
            <MortgageCalculator config={calculator} />
          ) : calculator.renderer === "loan" ? (
            <LoanCalculator config={calculator} />
          ) : calculator.renderer === "retirement" ? (
            <RetirementCalculator config={calculator} />
          ) : (
            <CalculatorForm config={calculator} />
          )}
        </div>

              </div>

    </div>
  );
}
