// src/components/Industries.jsx
// Industries We Serve — helps clients self-identify
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

// Premium SVG icon components — no emojis
const IconRetail = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_retail_bg)" />
    <path d="M10 14h20l-2 12H12L10 14Z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
    <path d="M16 14v-2a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="16" cy="28" r="1.5" fill="white" />
    <circle cx="24" cy="28" r="1.5" fill="white" />
    <defs><linearGradient id="ic_retail_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#4f46e5"/></linearGradient></defs>
  </svg>
);
const IconFood = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_food_bg)" />
    <path d="M14 10v6a4 4 0 0 0 8 0v-6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M18 16v14" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M26 10v4c0 1.657 1.343 3 3 3H26v13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <defs><linearGradient id="ic_food_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#f97316"/><stop offset="1" stopColor="#ef4444"/></linearGradient></defs>
  </svg>
);
const IconHealth = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_health_bg)" />
    <rect x="18" y="10" width="4" height="20" rx="2" fill="white" />
    <rect x="10" y="18" width="20" height="4" rx="2" fill="white" />
    <defs><linearGradient id="ic_health_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#0284c7"/></linearGradient></defs>
  </svg>
);
const IconEducation = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_edu_bg)" />
    <path d="M20 11L8 17l12 6 12-6-12-6Z" fill="white" opacity=".9"/>
    <path d="M12 20v6c0 2 3.582 4 8 4s8-2 8-4v-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    <path d="M32 17v6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
    <defs><linearGradient id="ic_edu_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#7c3aed"/></linearGradient></defs>
  </svg>
);
const IconManufacturing = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_mfg_bg)" />
    <path d="M10 28V18l6-4v4l6-4v4l6-4v14H10Z" fill="white" opacity=".9"/>
    <rect x="14" y="22" width="3" height="6" rx="1" fill="url(#ic_mfg_bg)" />
    <rect x="21" y="22" width="3" height="6" rx="1" fill="url(#ic_mfg_bg)" />
    <defs><linearGradient id="ic_mfg_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#64748b"/><stop offset="1" stopColor="#334155"/></linearGradient></defs>
  </svg>
);
const IconSalon = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_salon_bg)" />
    <path d="M20 10c-3 0-5 2-5 5 0 4 5 6 5 10 0-4 5-6 5-10 0-3-2-5-5-5Z" fill="white" opacity=".9"/>
    <path d="M14 28l2-4M26 28l-2-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs><linearGradient id="ic_salon_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#ec4899"/><stop offset="1" stopColor="#db2777"/></linearGradient></defs>
  </svg>
);
const IconRealEstate = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_re_bg)" />
    <path d="M20 10L10 18v12h6v-7h8v7h6V18L20 10Z" fill="white" opacity=".9"/>
    <rect x="17" y="23" width="6" height="7" rx="1" fill="url(#ic_re_bg)" />
    <defs><linearGradient id="ic_re_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#16a34a"/><stop offset="1" stopColor="#15803d"/></linearGradient></defs>
  </svg>
);
const IconLogistics = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_log_bg)" />
    <rect x="8" y="16" width="18" height="12" rx="2" fill="white" opacity=".9"/>
    <path d="M26 20h4l2 6v2h-6V20Z" fill="white" opacity=".75"/>
    <circle cx="14" cy="30" r="2.5" fill="url(#ic_log_bg)" stroke="white" strokeWidth="1.5"/>
    <circle cx="27" cy="30" r="2.5" fill="url(#ic_log_bg)" stroke="white" strokeWidth="1.5"/>
    <defs><linearGradient id="ic_log_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#f59e0b"/><stop offset="1" stopColor="#d97706"/></linearGradient></defs>
  </svg>
);
const IconStartup = () => (
  <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9" aria-hidden>
    <rect width="40" height="40" rx="12" fill="url(#ic_startup_bg)" />
    <path d="M20 8c-5 4-8 10-6 16l4-4 4 4 4-4 4 4c2-6-1-12-6-16Z" fill="white" opacity=".9"/>
    <circle cx="20" cy="20" r="3" fill="url(#ic_startup_bg)" />
    <path d="M11 28c1 2 3 3 5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <defs><linearGradient id="ic_startup_bg" x1="0" y1="0" x2="40" y2="40"><stop stopColor="#7c3aed"/><stop offset="1" stopColor="#ec4899"/></linearGradient></defs>
  </svg>
);

