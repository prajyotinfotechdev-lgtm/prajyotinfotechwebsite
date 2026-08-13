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
      <BreadcrumbsLd items={[{ name: "Home", url: "https://digishop.co.in/" }]} />

      {/* Single SEO entry point (handles title/og/twitter/canonical) */}
      <Seo
        title="Premium Websites & Apps"
        description="Clean, fast websites and apps that help your business grow. Fixed pricing, quick delivery, friendly support."
        path="/"
        image="/og/og-default.jpg"
      />

      <div id="top" />

      {/* Free Consultation Banner */}
      <Suspense fallback={null}>
        <ConsultBanner />
      </Suspense>

      <main role="main" aria-label="DigiShop home">
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
