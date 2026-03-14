import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Headphones, ArrowUpRight, Rocket, Palette, MapPin, Euro, ShieldCheck, Sparkles, Star, ArrowDown } from 'lucide-react';
import { InteractiveBackground } from './InteractiveBackground';
import { FluidButton } from './FluidButton';

// Optimized glassmorphism (removed heavy backdrop-blur for better performance over animated backgrounds)
const glassStyles = {
  base: "bg-white/80 border border-white/60 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(255,255,255,0.6)_inset]",
  hover: "hover:bg-white/95 hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15),0_0_0_0.5px_rgba(255,255,255,0.8)_inset]",
};

const ScrollingWord = React.memo(() => {
  const words = [
    { mobile: "Clients Fidèles", desktop: "Clients Fidèles" },
    { mobile: "Devis", desktop: "Demandes de Devis" },
    { mobile: "Chiffre d'Affaires", desktop: "Chiffre d'Affaires" },
    { mobile: "Appels", desktop: "Appels Entrants" }
  ];
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <span className="relative inline-block text-center md:text-left">
      <span className="relative h-[1.2em] overflow-hidden inline-flex flex-col justify-start align-top min-w-[2ch] text-[1.1em] align-middle">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={prefersReducedMotion ? false : { y: "100%", opacity: 0, scale: 0.95 }}
            animate={{ y: "0%", opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { y: "-100%", opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="block text-transparent bg-clip-text bg-gradient-to-r from-sand via-amber-500 to-sand whitespace-nowrap absolute top-0 left-0 right-0 text-center md:text-left will-change-transform"
          >
            <span className="md:hidden">{words[index].mobile}</span>
            <span className="hidden md:inline">{words[index].desktop}</span>
          </motion.span>
        </AnimatePresence>
        <span className="opacity-0 pointer-events-none grid text-center md:text-left" aria-hidden="true">
          {words.map((w, i) => (
            <span key={i} className="col-start-1 row-start-1">
              <span className="md:hidden">{w.mobile}</span>
              <span className="hidden md:inline">{w.desktop}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
});

// Feature items data
const featureItems = [
  { icon: CheckCircle2, text: "Livraison 7j" },
  { icon: Rocket, text: "Site Ultra-Rapide" },
  { icon: TrendingUp, text: "Conversion Maximisée" },
  { icon: Palette, text: "Design Unique" },
  { icon: Headphones, text: "Support Réactif" },
  { icon: MapPin, text: "Référencement Local" },
  { icon: Euro, text: "ROI Positif" }
];

// Feature item component with glassmorphism
const FeatureItem = React.memo(({ icon: Icon, text, className = "" }: { icon: any; text: string; className?: string }) => (
  <div className={`flex items-center gap-2.5 group ${className}`}>
    <div className="relative will-change-transform">
      <div className="absolute inset-0 bg-sand/25 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 motion-reduce:transition-none" aria-hidden="true" />
      <div className={`relative p-2.5 md:p-3 rounded-full ${glassStyles.base} ${glassStyles.hover} transition-all duration-300 motion-reduce:transition-none`}>
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-sand" strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
    <span className="font-semibold text-anthracite/75 text-sm md:text-base whitespace-nowrap group-hover:text-anthracite transition-colors duration-300 motion-reduce:transition-none">{text}</span>
  </div>
));

export const Hero = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, prefersReducedMotion ? 1 : 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: prefersReducedMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-40 md:pb-16 overflow-hidden bg-cream"
      aria-label="Section principale"
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center" 
        aria-hidden="true"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <InteractiveBackground />
      </motion.div>

      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto px-6 relative z-10 text-center will-change-transform"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1100px] mx-auto flex flex-col items-center"
        >
          {/* Premium Trust Badge - Aesthetic Redesign */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-8 px-3 py-1 md:px-5 md:py-2 rounded-full bg-white/80 border border-white/60 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#E5B05C] fill-[#E5B05C]" />
              ))}
            </div>
            <div className="w-[1px] h-3 md:h-4 bg-anthracite/15"></div>
            <span className="text-[10px] md:text-[13px] font-medium text-anthracite/80 tracking-wide">
              100% Clients Satisfaits
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="relative w-full max-w-[100vw] overflow-visible">
            {/* Doodles & Stickers - Hidden on mobile for clarity */}
            <motion.div 
              drag
              dragMomentum={false}
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
              initial={{ opacity: 0, rotate: -20, scale: 0 }}
              animate={{ opacity: 1, rotate: -10, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="hidden md:block absolute -top-12 -left-24 bg-amber-400 text-anthracite font-bold py-2 px-4 rounded-2xl shadow-xl border-2 border-anthracite z-20 cursor-grab"
            >
              <span className="flex items-center gap-2 text-base pointer-events-none"><Sparkles className="w-4 h-4" /> Sur-mesure</span>
            </motion.div>

            <motion.div 
              drag
              dragMomentum={false}
              dragConstraints={{ left: -300, right: 300, top: -200, bottom: 200 }}
              whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 50 }}
              initial={{ opacity: 0, rotate: 20, scale: 0 }}
              animate={{ opacity: 1, rotate: 15, scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="hidden md:block absolute top-10 -right-16 bg-white text-anthracite font-bold py-2 px-4 rounded-full shadow-xl border-2 border-anthracite z-20 cursor-grab"
            >
              <span className="flex items-center gap-2 text-base pointer-events-none"><Star className="w-4 h-4 text-sand" /> Local</span>
            </motion.div>

            <h1 className="text-[10vw] sm:text-[9vw] md:text-7xl lg:text-[5rem] xl:text-[5.25rem] font-bold font-serif text-anthracite/90 leading-[1.05] md:leading-[1.05] mb-6 md:mb-8 tracking-tight text-balance relative z-10 flex flex-col items-center w-full">
              <span className="block overflow-hidden pb-2 -mb-2 w-full px-4">
                <motion.span 
                  className="block origin-bottom-left"
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: "120%", rotate: 2 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: "0%", rotate: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  Transformez vos <br className="md:hidden" /> visiteurs <span className="md:hidden">en</span>
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-4 -mb-4 mt-2 w-full">
                <motion.span 
                  className="block origin-bottom-left flex items-center justify-center w-full gap-x-2 sm:gap-x-3 md:gap-x-6 lg:gap-x-8"
                  initial={prefersReducedMotion ? { opacity: 0 } : { y: "120%", rotate: 2 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { y: "0%", rotate: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                >
                  <span className="hidden md:inline-block">en</span>
                  <ScrollingWord />
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-[16px] md:text-[22px] text-anthracite/60 max-w-2xl mb-8 md:mb-12 leading-relaxed"
          >
            Spécialiste Web pour PME. <br />
            <span className="text-anthracite/80 md:text-anthracite/90 font-semibold">Livré en 7 jours. Satisfaction garantie.</span>
          </motion.p>

          {/* CTAs with Glassmorphism on secondary */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center w-full px-4"
          >
            <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-center justify-center w-full mb-4" role="group" aria-label="Actions principales">
              <FluidButton 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-[18px] text-white text-lg md:text-[19px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Réserver mon appel <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform motion-reduce:transition-none" aria-hidden="true" />
              </FluidButton>
              
              {/* Desktop Secondary Button */}
              <motion.a
                href="#portfolio"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                className="hidden md:flex group relative px-8 py-4 md:px-10 md:py-[18px] rounded-full font-medium text-lg md:text-[19px] items-center gap-3 w-auto justify-center text-anthracite/80 bg-white/80 border border-white/50 shadow-[0_2px_24px_-4px_rgba(0,0,0,0.08),0_0_0_0.5px_rgba(255,255,255,0.5)_inset] hover:bg-white/95 hover:text-anthracite hover:shadow-[0_4px_32px_-4px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(255,255,255,0.8)_inset] hover:border-white/80 transition-all duration-500 ease-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                <span className="relative z-10">Voir les projets</span>
                <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                  <ArrowDown className="w-3.5 h-3.5 text-anthracite/70 group-hover:text-anthracite transition-colors duration-300" />
                </div>
              </motion.a>
            </div>
            
            {/* Micro-copy for conversion */}
            <div className="flex items-center gap-2 text-[12px] md:text-[14px] text-anthracite/60 font-medium mb-5 md:mb-0">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
              <span>Appel de 15 min gratuit • Sans engagement</span>
            </div>

            {/* Mobile Secondary Button (Integrated Avatar Pill) */}
            <a 
              href="#portfolio" 
              className="md:hidden group flex items-center gap-3 bg-white/90 border border-anthracite/10 p-1.5 pr-5 rounded-full shadow-sm hover:bg-white hover:shadow-md transition-all active:scale-95 mt-3"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-b from-sand/40 to-anthracite/5 border border-white shadow-sm flex items-end justify-center">
                  <img 
                    src="/profile.png" 
                    alt="Clément" 
                    width={36}
                    height={36}
                    className="w-full h-[115%] object-cover object-top"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-[2px] shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>
              <span className="text-[13px] font-semibold text-anthracite/80 group-hover:text-anthracite transition-colors">
                Voir mes réalisations
              </span>
              <ArrowDown className="w-4 h-4 text-anthracite/40 group-hover:translate-y-1 group-hover:text-anthracite transition-all" />
            </a>
          </motion.div>

          {/* Desktop Scrolling Feature Banner */}
          <motion.div
            variants={itemVariants}
            className="mt-10 w-full overflow-hidden relative hidden md:block"
            role="marquee"
            aria-label="Avantages et services"
          >
            {/* Gradient Masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" aria-hidden="true"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" aria-hidden="true"></div>

            <motion.div 
              className="flex items-center w-max will-change-transform"
              whileInView={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
              viewport={{ once: false, margin: "100px" }}
              transition={{ duration: 50, ease: "linear", repeat: Infinity }}
            >
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-8 md:gap-16 pr-8 md:pr-16 shrink-0">
                  {featureItems.map((item, i) => (
                    <FeatureItem key={`${setIndex}-${i}`} {...item} />
                  ))}
                </div>
              ))}
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </section>
  );
};
