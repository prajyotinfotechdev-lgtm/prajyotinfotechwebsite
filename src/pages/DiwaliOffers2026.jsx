// src/pages/DiwaliOffers2026.jsx
// 🪔 Dedicated Diwali 2026 SEO Landing Page
// Target keywords: "Diwali 2026 web design offers", "Diwali website design discount India",
//                  "Diwali 2026 software company offer", "15% off web development Diwali"
// Campaign: Oct 20 – Nov 30, 2026 | Code: DIWALI2026

import React, { useState, useEffect, useRef } from "react";
import Seo from "../components/Seo.jsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, CheckCircle2, Copy, Check, Phone, ArrowRight,
  Star, Gift, Zap, Shield, Clock, ChevronDown
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const CAMPAIGN_END   = new Date("2026-11-30T23:59:59+05:30");
const WHATSAPP_NUM   = "917020708747";
const PROMO_CODE     = "DIWALI2026";
const SITE_URL       = "https://www.prajyotinfotech.in";
const wa = (msg) => `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`;

/* ─────────────────────────────────────────────
   SCHEMA.ORG JSON-LD (SaleEvent + Offer)
───────────────────────────────────────────── */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SaleEvent",
      "name": "Diwali 2026 Web Design & Software Offer — Prajyot Infotech",
      "description": "Get 15% off on all web design, app development, and software services + 3 months free AMC. Use code DIWALI2026. Valid Oct 20 – Nov 30, 2026.",
      "startDate": "2026-10-20",
      "endDate": "2026-11-30",
      "url": `${SITE_URL}/diwali-offers-2026`,
      "organizer": {
        "@type": "Organization",
        "name": "Prajyot Infotech",
        "url": SITE_URL,
        "logo": `${SITE_URL}/videos/Logo.jpg`,
        "telephone": "+91-7020708747",
        "email": "hr@prajyotinfotech.in"
      },
      "offers": {
        "@type": "Offer",
        "name": "Diwali 2026 — 15% OFF + 3 Months Free AMC",
        "description": "15% discount + 3 months free Annual Maintenance Contract on all services",
        "price": "25499",
        "priceCurrency": "INR",
        "priceValidUntil": "2026-11-30",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-10-20",
        "url": `${SITE_URL}/diwali-offers-2026`,
        "seller": { "@type": "Organization", "name": "Prajyot Infotech" }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Diwali 2026 offer from Prajyot Infotech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prajyot Infotech is offering 15% OFF on all web design, app development, and software services plus 3 months of free Annual Maintenance Contract (AMC). Use coupon code DIWALI2026 at checkout. Offer valid from October 20 to November 30, 2026."
          }
        },
        {
          "@type": "Question",
          "name": "Which services are covered under the Diwali 2026 discount?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All services are covered: Website Design & Development, Mobile App Development, Custom Software, HRMS/ERP Solutions, UI/UX Design, and E-commerce stores. The 15% discount applies to new projects started before November 30, 2026."
          }
        },
        {
          "@type": "Question",
          "name": "How do I claim the Diwali 2026 discount?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Simply contact us via WhatsApp or the lead form on this page and mention code DIWALI2026. Our team will apply the 15% discount to your project quote instantly."
          }
        },
        {
          "@type": "Question",
          "name": "What is the last date to avail the Diwali web design offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Diwali 2026 offer expires on November 30, 2026 at midnight IST. Book before then to lock in your 15% discount and 3 months free AMC."
          }
        }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────
   COUNTDOWN HOOK
───────────────────────────────────────────── */
function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const s = Math.floor(diff / 1000);
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, []);
  return t;
}

