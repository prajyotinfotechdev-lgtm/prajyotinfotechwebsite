import { createLead, getLeads } from './src/utils/leadStorage.js';

async function testLeadsIntegration() {
  console.log("Testing Lead Creation in Supabase...");
  try {
    const newLead = await createLead({
      name: "Rajesh Sharma",
      contact: "+919876543210",
      projectType: "E-Commerce Website & Mobile App",
      budget: "₹60k–₹1.5L",
      message: "We need a full stack e-commerce web platform for our retail store with payment gateway.",
      source: "HelpBot Chatbot"
    });
    console.log("Lead created successfully:", newLead.id);

    console.log("\nFetching all leads from Supabase...");
    const leads = await getLeads();
    console.log(`Fetched ${leads.length} total leads:`);
    leads.forEach(l => {
      console.log(`- ${l.name} (${l.contact}) | Source: ${l.source} | Project: ${l.projectType} | Status: ${l.status}`);
    });
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testLeadsIntegration();
