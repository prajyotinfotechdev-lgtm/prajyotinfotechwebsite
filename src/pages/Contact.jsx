import React, { useMemo, useState } from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { createLead } from "../utils/leadStorage.js";
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2, Calendar, MessageSquare, Send } from "lucide-react";

const WHATSAPP_NUMBER = "917020708747";
const BRAND = "Prajyot Infotech";
const SITE_URL = "https://prajyotinfotech.in";

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "", projectType: "Website / App Development" });
  const [touched, setTouched] = useState({ name: false, contact: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    `New project enquiry — Prajyot Infotech

Name: ${form.name.trim()}
Contact: ${form.contact.trim()}
Project: ${form.projectType}
Message:
${(form.message || "Hi, I want to discuss a new software/web development project.").trim()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        contact: form.contact.trim(),
        projectType: form.projectType,
        message: form.message.trim() || "Contact page submission",
        source: "Contact Page Form"
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact lead:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const openEmailDirect = () => {
    const emailTo = "prajyot.infotech@gmail.com";
    const subject = encodeURIComponent("New project enquiry — Prajyot Infotech");
    const body = encodeURIComponent(buildMessage());
    window.open(`mailto:${emailTo}?subject=${subject}&body=${body}`, "_blank");
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Prajyot Infotech",
    "url": `${SITE_URL}/contact`,
    "description": "Contact Prajyot Infotech for website development, mobile apps, custom software, CRM, ERP, and business digitalization services in India and globally.",
    "isPartOf": { "@id": `${SITE_URL}/#website` },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND,
    "@id": `${SITE_URL}/#organization`,
    "url": SITE_URL,
    "telephone": "+917020708747",
    "email": "prajyot.infotech@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5204",
      "longitude": "73.8567"
    },
    "areaServed": ["India", "United States", "United Kingdom", "United Arab Emirates"],
    "availableLanguage": ["English", "Hindi", "Marathi"],
    "priceRange": "₹₹",
    "openingHours": "Mo-Sa 09:00-19:00",
  };

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Contact", url: `${SITE_URL}/contact` },
      ]} />
      <Seo
        title="Contact Prajyot Infotech — Get a Free Project Consultation"
        description="Connect with Prajyot Infotech for custom web development, mobile apps, CRM, ERP, and WhatsApp automation. Fast 24-hour turnaround with guaranteed fixed quotes."
        keywords="contact Prajyot Infotech, hire software developers India, custom software quote, website development contact Pune, offshore web development"
        path="/contact"
        schema={[contactPageSchema, localBusinessSchema]}
      />

      <main className="mx-auto max-w-7xl px-4 py-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
            <Clock className="w-3.5 h-3.5 text-brand-600" />
            <span>Guaranteed Response Within 24 Hours</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Let's Build Something Exceptional
          </h1>
          <p className="mt-3 text-slate-600 text-base md:text-lg">
            Tell us about your project vision. We provide free architectural consultation and a detailed scope estimate.
          </p>
        </div>

        {/* 2-Column Hub Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Column 1: Contact & Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="size-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">Thank You, {form.name.split(" ")[0]}!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto mt-2">
                  Your project enquiry has been safely received in our database. Our technical team will review your notes and reach out shortly.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={openWhatsAppDirect}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Continue on WhatsApp Now</span>
                  </button>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", contact: "", message: "", projectType: "Website / App Development" }); }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h2 className="text-xl font-bold text-navy-950 mb-1">Send a Message</h2>
                <p className="text-xs text-slate-500 mb-4">Fill out the quick form below for an instant response.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="e.g., Aniket Deshmukh"
                      className={`w-full rounded-xl border px-4 py-3 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        validName ? "border-slate-300 bg-white focus:ring-brand-500" : "border-rose-300 bg-rose-50/50 focus:ring-rose-400"
                      }`}
                    />
                    {!validName && touched.name && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">Please enter your name.</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email or Phone / WhatsApp *</label>
                    <input
                      name="contact"
                      required
                      value={form.contact}
                      onChange={onChange}
                      onBlur={onBlur}
                      placeholder="client@gmail.com / +91 98765..."
                      className={`w-full rounded-xl border px-4 py-3 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                        validContact ? "border-slate-300 bg-white focus:ring-brand-500" : "border-rose-300 bg-rose-50/50 focus:ring-rose-400"
                      }`}
                    />
                    {!validContact && touched.contact && (
                      <p className="mt-1 text-[11px] text-rose-600 font-medium">Please enter a valid email or phone number.</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Category</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={onChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Website Development">Business / Corporate Website</option>
                    <option value="Mobile App Development">Mobile App (Android & iOS)</option>
                    <option value="E-Commerce Store">E-Commerce Store & Payments</option>
                    <option value="Custom CRM / ERP">Custom CRM / ERP / Billing Software</option>
                    <option value="WhatsApp Automation">WhatsApp Business API & Automation</option>
                    <option value="Other Software Consultation">Other Custom Software Project</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Project Summary / Requirements</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell us what you want to build, any reference websites, key features, or expected launch timeline..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={!isValid || submitting}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all ${
                      isValid && !submitting
                        ? "bg-slate-950 text-white hover:bg-slate-800 shadow-slate-900/20 active:scale-95"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? "Submitting Inquiry..." : "Submit Project Inquiry"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsAppDirect}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl border border-emerald-500 text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 mt-2">
                  🔒 We respect your privacy. Mutual Non-Disclosure Agreement (NDA) provided on request.
                </p>
              </form>
            )}
          </div>

          {/* Column 2: Direct Contacts & Booking Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Strategy Call Booking Card */}
            <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-navy-950 p-6 sm:p-7 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-400 border border-white/15">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold">Book a 15-Min Strategy Call</h3>
                  <p className="text-xs text-indigo-200">Talk directly with a Senior Software Architect</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Have a complex software, mobile app, or enterprise system requirement? Schedule a 1-on-1 virtual architecture session to clarify tech stack, budget, and roadmap.
              </p>
              <a
                href={wa("Hi Prajyot Infotech, I would like to schedule a 15-minute project strategy consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition-transform"
              >
                <span>Schedule Virtual Call</span>
                <span>→</span>
              </a>
            </div>

            {/* Direct Details Card */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">Direct Reachability</h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <a
                  href="tel:+917020708747"
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="size-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Call / WhatsApp</div>
                    <div className="text-sm font-bold text-navy-900">+91 70207 08747</div>
                  </div>
                </a>

                <a
                  href="mailto:prajyot.infotech@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="size-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Direct Email</div>
                    <div className="text-sm font-bold text-navy-900">prajyot.infotech@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Headquarters</div>
                    <div className="text-xs font-semibold text-navy-900">Pune, Maharashtra, India (Serving Global Clients)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zero-Risk Badges */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <div className="text-xs text-emerald-950 font-medium">
                <strong>100% Intellectual Property Ownership:</strong> You own full code, accounts, repository access, and copyright.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
