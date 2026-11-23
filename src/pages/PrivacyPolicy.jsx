// src/pages/PrivacyPolicy.jsx
import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";
import { ShieldCheck, Mail, Phone } from "lucide-react";

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

export default function PrivacyPolicy() {
  const toc = [
    { id: "overview", title: "Overview" },
    { id: "data-collected", title: "Information We Collect" },
    { id: "how-used", title: "How We Use Your Information" },
    { id: "data-storage", title: "Data Storage & Security" },
    { id: "third-parties", title: "Third-Party Services" },
    { id: "cookies", title: "Cookies & Tracking" },
    { id: "your-rights", title: "Your Rights" },
    { id: "children", title: "Children's Privacy" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <>
      <BreadcrumbsLd items={[
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Privacy Policy", url: `${SITE_URL}/privacy` },
      ]} />
      <Seo
        title="Privacy Policy | Prajyot Infotech — Your Data, Your Rights"
        description="Read the Privacy Policy of Prajyot Infotech. Learn how we collect, store, and protect your personal data. We follow Indian IT Act standards and global GDPR principles."
        keywords="Prajyot Infotech privacy policy, data protection India, software company privacy, GDPR compliance India"
        path="/privacy"
      />

      <main className="mx-auto max-w-6xl px-4 py-14">
        {/* Hero */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Your Privacy Is Foundational to Our Operations
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-slate-500 text-sm">
            Last updated: <strong>November 24, 2026</strong> · Effective date: January 1, 2024
          </p>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            {BRAND} ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This policy explains what data we collect, why we collect it, and how you can control it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Table of Contents Sidebar */}
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

            <Section id="overview" title="1. Overview">
              <p>
                {BRAND} operates the website at <a href={SITE_URL} className="text-brand-700 underline underline-offset-2">{SITE_URL}</a> and delivers software engineering, mobile app development, ERP/CRM solutions, and business automation services.
              </p>
              <p>
                By using our website, filling out our contact forms, or engaging our services, you agree to the terms described in this Privacy Policy. This policy applies to all data collected via the website, WhatsApp communications, email correspondence, and project discovery sessions.
              </p>
            </Section>

            <Section id="data-collected" title="2. Information We Collect">
              <p>We collect the following categories of personal information:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, WhatsApp number — collected when you submit a contact form, start a WhatsApp conversation, or send us an email inquiry.</li>
                <li><strong>Project Details:</strong> Business requirements, software specifications, budget range, and timelines — shared voluntarily during project scoping calls or submitted through the estimate form.</li>
                <li><strong>Usage Data:</strong> Pages visited, referral source, browser type, device type, and approximate location — collected automatically via analytics to understand how visitors use our website.</li>
                <li><strong>Communication Records:</strong> Messages exchanged via our contact form, WhatsApp, email, and during calls — retained to provide continuity of service.</li>
              </ul>
              <p className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <strong>We never collect:</strong> credit card numbers, bank account details, Aadhaar numbers, or any government identity documents through our website. Payment processing for projects is handled via formal invoice only.
              </p>
            </Section>

            <Section id="how-used" title="3. How We Use Your Information">
              <ul className="list-disc pl-5 space-y-2">
                <li>To respond to your project inquiry or consultation request via WhatsApp, email, or phone within 24 business hours.</li>
                <li>To prepare and send project proposals, architectural documents, and milestone payment invoices.</li>
                <li>To improve our website's usability, content, and service offerings based on aggregated usage patterns.</li>
                <li>To send important project updates, delivery confirmations, and post-launch support notifications.</li>
                <li>To comply with Indian IT Act, 2000 and relevant data protection obligations.</li>
              </ul>
              <p>We <strong>do not sell, rent, or trade</strong> your personal information with third parties for their marketing purposes.</p>
            </Section>

            <Section id="data-storage" title="4. Data Storage & Security">
              <p>
                Personal information submitted via our contact forms is stored in a secure, access-controlled database. Project correspondence is retained in encrypted email servers.
              </p>
              <p>
                We implement industry-standard security practices including HTTPS/TLS encryption, access control, and regular data audits. While no method of data transmission is 100% secure, we take commercially reasonable measures to protect your information.
              </p>
              <p>
                Data is retained for the duration of our business relationship plus 2 years, after which it is securely deleted unless required by law or contractual obligation.
              </p>
            </Section>

            <Section id="third-parties" title="5. Third-Party Services">
              <p>We use the following trusted third-party services that may process your data under their own privacy policies:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Vercel Analytics</strong> — anonymous website performance metrics (no personal identifiers stored).</li>
                <li><strong>WhatsApp Business API (Meta)</strong> — for direct client communication. Subject to Meta's Privacy Policy.</li>
                <li><strong>Google Analytics / Search Console</strong> — aggregated traffic analysis and search performance tracking.</li>
                <li><strong>Cloudinary / Firebase</strong> — media hosting and authentication for projects delivered to clients.</li>
              </ul>
              <p>These services are contractually bound to protect data and are used exclusively for legitimate business operations.</p>
            </Section>

            <Section id="cookies" title="6. Cookies & Tracking">
              <p>
                Our website uses minimal first-party cookies to maintain basic session functionality and anonymous analytics. We do not use advertising cookies, retargeting pixels, or cross-site tracking technologies.
              </p>
              <p>
                You may disable cookies in your browser settings without affecting your ability to browse our website. Analytics cookies are anonymous and cannot be linked to individual users.
              </p>
            </Section>

            <Section id="your-rights" title="7. Your Rights">
              <p>Under applicable Indian and international data protection principles, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Access:</strong> Request a copy of personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request updates to inaccurate or outdated information.</li>
                <li><strong>Deletion:</strong> Request erasure of your personal data ("Right to be Forgotten"), subject to legal obligations.</li>
                <li><strong>Objection:</strong> Opt out of any non-essential data processing activities.</li>
                <li><strong>Portability:</strong> Request your data in a machine-readable format.</li>
              </ul>
              <p>To exercise any of these rights, email us at <a href={`mailto:${EMAIL}`} className="text-brand-700 underline underline-offset-2">{EMAIL}</a> with the subject "Data Rights Request". We will respond within 30 business days.</p>
            </Section>

            <Section id="children" title="8. Children's Privacy">
              <p>
                Our services are designed exclusively for businesses and adult professionals. We do not knowingly collect personal information from persons under the age of 18. If we discover that a minor has submitted personal data to us, we will promptly delete it.
              </p>
            </Section>

            <Section id="changes" title="9. Changes to This Policy">
              <p>
                We may update this Privacy Policy periodically to reflect legal, technical, or business changes. We will notify users of significant changes by updating the "Last Updated" date at the top of this page.
              </p>
              <p>
                Your continued use of our website or services after policy changes constitutes acceptance of the revised policy.
              </p>
            </Section>

            <Section id="contact" title="10. Contact Us">
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Officer:</p>
              <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="size-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{BRAND}</div>
                    <div className="text-slate-500 text-xs">Data Protection Officer</div>
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
                  Prajyot Infotech · Pune, Maharashtra, India 411001<br />
                  Registered under the Indian Companies Act, 2013
                </div>
              </div>
            </Section>

            <div className="mt-8 p-4 rounded-2xl bg-brand-50 border border-brand-200 text-sm text-brand-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
              <div>
                <strong>We uphold your privacy.</strong> {BRAND} never engages in cold calling, spam marketing, or unauthorised data sharing. Every project is covered by a Mutual NDA available on request.
                {" "}<Link to="/contact" className="text-brand-700 font-bold underline underline-offset-2">Contact us to request an NDA →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

