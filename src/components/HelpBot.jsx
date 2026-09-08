// src/components/HelpBot.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createLead } from "../utils/leadStorage.js";
import {
  Bot,
  Sparkles,
  Terminal,
  Send,
  Mic,
  RotateCcw,
  X,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Lock,
  Cpu,
  Radio,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

/**
 * HelpBot - Next-Gen Futuristic Cyber AI Scoping Engine
 * - Futuristic HUD Glassmorphism UI
 * - Cybernetic pulse lighting & terminal status indicators
 * - Voice Input + Frequency Spectrum Visualizer
 * - Direct Supabase Lead Capture + Optional Instant WhatsApp Handshake
 */

const STEPS = {
  NAME: "name",
  CONTACT: "contact",
  PROJECT: "project",
  BUDGET: "budget",
  SUMMARY: "summary",
};

const PROJECT_OPTIONS = [
  { label: "Website / Web App", icon: "🌐", desc: "Corporate / SaaS / Custom Portal", badge: "High Speed" },
  { label: "Mobile Application", icon: "📱", desc: "Android / iOS / Flutter", badge: "Native UI" },
  { label: "Enterprise ERP / CRM", icon: "⚡", desc: "Automated Workflows & Billing", badge: "Custom" },
  { label: "AI & WhatsApp Bot", icon: "🤖", desc: "Intelligent Customer Automation", badge: "New" },
  { label: "UI/UX & Prototyping", icon: "🎨", desc: "Figma Design System & Design", badge: "Design" },
];

const BUDGET_OPTIONS = [
  { label: "₹29,999 - ₹75k", badge: "Starter Tier", desc: "$399 - $999 USD" },
  { label: "₹75k - ₹2.0 Lakhs", badge: "Popular Growth", desc: "$1,000 - $2,500 USD" },
  { label: "₹2.0L - ₹5.0 Lakhs", badge: "Scale Enterprise", desc: "$2,500 - $6,500 USD" },
  { label: "₹5.0 Lakhs+", badge: "Bespoke Suite", desc: "$6,500+ USD" },
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
const WHATSAPP_NUMBER = "917020708747";

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
        botSayAsync(
          `${greeting}! I'm the Prajyot Cyber-Architect AI. Let's scope your custom software project in 4 quick steps. What's your name?`,
          { meta: "ask:name" },
          600
        );
      } else if (step === STEPS.NAME && !messages.some((m) => m.meta === "ask:name")) {
        botSayAsync("What's your full name to start project scoping?", { meta: "ask:name" }, 500);
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
      return botSayAsync(
        `Pleasure to meet you, ${clean.split(" ")[0]}! What is your Phone Number or Email address?`,
        {},
        700
      );
    }

    if (step === STEPS.CONTACT) {
      if (!isEmail(clean) && !isPhone(clean))
        return botSayAsync("Please enter a valid phone number (e.g. +91 9876543210) or email address.", {}, 500);
      const nextForm = { ...form, contact: clean };
      setForm(nextForm);
      goto(STEPS.PROJECT);
      return botSayAsync("Got it! What type of software or web architecture do you want to build?", {}, 700);
    }

    if (step === STEPS.PROJECT) {
      const nextForm = { ...form, project: clean };
      setForm(nextForm);
      goto(STEPS.BUDGET);
      return botSayAsync("Excellent choice. What is your estimated investment range for this project?", {}, 700);
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
        notes: nextForm.notes || "Cyber-AI Assistant Lead",
        source: "Prajyot Cyber-AI Scoping Engine",
      }).catch((err) => console.error("Error saving lead:", err));

      return botSayAsync(
        "🚀 ACCESS GRANTED! Your project inquiry has been encrypted and logged directly into our engineering dashboard. Our technical team will reach out within 2 hours!",
        {},
        900
      );
    }

    if (step === STEPS.SUMMARY) {
      setForm((f) => ({ ...f, notes: (f.notes ? f.notes + "\n" : "") + clean }));
      return botSayAsync("Noted! Additional requirement added to your encrypted project record.", {}, 600);
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
    if (open)
      botSayAsync(
        `${greeting}! I'm the Prajyot Cyber-Architect AI. What's your full name to start scoping?`,
        { meta: "ask:name" },
        600
      );
    inputRef.current?.focus();
  };

  const getStepProgress = () => {
    switch (step) {
      case STEPS.NAME:
        return { step: 1, percent: "25%", label: "STEP 01 // CONTACT IDENTIFIER" };
      case STEPS.CONTACT:
        return { step: 2, percent: "50%", label: "STEP 02 // REACHABILITY PROTOCOL" };
      case STEPS.PROJECT:
        return { step: 3, percent: "75%", label: "STEP 03 // ARCHITECTURE SPEC" };
      case STEPS.BUDGET:
        return { step: 4, percent: "90%", label: "STEP 04 // INVESTMENT ALLOCATION" };
      case STEPS.SUMMARY:
        return { step: 4, percent: "100%", label: "STATUS // ENCRYPTED & SAVED TO CRM" };
      default:
        return { step: 1, percent: "20%", label: "AI ENGINE ACTIVE" };
    }
  };

  const progress = getStepProgress();

  const openWhatsAppNow = () => {
    const waText = encodeURIComponent(
      `Hi Prajyot Infotech! I scoped a project on your website AI Chatbot:\n\n` +
        `👤 Name: ${form.name}\n` +
        `📞 Contact: ${form.contact}\n` +
        `🚀 Project: ${form.project}\n` +
        `💰 Budget: ${form.budget}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* --- FUTURISTIC FLOATING LAUNCHER BUTTON --- */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open AI Architect"
        className="fixed grid h-16 w-16 place-items-center rounded-full bg-gradient-to-tr from-cyan-600 via-brand-600 to-indigo-600 text-white shadow-[0_0_50px_rgba(6,182,212,0.4)] ring-2 ring-cyan-400/40 transition-all hover:shadow-[0_0_70px_rgba(99,102,241,0.7)] group cursor-pointer"
        style={{
          bottom: toCss(launcherOffset.bottom),
          right: toCss(launcherOffset.right),
          zIndex,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-pulse" />
        <div className="relative z-10">
          {open ? (
            <X className="h-7 w-7 stroke-[2.5]" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="h-8 w-8 text-cyan-300" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-950"></span>
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
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
            style={{ zIndex: zIndex - 1 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- CYBER HUD CHAT PANEL --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.94, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ duration: 0.35, type: "spring", damping: 26, stiffness: 320 }}
            ref={panelRef}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto w-auto sm:w-[440px] max-h-[calc(100dvh-1.5rem)] overflow-hidden rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-slate-950/95 shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-3xl flex flex-col font-sans"
            style={{
              bottom: typeof window !== "undefined" && window.innerWidth >= 640 ? toCss(panelOffset.bottom) : undefined,
              right: typeof window !== "undefined" && window.innerWidth >= 640 ? toCss(panelOffset.right) : undefined,
              zIndex,
            }}
          >
            {/* Ambient Cyber Lighting */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-cyan-500/20 blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-indigo-600/20 blur-[90px] pointer-events-none" />

            {/* CYBER HUD HEADER BAR */}
            <div className="relative border-b border-cyan-500/20 bg-slate-900/80 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 blur-sm opacity-80 animate-pulse" />
                    <div className="relative grid size-11 place-items-center rounded-2xl bg-slate-900 text-cyan-400 border border-cyan-500/40 shadow-inner font-black text-lg">
                      <Cpu className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                        <span>Prajyot AI Architect</span>
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        v4.2 PRO
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-400 font-semibold">SYSTEM ONLINE</span>
                      <span>·</span>
                      <span className="text-slate-400">DB ACTIVE</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearChat}
                    className="p-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Reset Scoping Session"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Bar Indicator */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    <span>{progress.label}</span>
                  </span>
                  <span className="text-cyan-400">{progress.percent}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: progress.percent }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>

            {/* MESSAGES CONTAINER */}
            <div className="max-h-[50vh] min-h-[290px] overflow-y-auto p-4 custom-scrollbar space-y-4" ref={listRef}>
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
                          <div className="grid size-7 place-items-center rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 shadow-md text-xs font-bold font-mono">
                            AI
                          </div>
                        </div>
                      )}
                      <div
                        className={
                          "inline-block max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-lg backdrop-blur-md " +
                          (m.role === "user"
                            ? "bg-gradient-to-r from-brand-600 via-indigo-600 to-indigo-700 text-white rounded-tr-xs border border-brand-400/30"
                            : "bg-slate-900/90 border border-slate-800 text-slate-100 rounded-tl-xs")
                        }
                      >
                        {m.text}
                      </div>
                    </motion.li>
                  ))}

                  {/* Cyber Typing Animation */}
                  {isTyping && (
                    <motion.li
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex justify-start"
                    >
                      <div className="mr-2.5 mt-1 shrink-0">
                        <div className="grid size-7 place-items-center rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-400 shadow-md text-xs">
                          AI
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/90 border border-slate-800 rounded-tl-xs backdrop-blur-md px-4 py-3 text-xs text-cyan-400 font-mono">
                        <Radio className="w-3.5 h-3.5 animate-spin" />
                        <span>AI ARCHITECT IS PROCESSING...</span>
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
                    <div className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-cyan-400/90 mb-2">
                      SELECT ARCHITECTURE SPEC:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {PROJECT_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2.5 text-left text-xs font-semibold text-white transition-all hover:bg-slate-850 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{opt.icon}</span>
                            <div>
                              <div className="font-bold text-white group-hover:text-cyan-300 transition">
                                {opt.label}
                              </div>
                              <div className="text-[10px] text-slate-400">{opt.desc}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 font-bold transition">
                            {opt.badge}
                          </span>
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
                    <div className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-indigo-400/90 mb-2">
                      SELECT INVESTMENT ALLOCATION:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex flex-col items-start rounded-xl border border-slate-800 bg-slate-900/80 p-3 transition-all hover:bg-slate-850 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 group cursor-pointer"
                        >
                          <span className="text-[10px] font-mono font-extrabold text-indigo-400 uppercase mb-0.5">
                            {opt.badge}
                          </span>
                          <span className="text-xs font-bold text-white group-hover:text-indigo-300">
                            {opt.label}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono mt-0.5">{opt.desc}</span>
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
                    className="mt-4 ml-9 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-[13px] text-white backdrop-blur-md shadow-xl space-y-3"
                  >
                    <div className="flex items-center gap-2 font-black text-emerald-400 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>INQUIRY ENCRYPTED & SAVED!</span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-200 border-t border-emerald-500/20 pt-2.5 font-mono">
                      <div><span className="text-slate-400">Name:</span> <strong className="text-white">{form.name}</strong></div>
                      <div><span className="text-slate-400">Contact:</span> <strong className="text-white">{form.contact}</strong></div>
                      <div><span className="text-slate-400">Scope:</span> <strong className="text-white">{form.project}</strong></div>
                      <div><span className="text-slate-400">Investment:</span> <strong className="text-white">{form.budget}</strong></div>
                    </div>

                    <div className="text-[11px] text-emerald-300 font-bold bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Logged into Admin Portal. Response in &lt; 2 hrs.</span>
                    </div>

                    <button
                      onClick={openWhatsAppNow}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white py-2.5 px-4 font-semibold text-xs transition-all shadow-md shadow-teal-500/20 cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat Directly on WhatsApp Now</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* INPUT FORM FOOTER */}
            <form onSubmit={onSubmit} className="relative z-10 flex items-center gap-2 border-t border-slate-800 bg-slate-900/90 p-3 backdrop-blur-xl">
              <button
                type="button"
                onClick={toggleListen}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all focus:outline-none cursor-pointer ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-white border border-slate-700"
                }`}
                title={isListening ? "Listening..." : "Voice Input"}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                ref={inputRef}
                name="msg"
                placeholder={
                  isListening
                    ? "Listening to voice input..."
                    : step === STEPS.NAME
                    ? "Type your name..."
                    : step === STEPS.CONTACT
                    ? "Enter Email or Phone..."
                    : "Type custom project detail..."
                }
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all min-w-0 font-medium"
                maxLength={300}
                autoFocus
              />

              <button
                type="submit"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-brand-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
