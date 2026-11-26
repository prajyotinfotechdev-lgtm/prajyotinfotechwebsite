// src/pages/Testimonials.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { Star, Quote, ArrowRight, MessageSquare, ShieldCheck, CheckCircle2 } from "lucide-react";

const SITE_URL = "https://www.prajyotinfotech.in";
const BRAND = "Prajyot Infotech";
const WA = "917020708747";

const reviews = [
  {
    id: "sagya-lehengas",
    name: "Pooja Rathod",
    role: "Owner & Creative Director",
    company: "Sagya Lehengas",
    location: "Latur, Maharashtra",
    industry: "Fashion & E-Commerce",
    rating: 5,
    project: "Custom E-Commerce Platform with Virtual Try-On",
    projectUrl: "/work/sagya-lehengas",
    review:
      "Prajyot Infotech completely transformed our bridal lehenga business from a manual Instagram DM operation into a fully automated online store. Our organic sales jumped 340% in just 3 months — the website loads instantly and our customers absolutely love the virtual try-on experience. Best investment we've ever made.",
    results: ["340% sales increase", "0.4s page load", "42% lower cart abandonment"],
    avatar: "PR",
    avatarColor: "bg-rose-100 text-rose-700",
    date: "2026-10-15",
  },
  {
    id: "restaurant-mgmt",
    name: "Mahesh Kulkarni",
    role: "Proprietor",
    company: "Kulkarni Family Restaurant",
    location: "Pune, Maharashtra",
    industry: "Food & Beverage",
    rating: 5,
    project: "Cloud Restaurant POS & Kitchen Display System",
    projectUrl: "/work/restaurant-management",
    review:
      "Before this system, our waiters were writing orders on paper and losing chits. Now every table order goes directly to the kitchen display, bills are generated automatically with GST, and customers get WhatsApp receipts. Table turnover speed improved by 45% during peak hours. Absolutely life-changing for a restaurant.",
    results: ["45% faster table turnover", "Zero lost KOTs", "WhatsApp auto-billing"],
    avatar: "MK",
    avatarColor: "bg-amber-100 text-amber-700",
    date: "2026-09-28",
  },
  {
    id: "mobile-shop",
    name: "Ravi Kamble",
    role: "Managing Director",
    company: "Kamble Mobile Hub",
    location: "Latur, Maharashtra",
    industry: "Electronics Retail",
    rating: 5,
    project: "Mobile Shop POS & IMEI Billing System",
    projectUrl: "/work/mobile-shop-management",
    review:
      "We had three stores and zero visibility into what handsets were sold where. Prajyot Infotech built us a complete POS with IMEI tracking, repair job cards, and thermal billing. Now every device is tracked from purchase to customer handover. Billing time went from 15 minutes to 90 seconds. Zero IMEI conflicts across all three branches.",
    results: ["90% faster billing", "Zero IMEI leakage", "3-branch inventory sync"],
    avatar: "RK",
    avatarColor: "bg-indigo-100 text-indigo-700",
    date: "2026-10-05",
  },
  {
    id: "construction-erp",
    name: "Santosh Patil",
    role: "Site Manager",
    company: "Patil Construction Works",
    location: "Nanded, Maharashtra",
    industry: "Construction & Infrastructure",
    rating: 5,
    project: "OIBUZ Construction HRMS & Attendance System",
    projectUrl: "/oibuz",
    review:
      "We used to lose ₹1.5 lakh every month to fake attendances and incorrect labour payments. After installing Prajyot Infotech's OIBUZ system with geofenced selfie attendance, that dropped to nearly zero. The reports come automatically to my phone every evening. Best ROI I've ever seen on any software — paid for itself in 3 weeks.",
    results: ["₹1.5L/month leakage stopped", "Real-time attendance", "Automatic salary reports"],
    avatar: "SP",
    avatarColor: "bg-emerald-100 text-emerald-700",
    date: "2026-10-20",
  },
  {
    id: "ecommerce-startup",
    name: "Aarav Joshi",
    role: "Founder",
    company: "CraftVine Marketplace",
    location: "Pune, Maharashtra",
    industry: "D2C E-Commerce Startup",
    rating: 5,
    project: "Multi-Vendor E-Commerce SaaS Platform",
    projectUrl: "/work",
    review:
      "I had a vision for a multi-vendor handicraft marketplace but didn't know where to start technically. Prajyot Infotech took me from concept to deployed product in 7 weeks — full-stack with vendor onboarding, Razorpay split payments, and an admin panel I actually understand. Their communication was exceptional throughout.",
    results: ["7-week full delivery", "Razorpay split payments", "Multi-vendor portal"],
    avatar: "AJ",
    avatarColor: "bg-purple-100 text-purple-700",
    date: "2026-08-18",
  },
  {
    id: "clinic-management",
    name: "Dr. Priya Deshpande",
    role: "Chief Medical Officer",
    company: "Deshpande Dental Clinic",
    location: "Pune, Maharashtra",
    industry: "Healthcare",
    rating: 5,
    project: "Patient Appointment & Digital Prescription System",
    projectUrl: "/work",
    review:
      "Our clinic was drowning in paper files. Prajyot Infotech built a beautiful patient portal where patients can book appointments online, doctors access digital prescriptions, and we send WhatsApp reminders automatically. Patient no-shows dropped by 60%. The whole team loves it — even our senior doctors who aren't tech-savvy.",
    results: ["60% lower no-shows", "WhatsApp reminders", "Full digital prescriptions"],
    avatar: "PD",
    avatarColor: "bg-teal-100 text-teal-700",
    date: "2026-09-12",
  },
];

const aggregateSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": BRAND,
  "@id": `${SITE_URL}/#organization`,
  "url": SITE_URL,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": reviews.length.toString(),
    "bestRating": "5",
    "worstRating": "1",
  },
  "review": reviews.map((r) => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": r.rating.toString(),
      "bestRating": "5",
    },
    "author": {
      "@type": "Person",
      "name": r.name,
    },
    "reviewBody": r.review,
    "datePublished": r.date,
    "itemReviewed": {
      "@type": "Service",
      "name": r.project,
      "provider": { "@type": "Organization", "name": BRAND },
    },
  })),
};

const Stars = ({ count = 5 }) => (
  <div className="flex items-center gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
    ))}
  </div>
);

export default function Testimonials() {
  const [filter, setFilter] = useState("All");
  const industries = ["All", ...new Set(reviews.map((r) => r.industry))];
  const filtered = filter === "All" ? reviews : reviews.filter((r) => r.industry === filter);

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Client Success Stories", url: `${SITE_URL}/testimonials` },
        ]}
      />
      <Seo
        title="Client Reviews & Success Stories | Prajyot Infotech — Rated 4.9/5"
        description="Read verified client success stories and project reviews from Prajyot Infotech. 4.9/5 average across 48+ projects. See measurable ROI from real businesses in Maharashtra, India and globally."
        keywords="Prajyot Infotech reviews, client testimonials Pune, software development company reviews India, Prajyot Infotech success stories, software company rating Maharashtra"
        path="/testimonials"
        schema={[aggregateSchema]}
      />

      <main className="mx-auto max-w-7xl px-4 py-14">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            4.9 / 5 Average across 48+ Verified Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            What Our Clients Say
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            Real results, real businesses. Every story below is a verified client project delivered with 100% IP ownership, on-time, and within scope.
          </p>

          {/* Aggregate Rating Bar */}
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-amber-200 shadow-sm">
            <div className="text-center">
              <div className="text-4xl font-black text-slate-900">4.9</div>
              <Stars />
              <div className="text-xs text-slate-500 mt-1">out of 5</div>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-left space-y-1">
              {[5, 4, 3].map((star) => (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-3 text-slate-500 text-right">{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: star === 5 ? "92%" : star === 4 ? "7%" : "1%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <div className="text-2xl font-black text-slate-900">48+</div>
              <div className="text-xs text-slate-500">Verified Projects</div>
            </div>
          </div>
        </div>

        {/* Industry Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                filter === ind
                  ? "bg-brand-600 text-white border-brand-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-brand-300 hover:text-brand-700"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-brand-300 transition-all flex flex-col overflow-hidden"
            >
              {/* Card Top — quote body */}
              <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <Stars count={r.rating} />
                  <Quote className="w-5 h-5 text-slate-200" />
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">
                  "{r.review}"
                </p>

                {/* Results Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {r.results.map((res) => (
                    <span
                      key={res}
                      className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200"
                    >
                      ✓ {res}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Bottom — author */}
              <div className="border-t border-slate-100 p-5 flex items-center gap-3">
                <div className={`size-10 rounded-full ${r.avatarColor} flex items-center justify-center font-black text-sm shrink-0`}>
                  {r.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-900 text-sm truncate">{r.name}</div>
                  <div className="text-xs text-slate-500 truncate">{r.role} · {r.company}</div>
                  <div className="text-[11px] text-slate-400">{r.location}</div>
                </div>
                <Link
                  to={r.projectUrl}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-brand-700 hover:border-brand-300 text-xs font-semibold transition-colors"
                >
                  View Work
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Trust CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-navy-900 p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Satisfaction Guaranteed or We Rework for Free
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">
              Ready to Write Your Own Success Story?
            </h2>
            <p className="text-white/80 text-base max-w-xl mx-auto mb-8">
              Every project comes with fixed-price milestones, 100% IP ownership, and a 60-day post-launch warranty. Zero risk, guaranteed results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi Prajyot Infotech, I want to start a project. Let's discuss my requirements.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-800 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Start on WhatsApp
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/40 bg-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all"
              >
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-white/70">
              {["100% IP Ownership", "Fixed-Price Contracts", "60-Day Bug Warranty", "NDA on Request"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

