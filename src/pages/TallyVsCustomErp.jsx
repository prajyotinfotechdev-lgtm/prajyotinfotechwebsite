import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  Database,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  BarChart3,
  Factory,
  MessageSquare,
  Sparkles,
  Layers,
  HelpCircle,
  FileSpreadsheet,
  AlertTriangle,
  Clock,
  Send
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

const COMPARISON_ROWS = [
  {
    feature: "Multi-Branch & Live Inventory",
    tally: "Requires periodic XML sync or local network bridging. Prone to data conflicts and stock lag.",
    customErp: "Centralized cloud database with real-time stock sync across multiple factories, warehouses, and retail outlets.",
    winner: "custom"
  },
  {
    feature: "Mobile & Remote Access",
    tally: "Limited browser helper or expensive third-party plugins with read-only views.",
    customErp: "Native responsive web app & mobile UI. Field managers and sales reps update orders live on their phones.",
    winner: "custom"
  },
  {
    feature: "Shop-Floor & Production Routing (BOM)",
    tally: "Basic manufacturing voucher. No real-time machine downtime tracking, stage-wise wastage, or worker efficiency logs.",
    customErp: "Complete Bill of Materials (BOM), stage-wise work orders, barcode/QR tracking, and scrap calculation.",
    winner: "custom"
  },
  {
    feature: "WhatsApp Business API Automation",
    tally: "Manual PDF export and manual WhatsApp sending via personal phones.",
    customErp: "Automated instant dispatch of GST invoices, dispatch tracking links, and outstanding balance alerts via WhatsApp.",
    winner: "custom"
  },
  {
    feature: "Role-Based Permissions & Security",
    tally: "Coarse-grained user security. Staff can often view sensitive company ledger balances or profit margins.",
    customErp: "Granular RBAC. Storekeepers only see physical quantities; sales reps only see their accounts; financials stay restricted.",
    winner: "custom"
  },
  {
    feature: "Source Code Ownership & Custom Workflows",
    tally: "Proprietary locked runtime (TDL). Restricted to Tally's fixed window paradigm.",
    customErp: "100% full source code ownership. Tailored exactly to your proprietary factory or trading workflows.",
    winner: "custom"
  },
  {
    feature: "Initial Cost & Setup Time",
    tally: "Low initial cost (₹25,000 – ₹60,000 one-time license). Rapid setup in 2-3 days.",
    customErp: "Higher initial engineering investment (₹2,50,000 – ₹6,00,000). 6 to 10 weeks custom deployment.",
    winner: "tally"
  }
];

const SIGNS_TO_UPGRADE = [
  {
    title: "1. Your team is running parallel Excel spreadsheets",
    desc: "If your staff records data in Excel first and then re-enters it into Tally for accounting, you are paying double labor and introducing data entry errors."
  },
  {
    title: "2. Management lacks live mobile dashboards",
    desc: "Directors cannot see live daily production numbers, pending dispatches, or cash flow balances without calling the accountant to extract reports."
  },
  {
    title: "3. Frequent stock discrepancies between plant and warehouse",
    desc: "Raw material stockouts occur because inventory counts aren't decremented in real-time when work orders are issued on the shop floor."
  },
  {
    title: "4. No barcode or mobile scanning support",
    desc: "Warehouse workers manually write down serial numbers or item codes on paper, causing shipping delays and wrong customer shipments."
  },
  {
    title: "5. Customer payment follow-ups are chaotic",
    desc: "Accounts teams manually call clients rather than relying on automated WhatsApp balance statements and payment link reminders."
  }
];

const FAQ_ITEMS = [
  {
    q: "Can a Custom ERP integrate with or replace Tally completely?",
    a: "Both options are possible. Many Maharashtra manufacturers keep Tally exclusively for final chartered accountant (CA) compliance and tax filing while running their daily inventory, shop-floor production, dispatch, and CRM on our Custom ERP. Our ERP can automatically push validated sales and purchase journals into Tally via XML/ODBC, eliminating double entry."
  },
  {
    q: "How long does it take to build and deploy a Custom ERP?",
    a: "A modular Custom ERP for an SME with 20 to 100 employees typically takes 6 to 10 weeks to build, test, and deploy. We follow a phased rollout: Phase 1 launches Inventory & Purchase; Phase 2 introduces Production & BOM; Phase 3 connects WhatsApp automation and customer portals."
  },
  {
    q: "Who owns the software and data?",
    a: "You receive 100% full IP ownership and the complete source code repository on Day 1. The database runs on your dedicated cloud server (AWS, DigitalOcean, or on-premise local server in your plant) with automated daily backups."
  },
  {
    q: "What is the typical investment for a manufacturing ERP?",
    a: "A custom production-ready ERP typically ranges from ₹2,50,000 to ₹6,50,000 depending on module complexity (multi-branch, barcode scanners, machine IoT logs). Compared to annual SaaS subscriptions like SAP Business One or Zoho (which cost ₹3L–₹8L every single year in user licenses), a custom ERP pays for itself within 12–18 months."
  }
];

