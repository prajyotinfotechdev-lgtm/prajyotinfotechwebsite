import React, { useMemo, useState } from "react";

const WHATSAPP_NUMBER = "917020708747"; // country code + number, no "+"

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [touched, setTouched] = useState({ name: false, contact: false });
  const [submittingWA, setSubmittingWA] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onBlur = (e) => setTouched({ ...touched, [e.target.name]: true });

  const validName = form.name.trim().length >= 2;
  const validContact = useMemo(() => {
    const v = form.contact.trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(v);
    const phone = /^[+]?[\d\s()-]{8,}$/.test(v);
    return email || phone;
  }, [form.contact]);

  const isValid = validName && validContact;

  const buildMessage = () =>
    `New project enquiry

Name: ${form.name.trim()}
Contact: ${form.contact.trim()}
Message:
${(form.message || "Hi, I want to build a website/app.").trim()}`;

  const submitWhatsApp = () => {
    if (!isValid || submittingWA) return;
    setSubmittingWA(true);
    try {
      const text = encodeURIComponent(buildMessage());
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setTimeout(() => setSubmittingWA(false), 600);
    }
  };

  // Gmail: prefer app → mailto → Gmail Web fallback
  const openGmailPreferApp = () => {
    if (!isValid || submittingEmail) return;
    setSubmittingEmail(true);

    const emailTo = "prajyot.infotech@gmail.com";
    const subject = encodeURIComponent("New project enquiry — DigiShop");
    const body = encodeURIComponent(buildMessage());

    const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${subject}&body=${body}`;
    const mailto = `mailto:${emailTo}?subject=${subject}&body=${body}`;

    try {
      const ua = navigator.userAgent || "";
      const isAndroid = /Android/i.test(ua);
      const isIOS = /iPhone|iPad|iPod/i.test(ua);

      if (isAndroid) {
        const androidIntent =
          `intent://compose?to=${emailTo}&subject=${subject}&body=${body}` +
          `#Intent;scheme=mailto;package=com.google.android.gm;` +
          `S.browser_fallback_url=${encodeURIComponent(gmailWeb)};end`;
        window.location.href = androidIntent;
      } else if (isIOS) {
        const iosGmail = `googlegmail://co?to=${emailTo}&subject=${subject}&body=${body}`;
        const start = Date.now();
        window.location.href = iosGmail;
        setTimeout(() => {
          if (Date.now() - start < 1500) {
            window.location.href = mailto;
            setTimeout(() => window.open(gmailWeb, "_blank", "noopener,noreferrer"), 700);
          }
        }, 800);
      } else {
        // Desktop: default mail app, then Gmail Web
        const a = document.createElement("a");
        a.href = mailto;
        a.rel = "noopener noreferrer";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => {
          window.open(gmailWeb, "_blank", "noopener,noreferrer");
        }, 400);
      }
    } finally {
      setTimeout(() => setSubmittingEmail(false), 800);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submitWhatsApp();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-14" onKeyDown={onKeyDown}>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900">Start a project</h1>
      <p className="mt-3 text-slate-600">Tell us your details. We’ll reply within 48 hours.</p>

      <form className="mt-8 grid gap-3" noValidate>
        <div>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full rounded-xl border px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${validName
              ? "border-slate-300 bg-white focus:ring-teal-600"
              : "border-rose-300 bg-rose-50 focus:ring-rose-400"
              }`}
            placeholder="Your name"
            aria-label="Your name"
            aria-invalid={!validName && touched.name}
            aria-describedby={!validName && touched.name ? "name-err" : undefined}
            maxLength={100}
          />
          {!validName && touched.name && (
            <p id="name-err" className="mt-1 text-xs text-rose-600">
              Please enter at least 2 characters.
            </p>
          )}
        </div>

        <div>
          <input
            name="contact"
            value={form.contact}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full rounded-xl border px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${validContact
              ? "border-slate-300 bg-white focus:ring-teal-600"
              : "border-rose-300 bg-rose-50 focus:ring-rose-400"
              }`}
            placeholder="Email or WhatsApp number"
            aria-label="Email or WhatsApp number"
            aria-invalid={!validContact && touched.contact}
            aria-describedby={!validContact && touched.contact ? "contact-err" : undefined}
            maxLength={120}
          />
          {!validContact && touched.contact && (
            <p id="contact-err" className="mt-1 text-xs text-rose-600">
              Enter a valid email or phone number.
            </p>
          )}
        </div>

        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows="5"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
          placeholder="Brief about your project (optional)"
          aria-label="Project brief"
          maxLength={2000}
        />

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {/* High-contrast primary */}
          <button
            type="button"
            onClick={submitWhatsApp}
            disabled={!isValid || submittingWA}
            className={`rounded-xl px-5 py-3 font-semibold w-fit transition ring-offset-2 ring-offset-white ${isValid && !submittingWA
              ? "bg-slate-900 text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              : "bg-slate-300 text-slate-600 cursor-not-allowed"
              }`}
          >
            {submittingWA ? "Opening WhatsApp…" : "Enquiry Now"}
          </button>

          {/* Clear outline secondary */}
          <button
            type="button"
            onClick={openGmailPreferApp}
            disabled={!isValid || submittingEmail}
            className={`rounded-xl px-5 py-3 font-semibold w-fit border transition ring-offset-2 ring-offset-white ${isValid && !submittingEmail
              ? "border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              : "border-slate-200 bg-white text-slate-400 cursor-not-allowed"
              }`}
          >
            {submittingEmail ? "Opening email…" : "Email me instead (Gmail)"}
          </button>

          <span className="text-xs text-slate-600">We’ll never share your info.</span>
        </div>
      </form>
    </main>
  );
}
