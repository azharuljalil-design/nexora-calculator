import type { Metadata } from "next";
import Link from "next/link";
import { SearchInput } from "@/components/ui/SearchInput";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createPageMetadata } from "@/lib/seo";
import { routes } from "@/lib/routes";
import { HomeCategoryColumns } from "@/components/home/HomeCategoryColumns";
import { HomepageScientificCalculator } from "@/components/home/HomepageScientificCalculator";
import { ClientWidgetErrorBoundary } from "@/components/ui/ClientWidgetErrorBoundary";

export const metadata: Metadata = createPageMetadata({
  title: "Free Online Calculators",
  path: "/",
  description:
    "Free online calculators for finance, tax, health, math, conversions, date and time, and everyday planning. Results are estimates based on your inputs.",
});

const popularCalculators = [
  { label: "Mortgage Calculator", slug: "mortgage-calculator" },
  { label: "Loan Calculator", slug: "loan-calculator" },
  { label: "VAT Calculator", slug: "vat-calculator" },
  { label: "Sales Tax Calculator", slug: "sales-tax-calculator" },
  { label: "Salary Calculator", slug: "salary-calculator" },
  { label: "Unit Converter", slug: "unit-converter" },
  { label: "BMI Calculator", slug: "bmi-calculator" },
  { label: "Age Calculator", slug: "age-calculator" },
  {
    label: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
  },
  { label: "Tip Calculator", slug: "tip-calculator" },
  { label: "Percentage Calculator", slug: "percentage-calculator" },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
          <div className="space-y-4">
            <div className="space-y-3">
              <p className="inline-flex items-center rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/10">
                Free calculator website
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                Free Online Calculators for{" "}
                <span className="text-primary">
                  Finance, Tax, Health, Math, Conversions, Dates, and Everyday
                  Planning
                </span>
              </h1>
              <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
                NexoraCalculator is a free calculator website with fast,
                browser-based tools for common planning questions. Choose a
                category, enter your details, and use the result as a practical
                estimate based on the information you provide.
              </p>
              <p className="max-w-2xl text-sm text-slate-600">
                For financial, tax, medical, legal, payroll, academic, or
                official-rule decisions, verify important results with a
                qualified professional or the relevant official source.
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
                Search calculators
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-medium text-slate-700">
              Search public calculators
            </h2>
            <ClientWidgetErrorBoundary
              fallback={
                <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Search is temporarily unavailable. Use the calculator links below.
                </p>
              }
            >
              <SearchInput placeholder="Search mortgage, BMI, VAT, salary..." />
            </ClientWidgetErrorBoundary>
            <p className="mt-3 text-xs text-slate-500">
              Type a name, category, or topic to find public calculators and
              open the matching /calculators page.
            </p>
          </div>
        </div>

        <ClientWidgetErrorBoundary
          fallback={
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
              Quick calculator is temporarily unavailable. Browse calculators below.
            </div>
          }
        >
          <HomepageScientificCalculator />
        </ClientWidgetErrorBoundary>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "1. Pick a calculator",
            text: "Browse by category or search for a specific task such as mortgage payments, BMI, VAT, percentages, dates, or unit conversions.",
          },
          {
            title: "2. Enter your inputs",
            text: "Use values that match your situation, including currency, units, dates, rates, and assumptions where the calculator asks for them.",
          },
          {
            title: "3. Review the estimate",
            text: "Read the result alongside any notes on the calculator page, then verify high-impact decisions with professional or official guidance.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-text">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{item.text}</p>
          </div>
        ))}
      </section>

      <HomeCategoryColumns />

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-text">
              Popular calculators
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Start with frequently used public tools across finance, tax,
              health, math, conversion, date/time, and daily-life categories.
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
          {popularCalculators.map((item) => (
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          title="Why calculator results are estimates"
          subtitle="Helpful numbers depend on accurate inputs and real-world rules."
        />
        <div className="mt-4 grid gap-4 text-sm text-slate-600 md:grid-cols-2">
          <p>
            NexoraCalculator tools calculate from the numbers, dates, units, and
            assumptions you enter. Small input changes, rounding, local rules,
            provider policies, and rate changes can affect the final answer.
          </p>
          <p>
            Use our calculators for general information and planning. Do not
            rely only on calculator output for medical, tax, financial, legal,
            payroll, immigration, academic, or official deadline decisions.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          title="Helpful site links and support"
          subtitle="Learn more about NexoraCalculator and how the site handles information."
        />
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {[
            ["About", routes.about],
            ["Contact", "/contact"],
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
            ["Cookies", "/cookies"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-700 hover:border-primary hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <SectionHeading
          title="Frequently asked questions"
          subtitle="Quick answers about NexoraCalculator."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              q: "What calculators are available?",
              a: "You can access finance, tax, health, math, conversion, date/time, and everyday calculators from the homepage, category pages, all-calculators page, or search.",
            },
            {
              q: "Are the calculators free to use?",
              a: "Yes. NexoraCalculator calculators are free and run instantly in your browser with no downloads required.",
            },
            {
              q: "Can I rely on the results?",
              a: "Results are estimates based on your inputs. They are useful for planning, but important decisions should be checked with professionals or official sources.",
            },
            {
              q: "Do calculators support different currencies and units?",
              a: "Where relevant, calculators support GBP, EUR, USD, metric units, and imperial units.",
            },
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

      <section className="rounded-3xl border border-primary/20 bg-primary/5 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">
              Explore the full NexoraCalculator library
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Compare categories, discover useful public tools, and jump
              directly to the calculator you need.
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
