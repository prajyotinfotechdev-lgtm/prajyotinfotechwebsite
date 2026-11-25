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
  TrendingUp,
  FileSignature,
  PlayCircle,
} from "lucide-react";
import { prefetchRoute } from "../utils/prefetch.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const TOOL_GROUPS = [
  {
    heading: "Billing, Tax & Daily Finance Utilities",
    sub: "Zero-watermark A4 PDF makers and Indian GST calculators built for daily merchant workflows.",
    items: [
      { to: "/tools/gst-invoice-generator", title: "Free GST Invoice Generator", badge: "Popular", desc: "A4 Rule-46 Tax Invoices with custom logo, auto CGST/SGST vs IGST & WhatsApp dispatch.", icon: FileText, color: "text-emerald-600 bg-emerald-50" },
      { to: "/tools/quotation-generator", title: "Quotation & Proforma Maker", badge: "Free", desc: "Send crisp GST exclusive/inclusive/non-GST price quotes with payment milestone terms.", icon: FileCheck2, color: "text-indigo-600 bg-indigo-50" },
      { to: "/tools/gst-profit-calculator", title: "GST & Profit Margin Calculator", badge: "Free", desc: "Add or reverse-extract 0%–28% GST slabs & check exact retail net margin %.", icon: IndianRupee, color: "text-blue-600 bg-blue-50" },
      { to: "/tools/hsn-sac-finder", title: "HSN / SAC Code & Tax Finder", badge: "GST Slabs", desc: "Search common Indian HSN/SAC codes and load them into the GST Invoice Maker in 1 tap.", icon: Tag, color: "text-amber-600 bg-amber-50" },
      { to: "/tools/business-emi-calculator", title: "MSME Business Loan EMI Calculator", badge: "New", desc: "Simulate loan EMI, yearly amortization & interest saved with annual prepayments.", icon: IndianRupee, color: "text-purple-600 bg-purple-50" },
      { to: "/tools/break-even-calculator", title: "Break-Even & D2C Margin Calc", badge: "New", desc: "Compute exact monthly break-even orders after GST, 2% payment fee, courier & Ad CAC.", icon: TrendingUp, color: "text-rose-600 bg-rose-50" },
    ],
  },
  {
    heading: "WhatsApp, QR Payments, HR & Legal Compliance",
    sub: "Accept direct UPI payments, grow WhatsApp inquiries, issue payslips, and draft NDAs fast.",
    items: [
      { to: "/tools/whatsapp-link-generator", title: "WhatsApp Link & Counter QR", badge: "Popular", desc: "Create custom wa.me links with welcome messages, SVG/PNG QR standees & website widget code.", icon: QrCode, color: "text-teal-600 bg-teal-50" },
      { to: "/tools/upi-qr-generator", title: "UPI Payment QR Standee Maker", badge: "Standee", desc: "Generate NPCI UPI QR cards with fixed Rupee amount locking for GPay, PhonePe & Paytm.", icon: QrCode, color: "text-brand-600 bg-brand-50" },
      { to: "/tools/legal-policy-generator", title: "Legal Policy Generator (KYC)", badge: "Razorpay", desc: "Generate Privacy, Terms, Refund & Shipping pages ready for Razorpay & Play Store review.", icon: ShieldCheck, color: "text-emerald-600 bg-emerald-50" },
      { to: "/tools/nda-agreement-generator", title: "Mutual NDA & IP Ownership Maker", badge: "New", desc: "Draft Indian Mutual NDAs & 100% Source Code IP Assignment clauses ready to print.", icon: FileSignature, color: "text-indigo-600 bg-indigo-50" },
      { to: "/tools/salary-slip-generator", title: "Employee Salary Slip Maker", badge: "Payroll", desc: "Create official monthly A4 payslips with Basic, HRA, PF, PT & TDS calculations free.", icon: Receipt, color: "text-violet-600 bg-violet-50" },
      { to: "/tools/purchase-order-generator", title: "Purchase Order & Challan Maker", badge: "B2B", desc: "Generate factory Purchase Orders & Rule-55 Delivery Challans with HSN & GST.", icon: ClipboardCheck, color: "text-orange-600 bg-orange-50" },
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

const LIVE_DEMOS = [
  { to: "/demo/restaurant-qr-kds", title: "Restaurant QR & Kitchen KDS Demo", badge: "FoodTech Live", desc: "Punch table orders live on the customer screen and watch tickets appear on the Kitchen Display System." },
  { to: "/demo/mobile-shop-imei-pos", title: "Mobile Shop IMEI POS & GST Demo", badge: "Retail Live", desc: "Select serialized IMEI phones and simulate instant GST invoicing with automated WhatsApp receipt delivery." },
  { to: "/demo/boutique-ecommerce", title: "Couture Boutique Storefront Demo", badge: "Luxury D2C", desc: "Test custom boutique browsing, bridal wishlist saving, and stylist WhatsApp escalation without SaaS rent." },
];

export default function ToolsHub() {
  const { openLeadModal } = useLeadModal();

  const pageUrl = "https://www.prajyotinfotech.in/tools";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Online Business Tools & Calculators India | Prajyot Infotech",
    url: pageUrl,
    description: "Directory of 100% free Indian business utilities: GST Invoice Generator, Quotation Maker, UPI QR Standee, HSN Finder, Business Loan EMI, Break-Even Calc, NDA Drafts, Salary Slip & Cost Calculators.",
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
        title="Free Online Business Tools India — GST Invoice, EMI, Break-Even & Live Demos | Prajyot Infotech"
        description="Free browser-based tools for Indian businesses: GST Invoice PDF maker, Quotation maker, Business EMI & Break-Even calculators, Mutual NDA draft, UPI QR standee, Salary slip & interactive software demos."
        keywords="free business tools india, online gst invoice maker, free quotation generator, upi qr standee maker, msme business loan emi calculator, break even calculator india"
        path="/tools"
        image="/og/og-tools.jpg"
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-14 sm:py-18 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Zero Signup · Zero Watermarks · English / मराठी / हिंदी Guides</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Free Online Business Utilities &amp; Live Demos
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
            Every essential billing, GST, loan EMI, break-even, legal NDA, QR, and software cost estimation tool — free forever.
          </p>
        </div>
      </div>

      {/* Live Interactive Software Demos Strip */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-2">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <PlayCircle className="w-4 h-4" /> Interactive Software Simulators
              </div>
              <h2 className="text-xl sm:text-2xl font-black">Test-Drive Live Industry Systems in Browser</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LIVE_DEMOS.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                onMouseEnter={() => prefetchRoute(d.to)}
                className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-brand-500/60 transition group flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px] font-mono font-bold uppercase mb-2">
                    {d.badge}
                  </span>
                  <h3 className="text-base font-black text-white group-hover:text-brand-300 transition">{d.title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{d.desc}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 inline-flex items-center gap-1">
                  Launch Interactive Demo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 space-y-14">
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
