import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createLead } from "../utils/leadStorage.js";

/**
 * HelpBot - Ultra-Premium World-Class AI Assistant
 * - Glassmorphism floating UI with high-end dark tech styling
 * - Interactive step progress indicator
 * - Direct database lead submission (No external WhatsApp redirect)
 * - Built-in voice input & keyboard shortcuts
 */

const STEPS = {
  NAME: "name",
  CONTACT: "contact",
  PROJECT: "project",
  BUDGET: "budget",
  SUMMARY: "summary",
};

const PROJECT_OPTIONS = [
  { label: "Website", icon: "🌐", desc: "Corporate / Portfolio / Web App" },
  { label: "Mobile App", icon: "📱", desc: "Android / iOS / Flutter" },
  { label: "SaaS / ERP", icon: "⚡", desc: "Custom Software / CRM" },
  { label: "E-Commerce", icon: "🛍️", desc: "Online Store & Payments" },
  { label: "Other", icon: "✨", desc: "Custom Consultation" },
];

const BUDGET_OPTIONS = [
  { label: "Under ₹30k", badge: "Starter" },
  { label: "₹30k–₹60k", badge: "Popular" },
  { label: "₹60k–₹1.5L", badge: "Growth" },
  { label: "₹1.5L+", badge: "Enterprise" },
];

// Validators
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRe = /^\+?[0-9()\-\s]{8,}$/;
const isEmail = (v = "") => emailRe.test(v.trim());
const isPhone = (v = "") => phoneRe.test(v.trim());

