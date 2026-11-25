import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import ToolSeoFaq from "../components/ToolSeoFaq.jsx";
import BilingualToolGuide from "../components/BilingualToolGuide.jsx";
import { FileSignature, Copy, Check, Printer, Share2, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";
import { useBottomBar } from "../utils/useBottomBar.js";
import { trackEvent } from "../utils/analytics.js";

const DOC_MODES = [
  { id: "nda", label: "Mutual NDA (India)" },
  { id: "ip", label: "Software IP Assignment & SOW" },
];

const BILINGUAL_GUIDE = {
  en: {
    title: "Protect Your Startup Idea & Source Code Ownership in India",
    summary: "Generate a clean Mutual Non-Disclosure Agreement (NDA) or Software Intellectual Property (IP) Transfer draft ready for founder, freelancer, or agency discussions.",
    steps: [
      "Choose Mutual NDA (before sharing pitch decks/specs) or IP Assignment (before development starts).",
      "Enter both party legal names, effective date, jurisdiction city (e.g. Pune/Mumbai), and term.",
      "Print to clean A4 PDF or copy formatted clauses into your agreement workflow.",
    ],
    note: "Every software engagement at Prajyot Infotech includes Mutual NDA protection and 100% Day-1 GitHub & source code IP ownership.",
  },
  mr: {
    title: "सॉफ्टवेअर NDA आणि पूर्ण सोर्स कोड मालकी हक्क (IP Transfer) ड्राफ्ट",
    summary: "तुमची बिझनेस आयडिया, डेटाबेस डिझाइन किंवा सॉफ्टवेअर प्रकल्पाचा कोड तुमच्या मालकीचा राहावा यासाठी Mutual NDA आणि IP हक्क करार ड्राफ्ट मराठीत समजून घ्या व PDF काढा.",
    steps: [
      "Mutual NDA (माहिती गोपनीयता करार) किंवा IP Ownership (कोड मालकी करार) निवडा.",
      "तुमच्या कंपनीचे नाव, दुसऱ्या पार्टीचे नाव आणि न्यायालयीन शहर (उदा. Pune) भरा.",
      "थेट Print / PDF करा किंवा कॉपी करून ईमेल/व्हॉट्सअॅपवर पाठवा.",
    ],
    note: "टिप: प्रज्योत इन्फोटेकमध्ये पहिल्या दिवसापासून पूर्ण सोर्स कोड व Git रिपॉझिटरी तुमच्या नावावर राहते.",
  },
  hi: {
    title: "बिज़नेस Mutual NDA और सॉफ्टवेयर कोड ओनरशिप (IP Transfer) ड्राफ्ट",
    summary: "किसी डेवलपर या एजेंसी के साथ काम शुरू करने से पहले अपने बिज़नेस डेटा की सुरक्षा (NDA) और 100% सोर्स कोड ओनरशिप ड्राफ्ट तुरंत तैयार करें।",
    steps: [
      "Mutual NDA (गोपनीयता समझौता) या IP Assignment (कोड स्वामित्व) टैब चुनें।",
      "दोनों पक्षों के कानूनी नाम, शहर का न्यायक्षेत्र (Jurisdiction) और कार्य विवरण भरें।",
      "A4 PDF प्रिंट करें या सीधा टेक्स्ट कॉपी कर शेयर करें।",
    ],
    note: "नोट: यह जनरेटर सामान्य बिज़नेस ड्राफ्टिंग के लिए है; बड़े एंटरप्राइज़ कॉन्ट्रैक्ट के लिए वकील से समीक्षा अवश्य कराएं।",
  },
};

export default function NdaAgreementGenerator() {
  useBottomBar();
  const { openLeadModal } = useLeadModal();
  const [mode, setMode] = useState("nda");
  const [copied, setCopied] = useState(false);

  const [cfg, setCfg] = useState({
    partyA: "Apex Digital Enterprises Pvt Ltd",
    partyB: "Prajyot Infotech (Technology Partner)",
    city: "Pune, Maharashtra",
    effectiveDate: new Date().toISOString().split("T")[0],
    termYears: "3",
    projectTitle: "Custom Web Portal, Mobile Application & Cloud ERP Architecture",
  });

  const documentText = useMemo(() => {
    if (mode === "nda") {
      return `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)

This Mutual Non-Disclosure Agreement ("Agreement") is entered into on ${cfg.effectiveDate} ("Effective Date") by and between:

1. ${cfg.partyA} ("First Party")
2. ${cfg.partyB} ("Second Party")

(Collectively referred to as the "Parties" and individually as a "Party").

1. PURPOSE OF DISCLOSURE
The Parties wish to explore and evaluate a potential technology engagement relating to: "${cfg.projectTitle}" ("Purpose"). During discussions, each Party may disclose proprietary technical, architectural, pricing, or commercial data ("Confidential Information").

2. CONFIDENTIALITY OBLIGATIONS
Each Receiving Party agrees to:
(a) Hold all Confidential Information in strict confidence using at least reasonable care;
(b) Not disclose Confidential Information to any third party without prior written approval;
(c) Use Confidential Information strictly for evaluating and executing the stated Purpose.

3. EXCLUSIONS
Confidential Information excludes data that becomes publicly available without breach, was already lawfully known prior to disclosure, or is independently developed without reference to the Disclosing Party's materials.

4. TERM & SURVIVAL
These confidentiality obligations remain active for ${cfg.termYears} (${cfg.termYears}) year(s) from the Effective Date.

5. NO IMPLIED LICENSE & RETURN OF MATERIALS
Nothing herein transfers intellectual property rights unless separately executed in writing. Upon written request, all copies of proprietary documents shall be destroyed or returned.

6. GOVERNING LAW & JURISDICTION
This Agreement shall be governed by the laws of India, with exclusive jurisdiction vested in the competent courts at ${cfg.city}.

IN WITNESS WHEREOF, authorized representatives execute this Agreement on ${cfg.effectiveDate}.`;
    }

    return `INTELLECTUAL PROPERTY ASSIGNMENT & SOURCE CODE OWNERSHIP ADDENDUM

Effective Date: ${cfg.effectiveDate}
Client / Owner: ${cfg.partyA}
Engineering Partner / Contractor: ${cfg.partyB}
Project Scope: ${cfg.projectTitle}

1. 100% CLIENT INTELLECTUAL PROPERTY OWNERSHIP
Upon realization of applicable milestone payments, Partner hereby irrevocably assigns to Client all worldwide right, title, and interest in and to custom software source code, UI designs, database schemas, and architecture documentation created specifically for the Project ("Deliverables").

2. ZERO VENDOR LOCK-IN & REPOSITORY HANDOVER
All Deliverables shall be delivered cleanly to Client-owned Git repositories (GitHub / GitLab) and deployed directly to Client-controlled cloud infrastructure (AWS / GCP / Vercel / Supabase) with full administrative credentials.

3. BACKGROUND & OPEN-SOURCE LIBRARIES
Standard open-source dependencies (MIT / Apache 2.0 / BSD licensed packages) remain governed by their respective permissive open-source licenses without restricting Client's commercial ownership of the custom application.

4. CONFIDENTIALITY & NON-COMPETE DATA PROTECTION
Partner shall not reuse Client's proprietary business datasets, customer lists, or confidential workflows for competing engagements. Validity term: ${cfg.termYears} year(s) under courts at ${cfg.city}, India.

EXECUTED BY AUTHORIZED SIGNATORIES FOR CLIENT & PARTNER.`;
  }, [mode, cfg]);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(documentText);
      setCopied(true);
      trackEvent("tool_copied", { tool: "nda-agreement-generator", mode });
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  const handlePrint = () => {
    trackEvent("pdf_printed", { tool: "nda-agreement-generator", mode });
    window.print();
  };

  const shareWhatsApp = () => {
    trackEvent("whatsapp_share_clicked", { tool: "nda-agreement-generator" });
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`Drafted our Mutual NDA & Software IP Ownership terms for "${cfg.projectTitle}" free using https://www.prajyotinfotech.in/tools/nda-agreement-generator`)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const pageUrl = "https://www.prajyotinfotech.in/tools/nda-agreement-generator";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mutual NDA & Software IP Assignment Draft Generator India",
    url: pageUrl,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: "Generate printable Indian Mutual Non-Disclosure Agreements (NDA) and Software Source Code IP Ownership clauses with zero signup.",
  };

  const inputCls = "w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/40";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Free Tools", url: "https://www.prajyotinfotech.in/tools" },
          { name: "Mutual NDA & IP Generator", url: pageUrl },
        ]}
      />
      <Seo
        title="Free Mutual NDA & Software IP Ownership Generator India | Prajyot Infotech"
        description="Draft clean Indian Mutual Non-Disclosure Agreements (NDA) and 100% Source Code IP Assignment clauses ready for founders, freelancers & software agencies."
        keywords="mutual nda format india, software ip ownership agreement generator, startup nda template india, developer source code agreement"
        path="/tools/nda-agreement-generator"
        image="/og/og-nda-agreement.jpg"
        schema={schema}
      />

      <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          body { background: #fff !important; }
          .print-nda-doc { box-shadow: none !important; border: none !important; padding: 0 !important; }
        }
      `}</style>

      <div className="no-print bg-slate-900 text-white py-10 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>Indian Contract Act Style · Print to A4 PDF</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Mutual NDA &amp; Software IP Ownership Generator
          </h1>
          <p className="text-slate-300 text-xs sm:text-base max-w-2xl mt-2">
            Draft clean Mutual Confidentiality (NDA) and Day-1 Source Code IP Transfer clauses before sharing specs with freelancers or agencies.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="no-print lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-100">
              {DOC_MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    mode === m.id ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">First Party (Client / Startup)</label>
              <input className={inputCls} value={cfg.partyA} onChange={(e) => setCfg((p) => ({ ...p, partyA: e.target.value }))} />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Second Party (Agency / Partner)</label>
              <input className={inputCls} value={cfg.partyB} onChange={(e) => setCfg((p) => ({ ...p, partyB: e.target.value }))} />
            </div>
            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Project / Engagement Scope</label>
              <input className={inputCls} value={cfg.projectTitle} onChange={(e) => setCfg((p) => ({ ...p, projectTitle: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Jurisdiction City</label>
                <input className={inputCls} value={cfg.city} onChange={(e) => setCfg((p) => ({ ...p, city: e.target.value }))} />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1">Term (Years)</label>
                <select className={inputCls} value={cfg.termYears} onChange={(e) => setCfg((p) => ({ ...p, termYears: e.target.value }))}>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="5">5 Years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button type="button" onClick={copyText} className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer min-h-[44px]">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              <button type="button" onClick={handlePrint} className="py-2.5 px-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer min-h-[44px]">
                <Printer className="w-3.5 h-3.5" /> PDF
              </button>
              <button type="button" onClick={shareWhatsApp} className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer min-h-[44px]">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          {/* Document Preview */}
          <div className="lg:col-span-7">
            <div className="print-nda-doc bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-10">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500 font-bold">
                  <FileSignature className="w-4 h-4 text-brand-600" />
                  <span>Legal Draft Preview</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Ref: {cfg.effectiveDate}</span>
              </div>

              <pre className="whitespace-pre-wrap font-serif text-xs sm:text-[13px] leading-relaxed text-slate-800">
                {documentText}
              </pre>

              <div className="grid grid-cols-2 gap-6 pt-10 mt-8 border-t border-slate-200 text-xs">
                <div>
                  <div className="h-8 border-b border-slate-400 w-40 mb-1" />
                  <strong className="text-slate-900 block">{cfg.partyA}</strong>
                  <span className="text-slate-500 text-[11px]">Authorised Signatory</span>
                </div>
                <div>
                  <div className="h-8 border-b border-slate-400 w-40 mb-1" />
                  <strong className="text-slate-900 block">{cfg.partyB}</strong>
                  <span className="text-slate-500 text-[11px]">Authorised Signatory</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BilingualToolGuide guides={BILINGUAL_GUIDE} />

      <div className="no-print bg-slate-900 text-white px-4 py-12 text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Mutual NDA + 100% Client Git Repository Ownership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Need a Partner Who Signs Day-1 NDA &amp; Full Code Handover?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mb-7">
            Share your project vision safely with Prajyot Infotech. We deliver directly into your own GitHub repo and AWS/Vercel account.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button type="button" onClick={() => openLeadModal({ projectType: "Protected Custom Software (Mutual NDA)" })}
              className="px-6 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]">
              Book NDA-Protected Discovery Call <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/resources/software-rfp-template"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm inline-flex items-center justify-center gap-2 min-h-[48px]">
              Download Software RFP Kit
            </Link>
          </div>
        </div>
      </div>

      <ToolSeoFaq
        heading="NDA & Software IP Ownership FAQs"
        faqs={[
          {
            q: "Why should Indian founders sign an IP Assignment before coding starts?",
            a: "Under Indian copyright law, without explicit written IP assignment, an external contractor may retain underlying ownership rights unless explicitly assigned on milestone payment.",
          },
          {
            q: "Is Mutual NDA enforceable before sharing a pitch or architecture?",
            a: "Yes. Standard Mutual NDA agreements executed electronically or on plain paper establish mutual confidentiality obligations under Indian contract principles.",
          },
        ]}
      />
    </div>
  );
}

