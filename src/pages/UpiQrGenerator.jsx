import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import {
  QrCode,
  Download,
  Printer,
  Copy,
  Check,
  Sparkles,
  IndianRupee,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { generateQrMatrix, qrMatrixToSvgString } from "../utils/qrSvg.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const STAND_THEMES = [
  { id: "navy", header: "bg-slate-900", qr: "#0f172a", badge: "text-brand-300" },
  { id: "emerald", header: "bg-emerald-700", qr: "#065f46", badge: "text-emerald-100" },
  { id: "indigo", header: "bg-brand-700", qr: "#5b21b6", badge: "text-brand-100" },
  { id: "rose", header: "bg-rose-700", qr: "#9f1239", badge: "text-rose-100" },
];

const FAQS = [
  {
    q: "Does this UPI QR code work with GPay, PhonePe, Paytm, and BHIM?",
    a: "Yes. It generates a standard NPCI BHIM-UPI intent URL (upi://pay) accepted by every UPI app in India including Google Pay, PhonePe, Paytm, Amazon Pay, and mobile banking apps.",
  },
  {
    q: "Can I lock a fixed payment amount into the QR code?",
    a: "Yes. Enter any fixed Rupee amount (for example ₹499 or ₹2,500) and the customer's UPI app will automatically pre-fill that exact amount so customers cannot underpay.",
  },
  {
    q: "Is there any commission or transaction fee?",
    a: "Zero. Payments settle directly from your customer's bank account into your linked bank account via UPI VPA without third-party wallet charges.",
  },
  {
    q: "Is my UPI ID saved on any external server?",
    a: "No. Everything runs locally inside your browser — we never store, log, or track your UPI VPA or transaction notes.",
  },
];

