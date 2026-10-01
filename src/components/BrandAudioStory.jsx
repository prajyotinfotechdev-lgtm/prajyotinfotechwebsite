// src/components/BrandAudioStory.jsx
// PRAJYOT INFOTECH — PRODUCTION AUDIO-SYNCHRONIZED BRAND STORY
// Master Clock: audio.currentTime (Zero-drift, requestAnimationFrame + native audio events)
// Visual Art Direction inspired by the reference image:
// - Left-side vertical chapter navigation track
// - Editorial typography with dynamic gradient highlighting
// - Foreground cutout female presenter integrated into the physical studio environment (NO card borders)
// - Floating 3D perspective industry cards + real hardware/product mockups
// - Integrated sleek panoramic audio player bar at the bottom

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
  Building2,
  HardHat,
  ShoppingCart,
  Stethoscope,
  Utensils,
  GraduationCap,
  PackageCheck,
  Truck,
  Smartphone,
  Laptop,
  Check,
  Zap,
  Globe,
  Users,
  Compass,
  FileCode2,
  Lock,
  ChevronRight,
  Clock,
  Radio,
  ExternalLink,
  Activity,
  Cpu,
  Database,
  Workflow,
  Scan,
  TrendingUp,
  Award,
  Server,
  Key,
  Eye,
  Flame,
  MapPin,
  Gauge,
  Maximize2,
  Minimize2,
  Lightbulb,
  Briefcase
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

// Authoritative uploaded audio path
export const BRAND_STORY_AUDIO_URL = "/audio/prajyot_infotech.mpeg";
export const TOTAL_DURATION = 108.2;

// 15 Semantic Visual Scenes aligned with the exact speech pauses of prajyot_infotech.mpeg
export const BRAND_SCENES = [
  {
    id: 1,
    start: 0.0,
    end: 2.78,
    chapter: "01",
    tag: "DIVERSITY OF WORK",
    chapterTitle: "Diversity of Work",
    narration: "Every business works differently.",
    headline: "Every Business Works Differently.",
    subtext: "Different people, unique operational workflows, and distinct industry realities.",
  },
  {
    id: 2,
    start: 2.78,
    end: 7.10,
    chapter: "02",
    tag: "THE TEMPLATE TRAP",
    chapterTitle: "Why Not Templates?",
    narration: "So why should the technology behind it work from a template?",
    headline: "Why Should Technology Work From A Template?",
    subtext: "Rigid cookie-cutter systems force businesses to change how they work.",
  },
  {
    id: 3,
    start: 7.10,
    end: 12.79,
    chapter: "03",
    tag: "THE PHILOSOPHY",
    chapterTitle: "Our Approach",
    narration: "At Prajyot Infotech, we build software around the way businesses actually work.",
    headline: "We Build Software Around How You Work.",
    subtext: "Engineering bespoke digital platforms adapted to your exact operational reality.",
  },
  {
    id: 4,
    start: 12.79,
    end: 22.34,
    chapter: "04",
    tag: "THE TRANSFORMATION",
    chapterTitle: "From Idea to Product",
    narration: "We take ideas, complex processes, and everyday operational problems... and turn them into digital products built for real-world use.",
    headline: "From Operational Friction to Working Software.",
    subtext: "Taking paper bottlenecks, disconnected chats, and manual delays into cohesive digital engines.",
  },
  {
    id: 5,
    start: 22.34,
    end: 34.68,
    chapter: "05",
    tag: "CAPABILITIES",
    chapterTitle: "What We Build",
    narration: "From high-performance websites and e-commerce platforms... to mobile applications, ERP and CRM systems, inventory platforms, workflow automation, and industry-specific SaaS...",
    headline: "What We Engineer & Deliver.",
    subtext: "End-to-end full-stack systems spanning web, mobile, enterprise backend, and cloud APIs.",
  },
  {
    id: 6,
    start: 34.68,
    end: 40.41,
    chapter: "06",
    tag: "THE TRIAD",
    chapterTitle: "The Triad",
    narration: "we bring design, engineering, and business logic together under one roof.",
    headline: "Design + Engineering + Business Logic.",
    subtext: "Under one roof — crafted with technical precision and commercial understanding.",
  },
  {
    id: 7,
    start: 40.41,
    end: 44.30,
    chapter: "07",
    tag: "BEYOND LAUNCH",
    chapterTitle: "Beyond Delivery",
    narration: "But we don’t believe our job ends when the software is delivered.",
    headline: "Our Job Doesn't End at Code Delivery.",
    subtext: "True software success is proven in operational adoption, not just Git commits.",
  },
  {
    id: 8,
    start: 44.30,
    end: 51.93,
    chapter: "08",
    tag: "GROUND EXECUTION",
    chapterTitle: "Ground Execution",
    narration: "We deploy it. We onboard teams. We train people on the ground. And we stay involved beyond launch.",
    headline: "Deploy. Onboard. Train. Support.",
    subtext: "Hands-on site visits, ground employee training, and guaranteed post-launch warranties.",
  },
  {
    id: 9,
    start: 51.93,
    end: 56.40,
    chapter: "09",
    tag: "CORE PRINCIPLE",
    chapterTitle: "Real-World Impact",
    narration: "Because real software has to work where real work happens.",
    headline: "Real Software Has To Work Where Real Work Happens.",
    subtext: "On dusty construction sites, busy retail floors, noisy warehouses, and active clinics.",
  },
  {
    id: 10,
    start: 56.40,
    end: 66.31,
    chapter: "10",
    tag: "CLIENT OWNERSHIP",
    chapterTitle: "Ownership",
    narration: "And when we build custom technology, we believe our clients should own what they build. Their code. Their systems. Their intellectual property.",
    headline: "Your Code. Your Systems. Your IP.",
    subtext: "100% full Git repository handover. Zero vendor lock-in. Zero per-seat recurring fees.",
  },
  {
    id: 11,
    start: 66.31,
    end: 71.19,
    chapter: "11",
    tag: "INDEPENDENCE",
    chapterTitle: "Independence",
    narration: "No unnecessary dependence. Just technology they can truly own.",
    headline: "Technology You Can Truly Own.",
    subtext: "Independent cloud infrastructure, dedicated databases, and complete operational freedom.",
  },
  {
    id: 12,
    start: 71.19,
    end: 84.88,
    chapter: "12",
    tag: "SECTOR SOLUTIONS",
    chapterTitle: "Industries",
    narration: "From construction and retail to healthcare, hospitality, real estate, education, and distribution… we build technology for businesses with different challenges, different people, and different ways of working.",
    headline: "Solutions Tailored Across 7 Key Sectors.",
    subtext: "Engineered specifically around the ground realities of Indian and global enterprises.",
  },
  {
    id: 13,
    start: 84.88,
    end: 94.67,
    chapter: "13",
    tag: "PROPRIETARY SAAS",
    chapterTitle: "Oibuz HRMS",
    narration: "And we’re building beyond client solutions too. With products like Oibuz, we turn our own understanding of business problems into technology of our own.",
    headline: "Building Our Own Products: OIBUZ.",
    subtext: "Turning deep industry understanding into an enterprise Construction HRMS & Workforce suite.",
  },
  {
    id: 14,
    start: 94.67,
    end: 101.44,
    chapter: "14",
    tag: "THE MISSION",
    chapterTitle: "Our Vision",
    narration: "Because we’re not here just to write software. We’re here to engineer what businesses can become.",
    headline: "We Engineer What Businesses Can Become.",
    subtext: "Empowering visionary founders and enterprises to lead their industries with modern digital capabilities.",
  },
  {
    id: 15,
    start: 101.44,
    end: 108.20,
    chapter: "15",
    tag: "PRAJYOT INFOTECH",
    chapterTitle: "Prajyot Infotech",
    narration: "Prajyot Infotech. Software engineered around your business.",
    headline: "Software Engineered Around Your Business.",
    subtext: "Headquartered in Pune, Maharashtra • Delivering Globally across India, USA, UAE, and Europe.",
  },
];

