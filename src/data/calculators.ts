import type { CalculatorCategoryId } from "./categories";

export type CalculatorSummary = {
  slug: string;
  name: string;
  categoryId: CalculatorCategoryId;
  shortDescription: string;
  popularityScore: number;
  createdAt: string;
};

// Placeholder data for popular and latest calculators.
// Individual calculator implementations live under app/calculators/[slug].
export const calculatorSummaries: CalculatorSummary[] = [
  {
    slug: "mortgage-calculator",
    name: "Mortgage Calculator",
    categoryId: "financial",
    shortDescription: "Estimate monthly mortgage payments across UK, EU, and USA.",
    popularityScore: 99,
    createdAt: "2026-03-16"
  },
  {
    slug: "salary-calculator",
    name: "Salary / Take-Home Pay Calculator",
    categoryId: "financial",
    shortDescription: "Estimate take-home pay after tax for UK, EU, and USA.",
    popularityScore: 96,
    createdAt: "2026-03-16"
  },
  {
    slug: "vat-calculator",
    name: "VAT Calculator",
    categoryId: "financial",
    shortDescription: "Calculate VAT for UK and European countries.",
    popularityScore: 95,
    createdAt: "2026-03-16"
  },
  {
    slug: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    categoryId: "financial",
    shortDescription: "Calculate sales tax for purchases in the USA.",
    popularityScore: 94,
    createdAt: "2026-03-16"
  },
  {
    slug: "loan-calculator",
    name: "Loan Calculator",
    categoryId: "financial",
    shortDescription: "Calculate monthly payment, total paid, and interest.",
    popularityScore: 93,
    createdAt: "2026-03-16"
  },
  {
    slug: "bmi-calculator",
    name: "BMI Calculator",
    categoryId: "health",
    shortDescription: "Quickly approximate body mass index from height and weight.",
    popularityScore: 94,
    createdAt: "2024-02-02"
  },
  {
    slug: "calorie-calculator",
    name: "Calorie Calculator",
    categoryId: "health",
    shortDescription: "Estimate daily maintenance calories and simple targets.",
    popularityScore: 92,
    createdAt: "2026-03-17"
  },
  {
    slug: "tdee-calculator",
    name: "TDEE Calculator",
    categoryId: "health",
    shortDescription: "Estimate total daily energy expenditure from activity level.",
    popularityScore: 91,
    createdAt: "2026-03-17"
  },
  {
    slug: "bmr-calculator",
    name: "BMR Calculator",
    categoryId: "health",
    shortDescription: "Estimate basal metabolic rate using Mifflin–St Jeor.",
    popularityScore: 90,
    createdAt: "2026-03-17"
  },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    categoryId: "math",
    shortDescription: "Find a percentage value of a number.",
    popularityScore: 90,
    createdAt: "2026-03-16"
  },
  {
    slug: "age-calculator",
    name: "Age Calculator",
    categoryId: "date-time",
    shortDescription: "Calculate age from a date of birth to today or a target date.",
    popularityScore: 89,
    createdAt: "2026-03-16"
  },
  {
    slug: "currency-converter",
    name: "Currency Converter",
    categoryId: "conversion",
    shortDescription: "Convert between GBP, EUR, and USD using mock rates.",
    popularityScore: 91,
    createdAt: "2026-03-16"
  },
  {
    slug: "unit-converter",
    name: "Unit Converter",
    categoryId: "conversion",
    shortDescription: "Convert length, weight, and temperature units.",
    popularityScore: 88,
    createdAt: "2026-03-16"
  },
  {
    slug: "savings-calculator",
    name: "Savings Calculator",
    categoryId: "financial",
    shortDescription: "Estimate savings growth with monthly deposits and interest.",
    popularityScore: 90,
    createdAt: "2026-03-17"
  },
  {
    slug: "investment-calculator",
    name: "Investment Calculator",
    categoryId: "financial",
    shortDescription: "Project investment growth with recurring contributions.",
    popularityScore: 89,
    createdAt: "2026-03-17"
  },
  {
    slug: "retirement-calculator",
    name: "Retirement Calculator",
    categoryId: "financial",
    shortDescription: "Estimate projected retirement savings based on contributions.",
    popularityScore: 88,
    createdAt: "2026-03-17"
  },
  {
    slug: "gpa-calculator",
    name: "GPA Calculator",
    categoryId: "math",
    shortDescription: "Calculate GPA from multiple courses with credits and grades.",
    popularityScore: 87,
    createdAt: "2026-03-17"
  },
  {
    slug: "grade-calculator",
    name: "Grade Calculator",
    categoryId: "math",
    shortDescription: "Find the final exam grade needed to reach a target grade.",
    popularityScore: 86,
    createdAt: "2026-03-17"
  },
  {
    slug: "date-calculator",
    name: "Date Calculator",
    categoryId: "date-time",
    shortDescription: "Add or subtract days, weeks, months, or years from a date.",
    popularityScore: 86,
    createdAt: "2026-03-17"
  },
  {
    slug: "time-duration-calculator",
    name: "Time Duration Calculator",
    categoryId: "date-time",
    shortDescription: "Calculate the time difference between two date-times.",
    popularityScore: 85,
    createdAt: "2026-03-17"
  },
  {
    slug: "body-fat-calculator",
    name: "Body Fat Calculator",
    categoryId: "health",
    shortDescription: "Estimate body fat percentage using the US Navy method.",
    popularityScore: 88,
    createdAt: "2026-03-17"
  },
  {
    slug: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    categoryId: "health",
    shortDescription: "Estimate an ideal weight range based on height and sex.",
    popularityScore: 87,
    createdAt: "2026-03-17"
  },
  {
    slug: "ovulation-calculator",
    name: "Ovulation Calculator",
    categoryId: "health",
    shortDescription: "Estimate ovulation date and fertile window from cycle length.",
    popularityScore: 87,
    createdAt: "2026-03-17"
  },
  {
    slug: "tip-split",
    name: "Tip & Bill Splitter",
    categoryId: "daily-life",
    shortDescription: "Split bills fairly with tip and multiple people.",
    popularityScore: 92,
    createdAt: "2024-05-01"
  },
  {
    slug: "tip-calculator",
    name: "Tip Calculator",
    categoryId: "daily-life",
    shortDescription: "Calculate tip, total bill, and split per person.",
    popularityScore: 91,
    createdAt: "2026-03-17"
  }
];

