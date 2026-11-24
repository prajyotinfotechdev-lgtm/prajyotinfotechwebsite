// src/pages/FAQ.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { ChevronDown, MessageSquare, ArrowRight, Rocket, CreditCard, Code2, ShieldCheck, Globe, HelpCircle } from "lucide-react";

const SITE_URL = "https://www.prajyotinfotech.in";
const BRAND = "Prajyot Infotech";
const WA = "917020708747";

const FAQ_DATA = [
  {
    category: "Getting Started",
    iconKey: "getting-started",
    questions: [
      {
        q: "How do I start a project with Prajyot Infotech?",
        a: "Simply fill our contact form at prajyotinfotech.in/contact, send us a WhatsApp message on +91 70207 08747, or email hr@prajyotinfotech.in. We respond within 24 hours with an initial consultation to understand your requirements. After a discovery call, we prepare a detailed project specification, architecture plan, and fixed-price proposal within 48 hours.",
      },
      {
        q: "Do I need to have a detailed specification before contacting you?",
        a: "Not at all! Many of our best projects started with a rough idea or a business problem statement. Our senior architects will help you define the right technical scope, choose the best technology stack, and prioritize features for the fastest go-to-market. A simple description of what you want to achieve is enough to start.",
      },
      {
        q: "Do you offer a free consultation or audit?",
        a: "Yes. We offer a complimentary 15-minute architecture consultation call and a Free Business Technology Audit (available at prajyotinfotech.in/free-business-tech-audit) for growing businesses. This audit identifies digital gaps, automation opportunities, and technology improvements specific to your business without any obligation.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    iconKey: "pricing",
    questions: [
      {
        q: "How much does custom software development cost in India?",
        a: "Website packages start from ₹29,999 for a starter business site. Custom ERP/CRM systems typically range from ₹1.5 lakh to ₹8 lakh+ depending on complexity. Mobile apps start from ₹2.5 lakh. All prices are fixed-bid milestone contracts — no surprise invoices or hourly billing ambiguity. See our full pricing at prajyotinfotech.in/pricing.",
      },
      {
        q: "Do you offer flexible payment plans?",
        a: "Yes. All projects use milestone-based payments — you pay in 3–4 stages tied directly to deliverable completion. A 30–50% advance secures your project slot, with remaining payments released milestone-by-milestone as you verify and approve each stage of the delivered system.",
      },
      {
        q: "Are there recurring/monthly fees after project delivery?",
        a: "No mandatory monthly SaaS fees. You receive 100% source code ownership. The only potential recurring costs are third-party services you may choose to use (server hosting, SMS API credits, domain renewal) — which you control directly. Prajyot Infotech charges for new features or maintenance only when you request additional work.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept UPI, NEFT/RTGS bank transfer, and international wire transfer (for USD/AED projects). All payments are confirmed with a formal GST invoice.",
      },
    ],
  },
  {
    category: "Technology & Delivery",
    iconKey: "tech",
    questions: [
      {
        q: "How long does it take to build a custom website or app?",
        a: "Standard business websites launch in 10–14 business days. Custom ERP or CRM systems take 4–8 weeks depending on complexity. Mobile apps typically require 6–12 weeks. All timelines are defined contractually in the project agreement before work begins.",
      },
      {
        q: "What technologies does Prajyot Infotech use?",
        a: "We build primarily with React (web frontends), React Native / Flutter (mobile), Node.js / Python FastAPI (backend APIs), PostgreSQL / MongoDB (databases), and deploy on Vercel / Railway / Render / AWS. We select the best-fit technology for your specific requirements rather than forcing a one-size-fits-all stack.",
      },
      {
        q: "Will my website be fast and mobile-friendly?",
        a: "Yes, guaranteed. Every website we deliver targets a Lighthouse Performance score above 90, Largest Contentful Paint (LCP) under 1.5 seconds, and passes Google's Core Web Vitals assessment. We build mobile-first by default since over 78% of Indian web traffic originates from smartphones.",
      },
      {
        q: "Can you integrate with existing software like Tally, Zoho, or legacy databases?",
        a: "Yes. We build custom integration APIs and data bridge connectors for legacy accounting software (Tally, Busy), cloud CRMs (Zoho, HubSpot), and proprietary databases. Our team has experience migrating decades of business data into modern cloud systems without data loss.",
      },
    ],
  },
  {
    category: "IP Ownership & Legal",
    iconKey: "legal",
    questions: [
      {
        q: "Who owns the code and software after delivery?",
        a: "You do — 100%. Upon final milestone payment, you receive complete GitHub repository access, all admin credentials, database exports, and commercial copyright. Zero vendor lock-in, zero recurring licensing fees, and zero dependency on Prajyot Infotech to run your software independently.",
      },
      {
        q: "Do you sign an NDA before the project?",
        a: "Yes. We execute a Mutual Non-Disclosure Agreement (NDA) before any discovery call where sensitive business logic or proprietary concepts are discussed. NDAs are prepared and signed at no additional cost and protect both parties.",
      },
      {
        q: "What happens if I'm not satisfied with the delivered work?",
        a: "Every project includes a 60-day post-launch bug warranty. If delivered functionality doesn't match the agreed specification, we rework it at no additional charge. Beyond the warranty, significant scope changes are handled through change requests with transparent pricing.",
      },
    ],
  },
  {
    category: "Location & Remote Work",
    iconKey: "location",
    questions: [
      {
        q: "Where is Prajyot Infotech located?",
        a: "Our engineering headquarters is in Pune, Maharashtra, India (Shivaji Nagar / FC Road IT Corridor). We have a regional delivery hub in Latur, Maharashtra. Approximately 95% of our client projects run smoothly via structured remote sprints, GitHub, Slack, and WhatsApp — no in-person meeting required for most engagements.",
      },
      {
        q: "Do you work with clients outside India?",
        a: "Yes. We have delivered projects for clients in USA, UK, UAE, Canada, Australia, and Singapore. All international projects are managed remotely with IST/GMT timezone overlap, weekly video sprint reviews, and real-time project tracking via GitHub and Notion.",
      },
      {
        q: "What languages does your team communicate in?",
        a: "Our team communicates fluently in English, Hindi, and Marathi. All technical documentation, code comments, and project specifications are prepared in English.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_DATA.flatMap((cat) =>
    cat.questions.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    }))
  ),
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-slate-200 rounded-2xl overflow-hidden transition-all ${open ? "shadow-md border-brand-300" : "hover:border-slate-300"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="font-semibold text-slate-900 text-sm leading-relaxed">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180 text-brand-600" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5">
          <div className="pt-3 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">{a}</div>
        </div>
      )}
    </div>
  );
}


