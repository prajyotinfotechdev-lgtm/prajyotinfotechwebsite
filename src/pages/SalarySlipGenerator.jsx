import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import { Printer, Share2, Copy, Check, Eye, PenLine, Sparkles, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";
import { getOibuzRegisterUrl, trackOibuzTrialClick } from "../utils/oibuzLinks.js";

function numToWords(num) {
  if (!num || num <= 0) return "Zero Rupees Only";
  const a = ["","One ","Two ","Three ","Four ","Five ","Six ","Seven ","Eight ","Nine ","Ten ",
    "Eleven ","Twelve ","Thirteen ","Fourteen ","Fifteen ","Sixteen ","Seventeen ","Eighteen ","Nineteen "];
  const b = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  const inW = (n) => (n === 0 ? "" : n > 99 ? a[Math.floor(n/100)] + "Hundred " + inW(n%100) : n > 19 ? b[Math.floor(n/10)] + " " + a[n%10] : a[n]);
  let am = Math.floor(num);
  const cr = Math.floor(am/1e7); am %= 1e7;
  const lk = Math.floor(am/1e5); am %= 1e5;
  const th = Math.floor(am/1e3); am %= 1e3;
  let w = "";
  if (cr) w += inW(cr)+"Crore ";
  if (lk) w += inW(lk)+"Lakh ";
  if (th) w += inW(th)+"Thousand ";
  if (am) w += inW(am);
  return w.trim() + " Rupees Only";
}

function fmt(n) { return Number(n || 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

const inputCls = "w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40";

const FAQS = [
  {
    q: "What details should an official Indian salary slip include?",
    a: "A standard Indian employee payslip lists employer name & address, pay period, employee ID/designation, PAN/UAN, days worked vs LOP, itemized earnings (Basic, HRA, Allowances), itemized deductions (PF, Professional Tax, TDS), and Net Pay in numbers and words.",
  },
  {
    q: "Are salary slips useful for employee loans, visas, and rental applications?",
    a: "Yes. Banks and landlords typically request the last 3 months' stamped or digitally verified salary slips along with bank statement credits.",
  },
  {
    q: "Is employee payroll information stored on your servers?",
    a: "Never. All salary slip formatting and net pay math executes strictly in your local browser session.",
  },
];

export default function SalarySlipGenerator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [tab, setTab] = useState("form");
  const [copied, setCopied] = useState(false);

  const [emp, setEmp] = useState({
    company: "Acme Digital Solutions Pvt Ltd",
    address: "Kharadi IT Park, Pune, Maharashtra",
    month: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    name: "Rohan Patil",
    empId: "EMP-1042",
    designation: "Senior Full-Stack Engineer",
    pan: "ABCDE1234F",
    uan: "101234567890",
    paidDays: 30,
    lopDays: 0,
    basic: 32000,
    hra: 16000,
    special: 12000,
    bonus: 0,
    pf: 1800,
    pt: 200,
    tds: 1500,
  });

  const calc = useMemo(() => {
    const gross = (Number(emp.basic) || 0) + (Number(emp.hra) || 0) + (Number(emp.special) || 0) + (Number(emp.bonus) || 0);
    const ded = (Number(emp.pf) || 0) + (Number(emp.pt) || 0) + (Number(emp.tds) || 0);
    const net = Math.max(0, gross - ded);
    return { gross, ded, net };
  }, [emp]);

  const set = (k) => (e) => setEmp((p) => ({ ...p, [k]: e.target.value }));

  const shareWhatsApp = () => {
    const text = encodeURIComponent(
      `Payslip for ${emp.month}\nEmployee: ${emp.name} (${emp.empId})\nGross Earnings: ₹${fmt(calc.gross)}\nDeductions: ₹${fmt(calc.ded)}\nNet Salary Paid: ₹${Math.round(calc.net).toLocaleString("en-IN")}\n\nGenerated via Prajyot Infotech Free Payslip Maker:\nhttps://www.prajyotinfotech.in/tools/salary-slip-generator`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const copySummary = () => {
    navigator.clipboard?.writeText(`Payslip ${emp.month} | ${emp.name} (${emp.empId}) | Gross: ₹${fmt(calc.gross)} | Deductions: ₹${fmt(calc.ded)} | Net Pay: ₹${fmt(calc.net)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/salary-slip-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Employee Salary Slip Generator India PDF",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Generate professional Indian employee salary slips (payslips) with Basic, HRA, PF, PT, TDS deductions, net pay in words, and A4 PDF print.",
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "Salary Slip Generator", url: pageUrl },
        ]}
      />
      <Seo
        title="Free Salary Slip Generator India (Payslip PDF Maker) | Prajyot Infotech"
        description="Create & download official Indian employee salary slips (payslips) online free. Auto calculates Gross, PF, Professional Tax, TDS & Net Pay in words with A4 PDF export."
        keywords="free salary slip generator india, employee payslip maker pdf, salary slip format india excel pdf, online payslip creator free"
        path="/tools/salary-slip-generator"
        image="/og/og-salary-slip.jpg"
        schema={schema}
      />

      <style>{`
        @page { size: A4; margin: 12mm; }
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Free HR Utility · PF / PT / TDS Ready
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Free Salary Slip (Payslip) Generator</h1>
            <p className="text-slate-300 text-sm mt-1">Generate A4 employee payslips with auto Net Pay calculations &amp; zero signup.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase cursor-pointer min-h-[44px]">
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button type="button" onClick={shareWhatsApp}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase cursor-pointer min-h-[44px]">
              <Share2 className="w-4 h-4" /> WhatsApp Share
            </button>
            <button type="button" onClick={copySummary}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs uppercase cursor-pointer min-h-[44px]">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </div>

        <div className="lg:hidden max-w-7xl mx-auto mt-5 grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-800">
          <button type="button" onClick={() => setTab("form")} className={`py-2.5 rounded-lg text-xs font-bold cursor-pointer ${tab === "form" ? "bg-brand-600 text-white" : "text-slate-300"}`}>
            <PenLine className="w-3.5 h-3.5 inline mr-1" /> Edit Payslip
          </button>
          <button type="button" onClick={() => setTab("preview")} className={`py-2.5 rounded-lg text-xs font-bold cursor-pointer ${tab === "preview" ? "bg-brand-600 text-white" : "text-slate-300"}`}>
            <Eye className="w-3.5 h-3.5 inline mr-1" /> Preview A4
          </button>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 no-print bg-slate-900/95 backdrop-blur-md border-t border-slate-700 px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase">Net Pay</div>
            <div className="text-lg font-black text-emerald-400 font-mono">₹{Math.round(calc.net).toLocaleString("en-IN")}</div>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setTab(tab === "form" ? "preview" : "form")}
              className="px-3 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              {tab === "form" ? "Preview" : "Edit"}
            </button>
            <button type="button" onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs cursor-pointer min-h-[44px]">
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form */}
          <div className={`lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4 no-print ${tab === "preview" ? "hidden lg:block" : "block"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Employer Name</label>
                <input className={inputCls} value={emp.company} onChange={set("company")} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Pay Month</label>
                <input className={inputCls} value={emp.month} onChange={set("month")} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Employee ID</label>
                <input className={inputCls + " font-mono"} value={emp.empId} onChange={set("empId")} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Employee Name</label>
                <input className={inputCls} value={emp.name} onChange={set("name")} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Designation</label>
                <input className={inputCls} value={emp.designation} onChange={set("designation")} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">PAN Number</label>
                <input className={inputCls + " font-mono"} value={emp.pan} onChange={set("pan")} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">UAN Number</label>
                <input className={inputCls + " font-mono"} value={emp.uan} onChange={set("uan")} />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="text-xs font-bold uppercase text-emerald-700 mb-2">Earnings (₹)</div>
              <div className="grid grid-cols-2 gap-2.5">
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">Basic</label><input type="number" className={inputCls + " font-mono"} value={emp.basic} onChange={set("basic")} /></div>
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">HRA</label><input type="number" className={inputCls + " font-mono"} value={emp.hra} onChange={set("hra")} /></div>
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">Special Allowance</label><input type="number" className={inputCls + " font-mono"} value={emp.special} onChange={set("special")} /></div>
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">Bonus / Incentive</label><input type="number" className={inputCls + " font-mono"} value={emp.bonus} onChange={set("bonus")} /></div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <div className="text-xs font-bold uppercase text-rose-700 mb-2">Deductions (₹)</div>
              <div className="grid grid-cols-3 gap-2">
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">EPF</label><input type="number" className={inputCls + " font-mono"} value={emp.pf} onChange={set("pf")} /></div>
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">Prof. Tax</label><input type="number" className={inputCls + " font-mono"} value={emp.pt} onChange={set("pt")} /></div>
                <div><label className="text-[10px] font-bold text-slate-500 block mb-0.5">TDS Tax</label><input type="number" className={inputCls + " font-mono"} value={emp.tds} onChange={set("tds")} /></div>
              </div>
            </div>
          </div>

          {/* Printable A4 Payslip */}
          <div className={`lg:col-span-7 ${tab === "form" ? "hidden lg:block print:block" : "block"}`}>
            <div className="print-area bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-slate-900">
              <div className="bg-slate-900 text-white px-6 py-5 flex flex-wrap justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">{emp.company}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{emp.address}</p>
                </div>
                <div className="sm:text-right">
                  <div className="text-[11px] font-mono uppercase text-brand-300 font-bold">Payslip For Month</div>
                  <div className="text-lg font-black font-mono">{emp.month}</div>
                </div>
              </div>

              <div className="p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-b border-slate-200 bg-slate-50/70 text-xs">
                <div><span className="text-slate-400 block">Employee Name</span><strong className="text-slate-900">{emp.name}</strong></div>
                <div><span className="text-slate-400 block">Employee ID</span><strong className="font-mono">{emp.empId}</strong></div>
                <div><span className="text-slate-400 block">Designation</span><strong>{emp.designation}</strong></div>
                <div><span className="text-slate-400 block">PAN</span><strong className="font-mono">{emp.pan}</strong></div>
                <div><span className="text-slate-400 block">UAN</span><strong className="font-mono">{emp.uan}</strong></div>
                <div><span className="text-slate-400 block">Paid / LOP Days</span><strong className="font-mono">{emp.paidDays} / {emp.lopDays}</strong></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs font-mono">
                <div className="p-5 space-y-2">
                  <div className="font-sans font-bold uppercase text-slate-500 text-[11px] pb-1 border-b border-slate-200">Earnings</div>
                  <div className="flex justify-between"><span>Basic Salary</span><span>₹{fmt(emp.basic)}</span></div>
                  <div className="flex justify-between"><span>House Rent Allowance (HRA)</span><span>₹{fmt(emp.hra)}</span></div>
                  <div className="flex justify-between"><span>Special Allowance</span><span>₹{fmt(emp.special)}</span></div>
                  {Number(emp.bonus) > 0 && <div className="flex justify-between"><span>Bonus / Variable</span><span>₹{fmt(emp.bonus)}</span></div>}
                  <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                    <span>Gross Earnings</span><span>₹{fmt(calc.gross)}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="font-sans font-bold uppercase text-slate-500 text-[11px] pb-1 border-b border-slate-200">Deductions</div>
                  <div className="flex justify-between"><span>Provident Fund (EPF)</span><span>₹{fmt(emp.pf)}</span></div>
                  <div className="flex justify-between"><span>Professional Tax (PT)</span><span>₹{fmt(emp.pt)}</span></div>
                  <div className="flex justify-between"><span>Income Tax (TDS)</span><span>₹{fmt(emp.tds)}</span></div>
                  <div className="flex justify-between font-bold text-rose-700 pt-2 border-t border-slate-200">
                    <span>Total Deductions</span><span>₹{fmt(calc.ded)}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 bg-emerald-50 border-t-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase text-emerald-800">Net Take-Home Pay</div>
                  <div className="text-xs text-slate-700 italic mt-0.5">{numToWords(Math.round(calc.net))}</div>
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-800">
                  ₹{Math.round(calc.net).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HR / ERP CTA */}
      <div className="no-print bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Managing Payroll &amp; Attendance Manually?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Automate GPS attendance, daily-wage calculation, advances, and 1-click PDF salary slips with <strong className="text-white">OIBUZ</strong> — or ask us for a bespoke company HR portal.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/oibuz"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]"
            >
              Explore OIBUZ Payroll &amp; HRMS <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={getOibuzRegisterUrl({ source: "salary_slip_tool_cta" })}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOibuzTrialClick("salary_slip_tool_cta")}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]"
            >
              Start OIBUZ Free Trial <ArrowUpRight className="w-4 h-4" />
            </a>
            <button type="button" onClick={() => openLeadModal({ projectType: "Custom Payroll & Workforce Software" })}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Custom HR Quote <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ToolSeoFaq heading="Salary Slip Generator FAQs" faqs={FAQS} />
    </div>
  );
}

