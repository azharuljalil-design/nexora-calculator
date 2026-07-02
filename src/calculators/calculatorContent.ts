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
  mistakesOrLimitations?: string[];
  disclaimer?: string;
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
    metaTitle: "Mortgage Calculator for Monthly Repayments",
    metaDescription:
      "Estimate mortgage repayments, total interest, and optional monthly ownership costs with a clear fixed-rate calculation method.",
    whatItDoes: [
      "Estimates the monthly principal-and-interest repayment for a repayment mortgage using the property price, deposit, interest rate, and term.",
      "Adds optional recurring ownership costs such as property tax, home insurance, and HOA or service charges when those items are relevant to your scenario.",
      "Helps compare affordability before looking more closely at the Loan Calculator or Amortization Calculator."
    ],
    howToUse: [
      "Select the region and currency that best match the figures you want to enter.",
      "Enter the full property price and the deposit or down payment you expect to put in.",
      "Add the annual interest rate and mortgage term in years, then leave optional tax, insurance, and HOA fields at 0 if they do not apply.",
      "Run the calculation and review the monthly principal-and-interest amount, total monthly cost, total paid, and estimated interest."
    ],
    methodology: [
      "First, the loan amount is calculated as property price minus down payment.",
      "The annual interest rate is converted to a monthly rate: r = annual rate ÷ 12 ÷ 100, and the number of payments is n = term in years × 12.",
      "For interest-bearing loans the payment method is M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the mortgage balance.",
      "If the interest rate is 0%, the repayment is simply the loan amount divided by the number of monthly payments.",
      "Optional annual tax and insurance are divided by 12 and then added alongside any monthly HOA/service charge."
    ],
    example: {
      scenario:
        "A buyer is considering a £350,000 home with a £70,000 deposit, a 4.75% rate, and a 25-year term.",
      steps: [
        "Mortgage balance = £350,000 − £70,000 = £280,000",
        "Number of repayments = 25 × 12 = 300",
        "Monthly rate = 4.75 ÷ 12 ÷ 100 = 0.0039583",
        "Apply the fixed-rate repayment formula to estimate the monthly principal-and-interest payment"
      ],
      result:
        "The principal-and-interest repayment is about £1,596 per month before any insurance, taxes, service charges, or lender fees."
    },
    mistakesOrLimitations: [
      "Do not enter the deposit as a percentage unless the input specifically asks for a currency amount.",
      "A fixed-rate estimate does not predict future remortgage rates, tracker changes, or early repayment charges.",
      "Stamp duty, legal fees, arrangement fees, valuation fees, moving costs, and overpayments are not included unless you adjust the inputs manually.",
      "Property tax and HOA fields are useful for some markets, but many UK and EU buyers should leave them blank if they are not part of the mortgage payment."
    ],
    disclaimer:
      "This mortgage estimate is for general planning only and is not financial advice or a mortgage offer. Check figures with a regulated adviser or lender before making decisions.",
    faqs: [
      {
        question: "Is this suitable for UK mortgages?",
        answer:
          "Yes, you can select GBP and enter UK-style property and deposit figures. The calculation is a repayment mortgage estimate, not a full lender affordability assessment."
      },
      {
        question: "Does it include stamp duty or conveyancing fees?",
        answer:
          "No. It focuses on monthly repayment maths and optional recurring costs, so one-off purchase costs should be budgeted separately."
      },
      {
        question: "Why is the total interest only an estimate?",
        answer:
          "It assumes the rate and payment schedule stay unchanged for the whole term. Real mortgages may be remortgaged, overpaid, or moved to a different rate."
      },
      {
        question: "When should I use the Amortization Calculator instead?",
        answer:
          "Use the Amortization Calculator when you want to see how each payment is split between interest and principal over time."
      }
    ]
  },

  "loan-calculator": {
    slug: "loan-calculator",
    metaTitle: "Loan Calculator for Fixed Monthly Payments",
    metaDescription:
      "Calculate monthly loan repayments, total amount repaid, and interest cost for a fixed-rate personal, car, or business loan.",
    whatItDoes: [
      "Works out the regular monthly repayment for a fixed-rate instalment loan.",
      "Shows the full amount repaid and the interest charged across the chosen term.",
      "Gives a quick comparison point before exploring a full Amortization Calculator schedule."
    ],
    howToUse: [
      "Choose the currency for the loan figures.",
      "Enter the amount borrowed, the annual interest rate, and the repayment term in years.",
      "Calculate the result, then compare the monthly payment with your available budget.",
      "Try a shorter or longer term to see how the monthly payment and total interest move in opposite directions."
    ],
    methodology: [
      "The annual percentage rate entered is converted into a monthly rate by dividing by 12 and by 100.",
      "The number of repayments is the loan term in years multiplied by 12.",
      "For a standard amortised loan the calculator uses M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1).",
      "For a zero-interest loan it divides the principal evenly across the monthly payments.",
      "Total interest is calculated as total repayments minus the original loan amount."
    ],
    example: {
      scenario: "A £12,000 car loan at 7.2% APR over 5 years.",
      steps: [
        "Principal = £12,000",
        "Monthly rate = 7.2 ÷ 12 ÷ 100 = 0.006",
        "Number of payments = 5 × 12 = 60",
        "Apply the amortised loan payment formula"
      ],
      result:
        "The estimated monthly payment is about £239, with roughly £14,331 repaid in total and about £2,331 in interest."
    },
    mistakesOrLimitations: [
      "Do not mix monthly and annual rates; the input expects an annual percentage rate.",
      "Arrangement fees, missed-payment charges, early settlement adjustments, and variable-rate changes are not modelled.",
      "A lower monthly payment from a longer term can still mean paying more interest overall.",
      "The result assumes payments are made monthly and on time."
    ],
    disclaimer:
      "This loan calculation is an educational estimate only. Confirm repayment terms, fees, and affordability with the lender before borrowing.",
    faqs: [
      { question: "Can I use it for a car loan?", answer: "Yes. Enter the amount financed, APR, and term to estimate the monthly repayment for a car loan." },
      { question: "Does the calculator use APR or flat rate?", answer: "Use an annual percentage rate-style input. It is treated as an annual rate converted into monthly amortised interest." },
      { question: "Are lender fees included?", answer: "No. If a fee is added to the balance, you can include it by increasing the loan amount; otherwise budget for it separately." },
      { question: "How is this different from the Mortgage Calculator?", answer: "The Loan Calculator is a simpler fixed-loan tool, while the Mortgage Calculator includes property-specific inputs such as deposit and optional ownership costs." }
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
    metaTitle: "Compound Interest Calculator with Monthly Contributions",
    metaDescription:
      "Project future savings or investment growth with compound returns, starting balance, monthly contributions, and compounding frequency.",
    whatItDoes: [
      "Estimates how a starting balance may grow when interest or investment returns are reinvested.",
      "Includes regular monthly contributions so you can see the effect of saving consistently.",
      "Breaks the result into total contributions and estimated growth."
    ],
    howToUse: [
      "Select the currency for the displayed results.",
      "Enter your initial balance and the amount you plan to add each month.",
      "Add an annual return assumption, time period, and compounding frequency.",
      "Review the projected future value, then test different contribution levels or return assumptions."
    ],
    methodology: [
      "The starting principal is compounded using A = P × (1 + r ÷ m)^(m × t), where r is the annual rate, m is the compounding frequency, and t is years.",
      "Monthly contributions are added using a monthly-growth approximation so regular deposits can build up over the projection period.",
      "Total contributions equal the initial balance plus all monthly deposits made during the term.",
      "Estimated interest or growth is final balance minus total contributions."
    ],
    example: {
      scenario: "Start with £5,000, add £250 per month, assume 5% annual growth for 12 years, compounded monthly.",
      steps: [
        "Initial principal = £5,000",
        "Monthly deposits = £250 × 12 × 12 = £36,000",
        "Total contributions = £41,000",
        "Compound the starting balance and each regular contribution across the period"
      ],
      result:
        "The projection is about £56,900, meaning around £15,900 of estimated growth above contributions."
    },
    mistakesOrLimitations: [
      "A steady annual return is a simplification; real savings rates and market returns change.",
      "Taxes, platform fees, inflation, and withdrawal penalties are not deducted.",
      "Investment losses are possible, so do not treat the projection as a guarantee.",
      "Contribution timing can affect real results; this tool uses a practical monthly approximation."
    ],
    disclaimer:
      "This is a planning illustration, not investment advice. Consider charges, tax treatment, inflation, and your risk tolerance before investing.",
    faqs: [
      { question: "What does compounding frequency mean?", answer: "It is how often interest is added to the balance. More frequent compounding can slightly increase growth when all else is equal." },
      { question: "Can I use it for savings accounts?", answer: "Yes, if you enter the savings interest rate and contribution plan. Check whether your provider compounds daily, monthly, or annually." },
      { question: "Can I use it for investments?", answer: "You can model an assumed annual return, but investments fluctuate and can fall as well as rise." },
      { question: "How does this relate to the Percentage Calculator?", answer: "The Percentage Calculator is useful for checking rate changes or contribution increases before entering assumptions here." }
    ]
  },

  "vat-calculator": {
    slug: "vat-calculator",
    metaTitle: "VAT Calculator to Add or Remove VAT",
    metaDescription:
      "Add VAT to a net price or remove VAT from a gross price using common rates or a custom VAT percentage.",
    whatItDoes: [
      "Calculates the VAT amount, net price, and gross price for a chosen VAT rate.",
      "Supports both adding VAT to a pre-tax amount and extracting VAT from a VAT-inclusive amount.",
      "Helps check invoices, quotes, product prices, and cross-border price comparisons."
    ],
    howToUse: [
      "Choose the currency you want the answer displayed in.",
      "Enter the amount: use the net amount when adding VAT, or the gross amount when removing VAT.",
      "Select a preset VAT rate or choose Custom and type the exact percentage.",
      "Pick Add VAT or Remove VAT, then calculate the net, VAT, and gross totals."
    ],
    methodology: [
      "To add VAT, the VAT amount is net amount × (VAT rate ÷ 100), and gross price is net plus VAT.",
      "To remove VAT, net price is gross amount ÷ (1 + VAT rate ÷ 100).",
      "The extracted VAT amount is gross price minus net price.",
      "Displayed currency formatting does not change the VAT rate or tax rules."
    ],
    example: {
      scenario: "A UK supplier quotes £480 excluding VAT at 20%.",
      steps: [
        "Net amount = £480",
        "VAT rate = 20% = 0.20",
        "VAT amount = £480 × 0.20 = £96",
        "Gross amount = £480 + £96"
      ],
      result: "The VAT-inclusive total is £576, made up of £480 net and £96 VAT."
    },
    mistakesOrLimitations: [
      "Check whether the amount you entered is net or gross before choosing Add VAT or Remove VAT.",
      "VAT rates and exemptions vary by country, product type, and business status.",
      "Rounding on real invoices may differ when VAT is calculated per line item rather than on the total.",
      "This tool does not decide whether you should charge VAT or reclaim VAT."
    ],
    disclaimer:
      "This VAT calculation is for quick checking only and is not tax advice. Confirm applicable rates and rules with official guidance or an accountant.",
    faqs: [
      { question: "What is the difference between net and gross?", answer: "Net is the price before VAT. Gross is the VAT-inclusive price after VAT has been added." },
      { question: "How do I remove 20% VAT from a price?", answer: "Choose Remove VAT, enter the VAT-inclusive amount, and use a 20% rate. The net amount is calculated by dividing by 1.20." },
      { question: "Can I enter a reduced VAT rate?", answer: "Yes. Select Custom and enter the exact percentage you need, such as 5 or 12.5." },
      { question: "Is VAT the same as sales tax?", answer: "No. VAT and sales tax are different tax systems. Use the Sales Tax Calculator for a simple sales-tax style calculation." }
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
    metaTitle: "Amortization Calculator with Payment Schedule",
    metaDescription:
      "Calculate a fixed monthly payment and view how each repayment is split between interest, principal, and remaining balance.",
    whatItDoes: [
      "Calculates the monthly payment for a fixed-rate amortised loan.",
      "Creates a repayment schedule that shows interest, principal, and outstanding balance month by month.",
      "Makes it easier to understand why early repayments are interest-heavy and later repayments reduce the balance faster."
    ],
    howToUse: [
      "Select the currency for the schedule.",
      "Enter the loan amount, annual interest rate, and term in years.",
      "Calculate to generate the monthly payment and repayment table.",
      "Use the schedule alongside the Loan Calculator or Mortgage Calculator when you need both summary and detailed views."
    ],
    methodology: [
      "The monthly payment is calculated with the same fixed-rate amortisation formula used for instalment loans.",
      "For each period, monthly interest equals the current balance multiplied by the monthly rate.",
      "Principal repaid equals the fixed payment minus that month’s interest.",
      "The remaining balance is reduced by the principal portion until the final payment clears the loan."
    ],
    example: {
      scenario: "A £18,000 loan at 6% APR over 4 years.",
      steps: [
        "Monthly rate = 6 ÷ 12 ÷ 100 = 0.005",
        "Payments = 4 × 12 = 48",
        "Calculate the fixed monthly repayment, then split each month into interest and principal",
        "In month one, interest is based on the full £18,000 balance; later months use a smaller balance"
      ],
      result:
        "The monthly payment is about £423, and the first payment includes about £90 interest with the remainder reducing principal."
    },
    mistakesOrLimitations: [
      "Do not expect every lender statement to match exactly if fees, daily interest, or different payment dates apply.",
      "Variable-rate loans need a fresh schedule whenever the rate changes.",
      "The table assumes regular monthly payments and no extra overpayments.",
      "Rounding each row can make the final displayed balance differ by a few pence or cents."
    ],
    disclaimer:
      "This schedule is an estimate for understanding repayment mechanics. It should not replace lender statements or professional financial advice.",
    faqs: [
      { question: "Why is the first payment mostly interest?", answer: "Interest is calculated on the outstanding balance, which is highest at the start of the loan." },
      { question: "Can I model overpayments?", answer: "Not in this version. You can still compare shorter terms in the Loan Calculator to approximate faster repayment." },
      { question: "Is amortization the same as depreciation?", answer: "No. Here, amortization means gradually paying down a loan through scheduled payments." },
      { question: "When should I use the Mortgage Calculator instead?", answer: "Use the Mortgage Calculator when the loan is tied to a property purchase and you want deposit and ownership-cost inputs." }
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

