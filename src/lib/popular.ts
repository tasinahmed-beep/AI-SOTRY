import type { ImageData } from "@/components/ImageGrid";

export function getPopularTags(images: ImageData[], limit = 10): string[] {
  const counts = new Map<string, { key: string; count: number }>();
  for (const img of images) {
    const tags = (img.tags || []).map((t) => t.trim()).filter(Boolean);
    const seen = new Set<string>();
    for (const t of tags) {
      const k = t.toLowerCase();
      if (seen.has(k)) continue; // avoid double counting same tag per item
      seen.add(k);
      const cur = counts.get(k) || { key: t, count: 0 };
      // keep the first-cased form we see (for display)
      if (!counts.has(k)) counts.set(k, { key: t, count: 1 });
      else counts.set(k, { key: cur.key, count: cur.count + 1 });
    }
  }
  const arr = Array.from(counts.values());
  arr.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.key.localeCompare(b.key);
  });
  return arr.slice(0, limit).map((x) => x.key);
}

