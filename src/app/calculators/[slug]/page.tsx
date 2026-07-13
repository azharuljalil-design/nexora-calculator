import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";
import { CalculatorClient } from "@/components/calculators/CalculatorClient";
import { calculatorContentBySlug } from "@/calculators/calculatorContent";
import { CalculatorPageSections } from "@/components/calculators/CalculatorPageSections";

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateMetadata({
  params
}: CalculatorPageProps): Metadata {
  const calculator = findCalculatorBySlug(params.slug);
  const content = calculatorContentBySlug[params.slug];

  if (!calculator) {
    return createPageMetadata({ title: "Calculator not found" });
  }

  const metadata = createPageMetadata({
    title: content?.metaTitle ?? calculator.name,
    path: `/calculators/${calculator.slug}`,
    description: content?.metaDescription ?? calculator.description
  });

  if (calculator.slug === "currency-converter") {
    return {
      ...metadata,
      robots: {
        index: false,
        follow: true
      }
    };
  }

  return metadata;
}

export default function CalculatorEnginePage({
  params
}: CalculatorPageProps) {
  return (
    <div className="space-y-10">
      <CalculatorClient slug={params.slug} />
           <CalculatorPageSections slug={params.slug} />
    </div>
  );
}

