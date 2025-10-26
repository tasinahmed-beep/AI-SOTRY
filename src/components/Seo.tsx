import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
}

const Seo = ({ title, description, canonical }: SeoProps) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Open Graph
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);
    }
    if (description) {
      let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);
    }
    if (canonical) {
      let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', canonical);
    }

    // Twitter
    if (title) {
      let twTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
      if (!twTitle) {
        twTitle = document.createElement('meta');
        twTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twTitle);
      }
      twTitle.setAttribute('content', title);
    }
    if (description) {
      let twDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
      if (!twDesc) {
        twDesc = document.createElement('meta');
        twDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twDesc);
      }
      twDesc.setAttribute('content', description);
    }
  }, [title, description, canonical]);

  return null;
};

export default Seo;
