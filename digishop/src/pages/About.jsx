import React from "react";
// Optional: if you have these already like on Home, use them
// import Seo from "../components/Seo.jsx";
// import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

const WA_NUMBER = "917020708747";
const EMAIL = "prajyot.infotech@gmail.com";
const CALENDLY_LINK = ""; // e.g. "https://calendly.com/yourname/15min"
const SITE_URL = "https://prajyotinfotech.com";
const LOGO_URL = "https://prajyotinfotech.com/videos/Logo.jpg";
const BRAND = "Prajyot Infotech";
const SOCIALS = [
  "https://www.linkedin.com/company/prajyotinfotech",
];

export default function About() {
  // FAQ data (used for both UI + JSON-LD)
  const faqs = [
    {
      q: "How does pricing work?",
      a: "We scope your project and offer a fixed price with clear deliverables. Add-ons (extra pages, advanced integrations) are priced transparently.",
    },
    {
      q: "How fast can you deliver?",
      a: "Most projects ship in 10–20 business days depending on scope and content readiness.",
    },
    {
      q: "What do you need from me?",
      a: "Brand name/logo, a short description, any product/menu data, and reference sites if you have them. We help fill gaps.",
    },
    {
      q: "Do you provide support after launch?",
      a: "Yes—15-day post-launch support is included. Extended support and update plans are available.",
    },
    {
      q: "Can you migrate my existing site/app?",
      a: "Yes. We can modernize your UI, migrate data, and redirect URLs to preserve SEO.",
    },
    {
      q: "Who owns the code and assets?",
      a: "You do. We hand over admin access, repo, and instructions so you’re never locked in.",
    },
  ];

  // JSON-LD: Organization
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    url: SITE_URL,
    logo: LOGO_URL,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+917020708747",
        email: EMAIL,
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs: SOCIALS,
  };

  // JSON-LD: Breadcrumbs
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${SITE_URL}/about`,
      },
    ],
  };

  // JSON-LD: FAQ
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <main id="about-top" className="mx-auto max-w-6xl px-4 py-14" role="main" aria-label="About Prajyot Infotech">
      {/* Inject JSON-LD for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 via-white to-slate-50 p-8 md:p-12 shadow-lg shadow-brand-500/5">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white px-3 py-2 rounded">
          Skip to content
        </a>
        <div className="max-w-2xl" id="main-content" tabIndex={-1}>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-navy-800">
            About {BRAND}
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            We design and build fast, premium websites and mobile apps with clean code and smooth UI.
            From idea to launch—done right and on time. Our focus: clarity, speed, and ROI for local
            businesses and growing brands.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                `Hi ${BRAND}, I'd like a free 15-min consultation for my website/app.`
              )}`}
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-2.5 text-white font-semibold shadow-lg shadow-brand-500/25 hover:shadow-xl transition-all"
            >
              Enquiry
            </a>
            {CALENDLY_LINK ? (
              <a
                href={CALENDLY_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-xl border-2 border-brand-200 bg-white px-5 py-2.5 text-brand-700 font-semibold shadow-sm hover:bg-brand-50 hover:border-brand-300 transition-all"
              >
                Book a Free 15-min Call
              </a>
            ) : (
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                  `Free 15-min Consultation — ${BRAND}`
                )}`}
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-700 shadow-sm hover:bg-slate-50 transition"
              >
                Email Us
              </a>
            )}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-200/50 blur-3xl"
        />
      </header>

      {/* QUICK STATS */}
      <section className="mt-10 grid gap-6 md:grid-cols-3" aria-label="Quick stats">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-brand-500/5 hover:shadow-lg transition-shadow">
          <div className="text-3xl font-extrabold text-gradient">50+</div>
          <div className="mt-1 text-sm text-slate-600">Projects shipped</div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-brand-500/5 hover:shadow-lg transition-shadow">
          <div className="text-3xl font-extrabold text-gradient">&lt;20d</div>
          <div className="mt-1 text-sm text-slate-600">Typical build timeline</div>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-brand-500/5 hover:shadow-lg transition-shadow">
          <div className="text-3xl font-extrabold text-gradient">A+</div>
          <div className="mt-1 text-sm text-slate-600">Lighthouse grade</div>
        </div>
      </section>

      {/* WHO WE ARE (roles only) */}
      <section className="mt-14" aria-label="Who we are">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">Who we are</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          {BRAND} is a hands-on studio for modern web and mobile products. We keep things simple:
          understand your business, design a clean customer journey, and ship a polished product with
          fast performance and easy maintenance.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-brand-500/5 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 text-lg">
                🧭
              </div>
              <div>
                <div className="font-semibold text-slate-900">Client Success Lead</div>
                <div className="text-sm text-slate-600">Sales &amp; Onboarding</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              Your first point of contact—from discovery to onboarding. Ensures your requirements are
              clear, timelines are realistic, and communication stays smooth.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md shadow-brand-500/5 hover:shadow-lg transition-all hover:-translate-y-0.5">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700 text-lg">
                🛠️
              </div>
              <div>
                <div className="font-semibold text-slate-900">Product &amp; Engineering Lead</div>
                <div className="text-sm text-slate-600">Architecture &amp; Delivery</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700">
              Leads architecture, API, and front-end execution. Focuses on speed, UX quality, and clean,
              maintainable code that’s ready to scale.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="mt-14" aria-label="What we build">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">What we build</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Tailored solutions for local stores, dealers, and growing brands—built with modern stacks and
          pixel-perfect UI.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Premium Websites",
              desc: "Blazing-fast landing pages & company sites with SEO, analytics, and lead capture.",
            },
            {
              title: "Mobile Apps",
              desc: "React Native apps with smooth UI, push notifications, and WhatsApp integration.",
            },
            {
              title: "E-commerce",
              desc: "Catalogs, carts, WhatsApp/checkout flows, dealer/retail pricing, and admin.",
            },
            {
              title: "SaaS Catalog Platform",
              desc: "Multi-tenant product catalogs with image hosting, auth, and seller dashboards.",
            },
            {
              title: "QR Menu & Ordering",
              desc: "Table-aware menus, simple ordering, and admin visibility for restaurants.",
            },
            {
              title: "Custom Dashboards",
              desc: "Admin panels, inventory tools, role-based access, and clean reporting.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold text-slate-900">{item.title}</div>
              <p className="mt-2 text-sm text-slate-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="mt-14" aria-label="How we work">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">How we work</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          A simple, transparent process—so you always know what’s happening and when.
        </p>

        <ol className="mt-6 grid gap-6 md:grid-cols-5">
          {[
            { n: "1", t: "Discover", d: "Understand your goals, users, and must-haves." },
            { n: "2", t: "Design", d: "Wireframes → visual design → final UI." },
            { n: "3", t: "Build", d: "Clean code, API integrations, optimized assets." },
            { n: "4", t: "Launch", d: "Deploy, domain, analytics, SEO basics." },
            { n: "5", t: "Support", d: "15-day post-launch support; extensions available." },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md shadow-brand-500/5 hover:shadow-lg transition-all">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-700 text-white text-sm font-bold shadow-md shadow-brand-500/25">
                {s.n}
              </div>
              <div className="mt-3 font-semibold text-slate-900">{s.t}</div>
              <p className="mt-1 text-sm text-slate-700">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PRINCIPLES */}
      <section className="mt-14" aria-label="Principles">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">Principles we work by</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            "Clarity over complexity—no fluff, just outcomes.",
            "Performance first—fast loads, smooth interactions.",
            "Design consistency—premium but practical.",
            "Reliable timelines and proactive communication.",
            "Source-of-truth docs and clean handoffs.",
            "You own your data, domain, and code.",
          ].map((p) => (
            <li key={p} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <span className="mt-1" aria-hidden>✅</span>
              <span className="text-sm text-slate-700">{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* TECH STACK */}
      <section className="mt-14" aria-label="Tech we use">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">Tech we use</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          Modern, battle-tested tools that keep your product fast and scalable.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "React", "React Native", "Node.js", "Express", "MongoDB",
            "Cloudinary", "Firebase Auth", "JWT", "Vercel/Netlify", "Render/Railway",
            "WhatsApp Deep Links", "Razorpay/Stripe (optional)", "Tailwind CSS", "Framer Motion",
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

      {/* INDUSTRIES */}
      <section className="mt-14" aria-label="Industries we serve">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">Industries we serve</h2>
        <p className="mt-3 max-w-3xl text-slate-700">
          We work across categories—adapting features to match real-world needs.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            "Mobile & Electronics",
            "Fashion & Lifestyle",
            "Grocery & Essentials",
            "Restaurants & Cafés",
            "Dealers & Distributors",
            "Repair & Services",
            "Education & Training",
            "Hospitality",
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
      <section className="mt-14" aria-label="Frequently asked questions">
        <h2 className="text-2xl md:text-3xl font-black text-navy-800">FAQs</h2>
        <div className="mt-6 divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg shadow-brand-500/5">
          {faqs.map((item, i) => (
            <details key={i} className="group p-5 open:bg-brand-50/30">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                <span className="font-semibold text-slate-900">{item.q}</span>
                <span className="select-none text-slate-500 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-700">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-navy-800 p-8 md:p-10 text-white shadow-xl shadow-brand-500/20">
        <h3 className="text-2xl md:text-3xl font-extrabold">
          Ready to plan your project?
        </h3>
        <p className="mt-2 max-w-2xl text-white/90 text-lg">
          Get a free 15-minute consultation. We'll map your features, timeline, and best stack—no obligation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              `Hi ${BRAND}, I'd like a free 15-min consultation for my website/app.`
            )}`}
            className="inline-flex items-center rounded-xl bg-white px-5 py-3 font-semibold text-brand-700 shadow-lg hover:bg-white/90 hover:shadow-xl transition-all"
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
              href={`mailto:${EMAIL}?subject=${encodeURIComponent(
                `Project Enquiry — ${BRAND}`
              )}`}
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
