import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function BeforeAfterSlider({ 
  beforeImage = "/images/before.png", 
  afterImage = "/images/after.png",
  beforeLabel = "Generic Template",
  afterLabel = "Prajyot Infotech Custom"
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Motion value for the slider position (percentage 0-100)
  const xPercentage = useMotionValue(50);
  
  // Calculate clip-path based on the drag percentage
  const clipPath = useTransform(xPercentage, (value) => `inset(0 ${100 - value}% 0 0)`);

  const handleDrag = (e, info) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(info.point.x - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    xPercentage.set(percentage);
  };

  const handleClick = (e) => {
    if (isDragging) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    xPercentage.set(percentage);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">The Custom Development Difference</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Drag the slider to see the difference between a cheap template and a high-performance custom application built by Prajyot Infotech.</p>
      </div>

      <div 
        ref={containerRef}
        onClick={handleClick}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden cursor-crosshair shadow-2xl border-4 border-white/50 bg-slate-100"
      >
        {/* Background (Before) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${beforeImage})` }}
        />

        {/* Foreground (After) bounded by clip-path */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ 
            backgroundImage: `url(${afterImage})`,
            clipPath 
          }}
        />

        {/* Labels */}
        <div className="absolute top-6 left-6 px-4 py-2 bg-slate-900/80 backdrop-blur text-white text-sm font-bold tracking-widest uppercase rounded-full pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute top-6 right-6 px-4 py-2 bg-brand-600/90 backdrop-blur text-white text-sm font-bold tracking-widest uppercase rounded-full pointer-events-none">
          {afterLabel}
        </div>

        {/* Drag Handle */}
        <motion.div
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setTimeout(() => setIsDragging(false), 50);
          }}
          onDrag={handleDrag}
          className="absolute top-0 bottom-0 w-1 cursor-ew-resize hover:w-2 transition-all bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 flex justify-center items-center group"
          style={{ left: useTransform(xPercentage, (val) => `${val}%`), x: '-50%' }}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-brand-500 group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 15l3-3-3-3" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