// 12-13 Chapter Nav Nodes (Inspired by Reference Image's Left Column)
export const STORY_CHAPTERS = [
  { id: 1, chapter: "01", title: "Diversity of Work", sceneId: 1, start: 0.0 },
  { id: 2, chapter: "02", title: "Why Not Templates?", sceneId: 2, start: 2.78 },
  { id: 3, chapter: "03", title: "Our Approach", sceneId: 3, start: 7.10 },
  { id: 4, chapter: "04", title: "From Idea to Product", sceneId: 4, start: 12.79 },
  { id: 5, chapter: "05", title: "What We Build", sceneId: 5, start: 22.34 },
  { id: 6, chapter: "06", title: "The Triad", sceneId: 6, start: 34.68 },
  { id: 7, chapter: "07", title: "Beyond Delivery", sceneId: 7, start: 40.41 },
  { id: 8, chapter: "08", title: "Real-World Impact", sceneId: 9, start: 51.93 },
  { id: 9, chapter: "09", title: "Client Ownership", sceneId: 10, start: 56.40 },
  { id: 10, chapter: "10", title: "Industries", sceneId: 12, start: 71.19 },
  { id: 11, chapter: "11", title: "Oibuz HRMS", sceneId: 13, start: 84.88 },
  { id: 12, chapter: "12", title: "Our Vision", sceneId: 14, start: 94.67 },
  { id: 13, chapter: "13", title: "Prajyot Infotech", sceneId: 15, start: 101.44 },
];

// ═════════════════════════════════════════════════════════════════════
// PROFESSIONAL FEMALE PRESENTER — HUMAN BRAND GUIDE CONFIGURATION
// Transparent cutout foreground element integrated into the physical stage
// ═════════════════════════════════════════════════════════════════════
export const PRESENTER_CONFIG = {
  1: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_open.png",
    mode: "feature",
    positionPercent: 28, // Desktop left-center positioning
    mobileAlign: "center",
    keyInsight: "Different industries. Different challenges. Real solutions.",
    actionTag: "DIVERSITY OF WORK",
  },
  2: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_gesture.png",
    mode: "feature",
    positionPercent: 22,
    mobileAlign: "right",
    keyInsight: "Off-the-shelf templates force stiff constraints. Bespoke software adapts to you.",
    actionTag: "CHALLENGING TEMPLATES",
  },
  3: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_poised.png",
    mode: "feature",
    positionPercent: 25,
    mobileAlign: "center",
    keyInsight: "At Prajyot Infotech, we engineer software around your real-world team operations.",
    actionTag: "CORE PHILOSOPHY",
  },
  4: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_gesture.png",
    mode: "feature",
    positionPercent: 22,
    mobileAlign: "left",
    keyInsight: "Taking operational friction and transforming it into high-velocity digital engines.",
    actionTag: "PROCESS PIPELINE",
  },
  5: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_gesture.png",
    mode: "compact", // Wide software grid takes stage
    positionPercent: 18,
    mobileAlign: "right",
    keyInsight: "Full-stack engineering: high-performance web, mobile apps, ERPs, and automation.",
    actionTag: "MULTI-PLATFORM DELIVERY",
  },
  6: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_poised.png",
    mode: "feature",
    positionPercent: 24,
    mobileAlign: "center",
    keyInsight: "Technical precision combined with commercial reality — all crafted under one roof.",
    actionTag: "THE TRIAD ARCHITECTURE",
  },
  7: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_open.png",
    mode: "feature",
    positionPercent: 22,
    mobileAlign: "left",
    keyInsight: "Our relationship doesn't stop at deployment. Adoption is the true measure of success.",
    actionTag: "LONG-TERM COMMITMENT",
  },
  8: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_gesture.png",
    mode: "compact",
    positionPercent: 18,
    mobileAlign: "right",
    keyInsight: "Hands-on site onboarding and staff training directly where work happens.",
    actionTag: "GROUND TRAINING",
  },
  9: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_poised.png",
    mode: "compact",
    positionPercent: 18,
    mobileAlign: "center",
    keyInsight: "Software built to endure dusty yards, retail floors, and noisy warehouses.",
    actionTag: "REAL-WORLD RESILIENCE",
  },
  10: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_poised.png",
    mode: "feature",
    positionPercent: 22,
    mobileAlign: "left",
    keyInsight: "100% full source code ownership. Zero vendor lock-in. Your IP belongs to you.",
    actionTag: "INTELLECTUAL PROPERTY",
  },
  11: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_open.png",
    mode: "compact",
    positionPercent: 18,
    mobileAlign: "right",
    keyInsight: "Independent dedicated databases, private cloud hosting, and true operational autonomy.",
    actionTag: "OPERATIONAL FREEDOM",
  },
  12: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_gesture.png",
    mode: "compact",
    positionPercent: 18,
    mobileAlign: "left",
    keyInsight: "Deep domain architectures deployed across 7 vital economic industries.",
    actionTag: "SECTOR ECOSYSTEM",
  },
  13: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_gesture.png",
    mode: "compact",
    positionPercent: 16,
    mobileAlign: "right",
    keyInsight: "Oibuz: Transforming our deep construction understanding into our flagship product.",
    actionTag: "PROPRIETARY SAAS",
  },
  14: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_open.png",
    mode: "feature",
    positionPercent: 26,
    mobileAlign: "center",
    keyInsight: "We are here to engineer what forward-thinking enterprises can become.",
    actionTag: "ENTERPRISE HORIZON",
  },
  15: {
    name: "Ananya Sharma",
    title: "Senior Technology Consultant",
    pose: "/presenter/cutout_open.png",
    mode: "hidden", // Official Prajyot Infotech Crest and Call-to-action takes the full spotlight!
    positionPercent: 0,
    mobileAlign: "center",
    keyInsight: "Prajyot Infotech — Software engineered around your business.",
    actionTag: "FINAL BRAND REVEAL",
  },
};

// Helper: Format seconds to MM:SS
function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Live Voice Equalizer graphic
function VoiceEqualizer({ isPlaying, barCount = 4, className = "" }) {
  return (
    <div className={`inline-flex items-end gap-[2px] h-3.5 ${className}`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          animate={
            isPlaying
              ? {
                  height: ["20%", "100%", "45%", "85%", "30%"],
                }
              : { height: "28%" }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.55 + (i % 3) * 0.16,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.08,
                }
              : { duration: 0.2 }
          }
          className="w-[2.5px] rounded-full bg-brand-600 inline-block"
        />
      ))}
    </div>
  );
}

