#!/usr/bin/env node
// Simple prerender: builds static HTML for key routes and /p/:id by launching a local server and using Puppeteer.
// Usage: npm run build && npm run prerender
// Requires: puppeteer (npm i -D puppeteer)

import { promises as fs } from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const DIST = path.join(process.cwd(), 'dist');
const GALLERY = path.join(process.cwd(), 'src', 'data', 'gallery');
const PORT = 4173; // default vite preview port

async function exists(p){ try{ await fs.access(p); return true; } catch { return false; } }

function serveDist() {
  const server = http.createServer(async (req, res) => {
    try {
      let urlPath = req.url || '/';
      if (urlPath.endsWith('/')) urlPath += 'index.html';
      const filePath = path.join(DIST, decodeURIComponent(urlPath.replace(/^\//, '')));
      const ext = path.extname(filePath).toLowerCase();
      const type = ext === '.html' ? 'text/html' : ext === '.js' ? 'text/javascript' : ext === '.css' ? 'text/css' : undefined;
      const data = await fs.readFile(filePath);
      if (type) res.setHeader('Content-Type', type);
      res.end(data);
    } catch (e) {
      // fallback to index.html for SPA
      try {
        const index = await fs.readFile(path.join(DIST, 'index.html'));
        res.setHeader('Content-Type', 'text/html');
        res.end(index);
      } catch (err) {
        res.statusCode = 404; res.end('Not Found');
      }
    }
  });
  return new Promise(resolve => server.listen(PORT, () => resolve(server)));
}

async function collectRoutes() {
  const base = ['/', '/about', '/contact', '/privacy', '/terms', '/disclaimer'];
  if (!(await exists(GALLERY))) return base;
  const dirs = await fs.readdir(GALLERY, { withFileTypes: true });
  for (const d of dirs) if (d.isDirectory()) base.push(`/p/${d.name}`);
  return base;
}

async function prerender() {
  let puppeteer;
  try { puppeteer = (await import('puppeteer')).default; }
  catch { console.error('Install puppeteer: npm i -D puppeteer'); process.exit(1); }

  if (!(await exists(DIST))) { console.error('dist/ not found. Run: npm run build'); process.exit(1); }

  /** @type {import('http').Server} */
  const server = await serveDist();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const routes = await collectRoutes();

  for (const route of routes) {
    const url = `http://localhost:${PORT}${route}`;
    console.log('Prerender', url);
    await page.goto(url, { waitUntil: 'networkidle0' });
    // allow client-side meta/JSON-LD to attach
    await page.waitForTimeout(150);
    const html = await page.content();
    const outDir = path.join(DIST, route);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, 'index.html'), html, 'utf8');
  }

  await browser.close();
  server.close();
  console.log('Prerender complete.');
}

prerender().catch((e) => { console.error(e); process.exit(1); });
