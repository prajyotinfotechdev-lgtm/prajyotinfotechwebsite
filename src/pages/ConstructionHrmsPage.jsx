// src/pages/ConstructionHrmsPage.jsx
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  Calendar,
  CreditCard,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock,
  Smartphone,
  ChevronDown,
  ArrowRight,
  Receipt,
  FileSpreadsheet,
  Check,
  Sparkles,
  Phone,
  ScanFace,
  BarChart3,
  Zap,
  Lock,
  FileText,
  UserCheck,
  Star,
  RefreshCw,
  Sliders,
  DollarSign,
  TrendingUp,
  Award,
  ShieldAlert,
  ArrowUpRight,
  Shield,
  Layers,
  Flame,
  UserPlus,
  Send,
  SlidersHorizontal,
  FileCheck2,
  CheckCircle,
  Laptop,
  Radio,
  CheckCheck,
  HardHat,
  Compass,
  FileBadge,
  Eye,
  Activity,
  Workflow,
  HelpCircle,
  FileSearch,
  CheckSquare,
  AlertOctagon,
  LifeBuoy
} from "lucide-react";

import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { createLead } from "../utils/leadStorage.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const WHATSAPP_NUMBER = "917020708747";

// 5-Tier User Roles based on Product Documentation (Section 6 & 10)
const ROLE_DATA = [
  {
    id: "employee",
    title: "Ground Worker / Staff",
    roleNumber: "Tier 01",
    badge: "Field Worker / Engineer",
    icon: Smartphone,
    color: "amber",
    tagline: "1-Tap Selfie Punch & Instant Payslip",
    summary:
      "Field staff punch in with selfie & GPS location, log daily project timesheets, submit photo expense receipts, and download monthly PDF salary slips.",
    capabilities: [
      "Mobile punch in/out with selfie photo & live GPS coordinates",
      "Daily project task & labor hour logging via timesheets",
      "Instant leave applications with automatic balance validation",
      "Photo receipt upload for instant expense reimbursement claims",
      "Secure download of monthly PDF salary slips directly from dashboard",
    ],
    mockup: {
      screenType: "Field Worker Mobile App",
      badge: "GPS Geofence: Site #3 Metro Tower",
      status: "Attendance Verified â€¢ 08:02 AM",
      metricTitle: "Accrued Wages This Month",
      metricValue: "â‚¹18,500 (24 Shifts Logged)",
      actionTitle: "Daily Task Logged",
      actionDesc: "4.5h Piling + 3.5h RCC Pouring",
    },
  },
  {
    id: "manager",
    title: "Site Supervisor / PM",
    roleNumber: "Tier 02",
    badge: "Site Command",
    icon: UserCheck,
    color: "blue",
    tagline: "Live Site Muster & 30s Gang Punching",
    summary:
      "Site supervisors get a real-time 'Team View' to review attendance, approve leaves, validate project timesheets, and approve emergency site expenses.",
    capabilities: [
      "Live team attendance monitoring & site headcount verification",
      "First-line approval (Level 1) for team leave requests and timesheets",
      "On-site petty cash and emergency material receipt verification",
      "SLA alert notifications for pending approvals",
      "Attendance correction request approvals for missed punch-outs",
    ],
    mockup: {
      screenType: "Supervisor Site Tablet",
      badge: "Live Headcount â€¢ Sector 4",
      status: "48 of 50 Workers On Site",
      metricTitle: "Gang Punch Speed",
      metricValue: "42 Workers in 38 Seconds",
      actionTitle: "Challan Pending Verification",
      actionDesc: "200 Bags UltraTech Cement (â‚¹74,000)",
    },
  },
  {
    id: "hr",
    title: "HR Operations",
    roleNumber: "Tier 03",
    badge: "Tenant-Wide Control",
    icon: Users,
    color: "purple",
    tagline: "Centralized Policies & 1-Click Payroll",
    summary:
      "HR maintains employee profiles, oversees company-wide leave policies, handles attendance corrections, and executes 1-click monthly payroll runs.",
    capabilities: [
      "Centralized digital employee directory & profile management",
      "1-Click biometric & attendance-linked payroll calculation",
      "Automated PDF salary slip generation & instant distribution",
      "Second-line approval (Level 2) for leave policy compliance",
      "Tenant-wide workforce cost & demographic reports",
    ],
    mockup: {
      screenType: "HR Headquarters Console",
      badge: "Month-End Payroll Cycle",
      status: "100% Muster Synchronized",
      metricTitle: "Payroll Execution Speed",
      metricValue: "45 Seconds (150 Employees)",
      actionTitle: "Automated Compliance",
      actionDesc: "0 Duplicate Entries â€¢ PDF Payslips Ready",
    },
  },
  {
    id: "finance",
    title: "Finance & Accounts",
    roleNumber: "Tier 04",
    badge: "Expense Gatekeeper",
    icon: CreditCard,
    color: "emerald",
    tagline: "3-Tier Verification & Clean Bank Payouts",
    summary:
      "Finance acts as the final gatekeeper for expense reimbursements after manager and HR validation, releasing verified payments securely.",
    capabilities: [
      "Final financial clearance & approval for verified expense receipts",
      "Receipt mathematical verification & audit compliance",
      "Direct bank payout file export & cash reimbursement vouchers",
      "Elimination of duplicate vendor billing and unverified cash payouts",
      "Project material expense ledger monitoring",
    ],
    mockup: {
      screenType: "Finance Settlement Ledger",
      badge: "Verified Claims Queue",
      status: "14 Invoices Cleared for Payout",
      metricTitle: "Cleared Site Reimbursements",
      metricValue: "â‚¹1,42,800 Approved",
      actionTitle: "Direct Bank Transfer Export",
      actionDesc: "Single Click NEFT / RTGS File Generated",
    },
  },
  {
    id: "admin",
    title: "Executive Admin / MD",
    roleNumber: "Tier 05",
    badge: "Owner & Managing Director",
    icon: ShieldCheck,
    color: "rose",
    tagline: "Multi-Site 360Â° Radar & Tamper-Proof Audit",
    summary:
      "Business owners get complete multi-site operational visibility, system-wide configuration control, and unalterable background audit logs.",
    capabilities: [
      "Real-time executive dashboard across all active sites & projects",
      "Complete unalterable audit log of every system approval & edit",
      "System-wide workflow policy & SLA escalation configuration",
      "Override capabilities if a site manager is unavailable",
      "Proactive management visibility into workforce costs & bottlenecks",
    ],
    mockup: {
      screenType: "Executive Director Command",
      badge: "6 Active Project Locations",
      status: "284 Total Labor Force Active",
      metricTitle: "Daily Workforce Burn Rate",
      metricValue: "â‚¹1.84 Lakhs / Day Tracked",
      actionTitle: "Unalterable Audit Trail",
      actionDesc: "100% Policy Compliance Logged",
    },
  },
];

// Role Capability Matrix (Section 10 of Spec)
const CAPABILITY_MATRIX = [
  { cap: "Punch In / Out (w/ Selfie & GPS)", emp: true, mgr: true, hr: true, fin: true, adm: true },
  { cap: "Submit Leaves / Expenses / Timesheets", emp: true, mgr: true, hr: true, fin: true, adm: true },
  { cap: "Download Own Salary Slip", emp: true, mgr: true, hr: true, fin: true, adm: true },
  { cap: "View Team Attendance & Leaves", emp: false, mgr: "Direct Reports", hr: "All Staff", fin: false, adm: "All Staff" },
  { cap: "Approve Team Requests", emp: false, mgr: "Level 1", hr: "Level 2", fin: false, adm: "Override" },
  { cap: "Manage Employee Profiles", emp: false, mgr: false, hr: true, fin: false, adm: true },
  { cap: "Final Approval of Expense Payouts", emp: false, mgr: false, hr: false, fin: true, adm: true },
  { cap: "Run & Publish Payroll", emp: false, mgr: false, hr: true, fin: false, adm: true },
  { cap: "View System Audit Logs", emp: false, mgr: false, hr: false, fin: false, adm: true },
];

