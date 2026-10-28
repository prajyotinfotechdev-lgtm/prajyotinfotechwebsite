import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import PortfolioDemoModal from "../components/PortfolioDemoModal.jsx";
import ProjectEstimator from "../components/ProjectEstimator.jsx";
import EngineeringProcess from "../components/EngineeringProcess.jsx";
import TrustGuarantees from "../components/TrustGuarantees.jsx";
import {
  Search,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Layers,
  X,
  TrendingUp,
  Zap,
  ChevronRight,
  Globe,
  Building2,
} from "lucide-react";

import { PROJECTS, INDUSTRIES } from "../data/projectsData.js";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// ─── INDUSTRY ICON MAP ──────────────────────────────────────────────────────
const industryEmoji = {
  "Luxury Fashion": "👗",
  "Hospitality":   "🍽️",
  "Retail":        "📱",
  "E-Commerce":    "🛒",
  "Healthcare":    "🏥",
  "SaaS":          "☁️",
  "Wholesale":     "📦",
  "Education":     "🎓",
  "Real Estate":   "🏗️",
};

// ─── STAT COUNTER STRIP ──────────────────────────────────────────────────────
const STATS = [
  { value: "9+", label: "Deployed Systems" },
  { value: "50K+", label: "Daily Active Users" },
  { value: "100%", label: "IP Ownership Given" },
  { value: "3–4 wk", label: "Avg. Delivery Sprint" },
];

