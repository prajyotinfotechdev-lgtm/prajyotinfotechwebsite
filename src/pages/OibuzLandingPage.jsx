// src/pages/OibuzLandingPage.jsx
// OIBUZ — Production Responsive Polish (v3)
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Users, MapPin, Clock, Calendar, FileText, CreditCard,
  CheckCircle, ChevronDown, ArrowRight, Menu, X, Building2,
  Smartphone, Receipt, BarChart3, Shield, Lock, Bell,
  HardHat, Settings, Eye, Workflow,
  UserCheck, AlertCircle, ChevronRight,
  Check, Briefcase, FileSpreadsheet,
  ClipboardList, Archive, Send, Home,
  Globe, Layers,
} from "lucide-react";

/* ─── UTILITIES ───────────────────────────────────────────────────────────── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px", amount: threshold });
  return [ref, isInView];
}
const fadeUp  = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

/* ─── SHARED STYLES ────────────────────────────────────────────────────────── */
// Consistent container used across all sections
const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
// Section padding — generous desktop, tighter mobile
const sxPad = "py-14 sm:py-16 lg:py-20 xl:py-24";
const sxPadSm = "py-10 sm:py-14 lg:py-18";

/* ─── HEADER ─────────────────────────────────────────────────────────────── */
function OibuzHeader({ onDemoClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const navLinks = [
    { label: "Platform",         href: "#platform"     },
    { label: "Features",         href: "#features"     },
    { label: "For Construction", href: "#construction" },
    { label: "How It Works",     href: "#how-it-works" },
    { label: "FAQ",              href: "#faq"          },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className={container}>
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo */}
          <a href="#" className="flex-shrink-0 flex items-center" aria-label="Oibuz home">
            <img
              src="/images/oibuz-logo.png"
              alt="Oibuz"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Desktop nav — only at lg+ */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
            {navLinks.map(l => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-slate-600 hover:text-[#1a3a6b] transition-colors whitespace-nowrap"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onDemoClick}
              id="nav-demo-btn"
              className="flex items-center gap-2 bg-[#1a3a6b] hover:bg-[#15305a] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:shadow-lg whitespace-nowrap"
            >
              Book a Demo <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          </div>

          {/* Mobile: optional small CTA + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onDemoClick}
              className="hidden sm:flex items-center gap-1.5 bg-[#1a3a6b] text-white text-xs font-semibold px-4 py-2.5 rounded-lg"
            >
              Book Demo
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden"
          >
            <nav className="px-4 pt-3 pb-5 space-y-1" aria-label="Mobile navigation">
              {navLinks.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 min-h-[48px]"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => { onDemoClick(); setMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-[#1a3a6b] text-white text-sm font-semibold py-3.5 rounded-xl min-h-[48px]"
                >
                  Book a Demo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ─── HERO DASHBOARD — DESKTOP ───────────────────────────────────────────── */
function HeroDashboardDesktop() {
  const kpis = [
    { l: "Total Employees", v: "248", c: "#2563eb", I: Users     },
    { l: "Present Today",   v: "231", c: "#059669", I: UserCheck },
    { l: "On Leave",        v: "12",  c: "#d97706", I: Calendar  },
    { l: "Pending",         v: "7",   c: "#dc2626", I: Bell      },
  ];
  const activity = [
    { m: "Rahul punched in",   s: "Site A · 08:02 AM", c: "#059669" },
    { m: "Leave approved",     s: "Amit · 2 days",     c: "#2563eb" },
    { m: "Expense submitted",  s: "Site B · ₹4,850",  c: "#d97706" },
    { m: "Timesheet approved", s: "Site C",             c: "#7c3aed" },
  ];
  const sideNav = [
    { I: Home,          l: "Dashboard",  a: true },
    { I: Users,         l: "Employees"           },
    { I: Clock,         l: "Attendance"          },
    { I: Calendar,      l: "Leave"               },
    { I: FileSpreadsheet, l: "Timesheets"        },
    { I: Receipt,       l: "Expenses"            },
    { I: CreditCard,    l: "Payroll"             },
    { I: CheckCircle,   l: "Approvals"           },
    { I: BarChart3,     l: "Reports"             },
    { I: Settings,      l: "Settings"            },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-full">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1f3d] flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-400/80 flex-shrink-0" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80 flex-shrink-0" />
        <div className="w-3 h-3 rounded-full bg-green-400/80 flex-shrink-0" />
        <span className="ml-2 text-xs text-slate-400 font-mono truncate">Oibuz · Workforce Platform</span>
        <span className="ml-auto text-[10px] text-slate-500 italic flex-shrink-0 hidden sm:block">Demo data</span>
      </div>

      <div className="flex" style={{ minHeight: 320 }}>
        {/* Sidebar */}
        <div className="w-32 xl:w-36 bg-[#0f1f3d] py-3 px-2 flex-col hidden md:flex gap-0.5 flex-shrink-0">
          {sideNav.map(({ I, l, a }) => (
            <div
              key={l}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium ${
                a ? "bg-[#2563eb] text-white" : "text-slate-400"
              }`}
            >
              <I className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{l}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-[#f7f9fc] p-3 xl:p-4 min-w-0">
          <p className="text-[10px] text-slate-400 mb-0.5">Mon, 30 Sep — Illustrative Demo</p>
          <p className="text-xs font-bold text-slate-700 mb-3">Good Morning, Admin</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {kpis.map(({ l, v, c, I }) => (
              <div key={l} className="bg-white rounded-xl p-2.5 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] text-slate-500 leading-tight">{l}</span>
                  <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: `${c}18` }}>
                    <I className="w-2.5 h-2.5" style={{ color: c }} />
                  </div>
                </div>
                <p className="text-base font-black text-slate-800">{v}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-100 mb-2">
            <p className="text-[9px] font-semibold text-slate-500 mb-1.5">Attendance — This Week</p>
            <div className="flex items-end gap-1 h-10">
              {[78, 85, 92, 88, 95, 91, 83].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, backgroundColor: i === 4 ? "#2563eb" : "#bfdbfe" }} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-3 border border-slate-100">
            <p className="text-[9px] font-semibold text-slate-500 mb-1.5">Recent Activity</p>
            {activity.map(({ m, s, c }) => (
              <div key={m} className="flex items-start gap-1.5 mb-1 last:mb-0">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: c }} />
                <div className="min-w-0">
                  <p className="text-[9px] font-medium text-slate-700 truncate">{m}</p>
                  <p className="text-[8px] text-slate-400 truncate">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO DASHBOARD — MOBILE (simplified card) ──────────────────────────── */
function HeroDashboardMobile() {
  const stats = [
    { l: "Employees", v: "248", c: "#2563eb", I: Users     },
    { l: "Present",   v: "231", c: "#059669", I: UserCheck },
    { l: "On Leave",  v: "12",  c: "#d97706", I: Calendar  },
    { l: "Pending",   v: "7",   c: "#dc2626", I: Bell      },
  ];
  const modules = [
    { I: Clock,         l: "Attendance",   c: "#2563eb" },
    { I: Calendar,      l: "Leave",        c: "#059669" },
    { I: FileSpreadsheet, l: "Timesheets", c: "#7c3aed" },
    { I: Receipt,       l: "Expenses",     c: "#d97706" },
    { I: CreditCard,    l: "Payroll",      c: "#059669" },
    { I: CheckCircle,   l: "Approvals",    c: "#0891b2" },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden w-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#0f1f3d]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
        </div>
        <span className="ml-2 text-xs text-slate-400">Oibuz · Demo View</span>
      </div>
      <div className="p-4 bg-[#f7f9fc]">
        <p className="text-[10px] text-slate-400 italic mb-3">Illustrative demo data</p>
        {/* KPI 2x2 */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {stats.map(({ l, v, c, I }) => (
            <div key={l} className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c}15` }}>
                <I className="w-4.5 h-4.5" style={{ color: c }} />
              </div>
              <div>
                <p className="text-lg font-black text-slate-800 leading-none">{v}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{l}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Module grid */}
        <div className="grid grid-cols-3 gap-2">
          {modules.map(({ I, l, c }) => (
            <div key={l} className="bg-white rounded-xl p-2.5 border border-slate-100 text-center">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-1.5" style={{ backgroundColor: `${c}12` }}>
                <I className="w-4 h-4" style={{ color: c }} />
              </div>
              <p className="text-[10px] font-semibold text-slate-600">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function HeroSection({ onDemoClick }) {
  const [ref, inView] = useScrollReveal(0.05);
  const pills = [
    { I: Smartphone,      l: "Selfie & Location Attendance" },
    { I: FileSpreadsheet, l: "Project Timesheets"            },
    { I: CheckCircle,     l: "Structured Approvals"          },
    { I: CreditCard,      l: "Integrated Payroll"            },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-[68px] overflow-hidden"
      style={{ background: "linear-gradient(135deg, #eef2ff 0%, #e8f0fe 50%, #f7f9fc 100%)" }}
    >
      {/* Construction BG — hidden on xs, faded on sm */}
      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          backgroundImage: "url('/images/construction-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, transparent 65%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, transparent 65%)",
        }}
      />
      {/* Left white fade */}
      <div
        className="absolute inset-y-0 left-0 hidden sm:block pointer-events-none"
        style={{
          width: "60%",
          background: "linear-gradient(to right, #eef2ff 0%, rgba(238,242,255,0.97) 60%, transparent 100%)",
        }}
      />

      <div className={`relative ${container} py-12 sm:py-16 lg:py-20`}>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* LEFT — copy */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
            className="max-w-xl"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="mb-5">
              <div className="inline-flex items-center gap-2 bg-[#1a3a6b]/8 border border-[#1a3a6b]/15 rounded-full px-4 py-1.5">
                <HardHat className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0" />
                <span className="text-xs font-semibold text-[#1a3a6b] tracking-wide uppercase leading-none">
                  Workforce Management for Construction
                </span>
              </div>
            </motion.div>

            {/* H1 — clamp for responsive sizing */}
            <motion.h1
              variants={fadeUp}
              className="font-extrabold text-[#0f1f3d] tracking-tight mb-5 leading-[1.08]"
              style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.5rem)" }}
            >
              Workforce Management<br className="hidden sm:block" />
              {" "}Built for{" "}
              <span style={{ color: "#2563eb" }}>Construction.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-base sm:text-lg text-slate-600 leading-relaxed mb-7">
              Manage attendance, leave, timesheets, expenses and payroll across your workforce — from one connected platform.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={onDemoClick}
                id="hero-demo-btn"
                className="flex items-center justify-center gap-2 bg-[#1a3a6b] hover:bg-[#15305a] text-white font-semibold px-7 py-3.5 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5 min-h-[48px] w-full sm:w-auto"
              >
                Book a Demo <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
              <a
                href="#platform"
                className="flex items-center justify-center gap-2 border border-[#1a3a6b]/25 text-[#1a3a6b] font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1a3a6b]/5 transition-all min-h-[48px] w-full sm:w-auto text-center"
              >
                Explore Platform
              </a>
            </motion.div>

            {/* Feature pills — 2×2 on mobile, row on larger */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              {pills.map(({ I, l }) => (
                <div
                  key={l}
                  className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl sm:rounded-full px-3 py-2 shadow-sm"
                >
                  <I className="w-3.5 h-3.5 text-[#2563eb] flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-700 leading-tight">{l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — desktop dashboard (hidden on mobile, shown below instead) */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex justify-end"
          >
            <div className="w-full max-w-[520px]">
              <HeroDashboardDesktop />
            </div>
          </motion.div>
        </div>

        {/* Mobile dashboard — shown below copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="lg:hidden mt-10"
        >
          <HeroDashboardMobile />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── AUDIENCE STRIP ─────────────────────────────────────────────────────── */
function AudienceStrip() {
  const [ref, inView] = useScrollReveal();
  const items = [
    { I: Building2, t: "Construction Companies",   d: "Multi-disciplinary firms managing large on-site and back-office workforces." },
    { I: HardHat,   t: "Contractors",              d: "Specialist contractors coordinating teams, approvals and documentation." },
    { I: MapPin,    t: "Multi-Site Teams",          d: "Operations spread across multiple active sites needing centralized oversight." },
    { I: Briefcase, t: "Project-Based Businesses",  d: "Project-driven organizations needing precise time, expense and workforce tracking." },
  ];
  return (
    <section className="bg-white py-12 sm:py-14 border-b border-slate-100" id="construction">
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.p variants={fadeUp} className="text-center text-xs font-bold tracking-widest text-[#2563eb] uppercase mb-8">
            Built for Distributed Construction Workforces
          </motion.p>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {items.map(({ I, t, d }) => (
              <motion.div
                key={t}
                variants={fadeUp}
                className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-slate-100 hover:border-[#2563eb]/20 hover:bg-[#f0f5ff]/60 transition-all hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a3a6b]/8 flex items-center justify-center mb-4 group-hover:bg-[#2563eb]/12 transition-colors">
                  <I className="w-5 h-5 text-[#1a3a6b]" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-2">{t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PROBLEM ────────────────────────────────────────────────────────────── */
function ProblemSection() {
  const [ref, inView] = useScrollReveal();
  const probs = [
    { n: "01", I: ClipboardList,  t: "Manual Attendance",      d: "Paper registers make it nearly impossible to verify whether a worker was actually on site.",        v: "📋 Paper Register" },
    { n: "02", I: Bell,           t: "Scattered Approvals",    d: "Leave requests lost in WhatsApp threads cause delays and disputes at payroll time.",                  v: "💬 WhatsApp"       },
    { n: "03", I: FileSpreadsheet, t: "Payroll Admin",         d: "Combining attendance, leave and timesheets at month-end is time-consuming and error-prone.",          v: "📊 Excel Sheet"    },
    { n: "04", I: Eye,            t: "Limited Visibility",     d: "Business owners have no real-time view into who is working or where bottlenecks are.",                v: "🔍 Manual Reports" },
  ];
  return (
    <section className={`bg-slate-50 ${sxPad}`} id="features">
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="max-w-3xl mb-10 sm:mb-12">
            <h2
              className="font-extrabold text-[#0f1f3d] leading-tight mb-4"
              style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.5rem)" }}
            >
              Construction workforce management should not live in WhatsApp, paper and spreadsheets.
            </h2>
            <p className="text-base sm:text-lg text-slate-500">Managing people across active sites creates operational gaps in attendance, approvals, expenses, timesheets and payroll.</p>
          </motion.div>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
            {probs.map(({ n, I, t, d, v }) => (
              <motion.div key={n} variants={fadeUp} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-slate-100">{n}</span>
                  <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <I className="w-4 h-4 text-red-400" />
                  </div>
                </div>
                <div className="inline-block bg-slate-100 rounded-lg px-3 py-1 text-xs text-slate-500 font-mono mb-3">{v}</div>
                <h3 className="text-sm font-bold text-slate-800 mb-1.5">{t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-slate-200" />
              <span className="text-sm text-slate-400">Replace with</span>
              <div className="h-px w-12 bg-slate-200" />
            </div>
            <div className="flex items-center gap-3 bg-[#0f1f3d] text-white rounded-2xl px-6 sm:px-8 py-4 shadow-xl max-w-xs sm:max-w-none">
              <img src="/images/oibuz-logo.png" alt="Oibuz" className="h-6 sm:h-7 w-auto brightness-0 invert flex-shrink-0" />
              <div>
                <p className="text-sm font-bold">One connected workforce platform</p>
                <p className="text-xs text-blue-200">Built for construction teams</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CORE PLATFORM ──────────────────────────────────────────────────────── */
function CorePlatform() {
  const [ref, inView] = useScrollReveal();
  const mods = [
    { I: Users,         t: "Employee Management", d: "Centralized digital directory — profiles, roles, salary setup and reporting structure.",         c: "#2563eb", lg: true },
    { I: Clock,         t: "Attendance",          d: "Mobile punch in/out with selfie and location capture. Correction workflows included.",           c: "#059669", lg: true },
    { I: Calendar,      t: "Leave Management",    d: "Leave balance tracking, multi-level approvals and automatic policy enforcement.",               c: "#7c3aed" },
    { I: FileSpreadsheet, t: "Timesheets",         d: "Log daily project and task hours for accurate labor distribution.",                             c: "#0891b2" },
    { I: Receipt,       t: "Reimbursements",      d: "Receipt uploads and structured multi-level claim approvals through Finance.",                   c: "#d97706" },
    { I: CreditCard,    t: "Payroll",             d: "HR-driven payroll calculation from attendance, leaves and base salary data.",                   c: "#059669" },
    { I: FileText,      t: "Salary Slips",        d: "Auto-generated PDF salary slips published after payroll finalization.",                         c: "#2563eb" },
    { I: BarChart3,     t: "Reports & Visibility", d: "Consolidated workforce summaries and SLA escalations for business leaders.",                   c: "#1a3a6b" },
  ];
  return (
    <section className={`bg-white ${sxPad}`} id="platform">
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Core Platform</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
              Everything your workforce needs. One platform.
            </h2>
            <p className="text-base sm:text-lg text-slate-500">Oibuz connects employees, managers, HR, finance and business owners through structured digital workflows.</p>
          </motion.div>

          {/* Featured 2 modules — full width on mobile, half on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {mods.slice(0, 2).map(({ I, t, d, c }) => (
              <motion.div key={t} variants={fadeUp} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 hover:shadow-lg transition-all hover:-translate-y-0.5">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c}12` }}>
                    <I className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: c }} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1.5">{t}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{d}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting 6 modules — 1 col mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mods.slice(2).map(({ I, t, d, c }) => (
              <motion.div key={t} variants={fadeUp} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${c}12` }}>
                  <I className="w-5 h-5" style={{ color: c }} />
                </div>
                <h3 className="text-sm font-bold text-slate-800 mb-1.5">{t}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MULTI-SITE ─────────────────────────────────────────────────────────── */
function MultiSiteSection() {
  const [ref, inView] = useScrollReveal();
  const sites = [
    { n: "Site A", items: ["Workers", "Attendance", "Timesheets"], c: "#2563eb" },
    { n: "Site B", items: ["Workers", "Attendance", "Expenses"],   c: "#059669" },
    { n: "Site C", items: ["Workers", "Attendance", "Approvals"],  c: "#7c3aed" },
  ];
  const roles = ["Manager", "HR", "Finance", "Business Owner"];

  return (
    <section
      className={`${sxPad} relative overflow-hidden`}
      style={{ background: "linear-gradient(135deg, #e8f0fe 0%, #f0f5ff 100%)" }}
      id="how-it-works"
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('/images/construction-bg.png')", backgroundSize: "cover" }} />
      <div className={`relative ${container}`}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Multi-Site Operations</span>
            <h2 className="font-extrabold text-[#0f1f3d] leading-tight mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
              Your workforce may be spread across sites.{" "}
              <span style={{ color: "#2563eb" }}>Your system should not be.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600">Oibuz brings field-level activity and back-office operations into one connected platform.</p>
          </motion.div>

          <div className="max-w-xl mx-auto">
            {/* Sites row */}
            <motion.div variants={stagger} className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
              {sites.map(({ n, items, c }) => (
                <motion.div key={n} variants={fadeUp} className="bg-white rounded-2xl p-3 sm:p-5 border shadow-sm text-center" style={{ borderColor: `${c}25` }}>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl mx-auto mb-2 sm:mb-3 flex items-center justify-center" style={{ backgroundColor: `${c}12` }}>
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: c }} />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 mb-1 sm:mb-2">{n}</p>
                  {items.map(i => (
                    <div key={i} className="text-[10px] sm:text-xs text-slate-500 py-0.5 sm:py-1 border-b border-slate-50 last:border-0">{i}</div>
                  ))}
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-center my-4">
              <div className="w-px h-6 bg-[#2563eb]/30" />
              <ChevronDown className="w-4 h-4 text-[#2563eb]" />
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#0f1f3d] text-white rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-center shadow-xl mx-auto max-w-[260px] mb-4">
              <img src="/images/oibuz-logo.png" alt="Oibuz" className="h-7 sm:h-8 w-auto mx-auto mb-2 brightness-0 invert" />
              <p className="text-xs sm:text-sm font-semibold text-blue-200">Connected Workforce Platform</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col items-center my-4">
              <div className="w-px h-6 bg-[#2563eb]/30" />
              <ChevronDown className="w-4 h-4 text-[#2563eb]" />
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {roles.map(r => (
                <motion.div key={r} variants={fadeUp} className="bg-white rounded-xl py-2.5 px-3 text-center text-xs sm:text-sm font-semibold text-[#1a3a6b] border border-[#2563eb]/15 shadow-sm">
                  {r}
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="text-center text-xs text-slate-400 mt-5 italic">
              Centralized workforce management — not employee surveillance.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── PRODUCT SHOWCASE ───────────────────────────────────────────────────── */
function ProductShowcase({ onDemoClick }) {
  const [active, setActive] = useState("Dashboard");
  const [ref, inView] = useScrollReveal();
  const tabs = ["Dashboard", "Attendance", "Leave", "Timesheets", "Reimbursements", "Payroll"];

  const screens = {
    Dashboard: (
      <div className="bg-[#f7f9fc] rounded-xl p-3 sm:p-4 h-full">
        <p className="text-[9px] sm:text-[10px] text-slate-400 italic mb-2">Illustrative demo data</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {[{ l: "Employees", v: "248", c: "#2563eb" }, { l: "Present", v: "231", c: "#059669" }, { l: "On Leave", v: "12", c: "#d97706" }, { l: "Pending", v: "7", c: "#dc2626" }].map(({ l, v, c }) => (
            <div key={l} className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-100 shadow-sm text-center">
              <p className="text-lg sm:text-xl font-black" style={{ color: c }}>{v}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 leading-tight">{l}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 bg-white rounded-xl p-3 sm:p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-600 mb-2 sm:mb-3">Attendance — This Week</p>
            <div className="flex items-end gap-1.5 h-16 sm:h-24">
              {[88, 92, 85, 96, 91].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, backgroundColor: i === 3 ? "#2563eb" : "#bfdbfe" }} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100">
            <p className="text-xs font-semibold text-slate-600 mb-2 sm:mb-3">Status</p>
            {[{ l: "Sites Active", v: "3", c: "#059669" }, { l: "Approvals Due", v: "7", c: "#d97706" }, { l: "Payroll Ready", v: "Yes", c: "#2563eb" }].map(({ l, v, c }) => (
              <div key={l} className="flex justify-between mb-2 last:mb-0">
                <span className="text-[10px] sm:text-xs text-slate-500">{l}</span>
                <span className="text-xs font-bold" style={{ color: c }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    Attendance: (
      <div className="bg-[#f7f9fc] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <p className="text-sm font-bold text-slate-800">Attendance Log</p>
            <p className="text-[10px] sm:text-xs text-slate-500">Monday, 30 September — Demo</p>
          </div>
          <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">231 Present</span>
        </div>
        <div className="bg-white rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-xs min-w-[360px]">
            <thead className="bg-slate-50">
              <tr>{["Employee", "Site", "Punch In", "Status"].map(h => <th key={h} className="text-left px-3 sm:px-4 py-2.5 text-slate-500 font-semibold whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { n: "Rahul Sharma", s: "Site A", t: "08:02 AM", st: "Present",  c: "#059669" },
                { n: "Amit Kumar",   s: "Site B", t: "08:15 AM", st: "Present",  c: "#059669" },
                { n: "Priya Singh",  s: "HQ",     t: "09:00 AM", st: "Present",  c: "#059669" },
                { n: "Vijay Patil",  s: "Site C", t: "—",        st: "On Leave", c: "#d97706" },
              ].map(({ n, s, t, st, c }) => (
                <tr key={n} className="hover:bg-slate-50">
                  <td className="px-3 sm:px-4 py-2.5 font-medium text-slate-700 whitespace-nowrap">{n}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-slate-500">{s}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-slate-500 whitespace-nowrap">{t}</td>
                  <td className="px-3 sm:px-4 py-2.5"><span className="font-semibold text-[11px]" style={{ color: c }}>{st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    Leave: (
      <div className="bg-[#f7f9fc] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <p className="text-sm font-bold text-slate-800">Leave Requests</p>
          <span className="text-[10px] sm:text-xs bg-amber-100 text-amber-700 font-semibold px-2 sm:px-3 py-1 rounded-full">3 Pending</span>
        </div>
        <div className="space-y-3">
          {[
            { n: "Rahul Sharma", t: "Casual Leave", d: "Oct 5–6",   dy: 2, st: "Pending Manager", c: "#d97706", p: 30  },
            { n: "Amit Kumar",   t: "Sick Leave",   d: "Sep 30",    dy: 1, st: "Approved",         c: "#059669", p: 100 },
            { n: "Priya Singh",  t: "Annual Leave", d: "Oct 10–14", dy: 5, st: "Pending HR",       c: "#2563eb", p: 60  },
          ].map(({ n, t, d, dy, st, c, p }) => (
            <div key={n} className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
              <div className="flex items-start sm:items-center justify-between mb-2 gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{n}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">{t} · {d} · {dy} day{dy > 1 ? "s" : ""}</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: `${c}12`, color: c }}>{st}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full">
                <div className="h-full rounded-full transition-all" style={{ width: `${p}%`, backgroundColor: c }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    Timesheets: (
      <div className="bg-[#f7f9fc] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <p className="text-sm font-bold text-slate-800">Timesheet Logs — Week 39</p>
          <span className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 font-semibold px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">Review Mode</span>
        </div>
        <div className="space-y-3">
          {[
            { e: "Rahul Sharma", p: "Site A – Foundation", h: "40h", t: "Excavation & Piling", s: "Submitted" },
            { e: "Amit Kumar",   p: "Site B – Framing",    h: "38h", t: "RCC Column Work",     s: "Approved"  },
            { e: "Sanjay Rao",   p: "Site A – Foundation", h: "35h", t: "Formwork Setup",      s: "Submitted" },
          ].map(({ e, p, h, t, s }) => (
            <div key={e} className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-bold text-slate-800 truncate mr-2">{e}</p>
                <span className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${s === "Approved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{s}</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 mb-1 truncate">{p}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-xs text-slate-400 truncate mr-2">{t}</span>
                <span className="text-sm font-bold text-[#2563eb] flex-shrink-0">{h}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    Reimbursements: (
      <div className="bg-[#f7f9fc] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <p className="text-sm font-bold text-slate-800">Expense Claims</p>
          <span className="text-[10px] sm:text-xs bg-orange-100 text-orange-700 font-semibold px-2 sm:px-3 py-1 rounded-full">3 Active</span>
        </div>
        <div className="space-y-3">
          {[
            { e: "Amit Kumar",  d: "Site B – Emergency Cement", a: "₹4,850", s: "Finance Review", p: 75 },
            { e: "Priya Singh", d: "Travel – Client Meeting",    a: "₹2,200", s: "HR Approved",    p: 60 },
            { e: "Vijay Patil", d: "Site A – Safety Equipment",  a: "₹5,350", s: "Manager Review", p: 30 },
          ].map(({ e, d, a, s, p }) => (
            <div key={e} className="bg-white rounded-xl p-3 sm:p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-bold text-slate-800 truncate mr-2">{e}</p>
                <p className="text-sm font-bold text-[#1a3a6b] flex-shrink-0">{a}</p>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 mb-2 truncate">{d}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full min-w-0">
                  <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${p}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap flex-shrink-0">{s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    Payroll: (
      <div className="bg-[#f7f9fc] rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div>
            <p className="text-sm font-bold text-slate-800">Payroll — September 2025</p>
            <p className="text-[10px] sm:text-xs text-slate-500 italic">Illustrative demo data</p>
          </div>
          <span className="text-[10px] sm:text-xs bg-green-100 text-green-700 font-semibold px-2 sm:px-3 py-1 rounded-full">Ready</span>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
          {[{ l: "Employees", v: "248" }, { l: "Total CTC", v: "₹18.4L" }, { l: "Net Payable", v: "₹16.2L" }].map(({ l, v }) => (
            <div key={l} className="bg-white rounded-xl p-2.5 sm:p-3 border border-slate-100 text-center">
              <p className="text-sm sm:text-lg font-bold text-[#1a3a6b]">{v}</p>
              <p className="text-[9px] sm:text-[10px] text-slate-500 leading-tight">{l}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-slate-100 overflow-x-auto">
          <table className="w-full text-xs min-w-[300px]">
            <thead className="bg-slate-50">
              <tr>
                {["Employee", "Days", "Net Pay", "Slip"].map(h => <th key={h} className={`px-3 sm:px-4 py-2 text-slate-500 font-semibold whitespace-nowrap ${h === "Net Pay" ? "text-right" : "text-left"}`}>{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[{ n: "Rahul Sharma", d: 26, p: "₹24,800" }, { n: "Amit Kumar", d: 24, p: "₹22,100" }, { n: "Priya Singh", d: 25, p: "₹38,500" }].map(({ n, d, p }) => (
                <tr key={n} className="hover:bg-slate-50">
                  <td className="px-3 sm:px-4 py-2.5 font-medium text-slate-700 whitespace-nowrap">{n}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-slate-500">{d}</td>
                  <td className="px-3 sm:px-4 py-2.5 text-right font-bold whitespace-nowrap">{p}</td>
                  <td className="px-3 sm:px-4 py-2.5"><span className="text-[10px] text-[#2563eb] font-semibold">PDF ↓</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  };

  const sideNav = [
    { I: Home,            l: "Dashboard",    id: "Dashboard"      },
    { I: Users,           l: "Employees"                          },
    { I: Clock,           l: "Attendance",   id: "Attendance"     },
    { I: Calendar,        l: "Leave",        id: "Leave"          },
    { I: FileSpreadsheet, l: "Timesheets",   id: "Timesheets"     },
    { I: Receipt,         l: "Expenses",     id: "Reimbursements" },
    { I: CreditCard,      l: "Payroll",      id: "Payroll"        },
    { I: CheckCircle,     l: "Approvals"                          },
    { I: BarChart3,       l: "Reports"                            },
    { I: Settings,        l: "Settings"                           },
  ];

  return (
    <section className={`bg-white ${sxPad}`} id="showcase">
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Product Showcase</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>See Oibuz in action.</h2>
            <p className="text-base sm:text-lg text-slate-500">One connected workspace for day-to-day workforce operations.</p>
          </motion.div>

          {/* Tab strip — horizontal scroll on mobile, NO page overflow */}
          <motion.div variants={fadeUp} className="mb-6 sm:mb-7">
            <div
              className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActive(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 min-h-[40px] ${
                    active === tab ? "bg-[#1a3a6b] text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Browser mockup */}
          <motion.div variants={fadeUp}>
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-[#0f1f3d]">
                <div className="flex gap-1.5 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 mx-3 bg-slate-700/50 rounded-md px-3 py-1 text-[10px] sm:text-xs text-slate-400 font-mono truncate">
                  app.oibuz.com/{active.toLowerCase()}
                </div>
              </div>

              <div className="flex" style={{ minHeight: 340 }}>
                {/* Side nav — desktop only */}
                <div className="w-36 bg-[#0f1f3d] py-3 px-2.5 gap-0.5 flex-col hidden lg:flex flex-shrink-0">
                  {sideNav.map(({ I, l, id }) => (
                    <div
                      key={l}
                      onClick={() => id && setActive(id)}
                      className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                        id === active ? "bg-[#2563eb] text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                      } ${id ? "cursor-pointer" : ""}`}
                    >
                      <I className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{l}</span>
                    </div>
                  ))}
                </div>

                {/* Screen content */}
                <div className="flex-1 overflow-hidden min-w-0">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.18 }}
                      className="h-full p-3 sm:p-4"
                    >
                      {screens[active]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="text-center mt-8 sm:mt-9">
            <button
              onClick={onDemoClick}
              id="showcase-demo-btn"
              className="inline-flex items-center gap-2 bg-[#1a3a6b] hover:bg-[#15305a] text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-all hover:shadow-xl hover:-translate-y-0.5 min-h-[48px]"
            >
              Book a Demo to See the Full Platform <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── HOW IT WORKS ───────────────────────────────────────────────────────── */
function HowItWorks() {
  const [ref, inView] = useScrollReveal();
  const steps = [
    { n: "01", t: "Capture",  I: Smartphone, d: "Employees submit attendance, leave, timesheets or expense claims from their devices.",         c: "#2563eb" },
    { n: "02", t: "Review",   I: Eye,        d: "Managers review requests against project reality and team availability.",                       c: "#059669" },
    { n: "03", t: "Control",  I: Shield,     d: "HR and Finance handle policy verification and financial workflows where applicable.",            c: "#7c3aed" },
    { n: "04", t: "Manage",   I: BarChart3,  d: "Business leaders receive centralized workforce visibility and consolidated reports.",            c: "#1a3a6b" },
  ];
  const flow = ["Employee", "Manager", "HR", "Finance", "Admin"];
  return (
    <section className={`${sxPad}`} style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)" }}>
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Workflow</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
              Simple for employees.{" "}
              <span style={{ color: "#2563eb" }}>Structured for management.</span>
            </h2>
          </motion.div>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
            {steps.map(({ n, t, I, d, c }) => (
              <motion.div key={n} variants={fadeUp} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black" style={{ color: `${c}22` }}>{n}</span>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c}12` }}>
                    <I className="w-5 h-5" style={{ color: c }} />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">{t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-2">
            {flow.map((r, i) => (
              <React.Fragment key={r}>
                <div className="bg-white rounded-xl px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#1a3a6b] border border-[#2563eb]/20 shadow-sm whitespace-nowrap">
                  {r}
                </div>
                {i < flow.length - 1 && <ChevronRight className="w-4 h-4 text-[#2563eb]/50 hidden sm:block flex-shrink-0" />}
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── APPROVAL FLOWS ─────────────────────────────────────────────────────── */
function SignatureWorkflow() {
  const [active, setActive] = useState("Leave");
  const [ref, inView] = useScrollReveal();
  const sc = { submitted: "#2563eb", reviewing: "#d97706", verifying: "#7c3aed", done: "#059669" };
  const flows = {
    Leave: {
      title: "Leave Request",
      steps: [
        { a: "Employee", d: "Checks balance and submits leave request",       I: Smartphone,    s: "submitted" },
        { a: "Manager",  d: "Reviews site coverage and approves",             I: Eye,           s: "reviewing" },
        { a: "HR",       d: "Verifies policy and gives final approval",       I: UserCheck,     s: "verifying" },
        { a: "System",   d: "Leave balance deducted. Request completed.",     I: CheckCircle,   s: "done"      },
      ],
    },
    Timesheet: {
      title: "Timesheet Submission",
      steps: [
        { a: "Employee", d: "Logs daily project and task hours",              I: FileSpreadsheet, s: "submitted" },
        { a: "Manager",  d: "Reviews labor hours against project reality",    I: Eye,             s: "reviewing" },
        { a: "System",   d: "Timesheet locked and recorded.",                I: CheckCircle,     s: "done"      },
      ],
    },
    Reimbursement: {
      title: "Expense Reimbursement",
      steps: [
        { a: "Employee", d: "Submits receipt photo and expense claim",        I: Receipt,        s: "submitted" },
        { a: "Manager",  d: "Validates expense against project need",         I: Eye,            s: "reviewing" },
        { a: "HR",       d: "Reviews against company expense policy",         I: UserCheck,      s: "verifying" },
        { a: "Finance",  d: "Final verification and payment clearance",       I: CreditCard,     s: "verifying" },
        { a: "System",   d: "Claim approved. Payment processed.",             I: CheckCircle,    s: "done"      },
      ],
    },
  };
  return (
    <section className={`bg-white ${sxPad}`}>
      <div className="mx-auto w-full max-w-[800px] px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Approval Flows</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-3" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
              Every request follows the right path.
            </h2>
            <p className="text-sm sm:text-base text-slate-500">Structured workflows ensure nothing is approved without proper oversight.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-2 justify-center mb-7 flex-wrap">
            {Object.keys(flows).map(k => (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all min-h-[44px] ${
                  active === k ? "bg-[#1a3a6b] text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {k}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">{flows[active].title}</p>
              {flows[active].steps.map(({ a, d, I, s }, i, arr) => (
                <div key={a + i} className="flex gap-4 sm:gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0" style={{ borderColor: sc[s], backgroundColor: `${sc[s]}12` }}>
                      <I className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: sc[s] }} />
                    </div>
                    {i < arr.length - 1 && <div className="w-px flex-1 min-h-6 my-1" style={{ backgroundColor: `${sc[s]}30` }} />}
                  </div>
                  <div className="pb-5 sm:pb-6">
                    <p className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{ color: sc[s] }}>{a}</p>
                    <p className="text-sm text-slate-600">{d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ROLES ──────────────────────────────────────────────────────────────── */
function RoleSection() {
  const [active, setActive] = useState("Employee");
  const [ref, inView] = useScrollReveal();
  const roles = {
    Employee: { I: Smartphone,  c: "#2563eb", tag: "Your daily work, in one place.",            caps: ["Punch in and out with selfie and location", "Submit leave requests and track balances", "Log daily project timesheets", "Submit expense receipts for reimbursement", "Download monthly salary slips"] },
    Manager:  { I: Eye,         c: "#059669", tag: "Oversight of your direct team.",             caps: ["View direct-team attendance records", "Review and approve leave requests", "Approve project timesheets", "Validate reimbursement claims", "Track team availability across sites"] },
    HR:       { I: UserCheck,   c: "#7c3aed", tag: "Workforce administration, centralized.",     caps: ["Manage employee profiles and roles", "Oversee attendance and corrections", "Final leave approval and policy verification", "Run and publish monthly payroll", "Workforce administration and reporting"] },
    Finance:  { I: CreditCard,  c: "#d97706", tag: "Financial control for reimbursements.",     caps: ["Review manager-approved expense claims", "Verify receipt amounts and documentation", "Issue final approval for reimbursement", "Track outstanding expense obligations"] },
    Admin:    { I: Shield,      c: "#1a3a6b", tag: "Organization-wide visibility and control.", caps: ["View all data across the organization", "Configure system-wide policies", "Review full audit logs", "Manage workflow and escalation rules", "Override approvals when required"] },
  };
  return (
    <section className={`bg-slate-50 ${sxPad}`} id="roles">
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Roles</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>One platform. Every role.</h2>
            <p className="text-sm sm:text-base text-slate-500">Each role sees exactly what they need. Nothing more. Nothing less.</p>
          </motion.div>

          {/* Role tab strip — horizontal scroll on mobile */}
          <motion.div variants={fadeUp} className="mb-7">
            <div
              className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center sm:flex-wrap"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Object.entries(roles).map(([r, { I, c }]) => (
                <button
                  key={r}
                  onClick={() => setActive(r)}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 min-h-[44px] ${
                    active === r ? "text-white shadow-md" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                  style={active === r ? { backgroundColor: c } : {}}
                >
                  <I className="w-3.5 h-3.5 flex-shrink-0" />{r}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="max-w-2xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden"
            >
              <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100" style={{ backgroundColor: `${roles[active].c}08` }}>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${roles[active].c}15` }}>
                    {React.createElement(roles[active].I, { className: "w-5 h-5 sm:w-6 sm:h-6", style: { color: roles[active].c } })}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800">{active}</h3>
                    <p className="text-sm text-slate-500">{roles[active].tag}</p>
                  </div>
                </div>
              </div>
              <div className="px-6 sm:px-8 py-5 sm:py-6">
                <ul className="space-y-3">
                  {roles[active].caps.map(cap => (
                    <li key={cap} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${roles[active].c}12` }}>
                        <Check className="w-3 h-3" style={{ color: roles[active].c }} />
                      </div>
                      <span className="text-sm text-slate-600">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FEATURE SPOTLIGHTS ─────────────────────────────────────────────────── */
function FeatureSpotlights() {
  const [ref, inView] = useScrollReveal();
  const spots = [
    {
      accent: "#2563eb", bg: "bg-white", label: "Attendance",
      headline: "Mobile attendance, verified on every punch.",
      bullets: ["Selfie + location capture", "Attendance correction workflow", "Daily manager visibility"],
      visual: (
        <div className="bg-[#0f1f3d] rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-44 sm:w-52 mx-auto shadow-2xl">
          <div className="bg-[#1a3a6b] rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#2563eb]/20 border-2 border-[#2563eb] mx-auto mb-2 sm:mb-3 flex items-center justify-center">
              <Smartphone className="w-5 h-5 sm:w-7 sm:h-7 text-[#2563eb]" />
            </div>
            <p className="text-white text-xs font-bold">Punch In</p>
            <p className="text-blue-300 text-[10px] mt-0.5">08:02 AM · Site A</p>
          </div>
          <div className="space-y-2">
            {[{ I: MapPin, l: "Location Captured", c: "green" }, { I: Smartphone, l: "Selfie Captured", c: "blue" }, { I: CheckCircle, l: "Verified", c: "emerald" }].map(({ I, l, c }) => (
              <div key={l} className={`flex items-center gap-2 bg-${c}-900/25 rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2`}>
                <I className={`w-3 h-3 text-${c}-400 flex-shrink-0`} />
                <span className={`text-[9px] sm:text-[10px] text-${c}-300`}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      accent: "#7c3aed", bg: "bg-slate-50", rev: true, label: "Approvals",
      headline: "Every request follows a defined path.",
      bullets: ["Multi-level approval hierarchy", "SLA escalation if ignored", "Full audit trail"],
      visual: (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 w-56 sm:w-64 mx-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Approval Status</p>
          {[
            { l: "Employee Submitted",  st: "Done",        c: "#059669", I: Send        },
            { l: "Manager Reviewed",    st: "Done",        c: "#059669", I: Eye         },
            { l: "HR Verification",     st: "In Progress", c: "#2563eb", I: UserCheck   },
            { l: "Finance Approval",    st: "Pending",     c: "#94a3b8", I: CreditCard  },
            { l: "Completed",           st: "Pending",     c: "#94a3b8", I: CheckCircle },
          ].map(({ l, st, c, I }, i, a) => (
            <div key={l} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center border-2 flex-shrink-0" style={{ borderColor: c, backgroundColor: `${c}12` }}>
                  <I className="w-3 h-3" style={{ color: c }} />
                </div>
                {i < a.length - 1 && <div className="w-px flex-1 min-h-3 my-0.5" style={{ backgroundColor: `${c}30` }} />}
              </div>
              <div className="pb-3">
                <p className="text-xs font-semibold text-slate-700 leading-tight">{l}</p>
                <p className="text-[10px] font-medium" style={{ color: c }}>{st}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      accent: "#059669", bg: "bg-white", label: "Payroll",
      headline: "Payroll built from real workforce data.",
      bullets: ["Pulls from attendance and approved leaves", "HR-controlled payroll runs", "Auto-generated PDF salary slips"],
      visual: (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 w-56 sm:w-64 mx-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Payroll Run — Demo</p>
          <div className="space-y-2 mb-4">
            {["Base Salary Data", "Attendance Records", "Approved Leaves", "Reimbursements"].map(l => (
              <div key={l} className="flex items-center gap-2.5 bg-slate-50 rounded-lg px-3 py-2">
                <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-green-600" />
                </div>
                <span className="text-xs text-slate-600">{l}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#0f1f3d] rounded-xl px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-blue-200">Net Payable</p>
              <p className="text-sm sm:text-base font-bold text-white">₹16,24,800</p>
            </div>
            <div className="flex items-center gap-1.5 bg-green-500/20 text-green-300 text-[10px] font-semibold px-2 sm:px-2.5 py-1.5 rounded-lg">
              <FileText className="w-3 h-3 flex-shrink-0" />PDF Ready
            </div>
          </div>
        </div>
      ),
    },
    {
      accent: "#1a3a6b", bg: "bg-slate-50", rev: true, label: "Visibility",
      headline: "Business-level view, without chasing updates.",
      bullets: ["Attendance summaries across sites", "Pending approval counts", "SLA breach alerts"],
      visual: (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 w-56 sm:w-64 mx-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Management Dashboard — Demo</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { l: "Workforce",     v: "248",  c: "#2563eb", I: Users     },
              { l: "Attendance",    v: "93%",  c: "#059669", I: Clock     },
              { l: "Approvals Due", v: "7",    c: "#d97706", I: Bell      },
              { l: "Sites Active",  v: "3",    c: "#7c3aed", I: Building2 },
            ].map(({ l, v, c, I }) => (
              <div key={l} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${c}12` }}>
                  <I className="w-3.5 h-3.5" style={{ color: c }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-none">{v}</p>
                  <p className="text-[9px] text-slate-500">{l}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <p className="text-[10px] text-amber-700 font-medium leading-tight">2 approvals approaching SLA deadline</p>
          </div>
        </div>
      ),
    },
  ];
  return (
    <section className={`${sxPad} bg-white`}>
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Feature Spotlights</span>
            <h2 className="font-extrabold text-[#0f1f3d]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>Core capabilities, up close.</h2>
          </motion.div>

          <div className="space-y-5 sm:space-y-6">
            {spots.map(({ accent, bg, label, headline, bullets, visual, rev }) => (
              <motion.div key={label} variants={fadeUp} className={`rounded-2xl sm:rounded-3xl overflow-hidden ${bg} border border-slate-100 shadow-sm`}>
                {/* On mobile: always text then visual. On desktop: alternate */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${rev ? "lg:[direction:rtl]" : ""}`}>
                  <div className="p-7 sm:p-8 lg:p-10 [direction:ltr] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-1 h-6 rounded-full" style={{ backgroundColor: accent }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>{label}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f1f3d] mb-5 leading-snug">{headline}</h3>
                    <ul className="space-y-2.5">
                      {bullets.map(b => (
                        <li key={b} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${accent}12` }}>
                            <Check className="w-3 h-3" style={{ color: accent }} />
                          </div>
                          <span className="text-sm text-slate-600">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className="px-7 py-8 sm:p-10 lg:p-12 flex items-center justify-center [direction:ltr]"
                    style={{ background: `linear-gradient(135deg, ${accent}07 0%, ${accent}03 100%)` }}
                  >
                    {visual}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── WHY OIBUZ ──────────────────────────────────────────────────────────── */
function WhyOibuz() {
  const [ref, inView] = useScrollReveal();
  const bens = [
    { I: HardHat,  c: "#2563eb", t: "Built for field operations.",          d: "Mobile-first tools designed for workers who are never at a desk. Attendance, leave, timesheets and expense submissions work from active construction sites." },
    { I: Workflow, c: "#7c3aed", t: "Structured workflows — no gaps.",       d: "Every request follows a defined path through the organization. Accountability is built in at each stage. Nothing is approved without proper oversight." },
    { I: Globe,    c: "#059669", t: "One view across your entire workforce.", d: "Replace disconnected processes with a single source of truth. Business leaders see workforce status, pending approvals and summaries in one place." },
  ];
  return (
    <section className={`${sxPad}`} style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)" }}>
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Why Oibuz</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
              Designed for construction. Not adapted from generic software.
            </h2>
          </motion.div>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {bens.map(({ I, c, t, d }) => (
              <motion.div key={t} variants={fadeUp} className="bg-white rounded-2xl p-6 sm:p-7 border-t-4 border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-0.5" style={{ borderTopColor: c }}>
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: `${c}12` }}>
                  <I className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: c }} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-3">{t}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CONTROL & SECURITY ─────────────────────────────────────────────────── */
function ControlSecurity() {
  const [ref, inView] = useScrollReveal();
  const pillars = [
    { I: Lock,     t: "Role-Based Access",  d: "Every user sees only the data their role permits — employees see their own records, managers see their team, HR sees the full workforce.", c: "#60a5fa" },
    { I: Workflow, t: "Approval Workflows", d: "All requests route through a structured hierarchy. No single user can unilaterally approve their own submissions.",                         c: "#34d399" },
    { I: Archive,  t: "Audit Logging",      d: "An unalterable log records every critical action — who approved what, who changed a salary, and when it happened.",                      c: "#a78bfa" },
    { I: Bell,     t: "SLA Escalations",    d: "If a manager ignores a pending request beyond the allowed window, the system automatically escalates to prevent bottlenecks.",           c: "#fbbf24" },
  ];
  return (
    <section className={`bg-[#0f1f3d] ${sxPad}`}>
      <div className={container}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase block mb-3">Control & Security</span>
            <h2 className="font-extrabold text-white mb-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>Built with control and accountability in mind.</h2>
            <p className="text-sm sm:text-base text-blue-200/70">Structured access and systematic oversight across every workflow.</p>
          </motion.div>
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {pillars.map(({ I, t, d, c }) => (
              <motion.div key={t} variants={fadeUp} className="bg-white/5 border border-white/8 rounded-2xl p-5 sm:p-6 hover:bg-white/8 transition-all">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center mb-4 sm:mb-5" style={{ backgroundColor: `${c}20` }}>
                  <I className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: c }} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 sm:mb-3">{t}</h3>
                <p className="text-sm text-blue-200/60 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);
  const [ref, inView] = useScrollReveal();
  const faqs = [
    { q: "What is Oibuz?",                                   a: "Oibuz is a cloud-based workforce and business management platform for construction companies, contractors and project-based businesses. It handles attendance, leave, timesheets, expenses, payroll and role-based approvals in a single connected system." },
    { q: "Who is Oibuz designed for?",                       a: "Oibuz is built for construction companies, contractors, multi-site teams and project-based businesses that need to manage a distributed workforce across active sites and back-office operations." },
    { q: "How does attendance verification work?",           a: "Employees punch in and out using the Oibuz mobile app. Each punch captures a selfie photo and the device's current location at that exact moment. An attendance correction workflow allows employees to request a fix for missed punch-outs, which a manager can review and approve." },
    { q: "Can employees submit leave and expense requests?", a: "Yes. Employees can view their leave balances and submit requests directly from the platform. For expenses, they upload a photo of the receipt and submit a claim. Both flow through a structured multi-level approval process." },
    { q: "Does Oibuz support project timesheets?",           a: "Yes. Employees log their daily hours against specific projects and tasks. Managers can review these logs to understand labor distribution across different sites. Timesheets require manager approval before they are locked." },
    { q: "How does the payroll workflow work?",              a: "At month end, HR initiates a payroll run. Oibuz aggregates each employee's base salary, attendance records and approved leave data to calculate the payable amount. HR reviews and finalizes the run before publishing." },
    { q: "How do employees receive salary slips?",           a: "Once HR finalizes and publishes the payroll run, Oibuz automatically generates PDF salary slips. Employees can securely download their own slip from their dashboard — no email or manual distribution required." },
    { q: "What roles are supported?",                        a: "Oibuz supports five roles: Employee, Manager, HR, Finance and Admin. Each role has a clearly defined set of permissions and visibility appropriate to their responsibilities." },
    { q: "How does role-based access work?",                 a: "Each role is scoped strictly. An employee sees only their own records. A manager sees data for their direct reports only. HR has workforce-wide visibility. Finance manages reimbursement approvals. Admin has full organizational access and audit logs." },
    { q: "Can Oibuz support distributed construction teams?", a: "Yes — this is Oibuz's core design purpose. Field workers across multiple sites submit data via mobile. Site managers review their team. HR and Finance at headquarters handle back-office workflows. Business owners see consolidated visibility across all sites." },
  ];
  return (
    <section className={`bg-white ${sxPad}`} id="faq">
      <div className="mx-auto w-full max-w-[720px] px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">FAQ</span>
            <h2 className="font-extrabold text-[#0f1f3d]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>Frequently Asked Questions</h2>
          </motion.div>
          <motion.div variants={stagger} className="space-y-2">
            {faqs.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors min-h-[52px] gap-3"
                  onClick={() => setOpen(open === i ? null : i)}
                  id={`faq-${i}`}
                  aria-expanded={open === i}
                >
                  <span className="leading-snug">{f.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 sm:px-6 pb-5 text-sm text-slate-500 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ──────────────────────────────────────────────────────────── */
function FinalCTA({ onDemoClick }) {
  const [ref, inView] = useScrollReveal();
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f1f3d 55%, #162650 100%)" }}
    >
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('/images/construction-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none hidden sm:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-white/5 pointer-events-none hidden sm:block" />

      <div className={`relative ${container} text-center`}>
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-6">
            <img src="/images/oibuz-logo.png" alt="Oibuz" className="h-10 sm:h-12 w-auto mx-auto brightness-0 invert opacity-90" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="font-extrabold text-white leading-tight mb-5 tracking-tight"
            style={{ fontSize: "clamp(1.9rem, 5vw, 3.75rem)" }}
          >
            Bring your workforce<br className="hidden sm:block" />
            {" "}operations into one system.
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base sm:text-lg text-blue-200/80 mb-8 sm:mb-10 max-w-xl mx-auto">
            See how Oibuz fits your employees, projects, sites and approval workflows.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10">
            <button
              onClick={onDemoClick}
              id="final-cta-btn"
              className="flex items-center justify-center gap-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-8 sm:px-9 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:-translate-y-0.5 min-h-[52px]"
            >
              Book a Demo <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>
            <a
              href="https://wa.me/917020708747"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 sm:px-9 py-4 rounded-xl text-base hover:bg-white/5 transition-all min-h-[52px]"
            >
              Talk to Our Team
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {["Built for construction.", "Designed for control.", "One platform."].map((s, i) => (
              <React.Fragment key={s}>
                {i > 0 && <span className="text-white/15 hidden sm:block">·</span>}
                <span className="text-sm text-blue-300/60">{s}</span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── DEMO FORM ──────────────────────────────────────────────────────────── */
function DemoForm() {
  const [ref, inView] = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", employees: "", sites: "", message: "" });
  const hc = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const hs = e => { e.preventDefault(); setSubmitted(true); };

  const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/25 focus:border-[#2563eb] transition-all min-h-[48px] bg-white";

  return (
    <section className={`bg-slate-50 ${sxPad}`} id="demo">
      <div className="mx-auto w-full max-w-[640px] px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
            <span className="text-xs font-bold tracking-widest text-[#2563eb] uppercase block mb-3">Get Started</span>
            <h2 className="font-extrabold text-[#0f1f3d] mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Request a Demo</h2>
            <p className="text-sm sm:text-base text-slate-500">Tell us about your workforce and we will show you how Oibuz fits your operations.</p>
          </motion.div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-8 sm:p-10 text-center border border-green-100 shadow-sm">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Demo Request Received</h3>
              <p className="text-sm sm:text-base text-slate-500">Our team will be in touch shortly to schedule your session.</p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} onSubmit={hs} className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-md space-y-5">
              {[
                { label: "Name",             name: "name",    type: "text", ph: "Your full name"  },
                { label: "Company",          name: "company", type: "text", ph: "Company name"     },
                { label: "Phone / WhatsApp", name: "phone",   type: "tel",  ph: "+91 XXXXX XXXXX" },
              ].map(({ label, name, type, ph }) => (
                <div key={name}>
                  <label htmlFor={`form-${name}`} className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
                  <input id={`form-${name}`} type={type} name={name} value={form[name]} onChange={hc} placeholder={ph} required className={inputCls} />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="form-employees" className="block text-sm font-semibold text-slate-700 mb-1.5">No. of Employees</label>
                  <select id="form-employees" name="employees" value={form.employees} onChange={hc} required className={inputCls}>
                    <option value="">Select range</option>
                    <option>1 – 25</option><option>26 – 100</option><option>101 – 500</option><option>500+</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="form-sites" className="block text-sm font-semibold text-slate-700 mb-1.5">Active Sites</label>
                  <select id="form-sites" name="sites" value={form.sites} onChange={hc} required className={inputCls}>
                    <option value="">Select</option>
                    <option>1</option><option>2 – 5</option><option>6 – 10</option><option>10+</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="form-message" className="block text-sm font-semibold text-slate-700 mb-1.5">Message / Requirement</label>
                <textarea
                  id="form-message"
                  name="message" value={form.message} onChange={hc} rows={4}
                  placeholder="Tell us about your current challenges or what you would like to see..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/25 focus:border-[#2563eb] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                id="demo-submit-btn"
                className="w-full flex items-center justify-center gap-2 bg-[#1a3a6b] hover:bg-[#15305a] text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg min-h-[52px]"
              >
                Request a Demo <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function OibuzFooter() {
  const cols = {
    Platform: ["Features", "For Construction", "How It Works", "FAQ", "Contact"],
    Company:  ["About", "Prajyot Infotech", "Support"],
    Legal:    ["Privacy Policy", "Terms & Conditions"],
  };
  return (
    <footer className="bg-[#0a1628] text-white py-12 sm:py-16">
      <div className={container}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <img src="/images/oibuz-logo.png" alt="Oibuz" className="h-9 sm:h-10 w-auto brightness-0 invert mb-4" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">Workforce management for construction and project-based businesses.</p>
            <p className="text-slate-600 text-xs mt-4">A Prajyot Infotech Product</p>
          </div>
          {Object.entries(cols).map(([g, items]) => (
            <div key={g}>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{g}</p>
              <ul className="space-y-2.5">
                {items.map(i => (
                  <li key={i}>
                    <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors block py-0.5 min-h-[32px] flex items-center">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-7 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600 text-center sm:text-left">© 2025 Oibuz. All rights reserved. A product by Prajyot Infotech.</p>
          <p className="text-xs text-slate-500 whitespace-nowrap">Built for construction. Designed for control.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export default function OibuzLandingPage() {
  const scrollToDemo = () => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="bg-white overflow-x-clip">
      <OibuzHeader      onDemoClick={scrollToDemo} />
      <HeroSection      onDemoClick={scrollToDemo} />
      <AudienceStrip />
      <ProblemSection />
      <CorePlatform />
      <MultiSiteSection />
      <ProductShowcase  onDemoClick={scrollToDemo} />
      <HowItWorks />
      <SignatureWorkflow />
      <RoleSection />
      <FeatureSpotlights />
      <WhyOibuz />
      <ControlSecurity />
      <FAQ />
      <FinalCTA         onDemoClick={scrollToDemo} />
      <DemoForm />
      <OibuzFooter />
    </div>
  );
}
