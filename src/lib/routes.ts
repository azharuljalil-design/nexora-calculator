export const routes = {
  home: "/",
  about: "/about",
  search: "/search",
  calculators: "/calculators",
  category: (slug: string) => `/category/${slug}`,
  calculator: (slug: string) => `/calculators/${slug}`
} as const;

