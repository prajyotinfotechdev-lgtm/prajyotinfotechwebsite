import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ArrowRight, ShieldCheck, Clock, TrendingUp, Sparkles } from "lucide-react";

export default function ROICalculator() {
  const [currency, setCurrency] = useState("INR"); // 'INR' | 'USD'
  const [hoursPerWeek, setHoursPerWeek] = useState(18);
  const [hourlyValue, setHourlyValue] = useState(currency === "INR" ? 600 : 35);

  const handleCurrencyChange = (newCur) => {
    setCurrency(newCur);
    setHourlyValue(newCur === "INR" ? 600 : 35);
  };

  // Calculations
  const hoursPerMonth = hoursPerWeek * 4.2;
  const costPerMonth = hoursPerMonth * hourlyValue;
  const costPerYear = costPerMonth * 12;

  // Assuming enterprise workflow automation saves 80% of repetitive manual effort
  const timeSavedPerMonth = Math.round(hoursPerMonth * 0.8);
  const moneySavedPerYear = Math.round(costPerYear * 0.8);

  const symbol = currency === "INR" ? "₹" : "$";
  const formattedSaved = currency === "INR" 
    ? `₹${moneySavedPerYear.toLocaleString("en-IN")}`
    : `$${moneySavedPerYear.toLocaleString("en-US")}`;

  // Estimate payback: average build cost / monthly savings
  const avgBuildCost = currency === "INR" ? 75000 : 1500;
  const monthlySavings = moneySavedPerYear / 12;
  const paybackMonths = Math.max(1.2, (avgBuildCost / (monthlySavings || 1))).toFixed(1);

  return (
    <section className="py-20 md:py-28 bg-[#090e1a] text-slate-100 relative overflow-hidden" aria-label="Interactive Automation ROI Calculator">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-300 backdrop-blur-md mb-4 shadow-inner">
            <Calculator className="w-3.5 h-3.5 text-brand-400" />
            FINANCIAL IMPACT ANALYSIS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Calculate Your Engineering &amp;{" "}
            <span className="bg-gradient-to-r from-brand-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Automation ROI
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Quantify the exact operational capital and team hours your company reclaims every year by replacing fragmented manual workflows with bespoke software.
          </p>

          {/* Currency Toggle */}
          <div className="mt-6 inline-flex items-center rounded-xl bg-slate-900/90 border border-slate-800 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => handleCurrencyChange("INR")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === "INR"
                  ? "bg-brand-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              INR (₹)
            </button>
            <button
              type="button"
              onClick={() => handleCurrencyChange("USD")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currency === "USD"
                  ? "bg-brand-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Interactive Calculator Body */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-stretch bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl">
          
          {/* Sliders Column */}
          <div className="space-y-6 sm:space-y-8 flex flex-col justify-center">
            {/* Slider 1: Hours */}
            <div className="bg-slate-950/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-800/60">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2.5 sm:mb-3">
                <label className="text-white font-bold text-xs sm:text-base">
                  Manual Team Hours Spent Weekly
                </label>
                <span className="text-xl sm:text-2xl font-mono font-black text-brand-400">
                  {hoursPerWeek} hrs/wk
                </span>
              </div>
              <p className="text-slate-400 text-xs mb-3 sm:mb-4 leading-relaxed">
                Spreadsheet reconciliation, manual invoices, WhatsApp follow-ups, and repetitive data entry.
              </p>
              <input 
                type="range" 
                min="2" 
                max="60" 
                value={hoursPerWeek} 
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-3 sm:h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>2 hrs (Light)</span>
                <span>30 hrs (Moderate)</span>
                <span>60 hrs (Heavy)</span>
              </div>
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="bg-slate-950/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-800/60">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2.5 sm:mb-3">
                <label className="text-white font-bold text-xs sm:text-base">
                  Effective Hourly Team Cost
                </label>
                <span className="text-xl sm:text-2xl font-mono font-black text-cyan-400">
                  {symbol}{hourlyValue}/hr
                </span>
              </div>
              <p className="text-slate-400 text-xs mb-3 sm:mb-4 leading-relaxed">
                Average compensation or value of time for managers and operational staff.
              </p>
              <input 
                type="range" 
                min={currency === "INR" ? 200 : 15} 
                max={currency === "INR" ? 3000 : 150} 
                step={currency === "INR" ? 50 : 5}
                value={hourlyValue} 
                onChange={(e) => setHourlyValue(Number(e.target.value))}
                className="w-full h-3 sm:h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                <span>{symbol}{currency === "INR" ? "200" : "15"}</span>
                <span>{symbol}{currency === "INR" ? "1,500" : "75"}</span>
                <span>{symbol}{currency === "INR" ? "3,000" : "150"}</span>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-slate-700/80 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 mb-4 sm:mb-6">
                <span className="text-[11px] sm:text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 shrink-0" />
                  PROJECTED VALUE RECOVERY
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-slate-400">80% Efficiency</span>
              </div>

              {/* Annual Savings */}
              <div className="mb-4 sm:mb-6">
                <div className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  Annual Capital Reclaimed
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-emerald-400 tracking-tight">
                  {formattedSaved}
                </div>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Direct payroll and lost-productivity savings captured back into your profit margins.
                </p>
              </div>

              {/* Time Saved & Payback */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800">
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Hours Saved / Mo</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    ~{timeSavedPerMonth} hrs
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    ≈ {(timeSavedPerMonth / 8).toFixed(1)} full work days/mo
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Estimated Payback</div>
                  <div className="text-2xl font-mono font-bold text-cyan-300 mt-1">
                    ~{paybackMonths} Months
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    100% ROI after {paybackMonths} mo
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 space-y-3">
              <a
                href={`https://wa.me/917020708747?text=${encodeURIComponent(`Hi Prajyot Infotech, based on your ROI calculator, our company is losing ~${formattedSaved}/year in manual ops. We want to discuss custom software automation.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-brand-600 text-white font-bold text-xs sm:text-sm hover:brightness-110 transition shadow-lg shadow-emerald-900/30 cursor-pointer"
              >
                <span>Automate With Prajyot Infotech</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="text-center">
                <a
                  href="/estimate"
                  className="text-xs text-slate-400 hover:text-white transition inline-flex items-center gap-1"
                >
                  Or configure scope in Project Estimator →
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
