import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  path: "/about",
  description:
    "Learn about NexoraCalculator, a modern hub for focused, SEO-friendly calculator experiences."
});

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        About NexoraCalculator
      </h1>
      <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
        NexoraCalculator is designed to be a calm, focused home for calculators
        you actually use—from money and health to dates, conversions, and daily
        decisions. The experience is intentionally clean and minimal so that the
        numbers stay in focus.
      </p>
      <p className="max-w-2xl text-sm text-slate-600 sm:text-base">
        This first release focuses on a strong technical foundation: a scalable
        Next.js architecture, reusable components, and SEO-friendly routing. In
        future iterations, individual calculators will add richer logic,
        guidance, and explanations.
      </p>
    </div>
  );
}

