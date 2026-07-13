import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | NexoraCalculator",
  description:
    "Contact NexoraCalculator with questions, feedback, correction requests, privacy enquiries, or website-related issues.",
  alternates: {
    canonical: "https://nexoracalculator.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Contact Us
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Contact NexoraCalculator with questions, feedback, correction
          requests, privacy enquiries, or technical issues.
        </p>
      </header>

      <div className="space-y-10 text-base leading-7 text-slate-700">
        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Email enquiries
          </h2>

          <p className="mt-4">
            You can contact us at:
          </p>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <a
              href="mailto:info@nexoracalculator.com"
              className="text-lg font-semibold text-indigo-600 underline hover:text-indigo-800"
            >
              info@nexoracalculator.com
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            What you can contact us about
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>Questions about NexoraCalculator.</li>
            <li>Feedback about a calculator or website page.</li>
            <li>Reporting an incorrect calculation or broken feature.</li>
            <li>Suggestions for new calculators.</li>
            <li>Privacy, cookie, or data-protection enquiries.</li>
            <li>Advertising or business enquiries.</li>
            <li>Reporting technical, accessibility, or security problems.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Reporting a calculator issue
          </h2>

          <p className="mt-4">
            When reporting a problem, please include the calculator name, the
            page address, the values you entered, the result you received, and
            the result you expected.
          </p>

          <p className="mt-4">
            Please do not include passwords, bank details, medical records,
            identification documents, or other sensitive personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Response times
          </h2>

          <p className="mt-4">
            We aim to review legitimate enquiries as soon as reasonably
            possible. Response times may vary depending on the subject and the
            information required.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900">
            Important information
          </h2>

          <p className="mt-4">
            NexoraCalculator provides general informational calculation tools.
            We cannot provide personalised financial, tax, legal, medical, or
            professional advice by email.
          </p>
        </section>
      </div>
    </main>
  );
}
