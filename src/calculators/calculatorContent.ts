export type CalculatorFaq = { question: string; answer: string };

export type CalculatorContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  whatItDoes: string[];
  howToUse: string[];
  methodology: string[];
  example: {
    scenario: string;
    steps: string[];
    result: string;
  };
  faqs: CalculatorFaq[];
};

export const calculatorContentBySlug: Record<string, CalculatorContent> = {
  "percentage-calculator": {
    slug: "percentage-calculator",
    metaTitle: "Percentage Calculator",
    metaDescription:
      "Calculate a percentage of a number instantly. Useful for discounts, tax estimates, and quick comparisons.",
    whatItDoes: [
      "Finds the value of a given percentage of a number.",
      "Helps you estimate discounts, markups, and portions quickly."
    ],
    howToUse: [
      "Enter the base number.",
      "Enter the percentage (0–100).",
      "Click Calculate to see the percentage value."
    ],
    methodology: [
      "Uses \(result = number × (percentage ÷ 100)\).",
      "Rounds the displayed result to 2 decimals for readability."
    ],
    example: {
      scenario: "What is 15% of 200?",
      steps: ["Number = 200", "Percentage = 15", "Compute 200 × 0.15"],
      result: "Percentage value = 30.00"
    },
    faqs: [
      {
        question: "Can I use decimals in the percentage?",
        answer: "Yes. You can enter values like 7.5%."
      },
      {
        question: "Is this the same as percentage change?",
        answer:
          "No. This calculator finds a portion of a number. Percentage change compares two numbers (old vs new)."
      }
    ]
  },

  "mortgage-calculator": {
    slug: "mortgage-calculator",
    metaTitle: "Mortgage Calculator (UK, EU, USA)",
    metaDescription:
      "Estimate monthly mortgage payments with amortization, plus optional taxes, insurance, and HOA for UK, Europe, and USA.",
    whatItDoes: [
      "Estimates monthly principal-and-interest for a fixed-rate mortgage.",
      "Optionally adds property tax, home insurance, and HOA/service charges to show a realistic monthly total."
    ],
    howToUse: [
      "Choose your region and currency (GBP/EUR/USD).",
      "Enter home price, down payment, interest rate, and term.",
      "Add optional tax/insurance/HOA values (commonly used in the USA).",
      "Click Calculate to see monthly and lifetime totals."
    ],
    methodology: [
      "Loan amount = home price − down payment.",
      "Monthly rate \(r) = annual rate ÷ 12 ÷ 100; payments \(n) = years × 12.",
      "Uses the standard amortization payment formula; if \(r = 0) uses loan amount ÷ n.",
      "Monthly tax/insurance = annual amounts ÷ 12; total monthly = PI + tax + insurance + HOA."
    ],
    example: {
      scenario:
        "Home price £300,000, down payment £60,000, 4.5% interest, 25 years (no extras).",
      steps: [
        "Loan amount = 300,000 − 60,000 = 240,000",
        "n = 25 × 12 = 300 monthly payments",
        "Compute amortized monthly principal & interest"
      ],
      result:
        "Outputs show monthly principal & interest and total interest paid over the term."
    },
    faqs: [
      {
        question: "What if my interest rate is 0%?",
        answer:
          "The calculator switches to a zero-interest formula: loan amount divided by number of payments."
      },
      {
        question: "Do UK/EU mortgages use property tax and HOA?",
        answer:
          "Not always in the same way as the USA. If they don’t apply to you, leave them as 0."
      }
    ]
  },

  "loan-calculator": {
    slug: "loan-calculator",
    metaTitle: "Loan Payment Calculator",
    metaDescription:
      "Calculate monthly loan payments, total paid, and total interest using amortization (supports GBP, EUR, USD).",
    whatItDoes: [
      "Calculates the monthly payment for a fixed-rate loan.",
      "Shows total payment and total interest over the full term."
    ],
    howToUse: [
      "Select your currency (GBP/EUR/USD).",
      "Enter loan amount, annual interest rate, and loan term in years.",
      "Click Calculate to see monthly and total costs."
    ],
    methodology: [
      "Monthly rate \(r) = annual rate ÷ 12 ÷ 100; payments \(n) = years × 12.",
      "Monthly payment uses the standard amortization formula; if \(r = 0) uses principal ÷ n."
    ],
    example: {
      scenario: "Loan $10,000 at 6% for 3 years.",
      steps: [
        "r = 0.06 ÷ 12",
        "n = 36",
        "Compute monthly payment and totals"
      ],
      result: "Outputs show monthly payment, total paid, and total interest."
    },
    faqs: [
      {
        question: "Does this include fees or compounding variations?",
        answer:
          "No. It assumes a simple fixed-rate amortized loan without fees. Add fees by increasing the loan amount."
      }
    ]
  },

  "bmi-calculator": {
    slug: "bmi-calculator",
    metaTitle: "BMI Calculator (Metric & Imperial)",
    metaDescription:
      "Calculate BMI using metric (cm/kg) or imperial (ft/in/lbs) units and see the BMI category.",
    whatItDoes: [
      "Calculates Body Mass Index (BMI) from height and weight.",
      "Returns a BMI category (Underweight, Normal, Overweight, Obese)."
    ],
    howToUse: [
      "Choose Metric or Imperial units.",
      "Enter height and weight for the selected unit system.",
      "Click Calculate to see BMI and category."
    ],
    methodology: [
      "Metric: \(BMI = kg ÷ (m²), where m = cm ÷ 100).",
      "Imperial: \(BMI = (lbs ÷ inches²) × 703).",
      "Category thresholds follow standard BMI bands."
    ],
    example: {
      scenario: "Metric: 170 cm and 65 kg.",
      steps: ["Height in meters = 1.70", "BMI = 65 ÷ (1.7²)"],
      result: "BMI ≈ 22.5 → Normal weight"
    },
    faqs: [
      {
        question: "Is BMI a diagnosis?",
        answer:
          "No. BMI is a screening metric and doesn’t account for muscle mass, age, or body composition."
      }
    ]
  },

  "age-calculator": {
    slug: "age-calculator",
    metaTitle: "Age Calculator",
    metaDescription:
      "Calculate age in years, months, and days from a birth date to today or a chosen target date.",
    whatItDoes: [
      "Computes your age breakdown (years, months, days) for a target date.",
      "Also provides total days, weeks, and months elapsed."
    ],
    howToUse: [
      "Enter a date of birth.",
      "Optionally choose a target date (defaults to today).",
      "Click Calculate to see the age breakdown."
    ],
    methodology: [
      "Uses calendar-aware year/month/day differences (not a simple days ÷ 365 approximation).",
      "Validates that the target date is not before the birth date."
    ],
    example: {
      scenario: "Born 2000-01-15, target 2026-03-17.",
      steps: ["Set birth date", "Set target date", "Compute Y/M/D difference"],
      result: "Outputs include years, remaining months/days, and total days/weeks."
    },
    faqs: [
      {
        question: "Why do months and days vary?",
        answer:
          "Months have different lengths, so a calendar-based calculation is more accurate than using averages."
      }
    ]
  },

  "compound-interest-calculator": {
    slug: "compound-interest-calculator",
    metaTitle: "Compound Interest Calculator",
    metaDescription:
      "Estimate future investment value with compound growth and monthly contributions (GBP, EUR, USD).",
    whatItDoes: [
      "Projects a future balance from an initial investment plus monthly contributions.",
      "Shows total contributions and estimated interest earned."
    ],
    howToUse: [
      "Select currency and enter your starting investment.",
      "Enter monthly contribution, annual interest rate, years, and compounding frequency.",
      "Click Calculate to see final balance and breakdown."
    ],
    methodology: [
      "Applies compound growth to the initial principal using the selected compounding frequency.",
      "Adds recurring monthly contributions with a monthly-growth approximation for realism and simplicity."
    ],
    example: {
      scenario: "Start £5,000, add £200/month, 6% for 10 years.",
      steps: ["Set inputs", "Compute compounded principal", "Add future value of contributions"],
      result: "Outputs show final balance, total contributions, and interest earned."
    },
    faqs: [
      {
        question: "Is this guaranteed?",
        answer:
          "No. It’s an estimate based on constant returns. Real returns vary over time."
      }
    ]
  },

  "vat-calculator": {
    slug: "vat-calculator",
    metaTitle: "VAT Calculator (Add or Remove VAT)",
    metaDescription:
      "Calculate net, VAT amount, and gross totals. Supports adding VAT or removing VAT with common rates and custom rate.",
    whatItDoes: [
      "Calculates VAT amount and totals for UK/European pricing.",
      "Supports both adding VAT to a net amount and removing VAT from a gross amount."
    ],
    howToUse: [
      "Choose currency (GBP or EUR).",
      "Enter the amount (net for Add VAT, gross for Remove VAT).",
      "Select a VAT rate or choose Custom to enter your own rate.",
      "Choose Add VAT or Remove VAT, then click Calculate."
    ],
    methodology: [
      "Add VAT: VAT = amount × rate; gross = amount + VAT; net = amount.",
      "Remove VAT: net = amount ÷ (1 + rate); VAT = amount − net; gross = amount.",
      "Rate is the percentage divided by 100."
    ],
    example: {
      scenario: "Remove 20% VAT from €120 (gross).",
      steps: ["Amount = 120", "Rate = 20% → 0.20", "Net = 120 ÷ 1.2"],
      result: "Net = €100, VAT = €20, Gross = €120"
    },
    faqs: [
      {
        question: "What does “Remove VAT” mean?",
        answer:
          "It assumes the amount you entered already includes VAT and calculates the net amount before VAT."
      }
    ]
  },

  "sales-tax-calculator": {
    slug: "sales-tax-calculator",
    metaTitle: "Sales Tax Calculator (USA)",
    metaDescription:
      "Calculate sales tax and total purchase amount using a manual tax rate. Built for USA purchases.",
    whatItDoes: [
      "Computes sales tax from a purchase amount and tax rate.",
      "Outputs tax amount and total amount after tax."
    ],
    howToUse: [
      "Enter the purchase amount.",
      "Enter your combined sales tax rate (state + local).",
      "Optionally choose a state (placeholder for future auto-rates).",
      "Click Calculate."
    ],
    methodology: [
      "Tax = amount × (rate ÷ 100).",
      "Total = amount + tax."
    ],
    example: {
      scenario: "$80 purchase at 8.25% tax.",
      steps: ["Tax = 80 × 0.0825", "Total = 80 + tax"],
      result: "Tax = $6.60, Total = $86.60"
    },
    faqs: [
      {
        question: "Why doesn’t the state auto-fill the rate?",
        answer:
          "Rates vary by city/county. This version uses manual entry, but the structure supports state-based rates later."
      }
    ]
  },

  "salary-calculator": {
    slug: "salary-calculator",
    metaTitle: "Salary / Take‑Home Pay Calculator (Simple)",
    metaDescription:
      "Estimate take-home pay after tax for UK, Europe, and USA using a simple effective tax rate.",
    whatItDoes: [
      "Estimates tax amount and take-home pay from a gross annual salary.",
      "Supports UK/EU/USA selection with appropriate currency display."
    ],
    howToUse: [
      "Choose UK, Europe, or USA.",
      "Enter your gross annual salary.",
      "Enter an estimated effective tax rate (simple model).",
      "Click Calculate."
    ],
    methodology: [
      "Tax = gross × (rate ÷ 100).",
      "Net salary = gross − tax.",
      "This is a simple model designed for quick estimates; it is not a full tax engine."
    ],
    example: {
      scenario: "UK salary £45,000 with 22% effective tax.",
      steps: ["Tax = 45,000 × 0.22", "Net = 45,000 − tax"],
      result: "Outputs estimated tax and take-home pay in GBP."
    },
    faqs: [
      {
        question: "Does this include national insurance/social security?",
        answer:
          "Not automatically. Include those in your effective tax rate for a closer estimate."
      }
    ]
  },

  "currency-converter": {
    slug: "currency-converter",
    metaTitle: "Currency Converter (GBP, EUR, USD)",
    metaDescription:
      "Convert between GBP, EUR, and USD using mock exchange rates (API-ready structure).",
    whatItDoes: [
      "Converts an amount from one currency to another (GBP/EUR/USD).",
      "Displays the converted amount using the target currency format."
    ],
    howToUse: [
      "Enter an amount.",
      "Choose From and To currencies.",
      "Click Calculate to see the converted amount."
    ],
    methodology: [
      "Uses a predefined mock exchange-rate table for now.",
      "Converted = amount × rate(from → to)."
    ],
    example: {
      scenario: "Convert £100 to USD using mock rate 1.25.",
      steps: ["Amount = 100", "Rate = 1.25", "Compute 100 × 1.25"],
      result: "Converted amount = $125.00"
    },
    faqs: [
      {
        question: "Are these live exchange rates?",
        answer:
          "No. They’re mock rates. The converter is structured so live API rates can be added later."
      }
    ]
  },

  "unit-converter": {
    slug: "unit-converter",
    metaTitle: "Unit Converter (Length, Weight, Temperature)",
    metaDescription:
      "Convert common units across length, weight, and temperature with clean, fast results.",
    whatItDoes: [
      "Converts between common units in length, weight, and temperature categories.",
      "Automatically updates unit options based on the selected category."
    ],
    howToUse: [
      "Enter a value to convert.",
      "Pick a category (length/weight/temperature).",
      "Choose From and To units.",
      "Click Calculate."
    ],
    methodology: [
      "Length and weight conversions convert via a base unit (meters or kilograms).",
      "Temperature uses direct formulas (°C ↔ °F)."
    ],
    example: {
      scenario: "Convert 5 miles to kilometers.",
      steps: ["Category = length", "From = miles", "To = kilometers", "Convert using 1 mi = 1.609344 km"],
      result: "Converted value ≈ 8.0467 km"
    },
    faqs: [
      {
        question: "Why are some results rounded?",
        answer:
          "Results are formatted for readability. If you need more precision, increase decimal places in a future version."
      }
    ]
  },

  "bmr-calculator": {
    slug: "bmr-calculator",
    metaTitle: "BMR Calculator (Mifflin–St Jeor)",
    metaDescription:
      "Estimate your Basal Metabolic Rate (BMR) in kcal/day using age, sex, height, and weight.",
    whatItDoes: [
      "Estimates BMR—your body’s baseline daily energy use at rest.",
      "Provides a starting point for planning nutrition and activity goals."
    ],
    howToUse: [
      "Enter your age, sex, height (cm), and weight (kg).",
      "Click Calculate to get your estimated BMR in kcal/day."
    ],
    methodology: [
      "Uses the Mifflin–St Jeor equation, a commonly used BMR estimate.",
      "BMR is an estimate; it varies by body composition and measurement accuracy."
    ],
    example: {
      scenario: "Female, 30 years, 165 cm, 65 kg.",
      steps: ["Enter age/sex/height/weight", "Calculate BMR"],
      result: "Outputs BMR in kcal/day."
    },
    faqs: [
      {
        question: "Is BMR the same as TDEE?",
        answer:
          "No. BMR is energy at rest. TDEE includes activity and is typically higher."
      },
      {
        question: "Why does sex affect BMR?",
        answer:
          "Equations include sex-based constants because average body composition differs across populations."
      }
    ]
  },

  "tdee-calculator": {
    slug: "tdee-calculator",
    metaTitle: "TDEE Calculator",
    metaDescription:
      "Estimate your Total Daily Energy Expenditure (TDEE) based on BMR and activity level, plus cut/maintain/gain targets.",
    whatItDoes: [
      "Estimates TDEE—your daily calorie burn including activity.",
      "Provides simple cut/maintain/gain targets using +/- 500 kcal guidance."
    ],
    howToUse: [
      "Enter age, sex, height, and weight.",
      "Select your typical activity level.",
      "Click Calculate to see TDEE and suggested targets."
    ],
    methodology: [
      "Computes BMR (Mifflin–St Jeor) then multiplies by an activity factor.",
      "Cut/gain targets apply a simple +/- 500 kcal adjustment."
    ],
    example: {
      scenario: "Male, 28 years, 180 cm, 80 kg, moderate activity.",
      steps: ["Enter details", "Select moderate activity", "Calculate"],
      result: "Outputs TDEE and cut/maintain/gain calories per day."
    },
    faqs: [
      {
        question: "Which activity level should I choose?",
        answer:
          "Pick what matches most weeks. If you’re between levels, choose the lower one for a more conservative estimate."
      },
      {
        question: "Does TDEE change over time?",
        answer:
          "Yes. Weight changes, training volume, and lifestyle can all affect TDEE."
      }
    ]
  },

  "calorie-calculator": {
    slug: "calorie-calculator",
    metaTitle: "Calorie Calculator (Maintenance & Targets)",
    metaDescription:
      "Estimate maintenance calories and simple weight change targets based on your stats and activity level.",
    whatItDoes: [
      "Estimates daily maintenance calories.",
      "Shows mild loss, loss, and gain targets for quick planning."
    ],
    howToUse: [
      "Enter age, sex, height, weight, and activity level.",
      "Click Calculate to see daily calorie targets."
    ],
    methodology: [
      "Uses BMR (Mifflin–St Jeor) × activity multiplier for maintenance.",
      "Applies -250, -500, and +500 kcal/day adjustments for targets."
    ],
    example: {
      scenario: "Maintenance planning for a moderately active adult.",
      steps: ["Enter stats", "Select activity", "Calculate"],
      result: "Outputs maintenance and target calorie levels."
    },
    faqs: [
      {
        question: "Are these medical recommendations?",
        answer:
          "No. They’re general estimates. For medical needs, consult a qualified professional."
      }
    ]
  },

  "tip-calculator": {
    slug: "tip-calculator",
    metaTitle: "Tip Calculator (Split Bill)",
    metaDescription:
      "Calculate tip amount, total bill, and per-person cost in GBP, EUR, or USD.",
    whatItDoes: [
      "Calculates the tip from a bill amount and tip percentage.",
      "Splits the total across multiple people."
    ],
    howToUse: [
      "Select currency and enter bill amount.",
      "Enter tip percentage and number of people.",
      "Click Calculate to see tip, total, and per-person amount."
    ],
    methodology: [
      "Tip = bill × (tip% ÷ 100).",
      "Total = bill + tip; per person = total ÷ people."
    ],
    example: {
      scenario: "£120 bill, 12.5% tip, 4 people.",
      steps: ["Tip = 120 × 0.125", "Total = 120 + tip", "Split by 4"],
      result: "Outputs tip amount, total bill, and amount per person."
    },
    faqs: [
      {
        question: "Can I use decimal tips like 12.5%?",
        answer: "Yes—decimal percentages are supported."
      }
    ]
  },

  "savings-calculator": {
    slug: "savings-calculator",
    metaTitle: "Savings Calculator",
    metaDescription:
      "Estimate your future savings balance with monthly deposits and interest (GBP/EUR/USD).",
    whatItDoes: [
      "Projects savings growth from a starting balance and monthly deposits.",
      "Shows total deposits and total interest earned."
    ],
    howToUse: [
      "Select currency and enter starting savings.",
      "Enter monthly deposit, annual interest rate, and number of years.",
      "Click Calculate to see final balance and breakdown."
    ],
    methodology: [
      "Applies monthly compounding using \(annual rate ÷ 12).",
      "Each month: balance grows by interest, then monthly deposit is added."
    ],
    example: {
      scenario: "Start €1,000, add €100/month, 3% for 5 years.",
      steps: ["Set inputs", "Apply monthly interest + deposits over 60 months"],
      result: "Outputs final balance, total deposits, and total interest."
    },
    faqs: [
      {
        question: "Does deposit timing matter?",
        answer:
          "Yes. This model adds the deposit after applying interest each month; some banks may apply interest differently."
      }
    ]
  },

  "investment-calculator": {
    slug: "investment-calculator",
    metaTitle: "Investment Calculator (Recurring Contributions)",
    metaDescription:
      "Project investment growth with weekly/monthly/yearly contributions and an expected annual return.",
    whatItDoes: [
      "Projects a future investment balance from an initial amount plus recurring contributions.",
      "Shows total contributed and total growth."
    ],
    howToUse: [
      "Select currency and enter the initial amount.",
      "Enter a recurring contribution and choose how often you contribute.",
      "Enter an expected annual return rate and number of years.",
      "Click Calculate."
    ],
    methodology: [
      "Converts annual return into a per-period return based on contribution frequency.",
      "Iterates across periods, applying growth then adding the contribution."
    ],
    example: {
      scenario: "$2,000 initial, $50 weekly, 7% for 8 years.",
      steps: ["Frequency = weekly", "Apply per-week return for 8 years", "Add contributions each period"],
      result: "Outputs ending balance, total contributed, and total growth."
    },
    faqs: [
      {
        question: "Are returns guaranteed?",
        answer:
          "No. This uses a constant return assumption for planning and comparison."
      }
    ]
  },

  "retirement-calculator": {
    slug: "retirement-calculator",
    metaTitle: "Retirement Calculator",
    metaDescription:
      "Estimate projected retirement savings based on age, current savings, monthly contributions, and expected returns.",
    whatItDoes: [
      "Projects retirement savings at your target retirement age.",
      "Shows total contributions and growth over time."
    ],
    howToUse: [
      "Select currency and enter current age and retirement age.",
      "Enter current savings, monthly contribution, and expected annual return.",
      "Click Calculate to see projected retirement savings."
    ],
    methodology: [
      "Uses monthly compounding based on the expected annual return rate.",
      "Projects across the number of months until retirement."
    ],
    example: {
      scenario: "Age 30 → retire at 67, £20,000 saved, £300/month, 5% return.",
      steps: ["Compute months to retirement", "Apply monthly growth and contributions"],
      result: "Outputs projected retirement savings plus contribution/growth totals."
    },
    faqs: [
      {
        question: "Does it include inflation?",
        answer:
          "No. The result is nominal. To approximate inflation, reduce the expected return rate accordingly."
      }
    ]
  },

  "gpa-calculator": {
    slug: "gpa-calculator",
    metaTitle: "GPA Calculator (Credits & Grades)",
    metaDescription:
      "Calculate GPA using course credits and letter grades on a simple 4.0 scale.",
    whatItDoes: [
      "Computes a weighted GPA using course credits.",
      "Also totals your entered credits."
    ],
    howToUse: [
      "Choose the number of courses.",
      "Enter credits and select a grade for each course.",
      "Click Calculate to see GPA and total credits."
    ],
    methodology: [
      "Maps letter grades to points (e.g., A=4.0, B=3.0).",
      "GPA = sum(credits × points) ÷ total credits."
    ],
    example: {
      scenario: "Two courses: 3 credits (A) and 4 credits (B+).",
      steps: ["Quality points = 3×4.0 + 4×3.3", "Divide by total credits (7)"],
      result: "Outputs GPA and total credits."
    },
    faqs: [
      {
        question: "Is this the same as my school’s GPA?",
        answer:
          "It’s a simple 4.0 scale. Some institutions use different scales or weighting rules."
      }
    ]
  },

  "grade-calculator": {
    slug: "grade-calculator",
    metaTitle: "Grade Calculator (Required Final Exam Score)",
    metaDescription:
      "Calculate the final exam grade needed to reach a desired overall grade based on weights.",
    whatItDoes: [
      "Estimates the required final exam score to reach a target overall grade.",
      "Helps planning when a final exam has a known weight."
    ],
    howToUse: [
      "Enter current grade and completed weight.",
      "Enter desired final grade and final exam weight.",
      "Click Calculate to see the required final exam grade."
    ],
    methodology: [
      "Solves for the final exam score using a weighted-average equation.",
      "Required = (desired − current×completedWeight) ÷ finalExamWeight (weights as fractions)."
    ],
    example: {
      scenario: "Current 82%, completed weight 70%, desired 85%, final weight 30%.",
      steps: ["Compute completed contribution", "Solve for required final score"],
      result: "Outputs the required final exam grade (%)."
    },
    faqs: [
      {
        question: "What if the required score is over 100%?",
        answer:
          "That means the target may be unreachable given the current grade and weights."
      }
    ]
  },

  "date-calculator": {
    slug: "date-calculator",
    metaTitle: "Date Calculator (Add or Subtract)",
    metaDescription:
      "Add or subtract days, weeks, months, or years from a start date and see the resulting day of week.",
    whatItDoes: [
      "Finds the date after adding or subtracting a specified amount of time.",
      "Shows the resulting date and day of week."
    ],
    howToUse: [
      "Choose a start date.",
      "Enter an amount and select unit (days/weeks/months/years).",
      "Choose add or subtract, then click Calculate."
    ],
    methodology: [
      "Uses calendar-aware date math (months/years roll correctly).",
      "Outputs ISO date format (YYYY-MM-DD) for international clarity."
    ],
    example: {
      scenario: "Add 6 weeks to 2026-03-17.",
      steps: ["Start = 2026-03-17", "Unit = weeks, amount = 6", "Add 42 days"],
      result: "Outputs the resulting date and weekday."
    },
    faqs: [
      {
        question: "Why does adding months sometimes change the day number?",
        answer:
          "Some months have fewer days. The browser’s date handling adjusts accordingly."
      }
    ]
  },

  "time-duration-calculator": {
    slug: "time-duration-calculator",
    metaTitle: "Time Duration Calculator",
    metaDescription:
      "Calculate the duration between two date-times in total days, hours, and minutes.",
    whatItDoes: [
      "Computes total minutes, hours, and days between two date-times.",
      "Validates that the end time is after the start time."
    ],
    howToUse: [
      "Enter a start date & time.",
      "Enter an end date & time.",
      "Click Calculate to see the total duration."
    ],
    methodology: [
      "Computes the millisecond difference and converts to minutes/hours/days.",
      "Uses floor values for total units to keep outputs clear."
    ],
    example: {
      scenario: "From 2026-03-17 09:00 to 2026-03-18 12:30.",
      steps: ["Set start and end", "Calculate difference", "Convert to totals"],
      result: "Outputs totals in days, hours, and minutes."
    },
    faqs: [
      {
        question: "Does this account for time zones?",
        answer:
          "It uses your browser’s local date-time interpretation. For most personal use, this is sufficient."
      }
    ]
  },

  "body-fat-calculator": {
    slug: "body-fat-calculator",
    metaTitle: "Body Fat Percentage Calculator (US Navy Method)",
    metaDescription:
      "Estimate body fat percentage using waist/neck (and hip for females) with the US Navy method.",
    whatItDoes: [
      "Estimates body fat percentage from body measurements.",
      "Returns a simple category label for context."
    ],
    howToUse: [
      "Choose sex and enter height, waist, and neck measurements in cm.",
      "If female, also enter hip measurement.",
      "Click Calculate to see estimated body fat percentage."
    ],
    methodology: [
      "Uses the US Navy body fat formula (log-based).",
      "Accuracy depends on consistent measurement technique."
    ],
    example: {
      scenario: "Male, height 180 cm, waist 90 cm, neck 40 cm.",
      steps: ["Enter measurements", "Apply Navy formula", "Round to 1 decimal"],
      result: "Outputs body fat % and a category label."
    },
    faqs: [
      {
        question: "Where should I measure waist and neck?",
        answer:
          "Use a consistent method each time. Waist is typically at the navel; neck is measured just below the larynx."
      }
    ]
  },

  "ideal-weight-calculator": {
    slug: "ideal-weight-calculator",
    metaTitle: "Ideal Weight Calculator (Range)",
    metaDescription:
      "Estimate an ideal weight range from height and sex using the Devine formula (kg output).",
    whatItDoes: [
      "Estimates an ideal-weight reference point and provides a range for context.",
      "Useful for quick planning alongside BMI/body fat tools."
    ],
    howToUse: [
      "Select sex and enter height in cm.",
      "Click Calculate to see an estimated ideal weight range."
    ],
    methodology: [
      "Uses the Devine formula based on height over 5 ft.",
      "Outputs a +/-10% range to avoid false precision."
    ],
    example: {
      scenario: "Female, 165 cm.",
      steps: ["Convert height to inches", "Apply Devine formula", "Compute range"],
      result: "Outputs an ideal weight range in kg."
    },
    faqs: [
      {
        question: "Is ideal weight the same for everyone?",
        answer:
          "No. It’s a reference estimate; body composition and health goals vary."
      }
    ]
  },

  "ovulation-calculator": {
    slug: "ovulation-calculator",
    metaTitle: "Ovulation Calculator",
    metaDescription:
      "Estimate ovulation date and fertile window from last period start date and average cycle length.",
    whatItDoes: [
      "Estimates ovulation date using an average cycle length approach.",
      "Provides a fertile window around the estimated ovulation date."
    ],
    howToUse: [
      "Enter the start date of your last period.",
      "Enter your average cycle length in days.",
      "Click Calculate to see estimated dates."
    ],
    methodology: [
      "Assumes ovulation occurs roughly 14 days before the next period.",
      "Fertile window is estimated as 5 days before ovulation through 1 day after."
    ],
    example: {
      scenario: "Last period: 2026-03-01, cycle length: 28 days.",
      steps: ["Ovulation ≈ start + (28 − 14) days", "Compute fertile window around ovulation"],
      result: "Outputs ovulation date and fertile window start/end."
    },
    faqs: [
      {
        question: "How accurate is this estimate?",
        answer:
          "It’s a planning estimate. Individual cycles vary, and ovulation can shift month to month."
      }
    ]
  },

  "pregnancy-calculator": {
    slug: "pregnancy-calculator",
    metaTitle: "Pregnancy Calculator (Due Date & Week)",
    metaDescription:
      "Estimate due date, current pregnancy week, and trimester from last menstrual period (LMP).",
    whatItDoes: [
      "Estimates due date using a standard 280-day (40-week) pregnancy length.",
      "Calculates current pregnancy week and trimester for today’s date."
    ],
    howToUse: [
      "Enter the start date of your last menstrual period (LMP).",
      "Click Calculate to see the estimated due date and pregnancy week."
    ],
    methodology: [
      "Due date uses Naegele’s rule: LMP + 280 days.",
      "Current week is calculated from days since LMP, then grouped into trimesters."
    ],
    example: {
      scenario: "LMP start date: 2026-01-01.",
      steps: ["Due date = 2026-01-01 + 280 days", "Compute weeks since LMP for today"],
      result: "Outputs estimated due date, week number, and trimester."
    },
    faqs: [
      {
        question: "Is the due date exact?",
        answer:
          "No. It’s an estimate. Many births occur before or after the calculated date."
      }
    ]
  },

  "scientific-calculator": {
    slug: "scientific-calculator",
    metaTitle: "Scientific Calculator (Online)",
    metaDescription:
      "Evaluate math expressions with trig, logs, square root, powers, parentheses, and π—right in your browser.",
    whatItDoes: [
      "Evaluates a typed expression and returns the numerical result.",
      "Supports common scientific functions and operator precedence."
    ],
    howToUse: [
      "Type an expression (or use the keypad buttons).",
      "Use parentheses to control order of operations.",
      "Click Calculate to see the result."
    ],
    methodology: [
      "Parses the expression into tokens and evaluates it safely (no JavaScript eval).",
      "Supports sin/cos/tan, sqrt, log10, natural log, powers, and π."
    ],
    example: {
      scenario: "Evaluate (2+3)*4 + pi^2",
      steps: ["Enter expression", "Calculate"],
      result: "Outputs a numeric result."
    },
    faqs: [
      {
        question: "Are trig functions in degrees or radians?",
        answer:
          "They use radians (standard for most programming math libraries)."
      }
    ]
  },

  "fraction-calculator": {
    slug: "fraction-calculator",
    metaTitle: "Fraction Calculator",
    metaDescription:
      "Calculate with fractions (add/subtract/multiply/divide) and get simplified and decimal results.",
    whatItDoes: [
      "Performs arithmetic on two fractions.",
      "Outputs the raw result, simplified fraction, and decimal equivalent."
    ],
    howToUse: [
      "Enter Fraction 1 in the form a/b.",
      "Choose an operator (+, −, ×, ÷).",
      "Enter Fraction 2 and click Calculate."
    ],
    methodology: [
      "Uses common fraction arithmetic (common denominators or multiply/divide).",
      "Simplifies the result by dividing numerator and denominator by their GCD."
    ],
    example: {
      scenario: "3/4 + 1/6",
      steps: ["Compute common denominator 24", "Convert: 18/24 + 4/24", "Simplify"],
      result: "Simplified result = 11/12 (≈ 0.916667)"
    },
    faqs: [
      {
        question: "What input format is supported?",
        answer:
          "Use a/b (e.g. 5/8). Whole numbers can be written as 5/1."
      }
    ]
  },

  "standard-deviation-calculator": {
    slug: "standard-deviation-calculator",
    metaTitle: "Standard Deviation Calculator (Sample or Population)",
    metaDescription:
      "Calculate mean, variance, and standard deviation from a list of numbers in sample or population mode.",
    whatItDoes: [
      "Computes mean, variance, and standard deviation for your dataset.",
      "Supports sample vs population calculations."
    ],
    howToUse: [
      "Paste numbers separated by commas or spaces.",
      "Choose Sample or Population mode.",
      "Click Calculate."
    ],
    methodology: [
      "Mean = average of values.",
      "Variance = average squared deviation (divide by n for population, n−1 for sample).",
      "Standard deviation = sqrt(variance)."
    ],
    example: {
      scenario: "Numbers: 2, 4, 4, 4, 5, 5, 7, 9 (population).",
      steps: ["Compute mean", "Compute squared deviations", "Divide by n", "Square root"],
      result: "Outputs mean, variance, and standard deviation."
    },
    faqs: [
      {
        question: "Which mode should I use?",
        answer:
          "Use population if you have the entire dataset. Use sample if your data is a sample of a larger population."
      }
    ]
  },

  "amortization-calculator": {
    slug: "amortization-calculator",
    metaTitle: "Amortization Calculator (Schedule Table)",
    metaDescription:
      "Calculate monthly payments and view an amortization schedule table for a fixed-rate loan (GBP/EUR/USD).",
    whatItDoes: [
      "Calculates monthly loan payment and totals.",
      "Displays an amortization schedule showing principal, interest, and remaining balance over time."
    ],
    howToUse: [
      "Choose currency and enter loan amount, interest rate, and term.",
      "Click Calculate to see totals and the schedule table."
    ],
    methodology: [
      "Uses the standard fixed-rate amortization payment formula.",
      "Each month: interest is calculated from remaining balance; the rest of the payment reduces principal."
    ],
    example: {
      scenario: "Loan $20,000, 5% APR, 4 years.",
      steps: ["Compute monthly payment", "Iterate monthly to split interest vs principal"],
      result: "Outputs totals plus a month-by-month schedule."
    },
    faqs: [
      {
        question: "Why does interest start higher?",
        answer:
          "Early payments are applied to a larger remaining balance, so interest is higher at the start."
      }
    ]
  },

  "income-tax-calculator": {
    slug: "income-tax-calculator",
    metaTitle: "Income Tax Calculator (Simple)",
    metaDescription:
      "Estimate income tax and after-tax income for UK, Europe, or USA using a simple effective tax rate.",
    whatItDoes: [
      "Estimates tax and after-tax income based on annual income and a tax-rate estimate.",
      "Designed as a quick planner with room for future regional rules."
    ],
    howToUse: [
      "Choose UK, Europe, or USA.",
      "Enter annual income and an estimated effective tax rate.",
      "Click Calculate."
    ],
    methodology: [
      "Estimated tax = income × (rate ÷ 100).",
      "After-tax income = income − tax."
    ],
    example: {
      scenario: "USA income $75,000 at 24% effective tax.",
      steps: ["Tax = 75,000 × 0.24", "After-tax = 75,000 − tax"],
      result: "Outputs estimated tax and after-tax income."
    },
    faqs: [
      {
        question: "Is this a full tax return calculation?",
        answer:
          "No. It’s a simple effective-rate estimate. Brackets, deductions, and credits are not modeled yet."
      }
    ]
  },

  "salary-to-hourly-calculator": {
    slug: "salary-to-hourly-calculator",
    metaTitle: "Salary to Hourly Calculator",
    metaDescription:
      "Convert annual salary to an hourly rate using hours per week and weeks per year.",
    whatItDoes: [
      "Converts an annual salary into an estimated hourly rate.",
      "Useful for comparing salaried vs hourly opportunities."
    ],
    howToUse: [
      "Enter annual salary.",
      "Enter hours per week and weeks per year you work.",
      "Click Calculate to see hourly rate."
    ],
    methodology: [
      "Hourly rate = annual salary ÷ (hours per week × weeks per year).",
      "Use realistic weeks per year if you take unpaid time off."
    ],
    example: {
      scenario: "£52,000 salary, 40 hours/week, 52 weeks/year.",
      steps: ["Compute 40×52 = 2080 hours/year", "52,000 ÷ 2080"],
      result: "Hourly rate ≈ £25.00"
    },
    faqs: [
      {
        question: "Should I use 52 weeks per year?",
        answer:
          "Use the weeks you actually work. If you take unpaid leave, reduce the weeks for a more accurate hourly rate."
      }
    ]
  },

  "hourly-to-salary-calculator": {
    slug: "hourly-to-salary-calculator",
    metaTitle: "Hourly to Salary Calculator",
    metaDescription:
      "Convert an hourly rate into weekly, monthly, and annual salary estimates based on your schedule.",
    whatItDoes: [
      "Estimates weekly, monthly, and annual pay from an hourly rate.",
      "Helps translate hourly offers into annual equivalents."
    ],
    howToUse: [
      "Enter hourly rate, hours per week, and weeks per year.",
      "Click Calculate to see weekly, monthly, and annual amounts."
    ],
    methodology: [
      "Weekly = hourly × hours/week.",
      "Annual = weekly × weeks/year; monthly = annual ÷ 12."
    ],
    example: {
      scenario: "$20/hour, 35 hours/week, 50 weeks/year.",
      steps: ["Weekly = 20×35", "Annual = weekly×50", "Monthly = annual÷12"],
      result: "Outputs weekly, monthly, and annual salary estimates."
    },
    faqs: [
      {
        question: "Why is monthly divided by 12?",
        answer:
          "It’s a simple average monthly estimate. Actual pay cycles can vary by employer."
      }
    ]
  },

  "pounds-kilograms-converter": {
    slug: "pounds-kilograms-converter",
    metaTitle: "Pounds to Kilograms Converter",
    metaDescription:
      "Convert between pounds (lb) and kilograms (kg) with accurate conversion factors.",
    whatItDoes: [
      "Converts lb → kg or kg → lb.",
      "Useful for UK/EU/USA weight references and labels."
    ],
    howToUse: [
      "Enter a value.",
      "Choose conversion direction.",
      "Click Calculate to get the converted value."
    ],
    methodology: [
      "Uses 1 lb = 0.45359237 kg.",
      "Applies multiplication or division depending on direction."
    ],
    example: {
      scenario: "Convert 150 lb to kg.",
      steps: ["150 × 0.45359237"],
      result: "≈ 68.0389 kg"
    },
    faqs: [
      {
        question: "Why do I see many decimals?",
        answer:
          "The converter uses a precise factor and formats up to 4 decimals for clarity."
      }
    ]
  },

  "miles-kilometers-converter": {
    slug: "miles-kilometers-converter",
    metaTitle: "Miles to Kilometers Converter",
    metaDescription:
      "Convert between miles (mi) and kilometers (km) using the standard conversion factor.",
    whatItDoes: [
      "Converts mi → km or km → mi.",
      "Helpful for travel, running, and navigation across regions."
    ],
    howToUse: [
      "Enter a value.",
      "Choose conversion direction.",
      "Click Calculate to get the converted value."
    ],
    methodology: [
      "Uses 1 mile = 1.609344 kilometers.",
      "Applies multiplication or division depending on direction."
    ],
    example: {
      scenario: "Convert 10 km to miles.",
      steps: ["10 ÷ 1.609344"],
      result: "≈ 6.2137 miles"
    },
    faqs: [
      {
        question: "Is this the same as nautical miles?",
        answer:
          "No. This converter uses statute miles. Nautical miles use a different factor."
      }
    ]
  }
};

