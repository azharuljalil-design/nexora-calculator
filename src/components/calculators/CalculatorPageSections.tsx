import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { routes } from "@/lib/routes";
import { calculatorContentBySlug } from "@/calculators/calculatorContent";
import { findCalculatorBySlug } from "@/calculators/calculatorRegistry";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo";

type CalculatorPageSectionsProps = {
  slug: string;
};

export function CalculatorPageSections({ slug }: CalculatorPageSectionsProps) {
  const calculator = findCalculatorBySlug(slug);
  const content = calculatorContentBySlug[slug];
  if (!calculator) return null;

  const category =
    calculatorCategories.find((c) => c.name === calculator.category) ?? null;

  const related =
    calculator.relatedSlugs?.length
      ? calculator.relatedSlugs
          .map((s) => findCalculatorBySlug(s))
          .filter(Boolean)
      : [];

  const relatedCategories = Array.from(
    new Map(
      related
        .map((c) => {
          if (!c) return null;
          return (
            calculatorCategories.find((cat) => cat.name === c.category) ??
            null
          );
        })
        .filter(Boolean)
        .map((cat) => [cat!.id, cat!])
    ).values()
  ).filter((cat) => cat.name !== category?.name);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`
      },
      category
        ? {
            "@type": "ListItem",
            position: 2,
            name: category.name,
            item: `${siteConfig.url}${routes.category(category.id)}`
          }
        : null,
      {
        "@type": "ListItem",
        position: category ? 3 : 2,
        name: calculator.name,
        item: `${siteConfig.url}${routes.calculator(calculator.slug)}`
      }
    ].filter(Boolean)
  };

  const faqLd =
    content.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer }
          }))
        }
      : null;

  return (
    <div className="space-y-10">
      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-text">
          What the {calculator.name} does
        </h2>
        {content ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
            {content.whatItDoes.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-text">
          How to use the {calculator.name}
        </h2>
        {content ? (
          <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-600">
            {content.howToUse.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-text">
          Formula / methodology used
        </h2>
        {content ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
            {content.methodology.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-text">
          Example calculation
        </h2>
        {content ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            <p className="font-semibold text-text">{content.example.scenario}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {content.example.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="mt-3">
              <span className="font-medium text-slate-800">Result:</span>{" "}
              {content.example.result}
            </p>
          </div>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-text">
          {calculator.name} FAQs
        </h2>
        {content ? (
          content.faqs.length === 0 ? (
            <p className="text-sm text-slate-600">
              No FAQs yet for {calculator.name}. If you want, tell me the most
              common questions you hear and I’ll add them.
            </p>
          ) : (
            <div className="space-y-3">
              {content.faqs.map((f) => (
                <details
                  key={f.question}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-text">
                    {f.question}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
                </details>
              ))}
            </div>
          )
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-text">Related calculators</h2>
        {related.length === 0 ? (
          <p className="text-sm text-slate-600">
            Browse the{" "}
            <Link className="hover:underline" href="/calculators">
              full calculator list
            </Link>
            .
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {related.map((c) => (
              <Link
                key={c!.slug}
                href={routes.calculator(c!.slug)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-secondary hover:text-secondary"
              >
                {c!.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      {relatedCategories.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-text">Related categories</h2>
          <div className="flex flex-wrap gap-3">
            {relatedCategories.map((cat) => (
              <Link
                key={cat.id}
                href={routes.category(cat.id)}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-secondary hover:text-secondary"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

