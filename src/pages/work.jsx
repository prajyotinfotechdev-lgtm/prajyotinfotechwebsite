import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import PortfolioDemoModal from "../components/PortfolioDemoModal.jsx";
import PortfolioSpotlight from "../components/PortfolioSpotlight.jsx";
import ProjectEstimator from "../components/ProjectEstimator.jsx";
import EngineeringProcess from "../components/EngineeringProcess.jsx";
import TrustGuarantees from "../components/TrustGuarantees.jsx";
import {
  Search,
  Grid,
  Table as TableIcon,
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Cpu,
  Sparkles,
  ShieldCheck,
  Smartphone,
  Layers,
  Check,
  X,
  Server,
  Database,
  SlidersHorizontal,
  FileText
} from "lucide-react";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// ─── SVG SCHEMATIC GRAPHICS ──────────────────────────────────────────────────

function MockupPhone({ accent, secondary }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={`gradPhone-${accent.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>
      <rect x="75" y="10" width="50" height="100" rx="10" fill="#0b1120" stroke={`url(#gradPhone-${accent.replace("#", "")})`} strokeWidth="1.5" />
      <rect x="85" y="10" width="30" height="4" rx="2" fill="#030712" />
      <rect x="79" y="18" width="42" height="88" rx="6" fill="#040711" />
      <rect x="83" y="24" width="34" height="6" rx="2" fill={accent} opacity="0.8" />
      <rect x="83" y="34" width="22" height="3" rx="1.5" fill={secondary} opacity="0.9" />
      <rect x="83" y="41" width="34" height="14" rx="3" fill="#1e293b" />
      <rect x="83" y="59" width="15" height="15" rx="3" fill="#1e293b" />
      <rect x="102" y="59" width="15" height="15" rx="3" fill="#1e293b" />
      <rect x="83" y="78" width="34" height="4" rx="2" fill="#334155" />
      <rect x="83" y="86" width="24" height="4" rx="2" fill="#334155" />
      <circle cx="145" cy="28" r="2.5" fill={accent} opacity="0.8" />
      <circle cx="55" cy="85" r="2" fill={secondary} opacity="0.8" />
    </svg>
  );
}

function MockupTablet({ accent, secondary }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={`gradTablet-${accent.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>
      <rect x="40" y="20" width="120" height="82" rx="8" fill="#0b1120" stroke={`url(#gradTablet-${accent.replace("#", "")})`} strokeWidth="1.5" />
      <rect x="44" y="24" width="112" height="74" rx="4" fill="#040711" />
      <rect x="44" y="24" width="26" height="74" fill="#0f172a" />
      <rect x="48" y="30" width="18" height="4" rx="2" fill={accent} opacity="0.9" />
      <rect x="48" y="40" width="14" height="3" rx="1.5" fill="#334155" />
      <rect x="48" y="47" width="14" height="3" rx="1.5" fill="#334155" />
      <rect x="48" y="54" width="14" height="3" rx="1.5" fill="#334155" />
      <rect x="76" y="30" width="45" height="6" rx="2" fill={secondary} opacity="0.7" />
      <rect x="135" y="30" width="17" height="6" rx="2" fill={accent} opacity="0.9" />
      <rect x="76" y="42" width="38" height="22" rx="3" fill="#1e293b" />
      <rect x="118" y="42" width="34" height="22" rx="3" fill="#1e293b" />
      <rect x="76" y="68" width="76" height="24" rx="3" fill="#1e293b" />
      <circle cx="28" cy="38" r="3" fill={accent} opacity="0.8" />
      <circle cx="174" cy="65" r="2" fill={secondary} opacity="0.8" />
    </svg>
  );
}

function MockupDashboard({ accent, secondary }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full pointer-events-none">
      <defs>
        <linearGradient id={`gradDash-${accent.replace("#", "")}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>
      <rect x="25" y="14" width="150" height="92" rx="6" fill="#0b1120" stroke={`url(#gradDash-${accent.replace("#", "")})`} strokeWidth="1.5" />
      <rect x="25" y="14" width="150" height="12" fill="#030712" />
      <circle cx="32" cy="20" r="1.5" fill="#ef4444" />
      <circle cx="37" cy="20" r="1.5" fill="#f59e0b" />
      <circle cx="42" cy="20" r="1.5" fill="#10b981" />
      <rect x="25" y="26" width="150" height="10" fill="#0f172a" />
      <rect x="32" y="29" width="22" height="4" rx="2" fill={accent} opacity="0.9" />
      <rect x="32" y="42" width="90" height="38" rx="3" fill="#1e293b" />
      <path d="M35 70 L55 52 L75 58 L95 44 L115 48" stroke={accent} strokeWidth="2" fill="none" strokeLinejoin="round" />
      <circle cx="55" cy="52" r="2" fill={secondary} />
      <circle cx="75" cy="58" r="2" fill={secondary} />
      <circle cx="95" cy="44" r="2" fill={secondary} />
      <rect x="128" y="42" width="40" height="16" rx="3" fill="#1e293b" />
      <rect x="128" y="64" width="40" height="16" rx="3" fill="#1e293b" />
      <rect x="32" y="86" width="136" height="14" rx="3" fill="#1e293b" />
      <circle cx="12" cy="48" r="2.5" fill={secondary} opacity="0.8" />
      <circle cx="188" cy="90" r="2" fill={accent} opacity="0.8" />
    </svg>
  );
}

// ─── COMPREHENSIVE PROJECT REPOSITORY ────────────────────────────────────────

const PROJECTS = [
  {
    id: "restaurant-management",
    tag: "Hospitality",
    tagColor: "from-orange-400 to-red-500",
    year: 2025,
    title: "Restaurant Management System",
    client: "Copper Chimney & Urban Spice",
    shortDesc: "Complete digital restaurant — QR table menus, live kitchen display screen (KDS), split billing, and automated WhatsApp receipts.",
    fullDesc: "A full-stack restaurant management platform that digitizes the entire dining experience. Guests scan a table QR code, browse high-res live menus, and place orders directly without waiting for waiters. Orders stream instantly to a chef KDS. Managers control item availability, real-time GST billing, and customer analytics from a central admin panel.",
    architecture: "Event-Driven WebSockets + PWA Client",
    problem: {
      title: "Wait Time Chaos & Lost Paper Tickets",
      description: "During weekend rush hours, waitstaff was overwhelmed, handwriting handwritten KOT slips that frequently got lost or delayed by 25+ minutes.",
      painQuote: "We were losing angry customers who waited 40 minutes just for drinks and starters."
    },
    solution: {
      title: "Realtime QR Table Ordering + Live Chef KDS",
      description: "Engineered zero-download PWA table ordering synchronized directly with kitchen display tablets via WebSockets and automated WhatsApp bill dispatch."
    },
    roi: {
      title: "35% Faster Turnover & 0% Lost Tickets",
      description: "Eliminated paper slips entirely, reduced waiter staffing overhead by 2 people per shift, and cut table turn time from 45 min down to 29 min."
    },
    results: ["Order errors reduced to 0%", "Table turnover improved 35%", "Staff reduced by 2 per shift", "WhatsApp order receipts automated"],
    features: ["QR code table menus", "Live kitchen display screen", "WhatsApp order confirmations", "Admin panel with item toggle", "GST billing & reports", "Multi-branch support"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp Cloud API", "Razorpay", "TailwindCSS"],
    metrics: { label: "Table Turnover Speed", value: "+35%", sub: "45 min down to 29 min" },
    gradient: "from-orange-500/20 via-red-400/10 to-transparent",
    accent: "#f97316",
    secondary: "#ef4444",
    mockupType: "Tablet",
    scale: "14 Branches • 1,500+ Daily Orders",
  },
  {
    id: "mobile-shop-management",
    tag: "Retail",
    tagColor: "from-blue-400 to-indigo-500",
    year: 2025,
    title: "Mobile Shop POS & IMEI Billing System",
    client: "Shree Samarth Mobiles & Retailers",
    shortDesc: "End-to-end POS for electronics retailers — barcode/IMEI tracking, repair tracking job cards, GST billing, and WhatsApp follow-ups.",
    fullDesc: "A complete business management suite for mobile phone and electronics retailers. Handles new phone sales with serialized IMEI tracking, repair job cards with status alerts, GST billing with instant PDF export, inventory alerts, and customer follow-up via WhatsApp.",
    architecture: "Micro-Service REST API + Thermal Print Engine",
    problem: {
      title: "Manual IMEI Logging & Inventory Leakage",
      description: "Handwriting 15-digit IMEI serial numbers on physical carbon-copy bills caused 10-minute queues and untracked inventory mismatch.",
      painQuote: "Customer checkout lines stretched out the door during festive seasons, causing lost sales."
    },
    solution: {
      title: "Instant Barcode/IMEI Scanner & Auto GST Generator",
      description: "Deployed high-speed USB barcode scanner integration with instant thermal/PDF GST invoicing and automated WhatsApp PDF receipt delivery."
    },
    roi: {
      title: "Billing Time Cut from 10m to 45s",
      description: "Achieved 100% zero inventory discrepancies across 50,000+ units tracked and improved repeat repair service rate by 22%."
    },
    results: ["Billing time cut from 10 min to 45 sec", "Zero inventory discrepancies", "Repair jobs tracked end-to-end", "Customer repeat rate improved 22%"],
    features: ["IMEI-based sales & stock tracking", "Repair job card management", "GST billing with PDF export", "Customer WhatsApp follow-ups", "Vendor & purchase management", "Dashboard with daily/monthly reports"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Cloudinary"],
    metrics: { label: "Billing Time Reduced", value: "90%", sub: "from 10 min to under 45s" },
    gradient: "from-blue-500/20 via-indigo-400/10 to-transparent",
    accent: "#6366f1",
    secondary: "#3b82f6",
    mockupType: "Phone",
    scale: "50,000+ IMEIs Tracked • High Volume POS",
  },
  {
    id: "jollybaba-ecommerce",
    tag: "E-Commerce",
    tagColor: "from-emerald-400 to-teal-500",
    year: 2024,
    title: "JollyBaba Mobiles — B2B & B2C Store",
    client: "JollyBaba Electronics Network",
    shortDesc: "Electronics e-commerce with dual dealer/retail pricing, fuzzy search, cart drawer, and WhatsApp order fallback.",
    fullDesc: "A high-performance e-commerce storefront for an electronics retailer. Supports dual pricing (retail vs. dealer wholesale) toggled seamlessly based on authenticated user tier, typo-tolerant search, animated slide-out cart, Razorpay gateway, and a 1-click WhatsApp order fallback for regional buyers.",
    architecture: "Edge Cached Serverless + Fuzzy Search Engine",
    problem: {
      title: "Wholesale Dealers Calling Manually for Stock",
      description: "Hundreds of regional dealers called phone lines daily just to ask for wholesale rates and stock availability.",
      painQuote: "We spent 5 hours every single day answering repetitive price questions on phone calls."
    },
    solution: {
      title: "Role-Authenticated Dynamic B2B/B2C Storefront",
      description: "Built tiered role pricing with MOQ enforcement, instant typo-tolerant instant search, and automated 1-click WhatsApp ordering fallback."
    },
    roi: {
      title: "28% Conversion Surge & 100% Automated Ordering",
      description: "Wholesale dealers now order bulk stock directly through their VIP portal 24/7 without needing phone assistance."
    },
    results: ["Search CTR up 28%", "Cart abandonment down 18%", "Dealer orders fully automated", "5,000+ SKUs searchable instantly"],
    features: ["Retail & dealer price toggle", "Fuzzy search with typo fix", "Animated cart with WhatsApp fallback", "Razorpay/UPI checkout", "Bulk CSV product import", "Cloudinary image hosting"],
    stack: ["React", "React Native", "Node.js", "MongoDB", "Razorpay", "TailwindCSS"],
    metrics: { label: "Search Conversion Rate", value: "+28%", sub: "instant typo-tolerant catalog" },
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    accent: "#10b981",
    secondary: "#14b8a6",
    mockupType: "Phone",
    scale: "12,000+ Active Users • 5,000+ Annual Orders",
  },
  {
    id: "clinic-management",
    tag: "Healthcare",
    tagColor: "from-rose-400 to-pink-500",
    year: 2024,
    title: "Lifeline Clinic & Doctor EHR SaaS",
    client: "Lifeline Multispeciality Clinics",
    shortDesc: "Electronic health records (EHR), token calendar booking, digital prescription generator, and automated WhatsApp appointment reminders.",
    fullDesc: "A HIPAA-compliant clinical management platform for outpatient clinics and medical practitioners. Manages patient registration, digital medical histories, appointment scheduling, digital prescription generation with PDF export, and automated WhatsApp appointment reminders.",
    architecture: "HIPAA-Aware PostgreSQL + Queue Worker",
    problem: {
      title: "30% Patient No-Shows & Paper Record Loss",
      description: "Patients regularly forgot routine follow-ups, and physical paper prescription files were constantly misplaced in physical cabinets.",
      painQuote: "Doctor time was wasted when booked slots went empty with zero advance notice."
    },
    solution: {
      title: "Automated WhatsApp Token Bus & Digital EHR",
      description: "Engineered automated 24-hour and 2-hour pre-appointment WhatsApp reminders with digital prescription PDF creation in under 60 seconds."
    },
    roi: {
      title: "40% Drop in Missed Appointments",
      description: "Eliminated clinic no-shows, transitioned to 100% paperless medical histories across 8 multispeciality branches."
    },
    results: ["No-show rate reduced 40%", "Prescription time cut to 90 sec", "Patient records instantly searchable", "WhatsApp reminders automated"],
    features: ["Patient profile & medical history", "Appointment booking calendar", "Prescription generator with PDF", "Automated WhatsApp reminders", "Consultation & medicine billing", "Doctor-wise reports"],
    stack: ["React", "Node.js", "PostgreSQL", "WhatsApp Cloud API", "Firebase Auth"],
    metrics: { label: "Patient No-Show Rate", value: "-40%", sub: "via automated WhatsApp queue" },
    gradient: "from-rose-500/20 via-pink-400/10 to-transparent",
    accent: "#f43f5e",
    secondary: "#ec4899",
    mockupType: "Tablet",
    scale: "8 Clinics • 28,000+ Consultations",
  },
  {
    id: "vyapaariyo-saas",
    tag: "SaaS",
    tagColor: "from-violet-400 to-purple-500",
    year: 2024,
    title: "Vyapaariyo — B2B Multi-Tenant SaaS",
    client: "Vyapaariyo Enterprise Cloud",
    shortDesc: "Multi-tenant B2B SaaS where wholesale sellers get their own branded catalog portal with custom subdomains, logo, and dealer pricing.",
    fullDesc: "A cloud platform where every registered merchant gets an isolated catalog website — complete with custom brand colors, product listings, wholesale pricing tiers, and custom subdomains. Merchants bulk-import products via CSV and manage lead enquiries.",
    architecture: "Multi-Tenant Isolated DB Schemas + S3",
    problem: {
      title: "High Development Costs for Small Wholesalers",
      description: "Wholesale suppliers could not afford ₹2L+ to build custom e-commerce portals, keeping them offline and invisible to regional buyers.",
      painQuote: "Suppliers wanted their own branded domain without having to manage servers or databases."
    },
    solution: {
      title: "Multi-Tenant Cloud Engine with Isolated DBs",
      description: "Built automated subdomain provisioning (`tenant.vyapaariyo.com`) with independent catalog isolation, bulk CSV upload, and automated lead capture."
    },
    roi: {
      title: "50+ Merchants Live in 30 Days",
      description: "Suppliers launch full custom catalog portals in under 3 minutes with zero cloud management overhead."
    },
    results: ["50+ merchants onboarded in month 1", "Merchant setup time under 3 min", "Zero hosting overhead per tenant", "Bulk CSV import with images"],
    features: ["Multi-tenant architecture", "Per-seller custom catalog site", "CSV bulk product import", "Cloudinary image hosting", "Role-based admin & seller access", "Subscription billing"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "TailwindCSS"],
    metrics: { label: "Tenant Onboarding Time", value: "< 3 min", sub: "from signup to live custom domain" },
    gradient: "from-violet-500/20 via-purple-400/10 to-transparent",
    accent: "#8b5cf6",
    secondary: "#a855f7",
    mockupType: "Dashboard",
    scale: "60+ Merchant Portals • 180,000+ SKUs",
  },
  {
    id: "wholesale-order-management",
    tag: "Wholesale",
    tagColor: "from-amber-400 to-yellow-500",
    year: 2025,
    title: "Wholesale Distribution & Logistics ERP",
    client: "Maharashtra FMCG Distributors",
    shortDesc: "High-volume wholesale order tracking with multi-warehouse inventory, GST billing, party ledgers, and delivery vehicle dispatch.",
    fullDesc: "A robust order management system for FMCG and wholesale distributors handling 500+ orders per day. Tracks orders from placement to dispatch, manages multi-warehouse stock, generates GST-compliant e-way bills, maintains party-wise ledgers, and sends delivery updates via WhatsApp.",
    architecture: "High-Throughput Ledger Engine + Redis Queue",
    problem: {
      title: "Multi-Warehouse Stock Mismatch & Dispatch Delay",
      description: "Distributors with 12 warehouses suffered from phantom stockouts and manual calculation errors on party credit limits.",
      painQuote: "Drivers often reached retail shops only to discover the ordered items were out of stock at that warehouse."
    },
    solution: {
      title: "Centralized Real-Time ACID Ledger & Vehicle Dispatch",
      description: "Created live multi-location stock synchronization with automated e-way bill generation and driver route confirmation."
    },
    roi: {
      title: "500+ Daily Orders with 0% Calculation Error",
      description: "Cut invoice turnaround from 4 minutes to under 25 seconds and eliminated cross-warehouse inventory discrepancies."
    },
    results: ["500+ orders/day managed smoothly", "Invoice generation under 25 sec", "Zero ledger calculation discrepancies", "Delivery confirmation automated"],
    features: ["Party & vendor ledger management", "Multi-warehouse inventory", "GST invoice & e-way bill", "Delivery tracking & confirmation", "Daily sales & outstanding reports", "WhatsApp delivery alerts"],
    stack: ["React", "Node.js", "PostgreSQL", "WhatsApp API", "Redis", "Razorpay"],
    metrics: { label: "Daily Orders Handled", value: "500+", sub: "zero manual ledger errors" },
    gradient: "from-amber-500/20 via-yellow-400/10 to-transparent",
    accent: "#f59e0b",
    secondary: "#eab308",
    mockupType: "Dashboard",
    scale: "Enterprise Wholesale Logistics • 12 Warehouses",
  },
  {
    id: "coaching-management",
    tag: "Education",
    tagColor: "from-sky-400 to-cyan-500",
    year: 2025,
    title: "EduPulse Coaching & Student LMS",
    client: "Pioneer Science & JEE Academies",
    shortDesc: "Student enrollment portal, digital RFID attendance, automated fee collection reminders, and WhatsApp parent communication.",
    fullDesc: "A complete management system for coaching centers and educational institutes. Handles student admissions, batch scheduling, digital attendance tracking, fee collection with automated UPI links, exam marks entry, and report card generation.",
    architecture: "Realtime Parent Notification Bus + Cloud Storage",
    problem: {
      title: "Uncollected Student Fees & Parent Anxiety",
      description: "Admin staff spent hundreds of hours manually calling parents for pending term fees, while attendance took 15 minutes of every lecture.",
      painQuote: "Unpaid dues accumulated simply because parents forgot quarterly installment due dates."
    },
    solution: {
      title: "Digital Attendance + 1-Click WhatsApp Fee Reminders",
      description: "Automated instant arrival notifications to parents and delivered 1-click UPI payment links on WhatsApp with auto-reconciled receipts."
    },
    roi: {
      title: "100% Timely Fee Collection & 0 Admin Delays",
      description: "Recovered 100% of pending fee dues on time and freed teachers to focus purely on academic instruction."
    },
    results: ["Fee collection automated 100%", "Attendance tracking real-time", "Parent communication automated", "Zero pending fee confusion"],
    features: ["Student enrollment & profiles", "Batch & faculty management", "Digital attendance system", "Fee collection with reminders", "Exam results & mark sheets", "WhatsApp parent updates"],
    stack: ["React", "Node.js", "MongoDB", "Firebase Auth", "WhatsApp API", "Cloudinary"],
    metrics: { label: "Fee Collection Efficiency", value: "100%", sub: "automated UPI WhatsApp alerts" },
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
    accent: "#0ea5e9",
    secondary: "#06b6d4",
    mockupType: "Phone",
    scale: "3,500+ Enrolled Students • 4 Campuses",
  },
  {
    id: "real-estate-crm",
    tag: "Real Estate",
    tagColor: "from-teal-400 to-green-500",
    year: 2024,
    title: "PrimeEstate CRM & Property Portal",
    client: "Apex Realty Developers",
    shortDesc: "Property showcase website, automated lead capture, follow-up CRM pipeline, and instant WhatsApp brochure dispatcher.",
    fullDesc: "A lead generation and deal pipeline platform for real estate developers and property consultants. The public-facing portal showcases residential & commercial properties with interactive floorplans and virtual tours. Inquiries feed directly into an automated CRM pipeline.",
    architecture: "Serverless Lead Ingestion + Webhook Triggers",
    problem: {
      title: "Cold Property Leads & Delayed Follow-Ups",
      description: "Online buyer inquiries sat in email inboxes for hours. By the time sales reps called back, the buyer had already contacted rival builders.",
      painQuote: "If you don't respond to a luxury property lead within 5 minutes, you've lost the buyer."
    },
    solution: {
      title: "90-Second WhatsApp Brochure Dispatch & Lead Scoring",
      description: "Built an automated webhook engine that dispatches floorplan PDF brochures to buyer WhatsApp immediately, alerting senior sales agents via push notifications."
    },
    roi: {
      title: "+25% Increase in Scheduled Site Visits",
      description: "Cut lead first-contact time from 4 hours down to under 90 seconds, dramatically improving buyer qualification and sales closure rates."
    },
    results: ["Lead response time under 90 sec", "Follow-up rate 100% automated", "Property listings SEO-optimized", "Conversion rate improved 25%"],
    features: ["Property listing website", "Lead capture & CRM", "WhatsApp follow-up automation", "Lead scoring & priority tags", "Site visit scheduling", "Agent performance dashboard"],
    stack: ["React", "Node.js", "MongoDB", "WhatsApp Cloud API", "Cloudinary", "TailwindCSS"],
    metrics: { label: "Lead Conversion Rate", value: "+25%", sub: "90-second instant follow-up loop" },
    gradient: "from-teal-500/20 via-green-400/10 to-transparent",
    accent: "#14b8a6",
    secondary: "#22c55e",
    mockupType: "Dashboard",
    scale: "450+ Luxury Units Sold • Premium Inventory",
  },
];

const INDUSTRIES = ["All", "Hospitality", "Retail", "E-Commerce", "Healthcare", "SaaS", "Wholesale", "Education", "Real Estate"];
const TECH_TAGS = ["All", "React", "Node.js", "MongoDB", "PostgreSQL", "WhatsApp API", "Razorpay", "Redis", "Cloudinary"];

// ─── 3D INTERACTIVE PROJECT CARD ─────────────────────────────────────────────

function Project3DCard({ project, index, onOpenDemo, prefersReducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const Mockup = project.mockupType === "Phone" ? MockupPhone : project.mockupType === "Tablet" ? MockupTablet : MockupDashboard;

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.06, ease: "easeOut" }}
      whileHover={prefersReducedMotion ? {} : { y: -8, rotateX: 2.5, rotateY: -2 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col rounded-3xl border border-slate-700/70 bg-slate-900/90 shadow-xl shadow-black/40 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-slate-500/80 hover:shadow-2xl hover:shadow-brand-500/15"
    >
      {/* Top Preview Canvas */}
      <div className={`relative h-60 overflow-hidden bg-gradient-to-br ${project.gradient} bg-slate-950 flex items-center justify-center`}>
        {/* Subtle schematic grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "28px 28px"
          }}
        />

        {/* Ambient Glow Orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)`, filter: "blur(30px)" }}
        />

        {/* 3D Mockup Component */}
        <motion.div
          animate={hovered && !prefersReducedMotion ? { y: -6, scale: 1.05 } : { y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full h-full absolute inset-0 flex items-center justify-center p-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          <Mockup accent={project.accent} secondary={project.secondary} />
        </motion.div>

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${project.tagColor} px-3 py-1 text-[11px] font-bold text-white shadow-md`}>
            {project.tag}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <span className="rounded-full bg-slate-950/70 border border-slate-700/80 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-mono font-semibold text-slate-300">
            {project.year}
          </span>
        </div>

        {/* Hover Glint Effect */}
        <motion.div
          animate={hovered && !prefersReducedMotion ? { opacity: 1, x: "200%" } : { opacity: 0, x: "-100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Live Simulator Quick Launch Pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <button
            onClick={() => onOpenDemo(project)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-brand-600 text-white border border-slate-700/80 hover:border-brand-500 font-bold text-[11px] backdrop-blur-md shadow-lg transition cursor-pointer"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            Live Demo
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
            <span>{project.client}</span>
            <span className="text-emerald-400 font-semibold">{project.scale}</span>
          </div>

          <h3 className="text-lg font-black text-white leading-snug group-hover:text-brand-300 transition-colors">
            {project.title}
          </h3>

          <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {project.shortDesc}
          </p>

          {/* Key Metric Highlight */}
          <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide font-medium">{project.metrics.label}</p>
              <p className="text-xl font-black text-white mt-0.5">{project.metrics.value}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block font-mono">Benchmark</span>
              <span className="text-[10px] text-brand-300 font-medium">{project.metrics.sub}</span>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 4 && (
              <span className="rounded-lg border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-500">
                +{project.stack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Actions Row */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={() => onOpenDemo(project)}
            className="flex-1 bg-brand-600 hover:bg-brand-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-brand-600/20"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            Launch Live Demo
          </button>
          <a
            href={WA(`Hi Prajyot Infotech, I saw the ${project.title} on your portfolio and want to build a similar platform.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp inquiry about ${project.title}`}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── ENTERPRISE COMPARISON MATRIX VIEW ───────────────────────────────────────

function EnterpriseMatrixView({ projects, onOpenDemo }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-700/80 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
            <th className="py-4 px-6">System / Client</th>
            <th className="py-4 px-4">Industry</th>
            <th className="py-4 px-4">Architecture Pattern</th>
            <th className="py-4 px-4">Production Scale</th>
            <th className="py-4 px-4">Verified ROI</th>
            <th className="py-4 px-4">Core Stack</th>
            <th className="py-4 px-6 text-right">Interactive Test</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-300">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-slate-800/40 transition group">
              <td className="py-4 px-6">
                <div className="font-bold text-white text-sm group-hover:text-brand-300 transition">
                  {p.title}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.client}</div>
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center rounded-full bg-gradient-to-r ${p.tagColor} px-2.5 py-0.5 text-[10px] font-bold text-white`}>
                  {p.tag}
                </span>
              </td>
              <td className="py-4 px-4 font-mono text-[11px] text-indigo-300">
                {p.architecture}
              </td>
              <td className="py-4 px-4 font-mono text-[11px] text-slate-300">
                {p.scale}
              </td>
              <td className="py-4 px-4">
                <span className="font-black text-emerald-400 text-sm block">{p.metrics.value}</span>
                <span className="text-[10px] text-slate-400 block">{p.metrics.label}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1 max-w-xs">
                  {p.stack.slice(0, 3).map((s) => (
                    <span key={s} className="bg-slate-950 border border-slate-800 px-1.5 py-0.5 rounded text-[9px] font-mono text-slate-400">
                      {s}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onOpenDemo(p)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-600/20 transition cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  Test Simulator
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── MAIN PORTFOLIO PAGE COMPONENT ───────────────────────────────────────────

export default function Work() {
  const [activeTag, setActiveTag] = useState("All");
  const [activeTech, setActiveTech] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid | matrix
  const [selectedProject, setSelectedProject] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  // Filter pipeline
  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchIndustry = activeTag === "All" || p.tag === activeTag;
      const matchTech = activeTech === "All" || p.stack.includes(activeTech);
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));

      return matchIndustry && matchTech && matchSearch;
    });
  }, [activeTag, activeTech, searchQuery]);

  const handleOpenDemoById = (id) => {
    const found = PROJECTS.find((p) => p.id === id);
    if (found) setSelectedProject(found);
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.prajyotinfotech.in/work/#webpage",
        "url": "https://www.prajyotinfotech.in/work",
        "name": "Enterprise Software Engineering Portfolio | Prajyot Infotech",
        "description": "Production software applications built by Prajyot Infotech — Restaurant QR & KDS, Mobile Shop POS Billing, Clinic EHR, E-Commerce, and Multi-tenant SaaS.",
        "isPartOf": { "@id": "https://www.prajyotinfotech.in/#website" }
      },
      {
        "@type": "ItemList",
        "name": "Prajyot Infotech — Enterprise Software Portfolio",
        "description": "Production software applications deployed for businesses across India.",
        "itemListElement": PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": p.title,
          "description": p.shortDesc,
          "url": `https://www.prajyotinfotech.in/work#${p.id}`,
        })),
      }
    ]
  };

  return (
    <div className="bg-[#0b0f19] min-h-screen text-slate-100 selection:bg-brand-500/30 selection:text-white">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Portfolio & Engineering Work", url: "https://www.prajyotinfotech.in/work" },
        ]}
      />
      <Seo
        title="Software Portfolio & Live Demos — Restaurant, POS Billing, Clinic, E-Commerce | Prajyot Infotech"
        description="Explore Prajyot Infotech's enterprise software portfolio: Restaurant QR & KDS, Mobile POS Billing with IMEI, Clinic Management SaaS, E-Commerce, and Multi-Tenant SaaS. Test interactive live demos."
        keywords="software development portfolio, restaurant management software, mobile shop billing POS, clinic EHR software, custom SaaS developers Pune India, React enterprise apps, Prajyot Infotech work"
        path="/work"
        schema={itemListLd}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        {/* Cyber luxury background mesh */}
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />

        {/* Ambient Gradient Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-brand-600/20 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-indigo-600/20 blur-[140px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-300 backdrop-blur-md mb-6 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              PRODUCTION-GRADE SOFTWARE ENGINEERING
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
              Software That Powers{" "}
              <span className="bg-gradient-to-r from-brand-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Real Enterprise Revenue
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              We design, build, and deploy production software systems for Indian businesses — from high-throughput QR restaurant platforms to IMEI retail POS and healthcare EHRs. Test the live interactive simulators below.
            </p>
          </motion.div>

          {/* Live Impact Metric Cards */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "1 Million+", label: "Transactions Handled", sub: "across deployed systems" },
              { value: "50+", label: "Custom Deployments", sub: "in 8+ business sectors" },
              { value: "< 140ms", label: "Median API Latency", sub: "optimized edge endpoints" },
              { value: "100%", label: "Code Ownership", sub: "zero vendor lock-in" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-5 shadow-xl hover:border-slate-700 transition"
              >
                <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs font-bold text-white mt-1 uppercase tracking-wide">{stat.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Anchor Navigation Dock */}
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
            <a href="#showcase" className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-4 py-2 rounded-xl transition flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Explore 8+ Live Demos</span>
            </a>
            <a href="#process" className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-4 py-2 rounded-xl transition flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>4-Step Engineering Lifecycle</span>
            </a>
            <a href="#guarantees" className="bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700/80 px-4 py-2 rounded-xl transition flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>5 Enterprise Guarantees</span>
            </a>
            <a href="#estimator" className="bg-brand-600/20 hover:bg-brand-600/30 text-brand-300 border border-brand-500/40 px-4 py-2 rounded-xl transition flex items-center gap-1.5 font-bold">
              <Cpu className="w-3.5 h-3.5 text-brand-400" />
              <span>Scope & Sprint Calculator</span>
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED FLAGSHIP SPOTLIGHT (Interactive Sandbox) */}
      <PortfolioSpotlight onOpenDemo={handleOpenDemoById} />

      {/* CONTROLS & FILTERING DOCK */}
      <section id="showcase" className="sticky top-16 z-30 border-y border-slate-800 bg-slate-950/85 backdrop-blur-2xl py-4 px-4">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by system or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Industry Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            {INDUSTRIES.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  activeTag === tag
                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/30"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl self-end md:self-auto shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === "grid" ? "bg-brand-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
              aria-label="Grid 3D view"
              title="3D Card Showcase"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              className={`p-1.5 rounded-lg transition cursor-pointer ${
                viewMode === "matrix" ? "bg-brand-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
              aria-label="Enterprise Matrix view"
              title="Enterprise Comparison Matrix"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Secondary Tech Stack Filter Strip */}
        <div className="mx-auto max-w-7xl mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-slate-500 font-mono text-[11px] shrink-0">Filter by Technology:</span>
          {TECH_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTech(t)}
              className={`shrink-0 px-2.5 py-0.5 rounded-lg font-mono text-[11px] transition cursor-pointer ${
                activeTech === t
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-bold"
                  : "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* MAIN PORTFOLIO GRID / MATRIX */}
      <main className="mx-auto max-w-7xl px-4 py-12 space-y-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800">
            <p className="text-lg font-bold text-white">No projects found matching your filter</p>
            <p className="text-xs text-slate-400 mt-1">Try resetting the search keyword or selecting "All" tags.</p>
            <button
              onClick={() => {
                setActiveTag("All");
                setActiveTech("All");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <Project3DCard
                key={project.id}
                project={project}
                index={i}
                onOpenDemo={setSelectedProject}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        ) : (
          <EnterpriseMatrixView
            projects={filtered}
            onOpenDemo={setSelectedProject}
          />
        )}

        {/* 4-STEP TRANSPARENT ENGINEERING LIFECYCLE */}
        <EngineeringProcess />

        {/* 5 ENTERPRISE GUARANTEES & COMPARISON MATRIX */}
        <div id="guarantees">
          <TrustGuarantees />
        </div>

        {/* INTERACTIVE SCOPE & SPRINT ESTIMATOR */}
        <ProjectEstimator />

        {/* BOTTOM ENTERPRISE CTA */}
        <div className="rounded-3xl border border-slate-700/80 bg-gradient-to-r from-brand-900/60 via-slate-950 to-indigo-950/60 p-8 sm:p-12 text-center relative shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Build Your Custom Software?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Speak directly with our senior software architect. We provide fixed-price quotes, defined 3-4 week milestones, and 100% intellectual property ownership.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href={WA("Hi Prajyot Infotech, I have reviewed your portfolio and I would like to schedule an architecture consultation for my company.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition cursor-pointer text-xs sm:text-sm flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Chat with Lead Architect on WhatsApp
              </a>
              <Link
                to="/estimate"
                className="bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-bold px-7 py-3.5 rounded-xl transition text-xs sm:text-sm flex items-center gap-2"
              >
                Calculate Instant Cost Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* FULLSCREEN INTERACTIVE DEMO MODAL */}
      <PortfolioDemoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}
