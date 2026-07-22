"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type SiteErrorBoundaryProps = {
  children: ReactNode;
};

type SiteErrorBoundaryState = {
  hasError: boolean;
};

export class SiteErrorBoundary extends Component<
  SiteErrorBoundaryProps,
  SiteErrorBoundaryState
> {
  state: SiteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Site client render failed", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-text">
            Free Online Calculators
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            A page widget is temporarily unavailable. You can still browse the
            calculator library and open calculators directly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
            <a
              href="/calculators"
              className="rounded-xl bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Browse all calculators
            </a>
            <a
              href="/category/math"
              className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700 hover:border-primary hover:text-primary"
            >
              Math calculators
            </a>
            <a
              href="/about"
              className="rounded-xl border border-slate-200 px-4 py-2 text-slate-700 hover:border-primary hover:text-primary"
            >
              About
            </a>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
