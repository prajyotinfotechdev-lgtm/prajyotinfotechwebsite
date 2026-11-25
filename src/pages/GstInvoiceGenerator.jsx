import React, { useState, useMemo, useEffect } from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  FileText, Printer, Share2, Plus, Trash2, Copy, Check,
  Building2, ArrowRight, MessageSquare, Sparkles, ChevronDown, ChevronUp,
  IndianRupee, ClipboardList, Eye, PenLine, Landmark
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

/* ─── Static Data ─────────────────────────────────────────── */
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
  { code: "20", name: "Jharkhand" },   { code: "99", name: "Other / SEZ" },
];
const GST_RATES = [0, 5, 12, 18, 28];

/* ─── Helpers ─────────────────────────────────────────────── */
function numberToWordsINR(num) {
  if (!num || isNaN(num) || num === 0) return "Zero Rupees Only";
  const a = ["","One ","Two ","Three ","Four ","Five ","Six ","Seven ","Eight ","Nine ","Ten ",
    "Eleven ","Twelve ","Thirteen ","Fourteen ","Fifteen ","Sixteen ","Seventeen ","Eighteen ","Nineteen "];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function inW(n) {
    if (!n) return "";
    let s = "";
    if (n > 99) { s += a[Math.floor(n/100)]+"Hundred "; n %= 100; }
    if (n > 19) s += b[Math.floor(n/10)]+" "+a[n%10];
    else s += a[n];
    return s;
  }
  let am = Math.floor(num);
  const cr = Math.floor(am/1e7); am %= 1e7;
  const lk = Math.floor(am/1e5); am %= 1e5;
  const th = Math.floor(am/1e3); am %= 1e3;
  let w = "";
  if (cr) w += inW(cr)+"Crore ";
  if (lk) w += inW(lk)+"Lakh ";
  if (th) w += inW(th)+"Thousand ";
  if (am) w += inW(am);
  return w.trim()+" Rupees Only";
}

