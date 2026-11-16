# UK Income Tax content update: publication review

Source: user-approved `Pasted text(6).txt`, supplied November 2026.
All 15 numbered sections and seven FAQ questions/answers are retained. No externally copied prose was used.

## Publication blocker: official verification

On 16 November 2026, requests to HMRC/GOV.UK and the Scottish Government were denied by the environment proxy: `Tunnel connection failed: 403 Forbidden` (curl: `CONNECT tunnel failed, response 403`). A second request using elevated network execution was also denied. Consequently, this update does **not** claim independent verification of the supplied figures. Keep the PR in draft and do not merge or publish until this review is complete. The page explicitly flags the pending verification.

Review these figures against current official guidance; record the source and date, and raise any discrepancy with the user rather than silently changing approved figures or the engine:

| Topic | Supplied figures requiring verification | Official source |
| --- | --- | --- |
| Personal Allowance | £12,570; £1 reduction per £2 above £100,000; zero at £125,140 | https://www.gov.uk/income-tax-rates |
| England, Wales, Northern Ireland | 20% / 40% / 45%; gross boundaries £50,270 and £125,140, subject to allowance taper | https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 |
| Scotland | 19% / 20% / 21% / 42% / 45% / 48%; gross boundaries £16,537 / £29,526 / £43,662 / £75,000 / £125,140 | https://www.gov.scot/publications/scottish-income-tax-rates-and-bands/pages/2026-to-2027/ |
| Savings and dividends | Savings allowances £1,000 / £500 / £0; dividend allowance £500 and rates 10.75% / 35.75% / 39.35% | https://www.gov.uk/apply-tax-free-interest-on-savings and https://www.gov.uk/tax-on-dividends |
| Employee NI | Category A: 8% between £12,570 and £50,270; 2% above | https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027 |
| Self-employed NI | Class 4: 6% / 2% at £12,570 / £50,270; Class 2 eligibility wording | https://www.gov.uk/self-employed-national-insurance-rates |
| Other allowances | Marriage Allowance £1,260 transfer / £252 saving; trading and property allowances £1,000 each | https://www.gov.uk/marriage-allowance and https://www.gov.uk/guidance/tax-free-allowances-on-property-and-trading-income |
| Gift Aid | 25p reclaimed per £1 donation, subject to sufficient tax paid | https://www.gov.uk/donating-to-charity/gift-aid |
| ISA | £20,000 annual allowance | https://www.gov.uk/individual-savings-accounts |
| CGT | £3,000 individual exemption; general rates 18% / 24% | https://www.gov.uk/capital-gains-tax/allowances and https://www.gov.uk/capital-gains-tax/rates |
| Family support | Child Benefit charge £60,000–£80,000 adjusted net income; childcare £2 government contribution per £8 | https://www.gov.uk/child-benefit-tax-charge and https://www.gov.uk/tax-free-childcare |

Also verify 2026/27 eligibility wording for employee working-from-home relief, legacy tax credits, pension relief and self-employed NI credits. These descriptions are retained from the approved article and remain unverified. The NI table uses annual estimates: its supplied £12,570 boundary wording is not a pay-period payroll calculation. No figure was silently corrected.

## Editorial adjustments

- Added the requested H1 and an employment-income introduction; preserved all main article topics.
- Section 12 explicitly distinguishes actual payslip deductions from this calculator's Income Tax and employee NI estimate. Retained the existing £60,000 worked example.
- Section 13 now describes the actual annual/monthly/weekly controls, Calculate, recalculation and Reset; no unsupported controls were added.
- Clarified the normal online Self Assessment deadline for 2026/27 as 31 January 2028. This is an editorial date clarification, not a verified official-source claim.
- Replaced the supplied “Last reviewed” claim with the supplied-content date and a pending-verification statement to avoid implying an official-source review occurred.
- Official references are retained for checking; shared generic article sections are replaced only for this calculator to avoid duplicate FAQs, article text and schema.

## Preserved behaviour

The tax engine, registry input configuration, shared calculation hook, input controls, calculation tests, canonical URL and legacy redirect are unchanged. All tax figures and results in the engine remain as before. Savings, dividends, pensions, tax reliefs, benefits, CGT and self-employment are educational topics only.
