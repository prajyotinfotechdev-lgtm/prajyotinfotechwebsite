// src/components/DiwaliGreetingPopup.jsx
// One-time festive greeting popup with lead capture CTA
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Gift, Star, Sparkles } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const CAMPAIGN_END = new Date("2026-11-30T23:59:59+05:30").getTime();
const POPUP_DELAY = 5000; // show after 5 seconds
const STORAGE_KEY = "diwali26:popup:shown";

/* ── Animated Diya SVG ── */
function DiyaSVG({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className="inline-block"
      aria-hidden
    >
      {/* Flame */}
      <motion.ellipse
        cx="32"
        cy="18"
        rx="6"
        ry="10"
        fill="url(#flameGrad)"
        animate={{
          ry: [10, 12, 9, 11, 10],
          rx: [6, 5, 7, 5.5, 6],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Flame inner */}
      <motion.ellipse
        cx="32"
        cy="20"
        rx="3"
        ry="5"
        fill="#FEF3C7"
        animate={{ ry: [5, 6, 4.5, 5.5, 5], opacity: [0.9, 1, 0.85, 1, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Wick */}
      <rect x="31" y="26" width="2" height="4" rx="1" fill="#92400E" />
      {/* Diya body */}
      <path
        d="M20 35 Q22 30 32 30 Q42 30 44 35 L46 42 Q46 48 32 48 Q18 48 18 42 Z"
        fill="url(#diyaGrad)"
        stroke="#B45309"
        strokeWidth="1"
      />
      {/* Diya rim highlight */}
      <path
        d="M22 34 Q26 31 32 31 Q38 31 42 34"
        fill="none"
        stroke="#FBBF24"
        strokeWidth="1.5"
        opacity="0.7"
      />
      {/* Glow */}
      <motion.circle
        cx="32"
        cy="18"
        r="16"
        fill="url(#glowGrad)"
        animate={{ r: [16, 20, 16], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <defs>
        <radialGradient id="flameGrad" cx="50%" cy="70%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </radialGradient>
        <linearGradient id="diyaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Rangoli Corner ── */
function RangoliCorner({ position }) {
  const posClass = {
    tl: "top-0 left-0",
    tr: "top-0 right-0 scale-x-[-1]",
    bl: "bottom-0 left-0 scale-y-[-1]",
    br: "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <svg
      className={`absolute ${posClass} w-20 h-20 opacity-30 pointer-events-none`}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 0 Q40 10 40 40 Q10 40 0 0Z"
        fill="url(#rangoliGrad)"
        opacity="0.5"
      />
      <circle cx="15" cy="15" r="3" fill="#FBBF24" opacity="0.6" />
      <circle cx="25" cy="25" r="2" fill="#F59E0B" opacity="0.5" />
      <circle cx="10" cy="28" r="1.5" fill="#FDE68A" opacity="0.4" />
      <defs>
        <linearGradient id="rangoliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function DiwaliGreetingPopup() {
  const { openLeadModal } = useLeadModal();
  const [show, setShow] = useState(false);
  const isActive = useMemo(() => Date.now() < CAMPAIGN_END, []);

  useEffect(() => {
    if (!isActive) return;

    // Check if already shown in this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") return;
    } catch {}

    const timer = setTimeout(() => {
      setShow(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, [isActive]);

  const handleCTA = () => {
    setShow(false);
    openLeadModal({
      title: "🪔 Diwali Special Consultation — Limited Slots",
      subtitle:
        "Start your new project on an auspicious note! Get 15% off + 3 months free maintenance on all projects launched this festive season.",
      source: "Diwali 2026 — Greeting Popup",
      projectType: "",
      defaultMessage:
        "Hi! I saw the Diwali offer and I'm interested. Please share project details and timeline.",
    });
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShow(false)}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm"
          />

          {/* Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[71] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background:
                  "linear-gradient(145deg, #FFFBEB 0%, #FEF3C7 30%, #ffffff 60%, #faf5ff 100%)",
                border: "1px solid rgba(251, 191, 36, 0.3)",
              }}
            >
              {/* Rangoli corners */}
              <RangoliCorner position="tl" />
              <RangoliCorner position="tr" />
              <RangoliCorner position="bl" />
              <RangoliCorner position="br" />

              {/* Warm glow at top */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(251,191,36,0.25) 0%, transparent 70%)",
                }}
              />

              {/* Close button */}
              <button
                onClick={() => setShow(false)}
                className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/70 hover:bg-white transition-colors text-amber-800/60 hover:text-amber-900 cursor-pointer"
                aria-label="Close Diwali greeting"
              >
                <X size={18} />
              </button>

              <div className="relative px-8 pt-8 pb-6 text-center">
                {/* Diyas row */}
                <div className="flex justify-center gap-4 mb-4">
                  <DiyaSVG size={44} />
                  <DiyaSVG size={56} />
                  <DiyaSVG size={44} />
                </div>

                {/* Greeting */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-3xl font-extrabold mb-1"
                  style={{
                    background:
                      "linear-gradient(135deg, #B45309 0%, #D97706 40%, #F59E0B 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  शुभ दीपावली! 🪔
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-semibold text-amber-800 mb-1"
                >
                  Happy Diwali 2026
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-xs text-amber-700/70 mb-5"
                >
                  from Prajyot Infotech Family
                </motion.p>

                {/* Divider */}
                <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-5" />

                {/* Offer card */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 mb-5 border border-amber-200/50 shadow-sm"
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Gift size={18} className="text-brand-600" />
                    <span className="text-sm font-bold text-brand-700 uppercase tracking-wider">
                      Diwali Special Offer
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-navy-800">
                      <Star size={14} className="text-amber-500 shrink-0" fill="#F59E0B" />
                      <span>
                        <strong>15% Off</strong> on all new projects
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-navy-800">
                      <Star size={14} className="text-amber-500 shrink-0" fill="#F59E0B" />
                      <span>
                        <strong>3 Months Free</strong> maintenance & support
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-navy-800">
                      <Star size={14} className="text-amber-500 shrink-0" fill="#F59E0B" />
                      <span>
                        <strong>Priority delivery</strong> for festive-season launches
                      </span>
                    </div>
                    <div className="mt-1 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                      <span className="text-amber-900 font-semibold">Festive Coupon:</span>
                      <span className="font-mono font-extrabold text-amber-800 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-md tracking-wider">DIWALI2026</span>
                    </div>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCTA}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-white text-sm transition-all duration-300 shadow-lg cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)",
                    boxShadow:
                      "0 8px 30px -8px rgba(124,58,237,0.4), 0 0 0 1px rgba(124,58,237,0.1)",
                  }}
                >
                  <Sparkles size={16} />
                  Get Your Diwali Quote
                  <ArrowRight size={16} />
                </motion.button>

                <p className="text-[11px] text-amber-700/50 mt-3">
                  Offer valid till November 30, 2026
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
