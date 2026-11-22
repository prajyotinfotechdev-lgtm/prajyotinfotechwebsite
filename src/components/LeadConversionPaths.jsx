// src/components/LeadConversionPaths.jsx
import React from "react";
import { motion } from "framer-motion";
import { Code2, HardHat, Cpu, ArrowRight, CheckCircle2, Star, Sparkles } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const PATHS = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    tagline: "Tailored Web, Mobile & Cloud Platforms",
    badge: "Path A",
    icon: Code2,
    gradient: "from-brand-600 to-indigo-700",
    lightBg: "bg-brand-50/50 border-brand-200/80 hover:border-brand-300",
    ctaLabel: "Discuss Your Project",
    requirementValue: "Custom Software Development",
    deliverables: [
      "Full IP ownership & clean Git repo handover",
      "Tailored UI/UX design matching your brand",
      "High performance & enterprise-grade security",
      "60-day post-launch warranty & SLA support",
    ],
    modalConfig: {
      title: "Discuss Your Custom Software Project",
      subtitle: "Tell us what you want to build. We'll provide architecture recommendations & a fixed estimate.",
      projectType: "Custom Software Development",
      source: "Conversion Path A — Custom Software Development",
      defaultMessage: "Hi Prajyot Infotech, I would like to discuss my custom software development project. Please schedule a scoping call.",
    },
  },
  {
    id: "oibuz-hrms",
    title: "OIBUZ Construction Management Software",
    tagline: "SaaS HRMS & Operations for Job Sites",
    badge: "Path B — Flagship Product",
    icon: HardHat,
    gradient: "from-amber-600 via-orange-600 to-amber-700",
    lightBg: "bg-amber-50/40 border-amber-200/80 hover:border-amber-300",
    ctaLabel: "Book a Live Demo",
    requirementValue: "OIBUZ Construction Management Software",
    featured: true,
    deliverables: [
      "Field attendance with GPS geo-fencing & facial AI",
      "Real-time material requisition & site expense logs",
      "Subcontractor measurement books & billing",
      "Works 100% offline at remote job sites",
    ],
    modalConfig: {
      title: "Book Live Demo: OIBUZ Construction HRMS",
      subtitle: "See how OIBUZ eliminates ghost labor, tracks materials, and controls site cashflows.",
      projectType: "Oibuz Construction HRMS",
      source: "Conversion Path B — OIBUZ Demo",
      defaultMessage: "Hi Prajyot Infotech, I want to book a live demo of OIBUZ Construction Management Software for our project sites.",
    },
  },
  {
    id: "process-automation",
    title: "Business Process Automation",
    tagline: "Replace Repetitive Friction with Smart Systems",
    badge: "Path C",
    icon: Cpu,
    gradient: "from-emerald-600 to-teal-700",
    lightBg: "bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-300",
    ctaLabel: "Explore Automation Opportunities",
    requirementValue: "Business Process Automation",
    deliverables: [
      "Eliminate Excel chaos & manual data entry",
      "Automated WhatsApp & email transaction flows",
      "Custom ERP & accounting synchronizations",
      "Executive business dashboards with real-time KPIs",
    ],
    modalConfig: {
      title: "Explore Business Process Automation",
      subtitle: "Discover how intelligent workflows can save your team 20+ hours every week.",
      projectType: "WhatsApp & Workflow Automation",
      source: "Conversion Path C — Process Automation",
      defaultMessage: "Hi Prajyot Infotech, I'm interested in exploring automation opportunities to streamline our business workflows.",
    },
  },
];

export default function LeadConversionPaths({ onSelectPath }) {
  const { openLeadModal } = useLeadModal();

  const handleAction = (path) => {
    if (onSelectPath) {
      onSelectPath(path.requirementValue);
    } else {
      openLeadModal(path.modalConfig);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {PATHS.map((path, idx) => {
          const Icon = path.icon;
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between border shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                path.lightBg
              } ${path.featured ? "ring-2 ring-amber-500/20 shadow-amber-500/10" : "shadow-slate-200/50"}`}
            >
              {path.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Flagship SaaS</span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`size-12 rounded-2xl bg-gradient-to-br ${path.gradient} text-white flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 bg-white/80 border border-slate-200 px-2.5 py-1 rounded-full">
                    {path.badge}
                  </span>
                </div>

                <h4 className="text-xl font-black text-navy-900 leading-snug tracking-tight">
                  {path.title}
                </h4>
                <p className="text-xs font-semibold text-slate-500 mt-1 mb-6">
                  {path.tagline}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-3 mb-8">
                  {path.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => handleAction(path)}
                  className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r ${path.gradient} hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <span>{path.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center mt-2.5">
                  <span className="text-[10px] text-slate-400">Fixed-scope & milestone milestones</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

