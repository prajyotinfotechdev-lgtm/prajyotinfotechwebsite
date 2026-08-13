import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
/**
 * HelpBot (SAFE MODE, opens every visit)
 * - Auto-opens after 5s on every page load (no session gating)
 * - URL overrides: ?help=1 (open immediately), ?help=0 (disable auto-open)
 * - Plain-text messages only
 * - SSR-safe storage helpers
 * - Backdrop click & Esc to close, basic focus trap
 */

const WHATSAPP_NUMBER = "917020708747"; // country code + number, no "+"
const EMAIL = "prajyotkankal9@gmail.com";

const waLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const STEPS = {
  NAME: "name",
  CONTACT: "contact",
  PROJECT: "project",
  BUDGET: "budget",
  SUMMARY: "summary",
};

const PROJECT_OPTIONS = ["Website", "Mobile App", "SaaS", "E-commerce", "Other"];
const BUDGET_OPTIONS = ["Under ₹30k", "₹30k–₹60k", "₹60k–₹1.5L", "₹1.5L+"];

// Validators
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const phoneRe = /^\+?[0-9()\-\s]{8,}$/;
const isEmail = (v = "") => emailRe.test(v.trim());
const isPhone = (v = "") => phoneRe.test(v.trim());

// ---- SSR-safe storage helpers
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

// utils
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

