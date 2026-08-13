// src/pages/Home.jsx
import React, { lazy, Suspense } from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

const Hero = lazy(() => import("../components/Hero.jsx"));
const Marquee = lazy(() => import("../components/Marquee.jsx"));
const Showreel = lazy(() => import("../components/Showreel.jsx"));
const Features = lazy(() => import("../components/Features.jsx"));
const CaseStudies = lazy(() => import("../components/CaseStudies.jsx"));
const Testimonials = lazy(() => import("../components/Testimonials.jsx"));
const CTA = lazy(() => import("../components/CTA.jsx"));
const ConsultBanner = lazy(() => import("../components/ConsultBanner.jsx"));

const SectionSkeleton = ({ className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 py-16 ${className}`}>
    <div className="h-7 w-40 rounded bg-slate-200" />
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="h-40 rounded-xl bg-slate-200" />
      <div className="h-40 rounded-xl bg-slate-200" />
      <div className="h-40 rounded-xl bg-slate-200 hidden lg:block" />
    </div>
  </div>
);

export default function Home() {
  return (
    <>
      {/* JSON-LD only (doesn't render visible text) */}
      <BreadcrumbsLd items={[{ name: "Home", url: "https://prajyotinfotech.in/" }]} />

      {/* Single SEO entry point (handles title/og/twitter/canonical) */}
      <Seo
        title="Website, App & Software Development Company in India"
        description="Prajyot Infotech provides professional website development, mobile apps, custom software, CRM, ERP, inventory management, billing software, and WhatsApp automation for businesses across India. Fixed pricing, full ownership."
        keywords="website development company India, software development company, mobile app development India, CRM software, ERP development, business digitalization"
        path="/"
        image="/og/og-default.jpg"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://prajyotinfotech.in/#website",
            "name": "Prajyot Infotech",
            "url": "https://prajyotinfotech.in"
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://prajyotinfotech.in/#organization",
            "name": "Prajyot Infotech",
            "url": "https://prajyotinfotech.in",
            "logo": "https://prajyotinfotech.in/videos/Logo.jpg",
            "description": "Professional software and web development company in India. Custom websites, mobile apps, CRM, ERP, inventory management, billing software, and WhatsApp automation.",
            "sameAs": [
              "https://www.instagram.com/prajyot.infotech",
              "https://www.linkedin.com/company/prajyotinfotech"
            ]
          }
        ]}
      />

      <div id="top" />

      {/* Free Consultation Banner */}
      <Suspense fallback={null}>
        <ConsultBanner />
      </Suspense>

      <main role="main" aria-label="Prajyot Infotech — Website, App & Software Development">
        <Suspense
          fallback={
            <div className="bg-slate-50">
              <SectionSkeleton className="py-20" />
            </div>
          }
        >
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Marquee />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Showreel />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Features />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CaseStudies />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <Testimonials />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </main>

      <noscript>
        Please enable JavaScript to see animations and interactive sections.
      </noscript>
    </>
  );
}
