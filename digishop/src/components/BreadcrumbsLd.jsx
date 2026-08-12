// src/components/Breadcrumbs.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({
  items = [],
  baseUrl,
  visible = true,        // allow force-hiding if needed
  minVisible = 2,        // show nav only when >= 2 items
  className = "",
}) {
  const abs = (u) => {
    if (!u) return null;
    try {
      return new URL(
        u,
        baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://example.com")
      ).href;
    } catch {
      return null;
    }
  };

  const listForLd = useMemo(() => {
    const list = items
      .map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: String(it.name || "").trim(),
        item: abs(it.url || it.to || null),
      }))
      .map((it) => (it.item ? it : { position: it.position, name: it.name, "@type": "ListItem" }))
      .filter((it) => it.name);

    // Don’t emit LD if it’s a single crumb (not useful)
    if (list.length < 2) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: list,
    };
  }, [items, baseUrl]);

  const showVisible = visible && items.filter((it) => String(it.name || "").trim()).length >= minVisible;

  return (
    <>
      {showVisible && (
        <nav aria-label="Breadcrumb" className={`text-sm text-slate-600 ${className}`}>
          <ol className="flex flex-wrap items-center gap-1">
            {items.map((it, i) => {
              const isLast = i === items.length - 1;
              const label = String(it.name || "").trim() || "Untitled";
              return (
                <li key={`${label}-${i}`} className="inline-flex items-center gap-1">
                  {i > 0 && <span aria-hidden className="text-slate-400">/</span>}
                  {isLast || !(it.url || it.to) ? (
                    <span aria-current="page" className="font-medium text-slate-900">{label}</span>
                  ) : it.to ? (
                    <Link to={it.to} className="px-1 rounded hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
                      {label}
                    </Link>
                  ) : (
                    <a href={it.url} className="px-1 rounded hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500">
                      {label}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {listForLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listForLd) }} />
      )}
    </>
  );
}
