import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  Smartphone,
  CheckCircle2,
  Share2,
  Printer,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Layers,
  ArrowRight,
  MessageSquare,
  Lock,
  Zap,
  Users,
  CreditCard,
  MapPin,
  Bell,
  Cpu,
  Database,
  Cloud,
  FileCheck,
  Send
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

// Platforms
const PLATFORMS = [
  {
    id: "cross-platform",
    name: "Cross-Platform (Flutter / React Native)",
    desc: "Single high-performance codebase powering both iOS and Android. Recommended for 90% of business apps & startups.",
    costMin: 180000,
    costMax: 320000,
    weeks: 6,
    badge: "Most Popular & Cost-Effective"
  },
  {
    id: "android-native",
    name: "Android Native (Kotlin / Jetpack Compose)",
    desc: "Direct Android SDK architecture. Tailored for intense hardware drivers, POS terminals, and Android-specific kiosk deployments.",
    costMin: 150000,
    costMax: 280000,
    weeks: 6,
    badge: "Hardware & POS Optimized"
  },
  {
    id: "ios-native",
    name: "iOS Native (Swift / SwiftUI)",
    desc: "Optimized exclusively for the Apple ecosystem, Apple Watch integration, and maximum CoreML hardware speed.",
    costMin: 190000,
    costMax: 340000,
    weeks: 6,
    badge: "Apple Ecosystem"
  },
  {
    id: "dual-native",
    name: "Dual Native (Separate Swift + Kotlin Codebases)",
    desc: "Two distinct native codebases maintained in parallel. For complex 3D graphics, heavy ARKit, or extreme CPU workloads.",
    costMin: 320000,
    costMax: 580000,
    weeks: 10,
    badge: "Heavy Enterprise / 3D Games"
  }
];

// Authentication Options
const AUTH_OPTIONS = [
  { id: "otp", name: "WhatsApp & SMS Mobile OTP Login", costMin: 15000, costMax: 25000, icon: Smartphone },
  { id: "social", name: "Social Login (Google & Apple ID)", costMin: 12000, costMax: 20000, icon: Users },
  { id: "rbac", name: "Multi-Role RBAC (Admin, Staff, Customer)", costMin: 25000, costMax: 45000, icon: ShieldCheck },
  { id: "biometric", name: "Biometric Auth (FaceID & Fingerprint)", costMin: 15000, costMax: 25000, icon: Lock }
];

// Feature Modules
const FEATURE_MODULES = [
  {
    id: "gps-tracking",
    name: "Live GPS & Real-Time Route Tracking",
    desc: "Swiggy/Uber-style delivery tracking, geofencing, driver navigation, and distance billing.",
    costMin: 35000,
    costMax: 65000,
    icon: MapPin
  },
  {
    id: "payments",
    name: "Payment Gateway & UPI AutoPay",
    desc: "Razorpay, Cashfree, UPI QR codes, Apple In-App Purchases, and automated GST billing.",
    costMin: 25000,
    costMax: 45000,
    icon: CreditCard
  },
  {
    id: "realtime-chat",
    name: "In-App 1-on-1 & Support Chat",
    desc: "Live WebSocket messaging, image/voice note uploads, and customer support ticket routing.",
    costMin: 30000,
    costMax: 55000,
    icon: MessageSquare
  },
  {
    id: "push-notifications",
    name: "Automated Push Notifications & Deep Linking",
    desc: "Firebase Cloud Messaging (FCM) campaigns, order alerts, and context-aware deep links.",
    costMin: 15000,
    costMax: 28000,
    icon: Bell
  },
  {
    id: "offline-sync",
    name: "Offline Caching & Automatic Sync",
    desc: "Allows staff to record entries without internet (SQLite/Room) and syncs seamlessly when back online.",
    costMin: 28000,
    costMax: 48000,
    icon: Zap
  },
  {
    id: "camera-scanner",
    name: "Camera, Barcode & Document Scanner",
    desc: "High-speed camera scanning for inventory barcodes, Aadhaar/PAN OCR, and invoice PDF uploads.",
    costMin: 20000,
    costMax: 35000,
    icon: Layers
  },
  {
    id: "ai-assistant",
    name: "AI Copilot & Smart Recommendations",
    desc: "Gemini / OpenAI integration for conversational search, voice inputs, or automated summaries.",
    costMin: 35000,
    costMax: 60000,
    icon: Cpu
  }
];

