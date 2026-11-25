// src/utils/oibuzLinks.js
import { trackEvent } from "./analytics.js";

export const OIBUZ_REGISTER_URL = "https://www.oibuz.in/register";

/**
 * Builds the OIBUZ self-onboarding registration URL with clean campaign/plan attribution.
 * Leads can jump straight to oibuz.in/register and configure their company & sites themselves.
 */
export function getOibuzRegisterUrl({ source = "oibuz", plan } = {}) {
  try {
    const url = new URL(OIBUZ_REGISTER_URL);
    url.searchParams.set("utm_source", "prajyotinfotech");
    url.searchParams.set("utm_medium", "website");
    if (source) url.searchParams.set("utm_campaign", source);
    if (plan) url.searchParams.set("plan", plan);
    return url.toString();
  } catch {
    return OIBUZ_REGISTER_URL;
  }
}

export function trackOibuzTrialClick(source = "oibuz", plan = "trial") {
  trackEvent("oibuz_free_trial_click", { source, plan });
}

