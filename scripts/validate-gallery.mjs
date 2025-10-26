#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

const GALLERY_ROOT = path.join(process.cwd(), 'src', 'data', 'gallery');
const IMAGE_BASENAME = 'image';
const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function readDirSafe(dir) {
  try {
    return await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

function isAspectRatio(str) {
  return typeof str === 'string' && /^\d+\s*:\s*\d+$/.test(str.trim());
}

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isStringArray(v) {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

async function main() {
  const errors = [];
  const warnings = [];
  const items = [];

  if (!(await exists(GALLERY_ROOT))) {
    console.log('No gallery folder found at', GALLERY_ROOT);
    process.exit(0);
  }

  const dirs = (await readDirSafe(GALLERY_ROOT)).filter((d) => d.isDirectory());

  for (const dirent of dirs) {
    const dir = path.join(GALLERY_ROOT, dirent.name);
    const metaPath = path.join(dir, 'meta.json');
    if (!(await exists(metaPath))) {
      errors.push(`[${dirent.name}] Missing meta.json`);
      continue;
    }

    let meta;
    try {
      const raw = await fs.readFile(metaPath, 'utf8');
      meta = JSON.parse(raw);
    } catch (e) {
      errors.push(`[${dirent.name}] Invalid JSON in meta.json: ${(e && e.message) || e}`);
      continue;
    }

    const ctx = `[${dirent.name}]`;
    let changed = false;

    // Enforce removal of deprecated meta.file and auto-fix
    if (Object.prototype.hasOwnProperty.call(meta, 'file')) {
      delete meta.file;
      changed = true;
      warnings.push(`${ctx} Removed deprecated 'file' field (auto-fixed)`);
    }

    // Required fields
    if (!isNonEmptyString(meta.id)) errors.push(`${ctx} Missing/invalid id`);
    if (!isNonEmptyString(meta.title)) errors.push(`${ctx} Missing/invalid title`);
    if (!isNonEmptyString(meta.prompt)) errors.push(`${ctx} Missing/invalid prompt`);
    if (!isNonEmptyString(meta.negativePrompt)) errors.push(`${ctx} Missing/invalid negativePrompt`);
    if (!isNonEmptyString(meta.style)) errors.push(`${ctx} Missing/invalid style`);
    if (!isAspectRatio(meta.aspectRatio)) errors.push(`${ctx} aspectRatio should look like "5:7" or "16:9"`);
    if (!isNonEmptyString(meta.size)) errors.push(`${ctx} Missing/invalid size`);
    if (!(meta.orientation === 'portrait' || meta.orientation === 'landscape')) errors.push(`${ctx} orientation must be 'portrait' or 'landscape'`);
    if (!isStringArray(meta.tags) || meta.tags.length === 0) errors.push(`${ctx} tags must be a non-empty string array`);

    // Extended constraints
    if (isNonEmptyString(meta.title)) {
      const len = meta.title.trim().length;
      if (len < 3 || len > 120) errors.push(`${ctx} title length must be 3-120 chars (got ${len})`);
    }
    if (isNonEmptyString(meta.prompt)) {
      const len = meta.prompt.trim().length;
      if (len < 10 || len > 1500) errors.push(`${ctx} prompt length must be 10-1500 chars (got ${len})`);
    }
    if (isNonEmptyString(meta.negativePrompt)) {
      const len = meta.negativePrompt.trim().length;
      if (len > 1500) errors.push(`${ctx} negativePrompt too long (max 1500, got ${len})`);
    }
    if (isStringArray(meta.tags)) {
      if (meta.tags.length > 10) errors.push(`${ctx} too many tags (max 10, got ${meta.tags.length})`);
      const badTag = meta.tags.find((t) => typeof t !== 'string' || t.trim().length < 1 || t.trim().length > 32);
      if (badTag !== undefined) errors.push(`${ctx} each tag must be 1-32 chars`);
    }

    // Image presence (only folder image.* is accepted)
    let hasFolderImage = false;
    for (const ext of IMAGE_EXTS) {
      const p = path.join(dir, IMAGE_BASENAME + ext);
      if (await exists(p)) { hasFolderImage = true; break; }
    }
    if (!hasFolderImage) {
      errors.push(`${ctx} No image found. Add ${IMAGE_BASENAME}.{${IMAGE_EXTS.map((e) => e.slice(1)).join('|')}}`);
    }

    items.push({ id: String(meta.id), dir: dirent.name });

    // If auto-fixed, write back with a stable key order
    if (changed) {
      const ordered = {
        id: meta.id,
        title: meta.title,
        prompt: meta.prompt,
        negativePrompt: meta.negativePrompt,
        style: meta.style,
        aspectRatio: meta.aspectRatio,
        size: meta.size,
        orientation: meta.orientation,
        tags: meta.tags,
        ...(meta.description ? { description: meta.description } : {}),
      };
      await fs.writeFile(metaPath, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
    }
  }

  // Check id uniqueness
  const seen = new Map();
  for (const it of items) {
    if (seen.has(it.id)) {
      errors.push(`Duplicate id: '${it.id}' in folders '${seen.get(it.id)}' and '${it.dir}'`);
    } else {
      seen.set(it.id, it.dir);
    }
  }

  // Output
  if (warnings.length) {
    console.log('Warnings:');
    for (const w of warnings) console.log(' -', w);
    console.log('');
  }
  if (errors.length) {
    console.error('Errors:');
    for (const e of errors) console.error(' -', e);
    console.error(`\nValidation failed: ${errors.length} error(s)`);
    process.exit(1);
  } else {
    console.log(`Gallery OK: ${items.length} item(s) validated`);
  }
}

main().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

