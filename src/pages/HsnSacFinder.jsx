import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import BilingualToolGuide from "../components/BilingualToolGuide.jsx";
import { Search, FileText, ArrowRight, Sparkles, Tag } from "lucide-react";

const HSN_SAC_CODES = [
  { code: "998314", type: "SAC", rate: 18, category: "IT & Software", title: "IT design & custom software / web development services" },
  { code: "998313", type: "SAC", rate: 18, category: "IT & Software", title: "Information technology consulting & API integration services" },
  { code: "998315", type: "SAC", rate: 18, category: "IT & Software", title: "Web hosting, cloud server provisioning & SaaS infrastructure" },
  { code: "998316", type: "SAC", rate: 18, category: "IT & Software", title: "Managed IT operations & annual maintenance (AMC)" },
  { code: "998365", type: "SAC", rate: 18, category: "Marketing", title: "Digital advertising, SEO & social media campaign services" },
  { code: "998399", type: "SAC", rate: 18, category: "Design", title: "UI/UX design, branding & graphic design consultancy" },
  { code: "995411", type: "SAC", rate: 18, category: "Construction", title: "Commercial & residential building construction contracting" },
  { code: "995461", type: "SAC", rate: 18, category: "Construction", title: "Electrical installation, wiring & site works" },
  { code: "998221", type: "SAC", rate: 18, category: "Professional", title: "Accounting, auditing & bookkeeping CA services" },
  { code: "998211", type: "SAC", rate: 18, category: "Professional", title: "Legal advisory & compliance consultancy" },
  { code: "996331", type: "SAC", rate: 5,  category: "Hospitality", title: "Restaurant & dine-in food service (non-5-star hotel)" },
  { code: "996334", type: "SAC", rate: 18, category: "Hospitality", title: "Outdoor catering & corporate event food services" },
  { code: "996511", type: "SAC", rate: 5,  category: "Logistics", title: "Road freight transport agency (GTA - forward/reverse charge)" },
  { code: "999293", type: "SAC", rate: 18, category: "Education", title: "Commercial technical training & coaching classes" },
  { code: "997212", type: "SAC", rate: 18, category: "Real Estate", title: "Commercial office & shop rental / leasing services" },
  { code: "8517",   type: "HSN", rate: 18, category: "Electronics", title: "Smartphones, mobile handsets & telecom routers" },
  { code: "8471",   type: "HSN", rate: 18, category: "Electronics", title: "Laptops, desktop computers, servers & tablets" },
  { code: "8528",   type: "HSN", rate: 18, category: "Electronics", title: "Computer monitors, LED displays & projectors" },
  { code: "8443",   type: "HSN", rate: 18, category: "Electronics", title: "Thermal receipt printers, barcode printers & scanners" },
  { code: "6204",   type: "HSN", rate: 12, category: "Apparel", title: "Women's suits, lehengas, ethnic dresses & garments (>₹1,000)" },
  { code: "6205",   type: "HSN", rate: 5,  category: "Apparel", title: "Cotton shirts & garments (sale value up to ₹1,000)" },
  { code: "6109",   type: "HSN", rate: 5,  category: "Apparel", title: "T-shirts, singlets & knitted tops (up to ₹1,000)" },
  { code: "7113",   type: "HSN", rate: 3,  category: "Jewellery", title: "Gold, silver & precious metal articles of jewellery" },
  { code: "7214",   type: "HSN", rate: 18, category: "Industrial", title: "TMT steel bars, rods & structural fabrication steel" },
  { code: "2523",   type: "HSN", rate: 28, category: "Construction", title: "Portland cement & industrial white cement" },
  { code: "8708",   type: "HSN", rate: 28, category: "Automotive", title: "Motor vehicle auto-ancillary parts & components" },
  { code: "8481",   type: "HSN", rate: 18, category: "Industrial", title: "Industrial valves, pipes, hydraulic fittings & manifolds" },
  { code: "9403",   type: "HSN", rate: 18, category: "Furniture", title: "Office desks, wooden/metal furniture & modular racks" },
  { code: "3004",   type: "HSN", rate: 12, category: "Healthcare", title: "Pharmaceutical medicaments & packaged retail medicines" },
  { code: "9018",   type: "HSN", rate: 12, category: "Healthcare", title: "Medical, dental & diagnostic clinic instruments" },
  { code: "4820",   type: "HSN", rate: 12, category: "Stationery", title: "Registers, account books, billing pads & notebooks" },
  { code: "2106",   type: "HSN", rate: 18, category: "FMCG", title: "Packaged food preparations & health supplements" },
];

const CATEGORIES = ["All", "IT & Software", "Construction", "Electronics", "Industrial", "Apparel", "Hospitality", "Automotive", "Healthcare", "Professional"];

const FAQS = [
  {
    q: "What is the difference between HSN code and SAC code in India?",
    a: "HSN (Harmonized System of Nomenclature) codes classify physical goods (such as electronics 8517, steel 7214, garments 6204), while SAC (Services Accounting Code) always starts with 99 and classifies services (such as software development 998314 or contracting 995411).",
  },
  {
    q: "How many HSN digits are mandatory on Indian GST invoices?",
    a: "Under CBIC rules, businesses with annual aggregate turnover above ₹5 Crore must display 6-digit HSN codes on every B2B and B2C tax invoice, while turnover up to ₹5 Crore requires at least 4-digit HSN codes on B2B invoices.",
  },
  {
    q: "Which SAC code applies to custom software and mobile app development?",
    a: "SAC 998314 covers IT design and custom application/software development services at an 18% standard GST rate (9% CGST + 9% SGST within the same state, or 18% IGST inter-state).",
  },
  {
    q: "How do I use these codes in the Free GST Invoice Generator?",
    a: "Click 'Use in Invoice' on any HSN or SAC row below to automatically open our Free GST Invoice Generator with that exact HSN/SAC code, description, and tax slab pre-loaded.",
  },
];

