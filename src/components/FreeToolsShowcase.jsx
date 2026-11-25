// src/components/FreeToolsShowcase.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Calculator,
  ArrowRight,
  FileText,
  Smartphone,
  FileCheck2,
  QrCode,
  IndianRupee,
} from "lucide-react";
import { prefetchRoute } from "../utils/prefetch.js";

const tools = [
  {
    iconKey: "gst",
    badge: "Most Used Daily Tool",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    title: "Free GST Tax Invoice Generator",
    desc: "Create, print A4 PDFs, upload your company logo, calculate CGST/SGST vs IGST automatically & share on WhatsApp in seconds.",
    to: "/tools/gst-invoice-generator",
    cta: "Create GST Invoice Free",
    ctaColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
    borderColor: "border-emerald-200 hover:border-emerald-400",
    bgAccent: "from-emerald-50 to-white",
    stats: [
      { label: "Rule 46", value: "100% GST" },
      { label: "State Codes", value: "24+" },
      { label: "Watermark", value: "Zero" },
    ],
    icon: <FileText className="w-6 h-6 text-emerald-600" />,
  },
  {
    iconKey: "quotation",
    badge: "New · For Businesses",
    badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    title: "Free Quotation & Proforma Maker",
    desc: "Build branded customer estimates & proforma quotes with GST exclusive/inclusive modes, payment terms, A4 PDF export & WhatsApp sharing.",
    to: "/tools/quotation-generator",
    cta: "Create Quotation Free",
    ctaColor: "bg-indigo-600 hover:bg-indigo-700 text-white",
    borderColor: "border-indigo-200 hover:border-indigo-400",
    bgAccent: "from-indigo-50 to-white",
    stats: [
      { label: "Modes", value: "3 Formats" },
      { label: "Export", value: "PDF + WA" },
      { label: "Price", value: "₹0 Free" },
    ],
    icon: <FileCheck2 className="w-6 h-6 text-indigo-600" />,
  },
  {
    iconKey: "wa-qr",
    badge: "New · Zero Login",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-200",
    title: "WhatsApp Link & Counter QR Maker",
    desc: "Generate custom wa.me chat links with greeting templates, scannable shop counter QR standees (SVG/PNG), and website floating button HTML.",
    to: "/tools/whatsapp-link-generator",
    cta: "Create WhatsApp QR Free",
    ctaColor: "bg-teal-600 hover:bg-teal-700 text-white",
    borderColor: "border-teal-200 hover:border-teal-400",
    bgAccent: "from-teal-50 to-white",
    stats: [
      { label: "Formats", value: "PNG + SVG" },
      { label: "Widget", value: "HTML Code" },
      { label: "Scan Speed", value: "Instant" },
    ],
    icon: <QrCode className="w-6 h-6 text-teal-600" />,
  },
  {
    iconKey: "gst-calc",
    badge: "New · Finance Tool",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    title: "India GST & Profit Margin Calculator",
    desc: "Instantly add or reverse-extract 3%–28% GST with CGST/SGST vs IGST breakdown while simulating your exact profit margin and markup.",
    to: "/tools/gst-profit-calculator",
    cta: "Calculate GST & Margin",
    ctaColor: "bg-blue-600 hover:bg-blue-700 text-white",
    borderColor: "border-blue-200 hover:border-blue-400",
    bgAccent: "from-blue-50 to-white",
    stats: [
      { label: "Tax Slabs", value: "All 6" },
      { label: "Mode", value: "Add / Rev" },
      { label: "Analytics", value: "Margin %" },
    ],
    icon: <IndianRupee className="w-6 h-6 text-blue-600" />,
  },
  {
    iconKey: "speed",
    badge: "Engineering Audit",
    badgeColor: "bg-sky-100 text-sky-700 border-sky-200",
    title: "Website Speed & Tech Inspector",
    desc: "Inspect any business URL to diagnose Core Web Vitals (LCP, INP, CLS), server TTFB latency, tech stack fingerprints, and mobile gaps.",
    to: "/tools/website-tech-checker",
    cta: "Scan Website Free",
    ctaColor: "bg-sky-600 hover:bg-sky-700 text-white",
    borderColor: "border-sky-200 hover:border-sky-400",
    bgAccent: "from-sky-50 to-white",
    stats: [
      { label: "CWV Metrics", value: "4 Core" },
      { label: "Tech Stacks", value: "50+" },
      { label: "Report", value: "PDF Ready" },
    ],
    icon: <Zap className="w-6 h-6 text-sky-600" />,
  },
  {
    iconKey: "app-calc",
    badge: "2026 Rate Index",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    title: "Mobile App & Cost Calculators",
    desc: "Configure Flutter, React Native, GPS tracking, Razorpay & admin dashboards to compute accurate 2026 development budgets in INR.",
    to: "/tools/app-cost-calculator",
    cta: "Calculate App Cost",
    ctaColor: "bg-violet-600 hover:bg-violet-700 text-white",
    borderColor: "border-violet-200 hover:border-violet-400",
    bgAccent: "from-violet-50 to-white",
    stats: [
      { label: "Accuracy", value: "±10%" },
      { label: "Platforms", value: "iOS + And" },
      { label: "IP Transfer", value: "Day 1" },
    ],
    icon: <Smartphone className="w-6 h-6 text-violet-600" />,
  },
];

export default function FreeToolsShowcase() {
  return (
    <section
      id="free-tools"
      aria-label="Free Online Business Tools & Products"
      className="py-16 sm:py-20 px-4 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            100% Free Online Business Products
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Free Instant Tools Built for Growth
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            No signup. Zero watermarks. Instant GST billing, quotations, WhatsApp QR standees, speed diagnostics, and software cost calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.to}
              onMouseEnter={() => prefetchRoute(tool.to)}
              className={`relative bg-gradient-to-br ${tool.bgAccent} rounded-3xl border-2 ${tool.borderColor} shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden group flex flex-col justify-between`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${tool.badgeColor}`}>
                    {tool.badge}
                  </div>
                  <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-snug mb-2 group-hover:text-brand-700 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed mb-5">
                  {tool.desc}
                </p>

                <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-white/85 rounded-2xl border border-slate-200/60">
                  {tool.stats.map((st, i) => (
                    <div key={i} className="text-center">
                      <div className="text-[10px] text-slate-500 font-medium leading-tight">{st.label}</div>
                      <div className="text-xs font-black text-slate-900 mt-0.5">{st.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6">
                <Link
                  to={tool.to}
                  onFocus={() => prefetchRoute(tool.to)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-xs tracking-wide shadow-sm transition-all duration-150 min-h-[44px] ${tool.ctaColor}`}
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Extra shortcut strip for specialized calculators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            to="/tools/construction-leakage-calculator"
            onMouseEnter={() => prefetchRoute("/tools/construction-leakage-calculator")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 font-bold transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Construction Cash Leakage Calculator</span>
          </Link>
          <Link
            to="/resources/software-rfp-template"
            onMouseEnter={() => prefetchRoute("/resources/software-rfp-template")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Free Software RFP &amp; SOW Kit</span>
          </Link>
          <Link
            to="/estimate"
            onMouseEnter={() => prefetchRoute("/estimate")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-700 font-bold transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Project Cost Estimator</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
