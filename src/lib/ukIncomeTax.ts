/**
 * Pure progressive-income-tax arithmetic. This module deliberately contains no
 * unverified HMRC thresholds. A verified tax-year configuration and allowance
 * calculation must be supplied before integration with the UK calculator page.
 */
export type IncomeTaxBand = {
  label: string;
  /** Upper bound of taxable income, after the personal allowance; null is open-ended. */
  upperLimit: number | null;
  rate: number;
};
export type IncomeTaxEstimateInput = {
  annualIncome: number;
  /** The applicable allowance after any verified taper/eligibility rules. */
  personalAllowance: number;
  bands: readonly IncomeTaxBand[];
};
const validMoney = (amount: number) => Number.isFinite(amount) && amount >= 0 && amount <= 1e9 && amount === Math.round(amount * 100) / 100;

export function calculateIncomeTaxEstimate(input: IncomeTaxEstimateInput) {
  if (!validMoney(input.annualIncome) || !validMoney(input.personalAllowance)) {
    throw new Error("Income and allowance must be non-negative amounts of up to 1 billion with at most two decimal places.");
  }
  if (!input.bands.length || input.bands[input.bands.length - 1].upperLimit !== null) {
    throw new Error("A progressive tax configuration must end with an open-ended band.");
  }
  let previousLimit = 0;
  input.bands.forEach((band, index) => {
    if (!band.label.trim() || !Number.isFinite(band.rate) || band.rate < 0 || band.rate > 1 ||
      (band.upperLimit === null && index !== input.bands.length - 1) ||
      (band.upperLimit !== null && (!validMoney(band.upperLimit) || band.upperLimit <= previousLimit))) {
      throw new Error("Tax bands must have increasing limits, labels and rates between zero and one.");
    }
    if (band.upperLimit !== null) previousLimit = band.upperLimit;
  });
  const grossCents = Math.round(input.annualIncome * 100);
  const allowanceCents = Math.min(grossCents, Math.round(input.personalAllowance * 100));
  const taxableCents = grossCents - allowanceCents;
  let lowerCents = 0;
  let cumulativeTax = 0;
  let previousTaxCents = 0;
  const breakdown = input.bands.map(band => {
    const upperCents = band.upperLimit === null ? Infinity : Math.round(band.upperLimit * 100);
    const amountCents = Math.max(0, Math.min(taxableCents, upperCents) - lowerCents);
    cumulativeTax += amountCents * band.rate;
    const cumulativeTaxCents = Math.round(cumulativeTax);
    const taxCents = cumulativeTaxCents - previousTaxCents;
    previousTaxCents = cumulativeTaxCents;
    const row = { label: band.label, rate: band.rate, lowerCents, upperCents: band.upperLimit === null ? null : upperCents, amountCents, taxCents };
    lowerCents = upperCents;
    return row;
  });
  return { grossCents, allowanceCents, taxableCents, taxCents: previousTaxCents,
    afterIncomeTaxCents: grossCents - previousTaxCents, breakdown,
    effectiveRate: grossCents ? previousTaxCents / grossCents * 100 : 0 };
}
