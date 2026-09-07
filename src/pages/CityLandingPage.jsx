import React from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { MapPin, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import QuoteEstimator from "../components/QuoteEstimator.jsx";
import { CITIES_DATA } from "../data/citiesData.js";

const BRAND = "Prajyot Infotech";
const SITE_URL = "https://www.prajyotinfotech.in";
const WA_NUMBER = "917020708747";
const EMAIL = "hr@prajyotinfotech.in";
const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export default function CityLandingPage({ cityId }) {
  const { city } = useParams();
  const cityKey = (cityId || city || "").toLowerCase();

  // Retrieve rich city data or fallback gracefully
  const data = CITIES_DATA[cityKey] || {
    name: city ? city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Your City",
    state: "India",
    country: "India",
    currency: "INR",
    heroBadge: "Digital Transformation Hub",
    heroTitle: `Software & Website Development Company in ${city ? city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Your City"}`,
    heroSubtitle: `Helping businesses in ${city || "your region"} scale with modern web portals, mobile applications, custom ERPs, and automated workflows.`,
    callout: `Serving businesses with custom software, websites, and high-performance digital systems.`,
    marketOverview: [
      `Businesses in this region are rapidly modernizing their operations to compete in an increasingly digital-first economy.`,
      `From streamlining back-office paperwork to deploying high-converting customer portals, modern digital infrastructure is a necessity for sustainable growth.`,
      `Prajyot Infotech partners with growing businesses to deliver high-performance software, websites, and automated workflows with transparent pricing and full code ownership.`,
    ],
    tailoredServices: [
      { title: "Custom Web Applications", desc: "Fast, responsive web applications engineered for seamless customer engagement." },
      { title: "Mobile Apps (Android & iOS)", desc: "Cross-platform mobile apps for your customers, staff, or field teams." },
      { title: "Business ERP & Billing Systems", desc: "Automate inventory, customer billing, and daily bookkeeping." },
      { title: "WhatsApp & Process Automation", desc: "Connect inquiries directly to your team with automated WhatsApp workflows." },
    ],
    keyIndustries: [
      { name: "Retail & E-Commerce", detail: "Online storefronts, inventory tracking, UPI billing" },
      { name: "Manufacturing & Distribution", detail: "Vendor portals, batch logs, warehouse dispatch" },
      { name: "Healthcare & Clinics", detail: "Patient appointment booking, electronic records" },
      { name: "Education & Academies", detail: "Student management, online fees, parent alerts" },
    ],
    whyChooseUs: [
      "Transparent fixed-bid milestone pricing with no hidden costs.",
      "100% source code ownership and intellectual property transferred upon completion.",
      "Modern tech stack (React, Node.js, Python, PostgreSQL) ensuring ultra-fast load times.",
      "Dedicated 15-day post-launch support and performance optimization included.",
    ],
    faqs: [
      {
        q: `Does Prajyot Infotech serve businesses in this region?`,
        a: `Yes. We collaborate seamlessly via structured video consultations, Slack, WhatsApp, and GitHub, providing rapid project updates and dedicated support.`,
      },
      {
        q: `How long does it take to deliver a custom business website?`,
        a: `Standard professional websites launch in 10–14 business days. Custom ERP or mobile applications typically take 4–8 weeks depending on scope.`,
      },
      {
        q: `Do we get full ownership of the intellectual property (IP)?`,
        a: `Yes, you receive complete administrative access, GitHub repository ownership, and full commercial copyright upon final milestone handover.`,
      },
    ],
  };

  const formattedCity = data.name;
  const isInternational = data.country !== "India";

  const pageTitle = isInternational
    ? `${data.heroTitle} — ${BRAND}`
    : `Software & Website Development Company in ${formattedCity} — ${BRAND}`;

  const pageDesc = isInternational
    ? `Prajyot Infotech delivers senior full-stack software development, React/Node.js web engineering, and custom cloud applications for ${formattedCity} businesses. Schedule a consultation.`
    : `Looking for the best software and website development company in ${formattedCity}? Prajyot Infotech builds high-converting websites, mobile apps, ERPs, and automated billing systems. Get a free quote.`;

  const schemaLD = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Software & Web Development in ${formattedCity}`,
      "serviceType": "Software Development",
      "description": pageDesc,
      "provider": {
        "@type": "Organization",
        "name": BRAND,
        "@id": `${SITE_URL}/#organization`,
      },
      "areaServed": {
        "@type": isInternational ? "Country" : "City",
        "name": formattedCity,
        ...(!isInternational && {
          "containedInPlace": {
            "@type": "State",
            "name": data.state,
            "containedInPlace": { "@type": "Country", "name": "India" },
          },
        }),
      },
      "url": `${SITE_URL}/software-company-in-${cityKey}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
  ];

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: `Software Company in ${formattedCity}`, url: `${SITE_URL}/software-company-in-${cityKey}` },
        ]}
      />

      <Seo
        title={pageTitle}
        description={pageDesc}
        keywords={`software company in ${formattedCity}, website development ${formattedCity}, mobile app development ${formattedCity}, custom software development ${formattedCity}, Prajyot Infotech ${formattedCity}`}
        path={`/software-company-in-${cityKey}`}
        schema={schemaLD}
      />

      <main className="bg-slate-50 min-h-[80vh]">
        {/* HERO SECTION */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-brand-50/60 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-100/80 text-brand-800 font-semibold text-xs md:text-sm mb-6 border border-brand-200">
              <MapPin className="w-4 h-4 mr-1.5 text-brand-600 shrink-0" />
              {data.heroBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight leading-tight">
              {data.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-3xl leading-relaxed">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={wa(`Hi ${BRAND}, I'm reaching out regarding software and web development services for ${formattedCity}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-brand-700 hover:to-brand-800 focus:outline-none"
              >
                Discuss Your Project
              </a>
              <Link
                to="/services"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-navy-800 shadow-sm transition-all hover:bg-slate-50 focus:outline-none inline-flex items-center gap-2"
              >
                <span>Browse All Services</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>
            <p className="mt-5 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{data.callout}</span>
            </p>
          </div>
        </section>

        {/* REGIONAL MARKET OVERVIEW */}
        <section className="py-14 px-4 bg-white border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Local Market Dynamics</span>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mt-2 mb-4">
                  Why {formattedCity} Businesses Are Modernizing Their Tech
                </h2>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-600 space-y-2">
                  <div className="font-semibold text-slate-800">Primary Focus:</div>
                  <div className="flex items-center gap-2 text-brand-700 font-medium">
                    <Zap className="w-4 h-4" /> Operational Automation
                  </div>
                  <div className="flex items-center gap-2 text-brand-700 font-medium">
                    <ShieldCheck className="w-4 h-4" /> Cloud Data Security
                  </div>
                  <div className="flex items-center gap-2 text-brand-700 font-medium">
                    <Globe className="w-4 h-4" /> Digital Market Expansion
                  </div>
                </div>
              </div>
              <div className="md:col-span-8 space-y-4 text-slate-600 leading-relaxed">
                {data.marketOverview.map((p, idx) => (
                  <p key={idx} className="text-base">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TAILORED SERVICES FOR THIS REGION */}
        <section className="py-14 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-left mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Tailored Capabilities</span>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mt-2">
                Specialized Engineering Solutions for {formattedCity}
              </h2>
              <p className="text-slate-600 mt-2 max-w-2xl">
                Bespoke systems built around the specific workflow and commercial requirements of this market.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {data.tailoredServices.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:border-brand-300 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KEY INDUSTRIES */}
        <section className="py-14 px-4 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="text-left mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Industry Expertise</span>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mt-2">
                Sectors We Empower in {formattedCity}
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.keyIndustries.map((ind, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-navy-900 text-base mb-1">{ind.name}</div>
                  <div className="text-xs text-slate-600">{ind.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE PRAJYOT INFOTECH */}
        <section className="py-14 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-left mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">The Prajyot Advantage</span>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mt-2">
                Why {formattedCity} Organizations Partner with Us
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {data.whyChooseUs.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-14 px-4 bg-white border-y border-slate-200">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Got Questions?</span>
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mt-2">
                Frequently Asked Questions in {formattedCity}
              </h2>
            </div>
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {data.faqs.map((f, i) => (
                <details key={i} className="group p-5 bg-white open:bg-brand-50/20 transition-colors">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900">
                    <span>{f.q}</span>
                    <span className="select-none text-slate-500 font-bold transition group-open:rotate-45 text-lg">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* COST ESTIMATOR */}
        <section id="estimate" className="py-14 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
                Calculate Your Project Investment
              </h2>
              <p className="text-slate-600 text-sm max-w-xl mx-auto">
                Get an instant estimate for your custom web development, mobile app, or software platform.
              </p>
            </div>
            <QuoteEstimator />
          </div>
        </section>

        {/* OTHER LOCATIONS CROSS-LINKING */}
        <section className="py-12 px-4 bg-slate-100/70 border-t border-slate-200">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Explore All Regional & Global Hubs
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {Object.keys(CITIES_DATA).map((cKey) => {
                const cItem = CITIES_DATA[cKey];
                const isActive = cityKey === cKey;
                return (
                  <Link
                    key={cKey}
                    to={`/software-company-in-${cKey}`}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-brand-600 text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {cItem.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-16 px-4 bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Ready to Build Software That Drives Real Growth in {formattedCity}?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 leading-relaxed">
              Schedule a direct consultation with our technical leadership. We will evaluate your technical requirements, outline an architectural plan, and provide a transparent, fixed-bid estimate with guaranteed delivery timelines.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={wa(`Hi ${BRAND}, I am interested in building a software/web solution for my business in ${formattedCity}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-7 py-3.5 font-semibold text-brand-800 shadow-xl hover:bg-slate-100 transition-all focus:outline-none"
              >
                WhatsApp Technical Team
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Engineering Enquiry from ${formattedCity} — ${BRAND}`}
                className="rounded-xl border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Send Email Specification
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

