/** Employment income only. Sources reviewed 2026-11-02:
 * https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
 * https://www.gov.uk/income-tax-rates
 * https://www.gov.scot/publications/scottish-income-tax-rates-and-bands/pages/2026-to-2027/
 * Band ceilings below apply to income AFTER the tapered Personal Allowance.
 */
export const TAX_YEAR = "2026/27";
export const REGIONS = ["England", "Wales", "Scotland", "Northern Ireland"] as const;
export type TaxRegion = typeof REGIONS[number];
export type IncomePeriod = "annual" | "monthly" | "weekly";
export type TaxBand = { name: string; ceiling: number; rate: number };
const restUK: TaxBand[] = [
  { name: "Basic", ceiling: 37700, rate: .2 },
  { name: "Higher", ceiling: 125140, rate: .4 },
  { name: "Additional", ceiling: Infinity, rate: .45 }
];
const scotland: TaxBand[] = [
  { name: "Starter", ceiling: 3967, rate: .19 },
  { name: "Basic", ceiling: 16956, rate: .2 },
  { name: "Intermediate", ceiling: 31092, rate: .21 },
  { name: "Higher", ceiling: 62430, rate: .42 },
  { name: "Advanced", ceiling: 125140, rate: .45 },
  { name: "Top", ceiling: Infinity, rate: .48 }
];
const round = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
export function calculateIncomeTax(input: { income: number; period: IncomePeriod; region: TaxRegion; taxYear: string }) {
  if (input.taxYear !== TAX_YEAR) throw new Error("Choose a supported tax year.");
  if (!REGIONS.includes(input.region)) throw new Error("Choose a UK tax region.");
  if (!["annual", "monthly", "weekly"].includes(input.period)) throw new Error("Choose an income period.");
  const multiplier = input.period === "monthly" ? 12 : input.period === "weekly" ? 52 : 1;
  if (!Number.isFinite(input.income) || input.income < 0 || input.income * multiplier > 100000000) throw new Error("Enter income between £0 and £100 million annually.");
  const gross = round(input.income * multiplier);
  const allowance = Math.max(0, 12570 - Math.max(0, gross - 100000) / 2);
  const taxable = Math.max(0, gross - allowance);
  let lower = 0;
  const bands = (input.region === "Scotland" ? scotland : restUK).map(band => {
    const amount = Math.max(0, Math.min(taxable, band.ceiling) - lower);
    lower = band.ceiling;
    return { name: band.name, rate: band.rate, amount, tax: amount * band.rate };
  });
  const incomeTax = round(bands.reduce((sum, band) => sum + band.tax, 0));
  // Annualised category A estimate; real payroll NI is calculated per pay period.
  const nationalInsurance = round(Math.max(0, Math.min(gross, 50270) - 12570) * .08 + Math.max(0, gross - 50270) * .02);
  const net = round(gross - incomeTax - nationalInsurance);
  return { gross, allowance, taxable, incomeTax, nationalInsurance, net, bands,
    effectiveTaxRate: gross ? incomeTax / gross * 100 : 0,
    deductionRate: gross ? (incomeTax + nationalInsurance) / gross * 100 : 0,
    region: input.region, taxYear: input.taxYear };
}