export default function HelpBot({
  autoOpenAfterMs = 5000, // opens after 5s on every visit
  launcherOffset = { bottom: "6rem", right: "1rem" }, // sits above WhatsApp FAB
  panelOffset = { bottom: "10rem", right: "1rem" },
  zIndex = 200,
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(() => safeGetItem("helpbot:step") || STEPS.NAME);
  const [form, setForm] = useState(() =>
    safeGet("helpbot:form", { name: "", contact: "", project: "", budget: "", notes: "" })
  );
  const [messages, setMessages] = useState(() => safeGet("helpbot:messages_txt", []));
  const [unread, setUnread] = useState(0);

  const listRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // URL overrides
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

  // Auto-open on EVERY visit
  useEffect(() => {
    if (urlFlags.helpOff || !autoOpenAfterMs) return;
    const t = setTimeout(() => {
      setOpen(true);
    }, urlFlags.helpOpen ? 0 : autoOpenAfterMs);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoOpenAfterMs]);

  // When opened: lock scroll, seed first prompt, focus input, focus trap + Esc
  useEffect(() => {
    if (open) setUnread(0);

    let prevOverflow = "";
    if (open) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // seed first prompt once
      if (messages.length === 0) {
        botSay("Great — let’s get a few details. What’s your name?", { meta: "ask:name" });
      } else if (step === STEPS.NAME && !messages.some((m) => m.meta === "ask:name")) {
        botSay("What’s your name?", { meta: "ask:name" });
      }
      // focus input
      setTimeout(() => inputRef.current?.focus(), 0);
    }

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      // focus trap
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter(
          (el) => el.offsetWidth || el.offsetHeight || el === document.activeElement
        );
        if (list.length === 0) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (open) document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Helpers
  const botSay = (text, opts = {}) => {
    const msg = { id: uid(), role: "bot", text: String(text), ts: Date.now(), ...opts };
    setMessages((m) => [...m, msg]);
    if (!open) setUnread((u) => u + 1);
  };
  const userSay = (text) => {
    const msg = { id: uid(), role: "user", text: String(text).trim(), ts: Date.now() };
    setMessages((m) => [...m, msg]);
  };
  const goto = (next) => setStep(next);

  // Build brief
  const buildBrief = (vals = form) => {
    const { name, contact, project, budget, notes } = vals;
    return `New project enquiry — HelpBot

Name: ${name}
Contact: ${contact}
Project type: ${project}
Budget: ${budget}
Notes: ${notes || "-"}`;
  };

  // Flow
  const handleUserInput = (text) => {
    const clean = text.trim();
    if (!clean) return;
    userSay(clean);

    if (step === STEPS.NAME) {
      if (clean.length < 2) return botSay("Please enter at least 2 characters for your name.");
      const nextForm = { ...form, name: clean };
      setForm(nextForm);
      goto(STEPS.CONTACT);
      return botSay("Nice to meet you! What’s your email or WhatsApp number?");
    }

    if (step === STEPS.CONTACT) {
      if (!isEmail(clean) && !isPhone(clean)) return botSay("Enter a valid email or phone number.");
      const nextForm = { ...form, contact: clean };
      setForm(nextForm);
      goto(STEPS.PROJECT);
      return botSay("Got it. What kind of project is this? (Pick an option below)");
    }

    if (step === STEPS.PROJECT) {
      const nextForm = { ...form, project: clean };
      setForm(nextForm);
      goto(STEPS.BUDGET);
      return botSay("Thanks. What’s your rough budget? (Pick an option below)");
    }

    if (step === STEPS.BUDGET) {
      const nextForm = { ...form, budget: clean };
      setForm(nextForm);
      goto(STEPS.SUMMARY);
      return botSay("Here’s your summary below. Type any extra details and send via WhatsApp/Email.");
    }

    if (step === STEPS.SUMMARY) {
      setForm((f) => ({ ...f, notes: (f.notes ? f.notes + "\n" : "") + clean }));
      return botSay("Noted. You can press WhatsApp or Email to send now.");
    }
  };

  // Submit
  const onSubmit = (e) => {
    e.preventDefault();
    const inputEl = e.currentTarget.querySelector("input[name=msg]");
    const text = inputEl?.value || "";
    if (!text.trim()) return;
    handleUserInput(text.trim());
    inputEl.value = "";
  };

  // Quick picks
  const pickProject = (p) => handleUserInput(p);
  const pickBudget = (b) => handleUserInput(b);

  // Reset
  const clearChat = () => {
    setForm({ name: "", contact: "", project: "", budget: "", notes: "" });
    setStep(STEPS.NAME);
    setMessages([]);
    if (open) botSay("Great — let’s get a few details. What’s your name?", { meta: "ask:name" });
    inputRef.current?.focus();
  };

  // Copy brief
  const copyBrief = async () => {
    const text = buildBrief();
    try {
      await navigator.clipboard.writeText(text);
      botSay("Copied summary to clipboard. You can paste it anywhere.");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        botSay("Copied summary to clipboard.");
      } catch {
        botSay("Copy failed—please select and copy manually.");
      } finally {
        document.body.removeChild(ta);
      }
    }
  };

  const brief = buildBrief();

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open help chat"
        className="fixed grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 text-white shadow-2xl shadow-brand-500/40 ring-1 ring-white/20 transition-all hover:shadow-brand-500/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/50 group"
        style={{
          bottom: toCss(launcherOffset.bottom),
          right: toCss(launcherOffset.right),
          zIndex,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        <div className="relative">
          {open ? (
            <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
              <path fill="currentColor" d="M18.3 5.7 12 12l-6.3-6.3-1.4 1.4L10.6 13.4l-6.3 6.3 1.4 1.4L12 14.4l6.3 6.3 1.4-1.4-6.3-6.3 6.3-6.3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden>
              <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12zM8 9h8v2H8V9zm0-3h8v2H8V6zm0 6h5v2H8v-2z" />
            </svg>
          )}
          {unread > 0 && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white shadow-md ring-2 ring-navy-900"
            >
              {unread}
            </motion.span>
          )}
        </div>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy-900/40 backdrop-blur-sm"
            style={{ zIndex: zIndex - 1 }}
            aria-hidden
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 1, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Help chat"
            className="fixed w-[min(100vw-2rem,400px)] overflow-hidden rounded-3xl border border-white/10 bg-navy-900/90 shadow-2xl backdrop-blur-2xl flex flex-col"
            style={{
              bottom: toCss(panelOffset.bottom),
              right: toCss(panelOffset.right),
              zIndex,
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}
          >
            {/* Decorative Glow */}
            <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-brand-500/20 blur-[60px] pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-brand-500/30 blur-md animate-pulse" />
                  <div className="relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-violet-500 text-white shadow-lg">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                      <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-[15px] font-bold text-white tracking-wide">Prajyot AI Assistant</div>
                  <div className="text-xs font-medium text-brand-300 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Online — Quick Setup
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 relative z-10">
                <button
                  onClick={clearChat}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Restart
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto p-4 custom-scrollbar" ref={listRef}>
              <ul className="space-y-4" aria-live="polite">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "bot" && (
                        <div className="mr-2 mt-1 flex-shrink-0">
                          <div className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 text-white shadow-sm">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden><path fill="currentColor" d="M12 2L4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z"/></svg>
                          </div>
                        </div>
                      )}
                      <div
                        className={
                          "inline-block max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-sm " +
                          (m.role === "user"
                            ? "bg-gradient-to-br from-brand-600 to-violet-600 text-white rounded-tr-sm shadow-brand-900/20"
                            : "bg-white/10 border border-white/10 text-white/90 rounded-tl-sm backdrop-blur-md")
                        }
                      >
                        {m.text}
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

            {/* Inline choices */}
            <AnimatePresence>
              {step === STEPS.PROJECT && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex flex-wrap gap-2 pl-10"
                >
                  {PROJECT_OPTIONS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => pickProject(p)}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-brand-600 hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/30"
                    >
                      {p}
                    </button>
                  ))}
                </motion.div>
              )}

              {step === STEPS.BUDGET && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pl-10"
                >
                  <div className="mb-2 text-[10px] font-medium uppercase tracking-wider text-brand-300/80">
                    If unsure, pick the closest range
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => pickBudget(b)}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white transition-all hover:bg-brand-600 hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/30"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === STEPS.SUMMARY && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="mt-5 ml-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-[13px] text-white/90 backdrop-blur-sm shadow-inner"
                >
                  <div className="mb-2 flex items-center gap-2 font-bold text-white">
                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Ready to send
                  </div>
                  <ul className="space-y-1.5 opacity-80 mb-4 text-xs font-medium">
                    <li><span className="text-brand-300">Name:</span> {form.name}</li>
                    <li><span className="text-brand-300">Contact:</span> {form.contact}</li>
                    <li><span className="text-brand-300">Project:</span> {form.project}</li>
                    <li><span className="text-brand-300">Budget:</span> {form.budget}</li>
                  </ul>
                  <div className="mb-3 text-[11px] text-white/50">
                    Add extra details in the chat, or send now:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={waLink(brief)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-3 py-2 text-[11px] font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:scale-105"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                      Send WhatsApp
                    </a>
                    <a
                      href={`mailto:${EMAIL}?subject=${encodeURIComponent("New project enquiry — DigiShop")}&body=${encodeURIComponent(brief)}`}
                      className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-bold text-white transition-all hover:bg-white/20"
                    >
                      Send Email
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="relative z-10 flex items-center gap-2 border-t border-white/10 bg-navy-900/80 p-3 backdrop-blur-md">
            <input
              ref={inputRef}
              name="msg"
              placeholder={
                step === STEPS.NAME
                  ? "Enter your name..."
                  : step === STEPS.CONTACT
                  ? "Email or WhatsApp..."
                  : "Type a message..."
              }
              aria-label="Type your answer"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:border-brand-500 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
              maxLength={300}
              autoFocus
            />
            <button
              type="submit"
              className="group flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-500/20 transition-all hover:scale-105 hover:shadow-brand-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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
