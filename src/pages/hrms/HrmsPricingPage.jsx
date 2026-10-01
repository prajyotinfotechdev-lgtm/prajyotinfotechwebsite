// src/pages/hrms/HrmsPricingPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Building2,
  HardHat,
  Users,
  Layers,
  HelpCircle,
  FileCheck2,
  CheckCircle2,
  ChevronDown,
  Calculator,
} from "lucide-react";
import HrmsHeader from "../../components/HrmsHeader.jsx";
import HrmsFooter from "../../components/HrmsFooter.jsx";
import Seo from "../../components/Seo.jsx";
import { useLeadModal } from "../../context/LeadModalContext.jsx";

const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sxPad = "py-14 sm:py-20 lg:py-24";

export default function HrmsPricingPage() {
  const { openLeadModal } = useLeadModal();

  // Interactive scoping state
  const [workerTier, setWorkerTier] = useState("50-150");
  const [siteTier, setSiteTier] = useState("3-10");
  const [openFaq, setOpenFaq] = useState(null);

  const workerOptions = [
    { id: "sub-50", label: "Under 50 Workers", sub: "Single site or small team" },
    { id: "50-150", label: "50 – 150 Workers", sub: "Growing multi-site contractor" },
    { id: "150-500", label: "150 – 500 Workers", sub: "Established construction firm" },
    { id: "500-plus", label: "500+ Workers", sub: "Enterprise & large-scale infra" },
  ];

  const siteOptions = [
    { id: "1-2", label: "1 – 2 Active Sites" },
    { id: "3-10", label: "3 – 10 Active Sites" },
    { id: "10-plus", label: "10+ Active Sites" },
  ];

  const standardIncluded = [
    "Mobile Selfie & GPS Location Punching",
    "Multi-Tier Leave Management & Balance Tracking",
    "Project & Task Labor Timesheets",
    "Photo Expense Receipt Reimbursements",
    "Month-End HR Payroll Aggregation Engine",
    "Secure Digital PDF Salary Slips",
    "SLA Escalation Engine for Stalled Requests",
    "Complete Role-Based Access Control (5 Tiers)",
    "Real-Time Management Visibility & Reports",
    "Unalterable System Audit Logging & Support Tickets",
  ];

  const faqs = [
    {
      q: "How is Oibuz priced for construction companies?",
      a: "Oibuz is structured as a transparent SaaS subscription tailored to your active workforce headcount and number of project sites. Because construction firms vary widely in field worker volume and back-office requirements, our team scopes a clear, predictable monthly or annual proposal with zero hidden setup fees.",
    },
    {
      q: "Are all role-based permissions included in every deployment?",
      a: "Yes. Every Oibuz deployment includes all five standard user tiers—Employee, Manager, HR, Finance, and Admin. You do not pay extra fees just to give supervisors or Finance personnel access to review requests.",
    },
    {
      q: "Can we add or remove workers as construction projects finish?",
      a: "Yes. Construction workforces scale up and down across project lifecycles. Oibuz lets HR and Admins easily activate or deactivate workers as project requirements evolve.",
    },
    {
      q: "How does onboarding and site supervisor training work?",
      a: "Our deployment team assists with standardizing your organizational structure, importing active employee profiles, configuring leave policies, and providing concise walkthrough materials for site supervisors and field workers.",
    },
    {
      q: "Does Oibuz require any expensive on-site biometric hardware?",
      a: "No. Oibuz eliminates the need for expensive, easily broken biometric fingerprint hardware on dusty job sites. Field employees punch in directly from standard smartphones using facial selfie and GPS location capture.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Seo
        title="Pricing & Deployment - Oibuz Construction HRMS"
        description="Let's build the right Oibuz plan for your workforce. Transparent, scalable construction workforce management with zero hidden fees."
      />

      <HrmsHeader />

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/60 border-b border-slate-100 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        {/* Glow Effects */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className={container}>
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200/80 rounded-full px-4 py-1.5 mb-6 shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              <Building2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span className="text-xs font-bold text-blue-900 tracking-wide uppercase leading-none">
                Transparent Workforce Deployment
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              Let's build the right Oibuz plan{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                for your workforce.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              Every construction organization is structured differently. We provide transparent, custom-scoped proposals tailored to your active site count, team size, and operational requirements.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.4 }}
              className="flex flex-row w-full sm:w-auto gap-3 items-center"
            >
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    source: "Pricing Page - Hero CTA",
                    title: "Request Tailored Oibuz Quote",
                    subtitle: "Tell us about your workforce scale to receive a custom pricing proposal.",
                    projectType: "Oibuz Construction HRMS",
                  })
                }
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold px-7 sm:px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/25 hover:shadow-xl hover:-translate-y-0.5 min-h-[48px] text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                Talk to Sales <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
              </button>

              <Link
                to="/products/hrms/features"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 sm:px-7 py-3.5 rounded-xl transition-all min-h-[48px] text-sm sm:text-base text-center whitespace-nowrap shadow-xs hover:border-blue-300"
              >
                Explore Features
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 1: INTERACTIVE SCOPING CALCULATOR ──────────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Custom Deployment Scoping
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Scope your organization's deployment.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Select your team size and active job sites to request an exact implementation estimate.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm hover:border-blue-300 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Interactive Selectors */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Worker count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" /> 1. Active Workforce Headcount
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {workerOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setWorkerTier(opt.id)}
                        className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                          workerTier === opt.id
                            ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white border-blue-700 shadow-md shadow-blue-900/15"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-bold leading-tight">{opt.label}</div>
                        <div className={`text-[11px] mt-0.5 ${workerTier === opt.id ? "text-blue-200" : "text-slate-500"}`}>
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Site count */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" /> 2. Number of Active Project Sites
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {siteOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSiteTier(opt.id)}
                        className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                          siteTier === opt.id
                            ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white border-blue-700 shadow-md shadow-blue-900/15"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div className="text-xs sm:text-sm font-bold">{opt.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Scoping Summary Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-400/20 px-2.5 py-1 rounded-full inline-block mb-3">
                    Tailored Proposal
                  </span>
                  <h3 className="text-xl font-black text-white mb-2">Custom Scoped Plan</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Structured around{" "}
                    <span className="text-blue-300 font-semibold">
                      {workerOptions.find((o) => o.id === workerTier)?.label}
                    </span>{" "}
                    across{" "}
                    <span className="text-blue-300 font-semibold">
                      {siteOptions.find((o) => o.id === siteTier)?.label}
                    </span>
                    .
                  </p>

                  <div className="space-y-2.5 mb-6 text-xs text-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>All 10 core workforce modules included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Unlimited supervisor & HR role accounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Assisted data setup & supervisor training</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    openLeadModal({
                      source: `Pricing Page - Scoping Calculator (${workerTier}, ${siteTier})`,
                      title: "Request Custom Pricing Quote",
                      subtitle: `Workforce: ${workerOptions.find((o) => o.id === workerTier)?.label} | Sites: ${siteOptions.find((o) => o.id === siteTier)?.label}`,
                      projectType: "Oibuz HRMS Deployment Quote",
                    })
                  }
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30 transition-all"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: TRANSPARENT DEPLOYMENT FACTORS ─────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Transparent Architecture
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              What shapes your Oibuz deployment.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We believe in complete pricing transparency. Here are the primary operational factors that determine deployment scoping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: "1. Active Workforce Scale",
                desc: "Total volume of site workers, sub-engineers, and office personnel needing mobile punch and dashboard access.",
                color: "from-blue-600 to-blue-700",
              },
              {
                icon: Building2,
                title: "2. Number of Project Sites",
                desc: "The number of active job sites requiring independent geofencing and supervisor management structures.",
                color: "from-indigo-600 to-indigo-800",
              },
              {
                icon: Layers,
                title: "3. Workflows Configured",
                desc: "Standard deployment of core attendance, leave, timesheets, expense claims, and HR payroll calculation engine.",
                color: "from-purple-600 to-purple-800",
              },
              {
                icon: HardHat,
                title: "4. Training & Onboarding",
                desc: "Assisted organizational setup, employee data migration, and supervisor walkthrough materials.",
                color: "from-emerald-600 to-teal-800",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all">
                <div>
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: INCLUDED IN EVERY DEPLOYMENT ───────────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Enterprise Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              What is included in every Oibuz deployment.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              No locked modules or hidden tiers. Every organization receives the complete, documented Oibuz workforce management suite.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {standardIncluded.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PRICING FAQ ────────────────────────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Deployment &amp; Pricing FAQ
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              Straightforward answers about licensing, scaling, and rollout.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 hover:border-blue-300 transition-all shadow-2xs">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-100/80 transition-colors"
                >
                  <span className="pr-4">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
            Get Proposal
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
            Built around the way construction teams actually work.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Contact our team to get a detailed product walkthrough and receive a customized deployment proposal.
          </p>
          <div className="flex flex-row w-full sm:w-auto justify-center gap-3">
            <button
              onClick={() =>
                openLeadModal({
                  source: "Pricing Page - Final CTA",
                  title: "Request Custom Pricing Quote",
                  subtitle: "Schedule a 15-min product walkthrough tailored to your operations.",
                  projectType: "Oibuz Construction HRMS",
                })
              }
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              Talk to Sales <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <Link
              to="/products/hrms/features"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base transition-all whitespace-nowrap"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      <HrmsFooter />
    </div>
  );
}