const ICON_MAP = {
  "Retail & E-Commerce": <IconRetail />,
  "Restaurants & Cafés": <IconFood />,
  "Healthcare & Clinics": <IconHealth />,
  "Education & Coaching": <IconEducation />,
  "Manufacturing & Wholesale": <IconManufacturing />,
  "Salons & Wellness": <IconSalon />,
  "Real Estate": <IconRealEstate />,
  "Logistics & Transport": <IconLogistics />,
  "Startups & SaaS": <IconStartup />,
};

const INDUSTRIES = [
  {
    title: "Retail & E-Commerce",
    desc: "Online stores, billing software, inventory tracking, and dealer portals for retailers of any size.",
    tags: ["POS & Billing", "Online Store", "Inventory"],
  },
  {
    title: "Restaurants & Cafés",
    desc: "QR menus, table ordering, kitchen screens, and WhatsApp order confirmations for food businesses.",
    tags: ["QR Menu", "Table Orders", "WhatsApp"],
  },
  {
    title: "Healthcare & Clinics",
    desc: "Patient management, appointment booking, prescription records, and billing for clinics and hospitals.",
    tags: ["Appointments", "Patient Records", "Billing"],
  },
  {
    title: "Education & Coaching",
    desc: "Student portals, fee management, attendance tracking, and online course platforms for institutions.",
    tags: ["Student Portal", "Fee Management", "Attendance"],
  },
  {
    title: "Manufacturing & Wholesale",
    desc: "Production tracking, inventory management, supplier systems, and GST billing for factories and distributors.",
    tags: ["Production", "Inventory", "GST Billing"],
  },
  {
    title: "Salons & Wellness",
    desc: "Appointment booking apps, loyalty programs, staff management, and customer follow-up automation.",
    tags: ["Bookings", "Loyalty", "Staff"],
  },
  {
    title: "Real Estate",
    desc: "Property listing websites, lead management CRM, and customer follow-up systems for agents and builders.",
    tags: ["Property Listings", "CRM", "Leads"],
  },
  {
    title: "Logistics & Transport",
    desc: "Fleet management, delivery tracking, customer notifications, and route optimization for logistics firms.",
    tags: ["Tracking", "Fleet", "Notifications"],
  },
  {
    title: "Startups & SaaS",
    desc: "Full-stack web apps, SaaS platforms, admin dashboards, and scalable APIs for growing businesses.",
    tags: ["Web App", "SaaS", "API"],
  },
];

export default function Industries() {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.07 },
    },
  };

  const card = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section id="industries" className="mx-auto max-w-7xl px-4 py-16 md:py-24" aria-labelledby="industriesTitle">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <div>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 mb-3">Industries</span>
          <h2 id="industriesTitle" className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
            We've worked across{" "}
            <span className="text-gradient">every industry</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            We understand that a clinic and a restaurant have completely different needs. Our solutions are built for your specific industry.
          </p>
        </div>
        <Link
          to="/services"
          className="shrink-0 self-start md:self-auto rounded-xl border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-navy-800 hover:border-brand-300 hover:bg-brand-50/50 transition-all"
        >
          View all services →
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
      >
        {INDUSTRIES.map((ind) => (
          <motion.article
            key={ind.title}
            variants={card}
            role="listitem"
            whileHover={{ y: -4, scale: 1.01 }}
            className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-brand-500/8 hover:border-brand-200"
          >
            <div className="flex items-start gap-4">
              {/* Premium SVG icon with 3D depth shadow */}
              <div
                className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                style={{ filter: "drop-shadow(0 6px 12px rgba(124,58,237,0.25))" }}
              >
                {ICON_MAP[ind.title]}
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-navy-800 text-[15px]">{ind.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ind.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.06),transparent_60%)]" />
            {/* Bottom accent */}
            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-brand-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-full" />
          </motion.article>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <div className="mt-10 text-center">
        <p className="text-slate-600 text-sm">
          Don't see your industry?{" "}
          <Link to="/contact" className="font-semibold text-brand-700 hover:text-brand-800 underline underline-offset-2">
            We work with all types of businesses.
          </Link>
        </p>
      </div>
    </section>
  );
}
