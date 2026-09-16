import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, ShieldCheck, Smartphone, Laptop, Tablet, CheckCircle2 } from "lucide-react";

export default function ThreeDeviceStack() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[380px] sm:h-[460px] flex items-center justify-center perspective-1000 select-none">
      
      {/* Ambient Pulsing Glow behind devices */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-brand-600/30 via-indigo-500/20 to-cyan-400/20 blur-[100px] animate-pulse-slow" />
      </div>

      {/* DEVICE 1: 3D Isometric Laptop (Background Core) */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 18 }}
        animate={{ opacity: 1, y: 0, rotateX: 12 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute w-[85%] sm:w-[90%] max-w-[500px] z-10"
        style={{
          transformStyle: "preserve-3d",
          filter: "drop-shadow(0 25px 40px rgba(15, 23, 42, 0.35))"
        }}
      >
        {/* Laptop Display */}
        <div className="relative w-full aspect-[16/10] bg-slate-900 rounded-t-2xl sm:rounded-t-3xl border-[6px] sm:border-[10px] border-slate-900 overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="h-6 sm:h-7 bg-slate-800/90 px-3 flex items-center justify-between border-b border-slate-700/60">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">app.oibuzhrms.com/dashboard</div>
            <div className="w-3" />
          </div>

          {/* Screen Dashboard Visual */}
          <div className="p-3 sm:p-4 bg-slate-950 h-full text-slate-200 font-mono text-[10px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-brand-600/30 border border-brand-500/40 text-brand-300 flex items-center justify-center font-bold text-xs">OI</div>
                <span className="font-bold text-xs text-white">Oibuz Enterprise Portal</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px] border border-emerald-500/30">
                ● Live 99.98%
              </span>
            </div>

            {/* Dashboard Mock Grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[9px]">Active Sites</div>
                <div className="text-sm font-bold text-white mt-0.5">14 Locations</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[9px]">Verified Punches</div>
                <div className="text-sm font-bold text-cyan-400 mt-0.5">1,248 Today</div>
              </div>
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[9px]">Payroll Status</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">Verified</div>
              </div>
            </div>

            {/* Micro Chart Lines */}
            <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <span className="text-[9px] text-slate-400">Attendance Sync Pipeline</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-6 bg-brand-500 rounded-full animate-pulse" />
                <div className="w-1.5 h-4 bg-indigo-500 rounded-full" />
                <div className="w-1.5 h-8 bg-cyan-400 rounded-full" />
                <div className="w-1.5 h-5 bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Laptop Base Deck */}
        <div className="relative w-[106%] -ml-[3%] h-4 sm:h-5 bg-slate-800 rounded-b-xl border-t border-slate-700 flex justify-center shadow-2xl">
          <div className="w-1/4 h-1.5 bg-slate-900 rounded-b-md" />
        </div>
      </motion.div>

      {/* DEVICE 2: Floating 3D Tablet (Middle Foreground Layer) */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 40 }}
        animate={prefersReducedMotion ? { opacity: 1, x: -30, y: 30 } : { opacity: 1, x: [-20, -35, -20], y: [40, 25, 40], rotate: [-2, 1, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-2 sm:left-6 bottom-4 sm:bottom-8 w-44 sm:w-56 z-20"
        style={{
          filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.4))"
        }}
      >
        <div className="w-full aspect-[3/4] bg-slate-900 rounded-2xl sm:rounded-3xl p-2 border-[5px] border-slate-800 shadow-2xl overflow-hidden bg-slate-950 text-white font-mono text-[9px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
            <span className="font-bold text-slate-300 text-[10px]">Supervisor App</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-1.5">
            <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[8px]">Site: Pune Metro</div>
              <div className="text-white font-bold text-[10px] mt-0.5">86 Staff On-Site</div>
            </div>
            <div className="bg-purple-900/30 border border-purple-500/30 p-2 rounded-lg text-purple-300">
              <div className="font-bold text-[9px]">GPS Selfie Verification</div>
              <div className="text-[8px] text-purple-200/80 mt-0.5">Location Locked</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* DEVICE 3: Floating 3D Smartphone (Right Foreground Layer) */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 20 }}
        animate={prefersReducedMotion ? { opacity: 1, x: 30, y: 10 } : { opacity: 1, x: [20, 35, 20], y: [15, 30, 15], rotate: [3, -1, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute right-2 sm:right-6 top-8 sm:top-12 w-36 sm:w-44 z-30"
        style={{
          filter: "drop-shadow(0 20px 35px rgba(0, 0, 0, 0.45))"
        }}
      >
        <div className="w-full aspect-[9/19] bg-slate-900 rounded-2xl sm:rounded-3xl p-2 border-[4px] border-slate-800 shadow-2xl overflow-hidden bg-slate-950 text-white font-mono text-[9px]">
          <div className="flex justify-center mb-1.5">
            <div className="w-12 h-2 rounded-full bg-slate-800" />
          </div>
          <div className="bg-brand-600/20 border border-brand-500/40 p-2 rounded-xl text-center mb-2">
            <div className="text-[8px] text-brand-300 font-bold uppercase">Punch Verified</div>
            <div className="text-white font-bold text-[11px] mt-0.5">09:02 AM</div>
          </div>
          <div className="space-y-1">
            <div className="p-1.5 bg-slate-900 rounded-md text-[8px] text-slate-300">✓ Geofence Verified</div>
            <div className="p-1.5 bg-slate-900 rounded-md text-[8px] text-slate-300">✓ Face Match 99.4%</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Graphic Badge Chips */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2 left-4 z-40 bg-white/90 backdrop-blur-md border border-purple-200 px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold text-purple-900"
      >
        <Zap className="w-3.5 h-3.5 text-purple-600" />
        <span>Sub-Second Cloud Sync</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-2 right-4 z-40 bg-white/90 backdrop-blur-md border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-bold text-emerald-900"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Role-Based Governance</span>
      </motion.div>

    </div>
  );
}
