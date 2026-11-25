// src/components/OibuzTrialCtaPair.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getOibuzRegisterUrl, trackOibuzTrialClick } from "../utils/oibuzLinks.js";

/**
 * Shared responsive Primary/Secondary CTA pair across all OIBUZ HRMS pages.
 * Primary CTA sends leads directly to self-service workspace onboarding at https://www.oibuz.in/register.
 */
export default function OibuzTrialCtaPair({
  source = "oibuz_cta",
  plan,
  primaryLabel = "Start Free Trial",
  secondaryLabel = "Book a Demo",
  onSecondaryClick,
  secondaryTo,
  secondaryHref,
  align = "left",
  dark = false,
  showHint = false,
  className = "",
}) {
  const registerHref = getOibuzRegisterUrl({ source, plan });

  const secondaryCls = dark
    ? "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl border border-slate-600 hover:border-slate-400 bg-white/5 hover:bg-white/10 text-slate-100 font-bold text-sm sm:text-base transition-all whitespace-nowrap cursor-pointer"
    : "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base transition-all shadow-xs hover:border-blue-300 whitespace-nowrap cursor-pointer";

  return (
    <div className={`${align === "center" ? "flex flex-col items-center" : ""} ${className}`}>
      <div
        className={`flex flex-col sm:flex-row w-full sm:w-auto gap-2.5 sm:gap-3.5 ${
          align === "center" ? "justify-center items-stretch sm:items-center" : "items-stretch sm:items-center"
        }`}
      >
        <a
          href={registerHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackOibuzTrialClick(source, plan)}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap"
        >
          <span>{primaryLabel}</span>
          <ArrowUpRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
        </a>

        {onSecondaryClick && (
          <button type="button" onClick={onSecondaryClick} className={secondaryCls}>
            <span>{secondaryLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.2]" />
          </button>
        )}

        {!onSecondaryClick && secondaryTo && (
          <Link to={secondaryTo} className={secondaryCls}>
            <span>{secondaryLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.2]" />
          </Link>
        )}

        {!onSecondaryClick && !secondaryTo && secondaryHref && (
          <a href={secondaryHref} className={secondaryCls}>
            <span>{secondaryLabel}</span>
            <ArrowRight className="w-4 h-4 shrink-0 stroke-[2.2]" />
          </a>
        )}
      </div>

      {showHint && (
        <div
          className={`mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold ${
            dark ? "text-slate-400" : "text-slate-500"
          } ${align === "center" ? "justify-center" : ""}`}
        >
          <span className={`inline-flex items-center gap-1 ${dark ? "text-emerald-400" : "text-emerald-700"}`}>
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Self-setup in 2 mins
          </span>
          <span className={dark ? "text-slate-600" : "text-slate-300"}>•</span>
          <span>No credit card required</span>
        </div>
      )}
    </div>
  );
}