// Storage helpers
const safeGet = (key, fallback) => {
  try {
    if (typeof localStorage === "undefined") return fallback;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const safeSet = (key, value) => {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
const safeGetItem = (key) => {
  try {
    if (typeof localStorage === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};
const safeSetItem = (key, val) => {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(key, val);
  } catch {}
};

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

export default function HelpBot({
  autoOpenAfterMs = 5000,
  launcherOffset = { bottom: "6rem", right: "1.25rem" },
  panelOffset = { bottom: "10rem", right: "1.25rem" },
  zIndex = 200,
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(() => safeGetItem("helpbot:step") || STEPS.NAME);
  const [form, setForm] = useState(() =>
    safeGet("helpbot:form", { name: "", contact: "", project: "", budget: "", notes: "" })
  );
  const [messages, setMessages] = useState(() => safeGet("helpbot:messages_txt", []));
  const [unread, setUnread] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // URL flags
  const urlFlags = (() => {
    try {
      const p = new URLSearchParams(window.location.search);
      return {
        helpOpen: p.get("help") === "1",
        helpOff: p.get("help") === "0",
      };
    } catch {
      return { helpOpen: false, helpOff: false };
    }
  })();

  // Persist
  useEffect(() => safeSet("helpbot:form", form), [form]);
  useEffect(() => safeSetItem("helpbot:step", step), [step]);
  useEffect(() => {
    safeSet("helpbot:messages_txt", messages);
    const el = listRef.current;
    if (!el) return;
    const last = el.querySelector("ul > li:last-child");
    last?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Auto-open
  useEffect(() => {
    if (urlFlags.helpOff || !autoOpenAfterMs) return;
    const t = setTimeout(() => {
      setOpen(true);
    }, urlFlags.helpOpen ? 0 : autoOpenAfterMs);
    return () => clearTimeout(t);
  }, [autoOpenAfterMs]);

  // Handle open state
  useEffect(() => {
    if (open) setUnread(0);

    let prevOverflow = "";
    if (open) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      if (messages.length === 0) {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
        botSayAsync(`${greeting}! Welcome to Prajyot Infotech. Let's get your project estimated in 4 quick steps. What's your name?`, { meta: "ask:name" }, 600);
      } else if (step === STEPS.NAME && !messages.some((m) => m.meta === "ask:name")) {
        botSayAsync("What's your full name?", { meta: "ask:name" }, 500);
      }
      setTimeout(() => inputRef.current?.focus(), 0);
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (open) document.body.style.overflow = prevOverflow;
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [open]);

  // Voice toggle
  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Chrome or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      if (inputRef.current) {
        inputRef.current.value = transcript;
        setTimeout(() => {
          if (inputRef.current.form) {
            inputRef.current.form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
          }
        }, 400);
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const botSay = (text, opts = {}) => {
    const msg = { id: uid(), role: "bot", text: String(text), ts: Date.now(), ...opts };
    setMessages((m) => [...m, msg]);
    if (!open) setUnread((u) => u + 1);
  };

  const botSayAsync = (text, opts = {}, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      const el = listRef.current;
      if (el) {
        const last = el.querySelector("ul > li:last-child");
        last?.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 50);

    setTimeout(() => {
      botSay(text, opts);
      setIsTyping(false);
    }, delay);
  };

  const userSay = (text) => {
    const msg = { id: uid(), role: "user", text: String(text).trim(), ts: Date.now() };
    setMessages((m) => [...m, msg]);
  };

  const goto = (next) => setStep(next);

  const handleUserInput = (text) => {
    const clean = text.trim();
    if (!clean) return;
    userSay(clean);

    if (step === STEPS.NAME) {
      if (clean.length < 2) return botSayAsync("Please enter at least 2 characters for your name.", {}, 500);
      const nextForm = { ...form, name: clean };
      setForm(nextForm);
      goto(STEPS.CONTACT);
      return botSayAsync(`Pleasure to meet you, ${clean.split(' ')[0]}! What is your Email or WhatsApp phone number?`, {}, 800);
    }

    if (step === STEPS.CONTACT) {
      if (!isEmail(clean) && !isPhone(clean)) return botSayAsync("Please enter a valid email address or phone number.", {}, 500);
      const nextForm = { ...form, contact: clean };
      setForm(nextForm);
      goto(STEPS.PROJECT);
      return botSayAsync("Got it! What type of software or web application do you want to build?", {}, 800);
    }

    if (step === STEPS.PROJECT) {
      const nextForm = { ...form, project: clean };
      setForm(nextForm);
      goto(STEPS.BUDGET);
      return botSayAsync("Excellent choice. What is your estimated budget for this project?", {}, 800);
    }

    if (step === STEPS.BUDGET) {
      const nextForm = { ...form, budget: clean };
      setForm(nextForm);
      goto(STEPS.SUMMARY);

      // Save directly to Supabase
      createLead({
        name: nextForm.name,
        contact: nextForm.contact,
        projectType: nextForm.project,
        budget: clean,
        notes: nextForm.notes || "Chatbot Lead",
        source: "Prajyot AI Assistant"
      }).catch(err => console.error("Error saving lead:", err));

      return botSayAsync("🎉 Perfect! Your enquiry has been saved and submitted directly to our engineering team. We will review your details and contact you shortly!", {}, 1000);
    }

    if (step === STEPS.SUMMARY) {
      setForm((f) => ({ ...f, notes: (f.notes ? f.notes + "\n" : "") + clean }));
      return botSayAsync("Noted! Additional details added to your project record.", {}, 800);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const inputEl = e.currentTarget.querySelector("input[name=msg]");
    const text = inputEl?.value || "";
    if (!text.trim()) return;
    handleUserInput(text.trim());
    inputEl.value = "";
  };

  const clearChat = () => {
    setForm({ name: "", contact: "", project: "", budget: "", notes: "" });
    setStep(STEPS.NAME);
    setMessages([]);
    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    if (open) botSayAsync(`${greeting}! Welcome to Prajyot Infotech. What's your full name?`, { meta: "ask:name" }, 600);
    inputRef.current?.focus();
  };

  // Step Progress Calculator
  const getStepProgress = () => {
    switch (step) {
      case STEPS.NAME: return { step: 1, percent: "25%", label: "Step 1 of 4: Contact Info" };
      case STEPS.CONTACT: return { step: 2, percent: "50%", label: "Step 2 of 4: Reachability" };
      case STEPS.PROJECT: return { step: 3, percent: "75%", label: "Step 3 of 4: Project Scope" };
      case STEPS.BUDGET: return { step: 4, percent: "90%", label: "Step 4 of 4: Investment Range" };
      case STEPS.SUMMARY: return { step: 4, percent: "100%", label: "Complete! Inquiry Submitted" };
      default: return { step: 1, percent: "20%", label: "Assistant Active" };
    }
  };

  const progress = getStepProgress();

  return (
    <>
      {/* --- FLOATING LAUNCHER BUTTON --- */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Assistant"
        className="fixed grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white shadow-[0_0_40px_rgba(99,102,241,0.5)] ring-2 ring-white/30 transition-all hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] group"
        style={{
          bottom: toCss(launcherOffset.bottom),
          right: toCss(launcherOffset.right),
          zIndex,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
        <div className="relative">
          {open ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7 stroke-[2.5]" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none">
                <path fill="currentColor" d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10a9.96 9.96 0 01-4.587-1.11L2.5 21.5l.61-4.91A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2zm0 2a8 8 0 00-8 8c0 1.57.45 3.036 1.23 4.28L4.6 18.4l2.12-.55A7.96 7.96 0 0012 20a8 8 0 008-8 8 8 0 00-8-8z" />
                <circle cx="8.5" cy="11.5" r="1.25" fill="currentColor" />
                <circle cx="12" cy="11.5" r="1.25" fill="currentColor" />
                <circle cx="15.5" cy="11.5" r="1.25" fill="currentColor" />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          )}

          {unread > 0 && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-3 -top-3 grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-rose-500 px-1.5 text-xs font-black text-white shadow-lg ring-2 ring-slate-950"
            >
              {unread}
            </motion.span>
          )}
        </div>
      </motion.button>

      {/* --- BACKDROP OVERLAY --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
            style={{ zIndex: zIndex - 1 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- ULTRA-PREMIUM CHAT PANEL --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ duration: 0.35, type: "spring", damping: 26, stiffness: 320 }}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            className="fixed w-[min(100vw-2rem,430px)] overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-3xl flex flex-col"
            style={{
              bottom: toCss(panelOffset.bottom),
              right: toCss(panelOffset.right),
              zIndex,
            }}
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-indigo-600/30 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />

            {/* HEADER BAR */}
            <div className="relative border-b border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 blur-sm opacity-80 animate-pulse" />
                    <div className="relative grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-md font-black text-lg">
                      P
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white tracking-wide">Prajyot AI Assistant</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        v3.6 Pro
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Connected · Instant DB Sync</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-bold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                    title="Restart Conversation"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </div>
              </div>

              {/* Progress Bar Indicator */}
              <div className="mt-3.5 pt-2 border-t border-white/5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                  <span>{progress.label}</span>
                  <span className="text-indigo-400">{progress.percent}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: progress.percent }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* MESSAGES CONTAINER */}
            <div className="max-h-[50vh] min-h-[300px] overflow-y-auto p-4 custom-scrollbar space-y-4" ref={listRef}>
              <ul className="space-y-4" aria-live="polite">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "bot" && (
                        <div className="mr-2.5 mt-1 shrink-0">
                          <div className="grid size-7 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md ring-1 ring-white/20 text-xs font-bold">
                            🤖
                          </div>
                        </div>
                      )}
                      <div
                        className={
                          "inline-block max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-lg backdrop-blur-md " +
                          (m.role === "user"
                            ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-tr-xs border border-white/20"
                            : "bg-white/10 border border-white/15 text-slate-100 rounded-tl-xs")
                        }
                      >
                        {m.text}
                      </div>
                    </motion.li>
                  ))}

                  {/* Typing Animation */}
                  {isTyping && (
                    <motion.li
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex justify-start"
                    >
                      <div className="mr-2.5 mt-1 shrink-0">
                        <div className="grid size-7 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md ring-1 ring-white/20 text-xs">
                          🤖
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-2xl bg-white/10 border border-white/15 rounded-tl-xs backdrop-blur-md px-4 py-3 shadow-md">
                        <motion.div className="h-2 w-2 rounded-full bg-indigo-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                        <motion.div className="h-2 w-2 rounded-full bg-purple-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="h-2 w-2 rounded-full bg-pink-400" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                      </div>
                    </motion.li>
                  )}
                </AnimatePresence>
              </ul>

              {/* INLINE PROJECT OPTIONS */}
              <AnimatePresence>
                {step === STEPS.PROJECT && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pl-9 space-y-2"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-300/80 mb-2">
                      Select Project Type:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {PROJECT_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-left text-xs font-semibold text-white transition-all hover:bg-indigo-600 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30 group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{opt.icon}</span>
                            <div>
                              <div className="font-bold text-white">{opt.label}</div>
                              <div className="text-[10px] text-slate-400 group-hover:text-indigo-100">{opt.desc}</div>
                            </div>
                          </div>
                          <span className="text-slate-400 group-hover:text-white">→</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* INLINE BUDGET OPTIONS */}
                {step === STEPS.BUDGET && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pl-9 space-y-2"
                  >
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-purple-300/80 mb-2">
                      Estimated Investment Range:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex flex-col items-center justify-center rounded-xl border border-white/15 bg-white/5 p-3 text-center transition-all hover:bg-purple-600 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/30 group"
                        >
                          <span className="text-[10px] font-extrabold text-purple-300 uppercase group-hover:text-white mb-0.5">
                            {opt.badge}
                          </span>
                          <span className="text-xs font-bold text-white">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* INLINE SUMMARY & SUCCESS STATE */}
                {step === STEPS.SUMMARY && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 ml-9 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-[13px] text-white backdrop-blur-md shadow-xl"
                  >
                    <div className="mb-3 flex items-center gap-2 font-black text-emerald-400 text-sm">
                      <div className="grid size-5 place-items-center rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold">
                        ✓
                      </div>
                      Inquiry Captured & Saved!
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-200 border-t border-emerald-500/20 pt-2.5 mb-3">
                      <div><span className="text-slate-400">Name:</span> <strong>{form.name}</strong></div>
                      <div><span className="text-slate-400">Contact:</span> <strong>{form.contact}</strong></div>
                      <div><span className="text-slate-400">Project Scope:</span> <strong>{form.project}</strong></div>
                      <div><span className="text-slate-400">Budget Range:</span> <strong>{form.budget}</strong></div>
                    </div>

                    <div className="text-[11px] text-emerald-300 font-bold bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Saved to Admin Portal. Our team will call or email you!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* INPUT FORM FOOTER */}
            <form onSubmit={onSubmit} className="relative z-10 flex items-center gap-2 border-t border-white/10 bg-slate-900/90 p-3 backdrop-blur-xl">
              <button
                type="button"
                onClick={toggleListen}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all focus:outline-none ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
                title={isListening ? "Listening..." : "Voice Input"}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <input
                ref={inputRef}
                name="msg"
                placeholder={
                  isListening
                    ? "Listening to voice..."
                    : step === STEPS.NAME
                    ? "Type your name..."
                    : step === STEPS.CONTACT
                    ? "Enter Email or Phone..."
                    : "Type a message..."
                }
                className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all min-w-0 font-medium"
                maxLength={300}
                autoFocus
              />

              <button
                type="submit"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