// ─── PREMIUM PROJECT CARD ─────────────────────────────────────────────────────
function ProjectCard({ project, index, onOpenDemo, prefersReducedMotion }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  function handleMouseMove(e) {
    if (prefersReducedMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 20);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 20);
  }
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      id={project.id}
      ref={cardRef}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: prefersReducedMotion ? 0 : springY, rotateY: prefersReducedMotion ? 0 : springX, transformStyle: "preserve-3d", perspective: 1200 }}
      className="group relative flex flex-col rounded-2xl border border-white/[0.07] bg-[#0f1420] overflow-hidden scroll-mt-32 transition-colors duration-300 hover:border-white/[0.14] cursor-default"
    >
      {/* ── Coloured Top Accent Strip ── */}
      <div
        className="h-[3px] w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${project.accent}, ${project.secondary})` }}
      />

      {/* ── Visual Hero Area ── */}
      <div className="relative h-52 overflow-hidden bg-[#070b14] flex items-center justify-center">
        {/* Ambient blob */}
        <motion.div
          animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 220, height: 220,
            background: `radial-gradient(circle, ${project.accent}55, transparent 70%)`,
            filter: "blur(40px)",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Grid dots */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        {/* Industry Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-md shadow-lg"
            style={{ background: `linear-gradient(135deg, ${project.accent}cc, ${project.secondary}cc)` }}
          >
            <span>{industryEmoji[project.tag] || "💡"}</span>
            {project.tag}
          </span>
        </div>

        {/* Year */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-[11px] font-mono text-white/40 tabular-nums">{project.year}</span>
        </div>

        {/* Logo or big metric */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center px-6">
          {project.logo ? (
            <img
              src={project.logo}
              alt={`${project.client} logo`}
              className="w-16 h-16 rounded-full object-cover shadow-xl"
              style={{ boxShadow: `0 0 32px ${project.accent}55` }}
            />
          ) : (
            <div
              className="text-5xl font-black tabular-nums leading-none tracking-tight"
              style={{ color: project.accent, textShadow: `0 0 40px ${project.accent}80` }}
            >
              {project.metrics.value}
            </div>
          )}
          <p className="text-[11px] text-white/40 font-mono uppercase tracking-widest">
            {project.logo ? project.client : project.metrics.label}
          </p>
        </div>

        {/* Shimmer on hover */}
        <motion.div
          initial={{ x: "-110%", opacity: 0 }}
          whileHover={{ x: "220%", opacity: 1 }}
          transition={{ duration: 0.75 }}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent skew-x-12 pointer-events-none"
        />

        {/* Live site pill — only if liveUrl exists */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1.5 rounded-xl backdrop-blur-md border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white text-[11px] font-semibold transition"
          >
            <Globe className="w-3 h-3" />
            Live Site
          </a>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        {/* Client & Scale */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="w-3.5 h-3.5 text-white/25 shrink-0" />
            <span className="text-[11px] text-white/45 font-mono truncate">{project.client}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono shrink-0 ml-2">{project.scale}</span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-white leading-snug group-hover:text-white transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-white/45 leading-relaxed line-clamp-2 flex-1">
          {project.shortDesc}
        </p>

        {/* Key result pill */}
        <div
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
          style={{ background: `${project.accent}12`, border: `1px solid ${project.accent}25` }}
        >
          <TrendingUp className="w-3.5 h-3.5 shrink-0" style={{ color: project.accent }} />
          <span className="text-[11px] font-semibold" style={{ color: project.accent }}>
            {project.metrics.value}
          </span>
          <span className="text-[11px] text-white/40">{project.metrics.sub}</span>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/40 bg-white/[0.04] border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-white/25 bg-white/[0.03] border border-white/[0.05]">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
          <button
            onClick={() => onOpenDemo(project)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold transition cursor-pointer text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.07] hover:border-white/[0.14]"
          >
            <Zap className="w-3.5 h-3.5" style={{ color: project.accent }} />
            Case Study
          </button>
          <a
            href={WA(`Hi Prajyot Infotech, I saw the ${project.title} on your portfolio — I'd love to build something similar.`)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp inquiry about ${project.title}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

// ─── CLEAN STATS STRIP ────────────────────────────────────────────────────────
function StatsStrip() {
  return (
    <div className="border-y border-white/[0.06] bg-[#080c15]">
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="flex flex-col gap-0.5"
          >
            <span className="text-2xl font-black text-white tabular-nums">{s.value}</span>
            <span className="text-[11px] text-white/40 font-mono uppercase tracking-wide">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── INDUSTRY FILTER STRIP ────────────────────────────────────────────────────
function FilterBar({ activeTag, setActiveTag, searchQuery, setSearchQuery }) {
  const tags = ["All", ...INDUSTRIES.filter((i) => i !== "All")];
  return (
    <div className="sticky top-16 z-30 bg-[#080c15]/90 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative shrink-0 w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-white/25 focus:outline-none focus:border-white/20 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Industry pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition cursor-pointer whitespace-nowrap ${
                activeTag === tag
                  ? "bg-white text-[#080c15] shadow"
                  : "bg-white/[0.04] text-white/45 hover:text-white/80 hover:bg-white/[0.07] border border-white/[0.07]"
              }`}
            >
              {industryEmoji[tag] ? `${industryEmoji[tag]} ` : ""}{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN WORK PAGE ───────────────────────────────────────────────────────────
export default function Work() {
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchIndustry = activeTag === "All" || p.tag === activeTag;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));
      return matchIndustry && matchSearch;
    });
  }, [activeTag, searchQuery]);

  const itemListLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.prajyotinfotech.in/work/#webpage",
        "url": "https://www.prajyotinfotech.in/work",
        "name": "Enterprise Software Engineering Portfolio | Prajyot Infotech",
        "description": "Production software applications built by Prajyot Infotech.",
        "isPartOf": { "@id": "https://www.prajyotinfotech.in/#website" }
      },
      {
        "@type": "ItemList",
        "name": "Prajyot Infotech — Enterprise Software Portfolio",
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
    <div
      className="min-h-screen text-white selection:bg-white/20"
      style={{ background: "linear-gradient(180deg, #06090f 0%, #080c15 100%)" }}
    >
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Portfolio", url: "https://www.prajyotinfotech.in/work" },
        ]}
      />
      <Seo
        title="Software Portfolio — 9+ Enterprise Systems | Prajyot Infotech"
        description="Explore Prajyot Infotech's enterprise software portfolio: Luxury E-Commerce, Restaurant QR & KDS, Mobile POS Billing, Clinic EHR, and Multi-Tenant SaaS."
        keywords="software development portfolio, restaurant management, mobile shop billing, clinic EHR, custom SaaS developers Pune India, Prajyot Infotech"
        path="/work"
        schema={itemListLd}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-20 px-4">
        {/* background noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Glow blobs */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-blue-600/[0.06] blur-[120px] pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-violet-600/[0.06] blur-[100px] pointer-events-none translate-x-1/2" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.04] text-[11px] font-semibold text-white/60 tracking-widest uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Production-Grade Engineering
            </div>

            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-black leading-[1.06] tracking-tight text-white">
              Real software.{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #34d399 100%)" }}
              >
                Real results.
              </span>
            </h1>

            <p className="mt-5 text-[15px] sm:text-[17px] text-white/45 leading-relaxed max-w-2xl mx-auto">
              9+ deployed enterprise systems across hospitality, retail, healthcare, and luxury fashion —
              all built, shipped, and owned by our clients.
            </p>

            {/* CTA Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#080c15] text-sm font-bold hover:bg-white/90 transition shadow-lg shadow-white/10"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={WA("Hi Prajyot Infotech, I reviewed your portfolio and want to discuss a project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.12] bg-white/[0.05] text-sm font-semibold text-white/70 hover:text-white hover:bg-white/[0.09] transition"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Discuss a Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <StatsStrip />

      {/* ── FILTER BAR ── */}
      <FilterBar
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* ── PROJECT GRID ── */}
      <main id="portfolio" className="mx-auto max-w-7xl px-4 py-16 space-y-20">

        {/* Count indicator */}
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-white/30 font-mono">
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            {activeTag !== "All" ? ` in ${activeTag}` : ""}
          </p>
          {(activeTag !== "All" || searchQuery) && (
            <button
              onClick={() => { setActiveTag("All"); setSearchQuery(""); }}
              className="text-[11px] text-white/30 hover:text-white/60 flex items-center gap-1 transition"
            >
              <X className="w-3 h-3" /> Clear filters
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <p className="text-lg font-bold text-white">No projects match</p>
              <p className="text-sm text-white/40 mt-1">Try clearing your filters</p>
              <button
                onClick={() => { setActiveTag("All"); setSearchQuery(""); }}
                className="mt-5 px-5 py-2 rounded-full bg-white text-[#080c15] font-bold text-sm"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onOpenDemo={setSelectedProject}
                  prefersReducedMotion={prefersReducedMotion}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Divider ── */}
        <div className="border-t border-white/[0.05]" />

        {/* ── Engineering Lifecycle ── */}
        <div id="process">
          <EngineeringProcess />
        </div>

        {/* ── Trust Guarantees ── */}
        <div id="guarantees">
          <TrustGuarantees />
        </div>

        {/* ── Scope Estimator ── */}
        <div id="estimator">
          <ProjectEstimator />
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] text-center px-6 py-14 sm:py-20">
          {/* Glass background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-violet-600/8 to-emerald-600/10" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.05] text-[11px] text-white/50 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Fixed price · Full IP ownership
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
              Ready to ship your next system?
            </h2>
            <p className="text-[14px] text-white/45 leading-relaxed">
              We deliver in 3–4 week sprints with a defined scope, milestone payments, and 60-day bug warranty.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={WA("Hi Prajyot Infotech, I reviewed your portfolio and would like a quote for my project.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-400 hover:bg-emerald-300 text-[#080c15] font-bold text-sm transition shadow-lg shadow-emerald-400/20"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us Now
              </a>
              <Link
                to="/estimate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-sm transition"
              >
                Get an Instant Estimate
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── DEMO MODAL ── */}
      <PortfolioDemoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}
