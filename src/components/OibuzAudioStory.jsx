// src/components/OibuzAudioStory.jsx
// OIBUZ — Native Audio-Synchronized Product Storyteller
// Master Clock: audio.currentTime
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2,
  HardHat, MapPin, Users, Clock, Calendar, CreditCard,
  FileSpreadsheet, FileText, CheckCircle2, AlertCircle, Sparkles,
  Building2, ArrowRight, ShieldCheck, Check, Smartphone, Layers,
  Camera, Zap, CheckCheck, Radio, Headphones
} from "lucide-react";

// Easily replaceable audio URL configuration
export const OIBUZ_AUDIO_URL = "/audio/slideshow_audio.mpeg";

// 8 Semantic Story Scenes mapped directly to the authoritative audio timeline
export const STORY_SCENES = [
  {
    id: 1,
    start: 0.0,
    end: 5.4,
    chapter: "01",
    label: "THE CHALLENGE",
    narration: "Managing a construction workforce across multiple sites isn’t easy.",
    heading: "Managing workforce across multiple sites isn’t easy.",
    subtext: "Attendance, rosters, and daily field activity spread across distant locations.",
    bgImage: "/images/story/scene_dawn_site_1790767028765.jpg",
  },
  {
    id: 2,
    start: 5.4,
    end: 13.8,
    chapter: "02",
    label: "PROCESS CHAOS",
    narration: "Attendance, leave, project hours, expenses, approvals — too many processes, too many follow-ups.",
    heading: "Too many processes. Too many follow-ups.",
    subtext: "Paper muster rolls, WhatsApp chats, and disconnected Excel sheets create operational friction.",
    bgImage: "/images/story/scene_chaos_office_1790767069084.jpg",
  },
  {
    id: 3,
    start: 13.8,
    end: 18.0,
    chapter: "03",
    label: "MEET OIBUZ",
    narration: "Meet Oibuz — workforce management built for construction.",
    heading: "Meet Oibuz — workforce management built for construction.",
    subtext: "A unified platform engineered for field teams, site managers, HR, and finance.",
    bgImage: "/images/story/scene_reveal_bg_1790767081094.jpg",
  },
  {
    id: 4,
    start: 18.0,
    end: 20.6,
    chapter: "04",
    label: "ATTENDANCE",
    narration: "Verify attendance with selfie and location,",
    heading: "Verify attendance with selfie and location.",
    subtext: "Employees punch in and out with a selfie and location captured at the moment of attendance.",
    bgImage: "/images/story/indian_construction_muster_1790765080480.jpg",
  },
  {
    id: 5,
    start: 20.6,
    end: 23.0,
    chapter: "05",
    label: "LEAVE & TIMESHEETS",
    narration: "manage leave and project timesheets,",
    heading: "Manage leave and project timesheets.",
    subtext: "Track BOQ task allocations and approve leave requests in one continuous workflow.",
    bgImage: "/images/story/scene_site_supervisor_1790767267225.jpg",
  },
  {
    id: 6,
    start: 23.0,
    end: 28.3,
    chapter: "06",
    label: "REIMBURSEMENTS & PAYROLL",
    narration: "digitize reimbursements, approvals, and payroll — all in one structured system.",
    heading: "Digitize reimbursements, approvals, and payroll.",
    subtext: "Site expenses route to Finance for clearance while HR finalizes verified attendance for 1-click payroll.",
    bgImage: "/images/story/scene_payroll_moment_1790767125814.jpg",
  },
  {
    id: 7,
    start: 28.3,
    end: 33.6,
    chapter: "07",
    label: "CONNECTED ORGANIZATION",
    narration: "From employees and managers to HR and Finance, Oibuz keeps everyone connected.",
    heading: "From employees and managers to HR and Finance.",
    subtext: "Oibuz keeps everyone connected across field operations and back-office governance.",
    bgImage: "/images/story/scene_three_sites_1790767107539.jpg",
  },
  {
    id: 8,
    start: 33.6,
    end: 40.0,
    chapter: "08",
    label: "CONNECT THE WORK",
    narration: "Multiple sites. One workforce. One connected system. Oibuz. Connect the work.",
    heading: "Multiple sites. One workforce. One connected system.",
    subtext: "Oibuz. Connect the work.",
    bgImage: "/images/obiz_background.png",
  },
];

