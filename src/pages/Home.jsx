// src/pages/Home.jsx
import React, { lazy, Suspense, useState } from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

// Eagerly load Hero for best LCP
import AuroraHero from "../components/AuroraHero.jsx";

// Lazy load everything below the fold
const Marquee      = lazy(() => import("../components/Marquee.jsx"));
const Features     = lazy(() => import("../components/Features.jsx"));
const Industries   = lazy(() => import("../components/Industries.jsx"));
const Showreel     = lazy(() => import("../components/Showreel.jsx"));
const TechStack    = lazy(() => import("../components/TechStack.jsx"));
const CaseStudies  = lazy(() => import("../components/CaseStudies.jsx"));
const Testimonials = lazy(() => import("../components/Testimonials.jsx"));
const CTA          = lazy(() => import("../components/CTA.jsx"));
const ConsultBanner = lazy(() => import("../components/ConsultBanner.jsx"));
const BeforeAfterSlider = lazy(() => import("../components/BeforeAfterSlider.jsx"));
const ParallaxPortfolio = lazy(() => import("../components/ParallaxPortfolio.jsx"));
const DigitalReadinessQuiz = lazy(() => import("../components/DigitalReadinessQuiz.jsx"));
const ArticlesPreview = lazy(() => import("../components/ArticlesPreview.jsx"));
const PortfolioDemoModal = lazy(() => import("../components/PortfolioDemoModal.jsx"));
const EngineeringProcess = lazy(() => import("../components/EngineeringProcess.jsx"));
const ROICalculator = lazy(() => import("../components/ROICalculator.jsx"));
const TrustGuarantees = lazy(() => import("../components/TrustGuarantees.jsx"));
const ArchitectureBlueprint = lazy(() => import("../components/ArchitectureBlueprint.jsx"));
const ClientExperienceSimulator = lazy(() => import("../components/ClientExperienceSimulator.jsx"));

