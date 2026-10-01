import React from "react";
import { Link } from "react-router-dom";
import { useLeadModal } from "../context/LeadModalContext.jsx";

export default function HrmsFooter() {
  const { openLeadModal } = useLeadModal();

  return (
    <footer className="bg-[#0f172a] border-t border-slate-800 pt-16 pb-8 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src="/images/oibuz_logo.png" alt="Oibuz" className="h-9 w-auto mb-4 brightness-0 invert" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Workforce management for construction and project-based businesses.
            </p>
            <p className="text-slate-500 text-xs mt-4 font-medium">A Prajyot Infotech Product</p>
          </div>

          {/* Navigation Pages */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Oibuz HRMS</p>
            <div className="space-y-2.5">
              {[
                { label: "Overview", to: "/products/hrms" },
                { label: "Product Story", to: "/products/hrms/story" },
                { label: "Features & Modules", to: "/products/hrms/features" },
                { label: "For Construction", to: "/products/hrms/for-construction" },
                { label: "Pricing & Plans", to: "/products/hrms/pricing" },
                { label: "Resources & FAQ", to: "/products/hrms/resources" },
              ].map((item) => (
                <Link key={item.label} to={item.to} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-4">Company</p>
            <div className="space-y-2.5">
              {[
                { label: "Prajyot Infotech Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Client Deliveries", href: "/site-visits" },
                { label: "Contact Us", href: "/contact" },
              ].map(({ label, href }) => (
                <Link key={label} to={href} className="block text-sm text-slate-400 hover:text-white transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} Oibuz · Prajyot Infotech. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                openLeadModal({
                  source: "HRMS Footer - Book Demo",
                  title: "Book Oibuz HRMS Demo",
                  subtitle: "Schedule a demo session tailored to your site operations.",
                  projectType: "Oibuz Construction HRMS",
                })
              }
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
            >
              Book a Demo →
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
