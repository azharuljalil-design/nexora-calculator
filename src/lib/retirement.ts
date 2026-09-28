export type RetirementProjection = {
  months: number;
  projectedSavings: number;
  totalContributions: number;
  totalGrowth: number;
  yearlyPoints: Array<{ month: number; balance: number; contributions: number }>;
};

/** Monthly compounding with each contribution made at the end of the month. */
export function calculateRetirementProjection({
  currentAge,
  retirementAge,
  currentSavings,
  monthlyContribution,
  annualReturn
}: {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  annualReturn: number;
}): RetirementProjection {
  const months = Math.round((retirementAge - currentAge) * 12);
  const monthlyReturn = annualReturn / 100 / 12;
  let balance = currentSavings;
  const yearlyPoints = [{ month: 0, balance, contributions: currentSavings }];

  for (let month = 1; month <= months; month += 1) {
    balance = balance * (1 + monthlyReturn) + monthlyContribution;
    if (month % 12 === 0 || month === months) {
      yearlyPoints.push({
        month,
        balance,
        contributions: currentSavings + monthlyContribution * month
      });
    }
  }

  const totalContributions = currentSavings + monthlyContribution * months;
  return {
    months,
    projectedSavings: balance,
    totalContributions,
    totalGrowth: balance - totalContributions,
    yearlyPoints
  };
}
