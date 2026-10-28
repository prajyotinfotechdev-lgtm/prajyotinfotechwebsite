// src/components/DiwaliQuickLeadBar.jsx
// High-converting sticky festive quick lead capture bar (Desktop & Mobile)
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, X, PhoneCall, Tag } from "lucide-react";
import { createLead } from "../utils/leadStorage.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const CAMPAIGN_END = new Date("2026-11-30T23:59:59+05:30").getTime();
const WHATSAPP_NUMBER = "917020708747";

export default function DiwaliQuickLeadBar() {
  const { openLeadModal } = useLeadModal();
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Show bar after user scrolls down 300px
  useEffect(() => {
    if (Date.now() > CAMPAIGN_END) return;

    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (Date.now() > CAMPAIGN_END || !visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clean = contact.trim();
    if (clean.length < 8 || submitting) return;

    setSubmitting(true);

    try {
      await createLead({
        name: "Festive Quick Lead",
        contact: clean,
        projectType: "🪔 Diwali Special (15% OFF + Free AMC)",
        budget: "Festive Offer DIWALI2026",
        message: `Quick Lead from Sticky Diwali Bar. Contact: ${clean}. Promo Code: DIWALI2026.`,
        source: "Diwali Sticky Quick Lead Bar",
      });

      setSuccess(true);

      // Open WhatsApp directly for fast instant conversion
      setTimeout(() => {
        const text = encodeURIComponent(
          `Hi Prajyot Infotech, I want to claim the Diwali 15% OFF offer (Code: DIWALI2026) for my project. My contact number is ${clean}.`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
      }, 700);
    } catch (err) {
      console.error("Lead submission error:", err);
      // Fallback: open lead modal
      openLeadModal({
        title: "🪔 Diwali 15% OFF Consultation",
        subtitle: "Lock in your festive discount + 3 months free AMC.",
        source: "Diwali Quick Lead Fallback",
        projectType: "Diwali Special Package",
        defaultMessage: `Hi, please contact me at ${clean} regarding the Diwali offer.`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {!minimized ? (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          aria-label="Diwali Special Offer"
          className="fixed bottom-0 inset-x-0 z-[40] bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white shadow-[0_-8px_30px_rgba(217,119,6,0.3)] border-t border-amber-300/40 px-2.5 sm:px-4 py-2 sm:py-3 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1.5 sm:gap-4">
            {/* Offer details & urgency tag */}
            <div className="flex items-center gap-2 sm:gap-3 text-center md:text-left w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-3xl select-none" aria-hidden>
                  🪔
                </span>
                <div className="text-left">
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                    <span className="text-[11px] sm:text-sm font-black text-amber-100">
                      Diwali Dhamaka:
                    </span>
                    <span className="text-[11px] sm:text-sm font-extrabold text-white">
                      15% OFF + Free AMC
                    </span>
                    <span className="hidden sm:inline-flex items-center gap-1 bg-black/25 text-[10px] font-mono px-1.5 py-0.5 rounded text-amber-200">
                      <Tag size={10} /> DIWALI2026
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-amber-200/90 font-medium">
                    ⚡ <strong className="text-white">Only 5 slots left</strong> for festive launch delivery
                  </div>
                </div>
              </div>

              {/* Close/minimize button visible on mobile header */}
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="md:hidden p-1 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close offer bar"
                title="Minimize"
              >
                <X size={16} />
              </button>
            </div>

            {/* Quick lead capture input */}
            <div className="w-full md:w-auto flex items-center gap-1.5 sm:gap-2 justify-center">
              {success ? (
                <div className="flex items-center gap-1.5 text-xs font-bold bg-white text-emerald-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-md animate-pulse">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>Offer Claimed! Connecting on WhatsApp…</span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-1.5 w-full md:w-auto max-w-md"
                >
                  <div className="relative flex-1 md:w-64">
                    <input
                      type="text"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="Enter WhatsApp / Phone"
                      aria-label="Enter WhatsApp or Phone Number to claim Diwali discount"
                      className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-inner"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || contact.trim().length < 8}
                    className="shrink-0 inline-flex items-center gap-1 bg-slate-950 hover:bg-black text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {submitting ? (
                      <span>Sending…</span>
                    ) : (
                      <>
                        <span>Get Quote</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Close/minimize button on desktop */}
              <button
                type="button"
                onClick={() => setMinimized(true)}
                className="hidden md:block p-1.5 rounded-full hover:bg-black/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close offer bar"
                title="Minimize"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.aside>
      ) : (
        <div className="fixed bottom-3 right-16 sm:right-20 z-[40]">
          <button
            type="button"
            onClick={() => setMinimized(false)}
            className="diwali-badge-glow flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-1.5 rounded-full shadow-lg border border-amber-300 cursor-pointer"
            title="Expand Diwali Offer Bar"
          >
            <span>🪔</span>
            <span>15% OFF Bar</span>
          </button>
        </div>
      )}
    </AnimatePresence>
  );
}

