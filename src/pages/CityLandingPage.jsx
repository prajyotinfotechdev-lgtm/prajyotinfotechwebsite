import React from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { MapPin, CheckCircle2 } from "lucide-react";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import QuoteEstimator from "../components/QuoteEstimator.jsx";

const BRAND = "Prajyot Infotech";
const SITE_URL = "https://prajyotinfotech.in";
const WA_NUMBER = "917020708747";
const EMAIL = "prajyot.infotech@gmail.com";
const wa = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

// City-specific content for richer, unique local pages
const cityData = {
  mumbai: {
    industries: ["E-Commerce & Retail", "Finance & FinTech", "Real Estate", "Logistics", "Restaurants & Hospitality"],
    businessContext: "Mumbai's competitive market demands fast, professional digital presence. Whether you're a retailer in Andheri, a restaurant in Bandra, or a startup in Lower Parel, a strong digital system sets you apart.",
    callout: "Trusted by businesses across Mumbai for websites, apps, and custom software.",
  },
  pune: {
    industries: ["IT & Tech Startups", "Manufacturing", "Education & Coaching", "Healthcare", "Real Estate"],
    businessContext: "Pune's booming tech ecosystem and growing startup culture make digital systems essential. From Hinjewadi to Koregaon Park, businesses need professional software to compete.",
    callout: "Serving Pune businesses with custom software, websites, and apps.",
  },
  latur: {
    industries: ["Agriculture & Agri-tech", "Retail & Trading", "Education", "Healthcare & Clinics", "Manufacturing"],
    businessContext: "Latur's growing business community is rapidly embracing digital solutions. Local retailers, schools, clinics, and trading businesses are digitizing operations to improve efficiency and reach.",
    callout: "Helping Latur businesses go digital with affordable, effective solutions.",
  },
  nagpur: {
    industries: ["Retail & Wholesale", "Healthcare", "Education", "Manufacturing", "Logistics"],
    businessContext: "Nagpur is central India's commercial hub. Businesses here benefit from digital systems that streamline inventory, customer management, billing, and online presence.",
    callout: "Delivering professional software and websites to Nagpur businesses.",
  },
  nashik: {
    industries: ["Agri-business & Wineries", "Manufacturing", "Retail", "Education", "Healthcare"],
    businessContext: "Nashik's diverse economy spans agriculture, wine production, manufacturing, and retail. Digital solutions help local businesses manage operations and grow their market reach.",
    callout: "Supporting Nashik businesses with custom digital solutions.",
  },
  aurangabad: {
    industries: ["Automotive & Manufacturing", "Tourism & Hospitality", "Retail", "Education", "Healthcare"],
    businessContext: "Aurangabad (Chhatrapati Sambhajinagar) is a manufacturing and tourism hub. Businesses here need reliable software for operations, customer management, and digital presence.",
    callout: "Serving Aurangabad businesses with professional web and software development.",
  },
  thane: {
    industries: ["Real Estate", "Retail & E-Commerce", "Healthcare", "Education", "Logistics"],
    businessContext: "Thane's rapidly growing residential and commercial base creates strong demand for digital business tools — from real estate CRMs to retail management systems.",
    callout: "Helping Thane businesses build strong digital foundations.",
  },
  "navi-mumbai": {
    industries: ["IT & Technology", "Healthcare", "Retail", "Logistics", "Real Estate"],
    businessContext: "Navi Mumbai's planned infrastructure and growing commercial zones attract businesses that need modern, scalable digital systems to manage growth.",
    callout: "Serving Navi Mumbai businesses with custom websites, apps, and software.",
  },
};

// Services relevant for local pages
const localServices = [
  { title: "Business Website", desc: "Professional, mobile-friendly website for your business." },
  { title: "E-Commerce Store", desc: "Online store with product catalog, cart, and payment." },
  { title: "Mobile App (Android/iOS)", desc: "Custom app for your customers or internal team." },
  { title: "Custom Software", desc: "Tailored business management or workflow system." },
  { title: "CRM & Dashboard", desc: "Customer and sales management system." },
  { title: "Inventory & Billing", desc: "GST billing and inventory tracking software." },
];