// End-to-End Business Workflows (Section 8 of Product Spec)
const WORKFLOWS_DATA = [
  {
    id: "leave",
    title: "1. The Leave Approval Journey",
    badge: "Smart Sync & Multi-Tier",
    icon: Calendar,
    color: "amber",
    description:
      "Automated balance verification, manager site coverage assessment, HR compliance sign-off, and intelligent auto-cancellation.",
    steps: [
      {
        step: "01",
        actor: "Ground Employee",
        action: "Checks live balance in app and submits a leave application.",
        note: "System blocks submission if balance is insufficient.",
      },
      {
        step: "02",
        actor: "Site Manager",
        action: "Evaluates project headcount & site coverage, then clicks Approve (Level 1).",
        note: "Ensures site work doesn't stop.",
      },
      {
        step: "03",
        actor: "HR Operations",
        action: "Verifies company-wide leave compliance and grants Final Approval (Level 2).",
        note: "Balance deducted automatically.",
      },
      {
        step: "04",
        actor: "Oibuz System Engine",
        action: "Smart Sync Rule: If worker punches in on site on a leave day, leave auto-cancels.",
        note: "Zero double-booking of paid time.",
      },
    ],
  },
  {
    id: "expense",
    title: "2. The Material & Expense Journey",
    badge: "Photo Proof & 3-Tier Gatekeeper",
    icon: Receipt,
    color: "emerald",
    description:
      "Field photo capture of cement challans & petty cash, 3-tier hierarchical clearance, and instant bank NEFT/RTGS payout export.",
    steps: [
      {
        step: "01",
        actor: "Field Supervisor",
        action: "Buys site supplies (e.g. cement bags), snaps photo of receipt with GPS tag.",
        note: "Location & timestamp embedded.",
      },
      {
        step: "02",
        actor: "Project Manager",
        action: "Validates material delivery on site and grants First Clearance.",
        note: "Confirms materials reached site.",
      },
      {
        step: "03",
        actor: "HR Operations",
        action: "Checks alignment with project budget & expense limits.",
        note: "Eliminates unauthorized claims.",
      },
      {
        step: "04",
        actor: "Finance Gatekeeper",
        action: "Audits receipt math, issues Final Clearance, and exports 1-click bank transfer file.",
        note: "Zero duplicate vendor payouts.",
      },
    ],
  },
  {
    id: "payroll",
    title: "3. The 1-Click Biometric Payroll Journey",
    badge: "45-Second Month-End Run",
    icon: FileSpreadsheet,
    color: "purple",
    description:
      "Instant synchronization of biometric muster rolls, daily wage calculations, overtime, site advances, and automated PDF payslip generation.",
    steps: [
      {
        step: "01",
        actor: "Month-End Trigger",
        action: "HR initiates a new Payroll Run in the central dashboard with 1 click.",
        note: "Zero manual spreadsheet collation.",
      },
      {
        step: "02",
        actor: "Oibuz Calculation Engine",
        action: "Cross-references base pay with GPS attendance, approved leaves, advances, and OT.",
        note: "Zero calculation discrepancies.",
      },
      {
        step: "03",
        actor: "HR & Executive Review",
        action: "HR validates summary figures and publishes the tenant-wide payroll run.",
        note: "Direct export for bank bulk NEFT.",
      },
      {
        step: "04",
        actor: "Employee Mobile Delivery",
        action: "Standardized PDF salary slips are auto-generated and sent directly to workers' apps.",
        note: "Eliminates angry worker wage disputes.",
      },
    ],
  },
];

// Complete Feature Inventory Table (Section 11 of Product Spec)
const FEATURE_INVENTORY = [
  { module: "Attendance", feature: "Mobile Punch In/Out", user: "All Staff", what: "Captures exact time, GPS site coordinates, and selfie photo.", purpose: "Prevents ghost workers & buddy punching." },
  { module: "Attendance", feature: "Auto-Leave Cancellation", user: "System", what: "Automatically cancels pending leave if worker punches in on site.", purpose: "Prevents double-booking of paid time off." },
  { module: "Attendance", feature: "Correction Workflow", user: "Employee, Mgr, HR", what: "Submit fix request for missed punch-outs with supervisor sign-off.", purpose: "Maintains clean muster without penalizing honest workers." },
  { module: "Leaves", feature: "Live Balance Tracking", user: "All Staff, HR", what: "Tracks accrued vs. used paid leave balances automatically.", purpose: "Eliminates Excel spreadsheets for leave tracking." },
  { module: "Leaves", feature: "Multi-Tier Approvals", user: "Manager, HR", what: "Sequential approval chain (Manager â†’ HR) with audit logging.", purpose: "Balances site operational needs with HR policy compliance." },
  { module: "Timesheets", feature: "Project Labor Logging", user: "Employee, Mgr", what: "Logs daily hours against specific construction projects & tasks.", purpose: "Accurate labor cost tracking per sq. ft." },
  { module: "Reimbursements", feature: "Geotagged Photo Receipts", user: "Employee, Finance", what: "Upload challan receipt photos with timestamp & GPS coordinates.", purpose: "Permanent digital proof; stops lost paper bills." },
  { module: "Payroll", feature: "1-Click Calculation Run", user: "HR, Admin", what: "Aggregates base pay, attendance, shifts, advances & deductions.", purpose: "Cuts payroll processing from 4 days to 45 seconds." },
  { module: "Payroll", feature: "Automated PDF Payslips", user: "All Staff", what: "Generates professional salary slips downloadable in mobile app.", purpose: "Self-service for workers; eliminates HR inquiries." },
  { module: "Employees", feature: "Centralized Directory", user: "HR, Admin", what: "Stores full profiles, reporting hierarchy, roles, and compensation.", purpose: "Single source of truth for company workforce." },
  { module: "System", feature: "SLA Escalation Engine", user: "Admin, HR", what: "Flags and escalates requests ignored by managers past SLA time.", purpose: "Breaks site operational bottlenecks automatically." },
  { module: "System", feature: "Tamper-Proof Audit Logs", user: "Admin (MD)", what: "Immutable background logs recording every approval and change.", purpose: "Total transparency and legal/financial accountability." },
];

// Real Construction Case Study Timeline (Section 9 of Spec)
const CASE_STUDY_STEPS = [
  {
    time: "08:00 AM â€¢ Morning Gate Check",
    title: "Face-Scan Site Arrival & Geofence Lock",
    desc: "Workers arrive across Site A, B, and C. They open Oibuz or stand before the supervisor's phone. AI matches facial geometry and GPS locks physical presence.",
    icon: ScanFace,
    tag: "3D Face Verified",
  },
  {
    time: "11:30 AM â€¢ Site Procurement",
    title: "Emergency Cement Purchase with Photo Challan",
    desc: "Supervisor buys 200 bags of emergency cement. He snaps a photo of the bill with GPS metadata. The claim instantly routes to HR and Finance for clearance.",
    icon: Receipt,
    tag: "GPS Tagged Bill",
  },
  {
    time: "02:15 PM â€¢ Mid-Day Smart Sync",
    title: "Automatic Leave Cancellation on Physical Punch",
    desc: "Worker originally requested medical leave but arrived on site to work. Oibuz automatically cancels the pending leave and logs regular daily wages.",
    icon: CheckCircle2,
    tag: "Zero Human Error",
  },
  {
    time: "05:00 PM â€¢ Shift Handover",
    title: "Labor Hours Tagged to Project Timesheets",
    desc: "Workers distribute 8 hours between 'Basement Piling' and 'Wing B Slab'. Site manager validates hour allocation with 1 tap for exact sq. ft. cost audits.",
    icon: Clock,
    tag: "Cost Verified",
  },
  {
    time: "Month-End â€¢ HQ Finance Run",
    title: "1-Click Biometric Payroll & PDF Slips",
    desc: "HR initiates payroll run in 45 seconds. Oibuz factors daily wages, piece-rate, advances, and verified expense claims. Standardized PDF slips arrive on workers' phones.",
    icon: FileSpreadsheet,
    tag: "Zero Wage Disputes",
  },
];

// Contractor Testimonials (Landingfolio Social Proof pattern)
const TESTIMONIALS = [
  {
    quote:
      "Oibuz eliminated ghost workers across our 4 flyover projects. We saved over â‚¹2.2 Lakhs in the very first month by stopping buddy punching.",
    name: "Vikramaditya Shinde",
    role: "Managing Director",
    company: "Apex Infra Developers",
    location: "Pune, Maharashtra",
    metrics: "â‚¹2.2L Saved / Month",
  },
  {
    quote:
      "Earlier, month-end payroll took 4 exhausting days on Excel sheets. With Oibuz 1-click payroll, our HR finishes the entire run in 10 minutes with zero wage disputes.",
    name: "Sanjay Singhania",
    role: "Chief Operations Officer",
    company: "Metro Urban Constructions",
    location: "Navi Mumbai",
    metrics: "4 Days â†’ 10 Mins",
  },
  {
    quote:
      "The offline face scanning is a game changer for remote bridge sites where mobile networks fail. The supervisor punches 40 workers in 30 seconds effortlessly.",
    name: "Karan Oberoi",
    role: "General Contractor",
    company: "Oberoi Civil Engineers",
    location: "Nashik",
    metrics: "100% Offline Reliable",
  },
];

