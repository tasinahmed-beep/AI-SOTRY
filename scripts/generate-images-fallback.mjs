#!/usr/bin/env node
// Fallback generator: derives width/height from meta.size and writes meta.generated.json.
// Does NOT create responsive image files. Use scripts/generate-images.mjs with `sharp` for full output.

import { promises as fs } from 'node:fs';
import path from 'node:path';

const GALLERY_ROOT = path.join(process.cwd(), 'src', 'data', 'gallery');

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

async function main() {
  if (!(await exists(GALLERY_ROOT))) {
    console.log('No gallery found at', GALLERY_ROOT);
    process.exit(0);
  }
  const dirs = await fs.readdir(GALLERY_ROOT, { withFileTypes: true });
  let updated = 0;
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const dir = path.join(GALLERY_ROOT, d.name);
    const metaPath = path.join(dir, 'meta.json');
    if (!(await exists(metaPath))) continue;
    const genPath = path.join(dir, 'meta.generated.json');

    // Skip if full responsive images already exist
    const hasAnyResponsive = (await fs.readdir(dir)).some((f) => /^image-\d+w\.webp$/i.test(f));
    if (hasAnyResponsive && (await exists(genPath))) continue;

    let meta;
    try { meta = JSON.parse(await fs.readFile(metaPath, 'utf8')); } catch { continue; }
    const sizeStr = String(meta.size || '').toLowerCase();
    const m = sizeStr.match(/(\d+)\s*[x×]\s*(\d+)/i);
    if (!m) continue;
    const width = Number(m[1]);
    const height = Number(m[2]);
    if (!width || !height) continue;

    const payload = { width, height };
    try {
      await fs.writeFile(genPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
      updated++;
    } catch {}
  }
  console.log(`Fallback wrote/updated meta for ${updated} item(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); });

