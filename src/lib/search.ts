import type { ImageData } from "@/components/ImageGrid";

// Lightweight fuzzy filter without external deps.
// - Tokenizes query by spaces
// - A match occurs if every token appears in title, any tag, or prompt
// - Sorts results by a simple score: title hits > tag hits > prompt hits, then by title length
export function filterImagesFuzzy(images: ImageData[], query: string): ImageData[] {
  const q = query.trim().toLowerCase();
  if (!q) return images;
  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = images
    .map((img) => {
      const title = img.title.toLowerCase();
      const prompt = img.prompt.toLowerCase();
      const tags = (img.tags || []).map((t) => t.toLowerCase());

      let titleHits = 0;
      let tagHits = 0;
      let promptHits = 0;

      for (const t of tokens) {
        const inTitle = title.includes(t);
        const inTags = tags.some((tg) => tg.includes(t));
        const inPrompt = prompt.includes(t);
        if (!inTitle && !inTags && !inPrompt) {
          return null; // fails AND requirement
        }
        titleHits += inTitle ? 1 : 0;
        tagHits += inTags ? 1 : 0;
        promptHits += inPrompt ? 1 : 0;
      }

      const score = titleHits * 3 + tagHits * 2 + promptHits * 1;
      return { img, score };
    })
    .filter((x): x is { img: ImageData; score: number } => x !== null)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.img.title.length - b.img.title.length;
    });

  return scored.map((s) => s.img);
}

