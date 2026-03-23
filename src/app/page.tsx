import type { Metadata } from "next";
import Link from "next/link";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";
import { HomeCategoryColumns } from "@/components/home/HomeCategoryColumns";
import { HomepageScientificCalculator } from "@/components/home/HomepageScientificCalculator";

export const metadata: Metadata = createPageMetadata({
  title: "Free Online Calculators",
  path: "/",
  description:
    "Free online calculators for finance, health, math, tax, and everyday planning. Built for UK, Europe, and USA users with GBP/EUR/USD and metric/imperial support."
});

export default function HomePage() {
  return (
    <div className="space-y-10">
      {/* Top utility layout: headline (left) + search (right), then scientific calculator */}
      <section className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
          {/* LEFT TOP: headline + supporting text */}
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10">
                Free Online Calculators
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Free Online Calculators for{" "}
                <span className="text-primary">
                  Finance, Health, Math, Tax, and Everyday Planning
                </span>
              </h1>
              <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                Quick, browser-based calculations with GBP, EUR, and USD
                support, plus metric and imperial workflows—built for UK,
                Europe, and USA users.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={routes.calculators}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
              >
                Browse all calculators
              </Link>
              <Link
                href={routes.search}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-text transition hover:border-secondary hover:text-secondary"
              >
                Search page
              </Link>
            </div>
          </div>

          {/* RIGHT TOP: search area */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-medium text-slate-700">
              Search calculators
            </h2>
            <SearchInput placeholder="Search mortgage, BMI, VAT, salary..." />
            <p className="mt-3 text-xs text-slate-500">
              Type a name or topic to jump directly to the calculator you
              need.
            </p>
          </div>
        </div>

        {/* BELOW BOTH: full-width scientific calculator */}
        <HomepageScientificCalculator />
      </section>

      {/* Subtle monetization placeholder (reserved) */}
      <AdPlaceholder variant="homepage" />

      {/* Category directory columns (side-by-side on desktop) */}
      <HomeCategoryColumns />

      {/* Popular calculators text links */}
      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-text">
              Popular Calculators
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Direct links to common tools.
            </p>
          </div>
          <Link
            href={routes.calculators}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Mortgage Calculator", slug: "mortgage-calculator" },
            { label: "Loan Calculator", slug: "loan-calculator" },
            { label: "VAT Calculator", slug: "vat-calculator" },
            { label: "Sales Tax Calculator", slug: "sales-tax-calculator" },
            { label: "Salary Calculator", slug: "salary-calculator" },
            { label: "Currency Converter", slug: "currency-converter" },
            { label: "Unit Converter", slug: "unit-converter" },
            { label: "BMI Calculator", slug: "bmi-calculator" },
            { label: "Age Calculator", slug: "age-calculator" },
            {
              label: "Compound Interest Calculator",
              slug: "compound-interest-calculator"
            },
            { label: "Tip Calculator", slug: "tip-calculator" },
            { label: "Percentage Calculator", slug: "percentage-calculator" }
          ].map((item) => (
            <Link
              key={item.slug}
              href={routes.calculator(item.slug)}
              className="text-sm text-slate-700 hover:text-primary hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* SEO content */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          title="Free online calculators for UK, Europe, and USA users"
          subtitle="GBP, EUR, USD with metric/imperial support."
        />
        <p className="mt-4 max-w-3xl text-sm text-slate-600 sm:text-base">
          NexoraCalculator provides finance, tax, health, and math calculators
          designed for everyday clarity. Select the currency you need (GBP,
          EUR, or USD) and use the unit system that fits your situation for
          faster, more accurate calculations.
        </p>
      </section>

      {/* Homepage FAQ */}
      <section className="space-y-4">
        <SectionHeading
          title="Frequently asked questions"
          subtitle="Quick answers about NexoraCalculator."
        />

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              q: "What calculators are available on NexoraCalculator?",
              a: "You’ll find finance, health, math, tax, date and time, conversions, and daily-life tools. Use the homepage lists or the search box to jump directly."
            },
            {
              q: "Are the calculators free to use?",
              a: "Yes. NexoraCalculator calculators are free and run instantly in your browser—no downloads required."
            },
            {
              q: "Does NexoraCalculator support UK, Europe, and USA users?",
              a: "Yes. Many calculators support GBP/EUR/USD and region-specific planning workflows."
            },
            {
              q: "Do calculators support GBP, EUR, and USD?",
              a: "Where currency is relevant, you can select GBP, EUR, or USD in the calculator inputs."
            },
            {
              q: "Are metric and imperial units supported?",
              a: "Yes. Unit-focused calculators provide metric/imperial options, and health tools follow the unit system you choose."
            }
          ].map((item) => (
            <details
              key={item.q}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <summary className="cursor-pointer text-sm font-semibold text-text">
                {item.q}
              </summary>
              <p className="mt-2 text-sm text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* All calculators CTA */}
      <section className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">
              Explore the full NexoraCalculator library
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Compare categories, discover niche tools, and jump directly to
              the calculator you need.
            </p>
          </div>
          <Link
            href={routes.calculators}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90"
          >
            Open all calculators
          </Link>
        </div>
      </section>
    </div>
  );
}

