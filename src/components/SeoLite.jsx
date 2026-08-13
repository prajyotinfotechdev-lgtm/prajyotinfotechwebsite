import { useEffect } from "react";

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (v == null || v === "") return;
    el.setAttribute(k, v);
  });
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SeoLite({
  title = "",
  description = "",
  keywords = "",
  path = "",
  image = "",
  siteName = "Prajyot Infotech",
  baseUrl = "https://prajyotinfotech.in",
}) {
  useEffect(() => {
    // Title
    const pageTitle = title ? `${title} — ${siteName}` : siteName;
    document.title = pageTitle;

    // Canonical
    const canonical = path ? `${baseUrl.replace(/\/$/, "")}${path}` : baseUrl;
    upsertLink("canonical", canonical);

    // Basic meta
    if (description) {
      upsertMeta('meta[name="description"]', { name: "description", content: description });
    }
    if (keywords) {
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });
    }

    // Open Graph
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: siteName });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    if (description) {
      upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    }
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    if (image) {
      upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    }

    // Twitter
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    if (description) {
      upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });
    }
    if (image) {
      upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });
    }
  }, [title, description, path, image, siteName, baseUrl]);

  return null; // ← IMPORTANT: nothing renders in the page
}
