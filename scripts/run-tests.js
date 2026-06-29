const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, ".tmp-test");
const tscBin = path.join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tsc.cmd" : "tsc"
);

fs.rmSync(outDir, { recursive: true, force: true });

execFileSync(
  tscBin,
  [
    "--outDir",
    outDir,
    "--module",
    "commonjs",
    "--moduleResolution",
    "node",
    "--target",
    "es2020",
    "--skipLibCheck",
    "tests/financialMath.test.ts",
    "src/lib/financialMath.ts"
  ],
  { cwd: root, stdio: "inherit" }
);

execFileSync(
  process.execPath,
  ["--test", path.join(outDir, "tests", "financialMath.test.js")],
  { cwd: root, stdio: "inherit" }
);
