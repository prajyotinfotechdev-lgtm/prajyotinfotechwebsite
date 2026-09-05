// src/pages/CareerManager.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Users,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Upload,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Lock,
  Search,
  Filter,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  Check,
  Building,
  MapPin,
  Clock,
  IndianRupee,
  Layers
} from "lucide-react";
import Seo from "../components/Seo.jsx";
import {
  getJobs,
  saveJob,
  deleteJob,
  toggleJobStatus,
  resetJobsToDefault,
  exportJobsJson,
  importJobsJson,
  getApplications,
  updateApplicationStatus,
  deleteApplication
} from "../utils/careerStorage.js";
import {
  getLeads,
  updateLeadStatus,
  deleteLead
} from "../utils/leadStorage.js";

const DEFAULT_ADMIN_PIN = "admin123";

export default function CareerManager() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("prajyot_career_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Tabs: "jobs" | "applications" | "leads"
  const [activeTab, setActiveTab] = useState("jobs");

  // Data states
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [leads, setLeads] = useState([]);

  // Search & Filters
  const [searchJobQuery, setSearchJobQuery] = useState("");
  const [searchAppQuery, setSearchAppQuery] = useState("");
  const [selectedAppStatus, setSelectedAppStatus] = useState("All");
  const [searchLeadQuery, setSearchLeadQuery] = useState("");
  const [selectedLeadStatus, setSelectedLeadStatus] = useState("All");

  // Job Modal State (New / Edit)
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "Engineering",
    location: "Pune, Maharashtra (Hybrid)",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹4,00,000 - ₹7,00,000 / year",
    status: "Active",
    deadline: "Open until filled",
    summary: "",
    responsibilitiesText: "",
    requirementsText: "",
    benefitsText: ""
  });

  // Application Details Modal
  const [viewingApp, setViewingApp] = useState(null);

  // Import JSON Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const loadData = async () => {
    const [fetchedJobs, fetchedApps, fetchedLeads] = await Promise.all([
      getJobs(),
      getApplications(),
      getLeads()
    ]);
    setJobs(fetchedJobs);
    setApplications(fetchedApps);
    setLeads(fetchedLeads);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem("prajyot_career_auth", "true");
      setPinError("");
      await loadData();
    } else {
      setPinError("Incorrect PIN. Use 'admin123' or enter your admin passcode.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("prajyot_career_auth");
  };

  // Open Add Job Modal
  const handleOpenAddJob = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      department: "Engineering",
      location: "Pune, Maharashtra (Hybrid)",
      type: "Full-time",
      experience: "1-3 Years",
      salary: "Competitive / As per industry standards",
      status: "Active",
      deadline: "Open until filled",
      summary: "",
      responsibilitiesText: "",
      requirementsText: "",
      benefitsText: ""
    });
    setIsJobModalOpen(true);
  };

  // Open Edit Job Modal
  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    setJobForm({
      title: job.title || "",
      department: job.department || "Engineering",
      location: job.location || "Pune",
      type: job.type || "Full-time",
      experience: job.experience || "1-3 Years",
      salary: job.salary || "",
      status: job.status || "Active",
      deadline: job.deadline || "",
      summary: job.summary || "",
      responsibilitiesText: Array.isArray(job.responsibilities)
        ? job.responsibilities.join("\n")
        : "",
      requirementsText: Array.isArray(job.requirements)
        ? job.requirements.join("\n")
        : "",
      benefitsText: Array.isArray(job.benefits) ? job.benefits.join("\n") : ""
    });
    setIsJobModalOpen(true);
  };

  // Save Job (Create or Update)
  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!jobForm.title.trim() || !jobForm.summary.trim()) {
      alert("Please provide at least a Job Title and Role Summary.");
      return;
    }

    const payload = {
      id: editingJob ? editingJob.id : `job-${Date.now()}`,
      title: jobForm.title.trim(),
      department: jobForm.department,
      location: jobForm.location.trim(),
      type: jobForm.type,
      experience: jobForm.experience.trim(),
      salary: jobForm.salary.trim(),
      status: jobForm.status,
      deadline: jobForm.deadline.trim() || "Open until filled",
      summary: jobForm.summary.trim(),
      responsibilities: jobForm.responsibilitiesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: jobForm.requirementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      benefits: jobForm.benefitsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      postedDate: editingJob ? editingJob.postedDate : new Date().toISOString().split("T")[0]
    };

    try {
      await saveJob(payload);
      await loadData();
      setIsJobModalOpen(false);
      showToast(editingJob ? "Job opening updated successfully!" : "New job posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving job");
    }
  };

  // Delete Job
  const handleDeleteJob = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteJob(id);
        await loadData();
        showToast("Job opening deleted.");
      } catch (err) {
        console.error(err);
        alert("Error deleting job");
      }
    }
  };

  // Toggle Job Status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await toggleJobStatus(id, currentStatus);
      await loadData();
      showToast("Status updated.");
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  // Reset to Default Jobs
  const handleResetDefaults = async () => {
    if (
      window.confirm(
        "Are you sure you want to reset all job postings to the default initial set? Any custom positions will be replaced."
      )
    ) {
      try {
        await resetJobsToDefault();
        await loadData();
        showToast("Reset to default openings.");
      } catch (err) {
        console.error(err);
        alert("Error resetting jobs");
      }
    }
  };

  // Export JSON
  const handleExportJson = async () => {
    try {
      const json = await exportJobsJson();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prajyot-careers-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Exported jobs JSON to download.");
    } catch (err) {
      console.error(err);
      alert("Error exporting jobs");
    }
  };

  // Import JSON
  const handleImportJson = async (e) => {
    e.preventDefault();
    try {
      await importJobsJson(importJsonText);
      await loadData();
      setIsImportModalOpen(false);
      setImportJsonText("");
      showToast("Jobs imported successfully!");
    } catch (err) {
      alert("Error importing JSON: " + err.message);
    }
  };

  // Application Actions
  const handleAppStatusChange = async (appId, newStatus) => {
    try {
      await updateApplicationStatus(appId, newStatus);
      await loadData();
      if (viewingApp && viewingApp.id === appId) {
        setViewingApp((prev) => ({ ...prev, status: newStatus }));
      }
      showToast(`Application marked as ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Error updating application status");
    }
  };

  const handleDeleteApp = async (id, name) => {
    if (window.confirm(`Delete application from ${name}?`)) {
      try {
        await deleteApplication(id);
        await loadData();
        if (viewingApp && viewingApp.id === id) {
          setViewingApp(null);
        }
        showToast("Application deleted.");
      } catch (err) {
        console.error(err);
        alert("Error deleting application");
      }
    }
  };

  // Lead Actions
  const handleLeadStatusChange = async (leadId, newStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      await loadData();
      showToast(`Lead status updated to ${newStatus}`);
    } catch (err) {
      console.error(err);
      alert("Error updating lead status");
    }
  };

  const handleDeleteLead = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete lead from "${name}"?`)) {
      try {
        await deleteLead(id);
        await loadData();
        showToast("Lead deleted.");
      } catch (err) {
        console.error(err);
        alert("Error deleting lead");
      }
    }
  };

  // Filtered lists
  const filteredJobs = jobs.filter((j) => {
    return (
      searchJobQuery === "" ||
      j.title.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchJobQuery.toLowerCase())
    );
  });

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      searchAppQuery === "" ||
      app.candidateName.toLowerCase().includes(searchAppQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchAppQuery.toLowerCase()) ||
      app.candidateEmail.toLowerCase().includes(searchAppQuery.toLowerCase());

    const matchesStatus =
      selectedAppStatus === "All" || app.status === selectedAppStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchLeadQuery === "" ||
      lead.name.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      (lead.projectType && lead.projectType.toLowerCase().includes(searchLeadQuery.toLowerCase())) ||
      (lead.source && lead.source.toLowerCase().includes(searchLeadQuery.toLowerCase()));

    const matchesStatus =
      selectedLeadStatus === "All" || lead.status === selectedLeadStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate quick stats
  const totalOpenings = jobs.length;
  const activeOpenings = jobs.filter((j) => j.status === "Active").length;
  const closedOpenings = jobs.filter((j) => j.status === "Closed").length;
  const totalApplications = applications.length;
  const newApplications = applications.filter((a) => a.status === "New").length;
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;

  return (
    <div className="min-h-screen bg-slate-100/70 text-navy-900 pb-20">
      <Seo
        title="Recruiter Portal & Career Opportunity Manager"
        description="Admin dashboard to post, edit, manage, and review job openings and incoming applications for Prajyot Infotech."
        path="/careers/manage"
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-xl bg-navy-900 text-white shadow-xl flex items-center gap-2.5 text-sm font-medium border border-brand-500/30"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If Not Authenticated: Simple PIN Lock Screen */}
      {!isAuthenticated ? (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-bold text-navy-900">Career Portal Admin</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-6">
              Enter your admin passcode to manage job postings and candidate applications.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {pinError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {pinError}
                </div>
              )}

              <input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Passcode (Default: admin123)"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-center font-mono text-base tracking-widest focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all"
              >
                Unlock Management Portal
              </button>

              <button
                type="button"
                onClick={async () => {
                  setPinInput("admin123");
                  setIsAuthenticated(true);
                  localStorage.setItem("prajyot_career_auth", "true");
                  await loadData();
                }}
                className="w-full py-2 text-xs font-semibold text-brand-600 hover:text-brand-800 transition-colors"
              >
                Or One-Click Quick Unlock (admin123)
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center">
              <Link
                to="/careers"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Careers Page</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Authenticated Admin Dashboard */
        <div className="max-w-7xl mx-auto px-4 pt-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link to="/careers" className="hover:text-brand-600 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" />
                  <span>Public Careers</span>
                </Link>
                <span>/</span>
                <span className="font-semibold text-navy-900">Admin Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                Prajyot Infotech Admin Portal
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/careers"
                target="_blank"
                className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1.5"
              >
                <span>Live Careers Page</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-rose-50 hover:text-rose-600 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
              >
                Lock / Logout
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-6">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-medium text-slate-500">Total Openings</span>
              <div className="text-xl font-bold text-navy-900 mt-1">{totalOpenings}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-medium text-emerald-600">Active Roles</span>
              <div className="text-xl font-bold text-emerald-600 mt-1">{activeOpenings}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-medium text-brand-600">Applications</span>
              <div className="text-xl font-bold text-brand-600 mt-1">{totalApplications}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-medium text-amber-600">New Applications</span>
              <div className="text-xl font-bold text-amber-600 mt-1">{newApplications}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-medium text-violet-600">Customer Leads</span>
              <div className="text-xl font-bold text-violet-600 mt-1">{totalLeads}</div>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-medium text-rose-600">New Leads</span>
              <div className="text-xl font-bold text-rose-600 mt-1">{newLeads}</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center gap-3 mt-8 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "jobs"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Openings ({jobs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("applications")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${
                activeTab === "applications"
                  ? "bg-brand-600 text-white shadow-md shadow-brand-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Candidate Applications ({applications.length})</span>
              {newApplications > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-amber-400 text-navy-950 font-extrabold">
                  {newApplications}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${
                activeTab === "leads"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Customer Leads ({leads.length})</span>
              {newLeads > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-rose-500 text-white font-extrabold animate-pulse">
                  {newLeads} New
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: OPPORTUNITIES MANAGEMENT */}
          {activeTab === "jobs" && (
            <div className="mt-6 space-y-6">
              {/* Action Toolbar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchJobQuery}
                    onChange={(e) => setSearchJobQuery(e.target.value)}
                    placeholder="Search opportunities by title, dept..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleOpenAddJob}
                    className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-sm flex items-center gap-2 transition-all"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Post New Job</span>
                  </button>

                  <button
                    onClick={handleExportJson}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Export all postings to JSON file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export</span>
                  </button>

                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Import postings from JSON"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import</span>
                  </button>

                  <button
                    onClick={handleResetDefaults}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Reset to default seed openings"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Jobs List Table / Cards */}
              <div className="grid gap-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <button
                            onClick={() => handleToggleStatus(job.id, job.status)}
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-transform active:scale-95 flex items-center gap-1 ${
                              job.status === "Active"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }`}
                            title="Click to toggle Active / Closed"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                job.status === "Active" ? "bg-emerald-500" : "bg-slate-500"
                              }`}
                            />
                            <span>{job.status}</span>
                          </button>

                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
                            {job.department}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs text-slate-500 bg-slate-100">
                            {job.type}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-navy-900">{job.title}</h3>

                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {job.experience}
                          </span>
                          {job.salary && (
                            <span className="font-semibold text-navy-800">
                              {job.salary}
                            </span>
                          )}
                          <span>Deadline: {job.deadline || "Ongoing"}</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <button
                          onClick={() => handleOpenEditJob(job)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleToggleStatus(job.id, job.status)}
                          className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          {job.status === "Active" ? "Close Role" : "Re-open"}
                        </button>

                        <button
                          onClick={() => handleDeleteJob(job.id, job.title)}
                          className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete opportunity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
                    <p className="text-slate-500 text-sm">No job openings found matching your query.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CANDIDATE APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="mt-6 space-y-6">
              {/* Toolbar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchAppQuery}
                    onChange={(e) => setSearchAppQuery(e.target.value)}
                    placeholder="Search candidate name, role, email..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Filter Status:</span>
                  <select
                    value={selectedAppStatus}
                    onChange={(e) => setSelectedAppStatus(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs sm:text-sm rounded-xl px-3 py-2 font-medium"
                  >
                    {["All", "New", "Reviewing", "Shortlisted", "Interview", "Rejected", "Hired"].map(
                      (st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Applications List */}
              <div className="grid gap-4">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              app.status === "New"
                                ? "bg-amber-100 text-amber-800"
                                : app.status === "Shortlisted"
                                ? "bg-blue-100 text-blue-800"
                                : app.status === "Interview"
                                ? "bg-purple-100 text-purple-800"
                                : app.status === "Hired"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {app.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            Applied: {new Date(app.submittedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-navy-900">{app.candidateName}</h3>
                        <p className="text-sm font-semibold text-brand-700 mt-0.5">
                          Applied For: {app.jobTitle}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            {app.candidateEmail}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            {app.candidatePhone}
                          </span>
                          {app.experience && <span>Exp: {app.experience}</span>}
                        </div>
                      </div>

                      {/* Status Selector & Actions */}
                      <div className="flex flex-wrap items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase">
                            Status
                          </label>
                          <select
                            value={app.status}
                            onChange={(e) => handleAppStatusChange(app.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                          >
                            {["New", "Reviewing", "Shortlisted", "Interview", "Rejected", "Hired"].map(
                              (s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <button
                          onClick={() => setViewingApp(app)}
                          className="px-3.5 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>

                        <button
                          onClick={() => handleDeleteApp(app.id, app.candidateName)}
                          className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Delete application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No applications received yet matching this filter.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CUSTOMER LEADS MANAGEMENT */}
          {activeTab === "leads" && (
            <div className="mt-6 space-y-6">
              {/* Action Toolbar */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchLeadQuery}
                    onChange={(e) => setSearchLeadQuery(e.target.value)}
                    placeholder="Search leads by name, contact, project..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                {/* Status Filter Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                  {["All", "New", "Contacted", "Qualified", "Converted", "Archived"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSelectedLeadStatus(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedLeadStatus === st
                          ? "bg-violet-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leads List */}
              <div className="space-y-3">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const cleanContact = lead.contact.replace(/[^\d+]/g, "");
                    const isPhoneNum = /^\+?\d{8,15}$/.test(cleanContact);
                    const waUrl = isPhoneNum
                      ? `https://wa.me/${cleanContact}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for contacting Prajyot Infotech! We received your enquiry for ${lead.projectType || 'services'}.`)}`
                      : null;

                    return (
                      <div
                        key={lead.id}
                        className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                lead.status === "New"
                                  ? "bg-rose-100 text-rose-800 animate-pulse"
                                  : lead.status === "Contacted"
                                  ? "bg-amber-100 text-amber-800"
                                  : lead.status === "Qualified"
                                  ? "bg-blue-100 text-blue-800"
                                  : lead.status === "Converted"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {lead.status}
                            </span>

                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-200/50">
                              Source: {lead.source || "Website"}
                            </span>

                            <span className="text-xs text-slate-400">
                              {new Date(lead.createdAt || lead.created_at).toLocaleString()}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-navy-900">{lead.name}</h3>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <strong className="text-navy-900">{lead.contact}</strong>
                            </span>
                            {lead.projectType && (
                              <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                                Project: <strong>{lead.projectType}</strong>
                              </span>
                            )}
                            {lead.budget && (
                              <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                                Budget: <strong>{lead.budget}</strong>
                              </span>
                            )}
                          </div>

                          {lead.message && (
                            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                              "{lead.message}"
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                          {waUrl && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
                            >
                              <span>WhatsApp</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          <div>
                            <select
                              value={lead.status}
                              onChange={(e) => handleLeadStatusChange(lead.id, e.target.value)}
                              className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-2.5 py-2 font-semibold text-navy-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            >
                              {["New", "Contacted", "Qualified", "Converted", "Archived"].map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.name)}
                            className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
                    <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">No customer leads received yet matching this filter.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- CREATE / EDIT JOB MODAL --- */}
          <AnimatePresence>
            {isJobModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsJobModalOpen(false)}
                  className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
                >
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-navy-900">
                      {editingJob ? "Edit Job Opportunity" : "Post New Career Opportunity"}
                    </h3>
                    <button
                      onClick={() => setIsJobModalOpen(false)}
                      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveJob} className="p-6 overflow-y-auto space-y-4 flex-1 text-sm">
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Job Position Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={jobForm.title}
                        onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                        placeholder="e.g. Senior Full-Stack Engineer"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Department
                        </label>
                        <select
                          value={jobForm.department}
                          onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                        >
                          {["Engineering", "Design", "Sales & Marketing", "Internships", "Operations"].map(
                            (dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Job Type
                        </label>
                        <select
                          value={jobForm.type}
                          onChange={(e) => setJobForm({ ...jobForm, type: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                        >
                          {["Full-time", "Part-time", "Internship", "Contract"].map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Status
                        </label>
                        <select
                          value={jobForm.status}
                          onChange={(e) => setJobForm({ ...jobForm, status: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                        >
                          <option value="Active">Active (Visible)</option>
                          <option value="Closed">Closed (Hidden)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={jobForm.location}
                          onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                          placeholder="e.g. Pune (Hybrid) or Remote"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Experience Required
                        </label>
                        <input
                          type="text"
                          value={jobForm.experience}
                          onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                          placeholder="e.g. 2-4 Years or Freshers"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Salary / Compensation
                        </label>
                        <input
                          type="text"
                          value={jobForm.salary}
                          onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                          placeholder="e.g. ₹5,00,000 - ₹8,00,000"
                          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Role Overview & Summary <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={jobForm.summary}
                        onChange={(e) => setJobForm({ ...jobForm, summary: e.target.value })}
                        placeholder="Short overview explaining the purpose of this role..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Key Responsibilities (Enter one bullet point per line)
                      </label>
                      <textarea
                        rows={4}
                        value={jobForm.responsibilitiesText}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, responsibilitiesText: e.target.value })
                        }
                        placeholder="Architect and build web apps using React...&#10;Lead sprint planning...&#10;Write automated tests..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Requirements & Skills (Enter one bullet point per line)
                      </label>
                      <textarea
                        rows={4}
                        value={jobForm.requirementsText}
                        onChange={(e) =>
                          setJobForm({ ...jobForm, requirementsText: e.target.value })
                        }
                        placeholder="2+ years experience with React and Node.js...&#10;Proficiency with Git & REST APIs...&#10;Strong communication..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Benefits & Perks (Enter one bullet point per line)
                      </label>
                      <textarea
                        rows={3}
                        value={jobForm.benefitsText}
                        onChange={(e) => setJobForm({ ...jobForm, benefitsText: e.target.value })}
                        placeholder="Competitive salary + bonuses...&#10;Flexible hybrid work schedule...&#10;Learning allowance..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono text-xs"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsJobModalOpen(false)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md"
                      >
                        {editingJob ? "Update Opening" : "Publish Job Opening"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* --- VIEW APPLICATION PROFILE MODAL --- */}
          <AnimatePresence>
            {viewingApp && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setViewingApp(null)}
                  className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 20 }}
                  className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
                >
                  <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                        Candidate Application
                      </span>
                      <h3 className="text-xl font-bold text-navy-900">{viewingApp.candidateName}</h3>
                    </div>
                    <button
                      onClick={() => setViewingApp(null)}
                      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6 space-y-5 text-sm">
                    <div className="grid sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <span className="text-xs text-slate-400 block">Applied Role</span>
                        <strong className="text-navy-900">{viewingApp.jobTitle}</strong>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Submission Date</span>
                        <span className="text-slate-700">
                          {new Date(viewingApp.submittedAt).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Email</span>
                        <a
                          href={`mailto:${viewingApp.candidateEmail}`}
                          className="text-brand-600 hover:underline font-medium"
                        >
                          {viewingApp.candidateEmail}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Phone / WhatsApp</span>
                        <a
                          href={`tel:${viewingApp.candidatePhone}`}
                          className="text-brand-600 hover:underline font-medium"
                        >
                          {viewingApp.candidatePhone}
                        </a>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Experience</span>
                        <span className="text-slate-700">{viewingApp.experience || "Not specified"}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Current Status</span>
                        <select
                          value={viewingApp.status}
                          onChange={(e) => handleAppStatusChange(viewingApp.id, e.target.value)}
                          className="mt-0.5 bg-white border border-slate-300 text-xs rounded-lg px-2.5 py-1 font-semibold"
                        >
                          {["New", "Reviewing", "Shortlisted", "Interview", "Rejected", "Hired"].map(
                            (s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Candidate Links */}
                    <div className="flex flex-wrap items-center gap-3">
                      {viewingApp.linkedinUrl && (
                        <a
                          href={viewingApp.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <span>LinkedIn Profile</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {viewingApp.portfolioUrl && (
                        <a
                          href={viewingApp.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold flex items-center gap-1.5"
                        >
                          <span>Portfolio / GitHub</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <div className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-slate-500" />
                        <span>Resume: {viewingApp.resumeName || "Attached in application"}</span>
                      </div>
                    </div>

                    {/* Cover Note */}
                    {viewingApp.coverNote && (
                      <div>
                        <span className="text-xs font-bold text-navy-900 block mb-1.5">
                          Candidate Statement / Cover Note:
                        </span>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                          {viewingApp.coverNote}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <button
                      onClick={() => handleDeleteApp(viewingApp.id, viewingApp.candidateName)}
                      className="px-4 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold"
                    >
                      Delete Application
                    </button>
                    <button
                      onClick={() => setViewingApp(null)}
                      className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* --- IMPORT JSON MODAL --- */}
          <AnimatePresence>
            {isImportModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsImportModalOpen(false)}
                  className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl z-10"
                >
                  <h3 className="text-lg font-bold text-navy-900 mb-2">Import Opportunities JSON</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Paste the JSON array of jobs below to replace or restore your opportunities database.
                  </p>

                  <form onSubmit={handleImportJson}>
                    <textarea
                      rows={8}
                      required
                      value={importJsonText}
                      onChange={(e) => setImportJsonText(e.target.value)}
                      placeholder='[ { "id": "job-1", "title": "Developer", ... } ]'
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white"
                    />

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsImportModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700"
                      >
                        Import Opportunities
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
