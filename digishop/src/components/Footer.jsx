import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";

const BRAND = "Prajyot Infotech";
const EMAIL = "prajyot.infotech@gmail.com";
const PHONE_DISPLAY = "+91 70207 08747";
const PHONE_TEL = "+917020708747";
const WHATSAPP = "917020708747";

// If you know your public site & logo URL, fill these for richer JSON-LD:
const SITE_URL = "https://prajyotinfotech.com/";
const LOGO_URL = "https://prajyotinfotech.com/videos/Logo.jpg";

const SOCIALS = {
  instagram: "https://www.instagram.com/prajyot.infotech?igsh=MWlxaXptejl4Y3pmMQ==",
  linkedin: "https://www.linkedin.com/",
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
    <footer id="contact" role="contentinfo" className="mt-12 border-t border-slate-200 bg-gradient-to-br from-white via-slate-50 to-brand-50/30">
      {/* Structured data for richer business details */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />

      <div
        className="mx-auto max-w-7xl px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm"
        aria-label="Footer"
      >
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
            aria-label={`${BRAND} home`}
          >
            <Logo size={40} />
            {/* <span className="font-bold text-navy-800 text-lg">{BRAND}</span> */}
          </Link>
          <p className="mt-4 text-slate-600 leading-relaxed">
            We build clean, fast websites and apps with a focus on ROI. Premium quality, transparent pricing.
          </p>

          {/* Quick CTAs */}
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={buildWA()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-brand-200 bg-white px-4 py-2 text-navy-800 font-medium shadow-sm transition-all hover:bg-brand-50 hover:border-brand-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Chat on WhatsApp"
            >
              Enquiry
            </a>
            <button
              type="button"
              onClick={openGmailPreferApp}
              className="rounded-xl border border-brand-200 bg-white px-4 py-2 text-navy-800 font-medium shadow-sm transition-all hover:bg-brand-50 hover:border-brand-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-label="Email via Gmail"
            >
              Email
            </button>
          </div>
        </div>

        {/* Nav columns */}
        <nav aria-label="Footer navigation" className="contents">
          <div>
            <h4 className="text-navy-800 font-semibold text-base">Company</h4>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li><Link to="/" className="hover:text-brand-700 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-700 transition-colors">About</Link></li>
              <li><Link to="/work" className="hover:text-brand-700 transition-colors">Work</Link></li>
              <li><Link to="/services" className="hover:text-brand-700 transition-colors">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-brand-700 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-navy-800 font-semibold text-base">Contact</h4>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-brand-700 transition-colors break-all">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className="hover:text-brand-700 transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={buildWA()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-700 transition-colors"
                >
                  WhatsApp Enquiry
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-navy-800 font-semibold text-base">Follow</h4>
            <ul className="mt-4 space-y-3 text-slate-600">
              <li>
                <a
                  href={SOCIALS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-700 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" /></svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-700 transition-colors inline-flex items-center gap-2"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-600 bg-white/50">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>© {new Date().getFullYear()} {BRAND}. All rights reserved.</span>
          <span aria-hidden="true" className="text-brand-300">•</span>
          <Link to="/privacy" className="hover:text-brand-700 transition-colors">Privacy</Link>
          <span aria-hidden="true" className="text-brand-300">•</span>
          <Link to="/terms" className="hover:text-brand-700 transition-colors">Terms</Link>
          <span aria-hidden="true" className="text-brand-300">•</span>
          <a href="#top" className="hover:text-brand-700 transition-colors">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
