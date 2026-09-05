import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Seo from "../components/Seo.jsx";
import {
  Search,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Share2,
  Heart,
  Copy,
  Check,
  Send,
  Server,
  Smartphone,
  Laptop,
  Monitor,
  Gauge,
  Zap,
  Bot,
  Layers,
  ShieldCheck,
  TrendingUp,
  Code2,
  ChevronRight
} from "lucide-react";

/* ─── 1. INTERACTIVE DIAGRAM: API PACKET FLOW ─── */
const ApiInteractiveDiagram = () => {
  const [step, setStep] = useState(0);

  const simulateApiCall = () => {
    setStep(1); // Client sending
    setTimeout(() => setStep(2), 900); // Gateway routing
    setTimeout(() => setStep(3), 1800); // Database query
    setTimeout(() => setStep(4), 2700); // Returning response
    setTimeout(() => setStep(5), 3600); // Finished
    setTimeout(() => setStep(0), 6500); // Auto reset
  };

  return (
    <div className="my-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 md:p-8 text-white shadow-2xl relative">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Header */}
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

      {/* Nodes and Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative py-4">
        {/* Node 1: Client */}
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

        {/* Node 2: API Gateway */}
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

        {/* Node 3: Database & Logic */}
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

      {/* Live HTTP Status Bar */}
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
const SpeedInteractiveDiagram = () => {
  const [loadTime, setLoadTime] = useState(0.8); // seconds

  const stats = useMemo(() => {
    // Score out of 100
    const score = Math.max(20, Math.min(100, Math.round(100 - (loadTime - 0.4) * 22)));
    // Bounce rate
    const bounceRate = Math.min(75, Math.max(9, Math.round(12 + loadTime * 14)));
    // Conversion delta
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
        <span className="text-xs font-mono text-slate-400">Google Core Web Vitals 2026 Audit</span>
      </div>

      {/* Slider Control */}
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

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Google Score</span>
          <span className={`text-3xl md:text-4xl font-black font-mono ${
            stats.score >= 90 ? "text-emerald-400" : stats.score >= 70 ? "text-yellow-400" : "text-red-400"
          }`}>
            {stats.score}/100
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Lighthouse Performance</span>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Bounce Rate</span>
          <span className={`text-3xl md:text-4xl font-black font-mono ${
            stats.bounceRate <= 20 ? "text-emerald-400" : stats.bounceRate <= 40 ? "text-yellow-400" : "text-red-400"
          }`}>
            {stats.bounceRate}%
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Users leaving immediately</span>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block mb-1">Conversion Delta</span>
          <span className={`text-3xl md:text-4xl font-black font-mono ${
            stats.convChange > 0 ? "text-emerald-400" : "text-slate-400"
          }`}>
            +{stats.convChange}%
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">Sales multiplier</span>
        </div>

        {/* Metric 4 */}
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
const AiAutomationSimulator = () => {
  const [leads, setLeads] = useState(300);
  const [dealValue, setDealValue] = useState(15000);

  const calculations = useMemo(() => {
    // Manual: 12% conversion due to delayed response (> 2 hours)
    const manualConv = Math.round(leads * 0.12);
    const manualRev = manualConv * dealValue;

    // AI Instant (under 10 seconds): 38% conversion
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

      {/* Comparison Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Manual Way */}
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

        {/* AI Way */}
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

      {/* Bottom Result Pill */}
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
const ResponsiveInteractiveDiagram = () => {
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
        <motion.div
          animate={{
            width: device === "mobile" ? 220 : device === "tablet" ? 420 : 640,
            height: device === "mobile" ? 260 : device === "tablet" ? 250 : 240,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="bg-slate-950 border-2 border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Mock Browser Topbar */}
          <div className="bg-slate-900 h-7 flex items-center px-3 border-b border-slate-800 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <div className="ml-auto w-24 h-2.5 bg-slate-800 rounded-full font-mono text-[9px] text-slate-500 text-center flex items-center justify-center">
              prajyotinfotech.in
            </div>
          </div>

          {/* Adaptive Content Area */}
          <div className="p-3 flex-1 flex flex-col justify-between overflow-y-auto">
            {/* Header Banner */}
            <div className="h-10 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-lg flex items-center px-3 justify-between">
              <span className="text-[10px] font-bold text-white">Prajyot Infotech</span>
              <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded text-white font-mono">Book Call</span>
            </div>

            {/* Layout reflow grid */}
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
        </motion.div>
      </div>
      <p className="text-xs text-slate-400 mt-4">
        Fluid grid rearrangement ensures zero horizontal scrolling, high tap target accuracy, and seamless conversion across every device.
      </p>
    </div>
  );
};

/* ─── 5. ARTICLES MASTER DATA ─── */
const ARTICLES = [
  {
    id: "sub-second-page-speed",
    title: "Why Sub-Second Page Speed is Google's #1 Ranking Factor in 2026",
    category: "Performance & SEO",
    difficulty: "Executive Blueprint",
    readTime: "4 min read",
    date: "September 2026",
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
    title: "Automating Business Operations with AI & WhatsApp: From Leads to Revenue in 12 Seconds",
    category: "AI & Automation",
    difficulty: "Architecture Deep Dive",
    readTime: "5 min read",
    date: "September 2026",
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
];

const CATEGORIES = ["All Articles", "Performance & SEO", "AI & Automation", "APIs & Backend", "UI/UX & Speed"];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState({
    "sub-second-page-speed": 84,
    "ai-whatsapp-automation": 128,
    "what-is-an-api": 62,
    "responsive-design": 49
  });
  const [copiedId, setCopiedId] = useState(null);

  const handleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleCopyLink = (id) => {
    const url = `${window.location.origin}/articles#${id}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory = selectedCategory === "All Articles" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <Seo
        title="Interactive Engineering Lab & Tech Insights | Prajyot Infotech"
        description="Explore interactive engineering diagrams, live performance simulators, AI automation blueprints, and API architecture guides built by Prajyot Infotech."
        path="/articles"
      />

      {/* Hero Header */}
      <header className="relative pt-36 pb-20 px-4 overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-600/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 font-semibold text-xs tracking-wider uppercase mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400" />
            Prajyot Engineering Research & Insights
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6"
          >
            Don't just read tech.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-400 to-pink-400">
              Simulate it live.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Explore hands-on interactive architectural models, Core Web Vitals simulators, and business automation blueprints engineered by the Prajyot Infotech core team.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by topic, architecture, APIs, or performance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 text-sm shadow-inner transition-all"
            />
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="max-w-5xl mx-auto mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-105"
                  : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-16 space-y-20">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-950 border border-slate-800">
            <p className="text-xl font-bold text-slate-300 mb-2">No articles matched your query</p>
            <p className="text-sm text-slate-500 mb-6">Try searching for "speed", "API", or "WhatsApp"</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Articles");
              }}
              className="px-5 py-2.5 rounded-full bg-brand-600 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredArticles.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="bg-slate-950 rounded-3xl p-6 md:p-10 border border-slate-800/90 shadow-2xl relative overflow-hidden transition-all hover:border-slate-700"
            >
              {/* Meta Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-950/80 border border-brand-800/60 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    {article.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-snug">
                {article.title}
              </h2>
              <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Interactive Widget */}
              <div className="my-6">
                {article.interactiveComponent}
              </div>

              {/* Key Takeaways Box */}
              <div className="my-8 p-5 md:p-6 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-brand-400" />
                  Key Architectural Takeaways
                </h3>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Article Content */}
              <div className="text-slate-300 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line border-t border-slate-800/80 pt-6">
                {article.content}
              </div>

              {/* Article Footer Toolbar */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(article.id)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-pink-500/50 hover:text-pink-400 text-xs font-bold text-slate-300 transition-all cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20" />
                    <span>{likes[article.id] || 0} Helpful</span>
                  </button>

                  <button
                    onClick={() => handleCopyLink(article.id)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-brand-500/50 text-xs font-bold text-slate-300 transition-all cursor-pointer"
                  >
                    {copiedId === article.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-brand-600/20"
                >
                  Implement This Architecture
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))
        )}
      </main>

      {/* Bottom Consultation CTA */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-400 font-bold block mb-2">
            Engineering Consultation
          </span>
          <h2 className="text-3xl font-black text-white mb-4">
            Need high-performance architecture built for your business?
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
            From sub-second eCommerce websites to automated AI CRM workflows, we build software that delivers measurable enterprise ROI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-xl shadow-brand-600/25 transition-all"
            >
              Book 15-Min Technical Blueprint Call
            </Link>
            <Link
              to="/pricing"
              className="px-8 py-4 rounded-full bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold text-sm transition-all"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
