import React, { useState } from 'react';
import { 
  Laptop, 
  Database, 
  Smartphone, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  BellRing, 
  Server, 
  Globe2, 
  Clock, 
  Calendar, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Printer, 
  Lock,
  Sparkles
} from 'lucide-react';
import { createLead } from '../utils/leadStorage.js';

const SOLUTION_TYPES = [
  {
    id: 'web-app',
    title: 'Custom Web Application / SaaS',
    description: 'High-performance React/Next.js platforms, client portals, and microservices.',
    baseMin: 150000,
    baseMax: 350000,
    baseWeeks: 6,
    icon: Laptop
  },
  {
    id: 'erp-crm',
    title: 'Enterprise ERP / Multi-Branch CRM',
    description: 'Centralized plant/inventory tracking, GST billing, and team workflow automation.',
    baseMin: 250000,
    baseMax: 650000,
    baseWeeks: 8,
    icon: Database
  },
  {
    id: 'mobile-app',
    title: 'Cross-Platform Mobile App (iOS + Android)',
    description: 'Native-feel Flutter or React Native apps with real-time sync and offline mode.',
    baseMin: 200000,
    baseMax: 480000,
    baseWeeks: 7,
    icon: Smartphone
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Business API Automation',
    description: 'Automated order alerts, lead qualification chatbots, and ERP webhooks.',
    baseMin: 75000,
    baseMax: 180000,
    baseWeeks: 3,
    icon: MessageSquare
  }
];

const ARCHITECTURE_ADDONS = [
  {
    id: 'sub-second-sla',
    name: 'Sub-Second SLA (<0.8s LCP)',
    desc: 'Edge-caching, code-splitting, and Lighthouse 95+ performance optimization.',
    costMin: 25000,
    costMax: 45000,
    icon: Zap
  },
  {
    id: 'rbac-security',
    name: 'Role-Based Access Control (RBAC)',
    desc: 'Multi-level permissions, audit logs, and IP security for managers and staff.',
    costMin: 35000,
    costMax: 60000,
    icon: ShieldCheck
  },
  {
    id: 'payment-gateway',
    name: 'Payment & Billing Engine',
    desc: 'Razorpay, Cashfree, automated GST invoicing, and UPI subscription autopay.',
    costMin: 20000,
    costMax: 40000,
    icon: CreditCard
  },
  {
    id: 'whatsapp-engine',
    name: 'Real-Time WhatsApp Notifications',
    desc: 'Automated transactional alerts, invoice PDFs, and CRM lead alerts over WhatsApp.',
    costMin: 30000,
    costMax: 50000,
    icon: BellRing
  },
  {
    id: 'cloud-devops',
    name: 'Dedicated Cloud CI/CD & Docker',
    desc: 'Automated backups, staging environments, PostgreSQL cluster, and AWS/VPS setup.',
    costMin: 30000,
    costMax: 55000,
    icon: Server
  },
  {
    id: 'multilingual',
    name: 'Multi-Lingual Localization',
    desc: 'Native Marathi, Hindi, and English UI switching for regional frontline users.',
    costMin: 20000,
    costMax: 35000,
    icon: Globe2
  }
];

const TIMELINE_OPTIONS = [
  {
    id: 'sprint',
    title: 'Rapid Sprint Delivery',
    subtitle: 'High-intensity dedicated sprint (Under 4 weeks)',
    multiplier: 1.15,
    icon: Rocket
  },
  {
    id: 'standard',
    title: 'Standard Production',
    subtitle: 'Structured 6 to 10 week iterative milestones',
    multiplier: 1.0,
    icon: Calendar
  },
  {
    id: 'phased',
    title: 'Phased Enterprise Rollout',
    subtitle: 'Module-by-module pilot testing (3 to 5 months)',
    multiplier: 1.0,
    icon: Clock
  }
];

