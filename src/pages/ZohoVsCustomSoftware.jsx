import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Calculator,
  MessageSquare,
  Send,
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

const ROWS = [
  {
    feature: "Per-User / Per-Seat Licensing",
    saas: "Pay ₹1,200 – ₹3,000+ per staff member every month forever. Costs explode as you hire.",
    custom: "₹0/seat forever. Add 50 or 500 staff accounts at zero extra licensing cost.",
  },
  {
    feature: "Tailored Workflows (Indian Mandi / Factory / GST)",
    saas: "Rigid modules; workarounds require expensive Deluge/custom scripts and third-party connectors.",
    custom: "Engineered precisely around your shop floor, dispatch challans, Tally XML & GST flow.",
  },
  {
    feature: "Data & Source Code Ownership",
    saas: "Your workflows live inside vendor cloud limits; annual price hikes are unavoidable.",
    custom: "100% source code Git transfer on Day 1. Hosted on your private AWS / cloud DB.",
  },
  {
    feature: "WhatsApp Cloud API & Thermal Printing",
    saas: "Costs extra add-on credits or middleware tools (Zapier/Interakt/Wati).",
    custom: "Built-in direct Meta Cloud API webhooks & USB thermal barcode printing with zero markup.",
  },
  {
    feature: "Day-1 Speed to Spin Up",
    saas: "Immediate signup (1–3 days configuration for basic CRM/invoicing).",
    custom: "4 to 8 weeks custom sprint with weekly staging demos.",
  },
];

const FAQS = [
  {
    q: "When is Zoho or SaaS better than custom software?",
    a: "If you have under 5–8 users and strictly standard invoicing/CRM needs, off-the-shelf SaaS is great for fast Day-1 setup. Once you cross 15+ employees or need custom factory BOM, Tally integration, or field apps, SaaS per-seat fees exceed a custom build within 18–24 months.",
  },
  {
    q: "Can we keep Zoho/Tally for one department and migrate operations gradually?",
    a: "Yes. We frequently build phased custom portals for inventory, sales dispatch, and WhatsApp automation while pushing automated ledger summaries into Tally or Zoho Books.",
  },
];

