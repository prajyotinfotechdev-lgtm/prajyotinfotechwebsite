// src/components/DiwaliDiyas.jsx
// Ambient floating diya/sparkle animations — CSS-only, performance-friendly
import React, { useMemo } from "react";

const CAMPAIGN_END = new Date("2026-11-30T23:59:59+05:30").getTime();

/* ── Individual floating diya ── */
function FloatingDiya({ style, size = 20, delay = 0, duration = 12, side = "left" }) {
  const startX = side === "left" ? -10 : 110;
  const midX = side === "left" ? 5 : 95;

  return (
    <div
      className="fixed pointer-events-none z-[5]"
      style={{
        ...style,
        animation: `diyaFloat${side === "left" ? "L" : "R"} ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        {/* Glow */}
        <circle cx="16" cy="8" r="8" fill="url(#diyaGlow)" opacity="0.5" />
        {/* Flame */}
        <ellipse cx="16" cy="8" rx="3" ry="5" fill="url(#diyaFlame)">
          <animate
            attributeName="ry"
            values="5;6;4.5;5.5;5"
            dur="1.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="rx"
            values="3;2.5;3.5;2.8;3"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
        {/* Flame inner */}
        <ellipse cx="16" cy="9" rx="1.5" ry="2.5" fill="#FEF3C7" opacity="0.9">
          <animate
            attributeName="ry"
            values="2.5;3;2;2.8;2.5"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </ellipse>
        {/* Wick */}
        <rect x="15.5" y="12" width="1" height="2" rx="0.5" fill="#92400E" />
        {/* Diya body */}
        <path
          d="M10 16 Q12 14 16 14 Q20 14 22 16 L23 20 Q23 23 16 23 Q9 23 9 20 Z"
          fill="url(#diyaBody)"
        />
        <defs>
          <radialGradient id="diyaGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="diyaFlame" cx="50%" cy="70%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
          <linearGradient id="diyaBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ── Golden sparkle particle ── */
function Sparkle({ style, size = 4, delay = 0, duration = 6 }) {
  return (
    <div
      className="fixed pointer-events-none z-[5]"
      style={{
        ...style,
        animation: `sparkleFloat ${duration}s ease-in-out ${delay}s infinite`,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "radial-gradient(circle, #FDE68A 0%, #F59E0B 60%, transparent 100%)",
          boxShadow: "0 0 6px 2px rgba(251,191,36,0.3)",
          animation: `sparklePulse 2s ease-in-out ${delay * 0.5}s infinite`,
        }}
      />
    </div>
  );
}

export default function DiwaliDiyas() {
  const isActive = useMemo(() => Date.now() < CAMPAIGN_END, []);

  // Check for prefers-reduced-motion
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  if (!isActive || reduced) return null;

  return (
    <>
      {/* Left side diyas */}
      <FloatingDiya
        side="left"
        size={22}
        delay={0}
        duration={14}
        style={{ left: "2%", top: "20%" }}
      />
      <FloatingDiya
        side="left"
        size={18}
        delay={3}
        duration={16}
        style={{ left: "4%", top: "55%" }}
      />
      <FloatingDiya
        side="left"
        size={16}
        delay={6}
        duration={18}
        style={{ left: "1%", top: "80%" }}
      />

      {/* Right side diyas */}
      <FloatingDiya
        side="right"
        size={20}
        delay={2}
        duration={15}
        style={{ right: "2%", top: "30%" }}
      />
      <FloatingDiya
        side="right"
        size={18}
        delay={5}
        duration={17}
        style={{ right: "3%", top: "65%" }}
      />

      {/* Scattered sparkles */}
      <Sparkle size={3} delay={0} duration={8} style={{ left: "8%", top: "35%" }} />
      <Sparkle size={4} delay={2} duration={10} style={{ right: "6%", top: "25%" }} />
      <Sparkle size={3} delay={4} duration={7} style={{ left: "5%", top: "70%" }} />
      <Sparkle size={5} delay={1} duration={9} style={{ right: "8%", top: "50%" }} />
      <Sparkle size={3} delay={3} duration={11} style={{ left: "3%", top: "45%" }} />
      <Sparkle size={4} delay={5} duration={8} style={{ right: "4%", top: "75%" }} />
    </>
  );
}
