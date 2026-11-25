import React, { useState } from "react";
import { Languages, CheckCircle2 } from "lucide-react";

const LANG_OPTIONS = [
  { id: "en", label: "English", native: "English" },
  { id: "mr", label: "Marathi", native: "मराठी" },
  { id: "hi", label: "Hindi", native: "हिंदी" },
];

/**
 * Reusable English / Marathi / Hindi usage & search guide component for tools & regional hubs.
 * Captures Maharashtra & pan-India regional search intent cleanly alongside primary tool UX.
 */
export default function BilingualToolGuide({ guides }) {
  const [lang, setLang] = useState("mr");

  if (!guides) return null;
  const active = guides[lang] || guides.en;
  if (!active) return null;

  return (
    <section className="no-print max-w-5xl mx-auto px-4 pb-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
            <Languages className="w-4 h-4 text-brand-400 shrink-0" />
            <span>Quick Regional Guide (English / मराठी / हिंदी)</span>
          </div>
          <div className="inline-flex bg-slate-800 p-1 rounded-xl gap-1">
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setLang(opt.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === opt.id
                    ? "bg-brand-600 text-white shadow-xs"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {opt.native}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">{active.title}</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">{active.summary}</p>
          </div>

          {Array.isArray(active.steps) && active.steps.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              {active.steps.map((step, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-700 leading-relaxed font-medium">{step}</span>
                </div>
              ))}
            </div>
          )}

          {active.note && (
            <div className="px-4 py-2.5 rounded-xl bg-brand-50/70 border border-brand-200 text-xs text-brand-900 font-medium leading-relaxed">
              {active.note}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

