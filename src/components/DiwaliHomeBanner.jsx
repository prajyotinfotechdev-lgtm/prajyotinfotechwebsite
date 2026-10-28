// src/components/DiwaliHomeBanner.jsx
// Prominent Diwali festive banner & package offer section for Homepage
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Gift, ArrowRight, Check, Tag, ShieldCheck, Clock, Copy, Flame } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const CAMPAIGN_END = new Date("2026-11-30T23:59:59+05:30").getTime();
const WHATSAPP_NUMBER = "917020708747";

export default function DiwaliHomeBanner() {
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);

  // Auto hide after campaign ends
  if (Date.now() > CAMPAIGN_END) return null;

  const handleCopyCode = () => {
    try {
      navigator.clipboard.writeText("DIWALI2026");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
    }
  };

  const handleClaim = (tierName) => {
    openLeadModal({
      title: `🪔 Diwali Special: ${tierName || "All Services"}`,
      subtitle:
        "15% Flat Discount + 3 Months Free AMC & Priority Delivery for projects launched during Diwali 2026.",
      source: `Diwali 2026 — Home Banner (${tierName || "General"})`,
      projectType: tierName || "Diwali Festive Offer",
      defaultMessage: `Hi, I'd like to avail the Diwali Festive 15% OFF offer (Code: DIWALI2026) for ${tierName || "a new project"}. Please share details.`,
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hi Prajyot Infotech, I'm interested in the Diwali 2026 offer (15% OFF + 3 months free maintenance). Please share proposal details."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener noreferrer");
  };

  const offers = [
    {
      title: "Corporate & Showcase Web",
      badge: "Fast Launch",
      origPrice: "₹29,999",
      festivePrice: "₹25,499",
      savings: "Save ₹4,500",
      features: [
        "1–5 Custom responsive pages",
        "Sub-second load time (<1s)",
        "On-page SEO & Schema ready",
        "Free SSL & hosting deployment",
        "3 Months free maintenance",
      ],
    },
    {
      title: "Business Growth & SaaS",
      badge: "Most Popular",
      origPrice: "₹59,999",
      festivePrice: "₹50,999",
      savings: "Save ₹9,000",
      featured: true,
      features: [
        "Dynamic CMS / web application",
        "WhatsApp API & CRM capture",
        "Interactive animations & UI",
        "Lead database & analytics",
        "3 Months priority SLA support",
      ],
    },
    {
      title: "Custom ERP, CRM & Apps",
      badge: "Enterprise Pack",
      origPrice: "Custom",
      festivePrice: "Flat 15% OFF",
      savings: "Zero Setup Fee",
      features: [
        "React, Node.js & PostgreSQL stack",
        "Android & iOS cross-platform app",
        "Multi-role permissions & workflows",
        "100% Source code & IP transfer",
        "Free onsite or online staff training",
      ],
    },
  ];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-14 overflow-hidden">
      {/* Background warm celebratory atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, #f59e0b 0%, #ea580c 40%, #7c3aed 80%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Main Card Container */}
        <div
          className="relative rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden border border-amber-300/80 shadow-2xl diwali-glow-card"
          style={{
            background:
              "linear-gradient(135deg, #fffbeb 0%, #fef3c7 20%, #ffffff 50%, #fff7ed 80%, #faf5ff 100%)",
          }}
        >
          {/* Subtle decorative rangoli / corner diyas */}
          <div className="absolute top-4 left-4 text-3xl opacity-75 select-none" aria-hidden>
            🪔
          </div>
          <div className="absolute top-4 right-4 text-3xl opacity-75 select-none" aria-hidden>
            🪔
          </div>

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black tracking-wider uppercase mb-3 shadow-sm diwali-badge-glow">
              <Sparkles size={13} className="text-amber-200" />
              <span>Diwali Mahotsav 2026 • Limited Time Offers</span>
              <Sparkles size={13} className="text-amber-200" />
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
              Light Up Your Business This{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                Diwali Season
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Start your next software venture on an auspicious note! Avail{" "}
              <strong className="text-amber-900 font-bold">Flat 15% OFF</strong> +{" "}
              <strong className="text-amber-900 font-bold">3 Months Free Maintenance</strong> on all
              custom web platforms, enterprise software, and mobile apps.
            </p>

            {/* Coupon Code Pill */}
            <div className="mt-5 inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm border-2 border-dashed border-amber-400 rounded-2xl px-4 py-2 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-amber-900">
                <Tag size={14} className="text-amber-600" />
                <span>Coupon Code:</span>
                <span className="font-mono font-extrabold text-sm sm:text-base text-amber-700 tracking-wider">
                  DIWALI2026
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3 Festive Package Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            {offers.map((offer) => (
              <div
                key={offer.title}
                className={`relative flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 ${
                  offer.featured
                    ? "bg-gradient-to-b from-white to-amber-50/80 border-2 border-amber-400 shadow-xl shadow-amber-500/10"
                    : "bg-white/90 border border-amber-200/80 shadow-md hover:shadow-lg"
                }`}
              >
                {offer.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md">
                    Festive Favorite 🪔
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md">
                      {offer.badge}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      {offer.savings}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3">{offer.title}</h3>

                  {/* Pricing row */}
                  <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-amber-100">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">
                      {offer.festivePrice}
                    </span>
                    {offer.origPrice !== "Custom" && (
                      <span className="text-xs text-slate-400 line-through">
                        {offer.origPrice}
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2.5 mb-6 text-xs text-slate-600">
                    {offer.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <Check size={14} className="text-amber-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  onClick={() => handleClaim(offer.title)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    offer.featured
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
                      : "bg-slate-900 hover:bg-slate-800 text-white hover:scale-[1.01]"
                  }`}
                >
                  <span>Claim Festive Offer</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Trust Guarantees & Auspicious Note */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-amber-200/60 text-xs text-slate-600">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck size={15} className="text-amber-600" />
                100% IP & Code Handover
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Clock size={15} className="text-amber-600" />
                Guaranteed Launch Window
              </span>
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <Gift size={15} className="text-amber-600" />
                3 Months Free AMC
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>💬 WhatsApp Us</span>
              </button>
              <span className="text-[11px] text-amber-800/70 font-medium">
                Offer valid till Nov 30, 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

