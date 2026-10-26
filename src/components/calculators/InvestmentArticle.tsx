import Link from "next/link";

export function InvestmentArticle() {
  return (
    <article
      aria-label="Understanding investment projections"
      className="space-y-8 text-sm leading-7 text-slate-600"
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          What is an investment calculator?
        </h2>
        <p>
          An Investment Calculator turns a set of savings assumptions into a
          possible future balance. It can also work backwards: given a target,
          estimate a starting investment, regular contribution, assumed return
          or investment length. The result is a mathematical scenario, not a
          prediction of market performance.
        </p>
        <p>
          A useful investment projection separates the money you put in from the
          growth it might earn. Compare cautious and optimistic scenarios rather
          than relying on one number. This Investment Growth Calculator does not
          choose an investment, assess suitability or guarantee that a target
          can be reached.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          How investment growth is calculated
        </h2>
        <h3 className="font-semibold text-slate-800">
          Starting amount and end amount
        </h3>
        <p>
          The starting amount is the capital already invested at the beginning
          of the projection. The end amount is the balance after the selected
          duration, including additional investment contributions and any growth
          or loss. A larger starting balance gives more money time to grow, but
          it can also increase the amount exposed to a falling market.
        </p>
        <h3 className="font-semibold text-slate-800">
          Expected return and compound interest
        </h3>
        <p>
          Compound growth means that later returns apply to earlier returns as
          well as contributed capital. With no deposits, a nominal annual rate r
          compounded m times a year produces P × (1 + r/m)<sup>mt</sup> after t
          years. Enter r as a percentage in the form. For example, 6% compounded
          annually grows 1,000 to 1,060 after one year; 6% compounded monthly
          gives a slightly higher effective annual return.
        </p>
        <p>
          This Compound Interest Calculator uses a constant equivalent monthly
          factor, (1 + r/m)<sup>m/12</sup>, to align different compounding
          settings with monthly schedules. It therefore interpolates growth
          between compounding dates. A bank that credits interest only on
          particular dates, or calculates actual day counts, may report
          different interim balances. Daily compounding here means 365 equal
          compounding periods per year, not a calendar-specific day count.
        </p>
        <h3 className="font-semibold text-slate-800">
          Regular contributions and timing
        </h3>
        <p>
          Monthly contributions occur every month. Annual beginning
          contributions occur before growth in months 1, 13 and so on; annual
          end contributions occur after growth in months 12, 24 and so on. A
          partial final year has no end-of-year deposit until its twelfth month.
          Beginning contributions receive that period’s growth; end
          contributions do not. With a positive return, investing earlier
          increases the projected balance. With a negative return, it also
          exposes the deposit to that period’s loss.
        </p>
        <p>
          The compounding frequency and contribution frequency are independent.
          Changing compounding does not add extra deposits. Total additional
          contributions exclude the starting investment, and investment growth
          is ending balance minus starting capital and additional contributions.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          How to use the five calculation tabs
        </h2>
        <h3 className="font-semibold text-slate-800">End Amount</h3>
        <p>
          Enter the starting amount, time, return assumption and contribution
          plan to estimate future investment value. Try a zero-return case to
          see how much of the target could come from deposits alone.
        </p>
        <h3 className="font-semibold text-slate-800">
          Additional Contribution and Starting Amount
        </h3>
        <p>
          Set a target balance and solve for the missing deposit or initial
          capital. These calculations use the same growth model as End Amount. A
          target below the value of your other inputs can require a negative
          contribution or withdrawal; this calculator rejects that solution
          because it does not model withdrawals.
        </p>
        <h3 className="font-semibold text-slate-800">Return Rate</h3>
        <p>
          The Investment Return Calculator searches for the nominal annual rate
          that would reproduce the target with the other assumptions fixed. The
          numerical solver checks rates between −99.99% and 1,000%. That wide
          mathematical range is not a statement about realistic returns. An
          estimated required return can be negative, and some targets have no
          solution within the supported range. When no capital has time to grow,
          the rate may not have a unique solution.
        </p>
        <h3 className="font-semibold text-slate-800">Investment Length</h3>
        <p>
          The calculator inspects monthly boundaries and reports the first month
          at which the balance reaches or exceeds the target, up to 100 years.
          Deposits can make the balance jump above the exact target. If your
          starting amount already meets the target, it returns zero months. A
          negative return combined with deposits can make balances rise and
          fall, so checking each boundary avoids assuming a steadily increasing
          balance.
        </p>
        <p>
          Solved deposits can contain fractions of a penny or cent. The
          projection retains that precision and rounds cumulative amounts for
          display. A real standing order rounded to two decimals can produce a
          different final amount; recalculate using the payment you can actually
          make. The tool rejects unreachable or numerically unreliable scenarios
          rather than presenting them as successful results.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Understanding the charts and accumulation schedule
        </h2>
        <p>
          The monthly accumulation table separates each period’s additional
          contributions, growth or loss and ending balance. Annual rows combine
          successive groups of up to twelve investment months. These are
          investment years, not calendar or tax years. The first row’s opening
          capital is the starting investment; it is not counted again as an
          additional deposit.
        </p>
        <p>
          When growth is positive, the doughnut divides the ending balance into
          starting investment, contributions and growth. With a loss, it instead
          divides invested capital into what remains and what was lost. The
          growth chart stacks funded capital above zero and draws losses below
          zero; black markers identify the actual ending balance. Both tables
          and charts use the same rounded projection data.
        </p>
        <p>
          Return on Investment is commonly a gain relative to invested capital.
          With deposits at different times, a simple percentage does not capture
          how long each payment was invested. The annual rate shown here is the
          model’s assumed or solved nominal rate, not a personalised
          money-weighted return on an actual account.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Different types of investments
        </h2>
        <h3 className="font-semibold text-slate-800">
          Savings accounts and certificates of deposit
        </h3>
        <p>
          Savings accounts and fixed-term deposits can offer a stated interest
          rate for a period. Certificates of deposit, often called CDs in the
          US, are another fixed-term product. Access restrictions, early
          withdrawal penalties and deposit-protection eligibility vary. A
          fixed-rate projection can illustrate interest, but check the
          provider’s actual terms and any tax treatment.
        </p>
        <h3 className="font-semibold text-slate-800">Bonds</h3>
        <p>
          A bond is lending to a government or company. Its price can change
          with interest rates, issuer credit quality and market demand. Holding
          a bond to maturity is different from selling it early, and repayment
          depends on the issuer meeting its obligations. Inflation-linked bonds
          can address a particular inflation measure, but do not remove every
          investment risk.
        </p>
        <h3 className="font-semibold text-slate-800">
          Stocks, shares and investment funds
        </h3>
        <p>
          A share represents ownership in a company. Returns can come from price
          changes and dividends, and neither is assured. Funds pool holdings;
          exchange-traded funds trade on an exchange and may track an index or
          follow another strategy. Diversification can reduce concentration in a
          single company, but does not prevent all losses. Charges and dealing
          costs affect what an investor retains.
        </p>
        <h3 className="font-semibold text-slate-800">Real estate investment</h3>
        <p>
          Property returns can include rent and changes in value. Maintenance,
          vacancies, financing, taxes and transaction costs can materially
          change the outcome. Real estate investment trusts offer another route
          to property exposure, with risks and costs of their own. A single
          constant growth rate cannot model these separate cash flows in detail.
        </p>
        <h3 className="font-semibold text-slate-800">Commodities</h3>
        <p>
          Commodity prices, including metals and energy products, can move with
          supply, industrial demand, currencies and wider economic conditions.
          Exposure through a fund or futures-based product can behave
          differently from owning a physical commodity. Storage, contract costs
          and volatility can matter as much as headline price changes.
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Investment risk and the limits of a projection
        </h2>
        <p>
          Real returns vary. A steady average rate hides the order of gains and
          losses, which matters when money is added or withdrawn. A longer
          investment length gives compounding more time to operate but does not
          guarantee a profit. Past performance and a calculated required return
          are not promises of future performance.
        </p>
        <p>
          This model excludes inflation, fees, taxes, withdrawals, changing
          returns and account-specific rules. Currency selection changes the
          display label without converting values. Use the{" "}
          <Link
            className="text-blue-700 underline"
            href="/calculators/compound-interest-calculator"
          >
            Compound Interest Calculator
          </Link>{" "}
          for another savings scenario, the{" "}
          <Link
            className="text-blue-700 underline"
            href="/calculators/savings-calculator"
          >
            Savings Calculator
          </Link>{" "}
          for regular saving, or the{" "}
          <Link
            className="text-blue-700 underline"
            href="/calculators/retirement-calculator"
          >
            Retirement Calculator
          </Link>{" "}
          for a retirement-focused illustration.
        </p>
      </section>
    </article>
  );
}
