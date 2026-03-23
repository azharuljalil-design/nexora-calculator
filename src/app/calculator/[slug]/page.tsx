import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { calculatorSummaries } from "@/data/calculators";
import { createPageMetadata } from "@/lib/seo";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({
  params
}: CalculatorPageProps): Metadata {
  const calculator = calculatorSummaries.find(
    (item) => item.slug === params.slug
  );

  if (!calculator) {
    return createPageMetadata({ title: "Calculator not found" });
  }

  return createPageMetadata({
    title: calculator.name,
    path: `/calculators/${calculator.slug}`,
    description: calculator.shortDescription
  });
}

export default function CalculatorPage({
  params
}: CalculatorPageProps) {
  const calculator = calculatorSummaries.find(
    (item) => item.slug === params.slug
  );

  if (!calculator) {
    notFound();
  }

  // Legacy route kept for backward compatibility.
  // Redirect to the live reusable calculator engine route.
  redirect(`/calculators/${calculator.slug}`);
}

