import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  FileText,
  Printer,
  Download,
  Share2,
  Plus,
  Trash2,
  Copy,
  Check,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  HelpCircle,
  MessageSquare,
  RefreshCw,
  QrCode
} from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const INDIAN_STATES = [
  { code: "27", name: "Maharashtra" },
  { code: "29", name: "Karnataka" },
  { code: "07", name: "Delhi" },
  { code: "24", name: "Gujarat" },
  { code: "33", name: "Tamil Nadu" },
  { code: "36", name: "Telangana" },
  { code: "09", name: "Uttar Pradesh" },
  { code: "19", name: "West Bengal" },
  { code: "23", name: "Madhya Pradesh" },
  { code: "08", name: "Rajasthan" },
  { code: "03", name: "Punjab" },
  { code: "06", name: "Haryana" },
  { code: "32", name: "Kerala" },
  { code: "37", name: "Andhra Pradesh" },
  { code: "10", name: "Bihar" },
  { code: "21", name: "Odisha" },
  { code: "30", name: "Goa" },
  { code: "05", name: "Uttarakhand" },
  { code: "02", name: "Himachal Pradesh" },
  { code: "01", name: "Jammu and Kashmir" },
  { code: "18", name: "Assam" },
  { code: "22", name: "Chhattisgarh" },
  { code: "20", name: "Jharkhand" },
  { code: "99", name: "Other Territory / Special Economic Zone" },
];

const GST_RATES = [0, 5, 12, 18, 28];

function numberToWordsINR(num) {
  if (!num || isNaN(num) || num === 0) return "Zero Rupees Only";
  const a = [
    "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ",
    "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function inWords(n) {
    if (n === 0) return "";
    let str = "";
    if (n > 99) {
      str += a[Math.floor(n / 100)] + "Hundred ";
      n %= 100;
    }
    if (n > 19) {
      str += b[Math.floor(n / 10)] + " " + a[n % 10];
    } else {
      str += a[n];
    }
    return str;
  }

  let amount = Math.floor(num);
  let crore = Math.floor(amount / 10000000);
  amount %= 10000000;
  let lakh = Math.floor(amount / 100000);
  amount %= 100000;
  let thousand = Math.floor(amount / 1000);
  amount %= 1000;
  let hundred = amount;

  let words = "";
  if (crore > 0) words += inWords(crore) + "Crore ";
  if (lakh > 0) words += inWords(lakh) + "Lakh ";
  if (thousand > 0) words += inWords(thousand) + "Thousand ";
  if (hundred > 0) words += inWords(hundred);

  return (words.trim() + " Rupees Only");
}

