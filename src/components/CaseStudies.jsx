import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Project data ─────────────────────────────────────────── */
const studies = [
  {
    tag: "Hospitality",
    title: "Restaurant Management System",
    copy: "QR table menus, live kitchen display, WhatsApp order confirmations, GST billing, and admin dashboard. Order errors dropped to 0%.",
    slug: "restaurant-management",
    meta: "React · Node.js · MongoDB · WhatsApp API · Razorpay",
    metric: "Order errors: 0%",
    accentA: "#FF6B35",
    accentB: "#E63950",
    glowColor: "rgba(230,57,80,0.35)",
    Screen: RestaurantScreen,
  },
  {
    tag: "Retail",
    title: "Mobile Shop Management System",
    copy: "IMEI tracking, repair job cards, dual retail/dealer pricing, GST billing with PDF, and WhatsApp customer updates. Billing time cut 90%.",
    slug: "mobile-shop-management",
    meta: "React · Node.js · Express · MongoDB · Cloudinary",
    metric: "Billing: 10 min → 1 min",
    accentA: "#4F8EF7",
    accentB: "#6C3FC2",
    glowColor: "rgba(79,142,247,0.35)",
    Screen: MobileShopScreen,
  },
  {
    tag: "E-Commerce",
    title: "JollyBaba Mobiles Online Store",
    copy: "Dealer/retail price toggle, fuzzy product search, animated cart, Razorpay checkout, and WhatsApp order fallback. Search CTR up 28%.",
    slug: "jollybaba-ecommerce",
    meta: "React · Node.js · MongoDB · Razorpay · Cloudinary",
    metric: "Search CTR: +28%",
    accentA: "#10C98F",
    accentB: "#0891B2",
    glowColor: "rgba(16,201,143,0.35)",
    Screen: EcomScreen,
  },
];

