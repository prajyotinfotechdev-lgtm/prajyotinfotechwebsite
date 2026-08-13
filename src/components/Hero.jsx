import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const WA_NUMBER = "917020708747";
const wa = (t) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "6+",  label: "Years in Business" },
  { value: "7+",  label: "Industries Served" },
  { value: "100%", label: "Code Ownership" },
];

export default function Hero() {
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
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-brand-50/30"
      role="region"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-24 -left-20 size-[50rem] rounded-full bg-brand-500/8 blur-[140px] animate-pulse-slow" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-[45rem] rounded-full bg-navy-400/8 blur-[140px] animate-pulse-slow" />

      <motion.div
        style={prefersReducedMotion ? undefined : { y, opacity }}
        className="mx-auto max-w-7xl px-4 pt-28 pb-12"
      >
        {/* Availability badge */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-navy-800 shadow-sm"
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
          className="text-4xl/tight md:text-6xl/tight lg:text-7xl/tight font-black tracking-[-0.02em] text-navy-800 max-w-4xl"
        >
          Your business,{" "}
          <span className="text-gradient">fully digital.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed"
        >
          We build websites, mobile apps, CRM systems, billing software, and complete
          business automation — so you can focus on running your business, not chasing paperwork.
        </motion.p>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38, duration: 0.5 }}
          className="mt-3 text-sm text-slate-500"
        >
          Trusted by retailers, clinics, restaurants, manufacturers &amp; startups across India.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <a
            href={wa("Hi Prajyot Infotech, I'd like to digitalize my business. Please help me get started.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold shadow-lg shadow-brand-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/35 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {/* WhatsApp icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.524 5.855L.055 23.454a.5.5 0 0 0 .612.612l5.598-1.469A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.898 0-3.68-.524-5.198-1.435l-.372-.22-3.853 1.011 1.011-3.854-.22-.372A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Get a Free Consultation
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-navy-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <Link
            to="/services"
            className="px-6 py-3.5 rounded-xl border-2 border-slate-200 bg-white text-navy-800 font-semibold transition-all duration-300 hover:border-brand-300 hover:bg-brand-50/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            See Our Services
          </Link>
        </motion.div>

        {/* Scroll cue */}
        {!prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-12 flex items-center gap-2 text-sm text-slate-400"
          >
            <span className="inline-block animate-bounce" aria-hidden>↓</span>
            <span>Scroll to explore</span>
          </motion.div>
        )}
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="border-t border-slate-200/60 bg-white/60 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-4 py-5">
          <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center md:items-start gap-0.5">
                <dt className="text-2xl md:text-3xl font-black text-gradient">{s.value}</dt>
                <dd className="text-xs text-slate-500 font-medium tracking-wide uppercase">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
