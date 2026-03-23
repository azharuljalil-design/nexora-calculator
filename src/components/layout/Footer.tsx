import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { routes } from "@/lib/routes";
import { AdPlaceholder } from "@/components/ads/AdPlaceholder";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        {/* Footer banner area (reserved for future monetization) */}
        <div className="sm:hidden">
          <AdPlaceholder variant="footer" className="p-4" />
        </div>
        <div className="hidden sm:block">
          <AdPlaceholder variant="footer" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-text">NexoraCalculator</p>
            <p className="text-sm text-slate-500">
              Fast, clear calculators for UK, Europe, and USA users.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-text">Pages</p>
            <div className="space-y-1 text-sm text-slate-500">
              <div>
                <Link href={routes.about} className="hover:text-primary">
                  About
                </Link>
              </div>
              <div>
                <Link href={routes.search} className="hover:text-primary">
                  Search
                </Link>
              </div>
              <div>
                <Link href={routes.calculators} className="hover:text-primary">
                  All Calculators
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-text">Categories</p>
            <div className="space-y-1 text-sm text-slate-500">
              {calculatorCategories.map((category) => (
                <div key={category.id}>
                  <Link
                    href={routes.category(category.id)}
                    className="hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-text">Company</p>
            <div className="space-y-1 text-sm text-slate-500">
              <p className="text-slate-500">Privacy (coming soon)</p>
              <p className="text-slate-500">Contact (coming soon)</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4 text-sm text-slate-500">
          <p>© {year} NexoraCalculator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

