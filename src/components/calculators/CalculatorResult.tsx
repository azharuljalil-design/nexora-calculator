import type {
  CalculatorConfig,
  CalculatorResultShape
} from "@/types/calculatorTypes";

type CalculatorResultProps = {
  config: CalculatorConfig;
  result: CalculatorResultShape | null;
  hasSubmitted: boolean;
};

export function CalculatorResult({
  config,
  result,
  hasSubmitted
}: CalculatorResultProps) {
  const hasResult = result && Object.keys(result).length > 0;

  return (
    <div
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      role="status"
      aria-live="polite"
    >
      <h2 className="text-sm font-semibold text-slate-800">
        Result
      </h2>

      {!hasSubmitted && !hasResult ? (
        <p className="text-xs text-slate-500">
          Enter values on the left and select{" "}
          <span className="font-medium text-primary">Equals</span>{" "}
          to see the result here.
        </p>
      ) : null}

      {hasSubmitted && !hasResult ? (
        <p className="text-xs text-slate-500">
          Please fix the highlighted inputs, then calculate again.
        </p>
      ) : null}

      {hasResult ? (
        <div className="space-y-3">
          {Object.entries(result!).map(([key, value]) => {
            const label =
              config.resultLabels?.[key] ?? key.replace(/_/g, " ");

            return (
              <div
                key={key}
                className="rounded-xl bg-primary/5 px-3 py-2 text-xs"
              >
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="text-sm font-semibold text-text">
                  {value}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

