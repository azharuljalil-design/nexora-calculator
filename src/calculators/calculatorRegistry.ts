import type { CalculatorConfig } from "@/types/calculatorTypes";
import { formatCurrency, formatInteger, formatNumber } from "@/lib/format";
import { convertCurrency, convertUnit, unitOptions, type CurrencyCode, type UnitCategory } from "@/lib/conversions";
import { evaluateExpression } from "@/lib/mathExpression";

export const calculatorRegistry: CalculatorConfig[] = [
  {
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "Math Calculators",
    description:
      "Quickly find the percentage value of a number. Ideal for discounts, tax, and simple ratio checks.",
    inputs: [
      {
        name: "number",
        label: "Number",
        type: "number",
        required: true,
        min: 0,
        helperText: "Enter the base number you want a percentage of."
      },
      {
        name: "percentage",
        label: "Percentage (%)",
        type: "number",
        required: true,
        min: 0,
        max: 100,
        helperText: "Enter the percentage between 0 and 100."
      }
    ],
    calculate: (values) => {
      const number = Number(values.number) || 0;
      const percentage = Number(values.percentage) || 0;
      const result = number * (percentage / 100);
      return {
        percentage_value: Number.isFinite(result)
          ? Number(result.toFixed(2))
          : 0
      };
    },
    resultLabels: {
      percentage_value: "Percentage value"
    },
    relatedSlugs: ["loan-calculator", "compound-interest-calculator"]
  },
  {
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "Financial Calculators",
    description:
      "Estimate monthly mortgage payments with taxes, insurance, and HOA for UK, European, and US scenarios.",
    inputs: [
      {
        name: "region",
        label: "Region",
        type: "select",
        required: true,
        options: [
          { value: "UK", label: "United Kingdom" },
          { value: "EU", label: "Europe" },
          { value: "US", label: "United States" }
        ]
      },
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      {
        name: "homePrice",
        label: "Home price",
        type: "number",
        required: true,
        min: 0,
        helperText: "Total property price in the selected currency."
      },
      {
        name: "downPayment",
        label: "Down payment",
        type: "number",
        required: true,
        min: 0,
        helperText:
          "Amount you pay upfront. For many UK/EU/US mortgages this is 5–30% of the home price."
      },
      {
        name: "annualInterestRate",
        label: "Annual interest rate (%)",
        type: "number",
        required: true,
        min: 0,
        helperText: "Nominal annual rate (e.g. 4.5)."
      },
      {
        name: "loanTermYears",
        label: "Loan term (years)",
        type: "number",
        required: true,
        min: 1,
        helperText: "Typical terms: 20–30 years in many regions."
      },
      {
        name: "annualPropertyTax",
        label: "Annual property tax",
        type: "number",
        required: false,
        min: 0,
        helperText:
          "Common in the US. UK/EU users can leave this as 0 if not applicable."
      },
      {
        name: "annualHomeInsurance",
        label: "Annual home insurance",
        type: "number",
        required: false,
        min: 0,
        helperText:
          "Often required by lenders. Enter your yearly premium or leave as 0."
      },
      {
        name: "monthlyHOA",
        label: "Monthly HOA/Service charge",
        type: "number",
        required: false,
        min: 0,
        helperText:
          "Monthly association or service fees. Common in US condos and some UK/EU developments."
      }
    ],
    calculate: (values) => {
      const currency = (values.currency as "GBP" | "EUR" | "USD") || "GBP";
      const homePrice = Number(values.homePrice) || 0;
      const downPayment = Number(values.downPayment) || 0;
      const annualRate = Number(values.annualInterestRate) || 0;
      const years = Number(values.loanTermYears) || 0;
      const annualPropertyTax = Number(values.annualPropertyTax) || 0;
      const annualHomeInsurance = Number(values.annualHomeInsurance) || 0;
      const monthlyHOA = Number(values.monthlyHOA) || 0;

      const loanAmount = Math.max(homePrice - downPayment, 0);
      const months = years * 12;
      const monthlyRate = annualRate / 12 / 100;

      let monthlyPI = 0;
      if (monthlyRate === 0 || !Number.isFinite(monthlyRate)) {
        monthlyPI = months > 0 ? loanAmount / months : 0;
      } else {
        const factor = Math.pow(1 + monthlyRate, months);
        monthlyPI = (loanAmount * monthlyRate * factor) / (factor - 1);
      }

      const monthlyPropertyTax = annualPropertyTax / 12;
      const monthlyInsurance = annualHomeInsurance / 12;

      const totalMonthlyPayment =
        monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHOA;

      const totalLoanPayment = monthlyPI * months;
      const totalInterestPaid = totalLoanPayment - loanAmount;

      return {
        loanAmount: formatCurrency(loanAmount, currency),
        monthlyPrincipalAndInterest: formatCurrency(monthlyPI, currency),
        monthlyPropertyTax: formatCurrency(monthlyPropertyTax, currency),
        monthlyInsurance: formatCurrency(monthlyInsurance, currency),
        monthlyHOA: formatCurrency(monthlyHOA, currency),
        totalMonthlyPayment: formatCurrency(totalMonthlyPayment, currency),
        totalLoanPayment: formatCurrency(totalLoanPayment, currency),
        totalInterestPaid: formatCurrency(totalInterestPaid, currency)
      };
    },
    resultLabels: {
      loanAmount: "Loan amount",
      monthlyPrincipalAndInterest: "Monthly principal & interest",
      monthlyPropertyTax: "Monthly property tax",
      monthlyInsurance: "Monthly insurance",
      monthlyHOA: "Monthly HOA / service charge",
      totalMonthlyPayment: "Total monthly payment",
      totalLoanPayment: "Total loan payment",
      totalInterestPaid: "Total interest paid"
    },
    relatedSlugs: ["loan-calculator", "compound-interest-calculator"]
  },
  {
    name: "Loan Calculator",
    slug: "loan-calculator",
    category: "Financial Calculators",
    description:
      "Calculate monthly repayments, total paid, and interest for personal or business loans.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      {
        name: "loanAmount",
        label: "Loan amount",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "annualInterestRate",
        label: "Annual interest rate (%)",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "loanTermYears",
        label: "Loan term (years)",
        type: "number",
        required: true,
        min: 1
      }
    ],
    calculate: (values) => {
      const currency = (values.currency as "GBP" | "EUR" | "USD") || "GBP";
      const loanAmount = Number(values.loanAmount) || 0;
      const annualRate = Number(values.annualInterestRate) || 0;
      const years = Number(values.loanTermYears) || 0;
      const months = years * 12;
      const monthlyRate = annualRate / 12 / 100;

      let monthlyPayment = 0;
      if (monthlyRate === 0 || !Number.isFinite(monthlyRate)) {
        monthlyPayment = months > 0 ? loanAmount / months : 0;
      } else {
        const factor = Math.pow(1 + monthlyRate, months);
        monthlyPayment =
          (loanAmount * monthlyRate * factor) / (factor - 1);
      }

      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - loanAmount;

      return {
        monthlyPayment: formatCurrency(monthlyPayment, currency),
        totalPayment: formatCurrency(totalPayment, currency),
        totalInterest: formatCurrency(totalInterest, currency)
      };
    },
    resultLabels: {
      monthlyPayment: "Monthly payment",
      totalPayment: "Total paid over term",
      totalInterest: "Total interest"
    },
    relatedSlugs: ["mortgage-calculator", "compound-interest-calculator"]
  },
  {
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "Health Calculators",
    description:
      "Calculate your Body Mass Index using metric or imperial units and see the weight category.",
    inputs: [
      {
        name: "unitSystem",
        label: "Unit system",
        type: "select",
        required: true,
        options: [
          { value: "metric", label: "Metric (cm, kg)" },
          { value: "imperial", label: "Imperial (ft/in, lbs)" }
        ]
      },
      {
        name: "heightCm",
        label: "Height (cm)",
        type: "number",
        required: false,
        min: 0,
        helperText: "Used in metric mode."
      },
      {
        name: "weightKg",
        label: "Weight (kg)",
        type: "number",
        required: false,
        min: 0,
        helperText: "Used in metric mode."
      },
      {
        name: "heightFeet",
        label: "Height (feet)",
        type: "number",
        required: false,
        min: 0,
        helperText: "Used in imperial mode."
      },
      {
        name: "heightInches",
        label: "Height (inches)",
        type: "number",
        required: false,
        min: 0,
        helperText: "Used in imperial mode."
      },
      {
        name: "weightLbs",
        label: "Weight (lbs)",
        type: "number",
        required: false,
        min: 0,
        helperText: "Used in imperial mode."
      }
    ],
    calculate: (values) => {
      const system = (values.unitSystem as string) || "metric";

      let bmi = 0;
      if (system === "metric") {
        const heightCm = Number(values.heightCm);
        const weightKg = Number(values.weightKg);
        if (!heightCm || !weightKg) {
          return {
            bmi: "Enter height and weight in cm/kg.",
            category: "—"
          };
        }
        const heightM = heightCm / 100;
        bmi = weightKg / (heightM * heightM);
      } else {
        const heightFeet = Number(values.heightFeet);
        const heightInches = Number(values.heightInches);
        const weightLbs = Number(values.weightLbs);
        const totalInches =
          heightFeet * 12 + (Number.isFinite(heightInches) ? heightInches : 0);
        if (!totalInches || !weightLbs) {
          return {
            bmi: "Enter height and weight in ft/in and lbs.",
            category: "—"
          };
        }
        bmi = (weightLbs / (totalInches * totalInches)) * 703;
      }

      const rounded = Number(formatNumber(bmi, 1));

      let category = "Normal weight";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi >= 18.5 && bmi < 25) category = "Normal weight";
      else if (bmi >= 25 && bmi < 30) category = "Overweight";
      else if (bmi >= 30) category = "Obese";

      return {
        bmi: rounded,
        category
      };
    },
    resultLabels: {
      bmi: "BMI",
      category: "Category"
    },
    relatedSlugs: []
  },
  {
    name: "Age Calculator",
    slug: "age-calculator",
    category: "Date and Time Calculators",
    description:
      "Work out your age or someone else's age in years, months, days, and totals.",
    inputs: [
      {
        name: "birthDate",
        label: "Date of birth",
        type: "date",
        required: true
      },
      {
        name: "targetDate",
        label: "Target date (optional)",
        type: "date",
        required: false,
        helperText: "Defaults to today if left empty."
      }
    ],
    calculate: (values) => {
      const birthStr = values.birthDate as string;
      const targetStr = (values.targetDate as string) || "";
      if (!birthStr) {
        return {
          years: "Enter a date of birth.",
          months: "—",
          days: "—",
          totalMonths: "—",
          totalWeeks: "—",
          totalDays: "—"
        };
      }

      const birthDate = new Date(birthStr);
      const targetDate = targetStr ? new Date(targetStr) : new Date();

      if (targetDate < birthDate) {
        return {
          years: "Target date cannot be before date of birth.",
          months: "—",
          days: "—",
          totalMonths: "—",
          totalWeeks: "—",
          totalDays: "—"
        };
      }

      const diffMs = targetDate.getTime() - birthDate.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);

      let years = targetDate.getFullYear() - birthDate.getFullYear();
      let months = targetDate.getMonth() - birthDate.getMonth();
      let days = targetDate.getDate() - birthDate.getDate();

      if (days < 0) {
        const prevMonth = new Date(
          targetDate.getFullYear(),
          targetDate.getMonth(),
          0
        );
        days += prevMonth.getDate();
        months -= 1;
      }

      if (months < 0) {
        months += 12;
        years -= 1;
      }

      const totalMonths = years * 12 + months;

      return {
        years,
        months,
        days,
        totalMonths,
        totalWeeks,
        totalDays
      };
    },
    resultLabels: {
      years: "Years",
      months: "Months (remaining)",
      days: "Days (remaining)",
      totalMonths: "Total months",
      totalWeeks: "Total weeks",
      totalDays: "Total days"
    },
    relatedSlugs: []
  },
  {
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "Financial Calculators",
    description:
      "Estimate future investment value with compound growth and regular monthly contributions.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      {
        name: "initialInvestment",
        label: "Initial investment",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "monthlyContribution",
        label: "Monthly contribution",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "annualInterestRate",
        label: "Annual interest rate (%)",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "years",
        label: "Years",
        type: "number",
        required: true,
        min: 1
      },
      {
        name: "compoundsPerYear",
        label: "Compounding frequency",
        type: "select",
        required: true,
        options: [
          { value: "1", label: "Annually" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" }
        ]
      }
    ],
    calculate: (values) => {
      const currency = (values.currency as "GBP" | "EUR" | "USD") || "GBP";
      const initialInvestment = Number(values.initialInvestment) || 0;
      const monthlyContribution = Number(values.monthlyContribution) || 0;
      const annualRate = Number(values.annualInterestRate) || 0;
      const years = Number(values.years) || 0;
      const compoundsPerYear = Number(values.compoundsPerYear) || 1;

      const r = annualRate / 100;
      const n = compoundsPerYear;
      const t = years;

      // Base compound growth for initial investment
      const base =
        n > 0 ? initialInvestment * Math.pow(1 + r / n, n * t) : initialInvestment;

      // Monthly contributions approximated with monthly deposits and compounding at chosen frequency
      const totalMonths = years * 12;
      let contributionsFutureValue = 0;
      const monthlyRate = r / 12;

      if (monthlyRate === 0) {
        contributionsFutureValue = monthlyContribution * totalMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, totalMonths);
        contributionsFutureValue =
          monthlyContribution * ((factor - 1) / monthlyRate);
      }

      const finalBalance = base + contributionsFutureValue;
      const totalContributions =
        initialInvestment + monthlyContribution * totalMonths;
      const totalInterestEarned = finalBalance - totalContributions;

      return {
        finalBalance: formatCurrency(finalBalance, currency),
        totalContributions: formatCurrency(totalContributions, currency),
        totalInterestEarned: formatCurrency(totalInterestEarned, currency)
      };
    },
    resultLabels: {
      finalBalance: "Final balance",
      totalContributions: "Total contributions",
      totalInterestEarned: "Total interest earned"
    },
    relatedSlugs: ["loan-calculator", "mortgage-calculator"]
  },
  {
    name: "VAT Calculator",
    slug: "vat-calculator",
    category: "Financial Calculators",
    description: "Calculate VAT for UK and European countries.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "GBP",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" }
        ],
        helperText: "Choose GBP for UK pricing or EUR for European pricing."
      },
      {
        name: "amount",
        label: "Amount",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "vatRate",
        label: "VAT rate",
        type: "select",
        required: true,
        defaultValue: "20",
        options: [
          { value: "5", label: "5%" },
          { value: "10", label: "10%" },
          { value: "20", label: "20% (default)" },
          { value: "custom", label: "Custom" }
        ]
      },
      {
        name: "customVatRate",
        label: "Custom VAT rate (%)",
        type: "number",
        min: 0,
        max: 100,
        step: 0.01,
        showWhen: (values) => values.vatRate === "custom",
        requiredWhen: (values) => values.vatRate === "custom",
        helperText: "Enter a custom VAT rate percentage (e.g. 19, 21)."
      },
      {
        name: "mode",
        label: "Mode",
        type: "select",
        required: true,
        defaultValue: "add",
        options: [
          { value: "add", label: "Add VAT" },
          { value: "remove", label: "Remove VAT" }
        ]
      }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "GBP";
      const amount = Number(values.amount) || 0;
      const mode = (values.mode as string) || "add";

      const vatRateSelection = (values.vatRate as string) || "20";
      const ratePercent =
        vatRateSelection === "custom"
          ? Number(values.customVatRate) || 0
          : Number(vatRateSelection) || 0;
      const rate = ratePercent / 100;

      let netAmount = 0;
      let grossAmount = 0;

      if (mode === "remove") {
        // amount is gross
        grossAmount = amount;
        netAmount = rate === 0 ? amount : amount / (1 + rate);
      } else {
        // amount is net
        netAmount = amount;
        grossAmount = amount + amount * rate;
      }

      const vatAmount = grossAmount - netAmount;

      return {
        netAmount: formatCurrency(netAmount, currency),
        vatAmount: formatCurrency(vatAmount, currency),
        grossAmount: formatCurrency(grossAmount, currency)
      };
    },
    resultLabels: {
      netAmount: "Net amount",
      vatAmount: "VAT amount",
      grossAmount: "Gross amount"
    },
    relatedSlugs: ["sales-tax-calculator", "salary-calculator"]
  },
  {
    name: "Sales Tax Calculator",
    slug: "sales-tax-calculator",
    category: "Financial Calculators",
    description: "Calculate sales tax for purchases in the USA.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "USD",
        options: [{ value: "USD", label: "USD ($)" }],
        helperText: "US sales tax is typically calculated in USD."
      },
      {
        name: "state",
        label: "State (optional)",
        type: "select",
        required: false,
        defaultValue: "",
        options: [
          { value: "", label: "Not selected" },
          { value: "CA", label: "California (placeholder)" },
          { value: "NY", label: "New York (placeholder)" },
          { value: "TX", label: "Texas (placeholder)" }
        ],
        helperText:
          "This is a placeholder for future state-based rates. Enter your tax rate manually below."
      },
      {
        name: "amount",
        label: "Amount",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "taxRate",
        label: "Tax rate (%)",
        type: "number",
        required: true,
        min: 0,
        max: 20,
        step: 0.01,
        helperText:
          "Enter your combined sales tax rate (state + local), e.g. 8.25."
      }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "USD";
      const amount = Number(values.amount) || 0;
      const taxRate = Number(values.taxRate) || 0;
      const taxAmount = amount * (taxRate / 100);
      const totalAmount = amount + taxAmount;
      return {
        taxAmount: formatCurrency(taxAmount, currency),
        totalAmount: formatCurrency(totalAmount, currency)
      };
    },
    resultLabels: {
      taxAmount: "Tax amount",
      totalAmount: "Total amount"
    },
    relatedSlugs: ["vat-calculator", "mortgage-calculator"]
  },
  {
    name: "Salary / Take-Home Pay Calculator",
    slug: "salary-calculator",
    category: "Financial Calculators",
    description: "Estimate take-home pay after tax for UK, EU, and USA users.",
    inputs: [
      {
        name: "country",
        label: "Country/Region",
        type: "select",
        required: true,
        defaultValue: "UK",
        options: [
          { value: "UK", label: "United Kingdom" },
          { value: "EU", label: "Europe" },
          { value: "USA", label: "United States" }
        ]
      },
      {
        name: "grossSalary",
        label: "Gross salary (annual)",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "taxRate",
        label: "Tax rate (%)",
        type: "number",
        required: true,
        min: 0,
        max: 60,
        step: 0.01,
        helperText:
          "Simple estimate for now. Enter your effective tax rate (income tax + other withholdings)."
      }
    ],
    calculate: (values) => {
      const country = (values.country as string) || "UK";
      const currency: CurrencyCode =
        country === "USA" ? "USD" : country === "EU" ? "EUR" : "GBP";

      const grossSalary = Number(values.grossSalary) || 0;
      const taxRate = Number(values.taxRate) || 0;
      const taxAmount = grossSalary * (taxRate / 100);
      const netSalary = grossSalary - taxAmount;

      return {
        taxAmount: formatCurrency(taxAmount, currency),
        netSalary: formatCurrency(netSalary, currency)
      };
    },
    resultLabels: {
      taxAmount: "Estimated tax",
      netSalary: "Estimated take-home pay"
    },
    relatedSlugs: ["vat-calculator", "mortgage-calculator", "loan-calculator"]
  },
  {
    name: "Currency Converter",
    slug: "currency-converter",
    category: "Conversion Calculators",
    description: "Convert between currencies like GBP, EUR, and USD.",
    inputs: [
      {
        name: "amount",
        label: "Amount",
        type: "number",
        required: true,
        min: 0
      },
      {
        name: "fromCurrency",
        label: "From",
        type: "select",
        required: true,
        defaultValue: "GBP",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      {
        name: "toCurrency",
        label: "To",
        type: "select",
        required: true,
        defaultValue: "USD",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      }
    ],
    calculate: (values) => {
      const amount = Number(values.amount) || 0;
      const from = (values.fromCurrency as CurrencyCode) || "GBP";
      const to = (values.toCurrency as CurrencyCode) || "USD";

      const converted = convertCurrency(amount, from, to);
      return {
        convertedAmount: Number.isFinite(converted)
          ? formatCurrency(converted, to)
          : "Rate unavailable"
      };
    },
    resultLabels: {
      convertedAmount: "Converted amount"
    },
    relatedSlugs: ["unit-converter"]
  },
  {
    name: "Unit Converter",
    slug: "unit-converter",
    category: "Conversion Calculators",
    description: "Convert between common units for length, weight, and temperature.",
    inputs: [
      {
        name: "value",
        label: "Value",
        type: "number",
        required: true
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        required: true,
        defaultValue: "length",
        options: [
          { value: "length", label: "Length" },
          { value: "weight", label: "Weight" },
          { value: "temperature", label: "Temperature" }
        ]
      },
      {
        name: "fromUnit",
        label: "From unit",
        type: "select",
        required: true,
        defaultValue: "meters",
        options: (values) => {
          const category = (values.category as UnitCategory) || "length";
          return unitOptions[category];
        }
      },
      {
        name: "toUnit",
        label: "To unit",
        type: "select",
        required: true,
        defaultValue: "kilometers",
        options: (values) => {
          const category = (values.category as UnitCategory) || "length";
          return unitOptions[category];
        }
      }
    ],
    calculate: (values) => {
      const category = (values.category as UnitCategory) || "length";
      const value = Number(values.value);
      const fromUnit = String(values.fromUnit || "");
      const toUnit = String(values.toUnit || "");

      if (!fromUnit || !toUnit) {
        return { convertedValue: "Select units to convert." };
      }

      const converted = convertUnit(category, value, fromUnit, toUnit);
      return {
        convertedValue: Number.isFinite(converted)
          ? Number(formatNumber(converted, 4))
          : "Invalid conversion"
      };
    },
    resultLabels: {
      convertedValue: "Converted value"
    },
    relatedSlugs: ["currency-converter"]
  },
  {
    name: "BMR Calculator",
    slug: "bmr-calculator",
    category: "Health Calculators",
    description:
      "Estimate Basal Metabolic Rate (BMR) using the Mifflin–St Jeor equation.",
    inputs: [
      { name: "age", label: "Age", type: "number", required: true, min: 10, max: 120 },
      {
        name: "sex",
        label: "Sex",
        type: "select",
        required: true,
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      },
      { name: "heightCm", label: "Height (cm)", type: "number", required: true, min: 50, max: 250 },
      { name: "weightKg", label: "Weight (kg)", type: "number", required: true, min: 20, max: 350 }
    ],
    calculate: (values) => {
      const age = Number(values.age) || 0;
      const sex = String(values.sex || "male");
      const height = Number(values.heightCm) || 0;
      const weight = Number(values.weightKg) || 0;

      const s = sex === "male" ? 5 : -161;
      const bmr = 10 * weight + 6.25 * height - 5 * age + s;

      return { bmr: `${formatInteger(bmr)} kcal/day` };
    },
    resultLabels: { bmr: "BMR" },
    relatedSlugs: ["tdee-calculator", "calorie-calculator", "bmi-calculator"]
  },
  {
    name: "TDEE Calculator",
    slug: "tdee-calculator",
    category: "Health Calculators",
    description:
      "Estimate Total Daily Energy Expenditure (TDEE) based on BMR and activity level.",
    inputs: [
      { name: "age", label: "Age", type: "number", required: true, min: 10, max: 120 },
      {
        name: "sex",
        label: "Sex",
        type: "select",
        required: true,
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      },
      { name: "heightCm", label: "Height (cm)", type: "number", required: true, min: 50, max: 250 },
      { name: "weightKg", label: "Weight (kg)", type: "number", required: true, min: 20, max: 350 },
      {
        name: "activityLevel",
        label: "Activity level",
        type: "select",
        required: true,
        defaultValue: "moderate",
        options: [
          { value: "sedentary", label: "Sedentary (little/no exercise)" },
          { value: "light", label: "Light (1–3 days/week)" },
          { value: "moderate", label: "Moderate (3–5 days/week)" },
          { value: "active", label: "Active (6–7 days/week)" },
          { value: "veryActive", label: "Very active (physical job/training)" }
        ]
      }
    ],
    calculate: (values) => {
      const age = Number(values.age) || 0;
      const sex = String(values.sex || "male");
      const height = Number(values.heightCm) || 0;
      const weight = Number(values.weightKg) || 0;
      const activity = String(values.activityLevel || "moderate");

      const s = sex === "male" ? 5 : -161;
      const bmr = 10 * weight + 6.25 * height - 5 * age + s;

      const multiplier =
        activity === "sedentary"
          ? 1.2
          : activity === "light"
            ? 1.375
            : activity === "moderate"
              ? 1.55
              : activity === "active"
                ? 1.725
                : 1.9;

      const tdee = bmr * multiplier;
      const cut = Math.max(tdee - 500, 0);
      const gain = tdee + 500;

      return {
        tdee: `${formatInteger(tdee)} kcal/day`,
        cutCalories: `${formatInteger(cut)} kcal/day`,
        maintainCalories: `${formatInteger(tdee)} kcal/day`,
        gainCalories: `${formatInteger(gain)} kcal/day`
      };
    },
    resultLabels: {
      tdee: "TDEE",
      cutCalories: "Cut (approx. -500 kcal)",
      maintainCalories: "Maintain",
      gainCalories: "Gain (approx. +500 kcal)"
    },
    relatedSlugs: ["bmr-calculator", "calorie-calculator", "bmi-calculator"]
  },
  {
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    category: "Health Calculators",
    description:
      "Estimate daily calories for maintenance and simple weight change targets based on activity level.",
    inputs: [
      { name: "age", label: "Age", type: "number", required: true, min: 10, max: 120 },
      {
        name: "sex",
        label: "Sex",
        type: "select",
        required: true,
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      },
      { name: "heightCm", label: "Height (cm)", type: "number", required: true, min: 50, max: 250 },
      { name: "weightKg", label: "Weight (kg)", type: "number", required: true, min: 20, max: 350 },
      {
        name: "activityLevel",
        label: "Activity level",
        type: "select",
        required: true,
        defaultValue: "moderate",
        options: [
          { value: "sedentary", label: "Sedentary (little/no exercise)" },
          { value: "light", label: "Light (1–3 days/week)" },
          { value: "moderate", label: "Moderate (3–5 days/week)" },
          { value: "active", label: "Active (6–7 days/week)" },
          { value: "veryActive", label: "Very active (physical job/training)" }
        ],
        helperText:
          "These estimates are general guidance and not medical advice."
      }
    ],
    calculate: (values) => {
      const age = Number(values.age) || 0;
      const sex = String(values.sex || "male");
      const height = Number(values.heightCm) || 0;
      const weight = Number(values.weightKg) || 0;
      const activity = String(values.activityLevel || "moderate");

      const s = sex === "male" ? 5 : -161;
      const bmr = 10 * weight + 6.25 * height - 5 * age + s;

      const multiplier =
        activity === "sedentary"
          ? 1.2
          : activity === "light"
            ? 1.375
            : activity === "moderate"
              ? 1.55
              : activity === "active"
                ? 1.725
                : 1.9;

      const maintenance = bmr * multiplier;
      const mildLoss = Math.max(maintenance - 250, 0);
      const loss = Math.max(maintenance - 500, 0);
      const gain = maintenance + 500;

      return {
        maintenanceCalories: `${formatInteger(maintenance)} kcal/day`,
        mildWeightLossCalories: `${formatInteger(mildLoss)} kcal/day`,
        weightLossCalories: `${formatInteger(loss)} kcal/day`,
        weightGainCalories: `${formatInteger(gain)} kcal/day`
      };
    },
    resultLabels: {
      maintenanceCalories: "Maintenance",
      mildWeightLossCalories: "Mild weight loss (approx. -250 kcal)",
      weightLossCalories: "Weight loss (approx. -500 kcal)",
      weightGainCalories: "Weight gain (approx. +500 kcal)"
    },
    relatedSlugs: ["tdee-calculator", "bmr-calculator", "bmi-calculator"]
  },
  {
    name: "Tip Calculator",
    slug: "tip-calculator",
    category: "Daily Life Calculators",
    description:
      "Calculate tip amount, total bill, and split per person for restaurants and services.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "GBP",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      { name: "billAmount", label: "Bill amount", type: "number", required: true, min: 0 },
      { name: "tipPercentage", label: "Tip percentage (%)", type: "number", required: true, min: 0, max: 100, defaultValue: "15" },
      { name: "numberOfPeople", label: "Number of people", type: "number", required: true, min: 1, defaultValue: "1" }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "GBP";
      const bill = Number(values.billAmount) || 0;
      const tipPct = Number(values.tipPercentage) || 0;
      const people = Math.max(Number(values.numberOfPeople) || 1, 1);

      const tipAmount = bill * (tipPct / 100);
      const totalBill = bill + tipAmount;
      const amountPerPerson = totalBill / people;

      return {
        tipAmount: formatCurrency(tipAmount, currency),
        totalBill: formatCurrency(totalBill, currency),
        amountPerPerson: formatCurrency(amountPerPerson, currency)
      };
    },
    resultLabels: {
      tipAmount: "Tip amount",
      totalBill: "Total bill",
      amountPerPerson: "Amount per person"
    },
    relatedSlugs: ["vat-calculator", "currency-converter"]
  },
  {
    name: "Savings Calculator",
    slug: "savings-calculator",
    category: "Financial Calculators",
    description:
      "Estimate savings growth with monthly deposits and annual interest.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "GBP",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      { name: "startingSavings", label: "Starting savings", type: "number", required: true, min: 0 },
      { name: "monthlyDeposit", label: "Monthly deposit", type: "number", required: true, min: 0 },
      { name: "annualInterestRate", label: "Annual interest rate (%)", type: "number", required: true, min: 0, max: 50, step: 0.01 },
      { name: "years", label: "Years", type: "number", required: true, min: 1, max: 60 }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "GBP";
      const start = Number(values.startingSavings) || 0;
      const monthly = Number(values.monthlyDeposit) || 0;
      const annualRate = Number(values.annualInterestRate) || 0;
      const years = Number(values.years) || 0;

      const months = years * 12;
      const r = annualRate / 100 / 12;
      let balance = start;

      for (let i = 0; i < months; i++) {
        balance = balance * (1 + r) + monthly;
      }

      const totalDeposits = start + monthly * months;
      const totalInterest = balance - totalDeposits;

      return {
        finalBalance: formatCurrency(balance, currency),
        totalDeposits: formatCurrency(totalDeposits, currency),
        totalInterest: formatCurrency(totalInterest, currency)
      };
    },
    resultLabels: {
      finalBalance: "Final balance",
      totalDeposits: "Total deposits",
      totalInterest: "Total interest"
    },
    relatedSlugs: ["compound-interest-calculator", "investment-calculator"]
  },
  {
    name: "Investment Calculator",
    slug: "investment-calculator",
    category: "Financial Calculators",
    description:
      "Project investment growth with recurring contributions and an expected annual return.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "GBP",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      { name: "initialAmount", label: "Initial amount", type: "number", required: true, min: 0 },
      { name: "recurringContribution", label: "Recurring contribution", type: "number", required: true, min: 0 },
      {
        name: "contributionFrequency",
        label: "Contribution frequency",
        type: "select",
        required: true,
        defaultValue: "monthly",
        options: [
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly" }
        ]
      },
      { name: "annualReturnRate", label: "Expected annual return (%)", type: "number", required: true, min: 0, max: 50, step: 0.01 },
      { name: "years", label: "Years", type: "number", required: true, min: 1, max: 60 }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "GBP";
      const initial = Number(values.initialAmount) || 0;
      const contrib = Number(values.recurringContribution) || 0;
      const freq = String(values.contributionFrequency || "monthly");
      const annualRate = Number(values.annualReturnRate) || 0;
      const years = Number(values.years) || 0;

      const periodsPerYear = freq === "weekly" ? 52 : freq === "yearly" ? 1 : 12;
      const totalPeriods = years * periodsPerYear;
      const periodRate = annualRate / 100 / periodsPerYear;

      let balance = initial;
      for (let i = 0; i < totalPeriods; i++) {
        balance = balance * (1 + periodRate) + contrib;
      }

      const totalContributed = initial + contrib * totalPeriods;
      const totalGrowth = balance - totalContributed;

      return {
        endingBalance: formatCurrency(balance, currency),
        totalContributed: formatCurrency(totalContributed, currency),
        totalGrowth: formatCurrency(totalGrowth, currency)
      };
    },
    resultLabels: {
      endingBalance: "Ending balance",
      totalContributed: "Total contributed",
      totalGrowth: "Total growth"
    },
    relatedSlugs: ["savings-calculator", "compound-interest-calculator", "retirement-calculator"]
  },
  {
    name: "Retirement Calculator",
    slug: "retirement-calculator",
    category: "Financial Calculators",
    description:
      "Estimate how your retirement savings could grow based on contributions and expected returns.",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "GBP",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      { name: "currentAge", label: "Current age", type: "number", required: true, min: 16, max: 80 },
      { name: "retirementAge", label: "Retirement age", type: "number", required: true, min: 40, max: 90 },
      { name: "currentSavings", label: "Current savings", type: "number", required: true, min: 0 },
      { name: "monthlyContribution", label: "Monthly contribution", type: "number", required: true, min: 0 },
      { name: "expectedAnnualReturn", label: "Expected annual return (%)", type: "number", required: true, min: 0, max: 50, step: 0.01 }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "GBP";
      const currentAge = Number(values.currentAge) || 0;
      const retirementAge = Number(values.retirementAge) || 0;
      const currentSavings = Number(values.currentSavings) || 0;
      const monthlyContribution = Number(values.monthlyContribution) || 0;
      const annualReturn = Number(values.expectedAnnualReturn) || 0;

      const years = Math.max(retirementAge - currentAge, 0);
      const months = years * 12;
      const r = annualReturn / 100 / 12;

      let balance = currentSavings;
      for (let i = 0; i < months; i++) {
        balance = balance * (1 + r) + monthlyContribution;
      }

      const totalContributions = currentSavings + monthlyContribution * months;
      const totalGrowth = balance - totalContributions;

      return {
        projectedRetirementSavings: formatCurrency(balance, currency),
        totalContributions: formatCurrency(totalContributions, currency),
        totalGrowth: formatCurrency(totalGrowth, currency)
      };
    },
    resultLabels: {
      projectedRetirementSavings: "Projected retirement savings",
      totalContributions: "Total contributions",
      totalGrowth: "Total growth"
    },
    relatedSlugs: ["investment-calculator", "compound-interest-calculator", "savings-calculator"]
  },
  {
    name: "GPA Calculator",
    slug: "gpa-calculator",
    category: "Math Calculators",
    description:
      "Calculate GPA from multiple courses using credits and letter grades (simple 4.0 scale).",
    inputs: [
      {
        name: "courseCount",
        label: "Number of courses",
        type: "select",
        required: true,
        defaultValue: "4",
        options: Array.from({ length: 8 }, (_, i) => ({
          value: String(i + 1),
          label: String(i + 1)
        }))
      },
      ...Array.from({ length: 8 }, (_, i) => {
        const idx = i + 1;
        const showWhen = (values: Record<string, string>) =>
          Number(values.courseCount || 0) >= idx;
        return [
          {
            name: `course${idx}Credits`,
            label: `Course ${idx} credits`,
            type: "number" as const,
            min: 0,
            requiredWhen: showWhen,
            showWhen
          },
          {
            name: `course${idx}Grade`,
            label: `Course ${idx} grade`,
            type: "select" as const,
            requiredWhen: showWhen,
            showWhen,
            options: [
              { value: "A", label: "A (4.0)" },
              { value: "A-", label: "A- (3.7)" },
              { value: "B+", label: "B+ (3.3)" },
              { value: "B", label: "B (3.0)" },
              { value: "B-", label: "B- (2.7)" },
              { value: "C+", label: "C+ (2.3)" },
              { value: "C", label: "C (2.0)" },
              { value: "C-", label: "C- (1.7)" },
              { value: "D", label: "D (1.0)" },
              { value: "F", label: "F (0.0)" }
            ]
          }
        ];
      }).flat()
    ],
    calculate: (values) => {
      const gradePoints: Record<string, number> = {
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        "C+": 2.3,
        C: 2.0,
        "C-": 1.7,
        D: 1.0,
        F: 0.0
      };

      const count = Math.min(Math.max(Number(values.courseCount) || 0, 1), 8);
      let totalCredits = 0;
      let qualityPoints = 0;

      for (let i = 1; i <= count; i++) {
        const credits = Number(values[`course${i}Credits`]) || 0;
        const grade = String(values[`course${i}Grade`] || "");
        const points = gradePoints[grade];
        totalCredits += credits;
        qualityPoints += credits * (points ?? 0);
      }

      const gpa = totalCredits > 0 ? qualityPoints / totalCredits : 0;

      return {
        gpa: Number(formatNumber(gpa, 2)),
        totalCredits: Number(formatNumber(totalCredits, 1))
      };
    },
    resultLabels: {
      gpa: "GPA",
      totalCredits: "Total credits"
    },
    relatedSlugs: ["grade-calculator", "percentage-calculator"]
  },
  {
    name: "Grade Calculator",
    slug: "grade-calculator",
    category: "Math Calculators",
    description:
      "Estimate the final exam grade required to reach a desired overall grade.",
    inputs: [
      { name: "currentGrade", label: "Current grade (%)", type: "number", required: true, min: 0, max: 100, step: 0.01 },
      { name: "completedWeight", label: "Completed weight (%)", type: "number", required: true, min: 0, max: 100, step: 0.01 },
      { name: "desiredFinalGrade", label: "Desired final grade (%)", type: "number", required: true, min: 0, max: 100, step: 0.01 },
      { name: "finalExamWeight", label: "Final exam weight (%)", type: "number", required: true, min: 0.01, max: 100, step: 0.01 }
    ],
    calculate: (values) => {
      const current = Number(values.currentGrade) || 0;
      const completedW = Number(values.completedWeight) || 0;
      const desired = Number(values.desiredFinalGrade) || 0;
      const finalW = Number(values.finalExamWeight) || 0;

      // required = (desired - current*(completedW/100)) / (finalW/100)
      const required = (desired - current * (completedW / 100)) / (finalW / 100);

      return {
        requiredFinalExamGrade: Number.isFinite(required)
          ? Number(formatNumber(required, 2))
          : "—"
      };
    },
    resultLabels: {
      requiredFinalExamGrade: "Required final exam grade (%)"
    },
    relatedSlugs: ["gpa-calculator", "percentage-calculator"]
  },
  {
    name: "Date Calculator",
    slug: "date-calculator",
    category: "Date and Time Calculators",
    description:
      "Add or subtract days, weeks, months, or years from a start date.",
    inputs: [
      { name: "startDate", label: "Start date", type: "date", required: true },
      { name: "amount", label: "Amount", type: "number", required: true, min: 0, step: 1 },
      {
        name: "unit",
        label: "Unit",
        type: "select",
        required: true,
        defaultValue: "days",
        options: [
          { value: "days", label: "Days" },
          { value: "weeks", label: "Weeks" },
          { value: "months", label: "Months" },
          { value: "years", label: "Years" }
        ]
      },
      {
        name: "operation",
        label: "Operation",
        type: "select",
        required: true,
        defaultValue: "add",
        options: [
          { value: "add", label: "Add" },
          { value: "subtract", label: "Subtract" }
        ]
      }
    ],
    calculate: (values) => {
      const startStr = String(values.startDate || "");
      const amount = Number(values.amount) || 0;
      const unit = String(values.unit || "days");
      const op = String(values.operation || "add");
      const sign = op === "subtract" ? -1 : 1;

      const start = new Date(startStr);
      if (Number.isNaN(start.getTime())) {
        return { resultingDate: "Invalid date", dayOfWeek: "—" };
      }

      const d = new Date(start);
      if (unit === "days") d.setDate(d.getDate() + sign * amount);
      else if (unit === "weeks") d.setDate(d.getDate() + sign * amount * 7);
      else if (unit === "months") d.setMonth(d.getMonth() + sign * amount);
      else if (unit === "years") d.setFullYear(d.getFullYear() + sign * amount);

      const resultingDate = d.toISOString().slice(0, 10);
      const dayOfWeek = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(d);

      return { resultingDate, dayOfWeek };
    },
    resultLabels: {
      resultingDate: "Resulting date",
      dayOfWeek: "Day of week"
    },
    relatedSlugs: ["age-calculator", "time-duration-calculator"]
  },
  {
    name: "Time Duration Calculator",
    slug: "time-duration-calculator",
    category: "Date and Time Calculators",
    description: "Calculate the time difference between two date-times.",
    inputs: [
      { name: "startDateTime", label: "Start date & time", type: "datetime", required: true },
      { name: "endDateTime", label: "End date & time", type: "datetime", required: true }
    ],
    calculate: (values) => {
      const start = new Date(String(values.startDateTime || ""));
      const end = new Date(String(values.endDateTime || ""));
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return {
          totalDays: "Invalid date/time",
          totalHours: "—",
          totalMinutes: "—"
        };
      }
      const diffMs = end.getTime() - start.getTime();
      if (diffMs < 0) {
        return {
          totalDays: "End must be after start",
          totalHours: "—",
          totalMinutes: "—"
        };
      }
      const totalMinutes = Math.floor(diffMs / 60000);
      const totalHours = Math.floor(diffMs / 3600000);
      const totalDays = Math.floor(diffMs / 86400000);
      return { totalDays, totalHours, totalMinutes };
    },
    resultLabels: {
      totalDays: "Total days",
      totalHours: "Total hours",
      totalMinutes: "Total minutes"
    },
    relatedSlugs: ["date-calculator", "age-calculator"]
  },
  {
    name: "Body Fat Calculator",
    slug: "body-fat-calculator",
    category: "Health Calculators",
    description:
      "Estimate body fat percentage using the US Navy method (measurements in cm).",
    inputs: [
      {
        name: "sex",
        label: "Sex",
        type: "select",
        required: true,
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      },
      { name: "age", label: "Age", type: "number", required: true, min: 10, max: 120 },
      { name: "heightCm", label: "Height (cm)", type: "number", required: true, min: 50, max: 250 },
      { name: "weightKg", label: "Weight (kg)", type: "number", required: true, min: 20, max: 350, helperText: "Weight is optional for the US Navy formula but included for context." },
      { name: "waistCm", label: "Waist (cm)", type: "number", required: true, min: 30, max: 200 },
      { name: "neckCm", label: "Neck (cm)", type: "number", required: true, min: 20, max: 80 },
      {
        name: "hipCm",
        label: "Hip (cm)",
        type: "number",
        min: 30,
        max: 200,
        showWhen: (v) => v.sex === "female",
        requiredWhen: (v) => v.sex === "female"
      }
    ],
    calculate: (values) => {
      const sex = String(values.sex || "male");
      const height = Number(values.heightCm) || 0;
      const waist = Number(values.waistCm) || 0;
      const neck = Number(values.neckCm) || 0;
      const hip = Number(values.hipCm) || 0;

      const log10 = (x: number) => Math.log(x) / Math.LN10;

      let bf = NaN;
      if (sex === "male") {
        // 495 / (1.0324 - 0.19077*log10(waist-neck) + 0.15456*log10(height)) - 450
        bf =
          495 /
            (1.0324 -
              0.19077 * log10(Math.max(waist - neck, 1e-6)) +
              0.15456 * log10(Math.max(height, 1e-6))) -
          450;
      } else {
        // 495 / (1.29579 - 0.35004*log10(waist+hip-neck) + 0.221*log10(height)) - 450
        bf =
          495 /
            (1.29579 -
              0.35004 * log10(Math.max(waist + hip - neck, 1e-6)) +
              0.221 * log10(Math.max(height, 1e-6))) -
          450;
      }

      const rounded = Number(formatNumber(bf, 1));

      let category = "Average";
      if (sex === "male") {
        if (bf < 6) category = "Essential fat";
        else if (bf < 14) category = "Athletes";
        else if (bf < 18) category = "Fitness";
        else if (bf < 25) category = "Average";
        else category = "Obese";
      } else {
        if (bf < 14) category = "Essential fat";
        else if (bf < 21) category = "Athletes";
        else if (bf < 25) category = "Fitness";
        else if (bf < 32) category = "Average";
        else category = "Obese";
      }

      return {
        bodyFatPercentage: `${rounded}%`,
        category
      };
    },
    resultLabels: {
      bodyFatPercentage: "Body fat %",
      category: "Category"
    },
    relatedSlugs: ["bmi-calculator", "calorie-calculator", "tdee-calculator"]
  },
  {
    name: "Ideal Weight Calculator",
    slug: "ideal-weight-calculator",
    category: "Health Calculators",
    description:
      "Estimate an ideal weight range using the Devine formula (height in cm).",
    inputs: [
      {
        name: "sex",
        label: "Sex",
        type: "select",
        required: true,
        defaultValue: "male",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" }
        ]
      },
      { name: "heightCm", label: "Height (cm)", type: "number", required: true, min: 100, max: 230 }
    ],
    calculate: (values) => {
      const sex = String(values.sex || "male");
      const heightCm = Number(values.heightCm) || 0;
      const inches = heightCm / 2.54;
      const inchesOver5ft = Math.max(inches - 60, 0);
      const base = sex === "male" ? 50 : 45.5;
      const ideal = base + 2.3 * inchesOver5ft;
      const low = ideal * 0.9;
      const high = ideal * 1.1;
      return {
        idealWeightRange: `${formatNumber(low, 1)} – ${formatNumber(high, 1)} kg`
      };
    },
    resultLabels: {
      idealWeightRange: "Ideal weight range"
    },
    relatedSlugs: ["bmi-calculator", "body-fat-calculator"]
  },
  {
    name: "Ovulation Calculator",
    slug: "ovulation-calculator",
    category: "Health Calculators",
    description:
      "Estimate ovulation date and fertile window from the last period start date and average cycle length.",
    inputs: [
      { name: "lastPeriodStartDate", label: "Last period start date", type: "date", required: true },
      { name: "averageCycleLength", label: "Average cycle length (days)", type: "number", required: true, min: 20, max: 45, step: 1, defaultValue: "28" }
    ],
    calculate: (values) => {
      const startStr = String(values.lastPeriodStartDate || "");
      const cycle = Number(values.averageCycleLength) || 28;
      const start = new Date(startStr);
      if (Number.isNaN(start.getTime())) {
        return {
          estimatedOvulationDate: "Invalid date",
          fertileWindowStart: "—",
          fertileWindowEnd: "—"
        };
      }

      // Ovulation approx 14 days before next period.
      const ovulation = new Date(start);
      ovulation.setDate(ovulation.getDate() + (cycle - 14));

      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 5);

      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(fertileEnd.getDate() + 1);

      const fmt = (d: Date) => d.toISOString().slice(0, 10);
      return {
        estimatedOvulationDate: fmt(ovulation),
        fertileWindowStart: fmt(fertileStart),
        fertileWindowEnd: fmt(fertileEnd)
      };
    },
    resultLabels: {
      estimatedOvulationDate: "Estimated ovulation date",
      fertileWindowStart: "Fertile window start",
      fertileWindowEnd: "Fertile window end"
    },
    relatedSlugs: ["date-calculator", "age-calculator"]
  },
  {
    name: "Pregnancy Calculator",
    slug: "pregnancy-calculator",
    category: "Health Calculators",
    description:
      "Estimate due date, current pregnancy week, and trimester based on the last menstrual period (LMP).",
    inputs: [
      {
        name: "lastMenstrualPeriodDate",
        label: "Last menstrual period start date",
        type: "date",
        required: true
      }
    ],
    calculate: (values) => {
      const lmpStr = String(values.lastMenstrualPeriodDate || "");
      const lmp = new Date(lmpStr);
      if (Number.isNaN(lmp.getTime())) {
        return {
          estimatedDueDate: "Invalid date",
          currentPregnancyWeek: "—",
          trimester: "—"
        };
      }

      // Naegele's rule: due date = LMP + 280 days
      const due = new Date(lmp);
      due.setDate(due.getDate() + 280);

      const today = new Date();
      const diffDays = Math.floor(
        (today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24)
      );
      const weeks = diffDays >= 0 ? Math.floor(diffDays / 7) + 1 : 0;

      const trimester =
        weeks <= 0
          ? "—"
          : weeks <= 13
            ? "First trimester"
            : weeks <= 27
              ? "Second trimester"
              : "Third trimester";

      return {
        estimatedDueDate: due.toISOString().slice(0, 10),
        currentPregnancyWeek: weeks > 0 ? `Week ${weeks}` : "Not started yet",
        trimester
      };
    },
    resultLabels: {
      estimatedDueDate: "Estimated due date",
      currentPregnancyWeek: "Current pregnancy week",
      trimester: "Trimester"
    },
    relatedSlugs: ["ovulation-calculator", "date-calculator"]
  },
  {
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    category: "Math Calculators",
    description:
      "Evaluate expressions with parentheses, powers, square root, trig, logs, and π.",
    renderer: "scientific",
    inputs: [
      {
        name: "expression",
        label: "Expression",
        type: "text",
        required: true,
        helperText:
          "Supported: + - * / ^ ( ), sqrt(), sin(), cos(), tan(), log() (base 10), ln(), pi"
      }
    ],
    calculate: (values) => {
      const expression = String(values.expression || "").trim();
      if (!expression) return { result: "Enter an expression." };
      try {
        const result = evaluateExpression(expression);
        return { result: Number(formatNumber(result, 10)) };
      } catch (e) {
        return { result: "Invalid expression" };
      }
    },
    resultLabels: {
      result: "Result"
    },
    relatedSlugs: ["fraction-calculator", "standard-deviation-calculator"]
  },
  {
    name: "Fraction Calculator",
    slug: "fraction-calculator",
    category: "Math Calculators",
    description:
      "Add, subtract, multiply, or divide fractions and see simplified and decimal results.",
    inputs: [
      { name: "fraction1", label: "Fraction 1 (e.g. 3/4)", type: "text", required: true },
      {
        name: "operator",
        label: "Operator",
        type: "select",
        required: true,
        defaultValue: "+",
        options: [
          { value: "+", label: "Add (+)" },
          { value: "-", label: "Subtract (-)" },
          { value: "*", label: "Multiply (×)" },
          { value: "/", label: "Divide (÷)" }
        ]
      },
      { name: "fraction2", label: "Fraction 2 (e.g. 1/6)", type: "text", required: true }
    ],
    calculate: (values) => {
      function parseFraction(s: string) {
        const raw = s.trim();
        const parts = raw.split("/");
        if (parts.length !== 2) throw new Error("Invalid fraction");
        const n = Number(parts[0]);
        const d = Number(parts[1]);
        if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) {
          throw new Error("Invalid fraction");
        }
        return { n, d };
      }
      function gcd(a: number, b: number): number {
        let x = Math.abs(a);
        let y = Math.abs(b);
        while (y) {
          const t = x % y;
          x = y;
          y = t;
        }
        return x || 1;
      }
      function simplify(n: number, d: number) {
        const g = gcd(n, d);
        const nn = n / g;
        const dd = d / g;
        // normalize sign
        if (dd < 0) return { n: -nn, d: -dd };
        return { n: nn, d: dd };
      }

      try {
        const f1 = parseFraction(String(values.fraction1 || ""));
        const f2 = parseFraction(String(values.fraction2 || ""));
        const op = String(values.operator || "+");

        let n = 0;
        let d = 1;
        if (op === "+") {
          n = f1.n * f2.d + f2.n * f1.d;
          d = f1.d * f2.d;
        } else if (op === "-") {
          n = f1.n * f2.d - f2.n * f1.d;
          d = f1.d * f2.d;
        } else if (op === "*") {
          n = f1.n * f2.n;
          d = f1.d * f2.d;
        } else if (op === "/") {
          n = f1.n * f2.d;
          d = f1.d * f2.n;
          if (d === 0) throw new Error("Division by zero");
        }

        const simp = simplify(n, d);
        const dec = simp.n / simp.d;
        return {
          resultFraction: `${n}/${d}`,
          simplifiedFraction: `${simp.n}/${simp.d}`,
          decimalEquivalent: Number(formatNumber(dec, 6))
        };
      } catch {
        return {
          resultFraction: "Invalid input",
          simplifiedFraction: "—",
          decimalEquivalent: "—"
        };
      }
    },
    resultLabels: {
      resultFraction: "Result fraction",
      simplifiedFraction: "Simplified",
      decimalEquivalent: "Decimal"
    },
    relatedSlugs: ["scientific-calculator", "percentage-calculator"]
  },
  {
    name: "Standard Deviation Calculator",
    slug: "standard-deviation-calculator",
    category: "Math Calculators",
    description:
      "Calculate mean, variance, and standard deviation for a list of numbers.",
    inputs: [
      {
        name: "listOfNumbers",
        label: "List of numbers",
        type: "textarea",
        required: true,
        helperText: "Enter values separated by commas or spaces (e.g. 1, 2, 3.5 4)."
      },
      {
        name: "mode",
        label: "Mode",
        type: "select",
        required: true,
        defaultValue: "sample",
        options: [
          { value: "sample", label: "Sample" },
          { value: "population", label: "Population" }
        ]
      }
    ],
    calculate: (values) => {
      const raw = String(values.listOfNumbers || "");
      const mode = String(values.mode || "sample");
      const parts = raw
        .split(/[\s,]+/)
        .map((p) => p.trim())
        .filter(Boolean);
      const nums = parts.map((p) => Number(p)).filter((n) => Number.isFinite(n));

      if (nums.length === 0) {
        return { mean: "Enter numbers", variance: "—", standardDeviation: "—" };
      }
      const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
      const sq = nums.reduce((acc, n) => acc + (n - mean) ** 2, 0);
      const denom = mode === "population" ? nums.length : Math.max(nums.length - 1, 1);
      const variance = sq / denom;
      const sd = Math.sqrt(variance);

      return {
        mean: Number(formatNumber(mean, 6)),
        variance: Number(formatNumber(variance, 6)),
        standardDeviation: Number(formatNumber(sd, 6))
      };
    },
    resultLabels: {
      mean: "Mean",
      variance: "Variance",
      standardDeviation: "Standard deviation"
    },
    relatedSlugs: ["scientific-calculator", "gpa-calculator"]
  },
  {
    name: "Amortization Calculator",
    slug: "amortization-calculator",
    category: "Financial Calculators",
    description:
      "Calculate payments and view an amortization schedule for a fixed-rate loan.",
    renderer: "amortization",
    inputs: [
      {
        name: "currency",
        label: "Currency",
        type: "select",
        required: true,
        defaultValue: "USD",
        options: [
          { value: "GBP", label: "GBP (£)" },
          { value: "EUR", label: "EUR (€)" },
          { value: "USD", label: "USD ($)" }
        ]
      },
      { name: "loanAmount", label: "Loan amount", type: "number", required: true, min: 0 },
      { name: "annualInterestRate", label: "Annual interest rate (%)", type: "number", required: true, min: 0, max: 50, step: 0.01 },
      { name: "loanTermYears", label: "Loan term (years)", type: "number", required: true, min: 1, max: 50 }
    ],
    calculate: (values) => {
      const currency = (values.currency as CurrencyCode) || "USD";
      const loanAmount = Number(values.loanAmount) || 0;
      const annualRate = Number(values.annualInterestRate) || 0;
      const years = Number(values.loanTermYears) || 0;
      const months = years * 12;
      const r = annualRate / 12 / 100;

      let monthlyPayment = 0;
      if (r === 0) monthlyPayment = months > 0 ? loanAmount / months : 0;
      else {
        const factor = Math.pow(1 + r, months);
        monthlyPayment = (loanAmount * r * factor) / (factor - 1);
      }

      const totalPayment = monthlyPayment * months;
      const totalInterest = totalPayment - loanAmount;

      return {
        monthlyPayment: formatCurrency(monthlyPayment, currency),
        totalInterest: formatCurrency(totalInterest, currency),
        totalPayment: formatCurrency(totalPayment, currency)
      };
    },
    resultLabels: {
      monthlyPayment: "Monthly payment",
      totalInterest: "Total interest",
      totalPayment: "Total payment"
    },
    relatedSlugs: ["loan-calculator", "mortgage-calculator"]
  },
  {
    name: "Income Tax Calculator",
    slug: "income-tax-calculator",
    category: "Financial Calculators",
    description:
      "Estimate income tax and after-tax income (simple model; ready for future regional rules).",
    inputs: [
      {
        name: "countryMode",
        label: "Country/Region",
        type: "select",
        required: true,
        defaultValue: "UK",
        options: [
          { value: "UK", label: "United Kingdom" },
          { value: "EU", label: "Europe" },
          { value: "USA", label: "United States" }
        ]
      },
      { name: "annualIncome", label: "Annual income", type: "number", required: true, min: 0 },
      { name: "taxRate", label: "Estimated tax rate (%)", type: "number", required: true, min: 0, max: 60, step: 0.01 }
    ],
    calculate: (values) => {
      const mode = String(values.countryMode || "UK");
      const currency: CurrencyCode =
        mode === "USA" ? "USD" : mode === "EU" ? "EUR" : "GBP";
      const income = Number(values.annualIncome) || 0;
      const rate = Number(values.taxRate) || 0;
      const estimatedTax = income * (rate / 100);
      const afterTaxIncome = income - estimatedTax;
      return {
        estimatedTax: formatCurrency(estimatedTax, currency),
        afterTaxIncome: formatCurrency(afterTaxIncome, currency)
      };
    },
    resultLabels: {
      estimatedTax: "Estimated tax",
      afterTaxIncome: "After-tax income"
    },
    relatedSlugs: ["salary-calculator", "salary-to-hourly-calculator"]
  },
  {
    name: "Salary to Hourly Calculator",
    slug: "salary-to-hourly-calculator",
    category: "Financial Calculators",
    description:
      "Convert annual salary to an hourly rate using hours per week and weeks per year.",
    inputs: [
      { name: "annualSalary", label: "Annual salary", type: "number", required: true, min: 0 },
      { name: "hoursPerWeek", label: "Hours per week", type: "number", required: true, min: 1, max: 168, step: 0.1, defaultValue: "40" },
      { name: "weeksPerYear", label: "Weeks per year", type: "number", required: true, min: 1, max: 52, step: 0.1, defaultValue: "52" }
    ],
    calculate: (values) => {
      const annual = Number(values.annualSalary) || 0;
      const h = Number(values.hoursPerWeek) || 0;
      const w = Number(values.weeksPerYear) || 0;
      const hourly = h > 0 && w > 0 ? annual / (h * w) : NaN;
      return {
        hourlyRate: Number.isFinite(hourly) ? Number(formatNumber(hourly, 2)) : "—"
      };
    },
    resultLabels: { hourlyRate: "Hourly rate" },
    relatedSlugs: ["hourly-to-salary-calculator", "salary-calculator"]
  },
  {
    name: "Hourly to Salary Calculator",
    slug: "hourly-to-salary-calculator",
    category: "Financial Calculators",
    description:
      "Convert hourly rate to weekly, monthly, and annual salary estimates.",
    inputs: [
      { name: "hourlyRate", label: "Hourly rate", type: "number", required: true, min: 0 },
      { name: "hoursPerWeek", label: "Hours per week", type: "number", required: true, min: 1, max: 168, step: 0.1, defaultValue: "40" },
      { name: "weeksPerYear", label: "Weeks per year", type: "number", required: true, min: 1, max: 52, step: 0.1, defaultValue: "52" }
    ],
    calculate: (values) => {
      const rate = Number(values.hourlyRate) || 0;
      const h = Number(values.hoursPerWeek) || 0;
      const w = Number(values.weeksPerYear) || 0;
      const weekly = rate * h;
      const annual = weekly * w;
      const monthly = annual / 12;
      return {
        weeklySalary: Number(formatNumber(weekly, 2)),
        monthlySalary: Number(formatNumber(monthly, 2)),
        annualSalary: Number(formatNumber(annual, 2))
      };
    },
    resultLabels: {
      weeklySalary: "Weekly salary",
      monthlySalary: "Monthly salary",
      annualSalary: "Annual salary"
    },
    relatedSlugs: ["salary-to-hourly-calculator", "salary-calculator"]
  },
  {
    name: "Pounds and Kilograms Converter",
    slug: "pounds-kilograms-converter",
    category: "Conversion Calculators",
    description: "Convert between pounds (lb) and kilograms (kg).",
    inputs: [
      { name: "value", label: "Value", type: "number", required: true },
      {
        name: "direction",
        label: "Direction",
        type: "select",
        required: true,
        defaultValue: "lb-to-kg",
        options: [
          { value: "lb-to-kg", label: "Pounds → Kilograms" },
          { value: "kg-to-lb", label: "Kilograms → Pounds" }
        ]
      }
    ],
    calculate: (values) => {
      const v = Number(values.value);
      const dir = String(values.direction || "lb-to-kg");
      const converted = dir === "kg-to-lb" ? v / 0.45359237 : v * 0.45359237;
      return {
        convertedValue: Number.isFinite(converted)
          ? Number(formatNumber(converted, 4))
          : "—"
      };
    },
    resultLabels: { convertedValue: "Converted value" },
    relatedSlugs: ["unit-converter"]
  },
  {
    name: "Miles and Kilometers Converter",
    slug: "miles-kilometers-converter",
    category: "Conversion Calculators",
    description: "Convert between miles (mi) and kilometers (km).",
    inputs: [
      { name: "value", label: "Value", type: "number", required: true },
      {
        name: "direction",
        label: "Direction",
        type: "select",
        required: true,
        defaultValue: "mi-to-km",
        options: [
          { value: "mi-to-km", label: "Miles → Kilometers" },
          { value: "km-to-mi", label: "Kilometers → Miles" }
        ]
      }
    ],
    calculate: (values) => {
      const v = Number(values.value);
      const dir = String(values.direction || "mi-to-km");
      const converted = dir === "km-to-mi" ? v / 1.609344 : v * 1.609344;
      return {
        convertedValue: Number.isFinite(converted)
          ? Number(formatNumber(converted, 4))
          : "—"
      };
    },
    resultLabels: { convertedValue: "Converted value" },
    relatedSlugs: ["unit-converter", "pounds-kilograms-converter"]
  }
];