const renderCategoryIcon = (key) => {
  switch (key) {
    case "getting-started":
      return <Rocket className="w-4 h-4 text-brand-600" />;
    case "pricing":
      return <CreditCard className="w-4 h-4 text-emerald-600" />;
    case "tech":
      return <Code2 className="w-4 h-4 text-indigo-600" />;
    case "legal":
      return <ShieldCheck className="w-4 h-4 text-amber-600" />;
    case "location":
      return <Globe className="w-4 h-4 text-cyan-600" />;
    default:
      return <HelpCircle className="w-4 h-4 text-brand-600" />;
  }
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...FAQ_DATA.map((c) => c.category)];
  const displayed = activeCategory === "All"
    ? FAQ_DATA
    : FAQ_DATA.filter((c) => c.category === activeCategory);

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Frequently Asked Questions", url: `${SITE_URL}/faq` },
      ]} />
      <Seo
        title="Frequently Asked Questions | Prajyot Infotech — Software Development India"
        description="All your questions answered about Prajyot Infotech's custom software development services, pricing, timelines, IP ownership, NDAs, and remote project delivery across India and globally."
        keywords="Prajyot Infotech FAQ, software development questions India, how much does custom software cost India, software company Pune FAQ, website development FAQ"
        path="/faq"
        schema={[faqSchema]}
      />

      <main className="mx-auto max-w-5xl px-4 py-14">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
            <HelpCircle className="w-4 h-4 text-brand-600" />
            {FAQ_DATA.flatMap((c) => c.questions).length} Questions Answered
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Everything you need to know about starting a project with Prajyot Infotech — pricing, timelines, ownership, and more.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-brand-600 text-white border-brand-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Groups */}
        <div className="space-y-10 mb-16">
          {displayed.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  {renderCategoryIcon(group.iconKey)}
                </div>
                <h2 className="text-lg font-black text-slate-900">{group.category}</h2>
              </div>
              <div className="space-y-3">
                {group.questions.map((faq) => (
                  <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-navy-950 p-8 sm:p-10 text-center text-white">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mx-auto mb-4">
            <HelpCircle className="w-6 h-6 text-brand-300" />
          </div>
          <h2 className="text-2xl font-black mb-2">Still Have a Question?</h2>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Our technical team responds to all inquiries within 24 hours. Ask us anything about your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi, I have a question about starting a project with Prajyot Infotech.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              Ask on WhatsApp
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
            >
              Contact Form
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

