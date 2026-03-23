export type CalculatorCategoryId =
  | "financial"
  | "health"
  | "math"
  | "date-time"
  | "conversion"
  | "daily-life";

export type CalculatorCategory = {
  id: CalculatorCategoryId;
  name: string;
  description: string;
};

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: "financial",
    name: "Financial Calculators",
    description:
      "Plan budgets, loans, investments, and savings with clarity."
  },
  {
    id: "health",
    name: "Health Calculators",
    description:
      "Track health metrics and wellness insights with simple tools."
  },
  {
    id: "math",
    name: "Math Calculators",
    description:
      "Solve everyday math problems from percentages to algebra basics."
  },
  {
    id: "date-time",
    name: "Date and Time Calculators",
    description:
      "Work with durations, due dates, timelines, and scheduling."
  },
  {
    id: "conversion",
    name: "Conversion Calculators",
    description:
      "Convert units, currencies, and measurements in a few clicks."
  },
  {
    id: "daily-life",
    name: "Daily Life Calculators",
    description:
      "Handle everyday decisions from tips to sharing costs and more."
  }
];

