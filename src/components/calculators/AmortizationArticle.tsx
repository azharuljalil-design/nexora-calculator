import Link from "next/link";

export function AmortizationArticle() {
  return (
    <article
      className="space-y-8 text-sm leading-7 text-slate-600"
      aria-label="Understanding loan and accounting amortization"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          What is amortization?
        </h2>
        <p>
          Amortization describes a cost being spread over time. For a loan, it
          means repaying the amount borrowed through a planned series of
          payments. In accounting, it usually means recognising the cost of an
          intangible asset over its useful life. These uses share a name, but a
          loan repayment schedule and an accounting expense schedule serve
          different purposes.
        </p>
        <p>
          This Amortization Calculator focuses on fixed-rate loans. Use it as a
          Loan Repayment Calculator to explore how a repayment term and interest
          rate affect the monthly loan payment, or to see how extra loan
          payments change the repayment timeline.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          How loan amortization works
        </h2>
        <h3 className="font-semibold text-slate-800">Principal and interest</h3>
        <p>
          Principal is the outstanding amount borrowed. Interest is the cost
          charged for borrowing it. Each month, interest is calculated on the
          opening balance. The remainder of the payment reduces principal. As
          the balance falls, the next month’s interest charge usually falls too.
          With an unchanged regular payment, more of that payment can then go
          towards principal.
        </p>
        <p>
          Early payments are not necessarily mostly interest: the split depends
          on the rate and term. A short loan or a low rate can produce
          principal-heavy payments from the outset. A zero-interest loan has no
          interest portion at all.
        </p>
        <h3 className="font-semibold text-slate-800">
          The amortization formula
        </h3>
        <p>
          For principal P, monthly rate r and n monthly payments, the regular
          payment is P × r ÷ (1 − (1 + r)<sup>−n</sup>). Here r is the annual
          percentage rate divided by 1,200, and n is years × 12 plus additional
          months. At a zero rate, the payment is simply P ÷ n. The same
          fixed-rate calculation makes this a useful Loan Interest Calculator as
          well as a payment estimator.
        </p>
        <p>
          The engine retains full precision while calculating interest.
          Displayed principal follows the rounded remaining balance; displayed
          interest follows rounded cumulative interest. Differences between
          successive cumulative totals create each row. This keeps payments,
          principal, interest and totals consistent to the cent. A lender that
          rounds interest every month may produce slightly different figures.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Reading an Amortization Schedule
        </h2>
        <p>
          An Amortization Table traces the loan from its opening principal to a
          zero ending balance. Read across a monthly row to find the payment,
          interest charged, principal repaid and remaining balance. The payment
          includes any extra amount applied that month. The last payment is
          capped at what is needed to clear the debt.
        </p>
        <h3 className="font-semibold text-slate-800">
          Monthly versus annual schedules
        </h3>
        <p>
          The monthly view shows each individual repayment. When a first payment
          date is supplied, it also shows projected payment dates. The annual
          view combines each successive group of up to twelve payments into a
          loan year; these are not calendar-year tax summaries. Its ending
          balance is the balance after the last payment in that group. A
          shortened final year may contain fewer than twelve payments.
        </p>
        <p>
          The balance chart shows outstanding principal alongside cumulative
          interest and cumulative principal repaid. Unlike a payment chart, its
          principal line excludes interest. The chart and table use the same
          amounts, so you can compare a visual trend with its numerical
          explanation.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          How extra payments affect repayment
        </h2>
        <p>
          Extra monthly payments reduce principal after the month’s interest and
          regular repayment have been covered. A smaller balance attracts less
          interest in subsequent months. Keeping the regular payment unchanged
          can therefore shorten the loan and reduce total interest. An extra
          payment larger than the outstanding amount is capped; the calculator
          does not create a negative loan balance.
        </p>
        <p>
          For example, a 1,200 loan at 0% over twelve months needs a regular
          payment of 100. Adding 100 each month clears it in six payments of
          200. There is no interest saving at 0%, but the debt is repaid sooner.
          On an interest-bearing loan, the same principle also reduces future
          interest charges. Check whether your lender imposes overpayment limits
          or early repayment charges before acting on an estimate.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Fixed-rate versus variable-rate loans
        </h2>
        <p>
          This Loan Amortization Calculator assumes the annual rate stays fixed
          throughout repayment. It divides that rate into equal monthly periods
          rather than calculating daily interest. Payment dates are calendar
          labels: choosing a different date does not create an extra interest
          period. A date that falls beyond the end of a shorter month is moved
          to that month’s last day, retaining the original day for later months.
        </p>
        <p>
          A variable-rate loan can change its payment or repayment term when
          rates change. This tool does not forecast those changes. Interest-only
          loans, balloon payments, revolving credit, missed payments and payment
          holidays also need different models.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Common amortization examples
        </h2>
        <p>
          A fixed-rate personal loan, car loan or repayment mortgage can all use
          amortising payments. For a mortgage, you may also need to consider a
          deposit, ownership costs and repayment scenarios: try the{" "}
          <Link
            className="text-blue-700 underline"
            href="/calculators/mortgage-calculator"
          >
            Mortgage Calculator
          </Link>
          . The{" "}
          <Link
            className="text-blue-700 underline"
            href="/calculators/loan-calculator"
          >
            Loan Calculator
          </Link>{" "}
          provides another way to explore borrowing assumptions.
        </p>
        <p>
          Credit cards behave differently because borrowing and repayments can
          vary from month to month. A fixed schedule will not describe an
          account where new purchases, changing rates or minimum-payment rules
          continually change the balance.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Amortization versus depreciation in business accounting
        </h2>
        <p>
          Accounting amortization allocates an intangible asset’s cost over the
          periods expected to benefit from it. Depreciation generally serves a
          similar purpose for tangible assets such as vehicles or equipment.
          Neither term means that a business is making loan repayments, and
          recognising an expense does not necessarily mean cash leaves the
          business in that period.
        </p>
        <h3 className="font-semibold text-slate-800">
          Intangible assets and useful lives
        </h3>
        <p>
          Acquired patents, licences, copyrights and customer relationships can
          be examples of intangible assets. Whether a particular asset is
          amortised, and over what period, depends on its useful life and the
          accounting rules that apply. Indefinite-life assets and goodwill can
          receive different treatment; do not assume every intangible asset
          follows the same schedule.
        </p>
        <h3 className="font-semibold text-slate-800">
          US-specific tax treatment
        </h3>
        <p>
          US tax rules include special provisions for certain acquired
          intangibles under Internal Revenue Code Section 197. Eligibility,
          exclusions and acquisition circumstances matter. Startup costs have
          their own tax rules. These are US-specific matters, not UK tax
          guidance, and accounting treatment may differ from tax treatment. This
          calculator does not calculate business amortization deductions or
          determine whether an asset or startup expense qualifies.
        </p>
      </section>
    </article>
  );
}
