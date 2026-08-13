import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseOver = (e) => {
      // Find closest a, button, or input tag
      const target = e.target.closest("a, button, input, textarea, select, [role='button']");
      if (target) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 32,
          height: 32,
          backgroundColor: isHovering ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0)",
          border: isHovering ? "0px solid rgba(255, 255, 255, 0)" : "2px solid rgba(255, 255, 255, 0.8)",
          scale: isHovering ? 1.5 : 1,
        }}
      />
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] size-2 rounded-full bg-white mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: 12,
          translateY: 12,
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
}
