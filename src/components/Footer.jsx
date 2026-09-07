import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const BRAND = "Prajyot Infotech";
const EMAIL = "hr@prajyotinfotech.in";
const PHONE_DISPLAY = "+91 70207 08747";
const PHONE_TEL = "+917020708747";
const WHATSAPP = "917020708747";

const SITE_URL = "https://www.prajyotinfotech.in/";
const LOGO_URL = "https://www.prajyotinfotech.in/videos/Logo.jpg";

const SOCIALS = {
  instagram: "https://www.instagram.com/prajyot.infotech",
  linkedin: "https://www.linkedin.com/company/prajyotinfotech",
};

const buildWA = () =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hi ${BRAND}, I'd like to discuss a website/app project.`
  )}`;

export default function Footer() {
  const openGmailPreferApp = () => {
    const subject = encodeURIComponent(`New project enquiry — ${BRAND}`);
    const body = encodeURIComponent(`Hi ${BRAND}, I'd like to discuss a website/app project.`);

    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`;
    const mailto = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
      const intent =
        `intent://compose?to=${EMAIL}&subject=${subject}&body=${body}` +
        `#Intent;scheme=mailto;package=com.google.android.gm;` +
        `S.browser_fallback_url=${encodeURIComponent(gmailWeb)};end`;
      window.location.href = intent;
      return;
    }

    if (isIOS) {
      const iosGmail = `googlegmail://co?to=${EMAIL}&subject=${subject}&body=${body}`;
      const t0 = Date.now();
      window.location.href = iosGmail;
      setTimeout(() => {
        if (Date.now() - t0 < 1500) {
          window.location.href = mailto;
          setTimeout(() => window.open(gmailWeb, "_blank", "noopener,noreferrer"), 600);
        }
      }, 700);
      return;
    }

    // Desktop: default mail app, then Gmail Web as fallback
    const a = document.createElement("a");
    a.href = mailto;
    a.rel = "noopener noreferrer";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => window.open(gmailWeb, "_blank", "noopener,noreferrer"), 400);
  };

  // Build JSON-LD Organization (safe defaults if you haven't set URLs yet)
  const sameAs = [SOCIALS.instagram, SOCIALS.linkedin].filter(Boolean);
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    ...(SITE_URL ? { url: SITE_URL } : {}),
    ...(LOGO_URL ? { logo: LOGO_URL } : {}),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: EMAIL,
        telephone: PHONE_TEL,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <footer id="contact" role="contentinfo" className="mt-12 relative overflow-hidden bg-[#020617] border-t border-slate-800/80 text-slate-300">
      {/* Dynamic ambient lighting & grid backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-64 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none"></div>

      {/* Structured data for richer business details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />

      <div
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid gap-12 lg:grid-cols-12 text-sm"
        aria-label="Footer"
      >
        {/* Brand & Direct Contact (Col span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
              aria-label={`${BRAND} home`}
            >
              <div className="p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-inner group-hover:border-cyan-500/50 transition-colors">
                <Logo size={36} showText={false} />
              </div>
              <span className="font-extrabold text-white text-2xl tracking-tight">
                Prajyot <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Infotech</span>
              </span>
            </Link>

            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Systems Operational • 99.98% Cloud SLA</span>
            </div>

            <p className="mt-4 text-slate-400 leading-relaxed text-sm max-w-sm">
              Premier software engineering and digital transformation studio. We architect high-concurrency web applications, cross-platform mobile apps, bespoke ERP/CRM suites, and autonomous workflows with guaranteed 100% intellectual property ownership.
            </p>

            {/* Direct HQ & Contact Badges */}
            <div className="mt-6 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span>Engineering HQ: <strong>Pune, Maharashtra, India</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <a href={`mailto:${EMAIL}`} className="hover:text-cyan-300 transition-colors font-medium">{EMAIL}</a>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <a href={`tel:${PHONE_TEL}`} className="hover:text-cyan-300 transition-colors font-medium">{PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={buildWA()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-500/25 transition-all hover:from-blue-500 hover:to-cyan-500 hover:shadow-cyan-500/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Chat on WhatsApp"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.32-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3" /></svg>
              Start Project Inquiry
            </a>
            <button
              type="button"
              onClick={openGmailPreferApp}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/60 px-4 py-2.5 text-slate-200 font-medium text-xs transition-all hover:bg-slate-700/80 hover:text-white hover:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              aria-label="Email via Gmail"
            >
              <svg className="size-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email Proposal
            </button>
          </div>
        </div>

        {/* Navigation Grid (Col span 8) */}
        <nav aria-label="Footer navigation" className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Engineering Services
            </h4>
            <ul className="space-y-3 text-slate-400 text-xs">
              <li><Link to="/services#business-websites" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="text-slate-600">›</span> Bespoke Web Applications</Link></li>
              <li><Link to="/services#mobile-app-development" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="text-slate-600">›</span> Mobile Apps (iOS &amp; Android)</Link></li>
              <li><Link to="/services#crm-development" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="text-slate-600">›</span> Enterprise ERP &amp; CRM</Link></li>
              <li><Link to="/services#billing-erp-software" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="text-slate-600">›</span> Cloud SaaS Platforms</Link></li>
              <li><Link to="/services#whatsapp-automation" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="text-slate-600">›</span> Intelligent Workflows</Link></li>
              <li><Link to="/services#ecommerce-development" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span className="text-slate-600">›</span> High-Throughput E-Commerce</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Company &amp; Talent
            </h4>
            <ul className="space-y-3 text-slate-400 text-xs">
              <li><Link to="/" className="hover:text-cyan-300 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-cyan-300 transition-colors">About Us &amp; Team</Link></li>
              <li><Link to="/work" className="hover:text-cyan-300 transition-colors">Engineering Portfolio</Link></li>
              <li><Link to="/pricing" className="hover:text-cyan-300 transition-colors">Transparent Pricing</Link></li>
              <li><Link to="/careers" className="hover:text-cyan-300 transition-colors inline-flex items-center gap-2">Careers <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30 uppercase tracking-wide">Hiring</span></Link></li>
              <li><Link to="/contact" className="hover:text-cyan-300 transition-colors">Direct Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
              Engineering &amp; Tools
            </h4>
            <ul className="space-y-3 text-slate-400 text-xs">
              <li><Link to="/estimate" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 font-medium text-slate-300"><span className="text-cyan-400">⚡</span> Project Cost Estimator</Link></li>
              <li><Link to="/articles" className="hover:text-cyan-300 transition-colors">Tech Architecture Lab</Link></li>
              <li><Link to="/glossary" className="hover:text-cyan-300 transition-colors">Software Engineering Glossary</Link></li>
              <li><a href="#architecture-blueprint" className="hover:text-cyan-300 transition-colors">Cloud Topology Blueprint</a></li>
              <li><a href="#roi-calculator" className="hover:text-cyan-300 transition-colors">Automation ROI Calculator</a></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Enterprise Assurance Badges */}
      <div className="relative z-10 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md py-6 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-200">99.98% Cloud SLA</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <svg className="size-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span className="text-xs font-semibold text-slate-200">100% IP &amp; Git Handover</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <svg className="size-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span className="text-xs font-semibold text-slate-200">60-Day Post-Launch Warranty</span>
            </div>
            <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <svg className="size-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span className="text-xs font-semibold text-slate-200">Mutual NDA Protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global & Indian Regional Hubs Chips for High SEO Impact */}
      <div className="relative z-10 py-8 px-4 border-b border-slate-800/80 bg-[#020617]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-slate-400">
            <span className="font-bold text-slate-300 uppercase tracking-widest text-[10px] shrink-0">Global &amp; Regional Hubs:</span>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
              <Link to="/software-company-in-pune" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Pune</Link>
              <Link to="/software-company-in-mumbai" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Mumbai</Link>
              <Link to="/software-company-in-bangalore" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Bangalore</Link>
              <Link to="/software-company-in-hyderabad" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Hyderabad</Link>
              <Link to="/software-company-in-delhi" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Delhi NCR</Link>
              <Link to="/software-company-in-latur" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Latur</Link>
              <Link to="/software-company-in-nagpur" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Nagpur</Link>
              <Link to="/software-company-in-nashik" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Nashik</Link>
              <Link to="/software-company-in-aurangabad" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Aurangabad</Link>
              <Link to="/software-company-in-thane" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Thane</Link>
              <Link to="/software-company-in-navi-mumbai" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors">Navi Mumbai</Link>
              <span className="text-slate-700 px-1">|</span>
              <Link to="/software-company-in-usa" className="px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-200 hover:text-white transition-colors font-medium">USA 🇺🇸</Link>
              <Link to="/software-company-in-uae" className="px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-200 hover:text-white transition-colors font-medium">UAE 🇦🇪</Link>
              <Link to="/software-company-in-uk" className="px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/40 text-blue-200 hover:text-white transition-colors font-medium">UK 🇬🇧</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 py-6 px-4 bg-[#010314]">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© {new Date().getFullYear()} <strong>{BRAND}</strong>. All rights reserved.</span>
            <span className="text-slate-700">•</span>
            <span>Official Domain: <span className="text-cyan-300 font-mono">www.prajyotinfotech.in</span></span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="#top" className="hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium group">
              Back to top 
              <svg className="size-3 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all"
              aria-label="Instagram"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