export default function CityLandingPage() {
  const { city } = useParams();

  // Format city name (e.g., "navi-mumbai" -> "Navi Mumbai")
  const formattedCity = city
    ? city.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    : "Your City";

  const cityInfo = cityData[city?.toLowerCase()] || {
    industries: ["Retail", "Healthcare", "Education", "Manufacturing", "Services"],
    businessContext: `${formattedCity}'s businesses are increasingly adopting digital solutions to improve operations, reach more customers, and compete more effectively in today's market.`,
    callout: `Serving ${formattedCity} businesses with professional web and software development.`,
  };

  const pageTitle = `Software & Website Development Company in ${formattedCity} — Prajyot Infotech`;
  const pageDesc = `Prajyot Infotech provides professional website development, mobile apps, CRM, ERP, inventory management, billing software, and WhatsApp automation for businesses in ${formattedCity}. Get a free consultation.`;

  const localFaqs = [
    {
      q: `Does Prajyot Infotech serve businesses in ${formattedCity}?`,
      a: `Yes. Prajyot Infotech works with businesses across ${formattedCity} and all of Maharashtra. Projects are handled remotely with dedicated support and communication.`,
    },
    {
      q: `What types of businesses in ${formattedCity} does Prajyot Infotech work with?`,
      a: `We work with retailers, restaurants, clinics, schools, manufacturers, distributors, real estate agencies, startups, and other SMBs in ${formattedCity} and across Maharashtra.`,
    },
    {
      q: `How much does a website cost for a business in ${formattedCity}?`,
      a: `A professional business website starts from ₹29,999. E-commerce stores and custom software are priced based on scope. We offer transparent, fixed pricing with no hidden costs.`,
    },
    {
      q: `How does Prajyot Infotech work with clients in ${formattedCity}?`,
      a: `We work remotely with video/voice consultations, WhatsApp communication, and regular updates. The development, design, and support process is fully managed online.`,
    },
  ];

  const schemaLD = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Website & Software Development Services in ${formattedCity}`,
      "serviceType": "Software Development",
      "description": pageDesc,
      "provider": {
        "@type": "Organization",
        "name": BRAND,
        "@id": `${SITE_URL}/#organization`,
      },
      "areaServed": {
        "@type": "City",
        "name": formattedCity,
        "containedInPlace": { "@type": "State", "name": "Maharashtra", "containedInPlace": { "@type": "Country", "name": "India" } },
      },
      "url": `${SITE_URL}/software-company-in-${city}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": localFaqs.map((f) => ({
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
          { name: `Software Development in ${formattedCity}`, url: `${SITE_URL}/software-company-in-${city}` },
        ]}
      />

      <Seo
        title={pageTitle}
        description={pageDesc}
        keywords={`website development company ${formattedCity}, software development ${formattedCity}, mobile app development ${formattedCity}, CRM software ${formattedCity}, Prajyot Infotech ${formattedCity}`}
        path={`/software-company-in-${city}`}
        schema={schemaLD}
      />

      <main className="bg-slate-50 min-h-[80vh]">
        {/* HERO */}
        <section className="py-16 px-4 bg-gradient-to-br from-brand-50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 font-semibold text-sm mb-6">
              <MapPin className="w-4 h-4 mr-1.5" /> Serving {formattedCity} & across Maharashtra
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight leading-tight">
              Software & Website Development Company in{" "}
              <span className="text-brand-600">{formattedCity}</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl">
              {BRAND} helps businesses in {formattedCity} go digital with professional websites, mobile apps, custom software, CRM, ERP, inventory management, billing systems, and WhatsApp automation. Fixed pricing. Full ownership. Delivered on time.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={wa(`Hi ${BRAND}, I'm a business from ${formattedCity} and I'd like a free consultation.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg focus:outline-none"
              >
                Get a Free Consultation
              </a>
              <Link
                to="/services"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-navy-800 shadow-sm transition-all hover:bg-slate-50 focus:outline-none"
              >
                View All Services
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-500">{cityInfo.callout}</p>
          </div>
        </section>

        {/* SERVICES FOR THIS CITY */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              What We Build for {formattedCity} Businesses
            </h2>
            <p className="text-slate-600 mb-8">
              From a simple business website to full-scale custom software — we handle every digital need.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {localServices.map((s) => (
                <div key={s.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{s.title}</h3>
                  <p className="text-slate-600 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LOCAL BUSINESS CONTEXT */}
        <section className="py-14 px-4 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Digitalization for {formattedCity} Businesses
            </h2>
            <p className="text-slate-600 leading-relaxed max-w-3xl mb-8">{cityInfo.businessContext}</p>
            <div>
              <h3 className="text-lg font-semibold text-navy-900 mb-4">Industries We Serve in {formattedCity}</h3>
              <div className="flex flex-wrap gap-2">
                {cityInfo.industries.map((ind) => (
                  <span key={ind} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 shadow-sm">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY PRAJYOT INFOTECH */}
        <section className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-8">
              Why Businesses in {formattedCity} Choose Prajyot Infotech
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {[
                `Remote-friendly collaboration — no need for in-person meetings`,
                `Fixed-price projects — transparent cost before we begin`,
                `Full code ownership at project completion`,
                `Delivery in 10–45 days depending on complexity`,
                `Single team for web, app, and software needs`,
                `Works in English, Hindi, and Marathi`,
                `15-day post-launch support included`,
                `Understands Indian SMB needs, GST compliance, and local workflows`,
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 px-4 bg-white border-y border-slate-200">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {localFaqs.map((f, i) => (
                <details key={i} className="group p-5 bg-white open:bg-brand-50/30">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="font-semibold text-slate-900">{f.q}</span>
                    <span className="select-none text-slate-500 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* COST ESTIMATOR */}
        <section id="estimate" className="py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-4">
                Calculate Your Project Cost
              </h2>
              <p className="text-slate-600">
                Get an instant estimate for your {formattedCity} business digitalization project.
              </p>
            </div>
            <QuoteEstimator />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-14 px-4 bg-gradient-to-br from-brand-600 to-navy-800">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
              Ready to Digitalize Your {formattedCity} Business?
            </h2>
            <p className="text-white/90 mb-8">
              Get a free consultation with {BRAND}. We'll understand your requirements, recommend the right solution, and give you a clear cost and timeline — no obligation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={wa(`Hi ${BRAND}, I'm from ${formattedCity} and want to discuss digitalization for my business.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 shadow-lg hover:bg-white/90 transition-all"
              >
                WhatsApp Us Now
              </a>
              <a
                href={`mailto:${EMAIL}?subject=Enquiry from ${formattedCity} — ${BRAND}`}
                className="rounded-xl border border-white/70 px-6 py-3 font-semibold text-white hover:bg-white/10 transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
