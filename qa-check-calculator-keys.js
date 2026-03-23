const fs = require("fs");

const registryPath = "src/calculators/calculatorRegistry.ts";
const text = fs.readFileSync(registryPath, "utf8");

// Capture top-level calculator entries only.
// These have the exact shape: slug: "<slug>",
const slugMatches = [...text.matchAll(/\n\s*slug:\s*"([^"]+)",/g)].map(
  (m) => m[1]
);

if (slugMatches.length === 0) {
  console.error("No slugs found in calculatorRegistry.ts");
  process.exit(1);
}

// For each slug, slice from its slug line to the next slug line.
function indexOfNthSlug(slug, n) {
  // Find indices in a way that's stable even if slugs repeat in relatedSlugs (they shouldn't).
  // We only look for occurrences of `slug: "<slug>",`.
  const re = new RegExp(`\\n\\\\s*slug:\\\\s*\"${slug}\",`, "g");
  let m;
  let idx = -1;
  let count = 0;
  while ((m = re.exec(text)) !== null) {
    if (count === n) {
      idx = m.index;
      break;
    }
    count++;
  }
  return idx;
}

const seen = new Map(); // slug -> occurrences
const slugStartIdxs = [];

for (const slug of slugMatches) {
  const prev = seen.get(slug) ?? 0;
  const idx = indexOfNthSlug(slug, prev);
  slugStartIdxs.push({ slug, idx });
  seen.set(slug, prev + 1);
}

slugStartIdxs.sort((a, b) => a.idx - b.idx);

const blocks = slugStartIdxs.map((s, i) => {
  const start = s.idx;
  const end = i + 1 < slugStartIdxs.length ? slugStartIdxs[i + 1].idx : text.length;
  return { slug: s.slug, block: text.slice(start, end) };
});

function extractInputNames(block) {
  // Extract inputs array content between `inputs: [` and `], calculate:`
  const inputsMatch = block.match(/inputs:\s*\[([\s\S]*?)\]\s*,\s*calculate:/m);
  if (!inputsMatch) return [];
  const names = [...inputsMatch[1].matchAll(/name:\s*"([^"]+)"/g)].map((m) => m[1]);
  return names;
}

function extractValueRefs(block) {
  // Identify `values.someKey` references in calculate().
  return [...block.matchAll(/values\.([A-Za-z0-9_]+)/g)].map((m) => m[1]);
}

let anyProblems = false;

for (const { slug, block } of blocks) {
  const inputNames = extractInputNames(block);
  const refs = extractValueRefs(block);
  const uniqueRefs = [...new Set(refs)];

  const missing = uniqueRefs.filter((k) => !inputNames.includes(k));
  if (missing.length > 0) {
    anyProblems = true;
    console.log(`- ${slug}: missing input names for values.* -> ${missing.join(", ")}`);
  }
}

if (!anyProblems) {
  console.log("OK: All `values.*` references match declared input `name`s (per calculator).");
} else {
  process.exitCode = 2;
}