// Backend & Admin Options
const BACKEND_OPTIONS = [
  {
    id: "custom-api-admin",
    name: "Custom Node.js / PostgreSQL REST APIs + Web Admin Portal",
    desc: "Robust, horizontally scalable backend with a web-based dashboard to manage orders, catalog, users, and CSV exports.",
    costMin: 65000,
    costMax: 120000,
    weeks: 2
  },
  {
    id: "existing-backend",
    name: "Connect to Existing Backend / Third-Party APIs",
    desc: "We integrate directly with your pre-existing REST/GraphQL APIs, ERP, or legacy database schemas.",
    costMin: 35000,
    costMax: 65000,
    weeks: 1
  }
];

// UI/UX Design Level
const DESIGN_LEVELS = [
  {
    id: "custom-figma",
    name: "Custom Enterprise UI/UX (Figma Prototype + Micro-Interactions)",
    desc: "Bespoke design system, user research, wireframes, interactive mobile prototypes, and custom animations.",
    costMin: 35000,
    costMax: 65000,
    badge: "Recommended for Brand Building"
  },
  {
    id: "standard-ui",
    name: "Standard Modern UI (Clean Material & iOS Guidelines)",
    desc: "Streamlined layout using proven native patterns for rapid time-to-market.",
    costMin: 15000,
    costMax: 30000,
    badge: "Best for Internal Tools & MVPs"
  }
];

const FAQ_ITEMS = [
  {
    q: "How much does it cost to build a mobile app in India in 2026?",
    a: "A professional cross-platform business mobile app (iOS and Android via Flutter/React Native) typically ranges from ₹2,20,000 to ₹5,50,000 depending on features like payment integration, real-time GPS tracking, and custom admin portals. Complex enterprise apps with custom AI integrations or heavy offline syncing can range up to ₹7,50,000+."
  },
  {
    q: "Why do you recommend Flutter / React Native over separate native apps?",
    a: "Cross-platform frameworks allow a single high-quality codebase to compile directly to native ARM machine code on both iOS and Android. This reduces your initial engineering investment by 40-50%, cuts maintenance costs in half, and ensures all feature updates release simultaneously across both app stores."
  },
  {
    q: "Do I get full ownership of the mobile app source code?",
    a: "Yes. 100% full intellectual property (IP) and Git repository transfer is guaranteed upon milestone delivery. You own all Figma design files, mobile app codebases, backend APIs, and database schemas with zero vendor lock-in."
  },
  {
    q: "Who handles publishing the app to the Google Play Store and Apple App Store?",
    a: "Our engineering team manages the complete app submission process. This includes configuring app store signing certificates, privacy manifests, screenshot assets, app descriptions, and navigating Apple/Google review approvals until your app is live."
  },
  {
    q: "What recurring costs should I plan for after launch?",
    a: "Recurring costs include: 1) Google Play Developer account ($25 one-time), 2) Apple Developer Program ($99/year), 3) Cloud server / database hosting (typically ₹1,500 – ₹4,000/month on AWS or DigitalOcean), and 4) Transactional SMS/WhatsApp OTP credits as needed."
  }
];

