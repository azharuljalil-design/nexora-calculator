// Adapted from the user-approved UK Compound Interest article; no tax figures added.
export type CompoundArticleBlock =
  | { kind: "paragraph" | "heading"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; caption: string; headers: string[]; rows: string[][] };
export const compoundInterestFaqs = [
  {
    "question": "Is compound interest better than simple interest?",
    "answer": "For a saver earning the same positive nominal rate over the same period, with interest retained, compound interest generally produces a higher balance than simple interest after more than one compounding period. For borrowers, compounding may increase the cost of debt."
  },
  {
    "question": "Is compound interest calculated daily or monthly in the UK?",
    "answer": "It depends on the product. Some UK accounts calculate interest daily but pay it monthly or annually. Read the provider's terms and compare the advertised AER."
  },
  {
    "question": "What is the difference between AER and a nominal interest rate?",
    "answer": "AER reflects the effect of compounding over a year and helps compare savings accounts. A nominal annual rate may need to be converted using the compounding schedule before comparing effective annual returns."
  },
  {
    "question": "Can I calculate compound interest with monthly deposits?",
    "answer": "Yes. Enter a fixed Monthly contribution, or enter 0 for none. Contributions are treated as end-of-month deposits and use the nominal annual rate divided by 12, independently of the compounding frequency chosen for the initial deposit. Start-of-month, weekly and annual contribution schedules are not supported."
  },
  {
    "question": "Does compound interest apply to ISAs?",
    "answer": "Yes. Eligible savings in a Cash ISA can earn interest on previously credited interest when that interest remains in the account. ISA tax treatment and contribution rules are separate from the mathematics of compounding."
  },
  {
    "question": "Can compound interest make me lose money?",
    "answer": "Compounding itself is a calculation method. Savings may earn positive interest, while investments can fall in value. Debt can also grow when unpaid interest is added to the balance."
  },
  {
    "question": "Is the Rule of 72 accurate?",
    "answer": "It is a convenient approximation for estimating doubling time at a steady annual growth rate. Use a compound interest calculation for a more precise result."
  },
  {
    "question": "Does this calculator account for inflation and tax?",
    "answer": "No. Results are nominal projections before inflation, tax and charges. The calculator does not assess savings-tax liability, ISA eligibility or account-specific rules."
  }
];
export const compoundInterestSections: { id: string; title: string; blocks: CompoundArticleBlock[] }[] = [
  {
    "id": "compound-section-1",
    "title": "What is compound interest?",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Compound interest means calculating interest on a balance that includes previously credited interest. This is sometimes described as **earning interest on interest**. It can help savings grow faster than simple interest when the rate is positive and interest is retained in the account."
      },
      {
        "kind": "paragraph",
        "text": "Interest is also a cost of borrowing. In that context, compounding can increase the amount owed if interest is added to an outstanding debt. Whether compounding helps or harms you depends on whether you are saving, investing or borrowing."
      }
    ]
  },
  {
    "id": "compound-section-2",
    "title": "Simple interest vs compound interest",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "**Simple interest** is calculated only on the original principal. **Compound interest** is calculated on the principal plus interest that has already accumulated."
      },
      {
        "kind": "paragraph",
        "text": "Suppose you start with **£1,000** at a fixed **5% annual rate** for **three years**, with no withdrawals, contributions, fees or tax."
      },
      {
        "kind": "table",
        "caption": "Simple and compound interest: £1,000 at 5% over three years",
        "headers": [
          "Year",
          "Simple-interest balance",
          "Compound-interest balance (annual compounding)"
        ],
        "rows": [
          [
            "Start",
            "£1,000.00",
            "£1,000.00"
          ],
          [
            "1",
            "£1,050.00",
            "£1,050.00"
          ],
          [
            "2",
            "£1,100.00",
            "£1,102.50"
          ],
          [
            "3",
            "£1,150.00",
            "£1,157.63"
          ]
        ]
      },
      {
        "kind": "paragraph",
        "text": "Simple interest produces **£150** in total interest. Annual compounding produces approximately **£157.63**, an additional **£7.63**. The difference becomes more pronounced over longer periods, assuming the rate remains unchanged."
      }
    ]
  },
  {
    "id": "compound-section-3",
    "title": "How does compound interest work?",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Three factors are especially important: the starting balance, the interest rate and the length of time money remains invested or saved. Compounding frequency also matters when comparing the same **nominal annual interest rate**."
      },
      {
        "kind": "paragraph",
        "text": "For example, £1,000 earning 5% compounded annually becomes £1,050 after one year. If the interest stays in the account, the second year's 5% is applied to £1,050, producing £52.50 rather than £50. The new balance is £1,102.50."
      },
      {
        "kind": "paragraph",
        "text": "The process repeats while interest continues to be credited and retained. Actual savings rates may change, while investment returns can be negative as well as positive."
      }
    ]
  },
  {
    "id": "compound-section-4",
    "title": "Compound interest formula",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "For a single deposit with no additional contributions, a standard compound interest formula is:"
      },
      {
        "kind": "paragraph",
        "text": "**A = P × (1 + r/n)^(n × t)**"
      },
      {
        "kind": "paragraph",
        "text": "Where:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "**A** = projected final balance",
          "**P** = starting principal",
          "**r** = nominal annual interest rate as a decimal (for example, 0.05 for 5%)",
          "**n** = number of compounding periods per year",
          "**t** = number of years"
        ]
      },
      {
        "kind": "paragraph",
        "text": "The estimated compound interest earned is **A − P**."
      },
      {
        "kind": "paragraph",
        "text": "For annual compounding, `n = 1`, giving **A = P × (1 + r)^t**."
      },
      {
        "kind": "heading",
        "text": "Worked UK example: £5,000 at 4% for five years"
      },
      {
        "kind": "paragraph",
        "text": "Assume £5,000 earns a fixed nominal rate of 4% per year, compounded annually, with no deposits, withdrawals, tax or charges."
      },
      {
        "kind": "paragraph",
        "text": "**A = £5,000 × (1.04)^5 = £6,083.26**"
      },
      {
        "kind": "paragraph",
        "text": "The projected interest is **£1,083.26**. This is a mathematical illustration, not a prediction of the rate a UK bank will offer for five years."
      }
    ]
  },
  {
    "id": "compound-section-5",
    "title": "How often is interest compounded?",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Compounding frequency describes how often interest is added to the balance. Common mathematical schedules include annual, half-yearly, quarterly, monthly and daily compounding. This calculator offers annual, quarterly, monthly and daily compounding for the initial deposit; half-yearly compounding is included below only as an educational comparison. Some products calculate interest daily but pay it monthly or annually; the calculation and crediting rules are not necessarily the same."
      },
      {
        "kind": "paragraph",
        "text": "For a **£1,000** deposit at a **6% nominal annual rate** over one year, with no fees or tax:"
      },
      {
        "kind": "table",
        "caption": "£1,000 at a 6% nominal annual rate for one year",
        "headers": [
          "Compounding frequency",
          "Approximate final balance"
        ],
        "rows": [
          [
            "Annually",
            "£1,060.00"
          ],
          [
            "Half-yearly",
            "£1,060.90"
          ],
          [
            "Quarterly",
            "£1,061.36"
          ],
          [
            "Monthly",
            "£1,061.68"
          ],
          [
            "Daily (365 periods)",
            "£1,061.83"
          ]
        ]
      },
      {
        "kind": "paragraph",
        "text": "More frequent compounding increases the final amount in this comparison because the **nominal rate is held constant**. It does **not** mean a savings account advertising monthly interest necessarily pays more than one advertising annual interest."
      },
      {
        "kind": "heading",
        "text": "What is AER in the UK?"
      },
      {
        "kind": "paragraph",
        "text": "**AER (Annual Equivalent Rate)** expresses the annual return on a savings account in a standardised way, taking compounding into account. It is designed to help compare savings accounts that pay interest at different intervals. When comparing UK savings products, look at the **AER**, account restrictions and whether the rate is fixed or variable, rather than comparing payment frequency alone."
      },
      {
        "kind": "paragraph",
        "text": "The calculator accepts a nominal annual rate, not an AER input, and does not convert AER automatically. For example, a nominal 6% rate compounded monthly corresponds to an effective annual rate of approximately **6.17%**. If two accounts both advertise 6% AER and the same rate applies for the year, the timing of interest payments alone does not make one a higher-return account."
      }
    ]
  },
  {
    "id": "compound-section-6",
    "title": "Daily compound interest calculation",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "With daily compounding and a 365-day mathematical year, the standard formula becomes:"
      },
      {
        "kind": "paragraph",
        "text": "**A = P × (1 + r/365)^(365 × t)**"
      },
      {
        "kind": "paragraph",
        "text": "For **£1,000** at a fixed **6% nominal annual rate** over **two years**:"
      },
      {
        "kind": "paragraph",
        "text": "**A = £1,000 × (1 + 0.06/365)^730 ≈ £1,127.49**"
      },
      {
        "kind": "paragraph",
        "text": "That is approximately **£127.49** of interest before tax and charges. Real accounts may use different day-count, rounding, crediting or rate-change rules, so their actual balances can differ."
      }
    ]
  },
  {
    "id": "compound-section-7",
    "title": "Continuous compound interest",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Continuous compounding is a mathematical model in which interest compounds at an infinitely increasing frequency. Its formula is:"
      },
      {
        "kind": "paragraph",
        "text": "**A = P × e^(r × t)**"
      },
      {
        "kind": "paragraph",
        "text": "Here, **e** is a mathematical constant of approximately 2.71828. For £1,000 at a 6% nominal annual rate over two years:"
      },
      {
        "kind": "paragraph",
        "text": "**A = £1,000 × e^(0.06 × 2) ≈ £1,127.50**"
      },
      {
        "kind": "paragraph",
        "text": "Continuous compounding is useful for understanding the mathematical limit of compound growth, but it is not a standard feature of everyday UK savings accounts. Continuous compounding is explained here for education only; this calculator does not offer it."
      }
    ]
  },
  {
    "id": "compound-section-8",
    "title": "How regular contributions affect compound growth",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Adding money consistently can increase the eventual balance because you are contributing more principal and, where interest is earned, those deposits may also earn returns."
      },
      {
        "kind": "paragraph",
        "text": "For illustration, suppose you start with **£2,000**, add **£100 at the end of every month**, and earn an assumed **4% nominal annual rate compounded monthly** for **10 years**. Under those assumptions, the projected balance is **£17,706.65**, comprising **£14,000 in total contributions** and **£3,706.65 in growth**."
      },
      {
        "kind": "paragraph",
        "text": "The result changes if deposits are made at the start rather than the end of each month, if rates vary, or if fees or tax apply. This calculator supports fixed monthly contributions at month-end. The selected compounding frequency applies only to the initial deposit; contributions always use a monthly rate equal to the nominal annual rate divided by 12. Select Monthly to reproduce this example."
      }
    ]
  },
  {
    "id": "compound-section-9",
    "title": "How long does it take money to double? The Rule of 72",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "The **Rule of 72** provides a quick estimate of the time required to double money at a steady annual compound growth rate:"
      },
      {
        "kind": "paragraph",
        "text": "**Approximate doubling time in years = 72 ÷ annual percentage rate**"
      },
      {
        "kind": "paragraph",
        "text": "At an assumed **8%** annual return, the estimate is **72 ÷ 8 = 9 years**. At **6%**, it is approximately **12 years**."
      },
      {
        "kind": "paragraph",
        "text": "Use the rate as a percentage number (8, not 0.08). This is a rule of thumb, not an exact calculation, and it assumes a stable positive rate without withdrawals, fees or tax."
      }
    ]
  },
  {
    "id": "compound-section-10",
    "title": "Compound interest on UK savings accounts",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "UK savings accounts may quote a fixed or variable AER. The interest you receive can depend on the account's terms, minimum balance, withdrawal conditions and whether interest remains in the account. A regular saver, easy-access account and fixed-term account can have very different rules even when their headline rates look similar."
      },
      {
        "kind": "paragraph",
        "text": "Interest on savings outside tax-advantaged accounts may be taxable depending on your circumstances and applicable allowances. **Cash ISAs** generally shelter eligible interest from UK Income Tax, subject to ISA rules. This calculator does not determine your individual tax liability or ISA eligibility."
      }
    ]
  },
  {
    "id": "compound-section-11",
    "title": "Compound growth and investments",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Investment returns are not the same as guaranteed savings interest. Reinvested dividends and gains can contribute to compound growth, but market values fluctuate and losses are possible. Charges, inflation, taxes and the timing of contributions can materially affect the amount you ultimately receive."
      },
      {
        "kind": "paragraph",
        "text": "This calculator accepts non-negative rate assumptions only; it cannot simulate investment losses. An assumed annual return is useful for scenario planning, not a promise. Compare conservative, moderate and optimistic assumptions rather than relying on a single high rate."
      }
    ]
  },
  {
    "id": "compound-section-12",
    "title": "Inflation and the real value of your savings",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "A growing account balance does not necessarily mean your purchasing power is growing at the same pace. If savings earn 4% in a year while prices rise by 3%, the approximate increase in purchasing power is only around 1%. The exact real return is **(1.04 / 1.03) − 1 ≈ 0.97%** before tax or charges."
      },
      {
        "kind": "paragraph",
        "text": "This calculator displays nominal balances: treat them as future pounds rather than inflation-adjusted spending power. It does not offer an inflation adjustment."
      }
    ]
  },
  {
    "id": "compound-section-13",
    "title": "How to use the NexoraCalculator compound interest calculator",
    "blocks": [
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Select **GBP (£)** for examples in pounds. Currency changes the display; it does not convert the amounts.",
          "Enter your **Initial investment** and fixed **Monthly contribution**. Enter 0 for either amount if appropriate.",
          "Enter a **nominal annual interest/return rate (%)** of zero or more and a **Time period (years)** of at least one year.",
          "Select **Annually, Quarterly, Monthly or Daily** for the initial deposit. Monthly contributions always use the annual rate divided by 12.",
          "Select **Calculate** to see the final balance, total contributions and estimated interest/growth. Change assumptions and calculate again to compare scenarios. Use **Reset** to clear the inputs and results."
        ]
      },
      {
        "kind": "paragraph",
        "text": "No start-of-month deposits, withdrawals, negative returns, tax or inflation adjustments are modelled. Annual and daily compounding choices do not change the monthly contribution calculation."
      }
    ]
  },
  {
    "id": "compound-section-14",
    "title": "Factors that can change your results",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Your actual outcome may differ from a projection because of changing rates, market movements, contribution timing, fees, tax, inflation, withdrawals and account-specific interest rules. The calculator is an educational planning tool and should not be treated as a quote from a bank, an investment forecast or personal financial advice."
      }
    ]
  },
  {
    "id": "compound-section-15",
    "title": "A brief history of compound interest",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "The idea of charging interest on accumulated balances has a long history. Compound-interest problems also contributed to the development of mathematical ideas about exponential growth. In the late seventeenth century, Jacob Bernoulli studied limits associated with increasingly frequent compounding; the constant now written as **e** became central to exponential mathematics. Today, compound-growth calculations are used in savings, borrowing, pensions and investment modelling."
      }
    ]
  },
  {
    "id": "compound-section-16",
    "title": "Frequently asked questions about compound interest",
    "blocks": []
  },
  {
    "id": "compound-section-17",
    "title": "Explore related financial calculators",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Compare scenarios using NexoraCalculator's **Investment Calculator**, **Savings or Retirement Calculator** where available, **Loan Calculator** and **UK Mortgage Calculator**. Use internal links only for calculators that are live on the website."
      }
    ]
  }
];
