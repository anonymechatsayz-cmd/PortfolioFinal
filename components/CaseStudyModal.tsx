import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, TrendingUp } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
    stats: string;
    challenges: string[];
    solutions: string[];
    results: string[];
  } | null;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#0a0a0a] w-full max-w-6xl h-full max-h-[90vh] md:max-h-[85vh] overflow-hidden rounded-[2px] border border-white/10 shadow-2xl pointer-events-auto relative flex flex-col md:flex-row">
              
              {/* Close Button (Floating) */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-3 bg-black/80 rounded-full hover:bg-white hover:text-black transition-all border border-white/10 group"
              >
                <X className="w-5 h-5 text-white group-hover:text-black transition-colors" />
              </button>

              {/* Left Column: Image & Hero (Desktop) */}
              <div className="w-full md:w-[45%] h-64 md:h-full relative flex-shrink-0 border-r border-white/10">
                <motion.div className="w-full h-full">
                  <OptimizedImage 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale-[20%]"
                  />
                </motion.div>
                
                {/* Noise Overlay */}
                <div className="absolute inset-0 z-10 opacity-[0.1] pointer-events-none mix-blend-overlay" 
                     style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-20 flex flex-col justify-end p-8 md:p-12">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-mono text-xs uppercase tracking-widest text-white/60 mb-4 block"
                  >
                    {project.category}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-6xl font-serif text-white leading-[0.9]"
                  >
                    {project.title}
                  </motion.h2>
                </div>
              </div>

              {/* Right Column: Content (Scrollable) */}
              <div className="w-full md:w-[55%] h-full overflow-y-auto bg-[#0a0a0a] custom-scrollbar">
                <div className="p-8 md:p-16">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/70 text-lg leading-relaxed mb-16 font-light border-l-2 border-white/20 pl-6"
                  >
                    {project.description}
                  </motion.p>

                  <div className="space-y-16">
                    {/* Challenges */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-4">
                        <span className="text-white/20 font-mono text-sm">01</span>
                        Le Défi
                      </h3>
                      <ul className="space-y-4 pl-8 border-l border-white/10">
                        {project.challenges.map((challenge, idx) => (
                          <li key={idx} className="text-white/60 text-sm md:text-base leading-relaxed">
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-2xl font-serif text-white mb-6 flex items-center gap-4">
                        <span className="text-white/20 font-mono text-sm">02</span>
                        La Solution
                      </h3>
                      <ul className="space-y-4 pl-8 border-l border-white/10">
                        {project.solutions.map((solution, idx) => (
                          <li key={idx} className="text-white/60 text-sm md:text-base leading-relaxed">
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Results */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-white/5 p-8 rounded-sm border border-white/10"
                    >
                      <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-white/50" />
                        Résultats
                      </h3>
                      <ul className="space-y-4">
                        {project.results.map((result, idx) => (
                          <li key={idx} className="text-white/80 font-light flex items-start gap-4 text-sm md:text-base">
                            <CheckCircle2 className="w-5 h-5 text-white/40 flex-shrink-0 mt-0.5" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  <div className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-xs font-mono uppercase tracking-widest text-white/30">
                      Projet réalisé en 2024
                    </div>
                    <a 
                      href="#contact"
                      onClick={onClose}
                      className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all"
                    >
                      <span>Démarrer un projet</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
