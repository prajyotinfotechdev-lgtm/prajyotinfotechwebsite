// src/components/HrmsSpotlight.jsx
import React from "react";
import { Link } from "react-router-dom";
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
  Smartphone
} from "lucide-react";

export default function HrmsSpotlight() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-slate-950 border-y border-amber-500/20 text-slate-100">
      
      {/* Ambient Industrial Backlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flagship Product Callout Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PRAJYOT INFOTECH FLAGSHIP B2B PRODUCT</span>
          </div>

          <span className="text-xs font-mono text-slate-400">
            PROPRIETARY B2B SAAS PLATFORM
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Product Information & Value */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Meet Prajyot <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
                  Construction HRMS
                </span>
              </h2>
              <p className="text-lg sm:text-xl font-medium text-amber-400/95 mt-2">
                Workforce management built for construction and project-based teams.
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Manage employees, site attendance, leave and payroll from one connected system. 
              Designed specifically for the ground realities of construction sites, infrastructure packages, and multi-location field operations.
            </p>

            {/* Confirmed Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Geolocation Attendance</div>
                  <div className="text-[11px] text-slate-400">Captures exact GPS coordinates at punch-in.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <Camera className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Photo / Selfie Verification</div>
                  <div className="text-[11px] text-slate-400">Verifies the actual person marking attendance.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Site-Wise Allocation</div>
                  <div className="text-[11px] text-slate-400">Track workforce and muster rolls by project.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">Connected Payroll Flow</div>
                  <div className="text-[11px] text-slate-400">Shifts and approved leaves feed salary rolls.</div>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/products/hrms"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Construction HRMS →</span>
              </Link>

              <Link
                to="/products/hrms#demo-request-form"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-sm font-semibold transition"
              >
                <span>Book a Product Demo</span>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full source code &amp; IP ownership options • Zero monthly per-seat licensing penalties</span>
            </div>
          </div>

          {/* Right: Product UI Preview Card */}
          <div className="lg:col-span-6">
            <div className="bg-slate-900 rounded-3xl border border-amber-500/30 p-5 sm:p-6 shadow-[0_0_50px_rgba(245,158,11,0.12)] relative">
              
              {/* Product Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <HardHat className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Prajyot Construction HRMS</div>
                    <div className="text-[10px] font-mono text-slate-400">Multi-Site Executive Console</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE SITES CONNECTED
                </span>
              </div>

              {/* High-Level Metrics Banner */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 block">Total Staff</span>
                  <span className="text-base font-bold text-white">1,420</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 block">On Site Today</span>
                  <span className="text-base font-bold text-emerald-400">1,318 (92.8%)</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono text-amber-400 block">Active Sites</span>
                  <span className="text-base font-bold text-amber-400">12 Projects</span>
                </div>
              </div>

              {/* Sample Site Stream Preview */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>PROJECT ROSTER // BANER HIGH-RISE</span>
                  <span className="text-emerald-400">93.0% Present</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-white">Civil &amp; RCC Subcontractor Crew</span>
                    </div>
                    <span className="font-mono text-slate-400">184 Present</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-white">Tower Crane &amp; Plant Operators</span>
                    </div>
                    <span className="font-mono text-slate-400">28 Present</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="font-semibold text-white">QA/QC &amp; Site Safety Engineers</span>
                    </div>
                    <span className="font-mono text-slate-400">16 Present</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3 text-amber-400" />
                    <span>Photo + GPS Audit Active</span>
                  </span>
                  <Link to="/products/hrms" className="text-amber-400 font-bold hover:underline">
                    View Full Product Details →
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