/* ─── SVG Phone Mockup Screens ─────────────────────────────── */
function RestaurantScreen() {
  return (
    <svg viewBox="0 0 180 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Status bar */}
      <rect width="180" height="310" rx="4" fill="#0F172A"/>
      <rect x="6" y="6" width="168" height="298" rx="2" fill="#111827"/>
      {/* Top bar */}
      <rect x="6" y="6" width="168" height="28" fill="#1E293B"/>
      <circle cx="16" cy="20" r="5" fill="#FF6B35" opacity="0.9"/>
      <rect x="25" y="15" width="55" height="4" rx="2" fill="#94A3B8"/>
      <rect x="148" y="15" width="20" height="4" rx="2" fill="#64748B"/>
      {/* Table card */}
      <rect x="12" y="40" width="155" height="36" rx="6" fill="#1E293B"/>
      <rect x="18" y="46" width="8" height="8" rx="1.5" fill="#FF6B35"/>
      <rect x="30" y="47" width="42" height="3" rx="1.5" fill="#F1F5F9"/>
      <rect x="30" y="53" width="28" height="2.5" rx="1.5" fill="#475569"/>
      <rect x="127" y="46" width="32" height="8" rx="4" fill="#FF6B35"/>
      <rect x="131" y="48" width="24" height="4" rx="1.5" fill="white"/>
      {/* Menu items */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x="12" y={84+i*34} width="155" height="28" rx="6" fill="#1E293B"/>
          <rect x="18" y={90+i*34} width="40" height="16" rx="3" fill={i===0?"#FF6B35":i===1?"#3B82F6":"#10B981"} opacity="0.15"/>
          <rect x="22" y={94+i*34} width="28" height="3" rx="1.5" fill={i===0?"#FF6B35":i===1?"#3B82F6":"#10B981"}/>
          <rect x="64" y={90+i*34} width="50" height="3" rx="1.5" fill="#F1F5F9"/>
          <rect x="64" y={96+i*34} width="30" height="2.5" rx="1.5" fill="#475569"/>
          <rect x="136" y={91+i*34} width="26" height="14" rx="4" fill="#FF6B35" opacity={i===0?1:0.3}/>
          <rect x="140" y={95+i*34} width="18" height="3" rx="1.5" fill="white"/>
        </g>
      ))}
      {/* QR badge */}
      <rect x="12" y="192" width="75" height="50" rx="6" fill="#1E293B"/>
      <rect x="18" y="198" width="20" height="20" rx="2" fill="#334155"/>
      {[0,1,2].map(r=>[0,1,2].map(c=>(
        <rect key={`${r}-${c}`} x={20+c*6} y={200+r*6} width="4" height="4" rx="0.5" fill={Math.random()>0.4?"#FF6B35":"#1E3A5F"}/>
      )))}
      <rect x="22" y="222" width="48" height="3" rx="1.5" fill="#64748B"/>
      <rect x="28" y="227" width="36" height="2.5" rx="1.5" fill="#475569"/>
      {/* Total badge */}
      <rect x="93" y="192" width="74" height="50" rx="6" fill="#FF6B35"/>
      <rect x="99" y="202" width="30" height="2.5" rx="1.5" fill="rgba(255,255,255,0.6)"/>
      <rect x="99" y="208" width="52" height="5" rx="2" fill="white"/>
      <rect x="99" y="216" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.7)"/>
      <rect x="99" y="222" width="58" height="12" rx="6" fill="rgba(0,0,0,0.2)"/>
      <rect x="107" y="225" width="42" height="3" rx="1.5" fill="white"/>
      {/* Bottom nav */}
      <rect x="6" y="278" width="168" height="28" rx="0" fill="#1E293B"/>
      {["#FF6B35","#475569","#475569","#475569"].map((c,i)=>(
        <g key={i}>
          <rect x={22+i*38} y="287" width="16" height="12" rx="2" fill={c} opacity="0.15"/>
          <rect x={26+i*38} y="290" width="8" height="1.5" rx="1" fill={c}/>
          <rect x={24+i*38} y="293" width="12" height="1.5" rx="1" fill={c} opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

function MobileShopScreen() {
  return (
    <svg viewBox="0 0 180 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="180" height="310" rx="4" fill="#0F172A"/>
      <rect x="6" y="6" width="168" height="298" rx="2" fill="#0D1929"/>
      {/* Header */}
      <rect x="6" y="6" width="168" height="32" fill="#0A1628"/>
      <rect x="14" y="14" width="60" height="4" rx="2" fill="#4F8EF7"/>
      <rect x="14" y="20" width="40" height="3" rx="1.5" fill="#334155"/>
      <rect x="140" y="12" width="28" height="16" rx="4" fill="#4F8EF7" opacity="0.2"/>
      <rect x="144" y="17" width="20" height="3" rx="1.5" fill="#4F8EF7"/>
      {/* Search bar */}
      <rect x="12" y="46" width="156" height="20" rx="10" fill="#1E293B"/>
      <circle cx="25" cy="56" r="5" fill="#334155"/>
      <rect x="34" y="54" width="60" height="3" rx="1.5" fill="#475569"/>
      {/* IMEI card */}
      <rect x="12" y="74" width="156" height="42" rx="6" fill="#1E293B"/>
      <rect x="18" y="80" width="50" height="3" rx="1.5" fill="#94A3B8"/>
      <rect x="18" y="87" width="90" height="5" rx="2" fill="#F1F5F9"/>
      <rect x="18" y="96" width="36" height="3" rx="1.5" fill="#4F8EF7" opacity="0.7"/>
      <rect x="130" y="80" width="32" height="28" rx="4" fill="#4F8EF7" opacity="0.1"/>
      <rect x="134" y="88" width="24" height="3" rx="1.5" fill="#4F8EF7"/>
      <rect x="138" y="93" width="16" height="2.5" rx="1.5" fill="#64748B"/>
      {/* Stock grid */}
      <rect x="12" y="123" width="36" height="14" rx="3" fill="#4F8EF7"/>
      <rect x="12" y="123" width="36" height="14" rx="3" fill="url(#b1)" opacity="0.3"/>
      <rect x="14" y="127" width="28" height="3" rx="1.5" fill="white"/>
      <rect x="54" y="123" width="36" height="14" rx="3" fill="#1E293B"/>
      <rect x="56" y="127" width="28" height="3" rx="1.5" fill="#64748B"/>
      <rect x="96" y="123" width="36" height="14" rx="3" fill="#1E293B"/>
      <rect x="98" y="127" width="28" height="3" rx="1.5" fill="#64748B"/>
      <rect x="138" y="123" width="30" height="14" rx="3" fill="#1E293B"/>
      <rect x="140" y="127" width="22" height="3" rx="1.5" fill="#64748B"/>
      {/* Phones list */}
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <rect x="12" y={145+i*30} width="156" height="24" rx="5" fill="#1E293B"/>
          {/* phone icon block */}
          <rect x="18" y={149+i*30} width="14" height="16" rx="3" fill="#4F8EF7" opacity="0.15"/>
          <rect x="21" y={152+i*30} width="8" height="2" rx="1" fill="#4F8EF7"/>
          <rect x="21" y={155+i*30} width="6" height="2" rx="1" fill="#4F8EF7" opacity="0.5"/>
          {/* details */}
          <rect x="38" y={149+i*30} width="55" height="3" rx="1.5" fill="#F1F5F9"/>
          <rect x="38" y={155+i*30} width="35" height="2.5" rx="1.5" fill="#475569"/>
          {/* price */}
          <rect x="118" y={150+i*30} width="30" height="5" rx="2" fill={i%2===0?"#10C98F":"#4F8EF7"} opacity="0.15"/>
          <rect x="120" y={151+i*30} width="26" height="3" rx="1.5" fill={i%2===0?"#10C98F":"#4F8EF7"}/>
          {/* status dot */}
          <circle cx="158" cy={157+i*30} r="4" fill={i===0?"#10C98F":i===1?"#F59E0B":i===2?"#4F8EF7":"#EF4444"} opacity="0.9"/>
        </g>
      ))}
      {/* Bottom */}
      <rect x="12" y="270" width="156" height="32" rx="6" fill="#4F8EF7" opacity="0.15"/>
      <rect x="18" y="278" width="40" height="3" rx="1.5" fill="#4F8EF7"/>
      <rect x="18" y="284" width="60" height="5" rx="2" fill="#F1F5F9"/>
      <rect x="130" y="274" width="32" height="20" rx="5" fill="#4F8EF7"/>
      <rect x="136" y="282" width="20" height="3" rx="1.5" fill="white"/>
    </svg>
  );
}