export default function TallyVsCustomErp() {
  const [formData, setFormData] = useState({ name: "", phone: "", company: "", employees: "10-50" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        email: "tally-vs-erp@prajyotinfotech.in",
        projectType: "Tally vs Custom ERP Migration Scoping",
        message: `[Tally vs Custom ERP Lead]\nCompany: ${formData.company}\nTeam Size: ${formData.employees}\nName: ${formData.name}\nPhone: ${formData.phone}`,
        source: "tally_vs_erp_comparison"
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Lead error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Compare", url: "https://www.prajyotinfotech.in/compare/tally-vs-custom-erp" },
          { name: "Tally vs Custom ERP", url: "https://www.prajyotinfotech.in/compare/tally-vs-custom-erp" }
        ]}
      />

      <Seo
        title="Tally vs Custom ERP Software (2026 Comparison) — When to Upgrade | Prajyot Infotech"
        description="Detailed technical & commercial comparison between Tally and Custom ERP software for Indian manufacturers and distributors. Compare multi-branch inventory, mobile access, production BOM, and TCO."
        keywords="Tally vs custom ERP, replace Tally with custom software, manufacturing ERP Pune, Tally limitations inventory, custom ERP vs Tally Prime 2026"
        path="/compare/tally-vs-custom-erp"
        image="/og/og-compare.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="py-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Executive Architectural Guide · 2026 Edition</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight">
              Tally vs <span className="text-brand-600">Custom ERP Software</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Tally Prime is India's most beloved accounting tool, but when your factory or distribution business scales past 20 employees, its single-user bottlenecks and lack of real-time mobile tracking start costing you lakhs in operational friction.
            </p>
          </div>

          {/* Quick TL;DR Verdict Box */}
          <div className="bg-gradient-to-br from-slate-900 to-navy-900 text-white rounded-3xl p-8 mb-16 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400">The 30-Second Verdict</span>
                <h2 className="text-2xl font-bold text-white">Stick with Tally for Compliance. Build a Custom ERP for Operations.</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Tally is unmatched for chartered accountants and GST tax filing. But it was never engineered to manage shop-floor work orders, live barcode dispatch, or mobile sales teams. Modern Indian businesses use a <strong>hybrid model</strong>: run plant operations on a Custom ERP and auto-sync ledger vouchers into Tally.
                </p>
              </div>
              <a
                href="https://wa.me/919322673286?text=Hi%20Prajyot%20Infotech%2C%20I%20want%20to%20discuss%20migrating%20our%20plant%20operations%20from%20Tally%20to%20a%20Custom%20ERP."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-brand-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Talk to ERP Architect</span>
              </a>
            </div>
          </div>

          {/* SIDE-BY-SIDE MATRIX */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Direct Feature & Capability Comparison
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Comparing Tally Prime against a bespoke, cloud-hosted Custom ERP designed for Indian SMBs.
              </p>
            </div>

            {/* Mobile Comparison Cards */}
            <div className="md:hidden space-y-4">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="px-4 py-3 bg-slate-100 font-bold text-slate-900 text-sm border-b border-slate-200">
                    {row.feature}
                  </div>
                  <div className="p-4 space-y-3 text-xs">
                    <div className="flex items-start gap-2 text-slate-600">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">Tally Prime</span>
                        {row.tally}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-900 bg-brand-50/70 p-3 rounded-xl border border-brand-200/70 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-brand-700 uppercase text-[10px] block mb-0.5">Custom ERP</span>
                        {row.customErp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 w-1/4">Operational Capability</th>
                    <th className="py-3.5 px-4 w-3/8 text-slate-600">Tally Prime (Desktop)</th>
                    <th className="py-3.5 px-4 w-3/8 text-brand-900 bg-brand-50/60">Prajyot Infotech Custom ERP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 align-top">{row.feature}</td>
                      <td className="py-4 px-4 align-top leading-relaxed text-slate-600">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span>{row.tally}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top leading-relaxed text-slate-900 bg-brand-50/20 font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.customErp}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5 WARNING SIGNS YOU'VE OUTGROWN TALLY */}
          <div className="bg-slate-100/70 rounded-3xl p-6 sm:p-10 border border-slate-200 mb-16">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Diagnostic Self-Check</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                5 Signs Your Business Has Outgrown Tally
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SIGNS_TO_UPGRADE.map((sign, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{sign.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{sign.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LEAD CAPTURE & AUDIT TRIGGER */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Free Feasibility Audit</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                  Schedule a 30-Minute Tally-to-ERP Migration Audit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our senior ERP engineers in Pune will review your current spreadsheet bottlenecks, inventory workflow, and show you a live interactive demo of how your business operates on a modern custom system.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No commitment required
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> NDA signed beforehand
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> On-site visits in Pune / Chakan
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Patil"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98220 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Plant Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Precision Gears Pvt Ltd"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Team Size</label>
                      <select
                        value={formData.employees}
                        onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="5-20">5 to 20 Employees</option>
                        <option value="20-50">20 to 50 Employees</option>
                        <option value="50-150">50 to 150 Employees</option>
                        <option value="150+">150+ Employees</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Submitting..." : "Request Migration Audit"}</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-900">Audit Request Received!</h4>
                    <p className="text-xs text-slate-600">
                      Our ERP engineering team will connect with you via WhatsApp to coordinate the technical review.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQS */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-navy-900 text-center mb-6 tracking-tight">
              Frequently Asked Questions About Tally & Custom ERP
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

