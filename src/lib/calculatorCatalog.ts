import { calculatorRegistry } from "@/calculators/calculatorRegistry";
import { calculatorCategories, type CalculatorCategoryId } from "@/data/categories";

export type CalculatorCard = {
  slug: string;
  name: string;
  categoryId: CalculatorCategoryId;
  categoryName: string;
  description: string;
};

export function getCategoryByName(categoryName: string) {
  return calculatorCategories.find((c) => c.name === categoryName) ?? null;
}

export function getAllCalculatorCards(): CalculatorCard[] {
  const cards: CalculatorCard[] = [];

  for (const calc of calculatorRegistry) {
    const category = getCategoryByName(calc.category);
    if (!category) continue;
    cards.push({
      slug: calc.slug,
      name: calc.name,
      categoryId: category.id,
      categoryName: category.name,
      description: calc.description
    });
  }

  return cards;
}

export function getCalculatorCardsByCategoryId(
  categoryId: CalculatorCategoryId
) {
  return getAllCalculatorCards()
    .filter((c) => c.categoryId === categoryId)
    .sort((a, b) => a.name.localeCompare(b.name));
}

