import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TransitionSection = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Clip path wipes from bottom to top
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(0% 0 0% 0)", "inset(0% 0 100% 0)"]);

  return (
    <section ref={container} className="h-[200vh] relative bg-[#F4F4F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Bottom Layer: SIMPLE */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#F4F4F4]">
          <h2 className="text-[20vw] font-black text-[#0A0A0A] tracking-tighter uppercase leading-none font-display">
            SIMPLE
          </h2>
          {/* Scroll Down Indicators - Bottom Layer */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs tracking-[0.3em] uppercase font-bold text-[#0A0A0A]">
            Scroll Down
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-xs tracking-[0.3em] uppercase font-bold text-[#0A0A0A]">
            Scroll Down
          </div>
        </div>

        {/* Top Layer: VERY */}
        <motion.div 
          style={{ clipPath }}
          className="absolute inset-0 flex items-center justify-center bg-[#9B1C26]"
        >
          <h2 className="text-[20vw] font-black text-[#42E6D0] tracking-tighter uppercase leading-none font-display">
            VERY
          </h2>
          {/* Scroll Down Indicators - Top Layer */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs tracking-[0.3em] uppercase font-bold text-[#42E6D0]">
            Scroll Down
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-xs tracking-[0.3em] uppercase font-bold text-[#42E6D0]">
            Scroll Down
          </div>
        </motion.div>

      </div>
    </section>
  );
};