function fmt(n) { return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

/* ─── Collapsible Section Component ──────────────────────── */
function Section({ title, icon: Icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer text-left"
      >
        <span className="flex items-center gap-2 font-bold text-slate-800 text-sm">
          <Icon className="w-4 h-4 text-brand-600 shrink-0" />
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
}

/* ─── Reusable labeled field ──────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all placeholder:text-slate-400";
const selectCls = inputCls;

/* ─── Main Component ──────────────────────────────────────── */
export default function GstInvoiceGenerator() {
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // "form" | "preview"

  const [seller, setSeller] = useState(() => {
    try { const s = localStorage.getItem("pi_gst_seller"); return s ? JSON.parse(s) : defSeller(); } catch { return defSeller(); }
  });
  const [buyer, setBuyer] = useState({
    name: "Acme Enterprises Pvt Ltd", gstin: "27XYZAB9876C1Z3",
    address: "Plot 42, Hinjewadi Phase 1", city: "Pune", stateCode: "27",
  });
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
    { id: "1", description: "Custom ERP & CRM Web Portal Architecture", hsn: "998314", unit: "Nos", qty: 1, rate: 85000, discount: 0, gstRate: 18 },
    { id: "2", description: "WhatsApp Business Cloud API Integration", hsn: "998313", unit: "Nos", qty: 1, rate: 15000, discount: 0, gstRate: 18 },
  ]);
  const [notes, setNotes] = useState(
    "1. Payment due within 15 days of invoice date.\n2. 100% IP & source code transferred upon final payment.\n3. Pay via NEFT/RTGS or UPI as per details above."
  );

  useEffect(() => {
    try {
      localStorage.setItem("pi_gst_seller", JSON.stringify(seller));
      localStorage.setItem("pi_gst_bank", JSON.stringify(bank));
    } catch {}
  }, [seller, bank]);

  const isIntraState = seller.stateCode === buyer.stateCode;

  const totals = useMemo(() => {
    let subtotal = 0, totalDiscount = 0, taxable = 0, cgst = 0, sgst = 0, igst = 0;
    items.forEach(it => {
      const raw = (Number(it.qty)||0) * (Number(it.rate)||0);
      const disc = raw * ((Number(it.discount)||0)/100);
      const taxbl = raw - disc;
      const r = Number(it.gstRate)||0;
      subtotal += raw; totalDiscount += disc; taxable += taxbl;
      if (isIntraState) { cgst += taxbl*(r/2)/100; sgst += taxbl*(r/2)/100; }
      else { igst += taxbl*r/100; }
    });
    const totalTax = cgst + sgst + igst;
    const grandExact = taxable + totalTax;
    const grandTotal = Math.round(grandExact);
    return { subtotal, totalDiscount, taxable, cgst, sgst, igst, totalTax, grandTotal, roundOff: (grandTotal - grandExact).toFixed(2) };
  }, [items, isIntraState]);

  const addItem = () => setItems(p => [...p, { id: Date.now().toString(), description: "New Service / Item", hsn: "9983", unit: "Nos", qty: 1, rate: 5000, discount: 0, gstRate: 18 }]);
  const updateItem = (id, f, v) => setItems(p => p.map(it => it.id === id ? { ...it, [f]: v } : it));
  const removeItem = id => { if (items.length > 1) setItems(p => p.filter(it => it.id !== id)); };

  const handlePrint = () => window.print();

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `GST Tax Invoice ${invoice.number} from ${seller.name}\n` +
      `Date: ${invoice.date} | Due: ${invoice.dueDate}\n` +
      `Total: Rs.${totals.grandTotal.toLocaleString("en-IN")}\n` +
      (bank.upiId ? `UPI: ${bank.upiId}\n` : "") +
      `\nGenerated via Prajyot Infotech Free GST Utility:\nhttps://www.prajyotinfotech.in/tools/gst-invoice-generator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const copySummary = () => {
    navigator.clipboard?.writeText(
      `Invoice #: ${invoice.number}\nSeller: ${seller.name} (${seller.gstin})\nBuyer: ${buyer.name} (${buyer.gstin})\nTaxable: Rs.${fmt(totals.taxable)}\nGrand Total: Rs.${fmt(totals.grandTotal)}\nAmount: ${numberToWordsINR(totals.grandTotal)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/gst-invoice-generator";
  const webAppSchema = {
    "@context": "https://schema.org", "@type": "WebApplication",
    name: "Free GST Invoice Generator Online India", url: pageUrl,
    applicationCategory: "BusinessApplication", operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Free browser-based Indian GST invoice maker with CGST, SGST, IGST auto-calculation, HSN tracking, PDF print and WhatsApp share.",
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <BreadcrumbsLd items={[
        { name: "Home", url: "https://www.prajyotinfotech.in/" },
        { name: "Free Tools", url: "https://www.prajyotinfotech.in/services" },
        { name: "GST Invoice Generator", url: pageUrl },
      ]} />
      <Seo
        title="Free GST Invoice Generator Online (India) — 100% Free PDF Maker | Prajyot Infotech"
        description="Create professional, 100% GST-compliant invoices online for free. Automatic CGST, SGST, IGST calculations, HSN code support, instant PDF download & WhatsApp sharing. No login required."
        keywords="free GST invoice generator online, GST bill maker India, create GST invoice PDF free, GST calculator India, online billing generator for SMB"
        path="/tools/gst-invoice-generator"
        schema={[webAppSchema]}
      />

      {/* Print CSS */}
      <style>{`
        @media print {
          body { background:#fff!important; color:#000!important; }
          nav,footer,.no-print,header { display:none!important; }
          .print-area { display:block!important; width:100%!important; margin:0!important; padding:0!important; box-shadow:none!important; border:none!important; background:#fff!important; color:#0f172a!important; }
          .print-area * { color:#0f172a!important; border-color:#cbd5e1!important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 py-10 px-4 no-print">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            100% Free · No Login · GST Compliant India
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
            Free GST Invoice Generator
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Create professional CGST/SGST/IGST invoices in seconds. Instant PDF print &amp; WhatsApp sharing. No account needed.
          </p>

          {/* Action Buttons — always visible */}
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <button onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> Print / PDF
            </button>
            <button onClick={shareOnWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Share on WhatsApp
            </button>
            <button onClick={copySummary}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer min-h-[44px]">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Summary"}
            </button>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="mt-6 flex sm:hidden justify-center gap-2">
            <button onClick={() => setActiveTab("form")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${activeTab === "form" ? "bg-brand-600 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"}`}>
              <PenLine className="w-3.5 h-3.5" /> Edit Invoice
            </button>
            <button onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wide transition-all cursor-pointer ${activeTab === "preview" ? "bg-brand-600 text-white" : "bg-slate-800 text-slate-300 border border-slate-700"}`}>
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
          </div>
        </div>
      </div>

      {/* ── Live Amount Bar (mobile sticky) ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 no-print">
        <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-slate-400 font-mono uppercase">Grand Total</div>
            <div className="text-xl font-black text-brand-400">Rs.{totals.grandTotal.toLocaleString("en-IN")}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> PDF
            </button>
            <button onClick={shareOnWhatsApp}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 pb-28 sm:pb-8">
        <div className="lg:grid lg:grid-cols-5 lg:gap-8">

          {/* ── LEFT: FORM PANEL ── */}
          <div className={`lg:col-span-2 ${activeTab === "preview" ? "hidden sm:block" : "block"}`}>
            <div className="sticky top-4 space-y-0">

              {/* Invoice Meta */}
              <Section title="Invoice Details" icon={FileText} defaultOpen>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Invoice No.">
                    <input className={inputCls} value={invoice.number} onChange={e => setInvoice(p=>({...p,number:e.target.value}))} placeholder="INV-2026-001" />
                  </Field>
                  <Field label="PO / Ref No.">
                    <input className={inputCls} value={invoice.poNumber} onChange={e => setInvoice(p=>({...p,poNumber:e.target.value}))} placeholder="PO-0001" />
                  </Field>
                  <Field label="Invoice Date">
                    <input type="date" className={inputCls} value={invoice.date} onChange={e => setInvoice(p=>({...p,date:e.target.value}))} />
                  </Field>
                  <Field label="Due Date">
                    <input type="date" className={inputCls} value={invoice.dueDate} onChange={e => setInvoice(p=>({...p,dueDate:e.target.value}))} />
                  </Field>
                </div>
              </Section>

              {/* Seller */}
              <Section title="Your Business (Supplier)" icon={Building2} defaultOpen>
                <div className="space-y-3">
                  <Field label="Business Name">
                    <input className={inputCls} value={seller.name} onChange={e => setSeller(p=>({...p,name:e.target.value}))} placeholder="Your Company Pvt Ltd" />
                  </Field>
                  <Field label="GSTIN (15 digits)">
                    <input className={inputCls} maxLength={15} value={seller.gstin} onChange={e => setSeller(p=>({...p,gstin:e.target.value.toUpperCase()}))} placeholder="27ABCDE1234F1Z5" />
                  </Field>
                  <Field label="Address">
                    <input className={inputCls} value={seller.address} onChange={e => setSeller(p=>({...p,address:e.target.value}))} placeholder="Office Address" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="City">
                      <input className={inputCls} value={seller.city} onChange={e => setSeller(p=>({...p,city:e.target.value}))} placeholder="Pune" />
                    </Field>
                    <Field label="State">
                      <select className={selectCls} value={seller.stateCode} onChange={e => setSeller(p=>({...p,stateCode:e.target.value}))}>
                        {INDIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Phone">
                      <input className={inputCls} value={seller.phone} onChange={e => setSeller(p=>({...p,phone:e.target.value}))} placeholder="+91 98000 00000" />
                    </Field>
                    <Field label="Email">
                      <input className={inputCls} value={seller.email} onChange={e => setSeller(p=>({...p,email:e.target.value}))} placeholder="billing@company.in" />
                    </Field>
                  </div>
                </div>
              </Section>

              {/* Buyer */}
              <Section title="Client / Buyer Details" icon={ClipboardList} defaultOpen>
                <div className="space-y-3">
                  <Field label="Client Name">
                    <input className={inputCls} value={buyer.name} onChange={e => setBuyer(p=>({...p,name:e.target.value}))} placeholder="Client Company Name" />
                  </Field>
                  <Field label="Client GSTIN">
                    <input className={inputCls} maxLength={15} value={buyer.gstin} onChange={e => setBuyer(p=>({...p,gstin:e.target.value.toUpperCase()}))} placeholder="GSTIN or UR (Unregistered)" />
                  </Field>
                  <Field label="Address">
                    <input className={inputCls} value={buyer.address} onChange={e => setBuyer(p=>({...p,address:e.target.value}))} placeholder="Client Billing Address" />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="City">
                      <input className={inputCls} value={buyer.city} onChange={e => setBuyer(p=>({...p,city:e.target.value}))} placeholder="City" />
                    </Field>
                    <Field label="State">
                      <select className={selectCls} value={buyer.stateCode} onChange={e => setBuyer(p=>({...p,stateCode:e.target.value}))}>
                        {INDIAN_STATES.map(s => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${isIntraState ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
                    <IndianRupee className="w-3.5 h-3.5" />
                    {isIntraState ? "Intra-State: CGST + SGST will apply" : "Inter-State: IGST will apply"}
                  </div>
                </div>
              </Section>

              {/* Bank Details */}
              <Section title="Bank & UPI Details" icon={Landmark} defaultOpen={false}>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Bank Name">
                      <input className={inputCls} value={bank.bankName} onChange={e => setBank(p=>({...p,bankName:e.target.value}))} placeholder="HDFC Bank" />
                    </Field>
                    <Field label="IFSC Code">
                      <input className={inputCls} value={bank.ifsc} onChange={e => setBank(p=>({...p,ifsc:e.target.value.toUpperCase()}))} placeholder="HDFC0000123" />
                    </Field>
                  </div>
                  <Field label="Account Number">
                    <input className={inputCls} value={bank.accountNo} onChange={e => setBank(p=>({...p,accountNo:e.target.value}))} placeholder="50200012345678" />
                  </Field>
                  <Field label="UPI ID (VPA)">
                    <input className={inputCls} value={bank.upiId} onChange={e => setBank(p=>({...p,upiId:e.target.value}))} placeholder="business@okhdfcbank" />
                  </Field>
                </div>
              </Section>

              {/* Terms */}
              <Section title="Terms & Notes" icon={FileText} defaultOpen={false}>
                <textarea rows={4} className={inputCls + " resize-y"} value={notes} onChange={e => setNotes(e.target.value)} />
              </Section>
            </div>
          </div>

          {/* ── RIGHT: INVOICE PREVIEW ── */}
          <div className={`lg:col-span-3 mt-6 lg:mt-0 ${activeTab === "form" ? "hidden sm:block" : "block"}`}>

            {/* Line Items Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mb-4">
              <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-slate-50 border-b border-slate-200">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-brand-600" /> Line Items
                </span>
                <button onClick={addItem}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 border border-brand-200 hover:bg-brand-100 text-brand-700 font-bold text-xs transition-all cursor-pointer">
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>

              {/* Mobile: Card View for items */}
              <div className="sm:hidden divide-y divide-slate-100">
                {items.map((item, idx) => {
                  const lineTotal = item.qty * item.rate * (1 - (item.discount||0)/100);
                  return (
                    <div key={item.id} className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[11px] font-mono text-slate-400 mt-0.5">#{idx+1}</span>
                        <div className="flex-1">
                          <input value={item.description} onChange={e => updateItem(item.id,"description",e.target.value)}
                            className="w-full font-semibold text-slate-900 bg-transparent border-b border-slate-200 focus:border-brand-500 focus:outline-none py-0.5 text-sm" />
                        </div>
                        <button onClick={() => removeItem(item.id)} disabled={items.length <= 1}
                          className="text-slate-300 hover:text-red-500 disabled:opacity-30 cursor-pointer shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider block">HSN/SAC</label>
                          <input value={item.hsn} onChange={e => updateItem(item.id,"hsn",e.target.value)}
                            className="w-full font-mono text-slate-700 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-brand-500" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider block">GST Rate</label>
                          <select value={item.gstRate} onChange={e => updateItem(item.id,"gstRate",parseInt(e.target.value))}
                            className="w-full font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-brand-500">
                            {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider block">Qty</label>
                          <input type="number" min="1" value={item.qty} onChange={e => updateItem(item.id,"qty",parseFloat(e.target.value)||0)}
                            className="w-full font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-brand-500" />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase tracking-wider block">Rate (Rs.)</label>
                          <input type="number" min="0" value={item.rate} onChange={e => updateItem(item.id,"rate",parseFloat(e.target.value)||0)}
                            className="w-full font-mono font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-brand-500" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                        <span className="text-[11px] text-slate-400">Line Total</span>
                        <span className="font-black font-mono text-slate-900 text-sm">Rs.{fmt(lineTotal)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: Table view */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-[11px] font-mono uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3 w-6">#</th>
                      <th className="py-2.5 px-3 min-w-[180px]">Description</th>
                      <th className="py-2.5 px-3 w-20">HSN/SAC</th>
                      <th className="py-2.5 px-3 w-14 text-center">Qty</th>
                      <th className="py-2.5 px-3 w-24 text-right">Rate (Rs.)</th>
                      <th className="py-2.5 px-3 w-18 text-center">GST%</th>
                      <th className="py-2.5 px-3 w-28 text-right">Amount (Rs.)</th>
                      <th className="py-2.5 px-3 w-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, idx) => {
                      const lineTotal = item.qty * item.rate * (1-(item.discount||0)/100);
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{idx+1}</td>
                          <td className="py-2.5 px-3">
                            <input value={item.description} onChange={e => updateItem(item.id,"description",e.target.value)}
                              className="w-full font-semibold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none" />
                          </td>
                          <td className="py-2.5 px-3">
                            <input value={item.hsn} onChange={e => updateItem(item.id,"hsn",e.target.value)}
                              className="w-full font-mono text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none" />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <input type="number" min="1" value={item.qty} onChange={e => updateItem(item.id,"qty",parseFloat(e.target.value)||0)}
                              className="w-12 text-center font-mono text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none" />
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <input type="number" min="0" value={item.rate} onChange={e => updateItem(item.id,"rate",parseFloat(e.target.value)||0)}
                              className="w-24 text-right font-mono font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:outline-none" />
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <select value={item.gstRate} onChange={e => updateItem(item.id,"gstRate",parseInt(e.target.value))}
                              className="font-mono text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 focus:outline-none">
                              {GST_RATES.map(r => <option key={r} value={r}>{r}%</option>)}
                            </select>
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">Rs.{fmt(lineTotal)}</td>
                          <td className="py-2.5 px-3">
                            <button onClick={() => removeItem(item.id)} disabled={items.length <= 1}
                              className="text-slate-300 hover:text-red-500 disabled:opacity-30 cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ── Tax Summary Card ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden mb-4">
              <div className="px-4 py-3.5 bg-slate-50 border-b border-slate-200">
                <span className="font-bold text-slate-800 text-sm flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-brand-600" /> Tax Summary
                </span>
              </div>
              <div className="p-4 space-y-2 text-sm font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal (Gross)</span><span>Rs.{fmt(totals.subtotal)}</span>
                </div>
                {totals.totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span><span>-Rs.{fmt(totals.totalDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-slate-800 pt-2 border-t border-slate-100">
                  <span>Taxable Value</span><span>Rs.{fmt(totals.taxable)}</span>
                </div>
                {isIntraState ? (
                  <>
                    <div className="flex justify-between text-slate-500">
                      <span>CGST</span><span>Rs.{fmt(totals.cgst)}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>SGST</span><span>Rs.{fmt(totals.sgst)}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-slate-500">
                    <span>IGST</span><span>Rs.{fmt(totals.igst)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 text-xs">
                  <span>Round Off</span>
                  <span>{Number(totals.roundOff) >= 0 ? `+Rs.${totals.roundOff}` : `-Rs.${Math.abs(totals.roundOff)}`}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                  <span className="font-sans text-base">Grand Total</span>
                  <span className="text-brand-700">Rs.{totals.grandTotal.toLocaleString("en-IN")}</span>
                </div>
                <p className="text-[11px] text-slate-500 italic leading-relaxed pt-1">
                  {numberToWordsINR(totals.grandTotal)}
                </p>
              </div>
            </div>

            {/* ── Printable A4 Invoice Preview ── */}
            <div className="print-area bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              {/* Invoice Header */}
              <div className="bg-slate-900 px-6 py-5 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">Original For Recipient</div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">TAX INVOICE</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Rule 46 of CGST Rules, 2017</div>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold font-mono ${isIntraState ? "bg-blue-500/20 text-blue-300 border border-blue-500/40" : "bg-amber-500/20 text-amber-300 border border-amber-500/40"}`}>
                    {isIntraState ? "Intra-State · CGST + SGST" : "Inter-State · IGST"}
                  </div>
                  <div className="text-slate-300 font-mono text-sm font-bold mt-2">{invoice.number}</div>
                  <div className="text-slate-500 text-xs mt-0.5">Date: {invoice.date}</div>
                  <div className="text-slate-500 text-xs">Due: {invoice.dueDate}</div>
                </div>
              </div>

              {/* Parties */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-b border-slate-200">
                <div className="p-5 border-b sm:border-b-0 sm:border-r border-slate-200">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Billed By</div>
                  <div className="font-black text-slate-900 text-base leading-tight">{seller.name}</div>
                  <div className="font-mono text-xs text-brand-700 font-bold mt-1">GSTIN: {seller.gstin}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{seller.address}, {seller.city}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{seller.phone} · {seller.email}</div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">Billed To</div>
                  <div className="font-black text-slate-900 text-base leading-tight">{buyer.name}</div>
                  <div className="font-mono text-xs text-slate-600 font-bold mt-1">GSTIN: {buyer.gstin}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{buyer.address}, {buyer.city}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Place of Supply: {INDIAN_STATES.find(s=>s.code===buyer.stateCode)?.name} ({buyer.stateCode})</div>
                </div>
              </div>

              {/* Items Table – print preview */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-2.5 px-3 text-left">#</th>
                      <th className="py-2.5 px-3 text-left">Description</th>
                      <th className="py-2.5 px-3 text-left">HSN</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Rate</th>
                      <th className="py-2.5 px-3 text-center">GST</th>
                      <th className="py-2.5 px-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item, i) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-mono text-slate-400">{i+1}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{item.description}</td>
                        <td className="py-2.5 px-3 font-mono text-slate-500">{item.hsn}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{item.qty}</td>
                        <td className="py-2.5 px-3 text-right font-mono">Rs.{fmt(item.rate)}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-slate-600">{item.gstRate}%</td>
                        <td className="py-2.5 px-3 text-right font-mono font-black text-slate-900">
                          Rs.{fmt(item.qty * item.rate * (1-(item.discount||0)/100))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer grid: bank + totals */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t-2 border-slate-900">
                <div className="p-5 border-b sm:border-b-0 sm:border-r border-slate-200 text-xs space-y-3">
                  {/* Amount in Words */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Amount in Words</div>
                    <p className="font-bold text-slate-800 italic leading-relaxed">{numberToWordsINR(totals.grandTotal)}</p>
                  </div>
                  {/* Bank */}
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">Bank Details</div>
                    <div className="space-y-1 text-[11px] font-mono">
                      <div className="flex gap-2"><span className="text-slate-400 w-20 shrink-0">Bank:</span><span className="font-bold text-slate-800">{bank.bankName}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-20 shrink-0">A/c No:</span><span className="font-bold text-slate-800">{bank.accountNo}</span></div>
                      <div className="flex gap-2"><span className="text-slate-400 w-20 shrink-0">IFSC:</span><span className="font-bold text-slate-800">{bank.ifsc}</span></div>
                      {bank.upiId && <div className="flex gap-2"><span className="text-slate-400 w-20 shrink-0">UPI:</span><span className="font-bold text-emerald-700">{bank.upiId}</span></div>}
                    </div>
                  </div>
                  {/* Notes */}
                  {notes && (
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5">Terms</div>
                      <p className="text-[11px] text-slate-500 leading-relaxed whitespace-pre-line">{notes}</p>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="p-5 text-xs font-mono space-y-2">
                  <div className="flex justify-between text-slate-500"><span>Subtotal</span><span>Rs.{fmt(totals.subtotal)}</span></div>
                  {totals.totalDiscount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount</span><span>-Rs.{fmt(totals.totalDiscount)}</span></div>}
                  <div className="flex justify-between font-bold text-slate-800 border-t border-slate-100 pt-2"><span>Taxable Value</span><span>Rs.{fmt(totals.taxable)}</span></div>
                  {isIntraState ? (
                    <>
                      <div className="flex justify-between text-slate-500"><span>CGST</span><span>Rs.{fmt(totals.cgst)}</span></div>
                      <div className="flex justify-between text-slate-500"><span>SGST</span><span>Rs.{fmt(totals.sgst)}</span></div>
                    </>
                  ) : (
                    <div className="flex justify-between text-slate-500"><span>IGST</span><span>Rs.{fmt(totals.igst)}</span></div>
                  )}
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Round Off</span>
                    <span>{Number(totals.roundOff)>=0?`+Rs.${totals.roundOff}`:`-Rs.${Math.abs(totals.roundOff)}`}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                    <span className="font-sans text-sm">Grand Total</span>
                    <span className="text-brand-700 text-xl">Rs.{totals.grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                  {/* Signature */}
                  <div className="pt-10 text-right">
                    <div className="inline-block text-center">
                      <div className="h-10 border-b border-slate-400 w-40 mx-auto mb-1" />
                      <span className="text-[11px] text-slate-600 block">For <strong>{seller.name}</strong></span>
                      <span className="text-[10px] text-slate-400">Authorised Signatory</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lead Magnet Banner ── */}
      <div className="no-print bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 border-t border-brand-500/30 px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mx-auto mb-4">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Outgrowing Manual GST Invoicing?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Manual invoice creation costs growing Indian SMBs 40+ hours per month. Prajyot Infotech builds bespoke cloud ERP &amp; CRM with automated e-invoicing, Tally bridge, WhatsApp PDF dispatch and inventory sync.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button onClick={() => openLeadModal({ projectType: "Custom ERP & Billing Automation" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer min-h-[48px]">
              Get Free ERP Scoping <ArrowRight className="w-4 h-4" />
            </button>
            <a href={`https://wa.me/917020708747?text=${encodeURIComponent("Hi Prajyot Infotech, I used your free GST invoice tool and want to discuss custom automated billing software for our business.")}`}
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

function defSeller() {
  return { name:"Prajyot Infotech", gstin:"27ABCDE1234F1Z5", address:"Shivaji Nagar & FC Road IT Corridor", city:"Pune", stateCode:"27", phone:"+91 70207 08747", email:"billing@prajyotinfotech.in" };
}
function defBank() {
  return { bankName:"HDFC Bank", accountNo:"50200088991122", ifsc:"HDFC0000123", branch:"Shivaji Nagar, Pune", upiId:"prajyotinfotech@okhdfcbank" };
}
