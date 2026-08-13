import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeTyping = () => {
  const codeString = `function buildBusiness() {\n  return success;\n}`;
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(codeString.substring(0, index));
      index++;
      if (index > codeString.length) {
        index = 0; // loop
        setDisplayedText('');
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-sm text-emerald-400 bg-navy-900/80 p-4 rounded-xl border border-white/10 w-full h-full flex items-center justify-center">
      <pre>{displayedText}<span className="animate-pulse">_</span></pre>
    </div>
  );
};

const NetworkNodes = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 rounded-full border border-dashed border-brand-400/50 flex items-center justify-center"
      >
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="w-8 h-8 rounded-full bg-brand-500 shadow-[0_0_20px_rgba(124,58,237,0.8)]"
        />
      </motion.div>
      {/* Orbits */}
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-48 h-48 rounded-full border border-brand-300/20"
      >
        <div className="w-4 h-4 bg-pink-500 rounded-full absolute top-0 left-1/2 -ml-2 -mt-2 shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
      </motion.div>
    </div>
  );
};

export default function BentoServices() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" aria-labelledby="bentoTitle">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <h2 id="bentoTitle" className="text-4xl md:text-5xl font-black text-navy-900 mb-4">
            Everything you need. <span className="text-brand-600">In one place.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            From stunning frontends to robust backend architectures, we handle the entire digital lifecycle.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          
          {/* Main Large Box */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-2 lg:col-span-2 row-span-2 rounded-3xl bg-navy-900 p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[80px] rounded-full group-hover:bg-brand-500/40 transition-colors" />
            <div className="relative z-10 h-1/2">
              <CodeTyping />
            </div>
            <div className="relative z-10 mt-8">
              <h3 className="text-3xl font-bold text-white mb-2">Custom Software & SaaS</h3>
              <p className="text-slate-400">We build bespoke web applications, ERPs, and SaaS platforms tailored exactly to your business logic.</p>
            </div>
          </motion.div>

          {/* Medium Box 1 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 lg:col-span-2 rounded-3xl bg-gradient-to-br from-brand-500 to-indigo-600 p-8 flex flex-col justify-between text-white shadow-xl"
          >
            <div className="h-1/2 flex items-center">
              <svg className="w-16 h-16 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Mobile Apps</h3>
              <p className="text-brand-100 text-sm">Native-feeling iOS and Android applications built with React Native.</p>
            </div>
          </motion.div>

          {/* Medium Box 2 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 lg:col-span-1 rounded-3xl bg-white p-8 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="h-1/2 text-5xl flex items-center">
              🚀
            </div>
            <div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">SEO & Speed</h3>
              <p className="text-slate-500 text-sm">Lightning fast load times and technical SEO built in from day one.</p>
            </div>
          </motion.div>

          {/* Medium Box 3 */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="md:col-span-1 lg:col-span-1 rounded-3xl bg-white p-8 border border-slate-200 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="h-1/2 flex items-center justify-center">
               <NetworkNodes />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-navy-900 mb-2">API Integration</h3>
              <p className="text-slate-500 text-sm">Connecting your systems flawlessly.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
