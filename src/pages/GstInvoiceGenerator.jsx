import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  FileText, Printer, Share2, Plus, Trash2, Copy, Check,
  Building2, ArrowRight, MessageSquare, Sparkles, ChevronDown, ChevronUp,
  IndianRupee, ClipboardList, Eye, PenLine, Landmark, Upload, X, RotateCcw, Package
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";

const INDIAN_STATES = [
  { code: "27", name: "Maharashtra" }, { code: "29", name: "Karnataka" },
  { code: "07", name: "Delhi" },       { code: "24", name: "Gujarat" },
  { code: "33", name: "Tamil Nadu" },  { code: "36", name: "Telangana" },
  { code: "09", name: "Uttar Pradesh"},{ code: "19", name: "West Bengal" },
  { code: "23", name: "Madhya Pradesh"},{ code: "08", name: "Rajasthan" },
  { code: "03", name: "Punjab" },      { code: "06", name: "Haryana" },
  { code: "32", name: "Kerala" },      { code: "37", name: "Andhra Pradesh" },
  { code: "10", name: "Bihar" },       { code: "21", name: "Odisha" },
  { code: "30", name: "Goa" },         { code: "05", name: "Uttarakhand" },
  { code: "02", name: "Himachal Pradesh"}, { code: "01", name: "Jammu and Kashmir" },
  { code: "18", name: "Assam" },       { code: "22", name: "Chhattisgarh" },
  { code: "20", name: "Jharkhand" },   { code: "99", name: "Other Territory / SEZ" },
];

const GST_RATES = [0, 3, 5, 12, 18, 28];

const THEMES = [
  { id: "navy",    label: "Midnight",  headerBg: "bg-slate-900", badgeBg: "bg-brand-500/20 text-brand-200 border-brand-400/30", accentText: "text-brand-700", swatch: "#0f172a" },
  { id: "indigo",  label: "Royal",     headerBg: "bg-brand-800", badgeBg: "bg-white/15 text-white border-white/25",             accentText: "text-brand-700", swatch: "#6d28d9" },
  { id: "emerald", label: "Emerald",   headerBg: "bg-emerald-900", badgeBg: "bg-emerald-400/20 text-emerald-100 border-emerald-400/30", accentText: "text-emerald-700", swatch: "#064e3b" },
  { id: "slate",   label: "Classic",   headerBg: "bg-zinc-900",  badgeBg: "bg-zinc-700/70 text-zinc-100 border-zinc-500",       accentText: "text-zinc-900",  swatch: "#18181b" },
];

function numberToWordsINR(num) {
  if (!num || isNaN(num) || num === 0) return "Zero Rupees Only";
  const a = ["","One ","Two ","Three ","Four ","Five ","Six ","Seven ","Eight ","Nine ","Ten ",
    "Eleven ","Twelve ","Thirteen ","Fourteen ","Fifteen ","Sixteen ","Seventeen ","Eighteen ","Nineteen "];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function inW(n) {
    if (!n) return "";
    let s = "";
    if (n > 99) { s += a[Math.floor(n/100)] + "Hundred "; n %= 100; }
    if (n > 19) s += b[Math.floor(n/10)] + " " + a[n%10];
    else s += a[n];
    return s;
  }
  let am = Math.floor(Math.abs(num));
  const cr = Math.floor(am/1e7); am %= 1e7;
  const lk = Math.floor(am/1e5); am %= 1e5;
  const th = Math.floor(am/1e3); am %= 1e3;
  let w = "";
  if (cr) w += inW(cr) + "Crore ";
  if (lk) w += inW(lk) + "Lakh ";
  if (th) w += inW(th) + "Thousand ";
  if (am) w += inW(am);
  return w.trim() + " Rupees Only";
}

