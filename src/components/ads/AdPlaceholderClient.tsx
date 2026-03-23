"use client";

import type { HTMLAttributes } from "react";

export type AdPlaceholderVariant = "sidebar";

export function AdPlaceholderClient({
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
    "w-full rounded-2xl border border-slate-200 bg-white p-4 text-slate-500";

  return (
    <div
      data-ad-slot={variant}
      aria-label={ariaLabel ?? "Advertisement placeholder"}
      className={[base, className ?? ""].join(" ")}
      {...rest}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            Advertisement
          </p>
          <p className="text-xs text-slate-600">
            Reserved for future ad placement.
          </p>
        </div>
        <div className="hidden sm:block text-[11px] text-slate-400">
          Ad slot
        </div>
      </div>
    </div>
  );
}

