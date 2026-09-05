// src/utils/leadStorage.js
import { supabase } from '../lib/supabase.js';

export async function getLeads() {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching leads:", error);
      return [];
    }

    return data.map(lead => ({
      ...lead,
      projectType: lead.project_type,
      createdAt: lead.created_at
    }));
  } catch (err) {
    console.error("Error connecting to leads table:", err);
    return [];
  }
}

export async function createLead(leadData) {
  const newLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    name: leadData.name || "Anonymous Lead",
    contact: leadData.contact || "",
    project_type: leadData.projectType || leadData.project_type || "General Inquiry",
    budget: leadData.budget || "Not Specified",
    message: leadData.message || leadData.notes || "",
    source: leadData.source || "Website",
    status: leadData.status || "New",
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('leads')
    .insert(newLead)
    .select()
    .single();

  if (error) {
    console.error("Error creating lead in Supabase:", error);
    throw error;
  }

  return data;
}

export async function updateLeadStatus(id, status) {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error("Error updating lead status:", error);
    throw error;
  }
  return true;
}

export async function deleteLead(id) {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) {
    console.error("Error deleting lead:", error);
    throw error;
  }
  return true;
}
