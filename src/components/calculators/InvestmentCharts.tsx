import type { InvestmentResult } from "@/lib/investment";
import type { CurrencyCode } from "@/lib/conversions";
import { formatCurrency } from "@/lib/format";

export function InvestmentBreakdown({
  result,
  currency,
}: {
  result: InvestmentResult;
  currency: CurrencyCode;
}) {
  const money = (cents: number) => formatCurrency(cents / 100, currency);
  const loss = result.growthCents < 0;
  const segments = loss
    ? [
        {
          label: "Ending balance",
          value: result.endingCents,
          color: "#2563eb",
        },
        {
          label: "Investment loss",
          value: -result.growthCents,
          color: "#be123c",
        },
      ]
    : [
        {
          label: "Starting investment",
          value: result.initialCents,
          color: "#2563eb",
        },
        {
          label: "Additional contributions",
          value: result.contributionCents,
          color: "#0d9488",
        },
        {
          label: "Investment growth",
          value: result.growthCents,
          color: "#b45309",
        },
      ];
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  let position = 0;
  const stops = segments
    .map((segment) => {
      const start = position;
      position += total ? (segment.value / total) * 100 : 0;
      return `${segment.color} ${start}% ${position}%`;
    })
    .join(", ");
  return (
    <figure className="mt-5 rounded-xl border border-slate-100 p-4">
      <figcaption className="text-sm font-semibold text-slate-900">
        {loss
          ? "Capital retained and investment loss"
          : "Investment balance breakdown"}
      </figcaption>
      <div
        aria-hidden="true"
        className="relative mx-auto my-4 h-36 w-36 rounded-full"
        style={{ background: total ? `conic-gradient(${stops})` : "#e2e8f0" }}
      >
        <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-600">
          {loss ? "Capital" : "Balance"}
        </div>
      </div>
      <ul className="space-y-2 text-xs text-slate-700">
        {segments.map((segment) => (
          <li
            key={segment.label}
            className="flex flex-wrap justify-between gap-2"
          >
            <span>
              <span aria-hidden="true" style={{ color: segment.color }}>
                ●
              </span>{" "}
              {segment.label}
            </span>
            <span>
              {money(segment.value)} (
              {total ? ((segment.value / total) * 100).toFixed(1) : "0.0"}%)
            </span>
          </li>
        ))}
      </ul>
      {loss && (
        <p className="mt-3 text-xs text-slate-600">
          The ring divides total invested capital into the amount remaining and
          the amount lost. Loss is not counted as part of the ending balance.
        </p>
      )}
    </figure>
  );
}

export function InvestmentGrowthChart({
  result,
  currency,
}: {
  result: InvestmentResult;
  currency: CurrencyCode;
}) {
  const years = result.annual;
  const values = years.map((row) => ({
    ...row,
    growth:
      row.balanceCents - result.initialCents - row.cumulativeContributionCents,
  }));
  const maximum = Math.max(
    1,
    ...values.map(
      (row) =>
        result.initialCents +
        row.cumulativeContributionCents +
        Math.max(0, row.growth),
    ),
  );
  const loss = Math.max(0, ...values.map((row) => -row.growth));
  const scale = 190 / (maximum + loss);
  const baseline = 25 + maximum * scale;
  const width = 510 / Math.max(1, values.length);
  const compact = (cents: number) =>
    new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(cents / 100);
  return (
    <figure className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <figcaption className="text-lg font-semibold text-slate-900">
        Investment growth over time
      </figcaption>
      {years.length ? (
        <>
          <svg
            className="mt-4 max-h-80 w-full"
            viewBox="0 0 600 260"
            role="img"
            aria-label={`Annual investment projection in ${currency}. Ending balance ${formatCurrency(result.endingCents / 100, currency)}; ${result.growthCents < 0 ? "loss" : "growth"} ${formatCurrency(Math.abs(result.growthCents) / 100, currency)}. Full values are in the accumulation tables.`}
          >
            <text x="65" y="14" fontSize="10">
              Amount ({currency})
            </text>
            <line
              x1="65"
              y1={baseline}
              x2="575"
              y2={baseline}
              stroke="#94a3b8"
            />
            <text x="60" y="29" textAnchor="end" fontSize="10">
              {compact(maximum)}
            </text>
            <text x="60" y={baseline + 4} textAnchor="end" fontSize="10">
              0
            </text>
            {loss > 0 && (
              <text x="60" y="219" textAnchor="end" fontSize="10">
                −{compact(loss)}
              </text>
            )}
            {values.map((row, index) => {
              const x = 65 + index * width + width * 0.12;
              const w = width * 0.76;
              const initialHeight = result.initialCents * scale;
              const contributionHeight =
                row.cumulativeContributionCents * scale;
              const growthHeight = Math.abs(row.growth) * scale;
              return (
                <g key={row.period}>
                  <title>{`Year ${row.period}: contributions ${formatCurrency(row.cumulativeContributionCents / 100, currency)}, cumulative growth/loss ${formatCurrency(row.growth / 100, currency)}, ending balance ${formatCurrency(row.balanceCents / 100, currency)}`}</title>
                  <rect
                    x={x}
                    y={baseline - initialHeight}
                    width={w}
                    height={initialHeight}
                    fill="#2563eb"
                  />
                  <rect
                    x={x}
                    y={baseline - initialHeight - contributionHeight}
                    width={w}
                    height={contributionHeight}
                    fill="#0d9488"
                  />
                  <rect
                    x={x}
                    y={
                      row.growth >= 0
                        ? baseline -
                          initialHeight -
                          contributionHeight -
                          growthHeight
                        : baseline
                    }
                    width={w}
                    height={growthHeight}
                    fill={row.growth >= 0 ? "#b45309" : "#be123c"}
                  />
                  <circle
                    cx={x + w / 2}
                    cy={baseline - row.balanceCents * scale}
                    r="2"
                    fill="#0f172a"
                  />
                </g>
              );
            })}
            <text x="65" y="238" fontSize="11">
              1
            </text>
            <text x="575" y="238" textAnchor="end" fontSize="11">
              {years.length}
            </text>
            <text x="315" y="256" textAnchor="middle" fontSize="11">
              Investment year (final year may be partial)
            </text>
          </svg>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-700">
            <li>
              <span className="text-blue-600" aria-hidden="true">
                ■
              </span>{" "}
              Starting investment
            </li>
            <li>
              <span className="text-teal-700" aria-hidden="true">
                ■
              </span>{" "}
              Contributions to date
            </li>
            <li>
              <span className="text-amber-700" aria-hidden="true">
                ■
              </span>{" "}
              Growth
            </li>
            <li>
              <span className="text-rose-700" aria-hidden="true">
                ■
              </span>{" "}
              Loss (below zero)
            </li>
            <li>● Ending balance</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500">
            Capital stacks above zero; losses extend below zero. The black
            marker shows the resulting balance. Read exact values in the
            schedule.
          </p>
        </>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          No growth periods at a zero-month duration. The ending balance equals
          the starting investment.
        </p>
      )}
    </figure>
  );
}
