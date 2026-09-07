import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Layers,
  CheckCircle2,
  GitBranch,
  Terminal,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  MessageSquare,
  Clock,
  Sparkles,
  Server,
  FileCheck2,
  ArrowRight,
  Zap,
  Lock
} from "lucide-react";

const SPRINT_TABS = [
  { id: "milestones", label: "Live Sprint Milestones", icon: Clock },
  { id: "cicd", label: "Automated CI/CD Feed", icon: Terminal },
  { id: "comms", label: "Direct Senior Engineer Line", icon: MessageSquare },
  { id: "handover", label: "100% IP Handover Checklist", icon: FileCheck2 },
];

export default function ClientExperienceSimulator() {
  const [activeTab, setActiveTab] = useState("milestones");

  return (
    <section className="relative py-20 md:py-28 bg-[#060a12] text-slate-100 overflow-hidden" aria-label="Client Experience Simulator">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-brand-600/10 via-indigo-600/10 to-teal-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-300 backdrop-blur-md mb-4 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            THE PRAJYOT INFOTECH CLIENT EXPERIENCE
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            How It Feels to Build{" "}
            <span className="bg-gradient-to-r from-brand-300 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
              With Zero Chaos
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            No silent weeks. No mystery progress. Experience total transparency with private cloud staging servers, weekly milestone demos, automated CI/CD logs, and direct access to senior software architects.
          </p>
        </div>

        {/* Interactive Staging Simulator Terminal / Window */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-700/80 shadow-2xl overflow-hidden backdrop-blur-xl max-w-5xl mx-auto">
          {/* Top Window Bar */}
          <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="font-mono text-slate-400 ml-2 font-semibold">Prajyot Client Staging Console v3.1</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-[11px]">
              <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Staging Active
              </span>
              <span className="text-slate-400">
                URL: <strong className="text-slate-200">staging-client.prajyotinfotech.in</strong>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-800/80 bg-slate-950/40 px-4 sm:px-6 flex overflow-x-auto gap-2 sm:gap-4 py-2.5 no-scrollbar">
            {SPRINT_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Simulator Content Area */}
          <div className="p-6 sm:p-8 min-h-[380px] bg-slate-900/60">
            <AnimatePresence mode="wait">
              {/* Tab 1: Live Sprint Milestones */}
              {activeTab === "milestones" && (
                <motion.div
                  key="milestones"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase font-bold tracking-wider">
                      PROJECT LIFECYCLE PROGRESS: 78% COMPLETE
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-emerald-400 font-bold">
                      Sprint 3 in Progress • Demo Friday 5:00 PM IST
                    </span>
                  </div>

                  {/* Sprint 1 */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">SPRINT 01</span>
                          <h4 className="font-bold text-white text-sm">Database Schema &amp; High-Fidelity Prototype</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          PostgreSQL ERD finalized, interactive Figma prototype validated, API contract specs locked.
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                      100% COMPLETED
                    </span>
                  </div>

                  {/* Sprint 2 */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-400">SPRINT 02</span>
                          <h4 className="font-bold text-white text-sm">Core Engineering &amp; Staging Deployment</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          React 19 responsive dashboard, Node.js microservices, real-time WebSocket order events.
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 shrink-0">
                      100% COMPLETED
                    </span>
                  </div>

                  {/* Sprint 3 (Active) */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-brand-950/50 to-slate-950/80 border border-brand-500/50 shadow-lg shadow-brand-950/40 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-brand-400 border-t-transparent animate-spin shrink-0 mt-0.5" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-brand-300">SPRINT 03 (ACTIVE)</span>
                          <h4 className="font-bold text-white text-sm">Automated Billing, GST &amp; WhatsApp Integration</h4>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          Payment gateway reconciliation, auto-generated PDF invoices, WhatsApp Cloud API guest notifications.
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-950 text-brand-300 border border-brand-500/60 shrink-0">
                      90% IN PROGRESS
                    </span>
                  </div>

                  {/* Sprint 4 */}
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 opacity-70">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-slate-500">SPRINT 04</span>
                          <h4 className="font-bold text-slate-300 text-sm">Security Hardening, Launch &amp; 100% Git IP Handover</h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Lighthouse 95+ tuning, OWASP security audit, DNS cutover to client cloud, full Git repo transfer.
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                      UPCOMING
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Automated CI/CD Feed */}
              {activeTab === "cicd" && (
                <motion.div
                  key="cicd"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="font-mono text-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 text-slate-400 gap-1">
                    <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                      <GitBranch className="w-3.5 h-3.5" />
                      GITHUB ACTIONS CI/CD PIPELINE (PROD-READY)
                    </span>
                    <span>Commit: #e8a912f</span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>test: PostgreSQL schema migrations &amp; ACID indices</span>
                      </span>
                      <span className="text-slate-500 text-[11px] sm:self-auto self-end">18 tests passed (0.42s)</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>security: OWASP vulnerability scan &amp; JWT cookie validation</span>
                      </span>
                      <span className="text-slate-500 text-[11px] sm:self-auto self-end">0 vulnerabilities detected</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>perf: Google Core Web Vitals benchmark (TTFB: 74ms)</span>
                      </span>
                      <span className="text-emerald-400 text-[11px] font-bold sm:self-auto self-end">Score: 99/100</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                      <span className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>deploy: Zero-downtime container push to isolated staging cluster</span>
                      </span>
                      <span className="text-slate-400 text-[11px] sm:self-auto self-end">Done (12s ago)</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Every single line of code written for your company undergoes automated tests and security auditing before deployment.</span>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Direct Senior Engineer Line */}
              {activeTab === "comms" && (
                <motion.div
                  key="comms"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">Direct WhatsApp / Slack Engineering Channel</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Zero account managers. Zero middlemen. You chat directly with the software engineers building your software.
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      SLA: &lt; 15 min response
                    </span>
                  </div>

                  {/* Chat Messages Mockup */}
                  <div className="space-y-3 font-sans text-xs">
                    {/* Message 1: Engineer */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-600 font-bold text-white flex items-center justify-center shrink-0">
                        PS
                      </div>
                      <div className="bg-slate-950 p-3 rounded-2xl rounded-tl-none border border-slate-800 max-w-md">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-brand-300">Prajyot (Lead Architect)</span>
                          <span className="text-[10px] font-mono text-slate-500">11:04 AM</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          "Staging build v2.4 is deployed for your team's review! We optimized the SQL indices for multi-store inventory — search latency dropped from 380ms down to 42ms."
                        </p>
                      </div>
                    </div>

                    {/* Message 2: Client */}
                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-brand-900/60 p-3 rounded-2xl rounded-tr-none border border-brand-700/60 max-w-md text-right">
                        <div className="flex items-center justify-end gap-2 mb-1">
                          <span className="text-[10px] font-mono text-slate-400">11:12 AM</span>
                          <span className="font-bold text-slate-200">You (Client)</span>
                        </div>
                        <p className="text-slate-100 leading-relaxed">
                          "Just tested the IMEI scanner on the staging link — it scanned 50 barcodes without a hiccup. Can we add one extra export column for GST filing?"
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-700 font-bold text-white flex items-center justify-center shrink-0">
                        C
                      </div>
                    </div>

                    {/* Message 3: Engineer */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-600 font-bold text-white flex items-center justify-center shrink-0">
                        PS
                      </div>
                      <div className="bg-slate-950 p-3 rounded-2xl rounded-tl-none border border-slate-800 max-w-md">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-brand-300">Prajyot (Lead Architect)</span>
                          <span className="text-[10px] font-mono text-slate-500">11:15 AM</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">
                          "Already added to the sprint queue. You'll be able to test the GST export column in today's 4 PM build."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: 100% IP Handover Checklist */}
              {activeTab === "handover" && (
                <motion.div
                  key="handover"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">Contractual Asset Handover on Day 1</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Unlike off-the-shelf software where you rent access, with Prajyot Infotech you own every single byte.
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                      Zero Lock-In
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold">100% Full Git Repository Transfer</strong>
                        <span className="text-slate-400 text-[11px]">We push all source code directly to your company's private GitHub or GitLab account.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <Lock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold">Mutual NDA on Day 1</strong>
                        <span className="text-slate-400 text-[11px]">Strict legal non-disclosure agreements protecting your proprietary workflows and schemas.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <FileCheck2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold">60-Day Bug Warranty Certificate</strong>
                        <span className="text-slate-400 text-[11px]">Full complimentary 2-month warranty covering any bugs or edge cases after production launch.</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                      <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block font-bold">Zero Monthly Seat Licensing</strong>
                        <span className="text-slate-400 text-[11px]">No per-user per-month subscription extortion. You own and host your custom software indefinitely.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action Footer */}
          <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Experience this exact transparent engineering flow on your project.</span>
            </div>

            <a
              href="https://wa.me/917020708747?text=Hi%20Prajyot%20Infotech,%20I%20saw%20your%20Client%20Experience%20Console.%20I%20want%20to%20schedule%20an%20Architecture%20Discovery%20Session."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs hover:brightness-110 transition shadow-lg cursor-pointer"
            >
              <span>Schedule Architecture Discovery Session</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
