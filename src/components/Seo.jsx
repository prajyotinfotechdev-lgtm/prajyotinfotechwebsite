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
      script.setAttribute("data-seo-runtime", "true");
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
      scriptTags.push(script);
    });

    // Remove static prerender route JSON-LD once client SPA hydrates matching route
    const prerenderScripts = document.head.querySelectorAll('script[data-prerender-ld="true"]');
    prerenderScripts.forEach((el) => el.parentNode?.removeChild(el));

    return () => {
      // Cleanup script tags on unmount
      scriptTags.forEach((script) => script.parentNode?.removeChild(script));
    };
  }, [schema]);

  return <SeoLite {...liteProps} />; // still returns null visually
}
