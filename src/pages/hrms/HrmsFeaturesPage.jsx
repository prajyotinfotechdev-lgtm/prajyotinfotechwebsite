// src/pages/hrms/HrmsFeaturesPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Clock,
  Calendar,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  FileText,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Shield,
  HelpCircle,
  FileSearch,
  Zap,
  Lock,
  Smartphone,
  Check,
  CheckCircle,
  Eye,
  AlertCircle,
  UserCheck,
  Layers,
} from "lucide-react";
import HrmsHeader from "../../components/HrmsHeader.jsx";
import HrmsFooter from "../../components/HrmsFooter.jsx";
import Seo from "../../components/Seo.jsx";
import { useLeadModal } from "../../context/LeadModalContext.jsx";

const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sxPad = "py-14 sm:py-20 lg:py-24";

export default function HrmsFeaturesPage() {
  const { openLeadModal } = useLeadModal();
  const [activeCategory, setActiveCategory] = useState("all");

  const featureList = [
    {
      id: "employee-management",
      category: "core",
      name: "Employee Management",
      badge: "Core Directory",
      themeColor: "from-blue-600 to-indigo-700",
      problem: "Worker personal data, base compensation, job roles, and manager reporting lines live in separate paper files or unorganized spreadsheets.",
      solution: "Centralizes employee profiles, job titles, base salary setup, and manager reporting structures into a single digital directory with secure activation/deactivation.",
      workflow: [
        "HR creates employee profile & assigns specific job role.",
        "HR sets base compensation & designates reporting Manager.",
        "Employee receives secure mobile access with role-scoped permissions.",
        "When an employee departs, HR deactivates profile to immediately revoke access.",
      ],
      roles: ["HR", "Admin"],
      businessPurpose: "Establishes a single, verified source of truth for all workforce records.",
      mockup: {
        title: "Employee Directory",
        items: [
          { label: "Profile", val: "Rahul Sharma · Field Engineer" },
          { label: "Reporting Manager", val: "Amit Verma (Site Supervisor)" },
          { label: "Role Permissions", val: "Employee (Ground Tier 01)" },
          { label: "Account Status", val: "Active (Verified)" },
        ],
      },
    },
    {
      id: "attendance",
      category: "field",
      name: "Attendance Management",
      badge: "Mobile Punch & Geolocation",
      themeColor: "from-blue-700 to-cyan-600",
      problem: "Paper sign-in sheets and verbal check-ins lead to time disputes, unverified attendance, and proxy punching on remote construction sites.",
      solution: "Employees punch in/out directly from their mobile phones. The platform captures a selfie photo and verified device location at the exact moment of punching.",
      workflow: [
        "Employee opens mobile app at start of shift and taps 'Punch In'.",
        "System captures live facial selfie photo and coordinates at that moment.",
        "Attendance record is instantly logged with timestamp and location.",
        "If a punch-out is missed, worker submits an Attendance Correction request for manager approval.",
      ],
      roles: ["All Staff", "Manager", "HR"],
      businessPurpose: "Eliminates buddy punching and verifies physical presence on active sites without continuous tracking.",
      specialRule: "Auto-Leave Cancel: If an employee physically punches in on a date with a pending leave request, Oibuz automatically cancels the leave.",
      mockup: {
        title: "Punch Verification",
        items: [
          { label: "Timestamp", val: "08:02 AM · Mon, 14 Oct" },
          { label: "Location Captured", val: "Site #3 (Active Geotag)" },
          { label: "Selfie Photo", val: "Captured & Verified" },
          { label: "Correction Status", val: "No correction needed" },
        ],
      },
    },
    {
      id: "leave",
      category: "field",
      name: "Leave Management",
      badge: "Policy & Accrual Tracking",
      themeColor: "from-indigo-600 to-purple-600",
      problem: "Vacation requests in WhatsApp messages cause confusion at month-end, and supervisors lack visibility over daily site staffing coverage.",
      solution: "Employees view available leave balances and submit requests from their phones. Requests route sequentially to the Site Manager for operational approval, then to HR for policy verification.",
      workflow: [
        "Employee views live leave balance and submits dates with leave type.",
        "System validates that the request does not exceed accrued balance.",
        "Site Manager reviews on-site team coverage and approves Level 1.",
        "HR gives final approval, and days automatically deduct from the employee balance.",
      ],
      roles: ["Employee", "Manager", "HR"],
      businessPurpose: "Maintains clear on-site staffing coverage while ensuring strict adherence to company leave policies.",
      mockup: {
        title: "Leave Balance & Request",
        items: [
          { label: "Casual Leave", val: "4 Days Available" },
          { label: "Earned Leave", val: "8 Days Available" },
          { label: "Pending Request", val: "2 Days (Oct 18-19)" },
          { label: "Approval Stage", val: "Level 1: Manager Approved" },
        ],
      },
    },
    {
      id: "timesheets",
      category: "field",
      name: "Timesheet Management",
      badge: "Project & Task Hours",
      themeColor: "from-blue-600 to-teal-600",
      problem: "Project managers cannot easily track which active building sites or task packages consumed labor hours during the week.",
      solution: "Employees log daily hours against specific projects and tasks. Managers validate timesheets against actual site work before hours lock for payroll.",
      workflow: [
        "Employee selects active project ID / task package and logs daily hours.",
        "System validates hours against daily work limits.",
        "Site Manager reviews labor allocation and approves weekly timesheets.",
        "Approved project hours feed into labor distribution summaries.",
      ],
      roles: ["Employee", "Manager", "HR"],
      businessPurpose: "Provides clear visibility into labor hour allocation across multiple construction sites.",
      mockup: {
        title: "Daily Task Timesheet",
        items: [
          { label: "Project", val: "Metro Tower Site A" },
          { label: "Task", val: "Foundation Excavation & Piling" },
          { label: "Hours Logged", val: "8.0 Hours" },
          { label: "Manager Review", val: "Validated by Site Supervisor" },
        ],
      },
    },
    {
      id: "reimbursements",
      category: "finance",
      name: "Reimbursement Management",
      badge: "Digital Expense Claims",
      themeColor: "from-emerald-600 to-teal-700",
      problem: "Emergency site purchases (cement, fuel, safety gear) on paper receipts get lost, delayed, or disputed between the field and Finance.",
      solution: "Employees photograph receipts and submit digital expense claims. The claim routes to the Site Manager for project verification, HR for policy review, and Finance for final payment clearance.",
      workflow: [
        "Employee snaps photo of physical receipt and inputs claim details.",
        "Site Manager verifies materials were required for on-site work and approves.",
        "HR confirms expense is within allowable company thresholds.",
        "Finance verifies receipt math and issues final payment clearance.",
      ],
      roles: ["Employee", "Manager", "HR", "Finance"],
      businessPurpose: "Replaces lost paper receipts with a permanent digital audit trail and strict multi-tier fiscal control.",
      mockup: {
        title: "Site Expense Claim",
        items: [
          { label: "Expense Item", val: "Emergency Site Cement" },
          { label: "Receipt Photo", val: "Uploaded (Digital Image)" },
          { label: "Claim Amount", val: "₹4,850" },
          { label: "Finance Status", val: "Final Clearance Granted" },
        ],
      },
    },
    {
      id: "payroll",
      category: "finance",
      name: "Payroll Management",
      badge: "Automated Calculation Engine",
      themeColor: "from-purple-600 to-indigo-700",
      problem: "Month-end payroll requires days of manual calculation, combining separate attendance registers, leave records, and salary sheets in Excel.",
      solution: "HR initiates a monthly Payroll Run. Oibuz automatically aggregates base salaries, verified attendance records, and approved leaves to calculate exact payouts.",
      workflow: [
        "Month ends: HR initiates a new Payroll Run in Oibuz.",
        "System automatically compiles base pay, verified attendance, and approved leaves.",
        "HR reviews calculations, checks deductions, and finalizes the run.",
        "HR publishes the finalized payroll run for employee salary slip distribution.",
      ],
      roles: ["HR", "Admin"],
      businessPurpose: "Cuts payroll administration time from days to minutes while eliminating human calculation mistakes.",
      mockup: {
        title: "Monthly Payroll Run",
        items: [
          { label: "Period", val: "Monthly Cycle (HR Initiated)" },
          { label: "Data Source", val: "Attendance + Approved Leaves" },
          { label: "HR Review", val: "Finalized & Verified" },
          { label: "Status", val: "Published" },
        ],
      },
    },
    {
      id: "salary-slips",
      category: "finance",
      name: "Salary Slips",
      badge: "Standardized PDF Payslips",
      themeColor: "from-blue-700 to-indigo-600",
      problem: "Employees must constantly message HR to request printed pay stubs or proof of income.",
      solution: "Once HR publishes payroll, Oibuz automatically generates standardized digital PDF salary slips accessible directly from each employee's mobile dashboard.",
      workflow: [
        "HR publishes the finalized monthly payroll run.",
        "System instantly generates secure, standardized PDF salary slips.",
        "Employees log in to their dashboard and download their slips anytime.",
        "Employees can view historical pay stubs without contacting HR.",
      ],
      roles: ["All Staff", "HR"],
      businessPurpose: "Delivers transparent, professional compensation records to workers securely.",
      mockup: {
        title: "Digital Salary Slip",
        items: [
          { label: "Document Type", val: "Standardized Monthly PDF" },
          { label: "Access Method", val: "Direct Mobile Dashboard Download" },
          { label: "Security", val: "Employee-Scoped Isolation" },
          { label: "Format", val: "Compliant Pay Breakdown" },
        ],
      },
    },
    {
      id: "approvals-escalations",
      category: "core",
      name: "Approval & SLA Escalation Management",
      badge: "Unified Approval Engine",
      themeColor: "from-amber-600 to-orange-600",
      problem: "Requests sit unanswered when busy site supervisors forget to check messages, creating operational bottlenecks.",
      solution: "All workflows (leaves, timesheets, reimbursements) operate on a unified approval engine with automated SLA escalations when requests remain unaddressed too long.",
      workflow: [
        "Request is submitted and enters the designated approver's queue.",
        "System monitors pending time against configured review SLAs.",
        "If a manager does not act within the allowed window, the system flags and escalates the request.",
        "Admin / HR can review and take action to unblock the operational bottleneck.",
      ],
      roles: ["Manager", "HR", "Admin"],
      businessPurpose: "Prevents operational deadlocks and enforces management accountability across all active sites.",
      mockup: {
        title: "SLA Escalation Engine",
        items: [
          { label: "Engine Type", val: "Unified Request Routing" },
          { label: "SLA Monitoring", val: "Automated Timeout Detection" },
          { label: "Action", val: "Auto-Flag & Escalate to Admin" },
          { label: "Benefit", val: "No Unanswered Bottlenecks" },
        ],
      },
    },
    {
      id: "reports-visibility",
      category: "core",
      name: "Reports & Management Visibility",
      badge: "Operational Dashboards",
      themeColor: "from-blue-700 to-slate-800",
      problem: "Company owners lack a real-time summary of daily workforce attendance, labor distribution, and operational status across locations.",
      solution: "Provides consolidated dashboard views for leadership, including daily/monthly attendance summaries, team weekly productivity reports, and workforce demographic summaries.",
      workflow: [
        "Site activity logs continuously from field worker punches and manager reviews.",
        "Oibuz aggregates attendance, timesheets, and approvals in real time.",
        "Leadership views tenant-wide summaries or filters by site location.",
        "Reports provide audit-ready workforce visibility for operational planning.",
      ],
      roles: ["HR", "Finance", "Admin"],
      businessPurpose: "Gives business leaders immediate operational clarity rather than waiting for month-end manual reports.",
      mockup: {
        title: "Leadership Overview",
        items: [
          { label: "Workforce Attendance", val: "Real-Time Site Summaries" },
          { label: "Project Hours", val: "Task & Labor Distribution" },
          { label: "Pending Actions", val: "Organization-Wide Queue" },
          { label: "Visibility", val: "Tenant-Wide Real-Time Dashboard" },
        ],
      },
    },
    {
      id: "audit-support",
      category: "core",
      name: "Audit Logging & Internal Support",
      badge: "Security & Governance",
      themeColor: "from-slate-800 to-slate-900",
      problem: "When disputes occur, paper records lack an unalterable history of who changed a salary, approved an expense, or modified an attendance punch.",
      solution: "Oibuz maintains an unalterable background audit log of all critical actions and provides an internal ticketing system for employee inquiries.",
      workflow: [
        "Critical actions (salary modifications, approvals, overrides) trigger an immutable log entry.",
        "Audit log records exact timestamp, user ID, prior value, and new value.",
        "Employees can raise internal support tickets for HR questions directly in app.",
        "Admins have complete governance oversight for compliance and dispute resolution.",
      ],
      roles: ["All Staff (Tickets)", "Admin (Audit Logs)"],
      businessPurpose: "Guarantees complete institutional accountability and structured internal communication.",
      mockup: {
        title: "System Audit Trail",
        items: [
          { label: "Logging Mechanism", val: "Immutable Background Log" },
          { label: "Recorded Events", val: "Approvals, Salary Edits, Overrides" },
          { label: "Support Desk", val: "Internal HR & Ops Ticket Queue" },
          { label: "Governance", val: "Admin Compliance Access" },
        ],
      },
    },
  ];

  const filteredFeatures =
    activeCategory === "all"
      ? featureList
      : featureList.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Seo
        title="Features & Capabilities - Oibuz Construction Workforce Management"
        description="Comprehensive breakdown of Oibuz modules: Mobile selfie attendance, project timesheets, multi-tier reimbursements, HR payroll, and SLA escalation management."
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
              <Layers className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span className="text-xs font-bold text-blue-900 tracking-wide uppercase leading-none">
                THE COMPLETE PLATFORM
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              Everything your workforce needs.{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                In one structured system.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl"
            >
              From attendance and leave to project hours, reimbursements and payroll, Oibuz connects everyday workforce operations.
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
                    source: "Features Page - Hero Primary CTA",
                    title: "Book Oibuz Technical Walkthrough",
                    subtitle: "Schedule a 15-min product walkthrough tailored to your operations.",
                    projectType: "Oibuz Construction HRMS",
                  })
                }
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold px-7 sm:px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/25 hover:shadow-xl hover:-translate-y-0.5 min-h-[48px] text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                Book a Demo <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
              </button>

              <Link
                to="/products/hrms/for-construction"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 sm:px-7 py-3.5 rounded-xl transition-all min-h-[48px] text-sm sm:text-base text-center whitespace-nowrap shadow-xs hover:border-blue-300"
              >
                For Construction
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STICKY / CATEGORY FILTER NAVIGATION ─────────────────────── */}
      <section className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 shadow-xs">
        <div className={container}>
          <div className="flex items-center justify-between gap-4 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider shrink-0 hidden sm:inline">
              Filter Modules:
            </span>
            <div className="flex gap-2 shrink-0">
              {[
                { id: "all", label: "All 10 Core Modules" },
                { id: "field", label: "Field Operations (Attendance, Leave, Time)" },
                { id: "finance", label: "Finance & Payroll (Expenses, Payroll, Slips)" },
                { id: "core", label: "Governance (Directory, SLAs, Audits)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.id
                      ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md shadow-blue-900/15"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DETAILED FEATURE SECTIONS ───────────────────────────────── */}
      <section className={`bg-slate-50 ${sxPad}`}>
        <div className={container}>
          <div className="space-y-12 max-w-5xl mx-auto">
            {filteredFeatures.map((feat, idx) => (
              <div
                key={feat.id}
                id={feat.id}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-md hover:border-blue-300 transition-all scroll-mt-32"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 text-white text-sm font-black flex items-center justify-center shadow-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                        {feat.badge}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                        {feat.name}
                      </h2>
                    </div>
                  </div>

                  {/* Role badges */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] text-slate-400 font-medium mr-1">User Roles:</span>
                    {feat.roles.map((r) => (
                      <span
                        key={r}
                        className="text-[11px] font-bold text-blue-900 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem vs Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      The Operational Problem
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {feat.problem}
                    </p>
                  </div>

                  <div className="bg-blue-50/60 border border-blue-200/70 rounded-2xl p-5">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1.5">
                      How Oibuz Handles It
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {feat.solution}
                    </p>
                  </div>
                </div>

                {/* Key Workflow & Mockup Box */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Step workflow */}
                  <div className="lg:col-span-7">
                    <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-3">
                      Key Workflow Steps
                    </h3>
                    <div className="space-y-2.5">
                      {feat.workflow.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-slate-600 leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>

                    {feat.specialRule && (
                      <div className="mt-4 bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-900 leading-relaxed font-semibold">
                          {feat.specialRule}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Representative Mockup Card */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-700/50">
                    <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5 mb-3">
                      <span className="text-xs font-bold text-blue-300">{feat.mockup.title}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        Oibuz Verified
                      </span>
                    </div>
                    <div className="space-y-2">
                      {feat.mockup.items.map(({ label, val }) => (
                        <div key={label} className="bg-slate-800/80 rounded-lg p-2.5 flex justify-between items-center text-xs border border-slate-700/40">
                          <span className="text-slate-400">{label}:</span>
                          <span className="font-semibold text-slate-200 text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Purpose */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    <strong className="text-slate-700">Business Purpose:</strong> {feat.businessPurpose}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL FEATURES CTA ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white text-center">
        <div className={container}>
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
              See how Oibuz fits your organization.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Schedule a 15-minute product demonstration to see these workflows configured for your workforce.
            </p>
            <div className="flex flex-row w-full sm:w-auto justify-center gap-3">
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    source: "Features Page - Final Bottom CTA",
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
