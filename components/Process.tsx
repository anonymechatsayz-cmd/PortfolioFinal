import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Code, Rocket, ArrowRight, Sparkles, PenTool } from 'lucide-react';
import { FluidButton } from './FluidButton';

const TimelineNode = ({ icon: Icon, title, description, num, isEven, deliverables }: any) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "center 60%"]
  });
  
  // Node scale and glow
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const springScale = useSpring(scale, { stiffness: 300, damping: 20 });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  const borderColor = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["rgba(255,255,255,0.1)", "rgba(212, 165, 116, 1)"] // white/10 to sand
  );
  
  const iconColor = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["rgba(255,255,255,0.3)", "rgba(26, 29, 41, 1)"] // white/30 to anthracite
  );

  const bgColor = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["rgba(26, 29, 41, 1)", "rgba(212, 165, 116, 1)"] // anthracite to sand
  );

  // Card slide in
  const xOffset = isEven ? 50 : -50;
  const cardX = useTransform(scrollYProgress, [0, 1], [xOffset, 0]);
  const springCardX = useSpring(cardX, { stiffness: 200, damping: 25 });
  const cardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={`relative flex items-center justify-between md:justify-center w-full mb-24 md:mb-32 last:mb-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Center Node (Trunk) - Adjusted left position for mobile */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div 
          style={{ scale: springScale, borderColor, backgroundColor: bgColor }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-shadow duration-500"
        >
          <motion.div style={{ color: iconColor }}>
            <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={2} />
          </motion.div>
        </motion.div>

        {/* Glowing aura when active */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 bg-sand rounded-full blur-xl -z-10"
        />
      </div>

      {/* Empty space for alternating layout on desktop */}
      <div className="hidden md:block w-5/12" />

      {/* Content Card (Branch) - Adjusted padding left for mobile */}
      <motion.div 
        style={{ x: springCardX, opacity: cardOpacity }}
        className={`w-full pl-16 md:pl-0 md:w-5/12 flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
      >
        {/* Simplified hover state: removed background change, kept border change */}
        <div className="relative bg-white/[0.05] border border-white/10 p-6 md:p-10 rounded-3xl hover:border-sand/30 transition-colors duration-500 group w-full max-w-lg overflow-hidden shadow-2xl">
          
          {/* Massive Number Watermark - Static opacity */}
          <div className="absolute -right-4 -bottom-6 text-[140px] font-black text-white/[0.02] pointer-events-none select-none leading-none z-0">
            {num}
          </div>

          {/* Connecting Branch Line (Desktop only) */}
          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-[1px] bg-gradient-to-r ${isEven ? 'from-sand/50 to-transparent -left-12' : 'from-transparent to-sand/50 -right-12'}`} />

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sand font-mono text-xs font-bold tracking-[0.2em] uppercase">Étape {num}</span>
              <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-sand/30 transition-colors duration-500" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-sand transition-colors duration-300 tracking-tight">{title}</h3>
            <p className="text-white/60 leading-relaxed text-sm md:text-base mb-6">
              {description}
            </p>

            {/* Deliverables Section (Tangible Proof) */}
            <div className="pt-5 border-t border-white/10 flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sand/50" />
              <div>
                <span className="block text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Livrables</span>
                <span className="block text-sm text-white/90 font-medium">{deliverables}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export const Process = () => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 60%"]
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 60%", "end 60%"]
  });

  const lineHeight = useTransform(timelineProgress, [0, 1], ["0%", "100%"]);

  // CTA Micro-animation
  const ctaGlowOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const ctaGlowScale = useTransform(scrollYProgress, [0.85, 0.95, 1], [0.8, 1.15, 1.05]);

  const steps = [
    {
      icon: Search,
      num: "01",
      title: "Immersion & Stratégie",
      description: "Analyse de votre écosystème et de vos concurrents. Nous définissons ensemble l'axe créatif et les KPIs qui feront la différence.",
      deliverables: "Audit UX/UI, Roadmap stratégique"
    },
    {
      icon: PenTool,
      num: "02",
      title: "Direction Artistique",
      description: "Création d'une identité visuelle sur-mesure. Fini les templates génériques, place à un design exclusif qui reflète votre véritable ADN.",
      deliverables: "Maquettes Figma, Design System"
    },
    {
      icon: Code,
      num: "03",
      title: "Développement Créatif",
      description: "Intégration pixel-perfect sur Webflow. Animations fluides, interactions poussées et optimisation obsessionnelle des performances.",
      deliverables: "Site Webflow optimisé, Animations"
    },
    {
      icon: Rocket,
      num: "04",
      title: "Déploiement & Autonomie",
      description: "Mise en ligne sous haute surveillance SEO. Vous prenez les clés avec une formation dédiée pour gérer votre contenu à 100%.",
      deliverables: "Formation vidéo, Guide d'utilisation"
    }
  ];

  return (
    <section id="process" className="bg-anthracite py-24 md:py-40 relative overflow-hidden">
      {/* Architectural Grid Background (Dark Mode) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      {/* Elegant Gradient Separator */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sand/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-sand/50 to-transparent blur-[2px]" />

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-40 relative">
          {/* Doodles & Stickers */}
          <motion.div 
            initial={{ opacity: 0, rotate: -15, scale: 0 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-10 left-0 md:-left-10 bg-sand text-anthracite font-bold py-1.5 px-4 rounded-xl shadow-lg border-2 border-transparent z-20 transform -rotate-12 hidden md:block"
          >
            <span className="flex items-center gap-2 text-sm uppercase tracking-wider"><Sparkles className="w-4 h-4" /> Sur-mesure</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 bg-white/5 border border-white/10 rounded-full mb-8"
          >
            <Sparkles className="w-5 h-5 text-sand" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight leading-[1.1]"
          >
            L'art de <span className="font-serif italic font-light text-sand">l'exécution.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Quatre étapes précises pour transformer votre expertise en une expérience digitale incontournable. Zéro hasard, 100% de maîtrise.
          </motion.p>
        </div>

        {/* The Tree / Timeline */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto flex flex-col items-center">
          
          <div ref={timelineRef} className="relative w-full">
            {/* The Trunk (Central Line) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/5">
              {/* Glowing Progress Line */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-sand/60 to-sand origin-top"
                style={{ 
                  scaleY: timelineProgress,
                  boxShadow: "0 0 15px 1px rgba(212, 165, 116, 0.3)"
                }}
              />
              {/* The Spark at the tip */}
              <motion.div 
                className="absolute left-1/2 w-3 h-3 bg-white rounded-full -translate-x-1/2 shadow-[0_0_15px_rgba(212,165,116,0.8)] z-30"
                style={{ top: lineHeight, y: "-50%" }}
              >
                <div className="absolute inset-0 bg-sand rounded-full blur-[2px] animate-pulse" />
              </motion.div>
            </div>

            {/* The Branches (Steps) */}
            <div className="relative z-10 py-12 w-full">
              {steps.map((step, index) => (
                <TimelineNode 
                  key={index} 
                  {...step} 
                  isEven={index % 2 === 1} // 0-indexed, so 1 is the 2nd item (right side)
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 md:mt-20 relative z-20 w-full px-6 md:px-0 flex justify-center"
          >
            <div className="relative inline-block w-full md:w-auto group">
              {/* Micro-animation: Fluid Aura / Bloom */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-sand/40 blur-xl pointer-events-none transition-colors duration-500 group-hover:bg-sand/60"
                style={{
                  opacity: ctaGlowOpacity,
                  scale: ctaGlowScale
                }}
              />
              {/* Subtle rim light connecting the line to the button */}
              <motion.div 
                className="absolute -inset-[2px] rounded-full bg-gradient-to-b from-sand via-sand/20 to-transparent pointer-events-none"
                style={{
                  opacity: ctaGlowOpacity,
                }}
              />
              <FluidButton href="#contact" className="w-full md:w-auto px-10 py-5 text-anthracite font-bold text-lg relative z-10" bgClass="bg-sand group-hover:bg-white transition-colors duration-500">
                Démarrer le projet <ArrowRight className="w-6 h-6 ml-2 inline-block" />
              </FluidButton>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
