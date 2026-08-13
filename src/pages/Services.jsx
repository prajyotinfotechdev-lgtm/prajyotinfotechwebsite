import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import TechStackVisualizer from "../components/TechStackVisualizer.jsx";

const WA_NUMBER = "917020708747";
const EMAIL = "prajyot.infotech@gmail.com";
const BRAND = "Prajyot Infotech";
const SITE_URL = "https://prajyotinfotech.in";
const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export default function Services() {
  const services = [
    {
      id: "business-websites",
      title: "Professional Business Websites",
      pill: "Web",
      desc: "Custom-designed, fast, mobile-friendly websites that build credibility and generate leads for your business.",
      points: ["Mobile-first responsive design", "SEO-optimized structure", "Lead capture & contact forms"],
      deliverables: ["Up to 8 custom pages", "Google Analytics setup", "On-page SEO & sitemap", "WhatsApp & email lead forms"],
      eta: "10–20 days",
      from: "₹29,999+",
      schema: "Website Development",
    },
    {
      id: "ecommerce-development",
      title: "E-Commerce Websites",
      pill: "Sell",
      desc: "Full online stores with product catalogs, cart, secure checkout, and WhatsApp/payment integration.",
      points: ["Product catalog & filters", "Cart & checkout system", "Razorpay/Stripe payment"],
      deliverables: ["Admin product management", "Order tracking dashboard", "WhatsApp order notifications", "Inventory tracking"],
      eta: "3–5 weeks",
      from: "₹59,999+",
      schema: "E-Commerce Development",
    },
    {
      id: "mobile-app-development",
      title: "Android & iOS Mobile Apps",
      pill: "Mobile",
      desc: "Native and cross-platform mobile apps for business operations, customer engagement, and e-commerce.",
      points: ["Android & iOS support", "Push notifications", "WhatsApp integration"],
      deliverables: ["Cross-platform (React Native)", "API backend integration", "App Store / Play Store deploy", "Admin panel for app data"],
      eta: "4–8 weeks",
      from: "₹75,000+",
      schema: "Mobile App Development",
    },
    {
      id: "custom-software-development",
      title: "Custom Software Development",
      pill: "Custom",
      desc: "Bespoke software tailored to your exact business workflow—replacing manual processes with efficient digital systems.",
      points: ["Fully custom features", "Role-based access", "API integrations"],
      deliverables: ["Requirements analysis", "UI/UX design", "Full-stack development", "Testing & deployment"],
      eta: "4–10 weeks",
      from: "₹80,000+",
      schema: "Custom Software Development",
    },
    {
      id: "business-management-software",
      title: "Business Management Systems",
      pill: "Manage",
      desc: "Integrated platforms to manage orders, staff, inventory, reporting, and operations in a single digital system.",
      points: ["Order & task management", "Staff performance tracking", "Live operational reports"],
      deliverables: ["Dashboard for all operations", "Role-based user management", "Export reports (PDF/Excel)", "WhatsApp notifications"],
      eta: "4–8 weeks",
      from: "₹70,000+",
      schema: "Business Management Software",
    },
    {
      id: "crm-development",
      title: "CRM & Admin Dashboard Solutions",
      pill: "CRM",
      desc: "Custom CRM systems and admin dashboards for managing leads, customers, sales pipelines, and team activity.",
      points: ["Lead & customer tracking", "Sales pipeline views", "Team activity reports"],
      deliverables: ["Lead capture & assignment", "Contact & history management", "Follow-up reminders", "Sales funnel analytics"],
      eta: "3–6 weeks",
      from: "₹55,000+",
      schema: "CRM Development",
    },
    {
      id: "inventory-management-software",
      title: "Inventory Management Systems",
      pill: "Stock",
      desc: "Real-time inventory tracking for retailers, wholesalers, and manufacturers — know your stock levels at all times.",
      points: ["Real-time stock tracking", "Low-stock alerts", "Supplier management"],
      deliverables: ["Product & variant management", "Barcode/QR scanning support", "Inward/outward entries", "Reorder level alerts"],
      eta: "3–5 weeks",
      from: "₹50,000+",
      schema: "Inventory Management Software",
    },
    {
      id: "billing-erp-software",
      title: "Billing & ERP Systems",
      pill: "ERP",
      desc: "GST-compliant billing software and ERP solutions for invoicing, accounts, HR, and complete business operations.",
      points: ["GST billing & invoicing", "Accounts & payroll", "Purchase & sales management"],
      deliverables: ["GST invoice generation", "Expense & payment tracking", "Vendor & customer ledgers", "Financial reports & analytics"],
      eta: "4–8 weeks",
      from: "₹65,000+",
      schema: "ERP Software Development",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design & Branding Solutions",
      pill: "Design",
      desc: "Modern interface design and brand identity systems that make your business look professional and trustworthy.",
      points: ["Brand identity & logo", "Figma UI/UX design", "Design system components"],
      deliverables: ["Logo & brand guidelines", "Typography & color system", "Responsive UI mockups", "Figma component library"],
      eta: "1–3 weeks",
      from: "₹20,000+",
      schema: "UI/UX Design",
    },
    {
      id: "whatsapp-automation",
      title: "WhatsApp & Business Automation",
      pill: "Automate",
      desc: "Automate customer communications, order notifications, lead follow-ups, and business workflows via WhatsApp.",
      points: ["WhatsApp Business API", "Auto-reply workflows", "Order & lead notifications"],
      deliverables: ["WhatsApp API integration", "Message templates & flows", "Trigger-based automation", "Chat history dashboard"],
      eta: "2–4 weeks",
      from: "₹35,000+",
      schema: "WhatsApp Automation",
    },
    {
      id: "domain-hosting-support",
      title: "Domain, Hosting & Technical Support",
      pill: "Support",
      desc: "Complete technical setup including domain registration, fast hosting, SSL, and ongoing technical maintenance.",
      points: ["Domain registration", "Fast cloud hosting", "SSL & security setup"],
      deliverables: ["Domain & DNS configuration", "Hosting server setup", "SSL certificate", "Monthly maintenance plans"],
      eta: "1–3 days",
      from: "₹5,000+/yr",
      schema: "Technical Support",
    },
    {
      id: "digitalization-solutions",
      title: "Custom Digitalization Solutions",
      pill: "Digitize",
      desc: "End-to-end digital transformation services for businesses transitioning from manual to digital operations.",
      points: ["Process analysis & planning", "Custom digital workflow design", "Staff training & handover"],
      deliverables: ["Digital process mapping", "Custom tools & systems", "Data migration", "Training & documentation"],
      eta: "Varies by scope",
      from: "Custom quote",
      schema: "Business Digitalization",
    },
  ];

  const process = [
    { n: "1", t: "Discover", d: "Understand your business goals, users, and requirements." },
    { n: "2", t: "Design", d: "Wireframes → UI design → approval before we code." },
    { n: "3", t: "Build", d: "Clean code, APIs, integrations, and rigorous testing." },
    { n: "4", t: "Launch", d: "Deployment, domain, analytics, SEO setup, and handover." },
    { n: "5", t: "Support", d: "15-day post-launch support included; extensions available." },
  ];

  const faqs = [
    { q: "What kind of businesses does Prajyot Infotech work with?", a: "We work with small and medium businesses across India including retailers, restaurants, clinics, salons, manufacturers, distributors, educational institutions, real estate agencies, and startups." },
    { q: "How does pricing work?", a: "We use fixed-price project quotes with clear deliverables. You'll always see the full scope, timeline, and cost before we begin. Add-ons are quoted transparently." },
    { q: "How long does development take?", a: "Simple websites: 10–20 business days. E-commerce or apps: 3–8 weeks. Custom software: 4–10 weeks depending on scope and complexity." },
    { q: "Will I own the code and data?", a: "Yes. We hand over the full repository, admin access, and documentation at project completion. You are never locked in." },
    { q: "Do you provide services across India?", a: "Yes. We serve clients across all Indian states and work with international clients remotely. Our primary base is Maharashtra." },
    { q: "Can Prajyot Infotech build both website and software for my business?", a: "Yes. We provide end-to-end digitalization including websites, mobile apps, custom software, CRM, ERP, inventory management, and automation — all from one team." },
  ];

  const servicesSchemas = services.map((s, i) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": s.title,
    "serviceType": s.schema,
    "description": s.desc,
    "provider": {
      "@type": "Organization",
      "name": BRAND,
      "@id": `${SITE_URL}/#organization`,
    },
    "areaServed": { "@type": "Country", "name": "India" },
    "url": `${SITE_URL}/services#${s.id}`,
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Services", url: `${SITE_URL}/services` },
      ]} />
      <Seo
        title="Software & Web Development Services — Prajyot Infotech India"
        description="Prajyot Infotech offers website development, mobile app development, custom software, CRM, ERP, inventory management, billing software, WhatsApp automation, and complete business digitalization services in India."
        keywords="website development services India, mobile app development, custom software development, CRM development, ERP software, inventory management, billing software, WhatsApp automation, business digitalization"
        path="/services"
        schema={[...servicesSchemas, faqSchema]}
      />

      <main className="mx-auto max-w-7xl px-4 py-14" role="main" aria-label="Prajyot Infotech services">

        {/* HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-slate-50 p-8 md:p-12 shadow-lg shadow-brand-500/5">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-800">
              Software & Digitalization Services for Indian Businesses
            </h1>
            <p className="mt-3 text-lg text-slate-700">
              From professional websites and mobile apps to CRM, ERP, inventory management, billing software, and WhatsApp automation — Prajyot Infotech provides complete digital solutions for businesses across India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={wa(`Hi ${BRAND}, I'd like to discuss a service for my business.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-2.5 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all"
              >
                Get a Free Consultation
              </a>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-200/50 blur-3xl" />
        </section>

        {/* SERVICES GRID */}
        <section className="mt-10" aria-label="All services">
          <h2 className="text-2xl md:text-3xl font-black text-navy-800">What We Build & Deliver</h2>
          <p className="mt-2 text-slate-600">Complete technology solutions covering every aspect of business digitalization.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.id}
                id={s.id}
                className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                    {s.pill}
                  </span>
                  <span className="text-[11px] rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-800">
                    {s.eta}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>

                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <details className="mt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                    What you get
                    <span className="select-none text-slate-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </details>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Starts at <span className="font-semibold text-slate-800">{s.from}</span></span>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-3 py-2 text-xs font-semibold text-white hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    Get proposal
                  </Link>
                </div>

                <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.10),transparent_55%)]" />
              </article>
            ))}
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="mt-14" aria-label="Development process">
          <h2 className="text-2xl md:text-3xl font-black text-navy-800">Our Development Process</h2>
          <p className="mt-2 max-w-3xl text-slate-700">
            A simple, transparent process — so you always know what's happening and when.
          </p>
          <ol className="mt-6 grid gap-4 md:grid-cols-5">
            {process.map((s) => (
              <li key={s.n} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/25">
                  {s.n}
                </div>
                <div className="mt-3 font-semibold text-slate-900">{s.t}</div>
                <p className="mt-1 text-sm text-slate-700">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* WHY CHOOSE PRAJYOT INFOTECH */}
        <section className="mt-14" aria-label="Why choose Prajyot Infotech">
          <h2 className="text-2xl md:text-3xl font-black text-navy-800">Why Businesses Choose Prajyot Infotech</h2>
          <p className="mt-2 text-slate-600">We understand Indian business realities and deliver professional digital solutions at accessible pricing.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              "Fixed-price model — no surprise billing mid-project",
              "Full code ownership — you keep the repo and admin access",
              "15-day post-launch support included in every project",
              "Single team for website, app, and software — no coordination overhead",
              "Understands Indian SMB needs, GST compliance, and local workflows",
              "Remote collaboration for clients across India and internationally",
              "Delivery in 10–45 days depending on project scope",
              "Available in English, Hindi, and Marathi",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="mt-1 text-brand-600" aria-hidden>✓</span>
                <span className="text-sm text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* INDUSTRIES SERVED */}
        <section className="mt-14" aria-label="Industries we serve">
          <h2 className="text-2xl md:text-3xl font-black text-navy-800">Industries We Serve</h2>
          <p className="mt-2 text-slate-600">We adapt our solutions to meet the unique requirements of each industry.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Retail & Electronics", "E-Commerce", "Restaurants & Cafés", "Healthcare & Clinics",
              "Salons & Wellness", "Education & Coaching", "Real Estate", "Manufacturing",
              "Logistics & Transport", "Dealers & Distributors", "Small Businesses & Startups",
              "Hospitality & Hotels",
            ].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14" aria-label="Frequently asked questions about Prajyot Infotech services">
          <h2 className="text-2xl md:text-3xl font-black text-navy-800">Frequently Asked Questions</h2>
          <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-brand-500/5">
            {faqs.map((f, i) => (
              <details key={i} className="group p-5 open:bg-brand-50/30">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <span className="select-none text-slate-500 transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Tech Stack Visualizer Section */}
        <section className="bg-slate-50 border-y border-slate-200 overflow-hidden">
          <TechStackVisualizer />
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-navy-800 p-8 text-white shadow-xl shadow-brand-500/20">
          <h2 className="text-2xl md:text-3xl font-extrabold">Start Your Digitalization Today</h2>
          <p className="mt-2 max-w-2xl text-white/90">
            Get a free consultation. We'll map your requirements, recommend the right solution, and give you a clear timeline and cost — no obligation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={wa(`Hi ${BRAND}, I'd like a free consultation for my business digitalization project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-brand-700 shadow-lg hover:bg-white/90 hover:shadow-xl transition-all"
            >
              WhatsApp Us Now
            </a>
            <a
              href={`mailto:${EMAIL}?subject=Service Enquiry — ${BRAND}`}
              className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2.5 font-semibold text-white hover:bg-white/10 transition"
            >
              Email Us
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
