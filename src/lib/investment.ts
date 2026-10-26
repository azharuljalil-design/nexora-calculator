export const investmentModes = [
  "end",
  "contribution",
  "rate",
  "starting",
  "length",
] as const;
export type InvestmentMode = (typeof investmentModes)[number];
export type InvestmentInput = {
  mode: InvestmentMode;
  startingAmount: number;
  contribution: number;
  targetAmount: number;
  months: number;
  annualRate: number;
  compoundsPerYear: number;
  contributionFrequency: "monthly" | "annual";
  timing: "beginning" | "end";
};
export type InvestmentPeriod = {
  period: number;
  contributionCents: number;
  growthCents: number;
  balanceCents: number;
  cumulativeContributionCents: number;
};
const MAX_MONEY = 1e12;
const MAX_MONTHS = 1200;
const MAX_PROJECTION = 1e13;
const MIN_RATE = -99.99;
const MAX_RATE = 1000;
const moneyValid = (value: number) =>
  Number.isFinite(value) && value >= 0 && value <= MAX_MONEY;

function validate(input: InvestmentInput) {
  if (
    !investmentModes.includes(input.mode) ||
    ![1, 2, 4, 12, 365].includes(input.compoundsPerYear) ||
    !["monthly", "annual"].includes(input.contributionFrequency) ||
    !["beginning", "end"].includes(input.timing)
  ) {
    throw new Error(
      "Choose a supported calculation mode, compounding frequency and contribution timing.",
    );
  }
  if (input.mode !== "starting" && !moneyValid(input.startingAmount))
    throw new Error("Starting amount must be between 0 and 1 trillion.");
  if (input.mode !== "contribution" && !moneyValid(input.contribution))
    throw new Error("Contribution must be between 0 and 1 trillion.");
  if (input.mode !== "end" && !moneyValid(input.targetAmount))
    throw new Error("Target balance must be between 0 and 1 trillion.");
  if (
    input.mode !== "length" &&
    (!Number.isInteger(input.months) ||
      input.months < 0 ||
      input.months > MAX_MONTHS)
  )
    throw new Error(
      "Duration must be a whole number of months between 0 and 1,200 (100 years).",
    );
  if (
    input.mode !== "rate" &&
    (!Number.isFinite(input.annualRate) ||
      input.annualRate < MIN_RATE ||
      input.annualRate > MAX_RATE)
  )
    throw new Error(
      "Annual nominal return must be between −99.99% and 1,000%.",
    );
}

function monthlyFactor(input: InvestmentInput): number {
  return Math.exp(
    (Math.log1p(input.annualRate / 100 / input.compoundsPerYear) *
      input.compoundsPerYear) /
      12,
  );
}
function contributionDue(input: InvestmentInput, month: number): boolean {
  return (
    input.contributionFrequency === "monthly" ||
    (input.timing === "beginning" ? month % 12 === 0 : (month + 1) % 12 === 0)
  );
}
/** Fractional compounding periods use an equivalent constant monthly growth factor. */
function coefficients(input: InvestmentInput) {
  const factor = monthlyFactor(input);
  let starting = 1;
  let contribution = 0;
  for (let month = 0; month < input.months; month++) {
    const deposit = contributionDue(input, month) ? 1 : 0;
    starting *= factor;
    contribution =
      input.timing === "beginning"
        ? (contribution + deposit) * factor
        : contribution * factor + deposit;
  }
  return { starting, contribution };
}
function futureValue(input: InvestmentInput): number {
  const factors = coefficients(input);
  return (
    (input.startingAmount === 0 ? 0 : input.startingAmount * factors.starting) +
    (input.contribution === 0 ? 0 : input.contribution * factors.contribution)
  );
}

