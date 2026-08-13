import React from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ROICalculator from "../components/ROICalculator.jsx";

const WHATSAPP_NUMBER = "917020708747";
const wa = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "₹29,999",
      tagline: "Best for new businesses",
      cta: { label: "Start with Starter", href: wa("Hi! I'm interested in the Starter plan.") },
      features: [
        "1–3 pages (Home, About, Contact)",
        "Mobile-first design",
        "Basic SEO (titles, meta, sitemap)",
        "WhatsApp & Email leads",
        "Fast hosting setup",
      ],
    },
    {
      name: "Business",
      price: "₹59,999",
      badge: "Most popular",
      tagline: "For growing brands",
      highlight: true,
      cta: { label: "Choose Business", href: wa("Hi! I'm interested in the Business plan.") },
      features: [
        "Up to 8 pages + blog",
        "Design system & components",
        "On-page SEO + schema",
        "Contact forms & analytics",
        "Basic CMS (case studies/FAQs)",
      ],
    },
    {
      name: "Pro",
      price: "Custom",
      tagline: "Complex or custom features",
      cta: { label: "Talk to us", href: wa("Hi! I need a custom Pro plan.") },
      features: [
        "SaaS dashboards / E-commerce",
        "Login, roles, payments",
        "APIs & integrations",
        "Advanced SEO & performance",
        "Ongoing support plans",
      ],
    },
  ];

  const faq = [
    { q: "How long does it take?", a: "Starter ~10–14 days, Business ~2–4 weeks, Pro depends on scope." },
    { q: "What’s included in SEO?", a: "Titles, meta, sitemap, robots, Open Graph, and basic schema. We can add more in Pro." },
    { q: "Do you provide hosting?", a: "We set up fast, reliable hosting. You own the accounts and billing." },
    { q: "Payment terms?", a: "50% to start, 50% on launch. Pro may use milestones." },
    { q: "Support after launch?", a: "Yes—15 days free support, plus optional monthly plans." },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-14">
      <Seo
        title="Transparent Pricing for Website & Software Development — Prajyot Infotech"
        description="Simple, transparent pricing for website development, mobile apps, and custom software. Starter plans from ₹29,999. Fixed pricing with no hidden costs. View all plans."
        keywords="website development pricing India, software development cost, mobile app cost, Prajyot Infotech pricing, business website price"
        path="/pricing"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web, App & Software Development Services",
          "provider": { "@type": "Organization", "name": "Prajyot Infotech", "@id": "https://prajyotinfotech.in/#organization" },
          "areaServed": "India",
          "url": "https://prajyotinfotech.in/pricing",
          "offers": tiers.map((t) => ({
            "@type": "Offer",
            "name": t.name,
            "price": t.price.replace(/[^\d]/g, "") || undefined,
            "priceCurrency": "INR",
            "url": "https://prajyotinfotech.in/pricing",
          })),
        }}
      />

      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Pricing</h1>
        <p className="mt-3 text-slate-600">Clear plans for every stage—no surprises.</p>
      </header>

      {/* Tiers */}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {tiers.map((t) => (
          <article
            key={t.name}
            className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md border-slate-200 ${
              t.highlight ? "ring-2 ring-brand-500/30" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-semibold text-slate-900">{t.name}</h2>
              {t.badge && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700">
                  {t.badge}
                </span>
              )}
            </div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{t.price}</div>
            <p className="mt-1 text-sm text-slate-600">{t.tagline}</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg viewBox="0 0 24 24" className="mt-[2px] h-4 w-4 text-brand-600" aria-hidden>
                    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={t.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition
                bg-brand-600 text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
            >
              {t.cta.label}
            </a>
          </article>
        ))}
      </section>

      {/* ROI Calculator */}
      <section className="mt-20 mb-8 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <ROICalculator />
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">FAQs</h2>
        <div className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {faq.map((f) => (
            <details key={f.q} className="group p-4 open:bg-slate-50">
              <summary className="cursor-pointer list-none text-slate-900 font-medium">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 rounded-full border border-slate-300 bg-white px-2 text-xs text-slate-600 group-open:rotate-45 transition">
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-6 text-xs text-slate-500">* Prices exclude GST. Hosting/domain are billed to your own accounts.</p>
    </main>
  );
}
