import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  Layers,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Cpu,
  Server,
  Zap,
  Check,
  RotateCcw,
  Sliders,
  Send
} from "lucide-react";

const WA = (text) =>
  `https://wa.me/917020708747?text=${encodeURIComponent(text)}`;

const PROJECT_TYPES = [
  {
    id: "custom-web",
    name: "Custom Web Application",
    desc: "Bespoke portal, client dashboard or enterprise workflow system",
    baseSprints: 2,
    baseDays: 14,
    recommendedStack: ["React 19", "Node.js / Express", "PostgreSQL", "TailwindCSS"],
    badge: "Most Popular"
  },
  {
    id: "mobile-pwa",
    name: "Cross-Platform Mobile App (PWA / Hybrid)",
    desc: "High-performance app running seamlessly on Android, iOS & Desktop",
    baseSprints: 3,
    baseDays: 20,
    recommendedStack: ["React PWA", "TailwindCSS", "Capacitor / Native API", "Redis Cache"],
    badge: "Fast Launch"
  },
  {
    id: "multi-tenant-saas",
    name: "Multi-Tenant SaaS Platform",
    desc: "Isolated client databases, subscription billing & tenant admin portals",
    baseSprints: 4,
    baseDays: 28,
    recommendedStack: ["React 19", "Node.js Microservices", "PostgreSQL Multi-DB", "Razorpay / Stripe"],
    badge: "Scalable"
  },
  {
    id: "pos-erp",
    name: "Retail POS / Warehouse ERP",
    desc: "Realtime barcode/IMEI inventory, thermal receipt billing & GST engine",
    baseSprints: 3,
    baseDays: 21,
    recommendedStack: ["React", "Express", "PostgreSQL Ledger", "Thermal Print Engine", "WebSockets"],
    badge: "Zero Discrepancy"
  },
  {
    id: "clinic-hospital",
    name: "Healthcare & Clinic Suite",
    desc: "Doctor OPD appointments, digital prescriptions & automated WhatsApp queue",
    baseSprints: 2,
    baseDays: 16,
    recommendedStack: ["React", "Node.js", "MongoDB", "Meta Cloud WhatsApp API"],
    badge: "HIPAA Ready"
  }
];

const FEATURE_MODULES = [
  {
    id: "auth-rbac",
    name: "Role-Based Access Control (RBAC)",
    desc: "SuperAdmin, Manager, Staff and Client permission tiers",
    addedDays: 3,
    tech: "JWT / Session Engine"
  },
  {
    id: "whatsapp-auto",
    name: "WhatsApp Cloud API Automation",
    desc: "Auto-send order confirmations, invoices, OTPs & reminders",
    addedDays: 4,
    tech: "Meta Graph API Webhooks"
  },
  {
    id: "realtime-kds",
    name: "Realtime WebSockets / KDS Stream",
    desc: "Instant live updates across staff tablets without page refresh",
    addedDays: 4,
    tech: "Socket.io / Server-Sent Events"
  },
  {
    id: "payments-upi",
    name: "Multi-Gateway UPI & Card Checkout",
    desc: "Instant QR payment reconciliation & automated receipt generator",
    addedDays: 3,
    tech: "Razorpay / Cashfree API"
  },
  {
    id: "gst-invoicing",
    name: "Automated GST Invoicing & PDF Engine",
    desc: "One-click compliant tax invoices with thermal & A4 PDF export",
    addedDays: 3,
    tech: "PDFKit / Thermal ESC-POS"
  },
  {
    id: "multi-warehouse",
    name: "Multi-Location / Branch Sync",
    desc: "Centralized stock ledger with inter-branch transfers",
    addedDays: 5,
    tech: "ACID Ledger Sync"
  },
  {
    id: "analytics-ai",
    name: "Executive Analytics & AI Insights",
    desc: "Automated daily WhatsApp summary, trend forecasts & CSV exports",
    addedDays: 4,
    tech: "Recharts / Automated Cron"
  }
];

