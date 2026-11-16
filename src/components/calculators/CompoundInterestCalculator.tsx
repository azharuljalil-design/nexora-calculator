import type { CalculatorConfig } from "@/types/calculatorTypes";
import { CalculatorForm } from "./CalculatorForm";

export function CompoundInterestCalculator({ config }: { config: CalculatorConfig }) {
  return (
    <section className="min-w-0 space-y-5" aria-label="Compound interest calculator">
      <div className="min-w-0 [&_button]:min-h-11 [&_button]:text-sm [&_label]:text-sm [&_label>span:last-child]:text-slate-600 [&_[role=status]_.uppercase]:text-slate-600 [&_[role=status]]:min-w-0 [&_[role=status]]:self-start [&_[role=status]_p]:break-words [&_[role=status]>div>div:first-child]:bg-green-50 [&_[role=status]>div>div:first-child_p:last-child]:text-2xl">
        <CalculatorForm config={config} />
      </div>
      <aside className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700" aria-label="Projection assumptions">
        <p><strong>How this projection works:</strong> the selected annual, quarterly, monthly or daily frequency applies to your initial deposit. Fixed monthly contributions are added at month-end and always grow using the nominal annual rate divided by 12, independently of that selection.</p>
        <p>Enter 0 for no monthly contributions. The rate is a nominal annual assumption, not AER. Results exclude tax, fees, inflation and withdrawals; negative returns and alternative contribution schedules are not supported. Currency changes the display, not the amount. These are illustrations, not guaranteed returns or financial advice.</p>
      </aside>
    </section>
  );
}
