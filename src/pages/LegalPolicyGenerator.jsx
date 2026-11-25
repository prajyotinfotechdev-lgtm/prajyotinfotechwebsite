import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import {
  ShieldCheck,
  Copy,
  Check,
  Download,
  Code2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const DOC_TABS = [
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Service" },
  { id: "refund", label: "Refund & Cancellation" },
  { id: "shipping", label: "Shipping & Delivery" },
];

const FAQS = [
  {
    q: "Are these legal policy pages valid for Razorpay, PhonePe & Cashfree KYC?",
    a: "Yes. Indian payment aggregators strictly verify 4 public pages before activating live payments: Privacy Policy, Terms & Conditions, Refund & Cancellation Timeline (usually 5–7 working days), and Shipping/Delivery Policy.",
  },
  {
    q: "Does the Privacy Policy work for Google Play Store & Apple App Store submissions?",
    a: "Yes. You can toggle mobile permissions (camera, location, push notifications) so the generated Privacy Policy discloses required data access for Play Console Data Safety verification.",
  },
  {
    q: "Should digital SaaS businesses also have a Shipping Policy?",
    a: "Yes. Payment gateways often ask even SaaS or service agencies to include a Delivery/Fulfillment Policy explaining how software access, email delivery, or project milestones are delivered.",
  },
  {
    q: "Can I copy raw HTML or plain text?",
    a: "Both options are one tap away — copy formatted text for WordPress/Shopify/Notion or copy clean semantic HTML to paste directly into your website.",
  },
];

export default function LegalPolicyGenerator() {
  const { openLeadModal } = useLeadModal();
  const [activeDoc, setActiveDoc] = useState("privacy");
  const [copiedMode, setCopiedMode] = useState("");

  const [cfg, setCfg] = useState({
    brand: "Your Company Pvt Ltd",
    website: "https://www.yourcompany.in",
    email: "support@yourcompany.in",
    phone: "+91 98000 00000",
    city: "Pune, Maharashtra, India",
    gateway: "Razorpay / UPI",
    refundDays: "5 to 7 business days",
    deliveryMode: "Digital / Physical Courier",
    collectsMedia: false,
  });

  const policyText = useMemo(() => {
    const today = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    if (activeDoc === "privacy") {
      return `PRIVACY POLICY
Last Updated: ${today}

${cfg.brand} ("we", "our", "us") respects your privacy and is committed to protecting personal information shared while using ${cfg.website} and our associated mobile/web applications.

1. INFORMATION WE COLLECT
- Contact Data: Name, email address, phone/WhatsApp number, billing address, and GSTIN (where applicable).
- Payment Data: Transactions processed securely via ${cfg.gateway}. We do not store full card numbers or UPI PINs on our servers.
- Usage Logs: Browser type, device IP address, and performance telemetry to improve service reliability.${cfg.collectsMedia ? "\n- App Permissions: Camera, file storage, or location access strictly when explicitly permitted by the user for core application functionality." : ""}

2. HOW WE USE INFORMATION
- To fulfill product/service orders, issue GST tax invoices, and communicate critical updates.
- To verify identity, prevent fraud, and comply with the Indian Information Technology Act, 2000 & Digital Personal Data Protection Act (DPDPA) rules.

3. DATA SHARING & SECURITY
We never sell or rent user data. Data may be shared only with verified payment processors (${cfg.gateway}), logistics partners, or when legally mandated by government authorities.

4. GRIEVANCE & CONTACT
For privacy requests, deletion, or questions contact:
Email: ${cfg.email} | Phone: ${cfg.phone}
Address: ${cfg.city}`;
    }

    if (activeDoc === "terms") {
      return `TERMS AND CONDITIONS
Last Updated: ${today}

Welcome to ${cfg.brand} (${cfg.website}). By accessing or purchasing from our platform, you agree to be bound by these Terms & Conditions.

1. SERVICES & PRICING
All prices displayed are in INR (unless stated otherwise) and exclusive/inclusive of applicable GST taxes as indicated at checkout. We reserve the right to update service pricing prior to order confirmation.

2. PAYMENTS & AUTHENTICATION
Payments are processed via authorized gateways (${cfg.gateway}). Orders are confirmed only upon successful settlement verification.

3. INTELLECTUAL PROPERTY
All branding, software architecture, graphics, and content displayed on ${cfg.website} remain the property of ${cfg.brand} or its respective licensors unless transferred under a written commercial contract.

4. LIMITATION OF LIABILITY
${cfg.brand} shall not be liable for indirect, incidental, or consequential damages resulting from third-party network outages or improper account usage.

5. GOVERNING LAW & JURISDICTION
These terms are governed by the laws of India, with exclusive jurisdiction vested in courts located in ${cfg.city}.

Contact: ${cfg.email} | ${cfg.phone}`;
    }

    if (activeDoc === "refund") {
      return `REFUND & CANCELLATION POLICY
Last Updated: ${today}

At ${cfg.brand}, we believe in transparent cancellation and refund timelines.

1. ORDER CANCELLATION
Cancellation requests must be submitted within 24 hours of order placement (or prior to dispatch / sprint kickoff) by emailing ${cfg.email} with your order/invoice reference.

2. REFUND ELIGIBILITY
- Eligible refunds include duplicate payment deductions, unfulfilled orders, or verified defective deliverables as per the order agreement.
- Custom software milestones already delivered/approved or digital downloads are non-refundable unless mutually agreed in writing.

3. REFUND PROCESSING TIMELINE
Once approved by our finance desk, refunds are initiated to your original payment method (${cfg.gateway} / bank source) within ${cfg.refundDays}.

4. SUPPORT
Email: ${cfg.email} | Phone: ${cfg.phone} | Website: ${cfg.website}`;
    }

    return `SHIPPING & DELIVERY POLICY
Last Updated: ${today}

Brand: ${cfg.brand}
Delivery Model: ${cfg.deliveryMode}

1. DIGITAL SERVICES & SAAS ACTIVATION
Software credentials, digital invoices, and portal access links are delivered electronically via registered email and WhatsApp immediately upon payment verification or within the contracted milestone timeline.

2. PHYSICAL SHIPMENTS (WHERE APPLICABLE)
- Orders are processed within 1–2 business days (excluding Sundays & public holidays).
- Standard Pan-India courier delivery takes 3 to 7 business days depending on destination pin code.
- Live tracking details are dispatched via SMS/WhatsApp/Email once shipped.

3. DELIVERY SUPPORT
For delayed shipments or activation issues contact ${cfg.email} or call ${cfg.phone}.`;
  }, [activeDoc, cfg]);

  const copyAsText = () => {
    navigator.clipboard?.writeText(policyText);
    setCopiedMode("txt");
    setTimeout(() => setCopiedMode(""), 2000);
  };

  const copyAsHtml = () => {
    const html = `<article>\n${policyText
      .split("\n\n")
      .map((blk, i) => (i === 0 ? `<h1>${blk.split("\n")[0]}</h1><p>${blk.split("\n").slice(1).join("<br/>")}</p>` : `<p>${blk.replace(/\n/g, "<br/>")}</p>`))
      .join("\n")}\n</article>`;
    navigator.clipboard?.writeText(html);
    setCopiedMode("html");
    setTimeout(() => setCopiedMode(""), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([policyText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeDoc}-policy.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/legal-policy-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Indian Website Legal Policy Generator (Privacy, Terms, Refund)",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Generate ready-to-publish Privacy Policy, Terms of Service, Refund Policy, and Shipping Policy compliant for Razorpay KYC, Indian DPDPA, and Google Play Store.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "Legal Policy Generator", url: pageUrl },
        ]}
      />
      <Seo
        title="Free Privacy Policy, Terms & Refund Generator (Razorpay KYC Ready India) | Prajyot Infotech"
        description="Generate free Privacy Policy, Terms of Service, Refund & Cancellation, and Shipping Policy pages formatted for Razorpay, PhonePe KYC, and Google Play Store."
        keywords="privacy policy generator razorpay india, refund policy generator ecommerce india, play store privacy policy maker, terms and conditions generator free"
        path="/tools/legal-policy-generator"
        image="/og/og-legal-policy.jpg"
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>Razorpay · Cashfree · PhonePe · Play Store KYC Ready</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Website &amp; App Legal Policy Generator
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Instantly generate all 4 mandatory compliance pages needed to launch an e-commerce site, SaaS app, or mobile payment gateway in India.
          </p>
        </div>
      </div>

      {/* Main Builder */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-600" /> Your Business Details
            </h2>

            {[
              { k: "brand", l: "Company / Store Name" },
              { k: "website", l: "Website URL" },
              { k: "email", l: "Support / Grievance Email" },
              { k: "phone", l: "Phone / WhatsApp Number" },
              { k: "city", l: "Jurisdiction City & State" },
            ].map((f) => (
              <div key={f.k}>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">{f.l}</label>
                <input
                  type="text"
                  value={cfg[f.k]}
                  onChange={(e) => setCfg((p) => ({ ...p, [f.k]: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Payment Gateway</label>
                <input value={cfg.gateway} onChange={(e) => setCfg((p) => ({ ...p, gateway: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Refund Window</label>
                <input value={cfg.refundDays} onChange={(e) => setCfg((p) => ({ ...p, refundDays: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none" />
              </div>
            </div>

            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={cfg.collectsMedia}
                onChange={(e) => setCfg((p) => ({ ...p, collectsMedia: e.target.checked }))}
                className="mt-0.5 accent-brand-600"
              />
              <span className="text-slate-700 font-medium">Include Mobile App Camera / GPS Location clause (Play Store / App Store)</span>
            </label>
          </div>

          {/* Right Preview & Copy */}
          <div className="lg:col-span-7 space-y-4">
            {/* Document Type Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DOC_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveDoc(t.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer min-h-[42px] ${
                    activeDoc === t.id
                      ? "bg-brand-600 text-white border-brand-600 shadow"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 text-slate-100 rounded-3xl p-5 sm:p-7 shadow-xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-brand-300 uppercase">
                  {DOC_TABS.find((d) => d.id === activeDoc)?.label} Preview
                </span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={copyAsText}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs cursor-pointer">
                    {copiedMode === "txt" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMode === "txt" ? "Copied Text!" : "Copy Text"}</span>
                  </button>
                  <button type="button" onClick={copyAsHtml}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer">
                    {copiedMode === "html" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5" />}
                    <span>{copiedMode === "html" ? "Copied HTML!" : "Copy HTML"}</span>
                  </button>
                  <button type="button" onClick={downloadFile}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> .TXT
                  </button>
                </div>
              </div>

              <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[460px] overflow-y-auto pr-1">
                {policyText}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Launch Website CTA */}
      <div className="bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Launching a Website, Storefront, or Mobile App Soon?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Prajyot Infotech builds fast, compliant React websites, Razorpay stores, and Play Store apps ready for live payment approval out of the box.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: "New Website / App Launch Inquiry" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Get Instant Website / App Proposal <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/estimate"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]">
              Calculate Build Cost
            </Link>
          </div>
        </div>
      </div>

      <ToolSeoFaq heading="Legal Compliance & Gateway KYC FAQs" faqs={FAQS} />
    </div>
  );
}

