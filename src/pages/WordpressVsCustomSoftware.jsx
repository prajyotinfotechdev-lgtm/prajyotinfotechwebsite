import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  Lock,
  Layers,
  AlertTriangle,
  Server,
  DollarSign,
  MessageSquare,
  Send,
  Cpu
} from "lucide-react";
import { createLead } from "../utils/leadStorage.js";

const COMPARISON_ROWS = [
  {
    feature: "Core Web Vitals & Load Speed",
    wordpress: "Slow (LCP 2.8s – 5.5s). Heavy render-blocking CSS, jQuery, and unoptimized PHP server rendering.",
    custom: "Sub-Second (LCP < 0.8s). Static edge generation, code-splitting, and instant client-side routing.",
    winner: "custom"
  },
  {
    feature: "Security & Vulnerability Exposure",
    wordpress: "High risk. Over 90% of web CMS security breaches stem from compromised WordPress plugins and outdated themes.",
    custom: "Bank-grade enterprise security. Zero third-party PHP plugins, strict CORS, sanitization, and isolated API microservices.",
    winner: "custom"
  },
  {
    feature: "High-Concurrency Traffic Spikes",
    wordpress: "Crashes or slows to a crawl during marketing surges due to bloated database queries on the single `wp_posts` table.",
    custom: "Effortlessly handles 50,000+ simultaneous users via Redis edge-caching and horizontal container autoscaling.",
    winner: "custom"
  },
  {
    feature: "Maintenance & Plugin Breakage",
    wordpress: "Fragile. Updating one plugin often breaks theme styling or conflicts with payment gateways.",
    custom: "Robust CI/CD pipeline with automated Jest/Playwright tests before code touches production.",
    winner: "custom"
  },
  {
    feature: "Complex Business Logic & Workflows",
    wordpress: "Hacked together using dozens of disparate plugins that do not communicate cleanly with your ERP or CRM.",
    custom: "Engineered from scratch to mirror your exact business processes, multi-vendor rules, and automated workflows.",
    winner: "custom"
  },
  {
    feature: "Time-to-Launch for Simple Blogs",
    wordpress: "Fast (1 to 2 weeks using off-the-shelf commercial templates).",
    custom: "Moderate (4 to 8 weeks for bespoke design and custom architecture).",
    winner: "wordpress"
  }
];

const MIGRATION_TRIGGERS = [
  {
    title: "1. Google Ads Quality Score is tanking due to slow speed",
    desc: "If your landing pages take more than 2.5 seconds to load on mobile, your Google Ads CPC doubles and bounce rate jumps above 55%."
  },
  {
    title: "2. Constant plugin updates breaking your checkout",
    desc: "Waking up to broken payment buttons, failed OTP deliveries, or white screens of death because WordPress auto-updated in the background."
  },
  {
    title: "3. You need customized client portals or SaaS features",
    desc: "Trying to force membership plugins and LearnDash/WooCommerce into acting like a custom SaaS application results in chaotic database bloat."
  },
  {
    title: "4. Compliance, enterprise audits & security concerns",
    desc: "Corporate B2B clients or enterprise procurement teams refuse to partner with you because vulnerability scanners flag open WordPress exploits."
  }
];

const FAQ_ITEMS = [
  {
    q: "Why is a custom React/Next.js application so much faster than WordPress?",
    a: "WordPress generates every page on-the-fly by executing hundreds of PHP database queries and loading dozens of plugin stylesheets. In contrast, custom React and Next.js applications pre-render pages statically at the edge (CDN), compile HTML ahead of time, and only download the tiny slice of JavaScript needed for user interaction, achieving sub-second (<0.8s) load times."
  },
  {
    q: "Can you migrate our existing WordPress content and SEO rankings without losing traffic?",
    a: "Yes. We preserve 100% of your search engine rankings by mapping every existing WordPress URL structure with 301 redirects, replicating meta tags and schema markup, and porting your blog posts or products cleanly into a high-performance headless CMS or PostgreSQL database."
  },
  {
    q: "How will my marketing team edit content if we don't have WordPress admin?",
    a: "We provide an intuitive, high-speed Headless CMS (such as Sanity, Strapi, or a custom lightweight admin panel) that gives your non-technical team the freedom to publish blogs, update banners, and manage products without touching code or risking site crashes."
  },
  {
    q: "What is the typical investment to migrate from WordPress to Custom Software?",
    a: "Full-scale redesign and migration projects typically range from ₹1,50,000 to ₹3,50,000 depending on database size and custom functional requirements. The investment is quickly offset by zero recurring plugin license fees, lower hosting expenses, and dramatically improved conversion rates."
  }
];

