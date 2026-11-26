import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import {
  Printer,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";
import { getOibuzRegisterUrl, trackOibuzTrialClick } from "../utils/oibuzLinks.js";

const WA_NUMBER = "917020708747";

export default function ConstructionLeakageCalculator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);

  const [activeSites, setActiveSites] = useState(3);
  const [workersPerSite, setWorkersPerSite] = useState(45);
  const [avgDailyWage, setAvgDailyWage] = useState(550);
  const [workingDays, setWorkingDays] = useState(26);

  const calculations = useMemo(() => {
    const totalWorkers = activeSites * workersPerSite;
    const monthlyPayroll = totalWorkers * avgDailyWage * workingDays;
    const ghostLaborLoss = Math.round(monthlyPayroll * 0.075);
    const lateArrivalLoss = Math.round(monthlyPayroll * 0.045);
    const pettyCashSlipLoss = activeSites * 8500;
    const totalMonthlyLeakage = ghostLaborLoss + lateArrivalLoss + pettyCashSlipLoss;
    const annualLeakage = totalMonthlyLeakage * 12;
    const annualSavings = Math.round(annualLeakage * 0.85);

    return {
      totalWorkers,
      monthlyPayroll,
      ghostLaborLoss,
      lateArrivalLoss,
      pettyCashSlipLoss,
      totalMonthlyLeakage,
      annualLeakage,
      annualSavings,
      ghostPct: Math.round((ghostLaborLoss / totalMonthlyLeakage) * 100) || 0,
      latePct: Math.round((lateArrivalLoss / totalMonthlyLeakage) * 100) || 0,
      pettyPct: Math.max(1, 100 - (Math.round((ghostLaborLoss / totalMonthlyLeakage) * 100) || 0) - (Math.round((lateArrivalLoss / totalMonthlyLeakage) * 100) || 0)),
    };
  }, [activeSites, workersPerSite, avgDailyWage, workingDays]);

  const handlePrintAudit = () => window.print();

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Construction Site Leakage Audit\n` +
      `Active Sites: ${activeSites} | Deployed Workers: ${calculations.totalWorkers}\n` +
      `Estimated Monthly Leakage: ₹${calculations.totalMonthlyLeakage.toLocaleString("en-IN")}\n` +
      `Projected Annual Recovery: ₹${calculations.annualSavings.toLocaleString("en-IN")}\n\n` +
      `Calculate your site leakage free:\nhttps://www.prajyotinfotech.in/tools/construction-leakage-calculator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleCopySummary = () => {
    const text =
      `Construction Site Leakage Audit\n` +
      `Sites: ${activeSites} | Workers: ${calculations.totalWorkers}\n` +
      `Monthly Leakage: ₹${calculations.totalMonthlyLeakage.toLocaleString("en-IN")}\n` +
      `Annual Recovery Potential: ₹${calculations.annualSavings.toLocaleString("en-IN")}\n` +
      `https://www.prajyotinfotech.in/tools/construction-leakage-calculator`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/construction-leakage-calculator";
  const calcSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Construction Ghost-Labor & Site Cash Leakage Calculator",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Calculate monthly and annual cash leakage from contractor buddy-punching, ghost labor, and paper muster errors across construction sites.",
    creator: { "@type": "Organization", name: "Prajyot Infotech", url: "https://www.prajyotinfotech.in" },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 sm:py-16 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-16 print:bg-white print:text-slate-900">
      <BreadcrumbsLd items={[
        { name: "Home", url: "https://www.prajyotinfotech.in/" },
        { name: "Free Tools", url: pageUrl },
        { name: "Construction Leakage Calculator", url: pageUrl },
      ]} />

      <Seo
        title="Construction Ghost-Labor & Site Cash Leakage Calculator | Prajyot Infotech"
        description="Calculate how much your construction projects lose monthly to manual paper muster errors, buddy punching, and ghost labor. Free interactive ROI calculator."
        keywords="construction labor cost calculator, ghost labor calculator, construction muster app India, site expense tracking"
        path="/tools/construction-leakage-calculator"
        image="/og/og-construction-calc.jpg"
        schema={calcSchema}
      />

      <style>{`
        @media print {
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          body { background: #ffffff !important; color: #0f172a !important; }
          .print-card { background: #ffffff !important; color: #0f172a !important; border: 1px solid #cbd5e1 !important; box-shadow: none !important; }
          .print-card * { color: #0f172a !important; border-color: #e2e8f0 !important; }
        }
      `}</style>

      {/* Mobile Fixed Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 no-print bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div>
            <div className="text-[10px] text-red-400 font-mono uppercase">Monthly Loss</div>
            <div className="text-lg font-black text-white font-mono">₹{calculations.totalMonthlyLeakage.toLocaleString("en-IN")}</div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={handlePrintAudit}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> PDF
            </button>
            <button type="button" onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>Field Operational Risk Audit</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
            Construction Ghost-Labor &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-amber-400">
              Cash Leakage Calculator
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Paper muster rolls, handwritten contractor vouchers, and proxy punching cost Indian builders 5%–12% of labor payroll. Quantify your leakage below.
          </p>
        </div>

        {/* Sliders Panel */}
        <div className="print-card p-5 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl mb-8">
          <h2 className="text-base sm:text-lg font-bold text-white mb-5 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-400 shrink-0" />
            <span>Adjust Active Project Parameters</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-300 font-semibold">Active Construction Sites</span>
                <span className="font-mono text-base font-black text-brand-400">{activeSites} Sites</span>
              </div>
              <input type="range" min="1" max="25" step="1" value={activeSites}
                onChange={(e) => setActiveSites(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500" />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                <span>1 Site</span><span>25 Sites</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-300 font-semibold">Avg Workers / Site</span>
                <span className="font-mono text-base font-black text-brand-400">{workersPerSite} Workers</span>
              </div>
              <input type="range" min="10" max="300" step="5" value={workersPerSite}
                onChange={(e) => setWorkersPerSite(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500" />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                <span>10</span><span>300 Workers</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-300 font-semibold">Blended Daily Wage</span>
                <span className="font-mono text-base font-black text-emerald-400">₹{avgDailyWage} / day</span>
              </div>
              <input type="range" min="350" max="1200" step="25" value={avgDailyWage}
                onChange={(e) => setAvgDailyWage(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                <span>₹350 (Helper)</span><span>₹1,200 (Skilled)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-300 font-semibold">Working Days / Month</span>
                <span className="font-mono text-base font-black text-slate-200">{workingDays} Days</span>
              </div>
              <input type="range" min="20" max="30" step="1" value={workingDays}
                onChange={(e) => setWorkingDays(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
                <span>20 Days</span><span>30 Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Spotlight */}
        <div className="print-card p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-red-950/60 via-slate-900 to-slate-950 border border-red-500/30 shadow-2xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-red-400 mb-3">
            <TrendingDown className="w-4 h-4" />
            <span>Estimated Financial Leakage Summary</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Total Monthly Cash Loss</span>
              <span className="text-3xl sm:text-5xl font-black text-red-400 font-mono">
                ₹{calculations.totalMonthlyLeakage.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-slate-400 block mt-1.5">
                Across {calculations.totalWorkers.toLocaleString("en-IN")} workers · ₹{calculations.monthlyPayroll.toLocaleString("en-IN")} payroll/mo
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
              <span className="text-xs text-emerald-300 uppercase tracking-wider font-bold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Projected Annual Savings (85% Recovery)
              </span>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
                +₹{calculations.annualSavings.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-emerald-200/80 block mt-1">
                Achieved via GPS geofenced digital muster &amp; verified vouchers
              </span>
            </div>
          </div>

          {/* Stacked Proportion Bar */}
          <div className="mb-6">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-800">
              <div style={{ width: `${calculations.ghostPct}%` }} className="bg-red-500" title="Ghost Attendance" />
              <div style={{ width: `${calculations.latePct}%` }} className="bg-amber-500" title="Late Arrivals" />
              <div style={{ width: `${calculations.pettyPct}%` }} className="bg-rose-400" title="Petty Cash Slips" />
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-red-500" />Ghost Labor ({calculations.ghostPct}%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />Time Leakage ({calculations.latePct}%)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-400" />Site Slip Mismatch ({calculations.pettyPct}%)</span>
            </div>
          </div>

          {/* Breakdown Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Ghost &amp; Buddy Punching</span>
              <span className="text-lg font-bold text-slate-100 font-mono">₹{calculations.ghostLaborLoss.toLocaleString("en-IN")}/mo</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Late Entry / Early Exits</span>
              <span className="text-lg font-bold text-slate-100 font-mono">₹{calculations.lateArrivalLoss.toLocaleString("en-IN")}/mo</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-[11px] text-slate-400 block">Unverified Cash Vouchers</span>
              <span className="text-lg font-bold text-slate-100 font-mono">₹{calculations.pettyCashSlipLoss.toLocaleString("en-IN")}/mo</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <div className="text-xs text-slate-400">Export or share this leakage audit with partners &amp; site heads:</div>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={handleShareWhatsApp}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer min-h-[44px]">
                <Share2 className="w-3.5 h-3.5" /> Share on WhatsApp
              </button>
              <button type="button" onClick={handlePrintAudit}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]">
                <Printer className="w-3.5 h-3.5" /> Print / PDF
              </button>
              <button type="button" onClick={handleCopySummary}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Solution CTA */}
        <div className="no-print p-6 sm:p-10 rounded-3xl bg-slate-900 border border-brand-500/40 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Stop Site Cash Leakages with OIBUZ Construction Workforce OS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-7 leading-relaxed">
            Eliminate buddy punching and ghost workers using GPS geofenced selfie check-ins, supervisor crew punching, and mobile site expense ledgers — live in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <a
              href={getOibuzRegisterUrl({ source: "leakage_calculator_cta" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOibuzTrialClick("leakage_calculator_cta")}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all min-h-[48px]"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/oibuz"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all min-h-[48px]"
            >
              <span>Explore OIBUZ Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button type="button" onClick={() => openLeadModal({ projectType: "Oibuz Construction Attendance & Site Leakage App" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer min-h-[48px]">
              <span>Book 15-Minute Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi Prajyot Infotech, we calculated our construction leakage at ₹${calculations.totalMonthlyLeakage.toLocaleString("en-IN")}/mo and want a demo of OIBUZ.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>

      <ToolSeoFaq
        dark
        heading="Construction Labor Audit & Leakage FAQs"
        faqs={[
          { q: "How much payroll loss comes from manual paper muster rolls?", a: "Field audits across Indian infrastructure and builder sites typically reveal 5% to 12% monthly leakage caused by ghost entries, proxy attendance, late arrivals, and unverified cash slips." },
          { q: "Can contractors track attendance across multiple active sites simultaneously?", a: "Yes. GPS-geofenced mobile attendance ensures supervisors and site workers can only check in within verified site coordinates." },
        ]}
      />
    </div>
  );
}
