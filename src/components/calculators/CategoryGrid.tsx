import Link from "next/link";
import { calculatorCategories } from "@/data/categories";
import { routes } from "@/lib/routes";

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {calculatorCategories.map((category) => (
        <Link
          key={category.id}
          href={routes.category(category.id)}
          className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md"
        >
          <h3 className="mb-1 text-base font-semibold text-text group-hover:text-primary">
            {category.name}
          </h3>
          <p className="text-sm text-slate-600">{category.description}</p>
        </Link>
      ))}
    </div>
  );
}

