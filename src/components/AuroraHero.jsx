import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "../styles/aurora.css"; // We will create this

const WA_NUMBER = "917020708747";
const wa = (t) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "6+",  label: "Years in Business" },
  { value: "7+",  label: "Industries Served" },
  { value: "100%", label: "Code Ownership" },
];

export default function AuroraHero() {
  useEffect(() => {
    document.documentElement.classList.add("loaded");
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 80]);
  const opacity = useTransform(scrollY, [0, 350], [1, prefersReducedMotion ? 1 : 0.6]);

  const availability = useMemo(() => {
    const d = new Date();
    const month = d.toLocaleString(undefined, { month: "long" });
    const year = d.getFullYear();
    return `Taking new projects — ${month} ${year}`;
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="heroTitle"
      className="relative overflow-hidden bg-white min-h-[95vh] flex flex-col justify-between"
      role="region"
    >
      {/* Aurora Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="aurora-bg">
          <div className="aurora-blob aurora-blob-1"></div>
          <div className="aurora-blob aurora-blob-2"></div>
          <div className="aurora-blob aurora-blob-3"></div>
          <div className="aurora-blob aurora-blob-4"></div>
        </div>
        
        {/* SVG Noise Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      <motion.div
        style={prefersReducedMotion ? undefined : { y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-16 flex-1 flex flex-col justify-center items-center text-center"
      >
        {/* Availability badge */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/40 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm"
        >
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-emerald-500"></span>
          </span>
          {availability}
        </motion.p>

        {/* Main headline */}
        <motion.h1
          id="heroTitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="text-5xl/tight md:text-7xl/tight lg:text-[5.5rem]/tight font-black tracking-[-0.03em] text-slate-900 max-w-5xl"
        >
          Build software that{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-pink-500">defines the future.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-3xl text-lg md:text-xl/relaxed text-slate-700 font-medium"
        >
          We build hyper-performant websites, mobile apps, CRM systems, and business automation software for companies that refuse to settle for average.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <a
            href={wa("Hi Prajyot Infotech, I'd like to digitalize my business. Please help me get started.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-full bg-slate-900 text-white font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Your Project
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
          <Link
            to="/services"
            className="px-8 py-4 rounded-full border-2 border-slate-900/10 bg-white/50 backdrop-blur-sm text-slate-900 font-bold transition-all duration-300 hover:bg-white/80 hover:border-slate-900/20 focus:outline-none"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-8 text-sm font-medium text-slate-500/80"
        >
          Trusted by top retailers, clinics, and startups across India.
        </motion.p>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="relative z-10 w-full"
      >
        <div className="mx-auto max-w-6xl px-4 py-8 border-t border-slate-900/5 bg-white/40 backdrop-blur-xl rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          <dl className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1">
                <dt className="text-3xl md:text-4xl font-black text-slate-900">{s.value}</dt>
                <dd className="text-xs md:text-sm text-slate-500 font-bold tracking-wider uppercase">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
