import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import BilingualToolGuide from "../components/BilingualToolGuide.jsx";
import { Calculator, IndianRupee, TrendingDown, Share2, Copy, Check, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";
import { trackEvent } from "../utils/analytics.js";

function fmtINR(n) {
  return Math.round(Number(n || 0)).toLocaleString("en-IN");
}

const BILINGUAL_GUIDE = {
  en: {
    title: "How to Reduce Indian Business Loan & Machinery EMI Burden",
    summary: "Calculate your exact reducing-balance EMI, total interest outflow, and see how a single annual prepayment cuts years off MSME, factory machinery, or shop expansion loans.",
    steps: [
      "Enter your sanctioned MSME / Machinery / Mudra loan amount in ₹.",
      "Set annual reducing interest rate (% p.a.) and repayment tenure.",
      "Add an optional Extra Annual Prepayment to calculate exact interest saved.",
    ],
    note: "Tip: Investing saved monthly interest into custom inventory & billing automation pays back quickly for growing manufacturers and wholesalers.",
  },
  mr: {
    title: "बिझनेस लोन (MSME) आणि मशिनरी हप्ता (EMI) व व्याज बचत कॅल्क्युलेटर",
    summary: "तुमच्या दुकानासाठी, कारखान्यासाठी किंवा नवीन व्यवसायासाठी घेतलेल्या कर्जाचा मासिक हप्ता (EMI), एकूण व्याज आणि दरवर्षी थोडी जादा रक्कम (Prepayment) भरल्यास किती व्याज वाचते ते मराठीत पहा.",
    steps: [
      "कर्जाची रक्कम (₹), वार्षिक व्याजदर (%) आणि कालावधी (वर्षे) निवडा.",
      "खालील तक्त्यात दर महिन्याचा EMI आणि दरवर्षी भरायची रक्कम पहा.",
      "दरवर्षी थोडी जादा रक्कम भरून लाखो रुपयांचे व्याज कसे वाचते ते लगेच तपासा.",
    ],
    note: "टीप: वाचलेल्या व्याजातून व्यवसायाचे सॉफ्टवेअर, बिलिंग किंवा ERP सिस्टम बसवून नफा आणखी वाढवता येतो.",
  },
  hi: {
    title: "बिज़नेस लोन (MSME) ईएमआई और ब्याज बचत कैलकुलेटर",
    summary: "अपनी दुकान, फ़ैक्टरी मशीनरी या वर्किंग कैपिटल लोन की सटीक EMI, कुल ब्याज और हर साल अतिरिक्त भुगतान (Prepayment) से होने वाली सीधी ब्याज बचत तुरंत निकालें।",
    steps: [
      "अपना लोन अमाउंट (₹), ब्याज दर (% सालाना) और लोन अवधि चुनें।",
      "तुरंत मासिक EMI और मूलधन बनाम ब्याज का पूरा अनुपात देखें।",
      "एक्स्ट्रा प्री-पेमेंट जोड़कर देखें कि कितने महीने और कितना ब्याज बचता है।",
    ],
    note: "टिप: हर साल एक छोटा प्री-पेमेंट आपके लोन की अवधि कई महीने कम कर सकता है।",
  },
};

export default function BusinessEmiCalculator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [copiedLink, setCopiedLink] = useState(false);

  const [principal, setPrincipal] = useState(() => Number(searchParams.get("amt")) || 1500000);
  const [rate, setRate] = useState(() => Number(searchParams.get("rate")) || 11.5);
  const [tenureYears, setTenureYears] = useState(() => Number(searchParams.get("yrs")) || 5);
  const [extraYearly, setExtraYearly] = useState(() => Number(searchParams.get("pre")) || 50000);

  useEffect(() => {
    const next = new URLSearchParams();
    next.set("amt", String(principal));
    next.set("rate", String(rate));
    next.set("yrs", String(tenureYears));
    if (extraYearly > 0) next.set("pre", String(extraYearly));
    setSearchParams(next, { replace: true });
  }, [principal, rate, tenureYears, extraYearly, setSearchParams]);

  const calc = useMemo(() => {
    const P = Math.max(10000, Number(principal) || 0);
    const r = Math.max(0.1, Number(rate) || 0) / 12 / 100;
    const n = Math.max(6, Math.round((Number(tenureYears) || 1) * 12));

    const pow = Math.pow(1 + r, n);
    const emi = (P * r * pow) / (pow - 1);
    const baseTotal = emi * n;
    const baseInterest = baseTotal - P;

    // Simulate schedule with annual lump-sum prepayment
    let bal = P;
    let totalIntWithPre = 0;
    let monthsWithPre = 0;
    const yearlyRows = [];

    for (let yr = 1; yr <= Math.ceil(n / 12) + 1 && bal > 1; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      for (let m = 1; m <= 12 && bal > 1; m++) {
        monthsWithPre++;
        const interestForMonth = bal * r;
        let principalForMonth = emi - interestForMonth;
        if (principalForMonth > bal) principalForMonth = bal;
        bal -= principalForMonth;
        yrPrincipal += principalForMonth;
        yrInterest += interestForMonth;
        totalIntWithPre += interestForMonth;

        if (m === 12 && extraYearly > 0 && bal > 0) {
          const extraApplied = Math.min(bal, extraYearly);
          bal -= extraApplied;
          yrPrincipal += extraApplied;
        }
      }
      yearlyRows.push({
        year: yr,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        closingBalance: Math.max(0, bal),
      });
    }

    const interestSaved = Math.max(0, baseInterest - totalIntWithPre);
    const monthsSaved = Math.max(0, n - monthsWithPre);
    const principalPct = P / baseTotal;
    const interestPct = baseInterest / baseTotal;

    return {
      emi,
      baseInterest,
      baseTotal,
      totalIntWithPre,
      interestSaved,
      monthsSaved,
      monthsWithPre,
      principalPct,
      interestPct,
      yearlyRows,
    };
  }, [principal, rate, tenureYears, extraYearly]);

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      trackEvent("tool_share_link", { tool: "business-emi-calculator" });
      setTimeout(() => setCopiedLink(false), 2000);
    } catch { /* ignore */ }
  };

  const shareWhatsApp = () => {
    trackEvent("whatsapp_share_clicked", { tool: "business-emi-calculator" });
    const msg = encodeURIComponent(
      `*Business Loan EMI Plan*\nLoan: ₹${fmtINR(principal)} @ ${rate}% for ${tenureYears} yrs\nMonthly EMI: ₹${fmtINR(calc.emi)}\nTotal Interest: ₹${fmtINR(calc.baseInterest)}\nWith ₹${fmtINR(extraYearly)}/yr Prepayment -> *Interest Saved: ₹${fmtINR(calc.interestSaved)}* (${calc.monthsSaved} months faster)\n\nCalculate yours free: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/business-emi-calculator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MSME Business Loan & Prepayment EMI Calculator India",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free MSME and machinery business loan EMI calculator with prepayment interest savings, yearly amortization breakdown, and instant share links.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "Business Loan EMI Calculator", url: pageUrl },
        ]}
      />
      <Seo
        title="MSME Business Loan EMI Calculator & Prepayment Planner India | Free Tool"
        description="Calculate exact monthly EMI, reducing-balance interest, and prepayment savings for MSME loans, factory machinery finance, and working capital credit."
        keywords="business loan emi calculator india, msme loan emi prepayment calculator, machinery loan emi calculator, mudra loan emi marathi"
        path="/tools/business-emi-calculator"
        image="/og/og-business-emi.jpg"
        schema={schema}
      />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Reducing Balance · Prepayment Savings · Shareable Plan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            MSME Business Loan &amp; Prepayment EMI Calculator
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mt-2">
            Plan shop expansion, Mudra, or factory machinery loans clearly — and simulate how small annual prepayments save lakhs in bank interest.
          </p>
        </div>
      </div>

      {/* Main Tool */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Loan Amount (₹)</label>
                <span className="font-mono font-black text-brand-700 text-sm">₹{fmtINR(principal)}</span>
              </div>
              <input
                type="number"
                min="50000"
                step="50000"
                value={principal}
                onChange={(e) => setPrincipal(Math.max(10000, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold mb-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <input
                type="range"
                min="100000"
                max="20000000"
                step="100000"
                value={Math.min(20000000, principal)}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Interest Rate (% p.a.)</label>
                <span className="font-mono font-black text-brand-700 text-sm">{rate}%</span>
              </div>
              <input
                type="number"
                min="5"
                max="36"
                step="0.25"
                value={rate}
                onChange={(e) => setRate(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold mb-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <input
                type="range"
                min="7"
                max="24"
                step="0.25"
                value={Math.min(24, rate)}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Loan Tenure (Years)</label>
                <span className="font-mono font-black text-brand-700 text-sm">{tenureYears} Yrs ({tenureYears * 12} mo)</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-brand-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>1 Yr</span><span>5 Yrs</span><span>10 Yrs</span><span>15 Yrs</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Extra Prepayment / Yr
                </label>
                <span className="font-mono font-black text-emerald-700 text-sm">₹{fmtINR(extraYearly)}</span>
              </div>
              <input
                type="number"
                min="0"
                step="10000"
                value={extraYearly}
                onChange={(e) => setExtraYearly(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/40 font-mono text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={shareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                <Share2 className="w-3.5 h-3.5" /> WhatsApp Plan
              </button>
              <button
                type="button"
                onClick={copyShareUrl}
                className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? "Link Copied" : "Copy Link"}</span>
              </button>
            </div>
          </div>

          {/* Results + Amortization */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400">Monthly Loan EMI</span>
                  <div className="text-3xl font-black text-white mt-0.5 flex items-center">
                    <IndianRupee className="w-6 h-6 text-brand-400 shrink-0" />
                    {fmtINR(calc.emi)}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400">Standard Interest</span>
                  <div className="text-xl font-black text-amber-300 mt-1">₹{fmtINR(calc.baseInterest)}</div>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400">Total Outflow</span>
                  <div className="text-xl font-black text-slate-200 mt-1">₹{fmtINR(calc.baseTotal)}</div>
                </div>
              </div>

              {/* Principal vs Interest Bar */}
              <div className="pt-4">
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span>Principal ({Math.round(calc.principalPct * 100)}%)</span>
                  <span>Interest ({Math.round(calc.interestPct * 100)}%)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="bg-brand-500 h-full transition-all duration-300" style={{ width: `${calc.principalPct * 100}%` }} />
                  <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${calc.interestPct * 100}%` }} />
                </div>
              </div>

              {extraYearly > 0 && (
                <div className="mt-5 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-mono uppercase text-emerald-300 font-bold">With ₹{fmtINR(extraYearly)}/yr Prepayment</div>
                    <div className="text-lg font-black text-white mt-0.5">
                      You Save ₹{fmtINR(calc.interestSaved)} in Interest
                    </div>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-200 font-mono text-xs font-bold">
                    Debt-Free {calc.monthsSaved} Months Earlier
                  </div>
                </div>
              )}
            </div>

            {/* Yearly Amortization Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-brand-600" />
                  Year-Wise Repayment Schedule (With Prepayment)
                </h2>
                <span className="text-[11px] font-mono text-slate-500">{calc.yearlyRows.length} Yrs</span>
              </div>
              <div className="overflow-x-auto max-h-80 overflow-y-auto">
                <table className="w-full min-w-[420px] text-xs text-left border-collapse">
                  <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase sticky top-0">
                    <tr>
                      <th className="py-2.5 px-4">Year</th>
                      <th className="py-2.5 px-3 text-right">Principal Paid</th>
                      <th className="py-2.5 px-3 text-right">Interest Paid</th>
                      <th className="py-2.5 px-4 text-right">Closing Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {calc.yearlyRows.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-bold text-slate-800">Year {row.year}</td>
                        <td className="py-2.5 px-3 text-right text-emerald-700 font-semibold">₹{fmtINR(row.principalPaid)}</td>
                        <td className="py-2.5 px-3 text-right text-amber-700">₹{fmtINR(row.interestPaid)}</td>
                        <td className="py-2.5 px-4 text-right font-bold text-slate-900">₹{fmtINR(row.closingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bilingual Marathi / Hindi / English Guide */}
      <BilingualToolGuide guides={BILINGUAL_GUIDE} />

      {/* ROI / Software Bridge CTA */}
      <div className="no-print bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Stop Stock Leakage Before Taking Working Capital Credit
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Most MIDC manufacturers and wholesalers borrow working capital to fund slow-moving stock. Prajyot Infotech builds custom Inventory ERPs &amp; automated Tally billing so cash circulates faster.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={() => openLeadModal({ projectType: "Inventory & Cashflow ERP" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
            >
              Get Free Automation ROI Audit <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/solutions/manufacturing-bom-erp"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]"
            >
              <MessageSquare className="w-4 h-4" /> Explore Factory ERP Solutions
            </Link>
          </div>
        </div>
      </div>

      <ToolSeoFaq
        heading="Business Loan EMI Calculator FAQs"
        faqs={[
          {
            q: "How is reducing-balance EMI calculated for Indian MSME loans?",
            a: "Indian banks compute EMI monthly using P * r * (1+r)^n / ((1+r)^n - 1), where interest applies only on the remaining unpaid principal each month.",
          },
          {
            q: "How much interest does an annual prepayment save?",
            a: "Paying even 1 extra EMI or ₹50,000/year toward principal cuts interest compounding dramatically in the first 3 years and trims total tenure by several months.",
          },
          {
            q: "Can I share this exact loan plan with my partner or CA?",
            a: "Yes. Notice the URL updates live with your amounts — click 'Copy Link' or 'WhatsApp Plan' to open the identical calculation on any device.",
          },
        ]}
      />
    </div>
  );
}

