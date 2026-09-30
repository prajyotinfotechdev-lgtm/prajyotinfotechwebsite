// src/components/admin/SiteVisitsManager.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Building2,
  Tag,
  Star,
  ExternalLink,
  RefreshCw,
  Loader2,
  X,
  Eye,
  Filter,
  Search,
  Sparkles
} from "lucide-react";
import { uploadToCloudinary } from "../../utils/cloudinary.js";
import {
  getSiteVisits,
  saveSiteVisit,
  deleteSiteVisit,
  toggleSiteVisitFeatured,
  resetSiteVisitsToDefault
} from "../../utils/siteVisitsStorage.js";

export default function SiteVisitsManager({ onToast }) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form inputs
  const [formData, setFormData] = useState({
    title: "",
    client_name: "",
    category: "Product Delivery",
    location: "Pune, Maharashtra",
    date: new Date().toISOString().split("T")[0],
    description: "",
    image_url: "",
    tagsText: "Delivery, Onsite, Training",
    featured: true
  });

  // Uploading state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getSiteVisits();
      setVisits(data);
    } catch (err) {
      console.error("Failed to load visits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      client_name: "",
      category: "Product Delivery",
      location: "Pune, Maharashtra",
      date: new Date().toISOString().split("T")[0],
      description: "",
      image_url: "",
      tagsText: "Delivery, Onsite, Training",
      featured: true
    });
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      client_name: item.client_name || "",
      category: item.category || "Product Delivery",
      location: item.location || "Pune, Maharashtra",
      date: item.date || "",
      description: item.description || "",
      image_url: item.image_url || "",
      tagsText: Array.isArray(item.tags) ? item.tags.join(", ") : "",
      featured: item.featured ?? true
    });
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadError("");
    setIsModalOpen(true);
  };

  // Handle direct file selection & instant Cloudinary upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setUploadError("Please select a valid image or video file (JPG, PNG, MP4, MOV).");
      return;
    }

    setSelectedFile(file);
    setUploadError("");
    setIsUploading(true);
    setUploadProgress(10);

    try {
      const result = await uploadToCloudinary(file, {
        folder: "prajyot_site_visits",
        tags: `site_visits,${formData.category.toLowerCase().replace(/\s+/g, "_")}`,
        onProgress: (percent) => setUploadProgress(percent)
      });

      setFormData((prev) => ({
        ...prev,
        image_url: result.secure_url || result.url
      }));

      onToast?.("Image successfully uploaded to Cloudinary!");
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
      setUploadError(err.message || "Failed to upload image to Cloudinary.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a title for the site visit.");
      return;
    }

    if (!formData.image_url.trim()) {
      alert("Please upload an image or provide an image URL.");
      return;
    }

    const tags = formData.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      id: editingItem ? editingItem.id : `visit-${Date.now()}`,
      title: formData.title.trim(),
      client_name: formData.client_name.trim(),
      category: formData.category,
      location: formData.location.trim(),
      date: formData.date,
      description: formData.description.trim(),
      image_url: formData.image_url.trim(),
      tags,
      featured: formData.featured,
      created_at: editingItem ? editingItem.created_at : new Date().toISOString()
    };

    try {
      await saveSiteVisit(payload);
      await loadData();
      setIsModalOpen(false);
      onToast?.(editingItem ? "Site visit record updated!" : "New site visit added successfully!");
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save visit record");
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteSiteVisit(id);
        await loadData();
        onToast?.("Site visit record removed.");
      } catch (err) {
        console.error(err);
        alert("Failed to delete item.");
      }
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await toggleSiteVisitFeatured(id);
      await loadData();
      onToast?.("Featured status updated.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Reset all site visit photos to default showcase entries? This will replace locally edited items."
      )
    ) {
      resetSiteVisitsToDefault();
      loadData();
      onToast?.("Reset to default showcase items.");
    }
  };

  // Filtered visits
  const filteredVisits = visits.filter((v) => {
    const matchesCategory = categoryFilter === "All" || v.category === categoryFilter;
    const matchesQuery =
      searchQuery === "" ||
      v.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-brand-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cloudinary Powered Proof Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Site Visits, Deliveries & Training Photos
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-300 max-w-2xl">
              Upload genuine photos from client site deployments, go-lives, hardware installations, and staff
              software training sessions. These directly showcase real-world execution on the live website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-3 rounded-2xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Upload New Visit Photo</span>
            </button>
            <button
              onClick={handleResetDefaults}
              title="Reset to sample items"
              className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, client name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          {["All", "Product Delivery", "Software Training", "Onsite Implementation", "Client Milestone"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? "bg-navy-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Site Visit Cards */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
        </div>
      ) : filteredVisits.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8">
          <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-navy-900">No site visit photos found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Click "Upload New Visit Photo" above to upload images to Cloudinary and display them on your website.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVisits.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                  {item.image_url?.match(/\.(mp4|mov|webm)$/i) ? (
                    <video
                      src={item.image_url}
                      className="w-full h-full object-cover"
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
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-black/60 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleToggleFeatured(item.id)}
                      title={item.featured ? "Featured on Home" : "Not featured"}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
                        item.featured ? "bg-amber-400 text-navy-950" : "bg-black/50 text-white/70 hover:text-white"
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>

                  {/* Bottom Image Overlay Info */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white text-xs">
                    {item.client_name && (
                      <div className="flex items-center gap-1.5 font-bold truncate">
                        <Building2 className="w-3.5 h-3.5 text-brand-300 shrink-0" />
                        <span>{item.client_name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h3 className="font-extrabold text-navy-900 text-base line-clamp-2">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={item.image_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-600 hover:text-brand-700 font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Original</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-200 transition-colors"
                    title="Edit Record"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.title)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-100 transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload & Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-navy-900">
                    {editingItem ? "Edit Site Visit Record" : "Upload New Site Visit Photo"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Images are securely stored and optimized on Cloudinary.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                {/* Image Upload Zone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Site Visit Media (Photo or Video) *
                  </label>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                      formData.image_url
                        ? "border-emerald-300 bg-emerald-50/30"
                        : "border-slate-300 hover:border-brand-500 bg-slate-50/70 hover:bg-brand-50/20"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/mp4,video/quicktime,video/webm"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {formData.image_url ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative w-full max-h-48 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-900 flex justify-center">
                          {formData.image_url.match(/\.(mp4|mov|webm)$/i) ? (
                            <video
                              src={formData.image_url}
                              className="w-full h-48 object-cover"
                              autoPlay
                              muted={true}
                              defaultMuted={true}
                              loop
                              playsInline
                            />
                          ) : (
                            <img
                              src={formData.image_url}
                              alt="Uploaded Preview"
                              className="w-full h-48 object-cover"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Media Uploaded to Cloudinary! Click to change.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        {isUploading ? (
                          <div className="space-y-2 w-full max-w-xs">
                            <Loader2 className="w-8 h-8 text-brand-600 animate-spin mx-auto" />
                            <div className="text-xs font-bold text-brand-700">
                              Uploading to Cloudinary... ({uploadProgress}%)
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-brand-600 h-2 transition-all duration-200"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2 shadow-xs">
                              <Upload className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-bold text-navy-900">
                              Click to choose image/video or drag & drop here
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Supports JPG, PNG, WebP, MP4, MOV (Instant Cloudinary upload)
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {uploadError && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-rose-600 font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  {/* Or Manual URL input fallback */}
                  <div className="mt-2.5">
                    <input
                      type="url"
                      placeholder="Or paste direct image URL (https://...)"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* Title & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Visit Title / Milestone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ERP System Go-Live & Handover"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Activity Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    >
                      <option value="Product Delivery">Product Delivery & Deployment</option>
                      <option value="Software Training">Software Training & Onboarding</option>
                      <option value="Onsite Implementation">Onsite Implementation & Hardware Audit</option>
                      <option value="Client Milestone">Client Milestone / Sign-off</option>
                    </select>
                  </div>
                </div>

                {/* Client Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Client / Company Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Infrastructure Solutions"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Site Location / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Chakan Industrial Area, Pune"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* Date & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Date of Visit
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ERP, IoT, Staff Training"
                      value={formData.tagsText}
                      onChange={(e) => setFormData({ ...formData, tagsText: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Visit Summary & Outcomes (What was accomplished?)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Conducted a 4-hour hands-on software training session for 30 site supervisors. Successfully integrated biometric hardware and demonstrated automated billing generation."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                {/* Featured Checkbox */}
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    Feature prominently on the Homepage gallery
                  </span>
                </label>

                {/* Modal Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all disabled:opacity-50"
                  >
                    {editingItem ? "Save Changes" : "Publish Site Visit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
