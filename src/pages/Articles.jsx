// src/pages/Articles.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

const WA = (t) => `https://wa.me/917020708747?text=${encodeURIComponent(t)}`;

const ARTICLES = [
  {
    id: "why-every-restaurant-needs-management-system",
    category: "Restaurant",
    categoryColor: "from-orange-400 to-red-500",
    icon: "🍽️",
    title: "Why Every Restaurant in India Needs a Digital Management System in 2025",
    excerpt: "Paper KOTs, WhatsApp orders, and manual billing cost Indian restaurants lakhs every year in waste, errors, and slow service. Here's why a digital system changes everything.",
    readTime: "6 min read",
    date: "August 2025",
    tags: ["Restaurant Software", "Digitalization", "POS System"],
    content: [
      { h: "The Real Cost of Running a Restaurant Manually", p: "Most restaurant owners in India still manage orders through paper KOTs, take orders verbally, and manually enter bills. This leads to order errors (wrong dishes, wrong quantities), slow billing during peak hours, difficulty tracking what's selling, and zero data on customer preferences." },
      { h: "What a Digital Restaurant System Actually Does", p: "A complete restaurant management system digitizes every step: Guests scan a QR code on their table, browse the live digital menu, and place orders directly. Orders appear instantly on a kitchen display screen — no misheard orders, no paper to lose. The admin can toggle item availability in real-time (e.g., 'Biryani sold out') and the menu updates automatically for all tables." },
      { h: "WhatsApp Integration: The Game Changer", p: "Indian customers love WhatsApp. A good system sends order confirmation, bill summary, and even a follow-up 'Did you enjoy your visit?' message directly to the customer's WhatsApp — increasing satisfaction and repeat visits." },
      { h: "GST Billing Without the Headache", p: "A proper system auto-calculates GST on every item, generates a digital bill, and can print or WhatsApp it to the customer in seconds. Monthly GST reports are generated automatically — no manual work." },
      { h: "Real Results We've Seen", p: "Restaurants using our system report: 0% order errors (vs ~8–12% with paper), 35% faster table turnover, 2 fewer staff members needed per shift, and 40% increase in positive reviews due to faster, more accurate service." },
      { h: "How Much Does It Cost?", p: "A complete restaurant management system from Prajyot Infotech — including QR menus, kitchen display, WhatsApp integration, billing, and admin panel — starts from ₹49,999. This typically pays back within 60 days through reduced errors, faster billing, and better customer experience." },
    ],
  },
  {
    id: "mobile-shop-billing-software-india",
    category: "Retail",
    categoryColor: "from-blue-400 to-indigo-500",
    icon: "📱",
    title: "Why Mobile Phone Shops in India Need Custom Billing & Inventory Software",
    excerpt: "Tally doesn't track IMEI numbers. Excel can't send WhatsApp repair updates. Here's exactly what mobile shop owners need — and why generic software doesn't cut it.",
    readTime: "5 min read",
    date: "August 2025",
    tags: ["Mobile Shop Software", "Billing System", "Inventory Management"],
    content: [
      { h: "The Problem with Generic Software for Mobile Shops", p: "Mobile phone retailers have very specific needs that generic billing software doesn't handle: IMEI-based stock tracking, repair job management, multiple pricing tiers (retail vs. dealer), and WhatsApp communication with customers waiting for phone repairs." },
      { h: "IMEI Tracking: Why It Matters", p: "Every mobile phone has a unique IMEI number. When you buy stock, each phone's IMEI should be logged. When you sell, the specific IMEI should be marked as sold. This prevents fraud, helps with warranty claims, and gives you complete audit trails. Tally or Excel cannot do this properly." },
      { h: "Repair Job Management", p: "When a customer brings in a phone for repair, a job card is created with: customer details, phone model, problem description, estimated cost, and status (Received → In Progress → Ready → Delivered). The customer can receive WhatsApp updates at each stage. No more 'When is my phone ready?' calls every hour." },
      { h: "Dealer vs Retail Pricing", p: "Mobile shop owners often have different prices for dealers and retail customers. A custom system automatically shows the right price based on who's buying — without manual switching or confusion." },
      { h: "GST Billing in Seconds", p: "Generate a GST invoice with the phone's IMEI, customer details, HSN code, and CGST/SGST — all pre-filled. Print or WhatsApp to customer. The entire process takes under 60 seconds." },
      { h: "How Prajyot Infotech Builds It", p: "We built a complete mobile shop management system for a client in Latur. It handles: IMEI tracking for 200+ phones in stock, repair job cards with WhatsApp updates, dual pricing (retail/dealer), GST billing with PDF, daily sales reports, and customer purchase history. The owner now manages a 3-counter shop with 1 less staff member." },
    ],
  },
  {
    id: "website-vs-whatsapp-business-india",
    category: "Digital Strategy",
    categoryColor: "from-emerald-400 to-teal-500",
    icon: "💡",
    title: "Website vs. WhatsApp Business: What Every Indian SMB Owner Should Know",
    excerpt: "Many Indian businesses skip building a website because 'WhatsApp is enough.' Here's why that's a costly mistake — and how the two work best together.",
    readTime: "4 min read",
    date: "July 2025",
    tags: ["Website Development", "WhatsApp Business", "Digital Marketing"],
    content: [
      { h: "The 'WhatsApp Is Enough' Myth", p: "WhatsApp Business is free and easy — so many Indian small business owners rely on it entirely. But it has serious limitations: no search engine visibility, no professional product catalog, no payment integration, and your entire business is on a platform you don't control." },
      { h: "What a Website Does That WhatsApp Can't", p: "A business website shows up on Google when someone searches 'Mobile shop near me' or 'Best restaurant in Pune.' WhatsApp doesn't. A website can show your full menu, product catalog, pricing, and services 24/7 — even when you're sleeping. It builds trust and professionalism that WhatsApp cannot." },
      { h: "What WhatsApp Does Better", p: "WhatsApp is unbeatable for instant communication, order confirmations, appointment reminders, and customer support. 95% of Indians have WhatsApp and respond to messages faster than emails or calls." },
      { h: "The Winning Formula: Both Together", p: "The best Indian businesses use both: A professional website to attract and inform customers, and WhatsApp integration on the website to convert them instantly. A 'WhatsApp Now' button on your website converts browsers into buyers in seconds. This combination outperforms either alone by 300–400%." },
      { h: "Cost vs. ROI", p: "A professional business website costs ₹29,999–₹59,999 once. It works for you 24/7, 365 days a year. The cost of not having a website? Every customer who searched Google for your service and found your competitor instead." },
    ],
  },
  {
    id: "how-to-digitalize-your-business-india-2025",
    category: "Digitalization",
    categoryColor: "from-violet-400 to-purple-500",
    icon: "🚀",
    title: "How to Digitalize Your Business in India: A Step-by-Step Guide for 2025",
    excerpt: "From a basic website to full ERP — here's a practical, jargon-free guide to taking your Indian business fully digital in 2025 without wasting money.",
    readTime: "8 min read",
    date: "July 2025",
    tags: ["Business Digitalization", "ERP", "Startup India"],
    content: [
      { h: "Step 1: Professional Website (Month 1)", p: "Every business digitalization journey starts with a website. Not a Facebook page — a proper website on your own domain (like yourbusiness.in) with your services, contact info, WhatsApp button, and Google Business Profile. This is your digital shopfront that works 24/7." },
      { h: "Step 2: Digital Billing & Accounts (Month 2)", p: "Replace your paper bills with GST-compliant digital billing. A simple billing software generates professional invoices, tracks payments, and gives you monthly revenue reports in minutes. This also makes your CA's life much easier." },
      { h: "Step 3: Inventory Management (Month 2–3)", p: "If you sell physical products, an inventory system prevents overselling, tracks stock levels, alerts you before you run out, and shows your most profitable products. Most business owners are shocked to discover they've been losing 10–15% of revenue to inventory confusion." },
      { h: "Step 4: Customer Management (CRM) (Month 3–4)", p: "A simple CRM tracks every customer: what they bought, when they last visited, their contact info, and their preferences. This lets you send personalized WhatsApp messages, offer discounts to loyal customers, and follow up with people who haven't visited in 60 days." },
      { h: "Step 5: WhatsApp Automation (Month 4)", p: "Once you have the above systems, connect them to WhatsApp. Automatically send: order confirmations, appointment reminders, payment receipts, birthday wishes with discount codes, and re-engagement messages. This runs 24/7 without any staff involvement." },
      { h: "How Long Does This Take? How Much Does It Cost?", p: "Working with Prajyot Infotech, a full digitalization (website + billing + inventory + CRM + WhatsApp automation) typically takes 45–60 days and costs ₹89,999–₹1,49,999 depending on complexity. Most businesses recover this cost within 3–6 months through efficiency gains and new customers." },
    ],
  },
  {
    id: "ecommerce-vs-whatsapp-ordering",
    category: "E-Commerce",
    categoryColor: "from-amber-400 to-orange-500",
    icon: "🛒",
    title: "E-Commerce Website vs. WhatsApp Ordering: Which Is Right for Your Business?",
    excerpt: "Many retailers want to sell online but aren't sure if they need a full e-commerce site or WhatsApp-based ordering. The answer depends on your business type, volume, and customers.",
    readTime: "5 min read",
    date: "June 2025",
    tags: ["E-Commerce", "WhatsApp Ordering", "Online Sales"],
    content: [
      { h: "WhatsApp Ordering: When It Works", p: "WhatsApp ordering works well when: your product range is small (under 50 items), you have a loyal existing customer base, orders are mostly repeat purchases, and you're just starting out. It's low-cost to set up but requires manual processing for every order." },
      { h: "The Limitations of WhatsApp Ordering at Scale", p: "As your business grows, WhatsApp ordering becomes a bottleneck. You can't process 50 orders a day manually. Customers can't browse a proper catalog. You can't show product images, descriptions, and prices cleanly. And there's no payment integration — you have to manually verify every UPI transfer." },
      { h: "E-Commerce Website: When to Invest", p: "An e-commerce website makes sense when: you have more than 50 products, you want to appear on Google searches, you want to offer online payments (UPI, card, EMI), you want to run discount codes and offers, and you want to scale without adding staff." },
      { h: "The Hybrid Approach (Most Popular)", p: "The smartest approach is a full e-commerce website with WhatsApp as the support channel. Customers browse and order on your website, pay online, and receive WhatsApp order confirmations. If they have questions, they can WhatsApp you. This converts better than either alone." },
      { h: "Real Example: JollyBaba Mobiles", p: "We built JollyBaba Mobiles' e-commerce platform with dual pricing (retail and dealer), fuzzy product search, Razorpay checkout, and WhatsApp order fallback. Within 30 days of launch, 70% of orders were fully online — freeing the owner to focus on procurement instead of taking phone orders all day." },
    ],
  },
  {
    id: "crm-for-small-business-india",
    category: "CRM & Management",
    categoryColor: "from-rose-400 to-pink-500",
    icon: "👥",
    title: "Why Small Businesses in India Need a CRM (And It Doesn't Have to Be Expensive)",
    excerpt: "Most Indian business owners think CRM is for big companies. It's not. A simple CRM can increase repeat business by 30–50% — and it can be custom-built for under ₹40,000.",
    readTime: "4 min read",
    date: "June 2025",
    tags: ["CRM Software", "Customer Management", "Small Business India"],
    content: [
      { h: "What Is a CRM, Really?", p: "CRM stands for Customer Relationship Management — but think of it simply as a smart contact book for your business. It tracks every customer: their name, phone, what they bought, how much they spent, when they last visited, and any notes about them. It's the difference between running your business on gut feeling vs. data." },
      { h: "The Real Cost of Not Having a CRM", p: "Without a CRM: you forget to follow up with a hot lead, you don't know which customers haven't returned in 3 months, you can't identify your top 20% customers who bring 80% of revenue, and you have no way to send targeted offers. Industry data shows businesses with CRM increase revenue by 20–40%." },
      { h: "What a CRM Does Daily", p: "In practice, a CRM for a small Indian business: shows you all customer enquiries and their status (New → Contacted → Proposal Sent → Converted), reminds you to follow up with leads who haven't responded in 3 days, tracks which source brought each customer (Google/Instagram/Referral), and lets you WhatsApp all customers who visited 60+ days ago with a special offer." },
      { h: "How We Build It", p: "Prajyot Infotech builds custom CRM systems tailored to your specific business. A CRM for a real estate agent looks different from one for a car service center — we build exactly what you need, not a template. Starting from ₹39,999 for a basic system." },
    ],
  },
];

