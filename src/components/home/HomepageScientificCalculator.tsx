"use client";

import { ScientificCalculator } from "@/components/calculators/ScientificCalculator";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";

export function HomepageScientificCalculator() {
  const calculator = findCalculatorBySlug("scientific-calculator");

  if (!calculator || calculator.renderer !== "scientific") return null;

  return (
    <div className="w-full rounded-3xl border border-slate-200/70 bg-slate-50/40 p-3 sm:p-4">
      <ScientificCalculator config={calculator} mode="homepage" />
    </div>
  );
}