// FAQs tailored to real contractor concerns
const FAQS = [
  {
    q: "Does Oibuz work on remote sites with poor or zero internet connection?",
    a: "Yes, 100%. Site supervisors can mark attendance and scan faces completely offline. All records, timestamps, and GPS coordinates are stored securely on the device and auto-sync to HQ the moment a mobile signal or Wi-Fi is detected.",
  },
  {
    q: "Do field workers need their own smartphones?",
    a: "No. Site supervisors can use a single smartphone to punch an entire labor gang in under 60 seconds. Alternatively, you can place an affordable Android tablet at the site gate as an automated kiosk.",
  },
  {
    q: "Can Oibuz handle daily wage labor (Dihadi), piece-rate workers, and monthly staff?",
    a: "Yes. Oibuz is built specifically for construction and project-based businesses. It supports daily wage labor, piece-rate contractors, overtime calculations, site advances, as well as monthly salaried engineers and office staff.",
  },
  {
    q: "How does Oibuz prevent 'buddy punching' and fake attendance?",
    a: "Every mobile punch requires a live selfie photo matched with facial recognition and mandatory GPS geofencing. A punch is only accepted if the worker is physically present inside the designated site coordinates.",
  },
  {
    q: "What happens if a site manager delays approving leaves or expense claims?",
    a: "Oibuz features an SLA (Service Level Agreement) Escalation Engine. If a manager ignores a pending request beyond the configured time, the system flags and escalates it to HR or Admin to break site bottlenecks.",
  },
  {
    q: "How fast can we deploy Oibuz across our construction sites?",
    a: "You can be live within 24 to 48 hours. No expensive hardware is required. Simply download the app, set up your sites and team, and start tracking verified field operations immediately.",
  },
];

// Partner Logos / Badges
const CLIENT_PARTNERS = [
  "APEX INFRA DEVELOPERS",
  "METRO CITY BUILDERS",
  "SHIVALIK CONSTRUCTIONS",
  "SKYLINE CIVIL TECH",
  "SAHYADRI INFRASTRUCTURE",
];

