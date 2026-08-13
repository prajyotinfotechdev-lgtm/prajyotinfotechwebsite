import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 'projectType',
    title: 'What type of project are you looking for?',
    options: [
      {
        label: 'Landing Page',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-brand-500 mb-3" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        ),
        price: '₹15,000 - ₹30,000'
      },
      {
        label: 'E-Commerce',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-brand-500 mb-3" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
          </svg>
        ),
        price: '₹40,000 - ₹80,000'
      },
      {
        label: 'SaaS / Web App',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-brand-500 mb-3" stroke="currentColor" strokeWidth="1.5">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        ),
        price: '₹80,000 - ₹2,50,000+'
      },
      {
        label: 'Mobile App',
        icon: (
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-brand-500 mb-3" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        price: '₹1,00,000 - ₹3,00,000+'
      }
    ],
  },
  {
    id: 'timeline',
    title: 'How soon do you need this launched?',
    options: [
      { label: 'ASAP (Under 2 weeks)', icon: <div className="text-2xl mb-2">🚀</div> },
      { label: '2 - 4 weeks', icon: <div className="text-2xl mb-2">⚡</div> },
      { label: '1 - 3 months', icon: <div className="text-2xl mb-2">🗓️</div> },
      { label: 'No rush', icon: <div className="text-2xl mb-2">☕</div> },
    ],
  },
];

export default function QuoteEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [questions[step].id]: option.label });
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getEstimate = () => {
    const type = answers.projectType;
    const projectOpt = questions[0].options.find(o => o.label === type);
    return projectOpt ? projectOpt.price : 'Custom Pricing';
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100/50">
        <motion.div 
          className="h-full bg-gradient-to-r from-brand-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: `${((step) / (questions.length + 1)) * 100}%` }}
          transition={{ duration: 0.6, ease: "circOut" }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step < questions.length && !isSubmitted && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-sm font-bold text-brand-500 mb-2 uppercase tracking-widest">Step {step + 1} of 3</div>
            <h3 className="text-3xl font-bold text-navy-900 mb-8">{questions[step].title}</h3>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {questions[step].options.map((option, idx) => (
                <motion.button
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  key={option.label}
                  onClick={() => handleOptionSelect(option)}
                  className="group relative flex flex-col items-center justify-center p-6 text-center border-2 border-slate-100 rounded-2xl hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/10 bg-white transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                  >
                    {option.icon}
                  </motion.div>
                  <span className="font-semibold text-slate-700 group-hover:text-brand-600 transition-colors z-10">{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === questions.length && !isSubmitted && (
          <motion.div
            key="lead-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-brand-600 mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-navy-900 mb-2">Analyzing requirements...</h3>
              <p className="text-slate-500">Enter your details to instantly reveal your custom estimate and timeline.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <input 
                  type="text" 
                  required
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white outline-none transition-all"
                  placeholder="Your Name"
                  value={leadData.name}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                />
                <input 
                  type="email" 
                  required
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white outline-none transition-all"
                  placeholder="Email Address"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-brand-600 to-violet-600 hover:from-brand-500 hover:to-violet-500 text-white rounded-xl font-bold shadow-lg shadow-brand-500/25 transition-all hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0"
              >
                Reveal My Estimate
              </button>
            </form>
          </motion.div>
        )}

        {isSubmitted && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="text-center py-8"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            
            <h3 className="text-3xl font-bold text-navy-900 mb-2">Here is your Estimate!</h3>
            <p className="text-slate-500 mb-8">Based on your selections, here is the estimated investment.</p>
            
            <div className="bg-gradient-to-br from-brand-50 to-violet-50 border border-brand-100 rounded-3xl p-8 max-w-sm mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>
              </div>
              <div className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-2">Estimated Investment</div>
              <div className="text-3xl font-black text-navy-900 mb-6">{getEstimate()}</div>
              
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-sm border-b border-brand-200/50 pb-2">
                  <span className="text-slate-500">Project Type:</span>
                  <span className="font-semibold text-navy-800">{answers.projectType}</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-slate-500">Timeline:</span>
                  <span className="font-semibold text-navy-800">{answers.timeline}</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-sm text-slate-500 max-w-sm mx-auto">
              We've also sent this to <span className="font-semibold text-slate-700">{leadData.email}</span>. A team member will be in touch shortly to finalize details!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
