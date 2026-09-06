// src/utils/careerStorage.js
// Persistent storage helper for Prajyot Infotech Careers and Job Applications using Supabase
import { supabase } from '../lib/supabase.js';

export const INITIAL_JOBS = [
  {
    id: "job-fullstack-dev",
    title: "Full-Stack Web Developer (React & Node.js)",
    department: "Engineering",
    location: "Pune, Maharashtra (Hybrid)",
    type: "Full-time",
    experience: "2-4 Years",
    salary: "₹4,80,000 - ₹8,50,000 / year",
    status: "Active",
    posted_date: "2026-08-28",
    deadline: "Open until filled",
    summary:
      "We are looking for a passionate Full-Stack Developer to build responsive, high-performance web applications, enterprise software (CRM/ERP), and client dashboards using React, Node.js, and modern cloud technologies.",
    responsibilities: [
      "Architect and build robust web applications using React, Tailwind CSS, and Node.js.",
      "Design and consume secure RESTful APIs, WebSockets, and database schemas (PostgreSQL / MongoDB).",
      "Collaborate directly with designers, project leads, and clients to ship features quickly.",
      "Ensure cross-browser responsiveness, performance optimization, and clean code hygiene.",
      "Maintain CI/CD pipelines, automate deployments, and integrate third-party services (payment gateways, WhatsApp APIs)."
    ],
    requirements: [
      "2+ years of hands-on experience in React.js, modern JavaScript (ES6+), and CSS/Tailwind.",
      "Strong proficiency in Node.js, Express.js, and working with SQL/NoSQL databases.",
      "Familiarity with Git, state management, REST API architecture, and responsive web design.",
      "Strong debugging and problem-solving skills with attention to detail.",
      "Excellent communication and ability to work in an agile, fast-moving team."
    ],
    benefits: [
      "Competitive fixed salary + performance-linked bonuses.",
      "Flexible hybrid working culture with modern equipment allowances.",
      "Direct client exposure & rapid promotion opportunities.",
      "Continuous learning budget for courses, certifications, and conferences."
    ]
  },
  {
    id: "job-uiux-designer",
    title: "UI/UX & Product Designer",
    department: "Design",
    location: "Pune / Remote (India)",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹3,60,000 - ₹6,50,000 / year",
    status: "Active",
    posted_date: "2026-08-25",
    deadline: "2026-09-30",
    summary:
      "Transform complex business workflows into intuitive, visually stunning web and mobile interfaces. Work closely with software engineers to deliver world-class digital experiences.",
    responsibilities: [
      "Create high-fidelity wireframes, interactive prototypes, and design systems in Figma.",
      "Conduct user research, synthesize client feedback, and design user flows for web portals and mobile apps.",
      "Partner with frontend developers to ensure pixel-perfect implementation of UI designs and micro-animations.",
      "Establish brand identity guidelines, visual assets, and marketing graphics for digital campaigns."
    ],
    requirements: [
      "1-3 years of proven experience in UI/UX design with an outstanding portfolio.",
      "Mastery of Figma, component libraries, auto-layout, and prototyping tools.",
      "Solid understanding of typography, color theory, grid systems, and accessibility principles.",
      "Familiarity with modern web technologies (HTML/CSS layout principles) is a huge plus."
    ],
    benefits: [
      "Latest Figma & design asset subscriptions provided.",
      "Creative freedom to innovate and lead design direction across diverse industry projects.",
      "Flexible hours and supportive team environment."
    ]
  },
  {
    id: "job-flutter-dev",
    title: "Mobile App Developer (Flutter / React Native)",
    department: "Engineering",
    location: "Pune, Maharashtra (Hybrid)",
    type: "Full-time",
    experience: "1-3 Years",
    salary: "₹4,20,000 - ₹7,20,000 / year",
    status: "Active",
    posted_date: "2026-08-20",
    deadline: "Open until filled",
    summary:
      "Build cross-platform mobile apps that delight thousands of users across Android and iOS, integrating with backend services, push notifications, and offline-first storage.",
    responsibilities: [
      "Develop cross-platform mobile applications using Flutter or React Native.",
      "Integrate native device features, camera, GPS, notifications, and local storage.",
      "Optimize mobile app performance, smooth 60fps animations, and app store release readiness.",
      "Maintain code cleanliness and write unit tests for critical business logic."
    ],
    requirements: [
      "Proficiency in Flutter (Dart) or React Native (TypeScript/JavaScript).",
      "Experience releasing and maintaining apps on Google Play Store & Apple App Store.",
      "Experience with state management (Riverpod, Bloc, Redux, or Zustand).",
      "Knowledge of background services, push notifications, and REST/GraphQL APIs."
    ],
    benefits: [
      "Real-world mobile product ownership.",
      "Mentorship from experienced technical leads.",
      "Annual performance appraisals and bonus incentives."
    ]
  }
];

// --- Job Storage Helpers ---

export async function getJobs() {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false });

    if (error) {
      console.error("Error fetching jobs from Supabase:", error);
      return [];
    }
    
    // If empty, seed database
    if (data.length === 0) {
      await resetJobsToDefault();
      return INITIAL_JOBS.map(j => ({ ...j, postedDate: j.posted_date }));
    }

    // Map DB fields to application fields (e.g., posted_date to postedDate)
    return data.map(j => ({
      ...j,
      postedDate: j.posted_date
    }));
  } catch (err) {
    console.error("Error connecting to Supabase for jobs:", err);
    return [];
  }
}

