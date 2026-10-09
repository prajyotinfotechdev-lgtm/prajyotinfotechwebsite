// src/components/OibuzAudioStory.jsx
// OIBUZ — Cinematic 39-Second Product Story (v5)
// Master Clock: audio.currentTime → frame-accurate scene choreography
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { OIBUZ_AUDIO_URL, STORY_SCENES } from "./OibuzStoryData";
import {
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2,
  HardHat, MapPin, Users, Clock, Calendar, CreditCard,
  FileSpreadsheet, FileText, CheckCircle2, AlertCircle, Sparkles,
  Building2, ArrowRight, ShieldCheck, Check, Smartphone, Layers,
  Camera, Zap, CheckCheck, Radio, Headphones, UserCheck, Bell,
  BarChart3, Receipt, Workflow, TrendingUp, ChevronRight,
} from "lucide-react";

const E = [0.16, 1, 0.3, 1]; // cinematic ease

function formatTime(sec) {
  if (isNaN(sec) || sec < 0) return "00:00";
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

/* ── Equalizer bars ── */
function VoiceEqualizer({ isPlaying, barCount = 4, className = "" }) {
  return (
    <div className={`inline-flex items-end gap-[2px] h-3.5 ${className}`} aria-hidden>
      {Array.from({ length: barCount }).map((_, i) => (
        <motion.span key={i}
          animate={isPlaying ? { height: ["25%","100%","45%","90%","30%"] } : { height: "30%" }}
          transition={isPlaying
            ? { duration: 0.55 + (i % 3) * 0.18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.08 }
            : { duration: 0.2 }}
          className="w-[2.5px] bg-current rounded-full"
        />
      ))}
    </div>
  );
}

/* ── Animated counter ── */
function Counter({ from, to, duration = 1.2, suffix = "", className = "" }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const start = performance.now();
    const raf = (now) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setVal(Math.round(from + (to - from) * eased));
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [from, to, duration]);
  return <span className={className}>{val.toLocaleString()}{suffix}</span>;
}

/* ── Word-by-word reveal ── */
function KineticText({ text, delay = 0, className = "", as: Tag = "span" }) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <motion.span key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: delay + i * 0.07, duration: 0.5, ease: E }}
        >
          {w}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ── SVG Site Network ── */
