import type { HTMLAttributes } from "react";

export type AdPlaceholderVariant = "homepage" | "between" | "footer";

export function AdPlaceholder({
  variant,
  className,
  "aria-label": ariaLabel,
  ...rest
}: {
  variant: AdPlaceholderVariant;
  className?: string;
  "aria-label"?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "aria-label">) {
  const base =
    "w-full rounded-2xl border border-slate-200 bg-white/80 p-5 text-slate-500";

  const variantClass =
    variant === "homepage"
      ? "bg-slate-50/60"
      : variant === "between"
        ? "bg-white"
        : "bg-primary/5 border-primary/20";

  return (
    <div
      data-ad-slot={variant}
      aria-label={ariaLabel ?? "Advertisement placeholder"}
      className={[base, variantClass, className ?? ""].join(" ")}
      {...rest}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Advertisement
          </p>
          <p className="text-sm">
            This space is reserved for future monetization. Your content and
            navigation stay fast and readable.
          </p>
        </div>
        <div className="hidden sm:block text-xs text-slate-400">
          Ad slot
        </div>
      </div>
    </div>
  );
}

