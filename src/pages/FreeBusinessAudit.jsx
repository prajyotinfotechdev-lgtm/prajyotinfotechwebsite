// src/pages/FreeBusinessAudit.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Building2,
  HardHat,
  Cpu,
  Layers,
  LineChart,
  Clock,
  MessageSquare,
  FileCheck2,
  Laptop,
  Users,
  Compass,
  Zap,
} from "lucide-react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import LeadQualificationForm from "../components/LeadQualificationForm.jsx";
import LeadConversionPaths from "../components/LeadConversionPaths.jsx";

const WHATSAPP_NUMBER = "917020708747";
const waUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const AUDIT_PILLARS = [
  {
    icon: Laptop,
    title: "1. Architecture & Tech Stack Review",
    desc: "We analyze your existing websites, databases, and third-party tools to identify bottlenecks, security vulnerabilities, and outdated technologies holding you back.",
  },
  {
    icon: Zap,
    title: "2. Process & Workflow Automation",
    desc: "Uncover repetitive manual tasks in billing, reporting, WhatsApp communications, and Excel sheets that can be automated to save hundreds of work hours.",
  },
  {
    icon: Layers,
    title: "3. Scalability & Cloud Infrastructure",
    desc: "Assess whether your current systems can handle 3x to 5x transaction and user growth into 2027 without crashes, slowdowns, or runaway cloud costs.",
  },
  {
    icon: ShieldCheck,
    title: "4. Data Sovereignty & IP Ownership",
    desc: "Verify whether your company truly owns its code and customer databases, or if you are trapped in vendor lock-in with closed proprietary software.",
  },
  {
    icon: HardHat,
    title: "5. Mobile & Field Operations Sync",
    desc: "Evaluate how smoothly field teams, job-site supervisors, and remote staff communicate with head office and synchronize operational data in real-time.",
  },
  {
    icon: Compass,
    title: "6. Tailored 2027 Execution Blueprint",
    desc: "Walk away with a concrete, prioritized roadmap outlining high-impact digital initiatives, fixed delivery milestones, and realistic ROI forecasts.",
  },
];

const TARGET_AUDIENCE = [
  {
    title: "Growing SMBs & Enterprises",
    desc: "Companies seeking to replace legacy software with modern, fast web applications and integrated ERP/CRM platforms.",
    icon: Building2,
  },
  {
    title: "Construction & Infrastructure Firms",
    desc: "Contractors and builders needing automated field labor attendance, GPS geofencing, and real-time site expense tracking with OIBUZ.",
    icon: HardHat,
  },
  {
    title: "Operations & Logistics Managers",
    desc: "Business leaders looking to eliminate messy spreadsheets, manual WhatsApp tracking, and disconnected paper records.",
    icon: Cpu,
  },
  {
    title: "Founders & Executive Teams",
    desc: "Decision-makers planning their strategic technology budget and software roadmap for 2027 with guaranteed fixed scope.",
    icon: Users,
  },
];

const FAQS = [
  {
    q: "Is the Business Technology Audit really 100% free?",
    a: "Yes, completely complimentary. There are zero hidden fees, zero credit card requirements, and zero obligation to hire us. We use these discovery audits to understand business challenges and build trusted long-term relationships.",
  },
  {
    q: "What deliverables will our business receive after the audit?",
    a: "You receive an executive summary containing your Tech Stack Health Score, identified workflow bottlenecks, security/scalability gaps, and an actionable 2027 Digital Execution Roadmap with recommended priorities.",
  },
  {
    q: "Will our proprietary business data and ideas remain confidential?",
    a: "Absolutely. We treat all client information with strict confidentiality. If your team requires it, we are pleased to execute a standard mutual Non-Disclosure Agreement (NDA) before our technical discovery call.",
  },
  {
    q: "How much time is required from our leadership team?",
    a: "Very little. Filling the initial application takes less than 3 minutes. The subsequent virtual discovery consultation takes approximately 30 minutes at your convenience.",
  },
  {
    q: "Can this audit help our specific industry?",
    a: "Yes. We have engineered custom digital systems across construction, manufacturing, healthcare, logistics, e-commerce, and professional services across India and internationally.",
  },
];

