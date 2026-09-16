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
import { useLeadModal } from "../context/LeadModalContext.jsx";

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
    title: "Optimized Edge Performance",
    desc: "We use modern architectures, optimized indexes, and efficient caching strategies for fast loads."
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
    agency: { status: "yes", text: "Custom built with lengthy development cycles" }
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
  const { openLeadModal } = useLeadModal();
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-96 bg-gradient-to-r from-purple-200/40 via-white to-purple-100/40 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 space-y-16">
        {/* 5 Guarantees Grid */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/80 px-4 py-1.5 text-xs font-bold text-purple-700 backdrop-blur-md mb-4 shadow-sm shadow-purple-500/5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500" />
              NON-NEGOTIABLE CLIENT ASSURANCES
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
              5 Enterprise Guarantees{" "}
              <span className="bg-gradient-to-r from-purple-600 via-brand-500 to-purple-400 bg-clip-text text-transparent">
                Every Single Client Receives
              </span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              We eliminate risk so you can modernize your business with total peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {GUARANTEES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/80 rounded-3xl p-6 border border-purple-100 shadow-xl shadow-purple-500/5 backdrop-blur-xl flex flex-col justify-between hover:border-purple-300 hover:shadow-purple-500/10 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-purple-100 flex items-center gap-1.5 text-[11px] text-purple-600 font-mono font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Contractually Guaranteed</span>
                  </div>
                </div>
              );
            })}

            {/* Direct WhatsApp Call Banner */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl p-6 border border-purple-200 shadow-xl shadow-purple-500/5 backdrop-blur-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-purple-600 uppercase font-bold tracking-wider">
                  DIRECT ACCESS
                </span>
                <h3 className="font-black text-slate-900 text-lg mt-1 mb-2">
                  Need a Non-Disclosure Agreement (NDA)?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We sign standard mutual NDAs before any proprietary discovery call or workflow discussion.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  openLeadModal({
                    source: "Enterprise Trust & NDA Section",
                    title: "Request NDA & Architecture Call",
                    subtitle: "We sign mutual Non-Disclosure Agreements prior to project discovery to protect your IP.",
                    projectType: "Enterprise ERP / CRM Suite",
                    defaultMessage: "Requesting mutual Non-Disclosure Agreement (NDA) and confidential project discovery call.",
                  })
                }
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs text-center transition cursor-pointer shadow-md shadow-purple-500/20"
              >
                Request NDA & Architecture Call
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-purple-100 shadow-2xl shadow-purple-900/5 backdrop-blur-xl">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="text-xs font-mono text-purple-600 uppercase tracking-widest font-bold block mb-1">
              THE STRATEGIC ADVANTAGE
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              Why Custom Build Beats Generic SaaS
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              See how partnering with Prajyot Infotech compares to renting off-the-shelf software or hiring bloated legacy agencies.
            </p>
          </div>

          <div className="md:hidden text-center text-[10px] sm:text-[11px] font-mono text-purple-700 bg-purple-50 border border-purple-200 py-1.5 px-3 rounded-xl mb-3 flex items-center justify-center gap-1.5">
            <span>← Swipe horizontally to view full matrix →</span>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
            <table className="w-full min-w-[620px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-purple-100 text-slate-500 font-mono">
                  <th className="py-3 px-4 font-semibold">DECISION CRITERIA</th>
                  <th className="py-3 px-4 font-black text-purple-700 bg-purple-50/80 rounded-t-xl border-t border-l border-r border-purple-200">
                    PRAJYOT INFOTECH (CUSTOM)
                  </th>
                  <th className="py-3 px-4 font-semibold text-slate-500">OFF-THE-SHELF SAAS</th>
                  <th className="py-3 px-4 font-semibold text-slate-500">TRADITIONAL AGENCY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/60">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition">
                    <td className="py-4 px-4 font-bold text-slate-800 whitespace-nowrap">
                      {row.criteria}
                    </td>

                    {/* Prajyot Infotech column */}
                    <td className="py-4 px-4 bg-purple-50/40 border-l border-r border-purple-200/50 text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-900">{row.prajyot.text}</span>
                      </div>
                    </td>

                    {/* SaaS Column */}
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        {row.saas.status === "no" ? (
                          <XCircle className="w-4 h-4 text-red-500/80 shrink-0" />
                        ) : row.saas.status === "partial" ? (
                          <HelpCircle className="w-4 h-4 text-amber-500/80 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                        <span>{row.saas.text}</span>
                      </div>
                    </td>

                    {/* Traditional Agency Column */}
                    <td className="py-4 px-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        {row.agency.status === "no" ? (
                          <XCircle className="w-4 h-4 text-red-500/80 shrink-0" />
                        ) : row.agency.status === "partial" ? (
                          <HelpCircle className="w-4 h-4 text-amber-500/80 shrink-0" />
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
