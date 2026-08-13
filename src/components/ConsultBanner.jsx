// src/components/ConsultBanner.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * ConsultBanner
 * - Shows a free 15-min consultation banner (top on desktop, bottom on mobile)
 * - Dismiss persists for N days (default 7)
 * - URL override: ?forceBanner=1 forces it to show
 * - Sets CSS var --consult-banner-b on <html> with the banner height on mobile,
 *   so floating UI (e.g., FABs, chat launchers) can offset with:
 *     bottom: calc(1rem + var(--consult-banner-b, 0px));
 */

const DEFAULT_WA_NUMBER = "917020708747";
const DEFAULT_WA_TEXT =
  "Hi Prajyot Infotech, I want to book my free 15-min consultation for my website/app.";
const STORAGE_KEY = "consultBannerDismissedAt";
const BRAND = "Prajyot Infotech";

export default function ConsultBanner({
  /** Phone number without '+' */
  waNumber = DEFAULT_WA_NUMBER,
  waText = DEFAULT_WA_TEXT,
  calendlyLink = "", // e.g. "https://calendly.com/yourname/15min"
  emailTo = "prajyot.infotech@gmail.com",
  cooldownDays = 7, // days to keep it dismissed
  zIndex = 200, // keep above headers/FABs
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const mobileRef = useRef(null);

  const DISMISS_MS = cooldownDays * 24 * 60 * 60 * 1000;

  const isDev = useMemo(() => {
    try {
      return typeof process !== "undefined"
        ? process.env.NODE_ENV !== "production"
        : false;
    } catch {
      return false;
    }
  }, []);

  const force = useMemo(() => {
    try {
      return new URLSearchParams(window.location.search).get("forceBanner") === "1";
    } catch {
      return false;
    }
  }, []);

  const getDismissedAt = () => {
    try {
      const store = isDev ? sessionStorage : localStorage;
      const v = store.getItem(STORAGE_KEY);
      return v ? Number(v) : null;
    } catch {
      return null;
    }
  };

  const setDismissedNow = () => {
    try {
      const store = isDev ? sessionStorage : localStorage;
      store.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
  };

  // Decide to open
  useEffect(() => {
    if (force) {
      const t = setTimeout(() => setOpen(true), 250);
      return () => clearTimeout(t);
    }
    const dismissedAt = getDismissedAt();
    const recentlyDismissed = dismissedAt && Date.now() - dismissedAt < DISMISS_MS;
    if (!recentlyDismissed) {
      const t = setTimeout(() => setOpen(true), 250);
      return () => clearTimeout(t);
    }
  }, [force, DISMISS_MS]);

  // Expose banner height on mobile as CSS var for FAB/HelpBot offsets
  useEffect(() => {
    const root = document.documentElement;
    const setVar = () => {
      const el = mobileRef.current;
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      if (!el || w >= 640 /* sm */ || !open) {
        root.style.removeProperty("--consult-banner-b");
        return;
      }
      const h = el.offsetHeight || 0;
      root.style.setProperty("--consult-banner-b", `${h + 8}px`); // include a tiny gap
    };

    setVar();
    window.addEventListener("resize", setVar);
    return () => {
      window.removeEventListener("resize", setVar);
      document.documentElement.style.removeProperty("--consult-banner-b");
    };
  }, [open]);

  const dismiss = () => {
    setDismissedNow();
    setOpen(false);
  };

  // Motion variants
  const desktopVariants = reduceMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    }
    : {
      initial: { y: -80, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 32 } },
      exit: { y: -80, opacity: 0, transition: { duration: 0.2 } },
    };

  const mobileVariants = reduceMotion
    ? {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.2 } },
      exit: { opacity: 0, transition: { duration: 0.15 } },
    }
    : {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 380, damping: 32 } },
      exit: { y: 100, opacity: 0, transition: { duration: 0.2 } },
    };

  // Spacer anim to avoid jump on desktop when the bar appears
  const spacerVariants = {
    initial: { height: 0 },
    animate: { height: 52, transition: { duration: 0.25 } },
    exit: { height: 0, transition: { duration: 0.2 } },
  };

  const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
  const mailto = `mailto:${emailTo}?subject=${encodeURIComponent(
    `Free 15-min Consultation — ${BRAND}`
  )}&body=${encodeURIComponent(waText)}`;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Desktop / Tablet: animated FIXED top bar */}
          <motion.div
            className="hidden sm:block fixed top-0 inset-x-0"
            style={{ zIndex }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={desktopVariants}
            aria-live="polite"
            role="region"
            aria-label="Free consultation banner"
          >
            <div className="mx-auto max-w-7xl px-4 pt-[env(safe-area-inset-top)]">
              <div className="mt-0 rounded-b-xl bg-gradient-to-r from-brand-600 via-brand-700 to-navy-800 text-white shadow-lg shadow-brand-500/20">
                <div className="flex items-center gap-3 px-5 py-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-sm">📅</span>
                  <p className="text-sm md:text-[15px]">
                    <strong className="font-semibold">Free 15-minute consultation.</strong>{" "}
                    Plan your website/app with {BRAND} experts—no pressure, just clarity.
                  </p>
                  <div className="ml-auto flex items-center gap-2">
                    <a
                      href={waURL}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow hover:bg-white/90 transition-all hover:shadow-md"
                    >
                      WhatsApp Now
                    </a>
                    {calendlyLink ? (
                      <a
                        href={calendlyLink}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg border border-white/50 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
                      >
                        Pick a Slot
                      </a>
                    ) : (
                      <a
                        href={mailto}
                        className="rounded-lg border border-white/50 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
                      >
                        Email Us
                      </a>
                    )}
                    <button
                      onClick={dismiss}
                      aria-label="Dismiss consultation banner"
                      className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile: animated FIXED bottom bar */}
          <motion.div
            ref={mobileRef}
            className="sm:hidden fixed inset-x-0 bottom-0"
            style={{ zIndex }}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={mobileVariants}
            aria-live="polite"
            role="region"
            aria-label="Free consultation banner"
          >
            <div className="mx-auto max-w-7xl px-3 pb-[env(safe-area-inset-bottom)]">
              <div className="mb-3 rounded-xl bg-gradient-to-r from-brand-600 via-brand-700 to-navy-800 px-4 py-3 text-white shadow-lg shadow-brand-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <p className="text-sm">
                    <strong className="font-semibold">Free 15-min call</strong> — plan your project.
                  </p>
                  <button
                    onClick={dismiss}
                    aria-label="Dismiss consultation banner"
                    className="ml-auto -mr-1 inline-flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={waURL}
                    className="rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-brand-700 shadow hover:bg-white/90 transition"
                  >
                    WhatsApp
                  </a>
                  {calendlyLink ? (
                    <a
                      href={calendlyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/50 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      Pick a Slot
                    </a>
                  ) : (
                    <a
                      href={mailto}
                      className="rounded-lg border border-white/50 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-white/10 transition"
                    >
                      Email Us
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desktop spacer to avoid layout jump if you have a fixed navbar too */}
          <motion.div
            className="hidden sm:block"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={spacerVariants}
            aria-hidden="true"
          />
        </>
      )}
    </AnimatePresence>
  );
}