function formatRupee(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export default function AppCostCalculator() {
  const [selectedPlatform, setSelectedPlatform] = useState(PLATFORMS[0]);
  const [selectedAuth, setSelectedAuth] = useState(["otp", "rbac"]);
  const [selectedFeatures, setSelectedFeatures] = useState(["payments", "push-notifications"]);
  const [selectedBackend, setSelectedBackend] = useState(BACKEND_OPTIONS[0]);
  const [selectedDesign, setSelectedDesign] = useState(DESIGN_LEVELS[0]);

  // Lead State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Toggle helpers
  const toggleAuth = (id) => {
    setSelectedAuth((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Calculations
  const authTotals = useMemo(() => {
    return selectedAuth.reduce(
      (acc, id) => {
        const item = AUTH_OPTIONS.find((x) => x.id === id);
        return {
          min: acc.min + (item ? item.costMin : 0),
          max: acc.max + (item ? item.costMax : 0)
        };
      },
      { min: 0, max: 0 }
    );
  }, [selectedAuth]);

  const featureTotals = useMemo(() => {
    return selectedFeatures.reduce(
      (acc, id) => {
        const item = FEATURE_MODULES.find((x) => x.id === id);
        return {
          min: acc.min + (item ? item.costMin : 0),
          max: acc.max + (item ? item.costMax : 0)
        };
      },
      { min: 0, max: 0 }
    );
  }, [selectedFeatures]);

  const totalCostMin = useMemo(() => {
    return selectedPlatform.costMin + authTotals.min + featureTotals.min + selectedBackend.costMin + selectedDesign.costMin;
  }, [selectedPlatform, authTotals, featureTotals, selectedBackend, selectedDesign]);

  const totalCostMax = useMemo(() => {
    return selectedPlatform.costMax + authTotals.max + featureTotals.max + selectedBackend.costMax + selectedDesign.costMax;
  }, [selectedPlatform, authTotals, featureTotals, selectedBackend, selectedDesign]);

  const totalWeeks = useMemo(() => {
    const featureWeeks = Math.ceil(selectedFeatures.length * 0.7);
    return selectedPlatform.weeks + selectedBackend.weeks + featureWeeks;
  }, [selectedPlatform, selectedBackend, selectedFeatures]);

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const authList = selectedAuth.map((id) => AUTH_OPTIONS.find((x) => x.id === id)?.name).filter(Boolean).join(", ");
      const featureList = selectedFeatures.map((id) => FEATURE_MODULES.find((x) => x.id === id)?.name).filter(Boolean).join(", ");

      const leadPayload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || "app-calculator@prajyotinfotech.in",
        company: formData.company.trim(),
        projectType: `Mobile App: ${selectedPlatform.name}`,
        message: `[Mobile App Cost Calculator]\n• Platform: ${selectedPlatform.name}\n• Est. Cost: ${formatRupee(totalCostMin)} - ${formatRupee(totalCostMax)}\n• Est. Timeline: ${totalWeeks} Weeks\n• Auth: ${authList}\n• Features: ${featureList}\n• Backend: ${selectedBackend.name}\n• Design: ${selectedDesign.name}\n• Notes: ${formData.notes || "None"}`,
        source: "app_cost_calculator_2026"
      };

      await createLead(leadPayload);
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Lead submit notice:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppMessage = () => {
    const featureNames = selectedFeatures.map((id) => FEATURE_MODULES.find((x) => x.id === id)?.name).filter(Boolean).join(", ");
    const text = encodeURIComponent(
      `Hello Prajyot Infotech Team,\n\nI just scoped a mobile app using your Mobile App Cost Calculator:\n\n• *Target Platform:* ${selectedPlatform.name}\n• *Estimated Budget:* ${formatRupee(totalCostMin)} - ${formatRupee(totalCostMax)}\n• *Estimated Timeline:* ~${totalWeeks} Weeks\n• *Selected Features:* ${featureNames || "Standard Modules"}\n• *Backend & Admin:* ${selectedBackend.name}\n\n*My Details:*\n• Name: ${formData.name || "Business Founder"}\n• Company: ${formData.company || "Not Specified"}\n• Contact: ${formData.phone || "N/A"}\n\nPlease share your architecture proposal and let's schedule a technical scoping call.`
    );
    window.open(`https://wa.me/919322673286?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copyEstimateText = () => {
    const text = `Mobile App Project Scope & Estimate - Prajyot Infotech\nPlatform: ${selectedPlatform.name}\nEstimated Budget: ${formatRupee(totalCostMin)} - ${formatRupee(totalCostMax)}\nEstimated Timeline: ~${totalWeeks} Weeks\nSelected Features: ${selectedFeatures.length} Modules\nBackend: ${selectedBackend.name}\n100% Full IP Transfer & 60-Day Bug Warranty Included.\nPune HQ: +91 93226 73286 | https://www.prajyotinfotech.in/tools/app-cost-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mobile App Development Cost Calculator India 2026",
    "url": "https://www.prajyotinfotech.in/tools/app-cost-calculator",
    "description": "Calculate accurate Android and iOS mobile app development costs in India based on Flutter, React Native, GPS, payments, and admin portals.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/#free-tools" },
          { name: "App Cost Calculator", url: "https://www.prajyotinfotech.in/tools/app-cost-calculator" }
        ]}
      />

      <Seo
        title="Mobile App Development Cost Calculator India 2026 — Instant Scope & Pricing | Prajyot Infotech"
        description="Calculate accurate mobile app development costs in India for iOS & Android. Configure Flutter, React Native, GPS tracking, Razorpay, and admin portals with instant WhatsApp scope export."
        keywords="mobile app development cost in India, cost to build an app Pune, app development price calculator 2026, Flutter app cost India, React Native development cost, Android app pricing India"
        path="/tools/app-cost-calculator"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Mobile Sticky Bottom Price Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="text-[11px] text-slate-400 font-mono uppercase">Estimated Cost</div>
          <div className="text-base font-black text-brand-400 font-mono leading-tight">{formatRupee(totalCostMin)}–{formatRupee(totalCostMax)}</div>
          <div className="text-[11px] text-slate-500">~{totalWeeks} weeks</div>
        </div>
        <div className="flex gap-2">
          <button onClick={generateWhatsAppMessage}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer min-h-[44px]">
            <MessageSquare className="w-4 h-4" /> WhatsApp
          </button>
        </div>
      </div>

      <main className="py-20 px-4 pb-28 lg:pb-20 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>2026 Indian Mobile App Rate Index · Live Engineering Calculator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-4 tracking-tight">
              Mobile App Development <span className="text-brand-600">Cost Calculator</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600">
              Configure your platform architecture, user authentication, live feature modules, and admin portal to calculate an instant, transparent development budget in INR.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Interactive Configuration */}
            <div className="lg:col-span-8 space-y-8">
              {/* SECTION 1: PLATFORM */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">1</span>
                    <h2 className="text-xl font-bold text-slate-900">Target Platform Architecture</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Step 1 of 5</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PLATFORMS.map((plat) => {
                    const isSelected = selectedPlatform.id === plat.id;
                    return (
                      <div
                        key={plat.id}
                        onClick={() => setSelectedPlatform(plat)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-brand-600 bg-brand-50/40 shadow-sm ring-1 ring-brand-600/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-100/60 px-2 py-0.5 rounded-full">
                              {plat.badge}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mb-1">{plat.name}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">{plat.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-mono">Baseline:</span>
                          <span className="font-bold text-slate-900 font-mono">
                            {formatRupee(plat.costMin)} – {formatRupee(plat.costMax)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: AUTHENTICATION */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">2</span>
                    <h2 className="text-xl font-bold text-slate-900">User Authentication & Security</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Step 2 of 5</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {AUTH_OPTIONS.map((item) => {
                    const Icon = item.icon;
                    const isChecked = selectedAuth.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleAuth(item.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                          isChecked
                            ? "border-brand-600 bg-brand-50/40 ring-1 ring-brand-600/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isChecked ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xs font-bold text-slate-900">{item.name}</h3>
                          <span className="text-[11px] font-mono text-slate-500">+{formatRupee(item.costMin)}</span>
                        </div>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                          isChecked ? "bg-brand-600 border-brand-600 text-white" : "border-slate-300 bg-white"
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: CORE FEATURE MODULES */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">3</span>
                    <h2 className="text-xl font-bold text-slate-900">Core Feature Modules & APIs</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Step 3 of 5</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {FEATURE_MODULES.map((feat) => {
                    const Icon = feat.icon;
                    const isChecked = selectedFeatures.includes(feat.id);
                    return (
                      <div
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                          isChecked
                            ? "border-brand-600 bg-brand-50/40 ring-1 ring-brand-600/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                          isChecked ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="text-sm font-bold text-slate-900">{feat.name}</h3>
                            <span className="text-[11px] font-mono text-slate-500 font-semibold">
                              +{formatRupee(feat.costMin)}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">{feat.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 4: BACKEND & ADMIN PORTAL */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">4</span>
                    <h2 className="text-xl font-bold text-slate-900">Backend Infrastructure & Super-Admin Web Portal</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Step 4 of 5</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {BACKEND_OPTIONS.map((opt) => {
                    const isSelected = selectedBackend.id === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSelectedBackend(opt)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-brand-600 bg-brand-50/40 shadow-sm ring-1 ring-brand-600/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold text-slate-900">{opt.name}</h3>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">{opt.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-mono">Investment:</span>
                          <span className="font-bold text-slate-900 font-mono">
                            {formatRupee(opt.costMin)} – {formatRupee(opt.costMax)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 5: UI/UX DESIGN FIDELITY */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center">5</span>
                    <h2 className="text-xl font-bold text-slate-900">UI/UX Design Fidelity</h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Step 5 of 5</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DESIGN_LEVELS.map((lvl) => {
                    const isSelected = selectedDesign.id === lvl.id;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => setSelectedDesign(lvl)}
                        className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "border-brand-600 bg-brand-50/40 shadow-sm ring-1 ring-brand-600/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-100/70 px-2 py-0.5 rounded-full inline-block mb-2">
                            {lvl.badge}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mb-1">{lvl.name}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">{lvl.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-mono">Design Scope:</span>
                          <span className="font-bold text-slate-900 font-mono">
                            {formatRupee(lvl.costMin)} – {formatRupee(lvl.costMax)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Live Price Sticky Summary & WhatsApp Lead Capture */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-900/10 border border-slate-800">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400 block mb-1">
                  Estimated Investment
                </span>
                <div className="text-3xl font-black font-mono text-white tracking-tight mb-2">
                  {formatRupee(totalCostMin)} – {formatRupee(totalCostMax)}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Est. Timeline: ~{totalWeeks} Engineering Weeks</span>
                </div>

                {/* Scope Breakdown */}
                <div className="space-y-3 text-xs mb-6 pb-6 border-b border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Platform:</span>
                    <span className="font-semibold text-slate-200 text-right">{selectedPlatform.name.split("(")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Features:</span>
                    <span className="font-semibold text-brand-400">{selectedFeatures.length} Modules</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Auth Systems:</span>
                    <span className="font-semibold text-slate-200">{selectedAuth.length} Selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Source Code:</span>
                    <span className="font-semibold text-emerald-400">100% Day-1 Transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bug Warranty:</span>
                    <span className="font-semibold text-emerald-400">60 Days Included</span>
                  </div>
                </div>

                {/* Actions Suite */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={generateWhatsAppMessage}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Scope to WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={copyEstimateText}
                      className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy Scope"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Proposal Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                {!isSubmitted ? (
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-base font-bold text-slate-900">Request Formal Technical Proposal</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Receive a detailed architecture document and milestone payment schedule.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Deshmukh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98230 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Project Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Logistics SaaS App"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Locking Scope..." : "Lock in Scope & Get Proposal"}</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-4 space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900">Architecture Scope Received!</h3>
                    <p className="text-xs text-slate-600">
                      Our Pune mobile architect will review your configuration and reach out via WhatsApp/call within 2 hours.
                    </p>
                  </div>
                )}
              </div>

              {/* Engineering Guarantees */}
              <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>NDA & Non-Disclosure Protected</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Your mobile app concept and proprietary workflow details are strictly protected under non-disclosure.
                </p>
              </div>
            </div>
          </div>

          {/* MARKET RATE BENCHMARK TABLE (SEO AUTHORITY VECTOR) */}
          <div className="mt-20 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            <div className="max-w-3xl mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                2026 Mobile App Development Cost Benchmarks in India
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                How our engineering-first boutique agency compares against freelancers and legacy IT services companies in Pune and across India.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">Evaluation Criteria</th>
                    <th className="py-3.5 px-4 text-slate-500">Freelancer Market</th>
                    <th className="py-3.5 px-4 text-brand-700 bg-brand-50/60">Prajyot Infotech (Boutique HQ)</th>
                    <th className="py-3.5 px-4 text-slate-500">Legacy IT Giants (TCS/Infosys tier)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Average App Budget</td>
                    <td className="py-3.5 px-4">₹40,000 – ₹1,20,000</td>
                    <td className="py-3.5 px-4 font-bold text-brand-900 bg-brand-50/30">₹2,00,000 – ₹5,50,000</td>
                    <td className="py-3.5 px-4">₹20,00,000 – ₹60,00,000+</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Code Quality & Architecture</td>
                    <td className="py-3.5 px-4">Unstructured, copy-paste templates</td>
                    <td className="py-3.5 px-4 font-semibold text-brand-900 bg-brand-50/30">Clean architecture, state management (Bloc/Riverpod/Zustand), CI/CD</td>
                    <td className="py-3.5 px-4">Over-engineered, heavy bureaucracy</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Delivery Speed</td>
                    <td className="py-3.5 px-4">High risk of abandonment</td>
                    <td className="py-3.5 px-4 font-semibold text-brand-900 bg-brand-50/30">6 to 10 Weeks Rapid Sprint</td>
                    <td className="py-3.5 px-4">6 to 12 Months</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">IP Transfer</td>
                    <td className="py-3.5 px-4">Varies / disputed</td>
                    <td className="py-3.5 px-4 font-semibold text-brand-900 bg-brand-50/30">100% Full IP Transfer on Day 1</td>
                    <td className="py-3.5 px-4">Complex contractual licenses</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">Post-Launch Warranty</td>
                    <td className="py-3.5 px-4">Zero / unreachable</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700 bg-brand-50/30">60-Day Dedicated Bug Warranty</td>
                    <td className="py-3.5 px-4">Expensive AMC retainer (₹1.5L/mo)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQS */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Mobile App Cost & Development FAQs
              </h2>
            </div>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

