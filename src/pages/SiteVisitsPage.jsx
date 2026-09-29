// src/pages/SiteVisitsPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, GraduationCap, Building2, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import SiteVisitsGallery from "../components/SiteVisitsGallery.jsx";

export default function SiteVisitsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-slate-900 text-white py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/20 text-brand-300 text-xs font-extrabold uppercase tracking-wider mb-4"
          >
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Field Deployments & Onsite Training</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto"
          >
            Client Site Visits & Software Training
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Photos and videos from our recent software deployments, ERP handovers, and hands-on staff training sessions at client locations.
          </motion.p>

          {/* Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <Truck className="w-5 h-5 text-brand-400 mb-2" />
              <div className="text-xl font-black text-white">Onsite Delivery</div>
              <div className="text-xs text-slate-400">Direct hardware & software handover</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <GraduationCap className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-xl font-black text-white">Staff Training</div>
              <div className="text-xs text-slate-400">Comprehensive employee onboarding</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <Building2 className="w-5 h-5 text-emerald-400 mb-2" />
              <div className="text-xl font-black text-white">Go-Live ERP</div>
              <div className="text-xs text-slate-400">On-ground system setup & launch</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mb-2" />
              <div className="text-xl font-black text-white">Real Clients</div>
              <div className="text-xs text-slate-400">Photos & videos of live visits</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <SiteVisitsGallery
          title="Explore All Site Visits & Deliveries"
          subtitle="Filter by activity category or search through photo & video records from our client sites."
          showAdminLink={true}
        />
      </main>
    </div>
  );
}
