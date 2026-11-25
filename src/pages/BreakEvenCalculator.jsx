import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import BilingualToolGuide from "../components/BilingualToolGuide.jsx";
import { TrendingUp, Share2, Copy, Check, ArrowRight, Sparkles, AlertTriangle } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";
import { trackEvent } from "../utils/analytics.js";

function fmtINR(n) {
  return Math.round(Number(n || 0)).toLocaleString("en-IN");
}

const BILINGUAL_GUIDE = {
  en: {
    title: "True Break-Even & Indian D2C Order Profitability Math",
    summary: "Don't price D2C products only by Cost + Shipping. Indian sellers lose margin to GST, 2% payment gateway cuts, Courier RTO losses, and Meta Ad CAC.",
    steps: [
      "Enter monthly fixed overheads (rent, staff, Shopify/SaaS software).",
      "Enter per-order selling price, product COGS, courier cost, and ad cost per order (CAC).",
      "See your exact monthly Break-Even Order count and Minimum Viable ROAS instantly.",
    ],
    note: "Tip: Eliminating SaaS platform commission & RTO frauds via custom OTP/WhatsApp checkout boosts contribution margin per order directly.",
  },
  mr: {
    title: "बिझनेस ब्रेक-ईव्हन (Break-Even) आणि D2C नफा कॅल्क्युलेटर",
    summary: "नफा कधी सुरू होतो हे मोजा — दुकान भाडे, पगार, डिलिव्हरी खर्च, Razorpay शुल्क आणि Return (RTO) वजा करून महिन्याला किमान किती ऑर्डर व्हायला हव्यात ते मराठीत तपासा.",
    steps: [
      "महिन्याचा फिक्स खर्च (भाडे, कामगार पगार, सॉफ्टवेअर फी) भरा.",
      "एका प्रॉडक्टची विक्री किंमत, खरेदी किंमत, कुरिअर आणि जाहिरात खर्च टाका.",
      "तो विभाग नफ्यात येण्यासाठी लागणाऱ्या ऑर्डर्स आणि मिनिमम ROAS पहा.",
    ],
    note: "टीप: Shopify सारख्या प्लॅटफॉर्मचे मासिक शुल्क आणि अतिरिक्त कमिशन वाचवून स्वतःचे कस्टम स्टोअर बनवल्यास प्रत्येक ऑर्डरमागे मोठी बचत होते.",
  },
  hi: {
    title: "ब्रेक-ईवन पॉइंट और ई-कॉमर्स प्रॉफिट मार्जिन कैलकुलेटर",
    summary: "जानें कि दुकान/ई-कॉमर्स स्टोर का खर्च निकालकर असली मुनाफा कमाने के लिए हर महीने कम से कम कितने ऑर्डर (Units) बेचना ज़रूरी है।",
    steps: [
      "महीने के तय खर्च (किराया, सैलरी, सॉफ्टवेयर फीस) दर्ज करें।",
      "प्रति यूनिट बिक्री मूल्य, लागत, पेमेंट गेटवे फीस (2%) और डिलीवरी खर्च डालें।",
      "तुरंत Break-Even ऑर्डर संख्या और Minimum ROAS चेक करें।",
    ],
    note: "टिप: हर महीने कस्टम चेकआउट और WhatsApp ऑर्डर कन्फर्मेशन से नकली COD/RTO नुकसान कम किया जा सकता है।",
  },
};