export default function WordpressVsCustomSoftware() {
  const [formData, setFormData] = useState({ name: "", phone: "", website: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await createLead({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: "wp-vs-custom@prajyotinfotech.in",
        company: formData.website.trim(),
        projectType: "WordPress to Custom Web App Migration",
        message: `[WordPress vs Custom Lead]\nWebsite: ${formData.website}\nName: ${formData.name}\nPhone: ${formData.phone}`,
        source: "wp_vs_custom_comparison"
      });
      setIsSubmitted(true);
    } catch (err) {
      console.warn("Lead error:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": { "@type": "Answer", "text": item.a }
    }))
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Compare", url: "https://www.prajyotinfotech.in/compare/wordpress-vs-custom-software" },
          { name: "WordPress vs Custom Software", url: "https://www.prajyotinfotech.in/compare/wordpress-vs-custom-software" }
        ]}
      />

      <Seo
        title="WordPress vs Custom Web Application (2026 Architectural Guide) | Prajyot Infotech"
        description="Comprehensive comparison between WordPress/WooCommerce and custom React/Next.js software. Analyze Core Web Vitals speed, security vulnerabilities, plugin fragility, and 3-year TCO."
        keywords="WordPress vs custom software, migrate WordPress to React, why custom software is better than WordPress, WordPress speed vs custom code, custom web application Pune"
        path="/compare/wordpress-vs-custom-software"
        image="/og/og-compare.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="py-20 px-4 bg-slate-50 min-h-screen">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 shrink-0" />
              <span>Modern Web Architecture · 2026 Edition</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-6 tracking-tight">
              WordPress vs <span className="text-brand-600">Custom Web Applications</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              WordPress powers 40% of the web, but for growing businesses, its plugin bloat, sluggish mobile speed, and recurring security vulnerabilities become an expensive liability.
            </p>
          </div>

          {/* Quick TL;DR Verdict Box */}
          <div className="bg-gradient-to-br from-slate-900 to-navy-900 text-white rounded-3xl p-8 mb-16 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-400">The 30-Second Verdict</span>
                <h2 className="text-2xl font-bold text-white">Use WordPress for a ₹20k hobby blog. Build Custom for revenue-critical software.</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  If your website is responsible for generating revenue, taking payments, or running customer operations, relying on 35 third-party plugins created by anonymous developers is a severe business risk. A custom React/Next.js stack delivers sub-second load times (&lt;0.8s), zero plugin exploits, and unlimited architectural scale.
                </p>
              </div>
              <a
                href="https://wa.me/919322673286?text=Hi%20Prajyot%20Infotech%2C%20we%20want%20to%20audit%20and%20migrate%20our%20slow%20WordPress%20site%20to%20a%20modern%20custom%20stack."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-brand-600/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Book Speed & Stack Audit</span>
              </a>
            </div>
          </div>

          {/* SIDE-BY-SIDE MATRIX */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Head-to-Head Architecture Comparison
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Comparing standard WordPress CMS against Prajyot Infotech's Sub-Second React & Next.js microservices.
              </p>
            </div>

            {/* Mobile Comparison Cards */}
            <div className="md:hidden space-y-4">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="px-4 py-3 bg-slate-100 font-bold text-slate-900 text-sm border-b border-slate-200">
                    {row.feature}
                  </div>
                  <div className="p-4 space-y-3 text-xs">
                    <div className="flex items-start gap-2 text-slate-600">
                      <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-500 uppercase text-[10px] block mb-0.5">WordPress / WooCommerce</span>
                        {row.wordpress}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-slate-900 bg-brand-50/70 p-3 rounded-xl border border-brand-200/70 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-brand-700 uppercase text-[10px] block mb-0.5">Custom React / Next.js</span>
                        {row.custom}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 w-1/4">Evaluation Parameter</th>
                    <th className="py-3.5 px-4 w-3/8 text-slate-600">WordPress / WooCommerce</th>
                    <th className="py-3.5 px-4 w-3/8 text-brand-900 bg-brand-50/60">Custom React / Next.js Stack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900 align-top">{row.feature}</td>
                      <td className="py-4 px-4 align-top leading-relaxed text-slate-600">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span>{row.wordpress}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-top leading-relaxed text-slate-900 bg-brand-50/20 font-medium">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{row.custom}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIGNS YOU'VE OUTGROWN WORDPRESS */}
          <div className="bg-slate-100/70 rounded-3xl p-6 sm:p-10 border border-slate-200 mb-16">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>When to Migrate</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                4 Critical Signs You Have Outgrown WordPress
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MIGRATION_TRIGGERS.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AUDIT TRIGGER FORM */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Complimentary Technical Audit</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                  Request a Free WordPress Performance & Vulnerability Audit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Enter your current website URL. Our engineers in Pune will run an in-depth Core Web Vitals, database bloat, and plugin vulnerability inspection and deliver a comprehensive diagnostic report within 12 hours.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Full Lighthouse 95+ roadmap
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Database size inspection
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero 301 SEO ranking loss guarantee
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sameer Kulkarni"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98900 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Current Website URL *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. https://mycompany.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold text-xs shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? "Generating Audit..." : "Request Free Speed & Security Audit"}</span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-6 space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-slate-900">Audit Request Queued!</h4>
                    <p className="text-xs text-slate-600">
                      Our performance engineers will analyze your site and send your complete Lighthouse & Stack diagnostic report via WhatsApp.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FAQS */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-extrabold text-navy-900 text-center mb-6 tracking-tight">
              Frequently Asked Questions About WordPress Migration
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">{item.q}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
