// src/components/OibuzSelfServeCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, Rocket, ShieldCheck, Clock, PlayCircle } from "lucide-react";
import { getOibuzRegisterUrl, trackOibuzTrialClick } from "../utils/oibuzLinks.js";

/**
 * Self-serve PLG onboarding strip shown alongside assisted demo forms so prospects
 * can launch their OIBUZ workspace immediately without waiting for a sales callback.
 */
export default function OibuzSelfServeCard({ source = "self_serve_card", dark = false }) {
  const href = getOibuzRegisterUrl({ source });

  return (
    <div
      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
        dark
          ? "bg-gradient-to-br from-slate-900 via-[#0f1f3d] to-blue-950 border-blue-500/30 text-white shadow-xl"
          : "bg-gradient-to-br from-blue-50/90 via-indigo-50/70 to-emerald-50/60 border-blue-200/80 text-slate-900 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${
            dark
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
          }`}
        >
          <Rocket className="w-3.5 h-3.5" />
          Instant Self-Setup
        </span>
        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${dark ? "text-slate-300" : "text-slate-600"}`}>
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          2 Min Setup
        </span>
      </div>

      <h3 className={`text-base sm:text-lg font-black leading-snug mb-1.5 ${dark ? "text-white" : "text-slate-900"}`}>
        Want to set up OIBUZ yourself right now?
      </h3>
      <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${dark ? "text-slate-300" : "text-slate-600"}`}>
        Skip the waiting room. Register your company workspace directly on OIBUZ, add your construction sites, and start taking live GPS selfie punches today.
      </p>

      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4 text-[11px] font-semibold ${dark ? "text-slate-200" : "text-slate-700"}`}>
        {[
          "1. Create workspace",
          "2. Set site GPS fence",
          "3. Add staff & punch",
        ].map((step) => (
          <div
            key={step}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border ${
              dark ? "bg-white/5 border-white/10" : "bg-white/85 border-blue-100"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{step}</span>
          </div>
        ))}
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackOibuzTrialClick(source)}
        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
      >
        <span>Start Free Trial on OIBUZ.in</span>
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </a>

      <p className={`mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>No credit card required &bull; Free self-onboarding</span>
      </p>

      <div className={`mt-3 pt-3 border-t text-center ${dark ? "border-white/10" : "border-blue-200/70"}`}>
        <Link
          to="/products/hrms/resources#setup-tutorial"
          onClick={(e) => {
            const el = document.getElementById("setup-tutorial");
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={`inline-flex items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
            dark ? "text-blue-300 hover:text-white" : "text-[#1a3a6b] hover:text-blue-700"
          }`}
        >
          <PlayCircle className="w-3.5 h-3.5 shrink-0" />
          <span>Watch 4-Min Account Setup Guide (EN / हिंदी)</span>
        </Link>
      </div>
    </div>
  );
}

