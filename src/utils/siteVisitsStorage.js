// src/utils/siteVisitsStorage.js
import { supabase } from "../lib/supabase.js";

const LOCAL_STORAGE_KEY = "prajyot_site_visits_data_v1";

// Default curated site visit showcases
export const DEFAULT_SITE_VISITS = [
  {
    id: "visit-1",
    title: "ERP & Construction HRMS Go-Live",
    client_name: "Apex Infrastructure Solutions",
    category: "Product Delivery",
    location: "Pune, Maharashtra",
    date: "2024-11-18",
    description:
      "Successfully deployed custom cloud-based ERP & labor biometric tracking system across 3 active project sites. Delivered admin dashboards and live syncing.",
    image_url:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    tags: ["ERP", "Deployment", "Construction Tech"],
    featured: true,
    created_at: "2024-11-18T10:00:00Z"
  },
  {
    id: "visit-2",
    title: "Hands-On Software Training & Staff Onboarding",
    client_name: "Sahyadri Industrial Engineering",
    category: "Software Training",
    location: "Chakan Industrial Zone, Pune",
    date: "2024-10-24",
    description:
      "Conducted intensive on-site training workshop for 35+ engineers and account executives on digital billing, inventory dispatch, and automated GST reporting.",
    image_url:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    tags: ["Training", "Workshop", "User Adoption"],
    featured: true,
    created_at: "2024-10-24T14:30:00Z"
  },
  {
    id: "visit-3",
    title: "Client Site Audit & Hardware Integration",
    client_name: "Mahalaxmi Buildcon",
    category: "Onsite Implementation",
    location: "Kolhapur, Maharashtra",
    date: "2024-09-12",
    description:
      "Direct site inspection for biometric access controller integration, solar-powered field gateways, and real-time supervisor mobile sync.",
    image_url:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tags: ["IoT Integration", "Hardware", "Site Inspection"],
    featured: true,
    created_at: "2024-09-12T11:00:00Z"
  },
  {
    id: "visit-4",
    title: "Post-Delivery Review & System Handover Ceremony",
    client_name: "Vanguard Logistics Hub",
    category: "Product Delivery",
    location: "Navi Mumbai, Maharashtra",
    date: "2024-08-05",
    description:
      "Milestone completion sign-off and executive training on automated fleet dispatch, geofencing alarms, and driver payroll management.",
    image_url:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    tags: ["Handover", "Logistics Tech", "Executive Briefing"],
    featured: false,
    created_at: "2024-08-05T16:00:00Z"
  }
];

// Helper to get local data
function getLocalVisits() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_VISITS));
      return DEFAULT_SITE_VISITS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Local storage error:", e);
    return DEFAULT_SITE_VISITS;
  }
}

// Helper to save local data
function saveLocalVisits(visits) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(visits));
  } catch (e) {
    console.error("Local storage save error:", e);
  }
}

/**
 * Fetch all site visits (from Supabase if table exists, otherwise localStorage)
 */
export async function getSiteVisits() {
  try {
    const { data, error } = await supabase
      .from("site_visits")
      .select("*")
      .order("date", { ascending: false });

    if (error || !data || data.length === 0) {
      return getLocalVisits();
    }

    const formattedData = data.map((item) => ({
      id: item.id,
      title: item.title,
      client_name: item.client_name || item.clientName || "",
      category: item.category || "Product Delivery",
      location: item.location || "Pune, Maharashtra",
      date: item.date || item.created_at?.split("T")[0] || "",
      description: item.description || "",
      image_url: item.image_url || item.imageUrl || "",
      tags: Array.isArray(item.tags) ? item.tags : (item.tags ? JSON.parse(item.tags) : []),
      featured: item.featured ?? true,
      created_at: item.created_at
    }));

    // Update local cache with latest cloud data to keep them perfectly in sync
    saveLocalVisits(formattedData);

    return formattedData;
  } catch (err) {
    console.warn("Supabase site_visits table not available, using local cache:", err);
    return getLocalVisits();
  }
}

/**
 * Save or update a site visit
 */
export async function saveSiteVisit(visitItem) {
  const localList = getLocalVisits();
  const existingIdx = localList.findIndex((v) => v.id === visitItem.id);

  const normalized = {
    id: visitItem.id || `visit-${Date.now()}`,
    title: visitItem.title || "Company Site Visit",
    client_name: visitItem.client_name || visitItem.clientName || "",
    category: visitItem.category || "Product Delivery",
    location: visitItem.location || "Pune, Maharashtra",
    date: visitItem.date || new Date().toISOString().split("T")[0],
    description: visitItem.description || "",
    image_url: visitItem.image_url || visitItem.imageUrl || "",
    tags: Array.isArray(visitItem.tags) ? visitItem.tags : [],
    featured: visitItem.featured ?? true,
    created_at: visitItem.created_at || new Date().toISOString()
  };

  if (existingIdx >= 0) {
    localList[existingIdx] = normalized;
  } else {
    localList.unshift(normalized);
  }
  saveLocalVisits(localList);

  // Attempt Supabase upsert
  try {
    await supabase.from("site_visits").upsert({
      id: normalized.id,
      title: normalized.title,
      client_name: normalized.client_name,
      category: normalized.category,
      location: normalized.location,
      date: normalized.date,
      description: normalized.description,
      image_url: normalized.image_url,
      tags: normalized.tags,
      featured: normalized.featured,
      created_at: normalized.created_at
    });
  } catch (err) {
    console.warn("Supabase upsert failed, stored in localStorage:", err);
  }

  return normalized;
}

/**
 * Delete a site visit
 */
export async function deleteSiteVisit(id) {
  const localList = getLocalVisits().filter((v) => v.id !== id);
  saveLocalVisits(localList);

  try {
    await supabase.from("site_visits").delete().eq("id", id);
  } catch (err) {
    console.warn("Supabase delete failed:", err);
  }
  return true;
}

/**
 * Toggle featured flag
 */
export async function toggleSiteVisitFeatured(id) {
  const localList = getLocalVisits();
  const target = localList.find((v) => v.id === id);
  if (target) {
    target.featured = !target.featured;
    saveLocalVisits(localList);
    try {
      await supabase.from("site_visits").update({ featured: target.featured }).eq("id", id);
    } catch (err) {
      console.warn("Supabase toggle failed:", err);
    }
  }
  return localList;
}

/**
 * Reset site visits to defaults
 */
export function resetSiteVisitsToDefault() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_VISITS));
  return DEFAULT_SITE_VISITS;
}