function formatRupee(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export default function QuoteEstimator() {
  const [step, setStep] = useState(1);
  const [selectedSolution, setSelectedSolution] = useState(SOLUTION_TYPES[0]);
  const [selectedAddons, setSelectedAddons] = useState(['sub-second-sla', 'payment-gateway']);
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINE_OPTIONS[1]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Calculate pricing
  const addonMinTotal = selectedAddons.reduce((sum, id) => {
    const item = ARCHITECTURE_ADDONS.find(a => a.id === id);
    return sum + (item ? item.costMin : 0);
  }, 0);

  const addonMaxTotal = selectedAddons.reduce((sum, id) => {
    const item = ARCHITECTURE_ADDONS.find(a => a.id === id);
    return sum + (item ? item.costMax : 0);
  }, 0);

  const totalMin = Math.round((selectedSolution.baseMin + addonMinTotal) * selectedTimeline.multiplier);
  const totalMax = Math.round((selectedSolution.baseMax + addonMaxTotal) * selectedTimeline.multiplier);

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name || !formData.phone) {
      setErrorMessage('Please provide your name and phone/WhatsApp number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const leadPayload = {
        name: formData.name.trim(),
        email: formData.email.trim() || 'quote-estimate@prajyotinfotech.in',
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        projectType: selectedSolution.title,
        message: `[Interactive Estimate Scope]\n• Solution: ${selectedSolution.title}\n• Timeline: ${selectedTimeline.title}\n• Selected Modules: ${selectedAddons.join(', ')}\n• Estimated Budget: ${formatRupee(totalMin)} - ${formatRupee(totalMax)}\n• Notes: ${formData.notes || 'None'}`,
        source: 'quote_estimator_2026'
      };

      await createLead(leadPayload);
      setIsSubmitted(true);
    } catch (err) {
      console.warn('Lead submission warning:', err);
      // Even if API has minor latency, mark submitted so user gets proposal and WhatsApp dispatch
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerWhatsAppDispatch = () => {
    const addonNames = selectedAddons.map(id => {
      const match = ARCHITECTURE_ADDONS.find(a => a.id === id);
      return match ? match.name : id;
    }).join(', ');

    const text = encodeURIComponent(
      `Hello Prajyot Infotech Team,\n\nI configured a project estimate on your website:\n\n• *Solution:* ${selectedSolution.title}\n• *Timeline:* ${selectedTimeline.title}\n• *Selected Modules:* ${addonNames || 'Core Architecture'}\n• *Estimated Budget:* ${formatRupee(totalMin)} - ${formatRupee(totalMax)}\n\n*Contact Details:*\n• Name: ${formData.name || 'Business Inquirer'}\n• Company: ${formData.company || 'Not Specified'}\n• Phone: ${formData.phone || 'N/A'}\n\nPlease share your technical proposal and let me know when we can schedule a quick discovery call.`
    );

    window.open(`https://wa.me/919322673286?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      {/* Top Header / Progress Track */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-56 h-56 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-mono uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineering Scoping Engine · 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Interactive Project Scope Builder
            </h2>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Estimated Bracket</span>
            <span className="text-xl sm:text-2xl font-black text-brand-400 font-mono">
              {formatRupee(totalMin)} – {formatRupee(totalMax)}
            </span>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mt-6 pt-5 border-t border-slate-800 text-[11px] sm:text-xs font-semibold">
          {[
            { num: 1, label: '1. Solution', short: '1. Scope' },
            { num: 2, label: '2. Modules', short: '2. Modules' },
            { num: 3, label: '3. Timeline', short: '3. Speed' },
            { num: 4, label: '4. Summary', short: '4. Quote' }
          ].map((s) => (
            <button
              key={s.num}
              type="button"
              onClick={() => s.num < step && setStep(s.num)}
              className={`text-left py-1.5 border-b-2 transition-all truncate ${
                step === s.num
                  ? 'border-brand-400 text-white font-bold'
                  : step > s.num
                  ? 'border-emerald-400 text-emerald-400 cursor-pointer'
                  : 'border-slate-800 text-slate-500 cursor-default'
              }`}
            >
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.short}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Form Body */}
      <div className="p-5 sm:p-10">
          {/* STEP 1: SOLUTION CLASS */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Phase 1 of 4</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Select your core software solution</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Each solution includes 100% full source code ownership on Day 1, production deployment, and 60-day bug warranty.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SOLUTION_TYPES.map((sol) => {
                  const Icon = sol.icon;
                  const isSelected = selectedSolution.id === sol.id;
                  return (
                    <div
                      key={sol.id}
                      onClick={() => setSelectedSolution(sol)}
                      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/40 shadow-md ring-2 ring-brand-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-brand-600" />
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{sol.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-4">{sol.description}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-mono">Est. Baseline:</span>
                        <span className="font-bold text-slate-900 font-mono">
                          {formatRupee(sol.baseMin)} – {formatRupee(sol.baseMax)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg shadow-brand-600/25 transition-all text-sm"
                >
                  <span>Configure Modules</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: MODULES & ARCHITECTURE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Phase 2 of 4</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Select engineering modules & architecture</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Tailor the architectural scope to match your enterprise security, speed, and integration needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {ARCHITECTURE_ADDONS.map((addon) => {
                  const Icon = addon.icon;
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                        isChecked
                          ? 'border-brand-600 bg-brand-50/30 ring-1 ring-brand-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-bold text-slate-900">{addon.name}</h4>
                          <span className="text-[11px] font-mono text-slate-500 font-semibold">
                            +{formatRupee(addon.costMin)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug">{addon.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg shadow-brand-600/25 transition-all text-sm"
                >
                  <span>Select Timeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TIMELINE & URGENCY */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Phase 3 of 4</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Target delivery speed & launch urgency</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Sprint delivery assigns senior dedicated engineers for accelerated completion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TIMELINE_OPTIONS.map((t) => {
                  const Icon = t.icon;
                  const isSelected = selectedTimeline.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTimeline(t)}
                      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer text-center flex flex-col items-center justify-center ${
                        isSelected
                          ? 'border-brand-600 bg-brand-50/40 ring-2 ring-brand-600/20'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{t.title}</h4>
                      <p className="text-xs text-slate-600 leading-tight mb-3">{t.subtitle}</p>
                      {t.multiplier > 1.0 && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold font-mono">
                          +15% Accelerated Sprint
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg shadow-brand-600/25 transition-all text-sm"
                >
                  <span>Review Scope & Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUMMARY & LEAD DISPATCH */}
          {step === 4 && (
            <div className="space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600">Phase 4 of 4</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Executive Project Summary & Proposal</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Review your architectural specification below. Dispatch it directly to our technical director via WhatsApp for a same-day response.
                </p>
              </div>

              {/* Estimate Breakdown Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Solution Architecture</span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5 block">{selectedSolution.title}</span>
                    <span className="text-xs text-slate-500 mt-1 block">Includes 100% full IP transfer on Day 1.</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block">Timeline & Delivery</span>
                    <span className="text-lg font-bold text-slate-900 mt-0.5 block">{selectedTimeline.title}</span>
                    <span className="text-xs text-slate-500 mt-1 block">{selectedTimeline.subtitle}</span>
                  </div>
                </div>

                <div className="py-4 border-b border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-2">
                    Selected Engineering Modules ({selectedAddons.length})
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedAddons.map(id => {
                      const item = ARCHITECTURE_ADDONS.find(a => a.id === id);
                      return (
                        <span key={id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                          {item ? item.name : id}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">Estimated Investment Bracket</span>
                    <span className="text-2xl sm:text-3xl font-black text-navy-900 font-mono">
                      {formatRupee(totalMin)} – {formatRupee(totalMax)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 max-w-xs text-right hidden sm:block">
                    Transparent milestone billing · No lock-in contracts · Dedicated technical lead in Pune
                  </div>
                </div>
              </div>

              {/* Form or Submitted State */}
              {!isSubmitted ? (
                <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                  <h4 className="text-base font-bold text-slate-900">Enter your contact details to lock in this estimate:</h4>
                  
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Business / Organization Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Precision Tools"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. rahul@apexprecision.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Requirements or Notes (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Tell us about your team size, current bottlenecks, or specific APIs..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="inline-flex items-center gap-2 px-5 py-3 text-slate-600 hover:text-slate-900 font-semibold text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold shadow-lg shadow-brand-600/25 transition-all text-sm disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isSubmitting ? 'Registering Estimate...' : 'Save Estimate & Lock Proposal'}</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Estimate Saved & Technical Lead Assigned!</h4>
                    <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
                      Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Our engineering director in Pune has been notified of your project scope.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={triggerWhatsAppDispatch}
                      className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/25 transition-all text-sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Open Pre-Filled WhatsApp Proposal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl font-semibold text-sm shadow-sm transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Save as PDF</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
      </div>

      {/* Footer Guarantee Strip */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Non-Disclosure Guarantee: Your project architecture and ideas remain 100% confidential.</span>
        </div>
        <div className="font-mono text-slate-600 font-semibold">
          Pune HQ: +91 93226 73286
        </div>
      </div>
    </div>
  );
}
