import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileCheck,
  Code2,
  TestTube2,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Terminal,
  GitBranch,
  Sparkles,
  Zap,
  Lock,
  Server
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const PHASES = [
  {
    id: "scope",
    step: "PHASE 01",
    title: "Scoping & Architecture Blueprint",
    duration: "Days 1 — 3",
    icon: FileCheck,
    color: "from-blue-600 to-indigo-600",
    accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    badge: "100% Confidential • Mutual NDA Signed",
    summary: "We define your database schemas, API specs, role-based security access, and deliver a fixed milestone agreement before any code is written.",
    deliverables: [
      "Mutual NDA & IP Protection Agreement",
      "Interactive Wireframes & Component Specs",
      "Database Schema Topology (PostgreSQL/MongoDB)",
      "Fixed Milestone & Pricing Guarantee"
    ],
    mockup: {
      type: "terminal",
      title: "architecture_scoping.log",
      lines: [
        "✓ Mutual Non-Disclosure Agreement (NDA) Signed",
        "✓ Scoping Schema: PostgreSQL + Redis Caching",
        "✓ Auth Topology: JWT + Role-Based Access Control",
        "✓ API Spec: OpenAPI 3.0 Endpoints Drafted",
        "STATUS: Architecture Blueprint Ready for Execution"
      ]
    }
  },
  {
    id: "sprints",
    step: "PHASE 02",
    title: "Agile Sprints & Weekly Demos",
    duration: "Weeks 1 — 3",
    icon: Code2,
    color: "from-purple-600 to-indigo-600",
    accentBg: "bg-purple-50 text-purple-700 border-purple-200",
    badge: "Weekly Live Staging Demos",
    summary: "Dedicated senior engineers build your product in rapid 1-week sprints. Test live feature builds on your private staging link every single Friday.",
    deliverables: [
      "Private Staging URL (`staging.yourcompany.com`)",
      "Weekly Video Walkthrough & Sprint Review",
      "Direct Slack/WhatsApp Developer Channel",
      "Clean Modular Code (React + Node.js/Express)"
    ],
    mockup: {
      type: "git",
      title: "git_commit_log.sh",
      lines: [
        "commit a7f2b9 (main) - feat: Added real-time WhatsApp alerts",
        "commit e4c10d (main) - feat: Configured RBAC permission matrix",
        "commit 9b2d81 (staging) - perf: Sub-100ms database index queries",
        "commit 3c7a02 (staging) - ui: Glassmorphic dashboard charts",
        "STATUS: 42 Unit Tests Passed • Staging Deployed"
      ]
    }
  },
  {
    id: "qa",
    step: "PHASE 03",
    title: "Security & Stress Testing",
    duration: "Week 4",
    icon: TestTube2,
    color: "from-amber-600 to-orange-600",
    accentBg: "bg-amber-50 text-amber-700 border-amber-200",
    badge: "OWASP Top 10 Audited",
    summary: "We put your software through automated load testing, security vulnerability scans, cross-device responsiveness checks, and ACID data verification.",
    deliverables: [
      "High-Concurrency Load Testing (1,000+ RPS)",
      "OWASP Vulnerability & SSL Penetration Test",
      "Cross-Browser Mobile & Tablet QA",
      "Automated Database Backup Verification"
    ],
    mockup: {
      type: "qa",
      title: "automated_qa_report.json",
      lines: [
        "● Security Audit: 0 Critical / 0 High Vulnerabilities",
        "● Load Test: 1,500 Concurrent Users (Avg 94ms TTFB)",
        "● Cross-Browser: Chrome, Safari, iOS, Android (100% Passed)",
        "● Data Sanitization: SQL Injection & XSS Shield Active",
        "STATUS: Certified Production Ready"
      ]
    }
  },
  {
    id: "launch",
    step: "PHASE 04",
    title: "Production Handover & 60-Day Warranty",
    duration: "Launch Day",
    icon: Rocket,
    color: "from-emerald-600 to-teal-600",
    accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badge: "Full Git Repository Handover",
    summary: "We deploy to your AWS/Cloudflare servers, hand over 100% of Git repositories & IP rights, and back your product with a 60-day post-launch warranty.",
    deliverables: [
      "Complete Source Code & Git Repository Transfer",
      "Live Production Domain SSL Setup",
      "Staff & Admin Training Walkthrough",
      "60-Day Full Bug Warranty & Performance SLA"
    ],
    mockup: {
      type: "launch",
      title: "production_handover.env",
      lines: [
        "REPOSITORY_OWNERSHIP: Transferred to Client Git Org",
        "IP_RIGHTS_ASSIGNMENT: 100% Transferred",
        "CLOUD_DEPLOYMENT: AWS / Cloudflare Edge Live",
        "POST_LAUNCH_WARRANTY: 60 Days Active",
        "STATUS: System Successfully Handed Over"
      ]
    }
  }
];

