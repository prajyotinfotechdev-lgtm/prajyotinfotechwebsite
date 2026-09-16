// src/components/Nav.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "./Logo.jsx";
import { useLeadModal } from "../context/LeadModalContext.jsx";

const linkBase =
  "relative py-2 px-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 font-medium";

const desktopDropdownItemBase =
  "block px-4 py-3 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors rounded-lg group/item";

const navConfig = [
  {
    label: "Products",
    dropdown: [
      { to: "/products/hrms", label: "Oibuz HRMS", badge: "Flagship", desc: "Connected workforce & HR platform." },
    ]
  },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  {
    label: "Company",
    dropdown: [
      { to: "/about", label: "About Us", desc: "Our story, vision, and the team." },
      { to: "/careers", label: "Careers", desc: "Join our fast-growing engineering team." },
      { to: "/articles", label: "Articles", desc: "Engineering deep-dives and tech insights." },
      { to: "/pricing", label: "Pricing", desc: "Transparent, flexible engagement models." },
    ]
  }
];

export default function Nav() {
  const { openLeadModal } = useLeadModal();
  const [open, setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location            = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const btnRef   = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const first = panelRef.current?.querySelector(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      first?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last  = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <header
      className={[
        "sticky top-0 z-40 border-b border-purple-100/50",
        "bg-white/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/50",
        scrolled ? "shadow-[0_4px_30px_rgba(124,58,237,0.05)]" : "",
      ].join(" ")}
      data-state={open ? "open" : "closed"}
    >
      {/* Skip link */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 rounded bg-brand-700 px-3 py-2 text-xs font-semibold text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 hover:opacity-90 transition-opacity"
            aria-label="Prajyot Infotech home"
          >
            <Logo size={38} />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-[15px] md:flex" aria-label="Main">
          {navConfig.map((item) => {
            if (item.dropdown) {
              return (
                <div key={`desk:${item.label}`} className="group relative py-2">
                  <button className={`${linkBase} text-slate-600 group-hover:text-purple-800 flex items-center gap-1.5`}>
                    {item.label}
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180 text-slate-400 group-hover:text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-0 w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white/90 rounded-2xl shadow-[0_12px_40px_-10px_rgba(124,58,237,0.15)] border border-purple-100 p-2 mt-2 backdrop-blur-3xl">
                      {item.dropdown.map((subItem) => (
                        <NavLink key={subItem.to} to={subItem.to} className={desktopDropdownItemBase.replace("hover:bg-brand-50", "hover:bg-purple-50/50").replace("hover:text-brand-700", "hover:text-purple-700")}>
                          <div className="font-semibold text-slate-800 flex items-center gap-2 group-hover/item:text-purple-700 transition-colors">
                            {subItem.label} 
                            {subItem.badge && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200/80">
                                {subItem.badge}
                              </span>
                            )}
                          </div>
                          {subItem.desc && (
                            <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">{subItem.desc}</div>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink key={`desk:${item.to}`} to={item.to} className={({ isActive }) => 
                `${linkBase} ${isActive ? "text-purple-800 after:absolute after:left-0 after:-bottom-1.5 after:h-[3px] after:w-full after:rounded-full after:bg-purple-500 font-semibold" : "text-slate-600 hover:text-purple-800"}`
              }>
                {item.label}
              </NavLink>
            );
          })}
          
          <div className="h-6 w-px bg-slate-200 ml-1"></div>

          <Link
            to="/estimate"
            aria-label="Estimate Project"
            className="rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all hover:bg-purple-700 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ml-1"
          >
            Estimate Project
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          className="md:hidden rounded-xl border border-slate-200 bg-white p-2.5 text-navy-800 shadow-sm transition hover:bg-slate-50 hover:border-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-hidden="true"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-navy-900/20 backdrop-blur-sm md:hidden"
            tabIndex={-1}
          />
        )}
      </AnimatePresence>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-sheet"
            id="mobileMenu"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobileMenuTitle"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.18, ease: "easeOut" } }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -6, transition: { duration: 0.15 } }}
            className="absolute inset-x-0 top-full z-40 border-t border-purple-100/70 bg-white/95 backdrop-blur-xl shadow-2xl md:hidden overflow-hidden"
          >
            <div
              ref={panelRef}
              className="mx-auto flex max-w-7xl flex-col px-5 py-5 text-sm text-slate-700 max-h-[calc(100dvh-5rem)] overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <h2 id="mobileMenuTitle" className="sr-only">Menu</h2>

              {/* Status badge (moved here for mobile) */}
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/70 text-xs font-medium text-emerald-700 w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                All Systems Operational (99.98% Cloud SLA)
              </div>

              {/* Links */}
              <div className="flex flex-col divide-y divide-slate-100 border-t border-slate-100">
                {navConfig.map((item) => {
                  if (item.dropdown) {
                    return (
                      <details key={`sheet:${item.label}`} className="group py-2">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-2 rounded-xl font-medium text-slate-800 hover:text-brand-700 [&::-webkit-details-marker]:hidden transition-colors">
                          <span className="text-base">{item.label}</span>
                          <svg className="size-5 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="flex flex-col gap-1 pl-3 pb-2 pt-1 border-l-2 border-slate-100 ml-2 mt-1">
                          {item.dropdown.map(subItem => (
                            <NavLink 
                              key={subItem.to} 
                              to={subItem.to} 
                              onClick={() => setOpen(false)} 
                              className={({ isActive }) => `block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-navy-900"}`}
                            >
                              {subItem.label}
                              {subItem.badge && <span className="ml-2 inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200/80">{subItem.badge}</span>}
                            </NavLink>
                          ))}
                        </div>
                      </details>
                    );
                  }
                  
                  return (
                    <NavLink
                      key={`sheet:${item.to}`}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-4 rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? "text-brand-700 font-semibold"
                            : "text-slate-800 hover:text-brand-700"
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="mt-4 pt-5 border-t border-slate-100 space-y-3">
                <Link
                  to="/estimate"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-navy-800 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all active:scale-[0.98] hover:bg-navy-700"
                >
                  ⚡ Instant Project Estimator
                </Link>
                <div className="grid grid-cols-2 gap-3 pt-1 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openLeadModal({
                        source: "Header Navigation (Mobile)",
                        title: "Book Technical Consultation",
                        subtitle: "Connect with Prajyot Infotech leads directly — fast response guaranteed.",
                      });
                    }}
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 active:bg-emerald-100 transition"
                  >
                    Consultation
                  </button>
                  <a
                    href="tel:+917020708747"
                    className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 active:bg-slate-200 transition"
                  >
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