export async function getJobById(id) {
  const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (error) return null;
  return { ...data, postedDate: data.posted_date };
}

export async function saveJob(jobData) {
  const formattedJob = {
    id: jobData.id || `job-${Date.now()}`,
    title: jobData.title,
    department: jobData.department,
    location: jobData.location,
    type: jobData.type,
    experience: jobData.experience,
    salary: jobData.salary,
    status: jobData.status || "Active",
    posted_date: jobData.postedDate || jobData.posted_date || new Date().toISOString().split("T")[0],
    deadline: jobData.deadline,
    summary: jobData.summary,
    responsibilities: Array.isArray(jobData.responsibilities)
      ? jobData.responsibilities
      : typeof jobData.responsibilities === "string"
      ? jobData.responsibilities.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    requirements: Array.isArray(jobData.requirements)
      ? jobData.requirements
      : typeof jobData.requirements === "string"
      ? jobData.requirements.split("\n").map((s) => s.trim()).filter(Boolean)
      : [],
    benefits: Array.isArray(jobData.benefits)
      ? jobData.benefits
      : typeof jobData.benefits === "string"
      ? jobData.benefits.split("\n").map((s) => s.trim()).filter(Boolean)
      : []
  };

  const { data, error } = await supabase
    .from('jobs')
    .upsert(formattedJob)
    .select()
    .single();

  if (error) {
    console.error("Error saving job:", error);
    throw error;
  }
  
  return { ...data, postedDate: data.posted_date };
}

export async function deleteJob(id) {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw error;
  return true;
}

export async function toggleJobStatus(id, currentStatus) {
  const newStatus = currentStatus === "Active" ? "Closed" : "Active";
  const { error } = await supabase.from('jobs').update({ status: newStatus }).eq('id', id);
  if (error) throw error;
  return true;
}

export async function resetJobsToDefault() {
  await supabase.from('jobs').delete().neq('id', 'temp_never'); // Delete all
  const { error } = await supabase.from('jobs').insert(INITIAL_JOBS);
  if (error) throw error;
  return INITIAL_JOBS;
}

export async function exportJobsJson() {
  const { data } = await supabase.from('jobs').select('*');
  return JSON.stringify(data, null, 2);
}

export async function importJobsJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) throw new Error("Invalid jobs format: expected array");
    const { error } = await supabase.from('jobs').upsert(parsed);
    if (error) throw error;
    return parsed;
  } catch (err) {
    throw new Error("Failed to parse/import jobs JSON: " + err.message);
  }
}

// --- Application Storage Helpers ---

export async function getApplications() {
  try {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error("Error fetching applications:", error);
      return [];
    }
    return data.map(app => ({
      ...app,
      jobId: app.job_id,
      jobTitle: app.job_title,
      candidateName: app.candidate_name,
      candidateEmail: app.candidate_email,
      candidatePhone: app.candidate_phone,
      linkedinUrl: app.linkedin_url,
      portfolioUrl: app.portfolio_url,
      resumeName: app.resume_name,
      coverNote: app.cover_note,
      submittedAt: app.submitted_at
    }));
  } catch (err) {
    console.error("Error connecting to applications:", err);
    return [];
  }
}

export async function submitApplication(appData) {
  // Client-side Rate Limiting (Max 3 applications per hour)
  const now = Date.now();
  const lastSubmitStr = localStorage.getItem('last_app_submit');
  const countStr = localStorage.getItem('app_submit_count');
  
  if (lastSubmitStr && countStr) {
    const lastSubmit = parseInt(lastSubmitStr, 10);
    const count = parseInt(countStr, 10);
    if (now - lastSubmit < 60 * 60 * 1000) {
      if (count >= 3) {
        throw new Error("You have submitted too many applications recently. Please try again later.");
      }
      localStorage.setItem('app_submit_count', (count + 1).toString());
    } else {
      localStorage.setItem('last_app_submit', now.toString());
      localStorage.setItem('app_submit_count', '1');
    }
  } else {
    localStorage.setItem('last_app_submit', now.toString());
    localStorage.setItem('app_submit_count', '1');
  }
  const newApp = {
    id: `app-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    job_id: appData.jobId || "general",
    job_title: appData.jobTitle || "General Application",
    candidate_name: appData.candidateName || "",
    candidate_email: appData.candidateEmail || "",
    candidate_phone: appData.candidatePhone || "",
    experience: appData.experience || "",
    linkedin_url: appData.linkedinUrl || "",
    portfolio_url: appData.portfolioUrl || "",
    resume_name: appData.resumeName || "Uploaded_Resume.pdf",
    cover_note: appData.coverNote || "",
    submitted_at: new Date().toISOString(),
    status: "New" // "New" | "Reviewing" | "Shortlisted" | "Interview" | "Rejected" | "Hired"
  };

  const { data, error } = await supabase.from('applications').insert(newApp).select().single();
  if (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
  return data;
}

export async function updateApplicationStatus(id, status) {
  const { error } = await supabase.from('applications').update({ status }).eq('id', id);
  if (error) throw error;
  return true;
}

export async function deleteApplication(id) {
  const { error } = await supabase.from('applications').delete().eq('id', id);
  if (error) throw error;
  return true;
}
