import Link from "next/link";
import { Fragment } from "react";
import { compoundInterestFaqs, compoundInterestSections, type CompoundArticleBlock } from "@/calculators/compoundInterestArticleContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo";

function InlineText({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, index) => (
    part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part.startsWith("`") ? <code key={index} className="rounded bg-slate-100 px-1 text-sm">{part.slice(1, -1)}</code> : <Fragment key={index}>{part}</Fragment>
  ))}</>;
}

function ArticleBlock({ block }: { block: CompoundArticleBlock }) {
  if (block.kind === "heading") return <h3 className="pt-3 text-lg font-semibold text-slate-900">{block.text}</h3>;
  if (block.kind === "paragraph") return <p className="break-words"><InlineText text={block.text} /></p>;
  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return <Tag className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-6`}>{block.items.map(item => <li key={item}><InlineText text={item} /></li>)}</Tag>;
  }
  if (block.kind === "table") return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" role="region" aria-label={block.caption} tabIndex={0}>
      <table className="w-full border-collapse text-left text-sm">
        <caption className="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-900">{block.caption}</caption>
        <thead className="bg-slate-100 text-slate-900"><tr>{block.headers.map(header => <th key={header} scope="col" className="px-4 py-3">{header}</th>)}</tr></thead>
        <tbody>{block.rows.map(row => <tr key={row[0]} className="border-t border-slate-200">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="px-4 py-3 font-medium text-slate-800">{cell}</th> : <td key={index} className="px-4 py-3 tabular-nums">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
  return null;
}

const relatedCalculators = [
  ["investment-calculator", "Investment Calculator"],
  ["savings-calculator", "Savings Calculator"],
  ["retirement-calculator", "Retirement Calculator"],
  ["loan-calculator", "Loan Calculator"],
  ["mortgage-calculator", "UK Mortgage Calculator"]
];

export function CompoundInterestArticle() {
  return (
    <article className="min-w-0 space-y-8 text-base leading-7 text-slate-700" aria-label="UK compound interest guide">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: compoundInterestFaqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Financial Calculators", item: `${siteConfig.url}/category/financial` },
        { "@type": "ListItem", position: 3, name: "Compound Interest Calculator", item: `${siteConfig.url}/calculators/compound-interest-calculator` }
      ] }} />
      <nav aria-label="Compound interest guide contents" className="rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <p className="mb-3 font-semibold text-slate-900">In this guide</p>
        <ul className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">{compoundInterestSections.map(section => <li key={section.id}><a href={`#${section.id}`} className="text-primary underline underline-offset-4">{section.title}</a></li>)}</ul>
      </nav>
      <p>Compound interest means earning interest on interest already added to your balance. Over time, that can make a significant difference to savings and investments. The guide below explains the formulas, examples in pounds, UK savings considerations and limits of these projections.</p>
      {compoundInterestSections.map(section => (
        <section id={section.id} key={section.id} className="min-w-0 scroll-mt-20 space-y-4 border-t border-slate-200 pt-7">
          <h2 className="text-xl font-bold leading-snug text-slate-950 sm:text-2xl">{section.title}</h2>
          {section.title.startsWith("Frequently asked") ? <div className="space-y-3">{compoundInterestFaqs.map(faq => <details key={faq.question} className="rounded-xl border border-slate-200 bg-white px-4 py-3"><summary className="cursor-pointer py-1 font-semibold text-slate-900"><h3 className="inline">{faq.question}</h3></summary><p className="mt-3">{faq.answer}</p></details>)}</div> : section.title === "Explore related financial calculators" ? <><p>Compare scenarios using these NexoraCalculator financial tools. Each calculator has its own assumptions and supported features.</p><ul className="grid gap-3 sm:grid-cols-2">{relatedCalculators.map(([slug, name]) => <li key={slug}><Link className="inline-block rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-primary hover:bg-slate-50" href={`/calculators/${slug}`}>{name}</Link></li>)}</ul></> : section.blocks.map((block, index) => <ArticleBlock key={index} block={block} />)}
        </section>
      ))}
      <aside className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950" aria-label="UK savings information review">
        <h2 className="text-lg font-semibold">UK savings information: verification pending</h2>
        <p>The general ISA, savings-tax and AER explanations have not been independently verified against current authoritative guidance for this update because source access was blocked. No tax rates or ISA allowance figures have been added. Check current guidance and account terms before relying on these explanations.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li><a className="underline" href="https://www.gov.uk/individual-savings-accounts">GOV.UK: Individual Savings Accounts</a></li>
          <li><a className="underline" href="https://www.gov.uk/apply-tax-free-interest-on-savings">HMRC: tax on savings interest</a></li>
          <li><a className="underline" href="https://www.moneyhelper.org.uk/en/savings/types-of-savings/savings-accounts">MoneyHelper: savings accounts</a></li>
        </ul>
      </aside>
    </article>
  );
}