export default function FreeBusinessAudit() {
  const [selectedRequirement, setSelectedRequirement] = useState("Free Business Technology Audit");
  const [openFaq, setOpenFaq] = useState(0);
  const formSectionRef = useRef(null);

  const scrollToForm = (requirementType) => {
    if (requirementType) {
      setSelectedRequirement(requirementType);
    }
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const breadcrumbs = [
    { name: "Home", url: "https://www.prajyotinfotech.in/" },
    { name: "Free Business Tech Audit", url: "https://www.prajyotinfotech.in/free-business-tech-audit" },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Free Business Technology Audit 2027",
    "provider": {
      "@type": "Organization",
      "name": "Prajyot Infotech",
      "url": "https://www.prajyotinfotech.in",
    },
    "description": "Complimentary 2027 technology audit, architecture review, and process automation consultation for growing businesses.",
    "areaServed": "IN",
    "serviceType": "Technology Consultation",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <BreadcrumbsLd items={breadcrumbs} />

      <Seo
        title="Free Business Technology Audit — Get Your Business 2027-Ready | Prajyot Infotech"
        description="Build smarter. Automate better. Grow faster. Apply for a complimentary 2027 Business Technology Audit with Prajyot Infotech. Zero cost, no obligation."
        keywords="free business technology audit, 2027 business growth, custom software consultation, process automation audit, construction hrms demo, software architecture review Pune India"
        path="/free-business-tech-audit"
        schema={[serviceSchema, faqSchema]}
      />

      <div className="bg-slate-50 text-slate-800 antialiased selection:bg-brand-500/20 selection:text-brand-900">
        {/* ── 1. CAMPAIGN HERO SECTION ── */}
        <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-white via-slate-50 to-brand-50/20">
          {/* Background ambient lighting */}
          <div
            className="absolute top-0 right-1/4 size-[32rem] rounded-full pointer-events-none opacity-20 blur-[120px]"
            style={{ background: "radial-gradient(circle, #7c3aed 0%, #1e2756 100%)" }}
          />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Campaign Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs sm:text-sm font-bold mb-6 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
                <span>2027 Business Growth Campaign</span>
              </motion.div>

              {/* Exact Requested Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black text-navy-950 tracking-tight leading-[1.08]"
              >
                Get Your Business{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600">
                  2027-Ready.
                </span>
              </motion.h1>

              {/* Exact Requested Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal"
              >
                Build smarter. Automate better. Grow faster. Discover how digital technology and intelligent business systems can help your business operate more efficiently.
              </motion.p>

              {/* Campaign CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4"
              >
                <button
                  type="button"
                  onClick={() => scrollToForm("Free Business Technology Audit")}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-navy-800 text-white font-black text-sm sm:text-base shadow-xl shadow-brand-600/25 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Your Free Business Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#conversion-paths"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-bold text-sm sm:text-base shadow-sm hover:border-slate-300 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Our Solutions</span>
                </a>
              </motion.div>

              {/* Guarantees / Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 pt-8 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs font-semibold text-slate-500"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Complimentary Consultation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>Zero Sales Pressure</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-indigo-600" />
                  <span>Actionable Tech Blueprint</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 2. WHAT THE BUSINESS AUDIT COVERS ── */}
        <section className="py-16 sm:py-24 border-b border-slate-200/60 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">Comprehensive Scope</span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight mt-2">
                What Your Business Technology Audit Covers
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                We dive into your operating processes, architecture, and tools to identify high-leverage digital opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {AUDIT_PILLARS.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-brand-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="size-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{pillar.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. THREE LEAD CONVERSION PATHS ── */}
        <section id="conversion-paths" className="py-16 sm:py-24 border-b border-slate-200/60 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">Tailored Solutions</span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight mt-2">
                Three Strategic Growth Paths
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">
                Select the path aligned with your 2027 operational priorities:
              </p>
            </div>

            <LeadConversionPaths onSelectPath={(req) => scrollToForm(req)} />
          </div>
        </section>

        {/* ── 4. WHO SHOULD APPLY & HOW CONSULTATION WORKS ── */}
        <section className="py-16 sm:py-24 border-b border-slate-200/60 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Who should apply */}
            <div className="mb-20">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-black uppercase tracking-wider text-brand-600">Ideal Fit</span>
                <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight mt-2">
                  Who Should Apply for This Audit?
                </h2>
                <p className="mt-3 text-slate-600 text-sm sm:text-base">
                  Designed specifically for decision-makers looking to scale operations with intelligent technology:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {TARGET_AUDIENCE.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                      <div className="size-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-navy-900 mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* How consultation works */}
            <div className="rounded-3xl bg-gradient-to-br from-navy-950 via-slate-900 to-brand-950 text-white p-8 sm:p-14 shadow-2xl">
              <div className="max-w-2xl mb-12">
                <span className="text-xs font-black uppercase tracking-wider text-brand-400">Step-by-Step</span>
                <h3 className="text-2xl sm:text-4xl font-black tracking-tight mt-2">
                  How the Complimentary Consultation Works
                </h3>
                <p className="text-slate-300 text-sm sm:text-base mt-3">
                  No bureaucracy. Transparent, engineering-led, and completely focused on solving your operational challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-brand-600 text-white font-black text-sm flex items-center justify-center">
                    01
                  </div>
                  <h4 className="text-lg font-bold text-white">1. Submit Business Profile</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Fill the 2-minute qualification form below. Outline your industry, operations, and current friction points.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center">
                    02
                  </div>
                  <h4 className="text-lg font-bold text-white">2. 30-Min Virtual Scoping</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Our lead architect joins you for a focused discussion on architecture, automations, and growth goals.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="size-10 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                    03
                  </div>
                  <h4 className="text-lg font-bold text-white">3. Custom 2027 Blueprint</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Receive your tailored technical recommendations, fixed scope proposal, and clear implementation timeline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. LEAD QUALIFICATION FORM SECTION ── */}
        <section ref={formSectionRef} id="audit-form" className="py-16 sm:py-24 border-b border-slate-200/60 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <LeadQualificationForm
              initialRequirement={selectedRequirement}
              source="Free Business Tech Audit Landing Page (/free-business-tech-audit)"
            />
          </div>
        </section>

        {/* ── 6. FREQUENTLY ASKED QUESTIONS ── */}
        <section className="py-16 sm:py-24 border-b border-slate-200/60 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-wider text-brand-600">Got Questions?</span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-colors hover:border-slate-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-navy-900">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180 text-brand-600" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 7. PERSISTENT WHATSAPP & HOTLINE STRIP ── */}
        <section className="py-12 bg-emerald-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-black">
                Prefer an Immediate Discussion on WhatsApp?
              </h3>
              <p className="text-emerald-100 text-xs sm:text-sm mt-1">
                Chat directly with Prajyot Infotech founders & engineering leads. Fast response within business hours.
              </p>
            </div>

            <a
              href={waUrl("Hi Prajyot Infotech, I'm interested in the 2027 Business Growth Technology Audit. Please share details.")}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Message on WhatsApp Now</span>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

