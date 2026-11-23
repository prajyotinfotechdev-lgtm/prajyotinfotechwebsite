import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { PROJECTS } from "../data/projectsData.js";
import PortfolioDemoModal from "../components/PortfolioDemoModal.jsx";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Play
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WA_NUMBER = "917020708747";

export default function CaseStudyDetail() {
  const { id } = useParams();
  const { openLeadModal } = useLeadModal();
  const [demoOpen, setDemoOpen] = useState(false);

  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const related = PROJECTS.filter((p) => p.id !== id).slice(0, 2);
  const projectUrl = `https://www.prajyotinfotech.in/work/${project.id}`;

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "headline": project.title,
    "description": project.shortDesc,
    "author": {
      "@type": "Organization",
      "name": "Prajyot Infotech",
      "url": "https://www.prajyotinfotech.in"
    },
    "provider": {
      "@type": "Organization",
      "name": "Prajyot Infotech"
    },
    "genre": project.tag,
    "url": projectUrl,
    "dateCreated": `${project.year}-01-01`
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Work & Portfolio", url: "https://www.prajyotinfotech.in/work" },
          { name: project.title, url: projectUrl }
        ]}
      />

      <Seo
        title={`${project.title} — Client Engineering Case Study | Prajyot Infotech`}
        description={project.shortDesc}
        keywords={`${project.tag}, custom software case study, ${project.stack.join(", ")}, software engineering Pune`}
        path={`/work/${project.id}`}
        schema={caseStudySchema}
      />

      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-semibold mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all verified client systems
        </Link>

        {/* Hero Card */}
        <div
          className="relative rounded-3xl p-6 sm:p-10 border border-slate-800 overflow-hidden mb-12 shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${project.accent}15, #0f172a, #020617)`
          }}
        >
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.secondary})` }}
              >
                {project.tag}
              </span>
              <span className="text-xs font-semibold text-slate-400 font-mono">
                Delivered {project.year}
              </span>
              {project.scale && (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-900/80 text-slate-300 border border-slate-700">
                  {project.scale}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
              {project.fullDesc || project.shortDesc}
            </p>

            {/* Key Metric Spotlight */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-6 border-t border-slate-800/80">
              {project.metrics && (
                <div>
                  <span className="text-xs text-slate-400 block font-medium uppercase tracking-wider">
                    {project.metrics.label}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                    {project.metrics.value}
                  </span>
                  <span className="text-xs text-slate-400 block">{project.metrics.sub}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 ml-auto">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Interactive Simulator Demo
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Live Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Problem */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-red-500/20 shadow-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-400 block mb-2">
              The Operational Problem
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {project.problem?.title || "Operational Bottlenecks"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {project.problem?.description}
            </p>
            {project.problem?.painQuote && (
              <blockquote className="p-4 rounded-xl bg-red-950/20 border-l-4 border-red-500 text-xs sm:text-sm text-red-200 italic">
                "{project.problem.painQuote}"
              </blockquote>
            )}
          </div>

          {/* Solution */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-emerald-500/30 shadow-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2">
              Our Engineered Architecture
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {project.solution?.title || "High-Throughput Solution"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {project.solution?.description}
            </p>
            <div className="p-4 rounded-xl bg-emerald-950/20 border-l-4 border-emerald-500 text-xs sm:text-sm text-emerald-300 font-mono">
              Topology: {project.architecture || "Edge SSR + Realtime DB"}
            </div>
          </div>
        </div>

        {/* Quantified Business Results */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Verified Business ROI & Results</h2>
              <p className="text-sm text-slate-400">Measured within 90 days following production launch</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.results?.map((res, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-slate-200 font-medium">{res}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Features */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-400" />
              Engineered Capabilities
            </h3>
            <ul className="space-y-3">
              {project.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Production Tech Stack
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Zero vendor lock-in with 100% full source code ownership transferred on Git repository delivery.
            </p>
            <div className="flex flex-wrap gap-2">
              {project.stack?.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-brand-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Lead Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 border border-brand-500/40 text-center relative overflow-hidden shadow-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want to build a custom system like {project.client || project.title}?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            Get 100% intellectual property ownership, zero recurring user seat fees, and a fixed-milestone delivery timeline.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openLeadModal({ projectType: `Inquiry from Case Study: ${project.title}` })}
              className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              Get Custom Scope & Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Prajyot Infotech, I reviewed your ${project.title} case study and want to discuss a similar project.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>

        {/* Related Case Studies */}
        <div className="pt-8 border-t border-slate-800">
          <h3 className="text-xl font-bold text-white mb-6">Explore Other Verified Client Deliveries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/work/${item.id}`}
                className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-brand-400 block mb-2">{item.tag}</span>
                  <h4 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">{item.shortDesc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-400 font-semibold">
                  View full case study <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal Preview */}
      {demoOpen && (
        <PortfolioDemoModal
          project={project}
          onClose={() => setDemoOpen(false)}
        />
      )}
    </div>
  );
}

