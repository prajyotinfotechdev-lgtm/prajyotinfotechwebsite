import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tooltip({ text, term }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <span className="cursor-help border-b-2 border-dotted border-brand-400 font-semibold text-brand-700 hover:text-brand-800 transition-colors">
        {term}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl text-white text-xs leading-relaxed shadow-xl border border-white/10 pointer-events-none"
          >
            <div className="font-bold text-brand-300 mb-1">{term}</div>
            {text}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900/90 rotate-45 -mt-1.5 border-r border-b border-white/10"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
