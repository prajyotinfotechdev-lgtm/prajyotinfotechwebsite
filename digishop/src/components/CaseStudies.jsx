import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studies = [
  {
    tag: "SaaS",
    title: "Vyapaariyo Catalog Platform",
    copy: "Seller websites with their own products, prices, and logos.",
    slug: "vyapaariyo-catalog-platform",
    image: "", // e.g. "/images/case/vyapaariyo.jpg"
    meta: "Node • React • MongoDB • Cloudinary",
  },
  {
    tag: "E-commerce",
    title: "JollyBaba Mobiles",
    copy: "Retail/Dealer prices, fast search, and a smooth cart.",
    slug: "jollybaba-mobiles",
    image: "",
    meta: "React • React Native • Express • UX Animations",
  },
  {
    tag: "Hospitality",
    title: "QR Menu & Ordering",
    copy: "Scan the table QR, view menu, order, and track in admin.",
    slug: "qr-menu-ordering",
    image: "",
    meta: "Next: Coupons • KDS • UPI",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

// Generic fallbacks shown in private mode
const REDACTED = {
  "SaaS": {
    title: "SaaS Platform (Catalog)",
    copy: "Multi-tenant catalog with roles, dashboards, and media management.",
    meta: "Modern stack • Role-based access • Media CDN",
  },
  "E-commerce": {
    title: "E-commerce Storefront",
    copy: "Role-based pricing, fast search with typo tolerance, smooth cart flow.",
    meta: "Search • Cart • Payments (optional)",
  },
  "Hospitality": {
    title: "QR Menu & Ordering",
    copy: "Table-aware menus, order routing, and simple admin tracking.",
    meta: "QR • Live status • WhatsApp handoff",
  },
};

function redactCard(c) {
  const g = REDACTED[c.tag] || {
    title: "Industry Project",
    copy: "Key workflows optimized for speed, UX, and maintainability.",
    meta: "Details available on request",
  };
  return {
    ...c,
    title: g.title,
    copy: g.copy,
    meta: g.meta,
    slug: "contact", // route to contact when redacted
  };
}

export default function CaseStudies({ privateMode = true }) {
  const cards = privateMode ? studies.map(redactCard) : studies;

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
          Selected work
        </h2>

        {privateMode ? (
          <Link
            to="/contact#contact"
            className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded px-1 transition-colors"
            aria-label="Request private case studies"
          >
            Request private demos →
          </Link>
        ) : (
          <Link
            to="/case-studies"
            className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded px-1 transition-colors"
            aria-label="View all case studies"
          >
            View all →
          </Link>
        )}
      </div>

      {privateMode && (
        <div className="mt-3 text-xs text-slate-500">
          We keep client identifiers and sensitive metrics private. Ask for a redacted walkthrough or a live demo.
        </div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((c) => {
          const href = privateMode ? "/contact#contact" : `/case-studies/${c.slug}`;
          const cta = privateMode ? "Request demo" : "Read case study";
          return (
            <motion.div key={c.slug} variants={item}>
              <Link
                to={href}
                className="group block rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-300
                           hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-200 hover:-translate-y-1
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={`${cta}: ${c.title}`}
                rel={privateMode ? "nofollow" : undefined}
              >
                {/* Cover */}
                <div className="relative aspect-[16/10]">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-slate-50 to-slate-100" />
                  )}
                  {/* Soft hover veil */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-navy-900/10 to-transparent" />
                  {/* Tag pill */}
                  <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold text-navy-800 ring-1 ring-brand-100 backdrop-blur shadow-sm">
                    {c.tag}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 md:p-6">
                  <h3 className="text-lg font-bold text-navy-800 group-hover:text-brand-700 transition-colors">
                    {c.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.copy}</p>

                  {c.meta && (
                    <div className="mt-4 text-[11px] text-slate-500">
                      {privateMode ? "Details shared on request • NDA-friendly" : c.meta}
                    </div>
                  )}

                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-700">
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{cta}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
