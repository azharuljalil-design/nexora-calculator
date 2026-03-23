const fs = require("fs");

const text = fs.readFileSync("src/calculators/calculatorRegistry.ts", "utf8");

// Match only top-level registry entries:
//   {
//     name: "...",
//     slug: "..."
//   }
// Input definitions also have `name:` but with deeper indentation.
const calculators = [...text.matchAll(
  /\r?\n\s*name:\s*"([^"]+)",\r?\n\s*slug:\s*"([^"]+)"/g
)].map((m) => ({ name: m[1], slug: m[2] }));

calculators.sort((a, b) => a.name.localeCompare(b.name));

for (const c of calculators) {
  console.log(`${c.name} — ${c.slug}`);
}

console.log(`\nTotal: ${calculators.length}`);

