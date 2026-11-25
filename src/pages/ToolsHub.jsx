import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  FileText,
  FileCheck2,
  QrCode,
  IndianRupee,
  Tag,
  ShieldCheck,
  Receipt,
  ClipboardCheck,
  Zap,
  Smartphone,
  Calculator,
  Sparkles,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import { prefetchRoute } from "../utils/prefetch.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const TOOL_GROUPS = [
  {
    heading: "Billing, Tax & Daily Finance Utilities",
    sub: "Zero-watermark A4 PDF makers and Indian GST calculators built for daily merchant workflows.",
    items: [
      { to: "/tools/gst-invoice-generator", title: "Free GST Invoice Generator", badge: "Popular", desc: "A4 Rule-46 Tax Invoices with custom logo, auto CGST/SGST vs IGST & WhatsApp dispatch.", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
      { to: "/tools/quotation-generator", title: "Quotation & Proforma Maker", badge: "New", desc: "Send crisp GST exclusive/inclusive/non-GST price quotes with payment milestone terms.", icon: FileCheck2, color: "text-indigo-600 bg-indigo-50" },
      { to: "/tools/gst-profit-calculator", title: "GST & Profit Margin Calculator", badge: "New", desc: "Add or reverse-extract 0%–28% GST slabs & check exact retail net margin %.", icon: IndianRupee, color: "text-blue-600 bg-blue-50" },
      { to: "/tools/hsn-sac-finder", title: "HSN / SAC Code & Tax Finder", badge: "New", desc: "Search common Indian HSN/SAC codes and load them into the GST Invoice Maker in 1 tap.", icon: Tag, color: "text-amber-600 bg-amber-50" },
    ],
  },
  {
    heading: "WhatsApp, QR Payments & Launch Compliance",
    sub: "Accept direct UPI payments, grow WhatsApp inquiries, and pass Razorpay/Play Store KYC fast.",
    items: [
      { to: "/tools/whatsapp-link-generator", title: "WhatsApp Link & Counter QR", badge: "New", desc: "Create custom wa.me links with welcome messages, SVG/PNG QR standees & website widget code.", icon: QrCode, color: "text-teal-600 bg-teal-50" },
      { to: "/tools/upi-qr-generator", title: "UPI Payment QR Standee Maker", badge: "New", desc: "Generate NPCI UPI QR cards with fixed Rupee amount locking for GPay, PhonePe & Paytm.", icon: QrCode, color: "text-brand-600 bg-brand-50" },
      { to: "/tools/legal-policy-generator", title: "Legal Policy Generator (KYC)", badge: "New", desc: "Generate Privacy, Terms, Refund & Shipping pages ready for Razorpay & Play Store review.", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
      { to: "/tools/salary-slip-generator", title: "Employee Salary Slip Maker", badge: "New", desc: "Create official monthly A4 payslips with Basic, HRA, PF, PT & TDS calculations free.", icon: Receipt, color: "text-violet-600 bg-violet-50" },
      { to: "/tools/purchase-order-generator", title: "Purchase Order & Challan Maker", badge: "New", desc: "Generate factory Purchase Orders & Rule-55 Delivery Challans with HSN & GST.", icon: ClipboardCheck, color: "text-orange-600 bg-orange-50" },
    ],
  },
  {
    heading: "Engineering Audits, Scope & Cost Estimators",
    sub: "Benchmark your website performance or calculate realistic 2026 Indian software development budgets.",
    items: [
      { to: "/tools/website-tech-checker", title: "Website Speed & Tech Inspector", badge: "Diagnostic", desc: "Diagnose LCP, TTFB, INP, CLS, stack frameworks & conversion leaks for any domain.", icon: Zap, color: "text-sky-600 bg-sky-50" },
      { to: "/tools/app-cost-calculator", title: "Mobile App Cost Calculator", badge: "2026 Index", desc: "Configure Flutter/React Native modules, auth & backend for transparent INR estimates.", icon: Smartphone, color: "text-brand-600 bg-brand-50" },
      { to: "/estimate", title: "Software & Web Scope Builder", badge: "4-Step", desc: "Interactive architecture estimator covering Web Apps, ERPs, Mobile & WhatsApp API.", icon: Calculator, color: "text-indigo-600 bg-indigo-50" },
      { to: "/tools/construction-leakage-calculator", title: "Construction Cash Leakage Calc", badge: "Field ROI", desc: "Calculate monthly ghost-labor, late-entry & cash slip losses across active project sites.", icon: Calculator, color: "text-rose-600 bg-rose-50" },
    ],
  },
];

export default function ToolsHub() {
  const { openLeadModal } = useLeadModal();

  const pageUrl = "https://www.prajyotinfotech.in/tools";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online Business Tools & Calculators India | Prajyot Infotech",
    url: pageUrl,
    description: "Directory of 100% free Indian business utilities: GST Invoice Generator, Quotation Maker, UPI QR Standee, HSN Finder, WhatsApp QR, Legal Policy Generator, Salary Slip & Cost Calculators.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Business Tools", url: pageUrl },
        ]}
      />
      <Seo
        title="Free Online Business Tools India — GST Invoice, Quotation, UPI QR & Calculators | Prajyot Infotech"
        description="Free browser-based tools for Indian businesses: GST Invoice PDF maker, Quotation generator, UPI payment QR standee, WhatsApp link maker, HSN lookup, Salary slip & Cost calculators."
        keywords="free business tools india, online gst invoice maker, free quotation generator, upi qr standee maker, salary slip generator, whatsapp qr maker"
        path="/tools"
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-14 sm:py-18 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Zero Signup · Zero Watermarks · Runs Locally</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Free Online Business Utilities &amp; Calculators
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Every essential billing, tax, compliance, QR, and software estimation tool engineered cleanly for Indian businesses — free forever.
          </p>
        </div>
      </div>

      {/* Groups */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16 space-y-14">
        {TOOL_GROUPS.map((grp) => (
          <section key={grp.heading}>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{grp.heading}</h2>
              <p className="text-sm text-slate-600 mt-1">{grp.sub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {grp.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onMouseEnter={() => prefetchRoute(item.to)}
                    className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg hover:border-brand-300 transition-all flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${item.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-700 transition-colors mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-brand-700">
                      <span>Launch Tool Free</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white px-4 py-14 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Need These Tools Integrated Into One Custom Company Portal?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-8">
            Prajyot Infotech builds custom ERP, CRM, billing, and automation systems with full source code ownership and zero recurring seat fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: "Custom Portal & ERP Inquiry (Tools Hub)" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Get Custom Software Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a href={`https://wa.me/917020708747?text=${encodeURIComponent("Hi Prajyot Infotech, I explored your Free Business Tools hub and want to discuss custom business software.")}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]">
              <MessageSquare className="w-4 h-4" /> WhatsApp Architect
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
