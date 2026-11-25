// Route chunk prefetcher for zero-latency perceived navigation on hover/focus

const PREFETCH_MAP = {
  "/tools/gst-invoice-generator": () => import("../pages/GstInvoiceGenerator.jsx"),
  "/tools/quotation-generator": () => import("../pages/QuotationGenerator.jsx"),
  "/tools/whatsapp-link-generator": () => import("../pages/WhatsAppLinkGenerator.jsx"),
  "/tools/gst-profit-calculator": () => import("../pages/GstProfitCalculator.jsx"),
  "/tools/app-cost-calculator": () => import("../pages/AppCostCalculator.jsx"),
  "/tools/website-tech-checker": () => import("../pages/WebsiteTechChecker.jsx"),
  "/tools/construction-leakage-calculator": () => import("../pages/ConstructionLeakageCalculator.jsx"),
  "/estimate": () => import("../pages/Estimate.jsx"),
  "/resources/software-rfp-template": () => import("../pages/SoftwareRfpTemplate.jsx"),
  "/compare/tally-vs-custom-erp": () => import("../pages/TallyVsCustomErp.jsx"),
  "/compare/wordpress-vs-custom-software": () => import("../pages/WordpressVsCustomSoftware.jsx"),
  "/pricing": () => import("../pages/Pricing.jsx"),
  "/services": () => import("../pages/Services.jsx"),
  "/work": () => import("../pages/work.jsx"),
  "/about": () => import("../pages/About.jsx"),
  "/contact": () => import("../pages/Contact.jsx"),
  "/free-business-tech-audit": () => import("../pages/FreeBusinessAudit.jsx"),
};

const prefetched = new Set();

export function prefetchRoute(path) {
  if (!path || prefetched.has(path)) return;
  const loader = PREFETCH_MAP[path];
  if (loader) {
    prefetched.add(path);
    loader().catch(() => {
      prefetched.delete(path);
    });
  }
}

export function prefetchTopProducts() {
  [
    "/tools/gst-invoice-generator",
    "/tools/quotation-generator",
    "/tools/whatsapp-link-generator",
    "/tools/gst-profit-calculator",
    "/tools/app-cost-calculator",
    "/tools/website-tech-checker",
    "/estimate",
  ].forEach(prefetchRoute);
}