/* ─────────────────────────────────────────────
   PACKAGE TIERS
───────────────────────────────────────────── */
const TIERS = [
  {
    name: "Starter Web",
    badge: "Best for Small Business",
    original: "₹29,999",
    discounted: "₹25,499",
    features: [
      "1–5 Custom Responsive Pages",
      "Mobile-First & Lightning Fast",
      "On-Page SEO + Schema Markup",
      "Lead Forms + DB Capture",
      "Free SSL & Hosting Setup",
      "15-Day Post-launch Warranty",
      "3 Months Free AMC 🪔",
    ],
    cta: "Claim Starter Offer",
    popular: false,
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Business Growth",
    badge: "🔥 Most Popular",
    original: "₹59,999",
    discounted: "₹50,999",
    features: [
      "6–15 Custom Pages + Blog/CMS",
      "Advanced SEO Strategy",
      "WhatsApp & CRM Integration",
      "E-commerce Ready",
      "Performance Dashboard",
      "30-Day Post-launch Warranty",
      "3 Months Free AMC 🪔",
    ],
    cta: "Claim Business Offer",
    popular: true,
    color: "from-brand-500 to-brand-700",
  },
  {
    name: "Enterprise / App",
    badge: "Custom Scope",
    original: "Custom",
    discounted: "15% OFF",
    features: [
      "Full-Stack Web / Mobile App",
      "Custom ERP / HRMS / SaaS",
      "Dedicated Project Manager",
      "API & Third-party Integrations",
      "Scalable Cloud Architecture",
      "Priority 24/7 Support",
      "3 Months Free AMC 🪔",
    ],
    cta: "Get Custom Quote",
    popular: false,
    color: "from-purple-600 to-indigo-700",
  },
];