export default function GstInvoiceGenerator() {
  const { openLeadModal } = useLeadModal();
  const [copied, setCopied] = useState(false);

  // Supplier
  const [seller, setSeller] = useState(() => {
    try {
      const saved = localStorage.getItem("pi_gst_seller");
      return saved ? JSON.parse(saved) : {
        name: "Prajyot Infotech",
        gstin: "27ABCDE1234F1Z5",
        address: "Shivaji Nagar & FC Road IT Corridor",
        city: "Pune",
        stateCode: "27",
        phone: "+91 70207 08747",
        email: "billing@prajyotinfotech.in",
      };
    } catch {
      return {
        name: "My Company",
        gstin: "27ABCDE1234F1Z5",
        address: "Commercial Office Park",
        city: "Pune",
        stateCode: "27",
        phone: "+91 98000 00000",
        email: "billing@mycompany.in",
      };
    }
  });

  // Buyer
  const [buyer, setBuyer] = useState({
    name: "Acme Enterprises Pvt Ltd",
    gstin: "27XYZAB9876C1Z3",
    address: "Plot 42, Hinjewadi Phase 1",
    city: "Pune",
    stateCode: "27",
  });

  // Invoice Details
  const [invoice, setInvoice] = useState({
    number: "INV-2026-089",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
    poNumber: "PO-7741",
  });

  // Bank & UPI
  const [bank, setBank] = useState(() => {
    try {
      const saved = localStorage.getItem("pi_gst_bank");
      return saved ? JSON.parse(saved) : {
        bankName: "HDFC Bank",
        accountNo: "50200088991122",
        ifsc: "HDFC0000123",
        branch: "Shivaji Nagar, Pune",
        upiId: "prajyotinfotech@okhdfcbank",
      };
    } catch {
      return {
        bankName: "HDFC Bank",
        accountNo: "50200088991122",
        ifsc: "HDFC0000123",
        branch: "Pune Branch",
        upiId: "mybusiness@upi",
      };
    }
  });

  // Line items
  const [items, setItems] = useState([
    {
      id: "1",
      description: "Custom ERP & CRM Web Portal Architecture",
      hsn: "998314",
      unit: "Nos",
      qty: 1,
      rate: 85000,
      discount: 0,
      gstRate: 18,
    },
    {
      id: "2",
      description: "WhatsApp Business Cloud API Webhook Integration",
      hsn: "998313",
      unit: "Nos",
      qty: 1,
      rate: 15000,
      discount: 0,
      gstRate: 18,
    },
  ]);

  const [notes, setNotes] = useState(
    "1. Payment due within 15 days of invoice date.\n2. 100% intellectual property & source code transferred upon final clearance.\n3. Make payment via NEFT/RTGS or UPI to the account details provided."
  );

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem("pi_gst_seller", JSON.stringify(seller));
      localStorage.setItem("pi_gst_bank", JSON.stringify(bank));
    } catch {}
  }, [seller, bank]);

  const isIntraState = seller.stateCode === buyer.stateCode;

  // Calculations
  const totals = useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let taxable = 0;
    let totalCgst = 0;
    let totalSgst = 0;
    let totalIgst = 0;

    items.forEach((item) => {
      const lineRaw = (Number(item.qty) || 0) * (Number(item.rate) || 0);
      const discAmt = lineRaw * ((Number(item.discount) || 0) / 100);
      const lineTaxable = lineRaw - discAmt;
      const taxRate = Number(item.gstRate) || 0;

      subtotal += lineRaw;
      totalDiscount += discAmt;
      taxable += lineTaxable;

      if (isIntraState) {
        const halfRate = taxRate / 2;
        totalCgst += lineTaxable * (halfRate / 100);
        totalSgst += lineTaxable * (halfRate / 100);
      } else {
        totalIgst += lineTaxable * (taxRate / 100);
      }
    });

    const totalTax = totalCgst + totalSgst + totalIgst;
    const grandTotalExact = taxable + totalTax;
    const grandTotal = Math.round(grandTotalExact);
    const roundOff = (grandTotal - grandTotalExact).toFixed(2);

    return {
      subtotal,
      totalDiscount,
      taxable,
      totalCgst,
      totalSgst,
      totalIgst,
      totalTax,
      roundOff,
      grandTotal,
    };
  }, [items, isIntraState]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: "New Service / Item",
        hsn: "9983",
        unit: "Nos",
        qty: 1,
        rate: 5000,
        discount: 0,
        gstRate: 18,
      },
    ]);
  };

  const updateItem = (id, field, value) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: value } : it)));
  };

  const removeItem = (id) => {
    if (items.length <= 1) return;
    setItems(items.filter((it) => it.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `GST Tax Invoice ${invoice.number} from ${seller.name}\n` +
      `Date: ${invoice.date}\n` +
      `Total Amount: ₹${totals.grandTotal.toLocaleString("en-IN")}\n` +
      `Due Date: ${invoice.dueDate}\n` +
      (bank.upiId ? `Pay via UPI: ${bank.upiId}\n` : "") +
      `\nGenerated with Prajyot Infotech Free GST Utility:\nhttps://www.prajyotinfotech.in/tools/gst-invoice-generator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const copySummary = () => {
    const summary =
      `Invoice #: ${invoice.number}\n` +
      `Seller: ${seller.name} (GSTIN: ${seller.gstin})\n` +
      `Buyer: ${buyer.name} (GSTIN: ${buyer.gstin})\n` +
      `Taxable Value: ₹${totals.taxable.toLocaleString("en-IN")}\n` +
      `Grand Total: ₹${totals.grandTotal.toLocaleString("en-IN")}\n` +
      `Amount in words: ${numberToWordsINR(totals.grandTotal)}`;

    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/gst-invoice-generator";

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free GST Invoice Generator Online India",
    "url": pageUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "description": "Free, browser-based Indian GST invoice maker. Automatic CGST, SGST, IGST calculations, HSN/SAC code tracking, amount in words conversion, instant PDF printing, and WhatsApp share."
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/services" },
          { name: "GST Invoice Generator", url: pageUrl }
        ]}
      />

      <Seo
        title="Free GST Invoice Generator Online (India) — 100% Free PDF Maker | Prajyot Infotech"
        description="Create professional, 100% GST-compliant invoices online for free. Automatic CGST, SGST, IGST calculations, HSN code support, instant PDF download & WhatsApp sharing. No login required."
        keywords="free GST invoice generator online, GST bill maker India, create GST invoice PDF free, GST calculator India, online billing generator for SMB, Prajyot Infotech billing tools"
        path="/tools/gst-invoice-generator"
        schema={[webAppSchema]}
      />

      {/* Embedded Print CSS */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          nav, footer, .no-print, header, .lead-banner {
            display: none !important;
          }
          .print-area {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          .print-area * {
            color: #0f172a !important;
            border-color: #cbd5e1 !important;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header Block - no print */}
        <div className="text-center max-w-3xl mx-auto mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            100% Free · No Signup · GST Compliant India
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Free GST Invoice Generator Online
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Create, download, and print official Indian GST invoices in seconds. Includes automatic intra-state (CGST+SGST) vs inter-state (IGST) tax calculation, HSN codes, and instant WhatsApp dispatch.
          </p>

          {/* Quick Action Toolbar */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF Invoice
            </button>
            <button
              onClick={shareOnWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </button>
            <button
              onClick={copySummary}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy Summary"}
            </button>
          </div>
        </div>

        {/* INVOICE PAPER CONTAINER (White sheet design for realistic preview & print) */}
        <div className="print-area bg-white text-slate-900 rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-200 mb-12">
          {/* Top Bar: Invoice Title & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-700 block">
                Original For Recipient · Tax Invoice
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                TAX INVOICE
              </h2>
            </div>
            <div className="text-right">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-bold font-mono bg-slate-100 text-slate-800 border border-slate-300">
                {isIntraState ? "Intra-State (CGST + SGST)" : "Inter-State (IGST)"}
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                Rule 46 of CGST Rules, 2017
              </div>
            </div>
          </div>

          {/* Supplier & Buyer Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-200 text-xs sm:text-sm">
            {/* Supplier / Seller (Editable) */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Billed By (Supplier Details):
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  value={seller.name}
                  onChange={(e) => setSeller({ ...seller, name: e.target.value })}
                  placeholder="Your Business Name"
                  className="w-full font-bold text-base text-slate-900 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none pb-1"
                />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600 shrink-0">GSTIN:</span>
                  <input
                    type="text"
                    value={seller.gstin}
                    onChange={(e) => setSeller({ ...seller, gstin: e.target.value.toUpperCase() })}
                    placeholder="15-digit GSTIN"
                    maxLength={15}
                    className="w-full font-mono font-semibold text-slate-900 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={seller.address}
                  onChange={(e) => setSeller({ ...seller, address: e.target.value })}
                  placeholder="Office / Shop Address"
                  className="w-full text-slate-700 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={seller.city}
                    onChange={(e) => setSeller({ ...seller, city: e.target.value })}
                    placeholder="City"
                    className="w-full text-slate-700 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  />
                  <select
                    value={seller.stateCode}
                    onChange={(e) => setSeller({ ...seller, stateCode: e.target.value })}
                    className="w-full text-slate-700 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.code} - {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <input
                    type="text"
                    value={seller.phone}
                    onChange={(e) => setSeller({ ...seller, phone: e.target.value })}
                    placeholder="Phone"
                    className="w-full text-slate-600 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  />
                  <input
                    type="text"
                    value={seller.email}
                    onChange={(e) => setSeller({ ...seller, email: e.target.value })}
                    placeholder="Email"
                    className="w-full text-slate-600 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Buyer / Client (Editable) */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
                Billed To (Client / Buyer Details):
              </span>
              <div className="space-y-2">
                <input
                  type="text"
                  value={buyer.name}
                  onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                  placeholder="Client / Company Name"
                  className="w-full font-bold text-base text-slate-900 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none pb-1"
                />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600 shrink-0">GSTIN:</span>
                  <input
                    type="text"
                    value={buyer.gstin}
                    onChange={(e) => setBuyer({ ...buyer, gstin: e.target.value.toUpperCase() })}
                    placeholder="Client GSTIN (or UR if unregistered)"
                    maxLength={15}
                    className="w-full font-mono font-semibold text-slate-900 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={buyer.address}
                  onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
                  placeholder="Client Delivery / Billing Address"
                  className="w-full text-slate-700 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={buyer.city}
                    onChange={(e) => setBuyer({ ...buyer, city: e.target.value })}
                    placeholder="City"
                    className="w-full text-slate-700 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  />
                  <select
                    value={buyer.stateCode}
                    onChange={(e) => setBuyer({ ...buyer, stateCode: e.target.value })}
                    className="w-full text-slate-700 bg-transparent border-b border-slate-300 focus:border-brand-600 focus:outline-none"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.code} - {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-[11px] text-slate-500 pt-2 font-mono">
                  Place of Supply: {INDIAN_STATES.find((s) => s.code === buyer.stateCode)?.name || "Maharashtra"} ({buyer.stateCode})
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-100/70 border border-slate-200 mb-8 text-xs font-mono">
            <div>
              <span className="text-slate-500 block">Invoice Number:</span>
              <input
                type="text"
                value={invoice.number}
                onChange={(e) => setInvoice({ ...invoice, number: e.target.value })}
                className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-slate-500 block">Invoice Date:</span>
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-slate-500 block">Due Date:</span>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-slate-500 block">PO / Ref Number:</span>
              <input
                type="text"
                value={invoice.poNumber}
                onChange={(e) => setInvoice({ ...invoice, poNumber: e.target.value })}
                className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 bg-slate-100 text-slate-800 text-[11px] font-mono uppercase tracking-wider">
                  <th className="py-3 px-2 w-8">#</th>
                  <th className="py-3 px-2 min-w-[200px]">Item & Description</th>
                  <th className="py-3 px-2 w-24">HSN/SAC</th>
                  <th className="py-3 px-2 w-16 text-center">Qty</th>
                  <th className="py-3 px-2 w-24 text-right">Rate (₹)</th>
                  <th className="py-3 px-2 w-20 text-center">GST %</th>
                  <th className="py-3 px-2 w-28 text-right">Amount (₹)</th>
                  <th className="py-3 px-2 w-8 no-print"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.map((item, index) => {
                  const lineTotal = item.qty * item.rate * (1 - (item.discount || 0) / 100);
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-2 font-mono text-slate-500">{index + 1}</td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          className="w-full font-semibold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-600 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-2">
                        <input
                          type="text"
                          value={item.hsn}
                          onChange={(e) => updateItem(item.id, "hsn", e.target.value)}
                          className="w-full font-mono text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-600 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, "qty", parseFloat(e.target.value) || 0)}
                          className="w-14 text-center font-mono text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-600 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-2 text-right">
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                          className="w-24 text-right font-mono font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-600 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <select
                          value={item.gstRate}
                          onChange={(e) => updateItem(item.id, "gstRate", parseInt(e.target.value))}
                          className="text-xs font-mono font-bold text-slate-800 bg-transparent border border-slate-300 rounded px-1.5 py-0.5 focus:outline-none"
                        >
                          {GST_RATES.map((rate) => (
                            <option key={rate} value={rate}>
                              {rate}%
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-2 text-right font-mono font-black text-slate-900">
                        ₹{lineTotal.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-2 text-center no-print">
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={items.length <= 1}
                          className="text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add Row Button - no print */}
          <div className="mb-8 no-print">
            <button
              onClick={addItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-brand-600" />
              Add Another Line Item
            </button>
          </div>

          {/* Summary & Bank Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t-2 border-slate-900">
            {/* Left: Bank Details & Amount in Words */}
            <div className="space-y-4 text-xs">
              <div>
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[11px] mb-1">
                  Total Amount in Words:
                </span>
                <p className="font-bold text-slate-900 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {numberToWordsINR(totals.grandTotal)}
                </p>
              </div>

              {/* Bank Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-mono font-bold uppercase tracking-wider text-slate-700 block text-[11px] mb-2">
                  Bank Transfer / UPI Details:
                </span>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500">Bank Name:</span>
                  <input
                    type="text"
                    value={bank.bankName}
                    onChange={(e) => setBank({ ...bank, bankName: e.target.value })}
                    className="col-span-2 font-semibold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500">Account No:</span>
                  <input
                    type="text"
                    value={bank.accountNo}
                    onChange={(e) => setBank({ ...bank, accountNo: e.target.value })}
                    className="col-span-2 font-mono font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500">IFSC Code:</span>
                  <input
                    type="text"
                    value={bank.ifsc}
                    onChange={(e) => setBank({ ...bank, ifsc: e.target.value.toUpperCase() })}
                    className="col-span-2 font-mono font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-500">UPI VPA:</span>
                  <input
                    type="text"
                    value={bank.upiId}
                    onChange={(e) => setBank({ ...bank, upiId: e.target.value })}
                    className="col-span-2 font-mono font-bold text-emerald-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <span className="font-mono text-slate-500 uppercase tracking-wider block text-[11px] mb-1">
                  Terms & Conditions:
                </span>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Right: Tax Breakdown & Grand Total */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-2.5 font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal (Gross):</span>
                <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {totals.totalDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span>-₹{totals.totalDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Taxable Value:</span>
                <span>₹{totals.taxable.toLocaleString("en-IN")}</span>
              </div>

              {/* Tax Breakdowns */}
              {isIntraState ? (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Central GST (CGST):</span>
                    <span>₹{totals.totalCgst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>State GST (SGST):</span>
                    <span>₹{totals.totalSgst.toLocaleString("en-IN")}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-slate-600">
                  <span>Integrated GST (IGST):</span>
                  <span>₹{totals.totalIgst.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-500 text-xs">
                <span>Round Off:</span>
                <span>{totals.roundOff >= 0 ? `+₹${totals.roundOff}` : `-₹${Math.abs(totals.roundOff)}`}</span>
              </div>

              <div className="flex justify-between items-center text-lg sm:text-xl font-black text-slate-900 pt-3 border-t-2 border-slate-900">
                <span className="font-sans">Grand Total:</span>
                <span className="text-brand-700">₹{totals.grandTotal.toLocaleString("en-IN")}</span>
              </div>

              {/* Signature Stamp Box */}
              <div className="pt-12 text-right">
                <div className="inline-block text-center">
                  <div className="h-10 border-b border-slate-400 w-44 mx-auto mb-1"></div>
                  <span className="text-[11px] text-slate-600 font-sans block">
                    For <strong>{seller.name}</strong>
                  </span>
                  <span className="text-[10px] text-slate-400 font-sans">
                    Authorised Signatory
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEAD MAGNET & ERP UPGRADE BANNER (No print) */}
        <div className="no-print p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-950 border border-brand-500/40 text-center shadow-2xl relative overflow-hidden mb-16">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 mx-auto mb-4">
            <Building2 className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Outgrowing Manual GST Invoicing? Automate with Custom ERP
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Manual invoice creation costs growing Indian SMBs 40+ hours per month. Prajyot Infotech builds bespoke cloud ERP &amp; CRM systems with automated e-invoicing, Tally bridge, WhatsApp PDF dispatch, and inventory sync.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openLeadModal({ projectType: "Custom ERP & Billing Automation Inquiry" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-600/30 transition-all cursor-pointer"
            >
              <span>Get Custom ERP Scoping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/917020708747?text=${encodeURIComponent("Hi Prajyot Infotech, I used your free GST invoice tool and want to discuss custom automated billing software for our business.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