const SectionSkeleton = ({ className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 py-16 ${className}`}>
    <div className="h-7 w-48 rounded-lg bg-slate-200 animate-pulse" />
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="h-40 rounded-2xl bg-slate-100 animate-pulse" />
      <div className="h-40 rounded-2xl bg-slate-100 animate-pulse" />
      <div className="h-40 rounded-2xl bg-slate-100 animate-pulse hidden lg:block" />
    </div>
  </div>
);

export default function Home() {
  const [activeDemo, setActiveDemo] = useState(null);

  return (
    <>
      {/* Structured Data */}
      <BreadcrumbsLd items={[{ name: "Home", url: "https://www.prajyotinfotech.in/" }]} />

      <Seo
        title="Prajyot Infotech — Software Engineering & Web Development Company | Official Website"
        description="Prajyot Infotech is a premier software engineering company building bespoke web applications, enterprise ERP/CRM suites, cross-platform mobile apps, and intelligent business workflows."
        keywords="software engineering company India, custom software development, enterprise web development, mobile app development, ERP CRM development, intelligent workflow automation"
        path="/"
        image="/og/og-default.jpg"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://www.prajyotinfotech.in/#website",
            "name": "Prajyot Infotech",
            "url": "https://www.prajyotinfotech.in",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.prajyotinfotech.in/services?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://www.prajyotinfotech.in/#organization",
            "name": "Prajyot Infotech",
            "url": "https://www.prajyotinfotech.in",
            "logo": "https://www.prajyotinfotech.in/videos/Logo.jpg",
            "description": "Premier software engineering company specializing in high-performance web applications, enterprise SaaS, custom ERP & CRM solutions, and automated business operations systems.",
            "areaServed": { "@type": "Country", "name": "India" },
            "sameAs": [
              "https://www.instagram.com/prajyot.infotech",
              "https://www.linkedin.com/company/prajyotinfotech"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "sales",
              "telephone": "+917020708747",
              "email": "hr@prajyotinfotech.in",
              "availableLanguage": ["English", "Hindi", "Marathi"],
              "areaServed": ["IN", "US", "AE", "GB", "AU"]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Prajyot Infotech",
            "image": "https://www.prajyotinfotech.in/videos/Logo.jpg",
            "@id": "https://www.prajyotinfotech.in/#service",
            "url": "https://www.prajyotinfotech.in",
            "telephone": "+917020708747",
            "priceRange": "₹₹",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pune",
              "addressRegion": "Maharashtra",
              "addressCountry": "IN"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "48",
              "bestRating": "5"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What services does Prajyot Infotech provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Prajyot Infotech provides custom website development, mobile application development (Android & iOS), SaaS platforms, ERP systems, CRM software, WhatsApp Business automation, and end-to-end digitalization for businesses worldwide."
                }
              },
              {
                "@type": "Question",
                "name": "Does Prajyot Infotech serve clients outside India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Prajyot Infotech partners with businesses and startups across the USA, UAE, UK, Canada, and Australia, offering dedicated offshore engineering teams, full IP ownership, and timezone overlap."
                }
              },
              {
                "@type": "Question",
                "name": "How much does custom software or web development cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fixed-scope starter digital portals start from ₹29,999 ($399 USD), while custom enterprise ERPs, SaaS architectures, and bespoke platforms are custom-scoped with milestone deliverables and 100% intellectual property ownership."
                }
              },
              {
                "@type": "Question",
                "name": "Do clients retain 100% full source code and intellectual property ownership?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Every software system engineered by Prajyot Infotech includes 100% full Git repository handover and complete IP ownership transfer. Clients own all source code with zero vendor lock-in and zero recurring seat licensing fees."
                }
              },
              {
                "@type": "Question",
                "name": "What post-launch warranty and SLA guarantees are provided?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every production launch includes a contractually guaranteed 60-day post-launch bug warranty covering performance optimizations, edge cases, and adjustments, supported by our 99.98% cloud architecture uptime SLA."
                }
              },
              {
                "@type": "Question",
                "name": "Does Prajyot Infotech execute Non-Disclosure Agreements (NDA)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Prajyot Infotech routinely signs mutual Non-Disclosure Agreements (NDA) prior to project discovery to safeguard proprietary business workflows, IP, and data schemas."
                }
              }
            ]
          }
        ]}
      />

      <div id="top" />

      {/* Free Consultation Banner — fixed top/bottom */}
      <Suspense fallback={null}>
        <ConsultBanner />
      </Suspense>

      <main role="main" aria-label="Prajyot Infotech — Website, App & Software Development">

        {/* 1. HERO — with stats bar. Eagerly loaded for best LCP */}
        <AuroraHero />

        {/* 2. SERVICES MARQUEE — visual rhythm breaker */}
        <Suspense fallback={<div className="h-16 border-y border-slate-200 bg-white animate-pulse" />}>
          <Marquee />
        </Suspense>

        {/* 2.25 DIGITAL READINESS QUIZ */}
        <Suspense fallback={<SectionSkeleton />}>
          <DigitalReadinessQuiz />
        </Suspense>

        {/* 2.5 BEFORE / AFTER SLIDER - educational quality contrast */}
        <Suspense fallback={<SectionSkeleton />}>
          <BeforeAfterSlider />
        </Suspense>

        {/* 3. WHAT WE BUILD — service benefit cards (business outcomes) */}
        <Suspense fallback={<SectionSkeleton />}>
          <Features />
        </Suspense>

        {/* 4. INDUSTRIES WE SERVE — client self-identification */}
        <Suspense fallback={<SectionSkeleton />}>
          <Industries />
        </Suspense>

        {/* 5. HOW WE WORK — process + why choose us */}
        <Suspense fallback={<SectionSkeleton />}>
          <Showreel />
        </Suspense>

        {/* 6. TECH STACK — builds technical trust */}
        <Suspense fallback={<SectionSkeleton />}>
          <TechStack />
        </Suspense>

        {/* 6.25 ENTERPRISE ARCHITECTURE & SECURITY BLUEPRINT */}
        <Suspense fallback={<SectionSkeleton />}>
          <ArchitectureBlueprint />
        </Suspense>

        {/* 6.5 PARALLAX PORTFOLIO — Apple style scrolling */}
        <Suspense fallback={<SectionSkeleton />}>
          <ParallaxPortfolio onOpenDemo={(p) => setActiveDemo(p)} />
        </Suspense>

        {/* 7. CASE STUDIES — proof of work */}
        <Suspense fallback={<SectionSkeleton />}>
          <CaseStudies />
        </Suspense>

        {/* 7.25 4-STEP TRANSPARENT ENGINEERING LIFECYCLE */}
        <div className="bg-[#080d19] py-4 my-8 border-y border-slate-800/80">
          <Suspense fallback={<SectionSkeleton />}>
            <EngineeringProcess />
          </Suspense>
        </div>

        {/* 7.35 INTERACTIVE CLIENT STAGING & SPRINT TRACKER SIMULATOR */}
        <Suspense fallback={<SectionSkeleton />}>
          <ClientExperienceSimulator />
        </Suspense>

        {/* 7.5 INTERACTIVE ROI & AUTOMATION SAVINGS CALCULATOR */}
        <Suspense fallback={<SectionSkeleton />}>
          <ROICalculator />
        </Suspense>

        {/* 7.75 5 ENTERPRISE GUARANTEES & COMPARISON MATRIX */}
        <div className="bg-[#080d19] py-4 my-8 border-y border-slate-800/80">
          <Suspense fallback={<SectionSkeleton />}>
            <TrustGuarantees />
          </Suspense>
        </div>

        {/* 8. INTERACTIVE TECH LAB & ARTICLES — engineering authority */}
        <Suspense fallback={<SectionSkeleton />}>
          <ArticlesPreview />
        </Suspense>

        {/* 8.5 TESTIMONIALS — social proof from real clients */}
        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        {/* 9. CTA — final conversion point */}
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>

      </main>

      {/* Live Interactive Simulator Modal */}
      {activeDemo && (
        <Suspense fallback={null}>
          <PortfolioDemoModal
            project={activeDemo}
            onClose={() => setActiveDemo(null)}
          />
        </Suspense>
      )}

      <noscript>
        Please enable JavaScript to see animations and interactive sections. Visit{" "}
        <a href="/contact">our contact page</a> to get in touch directly.
      </noscript>
    </>
  );
}
