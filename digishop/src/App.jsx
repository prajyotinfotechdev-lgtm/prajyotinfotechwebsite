// App.jsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import "./styles/responsive.css";
import "./style.css";

import Home from "./pages/Home.jsx";
import Work from "./pages/work.jsx"; // ✅ ensure case matches actual file on disk
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Pricing from "./pages/Pricing.jsx";

import HelpBot from "./components/HelpBot.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/20 text-navy-800 antialiased selection:bg-brand-200/50 selection:text-navy-900 overflow-x-hidden">
      {/* ↑ overflow-x-hidden prevents mobile sideways scroll */}
      <ScrollToTop />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Chat bot at bottom-right */}
      <HelpBot
        launcherOffset={{ bottom: "6rem", right: "1rem" }} // chat button sits above WA
        panelOffset={{ bottom: "10rem", right: "1rem" }}   // chat panel above its button
        zIndex={50}
      />

      {/* WhatsApp directly under the bot */}
      <FloatingWhatsApp bottom="1rem" right="1rem" zIndex={40} />

      <Footer />
    </div>
  );
}
