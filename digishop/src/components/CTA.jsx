import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "917020708747"; // country code + number, no "+"
const BRAND = "Prajyot Infotech";

// --- SSR-safe storage helpers
const safeGet = (k, fb) => {
  try {
    if (typeof localStorage === "undefined") return fb;
    const v = localStorage.getItem(k);
    return v ? JSON.parse(v) : fb;
  } catch {
    return fb;
  }
};
const safeSet = (k, v) => {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(k, JSON.stringify(v));
  } catch { }
};

export default function CTA() {
  const [form, setForm] = useState(() =>
    safeGet("cta:form", { name: "", contact: "", hp: "" }) // hp = honeypot
  );
  const [touched, setTouched] = useState({ name: false, contact: false });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const statusRef = useRef(null);

  useEffect(() => safeSet("cta:form", form), [form]);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const validName = form.name.trim().length >= 2;
  const validContact = useMemo(() => {
    const v = form.contact.trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    const phone = /^[+]?[\d\s()-]{8,}$/.test(v);
    return email || phone;
  }, [form.contact]);

  const isValid = validName && validContact && !form.hp; // block bots if honeypot filled

  const buildMessage = () =>
    `New project enquiry

Name: ${form.name.trim()}
Contact: ${form.contact.trim()}
Message:
I'm interested in building a premium website/app for my business. Please share timeline & fixed price.`.trim();

  // Primary: WhatsApp
  const handleWhatsApp = () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setStatus("Opening WhatsApp…");
    const text = encodeURIComponent(buildMessage());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    // best effort: open in new tab to avoid popup blockers
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setSubmitting(false);
      setStatus("WhatsApp opened in a new tab.");
      statusRef.current?.focus();
    }, 300);
  };

  // Secondary: Gmail-first with robust fallbacks
  const handleGmailPreferApp = () => {
    if (!isValid || submitting) return;
    setSubmitting(true);
    setStatus("Preparing email…");

    const EMAIL = "prajyot.infotech@gmail.com";
    const subject = encodeURIComponent(`New project enquiry — ${BRAND}`);
    const body = encodeURIComponent(buildMessage());

    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`;
    const mailto = `mailto:${EMAIL}?subject=${subject}&body=${body}`;

    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua);

    if (isAndroid) {
      const androidIntent =
        `intent://compose?to=${EMAIL}&subject=${subject}&body=${body}` +
        `#Intent;scheme=mailto;package=com.google.android.gm;` +
        `S.browser_fallback_url=${encodeURIComponent(gmailWeb)};end`;
      window.location.href = androidIntent;
      setTimeout(() => {
        setSubmitting(false);
        setStatus("Email intent sent.");
        statusRef.current?.focus();
      }, 400);
      return;
    }

    if (isIOS) {
      const iosGmail = `googlegmail://co?to=${EMAIL}&subject=${subject}&body=${body}`;
      const start = Date.now();
      window.location.href = iosGmail;
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          window.location.href = mailto;
          setTimeout(() => window.open(gmailWeb, "_blank", "noopener,noreferrer"), 700);
        }
        setSubmitting(false);
        setStatus("Email draft opened.");
        statusRef.current?.focus();
      }, 800);
      return;
    }

    // Desktop: try default mail app first, then Gmail web.
    const a = document.createElement("a");
    a.href = mailto;
    a.rel = "noopener noreferrer";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      window.open(gmailWeb, "_blank", "noopener,noreferrer");
      setSubmitting(false);
      setStatus("Email window opened.");
      statusRef.current?.focus();
    }, 400);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleWhatsApp();
  };

  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") handleWhatsApp();
  };

  return (
    <section id="cta" className="relative px-4 py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-brand-50/30" onKeyDown={onKeyDown}>
      {/* soft highlight blob */}
      <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-[40rem] rounded-full bg-brand-500/10 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-navy-800">
          Ready to start?
        </h2>
        <p className="mt-4 text-slate-600 text-lg">
          Tell us your details. We'll send a timeline and a fixed price within 48 hours.
        </p>

        {/* a11y live region */}
        <p
          ref={statusRef}
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status || "Idle"}
        </p>

        <form
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          onSubmit={onSubmit}
          noValidate
        >
          {/* Honeypot (hidden to users, visible to basic bots) */}
          <label className="hidden" aria-hidden="true">
            Company
            <input
              tabIndex={-1}
              autoComplete="off"
              name="hp"
              value={form.hp}
              onChange={onChange}
            />
          </label>

          <div className="lg:col-span-1">
            <div className="relative">
              <input
                id="cta-name"
                name="name"
                value={form.name}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full rounded-xl border-2 pl-11 pr-4 py-3.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-0 transition-all ${validName
                  ? "border-slate-200 bg-white focus:border-brand-500"
                  : "border-rose-300 bg-rose-50/50 focus:border-rose-400"
                  }`}
                placeholder="Your name"
                aria-label="Your name"
                maxLength={100}
                aria-invalid={!validName && touched.name}
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
                </svg>
              </span>
            </div>
            {!validName && touched.name && (
              <p className="mt-1.5 text-xs text-left text-rose-600">
                Please enter at least 2 characters.
              </p>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="relative">
              <input
                id="cta-contact"
                name="contact"
                value={form.contact}
                onChange={onChange}
                onBlur={onBlur}
                className={`w-full rounded-xl border-2 pl-11 pr-4 py-3.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-0 transition-all ${validContact
                  ? "border-slate-200 bg-white focus:border-brand-500"
                  : "border-rose-300 bg-rose-50/50 focus:border-rose-400"
                  }`}
                placeholder="Email or WhatsApp number"
                aria-label="Email or WhatsApp number"
                maxLength={120}
                aria-invalid={!validContact && touched.contact}
                inputMode="email"
                autoCapitalize="off"
                autoCorrect="off"
              />
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 13L2 6.76V18h20V6.76L12 13zM12 11L2 4h20l-10 7z" />
                </svg>
              </span>
            </div>
            {!validContact && touched.contact && (
              <p className="mt-1.5 text-xs text-left text-rose-600">
                Enter a valid email or phone number.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className={`lg:col-span-1 inline-flex items-center justify-center gap-2 rounded-xl font-semibold px-6 py-3.5 transition-all duration-300 ${isValid && !submitting
              ? "bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/30 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }`}
            aria-disabled={!isValid || submitting}
          >
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" strokeWidth="4" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Get proposal
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Secondary action: Gmail-first */}
        <div className="mt-4 text-sm text-slate-600">
          Prefer email?{" "}
          <button
            type="button"
            onClick={handleGmailPreferApp}
            disabled={!isValid || submitting}
            className={`underline underline-offset-2 decoration-dotted transition-colors ${isValid && !submitting
              ? "text-brand-700 hover:text-brand-800"
              : "text-slate-400 cursor-not-allowed"
              }`}
            aria-disabled={!isValid || submitting}
          >
            Send via Gmail
          </button>
        </div>

        <p className="mt-5 text-xs text-slate-500">
          We'll never spam. Your details are used only to contact you about your project.
        </p>
      </motion.div>

      {/* Optional JSON-LD to hint contact method (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
            url: "https://wa.me/" + WHATSAPP_NUMBER,
          }),
        }}
      />
    </section>
  );
}
