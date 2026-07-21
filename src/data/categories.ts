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
  intro: string;
  guidance: string;
};

export const calculatorCategories: CalculatorCategory[] = [
  {
    id: "financial",
    name: "Financial Calculators",
    description:
      "Estimate budgets, loans, interest, savings, and other money decisions with clear inputs.",
    intro:
      "Financial calculators help you compare borrowing, saving, investing, and budgeting scenarios before you make a decision.",
    guidance:
      "Use these tools to model possible outcomes from the numbers you enter. Rates, fees, taxes, lender rules, and market conditions can change, so confirm important financial decisions with a qualified professional or official provider.",
  },
  {
    id: "health",
    name: "Health Calculators",
    description:
      "Estimate common body, fitness, and wellness measurements from your personal inputs.",
    intro:
      "Health calculators can make everyday wellness numbers easier to understand, including body measurements, goals, and timing estimates.",
    guidance:
      "Results are general estimates only and are not medical advice, diagnosis, or treatment guidance. Speak with a qualified healthcare professional for medical concerns or decisions.",
  },
  {
    id: "math",
    name: "Math Calculators",
    description:
      "Solve percentages, fractions, ratios, algebra basics, geometry, and other everyday math tasks.",
    intro:
      "Math calculators provide quick step-free answers for school, work, shopping, and personal problem solving.",
    guidance:
      "Use results as a helpful check, but verify academic, engineering, official, or high-stakes calculations against your required method or source.",
  },
  {
    id: "date-time",
    name: "Date and Time Calculators",
    description:
      "Calculate ages, durations, dates, time intervals, weekdays, and planning timelines.",
    intro:
      "Date and time calculators help you count days, compare dates, estimate ages, and plan schedules more quickly.",
    guidance:
      "Calendar results depend on the dates and assumptions entered. Verify legal, immigration, payroll, academic, medical, or official deadlines with the relevant authority.",
  },
  {
    id: "conversion",
    name: "Conversion Calculators",
    description:
      "Convert common units and measurements such as length, weight, temperature, area, volume, and speed.",
    intro:
      "Conversion calculators help translate everyday measurements between metric, imperial, and other common unit systems.",
    guidance:
      "Conversions are estimates based on standard factors and the values you enter. Check professional, laboratory, engineering, or official requirements before relying on converted values.",
  },
  {
    id: "daily-life",
    name: "Daily Life Calculators",
    description:
      "Estimate tips, splits, discounts, time planning, and other common everyday decisions.",
    intro:
      "Daily life calculators are practical tools for quick household, shopping, dining, and planning questions.",
    guidance:
      "These calculators are for general information. Review receipts, policies, contracts, payroll documents, or official rules when a result affects money, employment, legal, or formal decisions.",
  },
];
