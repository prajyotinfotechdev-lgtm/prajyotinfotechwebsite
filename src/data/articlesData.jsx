import React, { useState, useMemo } from "react";
import {
  Smartphone,
  Laptop,
  Monitor,
  Gauge,
  Zap,
  Bot,
  Server,
  Send,
  TrendingUp,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Users,
  Clock,
  Layers,
  Sparkles
} from "lucide-react";

/* ─── 1. INTERACTIVE DIAGRAM: API PACKET FLOW ─── */
export const ApiInteractiveDiagram = () => {
  const [step, setStep] = useState(0);

  const simulateApiCall = () => {
    setStep(1);
    setTimeout(() => setStep(2), 900);
    setTimeout(() => setStep(3), 1800);
    setTimeout(() => setStep(4), 2700);
    setTimeout(() => setStep(5), 3600);
    setTimeout(() => setStep(0), 6500);
  };

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-white shadow-2xl relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="ml-2 text-xs font-mono text-slate-400">Live API Request Simulator v2.4</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Endpoint:</span>
          <span className="text-brand-400 bg-brand-950/60 px-2 py-1 rounded border border-brand-800/60">
            https://api.prajyotinfotech.in/v1/orders
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative py-4">
        <div className={`flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 ${
          step === 0 || step === 5 
            ? "bg-slate-900 border-brand-500 shadow-lg shadow-brand-500/20" 
            : "bg-slate-900/50 border-slate-800"
        }`}>
          <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm text-slate-100">Frontend Client</span>
          <span className="text-xs text-slate-400 mt-1 font-mono">React / Mobile App</span>
          <span className="mt-3 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
            {step === 1 ? "Dispatching HTTP Payload" : step === 5 ? "Status: 200 OK (Rendered)" : "Awaiting User Input"}
          </span>
        </div>

        <div className={`flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 ${
          step === 2 || step === 4 
            ? "bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/20" 
            : "bg-slate-900/50 border-slate-800"
        }`}>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-3">
            <Zap className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm text-slate-100">API Gateway & Auth</span>
          <span className="text-xs text-slate-400 mt-1 font-mono">JWT Validation & Rate Limit</span>
          <span className="mt-3 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
            {step === 2 ? "Validating JWT Token..." : step === 4 ? "Serializing JSON Body" : "Idle Gateway"}
          </span>
        </div>

        <div className={`flex flex-col items-center p-5 rounded-2xl border transition-all duration-300 ${
          step === 3 
            ? "bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/30 scale-105" 
            : "bg-slate-900/50 border-slate-800"
        }`}>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3">
            <Server className="w-6 h-6" />
          </div>
          <span className="font-bold text-sm text-slate-100">Database Engine</span>
          <span className="text-xs text-slate-400 mt-1 font-mono">Supabase / PostgreSQL</span>
          <span className="mt-3 px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
            {step === 3 ? "Executing ACID Query (12ms)" : "Listening Pool"}
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Response Payload:</span>
          <span className="font-mono text-xs text-emerald-400">
            {step === 5 ? '{"status": 200, "message": "Order confirmed", "latency": "38ms"}' : 'Waiting for trigger...'}
          </span>
        </div>
        <button
          onClick={simulateApiCall}
          disabled={step !== 0 && step !== 5}
          className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          {step === 0 || step === 5 ? "Fire API Request" : "Processing Pipeline..."}
        </button>
      </div>
    </div>
  );
};

