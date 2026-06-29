import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";
import { createPageMetadata } from "@/lib/seo";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({
  params
}: CalculatorPageProps): Metadata {
  const calculator = findCalculatorBySlug(params.slug);

  if (!calculator) {
    return createPageMetadata({ title: "Calculator not found" });
  }

  return createPageMetadata({
    title: calculator.name,
    path: `/calculators/${calculator.slug}`,
    description: calculator.description
  });
}

export default function CalculatorPage({
  params
}: CalculatorPageProps) {
  const calculator = findCalculatorBySlug(params.slug);

  if (!calculator) {
    notFound();
  }

  // Legacy route kept for backward compatibility.
  // Redirect to the live reusable calculator engine route.
  redirect(`/calculators/${calculator.slug}`);
}

