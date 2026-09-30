// src/components/SiteVisitsGallery.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Building2,
  Tag,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Maximize2,
  X,
  GraduationCap,
  Truck,
  Wrench,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { getSiteVisits } from "../utils/siteVisitsStorage.js";

export default function SiteVisitsGallery({ title, subtitle, maxItems = null, showAdminLink = true }) {
  const [visits, setVisits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSiteVisits();
        setVisits(data);
      } catch (e) {
        console.error("Error loading site visits:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ["All", "Product Delivery", "Software Training", "Onsite Implementation", "Client Milestone"];

  const filteredVisits = visits.filter((v) => {
    if (selectedCategory === "All") return true;
    return v.category === selectedCategory;
  });

  const displayList = maxItems ? filteredVisits.slice(0, maxItems) : filteredVisits;

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Product Delivery":
        return <Truck className="w-3.5 h-3.5" />;
      case "Software Training":
        return <GraduationCap className="w-3.5 h-3.5" />;
      case "Onsite Implementation":
        return <Wrench className="w-3.5 h-3.5" />;
      case "Client Milestone":
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Product Delivery":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "Software Training":
        return "bg-blue-50 text-blue-700 border-blue-200/80";
      case "Onsite Implementation":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Client Milestone":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/80";
    }
  };

  return (
    <section className="py-20 relative bg-gradient-to-b from-slate-50/50 via-white to-slate-50/60 border-t border-slate-200/70 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Field Deployments & Onsite Training</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              {title || "Client Deliveries & Site Visits"}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
              {subtitle ||
                "Our team conducts on-site client visits to deploy systems, assist with go-lives, and deliver hands-on software training for staff."}
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-navy-900 text-white shadow-md shadow-navy-900/10 scale-102"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100 hover:text-navy-900"
              }`}
            >
              {cat !== "All" && getCategoryIcon(cat)}
              <span>{cat === "All" ? "All Site Deliveries" : cat}</span>
              {cat === "All" && <span className="opacity-70 text-xs">({visits.length})</span>}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-slate-200/70 animate-pulse" />
            ))}
          </div>
        ) : displayList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-navy-900">No visits found in this category</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              Check back soon for updates from our latest client deployments.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayList.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                onClick={() => setActiveModalItem(item)}
                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer hover:-translate-y-1"
              >
                {/* Image Container with Cloudinary / Optimized View */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  {item.image_url?.match(/\.(mp4|mov|webm)$/i) ? (
                    <video
                      src={item.image_url}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                      muted={true}
                      defaultMuted={true}
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </span>

                    <button
                      type="button"
                      aria-label="Expand image"
                      className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Bottom Image Info (Client & Location) */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    {item.client_name && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90 drop-shadow-xs mb-0.5">
                        <Building2 className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                        <span className="truncate">{item.client_name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-[11px] text-white/75 drop-shadow-xs">
                      {item.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-300 shrink-0" />
                          <span className="truncate">{item.location}</span>
                        </span>
                      )}
                      {item.date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-blue-300 shrink-0" />
                          <span>{item.date}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-navy-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {maxItems && visits.length > maxItems && (
          <div className="mt-12 text-center">
            <Link
              to="/site-visits"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-sm hover:from-brand-700 hover:to-indigo-700 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Explore All Site Visits & Deliveries</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeModalItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-6 lg:p-10 flex items-center justify-center overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700/30 flex flex-col max-h-[90vh]"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Big Image Section */}
                <div className="relative bg-slate-950 w-full max-h-[55vh] flex items-center justify-center overflow-hidden">
                  {activeModalItem.image_url?.match(/\.(mp4|mov|webm)$/i) ? (
                    <video
                      src={activeModalItem.image_url}
                      className="max-h-[55vh] w-full object-contain pointer-events-none"
                      autoPlay
                      muted={true}
                      defaultMuted={true}
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={activeModalItem.image_url}
                      alt={activeModalItem.title}
                      className="max-h-[55vh] w-full object-contain"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getCategoryBadgeClass(
                        activeModalItem.category
                      )}`}
                    >
                      {getCategoryIcon(activeModalItem.category)}
                      <span>{activeModalItem.category}</span>
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 sm:p-8 overflow-y-auto bg-white flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      {activeModalItem.client_name && (
                        <span className="flex items-center gap-1.5 font-bold text-navy-900">
                          <Building2 className="w-4 h-4 text-brand-600" />
                          <span>{activeModalItem.client_name}</span>
                        </span>
                      )}
                      {activeModalItem.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-rose-500" />
                          <span>{activeModalItem.location}</span>
                        </span>
                      )}
                    </div>
                    {activeModalItem.date && (
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Date: {activeModalItem.date}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 mt-4">
                    {activeModalItem.title}
                  </h3>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {activeModalItem.description}
                  </p>

                  {activeModalItem.tags && activeModalItem.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {activeModalItem.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/60"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
