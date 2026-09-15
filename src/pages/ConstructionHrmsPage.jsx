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
  Mail,
  UserCheck,
  HardHat,
  Eye,
  Lock,
  Workflow,
  BarChart3,
  Server,
  Zap
} from "lucide-react";

import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { createLead } from "../utils/leadStorage.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WHATSAPP_NUMBER = "917020708747";

// Industry options for demo form
const INDUSTRY_OPTIONS = [
  "General Construction",
  "EPC (Engineering, Procurement, Construction)",
  "Infrastructure & Highways",
  "Civil & Commercial Contracting",
  "Real Estate Development",
  "Industrial & Factory Construction",
  "PEB / Turnkey Steel Projects",
  "Interior Fit-Out & MEP Projects",
  "Other Project-Based Business",
];

const EMPLOYEE_RANGES = [
  "25 - 75 Employees",
  "76 - 200 Employees",
  "201 - 500 Employees",
  "501 - 1,500 Employees",
  "1,500+ Employees (Enterprise)",
];

const SITE_RANGES = [
  "1 - 3 Active Sites",
  "4 - 8 Active Sites",
  "9 - 20 Active Sites",
  "20+ Distributed Sites",
];

export default function ConstructionHrmsPage() {
  const { openLeadModal } = useLeadModal();

  // Active tab for the Section 13 Product Dashboard Showcase
  const [activeScreenTab, setActiveScreenTab] = useState("dashboard");

  // Selected site for Section 05 site-wise manager demo
  const [selectedSiteIndex, setSelectedSiteIndex] = useState(0);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    email: "",
    phone: "",
    employeeCount: EMPLOYEE_RANGES[1],
    siteCount: SITE_RANGES[0],
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
      const detailedMessage = `[Prajyot Construction HRMS Demo Request]
Company: ${formData.company || "N/A"}
Designation: ${formData.designation || "N/A"}
Staff Size: ${formData.employeeCount}
Active Project Sites: ${formData.siteCount}
Industry: ${formData.industry}
Work Email: ${formData.email}
Phone: ${formData.phone}
Requirements/Notes: ${formData.message || "Requested technical product walkthrough & site demo."}`;

      await createLead({
        name: formData.name.trim(),
        contact: `${formData.phone.trim()} | ${formData.email.trim()}`,
        projectType: "Prajyot Construction HRMS - Enterprise Demo",
        budget: `${formData.employeeCount} across ${formData.siteCount}`,
        message: detailedMessage,
        source: "Construction HRMS Landing Page",
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
      `Hi Prajyot Infotech! I would like to schedule a demo of Prajyot Construction HRMS.\n\n` +
      `👤 Name: ${formData.name || "Interested Construction Leader"}\n` +
      `🏢 Company: ${formData.company || "Construction Company"}\n` +
      `👷 Staff Size: ${formData.employeeCount}\n` +
      `📍 Active Sites: ${formData.siteCount}\n` +
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

  const scrollToWorkflow = () => {
    const el = document.getElementById("product-workflow");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Structured Data Schema for B2B Software Application
  const hrmsSchema = useMemo(() => ([
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Prajyot Construction HRMS",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Mobile Browser, iOS, Android",
      "description": "Construction workforce management and HRMS built specifically for project-based and site-based teams. Features photo and geolocation-verified attendance, multi-site staff records, leave tracking, and salary workflows.",
      "brand": {
        "@type": "Brand",
        "name": "Prajyot Infotech",
        "url": "https://www.prajyotinfotech.in"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR",
        "description": "Custom enterprise deployment with 100% source code ownership and zero recurring seat licensing penalties."
      },
      "featureList": [
        "Employee Management & Central Records",
        "HR Management Hub",
        "Site-wise Employee Management",
        "Mobile Employee Attendance",
        "Geolocation-based Attendance Verification",
        "Photo / Selfie Attendance Verification",
        "Salary & Payroll Workflow Integration",
        "Centralized Management Headcount Visibility",
        "Role-Based Access & Permissions",
        "Configurable Construction Organization Workflows"
      ]
    }
  ]), []);

  // Site mock data for Section 05
  const mockSites = [
    {
      name: "Skyline Corporate Tower - Baner, Pune",
      type: "Commercial High-Rise",
      supervisor: "Rajesh Patil (Sr. Site Engineer)",
      totalWorkers: 342,
      present: 318,
      absent: 16,
      onLeave: 8,
      attendanceRate: "93.0%",
      geoStatus: "Geofence Locked (Lat 18.5529, Long 73.8052)",
      departments: [
        { name: "Civil & RCC", count: 184 },
        { name: "Structural Steel", count: 68 },
        { name: "MEP & Electrical", count: 46 },
        { name: "Safety & Quality", count: 20 },
      ]
    },
    {
      name: "Phoenix Industrial Logistics Park - Chakan",
      type: "Industrial Warehousing / PEB",
      supervisor: "Mahesh Deshmukh (Project Manager)",
      totalWorkers: 215,
      present: 204,
      absent: 7,
      onLeave: 4,
      attendanceRate: "94.8%",
      geoStatus: "Geofence Locked (Lat 18.7610, Long 73.8540)",
      departments: [
        { name: "PEB Erection", count: 110 },
        { name: "Flooring & Concrete", count: 55 },
        { name: "Plant & Machinery Ops", count: 28 },
        { name: "Safety Staff", count: 11 },
      ]
    },
    {
      name: "Metro Viaduct Elevated Corridor - Sector 4",
      type: "Infrastructure & Heavy Civil",
      supervisor: "Suresh Shinde (Site In-Charge)",
      totalWorkers: 490,
      present: 452,
      absent: 26,
      onLeave: 12,
      attendanceRate: "92.2%",
      geoStatus: "Geofence Locked (Lat 18.5912, Long 73.7423)",
      departments: [
        { name: "Segment Casting", count: 210 },
        { name: "Piling & Substructure", count: 140 },
        { name: "Survey & Quality Lab", count: 52 },
        { name: "Traffic & Safety", count: 50 },
      ]
    },
  ];

  // FAQ List
  const faqList = [
    {
      q: "What is Prajyot Construction HRMS?",
      a: "Prajyot Construction HRMS is a dedicated workforce management and human resource system engineered specifically for construction, infrastructure, and project-based organizations. Unlike generic desk-bound HR tools, it connects mobile on-site attendance with photo and geolocation verification directly into central employee records, leave schedules, and payroll workflows."
    },
    {
      q: "Who is the HRMS built for?",
      a: "The product is built for Construction Companies, EPC Contractors, Infrastructure Developers, Civil Contractors, Real Estate Developers, Industrial Project Firms, and any multi-site business that manages workforce across remote project locations."
    },
    {
      q: "Can employees mark attendance from project sites?",
      a: "Yes. Employees and site supervisors can submit attendance directly from mobile smartphones at the actual work location. This removes the logistical headache and equipment failures common with fixed wall-mounted biometric fingerprint machines on active construction sites."
    },
    {
      q: "How does geolocation-based attendance work?",
      a: "When an employee or supervisor logs attendance on their mobile device, the system captures their precise GPS coordinates at that exact moment. Management can verify whether the punch occurred within the designated project geofence boundary or off-site."
    },
    {
      q: "How does photo / selfie verification work?",
      a: "During the mobile check-in process, the employee takes a live photo/selfie right through the camera interface. This visual snapshot is recorded alongside the timestamp and GPS coordinates, allowing HR and management to audit who physically marked attendance and eliminate proxy attendance."
    },
    {
      q: "Can employees be assigned to specific project sites?",
      a: "Yes. Site and project assignment is a foundational concept within Prajyot Construction HRMS. Workers, engineers, and supervisors can be mapped to specific sites, enabling site-level muster rolls, department breakdowns, and project-wise headcount visibility."
    },
    {
      q: "Can HR manage central employee records in one place?",
      a: "Yes. Centralized employee management keeps all personal information, contact numbers, emergency contacts, designated trade/skill, assigned site, joining date, KYC status, and supervisor mapping in one unified digital directory."
    },
    {
      q: "Does it include leave management?",
      a: "Yes. Employees and supervisors can submit leave requests, check remaining leave balances, and route applications through designated managers or HR. Approved leaves automatically reflect in daily muster rolls to distinguish authorized absences from unannounced site absenteeism."
    },
    {
      q: "Does it include salary / payroll management?",
      a: "Yes. Prajyot Construction HRMS connects attendance records, shifts worked, site allowances, and approved leave days directly with the salary calculation workflow. This drastically reduces the hours spent manually consolidating paper registers or messy Excel sheets each month."
    },
    {
      q: "Does it support mobile attendance?",
      a: "Yes. Mobile attendance is a core pillar of the product. It operates through responsive, lightweight mobile interfaces that work seamlessly even on standard smartphones commonly carried by on-site engineers and supervisors."
    },
    {
      q: "Does it provide centralized management visibility?",
      a: "Yes. Founders, directors, and operations heads get a high-level executive dashboard showing total workforce across all projects, site-by-site attendance percentages, absent staff, and active project distributions in real time."
    },
    {
      q: "Does it support role-based access?",
      a: "Yes. The platform provides structured role-based access control (Super Admin, HR/Admin, Project Manager, Site Supervisor, Payroll, and Employee). Each role is granted only the operational visibility and permissions required for their responsibilities."
    },
    {
      q: "Can the HRMS be customized for our organization?",
      a: "Yes. Because Prajyot Infotech is the core engineering firm behind the product, the system can be configured and tailored around your specific site hierarchies, attendance grace periods, approval hierarchies, and unique operational workflows."
    },
    {
      q: "Can multiple project sites be managed simultaneously?",
      a: "Yes. The architecture is built natively for multi-site operations. Whether you manage 3 sites or 30+ distributed infrastructure packages, every site maintains its own muster roll while rolling up into a single management console."
    }
  ];

  return (
    <>
      {/* Structured SEO Metadata */}
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Products", url: "https://www.prajyotinfotech.in/products/hrms" },
          { name: "Construction HRMS", url: "https://www.prajyotinfotech.in/products/hrms" }
        ]}
      />

      <Seo
        title="Prajyot Construction HRMS — Site-Wise Workforce & Mobile Attendance Software"
        description="Flagship Construction HRMS by Prajyot Infotech. Manage site-wise workforce, mobile attendance with photo and geolocation verification, leave, and payroll across project sites."
        keywords="construction hrms, construction workforce management, site attendance software, geolocation attendance construction, photo verification attendance, project workforce management, construction payroll software, hrms for civil contractors, pune software company"
        path="/products/hrms"
        image="https://www.prajyotinfotech.in/og/og-default.jpg"
        schema={hrmsSchema}
      />

      <div className="relative bg-slate-950 text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">

        {/* Ambient Grid & Lighting Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none" />

        {/* ========================================================================= */}
        {/* SECTION 01 — HERO */}
        {/* ========================================================================= */}
        <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Product Category & Brand Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <HardHat className="w-4 h-4 text-amber-400" />
                <span>BUILT FOR CONSTRUCTION & PROJECT-BASED TEAMS</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>FLAGSHIP PRODUCT BY</span>
                <Link to="/" className="text-white hover:text-amber-400 font-bold underline transition">
                  PRAJYOT INFOTECH
                </Link>
              </div>
            </div>

            {/* Main Headline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-[1.12]">
                  Your workforce is on site. <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
                    Your HR shouldn't have to chase them.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                  Manage employees, site attendance, leave and payroll from one connected <strong>Construction HRMS</strong> — designed around the way project-based teams actually work.
                </p>

                {/* Construction Differentiator Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 rounded-xl">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Geolocation-based</strong> site check-in</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 rounded-xl">
                    <Camera className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span><strong>Photo / Selfie</strong> punch audit trail</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 rounded-xl">
                    <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Site-wise</strong> staff allocation</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 rounded-xl">
                    <CreditCard className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span><strong>Connected</strong> site-to-payroll flow</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={scrollToForm}
                    className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>Book a Product Demo</span>
                    <ArrowRight className="w-5 h-5 text-slate-950" />
                  </button>

                  <button
                    onClick={scrollToWorkflow}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-semibold text-sm transition-all cursor-pointer"
                  >
                    <Workflow className="w-4 h-4 text-amber-400" />
                    <span>Explore the Product Workflow</span>
                  </button>
                </div>

                {/* Trust Note */}
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Configurable around your project hierarchy • Zero per-seat subscription penalties</span>
                </div>
              </div>

              {/* Realistic Hero Dashboard Screen */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl bg-slate-900/90 border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.12)] p-4 sm:p-5 overflow-hidden backdrop-blur-xl">
                  
                  {/* Window Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-xs font-mono text-slate-400 font-semibold">
                        PRAJYOT HRMS // SITE CONSOLE
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      LIVE STREAM
                    </span>
                  </div>

                  {/* Active Site Dropdown Mock */}
                  <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-slate-400">Current Project</div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-amber-400" />
                        <span>Skyline Towers Phase 2 (Baner)</span>
                      </div>
                    </div>
                    <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-1 rounded">
                      Site #04
                    </span>
                  </div>

                  {/* High-Level Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] text-slate-400 font-mono">Total Roster</div>
                      <div className="text-lg font-black text-white">1,420</div>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] text-emerald-400 font-mono">Present</div>
                      <div className="text-lg font-black text-emerald-400">1,318</div>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] text-rose-400 font-mono">Absent</div>
                      <div className="text-lg font-black text-rose-400">64</div>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                      <div className="text-[10px] text-cyan-400 font-mono">On Leave</div>
                      <div className="text-lg font-black text-cyan-400">38</div>
                    </div>
                  </div>

                  {/* Live Mobile Attendance Verification Feed Item */}
                  <div className="bg-slate-950/90 rounded-xl p-3.5 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/70 pb-2">
                      <span className="font-mono flex items-center gap-1.5 text-amber-400">
                        <Camera className="w-3.5 h-3.5" />
                        <span>RECENT SITE VERIFICATION</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">10:42 AM</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Photo verification avatar badge */}
                      <div className="relative w-12 h-12 rounded-xl bg-slate-800 border-2 border-emerald-500 overflow-hidden flex items-center justify-center shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" 
                          alt="Employee selfie punch" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 bg-emerald-500 text-slate-950 p-0.5 rounded-tl">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-white truncate">Ganesh Shinde</h4>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            VERIFIED
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">RCC Site Engineer • ID #PI-0842</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-amber-400/90 font-mono mt-1">
                          <MapPin className="w-3 h-3" />
                          <span>18.5529° N, 73.8052° E (Baner Site)</span>
                        </div>
                      </div>
                    </div>

                    {/* Geofence verification indicator */}
                    <div className="text-[11px] bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-2 flex items-center justify-between text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Selfie + GPS Match Confirmed</span>
                      </span>
                      <span className="font-mono text-[10px]">Within 32m radius</span>
                    </div>
                  </div>

                  {/* Bottom Stats ticker */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>12 ACTIVE PROJECT SITES</span>
                    <span className="text-amber-400 font-bold">92.8% ATTENDANCE RATE</span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02 — THE CONSTRUCTION WORKFORCE CHALLENGE */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                THE CORE INDUSTRY REALITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Construction doesn’t happen from one desk.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Your engineers and workforce are scattered across project sites, batching plants, and fabrication yards. 
                Fixed office biometric machines don't work on dusty sites, paper muster rolls cause rampant proxy punching, and HR is left guessing who actually showed up until month-end.
              </p>
            </div>

            {/* Visual Bridge: Site -> HR -> Payroll -> Management */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
              
              {/* Step 1: Project Site */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group hover:border-amber-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 font-mono font-bold">
                  01
                </div>
                <div className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">ON THE GROUND</div>
                <h3 className="text-lg font-bold text-white mb-2">Project Sites</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Supervisors, site engineers, and subcontractors working across remote locations mark attendance right from their smartphones.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mobile + GPS + Selfie Punch</span>
                </div>
              </div>

              {/* Step 2: HR Office */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group hover:border-cyan-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 font-mono font-bold">
                  02
                </div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">CENTRAL VERIFICATION</div>
                <h3 className="text-lg font-bold text-white mb-2">HR Operations</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  HR gets instant real-time muster rolls without calling site engineers. View site transfers, approved leaves, and verified records in one place.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Site Muster Roll Sync</span>
                </div>
              </div>

              {/* Step 3: Payroll */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group hover:border-indigo-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 font-mono font-bold">
                  03
                </div>
                <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-1">AUTOMATED ACCURACY</div>
                <h3 className="text-lg font-bold text-white mb-2">Salary &amp; Payroll</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No more chasing manual attendance diaries at month-end. Salary workflows connect directly with verified attendance and approved leaves.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Zero Manual Consolidation</span>
                </div>
              </div>

              {/* Step 4: Executive Management */}
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative group hover:border-emerald-500/50 transition">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold">
                  04
                </div>
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">TOTAL CONTROL</div>
                <h3 className="text-lg font-bold text-white mb-2">Executive View</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Owners and Directors see real-time workforce allocation across every project. Eliminate ghost workers and spot site shortages instantly.
                </p>
                <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Multi-Project Headcount Intel</span>
                </div>
              </div>

            </div>

            {/* Contrast Box */}
            <div className="mt-12 bg-slate-950 rounded-2xl border border-slate-800 p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase">
                    <AlertCircle className="w-4 h-4" />
                    <span>Without Dedicated Construction HRMS</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-400 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>Paper muster rolls get damaged, misplaced, or forged on sites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>Fixed biometric devices fail from dust, cement, and power cuts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>Ghost workers and proxy punching leak substantial payroll funds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>HR spends 4 to 6 days every month consolidating messy Excel spreadsheets</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 pt-6 md:pt-0 md:pl-8">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>With Prajyot Construction HRMS</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-slate-300 space-y-2.5">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Mobile attendance with GPS geofence + live selfie verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Zero dependency on fragile physical biometric hardware</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Automated site-by-site muster roll sync in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>Seamless one-click consolidation directly into payroll preparation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03 — PRODUCT INTRODUCTION (CONFIRMED MODULES) */}
        {/* ========================================================================= */}
        <section className="py-20 relative" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                COMPREHENSIVE WORKFORCE CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                One Construction HRMS. <br className="hidden sm:inline" />
                Every workforce workflow.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Prajyot Construction HRMS brings employee, HR, site attendance, leave, and payroll workflows into one connected system engineered for project reality.
              </p>
            </div>

            {/* Feature Cards Grid (All 10 confirmed capabilities) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* 1. Employee Management */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Employee Management</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Central employee records organized for the business, supporting site assignment, designations, and contact dossiers.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
                  Business Value: Better control over staff information.
                </div>
              </div>

              {/* 2. HR Management */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">HR Management</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Centralized employee and HR operations in one consolidated hub, giving HR teams full administrative visibility.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                  Business Value: Centralized HR visibility in one place.
                </div>
              </div>

              {/* 3. Site-wise Employee Management */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Site-Wise Employee Allocation</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Organize and filter employees by project and site. Construction site assignment is a major first-class concept in the UI.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                  Business Value: Real-time workforce visibility across projects.
                </div>
              </div>

              {/* 4. Mobile Employee Attendance */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-5">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mobile Employee Attendance</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Employees and supervisors submit attendance directly from mobile devices, ideal where fixed devices are impractical.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-orange-400">
                  Business Value: Attendance recorded wherever the work happens.
                </div>
              </div>

              {/* 5. Geolocation-based Attendance */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Geolocation-Based Attendance</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Attendance logs exact GPS latitude, longitude, and site radius coordinates during punch-in.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-indigo-400">
                  Business Value: Management can verify where attendance occurred.
                </div>
              </div>

              {/* 6. Photo / Selfie Verification */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-rose-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-5">
                  <Camera className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Photo / Selfie Verification</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Captures an employee photo during attendance punch, providing immediate visual verification.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-rose-400">
                  Business Value: Verify the actual person submitting attendance.
                </div>
              </div>

              {/* 7. Salary / Payroll Management */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Salary &amp; Payroll Preparation</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Salary workflow directly connected with verified site employee attendance and approved leaves.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                  Business Value: Eliminates tedious manual spreadsheet consolidation.
                </div>
              </div>

              {/* 8. Centralized Management Visibility */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Central Management Console</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Management gets a unified multi-site dashboard displaying attendance ratios, active headcounts, and site metrics.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-amber-400">
                  Business Value: Clearer centralized view of company workforce.
                </div>
              </div>

              {/* 9. Role-Based Access & Permissions */}
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Role-Based Access</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  Structured permissions for Super Admin, HR, Project Managers, Site Supervisors, Payroll, and Employees.
                </p>
                <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                  Business Value: Appropriate access to workforce info and operations.
                </div>
              </div>

              {/* 10. Customization / Configurable Workflows (Spans 3 on large screens) */}
              <div className="bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 p-6 rounded-2xl border border-amber-500/30 md:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
                    <Sliders className="w-4 h-4" />
                    <span>BUILT AROUND YOUR ORGANIZATION’S WORKFLOW</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Configurable Construction Workflows</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Can be tailored around your project/site structure, employee categories, site-transfer rules, approval chains, and business-specific requirements.
                  </p>
                </div>
                <button
                  onClick={scrollToForm}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition"
                >
                  Talk to Us About Your Workflow
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04 — ATTENDANCE DIFFERENTIATOR (HERO FEATURE) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  CORE CONSTRUCTION DIFFERENTIATOR
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Attendance built for the construction site.
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  Your people don’t work from one desk. Their attendance system shouldn’t assume they do.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 mb-1">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile Employee Attendance</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Enables attendance marking straight from project sites. The mobile approach can reduce dependency on fixed biometric devices where they are impractical due to dust, cement, and power availability.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>Geolocation-Based Attendance</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Captures the GPS latitude and longitude where attendance is recorded so management can verify the exact punch location.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-1">
                      <Camera className="w-4 h-4" />
                      <span>Photo / Selfie Verification</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Takes a live photo during punch-in to verify the person submitting attendance and eliminate proxy records.
                    </p>
                  </div>
                </div>

                <div className="pt-2 bg-slate-950/80 rounded-xl p-4 border border-amber-500/20 text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">VERIFICATION ASSURANCE:</strong>
                  Management can verify <strong>WHO</strong> marked attendance (Selfie), <strong>WHEN</strong> attendance was marked (Encrypted Timestamp), and <strong>WHERE</strong> attendance was recorded (GPS Location).
                </div>
              </div>

              {/* Realistic Mobile Attendance Phone UI Mockup */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-full max-w-sm rounded-[2.5rem] bg-slate-950 p-4 border-4 border-slate-800 shadow-[0_0_60px_rgba(245,158,11,0.15)] relative">
                  
                  {/* Phone Speaker Notch */}
                  <div className="w-28 h-4 bg-slate-900 rounded-full mx-auto mb-4" />

                  {/* App Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <HardHat className="w-5 h-5 text-amber-400" />
                      <span className="text-xs font-mono font-bold text-white">PRAJYOT HRMS</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ONLINE
                    </span>
                  </div>

                  {/* Camera / Selfie Preview Card */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-slate-900 mb-4 aspect-[4/3]">
                    <img
                      src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=600&auto=format&fit=crop&q=80"
                      alt="Construction site selfie verification"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Live HUD overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-between p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono bg-slate-900/80 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                          LIVE SELFIE CAPTURE
                        </span>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      
                      <div>
                        <div className="text-xs font-bold text-white">Vikas Kamble (Site Supervisor)</div>
                        <div className="text-[10px] font-mono text-slate-300">EMP ID: PI-CON-0429</div>
                      </div>
                    </div>
                  </div>

                  {/* Geolocation Map Widget */}
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 mb-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>Metro Corridor Site #03</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">GPS MATCH</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center">
                      <span>LAT: 18.5204° N</span>
                      <span>LNG: 73.8567° E</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Date: 15-Sep-2026</span>
                      <span>Time: 08:58:14 AM</span>
                    </div>
                  </div>

                  {/* Attendance Punch Confirmation Button */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Punch In Verified &amp; Synced</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Logged to Central HR &amp; Site Roster</div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE PRODUCT WORKFLOW (HIGH-IMPACT VISUAL) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800" id="product-workflow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                END-TO-END WORKFORCE PIPELINE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                From Site Attendance to Payroll — <br className="hidden sm:inline" />
                One Connected Workforce Workflow
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Bring the project workforce and HR operations into one connected system.
              </p>
            </div>

            {/* Step-by-Step Flowchart with Arrows */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
              
              {[
                { step: "01", title: "EMPLOYEE", desc: "Central record & site mapping", icon: Users },
                { step: "02", title: "PROJECT / SITE", desc: "Assigned to work location", icon: Building2 },
                { step: "03", title: "MOBILE ATTENDANCE", desc: "Clock in from phone", icon: Smartphone },
                { step: "04", title: "GEO + PHOTO", desc: "GPS & selfie verified", icon: Camera },
                { step: "05", title: "HR / ADMIN", desc: "Instant muster roll sync", icon: Briefcase },
                { step: "06", title: "LEAVE & ROSTER", desc: "Absence & availability", icon: Calendar },
                { step: "07", title: "PAYROLL", desc: "Auto shift calculation", icon: CreditCard },
                { step: "08", title: "MANAGEMENT", desc: "Executive multi-site intel", icon: Eye },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-center relative flex flex-col justify-between hover:border-amber-500/50 transition group"
                  >
                    <div>
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center text-xs font-mono font-bold mb-2">
                        {item.step}
                      </div>
                      <Icon className="w-5 h-5 text-slate-300 mx-auto mb-2 group-hover:text-amber-400 transition" />
                      <div className="text-xs font-bold text-white uppercase tracking-tight">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{item.desc}</div>
                    </div>
                  </div>
                );
              })}

            </div>

            <div className="mt-10 text-center">
              <p className="text-xs font-mono text-slate-400">
                Eliminates the gap between site engineers, central HR administrators, and payroll accountants.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05 — SITE-WISE WORKFORCE MANAGEMENT */}
        {/* ========================================================================= */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                MULTI-PROJECT VISIBILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Know your workforce by project and site.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Employees can be organized by site or project. Management gets clean, granular workforce visibility without calling individual site engineers.
              </p>
            </div>

            {/* Interactive Site Cards Mock */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockSites.map((site, index) => {
                const isSelected = selectedSiteIndex === index;
                return (
                  <div
                    key={site.name}
                    onClick={() => setSelectedSiteIndex(index)}
                    className={`rounded-2xl p-6 border transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]"
                        : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {site.type}
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          {site.attendanceRate} Present
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white mb-2 leading-snug">{site.name}</h3>
                      <p className="text-xs text-slate-400 mb-4">
                        Supervisor: <span className="text-slate-300 font-medium">{site.supervisor}</span>
                      </p>

                      {/* Headcount Numbers */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-4">
                        <div>
                          <div className="text-[10px] font-mono text-slate-400">Total</div>
                          <div className="text-sm font-black text-white">{site.totalWorkers}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-emerald-400">Present</div>
                          <div className="text-sm font-black text-emerald-400">{site.present}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-rose-400">Absent</div>
                          <div className="text-sm font-black text-rose-400">{site.absent}</div>
                        </div>
                      </div>

                      {/* Department Breakdown */}
                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          Department Allocation
                        </div>
                        {site.departments.map((dept) => (
                          <div key={dept.name} className="flex items-center justify-between text-xs text-slate-300">
                            <span>{dept.name}</span>
                            <span className="font-mono font-semibold text-slate-400">{dept.count} workers</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{site.geoStatus}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 06 & 07 — EMPLOYEE MANAGEMENT & HR HUB */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Explanations */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    CENTRALIZED STAFF RECORDS
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-3">
                    Every employee. One organized record.
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Give HR one unified place to manage the workforce. Centralized records eliminate fragmented WhatsApp groups, lost KYC identity cards, and unverified contractor records.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <UserCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Centralized Staff Information</h4>
                      <p className="text-xs text-slate-400">Designations, trades, emergency contacts, joining date, and government ID documentation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <Building2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Project &amp; Site Allocation Tracking</h4>
                      <p className="text-xs text-slate-400">Track which project site an employee is stationed at, with seamless site transfer histories.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <Calendar className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">Integrated Muster Roll &amp; Approvals</h4>
                      <p className="text-xs text-slate-400">HR can audit daily punches, handle site transfer requests, and verify attendance disputes.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Realistic Employee Profile UI Card */}
              <div className="lg:col-span-6">
                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-2xl relative">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-base">
                        PI
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Ramesh Patil</h4>
                        <p className="text-xs text-slate-400">Senior Project Engineer • Civil &amp; RCC</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      ACTIVE ON SITE
                    </span>
                  </div>

                  {/* Profile Key-Value Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-5">
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] font-mono uppercase block">Employee ID</span>
                      <span className="font-mono font-bold text-white">PI-ENG-0284</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] font-mono uppercase block">Assigned Site</span>
                      <span className="font-bold text-amber-400">Baner Phase 2</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] font-mono uppercase block">Department</span>
                      <span className="text-slate-200">Structural QA/QC</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] font-mono uppercase block">Joining Date</span>
                      <span className="text-slate-200">12-Mar-2023</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] font-mono uppercase block">Contact</span>
                      <span className="text-slate-200">+91 98230 XXXXX</span>
                    </div>
                    <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 text-[10px] font-mono uppercase block">Supervisor</span>
                      <span className="text-slate-200">S. K. Kulkarni</span>
                    </div>
                  </div>

                  {/* Attendance & Leave Quick Stats */}
                  <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Current Month Summary (September)</div>
                    <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-300">Days Present (Verified)</span>
                      <span className="font-mono font-bold text-emerald-400">14 Days</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-300">Approved Leave Balance</span>
                      <span className="font-mono font-bold text-cyan-400">6 Days Available</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-300">Last GPS Punch</span>
                      <span className="font-mono text-slate-400 text-[11px]">Today, 09:02 AM • Baner Tower</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 08 & 09 — LEAVE & PAYROLL INTEGRATION */}
        {/* ========================================================================= */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Box: Leave Management */}
              <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    AVAILABILITY TRACKING
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-3 mb-3">
                    Keep leave and workforce availability organized.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    Leave requests can be initiated directly by employees or site supervisors. Managers approve with full visibility into site staffing needs.
                  </p>

                  {/* Mini Leave Approval UI */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-white">Pending Leave Request</span>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                        REQUIRES MANAGER APPROVAL
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Worker: <strong>Anil Gaikwad</strong> (Tower Crane Operator)</span>
                      <span className="font-mono text-slate-400">Casual Leave (2 Days)</span>
                    </div>
                    <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded">
                      Reason: Family function in village • Substitute operator assigned.
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                        Approve Leave
                      </button>
                      <button className="py-1.5 px-3 rounded-lg bg-slate-800 text-slate-400 text-xs">
                        Decline
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Approved leaves automatically reflect in the daily site muster roll.</span>
                </div>
              </div>

              {/* Right Box: Payroll Preparation */}
              <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    CONSOLIDATED DATA
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-3 mb-3">
                    Connect attendance with payroll.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    Salary and payroll workflows use verified employee and site attendance information. Eliminates end-of-month panic between site supervisors and your accounts department.
                  </p>

                  {/* Mini Payroll Workflow Card */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-white">Monthly Wage Roll Compilation</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        VERIFIED DATA
                      </span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-300">
                        <span>Total Working Days</span>
                        <span className="font-mono font-bold text-white">26 Days</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Verified Site Attendance</span>
                        <span className="font-mono text-emerald-400">24 Days</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Authorized Paid Leaves</span>
                        <span className="font-mono text-cyan-400">2 Days</span>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800 font-bold">
                        <span>Payable Shift Days</span>
                        <span className="font-mono text-amber-400">26 / 26 Days</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Less manual consolidation, cleaner records, and zero calculation discrepancies.</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 10 & 11 — ROLE-BASED ACCESS & CUSTOMIZATION */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900/50 border-y border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  ENTERPRISE GOVERNANCE
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Give every role the access they need.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Different roles have appropriate operational permissions. Site supervisors only see their active projects, HR controls company-wide staff policies, and accountants access salary inputs without altering operational master records.
                </p>

                {/* 6 Confirmed Roles Matrix */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-amber-400">Super Admin / Owner</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Full multi-project visibility and platform configuration.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-cyan-400">HR / Admin</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Central employee records, muster rolls, and approvals.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-indigo-400">Project Manager</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Site-level headcounts, resource allocation, and approvals.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-orange-400">Site Supervisor</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Mobile attendance check-in and daily muster audit.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-emerald-400">Payroll / Accounts</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Attendance consolidation and wage roll export.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-slate-300">Employee</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Personal attendance record and leave submission.</div>
                  </div>
                </div>
              </div>

              {/* Customization Callout Box */}
              <div className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20 p-8 rounded-3xl border border-amber-500/30 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-amber-400">
                    TAILORED ARCHITECTURE
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Your workflow is different. <br />
                    Your HRMS can be too.
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  No two construction firms operate identically. Prajyot Construction HRMS can be configured and customized according to:
                </p>

                <ul className="text-xs sm:text-sm text-slate-300 space-y-2 font-mono">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Project &amp; Site hierarchy rules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Trade &amp; employee classification schemes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Attendance grace periods &amp; geofence radii</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Site supervisor approval workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Specific internal business requirements</span>
                  </li>
                </ul>

                <button
                  onClick={scrollToForm}
                  className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition text-center block cursor-pointer"
                >
                  Talk to Us About Your Workflow
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 12 — ROLE-BASED VALUE */}
        {/* ========================================================================= */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                ROLE-BASED VALUE
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                One platform. <br className="hidden sm:inline" />
                Different teams. One source of truth.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* For HR */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  FOR HR TEAMS
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Centralized Visibility</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Stop chasing site supervisors on phone calls. Get clean, centralized employee records and daily live muster rolls in one place.
                </p>
              </div>

              {/* For Site Supervisors */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/40 transition">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                  FOR SITE SUPERVISORS
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Fast Mobile Punch</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Punch attendance directly from where the work happens. No broken fingerprint devices, no paperwork in dusty site containers.
                </p>
              </div>

              {/* For Management */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition">
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  FOR FOUNDERS &amp; DIRECTORS
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Multi-Project Intel</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  See company-wide workforce allocation and project attendance percentages instantly. Spot site labor deficits before delays hit.
                </p>
              </div>

              {/* For Payroll */}
              <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition">
                <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider mb-2">
                  FOR PAYROLL &amp; ACCOUNTS
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Structured Data</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verified shift days and approved leaves automatically feed into payroll preparation. End the month without manual data entry headaches.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 13 — PRODUCT DASHBOARD SHOWCASE (INTERACTIVE TABS) */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900/70 border-y border-slate-800/80 relative" id="screens">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                PRODUCT SCREENS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Designed for high performance.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Explore actual interface modules built specifically for construction workforce operations.
              </p>
            </div>

            {/* Showcase Tabs */}
            <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
              {[
                { id: "dashboard", label: "Executive Dashboard", icon: BarChart3 },
                { id: "attendance", label: "Mobile Attendance", icon: Smartphone },
                { id: "sitewise", label: "Site Workforce", icon: Building2 },
                { id: "employee", label: "Employee Profile", icon: Users },
                { id: "leave", label: "Leave Requests", icon: Calendar },
                { id: "payroll", label: "Payroll Preparation", icon: CreditCard },
                { id: "roles", label: "Roles & Permissions", icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeScreenTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveScreenTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      active
                        ? "bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Screen Mock Container */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-8 shadow-2xl min-h-[420px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                
                {/* TAB 1: DASHBOARD */}
                {activeScreenTab === "dashboard" && (
                  <motion.div
                    key="dashboard"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full space-y-6 font-sans"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">Central Operations Console</h3>
                        <p className="text-xs text-slate-400">All 14 active project sites reporting in real-time</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                          92.4% AVERAGE SHIFT TURNOUT
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-mono text-slate-400">Total Workforce</div>
                        <div className="text-2xl font-black text-white mt-1">2,840</div>
                        <div className="text-[10px] text-slate-400 mt-1">Across 14 Project Sites</div>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-mono text-emerald-400">Present On Site</div>
                        <div className="text-2xl font-black text-emerald-400 mt-1">2,624</div>
                        <div className="text-[10px] text-emerald-400/80 mt-1">GPS &amp; Selfie Verified</div>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-mono text-rose-400">Absent / No Show</div>
                        <div className="text-2xl font-black text-rose-400 mt-1">142</div>
                        <div className="text-[10px] text-rose-400/80 mt-1">Flagged to Supervisors</div>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div className="text-xs font-mono text-cyan-400">Approved Leaves</div>
                        <div className="text-2xl font-black text-cyan-400 mt-1">74</div>
                        <div className="text-[10px] text-cyan-400/80 mt-1">Roster Adjusted</div>
                      </div>
                    </div>

                    {/* Site Attendance Status Table */}
                    <div className="border border-slate-800 rounded-xl overflow-hidden">
                      <div className="bg-slate-900/80 px-4 py-2.5 text-xs font-mono text-slate-400 border-b border-slate-800 flex justify-between">
                        <span>PROJECT SITE NAME</span>
                        <span>HEADCOUNT &amp; STATUS</span>
                      </div>
                      <div className="divide-y divide-slate-800/80 text-xs">
                        <div className="px-4 py-3 flex justify-between items-center bg-slate-950">
                          <div>
                            <span className="font-bold text-white">Skyline Towers (Baner)</span>
                            <span className="text-slate-400 ml-2 text-[11px]">Commercial • 342 Staff</span>
                          </div>
                          <span className="font-mono text-emerald-400 font-semibold">93.0% Present (318/342)</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center bg-slate-950">
                          <div>
                            <span className="font-bold text-white">Phoenix Warehousing (Chakan)</span>
                            <span className="text-slate-400 ml-2 text-[11px]">Industrial • 215 Staff</span>
                          </div>
                          <span className="font-mono text-emerald-400 font-semibold">94.8% Present (204/215)</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center bg-slate-950">
                          <div>
                            <span className="font-bold text-white">Metro Corridor Viaduct (Sector 4)</span>
                            <span className="text-slate-400 ml-2 text-[11px]">Infrastructure • 490 Staff</span>
                          </div>
                          <span className="font-mono text-emerald-400 font-semibold">92.2% Present (452/490)</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: MOBILE ATTENDANCE */}
                {activeScreenTab === "attendance" && (
                  <motion.div
                    key="attendance"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-lg mx-auto bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <Camera className="w-4 h-4 text-amber-400" />
                        <span>Selfie &amp; Geolocation Punch In</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        GPS ACTIVE
                      </span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Employee:</span>
                        <span className="font-bold text-white">Sandip Kulkarni (Site In-Charge)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Project Site:</span>
                        <span className="text-amber-400 font-semibold">Oberoi Horizon - Kharadi</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Site Geofence:</span>
                        <span className="font-mono text-emerald-400">Lat: 18.5510, Lng: 73.9350 (Inside 45m)</span>
                      </div>
                    </div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                      <div className="text-sm font-bold text-white">Punch In Confirmed at 08:54 AM</div>
                      <div className="text-xs text-slate-400 mt-1">Photo captured &amp; synced with central HR muster roll.</div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: SITE-WISE WORKFORCE */}
                {activeScreenTab === "sitewise" && (
                  <motion.div
                    key="sitewise"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full space-y-4"
                  >
                    <div className="text-sm font-bold text-white border-b border-slate-800 pb-2 flex items-center justify-between">
                      <span>Site Workforce Roster Distribution</span>
                      <span className="text-xs font-mono text-slate-400">Showing Site #02: Chakan Industrial</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Supervisors &amp; Engineers</span>
                        <div className="text-lg font-bold text-white mt-1">18 On Duty</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Skilled Operators (PEB/Machinery)</span>
                        <div className="text-lg font-bold text-amber-400 mt-1">76 On Duty</div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] font-mono text-slate-400 uppercase">General Trades &amp; Labor</span>
                        <div className="text-lg font-bold text-cyan-400 mt-1">110 On Duty</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: EMPLOYEE PROFILE */}
                {activeScreenTab === "employee" && (
                  <motion.div
                    key="employee"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-xl mx-auto bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <div className="font-bold text-white text-sm">Sunil Jadhav</div>
                        <div className="text-slate-400">Quality Control Inspector • Civil Infrastructure</div>
                      </div>
                      <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        VERIFIED RECORD
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div><strong>Emp ID:</strong> PI-ENG-0941</div>
                      <div><strong>Assigned Project:</strong> Metro Viaduct Corridor</div>
                      <div><strong>Date of Joining:</strong> 01-Jan-2022</div>
                      <div><strong>Supervisor:</strong> M. Deshmukh</div>
                      <div><strong>Emergency Phone:</strong> +91 97654 XXXXX</div>
                      <div><strong>KYC Document:</strong> Aadhaar Verified</div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 5: LEAVE REQUESTS */}
                {activeScreenTab === "leave" && (
                  <motion.div
                    key="leave"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-lg mx-auto bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3"
                  >
                    <div className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                      Site Leave Workflow
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="flex justify-between text-slate-300">
                        <span><strong>Worker:</strong> Bharat More (Scaffolding Lead)</span>
                        <span className="font-mono text-cyan-400">Medical Leave (3 Days)</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Site Impact Warning: 4 scaffolding team members available. Temporary lead assigned.
                      </div>
                      <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 p-1.5 rounded">
                        ✓ APPROVED BY PROJECT MANAGER • Mapped to September muster roll
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 6: PAYROLL PREPARATION */}
                {activeScreenTab === "payroll" && (
                  <motion.div
                    key="payroll"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full max-w-xl mx-auto bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs"
                  >
                    <div className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                      Attendance-to-Payroll Consolidation
                    </div>
                    <p className="text-slate-400 text-xs">
                      Verified shift days automatically calculated from mobile GPS punches without manual diary reconciliation.
                    </p>
                    <div className="border border-slate-800 rounded-lg p-3 bg-slate-950 space-y-1.5">
                      <div className="flex justify-between">
                        <span>Monthly Standard Shift Days:</span>
                        <span className="font-mono font-bold text-white">26 Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Verified Punch Attendance:</span>
                        <span className="font-mono text-emerald-400">25 Days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Approved Paid Leave:</span>
                        <span className="font-mono text-cyan-400">1 Day</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-amber-400">
                        <span>Total Payable Days:</span>
                        <span className="font-mono">26.0 Days</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 7: ROLES & PERMISSIONS */}
                {activeScreenTab === "roles" && (
                  <motion.div
                    key="roles"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full space-y-3"
                  >
                    <div className="text-sm font-bold text-white border-b border-slate-800 pb-2">
                      Role-Based Access Matrix
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-amber-400 block mb-1">HR Admin</strong>
                        <p className="text-slate-400 text-[11px]">Can manage company staff master records, approve site shifts, and export verified records.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-cyan-400 block mb-1">Site Supervisor</strong>
                        <p className="text-slate-400 text-[11px]">Can mark and audit attendance only for workers assigned to their specific active site.</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-emerald-400 block mb-1">Payroll Manager</strong>
                        <p className="text-slate-400 text-[11px]">Can read verified shift data and prepare salary outputs without altering site rosters.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 14 — BUILT FOR PROJECT-BASED ORGANIZATIONS */}
        {/* ========================================================================= */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                INDUSTRY ALIGNMENT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Designed for teams that work across locations.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Prajyot Construction HRMS is engineered for companies where employees are distributed across project sites, client plants, and remote field assignments.
              </p>
            </div>

            {/* 8 Industry Use-Case Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "Construction Companies", desc: "Commercial & residential projects with distributed contractor crews." },
                { title: "EPC Contractors", desc: "Engineering, Procurement, and Construction with multi-state site teams." },
                { title: "Infrastructure & Highways", desc: "Roads, bridges, flyovers, and rail corridors stretching across kilometers." },
                { title: "Civil Contracting", desc: "Specialist earthworks, piling, concrete casting, and structural crews." },
                { title: "Industrial Projects", desc: "Factory construction, heavy machinery erection, and refinery expansions." },
                { title: "Real Estate Developers", desc: "Managing in-house site supervisors and engineering staff across towers." },
                { title: "PEB & Turnkey Builders", desc: "Pre-engineered buildings, steel erection teams, and remote fabrication." },
                { title: "Multi-Site Organizations", desc: "Any business deploying skilled personnel to decentralized project sites." },
              ].map((ind) => (
                <div key={ind.title} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 font-mono font-bold text-xs">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{ind.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{ind.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 15 & 16 — WHY PRAJYOT & TRUST GUARANTEES */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-900/60 border-y border-slate-800/80 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  THE TECHNOLOGY PARTNER BEHIND THE PRODUCT
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Built by a software company that understands business workflows.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Prajyot Infotech is a premier software engineering company headquartered in Pune, Maharashtra. We don't just sell off-the-shelf templates — we engineer robust software platforms built to withstand real-world operational challenges.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Workflow-Oriented Engineering:</strong> Built specifically to resolve the friction between project sites, central HR, and payroll.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Configurable to Your Hierarchy:</strong> Tailored to your exact project sites, departments, and supervisor approval chains.</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Long-Term Evolution:</strong> Direct relationship with the actual engineering team for ongoing adaptations and support.</span>
                  </div>
                </div>
              </div>

              {/* Verified Company Assurances */}
              <div className="lg:col-span-6 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest border-b border-slate-800 pb-3">
                  PRAJYOT INFOTECH ENTERPRISE ASSURANCES
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">100% IP &amp; Source Code Handover Option</span>
                    <span className="text-slate-400 text-[11px]">Zero proprietary lock-in. Full enterprise Git repository handover available.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">₹0 Per-Seat Monthly Licensing Penalties</span>
                    <span className="text-slate-400 text-[11px]">No monthly fees punishing you for growing from 100 workers to 2,000 workers.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">60-Day Post-Deployment Bug Warranty</span>
                    <span className="text-slate-400 text-[11px]">Guaranteed complimentary coverage for performance and operational adjustments.</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="font-bold text-white block">Direct Senior Software Architect Access</span>
                    <span className="text-slate-400 text-[11px]">Consult directly with the engineers building your deployment — zero sales middlemen.</span>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 pt-2 flex items-center justify-between">
                  <span>Pune, Maharashtra, India</span>
                  <span className="text-emerald-400">99.98% Cloud SLA</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 17 — FAQ (ACCORDION WITH ALL 14 QUESTIONS) */}
        {/* ========================================================================= */}
        <section className="py-20 relative" id="faq">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center space-y-4 mb-14">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                CLEAR ANSWERS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-slate-300">
                Detailed answers regarding functionality, site attendance, and organization deployment.
              </p>
            </div>

            <div className="space-y-3">
              {faqList.map((item, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={item.q}
                    className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? -1 : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900"
                    >
                      <span className="text-sm sm:text-base font-bold text-white">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-4 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                            {item.a}
                          </div>
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
        {/* SECTION 18 — FINAL CTA & HIGH-CONVERSION B2B LEAD FORM */}
        {/* ========================================================================= */}
        <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-t border-slate-800 relative" id="demo-request-form">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="bg-slate-950 rounded-3xl border border-amber-500/30 p-6 sm:p-10 shadow-[0_0_80px_rgba(245,158,11,0.15)] relative overflow-hidden">
              
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4 mb-10">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  REQUEST A DEMO
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Bring your project workforce and HR onto one system.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  See how Prajyot Construction HRMS can fit the way your teams actually work. Schedule a customized live walkthrough with our senior software architects.
                </p>
              </div>

              {formSubmitted ? (
                <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-5">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Demo Request Recorded!</h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Our senior engineering team will contact you within <span className="text-amber-400 font-bold">2 business hours</span> to arrange your personalized Prajyot Construction HRMS demo.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono text-slate-300 space-y-1.5">
                    <div><span className="text-slate-400">ORGANIZATION:</span> {formData.company || "Construction Company"}</div>
                    <div><span className="text-slate-400">WORKFORCE SIZE:</span> {formData.employeeCount}</div>
                    <div><span className="text-slate-400">ACTIVE SITES:</span> {formData.siteCount}</div>
                    <div><span className="text-slate-400">CONTACT:</span> {formData.phone} • {formData.email}</div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={openWhatsAppDemo}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 text-xs transition cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Instant Connect via WhatsApp</span>
                    </button>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 px-4 text-xs font-semibold transition cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5 max-w-2xl mx-auto">
                  
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono">
                      {formError}
                    </div>
                  )}

                  {/* Name & Designation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Rajesh Patil"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Designation / Role
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        placeholder="e.g. Founder, HR Head, Project Director"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Company & Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Company / Contractor Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. Apex Infra Projects Pvt Ltd"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Industry Segment
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      >
                        {INDUSTRY_OPTIONS.map((ind) => (
                          <option key={ind} value={ind} className="bg-slate-900 text-white">
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Work Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Work Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. rajesh@apexinfra.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Phone Number <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98230 12345"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Staff Count & Active Sites */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Total Number of Employees
                      </label>
                      <select
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      >
                        {EMPLOYEE_RANGES.map((r) => (
                          <option key={r} value={r} className="bg-slate-900 text-white">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                        Number of Active Project Sites
                      </label>
                      <select
                        name="siteCount"
                        value={formData.siteCount}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition"
                      >
                        {SITE_RANGES.map((s) => (
                          <option key={s} value={s} className="bg-slate-900 text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase">
                      Current Workforce Challenges / Specific Requirements <span className="text-slate-500 font-normal lowercase">(optional)</span>
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. Currently tracking 400 workers across 5 sites using paper muster registers; need photo-verified check-in and payroll integration..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition resize-none"
                    />
                  </div>

                  {/* Trust footer */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>100% NDA Privacy Guaranteed</span>
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Architect Response &lt; 2 hrs</span>
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {formSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Zap className="w-4 h-4 animate-spin" />
                        <span>Transmitting Specification...</span>
                      </span>
                    ) : (
                      <>
                        <span>Book a Product Demo</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* STICKY MOBILE CTA BAR (FOR EASY CONVERSION ON PHONES) */}
        {/* ========================================================================= */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-slate-950/95 border-t border-amber-500/30 backdrop-blur-xl flex items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-white leading-tight">Prajyot Construction HRMS</div>
            <div className="text-[10px] text-amber-400 font-mono">Site-to-Payroll Platform</div>
          </div>

          <button
            onClick={scrollToForm}
            className="px-4 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shrink-0 shadow-md shadow-amber-500/20 active:scale-95 transition"
          >
            Book Demo →
          </button>
        </div>

      </div>
    </>
  );
}
