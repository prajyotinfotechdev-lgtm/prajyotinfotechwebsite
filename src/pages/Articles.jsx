// src/pages/Articles.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

const WA = (t) => `https://wa.me/917020708747?text=${encodeURIComponent(t)}`;

/* ─── SVG Illustrations (premium, no emoji) ───────────────── */
function IllustrationRestaurant() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF6B35"/><stop offset="1" stopColor="#E63950"/></linearGradient>
        <linearGradient id="rg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1E293B"/><stop offset="1" stopColor="#0F172A"/></linearGradient>
      </defs>
      {/* Background plate */}
      <rect width="200" height="120" fill="url(#rg2)"/>
      {/* Glow */}
      <ellipse cx="100" cy="60" rx="70" ry="50" fill="#FF6B35" opacity="0.08"/>
      {/* QR table card */}
      <rect x="20" y="22" width="60" height="76" rx="8" fill="#1E293B" stroke="#FF6B35" strokeWidth="0.5" strokeOpacity="0.4"/>
      <rect x="26" y="28" width="48" height="36" rx="4" fill="#0F172A"/>
      {/* QR pattern */}
      {[[0,0],[1,0],[0,1],[2,2],[1,2],[2,1]].map(([r,c],i)=><rect key={i} x={30+c*13} y={32+r*10} width="9" height="7" rx="1.5" fill="#FF6B35" opacity={i%2===0?0.9:0.4}/>)}
      <rect x="26" y="70" width="48" height="4" rx="2" fill="#FF6B35" opacity="0.6"/>
      <rect x="26" y="78" width="36" height="3" rx="1.5" fill="#334155"/>
      <rect x="26" y="83" width="24" height="3" rx="1.5" fill="#1E3A5F"/>
      {/* Phone screen */}
      <rect x="94" y="15" width="46" height="86" rx="10" fill="#1E293B" stroke="url(#rg1)" strokeWidth="1"/>
      <rect x="110" y="15" width="14" height="4" rx="2" fill="#0F172A"/>
      {[0,1,2,3].map(i=><rect key={i} x="100" y={26+i*18} width="34" height="13" rx="4" fill={i===0?"#FF6B35":"#0F172A"} opacity={i===0?0.2:1}/>)}
      {[0,1,2,3].map(i=><rect key={i} x="104" y={30+i*18} width="20" height="3" rx="1.5" fill={i===0?"#FF6B35":"#334155"}/>)}
      {[0,1,2,3].map(i=><rect key={i} x="104" y={34+i*18} width="14" height="2" rx="1" fill="#1E3A5F"/>)}
      {/* Floating badge */}
      <g transform="translate(150,20)">
        <rect width="42" height="22" rx="11" fill="url(#rg1)" opacity="0.95"/>
        <rect x="6" y="8" width="30" height="3" rx="1.5" fill="white"/>
        <rect x="10" y="13" width="22" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>
      </g>
      {/* Sparkle dots */}
      <circle cx="165" cy="75" r="2.5" fill="#FF6B35" opacity="0.7"/>
      <circle cx="155" cy="88" r="1.5" fill="#FF6B35" opacity="0.4"/>
      <circle cx="175" cy="85" r="1.5" fill="#E63950" opacity="0.5"/>
    </svg>
  );
}

