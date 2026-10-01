// src/pages/hrms/HrmsResourcesPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  FileText,
  HelpCircle,
  HardHat,
  Users,
  Building2,
  Clock,
  Calendar,
  Receipt,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Search,
  CheckCircle2,
  Layers,
} from "lucide-react";
import HrmsHeader from "../../components/HrmsHeader.jsx";
import HrmsFooter from "../../components/HrmsFooter.jsx";
import Seo from "../../components/Seo.jsx";
import { useLeadModal } from "../../context/LeadModalContext.jsx";

const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sxPad = "py-14 sm:py-20 lg:py-24";

export default function HrmsResourcesPage() {
  const { openLeadModal } = useLeadModal();

  const [activeRoleTab, setActiveRoleTab] = useState("employee");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const roleGuides = {
    employee: {
      title: "Ground Staff & Site Engineers",
      icon: HardHat,
      badge: "Mobile App & Web",
      responsibilities: [
        "Punch in/out on mobile with live selfie photo and GPS location capture at the moment of punch.",
        "Check personal leave balances and submit leave requests with designated date ranges.",
        "Log daily working hours against specific project work packages and task codes.",
        "Snap and upload receipt photos for site-related out-of-pocket expenses.",
        "Securely download standardized PDF salary slips at the end of every payroll cycle.",
      ],
    },
    manager: {
      title: "Site Supervisors & Project Managers",
      icon: Users,
      badge: "Field & Management Portal",
      responsibilities: [
        "View real-time daily site attendance and verify crew presence across assigned job sites.",
        "Review and validate employee attendance correction requests for missed or offline punches.",
        "Review daily/weekly project labor timesheets against actual physical project milestones.",
        "Approve Level 1 leave requests based on active on-site labor coverage requirements.",
        "Validate Level 1 expense reimbursements to verify material purchases were project-necessary.",
      ],
    },
    hr: {
      title: "Human Resources (HR)",
      icon: Building2,
      badge: "Administrative Dashboard",
      responsibilities: [
        "Create and maintain structured employee profiles, departmental allocations, and reporting managers.",
        "Configure company leave categories, annual allowances, and policy guidelines.",
        "Provide final policy approval (Level 2) for employee leave applications.",
        "Initiate, review, and finalize month-end payroll runs using aggregated attendance and approved leave data.",
        "Publish finalized digital PDF salary slips to employee mobile dashboards.",
      ],
    },
    finance: {
      title: "Finance & Accounts",
      icon: CreditCard,
      badge: "Finance Portal",
      responsibilities: [
        "Review and verify manager- and HR-approved expense receipts and claim amounts.",
        "Conduct final financial verification of tax invoices and physical proof of purchase.",
        "Clear reimbursement claims for final payment disbursement to employee bank accounts.",
        "Export audited labor distribution and expense logs for accounting reconciliation.",
      ],
    },
    admin: {
      title: "Business Owners & Executive Directors",
      icon: ShieldCheck,
      badge: "Executive Dashboard",
      responsibilities: [
        "Complete enterprise-wide operational visibility across all active construction sites.",
        "Monitor automated SLA escalation flags for requests remaining unaddressed beyond company thresholds.",
        "Inspect unalterable system audit logs tracking all user logins, record creations, and approval actions.",
        "Manage global organizational settings, active job site locations, and role permissions.",
      ],
    },
  };

  const productGuides = [
    {
      title: "Attendance & Location Verification Guide",
      module: "Attendance",
      desc: "How mobile selfie capture and live GPS location recording ensure verifiable site presence without hardware biometrics. Includes attendance correction rules.",
      icon: Clock,
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "Project Labor Timesheet Tracking Guide",
      module: "Timesheets",
      desc: "Step-by-step workflow for allocating employee hours to project work packages and supervisor review mechanics.",
      icon: Layers,
      color: "from-indigo-600 to-indigo-800",
    },
    {
      title: "Leave Management & Policy Approvals",
      module: "Leave",
      desc: "Multi-tier approval flows from employee request to supervisor validation, HR approval, and automated cancellation on physical punch-in.",
      icon: Calendar,
      color: "from-purple-600 to-indigo-700",
    },
    {
      title: "Site Expense & Reimbursement Flow",
      module: "Reimbursements",
      desc: "From photo receipt capture on site to manager validation, HR review, and Finance final clearance for payout.",
      icon: Receipt,
      color: "from-emerald-600 to-teal-700",
    },
    {
      title: "Month-End HR Payroll Execution Guide",
      module: "Payroll",
      desc: "How HR initiates payroll runs by aggregating verified attendance, approved leaves, and base salaries into finalized PDF payslips.",
      icon: CreditCard,
      color: "from-blue-700 to-indigo-600",
    },
    {
      title: "SLA Escalation Engine & Audit Logging",
      module: "Governance",
      desc: "Configuring automated escalation flags for pending requests and maintaining an unalterable digital audit trail.",
      icon: ShieldCheck,
      color: "from-amber-600 to-orange-700",
    },
  ];

  const allFaqs = [
    {
      category: "Attendance",
      q: "How does attendance verification work without biometric hardware?",
      a: "Employees punch in and out using their smartphone camera and device GPS. Oibuz captures a facial selfie and the exact coordinates at the moment of the punch. It does not perform continuous GPS tracking, respecting battery life and employee privacy while ensuring site presence.",
    },
    {
      category: "Attendance & Leave",
      q: "What happens if an employee punches in on a day they applied for leave?",
      a: "Oibuz features built-in auto-cancellation logic. If an employee physically records an on-site punch on a day with a pending leave application, the system automatically cancels the pending leave request to prevent double-booking or incorrect deductions.",
    },
    {
      category: "Timesheets",
      q: "How do timesheets differ from daily attendance?",
      a: "Attendance records arrival and departure times for a given day. Timesheets allow workers and engineers to log specific hours spent against active projects and task work packages. This enables project managers to track labor distribution across multiple jobs.",
    },
    {
      category: "Reimbursements",
      q: "What is the reimbursement approval hierarchy?",
      a: "Reimbursements follow a strict 4-step governance workflow: Employee uploads receipt photo → Site Manager validates necessity → HR verifies company policy → Finance provides final clearance for disbursement.",
    },
    {
      category: "Payroll",
      q: "Who is responsible for executing payroll in Oibuz?",
      a: "Payroll is initiated, reviewed, and finalized by HR. The Oibuz engine automatically pulls base salary rules, verified daily attendance, approved leaves, and timesheets. Once HR approves the finalized calculation, digital PDF salary slips are generated.",
    },
    {
      category: "Security & Governance",
      q: "What role do SLA escalations play in the platform?",
      a: "When a leave request, attendance correction, or expense claim remains unaddressed by a supervisor or manager beyond the designated time threshold, Oibuz automatically flags and escalates the item to senior management to prevent administrative bottlenecks.",
    },
    {
      category: "Audit Logs",
      q: "Are all administrative and approval actions tracked?",
      a: "Yes. Oibuz maintains an unalterable audit log that records user logins, punch submissions, approval/rejection decisions, profile updates, and payroll finalizations with timestamps and user identifiers.",
    },
  ];

  const filteredFaqs = allFaqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Seo
        title="Resources & Documentation - Oibuz Construction HRMS"
        description="Explore operational guides, role-based workflows, and frequently asked questions for Oibuz Construction HRMS."
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
              <BookOpen className="w-3.5 h-3.5 text-blue-700 shrink-0" />
              <span className="text-xs font-bold text-blue-900 tracking-wide uppercase leading-none">
                Knowledge &amp; Operations Hub
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              Resources for{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                better workforce operations.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              Explore practical information about construction workforce management, documented platform workflows, and operational best practices.
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
                    source: "Resources Page - Hero CTA",
                    title: "Schedule Oibuz Technical Walkthrough",
                    subtitle: "Our construction software team will walk you through live platform capabilities.",
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

      {/* ─── SECTION 1: PRODUCT MODULE OPERATIONAL GUIDES ─────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Module Documentation
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Core Platform Operational Guides
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Detailed technical explanations of documented Oibuz workflows across field attendance, project hours, expenses, and payroll.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {productGuides.map((guide) => {
              const Icon = guide.icon;
              return (
                <div
                  key={guide.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${guide.color} text-white flex items-center justify-center shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                        {guide.module}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2">{guide.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">{guide.desc}</p>
                  </div>

                  <Link
                    to="/products/hrms/features"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                  >
                    <span>View Feature Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: ROLE-BASED QUICK GUIDES ────────────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Role-Based Breakdown
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              How each role interacts with Oibuz.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Every user tier has an interface dedicated strictly to their operational responsibilities.
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: "employee", label: "Employee / Worker" },
                { id: "manager", label: "Site Supervisor" },
                { id: "hr", label: "Human Resources" },
                { id: "finance", label: "Finance & Accounts" },
                { id: "admin", label: "Executive Admin" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveRoleTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    activeRoleTab === tab.id
                      ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md shadow-blue-900/15"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Role Content Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white flex items-center justify-center shadow-md">
                    {React.createElement(roleGuides[activeRoleTab].icon, { className: "w-6 h-6" })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{roleGuides[activeRoleTab].title}</h3>
                    <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 border border-blue-200 px-2.5 py-0.5 rounded-full">{roleGuides[activeRoleTab].badge}</span>
                  </div>
                </div>

                <Link
                  to="/products/hrms/for-construction"
                  className="text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline flex items-center gap-1"
                >
                  <span>See construction workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                  Key Daily Actions &amp; Controls:
                </h4>
                {roleGuides[activeRoleTab].responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: SEARCHABLE OPERATIONAL FAQ ──────────────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Operational FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              Clear, authentic answers regarding system mechanics, attendance verification, and approval hierarchies.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="w-5 h-5 text-blue-600 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search FAQs (e.g., selfie punch, leave cancellation, payroll, reimbursements)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((f, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-blue-300 transition-all shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="pr-4">
                      <span className="text-[10px] font-bold uppercase text-blue-700 tracking-wider block mb-0.5">
                        {f.category}
                      </span>
                      <span>{f.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-600 shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openFaq === i && (
                    <div className="px-6 pb-5 pt-2 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {f.a}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-sm text-slate-500 mb-2">No matching questions found for "{searchQuery}".</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-bold text-blue-700 hover:underline"
                >
                  Clear search query
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: PLATFORM RELEASE STATUS NOTE ───────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-50/80 via-white to-blue-50/80 border border-blue-200 rounded-3xl p-6 sm:p-8 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Continuous Documentation Updates
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
              Oibuz operational guides, role cheat-sheets, and deployment documentation are continuously maintained to reflect actual production features. For custom enterprise training materials, please contact our support team.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/products/hrms/story"
                className="text-xs font-bold text-blue-900 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 shadow-2xs hover:border-blue-300"
              >
                Product Story &rarr;
              </Link>
              <Link
                to="/products/hrms/features"
                className="text-xs font-bold text-blue-900 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 shadow-2xs hover:border-blue-300"
              >
                Features Breakdown &rarr;
              </Link>
              <Link
                to="/products/hrms/for-construction"
                className="text-xs font-bold text-blue-900 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 shadow-2xs hover:border-blue-300"
              >
                For Construction &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
            Connect With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
            See how Oibuz structures construction operations.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Schedule a 15-minute technical walkthrough to see attendance verification, timesheets, and HR payroll workflows in real time.
          </p>
          <div className="flex flex-row w-full sm:w-auto justify-center gap-3">
            <button
              onClick={() =>
                openLeadModal({
                  source: "Resources Page - Final Bottom CTA",
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
      </section>

      <HrmsFooter />
    </div>
  );
}
