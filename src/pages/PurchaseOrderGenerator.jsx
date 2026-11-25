import React, { useState, useMemo } from "react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import { Printer, Share2, Plus, Trash2, Eye, PenLine, Sparkles, ArrowRight } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";

function fmt(n) { return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
const inputCls = "w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40";

const FAQS = [
  {
    q: "When should a business issue a Purchase Order vs a Delivery Challan?",
    a: "A Purchase Order (PO) is sent by a buyer to a supplier authorizing quantities, agreed unit pricing, and delivery timelines. A Delivery Challan accompanies physical stock movement during transit or job-work prior to raising a final GST tax invoice.",
  },
  {
    q: "Does a Delivery Challan require prices and GST?",
    a: "If moving goods for job work or inter-branch transfer under Rule 55 of CGST Rules, Challans must mention HSN code, quantity, and approximate taxable value. Switch the toggle below between PO and Challan anytime.",
  },
];

export default function PurchaseOrderGenerator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [tab, setTab] = useState("form");
  const [docType, setDocType] = useState("PURCHASE ORDER");

  const [buyer, setBuyer] = useState({ name: "Apex Engineering Works", gstin: "27ABCDE1234F1Z5", address: "Plot 14, Bhosari MIDC Sector 7, Pune" });
  const [vendor, setVendor] = useState({ name: "Bharat Industrial Steels", gstin: "27XYZAB9988K1Z2", address: "Chakan Industrial Area Phase 2, Pune" });
  const [meta, setMeta] = useState({
    docNo: "PO-2026-412",
    date: new Date().toISOString().split("T")[0],
    deliveryDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    vehicleNo: "MH-12-TR-4521",
    shipTo: "Gate 2 Receiving Bay, Bhosari Plant",
  });
  const [items, setItems] = useState([
    { id: "1", desc: "MS Bright Bars 25mm Grade EN8", hsn: "7214", qty: 250, unit: "Kg", rate: 78, gst: 18 },
    { id: "2", desc: "CNC Carbide Milling Inserts (Box of 10)", hsn: "8209", qty: 5, unit: "Box", rate: 2800, gst: 18 },
  ]);

  const totals = useMemo(() => {
    let sub = 0, tax = 0;
    items.forEach((it) => {
      const r = (Number(it.qty) || 0) * (Number(it.rate) || 0);
      sub += r;
      tax += (r * (Number(it.gst) || 0)) / 100;
    });
    return { sub, tax, grand: Math.round(sub + tax) };
  }, [items]);

  const addRow = () => setItems((p) => [...p, { id: Date.now().toString(), desc: "Material / Part", hsn: "8481", qty: 1, unit: "Nos", rate: 1000, gst: 18 }]);
  const updateRow = (id, k, v) => setItems((p) => p.map((it) => (it.id === id ? { ...it, [k]: v } : it)));
  const removeRow = (id) => items.length > 1 && setItems((p) => p.filter((it) => it.id !== id));

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `*${docType} ${meta.docNo}*\nFrom: ${buyer.name}\nTo Vendor: ${vendor.name}\nShip To: ${meta.shipTo}\nTotal Value: ₹${totals.grand.toLocaleString("en-IN")}\nExpected Date: ${meta.deliveryDate}\n\nCreated free at https://www.prajyotinfotech.in/tools/purchase-order-generator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/purchase-order-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Purchase Order (PO) & Delivery Challan Generator India",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Generate GST-ready Purchase Orders (PO) and Delivery Challans in A4 PDF format free with instant WhatsApp vendor sharing.",
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "Purchase Order & Challan Maker", url: pageUrl },
        ]}
      />
      <Seo
        title="Free Purchase Order (PO) & Delivery Challan Generator PDF India | Prajyot Infotech"
        description="Create A4 Purchase Orders and Rule-55 Delivery Challans online for free. Built for Indian manufacturers, traders, and contractors with HSN tracking and WhatsApp export."
        keywords="free purchase order generator india, delivery challan format pdf maker, online po generator for manufacturing, gst challan maker"
        path="/tools/purchase-order-generator"
        image="/og/og-purchase-order.jpg"
        schema={schema}
      />

      <style>{`
        @page { size: A4; margin: 10mm; }
        @media print {
          nav, footer, .no-print, button[aria-label="Request Consultation"], button[aria-label="Open AI Architect"] { display: none !important; }
          body { background: #fff !important; }
          .print-area { display: block !important; box-shadow: none !important; border: 1px solid #cbd5e1 !important; border-radius: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* Hero */}
      <div className="bg-slate-900 text-white py-8 px-4 no-print border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Free B2B &amp; Factory Procurement Tool
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Purchase Order &amp; Delivery Challan Maker</h1>
            <p className="text-slate-300 text-sm mt-1">Switch between PO and Delivery Challan in 1 click. Instant A4 PDF &amp; WhatsApp vendor dispatch.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button type="button" onClick={shareWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> Send to Vendor
            </button>
          </div>
        </div>

        <div className="lg:hidden max-w-7xl mx-auto mt-5 grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800">
          <button type="button" onClick={() => setTab("form")} className={`py-2.5 rounded-lg text-xs font-bold cursor-pointer ${tab === "form" ? "bg-brand-600 text-white" : "text-slate-300"}`}>
            <PenLine className="w-3.5 h-3.5 inline mr-1" /> Edit Order
          </button>
          <button type="button" onClick={() => setTab("preview")} className={`py-2.5 rounded-lg text-xs font-bold cursor-pointer ${tab === "preview" ? "bg-brand-600 text-white" : "text-slate-300"}`}>
            <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview A4
          </button>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 no-print bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">{docType === "PURCHASE ORDER" ? "PO Value" : "Dispatch Value"}</div>
            <div className="text-lg font-black text-white font-mono">₹{totals.grand.toLocaleString("en-IN")}</div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setTab(tab === "form" ? "preview" : "form")} className="px-3 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              {tab === "form" ? "Preview" : "Edit"}
            </button>
            <button type="button" onClick={() => window.print()} className="px-3.5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">PDF</button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Editor */}
          <div className={`lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 no-print ${tab === "preview" ? "hidden lg:block" : "block"}`}>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-100">
              {["PURCHASE ORDER", "DELIVERY CHALLAN"].map((t) => (
                <button key={t} type="button" onClick={() => setDocType(t)}
                  className={`py-2 rounded-lg text-xs font-bold cursor-pointer ${docType === t ? "bg-brand-600 text-white" : "text-slate-600"}`}>
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Doc No.</label><input className={inputCls + " font-mono"} value={meta.docNo} onChange={(e) => setMeta((p) => ({ ...p, docNo: e.target.value }))} /></div>
              <div><label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Issue Date</label><input type="date" className={inputCls} value={meta.date} onChange={(e) => setMeta((p) => ({ ...p, date: e.target.value }))} /></div>
              <div><label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Delivery Date</label><input type="date" className={inputCls} value={meta.deliveryDate} onChange={(e) => setMeta((p) => ({ ...p, deliveryDate: e.target.value }))} /></div>
              <div><label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Vehicle / Transport</label><input className={inputCls + " font-mono"} value={meta.vehicleNo} onChange={(e) => setMeta((p) => ({ ...p, vehicleNo: e.target.value }))} /></div>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-500">Issuing Company (You)</div>
              <input className={inputCls} value={buyer.name} onChange={(e) => setBuyer((p) => ({ ...p, name: e.target.value }))} placeholder="Company Name" />
              <input className={inputCls} value={buyer.address} onChange={(e) => setBuyer((p) => ({ ...p, address: e.target.value }))} placeholder="Address" />
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold uppercase text-slate-500">{docType === "PURCHASE ORDER" ? "Supplier / Vendor" : "Consignee / Receiver"}</div>
              <input className={inputCls} value={vendor.name} onChange={(e) => setVendor((p) => ({ ...p, name: e.target.value }))} placeholder="Vendor Name" />
              <input className={inputCls} value={vendor.address} onChange={(e) => setVendor((p) => ({ ...p, address: e.target.value }))} placeholder="Address" />
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="text-xs font-bold uppercase text-slate-500">Material / Line Items</div>
              {items.map((it) => (
                <div key={it.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex gap-2">
                    <input value={it.desc} onChange={(e) => updateRow(it.id, "desc", e.target.value)} className={inputCls + " font-semibold"} />
                    <button type="button" onClick={() => removeRow(it.id)} disabled={items.length <= 1} className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <input value={it.hsn} onChange={(e) => updateRow(it.id, "hsn", e.target.value)} className={inputCls + " font-mono text-xs"} placeholder="HSN" />
                    <input type="number" value={it.qty} onChange={(e) => updateRow(it.id, "qty", e.target.value)} className={inputCls + " font-mono text-xs"} placeholder="Qty" />
                    <input type="number" value={it.rate} onChange={(e) => updateRow(it.id, "rate", e.target.value)} className={inputCls + " font-mono text-xs"} placeholder="Rate" />
                    <input type="number" value={it.gst} onChange={(e) => updateRow(it.id, "gst", e.target.value)} className={inputCls + " font-mono text-xs"} placeholder="GST%" />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addRow} className="w-full py-2.5 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50/50 text-brand-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer min-h-[42px]">
                <Plus className="w-4 h-4" /> Add Item Row
              </button>
            </div>
          </div>

          {/* Right A4 Print Sheet */}
          <div className={`lg:col-span-7 ${tab === "form" ? "hidden lg:block print:block" : "block"}`}>
            <div className="print-area bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-slate-900">
              <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">{buyer.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{buyer.address}</p>
                  <p className="text-xs font-mono text-slate-300 mt-0.5">GSTIN: {buyer.gstin}</p>
                </div>
                <div className="sm:text-right">
                  <div className="inline-block px-2.5 py-1 rounded bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-mono font-bold">{docType}</div>
                  <div className="text-lg font-black font-mono mt-1.5">{meta.docNo}</div>
                  <div className="text-xs text-slate-400 font-mono">Date: {meta.date}</div>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-slate-200 bg-slate-50/70 text-xs">
                <div>
                  <span className="text-slate-400 uppercase font-mono text-[10px] block mb-1">
                    {docType === "PURCHASE ORDER" ? "To Vendor / Supplier" : "Delivered To"}
                  </span>
                  <div className="font-bold text-sm text-slate-900">{vendor.name}</div>
                  <div className="text-slate-600 mt-0.5">{vendor.address}</div>
                  <div className="font-mono text-slate-500 mt-0.5">GSTIN: {vendor.gstin}</div>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-mono text-[10px] block mb-1">Dispatch &amp; Delivery Location</span>
                  <div className="font-semibold text-slate-800">{meta.shipTo}</div>
                  <div className="text-slate-600 mt-0.5 font-mono">Due / Dispatch: {meta.deliveryDate}</div>
                  <div className="text-slate-600 font-mono">Vehicle No: {meta.vehicleNo}</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase border-b border-slate-200">
                      <th className="py-3 px-4 text-left">#</th>
                      <th className="py-3 px-3 text-left">Material Description</th>
                      <th className="py-3 px-3 text-left">HSN</th>
                      <th className="py-3 px-3 text-center">Qty</th>
                      <th className="py-3 px-3 text-right">Rate</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((it, idx) => (
                      <tr key={it.id}>
                        <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3 px-3 font-semibold">{it.desc}</td>
                        <td className="py-3 px-3 font-mono text-slate-500">{it.hsn}</td>
                        <td className="py-3 px-3 text-center font-mono">{it.qty} {it.unit}</td>
                        <td className="py-3 px-3 text-right font-mono">₹{fmt(it.rate)}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold">₹{fmt((Number(it.qty) || 0) * (Number(it.rate) || 0))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-5 sm:p-6 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 bg-slate-50/50">
                <div className="text-xs font-mono space-y-1">
                  <div className="text-slate-600">Taxable Subtotal: ₹{fmt(totals.sub)}</div>
                  <div className="text-slate-600">Est. GST: ₹{fmt(totals.tax)}</div>
                  <div className="text-lg font-black text-brand-700 pt-1">Total Value: ₹{totals.grand.toLocaleString("en-IN")}</div>
                </div>
                <div className="text-right self-end">
                  <div className="h-9 border-b border-slate-400 w-40 mb-1" />
                  <span className="text-[11px] text-slate-600">Authorised Signatory ({buyer.name})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industrial ERP CTA */}
      <div className="no-print bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Automate Plant Procurement, GRN &amp; Tally Sync
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Prajyot Infotech engineers custom Manufacturing &amp; Wholesale ERP software linking Purchase Orders -&gt; Gate GRN -&gt; Barcode Stock -&gt; Tally XML vouchers.
          </p>
          <button type="button" onClick={() => openLeadModal({ projectType: "Manufacturing Procurement & Inventory ERP" })}
            className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer min-h-[48px]">
            Schedule Plant ERP Demo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <ToolSeoFaq heading="Purchase Order & Challan FAQs" faqs={FAQS} />
    </div>
  );
}

