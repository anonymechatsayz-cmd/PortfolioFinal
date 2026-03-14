import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Monitor, Rocket, Search, ChevronRight } from 'lucide-react';
import { FluidButton } from './FluidButton';

const MonitorAnimation = () => (
  <div className="relative w-32 h-32 flex items-center justify-center" style={{ perspective: '1000px' }}>
    {/* Multi-layered Screen Glow */}
    <motion.div
      className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
      whileInView={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Floating UI Elements */}
    <motion.div 
      className="absolute -left-4 top-4 w-10 h-10 bg-white/10 border border-white/20 rounded-lg shadow-lg z-20" 
      whileInView={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }} 
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
    />
    <motion.div 
      className="absolute -right-2 bottom-4 w-14 h-8 bg-white/10 border border-white/20 rounded-lg shadow-lg z-20" 
      whileInView={{ y: [5, -5, 5], rotate: [5, -5, 5] }} 
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} 
    />

    {/* Monitor with 3D Tilt */}
    <motion.div 
      whileInView={{ rotateY: [-12, 12, -12], rotateX: [5, -5, 5] }} 
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
      className="relative z-10"
    >
      <Monitor className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" strokeWidth={1} />
      
      {/* Sophisticated Scanning Plane */}
      <div className="absolute top-[20%] left-[15%] right-[15%] bottom-[35%] overflow-hidden z-20 rounded-sm">
        <motion.div
          className="w-full h-[200%] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
          whileInView={{ y: ['-50%', '0%'] }}
          viewport={{ once: false, margin: "100px" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  </div>
);

const RocketAnimation = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* Speed lines for dynamic movement */}
    <div className="absolute inset-0 overflow-hidden rounded-full z-0">
      {[...Array(4)].map((_, i) => (
        <motion.div 
          key={i} 
          className="absolute w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/40 to-white/0 rounded-full" 
          style={{ left: `${20 + i * 20}%`, top: '-30%' }} 
          whileInView={{ y: [0, 200] }} 
          viewport={{ once: false, margin: "100px" }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear", delay: i * 0.2 }} 
        />
      ))}
    </div>

    {/* Engine Glow */}
    <motion.div
      className="absolute inset-0 bg-orange-500/20 rounded-full blur-2xl"
      whileInView={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.8, 0.4] }}
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Rocket Movement Group */}
    <motion.div
      className="relative z-10 flex flex-col items-center"
      whileInView={{ 
        y: [-8, 8, -8], 
        x: [-3, 3, -3],
        rotate: [-3, 3, -3] 
      }}
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Multi-layered Exhaust Flame */}
      <motion.div
        className="absolute -bottom-8 w-8 h-16 bg-gradient-to-t from-transparent via-orange-500/80 to-yellow-300 blur-md rounded-full z-0 origin-top"
        whileInView={{ scaleY: [0.8, 1.3, 0.8], opacity: [0.7, 1, 0.7] }}
        viewport={{ once: false, margin: "100px" }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-6 w-4 h-10 bg-gradient-to-t from-transparent to-white blur-sm rounded-full z-0 origin-top" 
        whileInView={{ scaleY: [0.9, 1.2, 0.9] }} 
        viewport={{ once: false, margin: "100px" }}
        transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }} 
      />

      <div className="relative z-10 transform -rotate-45">
        <Rocket className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" strokeWidth={1} />
      </div>
    </motion.div>
  </div>
);

const SearchAnimation = () => (
  <div className="relative w-32 h-32 flex items-center justify-center">
    {/* Radar Sweep Background */}
    <motion.div 
      className="absolute inset-0 border-2 border-green-500/20 rounded-full" 
      whileInView={{ scale: [1, 1.6], opacity: [1, 0] }} 
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} 
    />
    <motion.div 
      className="absolute inset-0 border-2 border-green-500/20 rounded-full" 
      whileInView={{ scale: [1, 1.6], opacity: [1, 0] }} 
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }} 
    />

    <motion.div
      className="absolute inset-0 bg-green-500/10 rounded-full blur-xl"
      whileInView={{ scale: [0.9, 1.1, 0.9] }}
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
    
    {/* Floating Data Nodes */}
    {[0, 1, 2].map((i) => (
      <motion.div 
        key={i} 
        className="absolute w-3 h-3 bg-white/60 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
        style={{ left: `${20 + i * 30}%`, top: `${30 + (i % 2) * 40}%` }} 
        whileInView={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} 
        viewport={{ once: false, margin: "100px" }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }} 
      />
    ))}

    {/* Search Icon Movement */}
    <motion.div
      whileInView={{ x: [-12, 12, -12], y: [-8, 8, -8], rotate: [-10, 10, -10] }}
      viewport={{ once: false, margin: "100px" }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10"
    >
      <Search className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" strokeWidth={1} />
      {/* Glass reflection on the lens */}
      <div className="absolute top-[25%] left-[25%] w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-transparent to-white/30 blur-[1px]" />
    </motion.div>
  </div>
);

