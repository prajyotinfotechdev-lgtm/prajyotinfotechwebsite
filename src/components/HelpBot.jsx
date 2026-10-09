// src/components/HelpBot.jsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createLead } from "../utils/leadStorage.js";
import {
  Sparkles,
  Send,
  Mic,
  RotateCcw,
  X,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  MessageSquare,
  Clock,
  Copy,
  CheckCheck,
  User,
  Phone,
  Layers,
  Globe,
  Smartphone,
  Cpu,
  Building2,
  HelpCircle,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

/**
 * Prajyot Infotech - Premium Conversational AI Assistant
 * - Elegant luxury dark/purple glassmorphism matching brand identity
 * - Interactive Topic Exploration (Web, Apps, Custom Software, OIBUZ HRMS)
 * - Natural 4-Step Interactive Project Estimation & Lead Scoping
 * - Direct Supabase Lead Capture + 1-Click WhatsApp Handover
 * - Speech-to-Text Voice Input
 * - Fluid Framer Motion transitions with mobile keyboard safety
 */

const WHATSAPP_NUMBER = "917020708747";
const BRAND_NAME = "Prajyot Infotech";

const STEPS = {
  EXPLORE: "explore",
  NAME: "name",
  CONTACT: "contact",
  PROJECT: "project",
  BUDGET: "budget",
  TIMELINE: "timeline",
  SUMMARY: "summary",
};

const TOPIC_SUGGESTIONS = [
  {
    id: "web",
    label: "Website Development",
    icon: Globe,
    desc: "Custom corporate sites, SaaS portals & e-commerce",
    badge: "From ₹29,999",
    color: "from-blue-500/20 to-purple-500/20",
    border: "hover:border-purple-400/50",
  },
  {
    id: "mobile",
    label: "Mobile Apps (iOS & Android)",
    icon: Smartphone,
    desc: "Cross-platform React Native & Flutter apps",
    badge: "From ₹75,000",
    color: "from-purple-500/20 to-indigo-500/20",
    border: "hover:border-indigo-400/50",
  },
  {
    id: "custom",
    label: "Custom Software & ERP",
    icon: Cpu,
    desc: "Bespoke business workflows, APIs & cloud backend",
    badge: "From ₹80,000",
    color: "from-indigo-500/20 to-blue-500/20",
    border: "hover:border-blue-400/50",
  },
  {
    id: "hrms",
    label: "OIBUZ HRMS Suite",
    icon: Building2,
    desc: "Workforce & attendance system for construction & teams",
    badge: "Enterprise",
    color: "from-amber-500/20 to-orange-500/20",
    border: "hover:border-amber-400/50",
  },
  {
    id: "estimate",
    label: "Calculate Project Estimate",
    icon: Zap,
    desc: "4-step interactive quotation & architecture scope",
    badge: "Instant",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "hover:border-emerald-400/50",
  },
];

const PROJECT_OPTIONS = [
  { label: "Website / Web Application", icon: "🌐", desc: "Corporate / SaaS / E-commerce", badge: "High Speed" },
  { label: "Mobile Application", icon: "📱", desc: "iOS, Android, React Native & Flutter", badge: "Cross-Platform" },
  { label: "Enterprise ERP / Custom Software", icon: "⚡", desc: "Tailored Business Automation & APIs", badge: "Custom" },
  { label: "OIBUZ HRMS / Workforce Suite", icon: "🏗️", desc: "Biometric, Attendance, Field Teams", badge: "HRMS" },
  { label: "UI/UX Design & Prototyping", icon: "🎨", desc: "Figma Design Systems & Wireframes", badge: "Design" },
];

const BUDGET_OPTIONS = [
  { label: "₹29,999 – ₹75,000", badge: "Starter Tier", desc: "$399 – $999 USD" },
  { label: "₹75,000 – ₹2,00,000", badge: "Growth Tier", desc: "$1,000 – $2,500 USD" },
  { label: "₹2,00,000 – ₹5,00,000", badge: "Enterprise", desc: "$2,500 – $6,500 USD" },
  { label: "₹5,00,000+", badge: "Bespoke Scale", desc: "$6,500+ USD" },
];

const TIMELINE_OPTIONS = [
  { label: "⚡ ASAP (< 2 Weeks)", badge: "Rush Sprint", desc: "Fast-track engineering sprint" },
  { label: "🚀 3 – 6 Weeks", badge: "Standard Build", desc: "Complete architecture, UI & QA cycle" },
  { label: "🗓️ Flexible / Planning Phase", badge: "Roadmap", desc: "Discovery, wireframing & scoping" },
];

const getScopeTechTags = (project) => {
  const p = (project || "").toLowerCase();
  if (p.includes("web") || p.includes("site") || p.includes("portal"))
    return ["Next.js 14", "React", "Tailwind CSS", "Fast CDN", "SEO Engine"];
  if (p.includes("mobile") || p.includes("app") || p.includes("android") || p.includes("ios"))
    return ["React Native", "Flutter", "iOS & Android", "Offline Sync", "Push Alerts"];
  if (p.includes("hrms") || p.includes("oibuz") || p.includes("workforce"))
    return ["OIBUZ Suite", "Geo-Fencing", "Payroll Engine", "Biometric Sync", "Cloud App"];
  if (p.includes("erp") || p.includes("custom") || p.includes("software"))
    return ["PostgreSQL", "Node.js Microservices", "Role Auth", "REST/GraphQL APIs"];
  if (p.includes("ui") || p.includes("ux") || p.includes("design"))
    return ["Figma Systems", "Interactive Prototype", "Design Tokens", "Usability Testing"];
  return ["Custom Architecture", "High Performance", "Cloud Native", "24/7 Support"];
};

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

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const toCss = (v) => (typeof v === "number" ? `${v}px` : v);

export default function HelpBot({
  autoOpenAfterMs = 0, // Disabled intrusive auto-open so user controls when they want help
  launcherOffset = { bottom: "6rem", right: "1rem" },
  panelOffset = { bottom: "5.5rem", right: "1rem" },
  zIndex = 50,
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(STEPS.EXPLORE);
  const [form, setForm] = useState(() =>
    safeGet("prajyot:helpbot:form", {
      name: "",
      contact: "",
      project: "",
      budget: "",
      timeline: "",
      notes: "",
    })
  );
  const [messages, setMessages] = useState(() => safeGet("prajyot:helpbot:msgs", []));
  const [unread, setUnread] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showGreetingTooltip, setShowGreetingTooltip] = useState(false);

  const recognitionRef = useRef(null);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // Show a gentle greeting tooltip on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreetingTooltip(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Persist form & messages
  useEffect(() => safeSet("prajyot:helpbot:form", form), [form]);
  useEffect(() => {
    safeSet("prajyot:helpbot:msgs", messages);
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isTyping]);

  // Handle escape key and focus management
  useEffect(() => {
    if (open) {
      setUnread(0);
      setShowGreetingTooltip(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }

    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
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
      alert("Voice input is not supported in this browser. Please type your message.");
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
        }, 300);
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

  const botSayAsync = (text, opts = {}, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      botSay(text, opts);
      setIsTyping(false);
    }, delay);
  };

  const userSay = (text) => {
    const msg = { id: uid(), role: "user", text: String(text).trim(), ts: Date.now() };
    setMessages((m) => [...m, msg]);
  };

  const startScoping = (initialProject = "") => {
    setStep(STEPS.NAME);
    if (initialProject) {
      setForm((f) => ({ ...f, project: initialProject }));
    }
    botSayAsync(
      "Awesome! Let's build your tailored project specification in 4 quick steps. To start, what is your name?",
      { meta: "ask:name" },
      400
    );
  };

  // Handle Knowledge Base & General conversational Q&A
  const handleGeneralQA = (cleanText) => {
    const lower = cleanText.toLowerCase();

    // Greeting
    if (/^(hi|hello|hey|greetings|hola|namaste)/i.test(lower)) {
      return botSayAsync(
        "Hello! 👋 Welcome to Prajyot Infotech. How can I help you today? You can ask about our web development, mobile apps, OIBUZ HRMS, or request a quick project estimate!",
        {},
        500
      );
    }

    // Pricing & Cost
    if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("budget") || lower.includes("pricing")) {
      return botSayAsync(
        "Our transparent starting rates:\n• Custom Business Websites: From ₹29,999\n• Mobile Apps (Android/iOS): From ₹75,000\n• Custom Software & Cloud: From ₹80,000\n• OIBUZ HRMS: Customized based on team size.\n\nWould you like an exact estimate for your project?",
        { showEstimateAction: true },
        600
      );
    }

    // Services / What do you do
    if (lower.includes("service") || lower.includes("what do you do") || lower.includes("offer")) {
      return botSayAsync(
        "Prajyot Infotech is a full-cycle software engineering company offering:\n1. 🌐 Web & SaaS App Development\n2. 📱 Android & iOS Mobile Applications\n3. ⚡ Custom Software & ERP Systems\n4. 🏗️ OIBUZ HRMS & Workforce Management\n5. 🎨 UI/UX Design & Architecture Consultation.\n\nWhich service are you interested in?",
        { showServicesAction: true },
        600
      );
    }

    // Location / Where are you based
    if (lower.includes("location") || lower.includes("where") || lower.includes("office") || lower.includes("pune") || lower.includes("address")) {
      return botSayAsync(
        "We are headquartered in Pune, Maharashtra, India, and serve clients globally across India, USA, Middle East, and Europe.",
        {},
        500
      );
    }

    // OIBUZ HRMS
    if (lower.includes("oibuz") || lower.includes("hrms") || lower.includes("construction") || lower.includes("attendance")) {
      return botSayAsync(
        "OIBUZ is our premier workforce management and HRMS suite specially designed for construction companies, contractors, and distributed teams with real-time biometric sync, geo-fencing, and daily wage/payroll automation.",
        { showWhatsAppAction: true },
        600
      );
    }

    // Mobile apps
    if (lower.includes("mobile") || lower.includes("app") || lower.includes("android") || lower.includes("ios") || lower.includes("flutter")) {
      return botSayAsync(
        "We build high-performance mobile applications using React Native and Flutter with native device access, smooth 60fps UI, and secure cloud sync. Would you like to estimate your app build?",
        { showEstimateAction: true },
        600
      );
    }

    // Websites
    if (lower.includes("web") || lower.includes("site") || lower.includes("ecommerce") || lower.includes("nextjs")) {
      return botSayAsync(
        "We engineer high-speed Next.js and React websites with SEO optimization, custom brand design, lead generation forms, and sub-second loading speeds.",
        { showEstimateAction: true },
        600
      );
    }

    // Contact / Phone / WhatsApp / Human
    if (lower.includes("contact") || lower.includes("phone") || lower.includes("call") || lower.includes("talk") || lower.includes("human") || lower.includes("whatsapp")) {
      return botSayAsync(
        `You can connect directly with our technical team:\n📞 WhatsApp/Call: +91 7020708747\n✉️ Email: hr@prajyotinfotech.in\n\nOr click the button below to chat on WhatsApp instantly!`,
        { showWhatsAppAction: true },
        500
      );
    }

    // Default fallback - friendly invitation to scope or contact
    return botSayAsync(
      `Thanks for your message! To give you the most accurate response, would you like to build a quick project estimate or speak with an architect on WhatsApp?`,
      { showGeneralActions: true },
      600
    );
  };

  const handleUserInput = (text) => {
    const clean = text.trim();
    if (!clean) return;
    userSay(clean);

    // If currently exploring (not in scoping step)
    if (step === STEPS.EXPLORE) {
      return handleGeneralQA(clean);
    }

    // Step 1: NAME
    if (step === STEPS.NAME) {
      if (clean.length < 2) {
        return botSayAsync("Please enter at least 2 characters for your name.", {}, 400);
      }
      const nextForm = { ...form, name: clean };
      setForm(nextForm);
      setStep(STEPS.CONTACT);
      return botSayAsync(
        `Nice to meet you, ${clean.split(" ")[0]}! What is your WhatsApp number or Email address so we can share your project specification?`,
        {},
        600
      );
    }

    // Step 2: CONTACT
    if (step === STEPS.CONTACT) {
      if (!isEmail(clean) && !isPhone(clean)) {
        return botSayAsync(
          "Please enter a valid phone number (e.g. +91 9876543210) or email address.",
          {},
          400
        );
      }
      const nextForm = { ...form, contact: clean };
      setForm(nextForm);

      if (nextForm.project) {
        setStep(STEPS.BUDGET);
        return botSayAsync(
          `Great! For your ${nextForm.project}, what is your estimated investment budget?`,
          {},
          600
        );
      } else {
        setStep(STEPS.PROJECT);
        return botSayAsync(
          "Got it! What type of software or digital product would you like to build?",
          {},
          600
        );
      }
    }

    // Step 3: PROJECT
    if (step === STEPS.PROJECT) {
      const nextForm = { ...form, project: clean };
      setForm(nextForm);
      setStep(STEPS.BUDGET);
      return botSayAsync("Great choice! What is your estimated investment budget for this project?", {}, 600);
    }

    // Step 4: BUDGET
    if (step === STEPS.BUDGET) {
      const nextForm = { ...form, budget: clean };
      setForm(nextForm);
      setStep(STEPS.TIMELINE);
      return botSayAsync("Almost done! What is your target launch timeline?", {}, 600);
    }

    // Step 5: TIMELINE
    if (step === STEPS.TIMELINE) {
      const nextForm = { ...form, timeline: clean };
      setForm(nextForm);
      setStep(STEPS.SUMMARY);

      // Persist lead directly into database
      createLead({
        name: nextForm.name,
        contact: nextForm.contact,
        projectType: nextForm.project,
        budget: nextForm.budget,
        notes: `Timeline: ${clean} | ${nextForm.notes || "Assistant Lead"}`,
        source: "Prajyot AI Assistant",
      }).catch((err) => console.error("Error saving lead:", err));

      return botSayAsync(
        "🎉 Project blueprint generated! Our technical architect has received your requirements and will reach out with a detailed roadmap within 2 business hours.",
        {},
        750
      );
    }

    // Step 6: POST-SUMMARY NOTES
    if (step === STEPS.SUMMARY) {
      setForm((f) => ({ ...f, notes: (f.notes ? f.notes + "\n" : "") + clean }));
      return botSayAsync("Noted! Added your notes to your project blueprint.", {}, 500);
    }
  };

  const handleTopicClick = (topic) => {
    if (topic.id === "estimate") {
      startScoping();
      return;
    }

    if (topic.id === "web") {
      userSay("Tell me about Website Development");
      botSayAsync(
        "🌐 Custom Business & Web Applications:\n• Fast Next.js & React builds with SEO optimization\n• Lead capture forms, WhatsApp integration & payment gateway\n• Pricing from ₹29,999 (10–20 days delivery)\n\nWould you like an instant quote for your website?",
        { showEstimateAction: true, projectType: "Website Development" },
        500
      );
      return;
    }

    if (topic.id === "mobile") {
      userSay("Tell me about Mobile App Development");
      botSayAsync(
        "📱 Native & Cross-Platform Mobile Apps:\n• iOS & Android with React Native / Flutter\n• Clean UI/UX, push notifications, offline database & cloud sync\n• Pricing from ₹75,000 (4–8 weeks)\n\nWould you like an estimate for your mobile app?",
        { showEstimateAction: true, projectType: "Mobile Application" },
        500
      );
      return;
    }

    if (topic.id === "custom") {
      userSay("Tell me about Custom Software & ERP");
      botSayAsync(
        "⚡ Bespoke Software & Cloud Architectures:\n• Custom CRM/ERP, automated invoicing, customer portals\n• Robust REST/GraphQL microservices & role-based permissions\n• Pricing from ₹80,000\n\nWould you like to scope your custom software?",
        { showEstimateAction: true, projectType: "Custom Software Development" },
        500
      );
      return;
    }

    if (topic.id === "hrms") {
      userSay("Tell me about OIBUZ HRMS");
      botSayAsync(
        "🏗️ OIBUZ Construction & Enterprise HRMS:\n• GPS geo-fenced attendance, biometric device integration\n• Daily labor wage tracking, contractor billing & real-time reporting\n• Used by top infrastructure & construction teams across India.\n\nWould you like a live demo or quote for OIBUZ?",
        { showWhatsAppAction: true, projectType: "OIBUZ HRMS" },
        500
      );
      return;
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

  const resetChat = () => {
    setForm({ name: "", contact: "", project: "", budget: "", timeline: "", notes: "" });
    setStep(STEPS.EXPLORE);
    setMessages([]);
    inputRef.current?.focus();
  };

  const openWhatsAppNow = () => {
    const waText = encodeURIComponent(
      `Hi Prajyot Infotech! I was on your website AI Assistant:\n\n` +
        (form.name ? `👤 Name: ${form.name}\n` : "") +
        (form.contact ? `📞 Contact: ${form.contact}\n` : "") +
        (form.project ? `🚀 Project: ${form.project}\n` : "") +
        (form.budget ? `💰 Budget: ${form.budget}\n` : "") +
        (form.timeline ? `⏱️ Timeline: ${form.timeline}\n` : "") +
        `\nI'd like to discuss custom development for my project.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, "_blank", "noopener,noreferrer");
  };

  const copySummary = () => {
    const summaryText =
      `PRAJYOT INFOTECH - PROJECT SCOPE BLUEPRINT\n` +
      `==========================================\n` +
      `👤 Client: ${form.name || "Inquirer"}\n` +
      `📞 Contact: ${form.contact || "Provided on WhatsApp"}\n` +
      `🚀 Scope: ${form.project || "Custom Development"}\n` +
      `💎 Investment: ${form.budget || "Discussing"}\n` +
      (form.timeline ? `⏱️ Timeline: ${form.timeline}\n` : "") +
      `⚡ SLA: Review within 2 business hours\n` +
      `🌐 https://prajyotinfotech.in | WhatsApp: +91 7020708747`;

    navigator.clipboard?.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const stepProgress = useMemo(() => {
    switch (step) {
      case STEPS.NAME:
        return { current: 1, total: 4, label: "Step 1 of 4: Your Name" };
      case STEPS.CONTACT:
        return { current: 2, total: 4, label: "Step 2 of 4: Contact Channel" };
      case STEPS.PROJECT:
        return { current: 3, total: 4, label: "Step 3 of 4: Project Scope" };
      case STEPS.BUDGET:
        return { current: 3, total: 4, label: "Step 3 of 4: Investment Budget" };
      case STEPS.TIMELINE:
        return { current: 4, total: 4, label: "Step 4 of 4: Target Launch" };
      case STEPS.SUMMARY:
        return { current: 4, total: 4, label: "Blueprint Complete" };
      default:
        return null;
    }
  }, [step]);

  return (
    <>
      {/* --- GENTLE ONBOARDING GREETING POPOVER (DESKTOP) --- */}
      <AnimatePresence>
        {!open && showGreetingTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed hidden md:flex items-center gap-3 rounded-2xl border border-purple-500/30 bg-slate-950/90 py-2.5 px-4 text-xs text-white shadow-xl shadow-purple-950/50 backdrop-blur-xl"
            style={{
              bottom: `calc(${toCss(launcherOffset.bottom)} + 4.5rem)`,
              right: toCss(launcherOffset.right),
              zIndex: zIndex - 1,
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600/30 text-purple-300">
              <Sparkles className="h-4 w-4 text-purple-300 animate-pulse" />
            </div>
            <div>
              <div className="font-semibold text-slate-100">Need a project estimate?</div>
              <div className="text-[11px] text-purple-300/90">Chat with Prajyot AI in seconds 👋</div>
            </div>
            <button
              onClick={() => setShowGreetingTooltip(false)}
              className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
              aria-label="Dismiss greeting"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING AI LAUNCHER BUTTON --- */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen(true)}
            aria-label="Open Prajyot AI Assistant"
            title="Chat with Prajyot AI Assistant"
            className="fixed grid h-14 w-14 sm:h-15 sm:w-15 place-items-center rounded-full bg-gradient-to-tr from-brand-700 via-purple-600 to-indigo-700 text-white shadow-[0_10px_35px_-5px_rgba(124,58,237,0.55)] ring-2 ring-purple-400/30 transition-all hover:shadow-[0_15px_45px_rgba(147,51,234,0.65)] group cursor-pointer"
            style={{
              bottom: toCss(launcherOffset.bottom),
              right: toCss(launcherOffset.right),
              zIndex,
            }}
          >
            {/* Ambient Backlight Pulse */}
            <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-md group-hover:blur-lg transition-all" />

            <div className="relative z-10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 sm:h-7 sm:w-7 text-purple-100 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-950"></span>
              </span>
            </div>

            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-slate-950"
              >
                {unread}
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- BACKDROP OVERLAY ON MOBILE --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm sm:hidden"
            style={{ zIndex: zIndex - 1 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* --- LUXURY BRAND CHAT PANEL --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, type: "spring", damping: 26, stiffness: 320 }}
            ref={panelRef}
            className="fixed inset-x-3 bottom-3 sm:inset-x-auto w-auto sm:w-[420px] max-h-[88dvh] sm:max-h-[620px] h-[580px] overflow-hidden rounded-3xl border border-purple-500/30 bg-[#0c1124]/95 shadow-[0_20px_70px_-10px_rgba(124,58,237,0.35)] backdrop-blur-2xl flex flex-col font-sans"
            style={{
              bottom: typeof window !== "undefined" && window.innerWidth >= 640 ? toCss(panelOffset.bottom) : undefined,
              right: typeof window !== "undefined" && window.innerWidth >= 640 ? toCss(panelOffset.right) : undefined,
              zIndex,
            }}
          >
            {/* Ambient Background Aura */}
            <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-indigo-600/20 blur-[80px] pointer-events-none" />

            {/* --- HEADER BAR --- */}
            <div className="relative border-b border-purple-500/20 bg-slate-900/80 px-4 py-3.5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-700 via-purple-600 to-indigo-700 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400/40">
                    <img
                      src="/videos/SingleLogo.png"
                      alt="Prajyot Infotech"
                      className="h-6 w-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <Sparkles className="h-5 w-5 text-purple-200" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white tracking-tight">Prajyot AI Assistant</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Official
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-emerald-400 font-medium">Online</span>
                      <span>·</span>
                      <span className="text-slate-400">Replies instantly</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={resetChat}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="Reset Conversation"
                    aria-label="Reset Conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="Close Assistant"
                    aria-label="Close Assistant"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator when in scoping flow */}
              {stepProgress && (
                <div className="mt-2.5 pt-2 border-t border-purple-500/15">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1">
                    <span className="text-purple-300">{stepProgress.label}</span>
                    <span className="text-purple-400 font-semibold">
                      {Math.round((stepProgress.current / stepProgress.total) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-brand-600 to-indigo-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(stepProgress.current / stepProgress.total) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* --- MESSAGES SCROLL CONTAINER --- */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4" ref={listRef}>
              {/* WELCOME BANNER (IF NO MESSAGES YET) */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* Greeting Box */}
                  <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-slate-900/40 p-4 text-slate-200">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
                        <Sparkles className="h-5 w-5 text-purple-300" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">Hi there! 👋 How can we help?</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          I can help you explore our software services, calculate an instant project estimate, or connect directly with our engineering team.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Topic Suggestion Chips */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-semibold text-purple-300/90 uppercase tracking-wider px-1">
                      Explore our capabilities:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {TOPIC_SUGGESTIONS.map((topic, idx) => {
                        const Icon = topic.icon;
                        return (
                          <motion.button
                            key={topic.id}
                            type="button"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 + 0.1 }}
                            onClick={() => handleTopicClick(topic)}
                            className={`flex items-center justify-between rounded-2xl border border-slate-800/90 bg-slate-900/70 p-3 text-left transition-all hover:bg-slate-850 ${topic.border} hover:shadow-lg hover:shadow-purple-950/30 group cursor-pointer`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${topic.color} text-purple-300 border border-purple-500/20 group-hover:scale-105 transition-transform`}>
                                <Icon className="h-4.5 w-4.5" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                                  {topic.label}
                                </div>
                                <div className="text-[11px] text-slate-400 line-clamp-1">{topic.desc}</div>
                              </div>
                            </div>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-950/80 text-purple-300 border border-purple-500/30 shrink-0">
                              {topic.badge}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* MESSAGE HISTORY */}
              <ul className="space-y-3.5">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "bot" && (
                        <div className="mr-2 mt-0.5 shrink-0">
                          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-indigo-800 border border-purple-400/40 text-white shadow-sm">
                            <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                          </div>
                        </div>
                      )}
                      <div className="space-y-2 max-w-[85%]">
                        <div
                          className={`rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed shadow-md backdrop-blur-sm whitespace-pre-line ${
                            m.role === "user"
                              ? "bg-gradient-to-r from-brand-700 via-purple-600 to-indigo-700 text-white rounded-tr-xs border border-purple-400/30"
                              : "bg-slate-900/90 border border-purple-500/20 text-slate-100 rounded-tl-xs"
                          }`}
                        >
                          {m.text}
                        </div>

                        {/* Rich contextual action triggers */}
                        {m.showEstimateAction && (
                          <button
                            type="button"
                            onClick={() => startScoping(m.projectType)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 px-3 py-1.5 text-xs font-semibold text-purple-200 transition cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5 text-purple-300" />
                            <span>Start Quick Estimate</span>
                            <ArrowRight className="w-3 h-3 ml-0.5" />
                          </button>
                        )}

                        {m.showWhatsAppAction && (
                          <button
                            type="button"
                            onClick={openWhatsAppNow}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 px-3 py-1.5 text-xs font-semibold text-emerald-200 transition cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Chat on WhatsApp (+91 7020708747)</span>
                          </button>
                        )}

                        {m.showGeneralActions && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => startScoping()}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 px-2.5 py-1 text-xs font-semibold text-purple-200 transition cursor-pointer"
                            >
                              <Zap className="w-3 h-3 text-purple-300" />
                              <span>Get Project Estimate</span>
                            </button>
                            <button
                              type="button"
                              onClick={openWhatsAppNow}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-400/40 px-2.5 py-1 text-xs font-semibold text-emerald-200 transition cursor-pointer"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-300" />
                              <span>WhatsApp Us</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.li>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.li
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start items-center"
                    >
                      <div className="mr-2 shrink-0">
                        <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-indigo-800 border border-purple-400/40 text-white shadow-sm">
                          <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/20 px-3.5 py-2.5 text-purple-300 rounded-tl-xs">
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </div>
                    </motion.li>
                  )}
                </AnimatePresence>
              </ul>

              {/* --- INTERACTIVE SCOPING CHOICES --- */}
              <AnimatePresence>
                {/* PROJECT OPTIONS */}
                {step === STEPS.PROJECT && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 pl-9 space-y-2"
                  >
                    <div className="text-[11px] font-semibold text-purple-300 uppercase tracking-wider">
                      Select Project Type:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {PROJECT_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-left text-xs text-white transition-all hover:bg-slate-850 hover:border-purple-400/60 hover:shadow-md hover:shadow-purple-950/40 group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{opt.icon}</span>
                            <div>
                              <div className="font-semibold text-white group-hover:text-purple-300 transition">
                                {opt.label}
                              </div>
                              <div className="text-[10px] text-slate-400">{opt.desc}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                            {opt.badge}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* BUDGET OPTIONS */}
                {step === STEPS.BUDGET && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 pl-9 space-y-2"
                  >
                    <div className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider">
                      Select Investment Budget:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex flex-col items-start rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 transition-all hover:bg-slate-850 hover:border-indigo-400/60 hover:shadow-md hover:shadow-indigo-950/40 group cursor-pointer"
                        >
                          <span className="text-[10px] font-bold text-indigo-300 uppercase">
                            {opt.badge}
                          </span>
                          <span className="text-xs font-semibold text-white group-hover:text-indigo-200 mt-0.5">
                            {opt.label}
                          </span>
                          <span className="text-[9px] text-slate-400 mt-0.5">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* TIMELINE OPTIONS */}
                {step === STEPS.TIMELINE && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-2 pl-9 space-y-2"
                  >
                    <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
                      Select Target Timeline:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleUserInput(opt.label)}
                          className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-left text-xs text-white transition-all hover:bg-slate-850 hover:border-amber-400/60 hover:shadow-md hover:shadow-amber-950/40 group cursor-pointer"
                        >
                          <div>
                            <div className="font-semibold text-white group-hover:text-amber-300 transition">
                              {opt.label}
                            </div>
                            <div className="text-[10px] text-slate-400">{opt.desc}</div>
                          </div>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
                            {opt.badge}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PROJECT BLUEPRINT SUMMARY DOSSIER */}
                {step === STEPS.SUMMARY && !isTyping && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 ml-6 sm:ml-9 overflow-hidden rounded-2xl border border-purple-500/30 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 p-4 text-white backdrop-blur-xl shadow-xl shadow-purple-950/40 space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white tracking-wide">
                          Project Blueprint Ready
                        </span>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                        Priority Queue
                      </span>
                    </div>

                    {/* Spec Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <User className="w-3 h-3 text-purple-400" /> Name
                        </span>
                        <span className="font-semibold text-white truncate block mt-0.5">{form.name}</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-400" /> Contact
                        </span>
                        <span className="font-semibold text-emerald-300 truncate block mt-0.5">{form.contact}</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-purple-400" /> Scope
                        </span>
                        <span className="font-semibold text-purple-200 truncate block mt-0.5">{form.project}</span>
                      </div>

                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-400" /> Budget
                        </span>
                        <span className="font-semibold text-amber-300 truncate block mt-0.5">{form.budget}</span>
                      </div>
                    </div>

                    {/* Recommended Stacks */}
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                      <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-purple-400" /> Recommended Architecture:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {getScopeTechTags(form.project).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-purple-950/80 text-[10px] font-medium text-purple-300 border border-purple-500/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* WhatsApp Fast Handover Button */}
                    <button
                      onClick={openWhatsAppNow}
                      className="w-full rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-2.5 text-white font-semibold shadow-lg shadow-emerald-950/50 hover:brightness-110 transition cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span className="text-xs">Chat with Architect on WhatsApp</span>
                      </div>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Copy Blueprint Button */}
                    <button
                      type="button"
                      onClick={copySummary}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white py-1.5 px-3 text-xs transition cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-medium">Blueprint Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy Specification Summary</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* --- COMPOSER INPUT FOOTER --- */}
            <form onSubmit={onSubmit} className="relative z-10 flex items-center gap-2 border-t border-purple-500/20 bg-slate-900/90 p-3 backdrop-blur-xl">
              <button
                type="button"
                onClick={toggleListen}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all focus:outline-none cursor-pointer ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/50"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-750 hover:text-white border border-slate-700/60"
                }`}
                title={isListening ? "Listening... (Click to stop)" : "Voice Input"}
                aria-label={isListening ? "Listening" : "Voice Input"}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                ref={inputRef}
                name="msg"
                placeholder={
                  isListening
                    ? "Listening... speak now"
                    : step === STEPS.NAME
                    ? "Type your name..."
                    : step === STEPS.CONTACT
                    ? "Enter Email or Phone..."
                    : step === STEPS.PROJECT
                    ? "Type your project details..."
                    : step === STEPS.BUDGET
                    ? "Type budget..."
                    : step === STEPS.TIMELINE
                    ? "Type timeline..."
                    : "Ask a question or type a message..."
                }
                className="flex-1 rounded-xl border border-purple-500/30 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-purple-400 focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all min-w-0 font-medium"
                maxLength={300}
                autoFocus
              />

              <button
                type="submit"
                className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 via-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Send Message"
                aria-label="Send Message"
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
