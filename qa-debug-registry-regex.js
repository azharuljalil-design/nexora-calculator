const fs = require("fs");
const text = fs.readFileSync("src/calculators/calculatorRegistry.ts", "utf8");

const idx = text.indexOf('name: "Percentage Calculator"');
console.log("index of name phrase:", idx);
if (idx !== -1) {
  console.log("slice:", JSON.stringify(text.slice(idx, idx + 80)));
}

const pattern1 = /\n\s*name:\s*"([^"]+)",\n\s*slug:\s*"([^"]+)"/g;
const m1 = [...text.matchAll(pattern1)];
console.log("pattern1 matches:", m1.length);
if (m1[0]) console.log("first:", m1[0][1], m1[0][2]);