const ServiceIllustration = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Glass Container */}
      <motion.div
        className="w-full h-full rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden z-10"
        variants={{
          rest: { scale: 1, borderColor: "rgba(255,255,255,0.05)" },
          hover: { scale: 1.02, borderColor: "rgba(201, 165, 107, 0.3)" }
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Internal Rotating Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-sand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Icon Animation Container */}
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.08 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = React.memo(({ Animation, title, description, features, index, color, progress, range, targetScale, totalCards }: any) => {
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;

  const isLast = index === totalCards - 1;
  const reverseIndex = totalCards ? (totalCards - index) : 1;

  // Scroll-driven stacking 3D effects
  const animationStart = isLast ? 0.8 : index * 0.25;
  const scale = useTransform(progress, [animationStart, 1], [1, targetScale]);
  const rotateX = useTransform(progress, [animationStart, 1], [0, -(reverseIndex * 5)]); // Tilts backward as it gets covered
  const yOffset = useTransform(progress, [animationStart, 1], [0, -(reverseIndex * 20)]); // Pushes up slightly into the background
  const overlayOpacity = useTransform(progress, [animationStart, 1], [0, reverseIndex * 0.3]); // Darkens as it gets covered

  // Staggered Tags Variants
  const tagsContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const tagVariant = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as any, stiffness: 400, damping: 20 } }
  };

  return (
    <div 
      className="h-auto md:min-h-[80vh] flex items-center justify-center relative md:sticky"
      style={{ top: isDesktop ? '7rem' : '0', perspective: '1500px' }}
    >
      {/* Outer motion.div for scroll-driven stacking effects */}
      <motion.div 
        style={{ 
          scale: isDesktop ? scale : 1, 
          top: isDesktop ? `${index * 24}px` : 0,
          rotateX: isDesktop ? rotateX : 0,
          y: isDesktop ? yOffset : 0,
          transformOrigin: "top center"
        }} 
        className="w-full max-w-5xl mb-8 md:mb-0 will-change-transform"
      >
        {/* Inner motion.div for entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex flex-col h-auto md:min-h-[480px] w-full rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-14 shadow-2xl border border-white/5 overflow-hidden ${color}`}
        >
          {/* Depth Darkening Overlay */}
          {isDesktop && (
            <motion.div 
              className="absolute inset-0 bg-black z-20 pointer-events-none rounded-[2rem] md:rounded-[2.5rem]"
              style={{ opacity: overlayOpacity }}
            />
          )}

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay rounded-[2rem] md:rounded-[2.5rem]"></div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 h-full items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col justify-center h-full order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="font-mono text-sand text-sm font-bold tracking-widest">0{index + 1}</span>
                <div className="h-[1px] w-12 bg-sand/30" />
              </div>
              
              <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">{title}</h3>
              
              <p className="text-white/60 text-base md:text-xl leading-relaxed mb-8 md:mb-10 font-medium">
                {description}
              </p>

              <motion.div 
                variants={tagsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-wrap gap-3"
              >
                {features.map((feature: string, idx: number) => (
                  <motion.span 
                    key={idx} 
                    variants={tagVariant}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="relative px-4 py-2 rounded-full border border-white/10 text-xs md:text-sm font-semibold text-white/70 bg-white/5 overflow-hidden group cursor-default"
                  >
                    {/* Shimmer on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                      initial={{ x: '-150%' }}
                      whileHover={{ x: '150%' }}
                      transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity }}
                    />
                    <span className="relative z-10">{feature}</span>
                  </motion.span>
                ))}
              </motion.div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-full flex items-center justify-center relative order-1 lg:order-2 mb-8 lg:mb-0">
               <ServiceIllustration>
                 <Animation />
               </ServiceIllustration>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

const MobileServicesAccordion = React.memo(({ services }: { services: any[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col gap-4">
      {services.map((service, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index} className={`rounded-2xl border transition-colors duration-500 overflow-hidden ${isActive ? 'bg-white/5 border-sand/30' : 'bg-transparent border-white/10'}`}>
            <button
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 flex-shrink-0 rounded-full border flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${isActive ? 'bg-white/10 border-sand/50' : 'bg-white/5 border-white/10'}`}>
                  <div className="absolute inset-0 flex items-center justify-center scale-[0.35] opacity-80">
                    <service.Animation />
                  </div>
                </div>
                <h3 className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/70'}`}>
                  {service.title}
                </h3>
              </div>
              <motion.div animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.4, ease: "backOut" }}>
                <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-colors duration-500 ${isActive ? 'text-sand' : 'text-white/40'}`} />
              </motion.div>
            </button>
            
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 relative">
                    <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 font-medium">
                      {service.description}
                    </p>
                    <div className="relative flex items-center min-h-[120px] mt-2">
                      <div className="flex flex-wrap gap-2 w-[60%] relative z-10">
                        {service.features.map((feature: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-white/70 bg-white/5"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-28 flex items-center justify-center scale-[0.85] z-0 pointer-events-none">
                        <service.Animation />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
});

export const Services = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  // Subtle Ambient Glow based on scroll progress
  const glowBackground = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [
      'radial-gradient(circle at 50% 50%, rgba(59,130,246,0) 0%, transparent 60%)',
      'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)',
      'radial-gradient(circle at 50% 50%, rgba(249,115,22,0.06) 0%, transparent 60%)',
      'radial-gradient(circle at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)',
      'radial-gradient(circle at 50% 50%, rgba(34,197,94,0) 0%, transparent 60%)'
    ]
  );

  const services = [
    {
      Animation: MonitorAnimation,
      title: "Design d'Expérience & UI/UX",
      description: "L'esthétique ne suffit plus. Nous concevons des interfaces immersives et stratégiques qui captivent vos visiteurs et les guident naturellement vers la conversion.",
      features: ["Direction Artistique", "Prototypage Figma", "Expérience Utilisateur", "Design System"],
      color: "bg-[#14151A]" 
    },
    {
      Animation: RocketAnimation,
      title: "Développement Webflow Premium",
      description: "Oubliez les templates rigides. Nous donnons vie à vos maquettes avec Webflow pour un rendu sur-mesure, des animations fluides et une autonomie totale sur votre contenu.",
      features: ["Intégration Webflow", "Animations Avancées", "CMS Sur-Mesure", "Responsive Parfait"],
      color: "bg-[#1A1C23]"
    },
    {
      Animation: SearchAnimation,
      title: "Performance & SEO",
      description: "L'élégance alliée à la performance. Nous optimisons la structure, la vitesse et le SEO pour dominer les résultats de recherche et transformer vos visiteurs en clients.",
      features: ["Audit SEO Technique", "Copywriting Persuasif", "Performance 99+", "Analytics"],
      color: "bg-[#1F222B]" 
    }
  ];

  return (
    <section ref={container} id="services" className="bg-anthracite relative min-h-screen">
      {/* Ambient Glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 mix-blend-screen transition-colors duration-1000"
        style={{ background: glowBackground }}
      />
      
      <div className="container mx-auto px-6 pt-32 pb-32 relative z-10">
        <div className="mb-24 max-w-4xl mx-auto text-center relative">
          
          {/* Doodles & Stickers */}
          <motion.div 
            initial={{ opacity: 0, rotate: -15, scale: 0 }}
            whileInView={{ opacity: 1, rotate: -5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute -top-8 -left-4 md:-left-12 bg-emerald-400 text-anthracite font-bold py-1.5 px-3 rounded-xl shadow-lg border-2 border-anthracite z-20 transform -rotate-6 hidden md:block"
          >
            <span className="flex items-center gap-1 text-sm"><Rocket className="w-4 h-4" /> Rapide</span>
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-2 rounded-full border border-white/10 text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-8 inline-block"
          >
            Expertises
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
          >
            DES EXPÉRIENCES DIGITALES QUI <br className="hidden md:block" />
            <span className="text-sand italic font-serif font-light tracking-normal">marquent les esprits.</span>
          </motion.h2>
        </div>

        <div className="mt-8 mb-12">
          {/* Desktop 3D Stacking Cards */}
          <div className="hidden md:block">
            {services.map((service, index) => {
              const targetScale = 1 - ((services.length - index) * 0.05);
              return (
                <ServiceCard 
                  key={index} 
                  {...service} 
                  index={index} 
                  progress={scrollYProgress}
                  targetScale={targetScale}
                  totalCards={services.length}
                />
              );
            })}
          </div>
          
          {/* Mobile GSAP Accordion */}
          <div className="block md:hidden">
            <MobileServicesAccordion services={services} />
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center relative z-20 mt-12 text-center"
        >
           <h3 className="text-3xl md:text-5xl font-black text-white mb-10 tracking-tight">Prêt à élever votre <span className="text-sand italic font-serif font-light tracking-normal">standard digital ?</span></h3>
           <FluidButton href="#contact" className="px-6 py-4 md:px-10 md:py-5 text-anthracite text-base md:text-lg font-bold w-full md:w-auto flex justify-center" bgClass="bg-white group-hover:bg-sand transition-colors duration-500">
             Démarrer une collaboration <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform inline-block ml-2" />
           </FluidButton>
        </motion.div>
      </div>
    </section>
  );
};

