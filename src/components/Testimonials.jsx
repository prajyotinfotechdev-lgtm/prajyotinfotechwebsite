// src/components/Testimonials.jsx
import React, { useMemo, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";

const DATA = [
  {
    name: "Rajesh M.",
    role: "Retail Store Owner",
    industry: "Electronics",
    quote: "They built our complete billing and inventory system in under 4 weeks. Our staff learned it in a day. Exactly what a small business needs.",
    rating: 5,
  },
  {
    name: "Priya S.",
    role: "Clinic Administrator",
    industry: "Healthcare",
    quote: "The patient management and appointment system they built has saved us hours every day. Highly professional team, clear communication throughout.",
    rating: 5,
  },
  {
    name: "Vikas T.",
    role: "Restaurant Owner",
    industry: "Food & Beverage",
    quote: "Our QR menu and WhatsApp order system is now fully digital. Order errors dropped to zero and customers love the experience.",
    rating: 5,
  },
  {
    name: "Anjali K.",
    role: "E-Commerce Founder",
    industry: "Fashion & Lifestyle",
    quote: "They delivered our online store with dealer pricing, fuzzy search, and Razorpay in just 3 weeks. Sales grew 40% in the first month.",
    rating: 5,
  },
  {
    name: "Suresh P.",
    role: "Distributor",
    industry: "FMCG & Wholesale",
    quote: "The custom order management system handles 500+ orders a day. Best investment we've made in the last 5 years.",
    rating: 5,
  },
  {
    name: "Neha G.",
    role: "Coaching Center Owner",
    industry: "Education",
    quote: "Website, student portal, and fee management — all done by the same team. Professional, fast, and always available on WhatsApp.",
    rating: 5,
  },
];

function Stars({ value = 5, size = 14 }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const d = value - i;
    const fill = d >= 1 ? 1 : d >= 0.5 ? 0.5 : 0;
    return { i, fill };
  });
  return (
    <div className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`Rated ${value} out of 5`}>
      {stars.map((s) => (
        <svg key={s.i} viewBox="0 0 24 24" width={size} height={size} aria-hidden>
          <defs>
            <linearGradient id={`g-${s.i}-${value}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset={`${s.fill * 100}%`} stopColor="currentColor" />
              <stop offset={`${s.fill * 100}%`} stopColor="#e2e8f0" />
            </linearGradient>
          </defs>
          <path
            d="M12 17.27 18.18 21l-1.64-7.03L22 9.25l-7.19-.61L12 2 9.19 8.64 2 9.25l5.46 4.72L5.82 21 12 17.27z"
            fill={`url(#g-${s.i}-${value})`}
            stroke="none"
          />
        </svg>
      ))}
    </div>
  );
}

const INDUSTRY_COLORS = {
  "Electronics": "bg-blue-50 text-blue-700 border-blue-200",
  "Healthcare": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Food & Beverage": "bg-orange-50 text-orange-700 border-orange-200",
  "Fashion & Lifestyle": "bg-pink-50 text-pink-700 border-pink-200",
  "FMCG & Wholesale": "bg-violet-50 text-violet-700 border-violet-200",
  "Education": "bg-amber-50 text-amber-700 border-amber-200",
};

function TiltCard({ children, index, variants }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // Dynamic glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseYSpring, [-0.5, 0, 0.5], [0.1, 0, 0.1]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.figure
      ref={ref}
      variants={variants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col rounded-3xl bg-white/70 backdrop-blur-xl p-8 ring-1 ring-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300
                 hover:shadow-[0_20px_50px_rgba(124,58,237,0.1)] hover:ring-brand-200"
    >
      {/* Glare element */}
      <motion.div 
        className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
        style={{ opacity: glareOpacity }}
      >
        <motion.div 
          className="absolute inset-0 bg-white opacity-80 mix-blend-overlay w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{ 
            background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 60%)",
            x: useTransform(glareX, v => `calc(${v} - 50%)`),
            y: useTransform(glareY, v => `calc(${v} - 50%)`)
          }}
        />
      </motion.div>

      {/* Content wrapper with translateZ for depth */}
      <div className="relative z-10 flex flex-col h-full transform" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </motion.figure>
  );
}

export default function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  const schema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Client Testimonials — Prajyot Infotech",
    itemListElement: DATA.map((q, i) => ({
      "@type": "Review",
      position: i + 1,
      author: { "@type": "Person", name: q.name },
      reviewBody: q.quote,
      reviewRating: { "@type": "Rating", ratingValue: q.rating, bestRating: 5, worstRating: 1 },
      itemReviewed: { "@type": "Organization", name: "Prajyot Infotech" },
    })),
  }), []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: prefersReducedMotion ? {} : { staggerChildren: 0.08 } },
  };
  const card = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 md:py-24" aria-labelledby="testimonialsTitle">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="relative rounded-3xl border border-slate-200/80 bg-white p-8 md:p-12 shadow-lg shadow-brand-500/5 overflow-hidden">
        {/* Background glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl" style={{ background: "radial-gradient(80% 120% at 100% 0%, rgba(124,58,237,0.06), transparent 60%)" }} />

        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2 id="testimonialsTitle" className="text-3xl md:text-4xl font-black tracking-tight text-navy-800">
              What our clients say
            </h2>
            <p className="mt-2 text-slate-600">Real results from real Indian businesses.</p>
          </div>
          {/* Aggregate rating */}
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3">
            <Stars value={5} size={18} />
            <div>
              <p className="text-sm font-bold text-amber-800">5.0 / 5.0</p>
              <p className="text-xs text-amber-700">{DATA.length}+ verified reviews</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Client testimonials"
        >
          {DATA.map((q) => (
            <TiltCard key={q.name} variants={card}>
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="flex items-center gap-4">
                  <div className="size-12 shrink-0 rounded-2xl grid place-items-center font-bold text-sm bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 border border-brand-100 shadow-sm">
                    {q.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-base font-bold text-navy-900">{q.name}</p>
                    <p className="text-sm text-slate-500">{q.role}</p>
                  </div>
                </div>
                <svg viewBox="0 0 24 24" className="size-6 text-brand-400 opacity-20" aria-hidden>
                  <path fill="currentColor" d="M7.17 6A5.17 5.17 0 0 0 2 11.17V20h8v-8H7.17V9A2 2 0 0 1 9.17 7H10V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V20h8v-8h-2.83V9A2 2 0 0 1 19.17 7H20V6h-2.83Z" />
                </svg>
              </div>

              <div className="mb-4">
                <Stars value={q.rating} size={16} />
              </div>

              <blockquote className="flex-1 text-base leading-relaxed text-slate-700 italic">
                "{q.quote}"
              </blockquote>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <span className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-bold ${INDUSTRY_COLORS[q.industry] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                  {q.industry}
                </span>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