function SiteNetworkSVG({ animate: anim }) {
  const sites = [
    { x: 80,  y: 55,  label: "Site A", city: "Mumbai",    workers: 220 },
    { x: 220, y: 30,  label: "Site B", city: "Pune",      workers: 280 },
    { x: 320, y: 80,  label: "Site C", city: "Bengaluru", workers: 160 },
  ];
  const hub = { x: 200, y: 140 };
  return (
    <svg viewBox="0 0 400 180" className="w-full h-full" aria-hidden>
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#2563eb" />
        </marker>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Lines from hub to sites */}
      {sites.map((s, i) => (
        <motion.line key={i} x1={hub.x} y1={hub.y} x2={s.x} y2={s.y}
          stroke="#2563eb" strokeWidth="1.5" strokeDasharray="4 3"
          strokeOpacity="0.5" markerEnd="url(#arr)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={anim ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ delay: 0.3 + i * 0.2, duration: 0.7, ease: E }}
        />
      ))}
      {/* Hub pulse */}
      <motion.circle cx={hub.x} cy={hub.y} r="22" fill="url(#hubGlow)"
        animate={anim ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx={hub.x} cy={hub.y} r="14" fill="#1a3a6b" />
      <text x={hub.x} y={hub.y + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">OIBUZ</text>
      {/* Site nodes */}
      {sites.map((s, i) => (
        <g key={i}>
          <motion.circle cx={s.x} cy={s.y} r="18" fill="#eef2ff" stroke="#2563eb" strokeWidth="1.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={anim ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.18, duration: 0.45, ease: E, type: "spring", stiffness: 200 }}
          />
          <text x={s.x} y={s.y - 22} textAnchor="middle" fill="#1a3a6b" fontSize="8" fontWeight="bold">{s.label}</text>
          <text x={s.x} y={s.y + 4} textAnchor="middle" fill="#1a3a6b" fontSize="7">{s.city}</text>
          <text x={s.x} y={s.y + 14} textAnchor="middle" fill="#64748b" fontSize="6.5">{s.workers}W</text>
        </g>
      ))}
    </svg>
  );
}

/* ── Scene 01: THE CHALLENGE ── */
function SceneTheChallenge({ time }) {
  const t0 = time >= 0.3;
  const t1 = time >= 1.2;
  const t2 = time >= 2.5;
  const t3 = time >= 3.7;
  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-7 overflow-hidden" style={{ background: "linear-gradient(135deg,#f0f5ff 0%,#e8f0fe 100%)" }}>
      {/* BG grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs><pattern id="g1" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#1a3a6b" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g1)"/>
      </svg>

      {t0 && <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, ease:E }}
        className="inline-flex items-center gap-2 self-start mb-4">
        <span className="text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md tracking-widest uppercase">01 / The Challenge</span>
      </motion.div>}

      {t1 && <KineticText delay={0} text="Managing a construction workforce across multiple sites isn't easy."
        className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0f1f3d] leading-tight mb-3 max-w-lg" as="h3" />}

      {t2 && <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:E }}
        className="text-xs sm:text-sm text-slate-600 max-w-md mb-5">
        Attendance, rosters, and daily field activity spread across distant construction locations create visibility gaps.
      </motion.p>}

      <div className="flex-1 grid grid-cols-2 gap-3 items-start">
        <div className="col-span-2 sm:col-span-1 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm h-36 sm:h-44 relative">
          <SiteNetworkSVG animate={t2} />
        </div>
        <div className="flex flex-col gap-2">
          {[
            { label: "Site A — Mumbai",    workers: "220", icon: Building2, color: "#2563eb" },
            { label: "Site B — Pune",      workers: "280", icon: HardHat,   color: "#059669" },
            { label: "Site C — Bengaluru", workers: "160", icon: MapPin,    color: "#7c3aed" },
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:20 }} animate={t2 ? { opacity:1, x:0 } : {}}
              transition={{ delay: 0.2 + i*0.14, duration:0.45, ease:E }}
              className="flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-800 truncate">{s.label}</p>
                <p className="text-[9px] text-slate-500">{s.workers} Daily Workers</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {t3 && <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, ease:E }}
        className="mt-3 flex items-center justify-between text-[10px] border-t border-slate-200 pt-2.5">
        <span className="text-slate-500">Operational Field Reality</span>
        <span className="font-bold text-[#1a3a6b]">660+ Active Ground Workers</span>
      </motion.div>}
    </div>
  );
}

/* ── Scene 02: PROCESS CHAOS ── */
function SceneTooManyProcesses({ time }) {
  const items = [
    { label: "Attendance Registers", channel: "Paper Muster Rolls",   icon: HardHat,     trig: time>=5.6,  color:"#ea580c" },
    { label: "Leave Requests",        channel: "WhatsApp Chat Groups", icon: Calendar,    trig: time>=6.8,  color:"#d97706" },
    { label: "Project Hours",         channel: "Scattered Excel Sheets",icon: Clock,      trig: time>=7.8,  color:"#ea580c" },
    { label: "Site Expenses",         channel: "Paper Fuel Bills",     icon: CreditCard,  trig: time>=8.8,  color:"#dc2626" },
    { label: "Approvals",             channel: "Phone Calls & Signatures",icon: AlertCircle, trig: time>=9.8,  color:"#7c3aed" },
  ];
  const showChaos = time >= 11.5;

  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-7 overflow-hidden" style={{ background: "linear-gradient(135deg,#fff7ed 0%,#fef3c7 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs><pattern id="g2" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#7c2d12" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g2)"/>
      </svg>

      <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, ease:E }}
        className="inline-flex items-center gap-2 self-start mb-3">
        <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md tracking-widest uppercase">02 / Process Chaos</span>
      </motion.div>

      <KineticText delay={0.05} text="Too many processes. Too many follow-ups."
        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-3 max-w-lg" as="h3" />

      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2 content-start">
        {items.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity:0.2, scale:0.96, y:8 }}
            animate={item.trig ? { opacity:1, scale:1, y:0 } : {}}
            transition={{ duration:0.4, ease:E }}
            className={`p-2.5 rounded-xl border ${item.trig ? "bg-white shadow-sm border-slate-200" : "bg-white/60 border-slate-100"}`}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon className="w-3 h-3" style={{ color: item.color }} />
              </div>
              <span className="text-[10px] font-bold text-slate-900 truncate">{item.label}</span>
            </div>
            <p className="text-[9px] text-slate-500 truncate">{item.channel}</p>
            {item.trig && (
              <motion.div
                initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                style={{ transformOrigin:"left", backgroundColor: item.color }}
                transition={{ delay:0.2, duration:0.5, ease:E }}
                className="mt-1.5 h-0.5 rounded-full w-full" />
            )}
          </motion.div>
        ))}

        {showChaos && (
          <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:0.4, ease:E }}
            className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-red-900">Pending Follow-ups</p>
              <p className="text-[9px] text-red-700">18 Unresolved Chases</p>
            </div>
            <motion.div animate={{ rotate:[0, -10, 10, -10, 0] }} transition={{ duration:0.6, delay:0.3 }}>
              <AlertCircle className="w-5 h-5 text-red-500" />
            </motion.div>
          </motion.div>
        )}
      </div>

      <motion.div initial={{ opacity:0 }} animate={showChaos ? { opacity:1 } : {}}
        transition={{ duration:0.4 }}
        className="mt-2 flex items-center justify-between text-[10px] border-t border-amber-200 pt-2">
        <span className="text-slate-500">Fragmented communications</span>
        <span className="font-bold text-amber-700">High Admin Overhead</span>
      </motion.div>
    </div>
  );
}

