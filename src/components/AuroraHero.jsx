import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "../styles/aurora.css";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WA_NUMBER = "917020708747";
const wa = (t) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;

export default function AuroraHero() {
  const { openLeadModal } = useLeadModal();

  useEffect(() => {
    document.documentElement.classList.add("loaded");
  }, []);

  const prefersReducedMotion = useReducedMotion();
  const { scrollY }  = useScroll();
  const y       = useTransform(scrollY, [0, 600], [0, prefersReducedMotion ? 0 : 80]);
  const opacity = useTransform(scrollY, [0, 350], [1, prefersReducedMotion ? 1 : 0.6]);

  const availability = useMemo(() => {
    const d     = new Date();
    const month = d.toLocaleString(undefined, { month: "long" });
    const year  = d.getFullYear();
    return `Taking new projects — ${month} ${year}`;
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="heroTitle"
      className="relative overflow-hidden bg-white min-h-[92vh] flex flex-col justify-between"
      role="region"
    >
      {/* Aurora background — toned down */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="aurora-bg">
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
          <div className="aurora-blob aurora-blob-4" />
        </div>
        {/* Grain overlay — subtler */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={prefersReducedMotion ? undefined : { y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-4 pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 flex-1 flex flex-col justify-center items-center text-center"
      >
        {/* Availability badge & Flagship Product pill */}
        <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/65 backdrop-blur-md px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-sm"
          >
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            {availability}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link
              to="/products/hrms"
              className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-[11px] sm:text-xs font-extrabold text-amber-900 shadow-sm hover:bg-amber-100 transition-all group"
            >
              <span>🏆 Flagship Product: OIBUZ Construction HRMS</span>
              <span className="text-amber-700 group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Main headline */}
        <motion.h1
          id="heroTitle"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.65 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[5.25rem]/tight font-black tracking-tight text-slate-900 max-w-5xl"
        >
          Build software that{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-navy-600">
            defines the future.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg/relaxed text-slate-600 font-normal px-2"
        >
          We build hyper-performant websites, mobile apps, CRM systems, and business
          automation software for companies that refuse to settle for average.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.6 }}
          className="mt-7 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md sm:max-w-none mx-auto"
        >
          {/* Primary */}
          <button
            type="button"
            onClick={() =>
              openLeadModal({
                source: "Hero Section - Book Discovery Call",
                title: "Book Technical Discovery Call",
                subtitle: "Schedule a 15-min project scoping session with Prajyot Infotech.",
                projectType: "Website / Web App Development",
              })
            }
            className="w-full sm:w-auto group px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-navy-800 text-white font-semibold shadow-md shadow-navy-900/20 transition-all duration-300 hover:bg-navy-700 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base whitespace-nowrap"
          >
            Book Call
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Secondary — brand gradient */}
          <Link
            to="/estimate"
            className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold shadow-md shadow-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 hover:scale-[1.02] focus:outline-none text-sm sm:text-base flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Estimate Cost
          </Link>

          {/* Ghost */}
          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-full border border-slate-900/12 bg-white/55 backdrop-blur-sm text-slate-700 font-semibold transition-all duration-300 hover:bg-white/75 hover:border-slate-300 focus:outline-none text-sm flex items-center justify-center whitespace-nowrap"
          >
            Explore Services
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52, duration: 0.5 }}
          className="mt-6 sm:mt-8 inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-600 bg-white/60 border border-slate-200/70 backdrop-blur-md px-4 py-2 rounded-full shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          Trusted by growing businesses across India &amp; worldwide
        </motion.div>
      </motion.div>
    </section>
  );
}
