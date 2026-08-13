// src/components/Marquee.jsx
import React from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Seamless, accessible marquee with:
 * - reduced-motion fallback (static row)
 * - pause on hover/focus
 * - gradient edge mask
 * - controllable speed & direction
 */
export default function Marquee({
  items = ["E-commerce", "Portfolio", "SaaS", "Mobile Apps", "Hospitality", "Landing Pages"],
  speed = 20,                 // seconds per full loop (min 6s)
  direction = "left",         // "left" | "right"
  pauseOnHover = true,
  className = "",
  dotClassName = "size-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700 inline-block shadow-sm",
  textClassName = "text-navy-800 font-medium",
}) {
  const prefersReducedMotion = useReducedMotion();
  const duration = Math.max(6, Number(speed) || 20);
  const dirClass =
    direction === "right" ? "animate-marquee-right" : "animate-marquee-left";
  const pauseClass = pauseOnHover ? "group-hover:paused focus-within:paused" : "";

  // Screen reader-only summary (avoid announcing moving text twice)
  const srSummary = `Services: ${items.join(", ")}.`;

  return (
    <section
      className={`relative border-y border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-brand-50/30 py-7 ${className}`}
      aria-label="Services marquee"
    >
      {/* Visible only to assistive tech */}
      <p className="sr-only">{srSummary}</p>

      {/* Masked scroll container */}
      <div
        className="group overflow-hidden"
        aria-hidden="true"
        // gradient fade at edges (webkit + standard)
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Animated track (duplicated for seamless loop) */}
        <div
          className={[
            "flex w-max whitespace-nowrap gap-14 px-2",
            textClassName,
            !prefersReducedMotion ? dirClass : "",
            !prefersReducedMotion ? pauseClass : "",
          ].join(" ")}
          style={{
            animationDuration: `${duration}s`,
          }}
        >
          <Row items={items} dotClassName={dotClassName} />
          <Row items={items} dotClassName={dotClassName} />
        </div>
      </div>

      {/* Motion styles (only when motion is allowed) */}
      {!prefersReducedMotion && (
        <style>{`
          @keyframes marquee-left {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            from { transform: translateX(-50%); }
            to   { transform: translateX(0); }
          }
          .animate-marquee-left {
            animation: marquee-left var(--marquee-duration, 20s) linear infinite;
            animation-duration: inherit; /* use inline duration */
          }
          .animate-marquee-right {
            animation: marquee-right var(--marquee-duration, 20s) linear infinite;
            animation-duration: inherit;
          }
          .paused { animation-play-state: paused; }
        `}</style>
      )}
    </section>
  );
}

function Row({ items, dotClassName }) {
  return (
    <div className="flex">
      {items.map((label, i) => (
        <span key={i} className="mx-8 inline-flex items-center gap-3 text-sm md:text-base">
          <span className={dotClassName} />
          {label}
        </span>
      ))}
    </div>
  );
}
