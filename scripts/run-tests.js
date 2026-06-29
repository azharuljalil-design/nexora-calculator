const { execFileSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, ".tmp-test");
const tsconfigPath = path.join(outDir, "tsconfig.tests.json");
const tscBin = path.join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "tsc.cmd" : "tsc"
);

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  tsconfigPath,
  JSON.stringify(
    {
      compilerOptions: {
        outDir,
        module: "commonjs",
        moduleResolution: "node",
        baseUrl: root,
        paths: { "@/*": ["src/*"] },
        target: "es2020",
        skipLibCheck: true
      },
      files: [
        path.join(root, "tests/financialMath.test.ts"),
        path.join(root, "src/lib/financialMath.ts"),
        path.join(root, "src/calculators/calculatorRegistry.ts"),
        path.join(root, "src/lib/format.ts"),
        path.join(root, "src/lib/conversions.ts"),
        path.join(root, "src/lib/mathExpression.ts")
      ]
    },
    null,
    2
  )
);

execFileSync(tscBin, ["-p", tsconfigPath], { cwd: root, stdio: "inherit" });

execFileSync(
  process.execPath,
  ["--test", path.join(outDir, "tests", "financialMath.test.js")],
  { cwd: root, stdio: "inherit" }
);
