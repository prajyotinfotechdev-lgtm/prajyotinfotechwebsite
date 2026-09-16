// src/pages/ConstructionHrmsPage.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  Camera,
  Calendar,
  CreditCard,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  Smartphone,
  Sliders,
  ChevronDown,
  ArrowRight,
  Briefcase,
  AlertCircle,
  FileSpreadsheet,
  Layers,
  Compass,
  Check,
  Send,
  Sparkles,
  Phone,
  ScanFace,
  Mail,
  UserCheck,
  HardHat,
  Eye,
  Lock,
  Workflow,
  BarChart3,
  Server,
  Zap,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  Activity,
  CheckSquare,
  XCircle,
  Clock3,
  Rocket,
  Award,
  HelpCircle,
  Play,
  X,
  UserCheck2,
  ChevronUp,
  ExternalLink
} from "lucide-react";

import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { createLead } from "../utils/leadStorage.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WHATSAPP_NUMBER = "917020708747";

// Industry options for demo form
const INDUSTRY_OPTIONS = [
  "Growing Businesses & SMEs",
  "Field-Connected Operations",
  "Construction & Contracting",
  "EPC (Engineering, Procurement, Construction)",
  "Infrastructure & Public Works",
  "Project-Based Engineering",
  "Multi-Location Field Services",
  "Manufacturing & Plant Operations",
  "Other Growing Organization",
];

const EMPLOYEE_RANGES = [
  "25 - 75 Employees",
  "76 - 200 Employees",
  "201 - 500 Employees",
  "501 - 1,500 Employees",
  "1,500+ Employees (Enterprise)",
];

const WORKFORCE_RANGES = [
  "Single Location / Office",
  "2 - 5 Field Sites / Offices",
  "6 - 15 Distributed Sites",
  "15+ Multi-Region Locations",
];

