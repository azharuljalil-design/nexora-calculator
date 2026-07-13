import { calculatorRegistry } from "@/calculators/calculatorRegistry";
import {
  discoveryExcludedCalculatorSlugs,
  getCategoryByName
} from "@/lib/calculatorCatalog";
import type { CalculatorCategoryId } from "./categories";

export type CalculatorSummary = {
  slug: string;
  name: string;
  categoryId: CalculatorCategoryId;
  shortDescription: string;
  popularityScore: number;
  createdAt: string;
};

const popularityScoresBySlug: Record<string, number> = {
  "mortgage-calculator": 99,
  "salary-calculator": 96,
  "vat-calculator": 95,
  "sales-tax-calculator": 94,
  "loan-calculator": 93,
  "bmi-calculator": 94,
  "calorie-calculator": 92,
  "tdee-calculator": 91,
  "tip-calculator": 91,
  "bmr-calculator": 90,
  "percentage-calculator": 90,
  "savings-calculator": 90,
  "age-calculator": 89,
  "investment-calculator": 89,
  "retirement-calculator": 88,
  "unit-converter": 88,
  "body-fat-calculator": 88,
  "gpa-calculator": 87,
  "ideal-weight-calculator": 87,
  "ovulation-calculator": 87,
  "grade-calculator": 86,
  "date-calculator": 86,
  "time-duration-calculator": 85
};

const createdDatesBySlug: Record<string, string> = {
  "bmi-calculator": "2024-02-02",
  "percentage-calculator": "2026-03-16",
  "mortgage-calculator": "2026-03-16",
  "loan-calculator": "2026-03-16",
  "age-calculator": "2026-03-16",
  "compound-interest-calculator": "2026-03-16",
  "vat-calculator": "2026-03-16",
  "sales-tax-calculator": "2026-03-16",
  "salary-calculator": "2026-03-16",
  "unit-converter": "2026-03-16"
};

// Public calculator summary data used for discovery.
// Derived from the registry so cards, category listings, search, and sitemap
// share the same public inventory. Hidden calculators stay available by direct
// route, but are intentionally excluded from this discovery dataset.
export const calculatorSummaries: CalculatorSummary[] = calculatorRegistry
  .filter((calculator) => !discoveryExcludedCalculatorSlugs.has(calculator.slug))
  .map((calculator) => {
    const category = getCategoryByName(calculator.category);

    return {
      slug: calculator.slug,
      name: calculator.name,
      categoryId: category?.id ?? "daily-life",
      shortDescription: calculator.description,
      popularityScore: popularityScoresBySlug[calculator.slug] ?? 80,
      createdAt: createdDatesBySlug[calculator.slug] ?? "2026-03-17"
    };
  });
