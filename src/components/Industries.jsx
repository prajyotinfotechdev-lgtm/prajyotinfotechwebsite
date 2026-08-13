// src/components/Industries.jsx
// Industries We Serve — helps clients self-identify
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const INDUSTRIES = [
  {
    icon: "🛒",
    title: "Retail & E-Commerce",
    desc: "Online stores, billing software, inventory tracking, and dealer portals for retailers of any size.",
    tags: ["POS & Billing", "Online Store", "Inventory"],
  },
  {
    icon: "🍽️",
    title: "Restaurants & Cafés",
    desc: "QR menus, table ordering, kitchen screens, and WhatsApp order confirmations for food businesses.",
    tags: ["QR Menu", "Table Orders", "WhatsApp"],
  },
  {
    icon: "🏥",
    title: "Healthcare & Clinics",
    desc: "Patient management, appointment booking, prescription records, and billing for clinics and hospitals.",
    tags: ["Appointments", "Patient Records", "Billing"],
  },
  {
    icon: "📚",
    title: "Education & Coaching",
    desc: "Student portals, fee management, attendance tracking, and online course platforms for institutions.",
    tags: ["Student Portal", "Fee Management", "Attendance"],
  },
  {
    icon: "🏭",
    title: "Manufacturing & Wholesale",
    desc: "Production tracking, inventory management, supplier systems, and GST billing for factories and distributors.",
    tags: ["Production", "Inventory", "GST Billing"],
  },
  {
    icon: "💇",
    title: "Salons & Wellness",
    desc: "Appointment booking apps, loyalty programs, staff management, and customer follow-up automation.",
    tags: ["Bookings", "Loyalty", "Staff"],
  },
  {
    icon: "🏠",
    title: "Real Estate",
    desc: "Property listing websites, lead management CRM, and customer follow-up systems for agents and builders.",
    tags: ["Property Listings", "CRM", "Leads"],
  },
  {
    icon: "🚚",
    title: "Logistics & Transport",
    desc: "Fleet management, delivery tracking, customer notifications, and route optimization for logistics firms.",
    tags: ["Tracking", "Fleet", "Notifications"],
  },
  {
    icon: "🚀",
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
            className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300
                       hover:shadow-lg hover:shadow-brand-500/8 hover:border-brand-200 hover:-translate-y-1"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0" aria-hidden>{ind.icon}</span>
              <div className="min-w-0">
                <h3 className="font-bold text-navy-800 text-[15px]">{ind.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ind.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.06),transparent_60%)]" />
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