export default function ClientExperienceSimulator() {
  const { openLeadModal } = useLeadModal();
  const [activeStep, setActiveStep] = useState("scope");

  const current = PHASES.find((p) => p.id === activeStep) || PHASES[0];
  const IconComponent = current.icon;

  return (
    <section className="relative py-20 sm:py-28 bg-gradient-to-b from-slate-900 via-[#0b1329] to-slate-900 text-slate-100 overflow-hidden" aria-label="Engineering Delivery Process">
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold text-purple-300 backdrop-blur-md mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            TRANSPARENT CLIENT EXPERIENCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            How We Build &amp; Hand Over{" "}
            <span className="bg-gradient-to-r from-purple-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Your Custom Platform
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Click through our 4-phase engineering lifecycle. Every client receives direct senior developer communication, weekly staging links, and complete Git repository transfer.
          </p>
        </div>

        {/* Phase Stepper Buttons (4 Grid Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8 sm:mb-10">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = activeStep === phase.id;
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setActiveStep(phase.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isActive
                    ? "bg-slate-800/90 border-purple-500/80 shadow-xl shadow-purple-950/50 scale-[1.02]"
                    : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${isActive ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "text-slate-500 bg-slate-900"}`}>
                    {phase.step}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-purple-500/20 text-purple-300" : "bg-slate-800 text-slate-400"}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm leading-snug">{phase.title}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">{phase.duration}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Display Card */}
        <div className="bg-slate-950/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto backdrop-blur-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details & Deliverables (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border mb-3 ${current.accentBg}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{current.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-slate-300 text-sm leading-relaxed">
                    {current.summary}
                  </p>
                </div>

                {/* Key Deliverables List */}
                <div className="space-y-2.5">
                  <div className="text-xs font-mono uppercase font-bold text-purple-400 tracking-wider">
                    Key Phase Deliverables
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {current.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs font-medium text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      openLeadModal({
                        source: `Process Simulator - ${current.title}`,
                        title: "Discuss Your Project Scope",
                        subtitle: "Schedule a direct technical scoping call with senior engineers.",
                        projectType: "Custom Platform Architecture",
                      })
                    }
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Start Phase 01 Scoping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono">Mutual NDA Included</span>
                </div>
              </div>

              {/* Right Column: High-Fidelity Mockup Log Terminal (5 cols) */}
              <div className="lg:col-span-5 bg-[#080e1e] rounded-2xl border border-slate-800/90 p-4 sm:p-5 font-mono text-xs shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] text-slate-400 ml-2 font-mono">{current.mockup.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px] font-bold border border-purple-500/20">
                    <Terminal className="w-3 h-3" /> Live Pipeline
                  </div>
                </div>

                <div className="space-y-2.5 py-1">
                  {current.mockup.lines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className={`text-[11px] leading-relaxed p-2 rounded ${
                        line.startsWith("STATUS:")
                          ? "bg-emerald-500/10 text-emerald-300 font-bold border border-emerald-500/20"
                          : line.startsWith("●")
                          ? "bg-slate-900/90 text-slate-200"
                          : "text-slate-300 bg-slate-900/40"
                      }`}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Prajyot Infotech Delivery System v4.2</span>
                  <span className="text-emerald-400 font-bold">● Operational</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
