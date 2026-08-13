// src/components/Showreel.jsx
// Repurposed as "How We Work" — a trust-building process section
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const WA_NUMBER = "917020708747";
const wa = (t) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;

const STEPS = [
  {
    n: "01",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Discovery Call",
    subtitle: "Day 1",
    desc: "We understand your business, your goals, and what you need. Free call — no pressure, just clarity.",
    color: "from-violet-500 to-brand-600",
  },
  {
    n: "02",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Design & Approval",
    subtitle: "Day 2–5",
    desc: "We share wireframes and design mockups. You review, request changes, and approve before we write a single line of code.",
    color: "from-brand-500 to-blue-600",
  },
  {
    n: "03",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    title: "Build & Test",
    subtitle: "Day 5–20",
    desc: "Fast, clean development with regular progress updates. We test everything before handing it to you.",
    color: "from-blue-500 to-emerald-500",
  },
  {
    n: "04",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    title: "Launch & Handover",
    subtitle: "Day 20+",
    desc: "We go live, set up your domain, analytics, and hand over full admin access and documentation.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    n: "05",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    title: "Support & Grow",
    subtitle: "Post-launch",
    desc: "15-day support included. We're available for updates, new features, and scaling as your business grows.",
    color: "from-teal-500 to-navy-600",
  },
];

const WHY_US = [
  { label: "Fixed price quoted upfront", icon: "₹" },
  { label: "No lock-in — you own all code", icon: "🔓" },
  { label: "Delivered in 10–45 days", icon: "⚡" },
  { label: "WhatsApp support always available", icon: "💬" },
  { label: "Works in English, Hindi & Marathi", icon: "🗣️" },
  { label: "Understands Indian business needs", icon: "🇮🇳" },
];

export default function Showreel() {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: prefersReducedMotion ? {} : { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="process" className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">

      {/* Section header */}
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
          From idea to launch — here's exactly how we work
        </h2>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed">
          No surprises. No delays. Just a clear, step-by-step process that keeps you informed at every stage.
        </p>
      </div>

      {/* Process steps */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 relative"
      >
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-10 left-[3.5rem] right-[3.5rem] h-0.5 bg-gradient-to-r from-violet-200 via-brand-200 to-teal-200" aria-hidden />

        <div className="grid gap-6 md:grid-cols-5">
          {STEPS.map((s) => (
            <motion.div key={s.n} variants={item} className="relative flex flex-col items-start md:items-center md:text-center">
              {/* Step circle */}
              <div className={`relative z-10 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-lg mb-4 flex-shrink-0`}>
                {s.icon}
                <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-white text-[10px] font-black text-navy-800 shadow ring-1 ring-slate-200">
                  {s.n.replace("0", "")}
                </span>
              </div>

              <div className="md:px-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-600 mb-1">{s.subtitle}</p>
                <h3 className="text-base font-bold text-navy-800">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Us grid */}
      <div className="mt-16 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-brand-50/30 p-8 md:p-10">
        <h3 className="text-xl md:text-2xl font-black text-navy-800 text-center mb-8">
          Why businesses across India choose Prajyot Infotech
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {WHY_US.map((w) => (
            <li key={w.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xl" aria-hidden>{w.icon}</span>
              <span className="text-sm font-medium text-navy-800">{w.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={wa("Hi Prajyot Infotech, I'd like to start a project. Can we have a free consultation?")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            Start a Free Consultation
          </a>
          <Link
            to="/estimate"
            className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3 font-semibold text-navy-800 hover:border-brand-300 hover:bg-brand-50/50 transition-all"
          >
            Estimate Project Cost
          </Link>
        </div>
      </div>
    </section>
  );
}
