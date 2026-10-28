// src/components/DiwaliOfferBanner.jsx
// Festive sticky banner — rich Diwali celebration & promotional offer
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Tag, Flame } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const CAMPAIGN_END = new Date("2026-11-30T23:59:59+05:30").getTime();

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s, expired: diff <= 0 };
}

/* ── Inline Diya SVG with lively flickering flame ── */
function HeaderDiya({ size = 26 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className="inline-block shrink-0 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
      aria-hidden
    >
      <ellipse cx="16" cy="11" rx="5" ry="8" fill="url(#diyaFlameHead)" className="diya-flame-animated" />
      <ellipse cx="16" cy="12" rx="2.5" ry="4.5" fill="#FEF3C7" />
      <rect x="15.5" y="16" width="1" height="3" rx="0.5" fill="#78350F" />
      <path
        d="M7 21 Q9 17 16 17 Q23 17 25 21 L26 24 Q26 28 16 28 Q6 28 6 24 Z"
        fill="url(#diyaBodyHead)"
        stroke="#78350F"
        strokeWidth="0.7"
      />
      <path
        d="M9 20 Q12 18 16 18 Q20 18 23 20"
        stroke="#FDE68A"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <defs>
        <radialGradient id="diyaFlameHead" cx="50%" cy="70%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </radialGradient>
        <linearGradient id="diyaBodyHead" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Sparkle particle (pure CSS driven) ── */
function SparkleIcon({ delay = 0 }) {
  return (
    <motion.span
      className="inline-block text-amber-200 select-none"
      animate={{ scale: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      ✦
    </motion.span>
  );
}

export default function DiwaliOfferBanner() {
  const { openLeadModal } = useLeadModal();
  const [dismissed, setDismissed] = useState(false);
  const countdown = useCountdown(CAMPAIGN_END);

  // Check if campaign is active
  const isActive = useMemo(() => Date.now() < CAMPAIGN_END, [countdown.s]);

  // Session-based dismiss check
  useEffect(() => {
    try {
      const v = sessionStorage.getItem("diwali26:banner:minimized");
      if (v === "true") setDismissed(true);
    } catch {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem("diwali26:banner:minimized", "true");
    } catch {}
  };

  const handleRestore = () => {
    setDismissed(false);
    try {
      sessionStorage.removeItem("diwali26:banner:minimized");
    } catch {}
  };

  const handleCTA = () => {
    openLeadModal({
      title: "🪔 Shubh Deepavali Festive Offer",
      subtitle:
        "Celebrate Diwali 2026 with Prajyot Infotech! 15% discount + 3 months free maintenance on custom websites, enterprise web apps, SaaS & mobile systems.",
      source: "Diwali 2026 — Top Banner Offer (Code: DIWALI2026)",
      projectType: "Diwali Special Package",
      defaultMessage:
        "Hi, I want to avail the Diwali Festive Offer (Code: DIWALI2026) for 15% off + 3 months free maintenance. Please share package details and scope.",
    });
  };

  if (!isActive) return null;

  return (
    <>
      <AnimatePresence>
        {!dismissed ? (
          <motion.div
            id="diwali-offer-banner"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[60] w-full overflow-hidden shadow-md"
            style={{
              background:
                "linear-gradient(90deg, #92400e 0%, #b45309 20%, #d97706 45%, #ea580c 60%, #b45309 85%, #78350f 100%)",
              backgroundSize: "200% 100%",
              animation: "diwaliGradientShift 8s ease infinite",
              borderBottom: "1px solid rgba(251, 191, 36, 0.5)",
            }}
          >
            {/* Shimmer sweep effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
                backgroundSize: "200% 100%",
                animation: "diwaliShimmer 3.5s linear infinite",
              }}
            />

            <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5 sm:py-3 text-white">
              {/* Left Diya & Tag */}
              <div className="flex items-center gap-2 shrink-0">
                <HeaderDiya size={26} />
                <span className="hidden sm:inline-flex items-center gap-1 bg-amber-950/40 border border-amber-300/40 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-amber-200 tracking-wider uppercase">
                  <Sparkles size={11} className="text-amber-300" />
                  Diwali Mahotsav 2026
                </span>
              </div>

              {/* Center message & countdown & promo code */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center flex-1 mx-2">
                <div className="text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5">
                  <span className="font-extrabold text-amber-100">शुभ दीपावली!</span>
                  <span className="text-amber-200 hidden md:inline">•</span>
                  <span>
                    Get <strong className="text-amber-200 font-extrabold underline decoration-amber-300/60 underline-offset-2">15% OFF</strong> + <strong className="text-white">3 Months Free Support</strong>
                  </span>
                </div>

                {/* Promo Coupon Pill */}
                <span className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-amber-300/50 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold text-amber-100 transition-colors shadow-sm">
                  <Tag size={11} className="text-amber-300" />
                  Code: <strong className="text-white tracking-wider">DIWALI2026</strong>
                </span>

                {/* Countdown timer */}
                <div className="hidden lg:flex items-center gap-1 text-[11px] font-mono bg-black/30 border border-amber-400/20 rounded-full px-2.5 py-0.5 text-amber-100">
                  <span className="font-bold text-amber-300">{countdown.d}d</span>
                  <span className="opacity-60">:</span>
                  <span className="font-bold text-amber-300">{countdown.h}h</span>
                  <span className="opacity-60">:</span>
                  <span className="font-bold text-amber-300">{countdown.m}m</span>
                  <span className="opacity-60">:</span>
                  <span className="font-bold text-amber-300">{countdown.s}s</span>
                </div>
              </div>

              {/* Right CTA and close */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCTA}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 hover:from-white hover:to-amber-200 text-amber-950 font-extrabold text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles size={13} className="text-amber-700" />
                  <span>Claim Offer</span>
                  <ArrowRight size={13} />
                </button>

                <HeaderDiya size={24} />

                {/* Dismiss button */}
                <button
                  onClick={handleDismiss}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer ml-1"
                  aria-label="Minimize Diwali banner"
                  title="Minimize banner"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Minimized pill in top corner so user can easily restore or claim anytime */
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-2 right-4 z-[55]"
          >
            <button
              onClick={handleRestore}
              className="diwali-badge-glow flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer border border-amber-300"
              title="View Diwali 15% OFF Offer"
            >
              <span className="text-sm">🪔</span>
              <span>Diwali 15% OFF</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
