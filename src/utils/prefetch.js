// Route chunk prefetcher for zero-latency perceived navigation on hover/focus

const PREFETCH_MAP = {
  "/tools": () => import("../pages/ToolsHub.jsx"),
  "/tools/gst-invoice-generator": () => import("../pages/GstInvoiceGenerator.jsx"),
  "/tools/quotation-generator": () => import("../pages/QuotationGenerator.jsx"),
  "/tools/whatsapp-link-generator": () => import("../pages/WhatsAppLinkGenerator.jsx"),
  "/tools/gst-profit-calculator": () => import("../pages/GstProfitCalculator.jsx"),
  "/tools/upi-qr-generator": () => import("../pages/UpiQrGenerator.jsx"),
  "/tools/hsn-sac-finder": () => import("../pages/HsnSacFinder.jsx"),
  "/tools/legal-policy-generator": () => import("../pages/LegalPolicyGenerator.jsx"),
  "/tools/salary-slip-generator": () => import("../pages/SalarySlipGenerator.jsx"),
  "/tools/purchase-order-generator": () => import("../pages/PurchaseOrderGenerator.jsx"),
  "/tools/business-emi-calculator": () => import("../pages/BusinessEmiCalculator.jsx"),
  "/tools/break-even-calculator": () => import("../pages/BreakEvenCalculator.jsx"),
  "/tools/nda-agreement-generator": () => import("../pages/NdaAgreementGenerator.jsx"),
  "/demo/restaurant-qr-kds": () => import("../pages/DemoShowcasePage.jsx"),
  "/demo/mobile-shop-imei-pos": () => import("../pages/DemoShowcasePage.jsx"),
  "/demo/boutique-ecommerce": () => import("../pages/DemoShowcasePage.jsx"),
  "/tools/app-cost-calculator": () => import("../pages/AppCostCalculator.jsx"),
  "/tools/website-tech-checker": () => import("../pages/WebsiteTechChecker.jsx"),
  "/tools/construction-leakage-calculator": () => import("../pages/ConstructionLeakageCalculator.jsx"),
  "/estimate": () => import("../pages/Estimate.jsx"),
  "/resources/software-rfp-template": () => import("../pages/SoftwareRfpTemplate.jsx"),
  "/compare/tally-vs-custom-erp": () => import("../pages/TallyVsCustomErp.jsx"),
  "/compare/wordpress-vs-custom-software": () => import("../pages/WordpressVsCustomSoftware.jsx"),
  "/compare/zoho-vs-custom-software": () => import("../pages/ZohoVsCustomSoftware.jsx"),
  "/compare/shopify-vs-custom-ecommerce": () => import("../pages/ShopifyVsCustomEcommerce.jsx"),
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
  const clean = path.split("?")[0];
  const loader = PREFETCH_MAP[clean];
  if (loader) {
    prefetched.add(clean);
    loader().catch(() => {
      prefetched.delete(clean);
    });
  }
}

export function prefetchTopProducts() {
  [
    "/tools",
    "/tools/gst-invoice-generator",
    "/tools/quotation-generator",
    "/tools/upi-qr-generator",
    "/tools/hsn-sac-finder",
    "/tools/whatsapp-link-generator",
    "/tools/gst-profit-calculator",
    "/tools/app-cost-calculator",
    "/tools/website-tech-checker",
    "/estimate",
  ].forEach(prefetchRoute);
}
