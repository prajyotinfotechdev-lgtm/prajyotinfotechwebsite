import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// ─── PREMIUM SVG MOCKUPS ─────────────────────────────────────────────────────

function MockupPhone({ accent, secondary }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={`gradPhone-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>
      {/* Phone Body */}
      <rect x="75" y="10" width="50" height="100" rx="10" fill="#111827" stroke={`url(#gradPhone-${accent})`} strokeWidth="1" />
      <rect x="85" y="10" width="30" height="4" rx="2" fill="#030712" />
      <rect x="79" y="18" width="42" height="88" rx="6" fill="#0B1120" />
      {/* UI Elements */}
      <rect x="83" y="24" width="34" height="6" rx="2" fill={accent} opacity="0.4" />
      <rect x="83" y="34" width="22" height="3" rx="1.5" fill={secondary} opacity="0.7" />
      <rect x="83" y="41" width="34" height="12" rx="3" fill="#1F2937" />
      <rect x="83" y="57" width="15" height="15" rx="3" fill="#1F2937" />
      <rect x="102" y="57" width="15" height="15" rx="3" fill="#1F2937" />
      <rect x="83" y="76" width="34" height="4" rx="2" fill="#374151" />
      <rect x="83" y="84" width="24" height="4" rx="2" fill="#374151" />
      {/* Floating Sparkles */}
      <circle cx="140" cy="30" r="2" fill={accent} opacity="0.6" />
      <circle cx="60" cy="90" r="1.5" fill={secondary} opacity="0.5" />
      <circle cx="130" cy="80" r="1" fill={accent} opacity="0.4" />
    </svg>
  );
}

function MockupTablet({ accent, secondary }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={`gradTablet-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>
      {/* Tablet Body */}
      <rect x="40" y="25" width="120" height="80" rx="8" fill="#111827" stroke={`url(#gradTablet-${accent})`} strokeWidth="1" />
      <rect x="44" y="29" width="112" height="72" rx="4" fill="#0B1120" />
      {/* Left Sidebar */}
      <rect x="44" y="29" width="24" height="72" fill="#111827" />
      <rect x="48" y="35" width="16" height="4" rx="2" fill={accent} opacity="0.8" />
      <rect x="48" y="45" width="12" height="3" rx="1.5" fill="#374151" />
      <rect x="48" y="52" width="12" height="3" rx="1.5" fill="#374151" />
      <rect x="48" y="59" width="12" height="3" rx="1.5" fill="#374151" />
      {/* Main Content Area */}
      <rect x="74" y="35" width="40" height="6" rx="2" fill={secondary} opacity="0.5" />
      <rect x="135" y="35" width="15" height="6" rx="2" fill={accent} opacity="0.8" />
      {/* Cards */}
      <rect x="74" y="47" width="36" height="20" rx="3" fill="#1F2937" />
      <rect x="114" y="47" width="36" height="20" rx="3" fill="#1F2937" />
      <rect x="74" y="71" width="76" height="22" rx="3" fill="#1F2937" />
      {/* Data Lines */}
      <rect x="78" y="51" width="15" height="3" rx="1.5" fill="#374151" />
      <rect x="78" y="58" width="25" height="4" rx="2" fill={accent} />
      <rect x="118" y="51" width="15" height="3" rx="1.5" fill="#374151" />
      <rect x="118" y="58" width="20" height="4" rx="2" fill={secondary} />
      {/* Floating Sparkles */}
      <circle cx="30" cy="40" r="2.5" fill={accent} opacity="0.6" />
      <circle cx="170" cy="70" r="1.5" fill={secondary} opacity="0.5" />
    </svg>
  );
}

function MockupDashboard({ accent, secondary }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={`gradDash-${accent}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={accent} />
          <stop offset="1" stopColor={secondary} />
        </linearGradient>
      </defs>
      {/* Browser Window */}
      <rect x="25" y="15" width="150" height="90" rx="6" fill="#111827" stroke={`url(#gradDash-${accent})`} strokeWidth="1" />
      <rect x="25" y="15" width="150" height="12" fill="#0B1120" />
      <circle cx="32" cy="21" r="1.5" fill="#EF4444" opacity="0.8" />
      <circle cx="37" cy="21" r="1.5" fill="#F59E0B" opacity="0.8" />
      <circle cx="42" cy="21" r="1.5" fill="#10B981" opacity="0.8" />
      {/* Dashboard Topbar */}
      <rect x="25" y="27" width="150" height="10" fill="#1F2937" />
      <rect x="32" y="30" width="20" height="4" rx="2" fill={accent} opacity="0.8" />
      <rect x="155" y="30" width="12" height="4" rx="2" fill="#374151" />
      {/* Chart Area */}
      <rect x="32" y="42" width="90" height="35" rx="3" fill="#1F2937" />
      <path d="M35 70 L55 55 L75 60 L95 45 L115 50" stroke={accent} strokeWidth="1.5" fill="none" strokeLinejoin="round" />
      <circle cx="55" cy="55" r="1.5" fill={secondary} />
      <circle cx="75" cy="60" r="1.5" fill={secondary} />
      <circle cx="95" cy="45" r="1.5" fill={secondary} />
      {/* Side Widgets */}
      <rect x="127" y="42" width="40" height="15" rx="3" fill="#1F2937" />
      <rect x="131" y="46" width="15" height="3" rx="1.5" fill="#374151" />
      <rect x="131" y="52" width="25" height="2" rx="1" fill={secondary} />
      <rect x="127" y="62" width="40" height="15" rx="3" fill="#1F2937" />
      <rect x="131" y="66" width="15" height="3" rx="1.5" fill="#374151" />
      <rect x="131" y="72" width="20" height="2" rx="1" fill={accent} />
      {/* Bottom Table */}
      <rect x="32" y="82" width="135" height="15" rx="3" fill="#1F2937" />
      <rect x="36" y="85" width="20" height="2" rx="1" fill="#374151" />
      <rect x="70" y="85" width="40" height="2" rx="1" fill="#374151" />
      <rect x="130" y="85" width="30" height="2" rx="1" fill="#374151" />
      {/* Floating Sparkles */}
      <circle cx="10" cy="50" r="2" fill={secondary} opacity="0.6" />
      <circle cx="185" cy="95" r="1.5" fill={accent} opacity="0.5" />
    </svg>
  );
}

// ─── PROJECT DATA ────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "restaurant-management",
    tag: "Hospitality",
    tagColor: "from-orange-400 to-red-500",
    year: 2025,
    title: "Restaurant Management System",
    shortDesc: "Complete digital restaurant — QR menus, live table orders, kitchen display screen, and WhatsApp confirmations.",
    fullDesc: "A full-stack restaurant management platform that digitizes the entire dining experience. Guests scan a table QR code, browse the live menu, and place orders directly. Orders appear on a real-time kitchen display screen. Managers control item availability, pricing, and offers from a central admin panel.",
    results: ["Order errors reduced to 0%", "Table turnover improved 35%", "Staff reduced by 2 per shift", "WhatsApp order receipts automated"],
    features: ["QR code table menus", "Live kitchen display screen", "WhatsApp order confirmations", "Admin panel with item toggle", "GST billing & reports", "Multi-branch support"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp API", "Razorpay", "Firebase"],
    metrics: { label: "Avg. order time reduced", value: "-35%", sub: "vs paper-based system" },
    gradient: "from-orange-500/20 via-red-400/10 to-transparent",
    accent: "#f97316",
    secondary: "#ef4444",
    mockupType: "Tablet",
  },
  {
    id: "mobile-shop-management",
    tag: "Retail",
    tagColor: "from-blue-400 to-indigo-500",
    year: 2025,
    title: "Mobile Shop Management System",
    shortDesc: "End-to-end system for mobile/electronics retailers — billing, repair tracking, inventory, and customer CRM.",
    fullDesc: "A complete business management suite for mobile phone and electronics retailers. Handles new phone sales with IMEI tracking, repair job cards with status updates, GST billing, inventory management, and customer follow-up via WhatsApp. Staff can generate PDF bills in seconds.",
    results: ["Billing time cut from 10 min to 1 min", "Zero inventory discrepancies", "Repair jobs tracked end-to-end", "Customer repeat rate improved"],
    features: ["IMEI-based sales & stock tracking", "Repair job card management", "GST billing with PDF export", "Customer WhatsApp follow-ups", "Vendor & purchase management", "Dashboard with daily/monthly reports"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Cloudinary"],
    metrics: { label: "Billing time reduced", value: "90%", sub: "from 10 min to under 1 min" },
    gradient: "from-blue-500/20 via-indigo-400/10 to-transparent",
    accent: "#6366f1",
    secondary: "#3b82f6",
    mockupType: "Phone",
  },
  {
    id: "jollybaba-ecommerce",
    tag: "E-Commerce",
    tagColor: "from-emerald-400 to-teal-500",
    year: 2024,
    title: "JollyBaba Mobiles — Online Store",
    shortDesc: "Full-featured electronics e-commerce with dealer/retail pricing, fuzzy search, cart, and WhatsApp order fallback.",
    fullDesc: "A sophisticated e-commerce storefront for a mobile phone retailer. Supports dual pricing (retail vs. dealer) visible based on user role, fuzzy product search with typo tolerance, animated cart, Razorpay checkout, and a WhatsApp order fallback for customers who don't want to pay online.",
    results: ["Search CTR up 28%", "Cart abandonment down 18%", "Dealer orders fully automated", "50+ SKUs searchable instantly"],
    features: ["Retail & dealer price toggle", "Fuzzy search with typo fix", "Animated cart with WhatsApp fallback", "Razorpay/UPI checkout", "Bulk CSV product import", "Cloudinary image hosting"],
    stack: ["React", "React Native", "Node.js", "MongoDB", "Razorpay", "Cloudinary"],
    metrics: { label: "Search click-through rate", value: "+28%", sub: "after implementing fuzzy search" },
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    accent: "#10b981",
    secondary: "#14b8a6",
    mockupType: "Phone",
  },
  {
    id: "clinic-management",
    tag: "Healthcare",
    tagColor: "from-rose-400 to-pink-500",
    year: 2024,
    title: "Clinic Management System",
    shortDesc: "Patient records, appointment booking, prescription generator, billing, and WhatsApp appointment reminders.",
    fullDesc: "A HIPAA-aware clinic management platform for small-to-mid size clinics and doctors. Manages patient registration, medical history, appointment scheduling, prescription generation with PDF output, and automated WhatsApp appointment reminders. Billing handles consultation fees, tests, and medicines.",
    results: ["No-show rate reduced 40%", "Prescription time cut to 2 min", "Patient records instantly searchable", "WhatsApp reminders automated"],
    features: ["Patient profile & medical history", "Appointment booking calendar", "Prescription generator with PDF", "Automated WhatsApp reminders", "Consultation & medicine billing", "Doctor-wise reports"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp API", "Firebase Auth", "Cloudinary"],
    metrics: { label: "Patient no-show rate", value: "-40%", sub: "via WhatsApp appointment reminders" },
    gradient: "from-rose-500/20 via-pink-400/10 to-transparent",
    accent: "#f43f5e",
    secondary: "#ec4899",
    mockupType: "Tablet",
  },
  {
    id: "vyapaariyo-saas",
    tag: "SaaS",
    tagColor: "from-violet-400 to-purple-500",
    year: 2024,
    title: "Vyapaariyo — B2B Catalog SaaS",
    shortDesc: "Multi-tenant SaaS where sellers get their own catalog website with logo, products, and custom pricing.",
    fullDesc: "A SaaS platform that gives every registered seller their own catalog website — complete with their logo, product listings, pricing, and custom domain. Sellers can bulk-import products via CSV, manage inventory, and share their catalog URL with clients. A super-admin manages billing and seller accounts.",
    results: ["20+ sellers onboarded in month 1", "Seller setup time under 3 min", "Zero hosting overhead per seller", "Bulk CSV import with images"],
    features: ["Multi-tenant architecture", "Per-seller custom catalog site", "CSV bulk product import", "Cloudinary image hosting", "Role-based admin & seller access", "Subscription billing"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Razorpay"],
    metrics: { label: "Seller onboarding time", value: "< 3 min", sub: "guided wizard from signup to live" },
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
    accent: "#8b5cf6",
    secondary: "#a855f7",
    mockupType: "Dashboard",
  },
  {
    id: "wholesale-order-management",
    tag: "Wholesale",
    tagColor: "from-amber-400 to-yellow-500",
    year: 2025,
    title: "Wholesale Order Management System",
    shortDesc: "High-volume wholesale order tracking with GST billing, inventory, party ledgers, and delivery management.",
    fullDesc: "A robust order management system for FMCG and wholesale distributors handling 500+ orders per day. Tracks orders from placement to delivery, manages multi-warehouse inventory, generates GST-compliant invoices, maintains party-wise ledgers, and sends delivery confirmations via WhatsApp.",
    results: ["500+ orders/day managed smoothly", "Invoice generation under 30 sec", "Zero billing disputes", "Delivery confirmation automated"],
    features: ["Party & vendor ledger management", "Multi-warehouse inventory", "GST invoice & e-way bill", "Delivery tracking & confirmation", "Daily sales & outstanding reports", "WhatsApp delivery alerts"],
    stack: ["React", "Node.js", "MongoDB", "Express", "WhatsApp API", "Razorpay"],
    metrics: { label: "Orders managed daily", value: "500+", sub: "with zero manual errors" },
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    accent: "#f59e0b",
    secondary: "#eab308",
    mockupType: "Dashboard",
  },
  {
    id: "coaching-management",
    tag: "Education",
    tagColor: "from-sky-400 to-cyan-500",
    year: 2025,
    title: "Coaching Center Management System",
    shortDesc: "Student portal, batch management, attendance, fee collection, and WhatsApp communication for coaching institutes.",
    fullDesc: "A complete management system for coaching centers and educational institutes. Handles student enrollment, batch/class management, digital attendance tracking, fee collection with reminders, exam marks entry, and result generation. Parents receive WhatsApp updates on fees and attendance automatically.",
    results: ["Fee collection automated 100%", "Attendance tracking real-time", "Parent communication automated", "Zero pending fee confusion"],
    features: ["Student enrollment & profiles", "Batch & faculty management", "Digital attendance system", "Fee collection with reminders", "Exam results & mark sheets", "WhatsApp parent updates"],
    stack: ["React", "Node.js", "MongoDB", "Firebase Auth", "WhatsApp API", "Cloudinary"],
    metrics: { label: "Fee collection efficiency", value: "100%", sub: "automated reminders & online payment" },
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
    accent: "#0ea5e9",
    secondary: "#06b6d4",
    mockupType: "Phone",
  },
  {
    id: "real-estate-crm",
    tag: "Real Estate",
    tagColor: "from-teal-400 to-green-500",
    year: 2024,
    title: "Real Estate CRM & Lead Manager",
    shortDesc: "Property listings website, lead capture, follow-up CRM, and WhatsApp automation for real estate agents and builders.",
    fullDesc: "A lead generation and management platform for real estate agents and builders. The public-facing website showcases properties with filters, images, and virtual tour links. Enquiries feed into a CRM with lead scoring, follow-up scheduling, and automated WhatsApp messages to warm leads.",
    results: ["Lead response time under 2 min", "Follow-up rate 100% automated", "Property listings SEO-optimized", "Conversion rate improved 25%"],
    features: ["Property listing website", "Lead capture & CRM", "WhatsApp follow-up automation", "Lead scoring & priority tags", "Site visit scheduling", "Agent performance dashboard"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp API", "Cloudinary", "Firebase"],
    metrics: { label: "Lead conversion rate", value: "+25%", sub: "with automated follow-up system" },
    gradient: "from-teal-500/20 via-green-400/10 to-transparent",
    accent: "#14b8a6",
    secondary: "#22c55e",
    mockupType: "Dashboard",
  },
];

const TAGS = ["All", "Hospitality", "Retail", "E-Commerce", "Healthcare", "SaaS", "Wholesale", "Education", "Real Estate"];

// ─── 3D PROJECT CARD ─────────────────────────────────────────────────────────
function ProjectCard({ project, index, onSelect, prefersReducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const Mockup = project.mockupType === "Phone" ? MockupPhone : project.mockupType === "Tablet" ? MockupTablet : MockupDashboard;

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.08, ease: "easeOut" }}
      whileHover={prefersReducedMotion ? {} : { y: -8, rotateX: 3, rotateY: -2 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative cursor-pointer flex flex-col rounded-3xl border border-slate-200/80 bg-white shadow-lg shadow-slate-200/60 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-300/40 hover:border-slate-300/60 overflow-hidden"
      onClick={() => onSelect(project)}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} case study`}
      onKeyDown={(e) => e.key === "Enter" && onSelect(project)}
    >
      {/* Card shell */}
      <div className="relative">

        {/* Hero area — gradient + floating elements */}
        <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.gradient} bg-slate-50 flex items-center justify-center`}>
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />

          {/* 3D Mockup Component */}
          <motion.div
            animate={hovered && !prefersReducedMotion ? { y: -5, rotateZ: -1, scale: 1.05 } : { y: 0, rotateZ: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full absolute inset-0 flex items-center justify-center p-6"
            style={{ transformStyle: "preserve-3d" }}
          >
             <Mockup accent={project.accent} secondary={project.secondary} />
          </motion.div>

          {/* Ambient Glow Orb */}
          <motion.div
            animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent)`, opacity: 0.15, filter: "blur(20px)" }}
          />

          {/* Tag pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${project.tagColor} px-3 py-1 text-[11px] font-bold text-white shadow-md`}>
              {project.tag}
            </span>
          </div>

          {/* Year */}
          <div className="absolute top-4 right-4 z-10">
            <span className="rounded-full bg-white/50 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-600 shadow-sm border border-white/40">
              {project.year}
            </span>
          </div>

          {/* Glint on hover */}
          <motion.div
            animate={hovered && !prefersReducedMotion ? { opacity: 1, x: "200%" } : { opacity: 0, x: "-100%" }}
            transition={{ duration: 0.6 }}
            className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
          />
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-[17px] font-black text-navy-800 leading-snug group-hover:text-brand-700 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Metric highlight */}
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">{project.metrics.label}</p>
            <p className="text-xl font-black text-gradient mt-0.5">{project.metrics.value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{project.metrics.sub}</p>
          </div>

          {/* Tech stack pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                {t}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-slate-400">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* View details CTA */}
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700">
            <span>View case study</span>
            <motion.span
              animate={hovered && !prefersReducedMotion ? { x: 4 } : { x: 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden
            >→</motion.span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── PROJECT DETAIL MODAL ────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-navy-900/60 backdrop-blur-md" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header gradient */}
          <div className={`relative h-44 rounded-t-3xl overflow-hidden bg-gradient-to-br ${project.gradient} bg-slate-50`}>
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
              backgroundSize: "28px 28px"
            }} />
            <div className="absolute left-6 bottom-5">
              <span className="text-5xl">{project.icon}</span>
              <span className={`ml-3 inline-flex items-center rounded-full bg-gradient-to-r ${project.tagColor} px-3 py-1 text-[11px] font-bold text-white`}>
                {project.tag}
              </span>
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/90 text-slate-600 hover:bg-white shadow-md transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-navy-800">{project.title}</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{project.fullDesc}</p>

            {/* Key metric */}
            <div className="mt-5 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wide">{project.metrics.label}</p>
              <p className="text-3xl font-black text-gradient mt-1">{project.metrics.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{project.metrics.sub}</p>
            </div>

            {/* Results */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wide mb-3">Results Achieved</h3>
              <ul className="space-y-2">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <span className="mt-1 size-4 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: project.accent + "25" }}>
                      <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={project.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wide mb-3">Features Built</h3>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-700 font-medium">
                    <span className="size-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Stack */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-navy-800 uppercase tracking-wide mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WA(`Hi Prajyot Infotech, I'm interested in a ${project.title} similar to what you've built. Can we discuss?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-3 text-center font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Build Something Similar
              </a>
              <Link
                to="/estimate"
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-slate-200 px-5 py-3 text-center font-semibold text-navy-800 hover:border-brand-300 hover:bg-brand-50/50 transition-all"
              >
                Estimate Cost
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Work() {
  const [activeTag, setActiveTag] = useState("All");
  const [selected, setSelected] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const filtered = activeTag === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tag === activeTag);

  const itemListLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://prajyotinfotech.in/work/#webpage",
        "url": "https://prajyotinfotech.in/work",
        "name": "Projects & Portfolio | Prajyot Infotech",
        "description": "Explore Prajyot Infotech's real software projects built for Indian businesses.",
        "isPartOf": { "@id": "https://prajyotinfotech.in/#website" }
      },
      {
        "@type": "ItemList",
        "name": "Prajyot Infotech — Software Development Projects Portfolio",
        "description": "Real software projects built by Prajyot Infotech for Indian businesses — restaurant management, mobile shop billing, e-commerce, clinic systems, wholesale management, and more.",
        "itemListElement": PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": p.title,
          "description": p.shortDesc,
          "url": `https://prajyotinfotech.in/work#${p.id}`,
        })),
      }
    ]
  };

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: "https://prajyotinfotech.in/" },
        { name: "Our Work", url: "https://prajyotinfotech.in/work" },
      ]} />
      <Seo
        title="Projects & Portfolio — Restaurant, Mobile Shop, Clinic, E-Commerce | Prajyot Infotech"
        description="Explore Prajyot Infotech's real software projects: Restaurant Management System, Mobile Shop Billing, Clinic Management, Wholesale Order System, E-Commerce, and more. Built for Indian businesses."
        keywords="restaurant management system, mobile shop management system, clinic management software, wholesale order management, e-commerce development India, custom software portfolio, Prajyot Infotech projects"
        path="/work"
        schema={itemListLd}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-900 px-4 py-20 md:py-28">
        {/* 3D Grid background */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />

        {/* Glow orbs */}
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-brand-600/30 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 right-0 size-96 rounded-full bg-violet-600/20 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm mb-6">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              {PROJECTS.length} Real Projects Built
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl">
              Software we've built for{" "}
              <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
                real Indian businesses
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              From restaurant QR menus to mobile shop billing systems — every project here was designed, built, and delivered to a real client. Click any card to see exactly what we built and the results achieved.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { v: "50+", l: "Projects Delivered" },
              { v: "8+", l: "Industries" },
              { v: "6+", l: "Years Experience" },
              { v: "100%", l: "Code Ownership" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
                <p className="text-3xl font-black bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">{s.v}</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wide font-medium">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="sticky top-16 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 overflow-x-auto py-3 no-scrollbar">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  activeTag === t
                    ? "border-brand-600 bg-brand-600 text-white shadow-md shadow-brand-500/25"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT GRID */}
      <main className="mx-auto max-w-7xl px-4 py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onSelect={setSelected}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-slate-200/80 bg-gradient-to-br from-brand-600 via-brand-700 to-navy-800 p-8 md:p-12 text-center overflow-hidden relative shadow-2xl shadow-brand-500/20">
          <div className="absolute inset-0 opacity-[0.06]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 size-64 bg-brand-400/30 blur-[80px] rounded-full pointer-events-none"
          />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Want something like this for your business?
            </h2>
            <p className="mt-3 text-white/80 max-w-xl mx-auto">
              Tell us your idea on WhatsApp. We'll reply within 2 hours with a plan, timeline, and fixed price.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={WA("Hi Prajyot Infotech, I saw your portfolio and I want to build a similar system for my business.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-7 py-3.5 font-bold text-brand-700 shadow-lg hover:bg-white/90 transition-all hover:scale-[1.02] flex items-center justify-center"
              >
                WhatsApp Us Now
              </a>
              <Link
                to="/estimate"
                className="rounded-xl border-2 border-white/60 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Estimate Project Cost
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}

      {/* Prevent scrollbar jump from modal */}
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </>
  );
}
