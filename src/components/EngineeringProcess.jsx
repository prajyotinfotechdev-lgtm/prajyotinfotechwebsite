import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Code2,
  Cpu,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  FileCheck2
} from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Architecture & Data Schemas",
    timeframe: "Days 1 — 3",
    tag: "Blueprint & Prototypes",
    color: "from-blue-500 to-indigo-500",
    accentBg: "bg-blue-500/10 border-blue-500/30 text-blue-300",
    description: "We eliminate guesswork before a single line of code is written. We map your database schemas, define API contracts, and provide an interactive UI prototype.",
    deliverables: [
      "Entity Relationship Diagram (PostgreSQL / MongoDB)",
      "High-Fidelity Interactive Clickable Prototype",
      "API Contract & Integration Endpoint Specs",
      "Milestone Delivery Roadmap with Locked Timeline"
    ],
    technicalDetail: "No vague promises. You see and test exactly what will be built before engineering begins."
  },
  {
    step: "02",
    phase: "Agile Sprints & Staging Demos",
    timeframe: "Weeks 1 — 3",
    tag: "High-Velocity Build",
    color: "from-indigo-500 to-violet-500",
    accentBg: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
    description: "Weekly milestone deployments to a live cloud staging environment. You test real features every Friday with direct feedback loops.",
    deliverables: [
      "Weekly Live Staging URL Demos",
      "Clean, Modular React 19 + Node.js Codebase",
      "Automated CI/CD Pipeline on GitHub Actions",
      "Real-time WhatsApp / Slack Engineering Channel"
    ],
    technicalDetail: "Zero black box. You have 24/7 visibility into development progress on your private staging server."
  },
  {
    step: "03",
    phase: "Performance & Security Hardening",
    timeframe: "Week 3 — 4",
    tag: "Quality Assurance",
    color: "from-violet-500 to-fuchsia-500",
    accentBg: "bg-violet-500/10 border-violet-500/30 text-violet-300",
    description: "We benchmark API endpoints under high concurrency, tune database indices, implement SSL rate limiting, and optimize edge load speed.",
    deliverables: [
      "Sub-140ms Median API Response Optimization",
      "Google Lighthouse 95+ Performance Benchmark",
      "OWASP Security Audit & SQL/NoSQL Injection Hardening",
      "Cross-Device Cross-Browser Compatibility Matrix"
    ],
    technicalDetail: "Engineered to withstand sudden traffic surges and heavy enterprise transaction volumes."
  },
  {
    step: "04",
    phase: "Production Launch & 100% IP Handover",
    timeframe: "Launch Day + 60-Day Warranty",
    tag: "Zero Lock-In",
    color: "from-emerald-500 to-teal-500",
    accentBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    description: "Zero-downtime DNS deployment to your cloud account (AWS, Vercel, VPS). We hand over 100% full source code ownership with comprehensive documentation.",
    deliverables: [
      "Complete Git Source Code & IP Transfer (100% Yours)",
      "Production Deployment to Your Own Cloud / Domain",
      "Staff Video Training & Admin Documentation",
      "60-Day Priority Bug-Fix Warranty Included"
    ],
    technicalDetail: "You own every single asset. Zero monthly vendor seat fees, zero proprietary locks."
  }
];

export default function EngineeringProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-indigo-600/10 via-brand-600/15 to-teal-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md mb-4">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            TRANSPARENT ENGINEERING LIFECYCLE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            How We Deliver Enterprise Software{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-brand-300 to-teal-300 bg-clip-text text-transparent">
              Without the Chaos
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Most software projects fail because of poor communication and vague scopes. Here is the structured 4-step engineering protocol we follow for every single deployment.
          </p>
        </div>

        {/* 4 Step Visual Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {PROCESS_STEPS.map((item, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`relative rounded-3xl p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-900 border-indigo-500/80 shadow-2xl shadow-indigo-500/15 scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80"
                }`}
              >
                {/* Step Top Bar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-400">
                      {item.step}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${item.accentBg}`}>
                      {item.timeframe}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.phase}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Key Deliverables Pill */}
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">
                    Core Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    {item.deliverables.slice(0, 2).map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="truncate">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                  {item.deliverables.length > 2 && (
                    <span className="text-[10px] text-indigo-400 font-semibold block pt-1">
                      +{item.deliverables.length - 2} more deliverables
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Phase Deep-Dive Drawer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl backdrop-blur-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    PHASE {PROCESS_STEPS[activeStep].step} DEEP-DIVE
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {PROCESS_STEPS[activeStep].timeframe}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {PROCESS_STEPS[activeStep].phase}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-indigo-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{PROCESS_STEPS[activeStep].technicalDetail}</span>
                </div>
              </div>

              <div className="lg:col-span-6 bg-slate-950/90 rounded-2xl p-5 border border-slate-800 space-y-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  All Signed Deliverables for Phase {PROCESS_STEPS[activeStep].step}:
                </span>
                <div className="space-y-2">
                  {PROCESS_STEPS[activeStep].deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200"
                    >
                      <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
