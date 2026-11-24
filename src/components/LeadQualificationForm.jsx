// src/components/LeadQualificationForm.jsx
import React, { useState, useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Building2,
  User,
  Phone,
  Mail,
  Briefcase,
  DollarSign,
  Calendar,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

const INDUSTRIES = [
  "Construction & Real Estate",
  "Manufacturing & Engineering",
  "Healthcare & Life Sciences",
  "Retail & E-Commerce",
  "Logistics & Supply Chain",
  "IT & Professional Services",
  "Education & EdTech",
  "Hospitality & Restaurants",
  "Financial Services & FinTech",
  "Other / Diversified Business",
];

const REQUIREMENT_TYPES = [
  { value: "Custom Software Development", label: "Custom Software Development (Web/Desktop/Cloud)" },
  { value: "OIBUZ Construction Management Software", label: "OIBUZ Construction Management Software (ERP/HRMS)" },
  { value: "Business Process Automation", label: "Business Process Automation & System Integration" },
  { value: "Mobile Application", label: "Cross-Platform Mobile App (Android & iOS)" },
  { value: "Enterprise ERP / CRM Suite", label: "Enterprise ERP / CRM System" },
  { value: "Free Business Technology Audit", label: "Comprehensive 2027 Business Tech Audit" },
];

const BUDGET_OPTIONS = [
  "Under ₹1,00,000 (~$1,200)",
  "₹1,00,000 – ₹3,00,000 (~$1,200 – $3,600)",
  "₹3,00,000 – ₹10,00,000 (~$3,600 – $12,000)",
  "₹10,00,000+ ($12,000+ Enterprise Tier)",
  "To Be Decided / Discussion Required",
];

const TIMELINE_OPTIONS = [
  "Immediate (Within 2–4 Weeks)",
  "1 to 3 Months",
  "3 to 6 Months",
  "2027 Strategic Planning",
  "Flexible / Exploratory Phase",
];

export default function LeadQualificationForm({
  initialRequirement = "Free Business Technology Audit",
  source = "2027 Business Growth Campaign — Free Business Tech Audit Landing Page",
  onSuccess,
}) {
  const navigate = useNavigate();
  const formId = useId();

  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    whatsappNumber: "",
    email: "",
    industry: "Construction & Real Estate",
    requirementType: initialRequirement,
    currentChallenge: "",
    estimatedBudget: "₹1,00,000 – ₹3,00,000 (~$1,200 – $3,600)",
    projectTimeline: "1 to 3 Months",
    conditionalDetails: "",
    honeypot: "", // anti-spam bot trap
  });

  const [utmParams, setUtmParams] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  // Update initial requirement if prop changes
  useEffect(() => {
    if (initialRequirement) {
      setFormData((prev) => ({ ...prev, requirementType: initialRequirement }));
    }
  }, [initialRequirement]);

  // Extract UTM parameters on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const utms = {
        utm_source: searchParams.get("utm_source") || "",
        utm_medium: searchParams.get("utm_medium") || "",
        utm_campaign: searchParams.get("utm_campaign") || "",
        utm_term: searchParams.get("utm_term") || "",
        utm_content: searchParams.get("utm_content") || "",
        referrer: document.referrer || "",
      };
      setUtmParams(utms);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!formData.businessName.trim() || formData.businessName.trim().length < 2) {
      errs.businessName = "Please enter your business or company name.";
    }
    const cleanPhone = formData.whatsappNumber.replace(/[\s()-]/g, "");
    if (!cleanPhone || cleanPhone.length < 8) {
      errs.whatsappNumber = "Please enter a valid WhatsApp phone number.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid business email address.";
    }
    if (!formData.currentChallenge.trim() || formData.currentChallenge.trim().length < 10) {
      errs.currentChallenge = "Please share a brief summary of your challenge or goal (min 10 characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");

    // Anti-spam honeypot check
    if (formData.honeypot) {
      console.warn("Spam submission blocked via honeypot.");
      navigate("/thank-you");
      return;
    }

    if (!validate()) {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      const leadPayload = {
        name: formData.fullName.trim(),
        businessName: formData.businessName.trim(),
        contact: `${formData.whatsappNumber.trim()} | ${formData.email.trim()}`,
        whatsappNumber: formData.whatsappNumber.trim(),
        email: formData.email.trim(),
        industry: formData.industry,
        projectType: formData.requirementType,
        requirementType: formData.requirementType,
        budget: formData.estimatedBudget,
        timeline: formData.projectTimeline,
        challenge: formData.currentChallenge.trim(),
        conditionalAnswer: formData.conditionalDetails.trim(),
        source: source,
        utm: utmParams,
        message: `Business Name: ${formData.businessName.trim()}\nIndustry: ${formData.industry}\nRequirement: ${formData.requirementType}\nTimeline: ${formData.projectTimeline}\nSpecific Details: ${formData.conditionalDetails || "N/A"}\nBusiness Challenge: ${formData.currentChallenge.trim()}`,
      };

      const createdRecord = await createLead(leadPayload);

      // Google Analytics conversion event with test-traffic isolation (Zero PII, No artificial value, No internal IDs)
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        try {
          const isTestLead =
            formData.fullName.includes("[TEST-LEAD]") ||
            formData.businessName.includes("[TEST-DO-NOT-PROCESS]");

          window.gtag("event", "generate_lead", {
            event_category: "2027_campaign",
            event_label: formData.requirementType,
            debug_mode: isTestLead,
            traffic_type: isTestLead ? "test" : "production",
            qa_test_lead: isTestLead,
          });
        } catch (gtagErr) {
          console.warn("Analytics event notice:", gtagErr);
        }
      }

      // Store non-sensitive submission snapshot for the Thank You page in session memory
      // Privacy Hardening: fullName and contact details are strictly excluded
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(
          "latest_lead_submission",
          JSON.stringify({
            businessName: formData.businessName.trim(),
            requirementType: formData.requirementType,
            leadId: createdRecord?.id || null,
            submittedAt: createdRecord?.createdAt || new Date().toISOString(),
          })
        );
      }

      if (onSuccess) {
        onSuccess(leadPayload);
      } else {
        navigate("/thank-you");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmissionError(err.message || "Failed to submit enquiry. Please try again or message us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-2xl shadow-slate-200/50 p-6 sm:p-10 text-slate-800">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Complimentary 2027 Tech Consultation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy-900 tracking-tight">
            Apply for Your Free Business Technology Audit
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete the form below. Our principal architects will review your business and deliver an actionable plan.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end text-right shrink-0">
          <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Confidential</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5">NDA protected on request</span>
        </div>
      </div>

      {submissionError && (
        <div role="alert" className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{submissionError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        {/* Anti-spam honeypot (invisible to humans) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={`hp-${formId}`}>Leave this field blank</label>
          <input
            id={`hp-${formId}`}
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Section 1: Contact & Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor={`name-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id={`name-${formId}`}
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                aria-invalid={Boolean(errors.fullName)}
                className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? "border-rose-300 bg-rose-50/30 focus:ring-rose-400"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-brand-500 focus:ring-brand-500/20"
                }`}
              />
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            {errors.fullName && <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>}
          </div>

          {/* Business Name */}
          <div>
            <label htmlFor={`biz-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Business / Company Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id={`biz-${formId}`}
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="e.g. Apex Infra Projects Pvt Ltd"
                aria-invalid={Boolean(errors.businessName)}
                className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.businessName
                    ? "border-rose-300 bg-rose-50/30 focus:ring-rose-400"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-brand-500 focus:ring-brand-500/20"
                }`}
              />
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            {errors.businessName && <p className="mt-1 text-xs text-rose-600">{errors.businessName}</p>}
          </div>

          {/* WhatsApp Number */}
          <div>
            <label htmlFor={`wa-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              WhatsApp Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id={`wa-${formId}`}
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                aria-invalid={Boolean(errors.whatsappNumber)}
                className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.whatsappNumber
                    ? "border-rose-300 bg-rose-50/30 focus:ring-rose-400"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-brand-500 focus:ring-brand-500/20"
                }`}
              />
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
            </div>
            {errors.whatsappNumber ? (
              <p className="mt-1 text-xs text-rose-600">{errors.whatsappNumber}</p>
            ) : (
              <p className="mt-1 text-[11px] text-slate-400">We send audit updates and discovery schedules here.</p>
            )}
          </div>

          {/* Business Email */}
          <div>
            <label htmlFor={`email-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Business Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id={`email-${formId}`}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rajesh@apexinfra.com"
                aria-invalid={Boolean(errors.email)}
                className={`w-full rounded-xl border pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-rose-300 bg-rose-50/30 focus:ring-rose-400"
                    : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-brand-500 focus:ring-brand-500/20"
                }`}
              />
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
          </div>
        </div>

        {/* Section 2: Industry & Requirement Classification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Industry */}
          <div>
            <label htmlFor={`ind-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Industry Domain
            </label>
            <div className="relative">
              <select
                id={`ind-${formId}`}
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Requirement Type */}
          <div>
            <label htmlFor={`req-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Primary Focus Area
            </label>
            <div className="relative">
              <select
                id={`req-${formId}`}
                name="requirementType"
                value={formData.requirementType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {REQUIREMENT_TYPES.map((req) => (
                  <option key={req.value} value={req.value}>
                    {req.label}
                  </option>
                ))}
              </select>
              <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-600 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Conditional Field dynamically adapting to Requirement Type */}
        <AnimatePresence mode="wait">
          {formData.requirementType.includes("OIBUZ") && (
            <motion.div
              key="cond-oibuz"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80"
            >
              <label htmlFor={`oibuz-sites-${formId}`} className="block text-xs font-bold text-amber-950 mb-1">
                Construction Scope: Number of Active Job Sites / Staff
              </label>
              <select
                id={`oibuz-sites-${formId}`}
                name="conditionalDetails"
                value={formData.conditionalDetails}
                onChange={handleChange}
                className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
              >
                <option value="">Select current project scale...</option>
                <option value="1 to 2 Active Sites (Small Contractor)">1 to 2 Active Sites (Small Contractor)</option>
                <option value="3 to 5 Active Sites (Growing Builder)">3 to 5 Active Sites (Growing Builder)</option>
                <option value="6 to 15 Active Sites (Mid-sized Developer)">6 to 15 Active Sites (Mid-sized Developer)</option>
                <option value="15+ Active Sites (Large Infrastructure / EPC)">15+ Active Sites (Large Infrastructure / EPC)</option>
              </select>
            </motion.div>
          )}

          {formData.requirementType.includes("Automation") && (
            <motion.div
              key="cond-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80"
            >
              <label htmlFor={`auto-tools-${formId}`} className="block text-xs font-bold text-emerald-950 mb-1">
                Process Automation: What manual tools are slowing you down?
              </label>
              <input
                id={`auto-tools-${formId}`}
                type="text"
                name="conditionalDetails"
                value={formData.conditionalDetails}
                onChange={handleChange}
                placeholder="e.g. WhatsApp groups for reports, Excel trackers, manual paper invoicing..."
                className="w-full rounded-xl border border-emerald-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              />
            </motion.div>
          )}

          {formData.requirementType.includes("Custom Software") && (
            <motion.div
              key="cond-software"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/80"
            >
              <label htmlFor={`soft-target-${formId}`} className="block text-xs font-bold text-brand-950 mb-1">
                Software Platform Target
              </label>
              <select
                id={`soft-target-${formId}`}
                name="conditionalDetails"
                value={formData.conditionalDetails}
                onChange={handleChange}
                className="w-full rounded-xl border border-brand-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
              >
                <option value="">Select target platform...</option>
                <option value="Web Application & Cloud SaaS">Web Application & Cloud SaaS</option>
                <option value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</option>
                <option value="Combined Web + Mobile Ecosystem">Combined Web + Mobile Ecosystem</option>
                <option value="Desktop / Offline-first Industrial App">Desktop / Offline-first Industrial App</option>
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 3: Current Business Challenge */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor={`challenge-${formId}`} className="block text-xs font-bold text-slate-700">
              Current Business Challenge or Strategic Goal <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-400">Be as specific as possible</span>
          </div>
          <textarea
            id={`challenge-${formId}`}
            name="currentChallenge"
            rows={3}
            value={formData.currentChallenge}
            onChange={handleChange}
            placeholder="Tell us about the current pain points in your operations, manual bottlenecks, system slowdowns, or what you want your digital system to achieve by 2027..."
            aria-invalid={Boolean(errors.currentChallenge)}
            className={`w-full rounded-xl border p-3.5 text-sm focus:outline-none focus:ring-2 transition-all resize-y ${
              errors.currentChallenge
                ? "border-rose-300 bg-rose-50/30 focus:ring-rose-400"
                : "border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white focus:border-brand-500 focus:ring-brand-500/20"
            }`}
          />
          {errors.currentChallenge && (
            <p className="mt-1 text-xs text-rose-600">{errors.currentChallenge}</p>
          )}
        </div>

        {/* Section 4: Budget & Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          {/* Estimated Budget */}
          <div>
            <label htmlFor={`bud-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Estimated Budget Range
            </label>
            <div className="relative">
              <select
                id={`bud-${formId}`}
                name="estimatedBudget"
                value={formData.estimatedBudget}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Expected Project Timeline */}
          <div>
            <label htmlFor={`time-${formId}`} className="block text-xs font-bold text-slate-700 mb-1.5">
              Expected Project Timeline
            </label>
            <div className="relative">
              <select
                id={`time-${formId}`}
                name="projectTimeline"
                value={formData.projectTimeline}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white pl-10 pr-4 py-3 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all appearance-none cursor-pointer"
              >
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Submit Button & Trust Bar */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base text-white shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-brand-600 via-brand-700 to-navy-800 hover:from-brand-700 hover:to-navy-900 shadow-brand-500/25 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99]"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Transmitting Your Application Safely...</span>
              </>
            ) : (
              <>
                <span>Submit & Get Your Free 2027 Business Audit</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Strict zero-spam policy
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Response guaranteed in 24 hours
            </span>
            <span>•</span>
            <span className="text-slate-400">Full IP ownership & confidentiality</span>
          </div>
        </div>
      </form>
    </div>
  );
}

