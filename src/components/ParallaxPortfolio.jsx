import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PORTFOLIO_ITEMS = [
  {
    title: "E-Commerce Platform",
    client: "Retail Giant India",
    image: "/images/after.png", // Reusing existing asset for mockup
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Clinic Management System",
    client: "HealthCare Plus",
    image: "/images/before.png", // Reusing existing asset
    color: "from-emerald-400 to-teal-500",
  },
  {
    title: "Inventory & Billing ERP",
    client: "Wholesale Distributors",
    image: "/images/after.png", // Reusing existing asset
    color: "from-orange-400 to-pink-500",
  }
];

export default function ParallaxPortfolio() {
  const targetRef = useRef(null);
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Calculate which item is currently active based on scroll progress
  // We have 3 items, so 0-33% is item 1, 33-66% is item 2, 66-100% is item 3
  const activeIndex = useTransform(scrollYProgress, (pos) => {
    if (pos < 0.33) return 0;
    if (pos < 0.66) return 1;
    return 2;
  });

  // Calculate the Y translation for the image reel inside the laptop screen
  // The image reel contains 3 images stacked vertically
  const reelY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "-33.33%", "-66.66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-navy-900" aria-label="Selected Works">
      {/* Sticky container that stays in view while scrolling past the 300vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Dynamic Background Glow based on active item */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <motion.div 
            className="w-[800px] h-[800px] blur-[120px] rounded-full"
            style={{
              background: useTransform(
                activeIndex,
                [0, 1, 2],
                [
                  "radial-gradient(circle, #3b82f6 0%, transparent 70%)", // blue
                  "radial-gradient(circle, #10b981 0%, transparent 70%)", // emerald
                  "radial-gradient(circle, #ec4899 0%, transparent 70%)"  // pink
                ]
              )
            }}
          />
        </div>

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Built for Scale.
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Scroll to explore the high-performance applications we've built for industry leaders.
          </p>
        </div>

        {/* 3D Laptop Mockup Container */}
        <div className="relative w-full max-w-4xl px-4 perspective-1000 z-10">
          <motion.div 
            className="relative transform-style-3d"
            style={{
              rotateX: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [20, 0, 0, -20]),
              scale: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9])
            }}
          >
            {/* Laptop Screen Frame */}
            <div className="relative w-full aspect-[16/10] bg-slate-800 rounded-t-3xl border-[12px] border-slate-900 shadow-2xl overflow-hidden rounded-b-lg">
              
              {/* Image Reel (Moves up as you scroll) */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-[300%]"
                style={{ y: reelY }}
              >
                {PORTFOLIO_ITEMS.map((item, idx) => (
                  <div key={idx} className="relative w-full h-1/3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                      <p className="text-brand-400 font-bold tracking-widest uppercase text-sm mb-2">
                        {item.client}
                      </p>
                      <h3 className="text-3xl md:text-5xl font-black text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Screen Glare Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Laptop Base/Keyboard Deck */}
            <div className="relative w-[110%] -ml-[5%] h-6 md:h-10 bg-slate-300 rounded-b-3xl rounded-t-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex justify-center">
              {/* Trackpad indentation */}
              <div className="w-1/4 h-3 md:h-4 bg-slate-400/50 rounded-b-md mt-1" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