/* ── Scene 03: MEET OIBUZ ── */
function SceneMeetOibuz({ time }) {
  const t1 = time >= 14.1;
  const t2 = time >= 15.3;
  const t3 = time >= 16.5;

  const modules = [
    { icon: Clock,         label: "Attendance",  color: "#2563eb" },
    { icon: Calendar,      label: "Leave",       color: "#059669" },
    { icon: FileSpreadsheet,label:"Timesheets",  color: "#7c3aed" },
    { icon: Receipt,       label: "Expenses",    color: "#d97706" },
    { icon: CreditCard,    label: "Payroll",     color: "#2563eb" },
    { icon: CheckCircle2,  label: "Approvals",   color: "#0891b2" },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-5 sm:p-7 overflow-hidden text-center"
      style={{ background: "linear-gradient(135deg,#eef2ff 0%,#e0f2fe 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs><pattern id="g3" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#1a3a6b" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g3)"/>
      </svg>

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div className="w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle,rgba(37,99,235,0.12) 0%,transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }} />
      </div>

      <motion.span initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, ease:E }}
        className="inline-block text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-md tracking-widest uppercase mb-4">
        03 / Meet Oibuz
      </motion.span>

      {t1 && (
        <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.55, ease:E }} className="mb-3">
          <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-10 sm:h-12 w-auto object-contain mx-auto" />
        </motion.div>
      )}

      {t1 && <KineticText delay={0.1} text="Workforce management built for construction."
        className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0f1f3d] leading-tight mb-2 max-w-md" as="h3" />}

      {t2 && <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, ease:E }}
        className="text-xs text-slate-600 max-w-sm mb-5">
        A unified platform for field teams, site managers, HR, and finance.
      </motion.p>}

      {t3 && (
        <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:E }}
          className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-lg">
          {modules.map((m, i) => (
            <motion.div key={m.label}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.08 + i*0.07, duration:0.4, ease:E }}
              className="flex flex-col items-center gap-1 p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor:`${m.color}15` }}>
                <m.icon className="w-3.5 h-3.5" style={{ color:m.color }} />
              </div>
              <span className="text-[8px] font-semibold text-slate-700 text-center leading-tight">{m.label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

/* ── Scene 04: ATTENDANCE ── */
function SceneAttendance({ time }) {
  const t1 = time >= 18.2;
  const t2 = time >= 19.0;
  const t3 = time >= 19.6;
  const t4 = time >= 20.1;

  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-7 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#ecfdf5 0%,#d1fae5 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" aria-hidden>
        <defs><pattern id="g4" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#059669" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g4)"/>
      </svg>

      <motion.span initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="inline-block self-start text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md tracking-widest uppercase mb-3">
        04 / Attendance
      </motion.span>

      <KineticText delay={0.05} text="Verify attendance with selfie and location."
        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-4 max-w-md" as="h3" />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        {/* Left: Phone mockup */}
        <motion.div initial={{ opacity:0, x:-20 }} animate={t1 ? { opacity:1, x:0 } : {}}
          transition={{ duration:0.6, ease:E }}
          className="bg-white rounded-2xl border border-slate-200 shadow-md p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-black text-blue-700 text-sm">RK</div>
            <div>
              <p className="text-xs font-bold text-slate-900">Ramesh Kumar</p>
              <p className="text-[10px] text-slate-500">EMP #8902 • Site A</p>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1.5 font-mono text-[10px] text-slate-600">
            <div className="flex items-center gap-2">
              <Camera className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span>Selfie captured</span>
              <motion.span className="ml-auto text-emerald-600 font-bold"
                initial={{ opacity:0 }} animate={t2 ? { opacity:1 } : {}}>✓ Verified</motion.span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span>GPS: 18.5204°N</span>
              <motion.span className="ml-auto text-emerald-600 font-bold"
                initial={{ opacity:0 }} animate={t2 ? { opacity:1 } : {}}>✓ On-Site</motion.span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span>08:02:14 AM</span>
              <motion.span className="ml-auto text-emerald-600 font-bold"
                initial={{ opacity:0 }} animate={t2 ? { opacity:1 } : {}}>✓ On-Time</motion.span>
            </div>
          </div>
        </motion.div>

        {/* Right: verification panel */}
        <div className="flex flex-col gap-2.5">
          <motion.div initial={{ opacity:0, x:20 }} animate={t3 ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.5, ease:E }}
            className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCheck className="w-4.5 h-4.5 text-emerald-700" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-900">Attendance Verified</p>
              <p className="text-[9px] text-emerald-700">Geo-stamped • Zero ghost workers</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, x:20 }} animate={t4 ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.5, ease:E }}
            className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
            <p className="text-[10px] font-bold text-slate-800 mb-1.5">Today's Site A</p>
            <div className="space-y-1">
              {[{ l:"Present", v:215, c:"#059669" }, { l:"Absent", v:5, c:"#dc2626" }].map(r => (
                <div key={r.l} className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-500 w-12">{r.l}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ backgroundColor: r.c }}
                      initial={{ width:0 }}
                      animate={t4 ? { width: r.l==="Present"?"97.7%":"2.3%" } : {}}
                      transition={{ delay:0.2, duration:0.6, ease:E }} />
                  </div>
                  <span className="text-[9px] font-bold text-slate-700 w-6 text-right">{r.v}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Scene 05: LEAVE & TIMESHEETS ── */
function SceneLeaveTimesheets({ time }) {
  const t1 = time >= 20.8;
  const t2 = time >= 21.8;
  const t3 = time >= 22.4;

  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-7 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#f5f3ff 0%,#ede9fe 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs><pattern id="g5" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#7c3aed" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g5)"/>
      </svg>

      <motion.span initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="inline-block self-start text-[10px] font-black text-violet-700 bg-violet-50 border border-violet-200 px-2.5 py-1 rounded-md tracking-widest uppercase mb-3">
        05 / Leave & Timesheets
      </motion.span>

      <KineticText delay={0.05} text="Manage leave and project timesheets."
        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-4 max-w-md" as="h3" />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        <motion.div initial={{ opacity:0, y:16 }} animate={t1 ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5, ease:E }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900">Leave Approval</span>
            <motion.span initial={{ scale:0 }} animate={t2 ? { scale:1 } : {}} transition={{ type:"spring", stiffness:300 }}
              className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">APPROVED</motion.span>
          </div>
          <p className="text-xs text-slate-700 font-medium">Santosh Patil (Mason)</p>
          <p className="text-[10px] text-slate-500">2 Days Casual Leave • Auto-synced to payroll</p>
          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            <span>Deducted from entitlement — payroll notified</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={t2 ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5, ease:E }}
          className="bg-white rounded-xl border border-violet-200 shadow-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900">BOQ Timesheet</span>
            <motion.span initial={{ scale:0 }} animate={t3 ? { scale:1 } : {}} transition={{ type:"spring", stiffness:300 }}
              className="text-[9px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full">ALLOCATED</motion.span>
          </div>
          {[
            { task:"Level 4 Slab Concrete", hrs:"5.5 hr" },
            { task:"Rebar Binding",         hrs:"2.5 hr" },
          ].map((r, i) => (
            <motion.div key={i} initial={{ opacity:0, x:10 }} animate={t3 ? { opacity:1, x:0 } : {}}
              transition={{ delay: i*0.1, duration:0.35 }}
              className="flex items-center justify-between text-[10px]">
              <span className="text-slate-600 truncate">{r.task}</span>
              <span className="font-bold text-slate-900 ml-2 flex-shrink-0">{r.hrs}</span>
            </motion.div>
          ))}
          <div className="pt-0.5 border-t border-slate-100 flex justify-between text-[9px] font-bold text-violet-700">
            <span>Total</span><span>8.0 hr</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Scene 06: REIMBURSEMENTS & PAYROLL ── */
function SceneReimbursementsPayroll({ time }) {
  const t1 = time >= 23.2;
  const t2 = time >= 24.3;
  const t3 = time >= 25.5;
  const t4 = time >= 26.5;

  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-7 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs><pattern id="g6" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#2563eb" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g6)"/>
      </svg>

      <motion.span initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="inline-block self-start text-[10px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-md tracking-widest uppercase mb-3">
        06 / Payroll & Expenses
      </motion.span>

      <KineticText delay={0.05} text="Digitize reimbursements, approvals, and payroll."
        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-4 max-w-md" as="h3" />

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
        <motion.div initial={{ opacity:0, y:16 }} animate={t1 ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5, ease:E }}
          className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900">Site Expense Claim</span>
            <motion.span initial={{ scale:0 }} animate={t2 ? { scale:1 } : {}} transition={{ type:"spring", stiffness:300 }}
              className="text-[9px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">FINANCE CLEARED</motion.span>
          </div>
          <p className="text-xs text-slate-700 font-medium">DG Fuel & Hardware: <span className="font-black text-slate-900">₹4,200</span></p>
          <p className="text-[10px] text-slate-500">Receipt attached • Supervisor approved</p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={t3 ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.5, ease:E }}
          className="bg-white rounded-xl border border-blue-200 shadow-sm p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-900">HR Payroll Run</span>
            <motion.span initial={{ scale:0 }} animate={t4 ? { scale:1 } : {}} transition={{ type:"spring", stiffness:300 }}
              className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">HR REVIEWED</motion.span>
          </div>
          <p className="text-xs text-slate-700 font-medium">Verified Days + OT Calculated</p>
          {[
            { n:"Ramesh K.", d:26, amt:"₹28,400" },
            { n:"Santosh P.", d:24, amt:"₹22,100" },
          ].map((r,i) => (
            <motion.div key={i} initial={{ opacity:0, x:8 }} animate={t4 ? { opacity:1, x:0 } : {}}
              transition={{ delay:i*0.1 }}
              className="flex items-center justify-between text-[9px] font-mono">
              <span className="text-slate-600">{r.n}</span>
              <span className="text-slate-400">{r.d}d</span>
              <span className="font-black text-slate-800">{r.amt}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {t4 && <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="mt-2 flex items-center justify-between text-[10px] border-t border-slate-200 pt-2">
        <span className="text-slate-500">All in one structured system</span>
        <span className="font-bold text-blue-700">Zero Payroll Disputes</span>
      </motion.div>}
    </div>
  );
}

/* ── Scene 07: CONNECTED ORGANIZATION ── */
function OrgFlowSVG({ animate: anim }) {
  const nodes = [
    { id:"field",    x:60,  y:100, label:"Field",    sub:"Punch & Slips",       color:"#2563eb" },
    { id:"super",    x:160, y:45,  label:"Supervisors",sub:"Rosters",           color:"#7c3aed" },
    { id:"hr",       x:260, y:45,  label:"HR",        sub:"Payroll Run",         color:"#059669" },
    { id:"finance",  x:360, y:100, label:"Finance",   sub:"Reimbursements",      color:"#d97706" },
  ];
  const edges = [
    { x1:60, y1:100, x2:160, y2:45 },
    { x1:160, y1:45, x2:260, y2:45 },
    { x1:260, y1:45, x2:360, y2:100 },
    { x1:160, y1:45, x2:60,  y2:100 },
  ];
  return (
    <svg viewBox="0 0 420 150" className="w-full h-full" aria-hidden>
      {edges.map((e, i) => (
        <motion.line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.35"
          initial={{ pathLength:0, opacity:0 }}
          animate={anim ? { pathLength:1, opacity:1 } : {}}
          transition={{ delay:0.2 + i*0.15, duration:0.6, ease:E }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <motion.circle cx={n.x} cy={n.y} r="24" fill="white" stroke={n.color} strokeWidth="1.5"
            initial={{ scale:0, opacity:0 }}
            animate={anim ? { scale:1, opacity:1 } : {}}
            transition={{ delay:0.1 + i*0.14, duration:0.45, ease:E, type:"spring", stiffness:180 }}
          />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fill={n.color} fontSize="7.5" fontWeight="bold">{n.label}</text>
          <text x={n.x} y={n.y + 36} textAnchor="middle" fill="#64748b" fontSize="6.5">{n.sub}</text>
        </g>
      ))}
      {/* Central Oibuz hub */}
      <motion.circle cx="210" cy="100" r="16" fill="#1a3a6b"
        initial={{ scale:0 }} animate={anim ? { scale:1 } : {}} transition={{ delay:0.6, duration:0.4, ease:E, type:"spring" }} />
      <text x="210" y="104" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="bold">OIBUZ</text>
    </svg>
  );
}

function SceneConnectedOrg({ time }) {
  const t1 = time >= 28.6;
  const t2 = time >= 30.0;
  const t3 = time >= 31.5;

  return (
    <div className="relative w-full h-full flex flex-col p-5 sm:p-7 overflow-hidden"
      style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 100%)" }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
        <defs><pattern id="g7" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#0ea5e9" strokeWidth="0.5"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#g7)"/>
      </svg>

      <motion.span initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="inline-block self-start text-[10px] font-black text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md tracking-widest uppercase mb-3">
        07 / Connected Organization
      </motion.span>

      <KineticText delay={0.05} text="From employees and managers to HR and Finance."
        className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-2 max-w-lg" as="h3" />

      {t1 && <motion.p initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="text-xs text-slate-600 mb-4 max-w-md">
        Oibuz keeps everyone connected — from field operations to back-office governance.
      </motion.p>}

      <div className="flex-1 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm relative" style={{ minHeight:120 }}>
        <OrgFlowSVG animate={t2} />
      </div>

      {t3 && <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="mt-2 flex items-center justify-between text-[10px] border-t border-slate-200 pt-2">
        <span className="text-slate-500">Field to back-office continuity</span>
        <span className="font-bold text-sky-700">Single Source of Truth</span>
      </motion.div>}
    </div>
  );
}

/* ── Scene 08: BRAND PAYOFF ── */
function SceneBrandPayoff({ time, onDemoClick, onReplay }) {
  const t1 = time >= 33.9;
  const t2 = time >= 35.1;
  const t3 = time >= 36.3;
  const t4 = time >= 37.7;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-5 sm:p-7 overflow-hidden text-center"
      style={{ background: "linear-gradient(135deg,#0f1f3d 0%,#1a3a6b 100%)" }}>
      {/* Stars */}
      {Array.from({length:18}).map((_, i) => (
        <motion.div key={i} className="absolute w-0.5 h-0.5 rounded-full bg-white"
          style={{ top:`${Math.random()*100}%`, left:`${Math.random()*100}%`, opacity: 0.3 + Math.random()*0.5 }}
          animate={{ opacity:[0.2,0.8,0.2] }}
          transition={{ duration:2+Math.random()*3, repeat:Infinity, delay:Math.random()*2 }} />
      ))}

      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div className="w-80 h-80 rounded-full"
          style={{ background:"radial-gradient(circle,rgba(37,99,235,0.2) 0%,transparent 70%)" }}
          animate={{ scale:[1,1.12,1] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }} />
      </div>

      <motion.span initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
        className="inline-block text-[10px] font-black text-blue-300 bg-white/10 border border-white/20 px-3 py-1 rounded-md tracking-widest uppercase mb-6">
        08 / Connect the Work
      </motion.span>

      <div className="space-y-2 mb-6">
        {t1 && <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:E }}
          className="text-2xl sm:text-3xl font-bold text-white/70">Multiple sites.</motion.p>}
        {t2 && <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:E }}
          className="text-2xl sm:text-3xl font-extrabold text-white">One workforce.</motion.p>}
        {t3 && <motion.p initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, ease:E }}
          className="text-3xl sm:text-4xl font-black text-blue-400">One connected system.</motion.p>}
      </div>

      {t4 && (
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.6, ease:E }} className="space-y-4">
          <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-10 sm:h-12 w-auto object-contain mx-auto brightness-0 invert" />
          <p className="text-sm font-black text-blue-300 tracking-[0.3em] uppercase">Connect the Work.</p>
          <p className="text-xs text-white/50 max-w-xs mx-auto">Workforce & Business Management Built for Construction</p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <button onClick={onDemoClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-900/30 transition-all hover:-translate-y-px">
              <span>Book a Live Demo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button onClick={onReplay}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Story</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   MAIN AUDIO STORY CONTAINER
══════════════════════════════════════════════════════════════════════════════ */
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

  const activeSceneIndex = STORY_SCENES.findIndex(s => currentTime >= s.start && currentTime < s.end);
  const activeScene = STORY_SCENES[activeSceneIndex !== -1 ? activeSceneIndex : STORY_SCENES.length - 1];

  const isSeekingRef = useRef(false);
  const updateLoop = useCallback(() => {
    if (audioRef.current && !audioRef.current.paused) {
      if (!isSeekingRef.current) setCurrentTime(audioRef.current.currentTime);
      rafRef.current = requestAnimationFrame(updateLoop);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => { setIsPlaying(true); rafRef.current = requestAnimationFrame(updateLoop); };
    const onPause = () => { setIsPlaying(false); cancelAnimationFrame(rafRef.current); };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => { if (audio.duration && !isNaN(audio.duration)) setDuration(audio.duration); };
    const onEnded = () => { setIsPlaying(false); cancelAnimationFrame(rafRef.current); setCurrentTime(audio.duration || 39.7); };
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

  const handleStartStory = () => {
    setHasStarted(true);
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play().catch(console.warn); }
  };
  const handleTogglePlay = () => {
    if (!hasStarted) { handleStartStory(); return; }
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play().catch(console.warn);
    }
  };
  const handleReplay = () => {
    if (audioRef.current) { audioRef.current.currentTime = 0; setCurrentTime(0); audioRef.current.play().catch(console.warn); }
    setHasStarted(true);
  };
  const handleSeek = (e) => {
    const t = parseFloat(e.target.value);
    setCurrentTime(t);
    if (audioRef.current) { isSeekingRef.current = true; audioRef.current.currentTime = t; isSeekingRef.current = false; }
  };
  const handleJumpToScene = (scene) => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.currentTime = scene.start;
      setCurrentTime(scene.start);
      if (audioRef.current.paused) audioRef.current.play().catch(console.warn);
    }
  };
  const handleToggleMute = () => {
    if (audioRef.current) { audioRef.current.muted = !isMuted; setIsMuted(!isMuted); }
  };
  const handleToggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) { stageRef.current.requestFullscreen().catch(console.warn); setIsFullscreen(true); }
    else { document.exitFullscreen().catch(console.warn); setIsFullscreen(false); }
  };

  const renderScene = () => {
    switch (activeScene?.id) {
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
    <section id="product-story" className="relative bg-gradient-to-b from-slate-50 to-white py-16 sm:py-24 border-y border-slate-200/80 overflow-hidden">
      <audio ref={audioRef} src={OIBUZ_AUDIO_URL} preload="auto" playsInline>
        <source src={OIBUZ_AUDIO_URL} type="audio/mpeg" />
        <source src="/audio/oibuz-product-story.mp3" type="audio/mpeg" />
      </audio>

      {/* BG texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"radial-gradient(circle at 20% 50%,rgba(37,99,235,0.04) 0%,transparent 60%),radial-gradient(circle at 80% 30%,rgba(124,58,237,0.04) 0%,transparent 60%)" }} />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, ease:E }}
            className="inline-flex items-center gap-2 mb-4">
            <Workflow className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-700 tracking-widest uppercase">Product Story</span>
          </motion.div>
          <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:0.1, duration:0.6, ease:E }}
            className="text-3xl sm:text-4xl font-extrabold text-[#0f1f3d] tracking-tight mb-3">
            See how Oibuz <span className="text-blue-700">connects the work</span>.
          </motion.h2>
          <motion.p initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:0.2, duration:0.6, ease:E }}
            className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            A 39-second product walkthrough — from the challenge of managing multi-site workforces to one connected system.
          </motion.p>
        </div>

        {/* ── Main Stage ── */}
        <div ref={stageRef} className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xl shadow-slate-900/10 bg-white"
          style={{ minHeight: 480 }}>

          {/* Scene canvas */}
          <div className="relative w-full" style={{ minHeight: 420, paddingBottom:"52%" }}>
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={activeScene?.id}
                  className="absolute inset-0"
                  initial={{ opacity:0, scale:1.01 }}
                  animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.99 }}
                  transition={{ duration:0.45, ease:E }}>
                  {hasStarted ? renderScene() : (
                    /* ── Pre-roll splash ── */
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                      style={{ background:"linear-gradient(135deg,#eef2ff 0%,#e8f0fe 100%)" }}>
                      <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage:"radial-gradient(circle at 50% 40%,rgba(37,99,235,0.1) 0%,transparent 60%)"
                      }} />
                      {/* Grid */}
                      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" aria-hidden>
                        <defs><pattern id="gPre" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="#1a3a6b" strokeWidth="0.5"/></pattern></defs>
                        <rect width="100%" height="100%" fill="url(#gPre)"/>
                      </svg>

                      <div className="relative z-10 space-y-5">
                        <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-10 w-auto object-contain mx-auto" />
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f1f3d] mb-2">See how Oibuz connects the work.</h3>
                          <p className="text-slate-500 text-sm max-w-md mx-auto">
                            A cinematic 39-second walkthrough of workforce management for construction sites.
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 text-[10px]">
                          {STORY_SCENES.map(s => (
                            <span key={s.id} className="px-2.5 py-1 bg-white border border-slate-200 rounded-full font-semibold text-slate-600 shadow-xs">
                              {s.chapter} {s.label}
                            </span>
                          ))}
                        </div>
                        <motion.button
                          onClick={handleStartStory}
                          whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#1a3a6b] hover:bg-[#15305a] text-white font-bold text-sm shadow-xl shadow-blue-900/25 transition-colors">
                          <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                          </div>
                          <span>Play Product Story</span>
                          <span className="text-blue-300 text-xs font-normal">(39 sec)</span>
                        </motion.button>
                        <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
                          <Headphones className="w-3 h-3" />
                          Best experienced with audio on
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Controls bar ── */}
          {hasStarted && (
            <div className="border-t border-slate-200 bg-white/95 backdrop-blur-sm px-4 py-3">
              {/* Progress bar */}
              <div className="mb-2.5 relative">
                {/* Scene segment markers */}
                <div className="relative h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  {/* Filled progress */}
                  <motion.div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-600 to-blue-500"
                    style={{ width: `${progressPercent}%` }}
                    transition={{ duration:0.1 }}
                  />
                  {/* Scene dividers */}
                  {STORY_SCENES.slice(1).map(s => (
                    <div key={s.id} className="absolute top-0 h-full w-px bg-white/60 z-10"
                      style={{ left:`${(s.start / duration) * 100}%` }} />
                  ))}
                </div>
                {/* Seek input */}
                <input type="range" min="0" max={duration} step="0.1" value={currentTime}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  aria-label="Seek audio" />
              </div>

              {/* Control buttons row */}
              <div className="flex items-center gap-2">
                {/* Play/Pause */}
                <button onClick={handleTogglePlay}
                  className="w-8 h-8 rounded-full bg-[#1a3a6b] hover:bg-[#15305a] text-white flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying
                    ? <Pause className="w-3.5 h-3.5 fill-white" />
                    : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                </button>

                {/* Replay */}
                <button onClick={handleReplay}
                  className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Replay">
                  <RotateCcw className="w-3 h-3" />
                </button>

                {/* Equalizer / time */}
                <div className="flex items-center gap-1.5 text-blue-700 min-w-0">
                  <VoiceEqualizer isPlaying={isPlaying} barCount={4} />
                  <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Current scene badge */}
                <AnimatePresence mode="wait">
                  <motion.div key={activeScene?.id}
                    initial={{ opacity:0, y:4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-4 }}
                    transition={{ duration:0.25 }}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 flex-shrink-0">
                    <span className="text-[9px] font-black text-slate-400">{activeScene?.chapter}</span>
                    <span className="text-[9px] font-bold text-slate-700">{activeScene?.label}</span>
                  </motion.div>
                </AnimatePresence>

                <div className="ml-auto flex items-center gap-1">
                  <button onClick={handleToggleMute}
                    className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors"
                    aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={handleToggleFullscreen}
                    className="w-7 h-7 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 flex items-center justify-center transition-colors"
                    aria-label="Fullscreen">
                    {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Chapter scrubber ── */}
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {STORY_SCENES.map((scene, i) => {
            const isPast  = currentTime >= scene.end;
            const isActive = activeScene?.id === scene.id && hasStarted;
            return (
              <button key={scene.id}
                onClick={() => handleJumpToScene(scene)}
                className={`relative p-2 rounded-xl text-center transition-all text-[9px] font-bold border overflow-hidden
                  ${isActive ? "border-blue-600 bg-blue-50 text-blue-800 shadow-sm shadow-blue-200"
                    : isPast ? "border-slate-200 bg-slate-50 text-slate-500"
                    : "border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"}`}>
                {isActive && (
                  <motion.div className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600"
                    initial={{ scaleX:0 }} animate={{ scaleX:1 }} style={{ transformOrigin:"left" }}
                    transition={{ duration: scene.end - scene.start, ease:"linear" }} />
                )}
                <span className="block text-[8px] mb-0.5 opacity-60">{scene.chapter}</span>
                <span className="truncate block leading-tight">{scene.label}</span>
                {isPast && <Check className="w-2.5 h-2.5 text-emerald-500 mx-auto mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* ── CTA row ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div>
            <p className="font-extrabold text-[#0f1f3d] text-base sm:text-lg mb-0.5">Ready to connect your workforce?</p>
            <p className="text-slate-500 text-xs sm:text-sm">See Oibuz in action with a personalized live demo for your sites.</p>
          </div>
          <button onClick={onDemoClick}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1a3a6b] hover:bg-[#15305a] text-white font-bold text-sm shadow-lg shadow-blue-900/15 transition-all hover:-translate-y-px hover:shadow-xl whitespace-nowrap">
            Book a Live Demo <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
