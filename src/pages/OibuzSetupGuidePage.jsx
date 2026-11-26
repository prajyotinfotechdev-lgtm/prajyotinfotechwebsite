// src/pages/OibuzSetupGuidePage.jsx
// OIBUZ — Dedicated Bilingual Account Setup Guide Page (/oibuz/setup-guide)
import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  FolderSearch,
  Globe,
  HardHat,
  Headphones,
  KeyRound,
  Languages,
  Lock,
  Mail,
  MailCheck,
  Menu,
  MessageCircle,
  Play,
  RefreshCw,
  Rocket,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Timer,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";
import Seo from "../components/Seo.jsx";
import OibuzSetupTutorial from "../components/OibuzSetupTutorial.jsx";
import OibuzSelfServeCard from "../components/OibuzSelfServeCard.jsx";
import { TUTORIAL_LANGUAGES, resolveCrossLanguageSceneIndex } from "../components/OibuzSetupTutorialData.js";
import { getOibuzRegisterUrl, trackOibuzTrialClick } from "../utils/oibuzLinks.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8";

const RESERVED_SUBDOMAINS = ["www", "app", "api", "admin", "support", "platform"];

function formatTimestamp(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const GUIDE_CONTENT = {
  en: {
    seoTitle: "OIBUZ Account Setup Guide (English & हिंदी) — Step-by-Step Walkthrough",
    seoDesc:
      "Complete guide to setting up your OIBUZ construction workforce workspace at oibuz.in/register. Watch the bilingual English & Hindi video tutorial, check workspace URL rules, email verification tips, and Admin Dashboard setup.",
    backToOibuz: "Back to OIBUZ Overview",
    eyebrow: "Official Account Setup & Onboarding Guide",
    h1Prefix: "Set Up Your OIBUZ Workspace",
    h1Accent: "in Under 2 Minutes.",
    heroSub:
      "Follow the interactive voice-guided video tutorial below or read our complete step-by-step documentation — covering company URL creation, 2-step signup, 24-hour email verification, 14-day free trial activation, and first-day Admin Dashboard setup.",
    primaryCta: "Open oibuz.in/register",
    secondaryCta: "Read Written Steps",
    demoCta: "Need Help? Book Guided Demo",
    quickFacts: [
      { label: "Setup Time", value: "Under 2 Mins", icon: Zap, color: "#f59e0b" },
      { label: "Dedicated Address", value: "company.oibuz.in", icon: Globe, color: "#2563eb" },
      { label: "Free Trial Starts", value: "At Email Verify", icon: Sparkles, color: "#059669" },
      { label: "Audio Narration", value: "English & हिंदी", icon: Headphones, color: "#7c3aed" },
    ],
    navLinks: [
      { label: "Video Guide", href: "#setup-tutorial" },
      { label: "Written Steps", href: "#written-steps" },
      { label: "Rules & Security", href: "#guardrails" },
      { label: "Troubleshooting", href: "#troubleshooting" },
      { label: "After Login", href: "#day-one" },
      { label: "Setup FAQ", href: "#setup-faq" },
    ],
    writtenHeading: "Step-by-Step Account Setup Documentation",
    writtenSub:
      "Prefer reading or sharing instructions with your HR / site admin team? Every step below mirrors the narrated tutorial above — click any video button to jump straight to that step.",
    watchStepBtn: "Watch in Video",
    steps: [
      {
        num: "00",
        visualKey: "email-prep",
        phaseLabel: "Preparation",
        title: "Keep a Valid Work or Personal Email Ready",
        accent: "#0891b2",
        icon: Mail,
        summary:
          "Before opening the registration page, keep a valid, active email inbox handy (for example, ops@yourcompany.in or a standard Gmail/work inbox). Disposable and temporary email providers are automatically rejected for workspace security.",
        bullets: [
          "Accepted: Real business/company domain emails or valid personal emails (Gmail, Outlook, etc.) not already registered on OIBUZ.",
          "Blocked: Temporary or disposable email services (e.g., Mailinator, 10MinuteMail).",
          "Cost to start: Zero payment or credit card required.",
        ],
      },
      {
        num: "01",
        visualKey: "open-register",
        phaseLabel: "Access Signup",
        title: "Visit www.oibuz.in or Open oibuz.in/register Directly",
        accent: "#059669",
        icon: Globe,
        summary:
          "You can begin either from the main OIBUZ homepage by clicking Start Free Trial, or go directly to www.oibuz.in/register in any desktop or mobile browser.",
        bullets: [
          "Homepage path: Open www.oibuz.in → click Start Free Trial.",
          "Direct path: Type www.oibuz.in/register directly to open the Create Account form immediately.",
          "Existing users: If you already have an account, click Sign In at the bottom of the form.",
        ],
      },
      {
        num: "02",
        visualKey: "step1-workspace",
        phaseLabel: "Create Account · Step 1 of 2",
        title: "Enter Organization Name, Preview Your URL & Add Full Name",
        accent: "#2563eb",
        icon: Building2,
        summary:
          "Screen 1 captures your company identity and creates your isolated tenant address on OIBUZ along with your primary administrator profile.",
        bullets: [
          "Organization Name: Enter your company or business name (e.g., Acme Construction). It must be unique on OIBUZ.",
          "Dedicated Workspace URL Preview: OIBUZ previews your company web address live as you type (e.g., acme-construction.oibuz.in).",
          "Reserved names blocked: System words such as www, app, api, admin, support, and platform cannot be used.",
          "Your Full Name: Creates your Primary Administrator profile. Click Continue when ready.",
        ],
      },
      {
        num: "03",
        visualKey: "step2-credentials",
        phaseLabel: "Create Account · Step 2 of 2",
        title: "Set Login Email, Password & Accept Terms",
        accent: "#4f46e5",
        icon: KeyRound,
        summary:
          "Screen 2 configures your sign-in credentials. Need to fix your company name or spelling? Click Back anytime without losing progress.",
        bullets: [
          "Email Address: Enter your valid, unregistered email address.",
          "Password & Confirm Password: Minimum 6 characters required; re-enter exact password to confirm.",
          "Terms & Privacy Policy: Tick 'I agree to the Terms of Service and acknowledge the Privacy Policy' (documents open in a new tab).",
          "Click Create Account once all details look accurate.",
        ],
      },
      {
        num: "04",
        visualKey: "verify-pending",
        phaseLabel: "Email Verification",
        title: "Verify Your Email Address Within 24 Hours",
        accent: "#d97706",
        icon: MailCheck,
        summary:
          "Submitting Create Account shows the 'Check your email' screen. Your account exists at this point, but sign-in remains locked until your email is verified.",
        bullets: [
          "Open the inbox for the email you entered, find the email from OIBUZ, and click the verification link.",
          "24-Hour Expiry: The verification link remains valid for 24 hours.",
          "Didn't see it? Check Spam / Junk first, or click Resend Verification Email (allowed once every 60 seconds).",
          "Login Lock: You cannot log in until email verification is completed.",
        ],
      },
      {
        num: "05",
        visualKey: "verified-trial",
        phaseLabel: "Trial Activation",
        title: "Verification Successful — Workspace Active & 14-Day Trial Starts",
        accent: "#059669",
        icon: Sparkles,
        summary:
          "Clicking the link confirms 'Verification Successful', activates your dedicated workspace automatically, and triggers your 14-day free trial right at verification (not before).",
        bullets: [
          "Your company URL (e.g., acme-construction.oibuz.in) becomes live automatically.",
          "Your 14-day free trial countdown begins strictly upon email verification.",
          "Click Proceed to Login on the confirmation screen.",
        ],
      },
      {
        num: "06",
        visualKey: "signin-dashboard",
        phaseLabel: "First Sign-In",
        title: "Sign In & Enter Your OIBUZ Admin Dashboard",
        accent: "#1a3a6b",
        icon: Settings,
        summary:
          "Log in using your email and password via your company's dedicated URL or the main OIBUZ portal to reach your Admin Command Dashboard.",
        bullets: [
          "Dedicated login or portal login: Both accept the credentials you just verified.",
          "Immediate access to company settings, employee onboarding, and site operations.",
        ],
      },
    ],
    guardrailsHeading: "Important Registration Rules & Security Limits",
    guardrailsSub: "Built-in protections keep every company workspace secure, unique, and spam-free.",
    guardrailCards: [
      {
        title: "Unique Organization & Reserved Words",
        icon: ShieldCheck,
        color: "#2563eb",
        badge: "Subdomain Rule",
        desc: "Every organization gets an exclusive OIBUZ web address. System-reserved words cannot be used as your company name or subdomain:",
        chips: RESERVED_SUBDOMAINS,
      },
      {
        title: "5 Attempts / Hour Rate Limit",
        icon: Timer,
        color: "#7c3aed",
        badge: "Anti-Spam Protection",
        desc: "Up to 5 registration attempts per hour are allowed per session. If you see 'Too many registration attempts', an on-screen countdown timer tells you exactly how long to wait before trying again.",
        chips: [],
      },
      {
        title: "No Disposable / Temporary Emails",
        icon: ShieldAlert,
        color: "#dc2626",
        badge: "Security Policy",
        desc: "Temporary or throwaway email domains are blocked automatically to protect payroll, attendance, and staff records inside your company tenant.",
        chips: [],
      },
      {
        title: "Already Have an Account?",
        icon: User,
        color: "#059669",
        badge: "Duplicate Check",
        desc: "Each email address can register once. If your organization or email is already set up on OIBUZ, click Sign In at the bottom of the registration form instead of creating a duplicate.",
        chips: [],
      },
    ],
    troubleHeading: "Email Verification & Login Troubleshooting",
    troubleSub: "Quick fixes if something stalls between registration and your Admin Dashboard.",
    troubleItems: [
      {
        problem: "Verification email didn't arrive in your Primary Inbox",
        fix: "Wait 30–60 seconds, check Spam, Junk, or Promotions folders, verify you typed your email without a typo, and click Resend Verification Email (available once every 60 seconds).",
      },
      {
        problem: "Can't log in right after clicking Create Account",
        fix: "Expected behavior — accounts remain in 'Pending Verification' until you click the email verification link. Open your inbox first and verify your email.",
      },
      {
        problem: "Verification link says expired (older than 24 hours)",
        fix: "Verification links stay valid for 24 hours. Use the Resend Verification Email option to generate a fresh 24-hour link.",
      },
      {
        problem: "'Too many registration attempts' countdown shown",
        fix: "You hit the 5-attempts-per-hour limit while submitting. Double-check your details and wait for the on-screen countdown timer to reach zero before retrying.",
      },
    ],
    dayOneHeading: "What to Do After Entering Your Admin Dashboard",
    dayOneSub: "Complete these 3 quick actions on Day 1 to take your construction team live.",
    dayOneCards: [
      {
        step: "01",
        title: "Configure Company Settings",
        desc: "Add active construction site locations, set GPS geofence boundaries, configure shifts, and define company leave/approval policies.",
        icon: Settings,
        color: "#2563eb",
      },
      {
        step: "02",
        title: "Add Employees & Assign Roles",
        desc: "Add Ground Workers/Engineers, Site Supervisors/Managers, HR, Finance, and Admin users with base salary & reporting hierarchy.",
        icon: Users,
        color: "#059669",
      },
      {
        step: "03",
        title: "Start Live Site Operations",
        desc: "Have site staff punch in with selfie + GPS, track daily project timesheets, review photo expenses, and run month-end 1-click payroll.",
        icon: HardHat,
        color: "#4f46e5",
      },
    ],
    faqHeading: "Account Setup FAQs",
    faqs: [
      {
        q: "When does my 14-day free trial start?",
        a: "Your 14-day free trial starts only when you click the verification link in your email ('Verification Successful') — not when you first fill out the signup form.",
      },
      {
        q: "Can I use a Gmail or personal email instead of a company domain email?",
        a: "Yes. Both valid work emails and valid personal emails (like Gmail) are accepted, as long as the email isn't already registered and isn't from a temporary/disposable email provider.",
      },
      {
        q: "What is the minimum password length required?",
        a: "Your OIBUZ login password must be at least 6 characters long, and both Password and Confirm Password fields must match.",
      },
      {
        q: "Can I edit my company name or full name during signup?",
        a: "Yes. On Step 2 of Create Account, click the Back button to adjust your Organization Name (which updates your dedicated URL preview) or Your Full Name before creating your account.",
      },
      {
        q: "Why does OIBUZ block words like www, app, api, or admin as Organization Name?",
        a: "Every organization receives a dedicated subdomain (e.g., acme-construction.oibuz.in). System-reserved keywords like www, app, api, admin, support, and platform are blocked so workspace URLs never conflict with core platform routes.",
      },
      {
        q: "How often can I resend the verification email?",
        a: "You can click 'Resend Verification Email' once every 60 seconds. Be sure to check Spam/Junk first in case your mail server filtered it.",
      },
    ],
    bottomHelpTitle: "Still want a live walkthrough with our deployment team?",
    bottomHelpSub: "Reach us directly on WhatsApp or book a 15-minute live setup call — or jump back to inspect full OIBUZ pricing and features.",
    exploreLinks: [
      { label: "OIBUZ Product Overview", to: "/oibuz" },
      { label: "Pricing & Plans", to: "/oibuz#pricing" },
      { label: "5-Role Permissions Matrix", to: "/oibuz#roles" },
      { label: "WhatsApp Support (+91 70207 08747)", href: "https://wa.me/917020708747" },
    ],
  },

  hi: {
    seoTitle: "OIBUZ अकाउंट सेटअप गाइड (हिंदी और English) — स्टेप-बाय-स्टेप ट्यूटोरियल",
    seoDesc:
      "oibuz.in/register पर OIBUZ कंपनी वर्कस्पेस कैसे बनाएं — हिंदी और English वीडियो ट्यूटोरियल, कंपनी URL नियम, ईमेल वेरिफिकेशन, 14-दिन का फ्री ट्रायल और एडमिन डैशबोर्ड लॉगिन की पूरी जानकारी।",
    backToOibuz: "OIBUZ ओवरव्यू पर वापस जाएं",
    eyebrow: "आधिकारिक अकाउंट सेटअप और ऑनबोर्डिंग गाइड",
    h1Prefix: "अपना OIBUZ वर्कस्पेस सेटअप करें",
    h1Accent: "सिर्फ 2 मिनट में।",
    heroSub:
      "नीचे दिया गया वॉइस-सिंक्ड हिंदी/English वीडियो ट्यूटोरियल देखें या पूरा स्टेप-बाय-स्टेप गाइड पढ़ें — कंपनी URL प्रीव्यू से लेकर ईमेल वेरिफिकेशन, 14-दिन के फ्री ट्रायल और एडमिन डैशबोर्ड लॉगिन तक सब कुछ।",
    primaryCta: "oibuz.in/register खोलें",
    secondaryCta: "लिखित स्टेप्स पढ़ें",
    demoCta: "सहायता चाहिए? लाइव डेमो बुक करें",
    quickFacts: [
      { label: "सेटअप समय", value: "2 मिनट से कम", icon: Zap, color: "#f59e0b" },
      { label: "डेडिकेटेड पता", value: "company.oibuz.in", icon: Globe, color: "#2563eb" },
      { label: "फ्री ट्रायल शुरू", value: "वेरिफिकेशन पर", icon: Sparkles, color: "#059669" },
      { label: "ऑडियो भाषा", value: "हिंदी और English", icon: Headphones, color: "#7c3aed" },
    ],
    navLinks: [
      { label: "वीडियो गाइड", href: "#setup-tutorial" },
      { label: "लिखित स्टेप्स", href: "#written-steps" },
      { label: "नियम और सुरक्षा", href: "#guardrails" },
      { label: "समस्या समाधान", href: "#troubleshooting" },
      { label: "लॉगिन के बाद", href: "#day-one" },
      { label: "सेटअप FAQ", href: "#setup-faq" },
    ],
    writtenHeading: "अकाउंट सेटअप का पूरा लिखित गाइड",
    writtenSub:
      "अपनी HR या साइट एडमिन टीम के साथ शेयर करने के लिए हर स्टेप नीचे विस्तार से दिया गया है — किसी भी कार्ड पर 'वीडियो में देखें' दबाकर सीधे उस हिस्से पर जाएं।",
    watchStepBtn: "वीडियो में देखें",
    steps: [
      {
        num: "00",
        visualKey: "pro-tips",
        phaseLabel: "तैयारी",
        title: "वैलिड वर्क या पर्सनल ईमेल एड्रेस तैयार रखें",
        accent: "#0891b2",
        icon: Mail,
        summary:
          "शुरू करने से पहले एक सक्रिय और वैलिड ईमेल एड्रेस तैयार रखें। वर्कस्पेस की सुरक्षा के लिए टेंपररी या डिस्पोजेबल ईमेल एड्रेसेस स्वीकार नहीं किए जाते।",
        bullets: [
          "स्वीकार्य: कंपनी का वर्क ईमेल या वैलिड पर्सनल ईमेल (Gmail आदि) जो पहले से OIBUZ पर रजिस्टर्ड न हो।",
          "ब्लॉक्ड: अस्थायी / डिस्पोजेबल ईमेल डोमेन (जैसे Mailinator, 10MinuteMail)।",
          "क्रेडिट कार्ड की ज़रूरत नहीं।",
        ],
      },
      {
        num: "01",
        visualKey: "open-register",
        phaseLabel: "शुरुआत",
        title: "www.oibuz.in या सीधे oibuz.in/register खोलें",
        accent: "#059669",
        icon: Globe,
        summary:
          "अपने ब्राउज़र में www.oibuz.in खोलें और Start Free Trial चुनें, या सीधे www.oibuz.in/register टाइप करके तुरंत Create Account पेज खोलें।",
        bullets: [
          "होमपेज से: www.oibuz.in खोलें → Start Free Trial पर क्लिक करें।",
          "सीधा लिंक: www.oibuz.in/register से तुरंत रजिस्ट्रेशन फॉर्म खुलता है।",
          "पहले से अकाउंट है? फॉर्म के नीचे दिए गए Sign In विकल्प पर क्लिक करें।",
        ],
      },
      {
        num: "02",
        visualKey: "step1-workspace",
        phaseLabel: "Create Account · स्टेप 1",
        title: "कंपनी का नाम, वर्कस्पेस URL प्रीव्यू और आपका पूरा नाम",
        accent: "#2563eb",
        icon: Building2,
        summary:
          "स्टेप 1 में आपकी कंपनी का यूनिक वर्कस्पेस URL और प्राइमरी एडमिनिस्ट्रेटर प्रोफाइल सेट किया जाता है।",
        bullets: [
          "Organization Name: अपनी कंपनी या बिज़नेस का नाम लिखें। कंपनी का नाम OIBUZ पर यूनिक होना चाहिए।",
          "Dedicated Workspace URL Preview: नाम टाइप करते ही आपका अलग लिंक दिखेगा (जैसे acme-construction.oibuz.in)।",
          "रिज़र्व्ड शब्द ब्लॉक: www, app, api, admin, support, platform जैसे शब्दों का इस्तेमाल नहीं किया जा सकता।",
          "Your Full Name: अपना पूरा नाम दर्ज करें — यह आपका प्राइमरी एडमिन अकाउंट बनता है। फिर Continue दबाएं।",
        ],
      },
      {
        num: "03",
        visualKey: "step2-credentials",
        phaseLabel: "Create Account · स्टेप 2",
        title: "लॉगिन ईमेल, पासवर्ड और Terms स्वीकार करें",
        accent: "#4f46e5",
        icon: KeyRound,
        summary:
          "स्टेप 2 में लॉगिन विवरण सेट करें। अगर कंपनी या अपना नाम बदलना हो तो आप Back बटन से पिछले स्टेप पर जा सकते हैं।",
        bullets: [
          "Email Address: वैलिड ईमेल दर्ज करें जो पहले से OIBUZ पर रजिस्टर न हो।",
          "Password व Confirm Password: कम से कम 6 कैरेक्टर्स का पासवर्ड बनाएं और दोबारा डालकर कन्फर्म करें।",
          "Terms & Privacy Policy: चेकबॉक्स पर टिक करें (दस्तावेज़ नए टैब में खुलते हैं)।",
          "जानकारी जांचकर Create Account बटन दबाएं।",
        ],
      },
      {
        num: "04",
        visualKey: "verify-pending",
        phaseLabel: "ईमेल वेरिफिकेशन",
        title: "24 घंटे के भीतर ईमेल इनबॉक्स से वेरिफाई करें",
        accent: "#d97706",
        icon: MailCheck,
        summary:
          "सबमिट करने के बाद 'Check your email' स्क्रीन दिखेगी। ईमेल वेरिफिकेशन पूरा होने से पहले आप लॉगिन नहीं कर पाएंगे।",
        bullets: [
          "इनबॉक्स में OIBUZ से आया वेरिफिकेशन ईमेल खोलें और लिंक पर क्लिक करें।",
          "24 घंटे वैलिडिटी: वेरिफिकेशन लिंक केवल 24 घंटे तक मान्य रहता है।",
          "ईमेल न दिखे तो Spam/Junk चेक करें या हर 60 सेकंड में 'Resend Verification Email' दबाएं।",
        ],
      },
      {
        num: "05",
        visualKey: "verified-trial",
        phaseLabel: "ट्रायल एक्टिवेशन",
        title: "Verification Successful — 14 दिनों का फ्री ट्रायल शुरू",
        accent: "#059669",
        icon: Sparkles,
        summary:
          "लिंक पर क्लिक करते ही 'Verification Successful' संदेश दिखेगा, आपका कंपनी वर्कस्पेस अपने आप एक्टिवेट होगा और इसी समय आपका 14-दिन का फ्री ट्रायल शुरू होता है।",
        bullets: [
          "ट्रायल फॉर्म भरते समय नहीं, बल्कि ईमेल वेरिफिकेशन पूरा होने पर शुरू होता है।",
          "स्क्रीन पर दिख रहे Proceed to Login बटन पर क्लिक करें।",
        ],
      },
      {
        num: "06",
        visualKey: "signin-dashboard",
        phaseLabel: "एडमिन डैशबोर्ड",
        title: "Sign In करें और साइट ऑपरेशंस शुरू करें",
        accent: "#1a3a6b",
        icon: Settings,
        summary:
          "अपने डेडिकेटेड लॉगिन पेज या मुख्य OIBUZ पोर्टल से रजिस्टर्ड ईमेल और पासवर्ड डालकर Sign In करें और एडमिन डैशबोर्ड में प्रवेश करें।",
        bullets: [
          "यहां से कंपनी सेटिंग्स सेट करें, एम्प्लॉइज जोड़ें और साइट ऑपरेशंस शुरू करें।",
        ],
      },
    ],
    guardrailsHeading: "ज़रूरी नियम और सुरक्षा सीमाएं",
    guardrailsSub: "आपके कंपनी डेटा और वर्कस्पेस को सुरक्षित रखने के लिए बिल्ट-इन नियम।",
    guardrailCards: [
      {
        title: "यूनिक नाम और रिज़र्व्ड शब्द",
        icon: ShieldCheck,
        color: "#2563eb",
        badge: "URL नियम",
        desc: "हर कंपनी को अलग वेब एड्रेस मिलता है। कुछ सिस्टम-रिज़र्व्ड शब्दों का उपयोग कंपनी के नाम में नहीं किया जा सकता:",
        chips: RESERVED_SUBDOMAINS,
      },
      {
        title: "1 घंटे में अधिकतम 5 प्रयास",
        icon: Timer,
        color: "#7c3aed",
        badge: "सुरक्षा सीमा",
        desc: "1 घंटे में अधिकतम 5 रजिस्ट्रेशन प्रयास संभव हैं। सीमा पूरी होने पर स्क्रीन पर काउंटडाउन टाइमर दिखता है कि आपको कितनी देर प्रतीक्षा करनी है।",
        chips: [],
      },
      {
        title: "टेंपररी ईमेल पर रोक",
        icon: ShieldAlert,
        color: "#dc2626",
        badge: "ईमेल सुरक्षा",
        desc: "डिस्पोजेबल या अस्थायी ईमेल डोमेन अपने आप ब्लॉक कर दिए जाते हैं ताकि आपके स्टाफ और पेरोल डेटा की सुरक्षा बनी रहे।",
        chips: [],
      },
      {
        title: "पहले से अकाउंट है?",
        icon: User,
        color: "#059669",
        badge: "Sign In",
        desc: "एक ईमेल से एक ही अकाउंट बनता है। यदि आपका अकाउंट पहले से है, तो नया अकाउंट बनाने के बजाय फॉर्म के नीचे दिए 'Sign In' पर क्लिक करें।",
        chips: [],
      },
    ],
    troubleHeading: "ईमेल वेरिफिकेशन और लॉगिन समस्या समाधान",
    troubleSub: "रजिस्ट्रेशन के दौरान आने वाली आम दिक्कतों के तुरंत समाधान।",
    troubleItems: [
      {
        problem: "प्राइमरी इनबॉक्स में वेरिफिकेशन ईमेल नहीं मिला",
        fix: "30–60 सेकंड प्रतीक्षा करें, Spam या Junk फोल्डर जांचें, ईमेल की स्पेलिंग देखें और हर 60 सेकंड में उपलब्ध 'Resend Verification Email' का उपयोग करें।",
      },
      {
        problem: "अकाउंट बनाने के तुरंत बाद लॉगिन नहीं हो रहा",
        fix: "वेरिफिकेशन पूरा होने तक अकाउंट Pending अवस्था में रहता है। पहले ईमेल इनबॉक्स खोलकर वेरिफिकेशन लिंक पर क्लिक करें।",
      },
      {
        problem: "वेरिफिकेशन लिंक एक्सपायर हो गया (24 घंटे बाद)",
        fix: "लिंक 24 घंटे के लिए मान्य होता है। नया 24-घंटे वाला लिंक पाने के लिए Resend Verification Email चुनें।",
      },
      {
        problem: "'Too many registration attempts' का संदेश दिख रहा है",
        fix: "1 घंटे में 5 प्रयासों की सीमा पूरी होने पर यह सुरक्षा अलर्ट दिखता है। ऑन-स्क्रीन काउंटडाउन पूरा होने तक प्रतीक्षा करें और जानकारी जांचकर दोबारा प्रयास करें।",
      },
    ],
    dayOneHeading: "एडमिन डैशबोर्ड खुलने के बाद पहले दिन क्या करें",
    dayOneSub: "अपनी कंस्ट्रक्शन टीम को लाइव करने के लिए ये 3 आसान काम पूरा करें।",
    dayOneCards: [
      {
        step: "01",
        title: "कंपनी सेटिंग्स कॉन्फ़िगर करें",
        desc: "अपनी सक्रिय कंस्ट्रक्शन साइट्स, GPS जियोफेंस दायरा, शिफ्ट और कंपनी की छुट्टी/अप्रूवल नीतियां सेट करें।",
        icon: Settings,
        color: "#2563eb",
      },
      {
        step: "02",
        title: "एम्प्लॉइज और रोल जोड़ें",
        desc: "साइट वर्कर्स, सुपरवाइजर/मैनेजर, HR, फाइनेंस और एडमिन के प्रोफाइल, वेतन और रिपोर्टिंग स्ट्रक्चर जोड़ें।",
        icon: Users,
        color: "#059669",
      },
      {
        step: "03",
        title: "साइट ऑपरेशंस शुरू करें",
        desc: "लाइव सेल्फी + GPS अटेंडेंस, प्रोजेक्ट टाइमशीट, फोटो खर्च अप्रूवल और 1-क्लिक मासिक पेरोल चलाना शुरू करें।",
        icon: HardHat,
        color: "#4f46e5",
      },
    ],
    faqHeading: "अकाउंट सेटअप से जुड़े सवाल (FAQ)",
    faqs: [
      {
        q: "14 दिनों का फ्री ट्रायल कब शुरू होता है?",
        a: "आपका 14 दिनों का फ्री ट्रायल फॉर्म सबमिट करते समय नहीं, बल्कि ईमेल वेरिफिकेशन पूरा होने ('Verification Successful') के तुरंत बाद शुरू होता है।",
      },
      {
        q: "क्या मैं Gmail या पर्सनल ईमेल का इस्तेमाल कर सकता हूं?",
        a: "हां, कोई भी वैलिड वर्क ईमेल या पर्सनल ईमेल स्वीकार किया जाता है, बस वह पहले से रजिस्टर न हो और कोई टेंपररी/डिस्पोजेबल ईमेल न हो।",
      },
      {
        q: "पासवर्ड कम से कम कितने अक्षरों का होना चाहिए?",
        a: "पासवर्ड कम से कम 6 कैरेक्टर्स का होना आवश्यक है और Confirm Password में वही पासवर्ड दोबारा डालना होगा।",
      },
      {
        q: "क्या रजिस्ट्रेशन के दौरान कंपनी या अपना नाम सुधारा जा सकता है?",
        a: "हां, Create Account के Step 2 पर आप Back बटन क्लिक करके Step 1 में कंपनी का नाम या अपना पूरा नाम बदल सकते हैं।",
      },
      {
        q: "www, app, api, admin जैसे नाम क्यों स्वीकार नहीं होते?",
        a: "हर कंपनी को डेडिकेटेड सबडोमेन (जैसे your-company.oibuz.in) मिलता है, इसलिए सिस्टम के रिज़र्व्ड शब्दों को कंपनी के नाम में इस्तेमाल नहीं किया जा सकता।",
      },
      {
        q: "वेरिफिकेशन ईमेल दोबारा कितनी देर में मंगवा सकते हैं?",
        a: "यदि ईमेल न मिले तो Spam/Junk चेक करें और हर 60 सेकंड में एक बार 'Resend Verification Email' पर क्लिक करें।",
      },
    ],
    bottomHelpTitle: "क्या आप हमारी टीम के साथ लाइव सेटअप सहायता चाहते हैं?",
    bottomHelpSub: "सीधे WhatsApp पर संपर्क करें या 15 मिनट का गाइडेड डेमो बुक करें — या OIBUZ के फीचर्स और प्राइसिंग देखें।",
    exploreLinks: [
      { label: "OIBUZ प्रोडक्ट ओवरव्यू", to: "/oibuz" },
      { label: "प्राइसिंग और प्लान्स", to: "/oibuz#pricing" },
      { label: "5-रोल फीचर्स मैट्रिक्स", to: "/oibuz#roles" },
      { label: "WhatsApp सहायता (+91 70207 08747)", href: "https://wa.me/917020708747" },
    ],
  },
};

export default function OibuzSetupGuidePage() {
  const { openLeadModal } = useLeadModal();
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [jumpRequest, setJumpRequest] = useState(null);

  const c = GUIDE_CONTENT[language] || GUIDE_CONTENT.en;
  const langScenes = TUTORIAL_LANGUAGES[language]?.scenes || TUTORIAL_LANGUAGES.en.scenes;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleOpenDemo = useCallback(() => {
    openLeadModal({
      source: "Oibuz Setup Guide Page - Guided Demo",
      title: "Book a Guided OIBUZ Onboarding Session",
      subtitle: "Need help setting up multiple sites or importing your crew? Our deployment engineers will walk you through live.",
      projectType: "Oibuz Construction HRMS",
    });
  }, [openLeadModal]);

  const handleWatchStep = useCallback((visualKey) => {
    setJumpRequest({ visualKey, seq: Date.now() });
  }, []);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create and Activate Your OIBUZ Account",
    description:
      "Step-by-step guide to creating your OIBUZ company workspace at oibuz.in/register, verifying your email, activating your 14-day free trial, and signing into your Admin Dashboard.",
    totalTime: "PT2M",
    step: GUIDE_CONTENT.en.steps.map((st, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: st.title,
      text: st.summary,
      url: `https://www.prajyotinfotech.in/oibuz/setup-guide#step-${st.num}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased overflow-x-clip">
      <Seo
        title={c.seoTitle}
        description={c.seoDesc}
        keywords="OIBUZ account setup guide, oibuz.in/register tutorial, how to setup oibuz account, oibuz hindi setup video, oibuz construction hrms onboarding"
        path="/oibuz/setup-guide"
        image="/og/og-oibuz.jpg"
        schema={howToSchema}
      />

      {/* ─── DEDICATED HEADER ────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-slate-100"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100/80"
        }`}
      >
        <div className={CONTAINER}>
          <div className="flex items-center justify-between h-16 sm:h-[68px] gap-2">
            {/* Brand + Back link */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link to="/oibuz" className="flex-shrink-0 flex items-center" aria-label="OIBUZ Overview">
                <img
                  src="/images/oibuz-logo.png"
                  alt="OIBUZ"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </Link>
              <span className="text-slate-200 hidden sm:inline">|</span>
              <Link
                to="/oibuz"
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#1a3a6b] transition-colors whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{c.backToOibuz}</span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5" aria-label="Setup guide sections">
              {c.navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs xl:text-sm font-medium text-slate-600 hover:text-[#1a3a6b] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Language Switcher Pill */}
              <div
                className="inline-flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5"
                role="group"
                aria-label="Guide Language"
              >
                {["en", "hi"].map((langKey) => (
                  <button
                    key={langKey}
                    type="button"
                    onClick={() => setLanguage(langKey)}
                    className={`px-2 sm:px-2.5 py-1.5 sm:py-1 rounded-md text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                      language === langKey
                        ? "bg-[#1a3a6b] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {langKey === "en" ? "EN" : "हिंदी"}
                  </button>
                ))}
              </div>

              <a
                href={getOibuzRegisterUrl({ source: "setup_guide_header" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOibuzTrialClick("setup_guide_header")}
                className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-all shadow-sm whitespace-nowrap"
              >
                <span>{c.primaryCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle setup menu"
                aria-expanded={menuOpen}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 min-w-[40px] min-h-[40px] flex items-center justify-center"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white border-t border-slate-100 shadow-lg overflow-y-auto max-h-[calc(100dvh-64px)]"
            >
              <nav className="px-4 pt-3 pb-6 space-y-1">
                <Link
                  to="/oibuz"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-bold text-[#1a3a6b] bg-blue-50/80 rounded-xl min-h-[46px] mb-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{c.backToOibuz}</span>
                </Link>

                {c.navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenuOpen(false);
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50 min-h-[46px]"
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  <a
                    href={getOibuzRegisterUrl({ source: "setup_guide_drawer" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      trackOibuzTrialClick("setup_guide_drawer");
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-bold py-3.5 rounded-xl min-h-[48px]"
                  >
                    <span>{c.primaryCta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleOpenDemo();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a3a6b] text-white text-sm font-semibold py-3 rounded-xl min-h-[46px]"
                  >
                    <span>{c.demoCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── TOP HERO + FEATURED INTERACTIVE VIDEO GUIDE ─────────────────── */}
      <section
        className="relative pt-20 sm:pt-24 pb-8 sm:pb-14 border-b border-slate-200/80 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #f0f5ff 0%, #f8fafc 45%, #ffffff 100%)",
        }}
      >
        {/* Subtle blueprint grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1a3a6b_1px,transparent_1px)] [background-size:20px_20px]"
        />

        <div className={`relative ${CONTAINER}`}>
          {/* Breadcrumb + Language Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Link to="/oibuz" className="hover:text-[#1a3a6b] transition-colors">
                OIBUZ
              </Link>
              <span>/</span>
              <span className="text-[#2563eb] font-bold">
                {language === "hi" ? "सेटअप गाइड" : "Setup Guide"}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-200/80 shadow-2xs text-[11px] font-bold text-[#1a3a6b]">
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>{c.eyebrow}</span>
            </div>
          </div>

          {/* Hero Copy */}
          <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8">
            <h1
              className="font-black text-[#0f1f3d] tracking-tight leading-[1.08] mb-3.5 sm:mb-4"
              style={{ fontSize: "clamp(1.85rem, 4.4vw, 3.35rem)" }}
            >
              {c.h1Prefix}{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {c.h1Accent}
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto mb-6">
              {c.heroSub}
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 mb-6">
              <a
                href={getOibuzRegisterUrl({ source: "setup_guide_hero" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOibuzTrialClick("setup_guide_hero")}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold px-6 sm:px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 text-sm sm:text-base min-h-[48px]"
              >
                <span>{c.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="#written-steps"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("written-steps")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#1a3a6b] hover:bg-[#15305a] text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm sm:text-base min-h-[48px]"
              >
                <span>{c.secondaryCta}</span>
                <ChevronDown className="w-4 h-4 shrink-0" />
              </a>
            </div>

            {/* 4 Quick Fact Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 text-left max-w-4xl mx-auto">
              {c.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="bg-white/95 border border-slate-200/80 rounded-2xl p-3 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3 min-w-0"
                >
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${fact.color}15` }}
                  >
                    <fact.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: fact.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-400 truncate">{fact.label}</p>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0f1f3d] truncate">{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Video Tutorial Right at Top of Page */}
        <OibuzSetupTutorial
          id="setup-tutorial"
          compactHeader={true}
          language={language}
          onLanguageChange={setLanguage}
          externalJumpRequest={jumpRequest}
          onDemoClick={handleOpenDemo}
        />
      </section>

      {/* ─── SECTION 2: COMPLETE WRITTEN STEP-BY-STEP GUIDE ──────────────── */}
      <section id="written-steps" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100 scroll-mt-20">
        <div className={CONTAINER}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2563eb] mb-2.5">
              {language === "hi" ? "स्टेप-बाय-स्टेप दस्तावेज़" : "Written Documentation"}
            </span>
            <h2
              className="font-black text-[#0f1f3d] tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(1.55rem, 3vw, 2.45rem)" }}
            >
              {c.writtenHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{c.writtenSub}</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
            {c.steps.map((st) => {
              const Icon = st.icon;
              const matchIdx = resolveCrossLanguageSceneIndex(st.visualKey, language);
              const matchedScene = langScenes[matchIdx];
              const ts = matchedScene ? formatTimestamp(matchedScene.start) : "00:00";

              return (
                <article
                  key={st.num}
                  id={`step-${st.num}`}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all p-5 sm:p-7 scroll-mt-24"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3.5">
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                        style={{ backgroundColor: `${st.accent}15` }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: st.accent }} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                            style={{ backgroundColor: `${st.accent}15`, color: st.accent }}
                          >
                            {st.num} · {st.phaseLabel}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl font-extrabold text-[#0f1f3d] leading-snug">
                          {st.title}
                        </h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleWatchStep(st.visualKey)}
                      className="self-start sm:self-center shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-[#1a3a6b] transition-all shadow-2xs cursor-pointer min-h-[38px]"
                    >
                      <Play className="w-3.5 h-3.5 fill-current text-blue-600" />
                      <span>{c.watchStepBtn}</span>
                      <span className="font-mono text-[10px] text-slate-400">({ts})</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {st.summary}
                  </p>

                  <ul className="space-y-2">
                    {st.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: `${st.accent}15` }}
                        >
                          <Check className="w-3 h-3" style={{ color: st.accent }} />
                        </div>
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: RULES & SECURITY GUARDRAILS ──────────────────────── */}
      <section
        id="guardrails"
        className="py-12 sm:py-16 lg:py-20 bg-slate-50 border-b border-slate-200/70 scroll-mt-20"
      >
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2563eb] mb-2.5">
              {language === "hi" ? "नियम और सीमाएं" : "Rules & Guardrails"}
            </span>
            <h2
              className="font-black text-[#0f1f3d] tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(1.55rem, 3vw, 2.35rem)" }}
            >
              {c.guardrailsHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">{c.guardrailsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {c.guardrailCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <span
                      className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${card.color}12`, color: card.color }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-extrabold text-[#0f1f3d] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>

                  {card.chips.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {card.chips.map((word) => (
                        <span
                          key={word}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 border border-rose-200 text-xs font-mono font-bold text-rose-700 line-through"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: VERIFICATION TROUBLESHOOTING ─────────────────────── */}
      <section id="troubleshooting" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100 scroll-mt-20">
        <div className={CONTAINER}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 mb-2.5">
                {language === "hi" ? "तुरंत सहायता" : "Troubleshooting"}
              </span>
              <h2
                className="font-black text-[#0f1f3d] tracking-tight leading-tight mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                {c.troubleHeading}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">{c.troubleSub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.troubleItems.map((item) => (
                <div
                  key={item.problem}
                  className="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <FolderSearch className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0f1f3d] leading-snug">
                      {item.problem}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: DAY 1 CHECKLIST AFTER SIGN-IN ────────────────────── */}
      <section
        id="day-one"
        className="py-12 sm:py-16 lg:py-20 scroll-mt-20"
        style={{ background: "linear-gradient(135deg, #f0f5ff 0%, #e8f0fe 100%)" }}
      >
        <div className={CONTAINER}>
          <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2563eb] mb-2.5">
              {language === "hi" ? "डैशबोर्ड ऑनबोर्डिंग" : "Next Steps After Login"}
            </span>
            <h2
              className="font-black text-[#0f1f3d] tracking-tight leading-tight mb-3"
              style={{ fontSize: "clamp(1.55rem, 3vw, 2.35rem)" }}
            >
              {c.dayOneHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">{c.dayOneSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {c.dayOneCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.step}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <span className="text-2xl font-black text-slate-200 font-mono">{card.step}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0f1f3d] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: SETUP FAQs ───────────────────────────────────────── */}
      <section id="setup-faq" className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="mx-auto w-full max-w-[760px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#2563eb] mb-2">
              FAQ
            </span>
            <h2
              className="font-black text-[#0f1f3d] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
              {c.faqHeading}
            </h2>
          </div>

          <div className="space-y-2.5">
            {c.faqs.map((faq, idx) => (
              <div key={faq.q} className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  aria-expanded={openFaq === idx}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left text-sm font-bold text-[#0f1f3d] hover:bg-slate-50 transition-colors min-h-[52px] cursor-pointer"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: LAUNCH WORKSPACE & SUPPORT ───────────────────────── */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:px-8 space-y-6">
          <OibuzSelfServeCard source="setup_guide_bottom_card" />

          <div className="bg-[#0f1f3d] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black mb-1.5">{c.bottomHelpTitle}</h3>
                <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl leading-relaxed">
                  {c.bottomHelpSub}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <a
                  href="https://wa.me/917020708747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Team</span>
                </a>
                <button
                  type="button"
                  onClick={handleOpenDemo}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer min-h-[46px]"
                >
                  <span>{c.demoCta}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2.5">
              {c.exploreLinks.map((lnk) =>
                lnk.href ? (
                  <a
                    key={lnk.label}
                    href={lnk.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-200 hover:text-white bg-white/8 hover:bg-white/15 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    {lnk.label} ↗
                  </a>
                ) : (
                  <Link
                    key={lnk.label}
                    to={lnk.to}
                    className="text-xs font-semibold text-blue-200 hover:text-white bg-white/8 hover:bg-white/15 px-3.5 py-2 rounded-xl transition-colors"
                  >
                    {lnk.label} →
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0a1628] text-white pt-10 pb-24 sm:py-12 border-t border-white/10">
        <div className={CONTAINER}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/oibuz-logo.png"
                alt="OIBUZ"
                className="h-8 w-auto brightness-0 invert"
              />
              <span className="text-xs text-slate-400">
                Account Setup Guide · A Prajyot Infotech Product
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
              <Link to="/oibuz" className="hover:text-white transition-colors">
                OIBUZ Home
              </Link>
              <Link to="/oibuz#pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/products/hrms/resources" className="hover:text-white transition-colors">
                HRMS Docs
              </Link>
              <a
                href={getOibuzRegisterUrl({ source: "setup_guide_footer" })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackOibuzTrialClick("setup_guide_footer")}
                className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
              >
                Register Workspace ↗
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
