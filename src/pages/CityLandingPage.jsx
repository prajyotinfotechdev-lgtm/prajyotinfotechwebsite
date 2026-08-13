import React from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import QuoteEstimator from "../components/QuoteEstimator.jsx";

export default function CityLandingPage() {
  const { city } = useParams();
  
  // Format city name (e.g., "navi-mumbai" -> "Navi Mumbai")
  const formattedCity = city
    ? city.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Your City";

  const pageTitle = `Top Software Company in ${formattedCity} for Startups`;
  const pageDesc = `Looking for a reliable software development company in ${formattedCity}? Prajyot Infotech builds custom apps and websites tailored for startups and growing businesses.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Development",
    "provider": {
      "@type": "Organization",
      "name": "Prajyot Infotech",
      "url": "https://digishop.co.in"
    },
    "areaServed": {
      "@type": "City",
      "name": formattedCity
    }
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://digishop.co.in/" },
          { name: `Software Company in ${formattedCity}`, url: `https://digishop.co.in/software-company-in-${city}` },
        ]}
      />
      
      <Seo
        title={pageTitle}
        description={pageDesc}
        path={`/software-company-in-${city}`}
        schema={schema}
      />

      <main className="py-24 px-4 bg-slate-50 min-h-[80vh] flex flex-col items-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 font-semibold text-sm mb-6">
            📍 Serving {formattedCity} & Beyond
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-navy-900 mb-6 tracking-tight leading-tight">
            The #1 Software Company for Startups in <span className="text-brand-600">{formattedCity}</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            We help startups and enterprises in {formattedCity} build scalable, premium web applications, e-commerce stores, and mobile apps. Get a reliable technical partner that focuses on your ROI.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#estimate" className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg focus:outline-none">
              Get an Estimate
            </a>
            <Link to="/work" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-navy-800 shadow-sm transition-all hover:bg-slate-50 focus:outline-none">
              View Our Work
            </Link>
          </div>
        </div>

        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-20 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">🚀</div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Startup Ready</h3>
            <p className="text-slate-600">We build MVPs and scalable architectures tailored for rapid growth and fundraising.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">⚡</div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Modern Tech Stack</h3>
            <p className="text-slate-600">React, Next.js, Node.js. We use the same technologies powering top global products.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-2xl">🤝</div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">Local Understanding</h3>
            <p className="text-slate-600">Partner with a team that understands the dynamic business landscape of {formattedCity}.</p>
          </div>
        </div>

        <div id="estimate" className="w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Calculate Your Project Cost</h2>
            <p className="text-slate-600">See exactly what it takes to bring your idea to life.</p>
          </div>
          <QuoteEstimator />
        </div>
      </main>
    </>
  );
}
