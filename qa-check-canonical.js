const fs = require("fs");

const base = process.env.BASE_URL || "http://localhost:3000";

if (typeof fetch !== "function") {
  console.error("Fetch is not available.");
  process.exit(1);
}

function extractCalculatorSlugs() {
  const text = fs.readFileSync("src/calculators/calculatorRegistry.ts", "utf8");
  const slugs = [...text.matchAll(/\n\s*slug:\s*"([^"]+)",/g)].map((m) => m[1]);
  return [...new Set(slugs)];
}

function extractCategoryIds() {
  const text = fs.readFileSync("src/data/categories.ts", "utf8");
  const ids = [...text.matchAll(/\bid:\s*"([^"]+)"/g)].map((m) => m[1]);
  return [...new Set(ids)];
}

function getTitleAndDescription(html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const descMatch = html.match(
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']\s*\/?>/i
  );
  return {
    title: titleMatch?.[1]?.trim() || "",
    description: descMatch?.[1]?.trim() || ""
  };
}

async function checkStatus(url) {
  const res = await fetch(url, { redirect: "follow" });
  return { url, status: res.status };
}

async function main() {
  const calculatorSlugs = extractCalculatorSlugs();
  const categoryIds = extractCategoryIds();

  const routeChecks = [
    { url: `${base}/` },
    { url: `${base}/about` },
    { url: `${base}/calculators` },
    { url: `${base}/search?q=mortgage` }
  ];

  for (const categoryId of categoryIds) {
    routeChecks.push({ url: `${base}/category/${encodeURIComponent(categoryId)}` });
  }

  for (const slug of calculatorSlugs) {
    routeChecks.push({ url: `${base}/calculators/${encodeURIComponent(slug)}` });
  }

  const failures = [];
  for (const c of routeChecks) {
    const { url, status } = await checkStatus(c.url);
    if (!(status >= 200 && status <= 299)) {
      failures.push({ url, status });
    }
  }

  const seoUrls = [
    { url: `${base}/`, name: "Home" },
    { url: `${base}/search?q=mortgage`, name: "Search" },
    { url: `${base}/calculators`, name: "All calculators" },
    { url: `${base}/calculators/vat-calculator`, name: "VAT calculator" },
    { url: `${base}/calculators/mortgage-calculator`, name: "Mortgage calculator" }
  ];

  const seoFailures = [];
  for (const s of seoUrls) {
    const res = await fetch(s.url, { redirect: "follow" });
    const html = await res.text();
    const { title, description } = getTitleAndDescription(html);
    if (!title || !description) {
      seoFailures.push({ page: s.name, url: s.url, status: res.status, title, descriptionOk: Boolean(description) });
    }
  }

  if (failures.length || seoFailures.length) {
    if (failures.length) {
      console.error(`Route failures (${failures.length}):`);
      failures.slice(0, 30).forEach((f) =>
        console.error(`- ${f.url} -> ${f.status}`)
      );
    }
    if (seoFailures.length) {
      console.error(`SEO failures (${seoFailures.length}):`);
      seoFailures.forEach((f) =>
        console.error(`- ${f.page} (${f.url}) status=${f.status} titleOk=${Boolean(f.title)} descOk=${f.descriptionOk}`)
      );
    }
    process.exit(2);
  }

  console.log(`OK: ${routeChecks.length} routes (canonical) and key SEO checks passed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

