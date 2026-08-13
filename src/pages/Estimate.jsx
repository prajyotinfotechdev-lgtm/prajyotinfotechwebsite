import React from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import QuoteEstimator from "../components/QuoteEstimator.jsx";

export default function Estimate() {
  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://prajyotinfotech.in/" },
          { name: "Project Estimate", url: "https://prajyotinfotech.in/estimate" },
        ]}
      />
      
      <Seo
        title="Free Project Cost Estimator — Website, App & Software Development"
        description="Use Prajyot Infotech's free project cost estimator to get an instant quote for website development, mobile app development, custom software, and business digitalization projects."
        keywords="website development cost calculator, software development estimate, mobile app cost India, project quote Prajyot Infotech"
        path="/estimate"
      />

      <main className="py-24 px-4 bg-slate-50 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12">
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
