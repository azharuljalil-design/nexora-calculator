import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About NexoraCalculator",
  path: "/about",
  description:
    "Learn about NexoraCalculator, a free online calculator site for finance, tax, health, math, conversions, dates, time, and everyday estimates."
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          About NexoraCalculator
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          NexoraCalculator provides free online calculators that help people
          calculate, compare, estimate, and understand everyday numbers more
          easily.
        </p>
      </header>

      <div className="space-y-10 text-base leading-7 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            What NexoraCalculator is
          </h2>

          <p className="mt-4">
            NexoraCalculator is a public calculator website built to make common
            calculations easier to complete and understand. The site focuses on
            practical tools with clear inputs, plain-language explanations, and
            results that are easy to review.
          </p>

          <p className="mt-4">
            Our purpose is to support quick planning and learning—not to replace
            official documents, professional advice, or decisions that require a
            complete review of your personal circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Calculator categories
          </h2>

          <p className="mt-4">
            NexoraCalculator includes calculators for common categories such as:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Finance, loan, savings, and everyday money estimates.</li>
            <li>Tax and payroll-related planning tools.</li>
            <li>Health, fitness, pregnancy, and body-measurement estimates.</li>
            <li>Math, percentages, fractions, and academic calculations.</li>
            <li>Unit, measurement, and conversion tools.</li>
            <li>Date, time, age, and scheduling calculations.</li>
            <li>Everyday planning calculators for quick comparisons.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            How to use calculator results
          </h2>

          <p className="mt-4">
            Calculator outputs are estimates based on the values and assumptions
            you enter. Small changes in inputs, simplified formulas, rounding,
            changing rates, regional rules, or missing information can change a
            result.
          </p>

          <p className="mt-4">
            Important results should be checked against official sources,
            original documents, current rules, or a relevant qualified
            professional before you rely on them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Responsible-use disclaimer
          </h2>

          <p className="mt-4">
            NexoraCalculator does not provide financial, tax, medical, legal,
            payroll, academic, immigration, accounting, investment, or other
            official advice. Our calculators are general information tools and
            are not a substitute for advice from qualified professionals or
            authoritative organisations.
          </p>

          <p className="mt-4">
            Use the calculators as a helpful starting point for understanding
            numbers, then verify any high-impact calculation before making a
            decision, submitting information, paying money, changing treatment,
            filing forms, or meeting an official deadline.
          </p>
        </section>
      </div>
    </main>
  );
}
