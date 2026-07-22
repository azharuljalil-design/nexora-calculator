const fs = require('fs');
const path = require('path');

const root = process.cwd();
const nextDir = path.join(root, '.next');
const staticDir = path.join(nextDir, 'static');
const manifests = ['build-manifest.json', 'app-build-manifest.json']
  .map((file) => path.join(nextDir, file))
  .filter((file) => fs.existsSync(file));

function fail(message) {
  console.error(`Static asset verification failed: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(nextDir)) fail('missing .next directory; run npm run build first.');
if (!fs.existsSync(staticDir)) fail('missing .next/static directory.');
if (manifests.length === 0) fail('missing Next.js build manifests.');

const requiredAssets = new Set();
function collect(value) {
  if (Array.isArray(value)) {
    value.forEach(collect);
    return;
  }
  if (value && typeof value === 'object') {
    Object.values(value).forEach(collect);
    return;
  }
  if (typeof value === 'string' && value.startsWith('static/')) {
    requiredAssets.add(value);
  }
}

for (const manifest of manifests) {
  collect(JSON.parse(fs.readFileSync(manifest, 'utf8')));
}

const missing = [...requiredAssets].filter(
  (asset) => !fs.existsSync(path.join(nextDir, asset))
);

if (missing.length > 0) {
  fail(`missing ${missing.length} manifest asset(s):\n${missing.join('\n')}`);
}

console.log(
  `Verified ${requiredAssets.size} Next.js static asset(s) from ${manifests.length} manifest(s).`
);
