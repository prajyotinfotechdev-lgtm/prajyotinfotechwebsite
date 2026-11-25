import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  MessageSquare,
  Copy,
  Check,
  Download,
  Printer,
  ExternalLink,
  QrCode,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";
import { generateQrMatrix, qrMatrixToSvgString } from "../utils/qrSvg.js";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const COUNTRY_CODES = [
  { code: "91", label: "India (+91)" },
  { code: "1", label: "USA / Canada (+1)" },
  { code: "971", label: "UAE (+971)" },
  { code: "44", label: "UK (+44)" },
  { code: "65", label: "Singapore (+65)" },
  { code: "61", label: "Australia (+61)" },
];

const MESSAGE_TEMPLATES = [
  { label: "Price Quote", text: "Hi! I saw your website and would like to get a price quote." },
  { label: "Order Now", text: "Hello! I would like to place an order. Please share payment details." },
  { label: "Book Appointment", text: "Hi, I want to book an appointment / consultation for this week." },
  { label: "Product Demo", text: "Hi team, please schedule a live product demo for our business." },
];

export default function WhatsAppLinkGenerator() {
  const { openLeadModal } = useLeadModal();

  const [countryCode, setCountryCode] = useState("91");
  const [phone, setPhone] = useState("7020708747");
  const [businessName, setBusinessName] = useState("My Business Store");
  const [message, setMessage] = useState("Hi! I scanned your QR code and want to inquire about your services.");
  const [qrColor, setQrColor] = useState("#0f172a");
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const cleanDigits = phone.replace(/\D/g, "");
  const fullNumber = `${countryCode}${cleanDigits}`;

  const waUrl = useMemo(() => {
    const base = `https://wa.me/${fullNumber || "917020708747"}`;
    return message.trim() ? `${base}?text=${encodeURIComponent(message.trim())}` : base;
  }, [fullNumber, message]);

  const qrMatrix = useMemo(() => generateQrMatrix(waUrl), [waUrl]);
  const svgString = useMemo(() => qrMatrixToSvgString(qrMatrix, { fg: qrColor, bg: "#ffffff", sizePx: 320 }), [qrMatrix, qrColor]);

  const copyLink = () => {
    navigator.clipboard?.writeText(waUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const downloadSvg = () => {
    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-qr-${cleanDigits || "code"}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPng = () => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 640;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, 640, 640);
      ctx.drawImage(img, 0, 0, 640, 640);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `whatsapp-qr-${cleanDigits || "code"}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = url;
  };

  const widgetSnippet = `<a href="${waUrl}" target="_blank" rel="noopener noreferrer" style="position:fixed;bottom:20px;right:20px;background:#16a34a;color:#fff;padding:12px 20px;border-radius:999px;font-family:sans-serif;font-weight:bold;text-decoration:none;box-shadow:0 10px 25px rgba(0,0,0,0.2);z-index:9999;">Chat on WhatsApp</a>`;

  const copySnippet = () => {
    navigator.clipboard?.writeText(widgetSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/whatsapp-link-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free WhatsApp Link & QR Code Generator",
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Create custom wa.me direct chat links with pre-filled messages, downloadable PNG/SVG QR codes, printable shop standees, and floating chat HTML buttons free.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: pageUrl },
          { name: "WhatsApp Link & QR Generator", url: pageUrl },
        ]}
      />
      <Seo
        title="Free WhatsApp Link & QR Code Generator (wa.me Maker) | Prajyot Infotech"
        description="Generate free WhatsApp direct chat links with custom welcome message, high-resolution SVG/PNG QR codes, printable counter standees, and website button snippets."
        keywords="whatsapp link generator, create whatsapp link with message, whatsapp qr code generator free, wa.me link maker India, whatsapp chat button html"
        path="/tools/whatsapp-link-generator"
        schema={[schema]}
      />

      <style>{`
        @media print {
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          body { background: #ffffff !important; }
          .standee-card { border: 2px solid #0f172a !important; box-shadow: none !important; margin: 20px auto !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="bg-slate-900 text-white py-10 px-4 no-print border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Free · Instant QR PNG/SVG · Shop Standee Ready</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            WhatsApp Link &amp; <span className="text-emerald-400">QR Code Generator</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Create clean <code className="font-mono text-emerald-300">wa.me</code> chat links with pre-filled messages, scannable counter QR cards, and floating website chat snippets in seconds.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Builder */}
          <div className="lg:col-span-7 space-y-6 no-print">
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm space-y-5">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" /> Configure Your WhatsApp Link
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Shop / Brand Name (Shown on QR Standee)
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Royal Bakery & Cafe"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Country Code</label>
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.label}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pre-filled Welcome Message (Optional)
                  </label>
                  <span className="text-[11px] text-slate-400">Customer taps Send directly</span>
                </div>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter greeting text..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {MESSAGE_TEMPLATES.map((tpl) => (
                    <button key={tpl.label} type="button" onClick={() => setMessage(tpl.text)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[11px] font-semibold cursor-pointer">
                      + {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">QR Code Accent Color</label>
                <div className="flex items-center gap-2.5">
                  {["#0f172a", "#059669", "#6d28d9", "#1d4ed8", "#be123c"].map((hex) => (
                    <button key={hex} type="button" onClick={() => setQrColor(hex)}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${qrColor === hex ? "border-slate-900 scale-110 ring-2 ring-emerald-500/40" : "border-slate-200"}`}
                      style={{ backgroundColor: hex }} />
                  ))}
                </div>
              </div>
            </div>

            {/* Generated Link Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Your Direct WhatsApp URL</span>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white">
                  Test Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 break-all select-all">
                {waUrl}
              </div>
              <button type="button" onClick={copyLink}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[46px]">
                {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? "Copied Link to Clipboard!" : "Copy WhatsApp Link"}</span>
              </button>
            </div>

            {/* Website Button HTML Snippet */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-brand-600" /> Floating Website Button Embed Code
                </h3>
                <button type="button" onClick={copySnippet}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer">
                  {copiedHtml ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedHtml ? "Copied!" : "Copy HTML"}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] overflow-x-auto">{widgetSnippet}</pre>
            </div>
          </div>

          {/* Right: Live Printable Counter Standee QR Preview */}
          <div className="lg:col-span-5">
            <div className="standee-card bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden text-center">
              <div className="bg-emerald-600 text-white px-6 py-5">
                <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-100 font-bold">
                  Scan to Chat Instantly
                </div>
                <h3 className="text-xl sm:text-2xl font-black mt-1 break-words">{businessName || "Connect With Us"}</h3>
              </div>

              <div className="p-6 sm:p-8 flex flex-col items-center">
                <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm inline-block"
                  dangerouslySetInnerHTML={{ __html: svgString }} />
                <div className="mt-4 font-mono text-sm font-bold text-slate-800">
                  +{countryCode} {cleanDigits || "XXXXXXXXXX"}
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Point your phone camera here to open WhatsApp directly with no need to save contact.
                </p>

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
                    className="py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                    <Printer className="w-3.5 h-3.5" /> Print Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp API Automation Upsell */}
      <div className="no-print bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 border-t border-emerald-500/30 px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want Automated AI Replies, Catalogs &amp; Invoice Dispatch on WhatsApp?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Upgrade from manual replies to Meta's official WhatsApp Business Cloud API. Automate lead qualification, send GST PDF receipts, and sync chats straight into your CRM.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/services/whatsapp-automation"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg min-h-[48px]">
              Explore WhatsApp Automation <ArrowRight className="w-4 h-4" />
            </Link>
            <button type="button" onClick={() => openLeadModal({ projectType: "WhatsApp Business Cloud API Integration" })}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Request Automation Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
