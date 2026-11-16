import Link from "next/link";
import { incomeTaxArticleSections, incomeTaxFaqs, type IncomeTaxArticleBlock } from "@/calculators/incomeTaxArticleContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/seo";

function ArticleBlock({ block }: { block: IncomeTaxArticleBlock }) {
  if (block.kind === "heading") return <h3 className="pt-3 text-lg font-semibold text-slate-900">{block.text}</h3>;
  if (block.kind === "paragraph") return <p>{block.text}</p>;
  if (block.kind === "list") {
    const Tag = block.ordered ? "ol" : "ul";
    return <Tag className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-2 pl-6`}>{block.items.map(item => <li key={item}>{item}</li>)}</Tag>;
  }
  if (block.kind === "table") return (
    <div className="overflow-x-auto rounded-lg border border-slate-200" role="region" aria-label={block.caption} tabIndex={0}>
      <table className="w-full border-collapse text-left text-sm">
        <caption className="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-900">{block.caption}</caption>
        <thead className="bg-slate-100 text-slate-900"><tr>{block.headers.map(header => <th key={header} scope="col" className="px-4 py-3">{header}</th>)}</tr></thead>
        <tbody>{block.rows.map(row => <tr key={row[0]} className="border-t border-slate-200">{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="px-4 py-3 font-medium text-slate-800">{cell}</th> : <td key={index} className="px-4 py-3">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
  return null;
}

export function IncomeTaxArticle() {
  return (
    <article className="min-w-0 space-y-8 text-base leading-7 text-slate-700" aria-label="UK Income Tax guide for 2026/27">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: incomeTaxFaqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
        { "@type": "ListItem", position: 2, name: "Financial Calculators", item: `${siteConfig.url}/category/financial` },
        { "@type": "ListItem", position: 3, name: "UK Income Tax Calculator", item: `${siteConfig.url}/calculators/income-tax-calculator` }
      ] }} />
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
        <p className="font-semibold">Tax figures: verification pending</p>
        <p className="mt-2">The supplied 2026/27 figures are retained below. Access to official HMRC and Scottish Government guidance was blocked during review, so these figures have not been independently verified for this update. Complete that check before publication.</p>
      </div>
      <nav aria-label="Income Tax guide contents" className="rounded-lg border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <p className="mb-3 font-semibold text-slate-900">In this guide</p>
        <ol className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">{incomeTaxArticleSections.map(section => <li key={section.id}><a href={`#${section.id}`} className="text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-700">{section.title}</a></li>)}</ol>
      </nav>
      <p>This guide explains taxable income, Personal Allowance, UK Income Tax bands, National Insurance, pension contributions, tax reliefs and other aspects of the UK tax system. Topics beyond employment Income Tax and employee National Insurance are educational and are not calculated by this tool.</p>
      {incomeTaxArticleSections.map(section => (
        <section id={section.id} key={section.id} className="scroll-mt-6 space-y-4 border-t border-slate-200 pt-7">
          <h2 className="text-xl font-bold leading-snug text-slate-950 sm:text-2xl">{section.title}</h2>
          {section.id === "section-14" ? <div className="space-y-3">{incomeTaxFaqs.map(faq => <details key={faq.question} className="rounded-lg border border-slate-200 bg-white px-4 py-3"><summary className="cursor-pointer py-1 font-semibold text-slate-900"><h3 className="inline">{faq.question}</h3></summary><p className="mt-3">{faq.answer}</p></details>)}</div> : section.blocks.map((block, index) => <ArticleBlock key={index} block={block} />)}
        </section>
      ))}
      <aside className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm">
        <h2 className="text-lg font-semibold text-slate-900">Official sources for verification</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><a className="text-blue-700 underline" href="https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027">HMRC: 2026/27 employer rates and thresholds</a></li>
          <li><a className="text-blue-700 underline" href="https://www.gov.scot/publications/scottish-income-tax-rates-and-bands/pages/2026-to-2027/">Scottish Government: 2026/27 Income Tax rates and bands</a></li>
          <li><a className="text-blue-700 underline" href="https://www.gov.uk/income-tax-rates">HMRC: Income Tax rates and Personal Allowance</a></li>
          <li><a className="text-blue-700 underline" href="https://www.gov.uk/tax-on-dividends">HMRC: tax on dividends</a></li>
        </ul>
      </aside>
      <aside className="space-y-3 border-t border-slate-200 pt-6">
        <h2 className="text-lg font-semibold text-slate-900">Related calculators</h2>
        <div className="flex flex-wrap gap-3 text-sm"><Link className="text-blue-700 underline" href="/calculators/salary-calculator">Salary Calculator</Link><Link className="text-blue-700 underline" href="/calculators/salary-to-hourly-calculator">Salary to Hourly Calculator</Link></div>
      </aside>
    </article>
  );
}
