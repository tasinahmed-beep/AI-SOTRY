import type { ImageData } from "@/components/ImageGrid";

type Meta = Omit<ImageData, "src"> & {
  file: string;
  description?: string;
};

export function loadGallery(): ImageData[] {
  const metaModules = import.meta.glob("./gallery/**/meta.json", { eager: true }) as Record<string, { default: Meta }>;
  const imageModules = import.meta.glob("../assets/**/*.{jpg,png,webp}", { eager: true }) as Record<string, any>;
  const folderImageModules = import.meta.glob("./gallery/**/image.{jpg,png,webp}", { eager: true }) as Record<string, any>;
  const responsiveModules = import.meta.glob("./gallery/**/image-*.webp", { eager: true }) as Record<string, any>;
  const generatedMetaModules = import.meta.glob("./gallery/**/meta.generated.json", { eager: true }) as Record<string, { default: { width?: number; height?: number; placeholder?: string } }>;

  const imageByName = new Map<string, string>();
  for (const [path, mod] of Object.entries(imageModules)) {
    const url: string = (mod as any).default || (mod as any);
    const name = path.split("/").pop() as string;
    imageByName.set(name, url);
  }

  const folderImageByDir = new Map<string, string>();
  for (const [path, mod] of Object.entries(folderImageModules)) {
    const url: string = (mod as any).default || (mod as any);
    const dir = path.slice(0, path.lastIndexOf("/"));
    folderImageByDir.set(dir, url);
  }

  // Build srcset by folder from generated webp sizes (image-400w.webp, etc.)
  const srcSetByDir = new Map<string, string>();
  const widthRe = /image-(\d+)w\.webp$/;
  const byDirTemp = new Map<string, Array<{ w: number; url: string }>>();
  for (const [p, mod] of Object.entries(responsiveModules)) {
    const url: string = (mod as any).default || (mod as any);
    const dir = p.slice(0, p.lastIndexOf("/"));
    const m = p.match(widthRe);
    const w = m ? Number(m[1]) : 0;
    if (!byDirTemp.has(dir)) byDirTemp.set(dir, []);
    byDirTemp.get(dir)!.push({ w, url });
  }
  for (const [dir, arr] of byDirTemp.entries()) {
    arr.sort((a, b) => a.w - b.w);
    const srcset = arr.filter(x => x.w > 0).map((x) => `${x.url} ${x.w}w`).join(", ");
    if (srcset) srcSetByDir.set(dir, srcset);
  }

  // generated meta per dir
  const genByDir = new Map<string, { width?: number; height?: number; placeholder?: string }>();
  for (const [p, gm] of Object.entries(generatedMetaModules)) {
    const dir = p.slice(0, p.lastIndexOf("/"));
    genByDir.set(dir, gm.default);
  }

  const items: ImageData[] = [];
  for (const [path, m] of Object.entries(metaModules)) {
    const meta = m.default;
    const dir = path.slice(0, path.lastIndexOf("/"));
    const folderSrc = folderImageByDir.get(dir);
    const src = folderSrc || imageByName.get(meta.file);
    if (!src) continue;
    items.push({
      id: meta.id,
      src,
      srcSet: srcSetByDir.get(dir),
      width: genByDir.get(dir)?.width,
      height: genByDir.get(dir)?.height,
      placeholder: genByDir.get(dir)?.placeholder,
      title: meta.title,
      prompt: meta.prompt,
      negativePrompt: meta.negativePrompt,
      style: meta.style,
      aspectRatio: meta.aspectRatio,
      size: meta.size,
      orientation: meta.orientation,
      tags: meta.tags,
    });
  }

  // Sort by numeric id if possible
  items.sort((a, b) => Number(a.id) - Number(b.id));
  return items;
}
