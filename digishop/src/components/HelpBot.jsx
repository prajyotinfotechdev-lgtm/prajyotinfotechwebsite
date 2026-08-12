import React, { useEffect, useRef, useState } from "react";

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
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Open help chat"
        className="fixed grid h-14 w-14 place-items-center rounded-full bg-white text-teal-700 border border-slate-300 shadow-2xl ring-1 ring-black/5 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        style={{
          bottom: toCss(launcherOffset.bottom),
          right: toCss(launcherOffset.right),
          zIndex,
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="relative">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
            <path fill="currentColor" d="M4 4h16v10H7l-3 3V4z" />
          </svg>
          {unread > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-rose-600 px-1 text-[11px] font-semibold text-white">
              {unread}
            </span>
          )}
        </div>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-[1px]"
          style={{ zIndex: zIndex - 1 }}
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Help chat"
          className="fixed w-[min(100vw-1.5rem,380px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          style={{
            bottom: toCss(panelOffset.bottom),
            right: toCss(panelOffset.right),
            zIndex,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                  <path fill="currentColor" d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">How can we help?</div>
                <div className="text-[11px] text-slate-600">We’ll ask a few quick questions</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                Restart
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M18.3 5.7 12 12l-6.3-6.3-1.4 1.4L10.6 13.4l-6.3 6.3 1.4 1.4L12 14.4l6.3 6.3 1.4-1.4-6.3-6.3 6.3-6.3z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="max-h-[55vh] md:max-h-[60vh] overflow-y-auto p-3" ref={listRef}>
            <ul className="space-y-2" aria-live="polite">
              {messages.map((m) => (
                <li key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                  <div
                    className={
                      "inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm " +
                      (m.role === "user"
                        ? "bg-slate-100 text-slate-900"
                        : "bg-white border border-slate-200 text-slate-800")
                    }
                  >
                    {m.text}
                  </div>
                </li>
              ))}
            </ul>

            {/* Inline choices */}
            {step === STEPS.PROJECT && (
              <div className="mt-3 flex flex-wrap gap-2">
                {PROJECT_OPTIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => pickProject(p)}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-white"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {step === STEPS.BUDGET && (
              <div className="mt-3">
                <div className="mb-2 text-xs text-slate-600">
                  (If unsure, pick the closest range.)
                </div>
                <div className="flex flex-wrap gap-2">
                  {BUDGET_OPTIONS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => pickBudget(b)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700 hover:bg-white"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === STEPS.SUMMARY && (
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800">
                <div className="mb-1 font-medium">Here’s your summary:</div>
                <ul className="space-y-1">
                  <li><strong>Name:</strong> {form.name}</li>
                  <li><strong>Contact:</strong> {form.contact}</li>
                  <li><strong>Project:</strong> {form.project}</li>
                  <li><strong>Budget:</strong> {form.budget}</li>
                </ul>
                <div className="mt-2 text-[12px] text-slate-600">
                  Add extra details in the input, then send:
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a
                    href={waLink(brief)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-xl bg-teal-600 px-3 py-2 text-xs font-semibold text-white hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                      "New project enquiry — DigiShop"
                    )}&body=${encodeURIComponent(brief)}`}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    Email
                  </a>
                  <button
                    type="button"
                    onClick={copyBrief}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    Copy Brief
                  </button>
                  <a
                    href="/contact"
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 hover:bg-slate-50"
                  >
                    Edit in form
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white p-2">
            <input
              ref={inputRef}
              name="msg"
              placeholder={
                step === STEPS.NAME
                  ? "Your name"
                  : step === STEPS.CONTACT
                  ? "Email or WhatsApp"
                  : "Type here…"
              }
              aria-label="Type your answer"
              className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              maxLength={300}
              autoFocus
            />
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
