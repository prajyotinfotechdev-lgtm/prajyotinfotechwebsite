import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import {
  RestaurantSimulator,
  MobileShopSimulator,
  SagyaSimulator,
} from "../components/simulators/ProductSimulators.jsx";
import { Sparkles, ArrowRight, MessageSquare, CheckCircle2, Layers } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const DEMOS = {
  "restaurant-qr-kds": {
    slug: "/demo/restaurant-qr-kds",
    title: "Interactive Restaurant QR Menu & Kitchen Display (KDS) Live Demo",
    seoTitle: "Restaurant QR Ordering & Kitchen Display (KDS) Live Interactive Demo | Prajyot Infotech",
    description: "Test-drive our live restaurant QR table ordering simulator connected directly to a real-time Kitchen Display Screen (KDS) and WhatsApp bill dispatch.",
    keywords: "restaurant qr ordering demo, kitchen display system kds demo, cafe pos live demo india, restaurant billing software pune",
    solutionLink: "/solutions/restaurant-qr-kds-software",
    solutionLabel: "Explore Restaurant QR & KDS Architecture",
    projectType: "Restaurant QR Ordering & KDS Platform",
    badge: "FoodTech & Hospitality Live Simulator",
    kpi: [
      { label: "Table Turnover", value: "+35% Faster" },
      { label: "Order Punch Error", value: "0% Manual KOT" },
      { label: "Aggregator Commission", value: "₹0 Direct QR" },
      { label: "Turnkey Launch", value: "2–3 Weeks" },
    ],
    Component: RestaurantSimulator,
    faqs: [
      {
        q: "Can customers order directly without downloading a mobile app?",
        a: "Yes. Diners scan your table QR standee with any phone camera, browse photos and pricing immediately in their browser, and punch orders directly to your chef screen.",
      },
      {
        q: "Does this support split GST billing and WhatsApp receipts?",
        a: "Yes. Every completed order automatically applies 5% GST (or customizable hotel slabs) and dispatches the formatted digital receipt straight to the guest's WhatsApp.",
      },
    ],
  },
  "mobile-shop-imei-pos": {
    slug: "/demo/mobile-shop-imei-pos",
    title: "Mobile Shop Serialized IMEI POS & GST Billing Live Demo",
    seoTitle: "Mobile Shop IMEI Barcode POS & GST Billing Live Interactive Demo | Prajyot Infotech",
    description: "Try our live retail IMEI barcode billing simulator built for smartphone stores and multi-brand electronics counters in India. Generate instant GST tax invoices.",
    keywords: "mobile shop billing software demo, imei serial number pos demo india, electronics retail gst software pune, barcode billing simulator",
    solutionLink: "/solutions/mobile-shop-pos-software",
    solutionLabel: "Explore Mobile Retail POS Capabilities",
    projectType: "Retail IMEI Barcode POS & Billing Software",
    badge: "Retail & IMEI Tracking Live Simulator",
    kpi: [
      { label: "Checkout Time", value: "45 Seconds" },
      { label: "Stock Audits", value: "100% IMEI Match" },
      { label: "WhatsApp Invoice", value: "Instant PDF" },
      { label: "Tally Sync", value: "Automated XML" },
    ],
    Component: MobileShopSimulator,
    faqs: [
      {
        q: "How does serialized IMEI tracking prevent counter theft?",
        a: "Every smartphone unit enters inventory with its unique 15-digit IMEI scanned at purchase. An invoice cannot close unless an un-sold IMEI from stock is scanned out.",
      },
      {
        q: "Can we connect our existing Bluetooth thermal or A4 laser printer?",
        a: "Yes. The production web app works seamlessly with 80mm thermal POS printers, A4 laser printers, and standard USB/Bluetooth 1D/2D barcode scanners.",
      },
    ],
  },
  "boutique-ecommerce": {
    slug: "/demo/boutique-ecommerce",
    title: "Luxury Ethnic Couture & Bespoke E-Commerce Live Demo",
    seoTitle: "Custom Boutique E-Commerce & Bridal Configurator Live Demo (SAGYA Case Study) | Prajyot Infotech",
    description: "Interact with our luxury apparel e-commerce storefront simulator featuring custom tailoring flows, high-speed catalog browsing, and instant WhatsApp stylist routing.",
    keywords: "custom boutique ecommerce demo, bridal clothing store software india, luxury apparel website demo, shopify alternative india demo",
    solutionLink: "/compare/shopify-vs-custom-ecommerce",
    solutionLabel: "Compare Custom Store vs Shopify",
    projectType: "Custom D2C Boutique E-Commerce Platform",
    badge: "Luxury D2C & Apparel Live Simulator",
    kpi: [
      { label: "Monthly Platform Fees", value: "₹0 SaaS Rent" },
      { label: "Mobile Speed", value: "< 1.1s LCP" },
      { label: "Payment Fees Saved", value: "0% Extra Cut" },
      { label: "IP Ownership", value: "100% Client" },
    ],
    Component: SagyaSimulator,
    faqs: [
      {
        q: "Why build a custom luxury storefront instead of paying Shopify Plus fees?",
        a: "Brands selling bespoke high-ticket bridal and ethnic wear avoid recurring monthly USD app subscriptions and 0.5%–2% third-party transaction surcharges while controlling every pixel.",
      },
      {
        q: "Does custom e-commerce integrate with Razorpay, Shiprocket, and WhatsApp?",
        a: "Yes. Checkout integrates natively with Razorpay UPI/cards, automated courier AWB generation, and curated WhatsApp stylist consultations.",
      },
    ],
  },
};

