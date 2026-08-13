import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ROICalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyValue, setHourlyValue] = useState(500);

  // Calculations
  const hoursPerMonth = hoursPerWeek * 4;
  const costPerMonth = hoursPerMonth * hourlyValue;
  const costPerYear = costPerMonth * 12;

  // Assuming automation saves 80% of manual work time
  const timeSavedPerMonth = hoursPerMonth * 0.8;
  const moneySavedPerYear = costPerYear * 0.8;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden" aria-label="ROI Calculator">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-900/40 via-slate-900 to-slate-900"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-brand-400 mb-3">ROI Calculator</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            See the true cost of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-pink-400">manual work</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Use the sliders below to calculate how much time and money you are losing by not automating your business with custom software.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          {/* Left: Inputs */}
          <div className="space-y-12">
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-white font-semibold text-lg">Hours spent on manual tasks per week</label>
                <span className="text-3xl font-black text-brand-400">{hoursPerWeek}h</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">Billing, inventory tracking, customer follow-ups, data entry, etc.</p>
              <input 
                type="range" 
                min="1" 
                max="60" 
                value={hoursPerWeek} 
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-white font-semibold text-lg">Value of your time per hour</label>
                <span className="text-3xl font-black text-pink-400">₹{hourlyValue}</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">How much is your time (or your employee's time) worth?</p>
              <input 
                type="range" 
                min="100" 
                max="5000" 
                step="50"
                value={hourlyValue} 
                onChange={(e) => setHourlyValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Right: Results */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-white/5 relative overflow-hidden group hover:border-brand-500/30 transition-colors">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">Yearly Automation ROI</h3>
            
            <div className="space-y-8">
              <motion.div 
                key={moneySavedPerYear}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Money Saved Per Year</div>
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 flex items-baseline gap-1">
                  ₹{moneySavedPerYear.toLocaleString('en-IN')}
                </div>
                <p className="text-emerald-500/80 text-sm mt-2">Assuming 80% reduction in manual labor.</p>
              </motion.div>

              <motion.div 
                key={timeSavedPerMonth}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Time Saved Per Month</div>
                <div className="text-4xl md:text-5xl font-black text-white">
                  {timeSavedPerMonth} hours
                </div>
                <p className="text-slate-400 text-sm mt-2">That's {(timeSavedPerMonth / 8).toFixed(1)} full work days you get back every single month.</p>
              </motion.div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <a href="/estimate" className="inline-block w-full text-center py-4 px-6 rounded-xl bg-white text-slate-900 font-bold hover:bg-brand-50 hover:text-brand-700 transition-colors shadow-lg shadow-white/10">
                Automate Your Business Today
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