// Ensure every calculator page has 4-6 safe, closely related internal links.
// We do this centrally so we don't have to manually tune `relatedSlugs` for every entry.
const registryBySlug = new Map(calculatorRegistry.map((c) => [c.slug, c]));
const allSlugs = calculatorRegistry.map((c) => c.slug);

function uniq(list: string[]): string[] {
  return Array.from(new Set(list));
}

const relatedGroups: string[][] = [
  // Loan & mortgage family
  ["mortgage-calculator", "loan-calculator", "amortization-calculator"],
  // Savings & investing family
  [
    "compound-interest-calculator",
    "savings-calculator",
    "investment-calculator",
    "retirement-calculator"
  ],
  // Tax & salary family (shares percentage + income context)
  [
    "vat-calculator",
    "sales-tax-calculator",
    "income-tax-calculator",
    "salary-calculator",
    "tip-calculator",
    "percentage-calculator"
  ],
  // Health metrics family
  [
    "bmi-calculator",
    "body-fat-calculator",
    "ideal-weight-calculator",
    "calorie-calculator",
    "bmr-calculator",
    "tdee-calculator"
  ],
  // Date & personal milestones family
  [
    "age-calculator",
    "date-calculator",
    "time-duration-calculator",
    "ovulation-calculator",
    "pregnancy-calculator"
  ],
  // Education & grading family
  ["gpa-calculator", "grade-calculator", "percentage-calculator"],
  // Math tooling family
  [
    "scientific-calculator",
    "fraction-calculator",
    "standard-deviation-calculator",
    "percentage-calculator"
  ],
  // Conversions family
  [
    "currency-converter",
    "unit-converter",
    "pounds-kilograms-converter",
    "miles-kilometers-converter"
  ],
  // Pay rate conversions
  [
    "salary-to-hourly-calculator",
    "hourly-to-salary-calculator",
    "salary-calculator"
  ]
];

