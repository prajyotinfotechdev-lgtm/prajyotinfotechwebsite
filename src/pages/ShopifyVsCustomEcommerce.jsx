import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { CheckCircle2, XCircle, Sparkles, ArrowRight, MessageSquare } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const ROWS = [
  {
    feature: "Monthly Platform & Paid Plugin Fees",
    shopify: "₹3,000 base + ₹8,000–₹25,000/mo in paid reviews, upsell, WhatsApp & size-guide apps forever.",
    custom: "₹0 monthly plugin charges. Built-in size guides, reels commerce & Razorpay natively.",
  },
  {
    feature: "4G Mobile Page Load Speed",
    shopify: "Liquid templates + 15 third-party app scripts frequently push LCP to 3.0s – 5.2s on mobile.",
    custom: "Sub-second React SPA with edge CDN & zero bloated app injections.",
  },
  {
    feature: "VIP Bridal / High-Ticket Consultative Flows",
    shopify: "Generic Add-to-Cart checkout loses high-ticket buyers wanting custom tailoring or styling help.",
    custom: "Custom blouse/product customizers, video styling & 1-click WhatsApp concierge built in.",
  },
  {
    feature: "Checkout & Payment Gateway Freedom",
    shopify: "Charges extra third-party transaction fees unless locked to limited gateways.",
    custom: "0% platform surcharge. Direct Razorpay, Cashfree, PhonePe UPI settlement.",
  },
];

export default function ShopifyVsCustomEcommerce() {
  const { openLeadModal } = useLeadModal();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should an Indian D2C brand choose Custom React E-Commerce over Shopify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shopify is ideal for testing an initial catalog under 20 products. Once you pay ₹12,000+/month across paid Shopify apps or sell high-ticket custom products (like bridal couture, jewellery, B2B wholesale) needing bespoke sizing & WhatsApp concierge flows, custom software outperforms on conversion and 3-year ROI.",
        },
      },
    ],
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Compare", url: "https://www.prajyotinfotech.in/compare/shopify-vs-custom-ecommerce" },
          { name: "Shopify vs Custom E-Commerce", url: "https://www.prajyotinfotech.in/compare/shopify-vs-custom-ecommerce" },
        ]}
      />
      <Seo
        title="Shopify vs Custom E-Commerce Storefront India (2026 Speed & Cost Guide) | Prajyot Infotech"
        description="Compare Shopify + monthly app fees vs custom sub-second React e-commerce websites with direct Razorpay UPI and WhatsApp commerce in India."
        keywords="shopify vs custom ecommerce india, shopify monthly app cost vs custom website, d2c website development pune, luxury ecommerce custom build"
        path="/compare/shopify-vs-custom-ecommerce"
        schema={faqSchema}
      />

      <main className="py-12 sm:py-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>D2C &amp; Luxury Retail Architecture · 2026</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-navy-900 mb-5 tracking-tight">
              Shopify vs <span className="text-brand-600">Custom D2C Storefront</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Stop paying recurring USD subscriptions for 15 sluggish Shopify apps when you can own a blazing-fast luxury storefront outright with native Razorpay and WhatsApp ordering.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-10 shadow-sm mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-navy-900 mb-6">Head-to-Head Comparison</h2>

            <div className="md:hidden space-y-4">
              {ROWS.map((r) => (
                <div key={r.feature} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="px-4 py-3 bg-slate-100 font-bold text-slate-900 text-sm border-b border-slate-200">{r.feature}</div>
                  <div className="p-4 space-y-3 text-xs">
                    <div className="flex items-start gap-2 text-slate-600">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div><strong className="block text-[10px] uppercase text-slate-500">Shopify + Paid Apps</strong>{r.shopify}</div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-900 bg-brand-50/70 p-3 rounded-xl border border-brand-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div><strong className="block text-[10px] uppercase text-brand-700">Custom React Storefront</strong>{r.custom}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase text-[11px]">
                    <th className="py-3.5 px-4 w-1/4">Criteria</th>
                    <th className="py-3.5 px-4 w-3/8">Shopify + App Stack</th>
                    <th className="py-3.5 px-4 w-3/8 text-brand-900 bg-brand-50/60">Prajyot Infotech Custom Storefront</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ROWS.map((r) => (
                    <tr key={r.feature}>
                      <td className="py-4 px-4 font-bold text-slate-900 align-top">{r.feature}</td>
                      <td className="py-4 px-4 align-top text-slate-600"><div className="flex gap-2"><XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /><span>{r.shopify}</span></div></td>
                      <td className="py-4 px-4 align-top text-slate-900 bg-brand-50/20 font-medium"><div className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>{r.custom}</span></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              See Real Luxury E-Commerce Performance in Action
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-7">
              Check how SAGYA Haute Couture achieved +42% higher high-ticket bridal consultations after launching a bespoke VIP styling &amp; mobile commerce experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/work/sagya-lehengas"
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]">
                View SAGYA Case Study <ArrowRight className="w-4 h-4" />
              </Link>
              <button type="button" onClick={() => openLeadModal({ projectType: "Custom D2C E-Commerce Storefront" })}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
                <MessageSquare className="w-4 h-4" /> Request E-Commerce Quote
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