/* ─── 2. INTERACTIVE DIAGRAM: CORE WEB VITALS & REVENUE ENGINE ─── */
export const SpeedInteractiveDiagram = () => {
  const [loadTime, setLoadTime] = useState(0.8);

  const stats = useMemo(() => {
    const score = Math.max(20, Math.min(100, Math.round(100 - (loadTime - 0.4) * 22)));
    const bounceRate = Math.min(75, Math.max(9, Math.round(12 + loadTime * 14)));
    const convChange = ((1 / Math.max(0.4, loadTime)) * 100 - 33).toFixed(0);
    const googleRank = score >= 90 ? "Rank #1 (Featured Snippet)" : score >= 75 ? "Rank #3 - #5" : "Page 2+ (Buried)";
    return { score, bounceRate, convChange, googleRank };
  }, [loadTime]);

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-sm text-slate-200">Interactive Lighthouse & Revenue Impact Engine</span>
        </div>
        <span className="text-xs font-mono text-slate-400">Google Core Web Vitals Audit</span>
      </div>

      <div className="mb-8 p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <label className="text-xs md:text-sm font-semibold text-slate-300">
            Simulate Website Page Load Time (LCP):
          </label>
          <span className="font-mono text-lg md:text-xl font-black text-brand-400">
            {loadTime.toFixed(1)} seconds
          </span>
        </div>
        <input
          type="range"
          min="0.4"
          max="4.0"
          step="0.1"
          value={loadTime}
          onChange={(e) => setLoadTime(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
        />
        <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-2">
          <span className="text-emerald-400 font-bold">0.4s (Prajyot Turbo Stack)</span>
          <span className="text-yellow-400">1.8s (Average Web)</span>
          <span className="text-red-400 font-bold">4.0s (Slow WordPress / Heavy)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Google Score</span>
          <span className={`text-3xl md:text-4xl font-black font-mono ${
            stats.score >= 90 ? "text-emerald-400" : stats.score >= 70 ? "text-yellow-400" : "text-red-400"
          }`}>
            {stats.score}/100
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Lighthouse Performance</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Bounce Rate</span>
          <span className={`text-3xl md:text-4xl font-black font-mono ${
            stats.bounceRate <= 20 ? "text-emerald-400" : stats.bounceRate <= 40 ? "text-yellow-400" : "text-red-400"
          }`}>
            {stats.bounceRate}%
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Users leaving immediately</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Conversion Delta</span>
          <span className={`text-3xl md:text-4xl font-black font-mono ${
            stats.convChange > 0 ? "text-emerald-400" : "text-slate-400"
          }`}>
            +{stats.convChange}%
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Sales multiplier</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Projected Rank</span>
          <span className="text-base md:text-lg font-bold text-slate-100 block mt-1">
            {stats.googleRank}
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Organic Search position</span>
        </div>
      </div>
    </div>
  );
};

/* ─── 3. INTERACTIVE DIAGRAM: AI WHATSAPP AUTOMATION ROI CALCULATOR ─── */
export const AiAutomationSimulator = () => {
  const [leads, setLeads] = useState(300);
  const [dealValue, setDealValue] = useState(15000);

  const calculations = useMemo(() => {
    const manualConv = Math.round(leads * 0.12);
    const manualRev = manualConv * dealValue;
    const aiConv = Math.round(leads * 0.38);
    const aiRev = aiConv * dealValue;
    const extraRevenue = aiRev - manualRev;
    const hoursSaved = Math.round((leads * 12) / 60);
    return { manualConv, manualRev, aiConv, aiRev, extraRevenue, hoursSaved };
  }, [leads, dealValue]);

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-white shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-brand-400" />
          <span className="font-bold text-sm text-slate-200">Interactive AI WhatsApp & CRM Revenue Calculator</span>
        </div>
        <span className="text-xs font-mono text-brand-300 bg-brand-950/60 px-2 py-1 rounded border border-brand-800/40">
          Response Latency: 3 Seconds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-semibold">Monthly Inbound Inquiries:</span>
            <span className="font-mono text-base font-bold text-brand-400">{leads} inquiries</span>
          </div>
          <input
            type="range"
            min="50"
            max="1500"
            step="50"
            value={leads}
            onChange={(e) => setLeads(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-semibold">Average Deal Size (₹):</span>
            <span className="font-mono text-base font-bold text-emerald-400">₹{dealValue.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="2000"
            max="100000"
            step="2000"
            value={dealValue}
            onChange={(e) => setDealValue(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-red-500/20">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Legacy Manual Staff</span>
            <span className="text-xs text-slate-400">Avg response: 3.5 hrs</span>
          </div>
          <div className="text-2xl font-black text-slate-200">
            ₹{calculations.manualRev.toLocaleString("en-IN")}
          </div>
          <span className="text-xs text-slate-400 block mt-1">
            Converts ~{calculations.manualConv} clients ({((calculations.manualConv / leads) * 100).toFixed(0)}% close rate)
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-950/40 via-slate-900 to-emerald-950/30 border border-emerald-500/40 shadow-xl shadow-emerald-500/10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Prajyot AI Assistant</span>
            <span className="text-xs text-emerald-300 font-bold">Instant (3 secs)</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{calculations.aiRev.toLocaleString("en-IN")}
          </div>
          <span className="text-xs text-slate-300 block mt-1">
            Converts ~{calculations.aiConv} clients ({((calculations.aiConv / leads) * 100).toFixed(0)}% close rate)
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold text-emerald-200">
            Projected Added Revenue: <strong className="text-emerald-400 font-mono text-base">+₹{calculations.extraRevenue.toLocaleString("en-IN")} / month</strong>
          </span>
        </div>
        <span className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
          +{calculations.hoursSaved} Employee Hours Saved
        </span>
      </div>
    </div>
  );
};

/* ─── 4. INTERACTIVE DIAGRAM: RESPONSIVE VIEWPORT ENGINE ─── */
export const ResponsiveInteractiveDiagram = () => {
  const [device, setDevice] = useState("desktop");

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-white shadow-2xl text-center relative">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => setDevice("mobile")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            device === "mobile"
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
          }`}
        >
          <Smartphone className="w-4 h-4" /> Mobile (iPhone 16)
        </button>
        <button
          onClick={() => setDevice("tablet")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            device === "tablet"
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
          }`}
        >
          <Laptop className="w-4 h-4" /> Tablet (iPad Pro)
        </button>
        <button
          onClick={() => setDevice("desktop")}
          className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
            device === "desktop"
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/30"
              : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-white"
          }`}
        >
          <Monitor className="w-4 h-4" /> Desktop (4K Monitor)
        </button>
      </div>

      <div className="flex justify-center items-center h-80 bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800 p-4">
        <div
          style={{
            width: device === "mobile" ? "220px" : device === "tablet" ? "420px" : "640px",
            height: device === "mobile" ? "260px" : device === "tablet" ? "250px" : "240px",
            transition: "all 0.3s ease",
          }}
          className="bg-slate-950 border-2 border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        >
          <div className="bg-slate-900 h-7 flex items-center px-3 border-b border-slate-800 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <div className="ml-auto w-24 h-2.5 bg-slate-800 rounded-full font-mono text-[9px] text-slate-500 text-center flex items-center justify-center">
              prajyotinfotech.in
            </div>
          </div>

          <div className="p-3 flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="h-10 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-lg flex items-center px-3 justify-between">
              <span className="text-[10px] font-bold text-white">Prajyot Infotech</span>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded text-white font-mono">Book Call</span>
            </div>

            <div
              className={`grid gap-2 my-2 ${
                device === "mobile" ? "grid-cols-1" : device === "tablet" ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-left">
                <span className="w-2 h-2 rounded-full bg-brand-400 block mb-1" />
                <span className="text-[10px] font-bold block text-slate-200">Custom Web</span>
                <span className="text-[8px] text-slate-400">99 Lighthouse Score</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-left">
                <span className="w-2 h-2 rounded-full bg-indigo-400 block mb-1" />
                <span className="text-[10px] font-bold block text-slate-200">Mobile Apps</span>
                <span className="text-[8px] text-slate-400">iOS & Android</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-2 text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-400 block mb-1" />
                <span className="text-[10px] font-bold block text-slate-200">AI Agents</span>
                <span className="text-[8px] text-slate-400">WhatsApp Automation</span>
              </div>
            </div>

            <div className="text-[9px] text-slate-500 font-mono">
              Adaptive CSS Flexbox & Container Queries
            </div>
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-4">
        Fluid grid rearrangement ensures zero horizontal scrolling, high tap target accuracy, and seamless conversion across every device.
      </p>
    </div>
  );
};


/* ─── 4B. INTERACTIVE: ERP VS SPREADSHEETS ROI CALCULATOR ─── */
export const ErpRoiInteractiveCalculator = () => {
  const [teamSize, setTeamSize] = useState(25);
  const [hoursWasted, setHoursWasted] = useState(6);
  const [avgSalary, setAvgSalary] = useState(25000);

  const calc = useMemo(() => {
    const hourlyRate = Math.round(avgSalary / 176);
    const monthlyWastedHours = teamSize * (hoursWasted * 4);
    const monthlyLoss = monthlyWastedHours * hourlyRate;
    const annualLoss = monthlyLoss * 12;
    const erpCost = teamSize <= 20 ? 180000 : teamSize <= 60 ? 320000 : 550000;
    const monthlyRecovered = Math.round(monthlyLoss * 0.70);
    const paybackMonths = Math.max(1.2, (erpCost / (monthlyRecovered || 1))).toFixed(1);
    const threeYearGain = Math.round(monthlyRecovered * 36 - erpCost);
    return { hourlyRate, monthlyLoss, annualLoss, erpCost, paybackMonths, threeYearGain, monthlyWastedHours };
  }, [teamSize, hoursWasted, avgSalary]);

  const waMsg = encodeURIComponent(
    `Hi Prajyot Infotech, we have a team of ${teamSize} staff and estimate ${hoursWasted} hrs/week wasted on manual spreadsheets. Our projected annual loss is ₹${calc.annualLoss.toLocaleString("en-IN")}. We'd like to discuss a custom ERP solution.`
  );

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm text-slate-200">Interactive ERP vs Spreadsheet ROI Calculator</span>
        </div>
        <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-800/40">
          Indian SMB Benchmark Model
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-semibold">Team Size (Staff):</span>
            <span className="font-mono text-base font-bold text-brand-400">{teamSize} people</span>
          </div>
          <input
            type="range"
            min="5"
            max="150"
            step="5"
            value={teamSize}
            onChange={(e) => setTeamSize(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Staff relying on spreadsheets/WhatsApp</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-semibold">Hours Wasted / Person / Wk:</span>
            <span className="font-mono text-base font-bold text-amber-400">{hoursWasted} hrs</span>
          </div>
          <input
            type="range"
            min="2"
            max="16"
            step="1"
            value={hoursWasted}
            onChange={(e) => setHoursWasted(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Data entry, WhatsApp forwards & checks</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-slate-400 font-semibold">Average Salary (₹/Mo):</span>
            <span className="font-mono text-base font-bold text-emerald-400">₹{avgSalary.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min="12000"
            max="70000"
            step="2000"
            value={avgSalary}
            onChange={(e) => setAvgSalary(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Blended operations & admin cost</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/40">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">Monthly Productivity Loss</span>
          <div className="text-2xl md:text-3xl font-black text-rose-300 font-mono">
            ₹{calc.monthlyLoss.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">{calc.monthlyWastedHours} productive hours lost / month</span>
        </div>

        <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-800/40">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">Custom ERP Payback</span>
          <div className="text-2xl md:text-3xl font-black text-amber-300 font-mono">
            {calc.paybackMonths} Months
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Full development cost recovered</span>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-1">3-Year Net Profit Retained</span>
          <div className="text-2xl md:text-3xl font-black text-emerald-300 font-mono">
            +₹{calc.threeYearGain.toLocaleString("en-IN")}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Net of complete ERP investment</span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-slate-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Includes 100% full source code ownership, zero per-user SaaS license fees, and 60-day warranty.</span>
        </div>
        <a
          href={`https://wa.me/917020708747?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <span>Discuss Custom ERP Blueprint</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

/* ─── 4C. INTERACTIVE: SOFTWARE COST ESTIMATOR WIDGET ─── */
export const SoftwareCostEstimatorWidget = () => {
  const [projectType, setProjectType] = useState("website");
  const [selectedFeatures, setSelectedFeatures] = useState(["auth", "whatsapp"]);

  const projectTypes = [
    { id: "website", name: "Business Website", baseMin: 29999, baseMax: 65000, baseWeeks: "2-3" },
    { id: "ecommerce", name: "E-Commerce Platform", baseMin: 75000, baseMax: 160000, baseWeeks: "3-5" },
    { id: "erp", name: "Custom ERP / CRM", baseMin: 180000, baseMax: 420000, baseWeeks: "6-10" },
    { id: "mobile", name: "Mobile App (iOS/Android)", baseMin: 250000, baseMax: 550000, baseWeeks: "8-12" },
  ];

  const featuresList = [
    { id: "auth", name: "User Auth & Roles (RBAC)", cost: 15000 },
    { id: "payment", name: "Payment Gateway (Razorpay/Stripe)", cost: 12000 },
    { id: "whatsapp", name: "Automated WhatsApp API Webhooks", cost: 16000 },
    { id: "admin", name: "Executive Admin Dashboard & Charts", cost: 20000 },
    { id: "offline", name: "Offline-First Sync & Biometric Auth", cost: 28000 },
  ];

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const selectedProj = projectTypes.find((p) => p.id === projectType) || projectTypes[0];

  const addOnTotal = useMemo(() => {
    return selectedFeatures.reduce((acc, featId) => {
      const f = featuresList.find((item) => item.id === featId);
      return acc + (f ? f.cost : 0);
    }, 0);
  }, [selectedFeatures]);

  const minTotal = selectedProj.baseMin + addOnTotal;
  const maxTotal = selectedProj.baseMax + addOnTotal;

  const waMsg = encodeURIComponent(
    `Hi Prajyot Infotech, I used your Software Cost Estimator for a ${selectedProj.name} with ${selectedFeatures.length} extra features. Estimated range is ₹${minTotal.toLocaleString("en-IN")} – ₹${maxTotal.toLocaleString("en-IN")}. Can I get an official milestone proposal?`
  );

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white shadow-2xl relative">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-brand-400" />
          <span className="font-bold text-sm text-slate-200">Interactive Software Cost Estimator (2026 Index)</span>
        </div>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
          Fixed-Price Milestone Model
        </span>
      </div>

      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
          1. Select Project Type:
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {projectTypes.map((pt) => (
            <button
              key={pt.id}
              onClick={() => setProjectType(pt.id)}
              className={`p-3 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer ${
                projectType === pt.id
                  ? "bg-brand-600/30 border-brand-500 text-white shadow-lg shadow-brand-500/20"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              <div className="font-bold">{pt.name}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-1">{pt.baseWeeks} wks</div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
          2. Add Key Architectural Capabilities:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {featuresList.map((feat) => {
            const isChecked = selectedFeatures.includes(feat.id);
            return (
              <button
                key={feat.id}
                onClick={() => toggleFeature(feat.id)}
                className={`p-3 rounded-xl text-left border text-xs flex items-center justify-between transition-all cursor-pointer ${
                  isChecked
                    ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-200"
                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                    isChecked ? "bg-emerald-500 border-emerald-400 text-black font-bold" : "border-slate-700"
                  }`}>
                    {isChecked ? "✓" : ""}
                  </div>
                  <span>{feat.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">+₹{(feat.cost / 1000).toFixed(0)}k</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-950/60 via-slate-900 to-indigo-950/60 border border-brand-500/40 mb-6 flex flex-wrap items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-1">
            Estimated Investment Range ({selectedProj.name})
          </span>
          <div className="text-3xl md:text-4xl font-black text-brand-300 font-mono">
            ₹{minTotal.toLocaleString("en-IN")} – ₹{maxTotal.toLocaleString("en-IN")}
          </div>
          <span className="text-xs text-slate-400 block mt-1">
            Typical Delivery: <strong className="text-white">{selectedProj.baseWeeks} Weeks</strong> · 100% IP & Source Code Transfer
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/917020708747?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer text-center justify-center"
          >
            <span>Lock In Fixed-Price Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <span className="text-[10px] text-slate-400 font-mono text-center">Zero vendor lock-in · 60-day warranty</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Milestone-Based Payments</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>100% Source Code Delivery</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Free 60-Day Bug Warranty</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Mutual NDA on Request</span>
        </div>
      </div>
    </div>
  );
};

/* ─── 5. MASTER ARTICLES DATA ─── */
export const ARTICLES = [

  {
    id: "erp-vs-spreadsheets",
    relatedTool: {"to":"/compare/tally-vs-custom-erp","title":"Compare Tally vs Custom ERP","cta":"Open Comparison Matrix"},
    title: "ERP vs Spreadsheets: Why Indian SMBs Are Switching in 2026",
    category: "ERP & Business",
    difficulty: "Business Decision Guide",
    readTime: "5 min read",
    date: "November 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "If your business still runs on WhatsApp forwards and Excel sheets, you are leaving significant revenue on the table. Here is the real cost comparison between spreadsheets and a custom ERP system.",
    interactiveComponent: <ErpRoiInteractiveCalculator />,
    keyTakeaways: [
      "Manual spreadsheet management costs Indian SMBs an average of 12 hours per employee per week in reconciliation errors.",
      "A custom ERP system pays for itself within 6–9 months through operational efficiency alone.",
      "Modern ERPs built on React and PostgreSQL support real-time multi-user editing, automated GST billing, and mobile dashboards."
    ],
    content: `Running your manufacturing unit, wholesale distribution business, or multi-branch retail store on a tangle of WhatsApp group forwards, Excel sheets, and paper registers is not a cost-saving strategy — it is a systematic revenue leak.

Consider this: Every time a purchase order is manually entered, there is a transcription error rate of 4%. Every time inventory is counted manually, stockout and overstock rates jump by 23%. Every month, finance teams spend 40+ hours manually consolidating branch sales reports that an integrated ERP reconciles in seconds.

At Prajyot Infotech, we have delivered custom ERP systems for manufacturers in Bhosari, wholesale distributors in Latur, and multi-branch retailers in Pune. The consistent ROI pattern is an operational cost reduction of 35–60% within 9 months.

The right ERP is not generic off-the-shelf software. It is a system architected precisely around your specific workflows, supplier relationships, and reporting needs — with full source code ownership so you are never held hostage to per-seat licensing fees.`
  },
  {
    id: "cost-of-custom-software-india",
    relatedTool: {"to":"/tools/app-cost-calculator","title":"2026 Mobile App & Software Cost Calculator","cta":"Calculate Your Budget"},
    title: "How Much Does Custom Software Development Cost in India? (2026 Guide)",
    category: "Pricing & Planning",
    difficulty: "Buyer's Guide",
    readTime: "6 min read",
    date: "November 2026",
    author: "Sanket Kshirsagar",
    authorRole: "Co-Founder & Tech Lead",
    excerpt: "From ₹25,000 landing pages to ₹15 lakh enterprise platforms — a transparent, no-fluff breakdown of what custom software actually costs in India in 2026 and what drives those numbers.",
    interactiveComponent: <SoftwareCostEstimatorWidget />,
    keyTakeaways: [
      "Website development ranges from ₹25,000 to ₹3 lakh depending on complexity and integrations.",
      "Custom ERP/CRM systems cost ₹1.5 lakh to ₹10 lakh and deliver 300–600% ROI within 12 months.",
      "Mobile app development starts from ₹2.5 lakh for a cross-platform React Native build.",
      "Fixed-price milestone contracts eliminate budget surprises — always demand a written scope before signing."
    ],
    content: `One of the most common questions we receive at Prajyot Infotech is: 'How much will my software project cost?' The honest answer is: it depends — but here is the complete transparency you deserve.

The Indian software development market spans an enormous quality and price range. A ₹8,000 freelancer on Fiverr and a ₹20 lakh agency in Bangalore can both claim to build you a 'website'. The difference is engineering quality, security architecture, performance guarantees, and what happens 6 months after launch when you need a new feature.

At Prajyot Infotech, our pricing is structured around delivered value, not hourly rates:

**Business Websites: ₹29,999 – ₹1.5 lakh**
Includes responsive design, SEO optimization, contact form, WhatsApp integration, and hosting setup.

**E-Commerce Stores: ₹75,000 – ₹3.5 lakh**
Includes product catalog, cart, payment gateway (Razorpay/Stripe), order management, and admin panel.

**Custom CRM / ERP: ₹1.5 lakh – ₹10 lakh**
Scope drives price. A basic billing system costs ₹1.5–2 lakh. A full multi-warehouse ERP with mobile apps, GST e-invoicing, and analytics costs ₹5–10 lakh.

**Mobile Apps (React Native): ₹2.5 lakh – ₹8 lakh**
Cross-platform iOS + Android. Price depends on features, offline sync, map integrations, and payment flows.

The key rule: always get a fixed-price written contract with milestone deliverables. Never pay more than 50% upfront.`
  },
  {
    id: "whatsapp-business-api-india",
    relatedTool: {"to":"/tools/whatsapp-link-generator","title":"Free WhatsApp Direct Link & Counter QR Maker","cta":"Create WhatsApp QR Free"},
    title: "WhatsApp Business API for Indian SMBs: Complete Implementation Guide 2026",
    category: "AI & Automation",
    difficulty: "Implementation Guide",
    readTime: "7 min read",
    date: "November 2026",
    author: "Sanket Kshirsagar",
    authorRole: "Co-Founder & Tech Lead",
    excerpt: "India has 530 million active WhatsApp users. Here is exactly how to implement the official WhatsApp Business Cloud API to automate customer support, order confirmations, invoice dispatch, and lead qualification — 24/7, automatically.",
    interactiveComponent: <AiAutomationSimulator />,
    keyTakeaways: [
      "WhatsApp has a 98% open rate vs 22% for email — making it the highest-ROI customer communication channel in India.",
      "Meta's Cloud API (free tier available) enables automated message templates, interactive buttons, and product catalogs.",
      "Integration with your existing CRM or database converts WhatsApp into a full sales and support pipeline.",
      "AI-powered chatbot responses reduce support team workload by 60–80% for common inquiries."
    ],
    content: `India is not just on WhatsApp — India does business on WhatsApp. With 530+ million active users and a 98% daily open rate (vs 22% for email), WhatsApp is the single most effective communication channel for Indian businesses regardless of size or industry.

The WhatsApp Business Cloud API (officially offered by Meta) allows businesses to send and receive messages programmatically, build automated response workflows, and integrate WhatsApp into their CRM, inventory, and billing systems.

Here is what this means in practice for your business:

**Automated Order Confirmations:** When a customer places an order on your website, WhatsApp automatically sends them a branded confirmation with order details and tracking link — in under 3 seconds.

**Invoice Dispatch:** As soon as a bill is generated in your system, the PDF invoice is automatically sent to the customer's WhatsApp. No manual staff intervention required.

**Lead Qualification:** When a potential customer messages your WhatsApp number, an AI-powered bot qualifies them (budget? timeline? service type?) and routes them to the right team member with full context.

**After-Sales Support:** 80% of customer support queries are repetitive (order status, payment receipt, product information). These can be handled automatically 24/7 with zero staffing cost.

At Prajyot Infotech, we implement complete WhatsApp Business API integrations including verified business account setup, webhook infrastructure, message template approval, CRM database sync, and AI-powered response automation.`
  },
  {
    id: "sub-second-page-speed",
    relatedTool: {"to":"/tools/website-tech-checker","title":"Free Website Speed & Core Web Vitals Inspector","cta":"Test Your Website Speed"},
    title: "Why Sub-Second Page Speed is Google's #1 Ranking Factor in 2026",
    category: "Performance & SEO",
    difficulty: "Executive Blueprint",
    readTime: "4 min read",
    date: "September 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "Every 100ms delay in page load drops conversion by 7%. Discover how our engineering team builds sub-second web applications that outrank legacy competitors on Google.",
    interactiveComponent: <SpeedInteractiveDiagram />,
    keyTakeaways: [
      "LCP (Largest Contentful Paint) under 0.8s signals top-tier user satisfaction to Googlebot.",
      "A 1-second reduction in page load increases retail checkout completions by up to 27%.",
      "Switching from heavy WordPress themes to modern React/Vite architecture slashes server payload by 85%."
    ],
    content: `In 2026, Google's search ranking algorithm prioritizes Real-User Experience (CrUX) and Core Web Vitals over keyword stuffing. When a potential customer searches for software or retail services on their phone, they expect the page to render instantly.

If your site takes 3+ seconds to open, more than 53% of mobile visitors abandon your site before reading a single headline. That wasted traffic directly boosts your competitor's rank while triggering Google to downgrade your organic search position.

At Prajyot Infotech, we engineer every application with zero-dependency vanilla styling, optimized edge CDNs, server-side caching, and responsive asset loading to guarantee consistent sub-second load times worldwide.`
  },
  {
    id: "ai-whatsapp-automation",
    relatedTool: {"to":"/tools/whatsapp-link-generator","title":"WhatsApp Direct Chat Link & QR Generator","cta":"Build Link Free"},
    title: "Automating Business Operations with AI & WhatsApp: From Leads to Revenue in 12 Seconds",
    category: "AI & Automation",
    difficulty: "Architecture Deep Dive",
    readTime: "5 min read",
    date: "September 2026",
    author: "Sanket Kshirsagar",
    authorRole: "Co-Founder & Tech Lead",
    excerpt: "90% of customers choose the business that responds first. Learn how connecting LLMs to WhatsApp and Supabase CRM turns cold visitors into paying clients automatically.",
    interactiveComponent: <AiAutomationSimulator />,
    keyTakeaways: [
      "Lead conversion drops by 391% when response times stretch past 5 minutes.",
      "WhatsApp Business Cloud API enables 24/7 automated qualification, quotation generation, and calendar booking.",
      "Direct webhook synchronization into Supabase ensures full lead retention without manual staff entry."
    ],
    content: `Modern consumers don't want to wait 4 hours for an email reply or phone callback. When someone is looking for software development, clinic appointments, or bulk wholesale pricing, they message on WhatsApp and demand immediate answers.

By combining the WhatsApp Cloud API with intelligent LLM classification and a high-performance database like Supabase, your business can qualify prospects, present customized price estimates, and capture contact details in under 12 seconds.

The interactive calculator above reveals the exact mathematical uplift in monthly revenue when human lag is eliminated from your sales pipeline.`
  },
  {
    id: "what-is-an-api",
    title: "Understanding APIs: The Waiters of the Digital Economy",
    category: "APIs & Backend",
    difficulty: "Beginner Friendly",
    readTime: "4 min read",
    date: "August 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "From processing credit cards to syncing WhatsApp notifications, APIs power every modern software system. Here is how they work under the hood.",
    interactiveComponent: <ApiInteractiveDiagram />,
    keyTakeaways: [
      "APIs act as secure messengers that allow different software systems to talk to each other.",
      "REST and GraphQL protocols standardize how data is queried and received.",
      "Modern cloud APIs use JWT tokens and TLS encryption to guarantee end-to-end data security."
    ],
    content: `If you want to build a modern app or automate a business process, you need to understand APIs (Application Programming Interfaces).

Think of an API like a professional waiter in a high-end restaurant. You (the user on a smartphone app) sit at a table and look at the menu (the frontend UI). You tell the waiter what you want to order. The waiter takes your order into the kitchen (the backend database server), verifies the ingredients (auth & validation), and returns with your freshly prepared dish (the JSON data payload).

Without APIs, every single app would have to store its own massive database locally on your phone. Test the interactive simulation above to see how an HTTP request travels across the internet in milliseconds!`
  },
  {
    id: "responsive-design",
    title: "Why Responsive Design is Non-Negotiable in 2026: Mobile-First Architecture",
    category: "UI/UX & Speed",
    difficulty: "Design & UX",
    readTime: "3 min read",
    date: "August 2026",
    author: "Sneha Kalekar",
    authorRole: "Head of Marketing & Operations",
    excerpt: "Over 78% of online purchases in India occur on smartphones. How fluid layouts and container queries turn casual phone browsers into loyal customers.",
    interactiveComponent: <ResponsiveInteractiveDiagram />,
    keyTakeaways: [
      "Google indexes websites strictly via Mobile-First Googlebot indexing.",
      "Responsive design is not merely resizing text; it dynamically adapts navigation, touch targets, and visual hierarchy.",
      "Touch-friendly ergonomics drastically lower checkout friction on small displays."
    ],
    content: `Over 78% of total web traffic in India and emerging markets originates from handheld mobile devices. If your business website was designed exclusively on a desktop monitor without mobile-first fluid mechanics, you are actively burning marketing capital.

True responsiveness adapts intelligently to device width: multi-column grids collapse into fluid vertical stacks, high-resolution imagery automatically resizes to save mobile bandwidth, and touch targets expand so users can easily tap with one thumb.

Use the interactive viewport engine above to toggle between an iPhone, iPad, and 4K desktop display to observe how a production-grade layout responds dynamically.`
  }
,
  {
    id: "website-development-cost-pune-india",
    title: "Website Development Cost in Pune & India (2026–2027 Breakdown)",
    category: "Pricing & Planning",
    difficulty: "Buyer's Guide",
    readTime: "6 min read",
    date: "November 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "Exact price ranges for business websites, React web apps, Razorpay e-commerce stores, and custom SaaS in Pune & India — plus what agencies omit from quotes.",
    relatedTool: {"to":"/estimate","title":"Configure Your Exact Website & Software Quote","desc":"Select pages, Razorpay/WhatsApp integrations, and timeline in 4 fast steps.","cta":"Launch Estimator Free"},
    interactiveComponent: <SoftwareCostEstimatorWidget />,
    keyTakeaways: ["Fast 1–5 page custom corporate websites in Pune start at ₹29,999 with on-page SEO and WhatsApp lead capture.","High-speed Razorpay e-commerce stores range from ₹59,999 to ₹3.5 Lakh depending on catalog & CRM automation.","Always demand 100% source code ownership, sub-second page speed SLA, and zero recurring monthly plugin fees."],
    content: "Searching for website development pricing in Pune or anywhere in India produces wildly confusing quotes ranging from ₹8,000 templates to ₹15 Lakh enterprise agencies.\n\nHere is the transparent breakdown of what business websites actually cost in 2026–2027 based on engineering complexity:\n\n1. Starter Corporate Website (₹29,999 – ₹59,999): Custom responsive layout, Core Web Vitals optimization (<1s load), sitemap + Google schema markup, and direct WhatsApp + database lead forms.\n\n2. Growth & E-Commerce Website (₹59,999 – ₹2,50,000): Dynamic product catalog, Razorpay/Cashfree UPI checkout, automated WhatsApp order confirmations, and lightweight CMS dashboard.\n\n3. Custom SaaS / Web Portal (₹1,50,000+): Multi-role login (Admin/Staff/Customers), automated GST PDF billing, Tally integration, and REST APIs.\n\nAlways verify before signing: Do you own the Git source code repository on Day 1? Slow WordPress sites rebuilt cheaply end up costing double in lost Google Ads conversions."
  },
  {
    id: "razorpay-meta-whatsapp-kyc-checklist",
    title: "Razorpay & Meta WhatsApp Cloud API KYC Checklist for Indian Startups",
    category: "AI & Automation",
    difficulty: "Launch Checklist",
    readTime: "5 min read",
    date: "November 2026",
    author: "Sanket Kshirsagar",
    authorRole: "Co-Founder & Tech Lead",
    excerpt: "Stop getting rejected during Razorpay, PhonePe, or Meta WhatsApp Cloud API onboarding. Follow this verified documentation and website compliance checklist.",
    relatedTool: {"to":"/tools/legal-policy-generator","title":"Generate Razorpay-Ready Privacy, Terms & Refund Pages","desc":"Instant compliance pages ready for gateway KYC verification in 30 seconds.","cta":"Generate Policies Free"},
    interactiveComponent: null,
    keyTakeaways: ["Indian payment gateways mandate 4 visible footer links: Privacy Policy, Terms of Service, Refund/Cancellation (with day timelines), and Shipping Policy.","Your website contact email must match or clearly link to your registered business domain and GST/MSME entity.","Meta WhatsApp API requires matching legal company address on your website footer and GST/Udyam PDF certificate."],
    content: "Most Indian founders build their website or app and then lose 2 to 3 weeks stuck in Razorpay, Cashfree, or Meta Business Manager KYC rejections.\n\nVerification teams follow a strict checklist:\n\n1. Four Live Legal URLs: Your domain must host a Privacy Policy, Terms & Conditions, Refund & Cancellation Policy (stating exact days, e.g. 5–7 business days), and a Shipping/Delivery Policy — accessible without login.\n\n2. Matching Entity Details: Your registered business name, GSTIN (or Udyam certificate), phone number, and support email in your website footer must match the KYC documents submitted.\n\n3. Clear Pricing in INR: Checkout items or service pages must display INR pricing transparently before opening the payment modal.\n\nUse our Free Website Legal Policy Generator linked above to publish all 4 compliant pages in under two minutes."
  },
  {
    id: "barcode-imei-inventory-retail-guide",
    title: "Barcode & Serialized IMEI Inventory Software Guide for Mobile & Electronics Stores",
    category: "Retail & SaaS",
    difficulty: "Operations Guide",
    readTime: "5 min read",
    date: "November 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "How multi-branch electronics retailers cut customer billing queues from 10 minutes to 45 seconds using serialized IMEI scanning and automated WhatsApp GST receipts.",
    relatedTool: {"to":"/tools/gst-invoice-generator","title":"Create Sample Serialized GST Tax Invoices Free","desc":"Test Rule-46 Indian GST tax invoices with HSN 8517 for mobile handsets.","cta":"Open GST Invoice Maker"},
    interactiveComponent: null,
    keyTakeaways: ["Serialized IMEI inventory eliminates missing stock disputes and fake warranty claims completely.","USB barcode scan + thermal/A4 PDF print drops average checkout billing time by 90% during festive rushes.","Automated repair job card alerts on WhatsApp increase repeat accessory and service revenue by over 20%."],
    content: "Handwriting 15-digit IMEI serial numbers onto carbon-copy bill books creates billing queues, GST audit headaches, and silent inventory shrinkage.\n\nA modern serialized retail POS replaces manual registers with three clean steps:\n\n1. Purchase GRN Scan: Scan supplier carton barcodes once when stock arrives; every IMEI enters cloud inventory automatically.\n\n2. 45-Second Checkout: At billing, scan the handset box barcode to pull exact model, color, HSN 8517, 18% GST tax split, and warranty duration automatically.\n\n3. Repair Job Cards & WhatsApp Follow-up: Log customer repair drops and automatically alert them on WhatsApp when devices are ready for pickup."
  },
  {
    id: "restaurant-qr-ordering-kds-roi",
    title: "Restaurant QR Table Menus & Kitchen Display Systems: Eliminate Lost KOTs",
    category: "Retail & SaaS",
    difficulty: "Hospitality Guide",
    readTime: "4 min read",
    date: "November 2026",
    author: "Sneha Kalekar",
    authorRole: "Head of Marketing & Operations",
    excerpt: "Why high-volume dine-in restaurants replace paper KOT slips with live table QR menus synced to Kitchen Display Tablets (KDS) and WhatsApp bills.",
    relatedTool: {"to":"/tools/upi-qr-generator","title":"Create Free Table Counter UPI Payment QR Standees","desc":"Generate scannable GPay/PhonePe QR cards for fast table settlement.","cta":"Create Table QR Free"},
    interactiveComponent: null,
    keyTakeaways: ["QR ordering frees waitstaff during peak weekend hours, boosting table turnover by up to 35%.","Digital Kitchen Display Systems (KDS) eliminate lost or unreadable handwritten KOT slips completely.","Manager stock toggles immediately hide out-of-stock dishes across all table QR menus."],
    content: "During busy weekend dinner service, angry diners don't leave because of food quality — they leave waiting 20 minutes for someone to bring a menu or take a drink add-on order.\n\nWith event-driven QR table ordering and a live Kitchen Display Screen (KDS):\n\n- Guests scan the table QR with their smartphone camera (no app install required) and order starters or extra rotis directly.\n\n- Kitchen screens highlight new KOT tickets within milliseconds in cooking priority order.\n\n- Guests settle bills effortlessly via UPI QR and receive automated GST digital invoices directly on WhatsApp."
  },
  {
    id: "chakan-midc-manufacturing-erp-guide",
    title: "How MIDC Manufacturing Units Eliminate Margin Leakage with Shop-Floor BOM ERP",
    category: "ERP & Business",
    difficulty: "Industrial Architecture",
    readTime: "6 min read",
    date: "November 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "Inside the hybrid architecture powering Chakan & Bhosari auto-ancillary units: real-time plant BOM, GRN verification, and automatic Tally Prime XML voucher sync.",
    relatedTool: {"to":"/tools/purchase-order-generator","title":"Free Purchase Order & Delivery Challan PDF Maker","desc":"Create HSN-ready factory POs and Rule-55 Delivery Challans right away.","cta":"Launch PO / Challan Maker"},
    interactiveComponent: <ErpRoiInteractiveCalculator />,
    keyTakeaways: ["Tally Prime excels at CA compliance and GST returns, but was not designed for multi-stage shop-floor BOM routing or machine downtime tracking.","A hybrid Plant ERP runs daily Purchase Orders, Gate GRN, scrap tracking, and barcode dispatch while auto-syncing ledger journals into Tally.","Zero recurring per-seat SaaS costs allow unlimited supervisors and warehouse operators on mobile tablets."],
    content: "Auto-ancillary and precision engineering factories in Chakan, Bhosari MIDC, Nashik, and Aurangabad frequently run a broken loop of Excel sheets, WhatsApp dispatch photos, and a single overloaded Tally desktop PC.\n\nWhen raw material steel consumption or stage-wise rejection is tracked only at month-end, silent scrap loss and rush raw-material stockouts quietly drain plant profitability.\n\nBy adopting a hybrid Custom Plant ERP:\n\n- Purchase teams issue traceable POs and verify incoming Gate GRNs on tablets.\n\n- Shop-floor operators scan lot barcodes as WIP moves across CNC and fabrication stages.\n\n- Validated sales & purchase invoices sync straight into Tally Prime automatically with zero double entry."
  },
  {
    id: "react-nextjs-vs-wordpress-speed-india",
    title: "React vs WordPress Speed Benchmark on Indian 4G Mobile Networks",
    category: "Performance & SEO",
    difficulty: "Technical Benchmark",
    readTime: "5 min read",
    date: "November 2026",
    author: "Sanket Kshirsagar",
    authorRole: "Co-Founder & Tech Lead",
    excerpt: "Why bloated PHP + Elementor websites drop below 50 Mobile Lighthouse scores on mid-range Indian Android phones — and how custom React apps stay sub-second.",
    relatedTool: {"to":"/tools/website-tech-checker","title":"Website Speed & Core Web Vitals Inspector","desc":"Scan your live site's LCP, TTFB, and tech stack score in seconds.","cta":"Scan Website Free"},
    interactiveComponent: <SpeedInteractiveDiagram />,
    keyTakeaways: ["Mid-range smartphones over 4G struggle when WordPress sites ship heavy plugin CSS and jQuery.","Static pre-rendered React routes + granular code-splitting ensure pages become interactive fast.","Faster mobile LCP directly lowers cost-per-lead on Google Ads and Meta campaigns."],
    content: "On a fast developer laptop over fiber Wi-Fi, almost any WordPress theme feels usable. On a mid-range Android smartphone over fluctuating Indian 4G mobile data, bloated CMS themes stall for 4 to 6 seconds before rendering usable content.\n\nKey architectural differences driving real-world performance:\n\n- Database Roundtrips vs Edge Delivery: WordPress executes PHP queries dynamically unless heavily cached; modern React apps serve pre-built static HTML and small split JS chunks straight from global CDN edges.\n\n- Script Blocking: Dozens of plugins inject overlapping CSS and JS libraries into the critical render path. Custom code bundles only the exact components required for that route.\n\nRun our free Website Speed & Tech Inspector to check how fast your current domain performs."
  },
  {
    id: "msme-gst-billing-quotation-guide-marathi-hindi",
    title: "GST Bill, Quotation & UPI QR Guide for Maharashtra SMBs (English + मराठी + हिंदी)",
    category: "ERP & Business",
    difficulty: "MSME Practical Guide",
    readTime: "5 min read",
    date: "November 2026",
    author: "Sneha Kalekar",
    authorRole: "Head of Marketing & Operations",
    excerpt: "पुणे, नाशिक, छत्रपती संभाजीनगर, नागपूर आणि लातूरमधील दुकानदार व कारखानदारांसाठी मोफत GST बिल, मराठी कोटेशन फॉरमॅट आणि UPI QR स्टँडी वापरण्याची संपूर्ण माहिती.",
    relatedTool: { to: "/tools/gst-invoice-generator", title: "Free GST Invoice Generator (No Watermark)", desc: "CGST/SGST auto-split, HSN code loader, and 1-click WhatsApp invoice summary.", cta: "Create Free GST Bill" },
    interactiveComponent: null,
    keyTakeaways: [
      "Always verify whether the buyer GSTIN belongs to your same state (27 Maharashtra -> CGST + SGST) or another state (IGST) before issuing Tax Invoices.",
      "Share clean A4 Quotations or Proforma Estimates with milestone payment terms (e.g. 50% Advance / 50% Delivery) before dispatching stock.",
      "Lock fixed ₹ amounts inside your counter UPI QR standee for standard service packages to eliminate payment typos."
    ],
    content: "Small and medium businesses across Pune, PCMC, Nashik, Aurangabad, Nagpur, and Latur lose hours every week formatting Excel bills or waiting on paid billing software.\n\nमराठी मार्गदर्शन (Marathi Quick Summary): दुकानासाठी किंवा कारखान्यासाठी दररोज GST बिल (Tax Invoice), कोटेशन (Quotation PDF) आणि UPI पेमेंट QR बनवायचा असेल, तर कोणत्याही लॉगिन किंवा शुल्काशिवाय आमची सर्व टूल्स थेट मोबाईल व संगणकावर मोफत वापरता येतात. राज्याचा कोड (उदा. 27) नुसार CGST+SGST किंवा IGST आपोआप मोजले जातात.\n\nहिंदी गाइड (Hindi Quick Summary): अपने बिज़नेस के लिए बिना वॉटरमार्क GST बिल, प्रोफ़ेशनल कोटेशन, डिलीवरी चालान और फ़िक्स अमाउंट UPI QR कोड कुछ सेकंड में PDF या WhatsApp फ़ॉर्मेट में तैयार करें।\n\nStart directly using our Free Business Tools Suite for GST Invoices, Quotations, HSN lookups, and MSME Loan EMI planning."
  },
  {
    id: "india-d2c-break-even-razorpay-fees-shopify-vs-custom",
    title: "Indian D2C Break-Even Math: Payment Fees, GST, RTO & Platform Costs",
    category: "Pricing & Planning",
    difficulty: "Founder Economics",
    readTime: "6 min read",
    date: "November 2026",
    author: "Prajyot Kankal",
    authorRole: "Founder & Chief Architect",
    excerpt: "Why 60% gross margin D2C products still lose money on paper — calculating true contribution margin after GST extraction, 2% payment gateway cuts, shipping, and Ad CAC.",
    relatedTool: { to: "/tools/break-even-calculator", title: "Free Break-Even & D2C Margin Calculator", desc: "Simulate monthly break-even order volume and Minimum ROAS in ₹ immediately.", cta: "Calculate Break-Even Free" },
    interactiveComponent: null,
    keyTakeaways: [
      "Remember that Indian D2C selling prices are GST-inclusive: ₹1,499 at 12% GST leaves only ₹1,338 in net taxable sales.",
      "Factor 2% payment gateway fees + forward/RTO courier costs + packaging before capping your maximum safe Meta Ad CAC.",
      "Eliminating recurring USD Shopify app rent directly boosts per-order net profit once your store scales past 300 monthly orders."
    ],
    content: "Many emerging D2C clothing, electronics, and lifestyle brands celebrate ₹10 Lakh monthly revenue only to discover an empty bank balance at quarter-end.\n\nThe root cause is naive unit economics: founders subtract product manufacturing cost from MRP without deducting GST already baked into MRP, Razorpay 2% + GST transaction fees, RTO return shipping losses, and Meta customer acquisition costs.\n\nUse our Break-Even & Unit Economics Calculator above with your exact ₹ numbers, then compare 3-year costs on our Shopify vs Custom E-Commerce analyzer."
  }
];

export const CATEGORIES = [
  "All Articles",
  "Pricing & Planning",
  "ERP & Business",
  "AI & Automation",
  "Retail & SaaS",
  "Performance & SEO",
  "APIs & Backend",
  "UI/UX & Speed"
];