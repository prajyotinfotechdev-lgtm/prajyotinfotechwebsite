import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ArrowRight,
  MessageSquare,
  Building2,
  Send,
  Lock,
  Zap
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

const RFP_SECTIONS = [
  {
    number: "01",
    title: "Executive Summary & Business Objectives",
    desc: "Define the core commercial problem, current operational bottlenecks, and the measurable financial or efficiency ROI expected from the software."
  },
  {
    number: "02",
    title: "Scope of Work & Technical Architecture",
    desc: "Specify target platforms (iOS, Android, React Web App), database requirements, expected concurrent user loads, and legacy integrations (e.g. Tally, ERPs)."
  },
  {
    number: "03",
    title: "Performance, Security & SLA Requirements",
    desc: "Non-negotiable technical standards: Sub-second page load times (<0.8s LCP), Role-Based Access Control (RBAC), end-to-end encryption, and daily automated backups."
  },
  {
    number: "04",
    title: "Intellectual Property & Code Ownership",
    desc: "Mandatory requirement: 100% full source code and intellectual property transfer on Day 1 upon milestone settlement. No vendor lock-in or recurring IP royalties."
  },
  {
    number: "05",
    title: "Milestone Billing & Delivery Timelines",
    desc: "Sprint delivery breakdown (Sprint 1 to Sprint 4), sign-off criteria for milestone releases, and 60-day post-launch bug warranty coverage."
  },
  {
    number: "06",
    title: "Vendor Evaluation & Submission Criteria",
    desc: "Vendor team qualifications, direct access to senior technical architects, client references, and fixed-bid transparent pricing structure."
  }
];

