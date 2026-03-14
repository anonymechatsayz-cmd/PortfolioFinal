import React from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

const logos = [
  { name: 'Next.js', url: 'https://cdn.worldvectorlogo.com/logos/next-js.svg' },
  { name: 'Webflow', url: 'https://cdn.worldvectorlogo.com/logos/webflow.svg' },
  { name: 'Tailwind', url: 'https://cdn.worldvectorlogo.com/logos/tailwindcss.svg' },
  { name: 'Framer', url: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' },
  { name: 'GSAP', url: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg' },
  { name: 'TypeScript', url: 'https://cdn.worldvectorlogo.com/logos/typescript.svg' },
];

export const LogoCloud = () => {
  return (
    <div className="py-12 md:py-20 bg-cream overflow-hidden border-y border-anthracite/5">
      <div className="container mx-auto px-6 mb-8 text-center">
        <span className="text-[10px] font-mono font-bold text-anthracite/30 uppercase tracking-[0.3em]">
          Technologies & Standards de Performance
        </span>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div 
          className="flex items-center gap-12 md:gap-24 animate-scroll whitespace-nowrap"
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              <OptimizedImage 
                src={logo.url} 
                alt={logo.name} 
                className="h-6 md:h-8 w-auto object-contain"
              />
              <span className="font-display font-bold text-lg md:text-xl text-anthracite">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
