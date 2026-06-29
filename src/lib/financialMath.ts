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
  if (!Number.isFinite(factor) || factor === 1) {
    return 0;
  }

  return (principal * monthlyRate * factor) / (factor - 1);
}

export function calculateCompoundGrowth(args: {
  principal: number;
  annualInterestRate: number;
  years: number;
  compoundsPerYear: number;
}): number {
  const { principal, annualInterestRate, years, compoundsPerYear } = args;
  if (!Number.isFinite(principal) || !Number.isFinite(annualInterestRate) || !Number.isFinite(years) || !Number.isFinite(compoundsPerYear) || principal <= 0 || years <= 0) {
    return Math.max(Number.isFinite(principal) ? principal : 0, 0);
  }

  if (annualInterestRate <= 0 || compoundsPerYear <= 0) {
    return principal;
  }

  return principal * Math.pow(1 + annualInterestRate / 100 / compoundsPerYear, compoundsPerYear * years);
}