function IllustrationRetail() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bl1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4F8EF7"/><stop offset="1" stopColor="#6C3FC2"/></linearGradient>
      </defs>
      <rect width="200" height="120" fill="#0A1020"/>
      <ellipse cx="100" cy="60" rx="70" ry="50" fill="#4F8EF7" opacity="0.07"/>
      {/* Main phone - center */}
      <rect x="72" y="10" width="56" height="100" rx="12" fill="#1A2340" stroke="url(#bl1)" strokeWidth="1"/>
      <rect x="84" y="10" width="20" height="5" rx="2.5" fill="#0A1020"/>
      <rect x="78" y="20" width="44" height="70" rx="4" fill="#0D1929"/>
      {/* IMEI screen content */}
      <rect x="82" y="24" width="36" height="5" rx="2" fill="#4F8EF7" opacity="0.6"/>
      <rect x="82" y="31" width="28" height="3" rx="1.5" fill="#334155"/>
      {[0,1,2,3].map(i=><g key={i}><rect x="82" y={38+i*13} width="36" height="10" rx="3" fill="#1E293B"/><rect x="86" y={41+i*13} width="12" height="2.5" rx="1" fill={i===0?"#4F8EF7":"#334155"}/><rect x="86" y={45+i*13} width="8" height="2" rx="1" fill="#1E3A5F"/><circle cx="112" cy={43+i*13} r="3" fill={["#10C98F","#F59E0B","#4F8EF7","#EF4444"][i]} opacity="0.8"/></g>)}
      {/* Left phone (angled) */}
      <g transform="rotate(-15, 40, 60)">
        <rect x="16" y="22" width="36" height="66" rx="8" fill="#162035" stroke="#4F8EF7" strokeWidth="0.5" strokeOpacity="0.5"/>
        <rect x="22" y="30" width="24" height="42" rx="3" fill="#0D1929"/>
        {[0,1,2].map(i=><rect key={i} x="24" y={33+i*12} width="18" height="9" rx="2" fill={i===0?"#4F8EF7":"#1E293B"} opacity="0.3"/>)}
      </g>
      {/* Right phone (angled) */}
      <g transform="rotate(15, 160, 60)">
        <rect x="145" y="22" width="36" height="66" rx="8" fill="#162035" stroke="#6C3FC2" strokeWidth="0.5" strokeOpacity="0.5"/>
        <rect x="151" y="30" width="24" height="42" rx="3" fill="#0D1929"/>
        {[0,1,2].map(i=><rect key={i} x="153" y={33+i*12} width="18" height="9" rx="2" fill={i===0?"#6C3FC2":"#1E293B"} opacity="0.3"/>)}
      </g>
      {/* Badge */}
      <g transform="translate(10, 8)">
        <rect width="50" height="20" rx="10" fill="#4F8EF7" opacity="0.15"/>
        <rect x="6" y="7" width="38" height="3" rx="1.5" fill="#4F8EF7"/>
      </g>
      <circle cx="165" cy="108" r="2" fill="#4F8EF7" opacity="0.6"/>
      <circle cx="158" cy="103" r="1.5" fill="#6C3FC2" opacity="0.5"/>
    </svg>
  );
}

function IllustrationDigital() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><linearGradient id="gl1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#10C98F"/><stop offset="1" stopColor="#0891B2"/></linearGradient></defs>
      <rect width="200" height="120" fill="#061410"/>
      <ellipse cx="100" cy="60" rx="65" ry="45" fill="#10C98F" opacity="0.06"/>
      {/* Globe wireframe */}
      <ellipse cx="70" cy="60" rx="40" ry="40" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.3" fill="none"/>
      <ellipse cx="70" cy="60" rx="25" ry="40" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.2" fill="none"/>
      <ellipse cx="70" cy="60" rx="40" ry="15" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.2" fill="none"/>
      <ellipse cx="70" cy="48" rx="40" ry="5" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.15" fill="none"/>
      <ellipse cx="70" cy="72" rx="40" ry="5" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.15" fill="none"/>
      {/* Nodes */}
      <circle cx="70" cy="60" r="4" fill="#10C98F"/>
      <circle cx="30" cy="60" r="2.5" fill="#10C98F" opacity="0.7"/>
      <circle cx="110" cy="60" r="2.5" fill="#10C98F" opacity="0.7"/>
      <circle cx="70" cy="20" r="2" fill="#10C98F" opacity="0.5"/>
      <circle cx="70" cy="100" r="2" fill="#10C98F" opacity="0.5"/>
      {/* Connection lines to right panel */}
      <line x1="110" y1="60" x2="140" y2="40" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 3"/>
      <line x1="110" y1="60" x2="140" y2="60" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 3"/>
      <line x1="110" y1="60" x2="140" y2="80" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="3 3"/>
      {/* Info cards */}
      <rect x="140" y="28" width="48" height="20" rx="5" fill="#132B1F"/>
      <rect x="146" y="34" width="20" height="3" rx="1.5" fill="#10C98F"/>
      <rect x="146" y="39" width="32" height="2" rx="1" fill="#2D4A3B"/>
      <rect x="140" y="52" width="48" height="20" rx="5" fill="#132B1F" stroke="#10C98F" strokeWidth="0.5" strokeOpacity="0.5"/>
      <rect x="146" y="58" width="28" height="3" rx="1.5" fill="#4ADE80"/>
      <rect x="146" y="63" width="20" height="2" rx="1" fill="#2D4A3B"/>
      <rect x="140" y="76" width="48" height="20" rx="5" fill="#132B1F"/>
      <rect x="146" y="82" width="16" height="3" rx="1.5" fill="#10C98F"/>
      <rect x="146" y="87" width="28" height="2" rx="1" fill="#2D4A3B"/>
    </svg>
  );
}

