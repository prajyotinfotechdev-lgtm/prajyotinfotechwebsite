// src/components/AuroraHero.jsx
// Cinematic Motion-Graphics Hero — Prajyot Infotech
// Architecture: multi-slide auto-advancing carousel with distinct choreography per slide
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "framer-motion";
import "../styles/aurora.css";
import { useLeadModal } from "../context/LeadModalContext.jsx";

/* ─── CONSTANTS ───────────────────────────────────────────────────────────── */
const WA_NUMBER = "917020708747";
const wa = (t) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t)}`;
const SLIDE_DURATION = 8000; // 8 seconds per slide

/* ─── EASING ──────────────────────────────────────────────────────────────── */
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];
const EASE_SPRING = { type: "spring", stiffness: 120, damping: 20, mass: 0.8 };

/* ─── SVG ELEMENTS — Technical grid background ───────────────────────────── */
function TechnicalGrid({ opacity = 0.06 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <pattern id="techGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
        <pattern id="techGridMajor" x="0" y="0" width="180" height="180" patternUnits="userSpaceOnUse">
          <rect width="180" height="180" fill="url(#techGrid)" />
          <path d="M 180 0 L 0 0 0 180" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#techGridMajor)" className="text-slate-800" />
    </svg>
  );
}

/* ─── SVG: Animated circuit / data-flow lines ─────────────────────────────── */
function DataFlowLines({ reduced }) {
  const lines = [
    { d: "M 0 200 Q 200 100 400 250 T 800 180", delay: 0 },
    { d: "M 100 400 Q 300 300 500 420 T 900 350", delay: 0.5 },
    { d: "M 200 150 Q 400 50  600 200 T 1000 120", delay: 1.0 },
  ];
  if (reduced) return null;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ opacity: 0.12 }}>
      {lines.map((l, i) => (
        <motion.path
          key={i}
          d={l.d}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: l.delay, ease: EASE_OUT_EXPO, repeat: Infinity, repeatType: "loop", repeatDelay: 5 }}
        />
      ))}
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
          <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
          <stop offset="100%" stopColor="#1e2756" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Floating UI card ────────────────────────────────────────────────────── */
function UICard({ delay, x, y, children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`absolute glass rounded-xl border border-white/30 shadow-xl backdrop-blur-md p-3 text-slate-800 text-xs ${className}`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reduced ? 0 : -8, scale: 0.95 }}
      transition={{ delay, duration: 0.6, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SLIDE 1: "Build software that defines the future" ──────────────────── */
function Slide1Visual({ reduced }) {
  const metrics = [
    { label: "Projects Shipped", value: "180+", color: "#7c3aed" },
    { label: "Uptime SLA", value: "99.98%", color: "#059669" },
    { label: "Countries Served", value: "8+", color: "#1e2756" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background environment */}
      <TechnicalGrid opacity={0.05} />
      <DataFlowLines reduced={reduced} />

      {/* Floating metric cards — desktop only */}
      <div className="hidden lg:block">
        {metrics.map((m, i) => (
          <UICard key={m.label} delay={0.6 + i * 0.15} x={`${62 + i * 10}%`} y={`${22 + i * 20}%`}>
            <div className="font-black text-lg leading-none" style={{ color: m.color }}>{m.value}</div>
            <div className="text-slate-500 mt-0.5 text-[10px] font-medium">{m.label}</div>
          </UICard>
        ))}

        {/* Code snippet card */}
        <UICard delay={1.1} x="60%" y="75%">
          <div className="font-mono text-[10px] text-slate-600 space-y-0.5">
            <div><span className="text-brand-700">const</span> result = <span className="text-emerald-600">await</span> deploy();</div>
            <div className="text-emerald-600">✓ Production ready</div>
          </div>
        </UICard>

        {/* Availability pulse */}
        <UICard delay={1.3} x="58%" y="52%">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
            </span>
            <span className="text-slate-600 font-semibold text-[11px]">Systems Online</span>
          </div>
        </UICard>
      </div>

      {/* Decorative orbs */}
      <motion.div
        className="absolute right-0 top-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
        animate={reduced ? {} : { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,39,86,0.1) 0%, transparent 70%)" }}
        animate={reduced ? {} : { scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

/* ─── SLIDE 2: "Enterprise ERP & CRM" ────────────────────────────────────── */
function Slide2Visual({ reduced }) {
  const modules = [
    { icon: "📊", label: "CRM Pipeline", value: "12 deals", color: "#7c3aed" },
    { icon: "🏭", label: "ERP Inventory", value: "2,480 items", color: "#2563eb" },
    { icon: "📱", label: "Mobile App", value: "4.9 ★", color: "#059669" },
    { icon: "⚡", label: "Automation", value: "38 flows", color: "#d97706" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <TechnicalGrid opacity={0.04} />

      {/* App window mockup */}
      <div className="hidden lg:block absolute right-4 xl:right-8 top-1/2 -translate-y-1/2 w-[420px]">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
          initial={{ opacity: 0, x: 60, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.98 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.3 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-3 text-xs text-slate-400 font-mono">Prajyot ERP Suite — Dashboard</span>
          </div>
          {/* Content */}
          <div className="p-4 bg-slate-50">
            <div className="grid grid-cols-2 gap-3">
              {modules.map((m, i) => (
                <motion.div
                  key={m.label}
                  className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: EASE_OUT_EXPO }}
                >
                  <div className="text-lg mb-1">{m.icon}</div>
                  <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                  <div className="text-sm font-black mt-0.5" style={{ color: m.color }}>{m.value}</div>
                </motion.div>
              ))}
            </div>
            {/* Mini bar chart */}
            <motion.div
              className="mt-3 bg-white rounded-xl p-3 border border-slate-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <div className="text-[9px] text-slate-400 font-semibold mb-2">Revenue Growth (Illustrative)</div>
              <div className="flex items-end gap-1.5 h-12">
                {[40, 55, 62, 78, 85, 92, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{ backgroundColor: i === 6 ? "#7c3aed" : "#e9d5ff" }}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 1.0 + i * 0.05, duration: 0.4, ease: EASE_OUT_EXPO }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)" }}
        animate={reduced ? {} : { scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── SLIDE 3: "Mobile & Automation" ─────────────────────────────────────── */
function Slide3Visual({ reduced }) {
  const steps = [
    { label: "Client submits inquiry", status: "done" },
    { label: "AI qualifies lead", status: "done" },
    { label: "Auto-assigns to rep", status: "active" },
    { label: "CRM updated", status: "pending" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <TechnicalGrid opacity={0.04} />

      <div className="hidden lg:block absolute right-4 xl:right-10 top-1/2 -translate-y-1/2 w-[360px] space-y-3">
        {/* Workflow card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.2 }}
        >
          <div className="px-4 py-3 bg-gradient-to-r from-brand-700 to-navy-800 text-white">
            <div className="text-xs font-bold tracking-wide">⚡ Automation Workflow</div>
            <div className="text-[10px] text-white/60 mt-0.5 font-mono">Lead Qualification — Live</div>
          </div>
          <div className="p-4 space-y-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.2, duration: 0.45, ease: EASE_OUT_EXPO }}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold
                  ${s.status === "done" ? "bg-emerald-100 text-emerald-600" :
                    s.status === "active" ? "bg-brand-100 text-brand-700 ring-2 ring-brand-400 ring-offset-1" :
                    "bg-slate-100 text-slate-400"}`}
                >
                  {s.status === "done" ? "✓" : i + 1}
                </div>
                <div className={`text-xs font-medium ${s.status === "active" ? "text-brand-700" : s.status === "done" ? "text-slate-600" : "text-slate-400"}`}>
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div
          className="bg-white rounded-xl shadow-lg border border-slate-100 p-3 flex items-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-xl flex-shrink-0">📱</div>
          <div>
            <div className="text-xs font-black text-slate-800">50,000+ Automations</div>
            <div className="text-[10px] text-slate-500">Executed monthly across client platforms</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }}
        animate={reduced ? {} : { scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─── SLIDE DATA ──────────────────────────────────────────────────────────── */
const SLIDES = [
  {
    id: "flagship",
    eyebrow: "Software Engineering Company",
    headline: ["Build software that", "defines the future."],
    accentWord: "defines the future.",
    sub: "We engineer high-performance web apps, enterprise ERP/CRM, mobile platforms, and intelligent automation—built for speed, scale, and full data sovereignty.",
    primaryCTA: { type: "modal", label: "Book Discovery Call" },
    secondaryCTA: { type: "link", to: "/estimate", label: "Estimate Cost" },
    Visual: Slide1Visual,
  },
  {
    id: "enterprise",
    eyebrow: "Enterprise Solutions",
    headline: ["Custom ERP, CRM &", "SaaS platforms."],
    accentWord: "SaaS platforms.",
    sub: "From bespoke CRM pipelines to multi-module ERP suites—we architect and deliver enterprise-grade systems with full IP ownership and zero vendor lock-in.",
    primaryCTA: { type: "link", to: "/services", label: "Explore Services" },
    secondaryCTA: { type: "link", to: "/work", label: "View Our Work" },
    Visual: Slide2Visual,
  },
  {
    id: "mobile",
    eyebrow: "Mobile & Automation",
    headline: ["Intelligent apps &", "workflows that scale."],
    accentWord: "workflows that scale.",
    sub: "Cross-platform mobile applications, WhatsApp automation, and AI-powered business workflows that turn manual operations into competitive advantages.",
    primaryCTA: { type: "wa", label: "WhatsApp Us Now" },
    secondaryCTA: { type: "link", to: "/services", label: "See All Services" },
    Visual: Slide3Visual,
  },
];

/* ─── SLIDE DOT INDICATOR ─────────────────────────────────────────────────── */
function SlideDots({ total, active, onSelect, reduced }) {
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className="group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-full"
        >
          <div className={`rounded-full transition-all duration-500 ${i === active ? "w-7 h-2 bg-brand-700" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"}`} />
          {/* Progress ring on active */}
          {i === active && !reduced && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-brand-700/40 scale-[1.8]"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: SLIDE_DURATION / 1000, repeat: Infinity, ease: "linear" }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── TEXT ANIMATION VARIANTS ─────────────────────────────────────────────── */
const wordVariants = {
  hidden: (custom) => ({ opacity: 0, y: 20, filter: custom?.blur ? "blur(4px)" : "blur(0px)" }),
  visible: (custom) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: 0.25 + (custom?.i ?? custom ?? 0) * 0.07, duration: 0.55, ease: EASE_OUT_EXPO }
  }),
  exit: (custom) => ({ opacity: 0, y: -12, filter: custom?.blur ? "blur(2px)" : "blur(0px)", transition: { duration: 0.3 } })
};

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────────── */
export default function AuroraHero() {
  const { openLeadModal } = useLeadModal();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 70]);
  const opacity = useTransform(scrollY, [0, 350], [1, reduced ? 1 : 0.65]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const availability = useMemo(() => {
    const d = new Date();
    return `Taking new projects — ${d.toLocaleString(undefined, { month: "long" })} ${d.getFullYear()}`;
  }, []);

  const goToSlide = useCallback((idx) => {
    setActiveSlide(idx);
  }, []);

  const advance = useCallback(() => {
    setActiveSlide(s => (s + 1) % SLIDES.length);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused || reduced) return;
    timerRef.current = setInterval(advance, SLIDE_DURATION);
    return () => clearInterval(timerRef.current);
  }, [isPaused, reduced, advance]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") setActiveSlide(s => (s - 1 + SLIDES.length) % SLIDES.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance]);

  useEffect(() => {
    document.documentElement.classList.add("loaded");
  }, []);

  const slide = SLIDES[activeSlide];
  const { Visual } = slide;

  const handleCTA = (cta) => {
    if (cta.type === "modal") {
      openLeadModal({
        source: "Hero Section - Book Discovery Call",
        title: "Book Technical Discovery Call",
        subtitle: "Schedule a 15-min project scoping session with Prajyot Infotech.",
        projectType: "Website / Web App Development",
      });
    }
    if (cta.type === "wa") {
      window.open(wa("Hi Prajyot Infotech, I'd like to discuss my project."), "_blank", "noopener noreferrer");
    }
  };

  return (
    <section
      id="home"
      aria-labelledby="heroTitle"
      className="relative overflow-hidden bg-white min-h-[80vh] md:min-h-[85vh] flex flex-col"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Static aurora background (always visible) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="aurora-bg">
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
          <div className="aurora-blob aurora-blob-4" />
        </div>
        {/* Film-grain texture */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>

      {/* ── Slide-specific background visual ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`visual-${slide.id}`}
          className="absolute inset-0 z-[1] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <Visual reduced={reduced} />
        </motion.div>
      </AnimatePresence>

      {/* ── Main scrollable content ── */}
      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="relative z-10 flex-1 flex flex-col"
      >
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-10 flex-1 flex flex-col justify-center">

          {/* Badge row */}
          <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3 justify-center text-center sm:text-left sm:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/65 backdrop-blur-md px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-700 shadow-sm"
            >
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </span>
              {availability}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
            >
              <Link
                to="/products/hrms"
                className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-[11px] sm:text-xs font-extrabold text-amber-900 shadow-sm hover:bg-amber-100 transition-all group"
              >
                <span>🏆 Flagship: OIBUZ Construction HRMS</span>
                <span className="text-amber-700 group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Slide content */}
          <div className="max-w-2xl lg:max-w-[52%] text-center sm:text-left">
            <AnimatePresence mode="wait">
              <motion.div key={`content-${slide.id}`}>
                {/* Eyebrow */}
                <motion.p
                  className="mb-3 text-xs font-bold tracking-widest text-brand-700 uppercase"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                >
                  {slide.eyebrow}
                </motion.p>

                {/* Headline with word-by-word reveal */}
                <h1 id="heroTitle" className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem]/[1.05] font-black tracking-tight text-slate-900 mb-5 sm:mb-6">
                  {slide.headline.map((line, li) => {
                    const words = line.split(" ");
                    return (
                    <span key={li} className="block">
                      {words.map((word, wi) => {
                        const isAccent = slide.accentWord.includes(word) && li === slide.headline.length - 1;
                        const isLastWord = li === slide.headline.length - 1 && wi === words.length - 1;
                        
                        let textClass = "";
                        if (isLastWord) {
                          textClass = "text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-navy-600";
                        } else if (isAccent) {
                          textClass = "text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-brand-600";
                        }
                        
                        return (
                          <motion.span
                            key={`${li}-${wi}`}
                            custom={{ i: li * 3 + wi, blur: isLastWord }}
                            variants={wordVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`inline-block mr-[0.25em] ${textClass}`}
                          >
                            {word}
                          </motion.span>
                        );
                      })}
                    </span>
                  )})}
                </h1>

                {/* Sub-headline */}
                <motion.p
                  className="text-base sm:text-lg/relaxed text-slate-600 font-normal mb-8 sm:mb-10 max-w-xl mx-auto sm:mx-0"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  {slide.sub}
                </motion.p>

                {/* CTAs — 2 buttons side-by-side in one line on mobile */}
                <motion.div
                  className="flex flex-row items-center gap-2 sm:gap-3 justify-center sm:justify-start w-full"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.65, duration: 0.6, ease: EASE_OUT_EXPO }}
                >
                  {/* Primary CTA */}
                  {slide.primaryCTA.type === "link" ? (
                    <Link
                      to={slide.primaryCTA.to}
                      className="group flex-1 sm:flex-none min-w-0 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-navy-800 text-white font-semibold shadow-md shadow-navy-900/20 transition-all duration-300 hover:bg-navy-700 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base whitespace-nowrap text-center"
                    >
                      <span>{slide.primaryCTA.label}</span>
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleCTA(slide.primaryCTA)}
                      className="group flex-1 sm:flex-none min-w-0 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-navy-800 text-white font-semibold shadow-md shadow-navy-900/20 transition-all duration-300 hover:bg-navy-700 hover:shadow-lg hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base whitespace-nowrap cursor-pointer text-center"
                    >
                      <span>{slide.primaryCTA.label}</span>
                      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  )}

                  {/* Secondary CTA */}
                  {slide.secondaryCTA.type === "link" ? (
                    <Link
                      to={slide.secondaryCTA.to}
                      className="flex-1 sm:flex-none min-w-0 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-600 to-brand-700 text-white font-semibold shadow-md shadow-brand-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25 hover:scale-[1.02] focus:outline-none text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap text-center"
                    >
                      <span>{slide.secondaryCTA.label}</span>
                    </Link>
                  ) : (
                    <Link
                      to="/services"
                      className="flex-1 sm:flex-none min-w-0 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-full border border-slate-900/12 bg-white/55 backdrop-blur-sm text-slate-700 font-semibold transition-all duration-300 hover:bg-white/75 hover:border-slate-300 focus:outline-none text-xs sm:text-base flex items-center justify-center whitespace-nowrap text-center"
                    >
                      <span>{slide.secondaryCTA.label}</span>
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom bar: trust line + slide controls ── */}
        <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-24 pb-6 sm:pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-600 bg-white/60 border border-slate-200/70 backdrop-blur-md px-4 py-2 rounded-full shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              Trusted by growing businesses across India & worldwide
            </motion.div>

            {/* Slide controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              {/* Prev */}
              <button
                onClick={() => setActiveSlide(s => (s - 1 + SLIDES.length) % SLIDES.length)}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-700 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M7.5 2L3.5 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <SlideDots total={SLIDES.length} active={activeSlide} onSelect={goToSlide} reduced={reduced} />

              {/* Next */}
              <button
                onClick={advance}
                aria-label="Next slide"
                className="w-8 h-8 rounded-full border border-slate-200 bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-700 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M4.5 2L8.5 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Pause/resume */}
              <button
                onClick={() => setIsPaused(p => !p)}
                aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
                aria-pressed={isPaused}
                className="w-8 h-8 rounded-full border border-slate-200 bg-white/70 backdrop-blur-sm flex items-center justify-center text-slate-500 hover:border-brand-300 hover:text-brand-700 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                {isPaused ? (
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" aria-hidden>
                    <path d="M2 1.5L9.5 5.5L2 9.5V1.5Z" />
                  </svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                    <rect x="1.5" y="1" width="2.5" height="8" rx="0.5" />
                    <rect x="6" y="1" width="2.5" height="8" rx="0.5" />
                  </svg>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center pt-1.5"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-slate-400"
              animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
