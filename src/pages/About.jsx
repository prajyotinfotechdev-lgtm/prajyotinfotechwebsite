import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ProcessRoadmap from "../components/ProcessRoadmap.jsx";

const WA_NUMBER = "917020708747";
const EMAIL = "prajyot.infotech@gmail.com";
const CALENDLY_LINK = "";
const SITE_URL = "https://prajyotinfotech.in";
const LOGO_URL = "https://prajyotinfotech.in/videos/Logo.jpg";
const BRAND = "Prajyot Infotech";
const SOCIALS = ["https://www.linkedin.com/company/prajyotinfotech"];

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(target, 10);
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── 3D Floating Orb SVG ─── */
function FloatingOrb({ color = "#7c3aed", size = 300, blur = 80, style = {} }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute rounded-full"
      style={{ width: size, height: size, background: color, filter: `blur(${blur}px)`, opacity: 0.18, ...style }}
    />
  );
}

/* ─── 3D Isometric Laptop SVG ─── */
function IsometricLaptop() {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="3D Isometric Laptop">
      {/* Screen back */}
      <path d="M80 60 L200 20 L320 60 L200 100 Z" fill="url(#lap_top)" />
      {/* Screen face */}
      <path d="M200 100 L320 60 L320 190 L200 230 Z" fill="url(#lap_side)" />
      <path d="M80 60 L200 100 L200 230 L80 190 Z" fill="url(#lap_left)" />
      {/* Screen inner (display) */}
      <path d="M95 75 L200 42 L305 75 L200 108 Z" fill="#1e1b4b" />
      <path d="M200 108 L305 75 L305 175 L200 208 Z" fill="#2d2a5e" />
      <path d="M95 75 L200 108 L200 208 L95 175 Z" fill="#252350" />
      {/* Code lines on screen */}
      <path d="M130 95 L175 81" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" opacity=".8"/>
      <path d="M130 103 L190 88" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" opacity=".6"/>
      <path d="M135 111 L165 101" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
      <path d="M135 119 L180 107" stroke="#6d28d9" strokeWidth="2" strokeLinecap="round" opacity=".7"/>
      <path d="M130 127 L170 115" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" opacity=".5"/>
      {/* Keyboard base */}
      <path d="M60 220 L200 260 L340 220 L320 190 L200 230 L80 190 Z" fill="url(#lap_base)" />
      {/* Keyboard keys */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={115 + i * 25} y={222} width="18" height="10" rx="2" fill="rgba(255,255,255,0.15)" />
      ))}
      {[0,1,2,3].map(i => (
        <rect key={i} x={120 + i * 25} y={234} width="18" height="10" rx="2" fill="rgba(255,255,255,0.12)" />
      ))}
      {/* Glint effect */}
      <ellipse cx="225" cy="58" rx="60" ry="10" fill="white" opacity=".12" transform="rotate(-20 225 58)" />
      <defs>
        <linearGradient id="lap_top" x1="80" y1="60" x2="320" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed"/>
          <stop offset="1" stopColor="#4f46e5"/>
        </linearGradient>
        <linearGradient id="lap_side" x1="320" y1="60" x2="320" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4c1d95"/>
          <stop offset="1" stopColor="#2d1b69"/>
        </linearGradient>
        <linearGradient id="lap_left" x1="80" y1="60" x2="80" y2="190" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d28d9"/>
          <stop offset="1" stopColor="#3b0764"/>
        </linearGradient>
        <linearGradient id="lap_base" x1="60" y1="220" x2="340" y2="260" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7c3aed" stopOpacity=".5"/>
          <stop offset="1" stopColor="#4338ca" stopOpacity=".4"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── 3D Floating Phone SVG ─── */
