import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight, Wrench } from "lucide-react";
import { prefetchRoute } from "../utils/prefetch.js";

const DEFAULT_RELATED_TOOLS = [
  { to: "/tools/gst-invoice-generator", title: "GST Invoice Maker", tag: "Free PDF" },
  { to: "/tools/quotation-generator", title: "Quotation Maker", tag: "Proforma" },
  { to: "/tools/upi-qr-generator", title: "UPI Payment QR", tag: "Merchant" },
  { to: "/tools/hsn-sac-finder", title: "HSN / SAC Finder", tag: "GST Rates" },
  { to: "/tools/whatsapp-link-generator", title: "WhatsApp QR Maker", tag: "wa.me" },
  { to: "/tools/gst-profit-calculator", title: "GST & Margin Calc", tag: "Finance" },
];

export default function ToolSeoFaq({ heading = "Frequently Asked Questions", faqs = [], relatedTools, dark = false }) {
  useEffect(() => {
    if (!faqs.length) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.head.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [faqs]);

  const links = relatedTools || DEFAULT_RELATED_TOOLS;

  return (
    <section className={`no-print py-12 px-4 ${dark ? "bg-slate-950 text-slate-100 border-t border-slate-800" : "bg-white text-slate-900 border-t border-slate-200"}`}>
      <div className="max-w-5xl mx-auto space-y-10">
        {faqs.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>Quick Answers &amp; Guides</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black tracking-tight mb-6 ${dark ? "text-white" : "text-slate-900"}`}>
              {heading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faqs.map((f, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${dark ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-slate-200"}`}
                >
                  <h3 className={`text-sm font-bold mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>{f.q}</h3>
                  <p className={`text-xs leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Internal Tool Cross-Link Strip for Crawl & SEO Flow */}
        <div className={`pt-8 border-t ${dark ? "border-slate-800" : "border-slate-200"}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Wrench className="w-4 h-4 text-brand-500" />
              <span>More Free Business Utilities</span>
            </div>
            <Link to="/tools" className="text-xs font-bold text-brand-600 hover:underline inline-flex items-center gap-1">
              View All Free Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {links.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                onMouseEnter={() => prefetchRoute(tool.to)}
                className={`p-3 rounded-xl border transition-all text-left group ${
                  dark
                    ? "bg-slate-900 border-slate-800 hover:border-brand-500/60 text-slate-200"
                    : "bg-slate-50 border-slate-200 hover:border-brand-400 hover:bg-brand-50/40 text-slate-800"
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-600 font-bold block">{tool.tag}</span>
                <span className="text-xs font-bold mt-0.5 block group-hover:text-brand-600 transition-colors">{tool.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

