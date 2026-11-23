import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { SERVICES_DATA } from "../data/servicesData.js";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  Building
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WA_NUMBER = "917020708747";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { openLeadModal } = useLeadModal();
  const [openFaq, setOpenFaq] = useState(null);

  const service = SERVICES_DATA[serviceId];

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const pageUrl = `https://www.prajyotinfotech.in/services/${service.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": service.name,
        "description": service.metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "Prajyot Infotech",
          "url": "https://www.prajyotinfotech.in"
        },
        "areaServed": [
          { "@type": "City", "name": "Pune" },
          { "@type": "State", "name": "Maharashtra" },
          { "@type": "Country", "name": "India" }
        ],
        "offers": {
          "@type": "Offer",
          "price": service.startingPrice.replace(/[^\d]/g, ""),
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": service.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Services", url: "https://www.prajyotinfotech.in/services" },
          { name: service.name, url: pageUrl }
        ]}
      />

      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        keywords={`${service.name}, custom software development Pune, software engineering India, ${service.stack.join(", ")}`}
        path={`/services/${service.slug}`}
        schema={serviceSchema}
      />

      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-semibold mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to all core capabilities
        </Link>

        {/* Hero Section */}
        <div className="relative rounded-3xl p-6 sm:p-12 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-brand-950/40 overflow-hidden mb-12 shadow-2xl">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              {service.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
              {service.h1}
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
              {service.heroSubtitle}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 mb-8">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Starting From</span>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">{service.startingPrice}</span>
                <span className="text-[11px] text-slate-400 block">Milestone fixed-bid pricing</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Timeline</span>
                <span className="text-2xl sm:text-3xl font-black text-brand-400 font-mono">{service.timeline}</span>
                <span className="text-[11px] text-slate-400 block">Agile sprint cycles</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">{service.metrics.label}</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{service.metrics.value}</span>
                <span className="text-[11px] text-slate-400 block">{service.metrics.sub}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => openLeadModal({ projectType: `Service Inquiry: ${service.name}` })}
                className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
              >
                Discuss Your Scope & Quote
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Prajyot Infotech, I'm interested in your ${service.name} services.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Principal Architect
              </a>
            </div>
          </div>
        </div>

        {/* Guarantees Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {service.keyHighlights.map((hl, i) => (
            <div key={i} className="flex items-start gap-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-200 font-medium leading-relaxed">{hl}</span>
            </div>
          ))}
        </div>

        {/* Features Breakdown */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Engineered for Speed, Precision & Reliability
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Every system is custom-coded by senior engineers with full source code transfer and zero third-party lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-brand-500/40 transition-all shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Production Stack */}
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 mb-16 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-6 h-6 text-brand-400" />
            <h3 className="text-xl font-bold text-white">Recommended Production Stack</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            We select battle-tested, high-concurrency technologies ensuring sub-second response times and rock-solid uptime:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {service.stack.map((t, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-brand-300 shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-8 flex items-center gap-3">
            <HelpCircle className="w-7 h-7 text-brand-400" />
            Frequently Asked Technical Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center justify-between">
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Lead Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 border border-brand-500/40 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Ready to engineer your custom system?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Request a complimentary 2027 Technology Audit or fixed-bid proposal. We evaluate your current systems and deliver a step-by-step architecture blueprint.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openLeadModal({ projectType: `Service Inquiry: ${service.name}` })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              Request Free Scoping Session
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/estimate"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm flex items-center gap-2 transition-all"
            >
              Interactive Cost Estimator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