// Helper: Format seconds to MM:SS
function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// Live Voice Equalizer Animation Component
function VoiceEqualizer({ isPlaying, barCount = 4, className = "" }) {
  return (
    <div className={`inline-flex items-end gap-[2px] h-3.5 ${className}`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span
          key={i}
          animate={
            isPlaying
              ? {
                  height: ["25%", "100%", "45%", "90%", "30%"],
                }
              : { height: "30%" }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.55 + (i % 3) * 0.18,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: i * 0.08,
                }
              : { duration: 0.2 }
          }
          className="w-[2.5px] bg-current rounded-full"
        />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   CLEAN NATIVE SAAS SCENE COMPONENTS
   ────────────────────────────────────────────────────────────────────────── */

// SCENE 01: THE CHALLENGE
function SceneTheChallenge({ time }) {
  const isNarrating = time >= 1.1;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/90 backdrop-blur-md">
      <div className="space-y-3 max-w-xl">
        <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
          01 / THE CHALLENGE
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
          Managing a construction workforce across <span className="text-blue-700">multiple sites</span> isn’t easy.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Attendance, rosters, and daily field activity spread across distant construction locations.
        </p>
      </div>

      {isNarrating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-auto pt-2"
        >
          {[
            { site: "Site A • Metro Project", workers: "220 Daily Workers", city: "Mumbai" },
            { site: "Site B • Highway Expansion", workers: "280 Daily Workers", city: "Pune" },
            { site: "Site C • Commercial Tower", workers: "160 Daily Workers", city: "Bengaluru" },
          ].map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-slate-900">{item.site}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{item.workers} • {item.city}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>Operational Field Reality</span>
        <span className="font-semibold text-slate-700">660+ Active Ground Workers</span>
      </div>
    </div>
  );
}

// SCENE 02: PROCESS CHAOS
function SceneTooManyProcesses({ time }) {
  const showAttendance = time >= 5.5;
  const showLeave = time >= 6.7;
  const showTimesheet = time >= 7.7;
  const showExpenses = time >= 8.7;
  const showApprovals = time >= 9.7;
  const showFollowups = time >= 11.8;

  const processItems = [
    { label: "Attendance Registers", icon: HardHat, show: showAttendance, channel: "Paper Muster Rolls" },
    { label: "Leave Requests", icon: Calendar, show: showLeave, channel: "WhatsApp Chat Groups" },
    { label: "Project Hours", icon: Clock, show: showTimesheet, channel: "Scattered Excel Sheets" },
    { label: "Site Expenses", icon: CreditCard, show: showExpenses, channel: "Paper Fuel Bills" },
    { label: "Approvals", icon: AlertCircle, show: showApprovals, channel: "Phone Calls & Signatures" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/90 backdrop-blur-md">
      <div className="space-y-2 max-w-xl">
        <span className="inline-block text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
          02 / PROCESS CHAOS
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
          Too many processes. <span className="text-blue-700">Too many follow-ups.</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Paper muster rolls, WhatsApp chats, and disconnected Excel sheets create operational friction.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-auto">
        {processItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: item.show ? 1 : 0.25, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`p-3 rounded-xl border ${
              item.show ? "bg-slate-50 border-slate-200 shadow-sm" : "bg-white border-slate-100"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <item.icon className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-slate-900 truncate">{item.label}</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">{item.channel}</p>
          </motion.div>
        ))}

        {showFollowups && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between col-span-2 sm:col-span-1"
          >
            <div>
              <p className="text-xs font-bold text-amber-900">Pending Follow-ups</p>
              <p className="text-[10px] text-amber-700">18 Unresolved Chases</p>
            </div>
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          </motion.div>
        )}
      </div>

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>Fragmented Communications</span>
        <span className="font-semibold text-slate-700">High Admin Overhead</span>
      </div>
    </div>
  );
}

// SCENE 03: MEET OIBUZ
function SceneMeetOibuz({ time }) {
  const showTagline = time >= 15.2;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/95 backdrop-blur-md text-center items-center">
      <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md uppercase tracking-wider">
        03 / MEET OIBUZ
      </span>

      <div className="max-w-xl space-y-4 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img
            src="/images/oibuz_logo.png"
            alt="Oibuz"
            className="h-12 sm:h-14 w-auto object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-2"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            Meet Oibuz — workforce management <span className="text-blue-700">built for construction</span>.
          </h3>
          {showTagline && (
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              A unified platform engineered for field teams, site managers, HR, and finance.
            </p>
          )}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {["Zero Hardware", "Selfie Attendance", "BOQ Timesheets", "1-Click Payroll"].map((tag) => (
            <span key={tag} className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>Clean Enterprise SaaS Platform</span>
        <span className="font-semibold text-blue-700">Web Portal + Mobile App</span>
      </div>
    </div>
  );
}

// SCENE 04: ATTENDANCE
function SceneAttendance({ time }) {
  const isConfirmed = time >= 19.4;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/90 backdrop-blur-md">
      <div className="space-y-1.5 max-w-xl">
        <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
          04 / ATTENDANCE
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
          Verify attendance with <span className="text-blue-700">selfie and location</span>.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Employees punch in and out with a selfie and location captured at the moment of attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl items-center my-auto">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
              RK
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Ramesh Kumar (Foreman)</p>
              <p className="text-[11px] text-slate-500">EMP #8902 • Skyview Sector 4</p>
            </div>
          </div>
          <div className="text-[11px] font-mono bg-white p-2.5 rounded-lg border border-slate-200 space-y-1 text-slate-600">
            <div className="flex justify-between"><span>Punch Time:</span> <span className="font-bold text-slate-900">08:02:14 AM</span></div>
            <div className="flex justify-between"><span>Location Match:</span> <span className="text-emerald-700 font-bold">18.5204° N (Site Verified)</span></div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: isConfirmed ? 1 : 0.6 }}
          className={`p-4 rounded-xl border flex items-center gap-3 ${
            isConfirmed ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-white border-slate-200 text-slate-600"
          }`}
        >
          <CheckCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-xs">
            <p className="font-bold">ATTENDANCE VERIFIED</p>
            <p className="text-[11px] text-slate-500">Geo-stamped at punch moment • Zero ghost workers</p>
          </div>
        </motion.div>
      </div>

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>Site Punch Verification</span>
        <span className="font-semibold text-emerald-700">100% Tamper Proof</span>
      </div>
    </div>
  );
}

// SCENE 05: LEAVE & TIMESHEETS
function SceneLeaveTimesheets({ time }) {
  const isTimesheetActive = time >= 21.8;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/90 backdrop-blur-md">
      <div className="space-y-1.5 max-w-xl">
        <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
          05 / LEAVE & TIMESHEETS
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
          Manage leave and <span className="text-blue-700">project timesheets</span>.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Track BOQ task allocations and approve leave requests in one continuous workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl items-center my-auto">
        <motion.div
          animate={{ opacity: isTimesheetActive ? 0.5 : 1 }}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Leave Approval</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">APPROVED</span>
          </div>
          <p className="text-xs text-slate-700 font-medium">Santosh Patil (Mason)</p>
          <p className="text-[11px] text-slate-500">2 Days Casual Leave • Auto-synced to payroll</p>
        </motion.div>

        <motion.div
          animate={{ opacity: isTimesheetActive ? 1 : 0.6 }}
          className="p-4 rounded-xl bg-white border border-blue-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">BOQ Project Timesheet</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">ALLOCATED</span>
          </div>
          <div className="text-[11px] space-y-1 text-slate-600">
            <div className="flex justify-between"><span>Level 4 Slab Concrete:</span> <span className="font-bold text-slate-900">5.5 Hours</span></div>
            <div className="flex justify-between"><span>Rebar Binding:</span> <span className="font-bold text-slate-900">2.5 Hours</span></div>
          </div>
        </motion.div>
      </div>

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>Accurate Cost-Code Allocation</span>
        <span className="font-semibold text-blue-700">Manager 1-Click Approval</span>
      </div>
    </div>
  );
}

// SCENE 06: REIMBURSEMENTS & PAYROLL
function SceneReimbursementsPayroll({ time }) {
  const isPayrollActive = time >= 25.5;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/90 backdrop-blur-md">
      <div className="space-y-1.5 max-w-xl">
        <span className="inline-block text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
          06 / REIMBURSEMENTS & PAYROLL
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
          Digitize reimbursements, approvals, and <span className="text-blue-700">payroll</span>.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Site expenses route to Finance for clearance while HR finalizes verified attendance for 1-click payroll.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl items-center my-auto">
        <motion.div
          animate={{ opacity: isPayrollActive ? 0.5 : 1 }}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Site Expense Claim</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">FINANCE CLEARANCE</span>
          </div>
          <p className="text-xs text-slate-700 font-medium">Site DG Fuel & Hardware: <span className="font-bold text-slate-900">₹4,200</span></p>
          <p className="text-[11px] text-slate-500">Receipt attached • Supervisor approved</p>
        </motion.div>

        <motion.div
          animate={{ opacity: isPayrollActive ? 1 : 0.6 }}
          className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">HR Payroll Run</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">HR REVIEWED</span>
          </div>
          <p className="text-xs text-slate-700 font-medium">Verified Days + OT Calculated</p>
          <p className="text-[11px] text-slate-500">Instant individual PDF salary slip generation</p>
        </motion.div>
      </div>

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>All in One Structured System</span>
        <span className="font-semibold text-blue-700">Zero Payroll Disputes</span>
      </div>
    </div>
  );
}

// SCENE 07: CONNECTED ORGANIZATION
function SceneConnectedOrg({ time }) {
  const roles = [
    { title: "Field Workforce", desc: "Selfie Punch & Slips" },
    { title: "Site Supervisors", desc: "Rosters & Timesheets" },
    { title: "HR Department", desc: "Policies & Payroll Run" },
    { title: "Finance & Accounts", desc: "Reimbursement Payouts" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/90 backdrop-blur-md">
      <div className="space-y-1.5 max-w-xl">
        <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
          07 / CONNECTED ORGANIZATION
        </span>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
          From employees and managers to <span className="text-blue-700">HR and Finance</span>.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Oibuz keeps everyone connected across field operations and back-office governance.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-auto max-w-2xl">
        {roles.map((r, i) => (
          <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-blue-700 flex items-center justify-center mx-auto mb-1.5 shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-xs font-bold text-slate-900">{r.title}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>Field to Back-Office Continuity</span>
        <span className="font-semibold text-blue-700">Single Source of Truth</span>
      </div>
    </div>
  );
}

// SCENE 08: CONNECT THE WORK
function SceneBrandPayoff({ time, onDemoClick, onReplay }) {
  const showSites = time >= 33.8;
  const showWorkforce = time >= 35.0;
  const showSystem = time >= 36.2;
  const showFinalLogo = time >= 37.6;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 z-10 bg-white/95 backdrop-blur-md text-center items-center">
      <span className="inline-block text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md uppercase tracking-wider">
        08 / CONNECT THE WORK
      </span>

      <div className="max-w-xl space-y-4 my-auto">
        {!showFinalLogo ? (
          <div className="space-y-2">
            {showSites && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-xl sm:text-2xl font-bold text-slate-700">
                Multiple sites.
              </motion.div>
            )}
            {showWorkforce && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-xl sm:text-2xl font-extrabold text-slate-900">
                One workforce.
              </motion.div>
            )}
            {showSystem && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-black text-blue-700">
                One connected system.
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="flex justify-center">
              <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-12 sm:h-14 w-auto object-contain" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              CONNECT THE WORK.
            </h3>

            <p className="text-xs sm:text-sm text-slate-600">
              Workforce & Business Management Built for Construction
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={onDemoClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-700/20 transition-all hover:-translate-y-px"
              >
                <span>Book a Live Demo</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onReplay}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Story</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <div className="w-full text-[11px] text-slate-500 border-t border-slate-100 pt-2.5 flex justify-between items-center">
        <span>© 2025 Oibuz • Prajyot Infotech</span>
        <span className="font-semibold text-blue-700">Enterprise Ready</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   MAIN AUDIO STORY CONTAINER COMPONENT
   ────────────────────────────────────────────────────────────────────────── */
export default function OibuzAudioStory({ onDemoClick }) {
  const audioRef = useRef(null);
  const stageRef = useRef(null);
  const rafRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(39.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Compute Active Scene from Master Audio Clock
  const activeSceneIndex = Math.max(
    0,
    STORY_SCENES.findIndex((s) => currentTime >= s.start && currentTime < s.end)
  );
  const activeScene = STORY_SCENES[activeSceneIndex !== -1 ? activeSceneIndex : STORY_SCENES.length - 1];

  const isSeekingRef = useRef(false);

  // High-frequency animation loop for progress tracking
  const updateLoop = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      if (!isSeekingRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
      rafRef.current = requestAnimationFrame(updateLoop);
    }
  }, []);

  // Audio Playback Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setIsPlaying(true);
      rafRef.current = requestAnimationFrame(updateLoop);
    };

    const onPause = () => {
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      cancelAnimationFrame(rafRef.current);
      setCurrentTime(audio.duration || 39.7);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateLoop]);

  // Master Play Trigger
  const handleStartStory = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((err) => {
        console.warn("Audio autoplay prevented, user interaction required:", err);
      });
    }
  };

  const handleTogglePlay = () => {
    if (!hasStarted) {
      handleStartStory();
      return;
    }
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.warn);
      }
    }
  };

  const handleReplay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      audioRef.current.play().catch(console.warn);
    }
  };

  const handleSeek = (e) => {
    const target = parseFloat(e.target.value);
    setCurrentTime(target);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const handleJumpToScene = (scene) => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.currentTime = scene.start;
      setCurrentTime(scene.start);
      if (audioRef.current.paused) {
        audioRef.current.play().catch(console.warn);
      }
    }
  };

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().catch(console.warn);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.warn);
      setIsFullscreen(false);
    }
  };

  // Render Scene Component based on Active Scene ID
  const renderSceneContent = () => {
    switch (activeScene.id) {
      case 1: return <SceneTheChallenge time={currentTime} />;
      case 2: return <SceneTooManyProcesses time={currentTime} />;
      case 3: return <SceneMeetOibuz time={currentTime} />;
      case 4: return <SceneAttendance time={currentTime} />;
      case 5: return <SceneLeaveTimesheets time={currentTime} />;
      case 6: return <SceneReimbursementsPayroll time={currentTime} />;
      case 7: return <SceneConnectedOrg time={currentTime} />;
      case 8: return <SceneBrandPayoff time={currentTime} onDemoClick={onDemoClick} onReplay={handleReplay} />;
      default: return <SceneTheChallenge time={currentTime} />;
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="product-story" className="relative bg-slate-50/70 text-slate-900 py-16 sm:py-24 border-y border-slate-200/80 overflow-hidden">
      
      {/* Hidden Master Audio Source */}
      <audio
        ref={audioRef}
        src={OIBUZ_AUDIO_URL}
        preload="auto"
        playsInline
      >
        <source src={OIBUZ_AUDIO_URL} type="audio/mpeg" />
        <source src="/audio/slideshow_audio.mpeg" type="audio/mpeg" />
        <source src="/audio/oibuz-product-story.mp3" type="audio/mpeg" />
      </audio>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Restrained Enterprise SaaS Style) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-bold text-blue-700 tracking-widest uppercase mb-3 shadow-xs">
            <span>HOW OIBUZ WORKS</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">
            See how Oibuz <span className="text-blue-700">connects the work</span>.
          </h2>
          
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Experience the platform through a 40-second guided product story.
          </p>
        </div>

        {/* Player Showcase Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Ambient Glow */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/15 via-indigo-600/20 to-blue-600/15 rounded-3xl blur-xl -z-10 pointer-events-none opacity-80" />
          
          <div className="relative w-full rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden">
            {/* Top Player Header */}
            <div className="bg-slate-50/90 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                {hasStarted ? (
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[11px] font-bold text-blue-700">
                      <VoiceEqualizer isPlaying={isPlaying} barCount={4} className="text-blue-700" />
                      <span>{activeScene.chapter} / {activeScene.label}</span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shrink-0" />
                    <span className="font-bold text-slate-900 tracking-wide">OIBUZ GUIDED TOUR</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="font-mono text-slate-500 text-xs">
                  <span className="text-blue-700 font-bold">{formatTime(currentTime)}</span> / {formatTime(duration)}
                </div>
              </div>
            </div>

            {/* Master Visual Stage */}
            <div
              ref={stageRef}
              className="relative w-full bg-white min-h-[440px] sm:min-h-[400px] md:min-h-0 md:aspect-[16/9] flex flex-col justify-between overflow-hidden"
            >
              {/* Background Layer with Crossfade & Subtle Cinematic Motion */}
              <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene.id}
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: prefersReducedMotion ? 1 : 1.05 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: prefersReducedMotion ? 0.2 : 0.6 },
                      scale: { duration: Math.max((activeScene.end - activeScene.start), 5), ease: "easeOut" }
                    }}
                    className="absolute inset-0 bg-cover bg-center origin-center"
                    style={{ backgroundImage: `url(${activeScene.bgImage})` }}
                  />
                </AnimatePresence>
              </div>

              {/* INITIAL POSTER STATE (BEFORE PLAY) */}
              {!hasStarted ? (
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center my-auto">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 shadow-sm">
                    <img
                      src="/images/oibuz_logo.png"
                      alt="Oibuz"
                      className="h-9 sm:h-12 w-auto object-contain"
                    />
                  </div>

                  <span className="inline-block text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-md uppercase tracking-wider mb-3">
                    PRODUCT STORY
                  </span>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                    See how Oibuz connects the work.
                  </h3>
                  
                  <p className="text-sm sm:text-base text-slate-600 max-w-md mb-7">
                    Experience the platform through a 40-second guided product story.
                  </p>

                  <button
                    onClick={handleStartStory}
                    className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-5 sm:px-9 py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-xs sm:text-base shadow-lg shadow-blue-700/20 transition-all hover:-translate-y-px"
                    aria-label="Play product story"
                  >
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
                    <span className="whitespace-nowrap">PLAY PRODUCT STORY</span>
                  </button>
                </div>
              ) : (
                /* ACTIVE DYNAMIC SCENE DISPLAY */
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  <div className="w-full h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeScene.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.2 : 0.4 }}
                        className="w-full h-full"
                      >
                        {renderSceneContent()}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Subtitle Bar with Voice Guide HUD */}
                  <div className="relative z-20 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-950/95 backdrop-blur-md text-white border-t border-slate-800 flex items-center justify-between gap-3 shadow-lg">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-900/70 border border-blue-600/40 text-[10px] sm:text-[11px] font-bold text-blue-300 uppercase tracking-wider shrink-0">
                        <VoiceEqualizer isPlaying={isPlaying} barCount={3} className="text-blue-400" />
                        <span>OIBUZ</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-100 italic truncate">
                        "{activeScene.narration}"
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 shrink-0 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      <span className="text-blue-400">CH {activeScene.chapter}</span>/08
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* AUDIO CONTROLS BAR */}
            <div className="relative z-30 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 flex flex-col gap-2">
              
              {/* Progress Bar */}
              <div className="relative w-full flex items-center group">
                <input
                  type="range"
                  min="0"
                  max={duration || 39.7}
                  step="0.05"
                  value={currentTime}
                  onMouseDown={() => { isSeekingRef.current = true; }}
                  onTouchStart={() => { isSeekingRef.current = true; }}
                  onMouseUp={() => { isSeekingRef.current = false; }}
                  onTouchEnd={() => { isSeekingRef.current = false; }}
                  onChange={handleSeek}
                  aria-label="Seek audio position"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700 z-10"
                />
                <div
                  className="absolute left-0 top-0 bottom-0 bg-blue-700 rounded-lg pointer-events-none"
                  style={{ width: `${progressPercent}%`, height: "8px" }}
                />
              </div>

              {/* Playback Controls Row */}
              <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-700">
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePlay}
                    className="p-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold transition shadow-sm"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </button>

                  <button
                    onClick={handleReplay}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                    title="Replay from start"
                    aria-label="Replay story"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="font-mono text-slate-600 ml-1">
                    <span className="text-blue-700 font-bold">{formatTime(currentTime)}</span> / {formatTime(duration)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMute}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-600" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={handleToggleFullscreen}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                    aria-label="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Scene Navigation Chapter Chips */}
        <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 pt-1 px-1 max-w-full no-scrollbar">
          {STORY_SCENES.map((scene) => {
            const isActive = activeScene.id === scene.id;
            return (
              <button
                key={scene.id}
                onClick={() => handleJumpToScene(scene)}
                aria-label={`Jump to scene ${scene.chapter}: ${scene.label}`}
                className={`text-xs px-3.5 py-2 rounded-xl border transition-all duration-200 flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-blue-700 text-white font-bold border-blue-700 shadow-sm"
                    : "bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                <span className={`font-mono text-[10px] ${isActive ? "text-blue-200" : "text-blue-700 font-semibold"}`}>
                  {scene.chapter}
                </span>
                <span className="whitespace-nowrap">{scene.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
