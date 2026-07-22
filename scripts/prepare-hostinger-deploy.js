const fs = require('fs');
const path = require('path');

const root = process.cwd();
const sourceStandalone = path.join(root, '.next', 'standalone');
const sourceStatic = path.join(root, '.next', 'static');
const sourcePublic = path.join(root, 'public');
const deployDir = path.join(root, '.hostinger-deploy');

function fail(message) {
  console.error(`Hostinger deploy preparation failed: ${message}`);
  process.exit(1);
}

for (const requiredPath of [sourceStandalone, sourceStatic]) {
  if (!fs.existsSync(requiredPath)) {
    fail(`missing ${path.relative(root, requiredPath)}; run npm run build:hostinger first.`);
  }
}

fs.rmSync(deployDir, { recursive: true, force: true });
fs.cpSync(sourceStandalone, deployDir, { recursive: true });
fs.mkdirSync(path.join(deployDir, '.next'), { recursive: true });
fs.cpSync(sourceStatic, path.join(deployDir, '.next', 'static'), { recursive: true });

if (fs.existsSync(sourcePublic)) {
  fs.cpSync(sourcePublic, path.join(deployDir, 'public'), { recursive: true });
}

console.log('Prepared .hostinger-deploy with standalone server, .next/static, and public assets.');
console.log('Upload the contents of .hostinger-deploy to Hostinger, then restart the Node.js app.');
