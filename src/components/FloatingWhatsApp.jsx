import React from "react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

export default function FloatingWhatsApp({
  bottom = "1rem",                     // base bottom offset
  right = "1rem",                      // sits right
  size = 56,                           // px (button is square)
  zIndex = 40,
  respectBannerVar = true,             // add --consult-banner-b if present
  ariaLabel = "Request Consultation",
  showTooltip = true,                  // native title attribute
}) {
  const { openLeadModal } = useLeadModal();

  // Bottom offset that respects the ConsultBanner mobile height var
  const bottomCalc = respectBannerVar
    ? `calc(${bottom} + var(--consult-banner-b, 0px))`
    : bottom;

  return (
    <button
      type="button"
      onClick={() =>
        openLeadModal({
          source: "Floating Chat Widget",
          title: "Instant Project Inquiry",
          subtitle: "Leave your project details and our senior technical architect will reach out within 2 hours.",
        })
      }
      aria-label={ariaLabel}
      title={showTooltip ? "Chat / Request Scope" : undefined}
      className={[
        "fixed grid place-items-center rounded-full",
        "bg-teal-600 hover:bg-teal-700 text-white",
        "shadow-lg ring-1 ring-slate-900/10 backdrop-blur-[1px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
        "bg-brand-600 hover:bg-brand-700 focus-visible:ring-brand-500",
        "motion-safe:animate-[pulse_3.2s_ease-in-out_infinite]",
        "print:hidden cursor-pointer",
      ].join(" ")}
      style={{
        width: size,
        height: size,
        bottom: bottomCalc,
        right,
        zIndex,
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <path
          fill="currentColor"
          d="M19.1 17.2c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7 0-1.3-.5-2.5-1.6c-.9-.8-1.6-1.8-1.8-2.1s0-.5.2-.7.5-.6.6-.8.1-.3 0-.5c0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.1 3 .2.5 2.1 2.9 3.8 2.7 4.3 3 .9.2 1.2.1 1.9-.7 2.2-1.4.3-1.2.2-1.4-.2-.2-.5-.4Z"
        />
        <path
          fill="currentColor"
          d="M26.8 5.2A13 13 0 0 0 16 2.3a13.4 13.4 0 0 0-11.6 20l-1.7 6.2 6.3-1.6A13.4 13.4 0 0 0 16 29.7a13.1 13.1 0 0 0 10.8-5.9A13.4 13.4 0 0 0 26.8 5.2Zm-2 18.7A10.8 10.8 0 0 1 16 27.5a10.9 10.9 0 0 1-5.6-1.5l-.4-.2-3.8 1 1-3.7-.2-.4A10.9 10.9 0 1 1 24.8 24Z"
        />
      </svg>
    </button>
  );
}