function IsometricPhone() {
  return (
    <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-label="3D Floating Phone">
      {/* Phone body */}
      <rect x="40" y="20" width="120" height="260" rx="22" fill="url(#ph_body)" />
      {/* Screen */}
      <rect x="50" y="50" width="100" height="190" rx="10" fill="url(#ph_screen)" />
      {/* Status bar */}
      <rect x="55" y="56" width="90" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
      {/* App rows */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="60" y={75 + i * 38} width="80" height="28" rx="8" fill="rgba(124,58,237,0.25)" />
      ))}
      {/* App icons */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="66" y={79 + i * 38} width="20" height="20" rx="6" fill="rgba(167,139,250,0.4)" />
      ))}
      {/* Text bars */}
      {[0,1,2,3].map(i => (
        <React.Fragment key={i}>
          <rect x="93" y={81 + i * 38} width="38" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
          <rect x="93" y={91 + i * 38} width="24" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
        </React.Fragment>
      ))}
      {/* Home bar */}
      <rect x="80" y="252" width="40" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
      {/* Camera notch */}
      <rect x="82" y="27" width="36" height="12" rx="6" fill="rgba(0,0,0,0.4)" />
      <circle cx="100" cy="33" r="3.5" fill="#1e1b4b" />
      {/* Edge sheen */}
      <rect x="40" y="20" width="120" height="260" rx="22" fill="url(#ph_sheen)" />
      <defs>
        <linearGradient id="ph_body" x1="40" y1="20" x2="160" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e1b4b"/>
          <stop offset="1" stopColor="#0f172a"/>
        </linearGradient>
        <linearGradient id="ph_screen" x1="50" y1="50" x2="150" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1e1b4b"/>
          <stop offset="1" stopColor="#0d0d2b"/>
        </linearGradient>
        <linearGradient id="ph_sheen" x1="40" y1="20" x2="70" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity=".06"/>
          <stop offset=".3" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── 3D Orbit Ring ─── */
function OrbitRing({ children, delay = 0 }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ duration: 20 + delay * 3, repeat: Infinity, ease: "linear", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Tilt Card ─── */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rotateX = useSpring(0, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 25 });
  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  };
  const onLeave = () => { rotateX.set(0); rotateY.set(0); };
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Reveal ─── */
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

const faqs = [
  { q: "How does pricing work?", a: "We scope your project and offer a fixed price with clear deliverables. Add-ons are priced transparently — no surprises." },
  { q: "How fast can you deliver?", a: "Most projects ship in 10–20 business days depending on scope and content readiness." },
  { q: "What do you need from me?", a: "Brand name/logo, a short description, any product/menu data, and reference sites if you have them. We help fill gaps." },
  { q: "Do you provide support after launch?", a: "Yes — 15-day post-launch support is included. Extended support and update plans are available." },
  { q: "Can you migrate my existing site/app?", a: "Yes. We can modernize your UI, migrate data, and redirect URLs to preserve SEO." },
  { q: "Who owns the code and assets?", a: "You do. We hand over admin access, repo, and instructions so you're never locked in." },
];

const PRINCIPLES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    label: "Speed First",
    desc: "Sub-2s loads on mobile. Performance is a feature.",
    accent: "from-yellow-500 to-orange-500"
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    label: "Clarity Over Complexity",
    desc: "Clean architecture, no unnecessary bloat.",
    accent: "from-brand-500 to-violet-500"
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>,
    label: "You Own It All",
    desc: "Full code ownership — repo, domain, credentials.",
    accent: "from-emerald-500 to-teal-500"
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
    label: "Reliable Timelines",
    desc: "We commit to deadlines and proactively communicate.",
    accent: "from-cyan-500 to-blue-500"
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.8"/><path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
    label: "Premium Design",
    desc: "Every pixel intentional. Design that converts.",
    accent: "from-pink-500 to-rose-500"
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" aria-hidden><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 2c-2.8 3.3-4 6.3-4 10s1.2 6.7 4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 2c2.8 3.3 4 6.3 4 10s-1.2 6.7-4 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    label: "Local + Global",
    desc: "Serving Indian SMBs and international clients remotely.",
    accent: "from-indigo-500 to-brand-500"
  },
];

const STEPS = [
  { n: "01", t: "Discover", d: "Deep-dive into your business goals, users, and must-haves.", color: "#7c3aed" },
  { n: "02", t: "Design", d: "Wireframes → visual design → pixel-perfect UI prototype.", color: "#6d28d9" },
  { n: "03", t: "Build", d: "Clean code, API integrations, and optimized assets shipped.", color: "#5b21b6" },
  { n: "04", t: "Launch", d: "Deploy, domain, analytics, SEO setup — ready for the world.", color: "#4c1d95" },
  { n: "05", t: "Support", d: "15-day post-launch care. Extensions available beyond.", color: "#3b0764" },
];