function buildRelatedSlugs(calculator: CalculatorConfig): string[] {
  const currentSlug = calculator.slug;

  const existing = (calculator.relatedSlugs ?? [])
    .filter((s) => s !== currentSlug && registryBySlug.has(s))
    // Keep original order while de-duping
    .filter((s, idx, arr) => arr.indexOf(s) === idx);

  const groupCandidates = uniq(
    relatedGroups
      .filter((g) => g.includes(currentSlug))
      .flat()
      .filter((s) => s !== currentSlug && registryBySlug.has(s))
  );

  const sameCategory = calculatorRegistry
    .filter((c) => c.slug !== currentSlug && c.category === calculator.category)
    .map((c) => c.slug);

  const global = allSlugs.filter((s) => s !== currentSlug);

  let candidates = uniq([
    ...existing,
    ...groupCandidates,
    ...sameCategory,
    ...global
  ]).filter((s) => registryBySlug.has(s) && s !== currentSlug);

  // Requirement: 4–6 internal links per calculator page.
  candidates = candidates.slice(0, 6);
  if (candidates.length < 4) {
    candidates = uniq([...candidates, ...global]).slice(0, 6);
  }

  return candidates;
}

for (const calculator of calculatorRegistry) {
  calculator.relatedSlugs = buildRelatedSlugs(calculator);
}

export function findCalculatorBySlug(slug: string) {
  return calculatorRegistry.find((calculator) => calculator.slug === slug);
}