const ALL_CATS = ["All", ...new Set(ARTICLES.map((a) => a.category))];

function ArticleCard({ article, index, prefersReducedMotion }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : index * 0.07 }}
      className="group relative flex flex-col rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden hover:shadow-xl hover:shadow-brand-500/8 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Header */}
      <div className={`relative h-28 bg-gradient-to-br ${article.categoryColor} opacity-90 overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }} />
        <div className="absolute bottom-4 left-5 text-4xl select-none">{article.icon}</div>
        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
          <span>{article.date}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>

        <h2 className="text-base font-black text-navy-800 leading-snug group-hover:text-brand-700 transition-colors line-clamp-3 flex-1">
          {article.title}
        </h2>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
              {t}
            </span>
          ))}
        </div>

        <Link
          to={`/articles/${article.id}`}
          className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700 group-hover:gap-3 transition-all"
        >
          Read article
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

export default function Articles() {
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered = activeCategory === "All"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  const articlesSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Prajyot Infotech — Business Digitalization Articles",
    "description": "Guides and articles on business digitalization, software development, and technology for Indian SMBs.",
    "url": "https://prajyotinfotech.in/articles",
    "publisher": { "@type": "Organization", "name": "Prajyot Infotech", "url": "https://prajyotinfotech.in" },
    "blogPost": ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "description": a.excerpt,
      "url": `https://prajyotinfotech.in/articles/${a.id}`,
      "datePublished": a.date,
      "author": { "@type": "Organization", "name": "Prajyot Infotech" },
      "keywords": a.tags.join(", "),
    })),
  };

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: "https://prajyotinfotech.in/" },
        { name: "Articles", url: "https://prajyotinfotech.in/articles" },
      ]} />
      <Seo
        title="Business Digitalization Articles — Restaurant Software, CRM, E-Commerce India | Prajyot Infotech"
        description="Expert guides and articles on digitalizing Indian businesses — restaurant management systems, mobile shop billing, CRM, e-commerce, WhatsApp automation, and more from Prajyot Infotech."
        keywords="restaurant management system India, mobile shop billing software, business digitalization guide, CRM for small business, e-commerce India, WhatsApp automation business"
        path="/articles"
        schema={articlesSchema}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-navy-800 to-brand-900 px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-brand-600/30 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 mb-5">
              📖 {ARTICLES.length} Articles on Business Digitalization
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Guides for Indian businesses{" "}
              <span className="bg-gradient-to-r from-brand-300 to-violet-300 bg-clip-text text-transparent">
                going digital
              </span>
            </h1>
            <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Practical, jargon-free articles on restaurant management systems, billing software, e-commerce, CRM, and complete business digitalization — written by the team that builds these systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-16 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-2 overflow-x-auto py-3">
            {ALL_CATS.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  activeCategory === c
                    ? "border-brand-600 bg-brand-600 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-brand-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article, i) => (
            <ArticleCard key={article.id} article={article} index={i} prefersReducedMotion={prefersReducedMotion} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 to-navy-800 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white">Ready to digitalize your business?</h2>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">Get a free consultation. We'll recommend exactly what your business needs — and give you a fixed price before we begin.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a href={WA("Hi Prajyot Infotech, I read your articles and want to discuss digitalizing my business.")} target="_blank" rel="noopener noreferrer"
              className="rounded-xl bg-white px-7 py-3 font-bold text-brand-700 hover:bg-white/90 transition-all hover:scale-[1.02]">
              💬 WhatsApp Now
            </a>
            <Link to="/services" className="rounded-xl border-2 border-white/60 px-7 py-3 font-semibold text-white hover:bg-white/10 transition">
              View All Services
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