// Subtle Holographic Soundwave Strands for bottom audio player
function HolographicAudioStrands({ isPlaying }) {
  return (
    <div className="hidden md:flex items-center gap-[3px] h-4" aria-hidden="true">
      {[40, 75, 100, 60, 85, 45, 90, 65, 50, 80, 55, 70].map((h, i) => (
        <motion.span
          key={i}
          animate={
            isPlaying
              ? {
                  height: [`${Math.max(20, h * 0.2)}%`, `${h}%`, `${Math.max(15, h * 0.45)}%`],
                  opacity: [0.4, 0.9, 0.5],
                }
              : { height: "25%", opacity: 0.3 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.45 + (i % 4) * 0.12,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.04,
                }
              : { duration: 0.3 }
          }
          className="w-[2px] rounded-full bg-gradient-to-t from-purple-500 via-indigo-500 to-brand-500"
        />
      ))}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// COMPONENT: EditorialHeadline
// Matches Reference Image typography with dynamic gradient highlighting
// ═════════════════════════════════════════════════════════════════════
function EditorialHeadline({ scene }) {
  const renderHighlightedTitle = () => {
    switch (scene.id) {
      case 1:
        return (
          <>
            Every business <br className="hidden sm:inline" />
            works{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-600">
              differently.
            </span>
          </>
        );
      case 2:
        return (
          <>
            Why should technology <br className="hidden sm:inline" />
            work from a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-600">
              template?
            </span>
          </>
        );
      case 3:
        return (
          <>
            We build software around <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-indigo-600 to-brand-500">
              how you actually work.
            </span>
          </>
        );
      case 4:
        return (
          <>
            From operational friction <br className="hidden sm:inline" />
            to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              working software.
            </span>
          </>
        );
      case 5:
        return (
          <>
            Engineering &amp; delivering <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-brand-600">
              full-stack systems.
            </span>
          </>
        );
      case 6:
        return (
          <>
            Design + Engineering <br className="hidden sm:inline" />
            +{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Business Logic.
            </span>
          </>
        );
      case 7:
        return (
          <>
            Our commitment doesn't end <br className="hidden sm:inline" />
            at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              code delivery.
            </span>
          </>
        );
      case 8:
        return (
          <>
            Deploy. Onboard. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-brand-600">
              Train on the ground.
            </span>
          </>
        );
      case 9:
        return (
          <>
            Real software has to work <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 to-indigo-600">
              where real work happens.
            </span>
          </>
        );
      case 10:
        return (
          <>
            Your code. Your systems. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-brand-600">
              Your IP.
            </span>
          </>
        );
      case 11:
        return (
          <>
            Technology you can <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
              truly own.
            </span>
          </>
        );
      case 12:
        return (
          <>
            Solutions tailored across <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-brand-600">
              7 vital sectors.
            </span>
          </>
        );
      case 13:
        return (
          <>
            Building our own products: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-brand-600">
              OIBUZ HRMS.
            </span>
          </>
        );
      case 14:
        return (
          <>
            We engineer what <br className="hidden sm:inline" />
            businesses{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-brand-600">
              can become.
            </span>
          </>
        );
      case 15:
      default:
        return (
          <>
            Prajyot Infotech: <br className="hidden sm:inline" />
            Software engineered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-indigo-600 to-brand-500">
              around your business.
            </span>
          </>
        );
    }
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-brand-600">
          {scene.chapter} &bull; {scene.tag}
        </span>
        <div className="h-[1.5px] w-10 sm:w-14 bg-gradient-to-r from-brand-600 to-transparent" />
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-[1.14]">
        {renderHighlightedTitle()}
      </h2>

      <p className="mt-2 sm:mt-3 text-xs sm:text-sm lg:text-base text-slate-600 font-medium leading-relaxed max-w-md">
        {scene.subtext}
      </p>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// COMPONENT: ReferenceHardwareShowcase
// Matches Reference Image Scene 01 layout:
// - 4 floating 3D perspective glass cards (Construction, Retail, Healthcare, Hospitality)
// - Realistic MacBook Pro laptop displaying Prajyot Infotech Project Management UI
// - Smartphone displaying mobile field workforce app
// - Hardhat with Prajyot Infotech logo + notebook
// - Floating glass takeaway pill: "Different industries. Different challenges. Real solutions."
// ═════════════════════════════════════════════════════════════════════
function ReferenceHardwareShowcase() {
  const industries = [
    { title: "Construction", img: "/presenter/ind_construction.jpg", icon: HardHat, rot: "-rotate-2" },
    { title: "Retail", img: "/presenter/ind_retail.jpg", icon: ShoppingCart, rot: "-rotate-1" },
    { title: "Healthcare", img: "/presenter/ind_healthcare.jpg", icon: Stethoscope, rot: "rotate-1" },
    { title: "Hospitality", img: "/presenter/ind_hospitality.jpg", icon: Utensils, rot: "rotate-2" },
  ];

  return (
    <div className="relative w-full max-w-2xl lg:max-w-3xl flex flex-col items-end gap-3 sm:gap-4 select-none">
      {/* 1. Tilted 3D Floating Glass Industry Cards (Top Row) */}
      <div className="w-full flex items-center justify-end gap-2 sm:gap-3.5 pr-2">
        {industries.map((ind, i) => (
          <motion.div
            key={ind.title}
            initial={{ opacity: 0, y: -20, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.05 }}
            className={`relative w-20 sm:w-28 md:w-32 aspect-[16/10] rounded-lg sm:rounded-xl overflow-hidden border border-white/60 shadow-lg shadow-slate-900/10 backdrop-blur-xs transform ${ind.rot} transition-all duration-300 group cursor-default`}
          >
            <img
              src={ind.img}
              alt={ind.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-1.5 sm:p-2">
              <span className="text-white text-[9px] sm:text-[11px] font-bold tracking-tight flex items-center gap-1 drop-shadow-xs">
                <ind.icon className="w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 text-white/90" />
                <span className="truncate">{ind.title}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Central Hardware Stage (MacBook Pro + iPhone + Hardhat) */}
      <div className="relative w-full flex items-end justify-end gap-3 sm:gap-5 mt-1 sm:mt-2">
        {/* Sleek Laptop Mockup with Authentic Prajyot Infotech Project Management UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[530px] rounded-xl sm:rounded-2xl border-2 sm:border-4 border-slate-800 bg-slate-900 shadow-2xl shadow-slate-950/30 overflow-hidden"
        >
          {/* Laptop Screen Header / Bezel */}
          <div className="bg-slate-900 px-3 py-1.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-red-500/80 inline-block" />
              <span className="size-2 rounded-full bg-yellow-500/80 inline-block" />
              <span className="size-2 rounded-full bg-green-500/80 inline-block" />
            </div>
            <div className="text-[9px] font-mono text-slate-400 font-semibold tracking-wider">
              PRAJYOT INFOTECH CLOUD OS
            </div>
            <div className="size-2" />
          </div>

          {/* Screen Content: Project Management SaaS UI */}
          <div className="bg-white flex text-slate-800 text-[10px] sm:text-xs">
            {/* Left mini sidebar */}
            <div className="w-20 sm:w-24 bg-slate-50 border-r border-slate-200/80 p-2 flex flex-col justify-between shrink-0">
              <div>
                <div className="flex items-center gap-1 font-extrabold text-[9px] sm:text-[10px] text-brand-700 mb-3 tracking-tight">
                  <img
                    src="/videos/SingleLogo.png"
                    alt="Logo"
                    className="h-3 w-auto object-contain"
                  />
                  <span>PRAJYOT</span>
                </div>
                <div className="space-y-1 text-[9px] font-medium text-slate-600">
                  <div className="px-1.5 py-1 rounded bg-brand-50 text-brand-700 font-bold flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-brand-600" />
                    <span>Dashboard</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-100 flex items-center gap-1">
                    <Workflow className="w-2.5 h-2.5 text-slate-400" />
                    <span>Projects</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-100 flex items-center gap-1">
                    <Users className="w-2.5 h-2.5 text-slate-400" />
                    <span>Teams</span>
                  </div>
                  <div className="px-1.5 py-1 rounded hover:bg-slate-100 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-slate-400" />
                    <span>Timeline</span>
                  </div>
                </div>
              </div>
              <div className="text-[8px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sync 100%</span>
              </div>
            </div>

            {/* Main Dashboard Panel */}
            <div className="flex-1 p-2.5 sm:p-3 bg-white space-y-2.5 min-w-0">
              {/* Header & Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                <div>
                  <div className="font-extrabold text-[11px] sm:text-xs text-slate-900 leading-tight">
                    Project Management
                  </div>
                  <div className="text-[8px] sm:text-[9px] text-slate-400 font-medium">
                    Enterprise Cross-Functional Hub
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-semibold text-slate-500">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-brand-700 font-bold">Overview</span>
                  <span className="px-1.5 py-0.5 rounded hover:bg-slate-50 hidden sm:inline">Tasks</span>
                  <span className="px-1.5 py-0.5 rounded hover:bg-slate-50">Timeline</span>
                  <span className="px-1.5 py-0.5 rounded hover:bg-slate-50 hidden sm:inline">Reports</span>
                </div>
              </div>

              {/* Gantt / Schedule Timeline Bar */}
              <div className="p-2 rounded-lg bg-slate-50/80 border border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                  <span>DISCOVERY</span>
                  <span>ARCHITECTURE</span>
                  <span>DEPLOYMENT</span>
                </div>
                <div className="h-2 bg-slate-200/80 rounded-full overflow-hidden flex gap-0.5">
                  <div className="h-full bg-brand-500 w-[25%]" title="Planning" />
                  <div className="h-full bg-indigo-500 w-[35%]" title="Development" />
                  <div className="h-full bg-emerald-500 w-[20%]" title="Testing" />
                  <div className="h-full bg-amber-500 w-[20%]" title="Production" />
                </div>
              </div>

              {/* Bottom Split: Recent Activity & Team */}
              <div className="grid grid-cols-2 gap-2 text-[8px] sm:text-[9px]">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-700 mb-1">Recent Activity</div>
                  <div className="space-y-0.5 text-slate-500">
                    <div className="truncate">&bull; Module updated (2h ago)</div>
                    <div className="truncate">&bull; Design approved (5h ago)</div>
                    <div className="truncate text-emerald-600 font-semibold">&bull; Deploy ready (1d ago)</div>
                  </div>
                </div>

                <div className="p-1.5 rounded bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div className="font-bold text-slate-700">Team Active</div>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="size-4 sm:size-5 rounded-full bg-brand-600 text-white font-bold text-[8px] flex items-center justify-center">PS</div>
                    <div className="size-4 sm:size-5 rounded-full bg-indigo-600 text-white font-bold text-[8px] flex items-center justify-center">RK</div>
                    <div className="size-4 sm:size-5 rounded-full bg-emerald-600 text-white font-bold text-[8px] flex items-center justify-center">AJ</div>
                    <span className="text-[8px] font-mono text-slate-400 font-bold">+5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beside Laptop: Sleek Smartphone Mockup showing field app */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-28 sm:w-36 md:w-40 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-slate-800 bg-slate-900 shadow-xl shadow-slate-950/30 overflow-hidden shrink-0 hidden sm:block"
        >
          {/* Phone Top Notch */}
          <div className="h-3.5 bg-slate-900 flex items-center justify-center">
            <span className="w-8 h-1 bg-slate-800 rounded-full" />
          </div>

          {/* Phone Screen */}
          <div className="bg-slate-50 p-2 text-slate-800 text-[9px] space-y-1.5">
            <div className="flex items-center justify-between font-bold text-[8px]">
              <span className="font-extrabold text-brand-700">PRAJYOT GO</span>
              <span className="text-[7px] text-emerald-600">● Live GPS</span>
            </div>
            <div className="space-y-1">
              <div className="p-1 rounded bg-white border border-slate-200/80 shadow-2xs font-medium text-[8px] flex items-center justify-between">
                <span>Site Muster</span>
                <span className="text-emerald-700 font-bold">14 Sites</span>
              </div>
              <div className="p-1 rounded bg-white border border-slate-200/80 shadow-2xs font-medium text-[8px] flex items-center justify-between">
                <span>Daily Payroll</span>
                <span className="text-brand-700 font-bold">100% Sync</span>
              </div>
              <div className="p-1 rounded bg-white border border-slate-200/80 shadow-2xs font-medium text-[8px] flex items-center justify-between">
                <span>Inventory</span>
                <span className="text-indigo-700 font-bold">Real-time</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Floating Glass Executive Takeaway Pill (Reference Image Style) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-lg shadow-brand-500/10 flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold mr-2 sm:mr-6"
      >
        <div className="size-6 sm:size-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Lightbulb className="w-3.5 h-3.5" />
        </div>
        <span>
          Different industries. Different challenges.{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-brand-600">
            Real solutions.
          </span>
        </span>
      </motion.div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// COMPONENT: BrandStoryStage (Master Orchestrator)
// Integrated Theatre inspired by the Reference Image:
// - Left Column: Vertical Chapter Navigation Track
// - Center / Main Stage: Backdrop + Editorial Headline + Cutout Presenter + Hardware/Software UI
// ═════════════════════════════════════════════════════════════════════
function BrandStoryStage({
  activeScene,
  activeSceneIndex,
  onSeekToScene,
  onExploreLead,
  sceneShotProgress,
  isPlaying,
}) {
  const config = PRESENTER_CONFIG[activeScene.id] || PRESENTER_CONFIG[1];

  return (
    <div className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between overflow-hidden">
      {/* 1. Panoramic Studio Office Backdrop with Sunlight & Wood Desk Plane */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <img
          src="/presenter/film_stage_backdrop.jpg"
          alt="Studio Background"
          className="w-full h-full object-cover object-center filter brightness-[1.02] contrast-[0.98]"
        />
        {/* Soft daylight ambient overlay to keep Prajyot Infotech theme light and readable */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        {/* Depth vignette gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/90 via-white/50 to-transparent" />
      </div>

      {/* 2. Main Stage Content Grid */}
      <div className="relative z-10 w-full flex-1 flex flex-col lg:flex-row">
        {/* Left Column: Vertical Chapter Navigation Track (Reference Image Style) */}
        <div className="hidden lg:flex flex-col justify-between py-6 pl-4 pr-6 border-r border-slate-200/60 z-20 shrink-0 w-52 xl:w-60">
          <div className="relative flex flex-col gap-2.5">
            {/* Connecting vertical background line */}
            <div className="absolute left-[13px] top-3 bottom-3 w-[1.5px] bg-slate-200" aria-hidden="true" />

            {STORY_CHAPTERS.map((ch, idx) => {
              const isCurrent = activeScene.chapter === ch.chapter;
              const isCompleted = parseFloat(activeScene.chapter) > parseFloat(ch.chapter);

              return (
                <button
                  key={ch.id}
                  onClick={() => onSeekToScene(ch.start)}
                  className={`group flex items-center gap-2.5 text-left transition-all relative z-10 cursor-pointer ${
                    isCurrent ? "scale-102" : "hover:translate-x-0.5"
                  }`}
                >
                  {/* Node Circle */}
                  <div
                    className={`size-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold transition-all shadow-xs ${
                      isCurrent
                        ? "bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 text-white ring-4 ring-brand-500/20 shadow-md shadow-brand-500/25"
                        : isCompleted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold"
                        : "bg-white text-slate-400 border border-slate-200 group-hover:text-slate-700 group-hover:border-slate-300"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3 h-3 text-emerald-600" /> : ch.chapter}
                  </div>

                  {/* Chapter Title */}
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold tracking-tight transition-colors truncate ${
                        isCurrent
                          ? "text-slate-900 font-extrabold"
                          : isCompleted
                          ? "text-slate-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {ch.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center / Right Stage Area */}
        <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 lg:p-8 min-w-0 relative">
          {/* Top Stage Row: Editorial Headline (Left) + Hardware / Visuals (Right) */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 z-10">
            {/* Top-Left: Large Impactful Editorial Typography */}
            <EditorialHeadline scene={activeScene} />

            {/* Top-Right & Center: Dynamic Visual Content (Hardware, 3D Cards, or Chapter UI) */}
            <div className="w-full lg:w-auto flex-1 flex justify-end">
              <SceneVisualRenderer
                sceneId={activeScene.id}
                onExploreLead={onExploreLead}
                sceneShotProgress={sceneShotProgress}
                isPlaying={isPlaying}
              />
            </div>
          </div>

          {/* 3. FOREGROUND CUTOUT PRESENTER (NO CARD BORDER — STANDING ON DESK PLANE) */}
          <AnimatePresence mode="wait">
            {config.mode !== "hidden" && (
              <motion.div
                key={`presenter-${activeScene.id}-${config.pose}`}
                initial={{ opacity: 0, x: -20, scale: 0.98 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 z-20 pointer-events-none transition-all duration-700 select-none left-[12%] sm:left-[20%] lg:left-[26%]"
              >
                {/* Soft contact shadow on the desk plane */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-5 bg-slate-950/20 blur-md rounded-full pointer-events-none"
                />

                {/* Transparent Cutout Presenter with Natural Subtle Life Breathing Motion */}
                <motion.img
                  src={config.pose}
                  alt={`${config.name} — ${config.title}`}
                  animate={{
                    scale: [1, 1.014, 1],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-[280px] sm:h-[350px] md:h-[410px] lg:h-[470px] xl:h-[500px] w-auto object-contain object-bottom filter drop-shadow-[0_16px_22px_rgba(15,23,42,0.22)]"
                />

                {/* Discreet Human Guide Status Pin */}
                <div className="absolute bottom-8 left-2 sm:left-4 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-white text-[9px] font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg pointer-events-auto">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HUMAN BRAND GUIDE</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// COMPONENT: SceneVisualRenderer
// Rich, authentic visual compositions representing each narration beat
// ═════════════════════════════════════════════════════════════════════
function SceneVisualRenderer({ sceneId, onExploreLead, sceneShotProgress = 0, isPlaying = false }) {
  switch (sceneId) {
    // 01 — EVERY BUSINESS IS DIFFERENT (Reference Image Style Hardware Showcase)
    case 1:
      return <ReferenceHardwareShowcase />;

    // 02 — WHY TEMPLATES? (Rejected Stiff Template vs Prajyot Bespoke Architecture)
    case 2:
      return (
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 items-center">
          {/* Rigid Template Card (Stamped & Rejected) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 rounded-xl sm:rounded-2xl border border-red-200/90 bg-red-50/50 relative overflow-hidden shadow-xs"
          >
            <motion.div
              initial={{ scale: 2, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 0.9, rotate: -8 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 300, damping: 18 }}
              className="absolute top-4 right-3 z-10 pointer-events-none px-2 py-0.5 rounded border-2 border-red-600 bg-white/90 text-red-700 font-mono font-black text-[9px] tracking-wider uppercase shadow-xs"
            >
              FORCED FIT
            </motion.div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-red-700 mb-2.5">
              <span className="line-through">GENERIC TEMPLATES</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-600">
              <div className="p-2 rounded-lg bg-white/90 border border-red-100 flex items-center justify-between">
                <span className="line-through text-slate-500">Rigid columns you can't adapt</span>
                <span className="text-[10px] font-mono text-red-600 font-bold">&times; Stiff</span>
              </div>
              <div className="p-2 rounded-lg bg-white/90 border border-red-100 flex items-center justify-between">
                <span className="line-through text-slate-500">Per-user monthly licensing fees</span>
                <span className="text-[10px] font-mono text-red-600 font-bold">&times; Seat Tax</span>
              </div>
              <div className="p-2 rounded-lg bg-white/90 border border-red-100 flex items-center justify-between">
                <span className="line-through text-slate-500">Forced manual spreadsheet work</span>
                <span className="text-[10px] font-mono text-red-600 font-bold">&times; Friction</span>
              </div>
            </div>
          </motion.div>

          {/* Custom Software Card (Illuminated & Verified) */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-4 rounded-xl sm:rounded-2xl border-2 border-emerald-500/80 bg-white shadow-lg shadow-emerald-500/10 relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>BESPOKE ARCHITECTURE</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] font-bold tracking-wider uppercase">
                100% FIT
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-700 font-medium">
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <span>Direct Workflow Matching</span>
                <span className="text-emerald-700 font-bold font-mono">100% Fit</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <span>Source Code &amp; Dedicated Database</span>
                <span className="text-brand-700 font-bold font-mono">You Own It</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <span>Zero Seat Penalties</span>
                <span className="text-emerald-700 font-bold font-mono">Scale Freely</span>
              </div>
            </div>
          </motion.div>
        </div>
      );

    // 03 — PRAJYOT INFOTECH REVEAL & PHILOSOPHY
    case 3:
      return (
        <div className="w-full max-w-xl p-5 sm:p-6 rounded-2xl border border-brand-200/80 bg-white/95 backdrop-blur-md shadow-lg shadow-brand-500/10 text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-200/70 shadow-xs">
              <img
                src="/videos/SingleLogo.png"
                alt="Prajyot Infotech Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-slate-900 tracking-tight">PRAJYOT INFOTECH</div>
              <div className="text-[10px] font-mono text-brand-700 font-bold uppercase">SOFTWARE ENGINEERING &amp; PRODUCT STUDIO</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-mono text-slate-600">
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">Problem First</span>
            <span className="text-brand-500 font-bold">&rarr;</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">Deep Understanding</span>
            <span className="text-brand-500 font-bold">&rarr;</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 shadow-2xs">Bespoke Design</span>
            <span className="text-brand-500 font-bold">&rarr;</span>
            <span className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold shadow-xs">
              Production Engine
            </span>
          </div>
        </div>
      );

    // 04 — TRANSFORMATION PIPELINE (Conveyor Beam)
    case 4: {
      const activeStepIdx = Math.min(4, Math.floor((sceneShotProgress / 100) * 5));
      const steps = [
        { step: "01", label: "Business Need", detail: "Ground audits & pain points", icon: Activity },
        { step: "02", label: "User Journey", detail: "UX & approval flows", icon: Workflow },
        { step: "03", label: "Architecture", detail: "Clean APIs & PostgreSQL", icon: Database },
        { step: "04", label: "Hardened Code", detail: "React, Node, test security", icon: Code2 },
        { step: "05", label: "Working Engine", detail: "Deployed & operational", icon: CheckCircle2 },
      ];

      return (
        <div className="w-full max-w-xl space-y-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {steps.map((s, i) => {
              const isCurrent = i === activeStepIdx;
              return (
                <div
                  key={s.step}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isCurrent
                      ? "border-brand-500 bg-brand-50/80 shadow-sm ring-2 ring-brand-500/20"
                      : "border-slate-200 bg-white/90 shadow-2xs"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-brand-600">{s.step}</span>
                    <s.icon className={`w-3.5 h-3.5 ${isCurrent ? "text-brand-600" : "text-slate-400"}`} />
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">{s.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{s.detail}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // 05 — CAPABILITIES MATRIX (Full Stack Systems)
    case 5:
      return (
        <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {[
            { title: "High-Scale Websites", icon: Globe, detail: "Next.js, Vite, SSR, SEO" },
            { title: "E-Commerce Engines", icon: ShoppingCart, detail: "Checkout, Payments, ERP" },
            { title: "Mobile Applications", icon: Smartphone, detail: "Native iOS & Android" },
            { title: "Enterprise ERP & CRM", icon: Database, detail: "PostgreSQL, ACID, Audits" },
            { title: "Workflow Automation", icon: Workflow, detail: "WhatsApp, Alerts, Webhooks" },
            { title: "Industry-Specific SaaS", icon: Layers, detail: "Multi-tenant & Isolated" },
          ].map((item, i) => (
            <div
              key={item.title}
              className="p-3 rounded-xl border border-slate-200/90 bg-white/95 backdrop-blur-xs shadow-2xs hover:border-brand-300 transition-all"
            >
              <div className="size-7 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center mb-1.5">
                <item.icon className="w-3.5 h-3.5" />
              </div>
              <div className="font-extrabold text-xs text-slate-900 leading-tight">{item.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{item.detail}</div>
            </div>
          ))}
        </div>
      );

    // 06 — THE TRIAD (Design + Engineering + Business Logic)
    case 6:
      return (
        <div className="w-full max-w-xl space-y-3">
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl border border-purple-200 bg-purple-50/50 text-center">
              <div className="size-8 rounded-lg bg-white border border-purple-200 text-purple-700 flex items-center justify-center mx-auto mb-1 font-black text-xs">
                DES
              </div>
              <div className="font-extrabold text-xs text-slate-900">Design</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Intuitive Figma UX</div>
            </div>

            <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 text-center">
              <div className="size-8 rounded-lg bg-white border border-blue-200 text-blue-700 flex items-center justify-center mx-auto mb-1 font-black text-xs">
                ENG
              </div>
              <div className="font-extrabold text-xs text-slate-900">Engineering</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Robust PostgreSQL</div>
            </div>

            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center">
              <div className="size-8 rounded-lg bg-white border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-1 font-black text-xs">
                BIZ
              </div>
              <div className="font-extrabold text-xs text-slate-900">Business Logic</div>
              <div className="text-[10px] text-slate-600 mt-0.5">Taxes &amp; Approvals</div>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-slate-900 text-white text-center text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 shadow-xs">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>THE PRAJYOT TRIAD: ZERO-COMPROMISE PRODUCTION SYSTEM</span>
          </div>
        </div>
      );

    // 07 — BEYOND DELIVERY
    case 7:
      return (
        <div className="w-full max-w-xl p-4 rounded-xl border border-slate-200 bg-white/95 shadow-sm text-center">
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Typical Agency</div>
              <div className="text-xs font-black text-slate-800 mt-1">"Ticket Closed" at Launch</div>
              <div className="text-[10px] text-slate-500 mt-1">Leaves staff struggling with confusing software.</div>
            </div>
            <div className="p-3 rounded-xl bg-brand-50/80 border border-brand-200">
              <div className="text-[10px] font-bold text-brand-700 uppercase">Prajyot Commitment</div>
              <div className="text-xs font-black text-brand-900 mt-1">Guaranteed Adoption</div>
              <div className="text-[10px] text-brand-700 mt-1">Ground training, site visits, and SLA support.</div>
            </div>
          </div>
        </div>
      );

    // 08 — GROUND TRAINING PIPELINE
    case 8:
      return (
        <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { step: "01", title: "Deploy", desc: "Docker & AWS/GCP cloud setup", icon: Server },
            { step: "02", title: "Onboard", desc: "User permissions & workflows", icon: Users },
            { step: "03", title: "Ground Train", desc: "Physical on-site training", icon: HardHat },
            { step: "04", title: "Warranty", desc: "Direct engineering support", icon: ShieldCheck },
          ].map((item, i) => (
            <div key={item.step} className="p-3 rounded-xl border border-slate-200 bg-white/95 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-brand-600">{item.step}</span>
                <item.icon className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="text-xs font-extrabold text-slate-900">{item.title}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      );

    // 09 — REAL SOFTWARE / REAL WORK
    case 9:
      return (
        <div className="w-full max-w-xl grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/60">
            <div className="font-extrabold text-xs text-amber-900">Dusty Construction Sites</div>
            <div className="text-[10px] text-amber-700 mt-0.5">High-glare screens, offline muster cache, rugged UI.</div>
          </div>
          <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/60">
            <div className="font-extrabold text-xs text-blue-900">Busy Retail Counters</div>
            <div className="text-[10px] text-blue-700 mt-0.5">0.2s barcode lookups, zero freeze under rush hour.</div>
          </div>
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60">
            <div className="font-extrabold text-xs text-emerald-900">Logistics &amp; Depots</div>
            <div className="text-[10px] text-emerald-700 mt-0.5">E-way bill auto-generation, multi-depot sync.</div>
          </div>
          <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/60">
            <div className="font-extrabold text-xs text-rose-900">Active Hospital Clinics</div>
            <div className="text-[10px] text-rose-700 mt-0.5">Rapid patient queue management &amp; EHR security.</div>
          </div>
        </div>
      );

    // 10 — CLIENT OWNERSHIP (Your Code, Your Systems, Your IP)
    case 10:
      return (
        <div className="w-full max-w-xl grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center">
            <FileCode2 className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="font-extrabold text-xs text-slate-900">Your Code</div>
            <div className="text-[10px] text-slate-600 mt-0.5">100% full Git repo handover</div>
          </div>
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center">
            <Database className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="font-extrabold text-xs text-slate-900">Your Systems</div>
            <div className="text-[10px] text-slate-600 mt-0.5">Dedicated private database</div>
          </div>
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 text-center">
            <Lock className="w-5 h-5 text-emerald-700 mx-auto mb-1" />
            <div className="font-extrabold text-xs text-slate-900">Your IP</div>
            <div className="text-[10px] text-slate-600 mt-0.5">Zero recurring seat penalty</div>
          </div>
        </div>
      );

    // 11 — INDEPENDENCE & ARCHITECTURAL AUTONOMY
    case 11:
      return (
        <div className="w-full max-w-xl p-4 rounded-xl border border-slate-200 bg-white/95 shadow-sm text-center">
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500">DATABASE</div>
              <div className="font-black text-xs text-slate-900 mt-0.5">Dedicated PostgreSQL</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Isolated instance on your AWS/GCP account.</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500">SUBSCRIPTION FEES</div>
              <div className="font-black text-xs text-emerald-700 mt-0.5">₹0 Monthly Seat Tax</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Add 100 or 1,000 users without extra fee.</div>
            </div>
          </div>
        </div>
      );

    // 12 — 7 VITAL INDUSTRY VERTICALS
    case 12:
      return (
        <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { name: "Construction", icon: HardHat },
            { name: "Retail & IMEI", icon: ShoppingCart },
            { name: "Healthcare", icon: Stethoscope },
            { name: "Hospitality", icon: Utensils },
            { name: "Real Estate", icon: Building2 },
            { name: "Education", icon: GraduationCap },
            { name: "Distribution", icon: Truck },
            { name: "Global SaaS", icon: Globe },
          ].map((sec) => (
            <div key={sec.name} className="p-2.5 rounded-xl border border-slate-200 bg-white/95 shadow-2xs flex items-center gap-2">
              <sec.icon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span className="text-[11px] font-extrabold text-slate-900 truncate">{sec.name}</span>
            </div>
          ))}
        </div>
      );

    // 13 — OIBUZ HRMS PROPRIETARY SUITE
    case 13:
      return (
        <div className="w-full max-w-xl p-4 sm:p-5 rounded-2xl border-2 border-amber-500/80 bg-white/95 shadow-lg shadow-amber-500/10">
          <div className="flex items-center justify-between mb-3 border-b border-amber-100 pb-2">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white font-black text-xs flex items-center justify-center">
                OB
              </div>
              <div>
                <div className="font-black text-xs sm:text-sm text-slate-900">OIBUZ CONSTRUCTION HRMS</div>
                <div className="text-[9px] font-mono text-amber-700 font-bold">FLAGSHIP PROPRIETARY SUITE</div>
              </div>
            </div>
            <Link
              to="/oibuz"
              className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/80 hover:bg-amber-200 px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
            >
              <span>Explore</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
            <div className="p-2 rounded bg-amber-50/60 border border-amber-200/60">
              <div className="font-bold text-slate-800">GPS Muster Card</div>
              <div className="text-slate-500 text-[9px]">Offline geo-fence site checkin</div>
            </div>
            <div className="p-2 rounded bg-amber-50/60 border border-amber-200/60">
              <div className="font-bold text-slate-800">Daily Labour Wages</div>
              <div className="text-slate-500 text-[9px]">Cash &amp; bank weekly muster</div>
            </div>
            <div className="p-2 rounded bg-amber-50/60 border border-amber-200/60">
              <div className="font-bold text-slate-800">Multi-Site Inventory</div>
              <div className="text-slate-500 text-[9px]">Cement, steel, machinery logs</div>
            </div>
          </div>
        </div>
      );

    // 14 — OUR MISSION (What Businesses Can Become)
    case 14:
      return (
        <div className="w-full max-w-xl p-5 sm:p-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 via-white to-brand-50/80 shadow-md text-center">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto mb-2.5 shadow-md shadow-brand-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Engineering What Businesses Can Become
          </div>
          <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed">
            From regional industry players to modern tech-enabled market leaders. We provide the full-stack engineering engine.
          </p>
        </div>
      );

    // 15 — PRAJYOT INFOTECH OFFICIAL BRAND REVEAL & CTA
    case 15:
    default:
      return (
        <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-brand-200/90 bg-white/95 backdrop-blur-md shadow-xl shadow-brand-500/10 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-200 shadow-sm">
              <img
                src="/videos/SingleLogo.png"
                alt="Prajyot Infotech Logo"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">PRAJYOT INFOTECH</div>
              <div className="text-xs font-mono font-bold text-brand-700">SOFTWARE ENGINEERED AROUND YOUR BUSINESS</div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Headquartered in Pune, Maharashtra. Engineering custom digital platforms, high-performance web systems, and dedicated business applications for clients across India, USA, UAE, and Europe.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onExploreLead}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-700 to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Engineer Your Software</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/work"
              className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all"
            >
              <span>Explore Case Studies</span>
            </Link>
          </div>
        </div>
      );
  }
}

// ═════════════════════════════════════════════════════════════════════
// COMPONENT: CinematicBottomPlayerBar
// Matches Reference Image bottom bar with Play/Pause, timer, gradient scrubber,
// soundwaves, volume, and fullscreen toggle
// ═════════════════════════════════════════════════════════════════════
function CinematicBottomPlayerBar({
  isPlaying,
  hasStarted,
  effectiveTime,
  duration,
  progressRatio,
  isMuted,
  onTogglePlay,
  onToggleMute,
  onToggleFullscreen,
  trackRef,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  isDragging,
  activeScene,
}) {
  return (
    <div className="relative z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-white px-4 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between gap-4">
      {/* Left: Circular Play/Pause button + Timer readout */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onTogglePlay}
          className="size-10 sm:size-11 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title={isPlaying ? "Pause (Space)" : "Play (Space)"}
          aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
        </button>

        <div className="font-mono text-xs sm:text-sm font-bold tracking-tight text-slate-200">
          <span>{formatTime(effectiveTime)}</span>
          <span className="text-slate-500 mx-1">/</span>
          <span className="text-slate-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Center: Interactive Scrubbable Timeline */}
      <div className="flex-1 flex items-center gap-3 min-w-0 max-w-3xl">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative flex-1 py-3 cursor-grab active:cursor-grabbing select-none touch-none group"
          title="Drag forward or backward to seek"
        >
          {/* Track background */}
          <div className="relative h-2 bg-slate-700/80 rounded-full overflow-hidden transition-colors group-hover:bg-slate-700">
            {/* Gradient progress fill */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-brand-500 rounded-full"
              style={{ width: `${progressRatio}%` }}
            />
          </div>

          {/* Dragger thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ left: `${progressRatio}%` }}
          >
            <div
              className={`size-4 rounded-full bg-white border-2 border-purple-500 shadow-md transition-transform ${
                isDragging ? "scale-125 ring-4 ring-purple-500/30" : "group-hover:scale-125"
              }`}
            />
          </div>

          {/* Live Tooltip while dragging */}
          {isDragging && (
            <div
              className="absolute bottom-full mb-1.5 -translate-x-1/2 pointer-events-none px-2.5 py-1 rounded-md bg-slate-950 border border-slate-700 text-white text-[10px] font-mono font-bold shadow-xl whitespace-nowrap z-40"
              style={{ left: `${progressRatio}%` }}
            >
              {formatTime(effectiveTime)} &bull; {activeScene.tag}
            </div>
          )}
        </div>

        {/* Holographic soundwave strands */}
        <HolographicAudioStrands isPlaying={isPlaying} />
      </div>

      {/* Right Controls: Volume + Fullscreen + Scroll hint */}
      <div className="flex items-center gap-2.5 sm:gap-4 shrink-0 text-slate-400">
        <button
          onClick={onToggleMute}
          className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer hidden sm:block"
          title="Toggle Fullscreen"
          aria-label="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        <span className="hidden xl:inline-block text-[10px] font-mono font-bold text-slate-500 tracking-wider">
          SCROLL TO EXPLORE &darr;
        </span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
// MASTER COMPONENT: BrandAudioStory
// ═════════════════════════════════════════════════════════════════════
export default function BrandAudioStory() {
  const { openLeadModal } = useLeadModal();
  const prefersReducedMotion = useReducedMotion();

  // Core Playback State
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TOTAL_DURATION);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [audioError, setAudioError] = useState(null);

  // Smooth dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const isDraggingRef = useRef(false);
  const wasPlayingRef = useRef(false);
  const lastAudioSeekTimeRef = useRef(0);
  const trackRef = useRef(null);

  const audioRef = useRef(null);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  // Pre-load all cutout presenter images & backdrop for instant switching
  useEffect(() => {
    const assets = [
      "/presenter/film_stage_backdrop.jpg",
      "/presenter/cutout_open.png",
      "/presenter/cutout_gesture.png",
      "/presenter/cutout_poised.png",
      "/presenter/ind_construction.jpg",
      "/presenter/ind_retail.jpg",
      "/presenter/ind_healthcare.jpg",
      "/presenter/ind_hospitality.jpg",
    ];
    assets.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Determine current active scene based strictly on currentTime
  const syncSceneWithTime = useCallback((time) => {
    const idx = BRAND_SCENES.findIndex((s) => time >= s.start && time < s.end);
    if (idx !== -1) {
      setActiveSceneIndex(idx);
    } else if (time >= BRAND_SCENES[BRAND_SCENES.length - 1].start) {
      setActiveSceneIndex(BRAND_SCENES.length - 1);
    }
  }, []);

  // Continuous high-precision master sync loop via requestAnimationFrame
  const startRafLoop = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const loop = () => {
      if (audioRef.current && !audioRef.current.paused) {
        if (!isDraggingRef.current) {
          const t = audioRef.current.currentTime;
          setCurrentTime(t);
          syncSceneWithTime(t);
        }
        rafRef.current = requestAnimationFrame(loop);
      }
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [syncSceneWithTime]);

  const stopRafLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // Audio lifecycle handlers
  const handlePlay = useCallback(() => {
    if (!audioRef.current) return;
    setHasStarted(true);
    setAudioError(null);

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
        startRafLoop();
      })
      .catch((err) => {
        setAudioError("Click to play audio.");
        setIsPlaying(false);
      });
  }, [startRafLoop]);

  const handlePause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    stopRafLoop();
  }, [stopRafLoop]);

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePause, handlePlay]);

  const handleToggleMute = useCallback(() => {
    if (audioRef.current) {
      const next = !isMuted;
      audioRef.current.muted = next;
      setIsMuted(next);
    }
  }, [isMuted]);

  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Seek audio to specific timestamp
  const handleSeek = useCallback(
    (timeInSeconds) => {
      const clamped = Math.max(0, Math.min(timeInSeconds, duration));
      setCurrentTime(clamped);
      syncSceneWithTime(clamped);
      if (audioRef.current) {
        audioRef.current.currentTime = clamped;
      }
      if (!hasStarted) {
        handlePlay();
      }
    },
    [duration, syncSceneWithTime, hasStarted, handlePlay]
  );

  // Keyboard shortcut: Spacebar to toggle Play/Pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        handleTogglePlay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleTogglePlay]);

  // Pointer drag scrubbing logic
  const getTimeFromPointer = useCallback(
    (clientX) => {
      if (!trackRef.current) return 0;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const ratio = rect.width > 0 ? clickX / rect.width : 0;
      return ratio * duration;
    },
    [duration]
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (!trackRef.current) return;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      isDraggingRef.current = true;
      wasPlayingRef.current = isPlaying;
      setIsDragging(true);

      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        stopRafLoop();
      }

      const t = getTimeFromPointer(e.clientX);
      setDragTime(t);
      setCurrentTime(t);
      syncSceneWithTime(t);

      if (audioRef.current) {
        audioRef.current.currentTime = t;
      }
    },
    [isPlaying, stopRafLoop, getTimeFromPointer, syncSceneWithTime]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      const t = getTimeFromPointer(e.clientX);
      setDragTime(t);
      setCurrentTime(t);
      syncSceneWithTime(t);

      const now = performance.now();
      if (now - lastAudioSeekTimeRef.current > 50) {
        lastAudioSeekTimeRef.current = now;
        if (audioRef.current) {
          audioRef.current.currentTime = t;
        }
      }
    },
    [getTimeFromPointer, syncSceneWithTime]
  );

  const handlePointerUp = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      isDraggingRef.current = false;
      setIsDragging(false);

      const finalTime = getTimeFromPointer(e.clientX);
      setCurrentTime(finalTime);
      syncSceneWithTime(finalTime);

      if (audioRef.current) {
        audioRef.current.currentTime = finalTime;
      }

      if (wasPlayingRef.current) {
        handlePlay();
      }
    },
    [getTimeFromPointer, syncSceneWithTime, handlePlay]
  );

  // Bind native audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      stopRafLoop();
      setCurrentTime(duration);
      setActiveSceneIndex(BRAND_SCENES.length - 1);
    };
    const onTimeUpdate = () => {
      const t = audio.currentTime;
      setCurrentTime(t);
      syncSceneWithTime(t);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      stopRafLoop();
    };
  }, [duration, stopRafLoop, syncSceneWithTime]);

  const activeScene = BRAND_SCENES[activeSceneIndex] || BRAND_SCENES[0];
  const effectiveTime = isDragging ? dragTime : currentTime;
  const progressRatio = duration > 0 ? Math.max(0, Math.min((effectiveTime / duration) * 100, 100)) : 0;

  // Real-time within-scene shot metronome (0% to 100%)
  const sceneDuration = Math.max(0.1, activeScene.end - activeScene.start);
  const sceneElapsed = Math.max(0, effectiveTime - activeScene.start);
  const sceneShotProgress = Math.max(0, Math.min((sceneElapsed / sceneDuration) * 100, 100));

  return (
    <section
      id="brand-story"
      aria-label="Prajyot Infotech Brand Story Film"
      className="relative py-12 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white border-y border-slate-200/80 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-brand-500/10 blur-[130px] rounded-full"
      />

      {/* Hidden Master Audio Element */}
      <audio
        ref={audioRef}
        src={BRAND_STORY_AUDIO_URL}
        preload="metadata"
        playsInline
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How We Engineer Software{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-navy-700">
              Around Your Business
            </span>
          </h2>

          <p className="mt-2.5 sm:mt-3 text-xs sm:base md:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Listen to the philosophy, engineering standards, and ground deployment principles that define every digital system we build.
          </p>
        </div>

        {/* ═══ MAIN FILM THEATRE CARD (Inspired by Reference Image) ═══ */}
        <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-2xl shadow-brand-500/10 overflow-hidden transition-all">
          {/* Top Bar / Brand Ticker */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-8 py-2.5 sm:py-3 bg-white/95 border-b border-slate-200/80 text-xs relative z-20">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5">
                <img
                  src="/videos/SingleLogo.png"
                  alt="Prajyot Infotech"
                  className="h-5 sm:h-6 w-auto object-contain"
                />
                <span className="font-extrabold text-slate-900 tracking-tight text-xs sm:text-sm">PRAJYOT INFOTECH</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="inline-flex items-center gap-1 font-mono font-bold text-brand-700 bg-brand-50 px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] sm:text-xs">
                <span>SCENE {activeScene.chapter}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="truncate max-w-[120px] sm:max-w-none">{activeScene.tag}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 font-mono text-slate-600 ml-auto sm:ml-0">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-2xs">
                <VoiceEqualizer isPlaying={isPlaying} />
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-700">
                  {isPlaying ? "VOICE LIVE" : hasStarted ? "PAUSED" : "1:48 AUDIO"}
                </span>
              </div>
            </div>
          </div>

          {/* INITIAL OVERLAY (Before User Hits Play) */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-40 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6 text-center"
              >
                <div className="max-w-xl mx-auto space-y-4 sm:space-y-6">
                  <div className="inline-flex items-center justify-center size-16 sm:size-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 text-brand-700 shadow-md shadow-brand-500/10">
                    <img
                      src="/videos/SingleLogo.png"
                      alt="Prajyot Infotech Logo"
                      className="h-8 sm:h-10 w-auto object-contain"
                    />
                  </div>

                  <div>
                    <div className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-brand-600">
                      PRAJYOT INFOTECH OFFICIAL FILM
                    </div>
                    <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-snug">
                      See How We Engineer Technology Around Your Business.
                    </h3>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
                      1 minute and 48 seconds of pure company philosophy, architecture, ground deployments, and client IP ownership.
                    </p>

                    <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium shadow-2xs">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Guided by Ananya Sharma &bull; Senior Tech Consultant</span>
                    </div>
                  </div>

                  <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                    <button
                      onClick={handlePlay}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-brand-600 text-white font-bold text-xs sm:text-base shadow-lg shadow-brand-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>▶ PLAY BRAND STORY</span>
                    </button>

                    <button
                      onClick={() => {
                        handlePlay();
                        setIsMuted(true);
                        if (audioRef.current) audioRef.current.muted = true;
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                      <span>Watch Silently (Muted)</span>
                    </button>
                  </div>

                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">
                    Press Space anytime to Play/Pause &bull; Click chapter nodes on left to jump
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ═══ PANORAMIC THEATRE VIEWPORT ═══ */}
          <BrandStoryStage
            activeScene={activeScene}
            activeSceneIndex={activeSceneIndex}
            onSeekToScene={handleSeek}
            onExploreLead={openLeadModal}
            sceneShotProgress={sceneShotProgress}
            isPlaying={isPlaying}
          />

          {/* ═══ INTEGRATED CINEMATIC BOTTOM AUDIO PLAYER BAR ═══ */}
          <CinematicBottomPlayerBar
            isPlaying={isPlaying}
            hasStarted={hasStarted}
            effectiveTime={effectiveTime}
            duration={duration}
            progressRatio={progressRatio}
            isMuted={isMuted}
            onTogglePlay={handleTogglePlay}
            onToggleMute={handleToggleMute}
            onToggleFullscreen={handleToggleFullscreen}
            trackRef={trackRef}
            handlePointerDown={handlePointerDown}
            handlePointerMove={handlePointerMove}
            handlePointerUp={handlePointerUp}
            isDragging={isDragging}
            activeScene={activeScene}
          />
        </div>
      </div>
    </section>
  );
}
