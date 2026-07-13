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
    metaTitle: "Percentage Calculator for Everyday Maths",
    metaDescription:
      "Calculate percentages of numbers for discounts, tax estimates, markups, comparisons, and quick everyday maths.",
    whatItDoes: [
      "Finds the value of a percentage of a number, such as 15% of 200 or 7.5% of an invoice.",
      "Helps with discounts, sale prices, tax add-ons, tips, grade checks, and simple proportional comparisons.",
      "Keeps the calculation deliberately simple so the result is easy to verify by hand."
    ],
    howToUse: [
      "Enter the base number you want to take a percentage from.",
      "Enter the percentage value. The form is designed for 0–100% calculations.",
      "Click Calculate and use the percentage value in your wider calculation, such as subtracting it for a discount or adding it for a tax estimate."
    ],
    methodology: [
      "The calculator uses: percentage value = number × (percentage ÷ 100).",
      "For example, 15% is treated as 0.15 before multiplying by the base number.",
      "The displayed result is rounded to 2 decimal places for readability."
    ],
    example: {
      scenario: "A £80 item has a 25% discount.",
      steps: [
        "Number = 80",
        "Percentage = 25",
        "Percentage value = 80 × (25 ÷ 100) = 20"
      ],
      result: "The discount value is £20. The sale price would be £60 if you subtract the discount from the original price."
    },
    faqs: [
      {
        question: "Can I use this as a discount calculator?",
        answer:
          "Yes. Calculate the discount value, then subtract it from the original price. For a dedicated sale-price workflow, use the result as the discount amount."
      },
      {
        question: "Can I enter decimal percentages?",
        answer:
          "Yes. Values such as 2.5 or 7.5 are accepted, subject to the calculator input range."
      },
      {
        question: "Is this the same as percentage change?",
        answer:
          "No. This calculator finds a percentage of one number. Percentage change compares an old value with a new value."
      },
      {
        question: "Why is the result rounded?",
        answer:
          "Rounding to 2 decimals makes money-style and everyday results easier to read. Keep the underlying method in mind if you need more precision."
      }
    ],
    mistakesOrLimitations: [
      "Do not type 0.15 when you mean 15%; enter 15 because the calculator divides by 100 internally.",
      "This tool calculates the percentage value only; it does not automatically add or subtract that value from the original number.",
      "Check whether your real-world task needs percentage change, markup, margin, or compounding instead of a simple percentage of a number."
    ],
    disclaimer:
      "This is a general maths helper. It does not provide financial, tax, retail, or legal advice."
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
    metaTitle: "BMI Calculator for Metric and Imperial Units",
    metaDescription:
      "Calculate Body Mass Index from height and weight using metric or imperial units and view the broad BMI category.",
    whatItDoes: [
      "Calculates Body Mass Index (BMI) from height and weight using either metric or imperial inputs.",
      "Returns a broad category label: Underweight, Normal weight, Overweight, or Obese.",
      "Provides a quick screening-style number that can be compared with other health calculators, but it does not diagnose health status."
    ],
    howToUse: [
      "Choose metric units for centimetres and kilograms, or imperial units for feet, inches, and pounds.",
      "Enter height and weight in the fields for the selected unit system.",
      "Click Calculate to see BMI rounded to 1 decimal place and the broad category label.",
      "Use related calculators such as Body Fat, BMR, TDEE, and Calorie Calculator for extra context."
    ],
    methodology: [
      "Metric BMI = weight in kilograms ÷ (height in metres × height in metres).",
      "Imperial BMI = weight in pounds ÷ (height in inches × height in inches) × 703.",
      "The current category cut-offs in the calculator are: below 18.5 Underweight, 18.5 to below 25 Normal weight, 25 to below 30 Overweight, and 30 or above Obese."
    ],
    example: {
      scenario: "A person is 175 cm tall and weighs 70 kg.",
      steps: [
        "Height in metres = 175 ÷ 100 = 1.75",
        "BMI = 70 ÷ (1.75 × 1.75)",
        "BMI = 22.9 when rounded to 1 decimal place"
      ],
      result: "The calculator returns BMI 22.9 and the category Normal weight."
    },
    faqs: [
      {
        question: "Is BMI a diagnosis?",
        answer:
          "No. BMI is a broad height-to-weight screening measure. It does not diagnose body composition, fitness, or medical risk."
      },
      {
        question: "Can BMI be misleading?",
        answer:
          "Yes. BMI does not distinguish muscle, fat, bone, age, sex, pregnancy, or ethnicity-related differences."
      },
      {
        question: "Which units should I use?",
        answer:
          "Use metric if you know centimetres and kilograms, or imperial if you know feet, inches, and pounds. The calculator applies the matching formula."
      },
      {
        question: "Why compare BMI with body fat percentage?",
        answer:
          "Body fat estimates use body measurements and can provide different context from BMI, although they are still estimates with limitations."
      }
    ],
    mistakesOrLimitations: [
      "Entering centimetres in the imperial fields, or pounds in the kilogram field, will produce an incorrect result.",
      "BMI categories are broad and may not be suitable for children, pregnant people, athletes, or some clinical contexts.",
      "The result should be interpreted alongside wider health information, not in isolation."
    ],
    disclaimer:
      "This calculator provides general educational information only and is not medical, nutritional, fitness, or healthcare advice."
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
    metaTitle: "VAT Calculator Estimate to Add or Remove VAT",
    metaDescription:
      "Estimate adding or removing VAT using the rate you select or enter; VAT rates vary by country and product.",
    whatItDoes: [
      "Estimates the VAT amount, net price, and gross price for the VAT rate you choose or enter.",
      "Supports both adding VAT to a pre-tax amount and extracting VAT from a VAT-inclusive amount.",
      "Helps check invoices, quotes, product prices, and cross-border comparisons without deciding which VAT rate legally applies."
    ],
    howToUse: [
      "Choose the currency you want the answer displayed in.",
      "Enter the amount: use the net amount when adding VAT, or the gross amount when removing VAT.",
      "Select a preset VAT rate or choose Custom and type the exact percentage you want to estimate.",
      "Pick Add VAT or Remove VAT, then calculate the net, VAT, and gross totals."
    ],
    methodology: [
      "To add VAT, the VAT amount is net amount × (VAT rate ÷ 100), and gross price is net plus VAT.",
      "To remove VAT, net price is gross amount ÷ (1 + VAT rate ÷ 100).",
      "The extracted VAT amount is gross price minus net price.",
      "Displayed currency formatting does not change the VAT rate or tax rules; the calculation uses only the selected or entered percentage."
    ],
    example: {
      scenario: "A quote is £480 excluding VAT and you choose a 20% VAT rate.",
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
      "VAT rates, exemptions, reverse-charge rules, and registration requirements vary by country, product or service type, and business status.",
      "Rounding on real invoices may differ when VAT is calculated per line item rather than on the total.",
      "This tool does not decide whether you should charge VAT, reclaim VAT, use a reduced rate, or treat a transaction as exempt or zero-rated."
    ],
    disclaimer:
      "This VAT calculator is an estimate based only on the rate you enter or select. It is not official guidance or tax advice; verify the applicable rate and treatment with the relevant tax authority or a qualified adviser.",
    faqs: [
      { question: "What is the difference between net and gross?", answer: "Net is the price before VAT. Gross is the VAT-inclusive price after VAT has been added." },
      { question: "How do I remove 20% VAT from a price?", answer: "Choose Remove VAT, enter the VAT-inclusive amount, and use a 20% rate. The net amount is calculated by dividing by 1.20." },
      { question: "Can I enter a reduced VAT rate?", answer: "Yes. Select Custom and enter the exact percentage you want to estimate, such as 5 or 12.5. Check that the rate applies to your item and location before relying on it." },
      { question: "Is VAT the same as sales tax?", answer: "No. VAT and sales tax are different tax systems. Use the Sales Tax Calculator for a simple public sales-tax style calculation." },
      { question: "Does this calculator know my country's VAT rules?", answer: "No. It uses the rate you select or enter and does not validate whether that rate is correct for your country, product, service, or business situation." }
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
      "Enter your combined state/local sales tax rate manually.",
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
        question: "What tax rate should I enter?",
        answer:
          "Enter the combined state and local sales tax rate that applies to your purchase location."
      }
    ]
  },

  "salary-calculator": {
    slug: "salary-calculator",
    metaTitle: "Salary Take-Home Estimate Based on Entered Rate",
    metaDescription:
      "Estimate take-home pay from gross salary using your own effective tax or withholding rate; simplified and not payroll advice.",
    whatItDoes: [
      "Estimates annual deductions from a gross salary using the effective percentage rate you provide.",
      "Shows a simple estimated take-home pay figure in GBP, EUR, or USD depending on the selected region.",
      "Helps compare salary scenarios before using the income tax or hourly wage conversion calculators."
    ],
    howToUse: [
      "Select the region so the result is displayed in the right currency.",
      "Enter the gross annual salary before deductions.",
      "Enter your estimated effective tax or withholding rate as a percentage, including only the deductions you intentionally want reflected.",
      "Click Calculate and review the estimated tax amount and estimated take-home pay."
    ],
    methodology: [
      "Estimated tax = gross salary × (tax rate ÷ 100).",
      "Estimated take-home pay = gross salary − estimated tax.",
      "The calculator does not automatically calculate full UK PAYE, National Insurance, pension, student loan repayments, benefits, allowances, filing status, immigration rules, or local payroll rules."
    ],
    example: {
      scenario: "A UK salary of £45,000 with an estimated effective deduction rate of 22%.",
      steps: [
        "Estimated deductions = £45,000 × (22 ÷ 100) = £9,900",
        "Estimated take-home pay = £45,000 − £9,900 = £35,100",
        "Currency display is GBP because the UK region is selected"
      ],
      result: "The simplified estimated annual deductions are £9,900 and the estimated annual take-home pay is £35,100, before any payroll rules not included in the entered rate."
    },
    faqs: [
      {
        question: "Does this calculate exact UK take-home pay?",
        answer:
          "No. It uses the effective rate you enter. It does not automatically apply current UK PAYE bands, National Insurance, pensions, student loans, benefits, allowances, salary sacrifice, or local payroll rules."
      },
      {
        question: "What tax rate should I enter?",
        answer:
          "Use an effective overall rate that matches the deductions you want to estimate. If you are unsure, use a payslip, employer payroll estimate, official tax information, or qualified advice rather than guessing."
      },
      {
        question: "Can I compare salary and hourly work?",
        answer:
          "Yes. Use this calculator for a simple take-home estimate, then use the Salary to Hourly Calculator or Hourly to Salary Calculator for pay-rate comparisons."
      },
      {
        question: "Does the result include monthly pay?",
        answer:
          "This calculator returns annual figures. Divide by 12 for a rough average monthly amount, but actual payroll dates and deductions can vary."
      }
    ],
    mistakesOrLimitations: [
      "Do not treat the selected region as a payroll or tax rules engine; it currently controls currency display only.",
      "A marginal tax rate is not the same as an effective overall rate, so using the wrong type of rate can overstate or understate deductions.",
      "Employer benefits, pension contributions, overtime, bonuses, unpaid leave, visa or immigration requirements, and payroll timing are not modelled separately."
    ],
    disclaimer:
      "This calculator is a simplified estimate for general planning only. It is not payroll, tax, immigration, legal, financial, employment, or accounting advice."
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
    metaTitle: "Calorie Calculator for Maintenance and Weight Targets",
    metaDescription:
      "Estimate daily maintenance calories and simple calorie targets using Mifflin-St Jeor BMR and activity multipliers.",
    whatItDoes: [
      "Estimates daily maintenance calories from age, sex, height, weight, and activity level.",
      "Shows simple daily targets for mild weight loss, weight loss, and weight gain by adjusting maintenance calories.",
      "Complements the BMR and TDEE calculators by combining the same style of energy estimate into practical targets."
    ],
    howToUse: [
      "Enter age, sex, height in centimetres, and weight in kilograms.",
      "Choose the activity level that best represents your usual week.",
      "Click Calculate to see estimated maintenance calories and target calorie levels.",
      "Treat the outputs as starting estimates and adjust based on real-world progress and professional guidance where needed."
    ],
    methodology: [
      "BMR is estimated with the Mifflin-St Jeor method: 10 × weight(kg) + 6.25 × height(cm) − 5 × age + s.",
      "The sex adjustment used by the calculator is s = 5 for male and s = −161 for female.",
      "Maintenance calories = estimated BMR × activity multiplier, using multipliers from 1.2 to 1.9 depending on selected activity.",
      "Targets are calculated as maintenance − 250, maintenance − 500, and maintenance + 500 kcal/day, with loss targets not allowed below zero."
    ],
    example: {
      scenario: "A 35-year-old male, 180 cm, 80 kg, with moderate activity.",
      steps: [
        "BMR = 10 × 80 + 6.25 × 180 − 5 × 35 + 5 = 1,755 kcal/day",
        "Moderate activity multiplier = 1.55",
        "Maintenance = 1,755 × 1.55 = 2,720 kcal/day when rounded"
      ],
      result: "The calculator estimates about 2,720 kcal/day for maintenance, about 2,470 for mild loss, 2,220 for loss, and 3,220 for gain."
    },
    faqs: [
      {
        question: "Are these calories exact?",
        answer:
          "No. They are estimates based on a formula and activity multiplier. Actual energy needs vary between people and over time."
      },
      {
        question: "How should I choose activity level?",
        answer:
          "Pick the option that best matches your typical week. Overestimating activity is a common reason calorie estimates are too high."
      },
      {
        question: "Does this make a diet plan?",
        answer:
          "No. It gives calorie estimates only. Food choices, medical needs, training, appetite, and sustainability require separate consideration."
      },
      {
        question: "Why are the loss targets 250 and 500 kcal lower?",
        answer:
          "Those are simple planning offsets used by this calculator. They are not personalised recommendations or guarantees."
      }
    ],
    mistakesOrLimitations: [
      "The calculator uses binary sex options because the underlying formula uses those constants; this may not represent everyone accurately.",
      "Activity multipliers are broad estimates and can be the largest source of error.",
      "Pregnancy, illness, eating disorders, athletic training, medications, and clinical nutrition needs are not modelled."
    ],
    disclaimer:
      "This calculator is for general educational planning only and is not medical, nutritional, dietetic, fitness, or healthcare advice."
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
    metaTitle: "Retirement Calculator Estimate | Savings Projection",
    metaDescription:
      "Estimate a retirement savings projection based on your inputs for age, savings, contributions, and expected return. General guide, not financial advice.",
    whatItDoes: [
      "Creates a simplified retirement savings projection based on your inputs.",
      "Estimates projected retirement savings, total contributions, and total growth by your selected retirement age.",
      "Helps compare assumptions for current savings, monthly contributions, expected annual return, and time until retirement."
    ],
    howToUse: [
      "Select the display currency and enter your current age and planned retirement age.",
      "Enter current savings, monthly contribution, and an expected annual return assumption.",
      "Click Calculate to see an estimate based on your inputs, then adjust assumptions to compare scenarios.",
      "Use cautious assumptions: the calculator does not guarantee returns or replace regulated financial advice."
    ],
    methodology: [
      "Uses monthly compounding based on the expected annual return rate you enter.",
      "Projects across the number of whole months between current age and retirement age.",
      "Adds the monthly contribution after each month of estimated growth.",
      "Outputs nominal values; inflation adjustment is not separately implemented."
    ],
    example: {
      scenario: "Age 30, retire at 67, £20,000 currently saved, £300/month contribution, 5% expected annual return.",
      steps: [
        "Years to retirement = 67 − 30 = 37 years, or 444 months",
        "Monthly return assumption = 5% ÷ 12 = about 0.4167% per month",
        "Total contributions = £20,000 + (£300 × 444) = £153,200",
        "Apply monthly compounding to the starting balance and add £300 after each month"
      ],
      result: "The projection is about £510,858.87 at retirement, made up of £153,200.00 of contributions and about £357,658.87 of estimated growth."
    },
    faqs: [
      {
        question: "Is this retirement calculator financial advice?",
        answer:
          "No. It is a simplified estimate for education and planning only. It is not personal financial, pension, tax, or investment advice."
      },
      {
        question: "Are future investment returns guaranteed?",
        answer:
          "No. The expected annual return is only an assumption you enter. Real investment returns can be higher or lower and may be negative in some periods."
      },
      {
        question: "Does it include inflation?",
        answer:
          "No separate inflation field is implemented. Results are nominal unless you manually adjust the expected return to approximate inflation."
      },
      {
        question: "Does it include pension rules, taxes, fees, or withdrawals?",
        answer:
          "No. It does not model state pension benefits, employer pension rules, contribution limits, tax relief, taxes on withdrawals, investment fees, required withdrawals, or personal circumstances."
      }
    ],
    mistakesOrLimitations: [
      "The projection depends entirely on user-entered assumptions such as savings, contributions, expected return, and retirement age.",
      "It uses a constant annual return and does not model market volatility or sequence-of-returns risk.",
      "It does not include inflation, pension rules, employer matching, state pension, tax rules, fees, withdrawals, contribution limits, or personal financial circumstances unless explicitly shown in the inputs."
    ],
    disclaimer:
      "This retirement calculator is a simplified projection based on your inputs. It is not financial advice, does not guarantee future returns, and should not be the only basis for retirement decisions."
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
    metaTitle: "Body Fat Calculator Estimate | US Navy Method",
    metaDescription:
      "Estimate body fat percentage from tape measurements using the US Navy method. General body-composition guide, not a medical diagnosis.",
    whatItDoes: [
      "Estimates body fat percentage from height, waist, neck, and, for female mode, hip measurements.",
      "Returns a formula-based estimate rounded to 1 decimal place plus a broad category label.",
      "Provides a cautious body-composition reference that should not be used as the only measure of health."
    ],
    howToUse: [
      "Select male or female mode because the US Navy circumference formula uses different inputs.",
      "Enter height, waist, and neck measurements in centimetres; enter hip measurement as well when female mode is selected.",
      "Measure consistently with a flexible tape, level placement, relaxed posture, and without pulling the tape too tight.",
      "Click Calculate to see an estimate based on your inputs, not a medical diagnosis."
    ],
    methodology: [
      "Uses the US Navy circumference method already implemented in this calculator.",
      "Male mode uses: 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450.",
      "Female mode uses: 495 ÷ (1.29579 − 0.35004 × log10(waist + hip − neck) + 0.221 × log10(height)) − 450.",
      "Measurements are entered in centimetres and the calculator uses base-10 logarithms.",
      "The category label is broad context only and is generated from the calculator's internal ranges."
    ],
    example: {
      scenario: "Male mode with height 180 cm, waist 90 cm, and neck 40 cm.",
      steps: [
        "waist − neck = 90 − 40 = 50 cm",
        "Formula denominator = 1.0324 − 0.19077×log10(50) + 0.15456×log10(180)",
        "Body fat estimate = 495 ÷ denominator − 450",
        "Round the calculated percentage to 1 decimal place"
      ],
      result: "The estimate is about 22.7% body fat, with the calculator's broad category shown as Average."
    },
    faqs: [
      {
        question: "Is this a medical diagnosis?",
        answer:
          "No. It is a formula-based estimate from tape measurements and is not medical, fitness, nutrition, or weight-loss advice."
      },
      {
        question: "Why can results vary between measurements?",
        answer:
          "Tape placement, measurement tension, posture, hydration, recent exercise, body shape, sex, age, and individual differences can all change the estimate."
      },
      {
        question: "Why does female mode ask for hip measurement?",
        answer:
          "The calculator's female-mode US Navy formula includes waist, hip, neck, and height, while male mode uses waist, neck, and height."
      },
      {
        question: "Should I use this as my only health measure?",
        answer:
          "No. Body composition is only one health-related metric. Consider broader health context and consult a qualified professional for personal advice."
      }
    ],
    mistakesOrLimitations: [
      "Small measurement errors can noticeably change the estimate.",
      "The US Navy method may be less accurate for some body shapes, ages, athletic builds, medical conditions, or clinical situations.",
      "Hydration, recent training, posture, and how tightly the tape is held can affect measurements.",
      "Use centimetres consistently; mixing inches and centimetres will invalidate the calculation."
    ],
    disclaimer:
      "This calculator provides a general body-composition estimate only. It is not a medical diagnosis and is not medical, fitness, nutritional, weight-loss, or healthcare advice."
  },

  "ideal-weight-calculator": {
    slug: "ideal-weight-calculator",
    metaTitle: "Ideal Weight Calculator Reference Estimate",
    metaDescription:
      "Get a formula-based ideal weight reference estimate from height and sex. General guide only, not a personal medical target.",
    whatItDoes: [
      "Estimates a formula-based reference weight range from height and sex.",
      "Provides a general guide for context, not a personal medical target or diagnosis.",
      "Can be compared cautiously with BMI and body-fat estimates when considering broader health context."
    ],
    howToUse: [
      "Select sex and enter height in centimetres.",
      "Click Calculate to see a reference estimate range in kilograms.",
      "Interpret the result cautiously because ideal weight depends on more than height and sex."
    ],
    methodology: [
      "Uses the Devine formula based on height over 5 ft.",
      "Outputs a +/-10% range to avoid false precision.",
      "Does not adjust for age, muscle mass, body composition, medical history, ethnicity, pregnancy status, disability, or individual health context."
    ],
    example: {
      scenario: "Female, 165 cm tall.",
      steps: [
        "Convert height to inches: 165 ÷ 2.54 = about 64.96 inches",
        "Inches over 5 ft = 64.96 − 60 = about 4.96 inches",
        "Devine reference = 45.5 + (2.3 × 4.96) = about 56.9 kg",
        "Range = 56.9 kg ± 10%"
      ],
      result: "The displayed reference estimate is about 51.2 – 62.6 kg. This is a general guide, not a personal medical target."
    },
    faqs: [
      {
        question: "Is this my ideal personal weight?",
        answer:
          "No. It is a reference estimate from a formula. Personal health targets depend on your body composition, medical history, goals, and professional guidance."
      },
      {
        question: "Does ideal weight depend on muscle or body composition?",
        answer:
          "Yes. Muscle mass, fat distribution, frame size, disability, pregnancy status, ethnicity, age, and medical context can all affect what weight is appropriate for an individual."
      },
      {
        question: "Can I use this to set aggressive weight-loss goals?",
        answer:
          "No. Do not use this calculator to diagnose health, judge body size, or set aggressive weight-loss goals. Speak with a qualified clinician or dietitian for personal advice."
      },
      {
        question: "Why show a range instead of one number?",
        answer:
          "A range better reflects uncertainty and avoids implying that one exact number is correct for everyone with the same height and sex."
      }
    ],
    mistakesOrLimitations: [
      "The result is based only on height and sex, so it cannot capture individual health context.",
      "It does not account for age, muscle mass, body composition, ethnicity, pregnancy status, disability, medical history, or medication effects.",
      "It should not be used to diagnose health status or to create aggressive diet, fitness, or weight-loss plans."
    ],
    disclaimer:
      "This ideal weight calculator gives a formula-based reference estimate and general guide only. It is not a personal medical target and is not medical, nutrition, fitness, or weight-loss advice."
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
    metaTitle: "Simplified Income Tax Estimate Calculator",
    metaDescription:
      "Estimate income tax and after-tax income with a simplified manual effective-rate method; verify rates with official tax authorities.",
    whatItDoes: [
      "Estimates tax on annual income using a manual effective tax rate that you enter.",
      "Shows the estimated tax amount and after-tax income in GBP, EUR, or USD depending on the selected region.",
      "Provides a quick comparison tool without pretending to be an official, complete, payroll, or tax-return calculator."
    ],
    howToUse: [
      "Choose UK, Europe, or United States to set the result currency.",
      "Enter annual income before tax.",
      "Enter the manual estimated effective tax rate you want to test, after checking whether it is appropriate for your situation.",
      "Click Calculate and review the estimated tax and after-tax income."
    ],
    methodology: [
      "Estimated tax = annual income × (estimated tax rate ÷ 100).",
      "After-tax income = annual income − estimated tax.",
      "The calculator uses one effective percentage rate and does not apply official brackets, National Insurance, payroll deductions, pension deductions, allowances, regional differences, credits, deductions, local taxes, or filing-status rules."
    ],
    example: {
      scenario: "Annual income of £60,000 with a manually entered effective tax rate of 25%.",
      steps: [
        "Estimated tax = £60,000 × (25 ÷ 100) = £15,000",
        "After-tax income = £60,000 − £15,000 = £45,000",
        "The UK selection displays the result in GBP"
      ],
      result: "The simplified estimated tax is £15,000 and the estimated after-tax income is £45,000, before any deductions, credits, payroll items, or regional rules not included in the entered rate."
    },
    faqs: [
      {
        question: "Does this use current tax brackets?",
        answer:
          "No. It uses the single effective rate you enter and does not automatically look up or apply current tax bands, thresholds, allowances, credits, National Insurance, payroll deductions, or regional rules."
      },
      {
        question: "Is this different from the Salary Calculator?",
        answer:
          "The maths is similar, but this page is focused on income tax estimates. The Salary Calculator frames the same simple method as take-home pay planning."
      },
      {
        question: "Can I include deductions or credits?",
        answer:
          "Only indirectly. Adjust the effective rate to reflect deductions, credits, or withholdings only if you have reliable information, and verify important figures with official tax authorities or a qualified adviser."
      },
      {
        question: "Why is the tax rate capped in the form?",
        answer:
          "The input range keeps quick estimates within a practical range for this simple calculator. It is not a statement about any country's tax law."
      }
    ],
    mistakesOrLimitations: [
      "Do not rely on this for filing, payroll, self-assessment, withholding, immigration, benefit, or legal decisions.",
      "Tax systems often use bands, thresholds, allowances, credits, deductions, payroll taxes, National Insurance, and local or regional rules; this calculator does not model those details.",
      "Use an effective overall rate, not a marginal rate, unless you specifically want to model a marginal-rate scenario."
    ],
    disclaimer:
      "This is a simplified manual estimate only and is not official tax guidance or financial, tax, accounting, payroll, employment, immigration, or legal advice. Verify rates, thresholds, and obligations with official tax authorities or a qualified adviser."
  },

  "salary-to-hourly-calculator": {
    slug: "salary-to-hourly-calculator",
    metaTitle: "Hourly Wage Calculator from Annual Salary",
    metaDescription:
      "Convert annual salary into an estimated hourly wage using hours per week and weeks worked per year.",
    whatItDoes: [
      "Converts an annual salary into an estimated hourly wage based on your working pattern.",
      "Helps compare salaried roles with hourly work, freelance rates, or overtime assumptions.",
      "Uses your chosen hours per week and weeks per year rather than assuming one fixed schedule."
    ],
    howToUse: [
      "Enter the annual salary before tax or deductions.",
      "Enter the typical hours worked per week.",
      "Enter the number of paid or worked weeks per year you want to use.",
      "Click Calculate to see the estimated hourly rate."
    ],
    methodology: [
      "Annual hours = hours per week × weeks per year.",
      "Hourly wage = annual salary ÷ annual hours.",
      "The calculator returns a numeric hourly rate rounded to 2 decimal places."
    ],
    example: {
      scenario: "A £52,000 annual salary with 40 hours per week and 52 weeks per year.",
      steps: [
        "Annual hours = 40 × 52 = 2,080",
        "Hourly wage = 52,000 ÷ 2,080",
        "Rounded to 2 decimal places"
      ],
      result: "The estimated hourly wage is 25.00 before tax or other deductions."
    },
    faqs: [
      {
        question: "Is this the Hourly Wage Calculator?",
        answer:
          "Yes. In this site it is implemented as the Salary to Hourly Calculator, which converts annual salary into an hourly wage estimate."
      },
      {
        question: "Should I use 52 weeks per year?",
        answer:
          "Use 52 for a paid full-year salary comparison. Use fewer weeks if you want to reflect unpaid leave, seasonal work, or contract gaps."
      },
      {
        question: "Does this include tax?",
        answer:
          "No. It converts gross annual salary to a gross hourly equivalent. Use the Salary Calculator for a simple deduction estimate."
      },
      {
        question: "Should overtime be included?",
        answer:
          "Include overtime hours only if you want the hourly equivalent of total salary spread across those extra hours."
      }
    ],
    mistakesOrLimitations: [
      "Using contracted hours may produce a different result from using actual hours worked.",
      "The result does not account for taxes, benefits, pension contributions, holiday pay rules, or employment rights.",
      "Currency symbols are not applied in the result because the calculation is a generic rate conversion."
    ],
    disclaimer:
      "This calculator is for general pay comparison only and is not financial, tax, payroll, employment, or legal advice."
  },

  "hourly-to-salary-calculator": {
    slug: "hourly-to-salary-calculator",
    metaTitle: "Hourly to Salary Calculator",
    metaDescription:
      "Convert an hourly wage into weekly, monthly, and annual salary estimates from your working schedule.",
    whatItDoes: [
      "Converts an hourly wage into estimated weekly, monthly, and annual pay.",
      "Helps compare hourly roles, part-time schedules, and annual salary equivalents.",
      "Uses your chosen hours per week and weeks per year so you can model full-year, seasonal, or reduced schedules."
    ],
    howToUse: [
      "Enter the hourly wage before tax or deductions.",
      "Enter typical hours worked each week.",
      "Enter weeks worked or paid per year.",
      "Click Calculate to see weekly, average monthly, and annual estimates."
    ],
    methodology: [
      "Weekly pay = hourly wage × hours per week.",
      "Annual pay = weekly pay × weeks per year.",
      "Average monthly pay = annual pay ÷ 12."
    ],
    example: {
      scenario: "An hourly wage of 20, working 35 hours per week for 50 weeks per year.",
      steps: [
        "Weekly pay = 20 × 35 = 700",
        "Annual pay = 700 × 50 = 35,000",
        "Average monthly pay = 35,000 ÷ 12 = 2,916.67"
      ],
      result: "The estimate is 700 weekly, 2,916.67 average monthly, and 35,000 annually before deductions."
    },
    faqs: [
      {
        question: "Does monthly pay mean every month will be the same?",
        answer:
          "No. It is an annual average divided by 12. Actual pay can vary with rota patterns, pay dates, overtime, or unpaid leave."
      },
      {
        question: "Can I use this for part-time work?",
        answer:
          "Yes. Enter the part-time hours and weeks that match the schedule you want to compare."
      },
      {
        question: "Does it include tax or deductions?",
        answer:
          "No. The outputs are gross pay estimates before tax, payroll deductions, benefits, or expenses."
      },
      {
        question: "How do I convert salary back to an hourly wage?",
        answer:
          "Use the Salary to Hourly Calculator to divide an annual salary by annual working hours."
      }
    ],
    mistakesOrLimitations: [
      "Do not mix paid weeks and worked weeks unless that is the comparison you intend.",
      "Overtime premiums, shift allowances, commission, tips, benefits, and statutory rules are not modelled.",
      "The result is currency-neutral; interpret it in the currency of the hourly rate you entered."
    ],
    disclaimer:
      "This calculator is a general wage-conversion tool and is not financial, tax, payroll, employment, or legal advice."
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

