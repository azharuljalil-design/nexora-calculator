import { calculatorRegistry } from "@/calculators/calculatorRegistry";
import { discoveryExcludedCalculatorSlugs } from "@/lib/calculatorCatalog";

export type CalculatorSearchDataItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

// Serializable client-side search dataset.
// Note: This intentionally includes only text fields (no formula functions).
export const calculatorSearchData: CalculatorSearchDataItem[] = calculatorRegistry
  .filter((c) => !discoveryExcludedCalculatorSlugs.has(c.slug))
  .map((c) => ({
    slug: c.slug,
    name: c.name,
    category: c.category,
    description: c.description
  }));

