import React, { useState } from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ROICalculator from "../components/ROICalculator.jsx";
import { ShieldCheck, Lock, Clock, Globe, Award, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

const WHATSAPP_NUMBER = "917020708747";
const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const CURRENCIES = {
  INR: { symbol: "₹", label: "INR (₹)", starter: "₹29,999", business: "₹59,999", custom: "Custom Scope" },
  USD: { symbol: "$", label: "USD ($)", starter: "$399", business: "$799", custom: "From $1,499" },
  AED: { symbol: "AED", label: "AED (د.إ)", starter: "1,499 AED", business: "2,999 AED", custom: "From 5,500 AED" },
  GBP: { symbol: "£", label: "GBP (£)", starter: "£320", business: "£640", custom: "From £1,200" },
  EUR: { symbol: "€", label: "EUR (€)", starter: "370 €", business: "740 €", custom: "From 1,390 €" },
};

export default function Pricing() {
  const [currency, setCurrency] = useState("INR");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [form, setForm] = useState({ name: "", contact: "", notes: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cur = CURRENCIES[currency];

  const tiers = [
    {
      name: "Starter Web",
      price: cur.starter,
      tagline: "High-converting corporate & business website",
      popular: false,
      features: [
        "1–5 Custom responsive pages",
        "Mobile-first, lightning fast (<1s load)",
        "On-page SEO, sitemap & schema",
        "Direct lead forms & instant DB capture",
        "Free SSL & hosting deployment setup",
        "15 Days post-launch warranty",
      ],
      cta: `Get Started (${cur.symbol})`,
    },
    {
      name: "Business Growth",
      price: cur.business,
      tagline: "For growing brands & service companies",
      popular: true,
      features: [
        "Up to 10 custom pages + blog / articles",
        "Dynamic CMS / portfolio showcase",
        "Advanced Google SEO & local schema",
        "WhatsApp API & CRM lead integration",
        "Custom animations & interactive UI",
        "30 Days priority support & SLA",
      ],
      cta: `Choose Business (${cur.symbol})`,
    },
    {
      name: "Custom Software / App",
      price: cur.custom,
      tagline: "Bespoke SaaS, ERP, CRM & Mobile Apps",
      popular: false,
      features: [
        "Full-stack React, Node.js & PostgreSQL",
        "Android & iOS Apps (Flutter / React Native)",
        "Authentication, role permissions & billing",
        "Third-party APIs & payment gateways",
        "Dedicated offshore developer options",
        "Full source code & IP ownership",
      ],
      cta: `Request Scope & Quote`,
    },
  ];

  const handleOpenProposal = (planName) => {
    setSelectedPlan(planName);
    setSubmitted(false);
    setModalOpen(true);
  };

  const handleProposalSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.contact.trim()) return;
    setIsSubmitting(true);
    try {
      await createLead({
        name: form.name.trim(),
        contact: form.contact.trim(),
        projectType: `Pricing Plan: ${selectedPlan} (${currency})`,
        budget: tiers.find(t => t.name === selectedPlan)?.price || "Custom",
        message: form.notes.trim() || `Inquiry for ${selectedPlan} plan`,
        source: "Pricing Page Lead"
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faq = [
    { q: "Do you work with international clients outside India?", a: "Yes! Over 40% of our projects are with clients in the USA, UAE, UK, Europe, and Australia. We support payment via Wire Transfer, Stripe, and provide daily async communication with timezone overlap." },
    { q: "Who owns the source code and copyright?", a: "You do! 100% of the code, designs, and intellectual property belong completely to you upon project milestone completion. We sign standard NDAs on request." },
    { q: "What is the typical delivery timeline?", a: "Starter websites are delivered in 7–12 business days. Business websites take 2–3 weeks. Custom apps and enterprise SaaS depend on scope (typically 4–8 weeks with weekly staging demos)." },
    { q: "How do milestone payments work?", a: "We operate on a transparent 50% upfront and 50% upon deployment & client sign-off model. For larger software systems, we break payments into 3 to 4 phased sprint milestones." },
    { q: "Is post-launch support and warranty included?", a: "Yes! Every project comes with complimentary post-launch bug fixing and support (15 to 30 days depending on plan), plus flexible ongoing maintenance retainers." },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-14">
      <BreadcrumbsLd items={[{ name: "Home", url: "https://prajyotinfotech.in/" }, { name: "Pricing", url: "https://prajyotinfotech.in/pricing" }]} />

      <Seo
        title="Software & Web Development Pricing — Transparent Plans | Prajyot Infotech"
        description="Fixed and transparent pricing for website development, mobile apps, and custom software. Domestic and international billing in INR, USD, AED, GBP, EUR. Full code ownership."
        keywords="website development pricing India, custom software development cost, hire offshore developers India, mobile app pricing, Prajyot Infotech pricing plans"
        path="/pricing"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web, App & Software Development Pricing",
          "provider": { "@type": "Organization", "name": "Prajyot Infotech", "@id": "https://prajyotinfotech.in/#organization" },
          "areaServed": ["India", "United States", "United Kingdom", "United Arab Emirates", "Australia"],
          "url": "https://prajyotinfotech.in/pricing",
        }}
      />

      {/* Header */}
      <header className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Global Delivery · India & Worldwide</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Transparent, Fixed-Price Plans
        </h1>
        <p className="mt-3 text-slate-600 text-base md:text-lg">
          No surprise fees. 100% intellectual property ownership. Guaranteed delivery timelines.
        </p>

        {/* Currency Switcher */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
          {Object.keys(CURRENCIES).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currency === c
                  ? "bg-white text-brand-700 shadow-md scale-105"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {CURRENCIES[c].label}
            </button>
          ))}
        </div>
      </header>

      {/* Tiers Grid */}
      <section className="mt-12 grid gap-8 lg:grid-cols-3">
        {tiers.map((t) => (
          <article
            key={t.name}
            className={`relative rounded-3xl border bg-white p-7 shadow-sm transition-all hover:shadow-xl flex flex-col justify-between ${
              t.popular
                ? "border-brand-500 ring-2 ring-brand-500/20 shadow-brand-500/10"
                : "border-slate-200"
            }`}
          >
            {t.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 text-white text-xs font-extrabold shadow-md tracking-wider uppercase">
                Most Popular
              </div>
            )}

            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">{t.name}</h3>
              </div>
              <div className="mt-3 text-3xl sm:text-4xl font-black text-navy-950 tracking-tight">
                {t.price}
              </div>
              <p className="mt-2 text-xs text-slate-500 font-medium leading-relaxed">
                {t.tagline}
              </p>

              <div className="my-6 border-t border-slate-100" />

              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Everything Included:
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-2">
              <button
                onClick={() => handleOpenProposal(t.name)}
                className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                  t.popular
                    ? "bg-brand-600 text-white hover:bg-brand-700 shadow-brand-500/30 hover:scale-[1.02]"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={wa(`Hi Prajyot Infotech, I am interested in the ${t.name} (${t.price}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl text-center text-xs font-semibold text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors block"
              >
                Or Chat on WhatsApp →
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* Global Client Trust Matrix */}
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-slate-900 via-navy-950 to-slate-900 p-8 sm:p-10 text-white shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold tracking-tight">Our Zero-Risk Client Commitments</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
            Whether you are a startup in California, an enterprise in Dubai, or a business in Mumbai, we guarantee complete peace of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
            <h4 className="text-sm font-bold">100% IP & Code Ownership</h4>
            <p className="text-xs text-slate-300 mt-1">Full copyright, GitHub repository transfer, and admin credentials transferred to you.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <Lock className="w-8 h-8 text-indigo-400 mb-3" />
            <h4 className="text-sm font-bold">Mutual NDA Protection</h4>
            <p className="text-xs text-slate-300 mt-1">We sign standard Non-Disclosure Agreements to safeguard your business logic & data.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <Clock className="w-8 h-8 text-amber-400 mb-3" />
            <h4 className="text-sm font-bold">Guaranteed Delivery SLA</h4>
            <p className="text-xs text-slate-300 mt-1">Clear sprint schedule and live weekly staging links. Never wonder where your project stands.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
            <Globe className="w-8 h-8 text-sky-400 mb-3" />
            <h4 className="text-sm font-bold">Global Timezone Overlap</h4>
            <p className="text-xs text-slate-300 mt-1">Dedicated overlap windows for clients in US PST/EST, UK GMT, and UAE GST.</p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="mt-20 mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <ROICalculator />
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
          <p className="text-slate-500 text-sm mt-1">Everything you need to know about our project pricing and process.</p>
        </div>

        <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {faq.map((f) => (
            <details key={f.q} className="group p-5 open:bg-slate-50/70 transition-colors">
              <summary className="cursor-pointer list-none text-slate-900 font-bold text-sm sm:text-base">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 rounded-full border border-slate-200 bg-white size-6 flex items-center justify-center text-xs text-slate-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-3 text-slate-600 text-xs sm:text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Instant Proposal Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border border-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <div className="size-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-navy-900">Inquiry Received!</h4>
                <p className="text-xs text-slate-500 mt-2">
                  Our engineering team has received your request for <strong>{selectedPlan}</strong>. We will review your requirements and reach out within 24 hours.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-brand-600 text-white text-xs font-bold hover:bg-brand-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">Fast-Track Quote</span>
                  <h4 className="text-xl font-bold text-navy-900 mt-1">Get Started with {selectedPlan}</h4>
                  <p className="text-xs text-slate-500 mt-1">Share your details and we will send a formal proposal.</p>
                </div>

                <form onSubmit={handleProposalSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., Vikram Patil / John Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email or WhatsApp Number *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., client@company.com or +91 98765 43210"
                      value={form.contact}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Project Notes (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what you're building..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : `Submit Inquiry for ${selectedPlan}`}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