function EcomScreen() {
  return (
    <svg viewBox="0 0 180 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="180" height="310" rx="4" fill="#0F1F18"/>
      <rect x="6" y="6" width="168" height="298" rx="2" fill="#0A1A12"/>
      {/* Header */}
      <rect x="6" y="6" width="168" height="30" fill="#061410"/>
      <rect x="14" y="13" width="50" height="5" rx="2" fill="#10C98F"/>
      <rect x="148" y="12" width="18" height="18" rx="9" fill="#10C98F" opacity="0.15"/>
      <rect x="152" y="18" width="10" height="2" rx="1" fill="#10C98F"/>
      {/* Search */}
      <rect x="12" y="44" width="124" height="18" rx="9" fill="#132B1F"/>
      <rect x="22" y="51" width="50" height="2.5" rx="1.5" fill="#2D4A3B"/>
      <rect x="142" y="44" width="24" height="18" rx="9" fill="#10C98F" opacity="0.15"/>
      <rect x="147" y="50" width="14" height="2.5" rx="1.5" fill="#10C98F"/>
      {/* Promo banner */}
      <rect x="12" y="70" width="156" height="40" rx="8" fill="#10C98F" opacity="0.12"/>
      <rect x="18" y="78" width="55" height="4" rx="2" fill="#10C98F"/>
      <rect x="18" y="85" width="35" height="3" rx="1.5" fill="#4ADE80" opacity="0.6"/>
      <rect x="130" y="74" width="30" height="30" rx="4" fill="#10C98F" opacity="0.2"/>
      <rect x="138" y="82" width="14" height="14" rx="2" fill="#10C98F" opacity="0.5"/>
      {/* Product grid 2x2 */}
      {[[0,0],[1,0],[0,1],[1,1]].map(([col,row])=>(
        <g key={`${col}-${row}`}>
          <rect x={12+col*82} y={118+row*80} width="76" height="74" rx="6" fill="#132B1F"/>
          {/* product image placeholder */}
          <rect x={16+col*82} y={122+row*80} width="68" height="38" rx="4" fill="#0C1F16"/>
          {/* phone icon */}
          <rect x={28+col*82} y={129+row*80} width="20" height="24" rx="3" fill="#10C98F" opacity="0.2"/>
          <rect x={32+col*82} y={132+row*80} width="12" height="18" rx="2" fill="#10C98F" opacity="0.3"/>
          <rect x={35+col*82} y={135+row*80} width="6" height="12" rx="1" fill="#10C98F" opacity="0.5"/>
          {/* name */}
          <rect x={16+col*82} y={163+row*80} width="50" height="3" rx="1.5" fill="#F1F5F9"/>
          {/* price */}
          <rect x={16+col*82} y={169+row*80} width="36" height="4" rx="2" fill="#10C98F" opacity="0.8"/>
          {/* add btn */}
          <rect x={58+col*82} y={167+row*80} width="20" height="14" rx="4" fill="#10C98F"/>
          <rect x={64+col*82} y={172+row*80} width="8" height="2" rx="1" fill="white"/>
          <rect x={67+col*82} y={169+row*80} width="2" height="8" rx="1" fill="white"/>
        </g>
      ))}
      {/* Cart bar */}
      <rect x="12" y="280" width="156" height="22" rx="11" fill="#10C98F"/>
      <rect x="20" y="289" width="50" height="3" rx="1.5" fill="white"/>
      <rect x="130" y="285" width="30" height="12" rx="6" fill="rgba(0,0,0,0.2)"/>
      <rect x="136" y="289" width="18" height="3" rx="1.5" fill="white"/>
    </svg>
  );
}

