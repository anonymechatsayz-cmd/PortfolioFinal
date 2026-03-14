import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ text, className = "", delay = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -10% 0px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      }
    }
  };

  const charVariants = {
    hidden: { 
      y: 100, 
      opacity: 0, 
      rotateX: -90 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef} 
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block mr-[0.2em] whitespace-nowrap overflow-hidden">
          {word.split('').map((char, j) => (
            <motion.span 
              key={j} 
              variants={charVariants}
              className="inline-block origin-bottom"
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};
