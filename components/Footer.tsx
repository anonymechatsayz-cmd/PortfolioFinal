import React, { useState, useRef } from 'react';
import { ArrowUpRight, ArrowUp, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LegalModal } from './LegalModal';

const FooterLink = ({ href, children, onClick }: { href?: string, children: React.ReactNode, onClick?: () => void }) => (
  <motion.a 
    href={href}
    onClick={onClick}
    className="relative inline-block text-gray-400 hover:text-white transition-colors group cursor-pointer text-lg md:text-xl font-medium"
    whileHover="hover"
  >
    {children}
    <motion.span 
      className="absolute left-0 -bottom-1 h-[2px] bg-sand w-full origin-left"
      initial={{ scaleX: 0 }}
      variants={{ hover: { scaleX: 1 } }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    />
  </motion.a>
);

export const Footer = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'mentions' | 'cgv' | null }>({
    isOpen: false,
    type: null
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax effect for the massive text
  const textY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLegal = (type: 'mentions' | 'cgv') => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <footer ref={containerRef} className="bg-anthracite text-white relative overflow-hidden pt-20 pb-8 z-20 border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-sand/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Top Section: CTA & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* Left: CTA */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium tracking-wide text-gray-300 uppercase">Disponible pour de nouveaux projets</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-10 leading-[1.1]">
              Prêt à donner vie à <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand to-amber-500 italic font-light">votre vision ?</span>
            </h2>
            
            <motion.a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold bg-white text-anthracite rounded-full hover:bg-sand transition-colors duration-300 shadow-lg hover:shadow-sand/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Démarrer un projet <ArrowUpRight className="w-5 h-5 ml-2" />
            </motion.a>
          </div>

          {/* Right: Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-8">Navigation</h3>
              <ul className="space-y-4">
                <li><FooterLink href="#services">Services</FooterLink></li>
                <li><FooterLink href="#portfolio">Portfolio</FooterLink></li>
                <li><FooterLink href="#process">Méthode</FooterLink></li>
                <li><FooterLink href="#pricing">Tarifs</FooterLink></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-8">Réseaux</h3>
              <ul className="space-y-4">
                <li><FooterLink href="https://www.linkedin.com/in/clement-franjou/">LinkedIn</FooterLink></li>
                <li><FooterLink href="https://twitter.com/clementfranjou">Twitter</FooterLink></li>
                <li><FooterLink href="https://www.instagram.com/clementfranjou/">Instagram</FooterLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Massive Typography - Full Width Edge-to-Edge (SVG for perfect scaling without overflow) */}
      <div className="w-full flex justify-center items-center mb-16 select-none pointer-events-none relative z-10 px-4 md:px-8">
        <motion.div 
          style={{ y: textY, scale: textScale, opacity }}
          className="w-full"
        >
          <svg viewBox="0 0 1050 140" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="central" 
              textAnchor="middle" 
              className="font-black tracking-tighter fill-white/5"
              style={{ fontSize: '120px', fontFamily: 'inherit' }}
            >
              CLÉMENT FRANJOU
            </text>
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Clément Franjou.</span>
            <span className="hidden md:inline">Tous droits réservés.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => openLegal('mentions')} className="hover:text-sand transition-colors">Mentions Légales</button>
            <button onClick={() => openLegal('cgv')} className="hover:text-sand transition-colors">CGV</button>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sand hover:text-anthracite hover:border-sand transition-all duration-300 group"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type} 
      />
    </footer>
  );
};
