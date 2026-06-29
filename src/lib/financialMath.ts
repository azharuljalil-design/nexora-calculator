export const FINANCIAL_INPUT_TOO_LARGE_MESSAGE =
  "The values entered are too large to calculate reliably. Please reduce the rate, term, contribution, or compounding frequency and try again.";

export type CompoundInterestSummary = {
  finalBalance: number;
  totalContributions: number;
  totalInterestEarned: number;
};

export function calculateMonthlyPayment(args: {
  principal: number;
  annualInterestRate: number;
  years: number;
}): number {
  const { principal, annualInterestRate, years } = args;
  const months = years * 12;
  if (!Number.isFinite(principal) || !Number.isFinite(annualInterestRate) || !Number.isFinite(years) || principal <= 0 || months <= 0) {
    return 0;
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  if (monthlyRate <= 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  if (factor === 1) {
    return principal / months;
  }
  if (!Number.isFinite(factor)) {
    return 0;
  }

  const payment = (principal * monthlyRate * factor) / (factor - 1);
  return Number.isFinite(payment) ? payment : 0;
}

export function calculateCompoundGrowth(args: {
  principal: number;
  annualInterestRate: number;
  years: number;
  compoundsPerYear: number;
}): number | null {
  const { principal, annualInterestRate, years, compoundsPerYear } = args;
  if (!Number.isFinite(principal) || !Number.isFinite(annualInterestRate) || !Number.isFinite(years) || !Number.isFinite(compoundsPerYear)) {
    return null;
  }

  if (principal < 0 || years < 0 || compoundsPerYear < 0) {
    return null;
  }

  if (principal === 0 || years === 0) {
    return principal;
  }

  if (annualInterestRate <= 0 || compoundsPerYear === 0) {
    return principal;
  }

  const growth = principal * Math.pow(1 + annualInterestRate / 100 / compoundsPerYear, compoundsPerYear * years);
  return Number.isFinite(growth) ? growth : null;
}

export function calculateCompoundInterestSummary(args: {
  initialInvestment: number;
  monthlyContribution: number;
  annualInterestRate: number;
  years: number;
  compoundsPerYear: number;
}): CompoundInterestSummary | null {
  const {
    initialInvestment,
    monthlyContribution,
    annualInterestRate,
    years,
    compoundsPerYear
  } = args;

  if (
    !Number.isFinite(initialInvestment) ||
    !Number.isFinite(monthlyContribution) ||
    !Number.isFinite(annualInterestRate) ||
    !Number.isFinite(years) ||
    !Number.isFinite(compoundsPerYear) ||
    initialInvestment < 0 ||
    monthlyContribution < 0 ||
    years < 0 ||
    compoundsPerYear < 0
  ) {
    return null;
  }

  const base = calculateCompoundGrowth({
    principal: initialInvestment,
    annualInterestRate,
    years,
    compoundsPerYear
  });

  if (base === null) return null;

  const totalMonths = years * 12;
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalContributions = initialInvestment + monthlyContribution * totalMonths;

  let contributionsFutureValue = 0;
  if (monthlyContribution > 0) {
    if (monthlyRate === 0) {
      contributionsFutureValue = monthlyContribution * totalMonths;
    } else {
      const factor = Math.pow(1 + monthlyRate, totalMonths);
      contributionsFutureValue =
        Number.isFinite(factor) && Number.isFinite(monthlyRate)
          ? monthlyContribution * ((factor - 1) / monthlyRate)
          : Number.POSITIVE_INFINITY;
    }
  }

  const finalBalance = base + contributionsFutureValue;
  const totalInterestEarned = finalBalance - totalContributions;

  if (
    !Number.isFinite(finalBalance) ||
    !Number.isFinite(totalContributions) ||
    !Number.isFinite(totalInterestEarned)
  ) {
    return null;
  }

  return { finalBalance, totalContributions, totalInterestEarned };
}
