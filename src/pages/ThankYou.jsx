// src/pages/ThankYou.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Calendar,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  Home,
  Briefcase,
} from "lucide-react";
import Seo from "../components/Seo.jsx";
import BreadcrumbsLd from "../components/BreadcrumbsLd.jsx";

const WHATSAPP_NUMBER = "917020708747";

export default function ThankYou() {
  const [leadDetails, setLeadDetails] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        const stored = window.sessionStorage.getItem("latest_lead_submission");
        if (stored) {
          setLeadDetails(JSON.parse(stored));
        }
      } catch (err) {
        console.warn("Could not retrieve session submission:", err);
      }
    }
  }, []);

  const getWaUrl = () => {
    const name = leadDetails?.fullName ? leadDetails.fullName : "there";
    const biz = leadDetails?.businessName ? ` for ${leadDetails.businessName}` : "";
    const text = `Hi Prajyot Infotech, my name is ${name}. I just submitted my 2027 Business Tech Audit request${biz} on your website. Looking forward to connecting!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <BreadcrumbsLd
        items={[
          { name: "Home", url: "https://www.prajyotinfotech.in/" },
          { name: "Thank You", url: "https://www.prajyotinfotech.in/thank-you" },
        ]}
      />

      <Seo
        title="Thank You for Your Application — 2027 Business Growth | Prajyot Infotech"
        description="Your business technology audit request has been received. Our engineering leadership team is reviewing your profile."
        path="/thank-you"
      />

      <main className="min-h-[85vh] py-16 sm:py-24 px-4 bg-gradient-to-br from-slate-50 via-white to-brand-50/20">
        <div className="mx-auto max-w-4xl">
          {/* Main Success Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-12 text-center"
          >
            {/* Success Icon */}
            <div className="size-20 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Application Successfully Recorded</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-navy-950 tracking-tight">
              Thank You, {leadDetails?.fullName ? leadDetails.fullName.split(" ")[0] : "Partner"}!
            </h1>

            <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We have received your <strong>2027 Business Technology Audit</strong> request
              {leadDetails?.businessName ? ` for ${leadDetails.businessName}` : ""}. Our principal engineering team is already reviewing your details.
            </p>

            {/* Personalized confirmation summary */}
            {leadDetails && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-lg mx-auto text-left text-xs text-slate-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Business / Project:</span>
                  <span className="font-bold text-slate-900">{leadDetails.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Selected Path:</span>
                  <span className="font-bold text-brand-700">{leadDetails.requirementType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Contact Method:</span>
                  <span className="font-mono text-slate-800">{leadDetails.whatsappNumber}</span>
                </div>
              </div>
            )}

            {/* Immediate Next Steps Timeline */}
            <div className="mt-12 text-left">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 text-center mb-8">
                What Happens Next? (Transparent 4-Step Process)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="size-8 rounded-xl bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-3">
                      1
                    </div>
                    <h3 className="text-sm font-bold text-navy-900">Immediate Triage</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Our system logs your submission safely in our database.
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 mt-3 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="size-8 rounded-xl bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-3">
                      2
                    </div>
                    <h3 className="text-sm font-bold text-navy-900">24-Hr Tech Review</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Our architects analyze your industry workflow and bottlenecks.
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-brand-600 mt-3 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> In Progress
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="size-8 rounded-xl bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-3">
                      3
                    </div>
                    <h3 className="text-sm font-bold text-navy-900">Discovery Call</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      We coordinate a focused 30-min scoping call with leadership.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-3">Scheduled Soon</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="size-8 rounded-xl bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center mb-3">
                      4
                    </div>
                    <h3 className="text-sm font-bold text-navy-900">2027 Blueprint</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      You receive an actionable tech roadmap with fixed timeline.
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-3">Final Delivery</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWaUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-xl shadow-emerald-600/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Connect with Principal Team on WhatsApp</span>
              </a>

              <Link
                to="/work"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-navy-900 font-bold text-sm transition-all hover:border-slate-300 flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-slate-500" />
                <span>Explore Client Case Studies</span>
              </Link>
            </div>

            {/* Direct hotline */}
            <div className="mt-8 text-xs text-slate-400">
              Need immediate urgent assistance? Direct Founder Hotline:{" "}
              <a href="tel:+917020708747" className="font-bold text-slate-600 hover:text-brand-600">
                +91 70207 08747
              </a>{" "}
              •{" "}
              <a href="mailto:hr@prajyotinfotech.in" className="font-bold text-slate-600 hover:text-brand-600">
                hr@prajyotinfotech.in
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

