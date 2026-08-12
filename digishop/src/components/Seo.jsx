import { useEffect } from "react";
import SeoLite from "./SeoLite.jsx";

/** Optional “advanced” SEO wrapper (currently just SeoLite). */
export default function Seo(props) {
  // You can add extra tags/structured data here if needed.
  useEffect(() => {
    // keep for future extensions
  }, [props]);

  return <SeoLite {...props} />; // still returns null visually
}
