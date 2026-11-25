import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { SOLUTIONS } from "../data/solutionsData.js";
import { CheckCircle2, ArrowRight, MessageSquare, Sparkles, Layers } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

export default function SolutionLandingPage({ solutionKey }) {
  const { openLeadModal } = useLeadModal();
  const params = useParams();
  const key = solutionKey || params.slug;
  const sol = SOLUTIONS[key];

  if (!sol) return <Navigate to="/services" replace />;

  const pageUrl = `https://www.prajyotinfotech.in${sol.path}`;
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: sol.h1,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    provider: { "@type": "Organization", name: "Prajyot Infotech", url: "https://www.prajyotinfotech.in" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sol.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Solutions", url: "https://www.prajyotinfotech.in/services" },
          { name: sol.h1, url: pageUrl },
        ]}
      />
      <Seo
        title={sol.title}
        description={sol.metaDesc}
        keywords={sol.keywords}
        path={sol.path}
        schema={[softwareSchema, faqSchema]}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-14 sm:py-20 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-5">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>{sol.badge} · 100% Source Code Ownership</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight mb-5">
            {sol.h1}
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            {sol.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: sol.h1 })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Book Free Live Demo <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/917020708747?text=${encodeURIComponent(`Hi Prajyot Infotech, I want a live demo and pricing for ${sol.h1}.`)}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]">
              <MessageSquare className="w-4 h-4" /> WhatsApp Architect
            </a>
          </div>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {sol.metrics.map((m) => (
            <div key={m.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-md text-center">
              <div className="text-2xl sm:text-3xl font-black font-mono text-brand-700">{m.value}</div>
              <div className="text-xs font-semibold text-slate-600 mt-1">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-14 space-y-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 mb-2">
            <Layers className="w-4 h-4" /> Core Engineering Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6">
            Built for Speed, Reliability &amp; Zero Per-Seat Fees
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sol.features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex items-start gap-3.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Cross-Links */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-700 mb-1">Explore Related Case Study &amp; Free Tool</div>
            <p className="text-sm text-slate-700 font-medium">Review real deployment metrics or test our related free utility right now.</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link to={sol.caseStudyLink} className="px-4 py-2.5 rounded-xl bg-white border border-brand-200 text-brand-800 font-bold text-xs hover:bg-brand-100">
              View Proof Case Study
            </Link>
            <Link to={sol.relatedTool.to} className="px-4 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs hover:bg-brand-500">
              {sol.relatedTool.label}
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sol.faqs.map((f) => (
            <div key={f.q} className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">{f.q}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
