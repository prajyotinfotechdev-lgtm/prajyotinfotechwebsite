import React, { useState } from 'react';

export default function BeforeAfterSlider({ 
  beforeImage = "/images/before.png", 
  afterImage = "/images/after.png",
  beforeLabel = "Generic Template",
  afterLabel = "Prajyot Infotech Custom"
}) {
  const [sliderPos, setSliderPos] = useState(50);

  const handleSliderChange = (e) => {
    setSliderPos(e.target.value);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">The Custom Development Difference</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Slide to see the difference between a cheap template and a high-performance custom application built by Prajyot Infotech.</p>
      </div>

      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 bg-slate-100 select-none">
        
        {/* Background (Before) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${beforeImage})` }}
        />

        {/* Foreground (After) bounded by clip-path */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ 
            backgroundImage: `url(${afterImage})`,
            clipPath: `inset(0 ${100 - sliderPos}% 0 0)`
          }}
        />

        {/* Labels */}
        <div className="absolute top-2 left-2 md:top-6 md:left-6 px-2 py-1 md:px-4 md:py-2 bg-slate-900/80 backdrop-blur text-white text-[10px] md:text-sm font-bold tracking-widest uppercase rounded-full pointer-events-none">
          {beforeLabel}
        </div>
        <div className="absolute top-2 right-2 md:top-6 md:right-6 px-2 py-1 md:px-4 md:py-2 bg-brand-600/90 backdrop-blur text-white text-[10px] md:text-sm font-bold tracking-widest uppercase rounded-full pointer-events-none">
          {afterLabel}
        </div>

        {/* Custom Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 flex justify-center items-center pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-brand-500 transition-transform">
            <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 15l3-3-3-3" />
            </svg>
          </div>
        </div>

        {/* Invisible Native Range Input for Flawless Interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 m-0"
        />
      </div>
    </div>
  );
}
