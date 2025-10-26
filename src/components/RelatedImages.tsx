import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { ImageData } from "@/components/ImageGrid";
import { loadGallery } from "@/data/loadGallery";

interface RelatedImagesProps {
  current: ImageData;
}

const ITEMS_PER_PAGE = 12;

const RelatedImages = ({ current }: RelatedImagesProps) => {
  const all = useMemo(() => loadGallery(), []);

  const related = useMemo(() => {
    const currTags = new Set((current.tags || []).map((t) => t.toLowerCase()));
    return all
      .filter((img) => img.id !== current.id)
      .map((img) => {
        const tags = (img.tags || []).map((t) => t.toLowerCase());
        const shared = tags.reduce((acc, t) => acc + (currTags.has(t) ? 1 : 0), 0);
        const styleBoost = img.style === current.style ? 0.5 : 0;
        const orientationBoost = img.orientation === current.orientation ? 0.2 : 0;
        const score = shared + styleBoost + orientationBoost;
        return { img, score };
      })
      .filter((x) => x.score > 0) // must share something in common
      .sort((a, b) => b.score - a.score)
      .map((x) => x.img);
  }, [all, current]);

  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState<ImageData[]>([]);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPage(1);
    setVisible(related.slice(0, ITEMS_PER_PAGE));
  }, [related]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => {
            const next = p + 1;
            setVisible(related.slice(0, next * ITEMS_PER_PAGE));
            return next;
          });
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [related]);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Related Images</h3>
        <span className="text-sm text-muted-foreground">{related.length} found</span>
      </div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-2 md:gap-3 lg:gap-4">
        {visible.map((image, idx) => (
          <RelatedTile key={image.id} image={image} index={idx} />
        ))}
      </div>
      {visible.length < related.length && (
        <div ref={loaderRef} className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        </div>
      )}
    </section>
  );
};

export default RelatedImages;

function RelatedTile({ image, index }: { image: ImageData; index: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link
      to={`/p/${image.id}`}
      aria-label={`Open ${image.title}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      className={"glass-panel group relative inline-block w-full break-inside-avoid rounded-xl overflow-hidden bg-background/40 backdrop-blur-sm border border-white/10 shadow-sm hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 hover:ring-1 hover:ring-primary/30 transition-all duration-300 cursor-pointer mb-2 md:mb-3 lg:mb-4"}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-white/10 to-transparent" />
      <img
        src={image.src}
        srcSet={image.srcSet}
        alt={image.title}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(min-width:1280px) 16vw, (min-width:1024px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
        onLoad={() => setLoaded(true)}
        className={`block w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${loaded ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-2 left-2 right-2 text-white text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {image.title}
      </div>
    </Link>
  );
}
