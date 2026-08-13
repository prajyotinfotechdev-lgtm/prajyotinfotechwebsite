import React from "react";
import { Link } from "react-router-dom";

const WA_NUMBER = "917020708747";
const EMAIL = "prajyotkankal9@gmail.com";
const CALENDLY_LINK = ""; // optional

export default function Services() {
  const services = [
    {
      id: "brand-ui",
      title: "Brand & UI Design",
      pill: "Design",
      desc:
        "Clean, modern interfaces with a consistent design system—built for clarity and conversion.",
      points: [
        "Modern design systems",
        "Reusable component libraries",
        "Mobile-friendly layouts",
      ],
      deliverables: [
        "Logo & color tokens",
        "Typography & spacing scale",
        "Buttons, forms, cards, tables",
        "Figma components + usage doc",
      ],
      eta: "1–2 weeks",
      from: "₹25k+",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
          <path d="M4 4h10v10H4zM15 4h5v5h-5zM15 10h5v10h-5zM4 15h10v5H4z" />
        </svg>
      ),
    },
    {
      id: "web-app",
      title: "Web & App Development",
      pill: "Build",
      desc:
        "Production-grade React/React Native with Node APIs, clean code, and smooth UI.",
      points: ["React & React Native", "Node.js / Express APIs", "MongoDB & Cloudinary"],
      deliverables: [
        "Responsive UI + state management",
        "REST APIs & auth (JWT/Firebase)",
        "Image/CDN setup (Cloudinary)",
        "Dev → Prod deploy & docs",
      ],
      eta: "2–4 weeks",
      from: "₹45k+",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
          <path d="M4 5h16v12H4zM2 19h20v2H2zM8 7h8v2H8z" />
        </svg>
      ),
    },
    {
      id: "saas-ecom",
      title: "SaaS & E-commerce",
      pill: "Sell",
      desc:
        "Secure auth, pricing models, carts, and admin dashboards—ready to scale.",
      points: ["Secure login & payments", "Admin dashboards", "Product catalogs & carts"],
      deliverables: [
        "Role-based access (admin/seller)",
        "Catalog, search, filters, variants",
        "Cart/checkout + WhatsApp fallback",
        "Razorpay/Stripe integration (opt.)",
      ],
      eta: "3–5 weeks",
      from: "₹60k+",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
          <path d="M7 4h14l-2 9H8zM6 6H3v2h2l2.6 7.6A2 2 0 0 0 9.5 17H19v-2H9.5l-.3-1H19l2.4-11H7zM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      ),
    },
    {
      id: "perf-seo",
      title: "Performance & SEO",
      pill: "Grow",
      desc:
        "Speed, structure, and analytics to rank better and convert more.",
      points: ["Faster load times", "SEO-friendly structure", "Analytics & A/B testing"],
      deliverables: [
        "Core Web Vitals pass (A+ target)",
        "Meta/OG/Schema & sitemaps",
        "Image optimization & lazy loading",
        "GA4/Meta Pixel + funnels",
      ],
      eta: "1–2 weeks",
      from: "₹20k+",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
          <path d="M3 3h2v18H3zM7 13h2v8H7zM11 9h2v12h-2zM15 5h2v16h-2zM19 2h2v19h-2z" />
        </svg>
      ),
    },
  ];

  const process = [
    { n: "1", t: "Discover", d: "Understand goals, users, must-haves." },
    { n: "2", t: "Design", d: "Wireframes → UI with components." },
    { n: "3", t: "Build", d: "Clean code, APIs, integrations." },
    { n: "4", t: "Launch", d: "Deploy, SEO/analytics, handover." },
    { n: "5", t: "Support", d: "15-day post-launch support." },
  ];

  // JSON-LD: ItemList of Services (kept simple—no hard prices)
  const servicesLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.desc,
      item: {
        "@type": "Service",
        serviceType: s.title,
        areaServed: "IN",
        provider: { "@type": "Organization", name: "Prajyot Infotech" },
      },
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-14" role="main" aria-label="Prajyot Infotech services">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-slate-50 p-8 md:p-12 shadow-lg shadow-brand-500/5">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-800">
            Our Services
          </h1>
          <p className="mt-3 text-slate-700">
            From idea to launch—design, development, and growth in one clean workflow.
          </p>
        </div>
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-200/50 blur-3xl" />
      </section>

      {/* SERVICES GRID */}
      <section className="mt-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <article
              key={s.id}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700">
                    {s.icon}
                  </span>
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
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-700" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Deliverables (details) */}
              <details className="mt-4 group/open">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900">
                  What you get
                  <span className="select-none text-slate-400 transition group-open:rotate-45">+</span>
                </summary>
                <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </details>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs text-slate-500">Starts at <span className="font-semibold text-slate-800">{s.from}</span></span>
                <Link
                  to={`/contact#contact`}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-3 py-2 text-xs font-semibold text-white hover:shadow-lg transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  Get proposal
                </Link>
              </div>

              {/* subtle hover bg accent */}
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.10),transparent_55%)]" />
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="mt-14">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">How we work</h2>
        <p className="mt-2 max-w-3xl text-slate-700">
          Transparent steps—so you always know what’s happening and when.
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

      {/* FAQ */}
      <section className="mt-14">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">FAQs</h2>
        <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-brand-500/5">
          {[
            {
              q: "How do you price projects?",
              a: "Fixed price with clear deliverables. Add-ons (extra pages, complex workflows) are quoted separately. You’ll always see scope and timelines upfront.",
            },
            {
              q: "How long does it take?",
              a: "Most services above are delivered in 1–5 weeks depending on scope, content readiness, and integrations.",
            },
            {
              q: "What do you need from me?",
              a: "Brand basics, a short description, any data (products/menu), and references you like. We can help fill gaps.",
            },
            {
              q: "Who owns the code and assets?",
              a: "You do. We hand over admin access, repo, and instructions so you’re never locked in.",
            },
          ].map((f, i) => (
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

      {/* CTA */}
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-600 p-8 text-white shadow-lg">
        <h3 className="text-2xl md:text-3xl font-extrabold">Ready to plan your build?</h3>
        <p className="mt-2 max-w-2xl text-white/90">
          Get a free 15-minute consultation. We’ll map features, timeline, and the best stack—no obligation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Hi DigiShop, I'd like a free 15-min consultation for my website/app."
            )}`}
            className="inline-flex items-center rounded-xl bg-white px-4 py-2.5 font-semibold text-teal-700 shadow hover:bg-white/90 transition"
          >
            Enquiry Now
          </a>
          {CALENDLY_LINK ? (
            <a
              href={CALENDLY_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2.5 font-semibold text-white hover:bg-white/10 transition"
            >
              Book a Slot
            </a>
          ) : (
            <a
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("Project Enquiry — Prajyot Infotech")}`}
              className="inline-flex items-center rounded-xl border border-white/70 px-4 py-2.5 font-semibold text-white hover:bg-white/10 transition"
            >
              Email Us
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
