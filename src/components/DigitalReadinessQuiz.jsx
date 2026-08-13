import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, LineChart, Users, Laptop, ArrowRight, CheckCircle2 } from 'lucide-react';

const questions = [
  {
    id: 'stage',
    title: 'Where is your business currently at?',
    options: [
      { label: 'Just starting out', icon: <Building2 className="w-8 h-8 mb-3 text-brand-500" strokeWidth={1.5} /> },
      { label: 'Growing steadily', icon: <LineChart className="w-8 h-8 mb-3 text-brand-500" strokeWidth={1.5} /> },
      { label: 'Scaling rapidly', icon: <Users className="w-8 h-8 mb-3 text-brand-500" strokeWidth={1.5} /> },
      { label: 'Enterprise / Established', icon: <Laptop className="w-8 h-8 mb-3 text-brand-500" strokeWidth={1.5} /> },
    ],
  },
  {
    id: 'challenge',
    title: 'What is your biggest operational challenge right now?',
    options: [
      { label: 'Getting customers online', desc: 'I need a digital presence and leads.' },
      { label: 'Too much manual work', desc: 'Billing, data entry, and follow-ups take forever.' },
      { label: 'Managing inventory/sales', desc: 'I need real-time tracking of stock and orders.' },
      { label: 'Customer retention', desc: 'I want to build an app or loyalty system.' },
    ],
  },
];

export default function DigitalReadinessQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCalculated, setIsCalculated] = useState(false);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [questions[step].id]: option.label });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Simulate calculation delay
      setStep(step + 1);
      setTimeout(() => setIsCalculated(true), 1500);
    }
  };

  const getRecommendation = () => {
    const challenge = answers.challenge;
    if (challenge === 'Getting customers online') {
      return {
        score: 'Beginner',
        title: 'Launch & Grow Package',
        desc: 'You need a high-performance SEO-optimized website and basic lead generation tools.',
        services: ['Custom Website', 'Local SEO Setup', 'WhatsApp Lead Capture']
      };
    }
    if (challenge === 'Too much manual work') {
      return {
        score: 'Intermediate',
        title: 'Automation & ERP Solutions',
        desc: 'You need custom software to automate your daily workflows and billing.',
        services: ['Custom CRM/ERP', 'Automated GST Billing', 'WhatsApp Notifications']
      };
    }
    if (challenge === 'Managing inventory/sales') {
      return {
        score: 'Advanced',
        title: 'Omnichannel Sales Platform',
        desc: 'You need an integrated system connecting your physical store with e-commerce.',
        services: ['E-Commerce App/Website', 'Inventory Management System', 'POS Integration']
      };
    }
    return {
      score: 'Pro',
      title: 'Custom Mobile App Experience',
      desc: 'You are ready to lock in your customers with a dedicated mobile application.',
      services: ['iOS & Android App', 'Push Notifications', 'Advanced Analytics']
    };
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden my-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-navy-900 mb-2">Digital Readiness Quiz</h2>
        <p className="text-slate-600">Answer 2 quick questions to find out exactly what your business needs to scale.</p>
      </div>

      {/* Progress */}
      {step < questions.length && (
        <div className="w-full h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="h-full bg-brand-500"
            initial={{ width: 0 }}
            animate={{ width: `${((step) / questions.length) * 100}%` }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-navy-900 text-center mb-8">{questions[step].title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className="p-6 text-left border-2 border-slate-100 rounded-2xl hover:border-brand-500 hover:bg-brand-50/50 transition-all group flex flex-col items-center text-center focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {opt.icon && opt.icon}
                  <span className="font-bold text-navy-900 group-hover:text-brand-700 text-lg">{opt.label}</span>
                  {opt.desc && <span className="text-sm text-slate-500 mt-2">{opt.desc}</span>}
                </button>
              ))}
            </div>
          </motion.div>
        ) : !isCalculated ? (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <div className="w-16 h-16 border-4 border-brand-100 border-t-brand-600 rounded-full animate-spin mb-6"></div>
            <h3 className="text-xl font-bold text-navy-900">Analyzing your business profile...</h3>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brand-50 rounded-2xl p-8 border border-brand-100 text-center"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 font-bold text-sm mb-4">
              Digital Maturity: {getRecommendation().score}
            </div>
            <h3 className="text-3xl font-black text-navy-900 mb-4">{getRecommendation().title}</h3>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">{getRecommendation().desc}</p>
            
            <div className="bg-white rounded-xl p-6 mb-8 text-left max-w-md mx-auto shadow-sm">
              <h4 className="font-bold text-navy-900 mb-4 border-b border-slate-100 pb-2">Recommended Tech Stack:</h4>
              <ul className="space-y-3">
                {getRecommendation().services.map((s, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={`https://wa.me/917020708747?text=${encodeURIComponent(`Hi Prajyot Infotech, I took the Digital Readiness Quiz. My result was: ${getRecommendation().title}. Can we discuss this?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-navy-900 text-white font-bold hover:bg-brand-600 transition-colors shadow-lg hover:shadow-brand-500/25"
            >
              Discuss This Plan <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
