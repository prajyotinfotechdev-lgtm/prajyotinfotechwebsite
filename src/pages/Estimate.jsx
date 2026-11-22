import React from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import QuoteEstimator from "../components/QuoteEstimator.jsx";

export default function Estimate() {
  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Project Estimate", url: "https://www.prajyotinfotech.in/estimate" },
        ]}
      />
      
      <Seo
        title="Project Cost Estimator — Instant Accurate Quote | Prajyot Infotech"
        description="Instant project cost estimator for website, mobile app & software development. Plan your technology budget with transparent fixed-scope estimates."
        keywords="website cost calculator, project cost estimator India, software development cost calculator, mobile app development cost, business tech estimate"
        path="/estimate"
      />

      <main className="py-24 px-4 bg-slate-50 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4 shadow-sm">
            <span>🚀</span>
            <span>2027 Business Growth Campaign — Free Technical Scoping</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight">
            Get Your <span className="text-brand-600">Project Estimate</span>
          </h1>
          <p className="text-lg text-slate-600">
            Answer a few quick questions to receive an instant, accurate estimate for your next digital project.
          </p>
        </div>

        <QuoteEstimator />
      </main>
    </>
  );
}
