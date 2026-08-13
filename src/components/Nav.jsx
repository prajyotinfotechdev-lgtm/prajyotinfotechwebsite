// src/components/Nav.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "./Logo.jsx";

const linkBase =
  "relative py-2 px-1 rounded transition-colors hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const btnRef = useRef(null);
  const panelRef = useRef(null);

  // Close menu on route/hash change
  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  // Sticky shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when sheet open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Focus first actionable element when opened
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

  // Focus trap + Esc to close
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
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const navLinks = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/work", label: "Work" },
      { to: "/services", label: "Services" },
      { to: "/pricing", label: "Pricing" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
    []
  );

  const activeClass = ({ isActive }) =>
    [
      linkBase,
      isActive
        ? "text-navy-800 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full after:bg-gradient-to-r after:from-brand-600 after:to-brand-700"
        : "text-slate-600",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-40 border-b border-slate-200/50",
        "bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70",
        scrolled
          ? "shadow-[0_1px_0_0_rgba(124,58,237,0.06)_inset,0_8px_20px_-12px_rgba(30,39,86,0.15)]"
          : "",
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

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Prajyot Infotech home"
        >
          <Logo size={36} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Main">
          {navLinks.map(({ to, label }) => (
            <NavLink key={`desk:${to}`} to={to} className={activeClass} aria-label={label}>
              {label}
            </NavLink>
          ))}
          <Link
            to="/estimate"
            aria-label="Estimate Project"
            className="rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-2.5 font-semibold text-white shadow-md shadow-brand-500/20 transition-all hover:shadow-lg hover:shadow-brand-500/30 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Estimate Project
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={btnRef}
          className="md:hidden rounded-xl border border-slate-200 bg-white p-2 text-navy-800 shadow-sm transition hover:bg-slate-50 hover:border-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Backdrop (click to close) */}
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
            exit={{
              opacity: prefersReducedMotion ? 1 : 0,
              y: prefersReducedMotion ? 0 : -6,
              transition: { duration: 0.15 },
            }}
            className="absolute inset-x-0 top-full z-40 border-t border-slate-200/50 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div
              ref={panelRef}
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-sm text-slate-700"
            >
              <h2 id="mobileMenuTitle" className="sr-only">Menu</h2>

              {navLinks.map(({ to, label }) => (
                <NavLink key={`sheet:${to}`} to={to} onClick={() => setOpen(false)} className={activeClass} aria-label={label}>
                  {label}
                </NavLink>
              ))}

              <Link
                to="/estimate"
                onClick={() => setOpen(false)}
                aria-label="Estimate Project"
                className="mt-3 w-fit rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-2.5 font-semibold text-white shadow-md transition-all hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Estimate Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
