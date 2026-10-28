// src/components/DiwaliLightDiyaWidget.jsx
// Interactive "Light a Diya" floating celebration widget for visitors
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Flame, X, ArrowRight, Heart, Gift } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const CAMPAIGN_END = new Date("2026-11-30T23:59:59+05:30").getTime();
const DIYA_STORAGE_KEY = "diwali26:diyas_lit_count";

export default function DiwaliLightDiyaWidget() {
  const { openLeadModal } = useLeadModal();
  const [lit, setLit] = useState(false);
  const [count, setCount] = useState(1482);
  const [modalOpen, setModalOpen] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(DIYA_STORAGE_KEY);
      if (stored) {
        setCount(parseInt(stored, 10));
      }
      const userLit = localStorage.getItem("diwali26:user_lit");
      if (userLit === "true") {
        setLit(true);
      }
    } catch {}
  }, []);

  if (Date.now() > CAMPAIGN_END) return null;

  const handleLightDiya = () => {
    const nextCount = count + 1;
    setCount(nextCount);
    setLit(true);
    setModalOpen(true);

    try {
      localStorage.setItem(DIYA_STORAGE_KEY, nextCount.toString());
      localStorage.setItem("diwali26:user_lit", "true");
    } catch {}

    // Generate burst particles
    const newParticles = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 260,
      y: (Math.random() - 0.5) * 260 - 50,
      size: Math.random() * 6 + 3,
      color: ["#FBBF24", "#F59E0B", "#EF4444", "#7C3AED", "#10B981"][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 2500);
  };

  const handleClaim = () => {
    setModalOpen(false);
    openLeadModal({
      title: "🪔 Shubh Deepavali Celebration Offer",
      subtitle:
        "Thank you for lighting a diya with us! You unlocked 15% OFF + 3 Months Free AMC on all web & software projects.",
      source: "Diwali 2026 — Light a Diya Widget",
      projectType: "Diwali Special Package",
      defaultMessage:
        "Hi! I lit a diya on your website and would like to claim the 15% Diwali discount (Code: DIWALI2026).",
    });
  };

  return (
    <>
      {/* Floating Widget at bottom left */}
      <div className="fixed bottom-5 left-5 z-[45] pointer-events-auto">
        <motion.button
          type="button"
          onClick={handleLightDiya}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-xs shadow-xl shadow-amber-500/25 border border-amber-300 diwali-badge-glow cursor-pointer"
          title="Click to Light a Diya for Diwali!"
        >
          {/* Animated Diya icon */}
          <span className="text-xl sm:text-2xl transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]">
            🪔
          </span>

          <div className="flex flex-col text-left">
            <span className="leading-tight text-[11px] sm:text-xs">
              {lit ? "Diya Lighted! ✨" : "Light a Diya 🪔"}
            </span>
            <span className="text-[9px] text-amber-100 font-mono font-normal">
              {count.toLocaleString()} lit by visitors
            </span>
          </div>

          <Sparkles size={13} className="text-amber-200 animate-spin" style={{ animationDuration: "6s" }} />
        </motion.button>
      </div>

      {/* Burst Particles Animation */}
      {particles.length > 0 && (
        <div className="fixed bottom-12 left-16 z-[75] pointer-events-none">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: 1.5, x: p.x, y: p.y }}
              transition={{ duration: 1.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                backgroundColor: p.color,
                boxShadow: `0 0 10px ${p.color}`,
              }}
            />
          ))}
        </div>
      )}

      {/* Greeting Modal when Diya is lit */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-sm rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E6] to-white border border-amber-300 shadow-2xl text-center z-10 diwali-glow-card"
            >
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Lit Diya Icon */}
              <div className="text-5xl mb-3 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-pulse">
                🪔
              </div>

              <h3 className="text-2xl font-black text-amber-950 mb-1">
                शुभ दीपावली!
              </h3>
              <p className="text-xs text-amber-800 font-bold uppercase tracking-wider mb-3">
                May Light & Prosperity Fill Your Venture
              </p>

              <p className="text-xs text-slate-600 leading-relaxed mb-5">
                Thank you for lighting a diya with the Prajyot Infotech community! You are the{" "}
                <strong className="text-amber-900 font-bold">#{count}th</strong> person to light a flame of digital innovation today.
              </p>

              {/* Coupon Unlocked Box */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white mb-5 shadow-md">
                <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-100 mb-1">
                  <Gift size={13} />
                  <span>Diwali Gift Unlocked!</span>
                </div>
                <div className="text-sm sm:text-base font-black">
                  15% OFF + 3 Months Free AMC
                </div>
                <div className="mt-1 text-[11px] font-mono text-amber-100">
                  Use Promo Code: <strong className="text-white tracking-wider">DIWALI2026</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleClaim}
                  className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  <span>Claim Your Diwali Offer</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