function IllustrationDigitalize() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><linearGradient id="vg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A855F7"/><stop offset="1" stopColor="#6366F1"/></linearGradient></defs>
      <rect width="200" height="120" fill="#0C0A1E"/>
      <ellipse cx="100" cy="60" rx="70" ry="50" fill="#A855F7" opacity="0.06"/>
      {/* Staircase steps — growth chart */}
      {[0,1,2,3,4].map(i=>(
        <g key={i}>
          <rect x={20+i*30} y={90-i*14} width="28" height={14+i*14} rx="3" fill="#A855F7" opacity={0.1+i*0.12}/>
          <rect x={20+i*30} y={90-i*14} width="28" height="3" rx="1.5" fill="url(#vg1)" opacity={0.5+i*0.1}/>
        </g>
      ))}
      {/* Rocket */}
      <g transform="translate(130, 15) rotate(45)">
        <ellipse rx="12" ry="22" fill="url(#vg1)" opacity="0.9"/>
        <polygon points="0,-22 -8,-8 8,-8" fill="white" opacity="0.3"/>
        <ellipse cy="22" rx="6" ry="4" fill="#6366F1" opacity="0.6"/>
        <circle cy="-5" r="5" fill="white" opacity="0.2"/>
      </g>
      {/* Exhaust trail */}
      <path d="M148 52 Q148 70 138 85" stroke="#A855F7" strokeWidth="1.5" strokeOpacity="0.4" fill="none" strokeDasharray="3 3"/>
      <circle cx="138" cy="85" r="3" fill="#A855F7" opacity="0.3"/>
      <circle cx="142" cy="80" r="2" fill="#6366F1" opacity="0.2"/>
      {/* Stars */}
      {[[15,18],[35,12],[170,20],[185,45],[25,85]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.3"/>
      ))}
    </svg>
  );
}

function IllustrationEcom() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><linearGradient id="og1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F59E0B"/><stop offset="1" stopColor="#EF4444"/></linearGradient></defs>
      <rect width="200" height="120" fill="#100808"/>
      <ellipse cx="100" cy="60" rx="70" ry="50" fill="#F59E0B" opacity="0.06"/>
      {/* Shopping bag */}
      <rect x="55" y="40" width="90" height="68" rx="10" fill="#1F1208"/>
      <rect x="55" y="40" width="90" height="68" rx="10" stroke="url(#og1)" strokeWidth="1" strokeOpacity="0.4" fill="none"/>
      {/* Handle */}
      <path d="M75 40 Q75 22 100 22 Q125 22 125 40" stroke="url(#og1)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Items */}
      {[0,1,2].map(i=>(
        <g key={i}>
          <rect x={64+i*26} y="53" width="20" height="20" rx="4" fill="#2A1510"/>
          <rect x={68+i*26} y="57" width="12" height="12" rx="2" fill="#F59E0B" opacity={0.15+i*0.1}/>
        </g>
      ))}
      {/* Price tag */}
      <rect x="64" y="80" width="72" height="18" rx="5" fill="url(#og1)" opacity="0.15"/>
      <rect x="70" y="86" width="40" height="3" rx="1.5" fill="#F59E0B"/>
      <rect x="116" y="84" width="14" height="14" rx="4" fill="#F59E0B"/>
      <rect x="120" y="88" width="6" height="2" rx="1" fill="white"/>
      <rect x="122" y="86" width="2" height="6" rx="1" fill="white"/>
      {/* Stars */}
      {[[15,20],[185,25],[30,100],[170,95]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="1.5" fill="#F59E0B" opacity="0.4"/>
      ))}
    </svg>
  );
}

function IllustrationCRM() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs><linearGradient id="pg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#EC4899"/><stop offset="1" stopColor="#A855F7"/></linearGradient></defs>
      <rect width="200" height="120" fill="#110818"/>
      <ellipse cx="100" cy="60" rx="65" ry="45" fill="#EC4899" opacity="0.06"/>
      {/* Central node */}
      <circle cx="100" cy="60" r="16" fill="#1F0F1A" stroke="url(#pg1)" strokeWidth="1.5"/>
      <circle cx="100" cy="60" r="8" fill="url(#pg1)" opacity="0.7"/>
      {/* Satellite nodes */}
      {[[48,30],[152,30],[34,78],[166,78],[100,10]].map(([x,y],i)=>(
        <g key={i}>
          <line x1="100" y1="60" x2={x} y2={y} stroke="#EC4899" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 3"/>
          <circle cx={x} cy={y} r="10" fill="#1F0F1A" stroke="#EC4899" strokeWidth="0.5" strokeOpacity="0.5"/>
          <circle cx={x} cy={y} r="4" fill="#EC4899" opacity="0.5"/>
        </g>
      ))}
      {/* Labels */}
      <rect x="28" y="17" width="40" height="8" rx="4" fill="#EC4899" opacity="0.1"/>
      <rect x="32" y="20" width="28" height="2" rx="1" fill="#EC4899" opacity="0.5"/>
      <rect x="132" y="17" width="40" height="8" rx="4" fill="#A855F7" opacity="0.1"/>
      <rect x="136" y="20" width="28" height="2" rx="1" fill="#A855F7" opacity="0.5"/>
    </svg>
  );
}

