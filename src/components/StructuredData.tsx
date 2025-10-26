import { useEffect } from "react";

interface StructuredDataProps {
  data: object | null | undefined;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  useEffect(() => {
    if (!data) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "ld-json-primary";
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [data]);

  return null;
};

export default StructuredData;

