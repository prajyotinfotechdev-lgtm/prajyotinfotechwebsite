// src/utils/analytics.js
// Lightweight conditional loader & event bridge for GA4 + Microsoft Clarity
// Configure VITE_GA_ID (e.g. G-XXXXXXXXXX) and VITE_CLARITY_ID in Vercel env vars.

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const gaId = import.meta.env?.VITE_GA_ID?.trim();
  const clarityId = import.meta.env?.VITE_CLARITY_ID?.trim();

  if (gaId && /^G-[A-Z0-9]+$/i.test(gaId)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { send_page_view: true });

    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(s);
  }

  if (clarityId && /^[a-z0-9]+$/i.test(clarityId)) {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }
}

export function trackPageView(path) {
  if (typeof window === "undefined") return;
  const gaId = import.meta.env?.VITE_GA_ID?.trim();
  if (gaId && typeof window.gtag === "function") {
    window.gtag("config", gaId, { page_path: path });
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
    }
    if (typeof window.clarity === "function") {
      window.clarity("event", eventName);
    }
  } catch {
    // Analytics must never interrupt user actions
  }
}