const ILLUSTRATIONS = {
  Restaurant: IllustrationRestaurant,
  Retail: IllustrationRetail,
  "Digital Strategy": IllustrationDigital,
  Digitalization: IllustrationDigitalize,
  "E-Commerce": IllustrationEcom,
  "CRM & Management": IllustrationCRM,
};

const ACCENT_COLORS = {
  Restaurant: { a: "#FF6B35", b: "#E63950", glow: "rgba(255,107,53,0.25)" },
  Retail: { a: "#4F8EF7", b: "#6C3FC2", glow: "rgba(79,142,247,0.25)" },
  "Digital Strategy": { a: "#10C98F", b: "#0891B2", glow: "rgba(16,201,143,0.2)" },
  Digitalization: { a: "#A855F7", b: "#6366F1", glow: "rgba(168,85,247,0.2)" },
  "E-Commerce": { a: "#F59E0B", b: "#EF4444", glow: "rgba(245,158,11,0.2)" },
  "CRM & Management": { a: "#EC4899", b: "#A855F7", glow: "rgba(236,72,153,0.2)" },
};

const ARTICLES = [
  {
    id: "why-every-restaurant-needs-management-system",
    category: "Restaurant",
    categoryColor: "from-orange-400 to-red-500",
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
    illustrationKey: "Retail",
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
    illustrationKey: "Digital Strategy",
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
    illustrationKey: "Digitalization",
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
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-hidden>
        <path d="M10 14h20l-2 12H12L10 14Z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <path d="M16 14v-2a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="28" r="2" fill="currentColor" />
        <circle cx="24" cy="28" r="2" fill="currentColor" />
      </svg>
    ),
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
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-full h-full" aria-hidden>
        <circle cx="14" cy="13" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M6 30c0-5 3.6-8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="26" cy="13" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M34 30c0-5-3.6-8-8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 30c0-5 2.686-8 6-8s6 3 6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
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
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 25 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);

  function handleMove(e) {
    if (prefersReducedMotion) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() { rawX.set(0); rawY.set(0); }

  const IllustrationComponent = ILLUSTRATIONS[article.illustrationKey || article.category] || IllustrationRestaurant;
  const accent = ACCENT_COLORS[article.illustrationKey || article.category] || { a: "#4F8EF7", b: "#6C3FC2", glow: "rgba(79,142,247,0.2)" };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative flex flex-col rounded-3xl overflow-hidden focus-within:outline-none"
      style={{
        background: "#0A0F1E",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: `0 4px 24px -6px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      {/* 3D tilt illustration header */}
      <div
        className="relative overflow-hidden"
        style={{ height: 160, perspective: "600px" }}
      >
        {/* Glow beneath illustration */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 60%, ${accent.glow}, transparent 70%)`
        }}/>
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="absolute inset-0"
        >
          <IllustrationComponent />
        </motion.div>
        {/* Floating accent orb */}
        <motion.div
          animate={{ y: [0, -6, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent.a}, transparent)`, opacity: 0.4, filter: "blur(6px)" }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold backdrop-blur-md"
            style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${accent.a}40`, color: accent.a }}>
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: accent.a }}/>
            {article.category}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{article.date}</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
          <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>{article.readTime}</span>
        </div>

        <h2 className="text-[14px] font-bold leading-snug line-clamp-3 flex-1"
          style={{ color: "rgba(255,255,255,0.9)" }}>
          {article.title}
        </h2>
        <p className="mt-2 text-[12px] leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {article.tags.slice(0, 2).map((t) => (
            <span key={t} className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
              style={{ background: `${accent.a}15`, color: accent.a, border: `1px solid ${accent.a}25` }}>
              {t}
            </span>
          ))}
        </div>

        <Link
          to={`/articles/${article.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all duration-300"
          style={{ color: accent.a }}
        >
          Read article
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>
              {ARTICLES.length} Articles on Business Digitalization
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
              WhatsApp Now
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
