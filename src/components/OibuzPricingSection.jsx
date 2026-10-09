// src/components/OibuzPricingSection.jsx
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HardHat,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  Zap,
  Check,
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "₹1,999",
    rawPrice: 1999,
    limit: "Up to 25 employees",
    workerRange: "1 – 25 employees",
    maxCount: 25,
    tag: "Essential Workforce",
    desc: "Engineered for sub-contractors and single-site construction crews standardizing field attendance and daily operations.",
    icon: HardHat,
    accentGlow: "rgba(59, 130, 246, 0.15)",
    borderActive: "border-blue-500 shadow-xl shadow-blue-500/15 ring-2 ring-blue-500/30",
    badgeBg: "bg-slate-100 text-slate-800 border-slate-200",
    ctaGradient:
      "bg-slate-900 hover:bg-blue-600 text-white shadow-md shadow-slate-900/15 hover:shadow-blue-600/30",
    highlighted: false,
    theme: "light",
  },
  {
    id: "business",
    name: "Business",
    price: "₹3,799",
    rawPrice: 3799,
    limit: "Up to 50 employees",
    workerRange: "26 – 50 employees",
    maxCount: 50,
    tag: "Most Popular",
    desc: "Engineered for growing contractors and builders orchestrating expanding job site teams across multiple active locations.",
    icon: Building2,
    accentGlow: "rgba(99, 102, 241, 0.25)",
    borderActive:
      "border-indigo-500 shadow-2xl shadow-indigo-600/25 ring-2 ring-indigo-500/40",
    badgeBg: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xs",
    ctaGradient:
      "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-xl shadow-blue-600/35 hover:shadow-2xl hover:shadow-indigo-600/45",
    highlighted: true,
    theme: "featured",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₹7,999",
    rawPrice: 7999,
    limit: "Up to 100 employees",
    workerRange: "51 – 100 employees",
    maxCount: 100,
    tag: "Multi-Site Scale",
    desc: "Engineered for established construction firms, major infrastructure contractors, and large-scale workforce governance.",
    icon: ShieldCheck,
    accentGlow: "rgba(56, 189, 248, 0.2)",
    borderActive:
      "border-cyan-400 shadow-2xl shadow-cyan-500/20 ring-2 ring-cyan-400/40",
    badgeBg: "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 font-bold",
    ctaGradient:
      "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-400/35",
    highlighted: false,
    theme: "dark",
  },
];

