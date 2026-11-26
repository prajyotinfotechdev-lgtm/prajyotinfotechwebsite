// App.jsx
import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import BrandLoader from "./components/BrandLoader.jsx";
import { Analytics } from "@vercel/analytics/react";
import { LeadModalProvider } from "./context/LeadModalContext.jsx";
import { prefetchTopProducts } from "./utils/prefetch.js";
import { initAnalytics, trackPageView } from "./utils/analytics.js";
import "./styles/responsive.css";
import "./style.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const Work = lazy(() => import("./pages/work.jsx"));
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

// Free Tools & Products
const ToolsHub = lazy(() => import("./pages/ToolsHub.jsx"));
const ConstructionLeakageCalculator = lazy(() => import("./pages/ConstructionLeakageCalculator.jsx"));
const WebsiteTechChecker = lazy(() => import("./pages/WebsiteTechChecker.jsx"));
const GstInvoiceGenerator = lazy(() => import("./pages/GstInvoiceGenerator.jsx"));
const QuotationGenerator = lazy(() => import("./pages/QuotationGenerator.jsx"));
const WhatsAppLinkGenerator = lazy(() => import("./pages/WhatsAppLinkGenerator.jsx"));
const GstProfitCalculator = lazy(() => import("./pages/GstProfitCalculator.jsx"));
const UpiQrGenerator = lazy(() => import("./pages/UpiQrGenerator.jsx"));
const HsnSacFinder = lazy(() => import("./pages/HsnSacFinder.jsx"));
const LegalPolicyGenerator = lazy(() => import("./pages/LegalPolicyGenerator.jsx"));
const SalarySlipGenerator = lazy(() => import("./pages/SalarySlipGenerator.jsx"));
const PurchaseOrderGenerator = lazy(() => import("./pages/PurchaseOrderGenerator.jsx"));
const BusinessEmiCalculator = lazy(() => import("./pages/BusinessEmiCalculator.jsx"));
const BreakEvenCalculator = lazy(() => import("./pages/BreakEvenCalculator.jsx"));
const NdaAgreementGenerator = lazy(() => import("./pages/NdaAgreementGenerator.jsx"));
const DemoShowcasePage = lazy(() => import("./pages/DemoShowcasePage.jsx"));
const AppCostCalculator = lazy(() => import("./pages/AppCostCalculator.jsx"));

// Comparison & Solution Hubs
const TallyVsCustomErp = lazy(() => import("./pages/TallyVsCustomErp.jsx"));
const WordpressVsCustomSoftware = lazy(() => import("./pages/WordpressVsCustomSoftware.jsx"));
const ZohoVsCustomSoftware = lazy(() => import("./pages/ZohoVsCustomSoftware.jsx"));
const ShopifyVsCustomEcommerce = lazy(() => import("./pages/ShopifyVsCustomEcommerce.jsx"));
const SolutionLandingPage = lazy(() => import("./pages/SolutionLandingPage.jsx"));
const SoftwareRfpTemplate = lazy(() => import("./pages/SoftwareRfpTemplate.jsx"));

// Other Pages
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
const OibuzSetupGuidePage = lazy(() => import("./pages/OibuzSetupGuidePage.jsx"));
const FreeBusinessAudit = lazy(() => import("./pages/FreeBusinessAudit.jsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.jsx"));

