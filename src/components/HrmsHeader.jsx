import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLeadModal } from "../context/LeadModalContext.jsx";

export default function HrmsHeader() {
  const { openLeadModal } = useLeadModal();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: "Overview", to: "/products/hrms" },
    { label: "Product Story", to: "/products/hrms/story" },
    { label: "Features", to: "/products/hrms/features" },
    { label: "For Construction", to: "/products/hrms/for-construction" },
    { label: "Pricing", to: "/products/hrms/pricing" },
    { label: "Resources", to: "/products/hrms/resources" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/products/hrms" className="flex items-center gap-2 shrink-0">
          <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-9 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/products/hrms"}
              className={({ isActive }) =>
                `px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-600 hover:text-blue-700 hover:bg-blue-50/70"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="hidden sm:inline-flex text-xs font-semibold text-slate-600 hover:text-blue-700 px-3 py-2 rounded-lg transition-all border border-slate-200"
          >
            ← Prajyot Infotech Home
          </Link>
          <button
            type="button"
            onClick={() =>
              openLeadModal({
                source: "HRMS Navbar - Book Demo",
                title: "Book Oibuz HRMS Demo",
                subtitle: "Schedule a 15-min product walkthrough tailored to your construction workforce.",
                projectType: "Oibuz Construction HRMS",
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-700/20 transition-all hover:-translate-y-px cursor-pointer"
          >
            Book a Demo <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden px-4 py-4 space-y-3"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/products/hrms"}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 text-sm font-semibold rounded-lg ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/"
                onClick={() => setMobileNavOpen(false)}
                className="px-3 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg flex items-center justify-between mt-2"
              >
                <span>Prajyot Infotech Official Site</span>
                <span>→</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