export default function BreakEvenCalculator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);

  const [fixedCost, setFixedCost] = useState(() => Number(searchParams.get("fixed")) || 120000);
  const [sellingPrice, setSellingPrice] = useState(() => Number(searchParams.get("sp")) || 1499);
  const [cogs, setCogs] = useState(() => Number(searchParams.get("cogs")) || 520);
  const [shipping, setShipping] = useState(() => Number(searchParams.get("ship")) || 85);
  const [gstPct, setGstPct] = useState(() => Number(searchParams.get("gst")) || 12);
  const [pgPct, setPgPct] = useState(() => Number(searchParams.get("pg")) || 2);
  const [adCac, setAdCac] = useState(() => Number(searchParams.get("cac")) || 260);

  useEffect(() => {
    const p = new URLSearchParams();
    p.set("fixed", String(fixedCost));
    p.set("sp", String(sellingPrice));
    p.set("cogs", String(cogs));
    p.set("ship", String(shipping));
    p.set("gst", String(gstPct));
    p.set("pg", String(pgPct));
    p.set("cac", String(adCac));
    setSearchParams(p, { replace: true });
  }, [fixedCost, sellingPrice, cogs, shipping, gstPct, pgPct, adCac, setSearchParams]);

  const metrics = useMemo(() => {
    const sp = Math.max(1, Number(sellingPrice) || 1);
    const netExGst = sp / (1 + (Number(gstPct) || 0) / 100);
    const gstOutflow = sp - netExGst;
    const pgFee = (sp * (Number(pgPct) || 0)) / 100;
    const variablePerUnit = (Number(cogs) || 0) + (Number(shipping) || 0) + pgFee + (Number(adCac) || 0) + gstOutflow;
    const contribution = sp - variablePerUnit;
    const cmPct = (contribution / sp) * 100;
    const profitable = contribution > 0;
    const breakEvenUnits = profitable ? Math.ceil((Number(fixedCost) || 0) / contribution) : Infinity;
    const breakEvenRevenue = profitable ? breakEvenUnits * sp : Infinity;
    const maxAllowedCac = sp - ((Number(cogs) || 0) + (Number(shipping) || 0) + pgFee + gstOutflow);
    const minRoas = adCac > 0 ? sp / adCac : 0;

    const scenarios = profitable
      ? [0.5, 1, 1.5, 2, 3].map((mult) => {
          const u = Math.max(1, Math.round(breakEvenUnits * mult));
          const netProfit = u * contribution - (Number(fixedCost) || 0);
          return { label: `${u.toLocaleString("en-IN")} orders/mo`, revenue: u * sp, netProfit };
        })
      : [];

    return { netExGst, gstOutflow, pgFee, variablePerUnit, contribution, cmPct, profitable, breakEvenUnits, breakEvenRevenue, maxAllowedCac, minRoas, scenarios };
  }, [fixedCost, sellingPrice, cogs, shipping, gstPct, pgPct, adCac]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      trackEvent("tool_share_link", { tool: "break-even-calculator" });
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const shareWhatsApp = () => {
    trackEvent("whatsapp_share_clicked", { tool: "break-even-calculator" });
    const text = metrics.profitable
      ? `*D2C Break-Even Analysis*\nSelling Price: ₹${sellingPrice}\nContribution Margin/Order: ₹${Math.round(metrics.contribution)} (${metrics.cmPct.toFixed(1)}%)\nFixed Costs: ₹${fmtINR(fixedCost)}/mo\n-> *Break-Even Point: ${metrics.breakEvenUnits} Orders/mo* (₹${fmtINR(metrics.breakEvenRevenue)})\n\nRun free check: ${window.location.href}`
      : `Checked D2C unit economics at ₹${sellingPrice} — unit contribution is negative (₹${Math.round(metrics.contribution)}). Need pricing review: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/break-even-calculator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Break-Even Point & Indian D2C Unit Economics Calculator",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Calculate monthly break-even units, revenue targets, payment gateway cuts, GST deductions, and Meta Ad ROAS profitability in INR.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "Break-Even Calculator", url: pageUrl },
        ]}
      />
      <Seo
        title="Break-Even Point & D2C Unit Economics Calculator India | Free Tool"
        description="Find exact monthly sales needed to break even after Indian GST, Razorpay 2% gateway charges, shipping, and Meta Ad CAC. Built for Indian D2C brands & retail startups."
        keywords="break even calculator india, d2c unit economics calculator, roas profit calculator india, ecommerce margin calculator inr"
        path="/tools/break-even-calculator"
        image="/og/og-break-even.jpg"
        schema={schema}
      />

      <div className="bg-slate-900 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>INR Unit Economics · GST &amp; Payment Fee Ready</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Break-Even &amp; D2C Unit Economics Calculator
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mt-2">
            Find exactly how many orders/month you need to cover fixed overheads after deducting GST, product cost, courier charges, payment fees, and ad CAC.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Monthly Fixed Cost (₹)</label>
              <input
                type="number"
                min="0"
                step="5000"
                value={fixedCost}
                onChange={(e) => setFixedCost(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <span className="text-[11px] text-slate-400">Rent, salaries, SaaS tools, retainers</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  min="1"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Product COGS (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={cogs}
                  onChange={(e) => setCogs(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Courier/Pack (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={shipping}
                  onChange={(e) => setShipping(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Ad Cost / CAC (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={adCac}
                  onChange={(e) => setAdCac(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">GST Slab (%)</label>
                <select
                  value={gstPct}
                  onChange={(e) => setGstPct(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold"
                >
                  {[0, 3, 5, 12, 18, 28].map((g) => <option key={g} value={g}>{g}% GST (Incl.)</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-1">Gateway / Cut (%)</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.5"
                  value={pgPct}
                  onChange={(e) => setPgPct(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={shareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Share2 className="w-3.5 h-3.5" /> WhatsApp Report
              </button>
              <button
                type="button"
                onClick={copyUrl}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Link"}</span>
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="lg:col-span-7 space-y-5">
            {!metrics.profitable ? (
              <div className="bg-rose-950 text-white rounded-3xl p-6 border border-rose-500/40">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase mb-2">
                  <AlertTriangle className="w-4 h-4" /> Unit Loss Warning
                </div>
                <div className="text-2xl font-black">Unit Economics Are Negative (₹{Math.round(metrics.contribution)} / unit)</div>
                <p className="text-rose-200 text-xs mt-2">
                  Raise selling price above ₹{Math.ceil(metrics.variablePerUnit)} or cut Ad CAC below ₹{Math.max(0, Math.floor(metrics.maxAllowedCac))} to break even.
                </p>
              </div>
            ) : (
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">Break-Even Orders/Mo</span>
                    <div className="text-3xl font-black text-emerald-400 mt-0.5">{metrics.breakEvenUnits.toLocaleString("en-IN")}</div>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">Monthly Revenue Needed</span>
                    <div className="text-xl font-black text-white mt-1">₹{fmtINR(metrics.breakEvenRevenue)}</div>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-400">Contribution / Unit</span>
                    <div className="text-xl font-black text-brand-300 mt-1">
                      ₹{fmtINR(metrics.contribution)} ({metrics.cmPct.toFixed(1)}%)
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">GST Deducted</span>
                    <strong className="text-white">₹{fmtINR(metrics.gstOutflow)}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Gateway Cut ({pgPct}%)</span>
                    <strong className="text-white">₹{fmtINR(metrics.pgFee)}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Max Safe CAC</span>
                    <strong className="text-amber-300">₹{fmtINR(metrics.maxAllowedCac)}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Ad ROAS Ratio</span>
                    <strong className="text-emerald-300">{metrics.minRoas.toFixed(2)}x</strong>
                  </div>
                </div>
              </div>
            )}

            {metrics.scenarios.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-brand-600" />
                    Monthly Scale &amp; Net Profit Forecast
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase">
                      <tr>
                        <th className="py-2.5 px-4">Monthly Volume</th>
                        <th className="py-2.5 px-3 text-right">Gross Revenue</th>
                        <th className="py-2.5 px-4 text-right">Net Profit / (Loss)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      {metrics.scenarios.map((sc) => (
                        <tr key={sc.label}>
                          <td className="py-2.5 px-4 font-bold text-slate-800">{sc.label}</td>
                          <td className="py-2.5 px-3 text-right text-slate-600">₹{fmtINR(sc.revenue)}</td>
                          <td className={`py-2.5 px-4 text-right font-black ${sc.netProfit >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                            {sc.netProfit >= 0 ? `+₹${fmtINR(sc.netProfit)}` : `-₹${fmtINR(Math.abs(sc.netProfit))}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BilingualToolGuide guides={BILINGUAL_GUIDE} />

      <div className="no-print bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Stop Paying Platform Subscriptions Out of Your Margin
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Compare owning a blazing-fast custom storefront with Razorpay direct checkout versus ongoing USD SaaS fees and app markups.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/compare/shopify-vs-custom-ecommerce"
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]"
            >
              Shopify vs Custom Store ROI <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => openLeadModal({ projectType: "Custom High-Margin D2C Storefront" })}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              Discuss Custom Store Build
            </button>
          </div>
        </div>
      </div>

      <ToolSeoFaq
        heading="Break-Even & D2C Profitability FAQs"
        faqs={[
          {
            q: "Why does Indian D2C math differ from US margin calculators?",
            a: "Indian selling prices are typically GST-inclusive, payment aggregators charge ~2% + GST on gross value, and prepaid vs COD shipping/RTO swings net unit contribution significantly.",
          },
          {
            q: "What is a healthy Break-Even ROAS for Indian brands?",
            a: "Break-even ROAS equals 1 / Contribution Margin Ratio before Ad CAC. If your gross margin after COGS, GST, and courier is 40%, break-even ROAS is 2.5x — anything lower loses cash.",
          },
        ]}
      />
    </div>
  );
}