export default function UpiQrGenerator() {
  const { openLeadModal } = useLeadModal();

  const [vpa, setVpa] = useState("prajyotinfotech@okhdfcbank");
  const [payeeName, setPayeeName] = useState("My Business Store");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Payment");
  const [themeId, setThemeId] = useState("navy");
  const [copied, setCopied] = useState(false);

  const theme = STAND_THEMES.find((t) => t.id === themeId) || STAND_THEMES[0];

  const upiUri = useMemo(() => {
    const params = new URLSearchParams({
      pa: (vpa || "merchant@upi").trim(),
      pn: (payeeName || "Merchant").trim(),
      cu: "INR",
    });
    const amt = Number(amount);
    if (!isNaN(amt) && amt > 0) params.set("am", amt.toFixed(2));
    if (note.trim()) params.set("tn", note.trim());
    return `upi://pay?${params.toString()}`;
  }, [vpa, payeeName, amount, note]);

  const qrMatrix = useMemo(() => generateQrMatrix(upiUri), [upiUri]);
  const svgString = useMemo(
    () => qrMatrixToSvgString(qrMatrix, { fg: theme.qr, bg: "#ffffff", sizePx: 300 }),
    [qrMatrix, theme.qr]
  );

  const downloadSvg = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `upi-qr-${(payeeName || "standee").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const img = new Image();
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 600, 600);
      ctx.drawImage(img, 0, 0, 600, 600);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `upi-qr-${(payeeName || "standee").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = url;
  };

  const copyUri = () => {
    navigator.clipboard?.writeText(upiUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/upi-qr-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free UPI Payment QR Code & Amount Standee Generator",
    url: pageUrl,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Generate dynamic NPCI UPI payment QR codes with optional fixed rupee amounts and print counter standees for GPay, PhonePe, Paytm, and BHIM free.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "UPI QR Code Generator", url: pageUrl },
        ]}
      />
      <Seo
        title="Free UPI QR Code Generator with Amount (GPay / PhonePe Standee) | Prajyot Infotech"
        description="Create custom NPCI UPI QR codes with locked rupee amounts for GPay, PhonePe, Paytm & BHIM. Download crisp PNG/SVG QR or print shop counter standees free."
        keywords="upi qr code generator, upi qr generator with amount, phonepe gpay qr standee maker, bhmi upi pay link maker india"
        path="/tools/upi-qr-generator"
        schema={schema}
      />

      <style>{`
        @media print {
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          body { background: #ffffff !important; }
          .upi-standee { border: 2px solid #0f172a !important; box-shadow: none !important; margin: 20px auto !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="bg-slate-900 text-white py-10 px-4 no-print border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>NPCI Standard · GPay · PhonePe · Paytm · BHIM</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Free UPI QR &amp; Payment Standee Maker
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Accept instant payments with zero gateway fees. Optionally lock an exact ₹ amount inside the QR so customers pay accurately every time.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Builder Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-5 no-print">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-brand-600" /> Configure Payment QR
            </h2>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Your UPI ID (VPA) *
              </label>
              <input
                type="text"
                value={vpa}
                onChange={(e) => setVpa(e.target.value)}
                placeholder="e.g. yourshop@okhdfcbank or 9876543210@ybl"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Merchant / Payee Display Name *
              </label>
              <input
                type="text"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                placeholder="e.g. Sharma Electronics"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Lock Fixed Amount ₹ (Optional)
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Leave blank for any amount"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono font-bold text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Payment Remark / Note
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Invoice #102"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Standee Theme Color</label>
              <div className="flex items-center gap-2.5">
                {STAND_THEMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${themeId === t.id ? "border-slate-900 scale-110 ring-2 ring-brand-500/30" : "border-slate-200"}`}
                    style={{ backgroundColor: t.qr }}
                  />
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] flex items-center justify-between gap-2 overflow-x-auto">
              <span className="truncate select-all">{upiUri}</span>
              <button type="button" onClick={copyUri}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer inline-flex items-center gap-1">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy URI"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% browser-side generation. We never store or transmit your UPI details.</span>
            </div>
          </div>

          {/* Printable Standee Preview */}
          <div className="lg:col-span-5">
            <div className="upi-standee bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden text-center">
              <div className={`${theme.header} text-white px-6 py-5`}>
                <div className={`text-[11px] font-mono uppercase tracking-widest font-bold ${theme.badge}`}>
                  Scan &amp; Pay via Any UPI App
                </div>
                <h3 className="text-xl sm:text-2xl font-black mt-1 break-words">{payeeName || "Business Store"}</h3>
                {Number(amount) > 0 && (
                  <div className="mt-2 inline-block px-3 py-1 rounded-full bg-white/15 font-mono text-sm font-black">
                    Amount: ₹{Number(amount).toLocaleString("en-IN")}
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex flex-col items-center">
                <div
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block"
                  dangerouslySetInnerHTML={{ __html: svgString }}
                />
                <div className="mt-4 font-mono text-xs sm:text-sm font-bold text-slate-800 break-all">
                  UPI ID: {vpa}
                </div>
                <div className="mt-2 text-[11px] font-semibold text-slate-500">
                  Google Pay · PhonePe · Paytm · BHIM · Amazon Pay
                </div>

                <div className="no-print mt-6 w-full grid grid-cols-3 gap-2">
                  <button type="button" onClick={downloadPng}
                    className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                    <Download className="w-3.5 h-3.5" /> PNG
                  </button>
                  <button type="button" onClick={downloadSvg}
                    className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                    <QrCode className="w-3.5 h-3.5" /> SVG
                  </button>
                  <button type="button" onClick={() => window.print()}
                    className="py-2.5 px-2 rounded-xl bg-brand-50 hover:bg-brand-100 border border-brand-200 text-brand-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                    <Printer className="w-3.5 h-3.5" /> Print Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POS / E-Commerce Upsell */}
      <div className="no-print bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Want Automated Payment Webhooks &amp; Instant GST Receipts?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Prajyot Infotech integrates Razorpay, Cashfree, and UPI payment confirmations directly with thermal POS printers and automated WhatsApp PDF invoicing.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: "Custom POS & UPI Payment Automation" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Get Custom POS / Payment Integration <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/solutions/mobile-shop-pos-software"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]">
              Explore Retail POS Case Study
            </Link>
          </div>
        </div>
      </div>

      <ToolSeoFaq heading="UPI Payment QR Code FAQs" faqs={FAQS} />
    </div>
  );
}
