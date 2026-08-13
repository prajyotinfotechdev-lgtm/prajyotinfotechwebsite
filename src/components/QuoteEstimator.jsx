import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 'projectType',
    title: 'What type of project are you looking for?',
    options: ['Landing Page', 'E-Commerce', 'SaaS / Web App', 'Mobile App'],
  },
  {
    id: 'timeline',
    title: 'How soon do you need this launched?',
    options: ['ASAP (Under 2 weeks)', '2 - 4 weeks', '1 - 3 months', 'No rush'],
  },
];

export default function QuoteEstimator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [questions[step].id]: option });
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would typically send data to a backend or webhook
    console.log('Lead Captured:', { ...answers, ...leadData });
    setIsSubmitted(true);
  };

  const getEstimate = () => {
    const type = answers.projectType;
    if (type === 'Landing Page') return '₹15,000 - ₹30,000';
    if (type === 'E-Commerce') return '₹40,000 - ₹80,000';
    if (type === 'SaaS / Web App') return '₹80,000 - ₹2,50,000+';
    if (type === 'Mobile App') return '₹1,00,000 - ₹3,00,000+';
    return 'Custom Pricing';
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
        <motion.div 
          className="h-full bg-brand-600"
          initial={{ width: 0 }}
          animate={{ width: `${((step) / (questions.length + 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step < questions.length && !isSubmitted && (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-6">{questions[step].title}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="p-4 text-left border-2 border-slate-200 rounded-xl hover:border-brand-500 hover:bg-brand-50 transition-colors font-medium text-slate-700"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === questions.length && !isSubmitted && (
          <motion.div
            key="lead-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-navy-900 mb-4">Almost there!</h3>
            <p className="text-slate-600 mb-6">Enter your details to reveal your instant project estimate.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="John Doe"
                  value={leadData.name}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  placeholder="john@example.com"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-4"
              >
                Reveal My Estimate
              </button>
            </form>
          </motion.div>
        )}

        {isSubmitted && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 mb-2">Thank you, {leadData.name}!</h3>
            <p className="text-slate-600 mb-8">Based on your answers, your estimated investment is:</p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 inline-block shadow-sm">
              <span className="text-3xl font-extrabold text-brand-600">{getEstimate()}</span>
            </div>
            <p className="text-sm text-slate-500">
              We've sent a copy of this to {leadData.email}. Our team will reach out shortly to discuss the exact details!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
