#!/usr/bin/env node
// Generates responsive images (webp) and a small blur placeholder for each gallery item.
// Requires: sharp (and optionally blurhash for a hash string)
// Install: npm i -D sharp
// Usage: node scripts/generate-images.mjs

import { promises as fs } from 'node:fs';
import path from 'node:path';

const GALLERY_ROOT = path.join(process.cwd(), 'src', 'data', 'gallery');
const INPUT_NAME = 'image.jpg'; // also accepts .png/.webp automatically
const SIZES = [400, 800, 1200];

async function exists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function findInput(baseDir) {
  const candidates = ['.jpg', '.jpeg', '.png', '.webp'].map(ext => path.join(baseDir, 'image' + ext));
  for (const c of candidates) if (await exists(c)) return c;
  return null;
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.error('Missing dependency: sharp. Install with: npm i -D sharp');
    process.exit(1);
  }

  if (!(await exists(GALLERY_ROOT))) {
    console.error('Gallery not found at', GALLERY_ROOT);
    process.exit(1);
  }

  const dirs = await fs.readdir(GALLERY_ROOT, { withFileTypes: true });
  let processed = 0;
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const dir = path.join(GALLERY_ROOT, d.name);
    const input = await findInput(dir);
    if (!input) { console.warn(`[${d.name}] No input image.* found`); continue; }

    const img = sharp(input);
    const meta = await img.metadata();

    for (const w of SIZES) {
      if (meta.width && meta.width < w) continue; // skip upscaling
      const out = path.join(dir, `image-${w}w.webp`);
      await img.resize({ width: w }).webp({ quality: 76 }).toFile(out);
    }

    // Optional tiny placeholder (base64)
    const tiny = await img.resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
    const placeholder = `data:image/webp;base64,${tiny.toString('base64')}`;
    const genMetaPath = path.join(dir, 'meta.generated.json');
    const gen = { width: meta.width, height: meta.height, placeholder };
    await fs.writeFile(genMetaPath, JSON.stringify(gen, null, 2) + '\n', 'utf8');

    processed++;
    console.log(`[${d.name}] done`);
  }

  console.log(`Generated responsive images for ${processed} item(s).`);
}

main().catch((e) => { console.error(e); process.exit(1); });

