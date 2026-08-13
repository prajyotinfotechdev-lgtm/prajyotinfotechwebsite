import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PRIVACY_MODE = true; // keep true to avoid revealing details

export default function Work() {
  // ---------------------------
  // 1) DATA (keep real data internal; we’ll display generic text)
  // ---------------------------
  const highlights = [
    { k: "50+", v: "Projects delivered" },
    { k: "7+", v: "Industries served" },
    { k: "6+", v: "Years experience" },
    { k: "∞", v: "Scalable stacks" },
  ];

  const logos = [
    { name: "RetailCo" },
    { name: "HotelNest" },
    { name: "ShopMax" },
    { name: "FoodFox" },
    { name: "EduCraft" },
    { name: "AutoKart" },
    { name: "FreshMart" },
  ];

  // Your internal list can stay rich; we just won’t expose details when PRIVACY_MODE is true.
  const allCases = [
    {
      id: "vyapaariyo",
      tag: "SaaS",
      title: "Vyapaariyo Catalog Platform",
      year: 2025,
      desc:
        "Multi-tenant catalog SaaS for sellers with Cloudinary media, role-based dashboards, and flexible pricing tiers.",
      metric: "20+ sellers onboarded in month 1",
      impact: 92,
      stack: ["React", "Node", "Express", "MongoDB", "Cloudinary"],
      highlights: [
        "Seller onboarding < 3 min with guided wizard",
        "Bulk import via CSV; image upscaling on upload",
        "Granular roles for sellers, managers, and admins",
      ],
      href: "#",
      cover: "",
    },
    {
      id: "jollybaba",
      tag: "E-commerce",
      title: "JollyBaba Mobiles Storefront",
      year: 2024,
      desc:
        "Dealer/Retail price toggle, fuzzy search with typo-fix, and animated cart funnel with WhatsApp fallbacks.",
      metric: "Search CTR ↑ 28% after fuzzy suggestions",
      impact: 88,
      stack: ["React", "Node", "MongoDB", "Razorpay", "Cloudinary"],
      highlights: [
        "Price visibility rules per role",
        "Search-as-you-type with typo tolerance",
        "One-tap cart → WhatsApp order handoff",
      ],
      href: "#",
      cover: "",
    },
    {
      id: "qrmenu",
      tag: "Hospitality",
      title: "QR Menu & Table Ordering",
      year: 2024,
      desc:
        "Table-aware menus with per-branch control, live status board, and WhatsApp-in-the-loop for confirmations.",
      metric: "Order time –35% with table routing",
      impact: 84,
      stack: ["React", "Node", "Express", "MongoDB", "WhatsApp Deep Links"],
      highlights: [
        "Branch-wise menus & availability toggles",
        "Kitchen screen with live status updates",
        "Order receipts to WhatsApp for guests",
      ],
      href: "#",
      cover: "",
    },
  ];

  // Generic titles shown publicly (no client/feature specifics)
  const GENERIC_TITLE_BY_TAG = {
    "SaaS": "B2B Catalog Platform",
    "E-commerce": "Dealer/Retail Storefront",
    "Hospitality": "QR Menu & Table Ordering",
  };
  const displayTitle = (c) =>
    PRIVACY_MODE ? (GENERIC_TITLE_BY_TAG[c.tag] || `${c.tag} Project`) : c.title;

  const TAGS = ["All", "SaaS", "E-commerce", "Hospitality"];

  // ---------------------------
  // 2) UI STATE
  // ---------------------------
  const [activeTag, setActiveTag] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(PRIVACY_MODE ? "year" : "impact"); // hide "impact" bias in privacy mode
  const [limit, setLimit] = useState(6);

  // ---------------------------
  // 3) DERIVED LIST (filter + search + sort)
  //    In privacy mode, search only across tag + generic title (not desc/stack)
  // ---------------------------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = allCases.filter((c) => (activeTag === "All" ? true : c.tag === activeTag));

    if (q) {
      if (PRIVACY_MODE) {
        list = list.filter(
          (c) =>
            displayTitle(c).toLowerCase().includes(q) ||
            c.tag.toLowerCase().includes(q)
        );
      } else {
        list = list.filter(
          (c) =>
            c.title.toLowerCase().includes(q) ||
            c.desc.toLowerCase().includes(q) ||
            c.stack.join(" ").toLowerCase().includes(q) ||
            c.tag.toLowerCase().includes(q)
        );
      }
    }

    list.sort((a, b) => {
      if (!PRIVACY_MODE && sortBy === "impact") return b.impact - a.impact;
      if (sortBy === "year") return b.year - a.year;
      return displayTitle(a).localeCompare(displayTitle(b));
    });

    return list;
  }, [activeTag, query, sortBy, allCases]);

  const shown = filtered.slice(0, limit);
  const canLoadMore = filtered.length > shown.length;

  // JSON-LD (privacy-safe names)
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: shown.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: displayTitle(c),
      url: "https://yourdomain.com/work",
    })),
  };

  // ---------------------------
  // 4) RENDER
  // ---------------------------
  return (
    <main className="mx-auto max-w-7xl px-4 py-14">
      {/* JSON-LD for visible items */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* HERO / PROMISE */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-slate-50 p-8 md:p-12 shadow-lg shadow-brand-500/5">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-800">
            Results we deliver.
          </h1>
          <p className="mt-3 text-slate-700">
            We build fast, reliable apps and websites that move metrics—while keeping client
            information private.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-200/50 blur-3xl"
        />

        {/* HIGHLIGHTS */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {highlights.map((h) => (
            <div
              key={h.k}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  {h.v}
                </span>
              </div>
              <div className="mt-2 text-3xl font-extrabold text-gradient">
                {h.k}
              </div>
            </div>
          ))}
        </div>

        {/* LOGOS (generic placeholders) */}
        <div className="relative mt-10 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Trusted by teams in
          </p>
          <div className="relative mt-4">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />
            <div className="flex items-center gap-4 overflow-x-auto pb-2 pr-2">
              {logos.map((l) => (
                <div
                  key={l.name}
                  className="h-10 min-w-28 select-none border border-slate-200 bg-slate-50 text-slate-500 flex items-center justify-center rounded-xl px-3 text-sm font-medium"
                  aria-label={l.name}
                  title={l.name}
                >
                  {l.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS (privacy-safe search/sort) */}
      <section className="mt-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setActiveTag(t);
                  setLimit(6);
                }}
                className={
                  "rounded-full border px-3 py-1 text-xs font-medium transition " +
                  (activeTag === t
                    ? "border-brand-600 bg-brand-50 text-brand-800"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50")
                }
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(6);
                }}
                placeholder="Search by category or keyword"
                className="w-full rounded-xl border border-slate-300 bg-white px-9 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-600"
                aria-label="Search projects"
              />
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="currentColor"
                aria-hidden
              >
                <path d="M10 2a8 8 0 015.3 13.9l4.4 4.4-1.4 1.4-4.4-4.4A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z" />
              </svg>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              Sort by
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setLimit(6);
                }}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
                aria-label="Sort projects"
              >
                {/* In privacy mode, avoid “Impact” sort */}
                {PRIVACY_MODE ? (
                  <>
                    <option value="year">Year</option>
                    <option value="title">Title</option>
                  </>
                ) : (
                  <>
                    <option value="impact">Impact</option>
                    <option value="year">Year</option>
                    <option value="title">Title</option>
                  </>
                )}
              </select>
            </label>
          </div>
        </div>
      </section>

      {/* GRID (privacy-safe tiles) */}
      <section className="mt-6">
        {shown.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
            No results. Try a different tag or search term.
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {shown.map((c) => (
              <article
                key={c.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Media (decorative only) */}
                <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-white">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200 backdrop-blur">
                    {c.tag}
                  </div>
                </div>

                {/* Content (generic) */}
                <div className="p-5">
                  <h3 className="text-base font-semibold tracking-tight text-slate-900">
                    {displayTitle(c)}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Representative project — specific details shared on request.
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      to="/contact#contact"
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-3 py-2 text-xs font-semibold text-white hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      Discuss similar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load more */}
        {canLoadMore && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setLimit((n) => n + 6)}
              className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2 text-sm font-semibold text-white hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* TESTIMONIALS (anonymous roles only) */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-2xl md:text-3xl font-black text-navy-800">Client feedback</h2>
          <span className="text-xs text-slate-500">Swipe on mobile</span>
        </div>

        <div className="relative mt-4">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />
          <div className="flex gap-4 overflow-x-auto pb-2 pr-2">
            {[
              {
                quote:
                  "They shipped our MVP in weeks. Clean UI, fast performance, and a clear handover.",
                role: "Founder, SaaS",
              },
              {
                quote:
                  "Search improvements made a big difference to sales. The team was proactive.",
                role: "Owner, Electronics Retail",
              },
              {
                quote:
                  "QR ordering reduced table wait times and staff load—exactly what we needed.",
                role: "Manager, Restaurant",
              },
            ].map((t, i) => (
              <figure
                key={i}
                className="min-w-[280px] max-w-sm flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <blockquote className="text-slate-800">{t.quote}</blockquote>
                <figcaption className="mt-3 text-sm text-slate-600">{t.role}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Keep it private, still effective.</h3>
            <p className="mt-1 text-slate-600">
              Tell us your goal. We’ll propose the fastest path—no confidential details needed.
            </p>
          </div>
          <Link
            to="/contact#contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-3 font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Get a proposal
          </Link>
        </div>
      </section>
    </main>
  );
}
