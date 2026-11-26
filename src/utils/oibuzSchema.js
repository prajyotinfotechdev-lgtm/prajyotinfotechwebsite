// src/utils/oibuzSchema.js

export const OIBUZ_SOFTWARE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  "@id": "https://www.prajyotinfotech.in/oibuz#software",
  name: "OIBUZ Construction HRMS & Workforce Management Platform",
  alternateName: ["OIBUZ", "Oibuz HRMS", "OIBUZ Construction Attendance App"],
  url: "https://www.prajyotinfotech.in/oibuz",
  sameAs: ["https://www.oibuz.in", "https://www.oibuz.in/register"],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Construction Workforce Management & HRMS",
  operatingSystem: "Web, Android, iOS",
  inLanguage: ["en-IN", "hi-IN", "mr-IN"],
  image: "https://www.prajyotinfotech.in/og/og-oibuz.jpg",
  screenshot: "https://www.prajyotinfotech.in/og/og-oibuz.jpg",
  description:
    "OIBUZ is an Indian construction workforce management and HRMS SaaS platform built by Prajyot Infotech. Eliminates ghost workers and paper muster rolls using mobile GPS geofenced selfie attendance, project timesheets, expense receipts, 5-tier approval governance, and 1-click daily-wage & monthly payroll.",
  featureList: [
    "GPS Geofenced Mobile Selfie Attendance (Zero Biometric Hardware)",
    "Supervisor 30-Second Crew / Gang Attendance Verification",
    "Daily Wage (Dihadi), Piece-Rate & Monthly Staff Payroll Engine",
    "Project & Task Labour Timesheets by Active Construction Site",
    "Photo-Verified Site Material & Petty Cash Expense Claims",
    "5-Tier Role-Based Access Control (Worker, Site Manager, HR, Finance, Admin)",
    "Automated SLA Escalation Engine for Stalled Site Approvals",
    "Instant Self-Downloadable PDF Salary Slips",
  ],
  creator: {
    "@type": "Organization",
    "@id": "https://www.prajyotinfotech.in/#organization",
    name: "Prajyot Infotech",
    url: "https://www.prajyotinfotech.in",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://www.prajyotinfotech.in/#organization",
    name: "Prajyot Infotech",
    url: "https://www.prajyotinfotech.in",
  },
  offers: [
    {
      "@type": "Offer",
      name: "OIBUZ Free Self-Setup Trial",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: "https://www.oibuz.in/register",
      description: "Self-setup free trial for construction companies & civil contractors with no credit card required.",
    },
    {
      "@type": "Offer",
      name: "OIBUZ Starter Plan (Up to 25 Workers)",
      price: "1999",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: "https://www.oibuz.in/register?plan=starter",
    },
    {
      "@type": "Offer",
      name: "OIBUZ Business Plan (Up to 50 Workers)",
      price: "3799",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: "https://www.oibuz.in/register?plan=business",
    },
    {
      "@type": "Offer",
      name: "OIBUZ Enterprise Plan (Up to 100 Workers)",
      price: "7999",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: "https://www.oibuz.in/register?plan=enterprise",
    },
  ],
};

export const OIBUZ_FAQ_ITEMS = [
  {
    q: "What is OIBUZ Construction HRMS?",
    a: "OIBUZ is a specialized workforce management and HRMS SaaS platform built by Prajyot Infotech for Indian construction companies, civil contractors, and multi-site infrastructure teams. It manages GPS selfie attendance, project timesheets, site expenses, approval routing, and 1-click payroll.",
  },
  {
    q: "How can contractors start a free trial of OIBUZ?",
    a: "Builders and contractors can start a self-serve free trial immediately without waiting for sales calls by creating their company workspace at https://www.oibuz.in/register in under 2 minutes with no credit card required.",
  },
  {
    q: "Does OIBUZ require expensive fingerprint biometric machines on construction sites?",
    a: "No. Fingerprint scanners frequently fail on dusty construction sites due to cement and wear. OIBUZ uses standard smartphones with live camera selfie capture and GPS geofencing so workers can punch in reliably with zero hardware maintenance.",
  },
  {
    q: "Does OIBUZ support daily wage (Dihadi), piece-rate, and salaried staff together?",
    a: "Yes. OIBUZ calculates wages for daily-rate construction labour, piece-rate gangs, overtime, and cash advances alongside salaried site engineers and office staff in a unified month-end payroll run.",
  },
  {
    q: "What is the pricing of OIBUZ HRMS in India?",
    a: "OIBUZ offers transparent plans starting at ₹1,999/month for up to 25 workers (Starter), ₹3,799/month for up to 50 workers (Business), and ₹7,999/month for up to 100 workers (Enterprise), plus custom multi-site enterprise plans for 100+ workers and a free self-setup trial at oibuz.in/register.",
  },
];

export const OIBUZ_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: OIBUZ_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