const TECH_STACK = [
  { name: "React", cat: "Frontend", color: "#61DAFB" },
  { name: "React Native", cat: "Mobile", color: "#7c3aed" },
  { name: "Node.js", cat: "Backend", color: "#6BA24A" },
  { name: "MongoDB", cat: "Database", color: "#4DB33D" },
  { name: "Firebase", cat: "Auth/Cloud", color: "#FFCA28" },
  { name: "Framer Motion", cat: "Animation", color: "#0055FF" },
  { name: "Razorpay", cat: "Payments", color: "#3395FF" },
  { name: "Vercel", cat: "Hosting", color: "#ffffff" },
  { name: "Cloudinary", cat: "Media", color: "#F05A28" },
  { name: "WhatsApp API", cat: "Automation", color: "#25D366" },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND, url: SITE_URL, logo: LOGO_URL,
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", telephone: "+917020708747", email: EMAIL, areaServed: "IN", availableLanguage: ["en", "hi"] }],
    sameAs: SOCIALS,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <BreadcrumbsLd items={[{ name: "Home", url: `${SITE_URL}/` }, { name: "About", url: `${SITE_URL}/about` }]} />
      <Seo
        title="About Prajyot Infotech — Software & Web Development Company in India"
        description="Learn about Prajyot Infotech, a professional software development company in India building custom websites, mobile apps, CRM, ERP, inventory software, and business automation solutions for SMBs."
        keywords="Prajyot Infotech, software development company India, web development company, about us, business digitalization India"
        path="/about"
        schema={[orgLd, faqLd, { "@context": "https://schema.org", "@type": "AboutPage", "@id": `${SITE_URL}/about#webpage`, url: `${SITE_URL}/about`, name: "About Prajyot Infotech", isPartOf: { "@id": `${SITE_URL}/#website` } }]}
      />

      <main role="main" className="overflow-x-hidden">

        {/* ═══ HERO ═══ */}
        <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#05030f]">
          {/* Ambient orbs */}
          <FloatingOrb color="#7c3aed" size={600} blur={120} style={{ top: -100, left: -150 }} />
          <FloatingOrb color="#4f46e5" size={500} blur={100} style={{ bottom: -80, right: -100 }} />
          <FloatingOrb color="#ec4899" size={300} blur={90} style={{ top: "40%", left: "50%" }} />

          {/* Animated grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="absolute rounded-full bg-brand-400/30"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-sm mb-6">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Est. 2018 — Pune, Maharashtra
                </span>

                <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                  We Build
                  <br />
                  <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                    Digital Products
                  </span>
                  <br />
                  That Matter
                </h1>

                <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
                  Prajyot Infotech is a full-stack product studio helping Indian businesses transform ideas
                  into fast, beautiful, revenue-generating software — websites, apps, SaaS, and automation.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <motion.a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi ${BRAND}, I'd like a free consultation.`)}`}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 px-7 py-3.5 text-white font-semibold shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow"
                  >
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp Us
                  </motion.a>
                  <motion.a
                    href={`mailto:${EMAIL}`}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-white font-semibold hover:bg-white/10 transition-all"
                  >
                    Email Us
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Right: 3D Visual */}
            <div className="relative hidden lg:flex items-center justify-center h-[500px]">
              {/* Central laptop */}
              <motion.div
                className="relative z-10 w-80 h-64"
                initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0, y: [0, -12, 0] }}
                transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
                style={{ filter: "drop-shadow(0 30px 60px rgba(124,58,237,0.4))" }}
              >
                <IsometricLaptop />
              </motion.div>

              {/* Orbiting phone */}
              <motion.div
                className="absolute w-24 h-36"
                style={{ right: "8%", top: "10%" }}
                animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <IsometricPhone />
              </motion.div>

              {/* Floating stat chips */}
              {[
                { label: "50+ Projects", top: "8%", left: "2%", color: "from-violet-600 to-brand-600" },
                { label: "< 20 Days", bottom: "12%", right: "5%", color: "from-pink-600 to-rose-600" },
                { label: "100% Ownership", bottom: "30%", left: "0%", color: "from-emerald-600 to-teal-600" },
              ].map((chip) => (
                <motion.div
                  key={chip.label}
                  className={`absolute bg-gradient-to-r ${chip.color} text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg`}
                  style={{ top: chip.top, bottom: chip.bottom, left: chip.left, right: chip.right }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
                >
                  {chip.label}
                </motion.div>
              ))}

              {/* Glow ring */}
              <div
                aria-hidden
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)" }}
              />
            </div>
          </div>

          {/* Bottom fade */}
          <div aria-hidden className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
        </section>

        {/* ═══ STATS ═══ */}
        <section className="relative bg-slate-50 py-20" aria-label="Company stats">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { v: 50, s: "+", l: "Projects Shipped",
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden><path d="M12 2L2 7l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  },
                  { v: 6, s: "+", l: "Years of Expertise",
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  },
                  { v: 8, s: "+", l: "Industries Served",
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden><path d="M3 21V9l9-6 9 6v12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                  },
                  { v: 100, s: "%", l: "Code Ownership",
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" aria-hidden><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="16" r="1.5" fill="currentColor"/></svg>
                  },
                ].map((stat, i) => (
                  <TiltCard key={stat.l}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12, duration: 0.6 }}
                      className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white p-8 shadow-lg shadow-brand-500/5 hover:shadow-xl hover:shadow-brand-500/10 transition-all"
                    >
                      <div aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-brand-500/5 group-hover:bg-brand-500/10 transition-colors" />
                      <div className="text-brand-600 mb-3">{stat.icon}</div>
                      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">
                        <AnimatedCounter target={stat.v} suffix={stat.s} />
                      </div>
                      <div className="mt-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.l}</div>
                    </motion.div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ WHO WE ARE ═══ */}
        <section className="relative py-24 bg-white overflow-hidden" aria-label="Who we are">
          <FloatingOrb color="#7c3aed" size={400} blur={100} style={{ top: "10%", right: "-100px", opacity: 0.07 }} />
          <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Phone visual */}
            <Reveal>
              <div className="relative flex items-center justify-center h-80 lg:h-[480px]">
                <motion.div
                  className="relative z-10 w-48 h-72"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 40px 80px rgba(124,58,237,0.45))" }}
                >
                  <IsometricPhone />
                </motion.div>

                {/* Orbiting mini dots */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    aria-hidden
                    className="absolute rounded-full"
                    style={{
                      width: 10 + i * 4,
                      height: 10 + i * 4,
                      background: `hsl(${260 + i * 20}, 70%, 60%)`,
                      boxShadow: `0 0 20px hsl(${260 + i * 20}, 70%, 60%)`,
                    }}
                    animate={{
                      x: [0, Math.cos((i * Math.PI) / 2) * 110, 0],
                      y: [0, Math.sin((i * Math.PI) / 2) * 110, 0],
                    }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  />
                ))}

                {/* Glow */}
                <div
                  aria-hidden
                  className="absolute size-64 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)" }}
                />
              </div>
            </Reveal>

            {/* Right: Content */}
            <Reveal delay={0.2}>
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 mb-3">Who We Are</span>
              <h2 className="text-4xl md:text-5xl font-black text-navy-800 leading-tight">
                A studio for<br />
                <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">modern digital</span><br />
                products
              </h2>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                We are a hands-on product studio specializing in high-performance web and mobile development.
                We keep things simple: understand your business deeply, design a clean customer journey, and
                ship a polished product — fast, beautiful, and built to scale.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { role: "Client Success Lead", dept: "Sales & Onboarding",
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
                    desc: "Your first point of contact — from discovery to onboarding. Clear timelines, smooth communication." },
                  { role: "Product & Engineering", dept: "Architecture & Delivery",
                    icon: <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
                    desc: "Leads architecture, API, and frontend execution. Speed, UX quality, and scalable code." },
                ].map(c => (
                  <TiltCard key={c.role}>
                    <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-5 shadow-md hover:shadow-lg transition-all h-full">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center text-brand-600 shadow-sm">
                          {c.icon}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{c.role}</div>
                          <div className="text-xs text-brand-600 font-semibold">{c.dept}</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ PROCESS ═══ */}
        <ProcessRoadmap />

        {/* ═══ PRINCIPLES ═══ */}
        <section className="py-24 bg-white" aria-label="Principles we work by">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 mb-3">Our Values</span>
                <h2 className="text-4xl md:text-5xl font-black text-navy-800">
                  Principles we{" "}
                  <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">work by</span>
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.label} delay={i * 0.1}>
                  <TiltCard className="h-full">
                    <div className="group relative overflow-hidden h-full rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-7 shadow-md hover:shadow-xl hover:shadow-brand-500/10 transition-all">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${p.accent || 'from-brand-500 to-violet-500'} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity`}
                        aria-hidden
                      />
                      <div className="text-brand-600 group-hover:text-brand-700 transition-colors mb-4 flex-shrink-0">{p.icon}</div>
                      <h3 className="font-bold text-navy-800 text-lg mb-2">{p.label}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                      {/* Accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-500 to-violet-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-3xl" />
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TECH STACK ═══ */}
        <section className="py-24 bg-slate-50" aria-label="Technologies we use">
          <div className="mx-auto max-w-7xl px-4">
            <Reveal>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 mb-3">Our Stack</span>
                <h2 className="text-4xl md:text-5xl font-black text-navy-800">
                  Battle-tested{" "}
                  <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">technologies</span>
                </h2>
                <p className="mt-4 text-slate-600 max-w-xl mx-auto">Modern tools that keep your product fast, secure, and easy to scale.</p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {TECH_STACK.map((tech, i) => (
                <Reveal key={tech.name} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:shadow-md cursor-default transition-shadow"
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `radial-gradient(circle at center, ${tech.color}18 0%, transparent 70%)` }}
                    />
                    <div
                      className="size-3 rounded-full mx-auto mb-3"
                      style={{ background: tech.color, boxShadow: `0 0 12px ${tech.color}` }}
                    />
                    <div className="font-bold text-slate-800 text-sm">{tech.name}</div>
                    <div className="mt-1 text-xs text-brand-500 font-semibold">{tech.cat}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="py-24 bg-white" aria-label="Frequently asked questions">
          <div className="mx-auto max-w-3xl px-4">
            <Reveal>
              <div className="text-center mb-14">
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-600 mb-3">FAQ</span>
                <h2 className="text-4xl md:text-5xl font-black text-navy-800">
                  Common{" "}
                  <span className="bg-gradient-to-r from-brand-600 to-violet-600 bg-clip-text text-transparent">questions</span>
                </h2>
              </div>
            </Reveal>

            <div className="space-y-3">
              {faqs.map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <motion.div
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    layout
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-semibold text-slate-900">{item.q}</span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0 size-7 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 font-bold"
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="relative py-28 overflow-hidden bg-[#05030f]" aria-label="Start your project">
          <FloatingOrb color="#7c3aed" size={500} blur={120} style={{ top: -100, left: "10%" }} />
          <FloatingOrb color="#ec4899" size={400} blur={100} style={{ bottom: -80, right: "5%" }} />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-sm mb-6">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                Currently accepting new projects
              </span>

              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Ready to build
                <br />
                <span className="bg-gradient-to-r from-brand-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  something great?
                </span>
              </h2>

              <p className="mt-6 text-xl text-white/50 max-w-2xl mx-auto">
                Get a free 15-minute consultation. We'll map your features, timeline, and best tech stack — no obligation, just clarity.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <motion.a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi ${BRAND}, I'd like a free 15-min consultation.`)}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-600 via-violet-600 to-pink-600 px-8 py-4 text-white font-bold text-lg shadow-2xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-shadow"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Start on WhatsApp
                </motion.a>
                <motion.a
                  href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Project Enquiry — ${BRAND}`)}`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-8 py-4 text-white font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Email Us
                </motion.a>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
