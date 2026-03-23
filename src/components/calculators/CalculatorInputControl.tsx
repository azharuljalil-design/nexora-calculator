import type { CalculatorFormValues, CalculatorInputConfig } from "@/types/calculatorTypes";

type RenderInputControlProps = {
  input: CalculatorInputConfig;
  value: string;
  values: CalculatorFormValues;
  onChange: (value: string) => void;
  error?: string;
  helperId?: string;
  errorId?: string;
};

function describedBy({
  helperId,
  errorId,
  hasError
}: {
  helperId?: string;
  errorId?: string;
  hasError: boolean;
}) {
  const ids: string[] = [];
  if (hasError && errorId) ids.push(errorId);
  if (!hasError && helperId) ids.push(helperId);
  return ids.join(" ") || undefined;
}

export function renderInputControl({
  input,
  value,
  values,
  onChange,
  error,
  helperId,
  errorId
}: RenderInputControlProps) {
  const hasError = Boolean(error);
  const ariaDescribedBy = describedBy({ helperId, errorId, hasError });

  if (input.type === "select") {
    const options =
      typeof input.options === "function" ? input.options(values) : input.options;

    return (
      <select
        aria-invalid={hasError || undefined}
        aria-describedby={ariaDescribedBy}
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{`Select ${input.label.toLowerCase()}`}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  if (input.type === "slider") {
    return (
      <div className="space-y-1">
        <input
          aria-invalid={hasError || undefined}
          aria-describedby={ariaDescribedBy}
          type="range"
          className="w-full accent-primary"
          value={value === "" ? input.min ?? 0 : Number(value)}
          min={input.min}
          max={input.max}
          step={input.step ?? 1}
          onChange={(event) => onChange(event.target.value)}
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>{input.min}</span>
          <span>{value || input.min}</span>
          <span>{input.max}</span>
        </div>
      </div>
    );
  }

  if (input.type === "date") {
    return (
      <input
        aria-invalid={hasError || undefined}
        aria-describedby={ariaDescribedBy}
        type="date"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (input.type === "datetime") {
    return (
      <input
        aria-invalid={hasError || undefined}
        aria-describedby={ariaDescribedBy}
        type="datetime-local"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (input.type === "text") {
    return (
      <input
        aria-invalid={hasError || undefined}
        aria-describedby={ariaDescribedBy}
        type="text"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  if (input.type === "textarea") {
    return (
      <textarea
        aria-invalid={hasError || undefined}
        aria-describedby={ariaDescribedBy}
        className="min-h-[96px] w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    );
  }

  return (
    <input
      aria-invalid={hasError || undefined}
      aria-describedby={ariaDescribedBy}
      type="number"
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-primary/10 focus:border-primary/60 focus:ring-2"
      value={value}
      min={input.min}
      max={input.max}
      step={input.step}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