function fmt(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function defSeller() {
  return {
    name: "Prajyot Infotech",
    gstin: "27ABCDE1234F1Z5",
    address: "Shivaji Nagar & FC Road IT Corridor",
    city: "Pune",
    stateCode: "27",
    phone: "+91 70207 08747",
    email: "billing@prajyotinfotech.in",
  };
}

function defBuyer() {
  return {
    name: "Acme Precision Enterprises Pvt Ltd",
    gstin: "27XYZAB9876C1Z3",
    address: "Plot 42, Hinjewadi Phase 1",
    city: "Pune",
    stateCode: "27",
  };
}

function defBank() {
  return {
    bankName: "HDFC Bank",
    accountNo: "50200088991122",
    ifsc: "HDFC0000123",
    branch: "Shivaji Nagar, Pune",
    upiId: "prajyotinfotech@okhdfcbank",
  };
}

function Accordion({ title, badge, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer text-left min-h-[48px]"
      >
        <span className="flex items-center gap-2.5 font-bold text-slate-800 text-sm">
          <span className="w-7 h-7 rounded-lg bg-brand-100/80 text-brand-700 flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4" />
          </span>
          <span>{title}</span>
          {badge && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
              {badge}
            </span>
          )}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
      </button>
      {open && <div className="p-4 border-t border-slate-100">{children}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all placeholder:text-slate-400";

export default function GstInvoiceGenerator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [themeId, setThemeId] = useState("navy");
  const fileInputRef = useRef(null);

  const [logoDataUrl, setLogoDataUrl] = useState(() => {
    try { return localStorage.getItem("pi_gst_logo") || ""; } catch { return ""; }
  });

  const [seller, setSeller] = useState(() => {
    try { const s = localStorage.getItem("pi_gst_seller"); return s ? JSON.parse(s) : defSeller(); } catch { return defSeller(); }
  });

  const [buyer, setBuyer] = useState(defBuyer);

  const [invoice, setInvoice] = useState({
    number: "INV-2026-089",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
    poNumber: "PO-7741",
  });

  const [bank, setBank] = useState(() => {
    try { const b = localStorage.getItem("pi_gst_bank"); return b ? JSON.parse(b) : defBank(); } catch { return defBank(); }
  });

  const [items, setItems] = useState([
    { id: "1", description: "Custom ERP & CRM Web Portal Architecture", hsn: "998314", qty: 1, rate: 85000, discount: 0, gstRate: 18 },
    { id: "2", description: "WhatsApp Business Cloud API Integration", hsn: "998313", qty: 1, rate: 15000, discount: 0, gstRate: 18 },
  ]);

  const [notes, setNotes] = useState(
    "1. Payment due within 15 days of invoice date.\n2. 100% IP & source code transferred upon final clearance.\n3. Pay via NEFT/RTGS or UPI to the account details provided."
  );

  useEffect(() => {
    try {
      localStorage.setItem("pi_gst_seller", JSON.stringify(seller));
      localStorage.setItem("pi_gst_bank", JSON.stringify(bank));
      if (logoDataUrl) localStorage.setItem("pi_gst_logo", logoDataUrl);
      else localStorage.removeItem("pi_gst_logo");
    } catch {}
  }, [seller, bank, logoDataUrl]);

  const activeTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const isIntraState = seller.stateCode === buyer.stateCode;

  const totals = useMemo(() => {
    let subtotal = 0, totalDiscount = 0, taxable = 0, cgst = 0, sgst = 0, igst = 0;
    items.forEach((it) => {
      const raw = (Number(it.qty) || 0) * (Number(it.rate) || 0);
      const disc = raw * ((Number(it.discount) || 0) / 100);
      const taxbl = Math.max(0, raw - disc);
      const r = Number(it.gstRate) || 0;
      subtotal += raw;
      totalDiscount += disc;
      taxable += taxbl;
      if (isIntraState) {
        cgst += (taxbl * (r / 2)) / 100;
        sgst += (taxbl * (r / 2)) / 100;
      } else {
        igst += (taxbl * r) / 100;
      }
    });
    const totalTax = cgst + sgst + igst;
    const grandExact = taxable + totalTax;
    const grandTotal = Math.round(grandExact);
    return {
      subtotal,
      totalDiscount,
      taxable,
      cgst,
      sgst,
      igst,
      totalTax,
      grandTotal,
      roundOff: (grandTotal - grandExact).toFixed(2),
    };
  }, [items, isIntraState]);

  const addItem = () =>
    setItems((p) => [
      ...p,
      { id: Date.now().toString(), description: "Consultation / Software Service", hsn: "998314", qty: 1, rate: 5000, discount: 0, gstRate: 18 },
    ]);
  const updateItem = (id, f, v) => setItems((p) => p.map((it) => (it.id === id ? { ...it, [f]: v } : it)));
  const removeItem = (id) => {
    if (items.length > 1) setItems((p) => p.filter((it) => it.id !== id));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSide = 220;
        const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setLogoDataUrl(canvas.toDataURL("image/png"));
      };
      img.src = ev.target?.result;
    };
    reader.readAsDataURL(file);
  };

  const incrementInvoiceNumber = () => {
    setInvoice((prev) => {
      const m = prev.number.match(/^(.*?)(\d+)$/);
      if (!m) return { ...prev, number: `${prev.number}-1` };
      const next = String(parseInt(m[2], 10) + 1).padStart(m[2].length, "0");
      return { ...prev, number: `${m[1]}${next}` };
    });
  };

  const clearForBlankInvoice = () => {
    incrementInvoiceNumber();
    setBuyer({ name: "", gstin: "", address: "", city: "", stateCode: seller.stateCode });
    setItems([{ id: Date.now().toString(), description: "", hsn: "9983", qty: 1, rate: 0, discount: 0, gstRate: 18 }]);
  };

  const handlePrint = () => window.print();

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `Tax Invoice *${invoice.number}* from *${seller.name || "Our Business"}*\n` +
      `Billed To: ${buyer.name || "Customer"}\n` +
      `Date: ${invoice.date} | Due: ${invoice.dueDate}\n` +
      `Taxable: ₹${fmt(totals.taxable)} | GST: ₹${fmt(totals.totalTax)}\n` +
      `*Grand Total: ₹${totals.grandTotal.toLocaleString("en-IN")}*\n` +
      (bank.upiId ? `Pay via UPI: ${bank.upiId}\n` : "") +
      `\nCreated free via Prajyot Infotech:\nhttps://www.prajyotinfotech.in/tools/gst-invoice-generator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copySummary = () => {
    navigator.clipboard?.writeText(
      `Tax Invoice #: ${invoice.number}\nSeller: ${seller.name} (${seller.gstin})\nBuyer: ${buyer.name} (${buyer.gstin})\nTaxable Value: ₹${fmt(totals.taxable)}\nTotal Tax: ₹${fmt(totals.totalTax)}\nGrand Total: ₹${totals.grandTotal.toLocaleString("en-IN")}\nIn Words: ${numberToWordsINR(totals.grandTotal)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/gst-invoice-generator";
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free GST Invoice Generator Online India",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free browser-based Indian GST invoice maker with CGST, SGST, IGST auto-calculation, custom logo upload, HSN codes, instant PDF print and WhatsApp share.",
  };

  const buyerStateName = INDIAN_STATES.find((s) => s.code === buyer.stateCode)?.name || "Maharashtra";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BreadcrumbsLd items={[
        { name: "Home", url: "https://www.prajyotinfotech.in/" },
        { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools/gst-invoice-generator" },
        { name: "GST Invoice Generator", url: pageUrl },
      ]} />

      <Seo
        title="Free GST Invoice Generator Online (India) — PDF Maker | Prajyot Infotech"
        description="Create professional, 100% GST-compliant tax invoices online for free. Auto CGST, SGST & IGST calculations, custom logo, HSN codes, A4 PDF print & WhatsApp share."
        keywords="free GST invoice generator online, GST bill maker India, create GST invoice PDF free, GST calculator India, online billing generator for SMB"
        path="/tools/gst-invoice-generator"
        schema={[webAppSchema]}
      />

      {/* Clean A4 Print Stylesheet */}
      <style>{`
        @page { size: A4; margin: 10mm; }
        @media print {
          html, body { background: #ffffff !important; color: #0f172a !important; }
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          .print-wrapper { display: block !important; width: 100% !important; padding: 0 !important; margin: 0 !important; }
          .print-area {
            display: block !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      {/* ── Sleek Top Header Banner ── */}
      <div className="bg-slate-900 text-white py-8 sm:py-10 px-4 no-print border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Free · Zero Watermark · CGST Rule 46 Compliant</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Free GST Tax Invoice Generator
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Generate clean A4 GST invoices with auto CGST/SGST vs IGST detection, custom logo upload, HSN tracking &amp; 1-tap WhatsApp dispatch.
            </p>
          </div>

          {/* Primary Desktop/Tablet Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button type="button" onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> Print / Save A4 PDF
            </button>
            <button type="button" onClick={shareOnWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> WhatsApp Share
            </button>
            <button type="button" onClick={copySummary}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy Summary"}</span>
            </button>
            <button type="button" onClick={clearForBlankInvoice} title="Start a fresh blank invoice"
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer min-h-[44px]">
              <RotateCcw className="w-3.5 h-3.5" /> New
            </button>
          </div>
        </div>

        {/* Mobile/Tablet View Switcher */}
        <div className="lg:hidden max-w-7xl mx-auto mt-6 grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800/90 border border-slate-700">
          <button type="button" onClick={() => setActiveTab("form")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all cursor-pointer min-h-[42px] ${activeTab === "form" ? "bg-brand-600 text-white shadow" : "text-slate-300"}`}>
            <PenLine className="w-4 h-4" /> Edit Details
          </button>
          <button type="button" onClick={() => setActiveTab("preview")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all cursor-pointer min-h-[42px] ${activeTab === "preview" ? "bg-brand-600 text-white shadow" : "text-slate-300"}`}>
            <Eye className="w-4 h-4" /> Invoice Preview
          </button>
        </div>
      </div>

      {/* ── Mobile Sticky Bottom Action Bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 no-print bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div className="min-w-0">
            <div className="text-[10px] text-slate-400 font-mono uppercase">Payable Total</div>
            <div className="text-lg font-black text-white font-mono truncate">
              ₹{totals.grandTotal.toLocaleString("en-IN")}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={() => setActiveTab(activeTab === "form" ? "preview" : "form")}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer min-h-[44px]">
              {activeTab === "form" ? <Eye className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
              <span>{activeTab === "form" ? "Preview" : "Edit"}</span>
            </button>
            <button type="button" onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> PDF
            </button>
            <button type="button" onClick={shareOnWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Grid ── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ── LEFT 5 COLS: STRUCTURED EDITOR ── */}
          <div className={`lg:col-span-5 space-y-4 no-print ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>

            {/* Theme & Brand Logo Controls */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Invoice Theme</div>
                <div className="flex items-center gap-2">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeId(t.id)}
                      title={t.label}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${themeId === t.id ? "border-brand-500 scale-110 ring-2 ring-brand-500/30" : "border-slate-200"}`}
                      style={{ backgroundColor: t.swatch }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                {logoDataUrl ? (
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
                    <img src={logoDataUrl} alt="Logo" className="h-7 w-7 object-contain rounded" />
                    <button type="button" onClick={() => setLogoDataUrl("")} className="text-slate-400 hover:text-red-500 cursor-pointer" title="Remove logo">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors">
                    <Upload className="w-3.5 h-3.5" /> Add Logo
                  </button>
                )}
              </div>
            </div>

            {/* 1. Line Items Editor (Most used section open first) */}
            <Accordion title="Line Items & Services" badge={`${items.length} Items`} icon={Package} defaultOpen>
              <div className="space-y-3">
                {items.map((item, idx) => {
                  const lineRaw = (Number(item.qty) || 0) * (Number(item.rate) || 0);
                  const lineAfterDisc = lineRaw * (1 - (Number(item.discount) || 0) / 100);
                  return (
                    <div key={item.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-slate-400 mt-2">#{idx + 1}</span>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder="Product or service name..."
                          className="flex-1 text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                          className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer shrink-0"
                          title="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <Field label="HSN/SAC">
                          <input value={item.hsn} onChange={(e) => updateItem(item.id, "hsn", e.target.value)} className={inputCls + " !py-1.5 !px-2.5 font-mono text-xs"} placeholder="9983" />
                        </Field>
                        <Field label="Qty">
                          <input type="number" min="0" step="1" value={item.qty} onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)} className={inputCls + " !py-1.5 !px-2.5 font-mono text-xs"} />
                        </Field>
                        <Field label="Rate (₹)">
                          <input type="number" min="0" value={item.rate} onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)} className={inputCls + " !py-1.5 !px-2.5 font-mono font-bold text-xs"} />
                        </Field>
                        <Field label="GST %">
                          <select value={item.gstRate} onChange={(e) => updateItem(item.id, "gstRate", parseInt(e.target.value, 10))} className={inputCls + " !py-1.5 !px-2 font-mono font-bold text-xs"}>
                            {GST_RATES.map((r) => <option key={r} value={r}>{r}% GST</option>)}
                          </select>
                        </Field>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/70 text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-500">Disc %:</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={item.discount || 0}
                            onChange={(e) => updateItem(item.id, "discount", Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                            className="w-14 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-mono text-xs text-slate-800"
                          />
                        </div>
                        <div className="font-mono font-black text-slate-900">
                          Line: ₹{fmt(lineAfterDisc)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={addItem}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 hover:bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <Plus className="w-4 h-4" /> Add Another Line Item
                </button>
              </div>
            </Accordion>

            {/* 2. Invoice Metadata */}
            <Accordion title="Invoice No & Dates" icon={FileText} defaultOpen>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Invoice No.">
                  <div className="flex gap-1.5">
                    <input className={inputCls + " font-mono font-bold"} value={invoice.number} onChange={(e) => setInvoice((p) => ({ ...p, number: e.target.value }))} />
                    <button type="button" onClick={incrementInvoiceNumber} title="Increment Invoice #"
                      className="px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-700 cursor-pointer shrink-0">
                      +1
                    </button>
                  </div>
                </Field>
                <Field label="PO / Ref No.">
                  <input className={inputCls + " font-mono"} value={invoice.poNumber} onChange={(e) => setInvoice((p) => ({ ...p, poNumber: e.target.value }))} placeholder="PO-001" />
                </Field>
                <Field label="Invoice Date">
                  <input type="date" className={inputCls} value={invoice.date} onChange={(e) => setInvoice((p) => ({ ...p, date: e.target.value }))} />
                </Field>
                <Field label="Due Date">
                  <input type="date" className={inputCls} value={invoice.dueDate} onChange={(e) => setInvoice((p) => ({ ...p, dueDate: e.target.value }))} />
                </Field>
              </div>
            </Accordion>

            {/* 3. Buyer / Client */}
            <Accordion title="Billed To (Client)" icon={ClipboardList} defaultOpen>
              <div className="space-y-3">
                <Field label="Client Company / Name">
                  <input className={inputCls} value={buyer.name} onChange={(e) => setBuyer((p) => ({ ...p, name: e.target.value }))} placeholder="Client Name" />
                </Field>
                <Field label="Client GSTIN">
                  <input className={inputCls + " font-mono"} maxLength={15} value={buyer.gstin} onChange={(e) => setBuyer((p) => ({ ...p, gstin: e.target.value.toUpperCase() }))} placeholder="15-digit GSTIN or UR" />
                </Field>
                <Field label="Billing Address">
                  <input className={inputCls} value={buyer.address} onChange={(e) => setBuyer((p) => ({ ...p, address: e.target.value }))} placeholder="Street, Area" />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City">
                    <input className={inputCls} value={buyer.city} onChange={(e) => setBuyer((p) => ({ ...p, city: e.target.value }))} placeholder="City" />
                  </Field>
                  <Field label="Place of Supply">
                    <select className={inputCls} value={buyer.stateCode} onChange={(e) => setBuyer((p) => ({ ...p, stateCode: e.target.value }))}>
                      {INDIAN_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
                    </select>
                  </Field>
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${isIntraState ? "bg-sky-50 text-sky-800 border border-sky-200" : "bg-amber-50 text-amber-800 border border-amber-200"}`}>
                  <IndianRupee className="w-3.5 h-3.5 shrink-0" />
                  <span>{isIntraState ? "Same State detected -> CGST + SGST Applied" : "Inter-State detected -> IGST Applied"}</span>
                </div>
              </div>
            </Accordion>

            {/* 4. Supplier / Seller */}
            <Accordion title="Your Business (Supplier)" icon={Building2}>
              <div className="space-y-3">
                <Field label="Your Company / Business Name">
                  <input className={inputCls} value={seller.name} onChange={(e) => setSeller((p) => ({ ...p, name: e.target.value }))} />
                </Field>
                <Field label="Your GSTIN">
                  <input className={inputCls + " font-mono"} maxLength={15} value={seller.gstin} onChange={(e) => setSeller((p) => ({ ...p, gstin: e.target.value.toUpperCase() }))} />
                </Field>
                <Field label="Office Address">
                  <input className={inputCls} value={seller.address} onChange={(e) => setSeller((p) => ({ ...p, address: e.target.value }))} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="City">
                    <input className={inputCls} value={seller.city} onChange={(e) => setSeller((p) => ({ ...p, city: e.target.value }))} />
                  </Field>
                  <Field label="State">
                    <select className={inputCls} value={seller.stateCode} onChange={(e) => setSeller((p) => ({ ...p, stateCode: e.target.value }))}>
                      {INDIAN_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Phone">
                    <input className={inputCls} value={seller.phone} onChange={(e) => setSeller((p) => ({ ...p, phone: e.target.value }))} />
                  </Field>
                  <Field label="Email">
                    <input className={inputCls} value={seller.email} onChange={(e) => setSeller((p) => ({ ...p, email: e.target.value }))} />
                  </Field>
                </div>
              </div>
            </Accordion>

            {/* 5. Bank & Terms */}
            <Accordion title="Bank, UPI & Payment Terms" icon={Landmark}>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Bank Name">
                    <input className={inputCls} value={bank.bankName} onChange={(e) => setBank((p) => ({ ...p, bankName: e.target.value }))} />
                  </Field>
                  <Field label="IFSC Code">
                    <input className={inputCls + " font-mono"} value={bank.ifsc} onChange={(e) => setBank((p) => ({ ...p, ifsc: e.target.value.toUpperCase() }))} />
                  </Field>
                </div>
                <Field label="Account Number">
                  <input className={inputCls + " font-mono"} value={bank.accountNo} onChange={(e) => setBank((p) => ({ ...p, accountNo: e.target.value }))} />
                </Field>
                <Field label="UPI VPA (Shown on Invoice)">
                  <input className={inputCls + " font-mono"} value={bank.upiId} onChange={(e) => setBank((p) => ({ ...p, upiId: e.target.value }))} placeholder="business@okhdfcbank" />
                </Field>
                <Field label="Terms & Conditions">
                  <textarea rows={3} className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} />
                </Field>
              </div>
            </Accordion>
          </div>

          {/* ── RIGHT 7 COLS: LIVE A4 INVOICE SHEET PREVIEW (Always printable even when editing on mobile!) ── */}
          <div className={`lg:col-span-7 print-wrapper ${activeTab === "form" ? "hidden lg:block print:block" : "block"}`}>
            <div className="print-area bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

              {/* Top Branded Header */}
              <div className={`${activeTheme.headerBg} text-white px-5 sm:px-8 py-6`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    {logoDataUrl && (
                      <div className="bg-white p-1.5 rounded-xl shrink-0 shadow">
                        <img src={logoDataUrl} alt={seller.name} className="h-12 w-12 object-contain" />
                      </div>
                    )}
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70">
                        Original For Recipient · Tax Invoice
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-0.5">
                        {seller.name || "Your Business Name"}
                      </h2>
                      <div className="text-xs font-mono text-white/85 mt-1">
                        GSTIN: <strong>{seller.gstin || "UNREGISTERED"}</strong>
                      </div>
                      <div className="text-xs text-white/75 mt-1">
                        {[seller.address, seller.city].filter(Boolean).join(", ")}
                      </div>
                      <div className="text-[11px] text-white/70 mt-0.5">
                        {[seller.phone, seller.email].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </div>

                  <div className="sm:text-right border-t border-white/15 pt-3 sm:border-t-0 sm:pt-0 shrink-0">
                    <div className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border ${activeTheme.badgeBg}`}>
                      {isIntraState ? "CGST + SGST (Intra-State)" : "IGST (Inter-State)"}
                    </div>
                    <div className="text-xl font-mono font-black mt-2">{invoice.number || "INV-001"}</div>
                    <div className="text-xs text-white/80 font-mono mt-0.5">Date: {invoice.date}</div>
                    <div className="text-xs text-white/80 font-mono">Due: {invoice.dueDate}</div>
                    {invoice.poNumber && <div className="text-[11px] text-white/65 font-mono">Ref: {invoice.poNumber}</div>}
                  </div>
                </div>
              </div>

              {/* Billing Info Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-200 bg-slate-50/60">
                <div className="p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                    Billed To (Client)
                  </div>
                  <div className="font-bold text-slate-900 text-base">{buyer.name || "Client Name"}</div>
                  <div className="text-xs font-mono font-semibold text-slate-700 mt-1">
                    GSTIN: {buyer.gstin || "Unregistered"}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {[buyer.address, buyer.city].filter(Boolean).join(", ")}
                  </div>
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                      Supply &amp; Compliance
                    </div>
                    <div className="text-xs text-slate-700">
                      <strong>Place of Supply:</strong> {buyerStateName} ({buyer.stateCode})
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      <strong>Tax Basis:</strong> {isIntraState ? "Intra-State Supply" : "Inter-State Supply"}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 font-semibold">Invoice Total</span>
                    <span className={`text-lg font-black font-mono ${activeTheme.accentText}`}>
                      ₹{totals.grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 text-left w-8">#</th>
                      <th className="py-3 px-3 text-left">Item &amp; Description</th>
                      <th className="py-3 px-3 text-left">HSN/SAC</th>
                      <th className="py-3 px-3 text-center">Qty</th>
                      <th className="py-3 px-3 text-right">Rate</th>
                      <th className="py-3 px-3 text-center">GST</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, i) => {
                      const lineTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0) * (1 - (Number(item.discount) || 0) / 100);
                      return (
                        <tr key={item.id}>
                          <td className="py-3.5 px-4 font-mono text-slate-400 align-top">{i + 1}</td>
                          <td className="py-3.5 px-3 align-top">
                            <div className="font-semibold text-slate-900">{item.description || "Item Description"}</div>
                            {Number(item.discount) > 0 && (
                              <span className="text-[10px] text-emerald-700 font-mono">Discount: {item.discount}%</span>
                            )}
                          </td>
                          <td className="py-3.5 px-3 font-mono text-slate-500 align-top">{item.hsn}</td>
                          <td className="py-3.5 px-3 text-center font-mono align-top">{item.qty}</td>
                          <td className="py-3.5 px-3 text-right font-mono align-top">₹{fmt(item.rate)}</td>
                          <td className="py-3.5 px-3 text-center font-mono text-slate-600 align-top">{item.gstRate}%</td>
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 align-top">
                            ₹{fmt(lineTotal)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Totals & Bank Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-slate-900">
                <div className="p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-slate-200 text-xs space-y-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Amount in Words
                    </div>
                    <p className="font-bold text-slate-800 italic leading-relaxed">
                      {numberToWordsINR(totals.grandTotal)}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Bank / UPI Payment Details
                    </div>
                    <div className="space-y-1 text-[11px] font-mono">
                      <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">Bank:</span><span className="font-bold text-slate-800">{bank.bankName}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">A/c No:</span><span className="font-bold text-slate-800">{bank.accountNo}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">IFSC:</span><span className="font-bold text-slate-800">{bank.ifsc}</span></div>
                      {bank.upiId && <div className="flex gap-2"><span className="text-slate-400 w-16 shrink-0">UPI ID:</span><span className="font-bold text-emerald-700">{bank.upiId}</span></div>}
                    </div>
                  </div>

                  {notes && (
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1">Terms &amp; Notes</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line">{notes}</p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 text-xs font-mono space-y-2 flex flex-col justify-between bg-slate-50/40">
                  <div className="space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span><span>₹{fmt(totals.subtotal)}</span>
                    </div>
                    {totals.totalDiscount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount</span><span>-₹{fmt(totals.totalDiscount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-200">
                      <span>Taxable Value</span><span>₹{fmt(totals.taxable)}</span>
                    </div>
                    {isIntraState ? (
                      <>
                        <div className="flex justify-between text-slate-600">
                          <span>CGST</span><span>₹{fmt(totals.cgst)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>SGST</span><span>₹{fmt(totals.sgst)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-slate-600">
                        <span>IGST</span><span>₹{fmt(totals.igst)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Round Off</span>
                      <span>{Number(totals.roundOff) >= 0 ? `+₹${totals.roundOff}` : `-₹${Math.abs(totals.roundOff)}`}</span>
                    </div>
                    <div className="flex justify-between items-center text-base sm:text-xl font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                      <span className="font-sans text-sm">Grand Total</span>
                      <span className={activeTheme.accentText}>₹{totals.grandTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <div className="pt-10 text-right">
                    <div className="inline-block text-center">
                      <div className="h-10 border-b border-slate-400 w-40 mx-auto mb-1" />
                      <span className="text-[11px] text-slate-700 font-sans block">
                        For <strong>{seller.name || "Business"}</strong>
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans">Authorised Signatory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="no-print mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 px-1">
              <span>Supplier &amp; Bank info autosave in your browser for daily billing.</span>
              <Link to="/tools/quotation-generator" className="text-brand-700 font-bold hover:underline">
                Need a Quotation instead? Switch to Free Quotation Maker →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── ERP Upgrade Conversion Banner ── */}
      <div className="no-print bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 border-t border-brand-500/30 px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mx-auto mb-4">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Outgrowing Manual GST Invoicing?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Prajyot Infotech builds custom cloud ERP &amp; billing software with automated GST e-invoicing, barcode/IMEI tracking, Tally XML sync, and automatic WhatsApp PDF invoice dispatch.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: "Custom ERP & Billing Automation" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer min-h-[48px]">
              Get Free ERP Scoping <ArrowRight className="w-4 h-4" />
            </button>
            <a href={`https://wa.me/917020708747?text=${encodeURIComponent("Hi Prajyot Infotech, I used your free GST invoice tool and want to discuss custom automated billing software.")}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all min-h-[48px]">
              <MessageSquare className="w-4 h-4" /> Discuss on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
