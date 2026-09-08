// src/context/LeadModalContext.jsx
import React, { createContext, useContext, useState } from "react";

const LeadModalContext = createContext();

export function LeadModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "Request Free Consultation & Scope",
    subtitle: "Plan your project with Prajyot Infotech experts — no pressure, zero commitment.",
    source: "General Website CTA",
    projectType: "Custom Web / App Development",
    defaultMessage: "",
    budget: "",
  });

  const openLeadModal = (config = {}) => {
    setModalConfig({
      title: config.title || "Request Free Consultation & Scope",
      subtitle: config.subtitle || "Plan your project with Prajyot Infotech experts — no pressure, zero commitment.",
      source: config.source || "General Website CTA",
      projectType: config.projectType || "Custom Web / App Development",
      defaultMessage: config.defaultMessage || "",
      budget: config.budget || "",
    });
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider
      value={{
        isOpen,
        modalConfig,
        openLeadModal,
        closeLeadModal,
      }}
    >
      {children}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (!context) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}
