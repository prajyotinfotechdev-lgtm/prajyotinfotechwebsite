import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  X,
  TrendingUp,
  ChevronRight,
  Globe,
  Eye,
} from "lucide-react";

import { PROJECTS, INDUSTRIES } from "../data/projectsData.js";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

// ─── CARD COMPONENT ──────────────────────────────────────────────────────────

function ProjectCard({ project, index, onOpenDemo, prefersReducedMotion }) {
  return (
    <motion.article
      id={project.id}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-brand-500/8 hover:-translate-y-1 transition-all duration-500 overflow-hidden scroll-mt-32"
    >
      {/* ── Coloured accent bar ── */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${project.accent}, ${project.secondary})`,
        }}
      />

      {/* ── Visual hero area ── */}
      <div
        className="relative h-48 sm:h-52 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.accent}0d, ${project.secondary}0d, #f8fafc)`,
        }}
      >
        {/* Soft radial glow */}
        <div
          className="absolute w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${project.accent}40, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #64748b 0.5px, transparent 0.5px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Industry pill */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, ${project.secondary})`,
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Year */}
        <span className="absolute top-3.5 right-3.5 text-[11px] font-semibold text-slate-400 z-10">
          {project.year}
        </span>

        {/* Center content — logo or metric */}
        <div className="relative z-10 flex flex-col items-center gap-1.5 px-6 text-center">
          {project.logo ? (
            <motion.img
              src={project.logo}
              alt={`${project.client} logo`}
              className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white"
              whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
          ) : (
            <div
              className="text-4xl font-black tabular-nums"
              style={{ color: project.accent }}
            >
              {project.metrics.value}
            </div>
          )}
          <p className="text-[11px] text-slate-500 font-medium tracking-wide">
            {project.logo ? project.client : project.metrics.label}
          </p>
        </div>

        {/* Live site badge */}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 text-[11px] font-semibold text-slate-600 hover:text-brand-700 hover:border-brand-300 transition shadow-sm backdrop-blur-sm"
          >
            <Globe className="w-3 h-3" />
            Visit Live
          </a>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Client + Scale */}
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-medium truncate">
            {project.client}
          </span>
          <span className="text-brand-600 font-semibold shrink-0 ml-2 text-[10px]">
            {project.scale}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-navy-800 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 flex-1">
          {project.shortDesc}
        </p>

        {/* Key result highlight */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: `${project.accent}0a`,
            border: `1px solid ${project.accent}20`,
          }}
        >
          <TrendingUp
            className="w-3.5 h-3.5 shrink-0"
            style={{ color: project.accent }}
          />
          <span
            className="text-[12px] font-bold"
            style={{ color: project.accent }}
          >
            {project.metrics.value}
          </span>
          <span className="text-[11px] text-slate-500">
            {project.metrics.sub}
          </span>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-500 bg-slate-100 border border-slate-200/80"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium text-slate-400 bg-slate-50 border border-slate-100">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 mt-auto border-t border-slate-100">
          <button
            onClick={() => onOpenDemo(project)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold transition cursor-pointer text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200/60 hover:border-brand-300"
          >
            <Eye className="w-3.5 h-3.5" />
            View Case Study
          </button>
          <a
            href={WA(
              `Hi Prajyot Infotech, I saw your "${project.title}" project and want to discuss building something similar.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp inquiry about ${project.title}`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 hover:border-emerald-300 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </a>
        </div>
      </div>
    </motion.article>
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
      const el = document.getElementById(
        window.location.hash.replace("#", "")
      );
      if (el)
        setTimeout(
          () => el.scrollIntoView({ behavior: "smooth", block: "start" }),
          150
        );
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
        url: "https://www.prajyotinfotech.in/work",
        name: "Enterprise Software Engineering Portfolio | Prajyot Infotech",
        description:
          "Production software applications built by Prajyot Infotech.",
        isPartOf: { "@id": "https://www.prajyotinfotech.in/#website" },
      },
      {
        "@type": "ItemList",
        name: "Prajyot Infotech — Enterprise Software Portfolio",
        itemListElement: PROJECTS.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          description: p.shortDesc,
          url: `https://www.prajyotinfotech.in/work#${p.id}`,
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/60 to-white text-navy-800">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Our Work", url: "https://www.prajyotinfotech.in/work" },
        ]}
      />
      <Seo
        title="Our Work — 9+ Enterprise Systems Delivered | Prajyot Infotech"
        description="Explore Prajyot Infotech's portfolio: Luxury E-Commerce, Restaurant QR & KDS, POS Billing, Clinic EHR, Multi-Tenant SaaS and more. Real clients, real results."
        keywords="software development portfolio, restaurant management, POS billing, clinic EHR, custom SaaS, Prajyot Infotech"
        path="/work"
        schema={itemListLd}
      />

      {/* ══════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 px-4">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-brand-200/30 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-indigo-200/25 blur-[90px] pointer-events-none" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border border-brand-200 bg-brand-50 text-[11px] font-bold text-brand-700 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Our Portfolio
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight">
              Work that speaks{" "}
              <span className="text-gradient">for itself</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
              9 enterprise systems deployed across hospitality, retail,
              healthcare, and fashion — delivering measurable results for real
              Indian businesses.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white text-sm font-bold shadow-brand transition"
              >
                Explore Projects
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={WA(
                  "Hi Prajyot Infotech, I reviewed your portfolio and want to discuss a project."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:text-brand-700 hover:border-brand-300 transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Discuss a Project
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
      {/* 🪔 Diwali Festive Callout Banner */}
      <div className="mx-auto max-w-5xl px-4 -mt-4 mb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg diwali-glow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">🪔</span>
            <div>
              <div className="text-[11px] font-black tracking-wide uppercase text-amber-200">Diwali Mahotsav 2026 Offer</div>
              <div className="text-xs sm:text-sm font-bold text-white">Start your project this festive season: 15% OFF + 3 Months Free AMC</div>
            </div>
          </div>
          <a
            href={WA("Hi Prajyot Infotech, I'm interested in the Diwali 15% OFF offer (Code: DIWALI2026) for my project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-xl bg-white text-amber-900 font-extrabold text-xs shadow hover:bg-amber-50 hover:scale-105 transition-all"
          >
            Claim Diwali Offer →
          </a>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          STATS STRIP
          ══════════════════════════════════════════ */}
      <div className="border-y border-slate-200/80 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "9+", label: "Systems Delivered" },
            { value: "50K+", label: "Active Users" },
            { value: "100%", label: "IP Ownership" },
            { value: "3–4 wk", label: "Avg Sprint" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col gap-0.5"
            >
              <span className="text-2xl font-black text-navy-800 tabular-nums">
                {s.value}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          FILTER BAR
          ══════════════════════════════════════════ */}
      <div className="sticky top-16 z-30 bg-white/85 backdrop-blur-xl border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative shrink-0 w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-navy-800 placeholder-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Industry pills */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-1">
            {INDUSTRIES.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeTag === tag
                    ? "bg-brand-700 text-white shadow-brand"
                    : "bg-slate-100 text-slate-500 hover:text-brand-700 hover:bg-brand-50 border border-slate-200/80"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PROJECT GRID
          ══════════════════════════════════════════ */}
      <main id="portfolio" className="mx-auto max-w-7xl px-4 py-14 space-y-20">
        {/* Result count */}
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-slate-400 font-medium">
            Showing{" "}
            <span className="text-navy-800 font-bold">{filtered.length}</span>{" "}
            project{filtered.length !== 1 ? "s" : ""}
            {activeTag !== "All" && (
              <span>
                {" "}
                in{" "}
                <span className="text-brand-600 font-semibold">{activeTag}</span>
              </span>
            )}
          </p>
          {(activeTag !== "All" || searchQuery) && (
            <button
              onClick={() => {
                setActiveTag("All");
                setSearchQuery("");
              }}
              className="text-[12px] text-slate-400 hover:text-brand-600 flex items-center gap-1 transition font-medium"
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
              className="text-center py-24 rounded-2xl border border-slate-200 bg-slate-50"
            >
              <p className="text-lg font-bold text-navy-800">
                No projects found
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Try a different search or filter
              </p>
              <button
                onClick={() => {
                  setActiveTag("All");
                  setSearchQuery("");
                }}
                className="mt-5 px-5 py-2 rounded-full bg-brand-700 text-white font-bold text-sm shadow-brand"
              >
                Show all projects
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
        <div className="border-t border-slate-200/60" />

        {/* ── Engineering Process ── */}
        <div id="process">
          <EngineeringProcess />
        </div>

        {/* ── Trust Guarantees ── */}
        <div id="guarantees">
          <TrustGuarantees />
        </div>

        {/* ── Project Estimator ── */}
        <div id="estimator">
          <ProjectEstimator />
        </div>

        {/* ── Bottom CTA ── */}
        <div className="relative overflow-hidden rounded-3xl border border-brand-200/60 bg-gradient-to-br from-brand-50 via-white to-indigo-50 text-center px-6 py-14 sm:py-20 shadow-lg shadow-brand-100/40">
          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #7c3aed 0.5px, transparent 0.5px)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl font-black text-navy-800 leading-tight tracking-tight">
              Ready to build your next system?
            </h2>
            <p className="text-[15px] text-slate-500 leading-relaxed">
              We deliver in 3–4 week sprints with defined scope, milestone
              payments, and a 60-day bug warranty. You own 100% of the code.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a
                href={WA(
                  "Hi Prajyot Infotech, I reviewed your portfolio and would like a quote for my project."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition shadow-lg shadow-emerald-200/50"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Us
              </a>
              <Link
                to="/estimate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 bg-white hover:bg-brand-50 text-navy-800 font-semibold text-sm transition shadow-sm hover:border-brand-300"
              >
                Get an Instant Estimate
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── Demo Modal ── */}
      <PortfolioDemoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
}
