// Approved article content, supplied November 2026. Figures await official-source verification.
export type IncomeTaxArticleBlock =
  | { kind: "paragraph" | "heading"; text: string }
  | { kind: "list"; ordered: boolean; items: string[] }
  | { kind: "table"; caption: string; headers: string[]; rows: string[][] };
export const incomeTaxFaqs = [
  {
    "question": "How much can I earn before paying Income Tax in the UK?",
    "answer": "For 2026/27, the standard Personal Allowance is £12,570. Some individuals have a different allowance because of their income or personal circumstances."
  },
  {
    "question": "Is Income Tax higher in Scotland?",
    "answer": "Scotland uses different tax bands and rates for non-savings, non-dividend income. Depending on your income, you may pay more or less Income Tax than someone earning the same amount elsewhere in the UK."
  },
  {
    "question": "Is National Insurance the same as Income Tax?",
    "answer": "No. National Insurance and Income Tax are separate charges with different rules, rates and thresholds."
  },
  {
    "question": "Do I pay Income Tax on all my savings interest?",
    "answer": "Not necessarily. The Personal Savings Allowance, starting rate for savings and tax-exempt savings products may reduce or eliminate the tax payable."
  },
  {
    "question": "Can pension contributions reduce my Income Tax?",
    "answer": "Yes. Qualifying pension contributions may provide Income Tax relief, depending on the pension arrangement and your circumstances."
  },
  {
    "question": "Do I need to submit a Self Assessment tax return?",
    "answer": "Not everyone does. You may need to file a return if you have certain types of income, gains or other tax liabilities that require reporting to HMRC."
  },
  {
    "question": "Does moving into a higher tax band mean all my income is taxed at the higher rate?",
    "answer": "No. UK Income Tax is progressive, so higher rates generally apply only to the portion of income falling within the relevant tax band."
  }
];
export const incomeTaxArticleSections: { id: string; title: string; blocks: IncomeTaxArticleBlock[] }[] = [
  {
    "id": "section-1",
    "title": "1. What Is Taxable Income?",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Taxable income is the portion of your income that is subject to Income Tax after accounting for applicable allowances and reliefs."
      },
      {
        "kind": "paragraph",
        "text": "In the UK, most individuals receive a Personal Allowance, which allows them to earn a certain amount before paying Income Tax."
      },
      {
        "kind": "paragraph",
        "text": "For the 2026/27 tax year, the standard Personal Allowance is £12,570."
      },
      {
        "kind": "paragraph",
        "text": "For example, if you earn £30,000 annually and qualify for the full Personal Allowance, £17,430 of your income will normally be subject to Income Tax before accounting for any additional eligible deductions or reliefs."
      },
      {
        "kind": "paragraph",
        "text": "The Personal Allowance is reduced by £1 for every £2 of adjusted net income above £100,000. It is completely withdrawn when adjusted net income reaches £125,140."
      },
      {
        "kind": "paragraph",
        "text": "Your taxable income may include:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Employment income, including salaries, wages, bonuses and commission.",
          "Self-employment profits.",
          "Taxable pension income.",
          "Rental property profits.",
          "Interest from savings accounts.",
          "Dividend income from shares and investments.",
          "Certain taxable state benefits.",
          "Other income subject to UK Income Tax."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Not every type of income is taxed in the same way. Savings interest, dividends and capital gains may be subject to separate allowances, rates or tax rules."
      }
    ]
  },
  {
    "id": "section-2",
    "title": "2. How UK Income Tax Works",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "The UK uses a progressive Income Tax system. This means different portions of your taxable income are taxed at different rates."
      },
      {
        "kind": "paragraph",
        "text": "Moving into a higher tax band does not mean your entire income is taxed at the higher rate. Only the portion falling within that band is subject to the higher rate."
      },
      {
        "kind": "heading",
        "text": "Income Tax Rates in England, Wales and Northern Ireland – 2026/27"
      },
      {
        "kind": "table",
        "caption": "Income Tax Rates in England, Wales and Northern Ireland – 2026/27",
        "headers": [
          "Annual income",
          "Income Tax rate"
        ],
        "rows": [
          [
            "Up to £12,570",
            "0% (standard Personal Allowance)"
          ],
          [
            "£12,571–£50,270",
            "20% Basic Rate"
          ],
          [
            "£50,271–£125,140",
            "40% Higher Rate"
          ],
          [
            "Over £125,140",
            "45% Additional Rate"
          ]
        ]
      },
      {
        "kind": "paragraph",
        "text": "These thresholds assume the standard Personal Allowance. The withdrawal of the Personal Allowance for higher earners affects the effective tax payable."
      },
      {
        "kind": "heading",
        "text": "Scottish Income Tax Rates – 2026/27"
      },
      {
        "kind": "paragraph",
        "text": "Scotland has different Income Tax bands for non-savings, non-dividend income, including employment income and most self-employment profits."
      },
      {
        "kind": "table",
        "caption": "Scottish Income Tax Rates – 2026/27",
        "headers": [
          "Annual income",
          "Income Tax rate"
        ],
        "rows": [
          [
            "Up to £12,570",
            "0% (standard Personal Allowance)"
          ],
          [
            "£12,571–£16,537",
            "19% Starter Rate"
          ],
          [
            "£16,538–£29,526",
            "20% Basic Rate"
          ],
          [
            "£29,527–£43,662",
            "21% Intermediate Rate"
          ],
          [
            "£43,663–£75,000",
            "42% Higher Rate"
          ],
          [
            "£75,001–£125,140",
            "45% Advanced Rate"
          ],
          [
            "Over £125,140",
            "48% Top Rate"
          ]
        ]
      },
      {
        "kind": "paragraph",
        "text": "These figures assume entitlement to the full standard Personal Allowance. Scottish taxpayers generally pay UK-wide rates on savings interest and dividends rather than Scottish non-savings Income Tax rates."
      }
    ]
  },
  {
    "id": "section-3",
    "title": "3. Other Types of Taxable Income",
    "blocks": [
      {
        "kind": "heading",
        "text": "Savings Interest"
      },
      {
        "kind": "paragraph",
        "text": "Interest earned from bank accounts, building societies and certain other savings products may be taxable."
      },
      {
        "kind": "paragraph",
        "text": "However, the Personal Savings Allowance allows many taxpayers to receive a certain amount of savings interest tax-free."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the Personal Savings Allowance is generally:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Basic-rate taxpayers: £1,000.",
          "Higher-rate taxpayers: £500.",
          "Additional-rate taxpayers: £0."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Some individuals with low non-savings income may also qualify for the starting rate for savings."
      },
      {
        "kind": "paragraph",
        "text": "Interest earned within an eligible Individual Savings Account (ISA) is generally free from UK Income Tax."
      },
      {
        "kind": "heading",
        "text": "Dividend Income"
      },
      {
        "kind": "paragraph",
        "text": "Dividends are payments that companies may distribute to their shareholders."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the Dividend Allowance is £500."
      },
      {
        "kind": "paragraph",
        "text": "Dividend income above the available allowance may be subject to the following rates:"
      },
      {
        "kind": "table",
        "caption": "Dividend Income",
        "headers": [
          "Tax band",
          "Dividend tax rate"
        ],
        "rows": [
          [
            "Basic Rate",
            "10.75%"
          ],
          [
            "Higher Rate",
            "35.75%"
          ],
          [
            "Additional Rate",
            "39.35%"
          ]
        ]
      },
      {
        "kind": "paragraph",
        "text": "The applicable rate depends on your overall taxable income and the tax bands into which your dividends fall."
      },
      {
        "kind": "paragraph",
        "text": "Dividends received within an eligible ISA are generally exempt from UK Income Tax."
      },
      {
        "kind": "heading",
        "text": "Rental Income"
      },
      {
        "kind": "paragraph",
        "text": "If you rent out a property, you may need to pay Income Tax on your taxable rental profits."
      },
      {
        "kind": "paragraph",
        "text": "Rental profits are generally calculated by deducting allowable expenses from rental income."
      },
      {
        "kind": "paragraph",
        "text": "Allowable expenses may include qualifying repairs, insurance, letting agent fees and certain property management costs."
      },
      {
        "kind": "paragraph",
        "text": "For individual residential landlords, relief for mortgage interest and other residential property finance costs is generally restricted to a basic-rate tax reduction rather than a direct deduction from rental profits."
      },
      {
        "kind": "paragraph",
        "text": "The Property Allowance may provide up to £1,000 of tax-free property income annually, subject to eligibility conditions."
      },
      {
        "kind": "heading",
        "text": "Self-Employment Income"
      },
      {
        "kind": "paragraph",
        "text": "Self-employed individuals generally pay Income Tax on their taxable business profits rather than their total turnover."
      },
      {
        "kind": "paragraph",
        "text": "Taxable profits are calculated after deducting allowable business expenses."
      },
      {
        "kind": "paragraph",
        "text": "Eligible expenses may include business-related equipment, office costs, professional services, advertising and travel."
      },
      {
        "kind": "paragraph",
        "text": "The Trading Allowance may provide up to £1,000 of tax-free trading income annually, subject to eligibility conditions."
      },
      {
        "kind": "paragraph",
        "text": "Self-employed individuals may also need to pay National Insurance contributions and submit a Self Assessment tax return."
      }
    ]
  },
  {
    "id": "section-4",
    "title": "4. National Insurance Contributions",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "National Insurance is separate from Income Tax and helps fund certain state benefits and entitlements."
      },
      {
        "kind": "paragraph",
        "text": "The amount you pay depends on your employment status, earnings and National Insurance category."
      },
      {
        "kind": "heading",
        "text": "Employee National Insurance – 2026/27"
      },
      {
        "kind": "paragraph",
        "text": "For most employees paying standard Class 1 National Insurance:"
      },
      {
        "kind": "table",
        "caption": "Employee National Insurance – 2026/27",
        "headers": [
          "Annual earnings band",
          "Rate"
        ],
        "rows": [
          [
            "Up to £12,570",
            "0%"
          ],
          [
            "£12,570–£50,270",
            "8%"
          ],
          [
            "Above £50,270",
            "2%"
          ]
        ]
      },
      {
        "kind": "paragraph",
        "text": "These annual figures are useful for estimates. Actual employee National Insurance is normally calculated using earnings and thresholds for each pay period, which can produce different results."
      },
      {
        "kind": "heading",
        "text": "Self-Employed National Insurance"
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, Class 4 National Insurance is generally charged at:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "6% on taxable profits above £12,570 up to £50,270.",
          "2% on taxable profits above £50,270."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Eligible self-employed individuals with lower profits may receive National Insurance credits or choose to pay voluntary Class 2 contributions."
      },
      {
        "kind": "paragraph",
        "text": "National Insurance rules are different for company directors and certain other categories of workers."
      }
    ]
  },
  {
    "id": "section-5",
    "title": "5. Personal Allowance and Tax Relief",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "The Personal Allowance is the amount of income most individuals can receive before paying Income Tax."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the standard allowance is £12,570."
      },
      {
        "kind": "paragraph",
        "text": "Some taxpayers may qualify for additional allowances or reliefs depending on their circumstances."
      },
      {
        "kind": "heading",
        "text": "Marriage Allowance"
      },
      {
        "kind": "paragraph",
        "text": "Marriage Allowance allows an eligible spouse or civil partner to transfer part of their unused Personal Allowance to their partner."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the transferable amount is £1,260, potentially reducing the receiving partner's Income Tax bill by up to £252."
      },
      {
        "kind": "paragraph",
        "text": "Eligibility conditions apply, including restrictions relating to the receiving partner's tax band."
      },
      {
        "kind": "heading",
        "text": "Blind Person's Allowance"
      },
      {
        "kind": "paragraph",
        "text": "Eligible individuals who are blind or severely sight-impaired may claim an additional tax-free allowance."
      },
      {
        "kind": "paragraph",
        "text": "The amount is determined by HMRC for each tax year, and eligibility rules differ depending on the UK nation."
      },
      {
        "kind": "heading",
        "text": "Pension Contributions"
      },
      {
        "kind": "paragraph",
        "text": "Contributions to qualifying pension schemes may receive Income Tax relief."
      },
      {
        "kind": "paragraph",
        "text": "Tax relief can be provided through different arrangements, including:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Net pay pension arrangements.",
          "Relief at source.",
          "Salary sacrifice arrangements."
        ]
      },
      {
        "kind": "paragraph",
        "text": "The method used affects how contributions appear on your payslip and how tax relief is calculated."
      },
      {
        "kind": "paragraph",
        "text": "Tax relief is subject to eligibility requirements and applicable pension allowance limits."
      }
    ]
  },
  {
    "id": "section-6",
    "title": "6. Tax Deductions and Allowable Expenses",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Unlike the United States, the UK does not operate a general system in which individual taxpayers choose between a standard deduction and itemised deductions."
      },
      {
        "kind": "paragraph",
        "text": "Instead, UK taxpayers may qualify for specific tax allowances, deductible expenses and reliefs."
      },
      {
        "kind": "heading",
        "text": "Employment Expenses"
      },
      {
        "kind": "paragraph",
        "text": "Employees may be able to claim tax relief on certain expenses they must pay to perform their jobs."
      },
      {
        "kind": "paragraph",
        "text": "Examples include:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Qualifying professional subscriptions.",
          "Required uniforms and specialist work clothing.",
          "Certain work-related travel expenses.",
          "Eligible tools and equipment.",
          "Qualifying working-from-home expenses."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Ordinary commuting between home and a permanent workplace is generally not eligible for tax relief."
      },
      {
        "kind": "paragraph",
        "text": "Expenses must meet HMRC's eligibility conditions."
      },
      {
        "kind": "heading",
        "text": "Self-Employed Business Expenses"
      },
      {
        "kind": "paragraph",
        "text": "Self-employed individuals can generally deduct allowable business expenses when calculating taxable profits."
      },
      {
        "kind": "paragraph",
        "text": "Examples include:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Office and business premises costs.",
          "Advertising and marketing.",
          "Business insurance.",
          "Professional accountancy fees.",
          "Eligible vehicle and travel expenses.",
          "Business software and subscriptions.",
          "Qualifying equipment and supplies."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Expenses must normally be incurred wholly and exclusively for business purposes. Different rules may apply to capital expenditure and mixed personal and business use."
      }
    ]
  },
  {
    "id": "section-7",
    "title": "7. Tax Relief on Charitable Donations",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Donations to eligible charities may qualify for tax relief through Gift Aid or other approved arrangements."
      },
      {
        "kind": "paragraph",
        "text": "Under Gift Aid, eligible charities can generally reclaim 25p for every £1 donated by a qualifying UK taxpayer."
      },
      {
        "kind": "paragraph",
        "text": "Higher-rate and additional-rate taxpayers may be able to claim additional Income Tax relief on qualifying Gift Aid donations."
      },
      {
        "kind": "paragraph",
        "text": "Scottish taxpayers may also be entitled to additional relief depending on their applicable Income Tax rate."
      },
      {
        "kind": "paragraph",
        "text": "To use Gift Aid, donors must have paid sufficient qualifying UK Income Tax or Capital Gains Tax to cover the amount reclaimed by charities."
      }
    ]
  },
  {
    "id": "section-8",
    "title": "8. Tax-Free Savings and Investments",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Certain UK savings and investment products offer tax advantages."
      },
      {
        "kind": "heading",
        "text": "Individual Savings Accounts (ISAs)"
      },
      {
        "kind": "paragraph",
        "text": "ISAs allow eligible individuals to save or invest without paying UK Income Tax on interest or dividends generated within the account."
      },
      {
        "kind": "paragraph",
        "text": "Capital gains realised within an ISA are also generally exempt from Capital Gains Tax."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the overall annual ISA subscription allowance is £20,000, subject to the rules for each ISA type."
      },
      {
        "kind": "heading",
        "text": "Premium Bonds"
      },
      {
        "kind": "paragraph",
        "text": "Eligible prizes from National Savings and Investments (NS&I) Premium Bonds are generally free from UK Income Tax and Capital Gains Tax."
      },
      {
        "kind": "heading",
        "text": "Pension Savings"
      },
      {
        "kind": "paragraph",
        "text": "Qualifying pension contributions may receive tax relief, and investments within registered pension schemes generally benefit from tax advantages."
      },
      {
        "kind": "paragraph",
        "text": "Withdrawals from pension savings may be taxable, although certain tax-free lump sums may be available subject to the applicable rules and limits."
      }
    ]
  },
  {
    "id": "section-9",
    "title": "9. Capital Gains Tax",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Capital Gains Tax (CGT) is a separate tax that may apply when you sell, transfer or otherwise dispose of certain assets for a gain."
      },
      {
        "kind": "paragraph",
        "text": "Examples include:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Second homes and investment properties.",
          "Shares held outside tax-exempt accounts.",
          "Certain business assets.",
          "Valuable personal possessions, subject to exemptions."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Capital Gains Tax is generally based on the taxable gain rather than the total selling price."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the standard annual exempt amount for individuals is £3,000."
      },
      {
        "kind": "paragraph",
        "text": "Most taxable gains are generally subject to rates of 18% or 24%, depending on the individual's taxable income and the applicable rules. Special rates or reliefs may apply to particular disposals."
      },
      {
        "kind": "paragraph",
        "text": "Your main residence may qualify for Private Residence Relief, potentially reducing or eliminating Capital Gains Tax."
      },
      {
        "kind": "paragraph",
        "text": "Capital Gains Tax should not be confused with ordinary Income Tax."
      }
    ]
  },
  {
    "id": "section-10",
    "title": "10. Tax Credits and Financial Support",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "The UK does not have the same tax-credit system as the United States."
      },
      {
        "kind": "paragraph",
        "text": "Financial support for eligible individuals and families may be available through benefits, tax credits and other government schemes."
      },
      {
        "kind": "heading",
        "text": "Universal Credit"
      },
      {
        "kind": "paragraph",
        "text": "Universal Credit provides financial support to eligible people on low incomes or who are out of work."
      },
      {
        "kind": "paragraph",
        "text": "Entitlement depends on household circumstances, earnings, savings and other eligibility conditions."
      },
      {
        "kind": "paragraph",
        "text": "Universal Credit is a means-tested benefit, not a deduction from Income Tax."
      },
      {
        "kind": "heading",
        "text": "Child Benefit"
      },
      {
        "kind": "paragraph",
        "text": "Child Benefit provides financial support to eligible individuals responsible for children."
      },
      {
        "kind": "paragraph",
        "text": "Higher-income households may be affected by the High Income Child Benefit Charge."
      },
      {
        "kind": "paragraph",
        "text": "For 2026/27, the charge generally begins when an individual's adjusted net income exceeds £60,000 and can recover the full Child Benefit amount when it reaches £80,000."
      },
      {
        "kind": "heading",
        "text": "Tax-Free Childcare"
      },
      {
        "kind": "paragraph",
        "text": "Eligible working parents may receive government support towards approved childcare costs."
      },
      {
        "kind": "paragraph",
        "text": "Under Tax-Free Childcare, the government generally contributes £2 for every £8 paid into an eligible childcare account, up to the applicable limits."
      },
      {
        "kind": "paragraph",
        "text": "Tax-Free Childcare is separate from Income Tax relief and is subject to eligibility requirements."
      }
    ]
  },
  {
    "id": "section-11",
    "title": "11. PAYE and Self Assessment",
    "blocks": [
      {
        "kind": "heading",
        "text": "Pay As You Earn (PAYE)"
      },
      {
        "kind": "paragraph",
        "text": "Most employees pay Income Tax and National Insurance through PAYE."
      },
      {
        "kind": "paragraph",
        "text": "Employers deduct the relevant amounts from wages or salaries and report them to HMRC."
      },
      {
        "kind": "paragraph",
        "text": "Your tax code helps your employer determine how much Income Tax to deduct."
      },
      {
        "kind": "paragraph",
        "text": "For example, 1257L is a common tax code for someone entitled to the standard Personal Allowance, although individual tax codes may differ."
      },
      {
        "kind": "paragraph",
        "text": "Scottish taxpayers normally have an 'S' prefix, while Welsh taxpayers generally have a 'C' prefix."
      },
      {
        "kind": "heading",
        "text": "Self Assessment"
      },
      {
        "kind": "paragraph",
        "text": "Self Assessment is HMRC's system for reporting income and calculating tax liabilities that are not fully dealt with through PAYE."
      },
      {
        "kind": "paragraph",
        "text": "You may need to submit a Self Assessment tax return if you:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Have taxable self-employment income.",
          "Receive rental income requiring declaration.",
          "Have certain untaxed savings or dividend income.",
          "Need to report taxable capital gains.",
          "Are subject to the High Income Child Benefit Charge.",
          "Have other circumstances requiring a tax return."
        ]
      },
      {
        "kind": "paragraph",
        "text": "Not everyone with additional income needs to submit a return. HMRC may collect certain liabilities through PAYE or another process."
      },
      {
        "kind": "paragraph",
        "text": "For online Self Assessment returns, the normal filing deadline is 31 January following the end of the relevant tax year (31 January 2028 for 2026/27)."
      }
    ]
  },
  {
    "id": "section-12",
    "title": "12. Understanding Your Take-Home Pay",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "Your take-home pay is the amount you receive after applicable deductions have been made from your gross salary."
      },
      {
        "kind": "paragraph",
        "text": "Common deductions include:"
      },
      {
        "kind": "list",
        "ordered": false,
        "items": [
          "Income Tax.",
          "Employee National Insurance.",
          "Workplace pension contributions.",
          "Student loan repayments, where applicable.",
          "Other authorised payroll deductions."
        ]
      },
      {
        "kind": "paragraph",
        "text": "For example, an employee earning £35,000 annually will not necessarily receive the same net pay as another employee with an identical salary."
      },
      {
        "kind": "paragraph",
        "text": "Differences may arise from tax residency, pension contributions, student loan arrangements, tax codes and other deductions."
      },
      {
        "kind": "paragraph",
        "text": "This calculator estimates Income Tax and employee National Insurance only. Pension contributions, student loans, tax-code adjustments and other deductions are not included."
      },
      { "kind": "heading", "text": "Worked example: £60,000 employment income" },
      { "kind": "paragraph", "text": "For England, Wales or Northern Ireland in 2026/27, assuming the standard Personal Allowance and no other deductions or reliefs: taxable income is £47,430. Income Tax is £37,700 × 20% + £9,730 × 40% = £11,432. Annualised employee NI is £37,700 × 8% + £9,730 × 2% = £3,210.60. Estimated take-home pay is £45,357.40 annually, or £3,779.78 per month on average. Scottish Income Tax differs." }
    ]
  },
  {
    "id": "section-13",
    "title": "13. How to Use Our UK Income Tax Calculator",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "This calculator estimates employment Income Tax, annualised category A employee National Insurance and take-home pay for 2026/27."
      },
      {
        "kind": "list",
        "ordered": true,
        "items": [
          "Check the tax year: 2026/27 (6 April 2026 to 5 April 2027).",
          "Choose England, Wales, Scotland or Northern Ireland based on your tax residence.",
          "Choose annual, monthly or weekly income, then enter your gross employment income in pounds.",
          "Select Calculate to view your estimate. After changing inputs, select Calculate again.",
          "Compare the annual, monthly and weekly results, and expand Income Tax by band for more detail. Use Reset to restore the defaults and clear results."
        ]
      },
      {
        "kind": "paragraph",
        "text": "The calculator uses the applicable employment tax rates and thresholds. Monthly and weekly outputs are annual averages. Actual deductions may differ because of tax codes, payroll calculations, additional income, reliefs or individual circumstances. The savings, dividends, pensions, self-employment and other topics in this guide are educational information, not additional calculator features."
      }
    ]
  },
  {
    "id": "section-14",
    "title": "14. Frequently Asked Questions",
    "blocks": []
  },
  {
    "id": "section-15",
    "title": "15. Important Disclaimer",
    "blocks": [
      {
        "kind": "paragraph",
        "text": "The information provided on this page is for general educational and informational purposes only and does not constitute professional tax, legal or financial advice."
      },
      {
        "kind": "paragraph",
        "text": "Our UK Income Tax Calculator provides estimates based on the selected tax year, applicable tax rates and the information entered by users. It may not account for every individual circumstance, allowance, relief, benefit, adjustment or tax liability."
      },
      {
        "kind": "paragraph",
        "text": "Tax legislation, allowances and thresholds may change. Users should verify important information with HM Revenue and Customs (HMRC) or consult a qualified tax professional before making financial decisions."
      },
      {
        "kind": "paragraph",
        "text": "NexoraCalculator is an independent calculation and information website and is not affiliated with HMRC or the UK Government."
      },
      {
        "kind": "paragraph",
        "text": "Supplied article: November 2026. Tax year: 2026/27. Official-source verification is pending; see the verification note above."
      }
    ]
  }
];