export default function ZohoVsCustomSoftware() {
  const [users, setUsers] = useState(25);
  const [perUserCost, setPerUserCost] = useState(1800);
  const [formData, setFormData] = useState({ name: "", phone: "", company: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const saasCosts = useMemo(() => {
    const monthly = users * perUserCost;
    const yr1 = monthly * 12;
    const yr3 = Math.round(yr1 * 3.15); // accounts for ~10% renewal increase/year
    const yr5 = Math.round(yr1 * 5.6);
    const customEst = 320000;
    const savings5Yr = Math.max(0, yr5 - customEst);
    return { monthly, yr1, yr3, yr5, customEst, savings5Yr };
  }, [users, perUserCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitting(true);
    try {
      await createLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        email: "zoho-vs-custom@prajyotinfotech.in",
        projectType: "SaaS Replacement / Custom ERP TCO Scoping",
        message: `[Zoho vs Custom Lead]\nUsers: ${users} | Est. 5-Yr SaaS Spend: ₹${saasCosts.yr5.toLocaleString("en-IN")}`,
        source: "zoho_vs_custom_comparison",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Compare", url: "https://www.prajyotinfotech.in/compare/zoho-vs-custom-software" },
          { name: "Zoho / SaaS vs Custom Software", url: "https://www.prajyotinfotech.in/compare/zoho-vs-custom-software" },
        ]}
      />
      <Seo
        title="Zoho / SaaS Per-Seat Subscriptions vs Custom ERP Cost Calculator 2026 | Prajyot Infotech"
        description="Calculate your 5-year Zoho CRM / SaaS per-user subscription cost vs owning custom in-house business software in India with zero monthly seat fees."
        keywords="zoho vs custom software india, saas vs custom erp cost calculator, zoho alternative zero seat fee, custom crm vs zoho india"
        path="/compare/zoho-vs-custom-software"
        image="/og/og-compare.jpg"
        schema={faqSchema}
      />

      <main className="py-12 sm:py-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>5-Year TCO &amp; Licensing Reality Check</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-navy-900 mb-5 tracking-tight">
              SaaS Per-Seat Subscriptions vs{" "}
              <span className="text-brand-600">Owned Custom Software</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Per-user SaaS pricing starts cheap for 3 employees — then quietly costs ₹15–₹35 Lakhs over 5 years while trapping your workflows in generic rigid templates.
            </p>
          </div>

          {/* Interactive 5-Year SaaS Bleed Calculator */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-14 border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-300 mb-4">
              <Calculator className="w-4 h-4" />
              <span>Interactive 5-Year Subscription Cost Simulator</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">Team Size (Paid Seats)</span>
                  <span className="font-mono font-black text-brand-400">{users} Users</span>
                </div>
                <input type="range" min="5" max="150" step="5" value={users}
                  onChange={(e) => setUsers(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-slate-800 rounded-lg cursor-pointer accent-brand-500" />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">Avg SaaS Bundle / User / Month</span>
                  <span className="font-mono font-black text-amber-400">₹{perUserCost.toLocaleString("en-IN")}/mo</span>
                </div>
                <input type="range" min="800" max="5000" step="200" value={perUserCost}
                  onChange={(e) => setPerUserCost(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-slate-800 rounded-lg cursor-pointer accent-amber-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500/30">
                <span className="text-xs text-red-300 block">5-Year Recurring SaaS Cost</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-red-400 mt-1 block">
                  ₹{saasCosts.yr5.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-slate-400">₹0 Asset Ownership at Year 5</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-700">
                <span className="text-xs text-slate-300 block">Custom In-House System</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-white mt-1 block">
                  ~₹{saasCosts.customEst.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-400">One-Time Build · ₹0 Seat Fees Forever</span>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <span className="text-xs text-emerald-300 block">Net 5-Year Capital Saved</span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-1 block">
                  +₹{saasCosts.savings5Yr.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-200/80">100% Source Code &amp; IP Owned</span>
              </div>
            </div>
          </div>

          {/* Comparison Cards + Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-sm mb-14">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mb-6">
              Off-the-Shelf SaaS vs Custom Owned Software
            </h2>

            <div className="md:hidden space-y-4">
              {ROWS.map((r) => (
                <div key={r.feature} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="px-4 py-3 bg-slate-100 font-bold text-slate-900 text-sm border-b border-slate-200">{r.feature}</div>
                  <div className="p-4 space-y-3 text-xs">
                    <div className="flex items-start gap-2 text-slate-600">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div><strong className="block text-[10px] uppercase text-slate-500">Per-Seat SaaS</strong>{r.saas}</div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-900 bg-brand-50/70 p-3 rounded-xl border border-brand-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div><strong className="block text-[10px] uppercase text-brand-700">Prajyot Infotech Custom</strong>{r.custom}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4 w-1/4">Dimension</th>
                    <th className="py-3.5 px-4 w-3/8">Per-Seat SaaS (Zoho / Odoo Cloud)</th>
                    <th className="py-3.5 px-4 w-3/8 text-brand-900 bg-brand-50/60">Prajyot Infotech Custom System</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ROWS.map((r) => (
                    <tr key={r.feature}>
                      <td className="py-4 px-4 font-bold text-slate-900 align-top">{r.feature}</td>
                      <td className="py-4 px-4 align-top text-slate-600"><div className="flex gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span>{r.saas}</span></div></td>
                      <td className="py-4 px-4 align-top text-slate-900 bg-brand-50/20 font-medium"><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>{r.custom}</span></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Audit Lead Capture */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Free Cost &amp; Architecture Audit</span>
              <h3 className="text-2xl sm:text-3xl font-black text-navy-900">
                Get a Fixed-Bid Quote to Own Your Own Software
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Send your current monthly software bill and workflow list — we will map exact replacement modules, timeline, and fixed milestone pricing within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={`https://wa.me/917020708747?text=${encodeURIComponent(`Hi Prajyot Infotech, we have ${users} users on SaaS costing ₹${saasCosts.yr5.toLocaleString("en-IN")} over 5 years and want a custom replacement quote.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs min-h-[44px]">
                  <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
                </a>
                <Link to="/estimate" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs min-h-[44px]">
                  Interactive Scope Builder
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              {submitted ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900">Audit Requested!</h4>
                  <p className="text-xs text-slate-600">Our architect will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input required placeholder="Your Name *" value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" />
                  <input required type="tel" placeholder="WhatsApp / Phone *" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" />
                  <input placeholder="Company Name" value={formData.company} onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm" />
                  <button type="submit" disabled={submitting}
                    className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]">
                    <Send className="w-3.5 h-3.5" /> {submitting ? "Sending..." : "Get Custom TCO Proposal"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{f.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

