import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STACK_DATA = [
  {
    id: 'frontend',
    label: 'Frontend (React/Vite)',
    color: 'from-blue-400 to-cyan-500',
    description: 'We build lightning-fast, reactive user interfaces using modern React and Vite. This ensures your website loads instantly, feels like a native app, and keeps your visitors engaged without frustrating wait times.',
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z"/>
      </svg>
    )
  },
  {
    id: 'backend',
    label: 'Backend (Node.js/Express)',
    color: 'from-emerald-400 to-green-600',
    description: 'Our robust Node.js backends power the logic of your application. They are designed to securely handle thousands of concurrent users, process complex data, and integrate seamlessly with third-party APIs (like payment gateways).',
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 6h16v2H4Zm0 5h16v2H4Zm0 5h16v2H4Z"/>
      </svg>
    )
  },
  {
    id: 'database',
    label: 'Database (MongoDB)',
    color: 'from-emerald-500 to-teal-700',
    description: 'We use NoSQL databases like MongoDB to securely store your critical business data. It provides incredible flexibility, meaning as your business grows and changes, your database easily adapts without breaking.',
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-1-13h2v6h-2Zm0 8h2v2h-2Z"/>
      </svg>
    )
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps (Vercel/AWS)',
    color: 'from-orange-400 to-rose-500',
    description: 'Your application is deployed on enterprise-grade cloud infrastructure. We implement automated testing and continuous integration (CI/CD) so updates are pushed seamlessly with zero downtime.',
    icon: (
      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96ZM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3Z"/>
      </svg>
    )
  }
];

export default function TechStackVisualizer() {
  const [activeLayer, setActiveLayer] = useState(STACK_DATA[0].id);

  const activeData = STACK_DATA.find(d => d.id === activeLayer);

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">How We Build</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Click on any layer of our technology stack to understand how it powers your business securely and efficiently.</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Isometric Stack Interactive Graphic */}
        <div className="relative w-full max-w-sm aspect-square perspective-1000 overflow-hidden">
          <div className="relative w-full h-full transform-style-3d rotate-x-60 rotate-z-[-45deg] scale-[0.65] sm:scale-75 md:scale-90 group">
            {STACK_DATA.slice().reverse().map((layer, idx) => {
              const isActive = activeLayer === layer.id;
              // Stacking them vertically in isometric view
              const translateZ = isActive ? (idx * 60) + 30 : idx * 60;
              
              return (
                <motion.div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`absolute inset-0 cursor-pointer rounded-2xl shadow-[rgba(0,0,0,0.2)_0px_20px_50px_-10px] transition-all duration-500 ease-out flex items-center justify-center bg-gradient-to-br ${layer.color} border-4 ${isActive ? 'border-white' : 'border-white/20'}`}
                  style={{
                    transform: `translateZ(${translateZ}px)`,
                    opacity: isActive ? 1 : 0.85
                  }}
                  whileHover={{ 
                    transform: `translateZ(${translateZ + 20}px)`,
                    opacity: 1
                  }}
                >
                  <div className="transform rotate-x-[-60deg] rotate-z-[45deg] flex flex-col items-center gap-2">
                    {layer.icon}
                    <span className="text-white font-bold tracking-wider text-sm shadow-sm">{layer.label.split(' ')[0]}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Panel */}
        <div className="flex-1 w-full min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLayer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col justify-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${activeData.color} mb-6 shadow-lg shadow-brand-500/20`}>
                {activeData.icon}
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{activeData.label}</h3>
              <div className="w-12 h-1 bg-brand-500 rounded-full mb-6"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {activeData.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
