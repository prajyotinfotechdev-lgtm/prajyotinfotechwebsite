// src/components/DiwaliOfferBanner.jsx
// Festive sticky banner — auto-removes after campaign ends
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight } from "lucide-react";
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

/* ── Sparkle particle (pure CSS driven) ── */
function SparkleIcon({ delay = 0 }) {
  return (
    <motion.span
      className="inline-block text-yellow-200"
      animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
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

  // Check if campaign is still active
  const isActive = useMemo(() => Date.now() < CAMPAIGN_END, [countdown.s]);

  // Check localStorage for previous dismiss
  useEffect(() => {
    try {
      const v = localStorage.getItem("diwali26:banner:dismissed");
      if (v === "true") setDismissed(true);
    } catch {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("diwali26:banner:dismissed", "true");
    } catch {}
  };

  const handleCTA = () => {
    openLeadModal({
      title: "🪔 Diwali Special Consultation",
      subtitle:
        "Start your new project on an auspicious note. 15% off + 3 months free maintenance on all new projects!",
      source: "Diwali 2026 — Banner CTA",
      projectType: "",
      defaultMessage:
        "Hi, I'm interested in the Diwali offer — 15% off + free maintenance. Please share details.",
    });
  };

  if (!isActive || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="diwali-offer-banner"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[60] w-full overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #b45309 0%, #d97706 25%, #f59e0b 50%, #d97706 75%, #b45309 100%)",
          backgroundSize: "200% 200%",
          animation: "diwaliGradientShift 6s ease infinite",
        }}
      >
        {/* Subtle shimmer overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "diwaliShimmer 3s linear infinite",
          }}
        />

        <div className="relative flex items-center justify-center gap-2 sm:gap-4 px-4 py-2.5 sm:py-3 text-white">
          {/* Sparkles */}
          <span className="hidden sm:flex items-center gap-1">
            <SparkleIcon delay={0} />
            <SparkleIcon delay={0.4} />
          </span>

          {/* Main message */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center">
            <span className="text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5">
              <span className="text-lg">🪔</span>
              <span>
                <span className="font-bold">Diwali Special</span> — 15% Off +
                3 Months Free Maintenance
              </span>
            </span>

            {/* Countdown */}
            <span className="hidden md:flex items-center gap-1.5 text-[11px] font-mono bg-black/20 rounded-full px-3 py-1">
              <span className="font-bold">{countdown.d}d</span>
              <span>:</span>
              <span className="font-bold">{countdown.h}h</span>
              <span>:</span>
              <span className="font-bold">{countdown.m}m</span>
              <span>:</span>
              <span className="font-bold">{countdown.s}s</span>
            </span>

            {/* CTA button */}
            <button
              onClick={handleCTA}
              className="inline-flex items-center gap-1 bg-white/95 hover:bg-white text-amber-800 font-bold text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Claim Offer
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <span className="hidden sm:flex items-center gap-1">
            <SparkleIcon delay={0.2} />
            <SparkleIcon delay={0.6} />
          </span>

          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white cursor-pointer"
            aria-label="Dismiss Diwali banner"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
