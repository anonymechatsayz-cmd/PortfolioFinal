import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Clock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

// --- ANIMATED COUNTER COMPONENT ---
const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Slower animation for small numbers (like 7 or 2) to make them readable
  const isSmallNumber = value < 10;
  const spring = useSpring(0, { 
    stiffness: isSmallNumber ? 15 : 50, 
    damping: isSmallNumber ? 15 : 20 
  });
  
  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, spring, value]);

  const rounded = useTransform(spring, (latest) => Math.round(latest));

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = ({ children, className, href }: { children: React.ReactNode, className?: string, href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    // Disable magnetic effect on touch devices for better UX
    if (window.matchMedia && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });
  
  return (
    <motion.a 
      href={href} 
      ref={ref} 
      onMouseMove={handleMouse} 
      onMouseLeave={reset} 
      animate={{ x: position.x, y: position.y }} 
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }} 
      className={className}
    >
      {children}
    </motion.a>
  );
};

export const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const stats = [
    { icon: Zap, label: "Rapidité", value: 7, suffix: "Jours", desc: "Délai moyen" },
    { icon: ShieldCheck, label: "Fiabilité", value: 100, suffix: "%", desc: "Respect des délais" },
    { icon: Clock, label: "Réactivité", value: 2, prefix: "<", suffix: "h", desc: "Temps de réponse" }
  ];

  const techStack = ['Figma', 'Webflow', 'Relume', 'GSAP', 'React'];

  // Staggered Text Animation Variants
  const headingVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };
  
  const lineVariants = {
    hidden: { y: "120%", opacity: 0, rotate: 2 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section ref={containerRef} id="about" className="py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Architectural Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
        style={{ 
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      {/* Subtle Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-multiply pointer-events-none z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Professional Photo with Parallax */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-5 relative h-[320px] sm:h-[400px] md:h-[650px] rounded-[2rem] overflow-hidden shadow-2xl group z-10"
          >
            <motion.div style={{ y: imageY, height: '120%' }} className="absolute inset-0 -top-[10%]">
              {/* PLACEHOLDER FOR PHOTO: Replace src with your actual professional photo */}
              <OptimizedImage 
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&fm=webp" 
                alt="Clément Franjou - Expert Webflow" 
                width={800}
                height={650}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
            
            {/* Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite/80 via-anthracite/20 to-transparent opacity-80 md:opacity-60" />

            {/* Floating Identity Badge (Trust Element) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-6 md:bottom-6 left-4 right-4 md:left-6 md:right-6 bg-white/95 border border-white/50 p-4 md:p-5 rounded-2xl shadow-xl"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-anthracite flex items-center justify-center text-sand font-bold text-lg md:text-xl shadow-inner shrink-0">
                  CF
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold text-anthracite leading-tight">Clément Franjou</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-medium">Expert Webflow & Design</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Copy, Stats & Stack */}
          <div className="md:col-span-7 flex flex-col justify-center relative z-20">
            
            <div>
              
              <motion.div
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="text-sand font-bold tracking-widest uppercase text-xs md:text-sm mb-3 md:mb-4 block">À Propos</span>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-anthracite mb-6 md:mb-8 leading-[1.1] tracking-tight">
                  <span className="overflow-hidden inline-block pb-1 md:pb-2">
                    <motion.span variants={lineVariants} className="inline-block">Votre partenaire digital,</motion.span>
                  </span>
                  <br />
                  <span className="overflow-hidden inline-block pb-1 md:pb-2">
                    <motion.span variants={lineVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sand to-amber-600">
                      pas juste un exécutant.
                    </motion.span>
                  </span>
                </h2>
                
                <motion.div variants={lineVariants}>
                  <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-6 leading-relaxed">
                    L'esthétique attire, la stratégie convertit. Mon rôle est d'aligner l'image de votre entreprise avec vos objectifs de croissance.
                  </p>
                  <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 leading-relaxed">
                    En direct, sans intermédiaire, avec <span className="font-serif italic font-bold text-anthracite text-lg md:text-2xl relative inline-block">l'exigence d'un studio premium<span className="absolute -bottom-1 left-0 w-full h-2 bg-sand/30 -z-10 rounded-full"></span></span>.
                  </p>
                </motion.div>
              </motion.div>

              {/* Key Stats Grid - Optimized for Mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10">
                 {stats.map((stat, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                      className={`relative bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-sand/30 transition-all duration-500 group overflow-hidden ${i === 2 ? 'col-span-2 lg:col-span-1' : ''}`}
                   >
                      {/* Hover Accent Line */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sand to-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                      
                      {/* Background Glow on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all duration-300 shrink-0">
                            <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-sand group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <div className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] leading-tight">{stat.desc}</div>
                        </div>
                        
                        <div>
                          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-anthracite tracking-tighter flex items-baseline">
                            {stat.prefix && <span className="text-xl md:text-2xl lg:text-3xl text-sand/80 font-bold mr-1">{stat.prefix}</span>}
                            <AnimatedNumber value={stat.value} />
                            {stat.suffix && <span className={`text-lg md:text-xl lg:text-2xl text-sand/80 font-bold ${stat.suffix === '%' ? '' : 'ml-1'}`}>{stat.suffix}</span>}
                          </div>
                          <div className="text-xs md:text-sm font-bold text-anthracite mt-1 md:mt-2">{stat.label}</div>
                        </div>
                      </div>
                   </motion.div>
                 ))}
              </div>

              {/* Tech Stack & CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 md:pt-8 border-t border-gray-100"
              >
                <div className="flex flex-wrap gap-2">
                   {techStack.map(tech => (
                      <span key={tech} className="px-3 py-1.5 bg-gray-50 md:bg-gray-100 text-gray-600 text-[11px] md:text-xs font-bold rounded-full border border-gray-200 hover:border-sand/50 hover:-translate-y-1 hover:shadow-md hover:text-anthracite transition-all duration-300 cursor-default">
                        {tech}
                      </span>
                   ))}
                </div>

                <MagneticButton 
                  href="#process" 
                  className="inline-flex items-center justify-center gap-2 bg-anthracite text-white px-6 py-3 rounded-full text-sm md:text-base font-bold hover:bg-sand hover:text-anthracite transition-colors group whitespace-nowrap shadow-lg w-full sm:w-auto"
                >
                  Découvrir ma méthode <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
