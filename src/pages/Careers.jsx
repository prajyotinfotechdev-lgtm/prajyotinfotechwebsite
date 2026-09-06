// src/pages/Careers.jsx
import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Clock,
  IndianRupee,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Zap,
  Coffee,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  Send,
  X,
  FileText,
  Upload,
  ExternalLink,
  SlidersHorizontal,
  ChevronRight,
  Settings
} from "lucide-react";
import Seo from "../components/Seo.jsx";
import { getJobs, submitApplication } from "../utils/careerStorage.js";

const DEPARTMENTS = ["All", "Engineering", "Design", "Sales & Marketing", "Internships"];
const JOB_TYPES = ["All Types", "Full-time", "Internship", "Remote"];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedType, setSelectedType] = useState("All Types");

  // Selected job for detail modal
  const [activeJobDetail, setActiveJobDetail] = useState(null);

  // Job for application modal
  const [applyingJob, setApplyingJob] = useState(null);

  // Application form state
  const [form, setForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    experience: "",
    linkedinUrl: "",
    portfolioUrl: "",
    resumeFile: null,
    resumeName: "",
    coverNote: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Load jobs on mount
  useEffect(() => {
    async function loadJobs() {
      const data = await getJobs();
      setJobs(data);
    }
    loadJobs();
    
    // Polling or real-time could be added here, but for now we'll just load on mount
  }, []);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Must be Active for public view (or show active by default)
      if (job.status !== "Active") return false;

      const matchesSearch =
        searchQuery.trim() === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.requirements &&
          job.requirements.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesDept =
        selectedDept === "All" ||
        job.department.toLowerCase() === selectedDept.toLowerCase();

      const matchesType =
        selectedType === "All Types" ||
        job.type.toLowerCase().includes(selectedType.toLowerCase()) ||
        (selectedType === "Remote" && job.location.toLowerCase().includes("remote"));

      return matchesSearch && matchesDept && matchesType;
    });
  }, [jobs, searchQuery, selectedDept, selectedType]);

  const handleApplyClick = (job) => {
    setActiveJobDetail(null);
    setApplyingJob(job);
    setIsSubmitted(false);
    setFormError("");
    setForm({
      candidateName: "",
      candidateEmail: "",
      candidatePhone: "",
      experience: "",
      linkedinUrl: "",
      portfolioUrl: "",
      resumeFile: null,
      resumeName: "",
      coverNote: ""
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        resumeFile: file,
        resumeName: file.name
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.candidateName.trim() || !form.candidateEmail.trim() || !form.candidatePhone.trim()) {
      setFormError("Please fill in your name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitApplication({
        jobId: applyingJob ? applyingJob.id : "general-inquiry",
        jobTitle: applyingJob ? applyingJob.title : "General Speculative Application",
        candidateName: form.candidateName.trim(),
        candidateEmail: form.candidateEmail.trim(),
        candidatePhone: form.candidatePhone.trim(),
        experience: form.experience.trim(),
        linkedinUrl: form.linkedinUrl.trim(),
        portfolioUrl: form.portfolioUrl.trim(),
        resumeName: form.resumeName || "Resume_Submitted.pdf",
        coverNote: form.coverNote.trim()
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      setFormError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data schema for Google Jobs
  const jobSchema = useMemo(() => {
    return filteredJobs.map((j) => ({
      "@context": "https://schema.org/",
      "@type": "JobPosting",
      title: j.title,
      description: j.summary,
      datePosted: j.postedDate,
      employmentType: j.type === "Internship" ? "INTERN" : "FULL_TIME",
      hiringOrganization: {
        "@type": "Organization",
        name: "Prajyot Infotech",
        sameAs: "https://prajyotinfotech.in",
        logo: "https://prajyotinfotech.in/videos/Logo.jpg"
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "MH",
          addressCountry: "IN"
        }
      }
    }));
  }, [filteredJobs]);

  return (
    <div className="min-h-screen bg-slate-50 text-navy-900 pb-20">
      <Seo
        title="Careers at Prajyot Infotech — Work With Us & Build the Future"
        description="Explore open engineering, design, and growth positions at Prajyot Infotech. Join our Pune & remote team to build enterprise software, scalable web apps, and innovative digital solutions."
        keywords="careers, software developer jobs pune, react developer jobs, UI/UX designer hiring, Prajyot Infotech careers, IT jobs pune, internship"
        path="/careers"
        schema={jobSchema}
      />

      {/* Top Banner / Breadcrumb Bar */}
      <div className="border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy-900 font-semibold">Careers</span>
          </div>
          <Link
            to="/careers/manage"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-medium transition-colors border border-slate-200/70"
            title="Recruiter / Admin Opportunity Management"
          >
            <Settings className="w-3.5 h-3.5 text-brand-600" />
            <span>Manage Openings</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-brand-300/25 to-navy-400/20 blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute -top-10 -right-20 w-80 h-80 bg-brand-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100/70 border border-brand-200 text-brand-800 text-xs md:text-sm font-semibold mb-6 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brand-600 animate-pulse" />
            <span>We're Hiring Passionate Builders & Thinkers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-navy-900 leading-[1.15] max-w-4xl mx-auto"
          >
            Build Meaningful Software. <br />
            <span className="text-gradient">Elevate Your Career</span> With Us.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            At Prajyot Infotech, we solve real-world problems for high-growth enterprises and fast startups.
            Take ownership, master modern tech stacks, and grow alongside an energetic team.
          </motion.p>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: "Delivered Projects", value: "50+" },
              { label: "Active Roles", value: `${filteredJobs.length} Openings` },
              { label: "Work Culture", value: "Hybrid & Agile" },
              { label: "Skill Growth", value: "100% Hands-on" }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-xl md:text-2xl font-bold text-navy-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Work With Us / Culture & Perks */}
      <section className="max-w-7xl mx-auto px-4 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Why You'll Love Working Here</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We value craftsmanship, radical transparency, and personal well-being over rigid corporate bureaucracy.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Zap,
              title: "High-Impact Ownership",
              desc: "No corporate red tape. Your code, designs, and decisions directly launch to production and impact real users."
            },
            {
              icon: GraduationCap,
              title: "Modern Tech & Learning",
              desc: "Work with modern tools: React, Vite, Node.js, Cloud Architectures, and AI workflows. Learning stipends included."
            },
            {
              icon: Coffee,
              title: "Hybrid Flexibility",
              desc: "Healthy balance between collaborative in-office sessions in Pune and comfortable remote work days."
            },
            {
              icon: IndianRupee,
              title: "Fair & Rewarding Pay",
              desc: "Competitive salary packages, timely appraisal cycles, and performance bonuses that reward actual outcomes."
            },
            {
              icon: HeartHandshake,
              title: "Mentorship & Direct Access",
              desc: "Learn directly from experienced founders and technical leaders who guide your career progression."
            },
            {
              icon: ShieldCheck,
              title: "Job Stability & Growth",
              desc: "Be a core early pillar of a rapidly expanding digital powerhouse with long-term leadership potential."
            }
          ].map((perk, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-300 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all mb-4">
                <perk.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2">{perk.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Job Openings Section */}
      <section id="open-roles" className="max-w-7xl mx-auto px-4 scroll-mt-24">
        {/* Header & Filter Controls */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">Current Openings</h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filteredJobs.length} active {filteredJobs.length === 1 ? "position" : "positions"}
              </p>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role, skill, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-navy-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Department Pills & Type Filter */}
          <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Department Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {DEPARTMENTS.map((dept) => {
                const isActive = selectedDept === dept;
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-brand-600 text-white shadow-sm shadow-brand-500/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-navy-900"
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>

            {/* Job Type Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-xs sm:text-sm text-navy-900 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              >
                {JOB_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid gap-4">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-brand-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                      {job.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {job.type}
                    </span>
                    <span className="text-xs text-slate-400">
                      Posted {job.postedDate || "Recently"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900 group-hover:text-brand-700 transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2 line-clamp-2 max-w-3xl leading-relaxed">
                    {job.summary}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {job.experience}
                    </span>
                    {job.salary && (
                      <span className="flex items-center gap-1.5 text-navy-800 font-semibold">
                        <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                        {job.salary}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <button
                    onClick={() => setActiveJobDetail(job)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-sm font-semibold text-white shadow-sm shadow-brand-500/20 hover:shadow hover:shadow-brand-500/30 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-navy-900">No positions matched your criteria</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-2">
              Try adjusting your search terms or clearing the selected department filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDept("All");
                setSelectedType("All Types");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-50 text-brand-700 text-sm font-semibold hover:bg-brand-100 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Spontaneous Application Banner */}
        <div className="mt-12 bg-gradient-to-br from-navy-900 via-navy-800 to-brand-950 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-brand-200 text-xs font-semibold mb-3 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-brand-300" />
              Spontaneous Applications
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">Don't see your specific role listed?</h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
              We are constantly seeking brilliant engineers, UI designers, technical writers, and growth leaders.
              Submit your resume and portfolio — if there is a match, we will create a role for you!
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  handleApplyClick({
                    id: "spontaneous",
                    title: "General / Spontaneous Application",
                    department: "Engineering / Design / Growth",
                    type: "Full-time / Flexible"
                  })
                }
                className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                Send Us Your Resume
              </button>
              <a
                href="mailto:hr@prajyotinfotech.in?subject=Job%20Inquiry%20-%20Prajyot%20Infotech"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all border border-white/15"
              >
                Email HR Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- JOB DETAIL MODAL / DRAWER --- */}
      <AnimatePresence>
        {activeJobDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJobDetail(null)}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                      {activeJobDetail.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {activeJobDetail.type}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
                    {activeJobDetail.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {activeJobDetail.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {activeJobDetail.experience}
                    </span>
                    {activeJobDetail.salary && (
                      <span className="flex items-center gap-1.5 font-semibold text-navy-900">
                        <IndianRupee className="w-4 h-4 text-emerald-600" />
                        {activeJobDetail.salary}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveJobDetail(null)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
                <div>
                  <h4 className="text-base font-bold text-navy-900 mb-2">Role Overview</h4>
                  <p>{activeJobDetail.summary}</p>
                </div>

                {activeJobDetail.responsibilities?.length > 0 && (
                  <div>
                    <h4 className="text-base font-bold text-navy-900 mb-2.5">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {activeJobDetail.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeJobDetail.requirements?.length > 0 && (
                  <div>
                    <h4 className="text-base font-bold text-navy-900 mb-2.5">What We Look For</h4>
                    <ul className="space-y-2">
                      {activeJobDetail.requirements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeJobDetail.benefits?.length > 0 && (
                  <div>
                    <h4 className="text-base font-bold text-navy-900 mb-2.5">Benefits & Perks</h4>
                    <ul className="space-y-2">
                      {activeJobDetail.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveJobDetail(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleApplyClick(activeJobDetail)}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center gap-2"
                >
                  <span>Apply for this Role</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- APPLICATION FORM MODAL --- */}
      <AnimatePresence>
        {applyingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setApplyingJob(null)}
              className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                    Job Application
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mt-0.5">
                    {applyingJob.title}
                  </h3>
                </div>
                <button
                  onClick={() => setApplyingJob(null)}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content / Success Screen */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900">Application Submitted!</h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                      Thank you, <strong className="text-navy-900">{form.candidateName}</strong>. We've received your profile for{" "}
                      <strong className="text-navy-900">{applyingJob.title}</strong>. Our technical talent team will review your details and connect with you shortly.
                    </p>
                    <div className="mt-8">
                      <button
                        onClick={() => setApplyingJob(null)}
                        className="px-6 py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm hover:bg-brand-700 transition-colors"
                      >
                        Done & Back to Careers
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {formError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                        {formError}
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.candidateName}
                          onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.candidateEmail}
                          onChange={(e) => setForm({ ...form, candidateEmail: e.target.value })}
                          placeholder="rahul@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Phone / WhatsApp <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.candidatePhone}
                          onChange={(e) => setForm({ ...form, candidatePhone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          Total Relevant Experience
                        </label>
                        <input
                          type="text"
                          value={form.experience}
                          onChange={(e) => setForm({ ...form, experience: e.target.value })}
                          placeholder="e.g. 2 Years, or Fresher"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={form.linkedinUrl}
                          onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
                          placeholder="https://linkedin.com/in/username"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy-900 mb-1">
                          GitHub or Portfolio Link
                        </label>
                        <input
                          type="url"
                          value={form.portfolioUrl}
                          onChange={(e) => setForm({ ...form, portfolioUrl: e.target.value })}
                          placeholder="https://github.com/username or portfolio"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                        />
                      </div>
                    </div>

                    {/* Resume Upload / File Picker */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Resume / CV (PDF or DOC)
                      </label>
                      <div className="relative border-2 border-dashed border-slate-300 hover:border-brand-400 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center justify-center gap-1.5">
                          <Upload className="w-5 h-5 text-brand-600" />
                          <span className="text-xs font-medium text-slate-700">
                            {form.resumeName ? (
                              <strong className="text-brand-700">{form.resumeName}</strong>
                            ) : (
                              "Click to browse or drag & drop your resume"
                            )}
                          </span>
                          <span className="text-[11px] text-slate-400">PDF or Word file (Max 10MB)</span>
                        </div>
                      </div>
                    </div>

                    {/* Cover Note */}
                    <div>
                      <label className="block text-xs font-semibold text-navy-900 mb-1">
                        Why are you excited about this role? (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={form.coverNote}
                        onChange={(e) => setForm({ ...form, coverNote: e.target.value })}
                        placeholder="Tell us a little about your passions, past projects, or why you'd like to work with Prajyot Infotech..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setApplyingJob(null)}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
