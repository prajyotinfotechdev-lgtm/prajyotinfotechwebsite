import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  FileCheck2,
  Printer,
  Share2,
  Plus,
  Trash2,
  Copy,
  Check,
  Building2,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Eye,
  PenLine,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";

const TAX_MODES = [
  { id: "exclusive", label: "Add GST (Exclusive)" },
  { id: "inclusive", label: "GST Included" },
  { id: "none", label: "No Tax (Simple Quote)" },
];

const GST_RATES = [0, 5, 12, 18, 28];

const TERMS_PRESETS = [
  {
    id: "milestone",
    label: "50% Advance / 50% Delivery",
    text: "1. Quotation valid for 15 days from date of issue.\n2. Payment Terms: 50% advance to confirm order; 50% on final delivery.\n3. Any additional scope outside items listed will be quoted separately.",
  },
  {
    id: "net15",
    label: "Net 15 Credit Terms",
    text: "1. Prices valid for 30 days.\n2. Payment due within 15 days of final invoice date via NEFT/RTGS/UPI.\n3. Subject to Pune jurisdiction.",
  },
  {
    id: "retail",
    label: "100% Against Delivery",
    text: "1. 100% payment upon physical/digital delivery confirmation.\n2. Goods once supplied will not be taken back unless defective.\n3. Warranty valid per manufacturer/contract terms.",
  },
];

function fmt(n) {
  return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Accordion({ title, icon: Icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-slate-50/80 hover:bg-slate-100/80 transition-colors cursor-pointer text-left min-h-[48px]"
      >
        <span className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <Icon className="w-4 h-4 text-brand-600 shrink-0" />
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="p-4 border-t border-slate-100">{children}</div>}
    </div>
  );
}

const inputCls =
  "w-full text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all placeholder:text-slate-400";

