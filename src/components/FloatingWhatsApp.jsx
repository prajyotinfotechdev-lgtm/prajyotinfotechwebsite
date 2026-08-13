import React, { useMemo } from "react";

const DEFAULT_TEXT = "Hi DigiShop! I'd like a quick estimate.";

export default function FloatingWhatsApp({
  number = "917020708747",             // no '+'
  text = DEFAULT_TEXT,
  bottom = "1rem",                     // base bottom offset
  right = "6rem",                      // sits left of HelpBot at 1rem
  size = 56,                           // px (button is square)
  zIndex = 40,
  respectBannerVar = true,             // add --consult-banner-b if present
  ariaLabel = "Chat on WhatsApp",
  showTooltip = true,                  // native title attribute
}) {
  const href = useMemo(
    () => `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
    [number, text]
  );

  // Bottom offset that respects the ConsultBanner mobile height var
  const bottomCalc = respectBannerVar
    ? `calc(${bottom} + var(--consult-banner-b, 0px))`
    : bottom;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      title={showTooltip ? "WhatsApp" : undefined}
      className={[
        "fixed grid place-items-center rounded-full",
        // High-contrast + subtle depth for light & dark UIs
        "bg-teal-600 hover:bg-teal-700 text-white",
        "shadow-lg ring-1 ring-slate-900/10 backdrop-blur-[1px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
        // Optional brand override if you’ve defined Tailwind brand colors
        "bg-brand-600 hover:bg-brand-700 focus-visible:ring-brand-500",
        // Gentle attention pulse for motion-capable users
        "motion-safe:animate-[pulse_3.2s_ease-in-out_infinite]",
        // Don’t show when printing
        "print:hidden",
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
    </a>
  );
}
