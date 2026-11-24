// src/components/FreeToolsShowcase.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Zap, Calculator, ArrowRight, ExternalLink, Sparkles, Building2, HardHat, Gauge, FileText } from "lucide-react";

const tools = [
  {
    iconKey: "speed",
    badge: "Free Online Tool",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
    title: "Website Speed & Tech Stack Inspector",
    desc: "Paste any website URL and instantly diagnose Core Web Vitals (LCP, INP, CLS), server TTFB, technology fingerprints, and performance bottlenecks in seconds.",
    to: "/tools/website-tech-checker",
    cta: "Scan Your Website Free",
    ctaColor: "bg-sky-600 hover:bg-sky-700 text-white",
    borderColor: "border-sky-200 hover:border-sky-400",
    bgAccent: "from-sky-50 to-white",
    stats: [
      { label: "CWV Metrics Checked", value: "4" },
      { label: "Tech Stacks Detected", value: "50+" },
      { label: "Avg. Scan Time", value: "< 3s" },
    ],
    icon: <Zap className="w-6 h-6 text-sky-600" />,
  },
  {
    iconKey: "construction",
    badge: "Free HRMS Tool",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    title: "Construction Ghost-Labor & Cash Leakage Calculator",
    desc: "Calculate exactly how much your construction projects lose monthly to paper muster errors, buddy punching, and ghost-worker entries. See your OIBUZ HRMS ROI in 60 seconds.",
    to: "/tools/construction-leakage-calculator",
    cta: "Calculate My Leakage Free",
    ctaColor: "bg-amber-600 hover:bg-amber-700 text-white",
    borderColor: "border-amber-200 hover:border-amber-400",
    bgAccent: "from-amber-50 to-white",
    stats: [
      { label: "Avg. Monthly Leakage", value: "₹2.4L" },
      { label: "Businesses Calculated", value: "500+" },
      { label: "ROI Accuracy", value: "98%" },
    ],
    icon: <Calculator className="w-6 h-6 text-amber-600" />,
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
            No login. No credit card. Instant diagnostics and financial insights — built by our engineering team for Indian businesses.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.to}
              className={`relative bg-gradient-to-br ${tool.bgAccent} rounded-3xl border-2 ${tool.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group`}
            >
              {/* Top section */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${tool.badgeColor}`}>
                    {tool.badge}
                  </div>

                </div>

                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center mb-4">{tool.icon}</div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
                  {tool.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {tool.desc}
                </p>

                {/* Stats Row */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {tool.stats.map((stat) => (
                    <div key={stat.label} className="bg-white/70 rounded-2xl p-3 text-center border border-slate-200/60">
                      <div className="text-lg font-black text-slate-900">{stat.value}</div>
                      <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Footer */}
              <div className="px-6 sm:px-8 pb-6 sm:pb-8 flex flex-wrap gap-3 items-center">
                <Link
                  to={tool.to}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${tool.ctaColor} font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  No sign-up required
                </span>
              </div>

              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-slate-200/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA linking to audit */}
        <div className="mt-10 text-center">
          <p className="text-slate-600 text-sm mb-4">
            Want a comprehensive expert-led review of your entire digital stack?
          </p>
          <Link
            to="/free-business-tech-audit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-900/20 hover:-translate-y-0.5 hover:shadow-xl transition-all"
          >
            <Sparkles className="w-4 h-4 text-brand-200 shrink-0 inline mr-1" /> Get Your Free Full Business Tech Audit
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