export default function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState([
    "auth-rbac",
    "whatsapp-auto",
    "payments-upi"
  ]);
  const [speedTier, setSpeedTier] = useState("standard"); // standard | express
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const toggleFeature = (featureId) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculation = useMemo(() => {
    const featureDays = selectedFeatures.reduce((acc, featId) => {
      const feat = FEATURE_MODULES.find((f) => f.id === featId);
      return acc + (feat ? feat.addedDays : 0);
    }, 0);

    const rawDays = selectedType.baseDays + featureDays;
    const finalDays = speedTier === "express" ? Math.max(10, Math.round(rawDays * 0.65)) : rawDays;
    const estimatedWeeks = Math.ceil(finalDays / 7);

    // Collect full tech stack recommendations
    const stackSet = new Set([...selectedType.recommendedStack]);
    selectedFeatures.forEach((featId) => {
      const feat = FEATURE_MODULES.find((f) => f.id === featId);
      if (feat && feat.tech) stackSet.add(feat.tech);
    });

    return {
      days: finalDays,
      weeks: estimatedWeeks,
      sprints: Math.ceil(estimatedWeeks / 2),
      stack: Array.from(stackSet),
      featureCount: selectedFeatures.length
    };
  }, [selectedType, selectedFeatures, speedTier]);

  const whatsappMessage = useMemo(() => {
    const featNames = selectedFeatures
      .map((id) => FEATURE_MODULES.find((f) => f.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    return `Hi Prajyot Infotech! I configured a project estimate on your website:
- Project Type: ${selectedType.name}
- Delivery Preference: ${speedTier === "express" ? "Fast-Track Express (Priority Sprint)" : "Standard Agile Delivery"}
- Estimated Delivery: ~${calculation.weeks} Weeks (${calculation.days} Working Days)
- Key Modules Selected: ${featNames || "Core Foundation Only"}
${clientName ? `- Name: ${clientName}` : ""}
${clientPhone ? `- Phone: ${clientPhone}` : ""}

I would like to schedule a 15-minute system architecture discovery call to discuss our scope.`;
  }, [selectedType, selectedFeatures, speedTier, calculation, clientName, clientPhone]);

  return (
    <section id="estimator" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-brand-600/10 via-indigo-600/15 to-violet-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-xs font-bold text-brand-300 backdrop-blur-md mb-4">
            <Calculator className="w-3.5 h-3.5 text-brand-400" />
            INTERACTIVE SCOPE & SPRINT CALCULATOR
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Estimate Your Custom Software{" "}
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
              Timeline & Architecture
            </span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Select your target platform and core functional modules. Our engine calculates estimated development sprints, recommended architecture, and included IP deliverables in real time.
          </p>
        </div>

        {/* Interactive Estimator Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Configuration Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Project Type */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-mono">1</span>
                  Select Platform Archetype
                </span>
                <span className="text-xs text-slate-400">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType.id === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? "bg-gradient-to-r from-brand-950/80 to-slate-900 border-brand-500 shadow-lg shadow-brand-500/10"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-200"}`}>
                              {type.name}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                              {type.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{type.desc}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isSelected
                            ? "border-brand-400 bg-brand-500 text-white"
                            : "border-slate-700 bg-slate-900 text-transparent"
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Feature Modules */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-mono">2</span>
                  Select Functional Modules ({selectedFeatures.length} Active)
                </span>
                <span className="text-xs text-slate-400">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {FEATURE_MODULES.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? "bg-indigo-950/40 border-indigo-500/70 shadow-sm"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className={`text-xs font-bold leading-snug ${isChecked ? "text-white" : "text-slate-300"}`}>
                          {feat.name}
                        </span>
                        <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
                          isChecked
                            ? "border-indigo-400 bg-indigo-500 text-white"
                            : "border-slate-700 bg-slate-900 text-transparent"
                        }`}>
                          <Check className="w-2.5 h-2.5" />
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{feat.desc}</p>
                      <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>+{feat.addedDays} dev days</span>
                        <span className="text-indigo-400 font-semibold">{feat.tech}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Speed Preference */}
            <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-7 border border-slate-700/80 shadow-xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center text-xs font-mono">3</span>
                  Sprint Pace & Velocity
                </span>
                <span className="text-xs text-slate-400">Step 3 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setSpeedTier("standard")}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    speedTier === "standard"
                      ? "bg-brand-950/60 border-brand-500 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Standard Agile Sprint</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">Recommended</span>
                  </div>
                  <p className="text-xs text-slate-400">Steady weekly staging reviews, deep test coverage & optimal code refinement.</p>
                </button>

                <button
                  onClick={() => setSpeedTier("express")}
                  className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                    speedTier === "express"
                      ? "bg-amber-950/60 border-amber-500 text-white"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Fast-Track MVP Sprint
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">Priority</span>
                  </div>
                  <p className="text-xs text-slate-400">Dedicated pair engineers for high-urgency market launches (~35% faster).</p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Live Calculation & Direct WhatsApp Call-to-Action (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-7 border border-brand-500/40 shadow-2xl shadow-brand-500/10 space-y-6 relative overflow-hidden">
              {/* Subtle top indicator */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  Live Calculated Scope
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                  Ready to Build
                </span>
              </div>

              {/* Major Timeline Numbers */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-center">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                    Estimated Timeline
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    ~{calculation.weeks} <span className="text-sm font-sans text-brand-400 font-bold">WEEKS</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    {calculation.days} working dev days
                  </span>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80 text-center">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                    Agile Sprints
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                    {calculation.sprints} <span className="text-sm font-sans text-indigo-400 font-bold">SPRINTS</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    Weekly staging reviews
                  </span>
                </div>
              </div>

              {/* Recommended Stack Matrix */}
              <div>
                <span className="text-xs font-bold text-slate-300 block mb-2">
                  Engineered Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {calculation.stack.map((tech) => (
                    <span
                      key={tech}
                      className="bg-slate-950 px-2.5 py-1 rounded-lg text-[11px] font-mono text-brand-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Non-negotiable Included Deliverables */}
              <div className="space-y-2 border-t border-slate-800/80 pt-4">
                <span className="text-xs font-bold text-slate-300 block">
                  Included in Every Custom Build:
                </span>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>100% Code & IP Ownership</strong> (Zero vendor lock-in)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>60-Day Post-Launch Bug Warranty</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Automated CI/CD Deployment Pipeline</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Direct Senior Engineer Access</strong> on WhatsApp</span>
                  </div>
                </div>
              </div>

              {/* Optional Quick Details */}
              <div className="space-y-2 border-t border-slate-800/80 pt-4">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="space-y-2">
                <a
                  href={WA(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3.5 px-4 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-sm text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Configured Scope to WhatsApp
                </a>
                <p className="text-[11px] text-slate-500 text-center">
                  ⚡ Direct response from senior architects within 2 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
