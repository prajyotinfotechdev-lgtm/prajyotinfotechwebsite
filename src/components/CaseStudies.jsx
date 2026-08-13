import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const studies = [
  {
    tag: "Hospitality",
    title: "Restaurant Management System",
    copy: "QR table menus, live kitchen display screen, WhatsApp order confirmations, GST billing, and admin dashboard. Order errors dropped to 0%.",
    slug: "restaurant-management",
    image: "",
    meta: "React · Node.js · MongoDB · WhatsApp API · Razorpay",
    metric: "Order errors: 0%",
    accent: "from-orange-400 to-red-500",
    icon: "🍽️",
  },
  {
    tag: "Retail",
    title: "Mobile Shop Management System",
    copy: "IMEI tracking, repair job cards, dual retail/dealer pricing, GST billing with PDF, and WhatsApp customer updates. Billing time cut 90%.",
    slug: "mobile-shop-management",
    image: "",
    meta: "React · Node.js · Express · MongoDB · Cloudinary",
    metric: "Billing time: 10min → 1min",
    accent: "from-blue-400 to-indigo-500",
    icon: "📱",
  },
  {
    tag: "E-Commerce",
    title: "JollyBaba Mobiles Online Store",
    copy: "Dealer/retail price toggle, fuzzy product search, animated cart, Razorpay checkout, and WhatsApp order fallback. Search CTR up 28%.",
    slug: "jollybaba-ecommerce",
    image: "",
    meta: "React · Node.js · MongoDB · Razorpay · Cloudinary",
    metric: "Search CTR: +28%",
    accent: "from-emerald-400 to-teal-500",
    icon: "🛒",
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

export default function CaseStudies() {
  const cards = studies;

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
            Projects we've built
          </h2>
          <p className="mt-2 text-slate-600">Real software for real Indian businesses.</p>
        </div>
        <Link
          to="/work"
          className="shrink-0 text-sm font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-2 focus:outline-none"
        >
          See all 8 projects →
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cards.map((c) => (
          <motion.div key={c.slug} variants={item}>
            <Link
              to="/work"
              className="group block rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all duration-300
                         hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-200 hover:-translate-y-1.5
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label={`View project: ${c.title}`}
            >
              {/* Gradient cover with icon */}
              <div className={`relative h-36 bg-gradient-to-br ${c.accent || 'from-brand-400 to-brand-600'} overflow-hidden`}>
                <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="absolute bottom-3 left-4 text-4xl select-none">{c.icon}</div>
                <div className="absolute top-3 left-4">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{c.tag}</span>
                </div>
                {c.metric && (
                  <div className="absolute bottom-3 right-4 rounded-xl bg-white/90 backdrop-blur-sm px-3 py-1.5 shadow-md">
                    <p className="text-[10px] text-slate-500 font-medium">Key result</p>
                    <p className="text-xs font-black text-navy-800">{c.metric}</p>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="text-base font-bold text-navy-800 group-hover:text-brand-700 transition-colors">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">{c.copy}</p>
                <div className="mt-3 text-[11px] text-slate-400 font-medium">{c.meta}</div>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">View project</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
