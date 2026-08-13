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
        <nav aria-label="Breadcrumb" className={`relative z-20 w-full max-w-7xl mx-auto px-4 pt-6 pb-2 ${className}`}>
          <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200/70 bg-white/60 px-4 py-2 text-[13px] font-medium text-slate-500 backdrop-blur-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]">
            {items.map((it, i) => {
              const isLast = i === items.length - 1;
              const label = String(it.name || "").trim() || "Untitled";
              
              return (
                <li key={`${label}-${i}`} className="inline-flex items-center gap-2">
                  {i > 0 && (
                    <svg className="size-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                  {isLast || !(it.url || it.to) ? (
                    <span aria-current="page" className="font-semibold text-brand-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100/50 shadow-sm flex items-center gap-1.5">
                      {label}
                    </span>
                  ) : (
                    <Link to={it.to || (it.url ? new URL(it.url, 'http://localhost').pathname : '/')} className="flex items-center gap-1.5 rounded-full hover:text-brand-600 hover:bg-slate-100/50 px-2 py-0.5 transition-all">
                      {i === 0 && (
                        <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.99 9a.75.75 0 1 1-1.06 1.06l-4.21-4.215V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-2a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75H4.5A2.25 2.25 0 0 1 2.25 19.5v-9.814l-4.21 4.215a.75.75 0 0 1-1.06-1.06l8.99-9Z" />
                        </svg>
                      )}
                      {label}
                    </Link>
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
