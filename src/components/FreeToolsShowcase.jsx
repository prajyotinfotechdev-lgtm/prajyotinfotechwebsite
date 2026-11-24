// src/components/FreeToolsShowcase.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Zap, Calculator, ArrowRight, Sparkles, FileText, Smartphone } from "lucide-react";

const tools = [
  {
    iconKey: "speed",
    badge: "Free Online Tool",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
    title: "Website Speed & Tech Stack Inspector",
    desc: "Paste any website URL and instantly diagnose Core Web Vitals (LCP, INP, CLS), server TTFB, technology fingerprints, and performance bottlenecks in seconds.",
    to: "/tools/website-tech-checker",
    cta: "Scan Website Free",
    ctaColor: "bg-sky-600 hover:bg-sky-700 text-white",
    borderColor: "border-sky-200 hover:border-sky-400",
    bgAccent: "from-sky-50 to-white",
    stats: [
      { label: "CWV Metrics", value: "4" },
      { label: "Tech Stacks", value: "50+" },
      { label: "Scan Time", value: "< 3s" },
    ],
    icon: <Zap className="w-6 h-6 text-sky-600" />,
  },
  {
    iconKey: "app-calc",
    badge: "2026 Rate Index",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    title: "Mobile App Development Cost Calculator",
    desc: "Calculate accurate iOS & Android mobile app development costs in India. Configure Flutter, React Native, GPS tracking, Razorpay, and admin portals with 1-click WhatsApp export.",
    to: "/tools/app-cost-calculator",
    cta: "Calculate App Cost Free",
    ctaColor: "bg-violet-600 hover:bg-violet-700 text-white",
    borderColor: "border-violet-200 hover:border-violet-400",
    bgAccent: "from-violet-50 to-white",
    stats: [
      { label: "Accuracy", value: "±10%" },
      { label: "Platforms", value: "iOS + Android" },
      { label: "IP Ownership", value: "100% Day 1" },
    ],
    icon: <Smartphone className="w-6 h-6 text-violet-600" />,
  },
  {
    iconKey: "gst",
    badge: "Free Online Tool",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "Free GST Invoice Generator Online",
    desc: "Create, download & print 100% compliant Indian GST invoices in seconds. Includes automated CGST, SGST & IGST calculations, HSN codes, and instant WhatsApp dispatch.",
    to: "/tools/gst-invoice-generator",
    cta: "Create GST Invoice Free",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    bgAccent: "from-emerald-50 to-white",
    stats: [
      { label: "GST Compliance", value: "100%" },
      { label: "State Codes", value: "28+" },
      { label: "Cost", value: "₹0 Free" },
    ],
    icon: <FileText className="w-6 h-6 text-emerald-600" />,
  },
  {
    iconKey: "construction",
    badge: "Free HRMS Tool",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    title: "Construction Ghost-Labor & Cash Leakage Calculator",
    desc: "Calculate exactly how much your construction projects lose monthly to paper muster errors, buddy punching, and ghost-worker entries. See your OIBUZ HRMS ROI in 60 seconds.",
    to: "/tools/construction-leakage-calculator",
    cta: "Calculate Leakage Free",
    ctaColor: "bg-amber-600 hover:bg-amber-700 text-white",
    borderColor: "border-amber-200 hover:border-amber-400",
    bgAccent: "from-amber-50 to-white",
    stats: [
      { label: "Avg. Leakage", value: "₹2.4L/mo" },
      { label: "Calculated", value: "500+" },
      { label: "ROI Accuracy", value: "98%" },
    ],
    icon: <Calculator className="w-6 h-6 text-amber-600" />,
  },
];

export default function FreeToolsShowcase() {
  return (
    <section
      aria-label="Free Online Business Tools"
      className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Completely Free Engineering Utilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Powerful Free Tools for Your Business
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            No login. No credit card. Instant diagnostics, financial insights, and cost estimates — built by our engineering team for Indian businesses.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.to}
              className={`relative bg-gradient-to-br ${tool.bgAccent} rounded-3xl border-2 ${tool.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col justify-between`}
            >
              {/* Top section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${tool.badgeColor}`}>
                    {tool.badge}
                  </div>
                  <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug mb-2 group-hover:text-brand-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">
                  {tool.desc}
                </p>

                {/* Key stats row */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-white/80 backdrop-blur rounded-2xl border border-slate-200/60 mb-6">
                  {tool.stats.map((st, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[10px] text-slate-500 font-medium leading-tight">{st.label}</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0">
                <Link
                  to={tool.to}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs tracking-wide shadow-sm transition-all duration-200 ${tool.ctaColor}`}
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
