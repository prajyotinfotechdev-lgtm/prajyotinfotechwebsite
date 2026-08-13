import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Tooltip from "./Tooltip.jsx";

// Business-outcome focused cards — not tech jargon
const DEFAULT_ITEMS = [
  {
    title: "Your Business Online in Days",
    desc: "Professional website that looks great on every device, loads fast, and brings in real enquiries.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    bullets: ["Mobile-first responsive design", "WhatsApp & call lead capture", "Google-ready from day one"],
  },
  {
    title: "Sell Online — 24/7",
    desc: "Full e-commerce store with product catalog, cart, checkout, and payment. Customers order while you sleep.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <path d="M3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" fill="none"/>
      </svg>
    ),
    bullets: ["Product catalog with filters", "Razorpay/UPI payment", "WhatsApp order alerts"],
  },
  {
    title: "App for Your Customers",
    desc: "Android & iOS app that keeps customers engaged, enables bookings, and builds your brand.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    bullets: ["Android & iOS both", "Push notifications & offers", "Login, bookings & orders"],
  },
  {
    title: "Track Every Rupee",
    desc: <><Tooltip term="GST" text="Goods and Services Tax. We handle automatic tax calculations and compliant invoice generation." /> billing, invoicing, expense tracking, and financial reports — all in one system.</>,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M9 7H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-3" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2H9z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    bullets: ["GST invoice generation", "Vendor & customer ledgers", "PDF export & reports"],
  },
  {
    title: "Know Your Stock Always",
    desc: "Real-time inventory system so you never oversell, never run out, and always know what's where.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M3 3h18v4H3zM3 11h18v4H3zM3 19h18v2H3z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <path d="M7 5v0M7 13v0" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    bullets: ["Stock in/out tracking", "Low-stock alerts", "Multi-branch support"],
  },
  {
    title: "Manage Customers & Leads",
    desc: <><Tooltip term="CRM" text="Customer Relationship Management. A system to track all your leads, calls, and client interactions in one place." /> that captures every enquiry, tracks follow-ups, and never lets a lead fall through the cracks.</>,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    bullets: ["Lead capture & assignment", "Follow-up reminders", "Sales pipeline view"],
  },
  {
    title: "WhatsApp Automation",
    desc: "Automated order confirmations, appointment reminders, and customer follow-ups via WhatsApp — without lifting a finger.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    bullets: ["Order & booking alerts", "Auto-reply workflows", "Bulk campaign messaging"],
  },
  {
    title: "You Own Everything",
    desc: "Full source code, admin access, and documentation handed over at project completion. No lock-in, ever.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    bullets: ["Full repository access", "Admin panel + docs", "15-day post-launch support"],
  },
];

export default function Features({
  title = "Everything your business needs to go digital",
  subtitle = "From a simple website to full custom software — we handle every part of your digital journey.",
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
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
          {title}
        </h2>
        {subtitle && <p className="mt-4 text-slate-600 text-lg leading-relaxed">{subtitle}</p>}
      </div>

      <motion.div
        role="list"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((it) => (
          <motion.article
            role="listitem"
            key={it.title}
            variants={card}
            className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300
                       hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-200 hover:-translate-y-1.5
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

            <h3 className="text-[15px] font-bold text-navy-800 leading-snug">{it.title}</h3>
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

            {it.href && (
              <a
                href={it.href}
                className="absolute inset-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={it.title}
                tabIndex={-1}
              />
            )}

            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.07),transparent_60%)]" />
          </motion.article>
        ))}
      </motion.div>

      {/* JSON-LD */}
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
              url: it.href || "https://prajyotinfotech.in/services",
            })),
          }),
        }}
      />
    </section>
  );
}
