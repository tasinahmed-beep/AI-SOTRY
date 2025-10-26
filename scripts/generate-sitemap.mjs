#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const GALLERY_DIR = path.join(ROOT, 'src', 'data', 'gallery');
const OUT_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://tasin.me';

async function exists(p){ try{ await fs.access(p); return true;} catch { return false; } }

async function main() {
  if (!(await exists(GALLERY_DIR))) {
    console.error('Gallery folder not found.');
    process.exit(1);
  }
  const urls = new Set([
    '/', '/about', '/privacy', '/terms', '/disclaimer'
  ]);
  for (const d of await fs.readdir(GALLERY_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const metaPath = path.join(GALLERY_DIR, d.name, 'meta.json');
    if (!(await exists(metaPath))) continue;
    urls.add(`/p/${d.name}`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
Array.from(urls).sort().map(u => `  <url><loc>${SITE_URL}${u}</loc></url>`).join('\n') +
`\n</urlset>\n`;

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, xml, 'utf8');
  console.log(`Sitemap written: ${OUT_PATH}`);
}

main().catch(e => { console.error(e); process.exit(1); });