// Spotlight Card with mouse-follow dynamic lighting
function SpotlightPricingCard({
  plan,
  isSelected,
  onSelect,
  onHover,
}) {
  const Icon = plan.icon;
  const isDark = plan.theme === "dark";
  const isFeatured = plan.theme === "featured";
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onHover}
      layout
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 cursor-pointer ${isDark
          ? "bg-[#0b1528] text-white border border-slate-800 shadow-xl"
          : isFeatured
            ? "bg-gradient-to-b from-white via-indigo-50/30 to-white border-2 border-indigo-600/90 shadow-2xl shadow-indigo-600/10"
            : "bg-white text-slate-900 border border-slate-200/90 shadow-md"
        } ${isSelected
          ? `${plan.borderActive} scale-[1.02] z-20`
          : "hover:-translate-y-1 hover:shadow-xl"
        }`}
      onClick={onSelect}
    >
      {/* Dynamic Cursor Spotlight Radial Mask */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${plan.accentGlow}, transparent 75%)`,
        }}
      />

      {/* Animated Glowing Accent Ring for Featured Plan */}
      {isFeatured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/35 border border-white/20"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "6s" }} />
            <span>{plan.tag}</span>
          </motion.div>
        </div>
      )}

      {/* Top Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          {/* Icon Badge */}
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs ${isDark
                ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/25"
                : isFeatured
                  ? "bg-indigo-100 text-indigo-700 border border-indigo-200"
                  : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}
          >
            <Icon className="w-6 h-6 stroke-[2]" />
          </div>

          {!isFeatured && (
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${plan.badgeBg}`}
            >
              {plan.tag}
            </span>
          )}
        </div>

        {/* Plan Title & Subtitle */}
        <div className="mb-5">
          <h3
            className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"
              }`}
          >
            {plan.name}
          </h3>
          <p
            className={`text-xs sm:text-sm mt-2 leading-relaxed min-h-[40px] ${isDark ? "text-slate-400" : "text-slate-500"
              }`}
          >
            {plan.desc}
          </p>
        </div>

        {/* Price Tag with High-Impact Typography */}
        <div
          className={`py-5 border-y ${isDark ? "border-slate-800/80" : "border-slate-100"
            } mb-6`}
        >
          <div className="flex items-baseline gap-1">
            <span
              className={`text-4xl sm:text-5xl font-black tracking-tight font-sans ${isDark ? "text-white" : "text-slate-900"
                }`}
            >
              {plan.price}
            </span>
          </div>
        </div>

        {/* High-Tech Workforce Capacity Display */}
        <div
          className={`rounded-2xl p-4 sm:p-5 mb-6 transition-all border ${isDark
              ? "bg-slate-900/80 border-slate-800"
              : isFeatured
                ? "bg-indigo-50/60 border-indigo-100"
                : "bg-slate-50 border-slate-200/80"
            }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark
                  ? "text-cyan-300"
                  : isFeatured
                    ? "text-indigo-800"
                    : "text-slate-600"
                }`}
            >
              <Users className="w-3.5 h-3.5" />
              Workforce Capacity
            </span>
            <span
              className={`text-xs font-black px-2 py-0.5 rounded-md ${isDark
                  ? "bg-cyan-500/20 text-cyan-300"
                  : isFeatured
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-800"
                }`}
            >
              {plan.maxCount} Workers
            </span>
          </div>

          <div
            className={`text-base sm:text-lg font-black tracking-tight mb-3 ${isDark
                ? "text-white"
                : isFeatured
                  ? "text-indigo-950"
                  : "text-slate-900"
              }`}
          >
            {plan.limit}
          </div>

          {/* Segmented / Progress Capacity Meter */}
          <div
            className={`h-2.5 w-full rounded-full overflow-hidden p-0.5 ${isDark ? "bg-slate-800" : "bg-slate-200/80"
              }`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${plan.maxCount}%` }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full ${isDark
                  ? "bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-sm shadow-cyan-400/50"
                  : isFeatured
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-sm shadow-indigo-600/50"
                    : "bg-slate-700"
                }`}
            />
          </div>
        </div>
      </div>

      {/* Card Action Button with Shimmer Light Sweep */}
      <div className="relative z-10 pt-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`relative overflow-hidden w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer min-h-[52px] group-hover:scale-[1.01] ${plan.ctaGradient}`}
        >
          {/* Subtle Shimmer Sweep Highlight */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform" />

          <span className="relative z-10">Choose {plan.name}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default function OibuzPricingSection({
  className = "",
  id = "pricing",
  onSelectPlan,
}) {
  const { openLeadModal } = useLeadModal();
  const [sliderValue, setSliderValue] = useState(40);
  const [selectedPlanId, setSelectedPlanId] = useState("business");

  // Determine active plan based on interactive slider
  const getActivePlanFromSlider = (val) => {
    if (val <= 25) return "starter";
    if (val <= 50) return "business";
    return "enterprise";
  };

  const currentSliderPlan = getActivePlanFromSlider(sliderValue);
  const activePlanId = selectedPlanId || currentSliderPlan;

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    setSelectedPlanId(getActivePlanFromSlider(val));
  };

  const handlePresetClick = (plan) => {
    setSelectedPlanId(plan.id);
    setSliderValue(plan.maxCount);
  };

  const handlePlanClick = (plan) => {
    setSelectedPlanId(plan.id);

    if (onSelectPlan) {
      onSelectPlan(plan);
      return;
    }

    openLeadModal({
      source: `Oibuz Pricing Section - ${plan.name} Plan`,
      title: `Get Started with ${plan.name}`,
      subtitle: `${plan.name} Plan • ${plan.limit} • ${plan.price}`,
      projectType: "Oibuz Construction HRMS",
      budget: plan.price,
    });
  };

  const handleEnterpriseCustom = () => {
    openLeadModal({
      source: "Oibuz Pricing Section - 100+ Custom Inquiry",
      title: "Custom Multi-Site Enterprise Deployment",
      subtitle: "Workforce exceeding 100 employees — connect with our deployment team.",
      projectType: "Oibuz Construction HRMS",
    });
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-24 lg:py-32 bg-slate-50/70 border-b border-slate-200/80 ${className}`}
    >
      {/* ─── AMBIENT MOTION GRAPHICS & BACKDROP ───────────────────────────── */}
      {/* Top Floating Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-cyan-400/20 via-blue-600/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Cyber Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* ─── HEADER ──────────────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200/80 rounded-full px-4 py-1.5 mb-5 shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span className="text-xs font-black tracking-wide text-blue-900 uppercase">
              Transparent Workforce Plans
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-5"
          >
            Simple, predictable plans for{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              construction crews.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Select the plan matching your active team size. No surprises, no hidden setup fees—built for contractors from day one.
          </motion.p>

          {/* ─── INTERACTIVE WORKFORCE SIZING SLIDER ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="mt-10 max-w-xl mx-auto bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                Select Workforce Headcount:
              </span>
              <span className="text-sm sm:text-base font-black px-3.5 py-1 rounded-full bg-blue-600 text-white shadow-xs">
                {sliderValue > 100 ? "100+ Workers" : `${sliderValue} Workers`}
              </span>
            </div>

            {/* Range Slider */}
            <div className="relative my-4">
              <input
                type="range"
                min="5"
                max="105"
                step="5"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
              />
              <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2">
                <span>5</span>
                <span>25 (Starter)</span>
                <span>50 (Business)</span>
                <span>100 (Enterprise)</span>
                <span>100+</span>
              </div>
            </div>

            {/* Quick Match Preset Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-semibold mr-1">Quick Select:</span>
              {PLANS.map((p) => {
                const isMatch = activePlanId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handlePresetClick(p)}
                    className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${isMatch
                        ? "bg-blue-700 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {p.name} ({p.limit})
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ─── PRICING CARDS GRID ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto mb-14">
          {PLANS.map((plan) => (
            <SpotlightPricingCard
              key={plan.id}
              plan={plan}
              isSelected={activePlanId === plan.id}
              onSelect={() => handlePlanClick(plan)}
              onHover={() => setSelectedPlanId(plan.id)}
            />
          ))}
        </div>

        {/* ─── ENTERPRISE 100+ WORKFORCE BANNER ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 via-[#0e1d35] to-blue-950 text-white rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-1.5">
                Large-Scale Operations
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white leading-tight">
                Managing more than 100 employees across multiple construction sites?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Our infrastructure deployment team provides custom enterprise scaling, multi-site configuration, and hands-on onboarding.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEnterpriseCustom}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Inquire for 100+ Workers</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