export default function ConstructionHrmsPage() {
  const { openModal } = useLeadModal();

  // Interactive Live Mobile Punch Simulator State
  const [punchState, setPunchState] = useState("idle"); // idle | scanning | verified
  const [geoLocked, setGeoLocked] = useState(false);

  const triggerLivePunchSim = () => {
    if (punchState === "scanning") return;
    setPunchState("scanning");
    setGeoLocked(false);

    setTimeout(() => {
      setGeoLocked(true);
    }, 900);

    setTimeout(() => {
      setPunchState("verified");
    }, 2000);
  };

  const resetPunchSim = () => {
    setPunchState("idle");
    setGeoLocked(false);
  };

  // Before / After Comparison Slider State
  const [compareMode, setCompareMode] = useState("oibuz"); // "paper" | "oibuz"

  // Active Role state for Interactive 5-Tier Switcher
  const [activeRoleId, setActiveRoleId] = useState("employee");
  const currentRole = useMemo(
    () => ROLE_DATA.find((r) => r.id === activeRoleId) || ROLE_DATA[0],
    [activeRoleId]
  );

  // Active Workflow state for Interactive End-to-End Visualizer (Section 8)
  const [activeWorkflowId, setActiveWorkflowId] = useState("leave");
  const currentWorkflow = useMemo(
    () => WORKFLOWS_DATA.find((w) => w.id === activeWorkflowId) || WORKFLOWS_DATA[0],
    [activeWorkflowId]
  );

  // ROI Calculator state
  const [workersCount, setWorkersCount] = useState(120);
  const [avgDailyWage, setAvgDailyWage] = useState(650);

  const monthlyLeakage = useMemo(() => {
    const dailyWageLossPerWorker = avgDailyWage * 0.07; // 7% proxy time leakage
    const monthlyTotalLoss = workersCount * dailyWageLossPerWorker * 26;
    const hoursSaved = Math.round((workersCount * 26 * 0.05) / 60) + 18;
    return {
      monthlySavings: Math.round(monthlyTotalLoss),
      annualSavings: Math.round(monthlyTotalLoss * 12),
      hoursSaved: hoursSaved,
    };
  }, [workersCount, avgDailyWage]);

  // Lead Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    workers: "50-150 Workers",
    sites: "1-3 Active Sites",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Product Showcase tab state
  const [activeTab, setActiveTab] = useState("Dashboard");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.name,
        phone: formData.phone,
        company: formData.company,
        service: "Oibuz Construction Platform",
        requirements: `Workers: ${formData.workers}, Sites: ${formData.sites}`,
        page: "Construction HRMS Interactive Page",
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("Lead submission error:", err);
      const msg = encodeURIComponent(
        `Hi Prajyot Infotech, I want a live demo of Oibuz Construction Platform for ${formData.company} (${formData.workers}, ${formData.sites}). Name: ${formData.name}, Phone: ${formData.phone}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppDirect = () => {
    const msg = encodeURIComponent(
      "Hi Prajyot Infotech, I'm interested in a live demo of Oibuz Construction Workforce & Business Management Platform. Please share details."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-900 overflow-x-hidden">
      <Seo
        title="Oibuz | Construction Workforce & Business Management Platform"
        description="Every Worker Verified. Every Rupee Accounted. Zero-hardware AI face-scan attendance, GPS geofencing, photo-verified material challans, 5-tier role governance, and 1-click biometric payroll."
        keywords="construction hrms, site attendance app, civil contractor payroll software, Oibuz platform, construction workforce software india, zero ghost workers"
      />
      <BreadcrumbsLd
        items={[
          { name: "Home", item: "/" },
          { name: "Products", item: "/services" },
          { name: "Oibuz Construction Platform", item: "/products/hrms" },
        ]}
      />

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          OIBUZ HERO â€” Reference Image Faithful Rebuild
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

      {/* â”€â”€ NAVBAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-9 w-auto object-contain" />
          </a>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {["Platform", "Features", "For Construction", "Pricing", "Resources"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-700 hover:bg-blue-50/70 rounded-lg transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a href="#demo-form" className="hidden sm:inline-flex text-sm font-semibold text-slate-700 hover:text-blue-700 px-3 py-2 rounded-lg transition-all">
              Login
            </a>
            <a
              href="#demo-form"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-700/20 transition-all hover:-translate-y-px"
            >
              Book a Demo <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </header>

      {/* â”€â”€ HERO BODY â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative overflow-hidden bg-white" style={{ minHeight: "700px" }}>

        {/* -- CONSTRUCTION BACKGROUND: obiz_background.png --------------- */}
        {/* Image has worker on right + crane + building -- perfect composition */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/obiz_background.png')",
            backgroundSize: "cover",
            backgroundPosition: "right center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Left-to-right gradient: pure white left to transparent right */}
        {/* Keeps headline/CTA on clean white; construction scene on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 38%, rgba(255,255,255,0.88) 50%, rgba(255,255,255,0.45) 62%, rgba(255,255,255,0.08) 76%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Subtle cool-blue desaturating tint -- premium SaaS feel */}
        <div className="absolute inset-0 bg-blue-50/15" />

        {/* Bottom fade -- blends hero into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent" />

        {/* â”€â”€ CONTENT GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 pt-12 pb-16 lg:pt-14 lg:pb-18">

            {/* â”€â”€ LEFT COL (42%) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-blue-700 font-bold text-[11px] tracking-[0.18em] uppercase"
              >
                Workforce Management for Construction
              </motion.p>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.07, duration: 0.45 }}
                className="text-[2.5rem] sm:text-[2.9rem] md:text-[3.2rem] font-black text-slate-900 leading-[1.08] tracking-tight"
              >
                Workforce<br />Management<br />
                Built for{" "}
                <span className="text-blue-700">Construction.</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.4 }}
                className="text-slate-500 text-[1rem] leading-[1.7] max-w-[500px]"
              >
                Manage attendance, leave, timesheets, expenses and payroll across your workforce â€” from one connected platform.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.21, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#demo-form"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-700/25 transition-all hover:-translate-y-0.5"
                >
                  Book a Demo
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all"
                >
                  <span className="w-5 h-5 rounded-full border-[1.5px] border-slate-400 flex items-center justify-center shrink-0">
                    <span className="w-0 h-0 border-t-[3.5px] border-t-transparent border-b-[3.5px] border-b-transparent border-l-[6px] border-l-slate-500 ml-0.5" />
                  </span>
                  Explore Platform
                </a>
              </motion.div>

              {/* 4 Feature highlights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="grid grid-cols-4 gap-3 pt-1"
              >
                {[
                  { icon: ScanFace, l1: "Selfie & Location", l2: "Attendance" },
                  { icon: FileSpreadsheet, l1: "Project", l2: "Timesheets" },
                  { icon: CheckCircle2, l1: "Structured", l2: "Approvals" },
                  { icon: CreditCard, l1: "Integrated", l2: "Payroll" },
                ].map(({ icon: Icon, l1, l2 }) => (
                  <div key={l1} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="w-10 h-10 rounded-xl border border-blue-100 bg-blue-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-700 stroke-[1.5]" />
                    </div>
                    <p className="text-[11px] font-semibold text-slate-700 leading-tight">
                      {l1}<br />{l2}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* â”€â”€ RIGHT COL (58%) â€” Dashboard â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.18, duration: 0.65, ease: "easeOut" }}
                className="relative w-full max-w-[660px]"
              >
                {/* Radial blue glow */}
                <div className="absolute -inset-4 rounded-3xl bg-blue-600/10 blur-2xl" />

                {/* â”€â”€ DASHBOARD SHELL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
                <div className="relative bg-white rounded-2xl shadow-2xl shadow-slate-400/30 border border-slate-200 overflow-hidden">

                  {/* Top-bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-white">
                    <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-6 w-auto object-contain" />
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-[11px]">ðŸ””</span>
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-rose-500 border border-white" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">AS</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex">

                    {/* Sidebar */}
                    <div className="hidden sm:flex flex-col bg-[#0f172a] w-[128px] shrink-0 py-2.5">
                      {[
                        { icon: BarChart3, label: "Dashboard", active: true },
                        { icon: Users, label: "Employees" },
                        { icon: Clock, label: "Attendance" },
                        { icon: Calendar, label: "Leave" },
                        { icon: FileSpreadsheet, label: "Timesheets" },
                        { icon: Receipt, label: "Expenses" },
                        { icon: CreditCard, label: "Payroll" },
                        { icon: CheckCircle, label: "Approvals" },
                        { icon: FileText, label: "Reports" },
                        { icon: MapPin, label: "Projects" },
                        { icon: Shield, label: "Settings" },
                      ].map(({ icon: Icon, label, active }) => (
                        <div
                          key={label}
                          className={`flex items-center gap-2 px-2.5 py-[5px] mx-1.5 rounded-lg cursor-pointer ${active ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                          <Icon className="w-3 h-3 shrink-0" />
                          <span className="text-[10.5px] font-medium">{label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-3.5 bg-[#f8fafc]">

                      {/* Greeting */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-[13px] font-bold text-slate-900 leading-tight">Good Morning, Admin</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">Here's what's happening across your workforce today.</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="text-[9px] text-slate-500 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
                            All Sites <ChevronDown className="w-2.5 h-2.5" />
                          </div>
                          <div className="text-[9px] text-slate-500 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 flex items-center gap-0.5">
                            <Calendar className="w-2.5 h-2.5" /> Nov 21, 2024
                          </div>
                        </div>
                      </div>

                      {/* KPI cards */}
                      <div className="grid grid-cols-4 gap-1.5 mb-3">
                        {[
                          { label: "Total Employees", value: "248", icon: Users, ic: "bg-blue-50 text-blue-700", bc: "border-blue-100" },
                          { label: "Present Today", value: "231", icon: CheckCircle2, ic: "bg-emerald-50 text-emerald-600", bc: "border-emerald-100" },
                          { label: "On Leave", value: "12", icon: Calendar, ic: "bg-amber-50 text-amber-600", bc: "border-amber-100" },
                          { label: "Pending Approvals", value: "7", icon: Clock, ic: "bg-rose-50 text-rose-600", bc: "border-rose-100" },
                        ].map(({ label, value, icon: Icon, ic, bc }) => (
                          <div key={label} className={`bg-white rounded-xl p-2 border ${bc} shadow-sm`}>
                            <div className={`w-5 h-5 rounded-md ${ic} flex items-center justify-center mb-1`}>
                              <Icon className="w-3 h-3" />
                            </div>
                            <p className="text-[8.5px] text-slate-500 leading-tight">{label}</p>
                            <p className="text-[15px] font-black text-slate-900 leading-tight">{value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Chart + Activity */}
                      <div className="grid grid-cols-2 gap-2">

                        {/* Bar chart */}
                        <div className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-sm">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[10px] font-bold text-slate-800">Workforce Attendance</p>
                            <div className="text-[8px] text-slate-400 bg-slate-50 border border-slate-200 rounded px-1 py-0.5 flex items-center gap-0.5">
                              This Week <ChevronDown className="w-2 h-2" />
                            </div>
                          </div>
                          <div className="flex items-end justify-between gap-0.5 mb-1" style={{ height: "56px" }}>
                            {[
                              { day: "Mon", h: 78 },
                              { day: "Tue", h: 86 },
                              { day: "Wed", h: 68 },
                              { day: "Thu", h: 90 },
                              { day: "Fri", h: 82 },
                              { day: "Sat", h: 55 },
                            ].map(({ day, h }) => (
                              <div key={day} className="flex-1 flex flex-col items-center gap-0.5">
                                <div className="w-full rounded-t-sm bg-blue-700" style={{ height: `${(h / 100) * 50}px` }} />
                                <span className="text-[7px] text-slate-400">{day}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-0.5 text-[7.5px] text-slate-500">
                              <span className="w-1.5 h-1.5 rounded-sm bg-blue-700 inline-block" /> Present
                            </span>
                            <span className="flex items-center gap-0.5 text-[7.5px] text-slate-500">
                              <span className="w-1.5 h-1.5 rounded-sm bg-blue-200 inline-block" /> Absent
                            </span>
                          </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-sm">
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[10px] font-bold text-slate-800">Recent Activity</p>
                            <a href="#" className="text-[8px] text-blue-600 font-semibold flex items-center gap-0.5">
                              View All <ArrowRight className="w-2 h-2" />
                            </a>
                          </div>
                          <div className="space-y-1.5">
                            {[
                              { dot: "bg-emerald-500", title: "Rahul punched in", sub: "Site A Â· 08:02 AM", time: "5m ago" },
                              { dot: "bg-blue-500", title: "Leave approved", sub: "Amit Sharma Â· 2 days", time: "23m ago" },
                              { dot: "bg-amber-500", title: "Expense submitted", sub: "Site B Â· â‚¹4,850", time: "1h ago" },
                              { dot: "bg-purple-500", title: "Timesheet approved", sub: "Site C", time: "2h ago" },
                            ].map(({ dot, title, sub, time }) => (
                              <div key={title} className="flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${dot} shrink-0`} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-[9.5px] font-semibold text-slate-800 truncate">{title}</p>
                                  <p className="text-[8px] text-slate-400 truncate">{sub}</p>
                                </div>
                                <span className="text-[8px] text-slate-400 shrink-0">{time}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* â”€â”€ AUDIENCE STRIP â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <p className="text-center text-[10.5px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-7">
            Built for Distributed Construction Workforces
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: Building2, title: "Construction Companies", desc: "Manage large workforces across multiple projects" },
              { icon: HardHat, title: "Contractors", desc: "Track teams, attendance and site productivity" },
              { icon: MapPin, title: "Multi-Site Teams", desc: "Get centralized visibility across all locations" },
              { icon: BarChart3, title: "Project-Based Businesses", desc: "Control costs and simplify workforce operations" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-700 stroke-[1.5]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ================================================================
          SECTION 02 â€” THE PROBLEM
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">The Challenge</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Construction workforce management shouldn't live in WhatsApp, paper and spreadsheets.
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
              Managing people across active sites creates operational gaps in attendance, approvals, expenses, timesheets and payroll.
            </p>
          </div>

          {/* Problem â†’ Solution visual transition */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 text-xs font-semibold">
            {["Paper Registers", "WhatsApp Groups", "Excel Sheets", "Manual Processes"].map((item, i) => (
              <React.Fragment key={item}>
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600">{item}</span>
                {i < 3 && <span className="text-slate-300 text-base">â†’</span>}
              </React.Fragment>
            ))}
            <span className="text-slate-300 text-base">â†’</span>
            <span className="px-4 py-1.5 rounded-lg bg-blue-700 text-white font-bold">Oibuz</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: FileText, title: "Manual Attendance", desc: "Paper registers, scattered records and unverified attendance make workforce tracking difficult.", color: "bg-slate-50 border-slate-200" },
              { icon: Layers, title: "Scattered Approvals", desc: "Leave and expense requests can get lost across messages, calls and disconnected processes.", color: "bg-slate-50 border-slate-200" },
              { icon: FileSpreadsheet, title: "Payroll Administration", desc: "HR needs reliable attendance and leave data to prepare payroll without repeated manual reconciliation.", color: "bg-slate-50 border-slate-200" },
              { icon: Eye, title: "Limited Visibility", desc: "Business leaders need a clear view of workforce activity across locations.", color: "bg-slate-50 border-slate-200" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className={`rounded-2xl border p-6 ${color}`}>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-5 h-5 text-slate-600 stroke-[1.5]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 03 â€” ONE PLATFORM / CORE MODULES
          ================================================================ */}
      <section id="features" className="py-20 md:py-28 bg-[#f0f4ff]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">The Platform</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              One platform for your entire workforce.
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
              Oibuz connects employees, managers, HR, finance and business owners through structured digital workflows.
            </p>
          </div>

          {/* Primary modules grid â€” varied sizes for visual hierarchy */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Large feature: Employee Management */}
            <div className="col-span-2 bg-white rounded-2xl border border-blue-100 p-6 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Employee Management</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Centralize employee profiles, roles, salary details and reporting structures in one digital directory.</p>
              </div>
            </div>
            {/* Large feature: Attendance */}
            <div className="col-span-2 bg-white rounded-2xl border border-blue-100 p-6 shadow-sm flex gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Attendance</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Mobile punch in and out with selfie and location capture. Attendance corrections follow an approval workflow.</p>
              </div>
            </div>

            {/* Smaller modules */}
            {[
              { icon: Calendar, title: "Leave Management", desc: "Track balances, submit requests and route approvals through defined levels." },
              { icon: FileSpreadsheet, title: "Timesheets", desc: "Log project hours and tasks daily. Managers validate before payroll." },
              { icon: Receipt, title: "Reimbursements", desc: "Submit digital receipts and route expense claims through approval workflows." },
              { icon: CreditCard, title: "Payroll", desc: "Generate payroll using salary, attendance and approved leave data." },
              { icon: FileText, title: "Salary Slips", desc: "Generate secure PDF salary slips employees can access directly from their dashboard." },
              { icon: BarChart3, title: "Reports & Visibility", desc: "Understand attendance, workforce activity and operational status at a glance." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="col-span-1 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  <Icon className="w-4.5 h-4.5 text-blue-700 stroke-[1.5]" style={{ width: "18px", height: "18px" }} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 04 â€” BUILT FOR CONSTRUCTION
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle construction background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=60')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">Built for Construction</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Your workforce may be spread across sites. Your system shouldn't be.
            </h2>
            <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
              Oibuz brings field-level activity and back-office operations into one connected workforce platform.
            </p>
          </div>

          {/* Multi-site visual */}
          <div className="flex flex-col items-center gap-8">
            {/* Sites row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              {[
                { site: "Site A", items: ["Workers", "Attendance", "Timesheets"] },
                { site: "Site B", items: ["Workers", "Attendance", "Expenses"] },
                { site: "Site C", items: ["Workers", "Attendance", "Approvals"] },
              ].map(({ site, items }) => (
                <div key={site} className="bg-[#f0f4ff] rounded-2xl border border-blue-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <p className="text-sm font-bold text-slate-800">{site}</p>
                  </div>
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-2 py-1.5 border-b border-blue-100 last:border-0">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="text-xs text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-blue-200" />
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-700/25">
                <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-5 w-auto object-contain" />
              </div>
              <div className="w-px h-6 bg-blue-200" />
            </div>

            {/* Role chain */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Manager", icon: UserCheck },
                { label: "HR", icon: Users },
                { label: "Finance", icon: CreditCard },
                { label: "Business Owner", icon: ShieldCheck },
              ].map(({ label, icon: Icon }, i) => (
                <React.Fragment key={label}>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                    <Icon className="w-4 h-4 text-blue-700" />
                    <span className="text-sm font-semibold text-slate-800">{label}</span>
                  </div>
                  {i < 3 && <div className="flex items-center text-slate-300 text-lg">â†’</div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 05 â€” PRODUCT SHOWCASE (Tabbed)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-4">Product Showcase</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">See Oibuz in action.</h2>
            <p className="mt-4 text-slate-400 text-base leading-relaxed">
              One connected workspace for day-to-day workforce operations.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["Dashboard", "Attendance", "Leave", "Timesheets", "Reimbursements", "Payroll"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content â€” realistic UI panels */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            {/* Inner topbar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-7 w-auto" />
                <span className="text-sm font-semibold text-slate-800">{activeTab}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">HR</span>
                </div>
              </div>
            </div>

            <div className="flex min-h-[400px]">
              {/* Sidebar */}
              <div className="hidden md:flex flex-col bg-[#0f172a] w-40 shrink-0 py-3">
                {[
                  { icon: BarChart3, label: "Dashboard" },
                  { icon: Users, label: "Employees" },
                  { icon: Clock, label: "Attendance" },
                  { icon: Calendar, label: "Leave" },
                  { icon: FileSpreadsheet, label: "Timesheets" },
                  { icon: Receipt, label: "Reimbursements" },
                  { icon: CreditCard, label: "Payroll" },
                  { icon: FileText, label: "Reports" },
                  { icon: Shield, label: "Settings" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2.5 px-3 py-1.5 mx-1.5 rounded-lg cursor-pointer ${activeTab === label || (activeTab === "Reimbursements" && label === "Reimbursements")
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[11px] font-medium">{label}</span>
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 bg-[#f8fafc]">
                {activeTab === "Dashboard" && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Good Morning, Admin</h3>
                      <p className="text-xs text-slate-500">Here's what's happening across your workforce today.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { label: "Total Employees", value: "248", icon: Users, color: "bg-blue-50 text-blue-700" },
                        { label: "Present Today", value: "231", icon: CheckCircle2, color: "bg-emerald-50 text-emerald-700" },
                        { label: "On Leave", value: "12", icon: Calendar, color: "bg-amber-50 text-amber-700" },
                        { label: "Pending Approvals", value: "7", icon: Clock, color: "bg-rose-50 text-rose-600" },
                      ].map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                          <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center mb-2`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] text-slate-500">{label}</p>
                          <p className="text-xl font-black text-slate-900">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                        <p className="text-sm font-bold text-slate-800 mb-3">Workforce Attendance â€” This Week</p>
                        <div className="flex items-end gap-2 h-24">
                          {[85, 90, 75, 88, 92, 60].map((v, i) => (
                            <div key={i} className="flex-1 flex flex-col gap-0.5 items-center justify-end h-full">
                              <div className="w-full rounded-t bg-blue-700" style={{ height: `${(v / 100) * 80}px` }} />
                              <span className="text-[9px] text-slate-400">{["M", "T", "W", "T", "F", "S"][i]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-bold text-slate-800">Recent Activity</p>
                          <span className="text-xs text-blue-600">View All â†’</span>
                        </div>
                        {[
                          { icon: "ðŸŸ¢", text: "Rahul punched in", sub: "Site A Â· 08:02 AM" },
                          { icon: "ðŸ“…", text: "Leave approved", sub: "Amit Sharma Â· 2 days" },
                          { icon: "ðŸ§¾", text: "Expense submitted", sub: "Site B Â· â‚¹4,850" },
                          { icon: "âœ…", text: "Timesheet approved", sub: "Site C" },
                        ].map(({ icon, text, sub }) => (
                          <div key={text} className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
                            <span className="text-sm">{icon}</span>
                            <div>
                              <p className="text-xs font-semibold text-slate-800">{text}</p>
                              <p className="text-[10px] text-slate-500">{sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Attendance" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Attendance</h3>
                        <p className="text-xs text-slate-500">Today's attendance across all sites</p>
                      </div>
                      <button className="text-xs bg-blue-700 text-white px-3 py-1.5 rounded-lg font-semibold">Export</button>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="grid grid-cols-5 gap-0 px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        <span className="col-span-2">Employee</span>
                        <span>Punch In</span>
                        <span>Status</span>
                        <span>Site</span>
                      </div>
                      {[
                        { name: "Rahul Sharma", role: "Field Worker", time: "08:02 AM", status: "Present", site: "Site A", color: "bg-emerald-100 text-emerald-700" },
                        { name: "Amit Patel", role: "Supervisor", time: "08:15 AM", status: "Present", site: "Site B", color: "bg-emerald-100 text-emerald-700" },
                        { name: "Suresh Kumar", role: "Engineer", time: "â€”", status: "On Leave", site: "Site C", color: "bg-amber-100 text-amber-700" },
                        { name: "Priya Nair", role: "HR Executive", time: "09:00 AM", status: "Present", site: "HQ", color: "bg-emerald-100 text-emerald-700" },
                        { name: "Ravi Desai", role: "Field Worker", time: "â€”", status: "Absent", site: "Site A", color: "bg-red-100 text-red-600" },
                      ].map(({ name, role, time, status, site, color }) => (
                        <div key={name} className="grid grid-cols-5 gap-0 px-4 py-3 border-b border-slate-50 last:border-0 items-center">
                          <div className="col-span-2 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">{name[0]}</div>
                            <div>
                              <p className="text-xs font-semibold text-slate-900">{name}</p>
                              <p className="text-[10px] text-slate-500">{role}</p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-700">{time}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${color}`}>{status}</span>
                          <span className="text-xs text-slate-600">{site}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Leave" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Leave Requests</h3>
                        <p className="text-xs text-slate-500">Pending and recent leave applications</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="grid grid-cols-5 px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        <span className="col-span-2">Employee</span>
                        <span>Duration</span>
                        <span>Status</span>
                        <span>Action</span>
                      </div>
                      {[
                        { name: "Vikram Singh", leave: "Sick Leave", dates: "Dec 5â€“6 (2d)", status: "Pending Manager", action: true },
                        { name: "Meera Joshi", leave: "Casual Leave", dates: "Dec 3 (1d)", status: "Approved", action: false },
                        { name: "Rakesh Gupta", leave: "Earned Leave", dates: "Dec 8â€“10 (3d)", status: "Pending HR", action: false },
                        { name: "Sunita Patil", leave: "Sick Leave", dates: "Nov 28 (1d)", status: "Approved", action: false },
                      ].map(({ name, leave, dates, status, action }) => (
                        <div key={name} className="grid grid-cols-5 px-4 py-3 border-b border-slate-50 last:border-0 items-center">
                          <div className="col-span-2 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">{name[0]}</div>
                            <div>
                              <p className="text-xs font-semibold text-slate-900">{name}</p>
                              <p className="text-[10px] text-slate-500">{leave}</p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-600">{dates}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${status === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{status}</span>
                          {action
                            ? <div className="flex gap-1"><button className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded font-semibold">Approve</button><button className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold">Decline</button></div>
                            : <span className="text-[10px] text-slate-400">â€”</span>
                          }
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Timesheets" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Timesheets â€” This Week</h3>
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="grid grid-cols-4 px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        <span className="col-span-2">Employee / Project</span>
                        <span>Hours</span>
                        <span>Status</span>
                      </div>
                      {[
                        { name: "Suresh Kumar", project: "Wing B â€” RCC Slab", hours: "40h", status: "Submitted" },
                        { name: "Rahul Sharma", project: "Foundation â€” Basement", hours: "36h", status: "Approved" },
                        { name: "Anita Das", project: "Site C â€” Electrical", hours: "38h", status: "Pending" },
                        { name: "Mohan Reddy", project: "Wing A â€” Plastering", hours: "42h", status: "Approved" },
                      ].map(({ name, project, hours, status }) => (
                        <div key={name} className="grid grid-cols-4 px-4 py-3 border-b border-slate-50 last:border-0 items-center">
                          <div className="col-span-2">
                            <p className="text-xs font-semibold text-slate-900">{name}</p>
                            <p className="text-[10px] text-slate-500">{project}</p>
                          </div>
                          <span className="text-sm font-bold text-slate-900">{hours}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${status === "Approved" ? "bg-emerald-100 text-emerald-700" : status === "Submitted" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Reimbursements" && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900">Expense Reimbursements</h3>
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="grid grid-cols-5 px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        <span className="col-span-2">Employee / Category</span>
                        <span>Amount</span>
                        <span>Stage</span>
                        <span>Status</span>
                      </div>
                      {[
                        { name: "Amit Patel", cat: "Site Materials", amount: "â‚¹4,850", stage: "Manager", status: "Pending" },
                        { name: "Vikram Singh", cat: "Travel", amount: "â‚¹1,200", stage: "HR", status: "In Review" },
                        { name: "Priya Nair", cat: "Office Supplies", amount: "â‚¹680", stage: "Finance", status: "Approved" },
                        { name: "Ravi Desai", cat: "Site Equipment", amount: "â‚¹8,400", stage: "Finance", status: "Approved" },
                      ].map(({ name, cat, amount, stage, status }) => (
                        <div key={name} className="grid grid-cols-5 px-4 py-3 border-b border-slate-50 last:border-0 items-center">
                          <div className="col-span-2">
                            <p className="text-xs font-semibold text-slate-900">{name}</p>
                            <p className="text-[10px] text-slate-500">{cat}</p>
                          </div>
                          <span className="text-xs font-bold text-slate-900">{amount}</span>
                          <span className="text-[10px] text-slate-500">{stage}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit ${status === "Approved" ? "bg-emerald-100 text-emerald-700" : status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>{status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Payroll" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Payroll â€” November 2024</h3>
                        <p className="text-xs text-slate-500">Generated from attendance and approved leave data</p>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full">Processing</span>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                      <div className="grid grid-cols-5 px-4 py-2 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                        <span className="col-span-2">Employee</span>
                        <span>Gross</span>
                        <span>Deductions</span>
                        <span>Net</span>
                      </div>
                      {[
                        { name: "Rahul Sharma", role: "Field Worker", gross: "â‚¹22,000", ded: "â‚¹2,100", net: "â‚¹19,900" },
                        { name: "Priya Nair", role: "HR Executive", gross: "â‚¹38,000", ded: "â‚¹3,800", net: "â‚¹34,200" },
                        { name: "Amit Patel", role: "Supervisor", gross: "â‚¹30,000", ded: "â‚¹3,000", net: "â‚¹27,000" },
                        { name: "Suresh Kumar", role: "Engineer", gross: "â‚¹45,000", ded: "â‚¹4,500", net: "â‚¹40,500" },
                      ].map(({ name, role, gross, ded, net }) => (
                        <div key={name} className="grid grid-cols-5 px-4 py-3 border-b border-slate-50 last:border-0 items-center">
                          <div className="col-span-2">
                            <p className="text-xs font-semibold text-slate-900">{name}</p>
                            <p className="text-[10px] text-slate-500">{role}</p>
                          </div>
                          <span className="text-xs text-slate-700">{gross}</span>
                          <span className="text-xs text-rose-600">{ded}</span>
                          <span className="text-xs font-bold text-slate-900">{net}</span>
                        </div>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold shadow-md shadow-blue-700/20 hover:bg-blue-800 transition-all">
                      <FileText className="w-4 h-4" /> Generate Salary Slips
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 06 â€” HOW OIBUZ WORKS
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">How It Works</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple for employees. Structured for management.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-blue-100 z-0" />
            {[
              { step: "01", icon: Smartphone, label: "Capture", desc: "Employees submit attendance, leave, timesheets or expenses." },
              { step: "02", icon: UserCheck, label: "Review", desc: "Managers review information from their direct teams." },
              { step: "03", icon: ShieldCheck, label: "Control", desc: "HR and Finance handle policy and financial workflows where applicable." },
              { step: "04", icon: BarChart3, label: "Manage", desc: "Business leaders get centralized visibility into workforce operations." },
            ].map(({ step, icon: Icon, label, desc }) => (
              <div key={step} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-700 flex items-center justify-center mb-4 shadow-lg shadow-blue-700/25">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-1">{step}</span>
                <h3 className="text-base font-black text-slate-900 mb-2">{label}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">{desc}</p>
              </div>
            ))}
          </div>

          {/* Role chain */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
            {["Employee", "Manager", "HR", "Finance", "Admin / Business Owner"].map((r, i) => (
              <React.Fragment key={r}>
                <span className={`px-3 py-1.5 rounded-lg border ${i === 0 ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-white border-slate-200 text-slate-700"}`}>{r}</span>
                {i < 4 && <span className="text-blue-300">â†’</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 07 â€” ONE PLATFORM. EVERY ROLE.
          ================================================================ */}
      <section className="py-20 md:py-28 bg-[#f0f4ff]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">Role-Based Access</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">One platform. Every role.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                icon: Smartphone, role: "Employee", color: "bg-blue-700",
                capabilities: ["Punch in/out", "Submit leave", "Log timesheets", "Submit expenses", "Download salary slips"],
              },
              {
                icon: UserCheck, role: "Manager", color: "bg-blue-600",
                capabilities: ["View team attendance", "Review leave requests", "Approve timesheets", "Validate reimbursements"],
              },
              {
                icon: Users, role: "HR", color: "bg-indigo-700",
                capabilities: ["Manage employees", "Manage attendance", "Manage leave policies", "Handle payroll", "Workforce records"],
              },
              {
                icon: CreditCard, role: "Finance", color: "bg-slate-700",
                capabilities: ["Review reimbursements", "Verify approved claims", "Final reimbursement approval"],
              },
              {
                icon: ShieldCheck, role: "Admin", color: "bg-slate-900",
                capabilities: ["Organization-wide view", "Policy configuration", "Audit logs", "Workflow oversight"],
              },
            ].map(({ icon: Icon, role, color, capabilities }) => (
              <div key={role} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className={`${color} px-4 py-4 flex items-center gap-3`}>
                  <Icon className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-sm">{role}</span>
                </div>
                <div className="p-4 space-y-2">
                  {capabilities.map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 leading-tight">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 08 â€” FEATURE SPOTLIGHTS (Alternating)
          ================================================================ */}
      {[
        {
          id: "spotlight-1",
          badge: "Attendance",
          title: "Attendance you can trust.",
          desc: "Employees can punch in and out from their mobile device with selfie and location capture. Attendance corrections can follow an approval workflow where needed.",
          icon: Clock,
          bg: "bg-white",
          panel: (
            <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-[#0f172a] px-4 py-3 flex items-center gap-2">
                <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-5 w-auto" />
                <span className="text-xs text-slate-400">Attendance</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="bg-white rounded-xl border border-emerald-100 p-4 flex items-start gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Punch Recorded</p>
                    <p className="text-[11px] text-slate-500">Rahul Sharma Â· Site A Â· 08:02 AM</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Location captured at punch in</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-blue-100 p-4 flex items-start gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                    <ScanFace className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Selfie Captured</p>
                    <p className="text-[11px] text-slate-500">Photo taken at punch time</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-100 p-4 flex items-start gap-3 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Correction Request</p>
                    <p className="text-[11px] text-slate-500">Suresh Kumar Â· Missed punch-out Â· Pending</p>
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          id: "spotlight-2",
          badge: "Approvals",
          title: "Approvals that don't disappear.",
          desc: "Leave, timesheets and reimbursements move through defined approval workflows so requests remain visible and accountable at every stage.",
          icon: CheckCircle,
          bg: "bg-[#f0f4ff]",
          panel: (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-3">
              <p className="text-xs font-bold text-slate-800 mb-2">Leave Request â€” Vikram Singh</p>
              {[
                { label: "Submitted", desc: "Dec 5 Â· Sick Leave Â· 2 days", done: true },
                { label: "Manager Review", desc: "Amit Patel â€” Approved", done: true },
                { label: "HR Review", desc: "Priya Nair â€” Approved", done: true },
                { label: "Completed", desc: "Leave reflected in attendance", done: true },
              ].map(({ label, desc, done }, i) => (
                <div key={label} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-blue-600" : "bg-slate-200"}`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div className={`flex-1 pb-3 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                    <p className="text-xs font-bold text-slate-900">{label}</p>
                    <p className="text-[11px] text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          id: "spotlight-3",
          badge: "Payroll",
          title: "Payroll built from workforce data.",
          desc: "Payroll uses employee salary information together with attendance and approved leave data to prepare monthly payroll for review and distribution.",
          icon: CreditCard,
          bg: "bg-white",
          panel: (
            <div className="bg-[#f8fafc] rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-[#0f172a] px-4 py-3">
                <span className="text-xs text-slate-300 font-semibold">Payroll â€” November 2024</span>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { name: "Rahul Sharma", gross: "â‚¹22,000", net: "â‚¹19,900", status: "Ready" },
                  { name: "Priya Nair", gross: "â‚¹38,000", net: "â‚¹34,200", status: "Ready" },
                  { name: "Amit Patel", gross: "â‚¹30,000", net: "â‚¹27,000", status: "Ready" },
                ].map(({ name, gross, net, status }) => (
                  <div key={name} className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{name}</p>
                      <p className="text-[10px] text-slate-500">Gross: {gross}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900">{net}</p>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{status}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold mt-2">Generate Salary Slips</button>
              </div>
            </div>
          ),
        },
        {
          id: "spotlight-4",
          badge: "Visibility",
          title: "Visibility for the people running the business.",
          desc: "See workforce attendance, requests, activity and operational status from centralized dashboards. Business leaders get the information they need without relying on manual reports.",
          icon: BarChart3,
          bg: "bg-[#f0f4ff]",
          panel: (
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-5 space-y-3">
              <p className="text-xs font-bold text-slate-800">Admin Dashboard â€” Overview</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Attendance Today", value: "231 / 248", color: "text-blue-700" },
                  { label: "Pending Approvals", value: "7 Requests", color: "text-amber-600" },
                  { label: "On Leave", value: "12 Employees", color: "text-slate-700" },
                  { label: "Open Expenses", value: "4 Claims", color: "text-slate-700" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                    <p className="text-[10px] text-slate-500 mb-1">{label}</p>
                    <p className={`text-sm font-black ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <p className="text-[10px] text-slate-500 mb-2">Workforce Activity</p>
                <div className="flex items-end gap-1 h-10">
                  {[70, 80, 65, 90, 85, 55, 92].map((v, i) => (
                    <div key={i} className="flex-1 bg-blue-600 rounded-sm" style={{ height: `${(v / 100) * 40}px` }} />
                  ))}
                </div>
              </div>
            </div>
          ),
        },
      ].map(({ id, badge, title, desc, icon: Icon, bg, panel }, idx) => (
        <section key={id} className={`py-16 md:py-24 ${bg}`}>
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon className="w-3 h-3" /> {badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4">{title}</h2>
                <p className="text-slate-500 text-base leading-relaxed mb-6">{desc}</p>
                <a href="#demo-form" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-all shadow-md shadow-blue-700/20">
                  See this in action <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>{panel}</div>
            </div>
          </div>
        </section>
      ))}

      {/* ================================================================
          SECTION 09 â€” A TYPICAL DAY WITH OIBUZ
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-top opacity-[0.04]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=60')" }}
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">Workflow</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">A typical day with Oibuz.</h2>
            <p className="mt-4 text-slate-500 text-base leading-relaxed">
              From the first punch-in to month-end payroll, workforce information stays connected.
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-blue-100 hidden sm:block" />
            <div className="space-y-8">
              {[
                { time: "08:00 AM", title: "Site workers punch in.", desc: "Employees open the Oibuz app and punch in. Selfie and location are captured during attendance." },
                { time: "11:30 AM", title: "A site expense is submitted.", desc: "A supervisor submits a material expense with a receipt photo. The claim routes through the approval workflow." },
                { time: "02:15 PM", title: "Attendance correction submitted.", desc: "An employee who missed a punch-out submits a correction request. It routes to the manager for review." },
                { time: "05:00 PM", title: "Project hours reviewed.", desc: "Employees submit daily timesheets against projects. Managers review and validate hour allocations." },
                { time: "Month End", title: "HR runs payroll.", desc: "Payroll is prepared using salary data, attendance records and approved leave information. Salary slips are distributed." },
              ].map(({ time, title, desc }, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-[55px] h-[55px] rounded-full bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-700/20 text-white text-[10px] font-black text-center leading-tight z-10">
                      {time.split(" ").join("\n")}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex-1">
                    <h3 className="text-sm font-black text-slate-900 mb-1">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 10 â€” WHY OIBUZ
          ================================================================ */}
      <section className="py-20 md:py-28 bg-[#f0f4ff]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">Why Oibuz</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Replace disconnected processes with one source of truth.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: ShieldCheck, title: "Accountability", desc: "Structured workflows and audit history keep important actions traceable." },
              { icon: FileCheck2, title: "Less Paperwork", desc: "Digitize attendance, leave requests, expense claims and timesheets." },
              { icon: Zap, title: "Faster Administration", desc: "Keep workforce information together instead of reconciling separate sources." },
              { icon: Lock, title: "Clear Ownership", desc: "Defined roles determine who reviews and approves each workflow." },
              { icon: Eye, title: "Centralized Visibility", desc: "Management can see workforce information through one connected platform." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-blue-50 p-5 shadow-sm text-center">
                <div className="w-11 h-11 rounded-xl bg-blue-700 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 11 â€” CONTROL & SECURITY (Dark navy)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-[#0f172a]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-4">Enterprise Control</p>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Built with control and accountability in mind.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: Lock, title: "Role-Based Access", desc: "Users only access data appropriate to their role. Employees see their own records. Managers see their teams. Admins see the full picture.", badge: "Access Control" },
              { icon: CheckCircle, title: "Approval Workflows", desc: "Requests move through defined approval levels. Leave, timesheets and reimbursements each follow a structured review chain.", badge: "Workflow" },
              { icon: FileSearch, title: "Audit Logging", desc: "Critical actions are recorded for accountability. The system keeps a structured history of approvals, changes and key events.", badge: "Transparency" },
              { icon: Zap, title: "SLA Escalations", desc: "Delayed requests can be escalated to prevent workflow bottlenecks. If a manager doesn't act within the configured SLA, the system flags and escalates.", badge: "Reliability" },
            ].map(({ icon: Icon, title, desc, badge }) => (
              <div key={title} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6 flex gap-5">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-white">{title}</h3>
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded-full">{badge}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 12 â€” BUSINESS VISIBILITY (Light blue)
          ================================================================ */}
      <section className="py-20 md:py-28 bg-[#f0f4ff]">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">Information Flow</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              From site-level activity to business-level visibility.
            </h2>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-col items-center gap-3">
            {[
              { label: "Multiple Sites", sub: "Attendance Â· Timesheets Â· Expenses", icon: Building2 },
              { label: "Workforce Data", sub: "Collected & structured in Oibuz", icon: Users },
              { label: "Approvals", sub: "Manager â†’ HR â†’ Finance workflows", icon: CheckCircle },
              { label: "HR & Finance", sub: "Payroll Â· Reimbursements Â· Records", icon: FileText },
              { label: "Leadership", sub: "Dashboard Â· Reports Â· Audit", icon: BarChart3 },
            ].map(({ label, sub, icon: Icon }, i) => (
              <React.Fragment key={label}>
                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-6 py-4 flex items-center gap-4 w-full max-w-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500">{sub}</p>
                  </div>
                </div>
                {i < 4 && <div className="w-px h-6 bg-blue-200" />}
              </React.Fragment>
            ))}
          </div>

          {/* Dashboard category tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
            {[
              { label: "Attendance", icon: Clock, color: "bg-blue-50 border-blue-100 text-blue-700" },
              { label: "Approvals", icon: CheckCircle, color: "bg-emerald-50 border-emerald-100 text-emerald-700" },
              { label: "Workforce", icon: Users, color: "bg-indigo-50 border-indigo-100 text-indigo-700" },
              { label: "Payroll", icon: CreditCard, color: "bg-slate-50 border-slate-200 text-slate-700" },
            ].map(({ label, icon: Icon, color }) => (
              <div key={label} className={`${color} border rounded-2xl p-4 flex flex-col items-center gap-2 text-center`}>
                <Icon className="w-6 h-6" />
                <p className="text-sm font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 13 â€” FAQ
          ================================================================ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">FAQ</p>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-2">
            {[
              { q: "What is Oibuz?", a: "Oibuz is a construction-focused workforce and business management platform. It helps construction companies, contractors and project-based businesses manage employee attendance, leave, timesheets, expenses, payroll and salary slips through structured digital workflows." },
              { q: "Who is Oibuz designed for?", a: "Oibuz is designed primarily for construction companies, civil contractors, multi-site teams and project-based businesses that manage distributed workforces across multiple locations." },
              { q: "How does attendance verification work?", a: "Employees punch in and out using the Oibuz mobile app. The app captures a selfie photo and location at the time of punching. If a punch-out is missed, employees can submit an attendance correction request which routes through an approval workflow." },
              { q: "Can employees submit leave and expense requests?", a: "Yes. Employees can submit leave applications, view their leave balances and track request status. They can also submit expense reimbursement claims with receipt information that route through the defined approval workflow." },
              { q: "Does Oibuz support project timesheets?", a: "Yes. Employees can log hours against specific construction projects and tasks. Managers review and validate these timesheets before they feed into payroll." },
              { q: "How does the payroll workflow work?", a: "Payroll is prepared using employee salary information, attendance data and approved leave records. HR runs payroll through the Oibuz platform, reviews the summary and publishes the run for salary slip distribution." },
              { q: "How do employees receive salary slips?", a: "Once payroll is published, PDF salary slips are generated and made available to employees directly through the Oibuz platform, so employees can access their own pay information without contacting HR." },
              { q: "What roles are supported?", a: "Oibuz supports five primary roles: Employee, Manager, HR, Finance and Admin. Each role has defined access and responsibilities within the platform." },
              { q: "How does role-based access work?", a: "Each user only sees and manages information appropriate to their role. Employees see their own records. Managers see their direct teams. HR has broader access for workforce management. Finance handles reimbursement approvals. Admins have organization-wide visibility and configuration access." },
              { q: "Can Oibuz support distributed construction teams?", a: "Yes. Oibuz is specifically designed for teams working across multiple sites and locations. Workforce data from all sites is centralized in one platform, giving managers and leadership visibility across the full operation." },
            ].map(({ q, a }, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? -1 : i)}
                >
                  <span className="text-sm font-bold text-slate-900 pr-4">{q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaqIndex === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                        {a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 14 â€” FINAL CTA (Dark navy)
          ================================================================ */}
      <section className="py-24 md:py-32 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/10" />
        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-5">
            Bring your workforce operations into one system.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            See how Oibuz can fit your employees, projects, sites and approval workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#demo-form"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5"
            >
              Book a Demo <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
            <button
              onClick={openWhatsAppDirect}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-base transition-all"
            >
              <Phone className="w-4 h-4" /> Talk to Our Team
            </button>
          </div>
          <p className="text-slate-600 text-sm font-semibold tracking-wide">Built for construction. Designed for control.</p>
        </div>
      </section>

      {/* ================================================================
          SECTION 15 â€” DEMO FORM
          ================================================================ */}
      <section id="demo-form" className="py-20 md:py-28 bg-[#f8fafc]">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: copy */}
            <div>
              <p className="text-blue-700 font-bold text-xs tracking-widest uppercase mb-4">Get Started</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
                Request a Demo
              </h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                Share your details and our team will get in touch to walk you through Oibuz â€” tailored to your construction operation.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Users, text: "Understand how Oibuz fits your workforce structure" },
                  { icon: Building2, text: "See workflows configured for your sites" },
                  { icon: CheckCircle, text: "Get answers to your operational questions" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-blue-700" />
                    </div>
                    <p className="text-sm text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">Request Received</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Thank you. Our team will reach out to schedule your Oibuz demo shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: "name", label: "Your Name", type: "text", placeholder: "Rajesh Sharma" },
                    { name: "company", label: "Company Name", type: "text", placeholder: "Apex Constructions" },
                    { name: "phone", label: "Phone / WhatsApp", type: "tel", placeholder: "+91 90000 00000" },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Employees</label>
                      <select
                        name="workers"
                        value={formData.workers}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {["< 50 Employees", "50â€“150 Employees", "150â€“500 Employees", "500+ Employees"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Active Sites</label>
                      <select
                        name="sites"
                        value={formData.sites}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {["1 Site", "2â€“3 Sites", "4â€“10 Sites", "10+ Sites"].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    {isSubmitting ? "Submitting..." : <><span>Request a Demo</span><ArrowRight className="w-4 h-4" /></>}
                  </button>
                  <p className="text-center text-[11px] text-slate-400">No spam. Our construction tech team will be in touch.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 16 â€” FOOTER
          ================================================================ */}
      <footer className="bg-[#0f172a] border-t border-slate-800 pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-9 w-auto mb-4 brightness-0 invert" />
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                Workforce management for construction and project-based businesses.
              </p>
              <p className="text-slate-600 text-xs mt-4 font-medium">A Prajyot Infotech Product</p>
            </div>
            {/* Platform */}
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Platform</p>
              <div className="space-y-2.5">
                {["Platform", "Features", "For Construction", "How It Works", "FAQ"].map((item) => (
                  <a key={item} href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">{item}</a>
                ))}
              </div>
            </div>
            {/* Company */}
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Company</p>
              <div className="space-y-2.5">
                {[
                  { label: "About", href: "/about" },
                  { label: "Prajyot Infotech", href: "/" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms & Conditions", href: "#" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="block text-sm text-slate-400 hover:text-white transition-colors">{label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-600 text-xs">Â© {new Date().getFullYear()} Oibuz Â· Prajyot Infotech. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#demo-form" className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors">Book a Demo â†’</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile sticky bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 flex items-center gap-3 shadow-lg">
        <button
          onClick={openWhatsAppDirect}
          className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>WhatsApp Us</span>
        </button>
        <a
          href="#demo-form"
          className="flex-1 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <span>Book a Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
