import { useEffect } from "react";

const SiteStructuredData = () => {
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const data = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PromptVerse",
      url: origin || "https://example.com",
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ld-json-website";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, []);
  return null;
};

export default SiteStructuredData;

