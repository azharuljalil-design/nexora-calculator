const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const nextDir = path.join(root, ".next");

fs.rmSync(nextDir, { recursive: true, force: true });

const nextBin = require.resolve("next/dist/bin/next");
const build = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: root,
  env: process.env,
  stdio: "inherit"
});

if (build.error) {
  console.error("Unable to start the Next.js production build:", build.error);
  process.exit(1);
}

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const manifests = ["build-manifest.json", "app-build-manifest.json"]
  .map((filename) => path.join(nextDir, filename))
  .filter((filename) => fs.existsSync(filename));

if (manifests.length === 0) {
  console.error("Production build verification failed: no build manifests found.");
  process.exit(1);
}

const referencedAssets = new Set();

function collectAssets(value) {
  if (Array.isArray(value)) {
    value.forEach(collectAssets);
    return;
  }

  if (value && typeof value === "object") {
    Object.values(value).forEach(collectAssets);
    return;
  }

  if (typeof value === "string" && value.startsWith("static/")) {
    referencedAssets.add(value);
  }
}

for (const manifest of manifests) {
  collectAssets(JSON.parse(fs.readFileSync(manifest, "utf8")));
}

const missingAssets = [...referencedAssets].filter(
  (asset) => !fs.existsSync(path.join(nextDir, asset))
);

if (missingAssets.length > 0) {
  console.error(
    `Production build verification failed. Missing assets:\n${missingAssets.join("\n")}`
  );
  process.exit(1);
}

console.log(
  `Verified ${referencedAssets.size} referenced Next.js static assets in .next/static.`
);
