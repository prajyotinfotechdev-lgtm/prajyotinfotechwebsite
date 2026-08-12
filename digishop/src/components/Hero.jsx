import React, { useEffect, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  // add a class once page is ready (can be used for any entry transitions)
  useEffect(() => {
    document.documentElement.classList.add("loaded");
  }, []);

  // Respect user motion preferences
  const prefersReducedMotion = useReducedMotion();

  // Parallax only when motion allowed
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, prefersReducedMotion ? 1 : 0.7]);

  // Availability text (auto current month/year)
  const availability = useMemo(() => {
    const d = new Date();
    const month = d.toLocaleString(undefined, { month: "long" });
    const year = d.getFullYear();
    return `Available for new projects — ${month} ${year}`;
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="heroTitle"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50/30"
      role="region"
    >
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute -top-24 -left-20 size-[50rem] rounded-full bg-brand-500/10 blur-[140px] animate-pulse-slow" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-[45rem] rounded-full bg-navy-400/10 blur-[140px] animate-pulse-slow" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[30rem] rounded-full bg-brand-300/5 blur-[100px]" />

      <motion.div
        style={prefersReducedMotion ? undefined : { y, opacity }}
        className="mx-auto max-w-7xl px-4 pt-28 pb-24"
      >
        {/* Availability badge */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-navy-800 shadow-sm"
        >
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
          </span>
          {availability}
        </motion.p>

        {/* Headline */}
        <motion.h1
          id="heroTitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl/tight md:text-6xl/tight lg:text-7xl/tight font-black tracking-[-0.02em] text-navy-800"
        >
          We build websites & apps that feel{" "}
          <span className="text-gradient">
            premium
          </span>
          .
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg text-slate-600"
        >
          Clean design, fast performance, and simple content you can manage. From landing pages to
          full‑stack products—delivered quickly and done right.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href="#cta"
            className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 overflow-hidden"
          >
            <span className="relative z-10">Start a project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-navy-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <a
            href="#work"
            className="px-6 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-navy-800 font-semibold transition-all duration-300 hover:border-brand-300 hover:bg-brand-50/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            See our work
          </a>
        </motion.div>

        {/* Scroll cue (hidden on prefers-reduced-motion) */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-14 flex items-center gap-2 text-sm text-slate-500"
          >
            <span className="inline-block animate-bounce" aria-hidden>
              ↓
            </span>
            <span>Scroll to explore</span>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
