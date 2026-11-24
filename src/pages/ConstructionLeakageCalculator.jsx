import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  Building2,
  Printer,
  Share2,
  Copy,
  Check,
  Download,
  Users,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WA_NUMBER = "917020708747";

export default function ConstructionLeakageCalculator() {
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);

  const [activeSites, setActiveSites] = useState(3);
  const [workersPerSite, setWorkersPerSite] = useState(45);
  const [avgDailyWage, setAvgDailyWage] = useState(550);
  const [workingDays, setWorkingDays] = useState(26);

  const calculations = useMemo(() => {
    const totalWorkers = activeSites * workersPerSite;
    const monthlyPayroll = totalWorkers * avgDailyWage * workingDays;

    // Industry benchmarks for manual paper muster & contractor billing:
    // 1. Ghost Labor / Buddy Punching: ~6% - 10% attendance inflation
    const ghostLaborLoss = Math.round(monthlyPayroll * 0.075);

    // 2. Late arrivals / unrecorded early departure (avg 25 mins/worker/day): ~4.5% payroll loss
    const lateArrivalLoss = Math.round(monthlyPayroll * 0.045);

    // 3. Petty cash site slip mismatch / unverified material requisitions: ~₹8,500/site/month
    const pettyCashSlipLoss = activeSites * 8500;

    const totalMonthlyLeakage = ghostLaborLoss + lateArrivalLoss + pettyCashSlipLoss;
    const annualLeakage = totalMonthlyLeakage * 12;

    // OIBUZ estimated recovery rate: 85%
    const oibuzAnnualSavings = Math.round(annualLeakage * 0.85);

    return {
      totalWorkers,
      monthlyPayroll,
      ghostLaborLoss,
      lateArrivalLoss,
      pettyCashSlipLoss,
      totalMonthlyLeakage,
      annualLeakage,
      oibuzAnnualSavings,
    };
  }, [activeSites, workersPerSite, avgDailyWage, workingDays]);

  
  const handlePrintAudit = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Construction Site Leakage Audit - Prajyot Infotech\n` +
      `----------------------------------------------\n` +
      `Active Sites: ${activeSites} | Deployed Workers: ${calculations.totalWorkers}\n` +
      `Estimated Monthly Cash Leakage: ₹${calculations.totalMonthlyLeakage.toLocaleString("en-IN")}\n` +
      `Potential Annual OIBUZ Recovery: ₹${calculations.oibuzAnnualSavings.toLocaleString("en-IN")}\n\n` +
      `Calculate your project leakage free:\nhttps://www.prajyotinfotech.in/tools/construction-leakage-calculator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleCopySummary = () => {
    const text =
      `Construction Site Leakage Audit\n` +
      `Sites: ${activeSites} | Workers: ${calculations.totalWorkers}\n` +
      `Monthly Leakage: ₹${calculations.totalMonthlyLeakage.toLocaleString("en-IN")}\n` +
      `Projected Annual Recovery: ₹${calculations.oibuzAnnualSavings.toLocaleString("en-IN")}\n` +
      `https://www.prajyotinfotech.in/tools/construction-leakage-calculator`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/construction-leakage-calculator";

  const calcSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Construction Ghost-Labor & Site Cash Leakage Calculator",
    "url": pageUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "description": "Calculate monthly and annual financial loss from contractor buddy-punching, ghost labor, and paper muster errors across construction sites in India.",
    "creator": {
      "@type": "Organization",
      "name": "Prajyot Infotech",
      "url": "https://www.prajyotinfotech.in"
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "OIBUZ HRMS", url: "https://www.prajyotinfotech.in/products/hrms" },
          { name: "Construction Leakage Calculator", url: pageUrl }
        ]}
      />

      <Seo
        title="Construction Ghost-Labor & Site Leakage Calculator | OIBUZ HRMS"
        description="Calculate how much money your construction projects lose each month to manual paper muster errors, buddy punching, and ghost labor. See your projected OIBUZ savings."
        keywords="construction labor cost calculator, ghost labor calculator, construction muster app India, OIBUZ HRMS, site expense tracking"
        path="/tools/construction-leakage-calculator"
        schema={calcSchema}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Field Operational Risk Audit
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            Construction Ghost-Labor &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-amber-400">
              Cash Leakage Calculator
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Paper muster rolls, handwritten contractor vouchers, and unverified site supervisor slips cost Indian builders 5%–12% of total labor payroll. See your projected financial leakage below.
          </p>
        </div>

        {/* Interactive Controls Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-10">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-400" />
            Adjust Your Active Project Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Control 1: Active Sites */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-semibold">Active Construction Sites:</span>
                <span className="font-mono text-base font-black text-brand-400">{activeSites} Sites</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={activeSites}
                onChange={(e) => setActiveSites(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>1 Site</span>
                <span>25 Sites</span>
              </div>
            </div>

            {/* Control 2: Workers Per Site */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-semibold">Avg Daily Workforce / Site:</span>
                <span className="font-mono text-base font-black text-brand-400">{workersPerSite} Workers</span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="5"
                value={workersPerSite}
                onChange={(e) => setWorkersPerSite(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>10</span>
                <span>300 Workers</span>
              </div>
            </div>

            {/* Control 3: Daily Wage */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-semibold">Average Blended Daily Wage (₹):</span>
                <span className="font-mono text-base font-black text-emerald-400">₹{avgDailyWage} / day</span>
              </div>
              <input
                type="range"
                min="350"
                max="1200"
                step="25"
                value={avgDailyWage}
                onChange={(e) => setAvgDailyWage(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>₹350 (Helper)</span>
                <span>₹1,200 (Mason/Fitter)</span>
              </div>
            </div>

            {/* Control 4: Working Days */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-semibold">Working Days Per Month:</span>
                <span className="font-mono text-base font-black text-slate-200">{workingDays} Days</span>
              </div>
              <input
                type="range"
                min="20"
                max="30"
                step="1"
                value={workingDays}
                onChange={(e) => setWorkingDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
                <span>20 Days</span>
                <span>30 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Spotlight Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-red-950/60 via-slate-900 to-slate-950 border border-red-500/30 shadow-2xl mb-10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-2">
            <TrendingDown className="w-4 h-4" />
            Estimated Project Financial Leakage
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">
                Total Monthly Leakage
              </span>
              <span className="text-4xl sm:text-5xl font-black text-red-400 font-mono">
                ₹{calculations.totalMonthlyLeakage.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-400 block mt-1">
                Across {calculations.totalWorkers} total laborers deployed
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
              <span className="text-xs text-emerald-300 uppercase tracking-wider font-bold block mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Projected Annual OIBUZ Savings
              </span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                +₹{calculations.oibuzAnnualSavings.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-emerald-200/80 block mt-1">
                Recovered through GPS Geofenced mobile muster rolls
              </span>
            </div>
          </div>


          {/* Viral Share & Print Toolbar */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 no-print">
            <div className="text-xs text-slate-400">
              Need to present this leakage breakdown to your management or partners?
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share on WhatsApp
              </button>
              <button
                onClick={handlePrintAudit}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Export PDF Report
              </button>
              <button
                onClick={handleCopySummary}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Ghost Attendance & Buddy Punching</span>
              <span className="text-lg font-bold text-slate-200 font-mono">
                ₹{calculations.ghostLaborLoss.toLocaleString("en-IN")}/mo
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Unrecorded Late Arrivals / Early Exits</span>
              <span className="text-lg font-bold text-slate-200 font-mono">
                ₹{calculations.lateArrivalLoss.toLocaleString("en-IN")}/mo
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Unverified Material & Petty Cash Slips</span>
              <span className="text-lg font-bold text-slate-200 font-mono">
                ₹{calculations.pettyCashSlipLoss.toLocaleString("en-IN")}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Solution Pitch & Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-brand-500/40 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Stop Contractor Cash Leakages with OIBUZ HRMS
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            OIBUZ eliminates buddy punching with GPS geofencing, facial recognition attendance, and daily material consumption tracking directly on site supervisors' smartphones.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openLeadModal({ projectType: "Oibuz Construction HRMS - Calculator Inquiry" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              Book 15-Minute Live Site Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Prajyot Infotech, I calculated our construction leakage at ₹${calculations.totalMonthlyLeakage.toLocaleString("en-IN")}/mo and want to see how OIBUZ stops this.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

