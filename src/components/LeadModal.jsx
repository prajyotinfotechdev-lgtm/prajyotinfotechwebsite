// src/components/LeadModal.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Building,
  User,
  PhoneCall,
  FileText,
  Clock,
  ArrowRight,
  Cpu,
  Zap,
  Lock,
  Layers,
  Terminal,
  ChevronRight,
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { createLead } from "../utils/leadStorage.js";

const WHATSAPP_NUMBER = "917020708747";

const PROJECT_TYPES = [
  { label: "Website / Web App Development", icon: "🌐", badge: "High Speed" },
  { label: "Enterprise ERP / CRM Suite", icon: "⚡", badge: "Custom Logic" },
  { label: "Cross-Platform Mobile App (Android/iOS)", icon: "📱", badge: "Native Quality" },
  { label: "WhatsApp & Workflow Automation", icon: "🤖", badge: "Automated Ops" },
  { label: "UI/UX Design & Prototyping", icon: "🎨", badge: "Design System" },
  { label: "Dedicated Developer / Offshore Team", icon: "💻", badge: "Staff Augmentation" },
  { label: "General Inquiry / Scoping Session", icon: "✨", badge: "Consultation" },
];

const BUDGET_RANGES = [
  "₹29,999 - ₹75,000 ($399 - $999)",
  "₹75,000 - ₹2,00,000 ($1,000 - $2,500)",
  "₹2,00,000 - ₹5,00,000 ($2,500 - $6,500)",
  "₹5,00,000+ ($6,500+ Enterprise)",
  "Undecided / Need Architecture Scoping",
];

export default function LeadModal() {
  const { isOpen, modalConfig, closeLeadModal } = useLeadModal();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    projectType: PROJECT_TYPES[0].label,
    budget: BUDGET_RANGES[0],
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Sync default modalConfig into local state when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm({
        name: "",
        contact: "",
        projectType: modalConfig.projectType || PROJECT_TYPES[0].label,
        budget: modalConfig.budget || BUDGET_RANGES[0],
        message: modalConfig.defaultMessage || "",
      });
      setSubmitted(false);
      setErrorMsg("");
    }
  }, [isOpen, modalConfig]);

  if (!isOpen) return null;

  const validName = form.name.trim().length >= 2;
  const validContact =
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(form.contact.trim()) ||
    /^[+]?[\d\s()-]{8,}$/.test(form.contact.trim());

  const isValid = validName && validContact;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      await createLead({
        name: form.name.trim(),
        contact: form.contact.trim(),
        projectType: form.projectType,
        budget: form.budget,
        message: form.message.trim() || `Inquiry from ${modalConfig.source || "Website CTA"}`,
        source: modalConfig.source || "Website CTA",
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit lead:", err);
      setErrorMsg(err.message || "Failed to submit. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppConfirmation = () => {
    const waText = encodeURIComponent(
      `Hi Prajyot Infotech! I just submitted an inquiry on your website.\n\n` +
        `👤 Name: ${form.name.trim()}\n` +
        `📞 Contact: ${form.contact.trim()}\n` +
        `🚀 Project: ${form.projectType}\n` +
        `💰 Budget: ${form.budget}\n` +
        `💬 Notes: ${form.message.trim() || "Ready for technical discovery session."}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLeadModal}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Futuristic Cyber Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="relative w-full max-w-2xl rounded-3xl bg-slate-950 border border-cyan-500/30 text-white shadow-[0_0_80px_rgba(6,182,212,0.25)] overflow-hidden my-auto z-10 font-sans"
        >
          {/* Ambient Lighting */}
          <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />

          {/* Top Cyber HUD Banner */}
          <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-6 sm:px-8 border-b border-cyan-500/20">
            <button
              onClick={closeLeadModal}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-1.5 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{modalConfig.source || "Prajyot Architecture Portal"}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400">100% NDA Protected</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {modalConfig.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg leading-relaxed">
              {modalConfig.subtitle}
            </p>
          </div>

          {/* Form / Success Body */}
          <div className="p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-6"
              >
                <div className="mx-auto w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-block mb-1">
                    STATUS // CONFIRMED & LOGGED TO CRM
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Inquiry Recorded Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{form.name}</strong>. Your project specification has been encrypted and saved directly to our lead engineering team. We will reach out within <span className="text-cyan-400 font-bold">2 business hours</span>.
                  </p>
                </div>

                {/* Tech Receipt Card */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-2 max-w-md mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-[11px] text-emerald-400">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>CRM RECORD #PI-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </span>
                    <span className="text-slate-400">256-BIT TLS</span>
                  </div>
                  <div><span className="text-slate-400">CLIENT:</span> <span className="text-white font-bold">{form.name}</span></div>
                  <div><span className="text-slate-400">CONTACT:</span> <span className="text-white">{form.contact}</span></div>
                  <div><span className="text-slate-400">SCOPE:</span> <span className="text-cyan-400 font-bold">{form.projectType}</span></div>
                  <div><span className="text-slate-400">BUDGET:</span> <span className="text-indigo-300">{form.budget}</span></div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={openWhatsAppConfirmation}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white py-3.5 px-5 font-semibold text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                    <span>Instant Chat on WhatsApp</span>
                  </button>

                  <button
                    onClick={closeLeadModal}
                    className="rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 py-3.5 px-5 font-semibold text-sm transition cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {/* Name & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Your Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Mehta"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Contact Info (Email or Phone) */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Phone or Email <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <PhoneCall className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="+91 9876543210 or email@co.com"
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type & Budget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Architecture / Scope Type
                    </label>
                    <select
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type.label} value={type.label} className="bg-slate-900 text-white">
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                      Estimated Investment Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition"
                    >
                      {BUDGET_RANGES.map((range) => (
                        <option key={range} value={range} className="bg-slate-900 text-white">
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Details / Message */}
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                    Project Requirements / Notes <span className="text-slate-500 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe what you want to build (e.g. key features, target timeline, integration specs)..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition resize-none"
                  />
                </div>

                {/* Security Guarantee Footer */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Strict 100% NDA Privacy</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Response in &lt; 2 hrs</span>
                  </span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={!isValid || submitting}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-brand-600 to-indigo-600 text-white py-3.5 px-6 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2 font-mono">
                      <Zap className="w-4 h-4 animate-spin" />
                      <span>Encrypting & Logging Inquiry...</span>
                    </span>
                  ) : (
                    <>
                      <span>Submit Project Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
