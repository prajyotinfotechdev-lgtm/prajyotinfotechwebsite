// src/pages/hrms/HrmsConstructionPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HardHat,
  Building2,
  MapPin,
  Users,
  Clock,
  Calendar,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  FileText,
  ShieldCheck,
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  UserCheck,
  CheckCircle2,
  XCircle,
  Smartphone,
  Eye,
  Layers,
} from "lucide-react";
import HrmsHeader from "../../components/HrmsHeader.jsx";
import HrmsFooter from "../../components/HrmsFooter.jsx";
import Seo from "../../components/Seo.jsx";
import { useLeadModal } from "../../context/LeadModalContext.jsx";

const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sxPad = "py-14 sm:py-20 lg:py-24";

export default function HrmsConstructionPage() {
  const { openLeadModal } = useLeadModal();
  const [activeRole, setActiveRole] = useState("manager");

  const rolesData = {
    employee: {
      title: "Ground Staff & Site Engineers (Tier 01)",
      summary: "Mobile-first data entry designed for workers who are in the field, not behind a desk.",
      capabilities: [
        "1-Tap selfie and location-verified punch in and punch out.",
        "Daily project task hour logging on mobile timesheets.",
        "Instant leave balance visibility & mobile leave applications.",
        "Photo upload of site expense receipts for reimbursement.",
        "Direct download of monthly digital PDF salary slips.",
      ],
      isolation: "Employees strictly view only their own personal records and compensation data.",
    },
    manager: {
      title: "Site Supervisors & Project Managers (Tier 02)",
      summary: "Operational validation by the people closest to the actual work on the ground.",
      capabilities: [
        "Real-time team attendance visibility across active assigned sites.",
        "Review and validation of daily labor timesheet hours against project reality.",
        "Level 1 approval for team leave requests and site coverage check.",
        "Level 1 approval for site emergency material expense claims.",
        "Review and approval of worker attendance correction requests.",
      ],
      isolation: "Managers only see workers who directly report to them; peer site data is inaccessible.",
    },
    hr: {
      title: "Human Resources Team (Tier 03)",
      summary: "Organization-wide governance, workforce management, and monthly payroll execution.",
      capabilities: [
        "Centralized employee directory management and job role assignments.",
        "Level 2 policy approval for leave requests after supervisor approval.",
        "Level 2 policy check on employee expense reimbursement claims.",
        "Initiation, calculation, review, and publishing of monthly payroll runs.",
        "Automated generation and distribution of standardized PDF salary slips.",
      ],
      isolation: "Full tenant-wide visibility across all sites for workforce and compliance administration.",
    },
    finance: {
      title: "Finance & Accounts Team (Tier 04)",
      summary: "Strict financial control and final gatekeeper for expense reimbursements.",
      capabilities: [
        "Final review of verified receipt images and financial math for expense claims.",
        "Approval and disbursement clearance for employee reimbursements.",
        "Audit trail tracking of all processed cash payouts.",
        "Separation of fiscal clearance from daily HR and site operations.",
      ],
      isolation: "Dedicated financial governance ensuring funds are only cleared for manager- and HR-approved claims.",
    },
    admin: {
      title: "Business Owners & System Directors (Tier 05)",
      summary: "Complete operational visibility, policy configuration, and dispute resolution.",
      capabilities: [
        "Real-time tenant-wide dashboard of attendance, labor hours, and costs.",
        "Automated SLA escalation tracking when managers delay pending approvals.",
        "Comprehensive access to immutable system audit logs recording all key actions.",
        "Override capabilities for pending workflows when managers are unavailable.",
      ],
      isolation: "Highest-level executive oversight and organizational control.",
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Seo
        title="Workforce Management Built for Construction - Oibuz HRMS"
        description="Connect people, sites, managers, HR and Finance through structured construction workforce workflows. Mobile selfie attendance, project timesheets, and multi-tier approvals."
      />

      <HrmsHeader />

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50/60 border-b border-slate-100 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20">
        {/* Glow Effects */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className={container}>
          <div className="max-w-3xl">
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
              <HardHat className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span className="text-xs font-bold text-blue-900 tracking-wide uppercase leading-none">
                Built for the Construction Industry
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              Workforce management{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                built for construction.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl"
            >
              Connect people, sites, managers, HR and Finance through structured workforce workflows.
            </motion.p>

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
                    source: "For Construction - Hero Primary CTA",
                    title: "Book Oibuz Technical Walkthrough",
                    subtitle: "Schedule a demo session configured for your active construction sites.",
                    projectType: "Oibuz Construction HRMS",
                  })
                }
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold px-7 sm:px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/25 hover:shadow-xl hover:-translate-y-0.5 min-h-[48px] text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                Book a Demo <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
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

      {/* ─── SECTION 1: WHY CONSTRUCTION IS DIFFERENT ─────────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Operational Reality
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Why generic office HR systems fail on active building sites.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Traditional HR platforms assume employees sit in an air-conditioned office on laptop computers. Construction operations demand a completely different architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center mb-4 shadow-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Distributed Site Locations</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Work takes place across active job sites, foundation pits, and client locations. Attendance must be verified with mobile selfies and location at the moment of punching.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center mb-4 shadow-sm">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Supervisor Validation First</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                HR at headquarters cannot know if a worker completed 8 hours of formwork. Site supervisors closest to the ground must validate timesheets before HR processes payroll.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center mb-4 shadow-sm">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Field Emergency Expenses</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Supervisors buy urgent hardware or fuel out-of-pocket on paper slips. Receipt photos must be captured instantly and routed cleanly to Finance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: INTERACTIVE SITE-TO-OFFICE STORY ─────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Information Flow
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              From the active site to executive leadership.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Oibuz structures how data moves from physical job sites to head office administration.
            </p>
          </div>

          {/* Connected structure diagram */}
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-50 to-blue-50/30 border border-blue-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col items-center gap-4">
              {/* Box 1 */}
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <HardHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">01. Active Construction Sites</h3>
                    <p className="text-xs text-slate-500">Workers punch in with selfie + location, log project hours, snap receipt photos</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md hidden sm:inline">
                  Field Capture
                </span>
              </div>

              <div className="w-0.5 h-5 bg-blue-300" />

              {/* Box 2 */}
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700 to-navy-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">02. Site Supervisors / Project Managers</h3>
                    <p className="text-xs text-slate-500">Review team attendance, validate task timesheets, approve initial expense claims</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md hidden sm:inline">
                  Operational Review
                </span>
              </div>

              <div className="w-0.5 h-5 bg-blue-300" />

              {/* Box 3 */}
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-blue-300 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">03. Head Office (HR &amp; Finance)</h3>
                    <p className="text-xs text-slate-500">HR runs month-end payroll &amp; issues PDF slips; Finance verifies receipt math for payouts</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md hidden sm:inline">
                  Back Office
                </span>
              </div>

              <div className="w-0.5 h-5 bg-blue-300" />

              {/* Box 4 */}
              <div className="w-full bg-white border border-emerald-200 rounded-2xl p-5 shadow-2xs hover:border-emerald-300 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">04. Executive Leadership</h3>
                    <p className="text-xs text-slate-500">Real-time attendance summaries, labor cost visibility, unalterable system audit logs</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md hidden sm:inline">
                  Total Visibility
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: 4 DEDICATED CONSTRUCTION WORKFLOWS ───────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Site Workflows
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              4 Core workflows designed for the field.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              Examining the practical end-to-end paths for everyday construction workforce actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Workflow 01 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-3">Workflow 01</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Attendance from the field</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  Worker arrives on site → opens Oibuz mobile app → takes facial selfie photo → device captures verified GPS location → attendance record logged instantly.
                </p>
                <div className="bg-blue-50/50 rounded-xl p-3.5 border border-blue-100 text-xs text-slate-700 space-y-1.5">
                  <p><strong className="text-blue-950">Why it matters:</strong> Eliminates proxy punching and verifies presence without continuous tracking.</p>
                  <p><strong className="text-blue-950">Correction:</strong> Missed punch-outs can be submitted as correction requests for manager review.</p>
                </div>
              </div>
            </div>

            {/* Workflow 02 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-3">Workflow 02</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Project hours connected to work</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  Worker logs hours to specific project / task package → Site Manager reviews weekly hours against actual job progress → validated hours lock for payroll.
                </p>
                <div className="bg-indigo-50/50 rounded-xl p-3.5 border border-indigo-100 text-xs text-slate-700 space-y-1.5">
                  <p><strong className="text-indigo-950">Why it matters:</strong> Prevents labor disputes and provides clear tracking of hours across projects.</p>
                  <p><strong className="text-indigo-950">Validation:</strong> Direct managers validate timesheets so hours reflect actual on-site work.</p>
                </div>
              </div>
            </div>

            {/* Workflow 03 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-3">Workflow 03</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Expenses that don't get lost</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  Employee buys emergency site supplies → snaps receipt photo in app → Site Manager verifies necessity → HR verifies policy → Finance issues payment clearance.
                </p>
                <div className="bg-emerald-50/50 rounded-xl p-3.5 border border-emerald-100 text-xs text-slate-700 space-y-1.5">
                  <p><strong className="text-emerald-950">Why it matters:</strong> Replaces fragile physical receipt paper trails with a permanent digital record.</p>
                  <p><strong className="text-emerald-950">Control:</strong> Multi-tier approval guarantees Finance only reimburses manager-vetted claims.</p>
                </div>
              </div>
            </div>

            {/* Workflow 04 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-md uppercase tracking-wider inline-block mb-3">Workflow 04</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Payroll from structured workforce data</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  Month ends → HR creates Payroll Run → system compiles base salaries + verified attendance + approved leaves → HR finalizes → digital PDF payslips generated.
                </p>
                <div className="bg-purple-50/50 rounded-xl p-3.5 border border-purple-100 text-xs text-slate-700 space-y-1.5">
                  <p><strong className="text-purple-950">Why it matters:</strong> Eliminates days of manual data merging and spreadsheet calculations.</p>
                  <p><strong className="text-purple-950">Access:</strong> Workers securely download standardized PDF payslips directly from their app.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: ROLES IN CONSTRUCTION ─────────────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Role-Based Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              How Oibuz serves every role in your company.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              Select a role to inspect its daily responsibilities and strict data-isolation scope.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Role selector buttons */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: "employee", label: "Ground Staff / Engineer" },
                { id: "manager", label: "Site Supervisor / PM" },
                { id: "hr", label: "HR Team" },
                { id: "finance", label: "Finance / Accounts" },
                { id: "admin", label: "Business Owner / Admin" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setActiveRole(r.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeRole === r.id
                      ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md shadow-blue-900/15"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            {/* Active role detail box */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {rolesData[activeRole].title}
                </h3>
                <span className="text-xs font-bold text-blue-800 bg-blue-100/80 border border-blue-200 px-3 py-1 rounded-full">
                  Configured Tier
                </span>
              </div>

              <p className="text-sm text-slate-700 mb-6 font-medium">
                {rolesData[activeRole].summary}
              </p>

              <div className="space-y-3 mb-6">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">Documented Capabilities:</h4>
                {rolesData[activeRole].capabilities.map((c, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">{c}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-2.5 shadow-2xs">
                <Shield className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Security &amp; Data Isolation:</strong> {rolesData[activeRole].isolation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: BEFORE VS. AFTER (OPERATIONAL SCENARIO) ────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Operational Comparison
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Field to head office: Before and after.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              An illustrative operational scenario comparing traditional manual workflows with Oibuz structured digital administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Before */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Before: Fragmented Process</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Attendance:</strong> Paper registers or morning phone calls; no physical presence proof.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Leave Requests:</strong> Informal WhatsApp messages that get buried in chat histories.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Site Expenses:</strong> Physical paper receipt slips transported between sites, often lost.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Payroll:</strong> Days of manual Excel data collation at month-end prone to calculation errors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span><strong>Visibility:</strong> Business owners only learn of labor costs weeks after work is done.</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-6 sm:p-8 border border-blue-300 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">With Oibuz: Structured System</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Attendance:</strong> Mobile punch with selfie &amp; location captured at the exact moment of entry.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Leave Requests:</strong> Live balance check with sequential Manager → HR approval routing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Site Expenses:</strong> Digital photo receipt claims verified by Manager, HR, and Finance.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Payroll:</strong> Automated calculation aggregating salaries, attendance, and leaves in minutes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>Visibility:</strong> Real-time dashboard summaries and immutable system audit logs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white text-center">
        <div className={container}>
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              Built around the way construction teams actually work.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Schedule a 15-minute walkthrough to see how Oibuz structures operations for your distributed workforce.
            </p>
            <div className="flex flex-row w-full sm:w-auto justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    source: "For Construction - Final Bottom CTA",
                    title: "Book Oibuz Technical Walkthrough",
                    subtitle: "Schedule a 15-min product walkthrough tailored to your operations.",
                    projectType: "Oibuz Construction HRMS",
                  })
                }
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all cursor-pointer whitespace-nowrap"
              >
                Book a Demo <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <Link
                to="/products/hrms/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-200 font-semibold text-sm sm:text-base transition-all whitespace-nowrap"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HrmsFooter />
    </div>
  );
}
