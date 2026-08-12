// src/components/Testimonials.jsx
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SHOW_NAMES = false;

const DATA = [
  { name: "Rahul S.", role: "Retail Founder", quote: "They shipped our MVP in 18 days with unexpected polish.", rating: 5 },
  { name: "Ananya K.", role: "Product Manager", quote: "Crisp communication, real timelines, stellar results.", rating: 5 },
  { name: "Devansh P.", role: "GTM Lead", quote: "Motion that helps conversion — not just pretty.", rating: 4.5 },
];

const initials = (name = "") =>
  name.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

const displayName = (name) => (SHOW_NAMES ? name : "Client");

function Stars({ value = 5, size = 14 }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const d = value - i;
    const fill = d >= 1 ? 1 : d >= 0.75 ? 0.85 : d >= 0.5 ? 0.5 : d >= 0.25 ? 0.25 : 0;
    return { i, fill };
  });
  return (
    <div className="inline-flex items-center gap-0.5 text-amber-500" aria-label={`Rated ${value} out of 5`}>
      {stars.map(s => (
        <svg key={s.i} viewBox="0 0 24 24" width={size} height={size} aria-hidden>
          <defs>
            <linearGradient id={`g-${s.i}-${value}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset={`${s.fill * 100}%`} stopColor="currentColor" />
              <stop offset={`${s.fill * 100}%`} stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.25l-7.19-.61L12 2 9.19 8.64 2 9.25l5.46 4.72L5.82 21 12 17.27z"
            fill={`url(#g-${s.i}-${value})`}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-amber-400"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  // JSON-LD
  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: DATA.map((q, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: SHOW_NAMES ? q.name : "Client" },
      reviewBody: q.quote,
      reviewRating: q.rating ? { "@type": "Rating", ratingValue: q.rating, bestRating: 5, worstRating: 1 } : undefined,
    })),
  }), []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: prefersReducedMotion ? {} : { staggerChildren: 0.08 } },
  };
  const card = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24" aria-labelledby="testimonialsTitle">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* soft ambient background inside the container */}
      <div className="relative rounded-3xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-lg shadow-brand-500/5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              "radial-gradient(80% 120% at 100% 0%, rgba(124,58,237,0.06), transparent 60%)",
            maskImage: "linear-gradient(#000, rgba(0,0,0,.7))",
          }}
        />

        <h2 id="testimonialsTitle" className="relative text-3xl md:text-4xl font-black tracking-tight text-navy-800">
          What clients say
        </h2>

        {/* Mobile: horizontal snap; Desktop: grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-10 grid gap-6 md:grid-cols-3 md:[&>*]:snap-none snap-x snap-mandatory overflow-x-auto md:overflow-visible no-scrollbar"
          role="list"
          aria-label="Client testimonials"
        >
          {DATA.map((q) => {
            const nameText = displayName(q.name);
            const avatarText = SHOW_NAMES ? initials(q.name) : "✓";
            return (
              <motion.figure
                key={q.name}
                variants={card}
                role="listitem"
                tabIndex={0}
                className="snap-center min-w-[86%] md:min-w-0 rounded-2xl bg-white p-6 ring-1 ring-slate-200/80 transition-all duration-300
                           hover:shadow-xl hover:shadow-brand-500/10 hover:ring-brand-200 hover:-translate-y-1
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={{
                  backgroundImage:
                    "radial-gradient(120% 140% at 100% 0%, rgba(124,58,237,0.04), transparent 55%)",
                }}
              >
                <div className="flex items-start gap-3">
                  {/* avatar chip — readable on white */}
                  <div className="size-11 shrink-0 rounded-xl grid place-items-center font-semibold bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 border border-brand-100">
                    {avatarText}
                  </div>
                  <svg viewBox="0 0 24 24" className="size-5 text-brand-600 mt-1" aria-hidden>
                    <path fill="currentColor" d="M7.17 6A5.17 5.17 0 0 0 2 11.17V20h8v-8H7.17V9A2 2 0 0 1 9.17 7H10V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V20h8v-8h-2.83V9A2 2 0 0 1 19.17 7H20V6h-2.83Z" />
                  </svg>
                </div>

                {typeof q.rating === "number" && <Stars value={q.rating} className="mt-3" />}

                <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700">
                  "{q.quote}"
                </blockquote>

                <figcaption className="mt-5 text-xs text-slate-600">
                  <span className="font-semibold text-navy-800">{nameText}</span>{" — "}{q.role}
                </figcaption>
              </motion.figure>
            );
          })}
        </motion.div>

        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      </div>
    </section>
  );
}
