import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import {
  Calculator,
  Share2,
  Printer,
  Copy,
  Check,
  TrendingUp,
  ArrowRight,
  MessageSquare,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";

const SLABS = [0, 3, 5, 12, 18, 28];

function fmt(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function GstProfitCalculator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);

  const [mode, setMode] = useState("exclusive"); // "exclusive" | "inclusive"
  const [supplyType, setSupplyType] = useState("intra"); // "intra" | "inter"
  const [amount, setAmount] = useState(50000);
  const [costPrice, setCostPrice] = useState(34000);
  const [gstRate, setGstRate] = useState(18);

  const calc = useMemo(() => {
    const val = Math.max(0, Number(amount) || 0);
    const rate = Math.max(0, Number(gstRate) || 0);
    const cost = Math.max(0, Number(costPrice) || 0);

    let netAmount = 0;
    let gstAmount = 0;
    let grossAmount = 0;

    if (mode === "exclusive") {
      netAmount = val;
      gstAmount = (val * rate) / 100;
      grossAmount = val + gstAmount;
    } else {
      grossAmount = val;
      netAmount = val / (1 + rate / 100);
      gstAmount = grossAmount - netAmount;
    }

    const cgst = supplyType === "intra" ? gstAmount / 2 : 0;
    const sgst = supplyType === "intra" ? gstAmount / 2 : 0;
    const igst = supplyType === "inter" ? gstAmount : 0;

    const profit = netAmount - cost;
    const profitMarginPct = netAmount > 0 ? (profit / netAmount) * 100 : 0;
    const markupPct = cost > 0 ? (profit / cost) * 100 : 0;

    return { netAmount, gstAmount, grossAmount, cgst, sgst, igst, profit, profitMarginPct, markupPct, cost };
  }, [amount, costPrice, gstRate, mode, supplyType]);

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `GST & Profit Breakdown (${gstRate}% GST - ${mode === "exclusive" ? "Exclusive" : "Inclusive"})\n` +
      `Net Base Price: ₹${fmt(calc.netAmount)}\n` +
      (supplyType === "intra" ? `CGST (${gstRate / 2}%): ₹${fmt(calc.cgst)} | SGST (${gstRate / 2}%): ₹${fmt(calc.sgst)}\n` : `IGST (${gstRate}%): ₹${fmt(calc.igst)}\n`) +
      `Final Customer Total: ₹${fmt(calc.grossAmount)}\n` +
      `Est. Net Profit: ₹${fmt(calc.profit)} (${calc.profitMarginPct.toFixed(1)}% margin)\n\n` +
      `Calculate free at:\nhttps://www.prajyotinfotech.in/tools/gst-profit-calculator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copyResult = () => {
    navigator.clipboard?.writeText(
      `Base: ₹${fmt(calc.netAmount)} | GST (${gstRate}%): ₹${fmt(calc.gstAmount)} | Final Total: ₹${fmt(calc.grossAmount)} | Net Profit: ₹${fmt(calc.profit)} (${calc.profitMarginPct.toFixed(1)}%)`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const costPctBar = calc.grossAmount > 0 ? Math.min(100, Math.max(0, (calc.cost / calc.grossAmount) * 100)) : 0;
  const taxPctBar = calc.grossAmount > 0 ? Math.min(100, Math.max(0, (calc.gstAmount / calc.grossAmount) * 100)) : 0;
  const profitPctBar = Math.max(0, 100 - costPctBar - taxPctBar);

  const pageUrl = "https://www.prajyotinfotech.in/tools/gst-profit-calculator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "India GST & Profit Margin Calculator",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free Indian GST calculator (add or remove GST, CGST/SGST vs IGST) with real-time business profit margin and markup simulator.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 lg:pb-0">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: pageUrl },
          { name: "GST & Profit Calculator", url: pageUrl },
        ]}
      />
      <Seo
        title="India GST & Profit Margin Calculator Online (Add / Remove GST) | Prajyot Infotech"
        description="Instant GST calculator for Indian businesses. Add or remove 3%, 5%, 12%, 18%, 28% GST with automatic CGST, SGST, IGST split & live product profit margin calculator."
        keywords="gst calculator india, reverse gst calculator online, profit margin calculator india, cgst sgst igst calculator, markup vs margin calculator"
        path="/tools/gst-profit-calculator"
        schema={[schema]}
      />

      <style>{`
        @media print {
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          body { background: #fff !important; }
        }
      `}</style>

      {/* Mobile Bottom Summary Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 no-print bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Final Payable</div>
            <div className="text-lg font-black text-white font-mono">₹{fmt(calc.grossAmount)}</div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={copyResult}
              className="inline-flex items-center gap-1 px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button type="button" onClick={shareWhatsApp}
              className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-slate-900 text-white py-10 px-4 no-print border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Add / Remove GST + Live Margin Calculator</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            India GST &amp; Profit Margin Calculator
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Instantly add or extract GST across all Indian tax slabs, verify CGST + SGST vs IGST splits, and simulate your exact net profit margin before quoting.
          </p>
        </div>
      </div>

      {/* Calculator Workspace */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs Panel */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-6 no-print">
            {/* Calculation Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">GST Calculation Mode</label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100">
                <button type="button" onClick={() => setMode("exclusive")}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[42px] ${mode === "exclusive" ? "bg-brand-600 text-white shadow" : "text-slate-600"}`}>
                  + Add GST (Exclusive)
                </button>
                <button type="button" onClick={() => setMode("inclusive")}
                  className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[42px] ${mode === "inclusive" ? "bg-brand-600 text-white shadow" : "text-slate-600"}`}>
                  - Remove GST (Inclusive)
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                {mode === "exclusive" ? "Selling Price (Before GST) ₹" : "Final Price (Including GST) ₹"}
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono text-lg font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            {/* Tax Slabs */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Select GST Tax Slab</label>
                <span className="text-xs font-mono font-bold text-brand-700">{gstRate}% Selected</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SLABS.map((slab) => (
                  <button key={slab} type="button" onClick={() => setGstRate(slab)}
                    className={`py-2.5 rounded-xl font-mono font-bold text-xs border transition-all cursor-pointer min-h-[42px] ${gstRate === slab ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300"}`}>
                    {slab}%
                  </button>
                ))}
              </div>
            </div>

            {/* Supply Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Supply Location</label>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setSupplyType("intra")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border cursor-pointer min-h-[42px] ${supplyType === "intra" ? "bg-sky-50 border-sky-400 text-sky-900" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                  Same State (CGST + SGST)
                </button>
                <button type="button" onClick={() => setSupplyType("inter")}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border cursor-pointer min-h-[42px] ${supplyType === "inter" ? "bg-amber-50 border-amber-400 text-amber-900" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                  Inter-State (IGST)
                </button>
              </div>
            </div>

            {/* Cost Price (For Margin Simulator) */}
            <div className="pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Your Cost / Procurement Price (Optional) ₹
              </label>
              <input
                type="number"
                min="0"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono text-base font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Customer Invoice Total</span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                    ₹{fmt(calc.grossAmount)}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Net Profit</span>
                  <div className={`text-2xl font-black font-mono mt-1 ${calc.profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                    {calc.profit >= 0 ? "+" : ""}₹{fmt(calc.profit)}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {calc.profitMarginPct.toFixed(1)}% margin · {calc.markupPct.toFixed(1)}% markup
                  </div>
                </div>
              </div>

              {/* Stacked Visual Bar */}
              <div>
                <div className="h-3 w-full rounded-full overflow-hidden flex bg-slate-800">
                  <div style={{ width: `${costPctBar}%` }} className="bg-slate-500" />
                  <div style={{ width: `${profitPctBar}%` }} className="bg-emerald-500" />
                  <div style={{ width: `${taxPctBar}%` }} className="bg-brand-500" />
                </div>
                <div className="flex flex-wrap gap-4 mt-2 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-500" />Base Cost</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />Profit</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-brand-500" />GST Tax</span>
                </div>
              </div>

              {/* Ledger Breakdown */}
              <div className="space-y-2.5 text-sm font-mono pt-2">
                <div className="flex justify-between text-slate-300">
                  <span>Taxable Base Value</span><span>₹{fmt(calc.netAmount)}</span>
                </div>
                {supplyType === "intra" ? (
                  <>
                    <div className="flex justify-between text-slate-400">
                      <span>CGST ({gstRate / 2}%)</span><span>₹{fmt(calc.cgst)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>SGST ({gstRate / 2}%)</span><span>₹{fmt(calc.sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-slate-400">
                    <span>IGST ({gstRate}%)</span><span>₹{fmt(calc.igst)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-brand-300 pt-2 border-t border-slate-800">
                  <span>Total GST Tax ({gstRate}%)</span><span>₹{fmt(calc.gstAmount)}</span>
                </div>
              </div>

              <div className="no-print pt-3 flex flex-wrap gap-2.5">
                <button type="button" onClick={shareWhatsApp}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px]">
                  <Share2 className="w-4 h-4" /> WhatsApp Breakdown
                </button>
                <button type="button" onClick={() => window.print()}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                  <Printer className="w-4 h-4" /> Print
                </button>
                <button type="button" onClick={copyResult}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Quick Slab Reference */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Quick All-Slab Comparison</div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
                {[3, 5, 12, 18, 28].map((r) => {
                  const base = mode === "exclusive" ? Number(amount || 0) : Number(amount || 0) / (1 + r / 100);
                  const total = mode === "exclusive" ? base * (1 + r / 100) : Number(amount || 0);
                  return (
                    <div key={r} className={`p-2 rounded-xl border ${r === gstRate ? "bg-brand-50 border-brand-300" : "bg-slate-50 border-slate-200"}`}>
                      <div className="text-[10px] text-slate-500 font-bold">{r}% GST</div>
                      <div className="font-bold text-slate-900 mt-0.5 truncate">₹{Math.round(total).toLocaleString("en-IN")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ERP Upsell */}
      <div className="no-print bg-slate-900 border-t border-slate-800 px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Track Profits, Inventory &amp; GST Invoices Automatically
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Ready to generate complete GST tax invoices or replace manual spreadsheets with a custom POS &amp; ERP portal built specifically for your business?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/tools/gst-invoice-generator"
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center gap-2 min-h-[48px]">
              Open Free GST Invoice Maker <ArrowRight className="w-4 h-4" />
            </Link>
            <button type="button" onClick={() => openLeadModal({ projectType: "Custom GST Billing & Inventory ERP" })}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              <MessageSquare className="w-4 h-4" /> Build Custom Billing ERP
            </button>
          </div>
        </div>
      </div>

      <ToolSeoFaq
        heading="GST & Profit Margin Calculator FAQs"
        faqs={[
          { q: "How do I reverse calculate GST from an MRP / GST-inclusive price?", a: "Select '- Remove GST (Inclusive)' above, enter the final selling price, and pick the slab (e.g., 18%). The calculator applies Price / (1 + Rate/100) to isolate exact taxable base value and tax." },
          { q: "What is the difference between Profit Margin % and Markup %?", a: "Margin % measures profit relative to your net selling price before GST, whereas Markup % measures profit added on top of your purchase cost." },
        ]}
      />
    </div>
  );
}

