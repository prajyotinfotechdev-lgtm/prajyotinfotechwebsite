// App.jsx
import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import "./styles/responsive.css";
import "./style.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const Work = lazy(() => import("./pages/work.jsx")); // ✅ ensure case matches actual file on disk
const Services = lazy(() => import("./pages/Services.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Estimate = lazy(() => import("./pages/Estimate.jsx"));
const CityLandingPage = lazy(() => import("./pages/CityLandingPage.jsx"));
const Articles = lazy(() => import("./pages/Articles.jsx"));

import HelpBot from "./components/HelpBot.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [showChats, setShowChats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChats(true);
    }, 3500); // defer chat widgets by 3.5 seconds
    return () => clearTimeout(timer);
  }, []);

  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/20 dark:from-navy-950 dark:via-navy-900 dark:to-brand-950/20 text-navy-800 dark:text-slate-100 antialiased selection:bg-brand-200/50 dark:selection:bg-brand-500/30 selection:text-navy-900 dark:selection:text-white overflow-x-hidden transition-colors duration-300">
      {/* ↑ overflow-x-hidden prevents mobile sideways scroll */}
      <ScrollToTop />
      <Nav />

      <Suspense fallback={<div className="flex h-screen items-center justify-center text-brand-500">Loading...</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/pricing" element={<PageWrapper><Pricing /></PageWrapper>} />
            <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
            <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/estimate" element={<PageWrapper><Estimate /></PageWrapper>} />
            <Route path="/software-company-in-:city" element={<PageWrapper><CityLandingPage /></PageWrapper>} />
            <Route path="/articles" element={<PageWrapper><Articles /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {showChats && (
        <>
          {/* Chat bot at bottom-right */}
          <HelpBot
            launcherOffset={{ bottom: "6rem", right: "1rem" }} // chat button sits above WA
            panelOffset={{ bottom: "10rem", right: "1rem" }}   // chat panel above its button
            zIndex={50}
          />

          {/* WhatsApp directly under the bot */}
          <FloatingWhatsApp bottom="1rem" right="1rem" zIndex={40} />
        </>
      )}

      <Footer />
    </div>
  );
}
