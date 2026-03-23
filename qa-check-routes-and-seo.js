const fs = require("fs");

const base = process.env.BASE_URL || "http://localhost:3000";
const fetchFn = globalThis.fetch;

if (typeof fetchFn !== "function") {
  console.error("Node fetch is not available in this runtime.");
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

async function checkUrl(url, opts = {}) {
  const res = await fetchFn(url, { redirect: "follow" });
  const status = res.status;
  const ok =
    status >= 200 &&
    status <= 299 &&
    (!opts.expectJson || res.headers.get("content-type")?.includes("application/json"));
  return { url, status, ok };
}

async function main() {
  const calculatorSlugs = extractCalculatorSlugs();
  const categoryIds = extractCategoryIds();
  const skipLegacy = process.env.SKIP_LEGACY === "1";

  const routeChecks = [
    { url: `${base}/`, expectOk: true },
    { url: `${base}/about`, expectOk: true },
    { url: `${base}/calculators`, expectOk: true },
    { url: `${base}/search?q=mortgage`, expectOk: true }
  ];

  for (const categoryId of categoryIds) {
    routeChecks.push({
      url: `${base}/category/${encodeURIComponent(categoryId)}`,
      expectOk: true
    });
  }

  for (const slug of calculatorSlugs) {
    routeChecks.push({
      url: `${base}/calculators/${encodeURIComponent(slug)}`,
      expectOk: true
    });

    if (!skipLegacy) {
      // Legacy route should redirect to the engine route (for slugs present in `src/data/calculators.ts`).
      routeChecks.push({
        url: `${base}/calculator/${encodeURIComponent(slug)}`,
        expectOk: true
      });
    }
  }

  const failures = [];

  for (const c of routeChecks) {
    const res = await checkUrl(c.url);
    if (!res.ok) failures.push({ url: c.url, status: res.status });
  }

  // SEO checks on key pages
  const seoUrls = [
    { url: `${base}/`, name: "Home" },
    { url: `${base}/search?q=mortgage`, name: "Search" },
    { url: `${base}/calculators`, name: "All calculators" },
    { url: `${base}/calculators/vat-calculator`, name: "VAT calculator" },
    { url: `${base}/calculators/mortgage-calculator`, name: "Mortgage calculator" }
  ];

  const seoFailures = [];
  for (const s of seoUrls) {
    const res = await fetchFn(s.url, { redirect: "follow" });
    const html = await res.text();
    const { title, description } = getTitleAndDescription(html);
    if (!title || !description) {
      seoFailures.push({
        page: s.name,
        url: s.url,
        title,
        descriptionFound: Boolean(description),
        status: res.status
      });
    }
  }

  if (failures.length || seoFailures.length) {
    if (failures.length) {
      console.error(`Route failures (${failures.length}):`);
      for (const f of failures.slice(0, 30)) console.error(`- ${f.url} -> ${f.status}`);
      if (failures.length > 30) console.error(`(and ${failures.length - 30} more)`);
    }
    if (seoFailures.length) {
      console.error(`SEO failures (${seoFailures.length}):`);
      for (const f of seoFailures) {
        console.error(`- ${f.page} (${f.url}) status=${f.status} titleOk=${Boolean(f.title)} descOk=${Boolean(f.descriptionFound)}`);
      }
    }
    process.exit(2);
  }

  console.log(
    `OK: ${routeChecks.length} route checks passed; SEO metadata checks passed.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

