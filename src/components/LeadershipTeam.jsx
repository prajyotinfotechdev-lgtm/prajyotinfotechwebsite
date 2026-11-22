import React, { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/**
 * Official Leadership Team of Prajyot Infotech
 * - Prajyot Kankal — Founder
 * - Sanket Kshirsagar — Co-Founder
 * - Sneha Kalekar — Head of Marketing & Operations
 */
const LEADERSHIP_MEMBERS = [
  {
    id: "prajyot-kankal",
    name: "Prajyot Kankal",
    role: "Founder",
    initials: "PK",
    image: null, // Ready for profile photograph path when available
    accentColor: "#7c3aed",
    badgeGradient: "from-brand-600 via-violet-600 to-indigo-600",
    badgeBg: "bg-brand-50 text-brand-700 border-brand-200/80",
    cardGlow: "rgba(124, 58, 237, 0.18)",
    portraitBg: "from-[#0d0926] via-[#1a134a] to-[#3b0764]",
  },
  {
    id: "sanket-kshirsagar",
    name: "Sanket Kshirsagar",
    role: "Co-Founder",
    initials: "SK",
    image: null, // Ready for profile photograph path when available
    accentColor: "#4f46e5",
    badgeGradient: "from-indigo-600 via-blue-600 to-brand-600",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    cardGlow: "rgba(79, 70, 229, 0.18)",
    portraitBg: "from-[#080e29] via-[#151f54] to-[#2e1065]",
  },
  {
    id: "sneha-kalekar",
    name: "Sneha Kalekar",
    role: "Head of Marketing & Operations",
    initials: "SK",
    image: null, // Ready for profile photograph path when available
    accentColor: "#9333ea",
    badgeGradient: "from-purple-600 via-fuchsia-600 to-pink-600",
    badgeBg: "bg-purple-50 text-purple-700 border-purple-200/80",
    cardGlow: "rgba(168, 85, 247, 0.18)",
    portraitBg: "from-[#17062e] via-[#2d0e52] to-[#4a044e]",
  },
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LeadershipCard({ member }) {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const hasValidImage = Boolean(member.image) && !imageError;

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm hover:shadow-2xl hover:border-brand-500/30 transition-all duration-300"
      style={{
        boxShadow: "0 10px 30px -10px rgba(15, 23, 42, 0.06)",
      }}
    >
      {/* Dynamic ambient hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, ${member.cardGlow}, transparent 70%)`,
        }}
      />

      {/* ─── Profile Media / Placeholder Container ─── */}
      <div
        className={`relative aspect-[4/3.8] sm:aspect-[4/3.6] lg:aspect-[4/3.8] w-full overflow-hidden rounded-2xl bg-gradient-to-br ${member.portraitBg} flex flex-col items-center justify-center shadow-inner`}
      >
        {/* Geometric ambient pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 48px 48px",
          }}
        />

        {/* Ambient radial lighting orb */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute size-44 rounded-full blur-2xl opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-500"
          style={{ background: member.accentColor }}
        />

        {hasValidImage ? (
          <img
            src={member.image}
            alt={`${member.name} - ${member.role} at Prajyot Infotech`}
            onError={() => setImageError(true)}
            loading="lazy"
            decoding="async"
            className="relative z-10 size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Executive Monogram Avatar Placeholder */
          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            {/* Medallion with luminous rings */}
            <div className="relative mb-3 flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute size-24 sm:size-28 rounded-3xl opacity-30 blur-md group-hover:opacity-60 transition-opacity duration-300"
                style={{ background: member.accentColor }}
              />
              <div className="relative size-20 sm:size-22 rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md shadow-2xl flex items-center justify-center group-hover:border-white/40 transition-colors">
                <span className="font-display text-2xl sm:text-3xl font-black text-white tracking-wider">
                  {member.initials}
                </span>
              </div>
            </div>

            {/* Executive status indicator */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Prajyot Infotech
            </span>
          </div>
        )}

        {/* Top pill badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white tracking-wide shadow-sm">
            <svg
              className="size-3 text-brand-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Leadership
          </span>
        </div>

        {/* Bottom soft vignette gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"
        />
      </div>

      {/* ─── Card Information Content ─── */}
      <div className="relative z-10 mt-5 flex flex-1 flex-col justify-between">
        <div>
          {/* Designation Badge */}
          <div className="mb-2.5">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${member.badgeBg}`}
            >
              {member.role}
            </span>
          </div>

          {/* Full Name */}
          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-navy-900 tracking-tight group-hover:text-brand-700 transition-colors duration-200">
            {member.name}
          </h3>

          {/* Company / Position Anchor */}
          <p className="mt-1 text-sm font-semibold text-brand-600">
            {member.role} &bull;{" "}
            <span className="text-slate-500 font-normal">Prajyot Infotech</span>
          </p>
        </div>

        {/* Subtle decorative bottom accent underline */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 group-hover:text-brand-600 transition-colors">
            Official Leadership
          </span>
          <div
            className="h-1 w-8 rounded-full bg-slate-200 group-hover:w-16 group-hover:bg-gradient-to-r group-hover:from-brand-500 group-hover:to-indigo-500 transition-all duration-300"
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function LeadershipTeam() {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative py-24 sm:py-28 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 border-y border-slate-200/60 overflow-hidden"
    >
      {/* Background ambient decorative shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-brand-500/10 via-violet-500/5 to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 right-10 w-[500px] h-[300px] bg-gradient-to-t from-indigo-500/10 via-brand-500/5 to-transparent blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200/80 bg-brand-50/90 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-brand-700 shadow-xs mb-4">
              <span className="size-1.5 rounded-full bg-brand-600 animate-pulse" />
              Executive Leadership
            </span>

            <h2
              id="leadership-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-900 tracking-tight leading-tight"
            >
              Meet Our{" "}
              <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Leadership Team
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              The executive leadership guiding Prajyot Infotech's engineering craft,
              technology standards, and client partnerships.
            </p>
          </div>
        </Reveal>

        {/* 3-Column Leadership Grid */}
        <div
          role="list"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 items-stretch"
        >
          {LEADERSHIP_MEMBERS.map((member, index) => (
            <div
              key={member.id}
              role="listitem"
              className={`h-full ${
                index === 2
                  ? "md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-1 lg:max-w-none lg:mx-0"
                  : ""
              }`}
            >
              <Reveal delay={index * 0.12}>
                <LeadershipCard member={member} />
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
