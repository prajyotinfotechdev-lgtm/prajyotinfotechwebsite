// src/components/HrmsSpotlight.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ThreeDeviceStack from "./ThreeDeviceStack.jsx";
import {
  HardHat,
  MapPin,
  Camera,
  Users,
  Building2,
  CreditCard,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Trophy,
  Activity,
  Zap,
  Check
} from "lucide-react";

export default function HrmsSpotlight() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-purple-50/50 to-slate-50 border-y border-purple-100/80 text-slate-800">
      
      {/* Soft Moody Ambient Backlight Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-purple-300/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-300/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flagship Hero Product Callout Header Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-purple-100">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-50 border border-purple-200/80 text-purple-800 text-xs font-mono font-extrabold uppercase tracking-widest shadow-sm"
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            <span>OUR HERO PRODUCT &bull; FLAGSHIP B2B SAAS</span>
          </motion.div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE ENTERPRISE DEPLOYMENTS</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-purple-900 font-bold">PROPRIETARY PLATFORM</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Product Information & Value */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-600 uppercase tracking-widest mb-3 bg-purple-50 px-3 py-1 rounded-md border border-purple-100">
                <Zap className="w-3.5 h-3.5" />
                <span>CONNECTED WORKFORCE PLATFORM</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Oibuz <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-violet-600">
                  HRMS
                </span>
              </h2>
              <p className="text-lg sm:text-xl font-medium text-slate-700 mt-3 leading-snug">
                Connect your workforce. Simplify HR. Stay in control.
              </p>
            </div>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Eliminate disconnected registers and fragmented workflows. Oibuz HRMS brings employee records, attendance, leave, timesheets, reimbursements, payroll and approvals into one connected workforce platform.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-[0_4px_20px_-4px_rgba(124,58,237,0.06)] hover:border-purple-300 transition-all flex items-start gap-3">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Geolocation Punch</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">Captures exact GPS boundaries at site check-in.</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-[0_4px_20px_-4px_rgba(124,58,237,0.06)] hover:border-purple-300 transition-all flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Photo Selfie Audit</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">Live selfie verification eliminates proxy punching.</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-[0_4px_20px_-4px_rgba(124,58,237,0.06)] hover:border-purple-300 transition-all flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Site-Wise Allocation</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">Track manpower &amp; muster rolls per project.</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-[0_4px_20px_-4px_rgba(124,58,237,0.06)] hover:border-purple-300 transition-all flex items-start gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Connected Payroll</div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-tight">Site shifts feed salary rolls automatically.</div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/products/hrms"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white font-bold text-base shadow-[0_10px_30px_-10px_rgba(124,58,237,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(124,58,237,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Hero Product &rarr;</span>
              </Link>

              <Link
                to="/products/hrms#demo-request-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-purple-50/80 border border-purple-200 text-purple-900 text-base font-semibold shadow-sm hover:border-purple-300 transition"
              >
                <span>Book Live Product Demo</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 pt-1">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <span>Full source code &amp; IP ownership &bull; Zero per-seat monthly penalties</span>
            </div>
          </div>

          {/* Right: Interactive 3D Multi-Device Platform Stack */}
          <div className="lg:col-span-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative py-4"
            >
              <ThreeDeviceStack />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
