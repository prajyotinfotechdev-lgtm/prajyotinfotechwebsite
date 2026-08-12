import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_ITEMS = [
  {
    title: "Design system",
    desc: "Clear tokens for fonts, colors, spacing, and reusable UI parts.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
    bullets: ["Figma → production parity", "Consistent theming & spacing"],
  },
  {
    title: "Full-stack delivery",
    desc: "Frontend + backend with CI/CD, hosting, and monitoring.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M4 12h16" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="9.5" r="0.9" fill="currentColor" />
        <circle cx="11" cy="9.5" r="0.9" fill="currentColor" />
        <circle cx="14" cy="9.5" r="0.9" fill="currentColor" />
      </svg>
    ),
    bullets: ["Zero-downtime deploys", "Observability & alerts"],
  },
  {
    title: "SEO & speed",
    desc: "Core Web Vitals, schema, sitemaps, and fast loads.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M3 12h6l2-3 2 6 2-4 2 1h2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="5" cy="18" r="1" fill="currentColor" />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
        <circle cx="19" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
    bullets: ["Lighthouse A+ targets", "OpenGraph & structured data"],
  },
  {
    title: "Easy CMS",
    desc: "Sanity/Contentful/Strapi so you can edit without code.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 5h16v14H4z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bullets: ["Drafts & previews", "Role-based access"],
  },
  {
    title: "Payments & auth",
    desc: "Razorpay/Stripe, OTP login, and secure sessions.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M3 11h18" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    bullets: ["PCI-aware flows", "JWT / Firebase Auth"],
  },
  {
    title: "Analytics & A/B",
    desc: "Track funnels and test features safely.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 20V10m6 10V6m6 14V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bullets: ["GA4/Pixel", "Server events & experiments"],
  },
  {
    title: "Accessibility",
    desc: "Keyboard support, color contrast, and ARIA semantics.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <circle cx="12" cy="5" r="2" fill="currentColor" />
        <path d="M5 9h14M8 9l4 10m4-10l-4 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    bullets: ["WCAG-friendly patterns", "Reduced-motion fallbacks"],
  },
  {
    title: "Support & handover",
    desc: "Clear docs, admin training, and safe updates.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M4 7h16v10H4z" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 7V5h8v2" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    bullets: ["Runbooks & checklists", "Versioned releases"],
  },
];

export default function Features({
  title = "What we build",
  subtitle = "End-to-end delivery with clean design and fast performance.",
  items = DEFAULT_ITEMS,
  id = "services",
}) {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-slate-600 text-lg">{subtitle}</p>}

      <motion.div
        role="list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((it) => (
          <motion.article
            role="listitem"
            key={it.title}
            variants={card}
            className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300
                       hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-200 hover:-translate-y-1
                       focus-within:ring-2 focus-within:ring-brand-500"
          >
            {/* Icon */}
            <div
              className="mb-4 inline-flex size-12 items-center justify-center rounded-xl
                         bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-500/20
                         group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-shadow"
              aria-hidden="true"
            >
              {it.icon}
            </div>

            <h3 className="text-lg font-bold text-navy-800">{it.title}</h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{it.desc}</p>

            {Array.isArray(it.bullets) && it.bullets.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {it.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 flex-shrink-0" aria-hidden="true" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Optional deep link per card */}
            {it.href && (
              <a
                href={it.href}
                className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={it.title}
                tabIndex={-1}
              />
            )}
          </motion.article>
        ))}
      </motion.div>

      {/* (Optional) ItemList JSON-LD for SEO – only titles & URLs if provided */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.title,
              url: it.href || "https://prajyotinfotech.com/#services",
            })),
          }),
        }}
      />
    </section>
  );
}