export default function HsnSacFinder() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [rateFilter, setRateFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HSN_SAC_CODES.filter((item) => {
      if (cat !== "All" && item.category !== cat) return false;
      if (rateFilter !== "all" && item.rate !== Number(rateFilter)) return false;
      if (!q) return true;
      return (
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
      );
    });
  }, [query, cat, rateFilter]);

  const pageUrl = "https://www.prajyotinfotech.in/tools/hsn-sac-finder";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "India HSN Code, SAC Code & GST Tax Rate Finder",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Search Indian HSN and SAC codes with official GST slabs (3%, 5%, 12%, 18%, 28%) and load directly into our free A4 GST invoice maker.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "HSN & SAC Code Finder", url: pageUrl },
        ]}
      />
      <Seo
        title="HSN Code & SAC Code List with GST Rates India 2026 | Free Lookup | Prajyot Infotech"
        description="Search verified HSN and SAC codes with official GST rates in India (998314 software, construction, electronics, industrial, retail). 1-click export to Free GST Invoice Maker."
        keywords="hsn code list with gst rate india, sac code for software services 998314, hsn sac finder india, gst rate lookup tool"
        path="/tools/hsn-sac-finder"
        image="/og/og-hsn-finder.jpg"
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-10 sm:py-14 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Indian GST Directory · Linked directly to Invoice Maker</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            HSN &amp; SAC Code <span className="text-brand-400">GST Rate Finder</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Instantly look up Indian HSN/SAC codes and official GST slabs, then click any row to pre-fill a compliant tax invoice.
          </p>

          {/* Search Input */}
          <div className="mt-7 max-w-2xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search code or item (e.g., 998314, software, cement, mobile, steel...)"
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-950 border border-slate-700 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Filters & Results */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  cat === c
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">GST Slab:</span>
            <select
              value={rateFilter}
              onChange={(e) => setRateFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-800 focus:outline-none"
            >
              <option value="all">All Slabs</option>
              <option value="3">3%</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>
        </div>

        {/* Cards Grid (Responsive on every screen, no horizontal table overflow!) */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center">
            <p className="font-bold text-slate-800">No matching HSN/SAC code found in quick directory.</p>
            <p className="text-xs text-slate-500 mt-1">Try broader terms like &quot;software&quot;, &quot;electronics&quot;, &quot;construction&quot;, or &quot;9983&quot;.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item) => (
              <div
                key={item.code}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-brand-300 transition-all flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 font-mono font-black text-base text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                      <Tag className="w-3.5 h-3.5 text-brand-600" />
                      {item.type} {item.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono font-black text-xs">
                      {item.rate}% GST
                    </span>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-700 mb-1">
                    {item.category}
                  </div>
                  <h2 className="text-sm font-semibold text-slate-800 leading-snug">{item.title}</h2>
                </div>

                <Link
                  to={`/tools/gst-invoice-generator?hsn=${encodeURIComponent(item.code)}&rate=${item.rate}&desc=${encodeURIComponent(item.title)}`}
                  className="w-full py-2.5 px-3 rounded-xl bg-brand-50 hover:bg-brand-600 text-brand-700 hover:text-white border border-brand-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all min-h-[40px]"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Use in GST Invoice</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <BilingualToolGuide
        guides={{
          en: {
            title: "HSN vs SAC Rules for Indian GST Invoices",
            summary: "Goods use numeric HSN codes (e.g. 8517 Smartphones, 7214 Steel); services use SAC starting with 99 (e.g. 998314 Software Development). Click Use in GST Invoice to pre-load automatically.",
            steps: ["Type your service, product category, or 4/6-digit code.", "Filter by GST percentage slab (3%, 5%, 12%, 18%, 28%).", "Tap 'Use in GST Invoice' to auto-populate the invoice maker."],
          },
          mr: {
            title: "GST बिलासाठी योग्य HSN आणि SAC कोड कसे शोधायचे?",
            summary: "वस्तू (Goods) साठी HSN कोड आणि सेवा (Services) साठी 99 पासून सुरू होणारे SAC कोड लागतात. कोणत्याही कोडवर क्लिक करून थेट मोफत GST बिलात लोड करा.",
            steps: ["वरच्या बॉक्समध्ये वस्तू किंवा सेवेचे नाव शोधून पहा.", "योग्य GST दर (5%, 12%, 18%, 28%) तपासा.", "'Use in GST Invoice' वर क्लिक करून लगेच बिल तयार करा."],
          },
          hi: {
            title: "GST बिल के लिए सही HSN और SAC कोड कैसे पता करें?",
            summary: "सामान (Goods) के लिए HSN कोड और सर्विस (Services) के लिए 99 से शुरू होने वाले SAC कोड का उपयोग होता है। एक क्लिक में कोड को GST बिल मेकर में लोड करें।",
            steps: ["सर्च बार में उत्पाद या सेवा का नाम लिखकर कोड खोजें।", "सही GST स्लैब (3%, 5%, 12%, 18%, 28%) की जांच करें।", "'Use in GST Invoice' पर टैप करके तुरंत इनवॉइस बनाएं।"],
          },
        }}
      />

      <ToolSeoFaq heading="HSN & SAC Code Reference FAQs" faqs={FAQS} />
    </div>
  );
}