const ALL_DEMO_TABS = [
  { key: "restaurant-qr-kds", label: "Restaurant QR & KDS" },
  { key: "mobile-shop-imei-pos", label: "Mobile IMEI POS" },
  { key: "boutique-ecommerce", label: "Couture E-Commerce" },
];

export default function DemoShowcasePage({ demoKey = "restaurant-qr-kds" }) {
  const { openLeadModal } = useLeadModal();
  const data = DEMOS[demoKey] || DEMOS["restaurant-qr-kds"];
  const Simulator = data.Component;
  const pageUrl = `https://www.prajyotinfotech.in${data.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: data.title,
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: data.description,
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools & Demos", url: "https://www.prajyotinfotech.in/tools" },
          { name: data.title, url: pageUrl },
        ]}
      />
      <Seo
        title={data.seoTitle}
        description={data.description}
        keywords={data.keywords}
        path={data.slug}
        image="/og/og-demos.jpg"
        schema={schema}
      />

      {/* Top Header */}
      <div className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              <span>{data.badge}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {ALL_DEMO_TABS.map((t) => (
                <Link
                  key={t.key}
                  to={`/demo/${t.key}`}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                    demoKey === t.key
                      ? "bg-brand-600 border-brand-500 text-white shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight max-w-4xl">
            {data.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
            {data.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
            {data.kpi.map((k) => (
              <div key={k.label} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="text-[11px] font-mono uppercase text-slate-400">{k.label}</div>
                <div className="text-base sm:text-lg font-black text-white mt-0.5">{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Simulator Window */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-3 sm:p-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2 font-mono text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive Sandbox Environment — Click &amp; Test Live</span>
            </div>
            <Link to={data.solutionLink} className="text-brand-300 hover:text-brand-200 font-bold inline-flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {data.solutionLabel}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <Simulator />
        </div>

        {/* Sticky / Clear Action Conversion Bar */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-900/60 via-slate-900 to-navy-900/60 border border-brand-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Delivered in 2–4 Weeks with 100% Source Code &amp; IP Ownership</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Want This Customized for Your Business?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              Zero per-seat SaaS rent. We tailor the modules, tax rules, branding, and WhatsApp integrations directly to your workflow.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => openLeadModal({ projectType: data.projectType, source: `Demo Page (${demoKey})` })}
              className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer shadow-lg min-h-[46px]"
            >
              Get Custom Quote <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/917020708747?text=${encodeURIComponent(`Hi Prajyot Infotech, I tried the interactive ${data.title} on your website and would like to build a similar system.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 min-h-[46px]"
            >
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <ToolSeoFaq dark heading="Interactive System Demo FAQs" faqs={data.faqs} />
    </div>
  );
}

