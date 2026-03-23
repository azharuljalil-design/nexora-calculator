export type SearchableCalculator = {
  slug: string;
  name: string;
  category: string;
  description: string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[_/]+/g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  const n = normalize(text);
  if (!n) return [];
  return n.split(" ").filter(Boolean);
}

export type SearchIndexItem = SearchableCalculator & {
  haystack: string;
  tokens: string[];
};

export function buildSearchIndex(items: SearchableCalculator[]): SearchIndexItem[] {
  return items.map((item) => {
    const haystack = normalize(
      `${item.name} ${item.slug} ${item.category} ${item.description}`
    );
    return {
      ...item,
      haystack,
      tokens: tokenize(haystack)
    };
  });
}

export type SearchResult = {
  slug: string;
  name: string;
  category: string;
  description: string;
  score: number;
  matchedTerms: string[];
};

function scoreItem(item: SearchIndexItem, queryTokens: string[]): SearchResult | null {
  if (queryTokens.length === 0) return null;

  let score = 0;
  const matched = new Set<string>();

  const nameNorm = normalize(item.name);
  const slugNorm = normalize(item.slug);
  const categoryNorm = normalize(item.category);
  const descNorm = normalize(item.description);

  for (const t of queryTokens) {
    const inHaystack = item.haystack.includes(t);
    if (!inHaystack) continue;

    matched.add(t);

    // Weighted scoring: name > slug > category > description
    if (nameNorm.includes(t)) score += nameNorm.startsWith(t) ? 40 : 25;
    if (slugNorm.includes(t)) score += slugNorm.startsWith(t) ? 20 : 12;
    if (categoryNorm.includes(t)) score += 10;
    if (descNorm.includes(t)) score += 6;

    // Token exact match bonus
    if (item.tokens.includes(t)) score += 3;
  }

  if (matched.size === 0) return null;

  // Bonus for matching more tokens
  score += matched.size * 5;

  return {
    slug: item.slug,
    name: item.name,
    category: item.category,
    description: item.description,
    score,
    matchedTerms: Array.from(matched)
  };
}

export function searchCalculators(
  index: SearchIndexItem[],
  query: string,
  limit = 20
): SearchResult[] {
  const queryTokens = tokenize(query);
  const results: SearchResult[] = [];

  for (const item of index) {
    const r = scoreItem(item, queryTokens);
    if (r) results.push(r);
  }

  results.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
  return results.slice(0, limit);
}

export function highlightText(text: string, terms: string[]) {
  if (!terms.length) return [text];
  const escaped = terms
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (escaped.length === 0) return [text];
  const re = new RegExp(`(${escaped.join("|")})`, "ig");
  const parts = text.split(re);
  return parts.filter((p) => p !== "");
}

