// src/pages/hrms/HrmsStoryPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  HardHat,
  MapPin,
  Clock,
  Calendar,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  FileText,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  Zap,
  Lock,
  Eye,
  CheckCircle2,
  FileCheck2,
  UserCheck,
} from "lucide-react";
import HrmsHeader from "../../components/HrmsHeader.jsx";
import HrmsFooter from "../../components/HrmsFooter.jsx";
import OibuzAudioStory from "../../components/OibuzAudioStory.jsx";
import Seo from "../../components/Seo.jsx";
import { useLeadModal } from "../../context/LeadModalContext.jsx";

const container = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";
const sxPad = "py-14 sm:py-20 lg:py-24";

export default function HrmsStoryPage() {
  const { openLeadModal } = useLeadModal();
  const [activeWorkflowTab, setActiveWorkflowTab] = useState("leave");

  const workflowDetails = {
    leave: {
      title: "Leave Request Workflow",
      summary: "Employee applies from mobile → Manager validates on-site coverage → HR verifies company policy and gives final approval.",
      badgeColor: "from-blue-600 to-indigo-600",
      steps: [
        { role: "Employee", action: "Checks balance in app & submits leave request with dates and reason." },
        { role: "Site Manager", action: "Reviews site team schedule, checks labor coverage, and approves Level 1." },
        { role: "HR", action: "Verifies company leave policy, gives Final Approval, and balance auto-deducts." },
      ],
      note: "If an employee physically punches in on a day with a pending leave request, Oibuz automatically cancels the leave to prevent double-booking.",
    },
    timesheets: {
      title: "Project Timesheet Workflow",
      summary: "Employee logs hours against projects/tasks → Site Manager validates labor allocation before payroll.",
      badgeColor: "from-blue-700 to-cyan-600",
      steps: [
        { role: "Employee", action: "Logs daily hours spent on specific site projects and task packages." },
        { role: "Site Manager", action: "Validates hours against actual on-site progress and approves timesheet." },
        { role: "HR & System", action: "Approved hours lock and feed into month-end labor distribution reports." },
      ],
      note: "Timesheets require direct manager approval, ensuring that people closest to the field verify the work.",
    },
    reimbursements: {
      title: "Reimbursement & Site Expense Workflow",
      summary: "Employee uploads receipt photo → Manager verifies project necessity → HR policy check → Finance clearance.",
      badgeColor: "from-emerald-600 to-teal-600",
      steps: [
        { role: "Employee", action: "Snaps receipt photo on phone, inputs amount, category & project ID." },
        { role: "Site Manager", action: "Verifies expense was required for project operations and approves Level 1." },
        { role: "HR", action: "Checks expense policy compliance and approves Level 2." },
        { role: "Finance", action: "Conducts final financial verification of receipts and clears payment disbursement." },
      ],
      note: "Finance acts as the final gatekeeper for reimbursement disbursements, ensuring strict fiscal control.",
    },
    payroll: {
      title: "Month-End Payroll Workflow",
      summary: "HR initiates payroll run → Oibuz aggregates verified data → HR reviews & publishes → Employees access PDF payslips.",
      badgeColor: "from-purple-600 to-indigo-600",
      steps: [
        { role: "HR", action: "Initiates month-end Payroll Run in the Oibuz administrative dashboard." },
        { role: "Oibuz System", action: "Aggregates base salary + verified attendance + approved leaves + timesheets." },
        { role: "HR", action: "Reviews payroll summary, verifies calculations, finalizes and publishes the run." },
        { role: "Employee", action: "Securely downloads standardized digital PDF salary slip from mobile dashboard." },
      ],
      note: "Payroll generation is strictly managed by HR, eliminating manual spreadsheet reconciliation.",
    },
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
      <Seo
        title="Product Story - Oibuz Construction Workforce & Business Management"
        description="See how Oibuz brings construction workforce operations into one structured system. Explore the real problem, information flow, and connected platform."
      />

      <HrmsHeader />

      {/* ─── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50/60 border-b border-slate-100" style={{ minHeight: "580px" }}>
        {/* Ambient colored lighting glows */}
        <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Background construction photo texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: "url('/images/obiz_background.png')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className={`relative z-10 ${container} pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20`}>
          <div className="max-w-3xl">
            {/* Eyebrow badge with glowing indicator */}
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
                The Oibuz Product Story
              </span>
            </motion.div>

            {/* Headline with vibrant gradient accent */}
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.45 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6"
            >
              Connect the{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                work.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl"
            >
              See how Oibuz brings construction workforce operations into{" "}
              <span className="font-semibold text-slate-800">one structured, verifiable system</span>.
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
                    source: "Product Story - Hero Primary CTA",
                    title: "Book Oibuz Technical Walkthrough",
                    subtitle: "Schedule a 15-min product walkthrough tailored to your construction workforce.",
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

      {/* ─── SECTION 1: THE PROBLEM ──────────────────────────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              The Operational Challenge
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Why workforce management breaks down across construction sites.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              In construction, work is rarely confined to an office. Staff are distributed across active building sites, site managers move between locations, and head office coordinates administration from afar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10">
            {[
              {
                title: "Multiple Active Sites",
                desc: "Workers and engineers are spread across different physical project locations, making physical verification difficult.",
                source: "Physical Disconnect",
                color: "border-blue-200 bg-blue-50/50 text-blue-700",
              },
              {
                title: "Paper Registers & WhatsApp",
                desc: "Attendance call-ins, paper logs, and message threads get lost, creating disputes during month-end reconciliation.",
                source: "Unstructured Channels",
                color: "border-amber-200 bg-amber-50/50 text-amber-700",
              },
              {
                title: "Disconnected Approvals",
                desc: "Leave requests and material expense slips often wait on verbal agreements rather than a tracked audit trail.",
                source: "Approval Bottlenecks",
                color: "border-purple-200 bg-purple-50/50 text-purple-700",
              },
              {
                title: "Manual Payroll Compilation",
                desc: "HR must chase supervisors to manually merge paper attendance, timesheet hours, and approved leaves into spreadsheets.",
                source: "Administrative Delay",
                color: "border-rose-200 bg-rose-50/50 text-rose-700",
              },
              {
                title: "Lost Receipt Slips",
                desc: "Emergency site expenses submitted on paper receipts risk getting lost between the field and the Finance desk.",
                source: "Expense Friction",
                color: "border-indigo-200 bg-indigo-50/50 text-indigo-700",
              },
              {
                title: "Delayed Visibility",
                desc: "Business leaders only see labor allocation and attendance records days or weeks after the work has taken place.",
                source: "Information Lag",
                color: "border-emerald-200 bg-emerald-50/50 text-emerald-700",
              },
            ].map(({ title, desc, source, color }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between">
                <div>
                  <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md mb-3 border ${color}`}>
                    {source}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Transition banner */}
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-2xl p-6 border border-blue-200/80 shadow-xs">
            <p className="text-sm font-semibold text-slate-700">
              When data travels through paper, phone calls, and spreadsheets, accountability is lost.{" "}
              <span className="text-blue-700 font-bold">Oibuz replaces scattered processes with one unified platform.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: THE OIBUZ IDEA ────────────────────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              The Architectural Concept
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              One connected workforce platform.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Oibuz acts as a centralized cloud-based Software-as-a-Service (SaaS) platform where ground workers, site managers, HR, Finance, and leadership operate from a single source of truth.
            </p>
          </div>

          {/* Hierarchy Flow Visual */}
          <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-50 to-blue-50/30 border border-blue-100 rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="space-y-4">
              {[
                {
                  level: "01. Construction Sites",
                  role: "Ground Workers & Site Engineers",
                  desc: "Mobile punch in/out with selfie photo and location capture at the moment of attendance. Log daily task hours & upload expense receipts.",
                  icon: HardHat,
                  gradient: "from-blue-600 to-blue-700",
                },
                {
                  level: "02. Site Supervisors",
                  role: "Project Managers & Site Supervisors",
                  desc: "Review real-time team attendance, validate daily timesheets against site reality, and approve initial leave requests.",
                  icon: UserCheck,
                  gradient: "from-blue-800 to-navy-900",
                },
                {
                  level: "03. Back Office",
                  role: "Human Resources & Finance",
                  desc: "HR enforces company leave policies and executes month-end payroll runs. Finance verifies digital expense claims for final disbursement clearance.",
                  icon: Building2,
                  gradient: "from-slate-900 to-slate-800",
                },
                {
                  level: "04. Executive Oversight",
                  role: "Business Owners & Directors",
                  desc: "Complete operational visibility through unalterable audit logs, real-time workforce summaries, and automated SLA escalations.",
                  icon: ShieldCheck,
                  gradient: "from-emerald-700 to-teal-800",
                },
              ].map(({ level, role, desc, icon: Icon, gradient }, i) => (
                <div key={level} className="relative">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-all flex items-start gap-4 sm:gap-5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center shrink-0 shadow-md mt-0.5`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">{level}</span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{role}</span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="flex justify-center my-1.5">
                      <div className="w-0.5 h-4 bg-gradient-to-b from-blue-300 to-blue-200" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: AUDIO PRODUCT STORY ───────────────────────────── */}
      <section className={`bg-gradient-to-b from-[#f0f4ff] to-white border-b border-blue-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-white border border-blue-200 px-3 py-1 rounded-full mb-3 shadow-xs">
              Interactive Walkthrough
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Experience the 40-Second Product Story
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              Listen and follow along as information moves seamlessly from active job sites to finalized monthly payroll.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-3xl p-4 sm:p-8 border border-blue-200 shadow-xl shadow-blue-900/5">
            <OibuzAudioStory
              onDemoClick={() =>
                openLeadModal({
                  source: "Product Story - Audio Story Component",
                  title: "Book Oibuz Technical Walkthrough",
                  subtitle: "Schedule a 15-min product scoping session.",
                  projectType: "Oibuz Construction HRMS",
                })
              }
            />
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: HOW INFORMATION FLOWS ─────────────────────────── */}
      <section className={`bg-white border-b border-slate-100 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Documented Routing Logic
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              How information moves through the organization.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Different requests have different approval destinations. Oibuz enforces strict role-based routing so no single person can bypass company controls.
            </p>
          </div>

          {/* Workflow Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: "leave", label: "1. Leave Workflow" },
                { id: "timesheets", label: "2. Timesheet Workflow" },
                { id: "reimbursements", label: "3. Reimbursement Workflow" },
                { id: "payroll", label: "4. Payroll Workflow" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveWorkflowTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                    activeWorkflowTab === tab.id
                      ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-md shadow-blue-900/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Workflow Card */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {workflowDetails[activeWorkflowTab].title}
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                {workflowDetails[activeWorkflowTab].summary}
              </p>

              {/* Step Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {workflowDetails[activeWorkflowTab].steps.map((step, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">{step.role}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-snug">{step.action}</p>
                  </div>
                ))}
              </div>

              {/* Special rule callout */}
              <div className="bg-blue-100/70 border border-blue-200 rounded-xl p-3.5 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-blue-900">System Rule:</span> {workflowDetails[activeWorkflowTab].note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: WHY OIBUZ (AUTHENTIC BENEFITS) ────────────────── */}
      <section className={`bg-slate-50 border-b border-slate-200/80 ${sxPad}`}>
        <div className={container}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
              Operational Value
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Why construction businesses need a structured system.
            </h2>
            <div className="w-14 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-4" />
            <p className="text-base text-slate-600">
              Clear, factual operational advantages derived directly from centralized workforce digitization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Structured Processes",
                desc: "Requests follow defined sequential review hierarchies so company controls are never bypassed.",
              },
              {
                icon: DatabaseIcon,
                title: "Centralized Information",
                desc: "Workforce records, project hours, and expense histories remain safely in the company database if a manager departs.",
              },
              {
                icon: Lock,
                title: "Role-Based Access Control",
                desc: "Employees see only their own data. Managers see only direct reports. HR and Admin maintain organization-wide control.",
              },
              {
                icon: MapPin,
                title: "Field-to-Office Workflow",
                desc: "Bridges the physical gap between remote building sites and head office administration in real time.",
              },
              {
                icon: Clock,
                title: "Attendance Verification",
                desc: "Mobile selfie and location captured at the exact moment of punch-in/out proves physical presence on site.",
              },
              {
                icon: FileSpreadsheet,
                title: "Project-Hour Visibility",
                desc: "Tracks where labor hours are allocated across different active job sites and project work packages.",
              },
              {
                icon: Receipt,
                title: "Receipt Claim Routing",
                desc: "Site expenses flow from worker photo capture to manager review, HR policy verification, and Finance clearance.",
              },
              {
                icon: CreditCard,
                title: "HR Payroll Administration",
                desc: "Automatically aggregates base salaries, verified attendance, and approved leaves to calculate monthly pay.",
              },
              {
                icon: Eye,
                title: "Management Visibility & SLAs",
                desc: "Real-time dashboard summaries with automated SLA escalation flags when requests remain unaddressed.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mb-4 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-500/15 border border-blue-400/20 px-3 py-1 rounded-full mb-4">
            Next Step
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-white">
            See Oibuz in action.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Schedule a 15-minute walkthrough to see how Oibuz structures operations for your construction teams and sites.
          </p>
          <div className="flex flex-row w-full sm:w-auto justify-center gap-3">
            <button
              onClick={() =>
                openLeadModal({
                  source: "Product Story - Final Bottom CTA",
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

function DatabaseIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}
