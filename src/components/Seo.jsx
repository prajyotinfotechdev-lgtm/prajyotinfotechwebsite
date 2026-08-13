import { useEffect } from "react";
import SeoLite from "./SeoLite.jsx";

/** Optional “advanced” SEO wrapper (now handles JSON-LD Schema). */
export default function Seo(props) {
  const { schema, ...liteProps } = props;

  useEffect(() => {
    if (!schema) return;

    // Convert schema to an array if it's a single object
    const schemas = Array.isArray(schema) ? schema : [schema];
    const scriptTags = [];

    schemas.forEach((schemaObj) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
      scriptTags.push(script);
    });

    return () => {
      // Cleanup script tags on unmount
      scriptTags.forEach((script) => document.head.removeChild(script));
    };
  }, [schema]);

  return <SeoLite {...liteProps} />; // still returns null visually
}
