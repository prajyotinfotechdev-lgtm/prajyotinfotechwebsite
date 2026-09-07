import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  Lock,
  Headphones,
  FileCode2,
  Clock,
  Sparkles,
  Server
} from "lucide-react";

const GUARANTEES = [
  {
    icon: FileCode2,
    title: "100% Full IP & Code Ownership",
    desc: "We hand over the full Git repository. Zero vendor lock-in, zero hostage code, zero restrictions."
  },
  {
    icon: Lock,
    title: "Zero Monthly Seat Penalties",
    desc: "Unlike generic SaaS that charges per user per month, you own your custom software indefinitely."
  },
  {
    icon: Zap,
    title: "Sub-150ms Edge API Latency",
    desc: "Optimized PostgreSQL indexes, Redis caching, and edge-routed endpoints for near-instant load."
  },
  {
    icon: Headphones,
    title: "Direct Senior Engineer Access",
    desc: "No sales middlemen or account managers. Speak directly with the software engineers building your app."
  },
  {
    icon: ShieldCheck,
    title: "60-Day Post-Launch Bug Warranty",
    desc: "Every deployment includes a full 2-month warranty covering any bugs, edge cases, or optimizations."
  }
];

const COMPARISON_ROWS = [
  {
    criteria: "Source Code Ownership",
    prajyot: { status: "yes", text: "100% Full IP Handover (You own Git repo)" },
    saas: { status: "no", text: "0% (Rented monthly subscription)" },
    agency: { status: "partial", text: "Vague contracts / Extra charges" }
  },
  {
    criteria: "Monthly Licensing / Seat Fees",
    prajyot: { status: "yes", text: "₹0 Recurring (One-time custom build)" },
    saas: { status: "no", text: "Expensive per-seat per-month fees forever" },
    agency: { status: "partial", text: "Heavy ongoing retainer contracts" }
  },
  {
    criteria: "Custom Business Logic",
    prajyot: { status: "yes", text: "100% Tailored to your exact workflow" },
    saas: { status: "no", text: "Rigid, generic off-the-shelf templates" },
    agency: { status: "yes", text: "Custom built but takes 6+ months" }
  },
  {
    criteria: "WhatsApp & Local Integrations",
    prajyot: { status: "yes", text: "Deep native WhatsApp Cloud & UPI" },
    saas: { status: "partial", text: "Expensive 3rd-party add-ons" },
    agency: { status: "partial", text: "Slow custom integration" }
  },
  {
    criteria: "Delivery Timeline",
    prajyot: { status: "yes", text: "2 — 4 Weeks Fast Agile Sprints" },
    saas: { status: "yes", text: "Instant but cannot be customized" },
    agency: { status: "no", text: "4 — 8 Months of endless meetings" }
  },
  {
    criteria: "Post-Launch Warranty",
    prajyot: { status: "yes", text: "60-Day Priority Bug Warranty Included" },
    saas: { status: "no", text: "Generic support ticket queue" },
    agency: { status: "partial", text: "Billed per hourly support ticket" }
  }
];

export default function TrustGuarantees() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-emerald-600/10 via-brand-600/10 to-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 space-y-16">
        {/* 5 Guarantees Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300 backdrop-blur-md mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              NON-NEGOTIABLE CLIENT ASSURANCES
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              5 Enterprise Guarantees{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Every Single Client Receives
              </span>
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              We eliminate risk so you can modernize your business with total peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {GUARANTEES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-900/80 rounded-3xl p-6 border border-slate-700/80 shadow-xl backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-white text-base">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Contractually Guaranteed</span>
                  </div>
                </div>
              );
            })}

            {/* Direct WhatsApp Call Banner */}
            <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 rounded-3xl p-6 border border-emerald-500/40 shadow-xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  DIRECT ACCESS
                </span>
                <h3 className="font-black text-white text-lg mt-1 mb-2">
                  Need a Non-Disclosure Agreement (NDA)?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We sign standard mutual NDAs before any proprietary discovery call or workflow discussion.
                </p>
              </div>
              <a
                href="https://wa.me/917020708747?text=Hi%20Prajyot%20Infotech,%20we%20want%20to%20discuss%20a%20confidential%20software%20project%20under%20NDA."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition cursor-pointer"
              >
                Request NDA & Architecture Call
              </a>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono text-brand-400 uppercase tracking-widest font-bold block mb-1">
              THE STRATEGIC ADVANTAGE
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Why Custom Build Beats Generic SaaS
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              See how partnering with Prajyot Infotech compares to renting off-the-shelf software or hiring bloated legacy agencies.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-3 px-4 font-semibold">DECISION CRITERIA</th>
                  <th className="py-3 px-4 font-black text-brand-300 bg-brand-950/40 rounded-t-xl border-t border-l border-r border-brand-500/40">
                    PRAJYOT INFOTECH (CUSTOM)
                  </th>
                  <th className="py-3 px-4 font-semibold text-slate-400">OFF-THE-SHELF SAAS</th>
                  <th className="py-3 px-4 font-semibold text-slate-400">TRADITIONAL AGENCY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                      {row.criteria}
                    </td>

                    {/* Prajyot Infotech column */}
                    <td className="py-4 px-4 bg-brand-950/30 border-l border-r border-brand-500/20 text-slate-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-semibold text-white">{row.prajyot.text}</span>
                      </div>
                    </td>

                    {/* SaaS Column */}
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        {row.saas.status === "no" ? (
                          <XCircle className="w-4 h-4 text-red-400/80 shrink-0" />
                        ) : row.saas.status === "partial" ? (
                          <HelpCircle className="w-4 h-4 text-amber-400/80 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span>{row.saas.text}</span>
                      </div>
                    </td>

                    {/* Traditional Agency Column */}
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex items-center gap-2">
                        {row.agency.status === "no" ? (
                          <XCircle className="w-4 h-4 text-red-400/80 shrink-0" />
                        ) : row.agency.status === "partial" ? (
                          <HelpCircle className="w-4 h-4 text-amber-400/80 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span>{row.agency.text}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
