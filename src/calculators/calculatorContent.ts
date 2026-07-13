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
    metaTitle: "Percentage Calculator | Discounts, Rates, Marks & Maths",
    metaDescription:
      "Calculate percentage-based values from your inputs for discounts, increases, comparisons, marks, rates, and everyday maths estimates.",
    whatItDoes: [
      "Calculates the value of a percentage of a number based on your inputs, such as 15% of 240 or 7.5% of a bill.",
      "Helps estimate discounts, increases, comparisons, rates, marks, tips, tax-style add-ons, and other everyday maths checks.",
      "Works as a general maths tool: it returns the percentage value only, so you decide whether to add, subtract, or compare it."
    ],
    howToUse: [
      "Enter the base number you want to calculate a percentage from.",
      "Enter the percentage as a percent value, for example enter 18 for 18%, not 0.18.",
      "Click Calculate and review the estimate based on your inputs before using it in finance, tax, grades, or business decisions."
    ],
    methodology: [
      "Formula: percentage value = number × (percentage ÷ 100).",
      "The calculator converts the entered percentage to a decimal first; for example, 18% becomes 0.18.",
      "The displayed result is rounded to 2 decimal places for readability."
    ],
    example: {
      scenario: "A $240 service invoice includes an estimated 18% fee.",
      steps: [
        "Number = 240",
        "Percentage = 18",
        "Percentage value = 240 × (18 ÷ 100) = 240 × 0.18 = 43.2"
      ],
      result: "The estimated percentage value is $43.20. If the fee is added to the invoice, the estimated total would be $283.20."
    },
    faqs: [
      {
        question: "What does this percentage calculator calculate?",
        answer:
          "It calculates a percentage-based value from the number and percentage you enter. It does not automatically decide whether the value should be added, subtracted, or used as a comparison."
      },
      {
        question: "Can I use it for discounts, marks, or rates?",
        answer:
          "Yes. It is useful for everyday maths such as sale discounts, grade or mark checks, rate estimates, tips, increases, and simple comparisons, as long as the inputs match your situation."
      },
      {
        question: "Can I enter decimal percentages?",
        answer:
          "Yes. Values such as 2.5 or 7.5 are accepted. Enter the percentage itself, not its decimal equivalent."
      },
      {
        question: "Is this financial, tax, grade, or business advice?",
        answer:
          "No. It is a general maths calculator based on your inputs. Check your values and confirm important decisions with the appropriate official source or professional."
      }
    ],
    mistakesOrLimitations: [
      "Enter 15 when you mean 15%; do not enter 0.15 unless you intentionally mean 0.15%.",
      "The calculator estimates a simple percentage of a number and does not model compounding, percentage change, margin, markup, tax rules, grading policies, or business-specific rules.",
      "Rounding to 2 decimal places can create small differences compared with unrounded manual calculations."
    ],
    disclaimer:
      "This percentage calculator is a general maths tool. Results are mathematical estimates based on your inputs and are not financial, tax, grading, business, retail, or legal advice."
  },

  "mortgage-calculator": {
    slug: "mortgage-calculator",
    metaTitle: "Mortgage Calculator for Estimated Monthly Payments",
    metaDescription:
      "Estimate mortgage repayments based on your inputs, including loan amount, rate, term, deposit, and optional recurring ownership costs.",
    whatItDoes: [
      "Estimates the monthly principal-and-interest payment for a repayment mortgage based on the property price, deposit, annual interest rate, and term you enter.",
      "Shows the estimated mortgage balance, monthly principal and interest, optional monthly property tax, optional insurance, optional HOA/service charge, total monthly payment, total loan payments, and total interest.",
      "Helps you compare broad affordability scenarios before requesting lender quotes or reviewing a detailed Amortization Calculator schedule."
    ],
    howToUse: [
      "Select the region and currency that best match the figures you want to enter.",
      "Enter the full property price and the deposit or down payment amount. The calculator estimates the loan amount as property price minus deposit.",
      "Enter the annual interest rate as a percentage and the repayment term in years. The term is converted into monthly payments.",
      "Enter optional annual property tax, annual home insurance, and monthly HOA/service charges only if you want those recurring costs included in the total monthly estimate; otherwise leave them at 0.",
      "Click Calculate and review the result as an estimate based on your inputs, not as a mortgage offer or affordability decision."
    ],
    methodology: [
      "Loan amount = property price − down payment, floored at 0 if the down payment is greater than the property price.",
      "The annual interest rate is converted to a monthly rate: r = annual rate ÷ 12 ÷ 100, and the number of payments is n = loan term in years × 12.",
      "For interest-bearing repayment mortgages the calculator uses M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the mortgage balance.",
      "If the interest rate is 0%, the principal-and-interest payment is P ÷ n.",
      "Total loan payment = monthly principal-and-interest payment × n. Total interest paid = total loan payment − loan amount. Optional annual tax and insurance are divided by 12 and added with any monthly HOA/service charge to estimate total monthly cost."
    ],
    example: {
      scenario:
        "A buyer estimates a £350,000 home purchase with a £70,000 deposit, a 4.75% annual rate, and a 25-year repayment term.",
      steps: [
        "Loan amount = £350,000 − £70,000 = £280,000",
        "Number of monthly payments = 25 × 12 = 300",
        "Monthly rate = 4.75 ÷ 12 ÷ 100 = 0.0039583",
        "Using the repayment formula, monthly principal and interest ≈ £1,596.33",
        "Total loan payments ≈ £1,596.33 × 300 = £478,898.58, so total interest ≈ £198,898.58 before optional costs"
      ],
      result:
        "The calculator would estimate about £1,596.33 per month for principal and interest. If you entered £0 for tax, insurance, and HOA/service charge, the total monthly payment estimate would also be about £1,596.33."
    },
    mistakesOrLimitations: [
      "This is an estimate based on your inputs and is not a mortgage offer, approval, affordability assessment, or financial advice.",
      "It does not model arrangement fees, broker fees, insurance products, taxes not entered, legal fees, valuation fees, moving costs, early repayment charges, overpayments, product transfers, offset balances, or changes after an initial fixed/tracker period unless you explicitly include those costs in the inputs.",
      "Variable-rate changes, remortgaging, missed payments, daily interest, lender-specific rounding, and different payment dates can make real mortgage statements differ from this estimate.",
      "Do not enter the deposit as a percentage; the input expects a currency amount.",
      "The result depends heavily on the rate, term, deposit/loan amount, and repayment assumptions entered. Small rate changes can materially affect the payment and interest total."
    ],
    disclaimer:
      "This mortgage calculator provides a general estimate based on your inputs. It is not a mortgage offer, lender quote, affordability check, or financial advice. Confirm costs, fees, taxes, insurance, and eligibility with a regulated mortgage adviser or lender before making decisions.",
    faqs: [
      {
        question: "Is this a mortgage offer or approval?",
        answer:
          "No. It is only an estimate based on your inputs. A lender may use credit checks, income checks, affordability rules, property valuation, fees, and product terms before offering a mortgage."
      },
      {
        question: "What affects the estimated monthly payment most?",
        answer:
          "The loan amount, annual interest rate, repayment term, and whether you add recurring costs such as property tax, insurance, or HOA/service charges."
      },
      {
        question: "Does it include arrangement fees, legal fees, valuation fees, or early repayment charges?",
        answer:
          "No. Those are not modelled unless you manually adjust your inputs. Budget separately for one-off fees and product-specific charges."
      },
      {
        question: "Does it handle variable rates or remortgaging?",
        answer:
          "No. The estimate assumes the entered rate and repayment pattern stay the same for the whole term. Recalculate with new assumptions if the rate or product changes."
      },
      {
        question: "When should I use the Amortization Calculator instead?",
        answer:
          "Use the Amortization Calculator when you want to see how each monthly payment is split between interest and principal over time."
      }
    ]
  },

  "loan-calculator": {
    slug: "loan-calculator",
    metaTitle: "Loan Calculator for Estimated Repayments",
    metaDescription:
      "Estimate loan repayments based on principal, annual interest rate, and term, with total repayment and interest figures.",
    whatItDoes: [
      "Estimates the regular monthly repayment for a fixed-rate instalment loan based on the principal, annual interest rate, and term you enter.",
      "Shows the estimated total amount repaid and total interest over the repayment term.",
      "Provides a simple comparison point before reviewing a month-by-month Amortization Calculator schedule."
    ],
    howToUse: [
      "Choose the currency used for the loan figures.",
      "Enter the principal, meaning the amount borrowed or financed.",
      "Enter the annual interest rate as a percentage and the loan term in years. The calculator converts the term into monthly repayments.",
      "Click Calculate to estimate the monthly payment, total repayment, and total interest based on your inputs.",
      "Compare terms carefully: a longer term can reduce the monthly payment but increase total interest."
    ],
    methodology: [
      "The annual percentage rate entered is converted into a monthly rate by dividing by 12 and by 100.",
      "The number of repayments is the loan term in years multiplied by 12.",
      "For a standard amortised loan the calculator uses M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is principal, r is monthly rate, and n is monthly payments.",
      "For a zero-interest loan it divides the principal evenly across the monthly payments: M = P ÷ n.",
      "Total repayment = monthly payment × n. Total interest = total repayment − principal. Displayed currency values are rounded to 2 decimal places."
    ],
    example: {
      scenario: "A £12,000 car loan at 7.2% annual interest over 5 years.",
      steps: [
        "Principal = £12,000",
        "Monthly rate = 7.2 ÷ 12 ÷ 100 = 0.006",
        "Number of payments = 5 × 12 = 60",
        "Using the amortised loan formula, monthly payment ≈ £238.75",
        "Total repayment ≈ £238.75 × 60 = £14,324.90, so total interest ≈ £2,324.90"
      ],
      result:
        "The calculator would estimate a monthly payment of about £238.75, total repayments of about £14,324.90, and total interest of about £2,324.90."
    },
    mistakesOrLimitations: [
      "This is an estimate based on your inputs and is not a loan quote, approval, affordability assessment, or financial advice.",
      "It does not include lender fees, broker fees, insurance, late fees, early repayment charges, variable-rate changes, credit checks, affordability checks, taxes, or product-specific terms unless you explicitly add them to the principal or adjust the assumptions.",
      "The calculator assumes monthly payments are made on time and the rate remains unchanged for the whole term.",
      "Do not mix monthly and annual rates; the interest input expects an annual percentage rate-style figure.",
      "Real lenders may round payments differently or calculate interest daily, so statements can differ slightly."
    ],
    disclaimer:
      "This loan calculator provides an educational estimate based on your inputs. It is not a loan quote, lending decision, or financial advice. Confirm rates, fees, insurance, eligibility, affordability, and contract terms with the lender before borrowing.",
    faqs: [
      { question: "Is this a loan quote?", answer: "No. It is only an estimate based on the principal, rate, and term entered. A lender quote may depend on credit checks, fees, affordability, and product terms." },
      { question: "Can I use it for a car loan or personal loan?", answer: "Yes, for a simple fixed-rate monthly repayment estimate. Enter the amount financed, annual rate, and term." },
      { question: "Are lender fees or insurance included?", answer: "No. If a fee is financed into the loan, you can add it to the principal; otherwise budget for it separately." },
      { question: "What happens at 0% interest?", answer: "The calculator divides the principal evenly across the monthly payments, so total interest is £0, €0, or $0 depending on the selected currency." },
      { question: "How is this different from the Mortgage Calculator?", answer: "The Loan Calculator is a simpler fixed-loan tool. The Mortgage Calculator includes property price, deposit, and optional recurring ownership-cost inputs." }
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
    metaTitle: "Compound Interest Calculator | Projection, Not Advice",
    metaDescription:
      "Estimate compound growth from principal, monthly contributions, an assumed rate, time, and compounding frequency. Projection only, not financial advice.",
    whatItDoes: [
      "Estimates how a starting principal may grow when interest or an assumed return compounds over time.",
      "Includes user-entered monthly contributions and separates total contributions from estimated interest or growth.",
      "Uses the rate and compounding assumptions you enter; it does not predict or guarantee account rates or investment returns."
    ],
    howToUse: [
      "Select the currency used only for displaying the result.",
      "Enter the principal or starting amount, plus any monthly contribution you want included.",
      "Enter an annual interest or return rate assumption, the time period, and the compounding frequency.",
      "Review the estimated final balance as a mathematical projection based on your inputs, then compare alternative assumptions."
    ],
    methodology: [
      "The starting principal is compounded using A = P × (1 + r ÷ m)^(m × t), where r is the user-entered annual rate, m is compounds per year, and t is years.",
      "Monthly contributions are modeled as end-of-month additions using a monthly rate derived from the same annual rate.",
      "Total contributions equal initial principal plus all monthly contributions over the projection period.",
      "Estimated interest/growth equals estimated final balance minus total contributions, with currency values rounded for display."
    ],
    example: {
      scenario: "Start with £5,000, add £250 per month, assume 5% annual growth for 12 years, compounded monthly.",
      steps: [
        "Initial principal = £5,000",
        "Monthly contributions = £250 × 144 months = £36,000",
        "Total contributions = £41,000",
        "Apply 5% ÷ 12 monthly compounding to the starting principal and monthly contribution stream"
      ],
      result:
        "The estimated final balance is about £58,290, including about £17,290 of estimated interest/growth above the £41,000 contributed."
    },
    mistakesOrLimitations: [
      "This is a mathematical projection, not a guaranteed savings account rate or investment return.",
      "Actual outcomes may differ because rates can change and investments can rise or fall.",
      "Fees, tax, inflation, withdrawals, provider rules, bonus-rate conditions, and exact compounding schedules are not fully modeled.",
      "Contribution timing can affect real results; this tool assumes end-of-month contributions."
    ],
    disclaimer:
      "This calculator provides an estimate based on your inputs and is not financial, investment, tax, pension, or savings advice.",
    faqs: [
      { question: "Is the compound interest result guaranteed?", answer: "No. It is a projection using the rate and compounding settings you enter. Real savings rates, provider terms, fees, taxes, inflation, withdrawals, and investment performance can change the outcome." },
      { question: "What does compounding frequency mean?", answer: "It is how often interest is applied to the starting principal in the model. More frequent compounding can slightly increase the estimate when all other inputs are unchanged." },
      { question: "Why are monthly contributions handled separately?", answer: "The calculator compounds the initial principal using the selected frequency and models regular contributions with a monthly growth assumption, which is suitable for a recurring monthly contribution estimate." },
      { question: "Can I use this for investments?", answer: "You can enter an assumed return, but investments can fall as well as rise. Treat the result as a scenario estimate, not advice or a forecast." }
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
    metaTitle: "Unit Converter | Everyday Length, Weight & Temperature",
    metaDescription:
      "Convert between supported length, weight, and temperature units using fixed conversion factors for everyday general conversions.",
    whatItDoes: [
      "Converts between the supported units in the selected length, weight, or temperature category.",
      "Uses fixed conversion factors and direct temperature formulas for everyday/general conversions.",
      "Helps with quick checks for travel, labels, recipes, packages, fitness notes, school work, and other non-specialist uses."
    ],
    howToUse: [
      "Enter the value you want to convert.",
      "Pick the supported category, then choose the From and To units shown for that category.",
      "Click Calculate and treat the result as a rounded conversion based on the selected units."
    ],
    methodology: [
      "Length conversions use meters as the base unit; weight conversions use kilograms as the base unit.",
      "Temperature conversions use the standard formulas °F = °C × 9/5 + 32 and °C = (°F − 32) × 5/9.",
      "Results are formatted to 4 decimal places, so small rounding differences may appear."
    ],
    example: {
      scenario: "Convert 5 miles to kilometers.",
      steps: [
        "Category = length",
        "From = miles; To = kilometers",
        "1 mile = 1.609344 kilometers",
        "5 × 1.609344 = 8.04672"
      ],
      result: "The converted value is approximately 8.0467 km after display rounding."
    },
    faqs: [
      {
        question: "Does this unit converter include every possible unit?",
        answer:
          "No. It only converts the supported units shown in the form. It is intended for everyday/general conversions, not every specialist scientific, engineering, trade, medical, or legal measurement standard."
      },
      {
        question: "Why can my result differ slightly from another source?",
        answer:
          "The calculator uses fixed conversion factors and rounds displayed results to 4 decimal places. Other tools may show more decimals or use context-specific standards."
      },
      {
        question: "Can I use negative values?",
        answer:
          "Negative values can be meaningful for temperature conversions. For physical lengths or weights, check whether a negative input makes sense for your use case."
      }
    ],
    mistakesOrLimitations: [
      "Only the units listed in the selected category are supported.",
      "Rounding can create small differences compared with more precise or unrounded calculations.",
      "The tool does not replace specialist scientific, engineering, trade, medical, legal, or standards-body measurement guidance."
    ],
    disclaimer:
      "This converter provides general conversions based on fixed factors and your inputs. It is not professional measurement, engineering, medical, trade, or legal advice."
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
    metaTitle: "Savings Calculator | Estimate Savings Growth",
    metaDescription:
      "Estimate future savings from a starting balance, monthly deposits, interest-rate assumption, and time period. Projection only, not financial advice.",
    whatItDoes: [
      "Estimates savings growth based on your entered starting amount, monthly deposits, annual interest rate, and time period.",
      "Shows total deposits separately from estimated interest so you can see how much of the projection comes from contributions.",
      "Helps compare savings scenarios, but it does not guarantee a provider rate or final account balance."
    ],
    howToUse: [
      "Select the display currency and enter your current savings balance.",
      "Enter the monthly deposit you plan to add and the annual interest rate assumption you want to test.",
      "Enter the number of years for the projection.",
      "Read the result as an estimate based on your inputs, then adjust the rate, deposit, or time period to compare scenarios."
    ],
    methodology: [
      "The calculator converts the user-entered annual interest rate into a monthly rate by dividing by 12.",
      "For each month, it applies interest to the current balance and then adds the monthly deposit.",
      "Total deposits equal starting savings plus all monthly deposits over the projection period.",
      "Estimated interest equals estimated final balance minus total deposits, rounded for display."
    ],
    example: {
      scenario: "Start with €1,000, deposit €100 per month, assume 3% annual interest for 5 years.",
      steps: [
        "Time period = 5 years × 12 = 60 months",
        "Total deposits = €1,000 + (€100 × 60) = €7,000",
        "Monthly interest rate = 3% ÷ 12 = 0.25%",
        "Apply monthly interest, then add each €100 deposit"
      ],
      result:
        "The estimated final balance is about €7,626.29, including about €626.29 of estimated interest above deposits."
    },
    mistakesOrLimitations: [
      "Savings rates may change and bonus rates or promotional terms may expire.",
      "The estimate may not include account fees, tax, inflation, withdrawals, provider eligibility rules, or exact bank compounding practices.",
      "Monthly deposit timing matters; this model adds deposits after monthly interest is applied.",
      "A 0% rate case simply adds deposits without interest growth."
    ],
    disclaimer:
      "This savings calculator is a projection based on your inputs and is not financial advice. Check provider terms and consider tax, inflation, fees, and your own circumstances.",
    faqs: [
      { question: "Is this a guaranteed savings forecast?", answer: "No. It is an estimate based on your inputs. Actual savings outcomes can vary because interest rates, fees, tax, inflation, withdrawals, provider rules, and compounding practices can differ." },
      { question: "Does the calculator include tax or inflation?", answer: "No. It shows nominal savings growth before any tax, inflation adjustment, account fees, or other deductions unless those effects are reflected in the rate you enter." },
      { question: "When are deposits added?", answer: "The calculation applies monthly interest first and then adds the monthly deposit. Some providers may credit interest or accept deposits on a different schedule." },
      { question: "Can I enter 0% interest?", answer: "Yes. The result will show starting savings plus deposits, with estimated interest of zero." }
    ]
  },
  "investment-calculator": {
    slug: "investment-calculator",
    metaTitle: "Investment Calculator | Estimate Growth Scenarios",
    metaDescription:
      "Estimate possible investment growth using an initial amount, recurring contributions, assumed annual return, and time period. Not investment advice.",
    whatItDoes: [
      "Estimates a possible investment balance from an initial amount, recurring contributions, contribution frequency, assumed annual return, and time period.",
      "Shows total contributed separately from estimated growth so the projection is easier to interpret.",
      "Uses a constant assumed return for comparison; it does not guarantee future returns or model market volatility."
    ],
    howToUse: [
      "Select the display currency and enter the amount already invested or planned as the starting amount.",
      "Enter the recurring contribution and choose whether it is weekly, monthly, or yearly.",
      "Enter an assumed annual return and the number of years to project.",
      "Treat the ending balance as a scenario estimate based on your inputs, not a forecast or recommendation."
    ],
    methodology: [
      "The calculator converts the assumed annual return into a per-period return based on the selected contribution frequency.",
      "For each period, it applies the period return to the current balance and then adds the recurring contribution.",
      "Total contributed equals the initial amount plus all recurring contributions during the projection.",
      "Estimated growth equals estimated ending balance minus total contributed, rounded for display."
    ],
    example: {
      scenario: "$2,000 initial investment, $50 weekly contribution, 7% assumed annual return for 8 years.",
      steps: [
        "Periods = 8 years × 52 weeks = 416 weekly periods",
        "Total contributed = $2,000 + ($50 × 416) = $22,800",
        "Per-period assumed return = 7% ÷ 52",
        "Apply growth each week, then add the $50 contribution"
      ],
      result:
        "The estimated ending balance is about $31,357.67, including about $8,557.67 of estimated growth above contributions."
    },
    mistakesOrLimitations: [
      "Future investment returns are not guaranteed, and investment values can rise or fall.",
      "The projection may not include platform fees, fund charges, bid/ask spreads, tax, inflation, withdrawals, contribution limits, risk level, currency risk, or personal circumstances.",
      "A constant assumed return does not represent real market volatility or sequence-of-returns risk.",
      "The model assumes contributions are made at the end of each selected period."
    ],
    disclaimer:
      "This calculator is for educational estimates only and is not investment, financial, tax, pension, or retirement advice. Consider regulated advice for decisions involving risk.",
    faqs: [
      { question: "Does this guarantee future investment returns?", answer: "No. It uses the assumed return you enter to create a projection. Real investment performance can be higher or lower, and losses are possible." },
      { question: "Does it include investment fees or taxes?", answer: "No. Platform fees, fund charges, taxes, inflation, currency effects, withdrawals, and contribution limits are not modeled unless you adjust your return assumption to reflect them." },
      { question: "What return should I enter?", answer: "Use a cautious assumption that reflects the scenario you want to test. The calculator cannot choose a suitable return or risk level for your personal circumstances." },
      { question: "How are contributions timed?", answer: "The calculator applies growth for each period and then adds that period's contribution, so different real contribution timing could produce different results." }
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
    metaTitle: "GPA Calculator Estimate | Credits & 4.0 Letter Grades",
    metaDescription:
      "Estimate GPA from course credits and letter grades on the calculator's simple 4.0 scale. General academic planning tool, not an official transcript calculation.",
    whatItDoes: [
      "Estimates a credit-weighted GPA based on the course credits and letter grades you enter.",
      "Uses the calculator's built-in simple 4.0 letter-grade point scale and totals the credits included in your inputs.",
      "Works as a general academic planning tool for rough checks, not as an official transcript, registrar, school, college, or university GPA calculation."
    ],
    howToUse: [
      "Choose the number of courses you want to include, up to the fields shown by the calculator.",
      "Enter the credit value or weight for each course and select the matching letter grade from the available 4.0-scale options.",
      "Click Calculate and treat the result as an estimate based on your inputs; verify official GPA rules with your school or institution."
    ],
    methodology: [
      "The implemented grade-point scale is A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D=1.0, and F=0.0.",
      "For each course, quality points = course credits × selected grade points.",
      "Estimated GPA = total quality points ÷ total entered credits, rounded to 2 decimal places; total credits are rounded to 1 decimal place.",
      "If no credits are entered, the calculator returns 0 rather than an official academic status."
    ],
    example: {
      scenario: "Three courses: 3 credits with A, 4 credits with B+, and 2 credits with C.",
      steps: [
        "Course quality points = 3×4.0 = 12.0, 4×3.3 = 13.2, and 2×2.0 = 4.0",
        "Total quality points = 12.0 + 13.2 + 4.0 = 29.2",
        "Total credits = 3 + 4 + 2 = 9",
        "Estimated GPA = 29.2 ÷ 9 = 3.244..., rounded to 3.24"
      ],
      result: "The calculator would show an estimated GPA of 3.24 and total credits of 9.0."
    },
    faqs: [
      {
        question: "Is this the same as my official GPA?",
        answer:
          "No. It is an estimate based on your inputs and the calculator's simple 4.0 scale. Official GPA calculations can depend on your institution's grading scale, transcript rules, repeated-course policy, pass/fail treatment, honours/AP weighting, and other rules."
      },
      {
        question: "Can I use weighted, honours, or AP grades?",
        answer:
          "Only if you can represent your institution's weighting using the available letter-grade options and credit values. The calculator does not add separate honours, AP, plus/minus policies beyond the listed point scale, or school-specific weighting rules."
      },
      {
        question: "Why does my school show a different GPA?",
        answer:
          "Schools, colleges, universities, and countries may use different grade points, rounding, credit weighting, repeated-course handling, exclusions, pass/fail rules, and transcript policies. Check your official academic record for the final value."
      }
    ],
    mistakesOrLimitations: [
      "The result depends entirely on the credits and letter grades you enter.",
      "It uses the built-in simple 4.0 scale only and does not model every school, college, university, country, grading scale, weighting method, pass/fail rule, repeated-course policy, honours/AP weighting, or institutional policy.",
      "Rounding to 2 decimal places can differ from official transcript rounding."
    ],
    disclaimer:
      "This GPA calculator is a general academic planning tool that estimates GPA based on your inputs. It is not an official transcript calculation. Verify official GPA, academic standing, progression, scholarships, or admissions requirements with your school or institution."
  },

  "grade-calculator": {
    slug: "grade-calculator",
    metaTitle: "Grade Calculator Estimate | Required Final Exam Score",
    metaDescription:
      "Estimate the final exam score needed to reach a target course grade based on current grade and weights. General planning tool, not an official grade record.",
    whatItDoes: [
      "Estimates the final exam percentage needed to reach your desired overall course grade based on the values you enter.",
      "Uses a weighted-average equation with your current grade, completed weight, desired final grade, and final exam weight.",
      "Helps with academic planning, but it is not an official gradebook, transcript, or institution record."
    ],
    howToUse: [
      "Enter your current grade as a percentage for the completed work represented by the completed weight.",
      "Enter the completed weight and final exam weight as percentages, such as 70 and 30, not 0.70 and 0.30.",
      "Enter your desired final grade, click Calculate, and check the estimate against your course or institution's grading policy."
    ],
    methodology: [
      "The calculator solves: desired overall grade = current grade × completed weight + required final exam grade × final exam weight, with weights converted from percentages to decimals.",
      "Required final exam grade = (desired − current × (completed weight ÷ 100)) ÷ (final exam weight ÷ 100).",
      "The result is rounded to 2 decimal places and may be below 0 or above 100 if the target is already secured or may be unreachable under the entered weights."
    ],
    example: {
      scenario: "Current grade 82%, completed weight 70%, desired final grade 85%, final exam weight 30%.",
      steps: [
        "Completed contribution = 82 × (70 ÷ 100) = 82 × 0.70 = 57.4",
        "Points still needed toward the overall grade = 85 − 57.4 = 27.6",
        "Required final exam grade = 27.6 ÷ 0.30 = 92.0"
      ],
      result: "The calculator would estimate that you need 92.00% on the final exam to reach an 85% overall grade, before any course-specific rounding, curve, or extra-credit rules."
    },
    faqs: [
      {
        question: "What if the required score is over 100%?",
        answer:
          "That usually means the target may be unreachable under the entered current grade and weights unless your course allows extra credit, curves, resits, dropped assignments, or other adjustments."
      },
      {
        question: "What if the required score is negative?",
        answer:
          "A negative result can mean your target is already mathematically met under the entered assumptions. Your official grade can still depend on attendance, minimum exam scores, pass/fail rules, or other policies."
      },
      {
        question: "Will this match my teacher's gradebook?",
        answer:
          "Not necessarily. Grading policies vary by institution, course, teacher, category weighting, rounding rules, missing assignments, curves, extra credit, resits, and pass/fail requirements. Check with your course or institution."
      }
    ],
    mistakesOrLimitations: [
      "The estimate assumes the entered current grade and completed weight accurately represent all completed work.",
      "It does not model every grading category, curve, extra-credit policy, missing-assignment rule, resit option, attendance requirement, minimum exam threshold, or institution-specific rounding rule.",
      "If completed weight and final exam weight do not describe the grading scheme you intend, the result will be misleading."
    ],
    disclaimer:
      "This grade calculator is a general academic planning tool based on your inputs. It is not an official grade record, transcript, or guarantee. Check important grade decisions with your course, teacher, school, college, or institution."
  },

  "date-calculator": {
    slug: "date-calculator",
    metaTitle: "Date Calculator | Add or Subtract Days, Weeks, Months & Years",
    metaDescription:
      "Calculate a resulting date by adding or subtracting days, weeks, months, or years from a selected start date.",
    whatItDoes: [
      "Calculates a resulting date by adding or subtracting the amount and unit you select.",
      "Shows the resulting date and day of week based on the selected start date and calendar operation.",
      "Helps with general planning, reminders, study schedules, project timelines, and personal date checks."
    ],
    howToUse: [
      "Choose the start date.",
      "Enter a whole-number amount and choose days, weeks, months, or years.",
      "Choose Add or Subtract, then click Calculate and verify the result before using it for official deadlines."
    ],
    methodology: [
      "Days are added or subtracted as calendar days; weeks are converted to 7 calendar days.",
      "Months and years use the browser's built-in calendar date handling, so end-of-month results can adjust when the target month has fewer days.",
      "The result is displayed in ISO format (YYYY-MM-DD) with a weekday for clarity."
    ],
    example: {
      scenario: "Add 6 weeks to March 17, 2026.",
      steps: [
        "Start date = 2026-03-17",
        "Amount = 6; Unit = weeks; Operation = add",
        "6 weeks = 42 calendar days",
        "2026-03-17 + 42 days = 2026-04-28"
      ],
      result: "The resulting date is 2026-04-28, a Tuesday."
    },
    faqs: [
      {
        question: "Does this calculate business days or public holidays?",
        answer:
          "No. It uses calendar days/weeks/months/years and does not exclude weekends or public holidays unless that behavior is explicitly added in the future."
      },
      {
        question: "Why does adding months sometimes change the day number?",
        answer:
          "Some months have fewer days. Browser calendar handling adjusts dates such as month-end values according to its date rules."
      },
      {
        question: "Can I use this for legal, immigration, tax, or employment deadlines?",
        answer:
          "Use caution. Official deadlines may depend on jurisdiction, timezone, filing rules, holidays, business days, and inclusive/exclusive counting rules that this calculator does not model."
      }
    ],
    mistakesOrLimitations: [
      "The calculator adds or subtracts from one start date; it does not currently measure the difference between two dates.",
      "It does not model every timezone, daylight-saving, business-day, public-holiday, legal-deadline, or non-Gregorian calendar-system rule.",
      "End-of-month month/year calculations may differ from rules used by contracts, courts, employers, schools, or agencies."
    ],
    disclaimer:
      "This date calculator is a general calendar maths tool based on your inputs. Confirm legal, immigration, tax, employment, medical, travel, or official deadlines with the relevant authority."
  },

  "time-duration-calculator": {
    slug: "time-duration-calculator",
    metaTitle: "Time Duration Calculator | Difference Between Date-Times",
    metaDescription:
      "Calculate a general time duration between entered start and end date-times in total days, hours, and minutes.",
    whatItDoes: [
      "Calculates the duration between an entered start date-time and end date-time.",
      "Returns total whole days, total whole hours, and total whole minutes based on the entered values.",
      "Works as a general time maths tool for simple planning, elapsed-time checks, and schedule estimates."
    ],
    howToUse: [
      "Enter the start date and time.",
      "Enter the end date and time. The end must be the same as or after the start for a non-negative duration.",
      "Click Calculate and review the totals before using them for payroll, employment, transport, or legal purposes."
    ],
    methodology: [
      "The calculator converts both entered date-times to browser-interpreted timestamps and subtracts start from end.",
      "The millisecond difference is converted to total minutes, total hours, and total days.",
      "Displayed totals are floored to whole units, so leftover minutes or seconds are not shown in the larger-unit totals."
    ],
    example: {
      scenario: "From March 17, 2026 at 09:00 to March 18, 2026 at 12:30.",
      steps: [
        "Start = 2026-03-17 09:00",
        "End = 2026-03-18 12:30",
        "Elapsed time = 27 hours 30 minutes",
        "Total minutes = 1,650; total whole hours = 27; total whole days = 1"
      ],
      result: "The calculator shows 1 total day, 27 total hours, and 1,650 total minutes."
    },
    faqs: [
      {
        question: "Does this handle time zones or daylight saving rules?",
        answer:
          "It uses your browser's interpretation of the entered date-times. It is not a specialist timezone, daylight-saving, aviation, or transport scheduling calculator."
      },
      {
        question: "What happens if the start and end time are the same?",
        answer:
          "The duration is 0 minutes, 0 hours, and 0 days because no time has elapsed."
      },
      {
        question: "Can I use it for payroll or legal deadlines?",
        answer:
          "Use caution. Payroll, employment, transport, and legal rules may require rounding, breaks, overnight-shift handling, timezones, or statutory rules that this calculator does not model."
      }
    ],
    mistakesOrLimitations: [
      "The calculator does not accept an end date-time before the start date-time.",
      "It may not handle every timezone, daylight-saving, overnight shift, payroll, legal, employment, aviation, or transport timing rule.",
      "Whole-day and whole-hour outputs are floored totals, not a days-hours-minutes breakdown."
    ],
    disclaimer:
      "This time duration calculator is a general time maths tool based on your inputs. It is not payroll, employment, legal, aviation, transport, or official scheduling advice."
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
    metaTitle: "Ovulation Calculator Estimate | General Guide",
    metaDescription:
      "Estimate a likely ovulation date and fertile window based on your inputs. General guide only and not medical advice.",
    whatItDoes: [
      "Estimates a likely ovulation date and fertile window from the last period start date and average cycle length you enter.",
      "Shows a general planning guide based on your inputs, not a diagnosis or confirmation of ovulation.",
      "Uses cautious date ranges because menstrual cycles vary between individuals and can change from month to month."
    ],
    howToUse: [
      "Enter the first day of your last period, not the last day of bleeding.",
      "Enter your average cycle length in days. If your cycles are irregular, treat the result as a rough estimate only.",
      "Click Calculate to see the estimated ovulation date and likely fertile window based on your inputs."
    ],
    methodology: [
      "The calculator estimates the next period by adding the average cycle length to the last period start date.",
      "It then estimates ovulation as roughly 14 days before that next period.",
      "The likely fertile window is estimated as 5 days before the estimated ovulation date through 1 day after it."
    ],
    example: {
      scenario: "Last period start date: 2026-03-01. Average cycle length: 28 days.",
      steps: [
        "Estimated next period start = 2026-03-01 + 28 days = 2026-03-29",
        "Estimated ovulation date = 2026-03-29 − 14 days = 2026-03-15",
        "Likely fertile window = 2026-03-10 through 2026-03-16"
      ],
      result:
        "Based on those inputs, the calculator would show an estimated ovulation date of 2026-03-15 and a likely fertile window from 2026-03-10 to 2026-03-16."
    },
    faqs: [
      {
        question: "How accurate is this ovulation estimate?",
        answer:
          "It is a general guide based on your inputs. Individual cycles vary, and ovulation can shift from month to month even when your average cycle length looks regular."
      },
      {
        question: "Can I use this as my only contraception method?",
        answer:
          "No. This calculator should not be used as the only method for contraception, fertility treatment, or pregnancy planning. Speak to a qualified healthcare professional for contraception, fertility, pregnancy, or cycle-health advice."
      },
      {
        question: "What can affect ovulation timing?",
        answer:
          "Cycle irregularity, stress, illness, medication, breastfeeding, age, hormonal conditions, recent pregnancy, travel, sleep changes, and other health factors can all affect ovulation timing."
      },
      {
        question: "What if my cycles are irregular?",
        answer:
          "The result may be less reliable if cycle length changes often. Consider tracking cycles over time and discuss irregular, painful, absent, or concerning cycles with a healthcare professional."
      }
    ],
    mistakesOrLimitations: [
      "The estimate assumes ovulation occurs about 14 days before the next period, which is not true for everyone.",
      "It does not test hormone levels, confirm ovulation, diagnose cycle conditions, or account for personal medical history.",
      "It may be less reliable with irregular cycles, recent pregnancy, breastfeeding, hormonal contraception changes, fertility medication, perimenopause, PCOS, thyroid conditions, or other health factors.",
      "Do not rely on this result alone for contraception, fertility treatment decisions, or pregnancy planning."
    ],
    disclaimer:
      "This ovulation calculator provides an estimate and general guide based on your inputs. It is not a medical diagnosis, does not confirm ovulation, and is not medical, fertility, contraception, or pregnancy advice. Speak to a doctor, midwife, GP, fertility specialist, or other qualified healthcare professional for personal guidance."
  },

  "pregnancy-calculator": {
    slug: "pregnancy-calculator",
    metaTitle: "Pregnancy Due Date Calculator Estimate | General Guide",
    metaDescription:
      "Estimate a due date and pregnancy timeline based on your inputs. General guide only and not medical advice.",
    whatItDoes: [
      "Estimates a due date from the last menstrual period (LMP) date you enter.",
      "Shows a general pregnancy week and trimester timeline based on your inputs and today’s date.",
      "Provides a date estimate only; it does not confirm pregnancy, diagnose complications, or replace medical care."
    ],
    howToUse: [
      "Enter the first day of the last menstrual period (LMP).",
      "Click Calculate to see the estimated due date, current pregnancy week, and trimester based on your inputs.",
      "Use the result as a general guide and confirm pregnancy dating and care plans with a midwife, GP, doctor, or qualified healthcare professional."
    ],
    methodology: [
      "The estimated due date uses Naegele’s rule: LMP + 280 days, or 40 weeks.",
      "Current week is calculated from days since the LMP date, then grouped into trimesters.",
      "Clinical pregnancy dating can vary based on cycle length, ovulation timing, ultrasound dating, embryo transfer date, and healthcare professional assessment."
    ],
    example: {
      scenario: "Last menstrual period start date: 2026-01-01.",
      steps: [
        "Estimated due date = 2026-01-01 + 280 days = 2026-10-08",
        "Pregnancy week is estimated from the number of days between 2026-01-01 and today",
        "Trimester is assigned from the estimated week: weeks 1–13 first, 14–27 second, and 28+ third"
      ],
      result:
        "Based on an LMP of 2026-01-01, the calculator would show an estimated due date of 2026-10-08. The displayed week and trimester depend on today’s date."
    },
    faqs: [
      {
        question: "Is the estimated due date exact?",
        answer:
          "No. A due date is an estimate, and many births happen before or after the estimated due date."
      },
      {
        question: "Does this calculator confirm pregnancy?",
        answer:
          "No. It does not confirm pregnancy, diagnose pregnancy complications, or assess your health. Contact a healthcare professional for pregnancy testing, antenatal care, symptoms, bleeding, pain, or urgent concerns."
      },
      {
        question: "Why might my healthcare provider give a different due date?",
        answer:
          "Dating can vary because of cycle length, ovulation timing, ultrasound measurements, embryo transfer date, and clinical assessment. Your healthcare provider’s dating may be more appropriate for your care."
      },
      {
        question: "Who should I contact for pregnancy care?",
        answer:
          "Contact a midwife, GP, doctor, obstetric clinician, fertility clinic, or qualified healthcare professional for pregnancy care, medication questions, symptoms, or medical concerns."
      }
    ],
    mistakesOrLimitations: [
      "The calculator assumes a standard 280-day pregnancy measured from LMP, which may not match every pregnancy.",
      "It does not adjust for cycle length, irregular periods, known ovulation date, ultrasound dating, embryo transfer date, or clinical risk factors.",
      "It does not confirm pregnancy, detect miscarriage or ectopic pregnancy, diagnose complications, or provide emergency guidance.",
      "Always use professional medical advice for pregnancy care, symptoms, medication decisions, fertility treatment, or concerns about your health or your baby."
    ],
    disclaimer:
      "This pregnancy calculator provides an estimated due date and general timeline based on your inputs. It is not medical advice, does not confirm pregnancy, and does not diagnose pregnancy complications. Speak to a midwife, GP, doctor, obstetric clinician, fertility clinic, or other qualified healthcare professional for personal pregnancy care."
  },

  "scientific-calculator": {
    slug: "scientific-calculator",
    metaTitle: "Scientific Calculator Online | General Maths Tool",
    metaDescription:
      "Evaluate general maths expressions with arithmetic, powers, parentheses, trig, logs, square root, and pi. Not for safety-critical professional use.",
    whatItDoes: [
      "Evaluates a typed mathematical expression and returns a numerical result based on the calculator's supported syntax.",
      "Supports arithmetic operators, parentheses, powers, square root, sine, cosine, tangent, base-10 logarithm, natural logarithm, and pi.",
      "Works as a general-purpose maths calculator, not a specialist engineering, laboratory, legal, medical, financial, or safety-critical tool."
    ],
    howToUse: [
      "Type an expression such as (2+3)*4, sqrt(81), sin(pi/2), log(100), ln(2), or 2^3.",
      "Use parentheses to make the intended order of operations clear, especially in longer expressions.",
      "Click Calculate and independently verify results before using them for professional, safety-critical, financial, medical, engineering, lab, or legal work."
    ],
    methodology: [
      "The expression is tokenized and evaluated with the app's parser rather than JavaScript eval.",
      "Operator precedence is applied as powers first, then multiplication/division, then addition/subtraction; parentheses override that order.",
      "Functions supported by the current implementation are sin, cos, tan, sqrt, log for base-10 logarithm, ln for natural logarithm, and pi as a constant.",
      "Trigonometric functions use radians, results are rounded to 10 decimal places for display, and browser number precision can affect very large, tiny, or sensitive calculations."
    ],
    example: {
      scenario: "Evaluate sqrt(81) + sin(pi/2) + 2^3.",
      steps: [
        "sqrt(81) = 9",
        "sin(pi/2) = 1 because trig functions use radians",
        "2^3 = 8",
        "Total = 9 + 1 + 8 = 18"
      ],
      result: "The calculator would return 18, subject to display rounding and supported syntax."
    },
    faqs: [
      {
        question: "Are trig functions in degrees or radians?",
        answer:
          "They use radians. For example, sin(pi/2) returns about 1. Degree conversion is not a separate mode in the current implementation."
      },
      {
        question: "What syntax is supported?",
        answer:
          "Use +, -, *, /, ^, parentheses, sqrt(), sin(), cos(), tan(), log(), ln(), and pi. Unsupported symbols, unknown functions, mismatched parentheses, or non-finite results return an invalid-expression style message."
      },
      {
        question: "Can I use this for professional or safety-critical calculations?",
        answer:
          "Use caution. It is intended for general maths and education. Rounding, input syntax, operator precedence, and browser floating-point precision can affect results, so specialist work should be checked with appropriate professional tools."
      }
    ],
    mistakesOrLimitations: [
      "It does not provide specialist engineering units, uncertainty analysis, significant-figure controls, symbolic algebra, matrices, complex numbers, financial functions, medical dosing logic, or legal/regulatory validation.",
      "Division by zero, invalid square roots/logarithms, malformed input, and non-finite results are rejected as invalid expressions.",
      "Rounding to 10 decimal places and JavaScript/browser number precision can create small differences from exact or high-precision calculations."
    ],
    disclaimer:
      "This scientific calculator is a general-purpose educational maths tool based on your input expression. Do not rely on it as the only check for engineering, laboratory, legal, medical, financial, construction, or other safety-critical decisions."
  },

  "fraction-calculator": {
    slug: "fraction-calculator",
    metaTitle: "Fraction Calculator | Add, Subtract, Multiply & Divide",
    metaDescription:
      "Calculate fraction operations and see raw, simplified, and decimal results. Useful for homework, recipes, proportions, and everyday fraction checks.",
    whatItDoes: [
      "Performs addition, subtraction, multiplication, or division on two fractions entered in a/b form.",
      "Shows the raw calculated fraction, a simplified fraction, and a rounded decimal equivalent based on the current implementation.",
      "Can help with maths homework checks, recipes, proportions, scaling, and everyday fraction work when inputs are entered carefully."
    ],
    howToUse: [
      "Enter each fraction in numerator/denominator form, such as 3/4 or -5/8. Whole numbers can be entered as 5/1.",
      "Choose add, subtract, multiply, or divide, then click Calculate.",
      "Check signs, denominators, operation choice, simplification, and any rounded decimal result before relying on the answer."
    ],
    methodology: [
      "For addition and subtraction, the calculator cross-multiplies to form a common denominator: a/b ± c/d = (a×d ± c×b)/(b×d).",
      "For multiplication, it multiplies numerators and denominators: a/b × c/d = (a×c)/(b×d).",
      "For division, it multiplies by the reciprocal: a/b ÷ c/d = (a×d)/(b×c), and rejects division by a zero numerator in the second fraction because that creates a zero denominator.",
      "It simplifies the result by dividing the numerator and denominator by their greatest common divisor, normalizes a negative denominator to the numerator, and rounds the decimal equivalent to 6 decimal places."
    ],
    example: {
      scenario: "Add 3/4 and 1/6.",
      steps: [
        "Use common denominator 4×6 = 24",
        "Cross-multiply the numerator: 3×6 + 1×4 = 18 + 4 = 22",
        "Raw result = 22/24",
        "Simplify by gcd(22, 24) = 2, so 22/24 = 11/12",
        "Decimal equivalent = 11 ÷ 12 = 0.916666..., rounded to 0.916667"
      ],
      result: "The calculator would show raw result 22/24, simplified fraction 11/12, and decimal 0.916667."
    },
    faqs: [
      {
        question: "What input format is supported?",
        answer:
          "Use a/b with a non-zero denominator, such as 5/8 or -3/10. Mixed numbers are not parsed directly; convert them first, such as 1 1/2 to 3/2."
      },
      {
        question: "What happens if I divide by zero?",
        answer:
          "A fraction with denominator 0 is invalid. Dividing by 0/anything is also invalid because the reciprocal would create a zero denominator."
      },
      {
        question: "Can I use this as my only check for exams or professional calculations?",
        answer:
          "No. It is a helpful arithmetic aid, but you should independently check exam work and use appropriate professional methods for engineering, medical dosing, construction, legal, or financial calculations."
      }
    ],
    mistakesOrLimitations: [
      "The calculator expects two fractions in a/b format and does not directly parse mixed-number notation such as 1 1/2.",
      "Decimals are rounded to 6 decimal places, so repeating decimals are approximate.",
      "Incorrect signs, swapped numerators and denominators, or a zero denominator will produce incorrect or invalid results."
    ],
    disclaimer:
      "This fraction calculator is a general maths helper based on your inputs. Do not use it as the only check for exams, engineering, medical dosing, construction, legal, financial, or other high-stakes calculations."
  },

  "standard-deviation-calculator": {
    slug: "standard-deviation-calculator",
    metaTitle: "Standard Deviation Calculator | Sample or Population",
    metaDescription:
      "Calculate mean, variance, and standard deviation from entered numbers in sample or population mode, with plain-language methodology and limitations.",
    whatItDoes: [
      "Calculates the mean, variance, and standard deviation for the numbers you enter.",
      "Supports both sample standard deviation and population standard deviation; the current default mode is Sample.",
      "Helps with educational and statistical checks, but it is not professional statistical, scientific, medical, financial, or legal advice."
    ],
    howToUse: [
      "Enter numeric values separated by commas or spaces, such as 2, 4, 4, 4, 5, 5, 7, 9.",
      "Choose Sample when your data is a subset used to estimate a larger population, or Population when the list is the entire group you want to describe.",
      "Click Calculate and review the data for entry errors, outliers, and whether standard deviation is appropriate for your context."
    ],
    methodology: [
      "Standard deviation describes typical spread: a smaller value means numbers are closer to the mean, while a larger value means they are more spread out.",
      "Mean = sum of values ÷ number of values.",
      "Population variance = sum of squared deviations from the mean ÷ n; population standard deviation = square root of that variance.",
      "Sample variance = sum of squared deviations from the mean ÷ (n−1); sample standard deviation = square root of that variance. In this implementation, a one-value sample uses a denominator of 1 to avoid division by zero, so the displayed spread is 0.",
      "Displayed mean, variance, and standard deviation are rounded to 6 decimal places."
    ],
    example: {
      scenario: "Numbers: 2, 4, 4, 4, 5, 5, 7, 9 in population mode.",
      steps: [
        "Mean = (2+4+4+4+5+5+7+9) ÷ 8 = 40 ÷ 8 = 5",
        "Squared deviations from 5 are 9, 1, 1, 1, 0, 0, 4, and 16",
        "Sum of squared deviations = 32",
        "Population variance = 32 ÷ 8 = 4",
        "Population standard deviation = sqrt(4) = 2"
      ],
      result: "In population mode, the calculator would show mean 5, variance 4, and standard deviation 2. In sample mode for the same data, variance would be 32 ÷ 7 = 4.571429 and standard deviation about 2.13809."
    },
    faqs: [
      {
        question: "Does this use sample or population standard deviation?",
        answer:
          "It supports both. Select Sample to divide squared deviations by n−1, or Population to divide by n. The default selection is Sample."
      },
      {
        question: "What does standard deviation mean in plain language?",
        answer:
          "It is a measure of how spread out the numbers are around the mean. It does not by itself prove that data is normal, fair, accurate, or meaningful."
      },
      {
        question: "Can outliers or small samples affect the result?",
        answer:
          "Yes. Small datasets, outliers, skewed or non-normal distributions, and data-entry errors can strongly affect standard deviation and how it should be interpreted."
      }
    ],
    mistakesOrLimitations: [
      "The result depends on the numbers entered; invalid non-numeric entries are ignored after splitting by spaces or commas.",
      "Small samples, one-value samples, outliers, skewed data, non-normal distributions, and measurement errors can make interpretation difficult.",
      "Standard deviation is only one summary statistic and may be inappropriate without context, charts, domain knowledge, or formal statistical analysis."
    ],
    disclaimer:
      "This standard deviation calculator is an educational/statistical helper based on your entered numbers. It is not professional statistical, scientific, medical, financial, legal, or research advice."
  },

  "amortization-calculator": {
    slug: "amortization-calculator",
    metaTitle: "Amortization Calculator with Monthly Payment Schedule",
    metaDescription:
      "Estimate a fixed loan payment and view a month-by-month amortization schedule showing interest, principal, and remaining balance.",
    whatItDoes: [
      "Estimates the fixed monthly payment for a fixed-rate amortised loan based on the loan amount, annual interest rate, term, and payment schedule assumptions entered.",
      "Creates a month-by-month schedule showing each payment, the interest portion, the principal portion, and the remaining balance.",
      "Helps explain why early payments usually contain more interest, while later payments reduce the principal faster."
    ],
    howToUse: [
      "Select the currency for the displayed schedule.",
      "Enter the loan amount, which is the starting principal balance you want to repay.",
      "Enter the annual interest rate as a percentage. The calculator converts it to a monthly rate for the schedule.",
      "Enter the loan term in years. The calculator converts it into a monthly payment schedule by multiplying years by 12.",
      "Click Calculate to generate the monthly payment, total interest, total payment, and repayment table."
    ],
    methodology: [
      "Monthly rate r = annual interest rate ÷ 12 ÷ 100. Number of payments n = loan term in years × 12.",
      "For interest-bearing loans, the fixed payment is M = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount.",
      "For a 0% interest loan, the payment is P ÷ n and each scheduled interest amount is 0.",
      "For each month, interest = opening balance × monthly rate, principal repaid = payment − interest, and remaining balance = opening balance − principal repaid.",
      "The final row caps principal repayment at the remaining balance to avoid showing a negative balance. Displayed currency values are rounded to 2 decimal places."
    ],
    example: {
      scenario: "A £18,000 loan at 6% annual interest over 4 years with monthly payments.",
      steps: [
        "Loan amount = £18,000",
        "Monthly rate = 6 ÷ 12 ÷ 100 = 0.005",
        "Number of payments = 4 × 12 = 48",
        "Using the fixed-payment formula, monthly payment ≈ £422.73",
        "First-month interest = £18,000 × 0.005 = £90.00, so first-month principal ≈ £422.73 − £90.00 = £332.73",
        "Total repayment ≈ £422.73 × 48 = £20,291.07, so total interest ≈ £2,291.07"
      ],
      result:
        "The calculator would estimate a £422.73 monthly payment. Month 1 would show about £90.00 interest, £332.73 principal, and a remaining balance of about £17,667.27."
    },
    mistakesOrLimitations: [
      "This is an estimate based on your inputs and is not a lender statement, loan quote, or financial advice.",
      "It assumes a fixed annual rate, regular monthly payments, no missed payments, no extra repayments, no fees, and no variable-rate changes.",
      "It does not model lender fees, insurance, taxes, late charges, early repayment charges, daily interest, payment holidays, overpayments, or product changes unless you manually adjust assumptions outside the calculator.",
      "Rounding displayed row values to 2 decimals can create small differences from lender statements or from unrounded internal calculations.",
      "If your real loan uses daily interest, irregular payment dates, or changing rates, recalculate whenever assumptions change and compare with lender documents."
    ],
    disclaimer:
      "This amortization calculator is for general education and planning. It provides an estimate based on your inputs and is not financial advice, a loan quote, or a substitute for lender statements or professional guidance.",
    faqs: [
      { question: "What is amortization?", answer: "Amortization is the process of gradually repaying a loan through scheduled payments that cover interest and reduce principal." },
      { question: "What do loan amount, interest rate, term, and payment schedule mean?", answer: "Loan amount is the starting principal, interest rate is the annual percentage used to calculate monthly interest, term is how long repayment lasts, and the schedule shows each monthly payment split between interest and principal." },
      { question: "Why is the first payment more interest-heavy?", answer: "Interest is calculated on the outstanding balance. The balance is highest at the start, so early payments generally include more interest." },
      { question: "Can I model overpayments or variable rates?", answer: "Not in this version. The schedule assumes a fixed rate and regular monthly payments with no extra repayments." },
      { question: "When should I use the Mortgage Calculator instead?", answer: "Use the Mortgage Calculator when the loan is tied to a property purchase and you want deposit and optional ownership-cost inputs." }
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
    metaTitle: "Pounds and Kilograms Converter | lb ↔ kg",
    metaDescription:
      "Convert pounds to kilograms or kilograms to pounds using the standard conversion factor for everyday weight estimates.",
    whatItDoes: [
      "Converts pounds (lb) to kilograms (kg) and kilograms to pounds using a standard conversion factor.",
      "Useful for body weight references, luggage, parcels, fitness tracking, product labels, and everyday measurement conversion.",
      "Returns a rounded result based on the value and direction you select."
    ],
    howToUse: [
      "Enter the weight value you want to convert.",
      "Choose Pounds → Kilograms or Kilograms → Pounds.",
      "Click Calculate and allow for small rounding differences when comparing with other sources."
    ],
    methodology: [
      "Conversion factor: 1 pound = 0.45359237 kilograms.",
      "For pounds to kilograms, multiply pounds by 0.45359237.",
      "For kilograms to pounds, divide kilograms by 0.45359237. Results are formatted to 4 decimal places."
    ],
    example: {
      scenario: "Convert 150 lb to kilograms.",
      steps: [
        "Value = 150",
        "Direction = Pounds → Kilograms",
        "150 × 0.45359237 = 68.0388555"
      ],
      result: "The converted value is approximately 68.0389 kg after display rounding."
    },
    faqs: [
      {
        question: "What conversion factor does this use?",
        answer:
          "It uses 1 lb = 0.45359237 kg, then multiplies or divides depending on the selected direction."
      },
      {
        question: "Why does the result have decimals?",
        answer:
          "Pounds and kilograms do not convert as whole numbers in most cases. The displayed result is rounded to 4 decimal places for readability."
      },
      {
        question: "Is this medical, shipping, trade, or legal advice?",
        answer:
          "No. It is an everyday conversion tool. Confirm critical medical, shipping, trade, legal, or regulated measurements with the relevant professional or official standard."
      }
    ],
    mistakesOrLimitations: [
      "Rounding may cause small differences compared with tools that show more decimal places.",
      "The calculator does not apply airline baggage policies, shipping dimensional-weight rules, trade tolerances, medical interpretation, or legal measurement requirements.",
      "Check that you selected the correct direction before using the result."
    ],
    disclaimer:
      "This pounds and kilograms converter provides general measurement conversions based on your inputs. It is not medical, shipping, trade, fitness, or legal advice."
  },

  "miles-kilometers-converter": {
    slug: "miles-kilometers-converter",
    metaTitle: "Miles and Kilometers Converter | mi ↔ km",
    metaDescription:
      "Convert miles to kilometres or kilometres to miles using the standard conversion factor for travel, running, driving, and distance planning.",
    whatItDoes: [
      "Converts miles (mi) to kilometres/kilometers (km) and kilometers to miles using a standard conversion factor.",
      "Useful for travel, running, driving, maps, route notes, and everyday distance planning.",
      "Returns a rounded result based on the value and direction you select."
    ],
    howToUse: [
      "Enter the distance value you want to convert.",
      "Choose Miles → Kilometers or Kilometers → Miles.",
      "Click Calculate and allow for small rounding differences when comparing with maps or other tools."
    ],
    methodology: [
      "Conversion factor: 1 mile = 1.609344 kilometers.",
      "For miles to kilometers, multiply miles by 1.609344.",
      "For kilometers to miles, divide kilometers by 1.609344. Results are formatted to 4 decimal places."
    ],
    example: {
      scenario: "Convert 10 kilometers to miles.",
      steps: [
        "Value = 10",
        "Direction = Kilometers → Miles",
        "10 ÷ 1.609344 = 6.2137119"
      ],
      result: "The converted value is approximately 6.2137 miles after display rounding."
    },
    faqs: [
      {
        question: "Is this the same as nautical miles?",
        answer:
          "No. This converter uses statute miles. Nautical miles use a different conversion factor."
      },
      {
        question: "Why can a map or race app show a slightly different distance?",
        answer:
          "This tool only converts the number you enter. Apps may calculate routes, GPS traces, elevation, map matching, or extra decimals differently."
      },
      {
        question: "Can I use this for official navigation or engineering work?",
        answer:
          "Use caution. It should not replace official navigation, transport, legal, aviation, surveying, or engineering measurements."
      }
    ],
    mistakesOrLimitations: [
      "Rounding may cause small differences compared with tools that show more decimal places.",
      "The calculator does not validate routes, map distances, speed limits, legal distances, aviation distances, or engineering tolerances.",
      "Check that you selected the correct direction before using the result."
    ],
    disclaimer:
      "This miles and kilometers converter provides general distance conversions based on your inputs. It is not official navigation, transport, legal, aviation, surveying, or engineering advice."
  }
};