export default function ConstructionHrmsPage() {
  const { openLeadModal } = useLeadModal();

  // Active role for Hero UI Dashboard Preview
  const [heroRole, setHeroRole] = useState("manager");

  // Active tab for Section 16 Product Dashboard Showcase
  const [activeScreenTab, setActiveScreenTab] = useState("attendance");

  // 60-Second Video / Interactive Demo Modal State
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Selected site for Section 09 field demo
  const [selectedSiteIndex, setSelectedSiteIndex] = useState(0);

  // Industry Vertical Tab State
  const [activeIndustryTab, setActiveIndustryTab] = useState("construction");

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Before/After Slider State
  const [sliderPos, setSliderPos] = useState(50);

  // ROI Calculator State
  const [roiWorkers, setRoiWorkers] = useState(200);
  const [roiWage, setRoiWage] = useState(800);
  const monthlyLeakage = Math.round(roiWorkers * roiWage * 26 * 0.03);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    email: "",
    phone: "",
    employeeCount: EMPLOYEE_RANGES[1],
    workforceType: WORKFORCE_RANGES[1],
    industry: INDUSTRY_OPTIONS[0],
    message: "",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setFormError("Please provide your Name, Email, and Phone number.");
      return;
    }

    setFormSubmitting(true);
    setFormError("");

    try {
      const detailedMessage = `[Oibuz HRMS Demo Request]
Company: ${formData.company || "N/A"}
Designation: ${formData.designation || "N/A"}
Staff Size: ${formData.employeeCount}
Workforce Setup: ${formData.workforceType}
Industry: ${formData.industry}
Work Email: ${formData.email}
Phone: ${formData.phone}
Notes: ${formData.message || "Requested product demo for Oibuz HRMS."}`;

      await createLead({
        name: formData.name.trim(),
        contact: `${formData.phone.trim()} | ${formData.email.trim()}`,
        projectType: "Oibuz HRMS - Product Demo",
        budget: `${formData.employeeCount} (${formData.industry})`,
        message: detailedMessage,
        source: "Oibuz HRMS Landing Page",
      });

      setFormSubmitted(true);
    } catch (err) {
      console.error("Demo submission failed:", err);
      setFormError(err.message || "Failed to submit demo request. Please contact us directly via WhatsApp.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const openWhatsAppDemo = () => {
    const text = encodeURIComponent(
      `Hi OI HRMS SOLUTIONS / Prajyot Infotech! I would like to schedule a demo of Oibuz HRMS.\n\n` +
      `👤 Name: ${formData.name || "Interested Leader"}\n` +
      `🏢 Company: ${formData.company || "Organization"}\n` +
      `👷 Staff Size: ${formData.employeeCount}\n` +
      `📍 Setup: ${formData.workforceType}\n` +
      `📞 Contact: ${formData.phone || "Via WhatsApp"}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const scrollToForm = () => {
    const el = document.getElementById("demo-request-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToSolution = () => {
    const el = document.getElementById("solution-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // FAQ List for display & JSON-LD schema
  const faqList = [
    {
      q: "What is Oibuz HRMS?",
      a: "Oibuz HRMS (On-field Integration for Business & User Zeal) is a modern, cloud-based Human Resources Management System developed by OI HRMS SOLUTIONS. It brings employee records, attendance, leave, timesheets, reimbursements, payroll, and approvals into one connected workforce platform."
    },
    {
      q: "What does OIBUZ stand for?",
      a: "OIBUZ stands for On-field Integration for Business & User Zeal. It represents our core mission: connecting people, processes, and workforce operations into one platform so that desk-bound and field-connected teams can collaborate seamlessly."
    },
    {
      q: "Who is Oibuz HRMS designed for?",
      a: "Oibuz HRMS is designed for growing organizations (50 to 500+ employees), including field-connected teams, project-based workforces, construction & EPC firms, infrastructure businesses, multi-location enterprises, and businesses requiring structured Manager → HR approvals."
    },
    {
      q: "How does Attendance Management work in Oibuz HRMS?",
      a: "Employees check in via mobile or desktop. The system captures time, point-in-time geographic location (GPS), and optional selfie verification. It eliminates paper registers and buddy punching while keeping clear attendance histories for manager review."
    },
    {
      q: "Does Oibuz HRMS enforce strict geofencing or location perimeters?",
      a: "Oibuz HRMS uses point-in-time GPS location capturing along with selfie verification during punch-in/out to provide location-aware attendance. It does not enforce strict perimeter-based geofence blocks."
    },
    {
      q: "How are leave and expense reimbursements approved?",
      a: "Oibuz HRMS provides structured approval workflows. Leave requests route from Employee → Manager → HR. Reimbursement requests route through a controlled Employee → Manager → HR → Finance flow with receipt attachments and status tracking."
    },
    {
      q: "Does Oibuz HRMS manage payroll and payslips?",
      a: "Yes. You can configure salary structures with Basic, HRA, Allowances, PF, and PT components. Once monthly attendance and leaves are finalized, HR can execute payroll runs, generate draft calculations, finalize the run, and publish individual employee payslips."
    },
    {
      q: "What roles are supported in Oibuz HRMS?",
      a: "The system provides role-based access for four distinct profiles: Employee (self-service profile, punch, leave, timesheet, payslips), Manager (team attendance, approvals, timesheets), HR (organization summary, approvals, payroll, employee management), and Admin (system configuration, full access, audit logs)."
    },
    {
      q: "Is Oibuz HRMS cloud-based?",
      a: "Yes. Oibuz HRMS is a 100% cloud-based software accessible securely via any modern web browser or mobile device, enabling real-time synchronization between offices, project sites, and remote teams."
    },
    {
      q: "How do we get started or request a live demo?",
      a: "You can click 'Book a Demo' on this page or fill out the quick contact form. Our technical team at OI HRMS SOLUTIONS will schedule a live walkthrough tailored to your workforce structure."
    }
  ];

  // Comprehensive Structured Data Schema for Google Search Engine Optimization (SoftwareApplication + FAQPage)
  const hrmsSchema = useMemo(() => ([
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Oibuz HRMS",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Mobile Browser, iOS, Android",
      "description": "Oibuz HRMS connects employee management, attendance, leave, timesheets, reimbursements, payroll and approvals into one connected workforce platform.",
      "brand": {
        "@type": "Brand",
        "name": "OI HRMS SOLUTIONS",
        "url": "https://www.prajyotinfotech.in/products/hrms"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Custom enterprise deployment for growing organizations."
      },
      "featureList": [
        "Employee Management",
        "Point-in-time GPS & Selfie Attendance",
        "Leave Management",
        "Timesheets & Project Hours",
        "Reimbursement Approvals",
        "Payroll & Payslips Generation",
        "Multi-Level Approval Workflows",
        "Workforce Reports & Analytics",
        "Role-Based Access Control",
        "System Audit Logs"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqList.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ]), [faqList]);

  // Demo walkthrough steps for the interactive tour modal
  const tourSteps = [
    {
      title: "1. Mobile Check-In & GPS Punch",
      subtitle: "Point-in-Time GPS Location + Selfie Verification",
      desc: "Employees check in from mobile browsers or apps. The system records the precise timestamp, location coordinates, and selfie snapshot to create an audit-proof check-in log.",
      badge: "ATTENDANCE MODULE"
    },
    {
      title: "2. Manager Team Dashboard & Approval Queue",
      subtitle: "Real-Time Direct Report Oversight",
      desc: "Managers see active team headcount, check-in exceptions, pending leave requests, and task timesheets in one unified operational queue.",
      badge: "MANAGER CONSOLE"
    },
    {
      title: "3. Multi-Level Approval Routing",
      subtitle: "Employee → Manager → HR → Finance",
      desc: "Leave applications and expense reimbursement claims automatically route through authorized approval steps with immutable status tracking.",
      badge: "WORKFLOW ENGINE"
    },
    {
      title: "4. Monthly Payroll Execution & Payslips",
      subtitle: "Attendance-Linked Wage Consolidation",
      desc: "Configured salary structures (Basic, HRA, Allowances, PF, PT) combine with verified attendance days to run monthly payroll and publish employee payslips.",
      badge: "PAYROLL ENGINE"
    }
  ];

  return (
    <>
      {/* SEO Metadata */}
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Products", url: "https://www.prajyotinfotech.in/products/hrms" },
          { name: "Oibuz HRMS", url: "https://www.prajyotinfotech.in/products/hrms" }
        ]}
      />

      <Seo
        title="Oibuz HRMS | Cloud HRMS for Growing & Field-Connected Workforces"
        description="Oibuz HRMS helps growing organizations manage employees, attendance, leave, timesheets, reimbursements, payroll and approvals from one connected workforce platform."
        keywords="Oibuz HRMS, HRMS software, employee management, attendance management, payroll software, leave management, timesheet management, HR software, workforce management, field workforce management, Pune HRMS, India HRMS, OI HRMS SOLUTIONS"
        path="/products/hrms"
        image="https://www.prajyotinfotech.in/og/og-default.jpg"
        schema={hrmsSchema}
      />

      <div className="relative bg-slate-50 text-slate-900 selection:bg-purple-500/20 selection:text-purple-900 font-sans pb-16 sm:pb-0">

        {/* Subtle Ambient Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-100/40 via-purple-100/20 to-transparent blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* SECTION 1 — HERO SECTION (WITH HIGH-FIDELITY VECTOR UI & TOUR MODAL) */}
        {/* ========================================================================= */}
        <section className="relative pt-8 pb-20 sm:pt-14 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Brand Eyebrow Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>OIBUZ HRMS • BY OI HRMS SOLUTIONS</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 font-medium">
                <span className="hidden sm:inline">CONNECTING PEOPLE, PROCESSES & WORKFORCE</span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md border border-purple-100 font-bold">
                  Enterprise Cloud SaaS
                </span>
              </div>
            </div>

            {/* Main Hero Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 space-y-6">
                
                <div className="space-y-3">
                  <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100/80 px-3 py-1 rounded-md border border-blue-200">
                    OIBUZ HRMS
                  </span>
                  <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
                    Connect Your Workforce. <br className="hidden sm:inline" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700">
                      Simplify HR. Stay in Control.
                    </span>
                  </h1>
                </div>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Oibuz HRMS brings employee management, attendance, leave, timesheets, reimbursements, payroll and approvals into one connected platform.
                </p>

                <p className="text-sm font-semibold text-slate-700 bg-white/80 p-3 rounded-xl border border-purple-100 inline-block shadow-sm">
                  Built for growing organizations, field-connected teams and project-based workforces.
                </p>

                {/* CTAs & Product Tour Trigger */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={scrollToForm}
                    className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.35)] flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <span>Book a Demo</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => setShowDemoModal(true)}
                    className="px-6 py-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-sm transition border border-purple-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </div>
                    <span>Watch 60s Tour</span>
                  </button>

                  <button
                    onClick={scrollToSolution}
                    className="px-6 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm transition border border-slate-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Explore Platform</span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                {/* Trust Badge Bar */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-4 text-xs font-mono font-bold text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" /> Cloud-based
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <ShieldCheck className="w-4 h-4 text-purple-600" /> Role-based
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <Users className="w-4 h-4 text-indigo-600" /> Workforce-focused
                  </span>
                </div>

              </div>

              {/* High-Fidelity Interactive Vector UI Display */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl bg-slate-950 border border-slate-800 shadow-[0_25px_60px_rgba(15,23,42,0.4)] overflow-hidden text-white p-6">
                  
                  {/* Window Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">oibuz.hrms.app/dashboard</span>
                    </div>
                    <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE CONSOLE
                    </span>
                  </div>

                  {/* Interactive Role Switcher Pill Bar */}
                  <div className="flex items-center justify-between gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 mb-4 text-[11px] font-mono">
                    {["employee", "manager", "hr", "admin"].map((r) => (
                      <button
                        key={r}
                        onClick={() => setHeroRole(r)}
                        className={`flex-1 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                          heroRole === r
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic High-Fidelity UI Body */}
                  <div className="space-y-3 text-xs">
                    
                    {/* User Header Profile Badge */}
                    <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                            {heroRole === "employee" ? "RV" : heroRole === "manager" ? "RP" : heroRole === "hr" ? "MD" : "AD"}
                          </div>
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {heroRole === "employee" && "Rahul Verma (Project Engineer)"}
                            {heroRole === "manager" && "Rajesh Patil (Site Manager)"}
                            {heroRole === "hr" && "Mahesh Deshmukh (HR Lead)"}
                            {heroRole === "admin" && "System Admin (OI HRMS SOLUTIONS)"}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            Role Scope: {heroRole.toUpperCase()} • Location: Pune Operations Hub
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-blue-400 font-bold bg-blue-500/10 px-2 py-1 rounded">
                        Active Session
                      </span>
                    </div>

                    {/* Live Mobile Attendance Punch Card */}
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-300 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-blue-400" /> Check-in Status
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">09:02 AM Checked In</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="bg-slate-950 p-2 rounded border border-slate-800 flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                          <span className="truncate">Lat 18.5529, Long 73.8052</span>
                        </div>
                        <div className="bg-slate-950 p-2 rounded border border-slate-800 flex items-center gap-1.5 text-emerald-400">
                          <Camera className="w-3 h-3 shrink-0" />
                          <span>Selfie Verified ✓</span>
                        </div>
                      </div>
                    </div>

                    {/* Pending Approvals & Status Widget */}
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-300 flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5 text-purple-400" /> Multi-Level Approval Queue
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                          1 Pending Action
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded border border-slate-800 text-slate-300">
                        <span>Casual Leave Request (2 Days)</span>
                        <span className="font-mono text-emerald-400 font-bold">Manager Approved → HR Review</span>
                      </div>
                    </div>

                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Oibuz HRMS Engine v4.2</span>
                    <span className="text-blue-400 font-bold">OI HRMS SOLUTIONS</span>
                  </div>

                </div>
              </div>

            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2 — OIBUZ BRAND MEANING SECTION */}
        {/* ========================================================================= */}
        <section className="py-16 bg-white border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-4xl space-y-6 relative z-10">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                  WHAT OIBUZ STANDS FOR
                </span>

                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                    OIBUZ — <span className="text-blue-300">On-field Integration for Business & User Zeal</span>
                  </h2>
                </div>

                <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-light">
                  Oibuz represents the connection between people, business processes and workforce operations — bringing everyday HR activities into one connected system.
                </p>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium text-sm sm:text-base flex items-center gap-3">
                  <Zap className="w-6 h-6 text-amber-300 shrink-0" />
                  <span>“Connecting people, processes and workforce operations in one platform.”</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3 — GO LIVE IN 48 HOURS (ONBOARDING ROADMAP) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                RAPID DEPLOYMENT ROADMAP
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Go Live in 48 Hours. Zero Operational Hassle.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                No complex multi-month hardware installations. Oibuz HRMS deploys in 4 fast steps.
              </p>
            </div>

            {/* 4-Step Interactive Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              
              {[
                { step: "01", title: "Upload Employee Directory", desc: "Import employee profiles, designations, departments, and manager mappings.", icon: Users },
                { step: "02", title: "Configure Approval Routes", desc: "Define Manager → HR approval workflows for leaves, timesheets, and expense claims.", icon: Workflow },
                { step: "03", title: "Set Up Salary Structures", desc: "Configure Basic, HRA, Allowances, PF, and PT components for payroll run readiness.", icon: CreditCard },
                { step: "04", title: "Launch Field Attendance", desc: "Distribute mobile access for point-in-time GPS and selfie verified check-ins.", icon: Rocket },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition flex flex-col justify-between relative group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                          STEP {item.step}
                        </span>
                        <Icon className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400 font-bold">
                      {idx === 0 || idx === 1 ? "DAY 1 DEPLOYMENT" : "DAY 2 GO-LIVE"}
                    </div>
                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4 — MARKET COMPARISON MATRIX (OIBUZ VS LEGACY) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                WHY OIBUZ LEADS THE MARKET
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Oibuz HRMS vs Traditional Alternatives
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                See how Oibuz HRMS compares to paper registers, legacy biometric hardware, and generic desk-only HR software.
              </p>
            </div>

            {/* B2B Comparison Table */}
            <div className="overflow-x-auto rounded-3xl border border-purple-100 shadow-xl bg-white">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-mono uppercase">
                    <th className="p-4 sm:p-5">Capability / Feature</th>
                    <th className="p-4 sm:p-5 text-slate-400">Paper &amp; Registers</th>
                    <th className="p-4 sm:p-5 text-slate-400">Legacy Biometrics</th>
                    <th className="p-4 sm:p-5 text-slate-400">Generic Desk HRMS</th>
                    <th className="p-4 sm:p-5 text-blue-400 font-black bg-slate-950">Oibuz HRMS</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-purple-100/80 font-medium text-slate-700">
                  
                  <tr>
                    <td className="p-4 font-bold text-slate-900">Point-in-Time GPS Check-In</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Manual Only</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Wall Fixed Only</td>
                    <td className="p-4 text-amber-600 font-mono">Limited / Desk Only</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ Point-in-Time GPS</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900">Live Selfie Verification Audit</td>
                    <td className="p-4 text-rose-500 font-mono">✕ High Proxy Punching</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Dust &amp; Power Issues</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Not Included</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ Live Selfie Audit</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900">Multi-Level Approval Routing</td>
                    <td className="p-4 text-rose-500 font-mono">✕ WhatsApp / Verbal</td>
                    <td className="p-4 text-rose-500 font-mono">✕ No Workflow Engine</td>
                    <td className="p-4 text-amber-600 font-mono">Basic Only</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ Emp → Mgr → HR → Fin</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900">Salary Structure &amp; Payroll Run</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Excel Math Discrepancies</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Raw Log Export Only</td>
                    <td className="p-4 text-amber-600 font-mono">Requires Add-On</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ Integrated Payroll</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900">Zero Hardware Failure Risk</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Register Loss Risk</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Hardware Breakdown</td>
                    <td className="p-4 text-emerald-600 font-mono">✓ Cloud Software</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ 100% Cloud SaaS</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900">Role-Based Access Governance</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Zero Security</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Admin Only</td>
                    <td className="p-4 text-slate-700 font-mono">Standard RBAC</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ Emp / Mgr / HR / Admin</td>
                  </tr>

                  <tr>
                    <td className="p-4 font-bold text-slate-900">System Action Audit Logs</td>
                    <td className="p-4 text-rose-500 font-mono">✕ None</td>
                    <td className="p-4 text-rose-500 font-mono">✕ Device Logs Only</td>
                    <td className="p-4 text-amber-600 font-mono">Partial Logs</td>
                    <td className="p-4 font-bold text-emerald-600 bg-blue-50/50 font-mono">✓ Full System Logs</td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5 — PROBLEM SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                OPERATIONAL FRICTION IN DISCONNECTED HR
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                HR Becomes Difficult When Everything Is Disconnected.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                When employee data, attendance registers, and approval channels exist in silos, HR management degrades into manual chasing and data discrepancies.
              </p>
            </div>

            {/* 7 Problem Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              
              {[
                { title: "Attendance Scattered", desc: "Attendance scattered across registers or disconnected systems.", icon: FileSpreadsheet },
                { title: "Manual Approvals", desc: "Leave and approvals managed through calls, messages or manual processes.", icon: AlertCircle },
                { title: "Siloed Information", desc: "Employee information stored in multiple disconnected files and places.", icon: Users },
                { title: "Unclear Timesheets", desc: "Timesheets difficult to track across projects, locations, and teams.", icon: Clock },
                { title: "Unstructured Expenses", desc: "Reimbursements lack structured approval routing between managers and finance.", icon: DollarSign },
                { title: "Disconnected Payroll", desc: "Payroll data disconnected from actual daily employee attendance records.", icon: CreditCard },
                { title: "Zero Real-Time Visibility", desc: "Managers lack real-time workforce visibility across active teams.", icon: Eye },
              ].map((prob, idx) => {
                const Icon = prob.icon;
                return (
                  <div key={prob.title} className="p-6 rounded-2xl bg-white border border-rose-100/80 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <Icon className="w-5 h-5 text-rose-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{prob.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{prob.desc}</p>
                  </div>
                );
              })}

            </div>

            {/* Transition Banner */}
            <div className="max-w-2xl mx-auto text-center bg-blue-50 border border-blue-200 p-4 rounded-2xl shadow-sm text-blue-900 font-bold text-base flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Oibuz brings these workflows together into one platform.</span>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6 — SOLUTION SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative" id="solution-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                THE CONNECTED WORKFORCE PLATFORM
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                One Workforce Platform. <br />
                One Source of Truth.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Oibuz centralizes core HR operations into a connected, role-based platform for growing organizations.
              </p>
            </div>

            {/* Core Solution Pillars */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                "Employee Management",
                "Attendance",
                "Leave",
                "Timesheets",
                "Reimbursements",
                "Payroll & Payslips",
                "Approval Workflows",
                "Reports & Visibility",
                "Role-Based Access",
                "Audit Logs",
              ].map((pillar, idx) => (
                <div key={pillar} className="p-4 rounded-xl bg-slate-50 border border-purple-100 hover:border-purple-300 text-center transition group shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 mx-auto flex items-center justify-center font-mono font-bold text-xs mb-2">
                    {idx + 1}
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight group-hover:text-purple-700 transition">
                    {pillar}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7 — CORE FEATURES SECTION (10 SPECIFIED FEATURES) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-purple-100 relative" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                COMPLETE HR CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Everything Your HR &amp; Workforce Require.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Clean, purpose-built features engineered for employee self-service, manager approvals, and central HR governance.
              </p>
            </div>

            {/* 10 Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">1. EMPLOYEE MANAGEMENT</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Manage employee profiles, designations, departments, managers, work locations, joining details and compensation/compliance information from one place.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">2. ATTENDANCE MANAGEMENT</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Capture punch-in and punch-out with time, point-in-time geographic location and selfie verification.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-4 font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">3. LEAVE MANAGEMENT</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Employees submit leave requests while managers and HR review and approve them through a structured workflow.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">4. TIMESHEETS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Track project and task hours with manager and HR approval workflows.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 font-bold">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">5. REIMBURSEMENTS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Submit expense claims and route them through controlled Manager → HR → Finance approval.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center mb-4 font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">6. PAYROLL &amp; PAYSLIPS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Configure salary structures, run monthly payroll, finalize payroll and publish payslips.
                </p>
              </div>

              {/* Feature 7 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 font-bold">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">7. APPROVAL WORKFLOWS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Structured multi-tier approvals for leaves (Employee → Manager → HR) and expenses (Employee → Manager → HR → Finance).
                </p>
              </div>

              {/* Feature 8 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4 font-bold">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">8. REPORTS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Access daily and monthly attendance summaries and employee-specific workforce history.
                </p>
              </div>

              {/* Feature 9 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4 font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-2">9. ROLE-BASED ACCESS</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tailored dashboards and explicit functional permissions for Employee, Manager, HR, and Admin.
                </p>
              </div>

              {/* Feature 10 */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md transition md:col-span-2 lg:col-span-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide mb-1">10. AUDIT LOGS</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Track important system actions and preserve workflow accountability across all attendance edits, approvals, profile changes, and payroll releases.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8 — ATTENDANCE HERO FEATURE SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                VERIFIED ATTENDANCE ENGINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Attendance You Can Actually Trust.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium">
                Capture the event. Verify the employee. Keep the history.
              </p>
            </div>

            {/* Attendance Punch Workflow Step Diagram */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl mb-12 border border-slate-800">
              
              <div className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider mb-6 text-center">
                PUNCH-IN TO HOURS CALCULATION PIPELINE
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
                {[
                  { step: "01", label: "PUNCH IN", icon: Smartphone },
                  { step: "02", label: "Time Captured", icon: Clock },
                  { step: "03", label: "Location Captured", icon: MapPin },
                  { step: "04", label: "Selfie Captured", icon: Camera },
                  { step: "05", label: "Session Opened", icon: CheckCircle2 },
                  { step: "06", label: "PUNCH OUT", icon: Smartphone },
                  { step: "07", label: "Hours Calculated", icon: CreditCard },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between items-center">
                      <span className="text-[10px] font-mono text-blue-400 font-bold mb-1">{item.step}</span>
                      <Icon className="w-5 h-5 text-purple-400 mb-2" />
                      <span className="text-xs font-bold text-slate-200 leading-tight">{item.label}</span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Attendance Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-purple-100 text-xs text-slate-700">
                <strong className="text-blue-700 block mb-1">Real-time Manager Visibility</strong>
                Instant team check-in status on manager dashboards.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-purple-100 text-xs text-slate-700">
                <strong className="text-purple-700 block mb-1">Organization-Wide HR Reporting</strong>
                Daily and monthly muster roll reports across departments.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-purple-100 text-xs text-slate-700">
                <strong className="text-indigo-700 block mb-1">Auto-Close Shift Safeguards</strong>
                Handles forgotten punch-outs with structured rules.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-purple-100 text-xs text-slate-700">
                <strong className="text-amber-700 block mb-1">Attendance Correction Workflow</strong>
                Employees request fixes, managers review and audit.
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-purple-100 text-xs text-slate-700">
                <strong className="text-emerald-700 block mb-1">Immutable Auditability</strong>
                Complete history of timestamps, GPS, and photos.
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 9 — FIELD & PROJECT WORKFORCE SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                DESK-BOUND &amp; FIELD-CONNECTED WORKFORCES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Built for Workforces That Aren’t Sitting at One Desk.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Whether teams work across offices, sites or projects, Oibuz helps managers and HR stay connected with attendance, timesheets, approvals and workforce records.
              </p>
            </div>

            {/* Target Organizations Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { title: "Construction", icon: Building2 },
                { title: "EPC Firms", icon: Layers },
                { title: "Infrastructure", icon: Compass },
                { title: "Project Teams", icon: Briefcase },
                { title: "Field Teams", icon: MapPin },
                { title: "Multi-Location", icon: Users },
                { title: "Growing SMEs", icon: TrendingUp },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="p-4 rounded-2xl bg-white border border-purple-100 text-center shadow-sm hover:shadow-md transition">
                    <Icon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className="text-xs font-bold text-slate-900">{item.title}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10 — ROLE-BASED EXPERIENCE (4 ROLES) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                ROLE-BASED GOVERNANCE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Tailored Experiences for Every Role.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Provide clean operational visibility and appropriate security permissions for every level of the organization.
              </p>
            </div>

            {/* 4 Role Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Employee */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-purple-100 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest mb-2">ROLE 01</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">EMPLOYEE</h3>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Own profile management</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Attendance check-in / out</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Leave application</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Timesheet entry</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Reimbursements</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-blue-600" /> Monthly payslips</li>
                  </ul>
                </div>
              </div>

              {/* Manager */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-purple-100 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest mb-2">ROLE 02</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">MANAGER</h3>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Team attendance status</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Direct reports overview</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Pending approvals queue</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Attendance corrections</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-600" /> Timesheet review</li>
                  </ul>
                </div>
              </div>

              {/* HR */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-purple-100 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest mb-2">ROLE 03</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">HR</h3>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Workforce summary</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Organization attendance</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Final leave approvals</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Monthly payroll run</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-indigo-600" /> Employee management</li>
                  </ul>
                </div>
              </div>

              {/* Admin */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-purple-100 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest mb-2">ROLE 04</div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">ADMIN</h3>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-800" /> Organization config</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-800" /> Full platform access</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-800" /> System audit logs</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-slate-800" /> Role &amp; permission admin</li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 11 — APPROVAL WORKFLOW SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                CONTROLLED ROUTING
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Every Request Has a Clear Path.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Automated status tracking ensures requests move smoothly from submission to finalization.
              </p>
            </div>

            {/* 4 Workflow Graphics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Leave Workflow */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-blue-700 uppercase mb-3">LEAVE APPROVAL ROUTE</div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-purple-100 font-mono">
                  <span>Employee</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span>Manager</span>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                  <span>HR</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Finalized</span>
                </div>
              </div>

              {/* Timesheet Workflow */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-indigo-700 uppercase mb-3">TIMESHEET APPROVAL ROUTE</div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-purple-100 font-mono">
                  <span>Employee</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span>Manager</span>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                  <span>HR</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Approved</span>
                </div>
              </div>

              {/* Reimbursement Workflow */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-purple-700 uppercase mb-3">REIMBURSEMENT APPROVAL ROUTE</div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-purple-100 font-mono">
                  <span>Employee</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span>Manager</span>
                  <ArrowRight className="w-4 h-4 text-purple-600" />
                  <span>HR</span>
                  <ArrowRight className="w-4 h-4 text-amber-600" />
                  <span>Finance</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Finalized</span>
                </div>
              </div>

              {/* Attendance Correction Workflow */}
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-slate-800 uppercase mb-3">ATTENDANCE CORRECTION ROUTE</div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 bg-slate-50 p-3 rounded-xl border border-purple-100 font-mono">
                  <span>Employee</span>
                  <ArrowRight className="w-4 h-4 text-blue-600" />
                  <span>Manager / HR / Admin</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Finalized</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 12 — PAYROLL SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                PAYROLL PROCESSING
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                From Salary Structure to Payslip.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Connect verified attendance and approved leave data directly to monthly payroll execution.
              </p>
            </div>

            {/* Payroll Pipeline Steps */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-xl">
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase mb-6 text-center">MONTHLY PAYROLL PIPELINE</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono">
                {[
                  "Salary Structure",
                  "Assign Employee",
                  "Payroll Run",
                  "Draft",
                  "Calculated",
                  "Finalized",
                  "Published",
                  "Employee Payslip",
                ].map((step, idx) => (
                  <div key={step} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-emerald-400 font-bold text-[10px] mb-1">0{idx + 1}</div>
                    <div className="text-slate-200 font-bold text-[11px] leading-tight">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported Components & Transparent Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-purple-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">Supported Salary Components</h3>
                <div className="flex flex-wrap gap-2 text-xs font-mono font-bold text-slate-700">
                  <span className="px-3 py-1 bg-white rounded-lg border border-purple-200">Basic</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-purple-200">HRA</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-purple-200">Allowances</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-purple-200">PF (Provident Fund)</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-purple-200">PT (Professional Tax)</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-1 text-sm font-bold">Scope Clarity Note:</strong>
                  “Configured salary structures support payroll processing; complex statutory compliance filing/routing is outside the current product scope.”
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 13 — SECURITY & CONTROL SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800 bg-slate-200 px-3 py-1 rounded-full border border-slate-300">
                GOVERNANCE &amp; CONTROLS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Control Without Creating More Work.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Granular security and visibility controls tailored to each operational role.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <Shield className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Role-Based Access</h3>
                <p className="text-xs text-slate-600">Strict permission boundaries for Employee, Manager, HR, and Admin.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <Users className="w-6 h-6 text-purple-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Team Visibility</h3>
                <p className="text-xs text-slate-600">Managers see direct reports and active team attendance.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <Lock className="w-6 h-6 text-indigo-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Audit Logs</h3>
                <p className="text-xs text-slate-600">Complete log of critical system actions, edits, and approvals.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-purple-100 shadow-sm">
                <Activity className="w-6 h-6 text-rose-600 mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">Attendance Exceptions</h3>
                <p className="text-xs text-slate-600">Highlight missing punches, late check-ins, and leave discrepancies.</p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 14 — WHY OIBUZ SECTION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                PROVEN BUSINESS VALUE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Why Organizations Choose Oibuz
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-slate-50 border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-blue-700 uppercase tracking-widest mb-2">01. EFFICIENCY</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">LESS MANUAL WORK</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “Replace scattered registers, requests and records with connected workflows.”
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest mb-2">02. TRANSPARENCY</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">MORE VISIBILITY</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “See attendance, exceptions, approvals and workforce status through role-based dashboards.”
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-widest mb-2">03. GOVERNANCE</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">BETTER ACCOUNTABILITY</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “Capture attendance details and preserve approval/correction history.”
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-purple-100 shadow-sm">
                <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest mb-2">04. INTEGRATION</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">ONE CONNECTED RECORD</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  “Keep employee, attendance, leave, timesheet, reimbursement and payroll information linked.”
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 15 — WHO IS OIBUZ FOR? */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                TARGET ORGANIZATIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Designed for Growing Organizations
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Empowering teams from 50 to 500+ employees across diverse operational environments.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-bold text-xs">
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">50–500+ Employees</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">Construction &amp; Contracting</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">EPC &amp; Engineering</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">Infrastructure Companies</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">Project-Based Teams</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">Field Service Operations</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">Multi-Location Businesses</div>
              <div className="p-4 rounded-xl bg-white border border-purple-100 text-slate-900 shadow-sm">Manager → HR Workflows</div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 16 — PRODUCT DASHBOARD SHOWCASE (INTERACTIVE TABS) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                INTERACTIVE INTERFACE PREVIEW
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Experience Oibuz HRMS
              </h2>
            </div>

            {/* Showcase Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {[
                { id: "employee", label: "Employee Directory" },
                { id: "attendance", label: "Attendance Punch" },
                { id: "manager", label: "Manager View" },
                { id: "hr", label: "HR Console" },
                { id: "payroll", label: "Payroll Run" },
                { id: "leave", label: "Leave Requests" },
                { id: "timesheet", label: "Timesheets" },
                { id: "reports", label: "Reports" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveScreenTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeScreenTab === tab.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dynamic Interactive Card Screen */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreenTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {activeScreenTab === "employee" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Central Employee Directory</h4>
                      <p className="text-xs text-slate-400 mb-4">Unified records containing employee profiles, designations, managers, work locations, and compliance info.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                        Directory Record #EMP-1049 • Rajesh Sharma (Sr. Site Engineer) • Dept: Operations • Location: Pune Hub
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "attendance" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Verified Mobile Punch-In</h4>
                      <p className="text-xs text-slate-400 mb-4">Captures punch timestamp, point-in-time GPS coordinates, and selfie audit image.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                        Check-in Recorded • 09:02 AM • GPS: 18.5529 N, 73.8052 E • Selfie Verified ✓
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "manager" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Manager Team Dashboard</h4>
                      <p className="text-xs text-slate-400 mb-4">Real-time team presence, pending approvals, and attendance exception flags.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-blue-400">
                        Direct Reports: 18 • Present: 16 • On Leave: 2 • Pending Approvals: 1 Leave Request
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "hr" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">HR Organization Console</h4>
                      <p className="text-xs text-slate-400 mb-4">Organization-wide workforce statistics, monthly muster rolls, and policy execution.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-purple-400">
                        Total Staff: 340 Employees • Active Sites: 5 • Muster Roll Finalized for Oct
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "payroll" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Monthly Payroll Run</h4>
                      <p className="text-xs text-slate-400 mb-4">Consolidates attendance days, leaves, and salary structures to publish monthly payslips.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-amber-400">
                        Run Status: Finalized • Basic + HRA + Allowances - PF - PT • Payslips Published
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "leave" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Leave Request Routing</h4>
                      <p className="text-xs text-slate-400 mb-4">Structured Employee → Manager → HR approval flow with audit history.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
                        Leave Ref #LV-882 • Casual Leave (2 Days) • Status: Approved by Manager &amp; HR
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "timesheet" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Project Timesheets</h4>
                      <p className="text-xs text-slate-400 mb-4">Track project and task hours for accurate workforce allocation and review.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-indigo-400">
                        Timesheet Week 42 • Project Alpha (32 hrs) • Project Beta (8 hrs) • Approved
                      </div>
                    </div>
                  )}

                  {activeScreenTab === "reports" && (
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">Workforce Analytics &amp; Reports</h4>
                      <p className="text-xs text-slate-400 mb-4">Downloadable daily summaries, monthly muster rolls, and attendance history.</p>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
                        Report Generated: Oct Attendance Summary.xlsx • 100% Data Verified
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 17 — INTERACTIVE BEFORE VS AFTER & ROI CALCULATOR */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-purple-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Before/After Interactive Slider */}
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                    TRANSFORMATION
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    Paper Registers vs Oibuz HRMS
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Drag slider to compare traditional manual HR vs Oibuz digital control.</p>
                </div>

                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl border border-purple-200 select-none">
                  {/* Digital / After (Full width background) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-950 text-white p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-bold uppercase">
                        AFTER: OIBUZ HRMS
                      </span>
                      <h4 className="text-lg font-bold text-white mt-2">Connected Digital Control</h4>
                      <ul className="text-xs text-slate-200 space-y-1 mt-2 font-mono">
                        <li>✓ Real-time mobile check-in with GPS</li>
                        <li>✓ Photo verification snapshot</li>
                        <li>✓ Automated leave &amp; approval routing</li>
                        <li>✓ One-click payroll calculation</li>
                      </ul>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">100% VERIFIED DATA</span>
                  </div>

                  {/* Paper / Before (Clipped foreground) */}
                  <div
                    className="absolute inset-y-0 left-0 bg-slate-900 text-slate-200 p-6 flex flex-col justify-between overflow-hidden border-r-2 border-white"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <div className="w-[400px]">
                      <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded font-bold uppercase">
                        BEFORE: MANUAL REGISTERS
                      </span>
                      <h4 className="text-lg font-bold text-rose-200 mt-2">Fragmented Paper Registers</h4>
                      <ul className="text-xs text-rose-100 space-y-1 mt-2 font-mono">
                        <li>✕ Paper muster rolls prone to loss</li>
                        <li>✕ Proxy punches &amp; unverified attendance</li>
                        <li>✕ Delayed leave approvals over phone</li>
                        <li>✕ Month-end payroll calculation stress</li>
                      </ul>
                    </div>
                    <span className="text-[10px] font-mono text-rose-400 font-bold">HIGH OPERATIONAL LEAKAGE</span>
                  </div>

                  {/* Draggable Handle Input */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                  />
                </div>
              </div>

              {/* Interactive ROI Savings Calculator */}
              <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-md space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    ESTIMATED COST LEAKAGE SAVINGS
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    Workforce ROI Calculator
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Calculate potential monthly savings by eliminating attendance leakage and manual errors.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Workforce Size</span>
                      <span className="font-mono text-purple-700">{roiWorkers} Employees</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="1000"
                      step="25"
                      value={roiWorkers}
                      onChange={(e) => setRoiWorkers(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-800 mb-1">
                      <span>Average Daily Wage</span>
                      <span className="font-mono text-purple-700">₹{roiWage} / day</span>
                    </div>
                    <input
                      type="range"
                      min="400"
                      max="2000"
                      step="50"
                      value={roiWage}
                      onChange={(e) => setRoiWage(Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 text-center">
                  <div className="text-xs font-mono font-bold text-slate-500 uppercase">ESTIMATED MONTHLY SAVINGS</div>
                  <div className="text-3xl font-black text-purple-700 mt-1">₹{monthlyLeakage.toLocaleString("en-IN")}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-tight">
                    Based on typical 3% leakage recovery through verified GPS/selfie attendance and connected payroll.
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 18 — FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-4 mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                QUESTIONS &amp; ANSWERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqList.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="border border-purple-100 rounded-2xl overflow-hidden transition bg-slate-50/50 hover:bg-slate-50"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex justify-between items-center gap-4 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-purple-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-purple-100/60 pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 19 — DEMO CTA & CONTACT FORM */}
        {/* ========================================================================= */}
        <section className="py-20 bg-gradient-to-b from-slate-50 via-purple-50/30 to-white relative" id="demo-request-form">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: CTA Context */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                  BOOK A PRODUCT DEMO
                </span>

                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  See Oibuz in Action.
                </h2>

                <p className="text-base text-slate-600 leading-relaxed">
                  Explore how Oibuz can fit your current HR workflow. Schedule a live walkthrough with our platform specialists at OI HRMS SOLUTIONS.
                </p>

                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>What to Expect in the Walkthrough:</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 pl-6 list-disc">
                    <li>Live demonstration of employee self-service and mobile attendance</li>
                    <li>Manager and HR approval workflow customization</li>
                    <li>Salary structure configuration and payroll run demonstration</li>
                    <li>Role-based permissions setup tailored to your organization</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openWhatsAppDemo}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Instant WhatsApp Demo Request</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Demo Form Card */}
              <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-purple-200 shadow-xl">
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Demo Request Received!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      Thank you, <strong>{formData.name}</strong>. Our technical product team at OI HRMS SOLUTIONS will reach out shortly to coordinate your live Oibuz HRMS demo.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <h3 className="text-xl font-black text-slate-900 mb-2">Schedule Your Product Demo</h3>

                    {formError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. Rahul Verma"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="e.g. HR Head / Managing Director"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Work Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="rahul@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="e.g. Acme Enterprises"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Workforce Size</label>
                        <select
                          name="employeeCount"
                          value={formData.employeeCount}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                        >
                          {EMPLOYEE_RANGES.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Industry Type</label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                        >
                          {INDUSTRY_OPTIONS.map((ind) => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Workforce Setup</label>
                        <select
                          name="workforceType"
                          value={formData.workforceType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                        >
                          {WORKFORCE_RANGES.map((rng) => (
                            <option key={rng} value={rng}>{rng}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Specific Requirements / Notes</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Tell us about your attendance, approval, or payroll workflow needs..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-blue-600 outline-none transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Request Walkthrough &amp; Demo</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 20 — FOOTER / BRAND SUMMARY */}
        {/* ========================================================================= */}
        <footer className="py-12 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                <span className="text-blue-400">Oibuz</span> HRMS
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                On-field Integration for Business &amp; User Zeal • Product by OI HRMS SOLUTIONS
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                “Connecting people, processes and workforce operations in one platform.”
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Cloud-based</span>
              <span>•</span>
              <span>Role-based</span>
              <span>•</span>
              <span>Workforce-focused</span>
            </div>
          </div>
        </footer>

        {/* ========================================================================= */}
        {/* MOBILE FLOATING STICKY CTA BAR (CRO ENGINE) */}
        {/* ========================================================================= */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-[0_-10px_25px_rgba(0,0,0,0.1)] flex items-center justify-between gap-2">
          <button
            onClick={scrollToForm}
            className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={openWhatsAppDemo}
            className="py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE 60-SECOND PRODUCT TOUR MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showDemoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowDemoModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-4 inline-block">
                  {tourSteps[demoStep].badge}
                </div>

                <h3 className="text-2xl font-black text-white mb-1">
                  {tourSteps[demoStep].title}
                </h3>
                <p className="text-xs font-mono text-purple-400 mb-4">
                  {tourSteps[demoStep].subtitle}
                </p>

                {/* Simulated Tour Video Screen Container */}
                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4 mb-6 relative">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {tourSteps[demoStep].desc}
                  </p>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                    <span>Live Verification Output</span>
                    <span className="font-bold">STATUS: OK ✓</span>
                  </div>
                </div>

                {/* Tour Navigation Controls */}
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <div className="flex gap-1.5">
                    {tourSteps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setDemoStep(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          demoStep === i ? "w-8 bg-blue-500" : "w-2 bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {demoStep < tourSteps.length - 1 ? (
                      <button
                        onClick={() => setDemoStep((prev) => prev + 1)}
                        className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Next Feature</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setShowDemoModal(false);
                          scrollToForm();
                        }}
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Book Full Live Demo</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