/* ─────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: "Ravi Sharma",
    company: "Pune Real Estate Group",
    text: "Prajyot Infotech delivered our project 3 days early. The website quality and SEO results were outstanding. Highly recommend!",
    rating: 5,
  },
  {
    name: "Anita Desai",
    company: "Mumbai Fashion Brand",
    text: "Our e-commerce store went live in 2 weeks and we got our first order within 48 hours. Absolutely thrilled with the results.",
    rating: 5,
  },
  {
    name: "Mohammed Rashid",
    company: "Logistics Company, Dubai",
    text: "Professional team, transparent pricing, excellent communication. Our HRMS software has transformed our HR operations.",
    rating: 5,
  },
];

/* ─────────────────────────────────────────────
   PARTICLE BURST
───────────────────────────────────────────── */
function Particle({ x, y, color, angle, dist }) {
  return (
    <motion.div
      className="pointer-events-none fixed z-[200] rounded-full"
      style={{ left: x, top: y, width: 8, height: 8, background: color }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0,
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    />
  );
}

/* ─────────────────────────────────────────────
   LEAD FORM
───────────────────────────────────────────── */
function LeadForm({ plan = "" }) {
  const [form, setForm] = useState({ name: "", phone: "", service: plan, message: "" });
  const [status, setStatus]   = useState("idle"); // idle | submitting | done | error
  const [particles, setParticles] = useState([]);

  const COLORS = ["#f59e0b","#ef4444","#10b981","#3b82f6","#a855f7","#f97316"];

  const burst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const arr = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i, x: cx, y: cy,
      color: COLORS[i % COLORS.length],
      angle: (Math.PI * 2 * i) / 14,
      dist: 60 + Math.random() * 60,
    }));
    setParticles(arr);
    setTimeout(() => setParticles([]), 1000);
  };

  const submit = async (e) => {
    e.preventDefault();
    burst(e);
    setStatus("submitting");
    try {
      await createLead({
        name: form.name,
        contact: form.phone,
        project_type: form.service || "Diwali Offer Inquiry",
        notes: `[DIWALI2026] ${form.message}`,
        source: "diwali-offers-2026-page",
      });
      setStatus("done");
      window.open(wa(`🪔 Diwali 2026 Offer Inquiry!\nName: ${form.name}\nService: ${form.service || "General"}\nMessage: ${form.message}\nCode: DIWALI2026`), "_blank");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-10"
      >
        <div className="text-6xl mb-4">🪔</div>
        <h3 className="text-2xl font-bold text-amber-700 mb-2">Shubh Diwali! 🎆</h3>
        <p className="text-gray-600">We've received your inquiry and opened WhatsApp for you. Our team will reply within 30 minutes!</p>
      </motion.div>
    );
  }

  return (
    <>
      {particles.map((p) => <Particle key={p.id} {...p} />)}
      <form onSubmit={submit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Your Name *</label>
            <input
              required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Rahul Sharma"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Phone / WhatsApp *</label>
            <input
              required value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Service Needed</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          >
            <option value="">Select a service…</option>
            <option value="Starter Web">Starter Website (₹25,499 after Diwali discount)</option>
            <option value="Business Growth">Business Growth Website (₹50,999 after discount)</option>
            <option value="Mobile App">Mobile App Development</option>
            <option value="Custom Software">Custom Software / ERP / HRMS</option>
            <option value="E-commerce">E-commerce Store</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Other">Other / Not Sure</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Tell us about your project</label>
          <textarea
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Briefly describe your project idea, timeline, or any questions…"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white resize-none"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 rounded-xl p-3 border border-amber-200">
          <Gift size={16} className="shrink-0" />
          <span>Code <strong>DIWALI2026</strong> will be applied automatically — 15% OFF + 3 Months Free AMC 🪔</span>
        </div>
        {status === "error" && (
          <p className="text-red-600 text-sm">Something went wrong. Please try WhatsApp directly.</p>
        )}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-200 transition-all disabled:opacity-70"
        >
          {status === "submitting" ? (
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5" />
          ) : (
            <>
              <span>🪔 Claim My Diwali Offer</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
        <p className="text-center text-xs text-gray-400">
          No spam ever. We'll reply on WhatsApp within 30 min during business hours.
        </p>
      </form>
    </>
  );
}

/* ─────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────── */
const FAQS = [
  { q: "What is the Diwali 2026 offer?", a: "Prajyot Infotech is giving 15% OFF on all services + 3 months free AMC to celebrate Diwali 2026. Use code DIWALI2026. Valid till November 30, 2026." },
  { q: "Which services are covered?", a: "All services: Website Design & Development, Mobile App Development, Custom Software, HRMS / ERP, UI/UX Design, E-commerce Stores, and Digital Marketing." },
  { q: "How do I claim the discount?", a: "Contact us via the form on this page or WhatsApp with code DIWALI2026. Our team applies the 15% discount to your project quote immediately." },
  { q: "Can I lock in the price now and start work later?", a: "Yes! Book before November 30, 2026 to lock in your Diwali price. Work can begin any time within 30 days of booking." },
  { q: "What is the 3 Months Free AMC?", a: "Annual Maintenance Contract (AMC) covers bug fixes, security updates, content changes, performance monitoring, and priority support for 3 months at zero cost." },
  { q: "Do you work with clients outside India?", a: "Absolutely. We serve clients in USA, UAE, UK, Canada, Australia, and across Europe. We accept payments in INR, USD, AED, GBP, and EUR." },
];

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {FAQS.map((item, i) => (
        <div key={i} className="border border-amber-100 rounded-2xl overflow-hidden bg-white">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 hover:bg-amber-50 transition-colors"
          >
            <span>{item.q}</span>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={18} className="text-amber-500" />
            </motion.div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COUPON COPY BUTTON
───────────────────────────────────────────── */
function CouponCopy() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(PROMO_CODE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border-2 border-dashed border-white/60 text-white font-bold px-5 py-2 rounded-xl hover:bg-white/30 transition-all text-lg tracking-widest"
      aria-label="Copy promo code DIWALI2026"
    >
      {copied ? <Check size={18} /> : <Copy size={18} />}
      {PROMO_CODE}
    </button>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function DiwaliOffers2026() {
  const { d, h, m, s } = useCountdown(CAMPAIGN_END);
  const expired = d === 0 && h === 0 && m === 0 && s === 0;
  const formRef = useRef(null);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      {/* ── SEO HEAD ── */}
      <Seo
        title="Diwali 2026 Web Design Offer — 15% OFF | Prajyot Infotech"
        description="🪔 Diwali 2026 Special Offer: Get 15% OFF on Web Design, App Development & Software + 3 Months Free AMC. Use code DIWALI2026. Limited period offer till Nov 30, 2026."
        keywords="Diwali 2026 web design offer, Diwali web development discount India, Diwali 2026 software company offer, 15% off website design Diwali, Diwali app development offer, festive web design discount 2026, DIWALI2026 offer Prajyot Infotech, web design Pune Diwali offer, cheap website design Diwali India"
        path="/diwali-offers-2026"
        image="https://www.prajyotinfotech.in/videos/Logo.jpg"
        schema={SCHEMA}
      />

      {/* ── HERO SECTION ── */}
      <section
        className="relative overflow-hidden py-20 px-4"
        style={{
          background: "linear-gradient(135deg, #7c2d12 0%, #b45309 30%, #d97706 60%, #f59e0b 80%, #fbbf24 100%)",
        }}
        aria-label="Diwali 2026 Special Offer Hero"
      >
        {/* Floating diyas (CSS-only, no JS) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {["top-4 left-8","top-12 right-16","bottom-8 left-1/4","bottom-4 right-8","top-1/3 left-1/2","top-8 left-1/3"].map((pos, i) => (
            <span key={i} className={`absolute text-3xl opacity-30 animate-bounce ${pos}`} style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2.5s" }}>🪔</span>
          ))}
          {["top-20 right-1/4","bottom-16 left-1/3","top-1/4 right-8"].map((pos, i) => (
            <span key={i} className={`absolute text-2xl opacity-20 animate-pulse ${pos}`} style={{ animationDelay: `${i * 0.6}s` }}>✨</span>
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
          >
            <Sparkles size={14} />
            Limited Time — Oct 20 to Nov 30, 2026
            <Sparkles size={14} />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-3 sm:mb-4"
          >
            🪔 Diwali 2026<br />
            <span className="text-yellow-200">15% OFF + 3 Months Free AMC</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-sm sm:text-lg text-white/90 max-w-2xl mx-auto mb-5 sm:mb-6"
          >
            Web Design · App Development · Custom Software · HRMS/ERP<br className="hidden sm:block" />
            Trusted by <strong>200+ businesses</strong> across India, UAE, UK & USA
          </motion.p>

          {/* Coupon */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
            className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <span className="text-white/80 text-xs sm:text-sm font-medium">Your promo code:</span>
            <CouponCopy />
          </motion.div>

          {/* Countdown */}
          {!expired && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="flex justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
              aria-label="Offer countdown timer"
            >
              {[{ v: d, l: "Days" }, { v: h, l: "Hours" }, { v: m, l: "Mins" }, { v: s, l: "Secs" }].map(({ v, l }) => (
                <div key={l} className="bg-white/20 backdrop-blur rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-2 sm:py-3 min-w-[54px] sm:min-w-[64px] text-center border border-white/30">
                  <div className="text-xl sm:text-3xl font-extrabold tabular-nums">{String(v).padStart(2, "0")}</div>
                  <div className="text-[10px] sm:text-xs font-medium text-white/80 mt-0.5 sm:mt-1">{l}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
          >
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto justify-center bg-white text-amber-700 hover:bg-amber-50 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <span>🪔 Claim Diwali Offer</span>
              <ArrowRight size={18} />
            </button>
            <a
              href={wa("🪔 Hi! I want to know about the Diwali 2026 offer. Code: DIWALI2026")}
              target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto justify-center bg-green-500 hover:bg-green-600 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Phone size={18} /> <span>WhatsApp Us</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-amber-50 border-y border-amber-100 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-medium text-amber-800">
          {[
            { icon: <Star size={16} className="text-amber-500" />, text: "4.9★ Rated by 200+ Clients" },
            { icon: <Shield size={16} className="text-green-600" />, text: "ISO Certified Development" },
            { icon: <Zap size={16} className="text-blue-500" />, text: "48-Hour Kickoff Guarantee" },
            { icon: <Clock size={16} className="text-purple-500" />, text: "On-Time Delivery, Always" },
            { icon: <CheckCircle2 size={16} className="text-green-500" />, text: "100% Transparent Pricing" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50" aria-labelledby="packages-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Gift size={16} /> Diwali 2026 Packages
            </div>
            <h2 id="packages-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
              Choose Your Diwali Deal
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              All packages include 15% Diwali discount + 3 months free AMC. Prices locked when you book before Nov 30, 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl border-2 overflow-hidden shadow-lg bg-white ${tier.popular ? "border-brand-500 ring-4 ring-brand-100 scale-[1.03]" : "border-amber-100"}`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className={`bg-gradient-to-r ${tier.color} text-white text-xs font-bold text-center py-2 tracking-wide`}>
                    {tier.badge}
                  </div>
                )}
                {!tier.popular && (
                  <div className="bg-amber-50 text-amber-700 text-xs font-semibold text-center py-2 border-b border-amber-100">
                    {tier.badge}
                  </div>
                )}

                <div className="p-7">
                  {/* Diwali badge */}
                  <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full px-3 py-1 mb-3">
                    🪔 Diwali 15% OFF
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 mb-1">{tier.name}</h3>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-extrabold text-gray-900">{tier.discounted}</span>
                    {tier.original !== "Custom" && (
                      <span className="text-sm text-gray-400 line-through">{tier.original}</span>
                    )}
                  </div>
                  <p className="text-xs text-green-600 font-semibold mb-6">+ 3 Months Free AMC included 🎁</p>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToForm}
                    className={`w-full bg-gradient-to-r ${tier.color} text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md`}
                  >
                    {tier.cta}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD FORM ── */}
      <section
        ref={formRef}
        className="py-16 px-4 bg-gradient-to-br from-amber-600 via-orange-600 to-red-700"
        aria-labelledby="lead-form-heading"
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 text-white">
            <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">🪔</div>
            <h2 id="lead-form-heading" className="text-2xl sm:text-4xl font-extrabold mb-2 sm:mb-3">
              Claim Your Diwali Offer
            </h2>
            <p className="text-white/85 text-sm sm:text-lg">
              Fill the form below — we'll send your personalised quote within <strong>30 minutes</strong>
            </p>
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap">
              <span className="bg-white/20 border border-white/30 rounded-full px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold">✅ 15% OFF Applied</span>
              <span className="bg-white/20 border border-white/30 rounded-full px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold">🎁 3 Months Free AMC</span>
              <span className="bg-white/20 border border-white/30 rounded-full px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold">⚡ 30-Min Response</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 px-4 bg-white" aria-labelledby="testimonials-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="testimonials-heading" className="text-3xl font-extrabold text-gray-900 mb-3">
              What Our Clients Say 🌟
            </h2>
            <p className="text-gray-500">200+ happy clients across India, UAE, UK, and USA</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-amber-50 border border-amber-100 rounded-3xl p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4 bg-amber-50" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 id="faq-heading" className="text-3xl font-extrabold text-gray-900 mb-3">
              Diwali 2026 Offer — FAQs
            </h2>
            <p className="text-gray-500">Everything you need to know about our Diwali web design offer</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-14 px-4 bg-gradient-to-r from-amber-700 to-orange-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-5xl mb-4">🎆</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">
            Don't Let This Diwali Offer Slip Away!
          </h2>
          <p className="text-white/85 text-lg mb-2">
            Offer expires <strong>November 30, 2026</strong>. Book now to lock in your 15% discount.
          </p>
          <div className="flex justify-center gap-3 mt-2 mb-8 flex-wrap text-sm">
            <span className="bg-white/20 rounded-full px-4 py-1.5 font-semibold">{String(d).padStart(2,"0")}d {String(h).padStart(2,"0")}h {String(m).padStart(2,"0")}m remaining</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={scrollToForm}
              className="bg-white text-amber-700 hover:bg-amber-50 font-bold px-8 py-4 rounded-2xl text-lg flex items-center gap-2 transition-all hover:scale-105 shadow-xl"
            >
              🪔 Get My Diwali Quote
            </button>
            <a
              href={wa("🪔 Diwali 2026 Offer! I'd like a free quote. Code: DIWALI2026")}
              target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-2xl text-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <Phone size={20} /> WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* ── CRAWLER-READABLE SNAPSHOT (hidden visually, visible to bots) ── */}
      <div className="sr-only" aria-hidden="true">
        <h2>Diwali 2026 Web Design Offer — Prajyot Infotech</h2>
        <p>Get 15% OFF on all web design, app development, and software services this Diwali 2026. Use promo code DIWALI2026. Offer valid from October 20 to November 30, 2026. Starter Website at ₹25,499, Business Website at ₹50,999. Includes 3 months free Annual Maintenance Contract. Serving clients in Pune, Mumbai, Bangalore, Hyderabad, Delhi, Nagpur, Latur, UAE, USA, UK. Contact: +91 7020708747 | hr@prajyotinfotech.in</p>
        <p>Diwali 2026 web design discount | Diwali 2026 website offer India | Diwali software company discount | festive web development offer 2026 | Diwali website design Pune | Diwali app development offer</p>
      </div>
    </>
  );
}