/* ─── 3D Tilt Phone Card ───────────────────────────────────── */
function Phone3DCard({ study, index }) {
  const ref = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 180, damping: 22 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [14, -14]);
  const glowX  = useTransform(springX, [-0.5, 0.5], ["-40%", "140%"]);
  const glowY  = useTransform(springY, [-0.5, 0.5], ["-40%", "140%"]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  }
  function handleLeave() { rawX.set(0); rawY.set(0); }

  const { Screen } = study;

  return (
    <motion.div
      key={study.slug}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to="/work"
        aria-label={`View project: ${study.title}`}
        className="group block rounded-3xl overflow-hidden bg-[#0A0F1E] border border-white/[0.06] shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 transition-all duration-300 hover:border-white/10"
        style={{ boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 24px 60px -12px ${study.glowColor}` }}
      >
        {/* ── 3D Stage ─────────────────────────────────────── */}
        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative h-56 overflow-hidden cursor-none"
          style={{ perspective: "700px" }}
        >
          {/* Ambient glow bg */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${study.glowColor}, transparent 70%)`,
            }}
          />
          {/* Fine grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}/>

          {/* Floating orbs */}
          <motion.div
            className="absolute rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{
              width: 80, height: 80,
              background: study.accentA,
              x: glowX, y: glowY,
              top: -20, left: -20,
            }}
          />
          <motion.div
            className="absolute rounded-full blur-xl opacity-30 pointer-events-none"
            animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 40, height: 40, background: study.accentB, bottom: 20, right: 30 }}
          />
          <motion.div
            className="absolute rounded-full blur-lg opacity-20 pointer-events-none"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ width: 24, height: 24, background: study.accentA, top: 30, right: 60 }}
          />

          {/* 3D Phone */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Drop shadow layer (depth illusion) */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 rounded-full blur-md opacity-60"
                style={{ background: study.glowColor }}
              />

              {/* Phone frame outer shell */}
              <div
                className="relative w-28 rounded-[22px] overflow-hidden shadow-2xl"
                style={{
                  height: 196,
                  background: "linear-gradient(145deg, #2A2A3A, #0D0D16)",
                  boxShadow: `0 0 0 1.5px rgba(255,255,255,0.12), 0 0 0 3px rgba(0,0,0,0.6), 0 20px 50px -10px ${study.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                  transform: "translateZ(20px)",
                }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-4 rounded-b-xl z-10"
                  style={{ background: "linear-gradient(145deg, #1A1A2E, #0D0D16)" }}>
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 rounded-full bg-black"/>
                  <div className="absolute top-1.5 right-3 w-1.5 h-1.5 rounded-full bg-[#2A2A3A]"/>
                </div>
                {/* Side button */}
                <div className="absolute -right-0.5 top-14 w-1 h-8 rounded-l-sm bg-[#2A2A3A]"/>
                <div className="absolute -left-0.5 top-12 w-1 h-5 rounded-r-sm bg-[#2A2A3A]"/>
                <div className="absolute -left-0.5 top-20 w-1 h-5 rounded-r-sm bg-[#2A2A3A]"/>
                {/* Screen */}
                <div className="absolute inset-[3px] rounded-[20px] overflow-hidden bg-[#0F172A]">
                  <Screen />
                </div>
                {/* Screen glint */}
                <div
                  className="absolute inset-0 rounded-[22px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Tag pill */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold backdrop-blur-md"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: study.accentA,
              }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: study.accentA }}/>
              {study.tag}
            </span>
          </div>

          {/* Metric badge */}
          <div className="absolute bottom-4 right-4">
            <div className="rounded-xl px-3 py-2 backdrop-blur-md text-right"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p className="text-[9px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Key result</p>
              <p className="text-[11px] font-black text-white">{study.metric}</p>
            </div>
          </div>
        </div>

        {/* ── Body ─────────────────────────────────────────── */}
        <div className="p-5 border-t border-white/[0.06]" style={{ background: "rgba(255,255,255,0.02)" }}>
          <h3 className="text-[15px] font-bold text-white leading-snug group-hover:text-opacity-80 transition-colors">
            {study.title}
          </h3>
          <p className="mt-2 text-[13px] leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.45)" }}>
            {study.copy}
          </p>
          <div className="mt-3 text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
            {study.meta}
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold transition-all" style={{ color: study.accentA }}>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">View project</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export default function CaseStudies() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="flex items-end justify-between gap-4 mb-10">
        <div>
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 mb-2">Our Work</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
            Projects we've built
          </h2>
          <p className="mt-2 text-slate-500 text-base">Real software. Real Indian businesses. Real results.</p>
        </div>
        <Link
          to="/work"
          className="shrink-0 group flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 focus:outline-none"
        >
          See all 8 projects
          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studies.map((s, i) => (
          <Phone3DCard key={s.slug} study={s} index={i} />
        ))}
      </div>
    </section>
  );
}
