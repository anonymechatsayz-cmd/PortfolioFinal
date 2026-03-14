import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface FluidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  bgClass?: string;
}

export const FluidButton = ({ children, onClick, className = "", href, bgClass }: FluidButtonProps) => {
  const Component = href ? motion.a : motion.button;
  const ref = useRef<any>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // "Dopamine" Physics: Light, Fluid, Aesthetic Bounce
  // Mass 0.5 makes it feel lightweight.
  // Stiffness 250 makes it responsive but not jittery.
  // Damping 18 allows a subtle, satisfying overshoot (bounce) that settles quickly.
  const springConfig = { damping: 18, stiffness: 250, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  
  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center overflow-hidden group rounded-full font-bold shadow-lg hover:shadow-sand/20 transition-all duration-300 border border-white/10 ${className || "px-8 py-4 text-white"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Base Background */}
      <div className={`absolute inset-0 z-0 ${bgClass || "bg-gradient-to-br from-gray-800 to-[#1a1d29]"}`} />
      
      {/* Interactive Fluid Gradient - "Alive" Feel */}
      <motion.div 
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.4, 
          background: useMotionTemplate`
            radial-gradient(
              120% 120% at ${springX}px ${springY}px,
              rgba(255, 255, 255, 0.15) 0%, 
              rgba(212, 165, 116, 0.1) 30%,
              rgba(255, 255, 255, 0) 100%
            )
          `
        }}
      />

      {/* Silver Shimmer Wave Effect - Premium Polish */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={isHovered ? { x: "200%" } : { x: "-100%" }}
        transition={{
          x: {
            duration: isHovered ? 1.5 : 0,
            ease: "linear",
            repeat: isHovered ? Infinity : 0,
            repeatDelay: 0.8
          }
        }}
      />

      {/* Content */}
      <span className="relative z-20 flex items-center justify-center gap-2 tracking-wide">
        {children}
      </span>
    </Component>
  );
};
