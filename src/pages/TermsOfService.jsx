// src/pages/TermsOfService.jsx
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { FileText, Mail, Phone, ShieldCheck } from "lucide-react";

const SITE_URL = "https://www.prajyotinfotech.in";
const BRAND = "Prajyot Infotech";
const EMAIL = "hr@prajyotinfotech.in";
const PHONE = "+91 70207 08747";

const Section = ({ id, title, children }) => (
  <section id={id} className="mb-10 scroll-mt-24">
    <h2 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">{title}</h2>
    <div className="text-slate-700 text-sm leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function TermsOfService() {
  const toc = [
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "services", title: "Description of Services" },
    { id: "project-engagement", title: "Project Engagement & Contracts" },
    { id: "ip-ownership", title: "Intellectual Property Ownership" },
    { id: "payment", title: "Payment Terms & Milestones" },
    { id: "warranties", title: "Warranties & Post-Launch Support" },
    { id: "confidentiality", title: "Confidentiality & NDA" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "contact", title: "Contact" },
  ];

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Terms of Service", url: `${SITE_URL}/terms` },
      ]} />
      <Seo
        title="Terms of Service | Prajyot Infotech — Transparent Engagement Terms"
        description="Read the Terms of Service for Prajyot Infotech. Covers project contracts, IP ownership, milestone payments, 60-day warranty, and confidentiality terms for all software development engagements."
        keywords="Prajyot Infotech terms of service, software development contract India, IP ownership terms, milestone payment contract"
        path="/terms"
      />

      <main className="mx-auto max-w-6xl px-4 py-14">
        {/* Hero */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold mb-4">
            <FileText className="w-3.5 h-3.5" />
            Transparent, Client-First Engagement Terms
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-slate-500 text-sm">
            Last updated: <strong>November 24, 2026</strong> · Effective date: January 1, 2024
          </p>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            These Terms of Service ("Terms") govern your engagement with {BRAND} for software development, web design, mobile applications, and related digital services. By using our website or engaging our services, you agree to these Terms in full.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ToC Sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Contents</div>
              <nav className="space-y-1">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-slate-600 hover:text-brand-700 py-1 px-2 rounded-lg hover:bg-brand-50 transition-colors"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">

            <Section id="acceptance" title="1. Acceptance of Terms">
              <p>
                By accessing the website at <a href={SITE_URL} className="text-brand-700 underline underline-offset-2">{SITE_URL}</a>, submitting an inquiry, or entering a project agreement with {BRAND}, you confirm that you have read, understood, and agree to be bound by these Terms and our <Link to="/privacy" className="text-brand-700 underline underline-offset-2">Privacy Policy</Link>.
              </p>
              <p>
                If you are engaging on behalf of a company or organisation, you confirm that you have the authority to bind that entity to these Terms.
              </p>
            </Section>

            <Section id="services" title="2. Description of Services">
              <p>{BRAND} provides the following software engineering services:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Custom web application and portal development (React, Node.js, Python)</li>
                <li>Mobile application development (React Native, Flutter, Swift, Kotlin)</li>
                <li>Enterprise ERP and CRM system architecture and delivery</li>
                <li>WhatsApp Business API automation and AI-powered chatbot workflows</li>
                <li>SaaS platform design, multi-tenant database architecture, and cloud deployment</li>
                <li>UI/UX design, branding, and digital product strategy</li>
                <li>Post-launch maintenance, performance monitoring, and iterative enhancement</li>
              </ul>
              <p>All services are subject to formal project agreements outlining specific deliverables, timelines, and payment milestones.</p>
            </Section>

            <Section id="project-engagement" title="3. Project Engagement & Contracts">
              <p>
                Every software development engagement is governed by a written Project Agreement (also called a Statement of Work or SOW) that defines:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Detailed functional specifications and deliverable scope</li>
                <li>Fixed milestone-based delivery schedule</li>
                <li>Milestone-linked payment schedule</li>
                <li>Acceptance criteria for each deliverable milestone</li>
                <li>Intellectual property transfer terms</li>
              </ul>
              <p>
                Verbal agreements, chat messages, or email correspondence do not constitute a binding project contract. A formal signed Project Agreement or Purchase Order is required to commence work.
              </p>
            </Section>

            <Section id="ip-ownership" title="4. Intellectual Property Ownership">
              <p className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium">
                ✓ Upon receipt of all milestone payments and final project completion, the client receives <strong>100% complete intellectual property ownership</strong> of all custom-developed software, including source code, database schemas, design assets, and documentation.
              </p>
              <p>
                This transfer includes full GitHub repository access, all admin credentials, API keys (where applicable), hosting accounts provisioned in the client's name, and commercial copyright.
              </p>
              <p>
                {BRAND} retains the right to reference the project as a portfolio case study unless the client requests confidentiality in writing. Generic engineering methodologies, internal libraries, and reusable open-source components remain the property of {BRAND} but are licensed royalty-free to the client for their specific project.
              </p>
            </Section>

            <Section id="payment" title="5. Payment Terms & Milestones">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Milestone Structure:</strong> Payments are split across project milestones (typically 3–4 stages). Each payment is triggered by delivery of a verifiable milestone, not by calendar date alone.</li>
                <li><strong>Advance Payment:</strong> An upfront advance of 30%–50% of the total project value is required to initiate development. This secures the engineering team's time and covers initial architecture work.</li>
                <li><strong>Currency:</strong> Projects are invoiced in Indian Rupees (₹) for domestic clients and USD/AED for international clients. GST at applicable rates will be added for Indian clients.</li>
                <li><strong>Payment Methods:</strong> Bank transfer (NEFT/RTGS/IMPS), UPI, or international wire transfer. We do not accept cryptocurrency payments.</li>
                <li><strong>Late Payment:</strong> Payments overdue by more than 10 business days may result in a temporary pause of active development. Resumed work is scheduled subject to team availability.</li>
              </ul>
            </Section>

            <Section id="warranties" title="6. Warranties & Post-Launch Support">
              <p>
                Every production software delivery from {BRAND} includes a <strong>60-day post-launch warranty</strong> covering:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Bug fixes for defects that existed at the time of final delivery.</li>
                <li>Performance optimisations for edge cases discovered after launch.</li>
                <li>Minor functional adjustments within the original agreed scope.</li>
              </ul>
              <p>
                The warranty does not cover new feature development, third-party API changes, server infrastructure costs, or issues arising from client-initiated modifications after handover.
              </p>
              <p>
                Post-warranty support, maintenance retainers, and enhancement engagements are available as separate agreements.
              </p>
            </Section>

            <Section id="confidentiality" title="7. Confidentiality & NDA">
              <p>
                {BRAND} treats all client project information, business data, and trade secrets as strictly confidential. Our team members operate under internal confidentiality agreements.
              </p>
              <p>
                Clients may request a formal Mutual Non-Disclosure Agreement (NDA) prior to sharing sensitive business logic, proprietary data, or unreleased product concepts. NDAs are executed at no additional charge.
              </p>
              <p>
                Both parties agree not to disclose confidential information to third parties without prior written consent, during and for 2 years after the project engagement period.
              </p>
            </Section>

            <Section id="liability" title="8. Limitation of Liability">
              <p>
                {BRAND}'s total liability for any claims arising out of or related to a project shall not exceed the total project fees paid by the client in the 3 months preceding the claim.
              </p>
              <p>
                {BRAND} is not liable for indirect, incidental, special, or consequential damages including loss of profits, data corruption, or business interruption, even if advised of the possibility of such damages.
              </p>
              <p>
                The client is responsible for maintaining backups of their data and verifying the suitability of delivered software for their specific business requirements prior to production deployment.
              </p>
            </Section>

            <Section id="termination" title="9. Termination">
              <p>
                Either party may terminate a project agreement with written notice if the other party materially breaches the agreement and fails to cure the breach within 15 business days of written notice.
              </p>
              <p>
                Upon termination by the client, all completed and verifiable milestone deliverables are considered accepted, and payment for those milestones remains due. Partial work-in-progress for incomplete milestones is not transferable.
              </p>
              <p>
                {BRAND} reserves the right to terminate an engagement if the client requests actions that are illegal, unethical, or in violation of third-party platform terms of service.
              </p>
            </Section>

            <Section id="governing-law" title="10. Governing Law & Jurisdiction">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or project engagements shall be subject to the exclusive jurisdiction of the courts of Pune, Maharashtra, India.
              </p>
              <p>
                Both parties agree to first attempt resolution through good-faith negotiation before initiating formal legal proceedings. Mediation via the Indian Mediation Centre is encouraged as an alternative dispute resolution pathway.
              </p>
            </Section>

            <Section id="contact" title="11. Contact">
              <p>For questions, clarifications, or legal notices regarding these Terms:</p>
              <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{BRAND}</div>
                    <div className="text-slate-500 text-xs">Legal & Contracts</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href={`mailto:${EMAIL}`} className="text-brand-700 font-medium hover:underline">{EMAIL}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href="tel:+917020708747" className="text-brand-700 font-medium hover:underline">{PHONE}</a>
                </div>
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-200">
                  Prajyot Infotech · Shivaji Nagar, Pune, Maharashtra, India 411001
                </div>
              </div>
            </Section>

          </div>
        </div>
      </main>
    </>
  );
}