export default function SoftwareRfpTemplate() {
  const [copied, setCopied] = useState(false);
  const [mobileTab, setMobileTab] = useState("edit");
  const [rfpData, setRfpData] = useState({
    companyName: "Apex Manufacturing Pvt Ltd",
    contactPerson: "Rajesh Sharma",
    phone: "+91 98220 XXXXX",
    email: "rajesh@apexmanufacturing.com",
    projectType: "Multi-Branch Cloud ERP & Warehouse Barcode Automation",
    targetTimeline: "8 to 10 Weeks",
    budgetRange: "₹3,50,000 – ₹5,50,000",
    coreProblem: "Manual inventory entry between factory and warehouse causes stockouts and delayed dispatches. Tally lacks real-time mobile tracking for our shop-floor managers.",
    integrations: "Tally Prime (sales/purchase journal sync), Razorpay UPI billing, WhatsApp automated invoice alerts",
    slaRequirements: "Sub-second load times (<0.8s), 100% full source code ownership on Day 1, 60-day bug warranty"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateFullRfpText = () => {
    return `REQUEST FOR PROPOSAL (RFP) & TECHNICAL SCOPE OF WORK (SOW)
Document Generated via Prajyot Infotech Procurement Engine
============================================================

1. PROJECT OVERVIEW
• Organization Name: ${rfpData.companyName}
• Technical Lead / Point of Contact: ${rfpData.contactPerson} (${rfpData.phone} | ${rfpData.email})
• Project Title: ${rfpData.projectType}
• Target Delivery Window: ${rfpData.targetTimeline}
• Budget Allocation Bracket: ${rfpData.budgetRange}

2. BUSINESS PROBLEM & OBJECTIVES
${rfpData.coreProblem}

3. TECHNICAL SCOPE & REQUIRED INTEGRATIONS
• Solution Scope: ${rfpData.projectType}
• Critical Integrations: ${rfpData.integrations}
• Architecture Standards: Modern microservices (React / Node / PostgreSQL or Flutter)

4. MANDATORY SERVICE LEVEL AGREEMENTS (SLAS) & SECURITY
• Performance SLA: ${rfpData.slaRequirements}
• Intellectual Property: 100% full source code repository ownership transferred on Day 1.
• Post-Launch Warranty: 60 days of bug and regression warranty coverage.
• Data Ownership: Hosted on client's dedicated cloud servers with daily automated encrypted backups.

5. PROPOSAL SUBMISSION REQUIREMENTS
Interested vendors must provide:
a) Detailed milestone roadmap with weekly deliverables.
b) Direct architectural review with senior engineering director (no junior account managers).
c) Fixed-scope commercial quote with transparent milestone payment schedule.

============================================================
Prajyot Infotech Engineering Review:
Submit this document to hr@prajyotinfotech.in or via WhatsApp at +91 93226 73286 for a guaranteed 24-hour fixed-bid feasibility response.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateFullRfpText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([generateFullRfpText()], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RFP-${(rfpData.companyName || "Project").replace(/[^a-z0-9]+/gi, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmitToPrajyot = async (e) => {
    e.preventDefault();
    if (!rfpData.contactPerson || !rfpData.phone) return;

    setIsSubmitting(true);
    try {
      await createLead({
        name: rfpData.contactPerson.trim(),
        phone: rfpData.phone.trim(),
        email: rfpData.email.trim() || "rfp-lead@prajyotinfotech.in",
        company: rfpData.companyName.trim(),
        projectType: `RFP Submission: ${rfpData.projectType}`,
        message: `[Formal RFP Submitted via Procurement Toolkit]\nCompany: ${rfpData.companyName}\nBudget: ${rfpData.budgetRange}\nTimeline: ${rfpData.targetTimeline}\nScope: ${rfpData.projectType}\nCore Problem: ${rfpData.coreProblem}`,
        source: "software_rfp_template_2026"
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Lead submit warning:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerWhatsAppReview = () => {
    const text = encodeURIComponent(
      `Hello Prajyot Infotech Team,\n\nI just compiled our project Scope of Work / RFP using your online procurement builder:\n\n• *Company:* ${rfpData.companyName}\n• *Project:* ${rfpData.projectType}\n• *Budget Bracket:* ${rfpData.budgetRange}\n• *Target Timeline:* ${rfpData.targetTimeline}\n• *Key Requirements:* ${rfpData.integrations}\n\n*Contact:* ${rfpData.contactPerson} (${rfpData.phone})\n\nPlease review this scope and share your fixed-bid technical proposal.`
    );
    window.open(`https://wa.me/919322673286?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "2026 Enterprise Software RFP & Scope-of-Work (SOW) Procurement Kit",
    "description": "Download and generate customizable Request for Proposal (RFP) templates for web applications, mobile apps, and custom ERP software for Indian businesses.",
    "author": {
      "@type": "Organization",
      "name": "Prajyot Infotech"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Prajyot Infotech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.prajyotinfotech.in/android-chrome-512x512.png"
      }
    },
    "url": "https://www.prajyotinfotech.in/resources/software-rfp-template"
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Resources", url: "https://www.prajyotinfotech.in/resources/software-rfp-template" },
          { name: "Software RFP Template", url: "https://www.prajyotinfotech.in/resources/software-rfp-template" }
        ]}
      />

      <Seo
        title="Software RFP Template & Scope of Work (SOW) Kit 2026 | Prajyot Infotech"
        description="Free downloadable and interactive Software RFP & Scope of Work template for Indian businesses. Learn how to scope web apps, mobile apps, and ERPs with fixed pricing and 100% IP transfer."
        keywords="software RFP template India, scope of work template web app, ERP requirements document template, how to write software RFP, software tender template Pune"
        path="/resources/software-rfp-template"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <style>{`
        @media print {
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          body { background: #ffffff !important; color: #0f172a !important; }
          .rfp-print-area { display: block !important; background: #ffffff !important; color: #0f172a !important; border: 1px solid #cbd5e1 !important; box-shadow: none !important; }
          .rfp-print-area * { color: #0f172a !important; }
        }
      `}</style>

      <main className="py-12 sm:py-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 no-print">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>B2B Procurement Framework · 2026 Edition</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight">
              Enterprise Software <span className="text-brand-600">RFP & SOW Kit</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Eliminate scope creep, vendor lock-in, and ballooning IT invoices. Use our battle-tested 6-part framework to write a watertight Request for Proposal (RFP) for your next web app, mobile app, or ERP.
            </p>
          </div>

          {/* 6 Core RFP Sections */}
          <div className="no-print grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {RFP_SECTIONS.map((sec) => (
              <div key={sec.number} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-2xl font-black font-mono text-brand-600/30 block mb-2">{sec.number}</span>
                  <h2 className="text-base font-bold text-slate-900 mb-2">{sec.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{sec.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* INTERACTIVE RFP BUILDER ENGINE */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-brand-600 font-bold block mb-1">
                  Live Customizer
                </span>
                <h2 className="text-2xl font-bold text-slate-900">Interactive Scope of Work (SOW) Builder</h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[40px]"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied!" : "Copy RFP"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[40px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .TXT</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer min-h-[40px]"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>

            {/* Mobile switcher */}
            <div className="lg:hidden grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100 mb-6 no-print">
              <button type="button" onClick={() => setMobileTab("edit")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${mobileTab === "edit" ? "bg-white text-brand-700 shadow-xs" : "text-slate-600"}`}>
                1. Edit Specs
              </button>
              <button type="button" onClick={() => setMobileTab("preview")}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${mobileTab === "preview" ? "bg-white text-brand-700 shadow-xs" : "text-slate-600"}`}>
                2. Preview Document
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Form Controls */}
              <div className={`lg:col-span-5 space-y-4 no-print ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={rfpData.companyName}
                    onChange={(e) => setRfpData({ ...rfpData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Lead Contact Name</label>
                    <input
                      type="text"
                      value={rfpData.contactPerson}
                      onChange={(e) => setRfpData({ ...rfpData, contactPerson: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone</label>
                    <input
                      type="tel"
                      value={rfpData.phone}
                      onChange={(e) => setRfpData({ ...rfpData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Project Classification</label>
                  <input
                    type="text"
                    value={rfpData.projectType}
                    onChange={(e) => setRfpData({ ...rfpData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Target Timeline</label>
                    <input
                      type="text"
                      value={rfpData.targetTimeline}
                      onChange={(e) => setRfpData({ ...rfpData, targetTimeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Budget Allocation</label>
                    <input
                      type="text"
                      value={rfpData.budgetRange}
                      onChange={(e) => setRfpData({ ...rfpData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Core Problem Statement</label>
                  <textarea
                    rows={3}
                    value={rfpData.coreProblem}
                    onChange={(e) => setRfpData({ ...rfpData, coreProblem: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Required Integrations & APIs</label>
                  <input
                    type="text"
                    value={rfpData.integrations}
                    onChange={(e) => setRfpData({ ...rfpData, integrations: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              {/* Live Preview Document */}
              <div className={`lg:col-span-7 rfp-print-area bg-slate-900 text-slate-100 p-5 sm:p-8 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800 ${mobileTab === "edit" ? "hidden lg:block print:block" : "block"}`}>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-slate-400">
                  <span>DOCUMENT: SOW_SPEC_2026.TXT</span>
                  <span className="text-[10px] text-brand-400">READY FOR TENDER</span>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-slate-300 font-sans text-xs">
                  {generateFullRfpText()}
                </pre>
              </div>
            </div>

            {/* Direct Submission CTA Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-slate-900">Want a guaranteed 24-hour fixed-price proposal?</h4>
                <p className="text-xs text-slate-500">
                  Submit this specification directly to Prajyot Infotech's technical director in Pune.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={triggerWhatsAppReview}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send to WhatsApp Review</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmitToPrajyot}
                  disabled={isSubmitting || isSubmitted}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-600/20 transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitted ? "RFP Submitted!" : isSubmitting ? "Submitting..." : "Submit for Engineering Review"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 Critical Mistakes in Software RFPs */}
          <div className="no-print bg-slate-100/70 rounded-3xl p-6 sm:p-10 border border-slate-200">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Procurement Risk Advisory</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                4 Fatal Mistakes Indian Businesses Make When Hiring Software Agencies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">1. Accepting Open-Ended Hourly Billing</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never sign "Time & Materials" contracts without strict cost caps. Unscrupulous agencies intentionally drag out sprints to bill hundreds of extra unnecessary hours. Always demand fixed-milestone pricing tied to functional deliverables.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">2. Forgetting Source Code Ownership Clauses</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Many agencies host the codebase on their private servers and hold your software hostage when you want to migrate or hire an in-house team. Ensure your contract mandates 100% full Git repository transfer on Day 1.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">3. Ignoring Core Web Vitals & Speed SLAs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  An agency can deliver a visually appealing website that fails Core Web Vitals and takes 4 seconds to load on mobile, destroying your Google Ads ROI. Put an explicit Sub-Second LCP (&lt;0.8s) performance requirement into your RFP.
                </p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">4. Omitting Post-Launch Bug Warranties</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Real users expose edge-case bugs that staging tests miss. If your agreement doesn't include a mandatory 60-day post-launch bug warranty, you will be billed expensive hourly retainers just to fix the agency's own coding mistakes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
