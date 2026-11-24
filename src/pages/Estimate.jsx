import React from "react";
import { Sparkles, Shield, Clock, Award, Code2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import QuoteEstimator from "../components/QuoteEstimator.jsx";

const FAQ_ITEMS = [
  {
    q: "How accurate is this interactive project estimate?",
    a: "This estimate is calibrated against 45+ enterprise software rollouts across Maharashtra and India. It gives you an exact ±10% architectural bracket based on actual engineering hours, senior tech lead assignment, and testing cycles. Following your submission, our Pune technical director reviews your exact specs and issues a formal Statement of Work (SOW) with fixed-milestone pricing within 24 hours."
  },
  {
    q: "Do I get full ownership of the source code?",
    a: "Yes. 100% full intellectual property (IP) and source code transfer is guaranteed on Day 1 upon milestone settlement. You receive the complete Git repository, Docker containers, database schemas, and documentation with zero vendor lock-in or recurring IP royalties."
  },
  {
    q: "What is the 60-Day Post-Launch Warranty?",
    a: "Every project delivered by Prajyot Infotech includes 60 days of complimentary post-launch engineering support. Any bugs, edge-case exceptions, or performance regressions reported during this window are resolved by our core engineers with zero additional invoices."
  },
  {
    q: "Can you build on our existing infrastructure or migrate from legacy software?",
    a: "Absolutely. We routinely modernize legacy desktop systems, migrate spreadsheets/Tally to cloud ERPs, and refactor monolithic applications into high-performance React/Node microservices with automated database migration and zero downtime."
  }
];

export default function Estimate() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Project Estimate", url: "https://www.prajyotinfotech.in/estimate" },
        ]}
      />
      
      <Seo
        title="Software & App Cost Estimator 2026 — Instant Accurate Quote | Prajyot Infotech"
        description="Calculate transparent, fixed-scope software and mobile app development costs in India. Configure architecture, modules, and timeline for an instant quotation."
        keywords="software cost calculator India, mobile app development cost estimator, custom ERP pricing Pune, web app cost calculator, business tech estimate 2026"
        path="/estimate"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="py-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>2026 Transparent Engineering Scoping · Zero Hidden Costs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-4 tracking-tight">
            Configure Your <span className="text-brand-600">Project Estimate</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Configure your technical modules, performance SLA, and launch timeline to generate an instant, realistic investment bracket calibrated to 2026 Indian engineering rates.
          </p>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>100% Source Code Transfer</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Sub-Second SLA Guarantee</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>60-Day Post-Launch Bug Warranty</span>
            </div>
          </div>
        </div>

        {/* Interactive Estimator Component */}
        <QuoteEstimator />

        {/* Architectural FAQs Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
              Frequently Asked Questions About Project Pricing
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Everything you need to know about our billing model, code ownership, and warranties.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-navy-900 text-white rounded-3xl p-8 text-center relative overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Have a customized Enterprise RFP or custom specs?</h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
              Our Pune engineering team reviews existing architecture diagrams, technical RFPs, and legacy databases to provide fixed-quote feasibility reports within 24 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-brand-600/30"
              >
                <span>Schedule an Architecture Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919322673286?text=Hi%20Prajyot%20Infotech%2C%20I%20have%20an%20enterprise%20project%20RFP%20to%20discuss."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all"
              >
                <span>Direct WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
