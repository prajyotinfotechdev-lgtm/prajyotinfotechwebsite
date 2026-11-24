// App.jsx
import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import { Analytics } from "@vercel/analytics/react";
import "./styles/responsive.css";
import "./style.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const Work = lazy(() => import("./pages/work.jsx")); // ensure case matches actual file on disk
const Services = lazy(() => import("./pages/Services.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Estimate = lazy(() => import("./pages/Estimate.jsx"));
const CityLandingPage = lazy(() => import("./pages/CityLandingPage.jsx"));
const Articles = lazy(() => import("./pages/Articles.jsx"));
const ArticleDetail = lazy(() => import("./pages/ArticleDetail.jsx"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail.jsx"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const ConstructionLeakageCalculator = lazy(() => import("./pages/ConstructionLeakageCalculator.jsx"));
const WebsiteTechChecker = lazy(() => import("./pages/WebsiteTechChecker.jsx"));
const Testimonials = lazy(() => import("./pages/Testimonials.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const TechGlossary = lazy(() => import("./pages/TechGlossary.jsx"));
const Careers = lazy(() => import("./pages/Careers.jsx"));
const CareerManager = lazy(() => import("./pages/CareerManager.jsx"));
const ConstructionHrmsPage = lazy(() => import("./pages/ConstructionHrmsPage.jsx"));
const HrmsStoryPage = lazy(() => import("./pages/hrms/HrmsStoryPage.jsx"));
const HrmsFeaturesPage = lazy(() => import("./pages/hrms/HrmsFeaturesPage.jsx"));
const HrmsConstructionPage = lazy(() => import("./pages/hrms/HrmsConstructionPage.jsx"));
const HrmsPricingPage = lazy(() => import("./pages/hrms/HrmsPricingPage.jsx"));
const HrmsResourcesPage = lazy(() => import("./pages/hrms/HrmsResourcesPage.jsx"));
const SiteVisitsPage = lazy(() => import("./pages/SiteVisitsPage.jsx"));
const OibuzLandingPage = lazy(() => import("./pages/OibuzLandingPage.jsx"));
// 2027 Business Growth Campaign
const FreeBusinessAudit = lazy(() => import("./pages/FreeBusinessAudit.jsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.jsx"));

import HelpBot from "./components/HelpBot.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

import { LeadModalProvider } from "./context/LeadModalContext.jsx";
import LeadModal from "./components/LeadModal.jsx";



function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [showChats, setShowChats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChats(true);
    }, 3500); // defer chat widgets by 3.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();
  // Pages with their own dedicated navbar — hide global Nav on these
  const hideGlobalNav = location.pathname.startsWith("/products/hrms") || location.pathname === "/oibuz";

  return (
    <LeadModalProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/20 text-navy-800 antialiased selection:bg-brand-200/50 selection:text-navy-900 overflow-clip">
        {/* ↑ overflow-clip prevents mobile sideways scroll without breaking position: sticky */}
        <ScrollToTop />

        {!hideGlobalNav && <Nav />}

        <Suspense fallback={<div className="flex h-screen items-center justify-center text-brand-500">Loading...</div>}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
              <Route path="/services/:serviceId" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
              <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
              <Route path="/work/:id" element={<PageWrapper><CaseStudyDetail /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/estimate" element={<PageWrapper><Estimate /></PageWrapper>} />
              <Route path="/products/hrms" element={<PageWrapper><ConstructionHrmsPage /></PageWrapper>} />
              <Route path="/products/hrms/story" element={<PageWrapper><HrmsStoryPage /></PageWrapper>} />
              <Route path="/products/hrms/features" element={<PageWrapper><HrmsFeaturesPage /></PageWrapper>} />
              <Route path="/products/hrms/for-construction" element={<PageWrapper><HrmsConstructionPage /></PageWrapper>} />
              <Route path="/products/hrms/pricing" element={<PageWrapper><HrmsPricingPage /></PageWrapper>} />
              <Route path="/products/hrms/resources" element={<PageWrapper><HrmsResourcesPage /></PageWrapper>} />
              <Route path="/site-visits" element={<PageWrapper><SiteVisitsPage /></PageWrapper>} />
              <Route path="/oibuz" element={<PageWrapper><OibuzLandingPage /></PageWrapper>} />

              {/* 2027 Business Growth Campaign */}
              <Route path="/free-business-tech-audit" element={<PageWrapper><FreeBusinessAudit /></PageWrapper>} />
              <Route path="/thank-you" element={<PageWrapper><ThankYou /></PageWrapper>} />
              {/* Redirect legacy Diwali URL to new audit landing page */}
              <Route path="/diwali-offers-2026" element={<Navigate to="/free-business-tech-audit" replace />} />

              {/* Retained Location Pages (Genuine Value & Business Presence) */}
              <Route path="/software-company-in-pune" element={<PageWrapper><CityLandingPage cityId="pune" /></PageWrapper>} />
              <Route path="/software-company-in-mumbai" element={<PageWrapper><CityLandingPage cityId="mumbai" /></PageWrapper>} />
              <Route path="/software-company-in-latur" element={<PageWrapper><CityLandingPage cityId="latur" /></PageWrapper>} />

              {/* Consolidated Location Redirects (Maharashtra satellite markets -> Pune HQ) */}
              <Route path="/software-company-in-navi-mumbai" element={<Navigate to="/software-company-in-mumbai" replace />} />
              <Route path="/software-company-in-thane" element={<Navigate to="/software-company-in-mumbai" replace />} />
              <Route path="/software-company-in-nashik" element={<Navigate to="/software-company-in-pune" replace />} />
              <Route path="/software-company-in-aurangabad" element={<Navigate to="/software-company-in-pune" replace />} />
              <Route path="/software-company-in-nagpur" element={<Navigate to="/software-company-in-pune" replace />} />

              {/* Consolidated Location Redirects (Non-Maharashtra / Outstation -> Core Services) */}
              <Route path="/software-company-in-bangalore" element={<Navigate to="/services" replace />} />
              <Route path="/software-company-in-delhi" element={<Navigate to="/services" replace />} />
              <Route path="/software-company-in-hyderabad" element={<Navigate to="/services" replace />} />
              <Route path="/software-company-in-usa" element={<Navigate to="/services" replace />} />
              <Route path="/software-company-in-uk" element={<Navigate to="/services" replace />} />
              <Route path="/software-company-in-uae" element={<Navigate to="/services" replace />} />

              <Route path="/articles" element={<PageWrapper><Articles /></PageWrapper>} />
              <Route path="/articles/:id" element={<PageWrapper><ArticleDetail /></PageWrapper>} />
              <Route path="/tools/construction-leakage-calculator" element={<PageWrapper><ConstructionLeakageCalculator /></PageWrapper>} />
              <Route path="/tools/website-tech-checker" element={<PageWrapper><WebsiteTechChecker /></PageWrapper>} />
              <Route path="/testimonials" element={<PageWrapper><Testimonials /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
              <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
              <Route path="/glossary" element={<PageWrapper><TechGlossary /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
              <Route path="/careers/manage" element={<PageWrapper><CareerManager /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><CareerManager /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />

            </Routes>
          </AnimatePresence>
        </Suspense>

        {showChats && (
          <>
            {/* Chat bot at bottom-right */}
            <HelpBot
              launcherOffset={{ bottom: "6rem", right: "1rem" }} // chat button sits above WA
              panelOffset={{ bottom: "10rem", right: "1rem" }}   // chat panel above its button
              zIndex={50}
            />

            {/* WhatsApp directly under the bot */}
            <FloatingWhatsApp bottom="1rem" right="1rem" zIndex={40} />
          </>
        )}

        {!hideGlobalNav && <Footer />}

        {/* Global Lead Capture Modal */}
        <LeadModal />

        {/* Vercel Web Analytics */}
        <Analytics />
      </div>
    </LeadModalProvider>
  );
}
