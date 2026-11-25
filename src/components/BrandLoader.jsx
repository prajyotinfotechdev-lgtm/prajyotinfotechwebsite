// src/components/BrandLoader.jsx
import React from "react";

/**
 * Geometric Prajyot Infotech "P" emblem matching SingleLogo.png
 * Upper violet curved blade + lower deep-navy structural triangle
 */
export function BrandEmblemSvg({ size = 54, animated = true, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="piWingTopGrad" x1="10" y1="8" x2="92" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="65%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="piWingBottomGrad" x1="12" y1="50" x2="56" y2="94" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3730a3" />
          <stop offset="100%" stopColor="#1e2756" />
        </linearGradient>
      </defs>

      {/* Top violet curved wing */}
      <path
        d="M11 10H70C84.5 10 94 20.2 94 33C94 45.8 84.5 55.5 70 55.5H54.5L11 10Z"
        fill="url(#piWingTopGrad)"
        className={animated ? "pi-wing-top" : ""}
      />

      {/* Bottom deep-navy precision blade */}
      <path
        d="M10 51.5H50.5C53.2 51.5 54.5 52.8 54.5 55.5V93.5L10 51.5Z"
        fill="url(#piWingBottomGrad)"
        className={animated ? "pi-wing-bottom" : ""}
      />
    </svg>
  );
}

/**
 * Prajyot Infotech Signature Brand Loader
 * Lightweight GPU-only animations, matches light Aurora aesthetic & zero print leaks.
 */
export default function BrandLoader({
  variant = "route",
  label = "Preparing workspace...",
  showTopBar = true,
}) {
  if (variant === "compact") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/90 border border-brand-200/70 shadow-sm backdrop-blur-md"
      >
        <div className="relative flex items-center justify-center w-7 h-7">
          <span className="absolute inset-0 rounded-full border-2 border-brand-200 border-t-brand-600 pi-ring-spin" />
          <BrandEmblemSvg size={16} animated={false} />
        </div>
        <span className="text-xs font-semibold tracking-wide text-navy-800">{label}</span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="relative min-h-[72vh] w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden select-none print:hidden"
    >
      {/* Top Linear/Vercel-style hairline loading bar */}
      {showTopBar && (
        <div className="pi-top-progress fixed top-0 left-0 right-0 h-[3px] z-[120] bg-brand-100/60 overflow-hidden pointer-events-none">
          <div className="pi-top-progress-bar h-full w-1/2 rounded-full" />
        </div>
      )}

      {/* Subtle ambient glow matching AuroraHero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.16) 0%, rgba(30,39,86,0.08) 52%, rgba(248,250,252,0) 75%)",
        }}
      />

      {/* Precision Brand Lockup Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        {/* Dual Orbital Emblem Stage */}
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 mb-6">
          {/* Outer precision gradient orbit */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full pi-ring-spin"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(124, 58, 237, 0.14)"
              strokeWidth="1.5"
            />
            <path
              d="M50 4 A46 46 0 0 1 94 36"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner counter-rotating subtle navy arc */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] pi-ring-reverse"
            aria-hidden="true"
          >
            <path
              d="M50 94 A44 44 0 0 1 10 66"
              fill="none"
              stroke="#1e2756"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />
          </svg>

          {/* Frosted glass disc + Animated Prajyot P Emblem */}
          <div className="relative flex items-center justify-center w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-2xl bg-white/95 shadow-brand border border-slate-200/80 backdrop-blur-md">
            <BrandEmblemSvg size={38} animated={true} />
          </div>
        </div>

        {/* Brand Wordmark */}
        <div className="font-display font-extrabold text-xl sm:text-2xl tracking-tight leading-none">
          <span className="text-brand-700">Prajyot</span>
          <span className="text-navy-800"> Infotech</span>
        </div>

        {/* Contextual Engineering Status */}
        <p className="mt-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {label}
        </p>

        {/* Sleek Indeterminate Progress Track */}
        <div className="mt-5 w-44 sm:w-52 h-1 rounded-full bg-slate-200/80 overflow-hidden p-[1px]">
          <div className="pi-bar-sweep h-full w-1/2 rounded-full" />
        </div>
      </div>

      <span className="sr-only">Loading Prajyot Infotech content</span>
    </div>
  );
}
