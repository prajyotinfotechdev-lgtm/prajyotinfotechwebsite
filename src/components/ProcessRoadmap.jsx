import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const STEPS = [
  { n: "01", t: "Discover", d: "Deep-dive into your business goals, users, and must-haves.", color: "#7c3aed" },
  { n: "02", t: "Design", d: "Wireframes → visual design → pixel-perfect UI prototype.", color: "#6d28d9" },
  { n: "03", t: "Build", d: "Clean code, API integrations, and optimized assets shipped.", color: "#5b21b6" },
  { n: "04", t: "Launch", d: "Deploy, domain, analytics, SEO setup — ready for the world.", color: "#4c1d95" },
  { n: "05", t: "Support", d: "15-day post-launch care. Extensions available beyond.", color: "#3b0764" },
];

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ProcessRoadmap() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative py-24 bg-[#05030f] overflow-hidden" aria-label="How we work">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-400 mb-3">Our Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              How we{" "}
              <span className="bg-gradient-to-r from-brand-400 to-pink-400 bg-clip-text text-transparent">work</span>
            </h2>
            <p className="mt-4 text-white/50 max-w-2xl mx-auto">
              A simple, transparent process — so you always know what's happening and when. Follow the glowing path to success.
            </p>
          </div>
        </Reveal>

        <div className="relative hidden md:block">
          {/* SVG Animated Connecting Line for Desktop */}
          <svg className="absolute top-7 left-0 right-0 w-full h-4 overflow-visible" preserveAspectRatio="none">
            {/* Background track */}
            <line x1="10%" y1="0" x2="90%" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
            
            {/* Animated glowing path */}
            <motion.line 
              x1="10%" y1="0" x2="90%" y2="0" 
              stroke="url(#gradientPath)" 
              strokeWidth="4" 
              strokeLinecap="round"
              style={{ pathLength }}
              className="drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]"
            />
            
            <defs>
              <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mobile vertical line */}
        <div className="relative block md:hidden mb-8">
          <motion.div 
            className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-500 to-pink-500 rounded-full"
            style={{ scaleY: pathLength, originY: 0 }}
          />
        </div>

        <ol className="grid gap-6 md:grid-cols-5 relative z-10 pl-16 md:pl-0">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <li className="relative group flex flex-col items-start md:items-center text-left md:text-center p-6 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.07] hover:border-brand-500/30 transition-all cursor-crosshair">
                <div
                  className="relative z-10 flex size-14 items-center justify-center rounded-2xl text-white text-lg font-black shadow-lg mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: s.color }}
                >
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white transition-all" />
                  {s.n}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-brand-300 transition-colors">{s.t}</h3>
                <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">{s.d}</p>
                
                {/* Micro-interaction indicator */}
                <div className="mt-4 text-xs font-bold text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Learn more
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