export default function QuotationGenerator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [activeTab, setActiveTab] = useState("form");
  const [copied, setCopied] = useState(false);

  const [taxMode, setTaxMode] = useState("exclusive");
  const [docTitle, setDocTitle] = useState("QUOTATION");

  const [sender, setSender] = useState(() => {
    try {
      const s = localStorage.getItem("pi_quote_sender");
      return s
        ? JSON.parse(s)
        : {
            company: "Prajyot Infotech",
            tagline: "Software Engineering & Web Solutions",
            phone: "+91 70207 08747",
            email: "hr@prajyotinfotech.in",
            address: "Shivaji Nagar, Pune, Maharashtra 411005",
            gstin: "27ABCDE1234F1Z5",
          };
    } catch {
      return {
        company: "My Business Name",
        tagline: "Commercial Services & Supplies",
        phone: "+91 98000 00000",
        email: "sales@mybusiness.in",
        address: "Pune, Maharashtra",
        gstin: "",
      };
    }
  });

  const [client, setClient] = useState({
    company: "Sahyadri Infra & Builders",
    contact: "Mr. Vivek Deshmukh",
    phone: "+91 98220 11223",
    address: "Baner Road, Pune",
  });

  const [meta, setMeta] = useState({
    quoteNo: "QTN-2026-104",
    date: new Date().toISOString().split("T")[0],
    validUntil: new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
    subject: "Custom Website, CRM & WhatsApp Automation Proposal",
  });

  const [items, setItems] = useState([
    { id: "1", title: "Responsive Business Website & Admin CMS", desc: "Mobile-first UI, SEO schema, sub-second edge speed", qty: 1, unit: "Project", rate: 35000, gst: 18 },
    { id: "2", title: "Automated WhatsApp Lead & Quote Bot", desc: "Instant inquiry alerts & PDF proposal forwarding", qty: 1, unit: "Module", rate: 15000, gst: 18 },
  ]);

  const [terms, setTerms] = useState(TERMS_PRESETS[0].text);

  useEffect(() => {
    try {
      localStorage.setItem("pi_quote_sender", JSON.stringify(sender));
    } catch {}
  }, [sender]);

  const summary = useMemo(() => {
    let baseTotal = 0;
    let taxTotal = 0;
    items.forEach((it) => {
      const q = Number(it.qty) || 0;
      const r = Number(it.rate) || 0;
      const g = taxMode === "none" ? 0 : Number(it.gst) || 0;
      const gross = q * r;
      if (taxMode === "inclusive" && g > 0) {
        const ex = gross / (1 + g / 100);
        baseTotal += ex;
        taxTotal += gross - ex;
      } else {
        baseTotal += gross;
        taxTotal += (gross * g) / 100;
      }
    });
    const grandTotal = Math.round(baseTotal + taxTotal);
    return { baseTotal, taxTotal, grandTotal };
  }, [items, taxMode]);

  const addItem = () =>
    setItems((p) => [
      ...p,
      { id: Date.now().toString(), title: "Additional Item / Deliverable", desc: "", qty: 1, unit: "Nos", rate: 5000, gst: 18 },
    ]);
  const updateItem = (id, f, v) => setItems((p) => p.map((it) => (it.id === id ? { ...it, [f]: v } : it)));
  const removeItem = (id) => {
    if (items.length > 1) setItems((p) => p.filter((it) => it.id !== id));
  };

  const resetQuote = () => {
    setMeta((m) => ({
      ...m,
      quoteNo: `QTN-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 899)}`,
      subject: "",
    }));
    setClient({ company: "", contact: "", phone: "", address: "" });
    setItems([{ id: Date.now().toString(), title: "", desc: "", qty: 1, unit: "Nos", rate: 0, gst: 18 }]);
  };

  const shareWhatsApp = () => {
    const itemLines = items
      .filter((i) => i.title)
      .map((i, idx) => `${idx + 1}. ${i.title} (x${i.qty}) - ₹${(Number(i.qty) * Number(i.rate)).toLocaleString("en-IN")}`)
      .join("\n");

    const text = encodeURIComponent(
      `*${docTitle} ${meta.quoteNo}*\n` +
      `From: *${sender.company}*\n` +
      `To: ${client.company || client.contact || "Valued Client"}\n` +
      (meta.subject ? `Subject: ${meta.subject}\n` : "") +
      `Valid Until: ${meta.validUntil}\n\n` +
      `${itemLines}\n\n` +
      `*Total Estimated Value: ₹${summary.grandTotal.toLocaleString("en-IN")}*\n` +
      `(${taxMode === "none" ? "Excl. Taxes" : taxMode === "inclusive" ? "Incl. GST" : "Incl. Estimated GST"})\n\n` +
      `Generated free via Prajyot Infotech:\nhttps://www.prajyotinfotech.in/tools/quotation-generator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copySummary = () => {
    navigator.clipboard?.writeText(
      `${docTitle} #${meta.quoteNo} from ${sender.company}\nTo: ${client.company}\nSubject: ${meta.subject}\nTotal: ₹${summary.grandTotal.toLocaleString("en-IN")}\nValid Until: ${meta.validUntil}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/quotation-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Business Quotation & Proforma Estimate Generator India",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Create, print A4 PDF, and share branded business quotations and proforma invoices on WhatsApp for free.",
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: pageUrl },
          { name: "Quotation Generator", url: pageUrl },
        ]}
      />
      <Seo
        title="Free Quotation & Proforma Estimate Maker Online India | Prajyot Infotech"
        description="Create professional business quotations, proposals, and proforma estimates in seconds. Auto GST calculation, A4 PDF export & 1-click WhatsApp dispatch. Free forever."
        keywords="free quotation generator online India, proforma invoice maker free, business estimate maker PDF, quotation format India, WhatsApp quotation maker"
        path="/tools/quotation-generator"
        schema={[schema]}
      />

      <style>{`
        @page { size: A4; margin: 10mm; }
        @media print {
          html, body { background: #ffffff !important; color: #0f172a !important; }
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
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

      {/* Top Hero */}
      <div className="bg-slate-900 text-white py-8 sm:py-10 px-4 no-print border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>100% Free · Zero Login · Instant PDF &amp; WhatsApp</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Free Quotation &amp; Proforma Estimate Maker
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Send crisp, winning price quotations to customers before closing deals. Supports GST inclusive/exclusive/non-GST quotes, payment terms, and instant WhatsApp sending.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button type="button" onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> Print / Save A4 PDF
            </button>
            <button type="button" onClick={shareWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Send on WhatsApp
            </button>
            <button type="button" onClick={copySummary}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button type="button" onClick={resetQuote}
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold text-xs transition-all cursor-pointer min-h-[44px]">
              <RotateCcw className="w-3.5 h-3.5" /> New
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="lg:hidden max-w-7xl mx-auto mt-6 grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800/90 border border-slate-700">
          <button type="button" onClick={() => setActiveTab("form")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all cursor-pointer min-h-[42px] ${activeTab === "form" ? "bg-brand-600 text-white" : "text-slate-300"}`}>
            <PenLine className="w-4 h-4" /> Edit Quote
          </button>
          <button type="button" onClick={() => setActiveTab("preview")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wide transition-all cursor-pointer min-h-[42px] ${activeTab === "preview" ? "bg-brand-600 text-white" : "text-slate-300"}`}>
            <Eye className="w-4 h-4" /> Preview A4
          </button>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 no-print bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Quote Total</div>
            <div className="text-lg font-black text-white font-mono">₹{summary.grandTotal.toLocaleString("en-IN")}</div>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setActiveTab(activeTab === "form" ? "preview" : "form")}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs cursor-pointer min-h-[44px]">
              {activeTab === "form" ? <Eye className="w-4 h-4" /> : <PenLine className="w-4 h-4" />}
              <span>{activeTab === "form" ? "Preview" : "Edit"}</span>
            </button>
            <button type="button" onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> PDF
            </button>
            <button type="button" onClick={shareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Editor */}
          <div className={`lg:col-span-5 space-y-4 no-print ${activeTab === "preview" ? "hidden lg:block" : "block"}`}>
            {/* Document Type & Tax Mode */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Document Heading</label>
                <div className="grid grid-cols-3 gap-2">
                  {["QUOTATION", "ESTIMATE", "PROFORMA INVOICE"].map((t) => (
                    <button key={t} type="button" onClick={() => setDocTitle(t)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer ${docTitle === t ? "bg-brand-600 text-white border-brand-600" : "bg-slate-50 text-slate-600 border-slate-200"}`}>
                      {t === "PROFORMA INVOICE" ? "Proforma" : t.charAt(0) + t.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">GST Mode</label>
                <select value={taxMode} onChange={(e) => setTaxMode(e.target.value)} className={inputCls}>
                  {TAX_MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                </select>
              </div>
            </div>

            {/* Line Items */}
            <Accordion title={`Line Items (${items.length})`} icon={FileCheck2} defaultOpen>
              <div className="space-y-3">
                {items.map((it, idx) => (
                  <div key={it.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <span className="text-[11px] font-mono font-bold text-slate-400 mt-2">#{idx + 1}</span>
                      <div className="flex-1 space-y-1.5">
                        <input value={it.title} onChange={(e) => updateItem(it.id, "title", e.target.value)}
                          placeholder="Service or Product Name"
                          className="w-full text-sm font-semibold text-slate-900 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
                        <input value={it.desc} onChange={(e) => updateItem(it.id, "desc", e.target.value)}
                          placeholder="Optional specs / scope details..."
                          className="w-full text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none" />
                      </div>
                      <button type="button" onClick={() => removeItem(it.id)} disabled={items.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Qty</label>
                        <input type="number" min="0" value={it.qty} onChange={(e) => updateItem(it.id, "qty", parseFloat(e.target.value) || 0)} className={inputCls + " !py-1.5 !px-2 font-mono text-xs"} />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Unit</label>
                        <input value={it.unit} onChange={(e) => updateItem(it.id, "unit", e.target.value)} className={inputCls + " !py-1.5 !px-2 text-xs"} placeholder="Nos" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">Rate (₹)</label>
                        <input type="number" min="0" value={it.rate} onChange={(e) => updateItem(it.id, "rate", parseFloat(e.target.value) || 0)} className={inputCls + " !py-1.5 !px-2 font-mono font-bold text-xs"} />
                      </div>
                      {taxMode !== "none" && (
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">GST %</label>
                          <select value={it.gst} onChange={(e) => updateItem(it.id, "gst", parseInt(e.target.value, 10))} className={inputCls + " !py-1.5 !px-2 font-mono text-xs"}>
                            {GST_RATES.map((g) => <option key={g} value={g}>{g}%</option>)}
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addItem}
                  className="w-full py-2.5 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 hover:bg-brand-50 text-brand-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]">
                  <Plus className="w-4 h-4" /> Add Deliverable Row
                </button>
              </div>
            </Accordion>

            {/* Quote Meta & Subject */}
            <Accordion title="Quote Info & Validity" icon={PenLine} defaultOpen>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">Proposal Subject</label>
                  <input className={inputCls} value={meta.subject} onChange={(e) => setMeta((p) => ({ ...p, subject: e.target.value }))} placeholder="e.g., Mobile App Design & Development" />
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Quote #</label>
                    <input className={inputCls + " font-mono text-xs"} value={meta.quoteNo} onChange={(e) => setMeta((p) => ({ ...p, quoteNo: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Date</label>
                    <input type="date" className={inputCls + " text-xs"} value={meta.date} onChange={(e) => setMeta((p) => ({ ...p, date: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Valid Until</label>
                    <input type="date" className={inputCls + " text-xs"} value={meta.validUntil} onChange={(e) => setMeta((p) => ({ ...p, validUntil: e.target.value }))} />
                  </div>
                </div>
              </div>
            </Accordion>

            {/* Client */}
            <Accordion title="Prepared For (Client)" icon={Building2} defaultOpen>
              <div className="space-y-2.5">
                <input className={inputCls} value={client.company} onChange={(e) => setClient((p) => ({ ...p, company: e.target.value }))} placeholder="Client Company Name" />
                <div className="grid grid-cols-2 gap-2.5">
                  <input className={inputCls} value={client.contact} onChange={(e) => setClient((p) => ({ ...p, contact: e.target.value }))} placeholder="Contact Person" />
                  <input className={inputCls} value={client.phone} onChange={(e) => setClient((p) => ({ ...p, phone: e.target.value }))} placeholder="Client Phone" />
                </div>
                <input className={inputCls} value={client.address} onChange={(e) => setClient((p) => ({ ...p, address: e.target.value }))} placeholder="Client City / Address" />
              </div>
            </Accordion>

            {/* Sender */}
            <Accordion title="Your Company Details" icon={Building2}>
              <div className="space-y-2.5">
                <input className={inputCls} value={sender.company} onChange={(e) => setSender((p) => ({ ...p, company: e.target.value }))} placeholder="Your Business Name" />
                <input className={inputCls} value={sender.tagline} onChange={(e) => setSender((p) => ({ ...p, tagline: e.target.value }))} placeholder="Tagline / Industry" />
                <div className="grid grid-cols-2 gap-2.5">
                  <input className={inputCls} value={sender.phone} onChange={(e) => setSender((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone" />
                  <input className={inputCls} value={sender.email} onChange={(e) => setSender((p) => ({ ...p, email: e.target.value }))} placeholder="Email" />
                </div>
                <input className={inputCls} value={sender.address} onChange={(e) => setSender((p) => ({ ...p, address: e.target.value }))} placeholder="Full Business Address" />
                <input className={inputCls + " font-mono"} value={sender.gstin} onChange={(e) => setSender((p) => ({ ...p, gstin: e.target.value.toUpperCase() }))} placeholder="GSTIN (Optional)" />
              </div>
            </Accordion>

            {/* Terms */}
            <Accordion title="Payment & Validity Terms" icon={FileCheck2}>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {TERMS_PRESETS.map((pr) => (
                    <button key={pr.id} type="button" onClick={() => setTerms(pr.text)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 text-[11px] font-semibold cursor-pointer">
                      {pr.label}
                    </button>
                  ))}
                </div>
                <textarea rows={4} className={inputCls} value={terms} onChange={(e) => setTerms(e.target.value)} />
              </div>
            </Accordion>
          </div>

          {/* Right Live A4 Preview */}
          <div className={`lg:col-span-7 ${activeTab === "form" ? "hidden lg:block print:block" : "block"}`}>
            <div className="print-area bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-slate-900">
              {/* Branded Header */}
              <div className="bg-slate-900 text-white px-5 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{sender.company || "Business Name"}</h2>
                  {sender.tagline && <div className="text-xs text-brand-300 font-semibold mt-0.5">{sender.tagline}</div>}
                  <div className="text-xs text-slate-400 mt-2">{sender.address}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{[sender.phone, sender.email].filter(Boolean).join(" · ")}</div>
                  {sender.gstin && <div className="text-[11px] font-mono text-slate-300 mt-1">GSTIN: {sender.gstin}</div>}
                </div>
                <div className="sm:text-right border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0 shrink-0">
                  <div className="inline-block px-3 py-1 rounded-md bg-brand-600/30 border border-brand-400/40 text-brand-200 text-xs font-mono font-bold">
                    {docTitle}
                  </div>
                  <div className="text-lg font-mono font-black mt-2">{meta.quoteNo}</div>
                  <div className="text-xs text-slate-400 font-mono">Issued: {meta.date}</div>
                  <div className="text-xs text-amber-300 font-mono">Valid Until: {meta.validUntil}</div>
                </div>
              </div>

              {/* Client + Subject */}
              <div className="p-5 sm:p-8 border-b border-slate-200 bg-slate-50/70 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Quotation For</div>
                  <div className="font-bold text-slate-900 text-base">{client.company || "Client Company"}</div>
                  {client.contact && <div className="text-xs font-semibold text-slate-700 mt-0.5">Attn: {client.contact}</div>}
                  {client.phone && <div className="text-xs text-slate-500 mt-0.5">{client.phone}</div>}
                  {client.address && <div className="text-xs text-slate-500 mt-0.5">{client.address}</div>}
                </div>
                <div className="flex flex-col justify-between sm:text-right">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Proposal Subject</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800">{meta.subject || "Commercial Quotation"}</div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-200/70">
                    <span className="text-[11px] text-slate-500 block">Total Quoted Amount</span>
                    <span className="text-xl font-black font-mono text-brand-700">₹{summary.grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 text-left w-8">#</th>
                      <th className="py-3 px-3 text-left">Deliverable / Item</th>
                      <th className="py-3 px-3 text-center">Qty</th>
                      <th className="py-3 px-3 text-right">Unit Rate</th>
                      {taxMode !== "none" && <th className="py-3 px-3 text-center">GST</th>}
                      <th className="py-3 px-4 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it, i) => {
                      const line = (Number(it.qty) || 0) * (Number(it.rate) || 0);
                      return (
                        <tr key={it.id}>
                          <td className="py-3.5 px-4 font-mono text-slate-400 align-top">{i + 1}</td>
                          <td className="py-3.5 px-3 align-top">
                            <div className="font-bold text-slate-900">{it.title || "Item"}</div>
                            {it.desc && <div className="text-[11px] text-slate-500 mt-0.5">{it.desc}</div>}
                          </td>
                          <td className="py-3.5 px-3 text-center font-mono align-top">{it.qty} {it.unit}</td>
                          <td className="py-3.5 px-3 text-right font-mono align-top">₹{fmt(it.rate)}</td>
                          {taxMode !== "none" && <td className="py-3.5 px-3 text-center font-mono text-slate-600 align-top">{it.gst}%</td>}
                          <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900 align-top">₹{fmt(line)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Terms + Totals Footer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t-2 border-slate-900">
                <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-slate-200 text-xs space-y-2">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">Terms &amp; Acceptance</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line">{terms}</p>
                </div>
                <div className="p-5 sm:p-6 text-xs font-mono space-y-2 bg-slate-50/40">
                  <div className="flex justify-between text-slate-600">
                    <span>{taxMode === "inclusive" ? "Base Value (Excl. GST)" : "Subtotal"}</span>
                    <span>₹{fmt(summary.baseTotal)}</span>
                  </div>
                  {taxMode !== "none" && (
                    <div className="flex justify-between text-slate-600">
                      <span>Estimated GST</span>
                      <span>₹{fmt(summary.taxTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                    <span className="font-sans text-sm">Estimated Total</span>
                    <span className="text-brand-700 text-xl">₹{summary.grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="pt-8 text-right">
                    <div className="inline-block text-center">
                      <div className="h-9 border-b border-slate-400 w-36 mx-auto mb-1" />
                      <span className="text-[11px] text-slate-600 font-sans">Authorised Signatory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="no-print mt-4 flex flex-wrap justify-between items-center gap-2 text-xs text-slate-500">
              <span>Ready to bill? Switch to Tax Invoice Maker anytime.</span>
              <Link to="/tools/gst-invoice-generator" className="text-brand-700 font-bold hover:underline">
                Open GST Tax Invoice Generator →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Lead Banner */}
      <div className="no-print bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 border-t border-brand-500/30 px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Want Automated Quotations -&gt; Invoices -&gt; WhatsApp Follow-ups?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Prajyot Infotech builds bespoke Sales CRM &amp; ERP software where quotes convert into GST invoices in 1 click and automatically trigger WhatsApp reminders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: "Custom Sales CRM & Quotation Software" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer min-h-[48px]">
              Get Custom CRM Proposal <ArrowRight className="w-4 h-4" />
            </button>
            <a href={`https://wa.me/917020708747?text=${encodeURIComponent("Hi Prajyot Infotech, I used your Quotation Maker and want automated quotation & CRM software for our sales team.")}`}
              target="_blank" rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg min-h-[48px]">
              <MessageSquare className="w-4 h-4" /> Discuss on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