export function calculateInvestment(raw: InvestmentInput) {
  validate(raw);
  const input = { ...raw };
  if (input.mode === "starting" || input.mode === "contribution") {
    const factors = coefficients(input);
    const divisor =
      input.mode === "starting" ? factors.starting : factors.contribution;
    const fixed =
      input.mode === "starting"
        ? input.contribution * factors.contribution
        : input.startingAmount * factors.starting;
    if (!Number.isFinite(divisor) || divisor <= 0)
      throw new Error(
        "There is no unique solution with this duration and contribution schedule.",
      );
    const value = (input.targetAmount - fixed) / divisor;
    if (!moneyValid(value))
      throw new Error(
        "This target would require a negative or unsupported starting amount or contribution. Adjust the target or assumptions.",
      );
    if (input.mode === "starting") input.startingAmount = value;
    else input.contribution = value;
  } else if (input.mode === "rate") {
    if (input.targetAmount === 0)
      throw new Error(
        "A zero target does not identify a valid unique return rate under this model.",
      );
    let lower = MIN_RATE;
    let upper = MAX_RATE;
    const lowValue = futureValue({ ...input, annualRate: lower });
    const highValue = futureValue({ ...input, annualRate: upper });
    if (highValue === lowValue)
      throw new Error(
        "The return rate has no unique solution: these inputs produce no rate-sensitive growth.",
      );
    if (input.targetAmount < lowValue || input.targetAmount > highValue)
      throw new Error(
        "The target cannot be reached within the supported annual return range (−99.99% to 1,000%).",
      );
    // The value is monotone in the rate for non-negative capital and contributions.
    for (let iteration = 0; iteration < 100; iteration++) {
      const middle = (lower + upper) / 2;
      if (futureValue({ ...input, annualRate: middle }) < input.targetAmount)
        lower = middle;
      else upper = middle;
    }
    input.annualRate = (lower + upper) / 2;
  } else if (input.mode === "length") {
    // Annual contributions can cause discontinuities, so inspect each monthly boundary.
    // This finds the first crossing even with negative returns and annual deposits.
    let balance = input.startingAmount;
    const factor = monthlyFactor(input);
    input.months = 0;
    const targetCents = Math.round(input.targetAmount * 100);
    while (
      Math.round(balance * 100) < targetCents &&
      input.months < MAX_MONTHS
    ) {
      const deposit = contributionDue(input, input.months)
        ? input.contribution
        : 0;
      balance =
        input.timing === "beginning"
          ? (balance + deposit) * factor
          : balance * factor + deposit;
      input.months++;
    }
    if (!Number.isFinite(balance) || Math.round(balance * 100) < targetCents)
      throw new Error(
        "The target is unreachable within 100 years under these assumptions.",
      );
  }
  const preciseEnd = futureValue(input);
  if (!Number.isFinite(preciseEnd) || preciseEnd > MAX_PROJECTION)
    throw new Error(
      "The projected balance is too large to display reliably. Reduce the amount, return or duration.",
    );
  if (
    ["starting", "contribution", "rate"].includes(input.mode) &&
    Math.abs(preciseEnd - input.targetAmount) >
      Math.max(0.005, input.targetAmount * 1e-10)
  ) {
    throw new Error(
      "The solver could not converge reliably to this target. Adjust the assumptions.",
    );
  }
  const initialCents = Math.round(input.startingAmount * 100);
  const factor = monthlyFactor(input);
  let balance = input.startingAmount;
  let deposits = 0;
  let previousBalance = initialCents;
  let previousDeposits = 0;
  const monthly: InvestmentPeriod[] = [];
  for (let month = 0; month < input.months; month++) {
    const deposit = contributionDue(input, month) ? input.contribution : 0;
    deposits += deposit;
    balance =
      input.timing === "beginning"
        ? (balance + deposit) * factor
        : balance * factor + deposit;
    if (
      !Number.isFinite(balance) ||
      balance > MAX_PROJECTION ||
      deposits > MAX_PROJECTION
    )
      throw new Error(
        "The projection exceeds reliable display limits. Reduce the amount, return or duration.",
      );
    const reverseFinal =
      ["starting", "contribution", "rate"].includes(input.mode) &&
      month === input.months - 1;
    if (reverseFinal && Math.abs(balance - input.targetAmount) > 0.005)
      throw new Error(
        "The reverse projection cannot reproduce this target to the nearest cent. Adjust the assumptions.",
      );
    const balanceCents = reverseFinal
      ? Math.round(input.targetAmount * 100)
      : Math.round(balance * 100);
    const depositCents = Math.round(deposits * 100);
    const contributionCents = depositCents - previousDeposits;
    monthly.push({
      period: month + 1,
      contributionCents,
      growthCents: balanceCents - previousBalance - contributionCents,
      balanceCents,
      cumulativeContributionCents: depositCents,
    });
    previousBalance = balanceCents;
    previousDeposits = depositCents;
  }
  const annual: InvestmentPeriod[] = [];
  monthly.forEach((row, index) => {
    const year = Math.floor(index / 12);
    if (!annual[year])
      annual[year] = {
        period: year + 1,
        contributionCents: 0,
        growthCents: 0,
        balanceCents: 0,
        cumulativeContributionCents: 0,
      };
    annual[year].contributionCents += row.contributionCents;
    annual[year].growthCents += row.growthCents;
    annual[year].balanceCents = row.balanceCents;
    annual[year].cumulativeContributionCents = row.cumulativeContributionCents;
  });
  const endingCents = monthly.length
    ? monthly[monthly.length - 1].balanceCents
    : initialCents;
  return {
    input,
    initialCents,
    endingCents,
    contributionCents: previousDeposits,
    growthCents: endingCents - initialCents - previousDeposits,
    monthly,
    annual,
    effectiveAnnualRate:
      Math.expm1(
        Math.log1p(input.annualRate / 100 / input.compoundsPerYear) *
          input.compoundsPerYear,
      ) * 100,
  };
}
export type InvestmentResult = ReturnType<typeof calculateInvestment>;