const HelpBot = lazy(() => import("./components/HelpBot.jsx"));
const FloatingWhatsApp = lazy(() => import("./components/FloatingWhatsApp.jsx"));
const LeadModal = lazy(() => import("./components/LeadModal.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);
  return null;
}

function RouteFallback() {
  const { pathname } = useLocation();
  let label = "Loading Engineering Suite...";
  if (pathname.startsWith("/tools")) label = "Opening Free Business Tool...";
  else if (pathname.startsWith("/demo")) label = "Booting Live Interactive Demo...";
  else if (pathname.startsWith("/solutions")) label = "Loading Industry Blueprint...";
  else if (pathname.startsWith("/articles")) label = "Loading Engineering Guide...";

  return <BrandLoader variant="route" label={label} showTopBar={true} />;
}

export default function App() {
  const [showChats, setShowChats] = useState(false);

  useEffect(() => {
    if (typeof window.__piDismissPreloader === "function") {
      window.__piDismissPreloader();
    }
    const analyticsTimer = setTimeout(() => initAnalytics(), 1200);
    const chatTimer = setTimeout(() => setShowChats(true), 2500);
    const prefetchTimer =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => prefetchTopProducts(), { timeout: 3000 })
        : setTimeout(() => prefetchTopProducts(), 2000);

    return () => {
      clearTimeout(analyticsTimer);
      clearTimeout(chatTimer);
      if (typeof window.cancelIdleCallback === "function" && typeof prefetchTimer === "number") {
        window.cancelIdleCallback(prefetchTimer);
      } else {
        clearTimeout(prefetchTimer);
      }
    };
  }, []);

  const location = useLocation();
  const hideGlobalNav =
    location.pathname.startsWith("/products/hrms") ||
    location.pathname === "/oibuz" ||
    location.pathname.startsWith("/oibuz/");

  return (
    <LeadModalProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/20 text-navy-800 antialiased selection:bg-brand-200/50 selection:text-navy-900 overflow-clip">
        <ScrollToTop />

        {!hideGlobalNav && <Nav />}

        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:id" element={<CaseStudyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/estimate" element={<Estimate />} />

            {/* Oibuz HRMS (Untouched) */}
            <Route path="/products/hrms" element={<ConstructionHrmsPage />} />
            <Route path="/products/hrms/story" element={<HrmsStoryPage />} />
            <Route path="/products/hrms/features" element={<HrmsFeaturesPage />} />
            <Route path="/products/hrms/for-construction" element={<HrmsConstructionPage />} />
            <Route path="/products/hrms/pricing" element={<HrmsPricingPage />} />
            <Route path="/products/hrms/resources" element={<HrmsResourcesPage />} />
            <Route path="/site-visits" element={<SiteVisitsPage />} />
            <Route path="/oibuz" element={<OibuzLandingPage />} />
            <Route path="/oibuz/setup-guide" element={<OibuzSetupGuidePage />} />

            {/* Campaign & Locations */}
            <Route path="/free-business-tech-audit" element={<FreeBusinessAudit />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/diwali-offers-2026" element={<Navigate to="/free-business-tech-audit" replace />} />
            <Route path="/software-company-in-pune" element={<CityLandingPage cityId="pune" />} />
            <Route path="/software-company-in-mumbai" element={<CityLandingPage cityId="mumbai" />} />
            <Route path="/software-company-in-latur" element={<CityLandingPage cityId="latur" />} />
            <Route path="/software-company-in-chakan-bhosari" element={<CityLandingPage cityId="chakan-bhosari" />} />
            <Route path="/software-company-in-hinjewadi" element={<CityLandingPage cityId="hinjewadi" />} />
            <Route path="/software-company-in-thane" element={<CityLandingPage cityId="thane" />} />
            <Route path="/software-company-in-nashik" element={<CityLandingPage cityId="nashik" />} />
            <Route path="/software-company-in-aurangabad" element={<CityLandingPage cityId="aurangabad" />} />
            <Route path="/software-company-in-nagpur" element={<CityLandingPage cityId="nagpur" />} />
            <Route path="/software-company-in-navi-mumbai" element={<Navigate to="/software-company-in-mumbai" replace />} />
            <Route path="/software-company-in-bangalore" element={<Navigate to="/services" replace />} />
            <Route path="/software-company-in-delhi" element={<Navigate to="/services" replace />} />
            <Route path="/software-company-in-hyderabad" element={<Navigate to="/services" replace />} />
            <Route path="/software-company-in-usa" element={<Navigate to="/services" replace />} />
            <Route path="/software-company-in-uk" element={<Navigate to="/services" replace />} />
            <Route path="/software-company-in-uae" element={<Navigate to="/services" replace />} />

            {/* Articles */}
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />

            {/* Free Business Products Hub & Utilities */}
            <Route path="/tools" element={<ToolsHub />} />
            <Route path="/tools/construction-leakage-calculator" element={<ConstructionLeakageCalculator />} />
            <Route path="/tools/website-tech-checker" element={<WebsiteTechChecker />} />
            <Route path="/tools/gst-invoice-generator" element={<GstInvoiceGenerator />} />
            <Route path="/tools/quotation-generator" element={<QuotationGenerator />} />
            <Route path="/tools/whatsapp-link-generator" element={<WhatsAppLinkGenerator />} />
            <Route path="/tools/gst-profit-calculator" element={<GstProfitCalculator />} />
            <Route path="/tools/upi-qr-generator" element={<UpiQrGenerator />} />
            <Route path="/tools/hsn-sac-finder" element={<HsnSacFinder />} />
            <Route path="/tools/legal-policy-generator" element={<LegalPolicyGenerator />} />
            <Route path="/tools/salary-slip-generator" element={<SalarySlipGenerator />} />
            <Route path="/tools/purchase-order-generator" element={<PurchaseOrderGenerator />} />
            <Route path="/tools/business-emi-calculator" element={<BusinessEmiCalculator />} />
            <Route path="/tools/break-even-calculator" element={<BreakEvenCalculator />} />
            <Route path="/tools/nda-agreement-generator" element={<NdaAgreementGenerator />} />
            <Route path="/tools/app-cost-calculator" element={<AppCostCalculator />} />

            {/* Standalone Interactive Live Product Demos */}
            <Route path="/demo" element={<Navigate to="/demo/restaurant-qr-kds" replace />} />
            <Route path="/demo/restaurant-qr-kds" element={<DemoShowcasePage demoKey="restaurant-qr-kds" />} />
            <Route path="/demo/mobile-shop-imei-pos" element={<DemoShowcasePage demoKey="mobile-shop-imei-pos" />} />
            <Route path="/demo/boutique-ecommerce" element={<DemoShowcasePage demoKey="boutique-ecommerce" />} />

            {/* Comparisons & Solution Landing Pages */}
            <Route path="/compare/tally-vs-custom-erp" element={<TallyVsCustomErp />} />
            <Route path="/compare/wordpress-vs-custom-software" element={<WordpressVsCustomSoftware />} />
            <Route path="/compare/zoho-vs-custom-software" element={<ZohoVsCustomSoftware />} />
            <Route path="/compare/shopify-vs-custom-ecommerce" element={<ShopifyVsCustomEcommerce />} />
            <Route path="/solutions/mobile-shop-pos-software" element={<SolutionLandingPage solutionKey="mobile-shop-pos-software" />} />
            <Route path="/solutions/restaurant-qr-kds-software" element={<SolutionLandingPage solutionKey="restaurant-qr-kds-software" />} />
            <Route path="/solutions/manufacturing-bom-erp" element={<SolutionLandingPage solutionKey="manufacturing-bom-erp" />} />
            <Route path="/resources/software-rfp-template" element={<SoftwareRfpTemplate />} />

            {/* General Pages */}
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/glossary" element={<TechGlossary />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/manage" element={<CareerManager />} />
            <Route path="/admin" element={<CareerManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {showChats && (
          <Suspense fallback={null}>
            <HelpBot
              launcherOffset={{ bottom: "6rem", right: "1rem" }}
              panelOffset={{ bottom: "10rem", right: "1rem" }}
              zIndex={50}
            />
            <FloatingWhatsApp bottom="1rem" right="1rem" zIndex={40} />
          </Suspense>
        )}

        {!hideGlobalNav && <Footer />}

        <Suspense fallback={null}>
          <LeadModal />
        </Suspense>

        <Analytics />
      </div>
    </LeadModalProvider>
  );
}
