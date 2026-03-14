import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, ArrowRight, Layers, Smartphone, Globe } from 'lucide-react';
import { projects } from '../data/projects';
import { OptimizedImage } from './OptimizedImage';

const MagneticButton = ({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const projectIndex = projects.findIndex(p => p.id === id);
  const project = projects[projectIndex];
  
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainer });
  
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    // Scroll to top when project changes
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center bg-[#1A1D29] text-white">Projet introuvable</div>;
  }

  const handleNextProject = () => {
    const nextIdx = (projectIndex + 1) % projects.length;
    navigate(`/projet/${projects[nextIdx].id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full bg-[#1A1D29] text-white"
    >
      <div 
        className="fixed inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-0"
        style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}
      />

      <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[60]">
        <MagneticButton 
          onClick={() => navigate(-1)}
          className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          <X className="w-5 h-5" />
        </MagneticButton>
      </div>

      <div className="w-full relative z-10">
        <div
          key={project.id}
          className="w-full min-h-full flex flex-col"
          style={{ backgroundColor: project.color }}
        >
          <div className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden">
              <motion.div 
                style={{ y: heroY, scale: heroScale, width: '100%', height: '100%' }}
                layoutId={`project-image-${project.id}`}
              >
                <OptimizedImage 
                  src={project.image} 
                  alt={project.title}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover opacity-90"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                    {project.category}
                  </span>
                  <span className="text-white/80 font-mono text-sm">{project.year}</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                  className="text-5xl md:text-[8vw] font-black text-white tracking-tighter leading-[0.85] mix-blend-overlay opacity-90"
                >
                  {project.title}
                </motion.h2>
              </div>
            </div>

            <div className="p-8 md:p-16 relative z-20 bg-inherit">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-12 h-fit">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4" style={{ color: project.textColor }}>Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 border border-black/10 rounded-full text-xs font-bold opacity-60" style={{ color: project.textColor }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4" style={{ color: project.textColor }}>Impact</h3>
                    <div className="space-y-4">
                      {project.results.map((res, i) => (
                        <div key={i} className="flex items-baseline justify-between border-b border-black/10 pb-3">
                          <span className="text-4xl font-black text-[#C9A56B]">{res.value}</span>
                          <span className="text-xs font-bold uppercase tracking-wide opacity-60" style={{ color: project.textColor }}>{res.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    href={project.link}
                    className="inline-flex items-center justify-center w-full bg-[#1A1D29] text-white px-8 py-6 rounded-xl group hover:bg-[#C9A56B] transition-colors duration-300 shadow-xl"
                  >
                    <span className="text-lg font-bold tracking-wide mr-4">Visiter le site</span>
                    <Globe className="w-5 h-5" />
                  </motion.a>
                </div>

                <div className="lg:col-span-8 space-y-24">
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-4xl font-bold mb-8" style={{ color: project.textColor }}>Le Projet</h3>
                    <p className="text-2xl leading-relaxed font-medium opacity-80" style={{ color: project.textColor }}>
                      {project.longDescription}
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="bg-white/50 p-10 rounded-3xl border border-black/5"
                    >
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
                        <Layers className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold mb-4" style={{ color: project.textColor }}>Le Défi</h4>
                      <p className="text-base leading-relaxed opacity-70" style={{ color: project.textColor }}>
                        {project.challenge}
                      </p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/50 p-10 rounded-3xl border border-black/5"
                    >
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                        <Smartphone className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold mb-4" style={{ color: project.textColor }}>La Solution</h4>
                      <p className="text-base leading-relaxed opacity-70" style={{ color: project.textColor }}>
                        {project.solution}
                      </p>
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold mb-12" style={{ color: project.textColor }}>Galerie</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {project.gallery.map((img, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className={`rounded-2xl overflow-hidden shadow-lg ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[4/3]'}`}
                        >
                          <OptimizedImage src={img} alt="Gallery" width={800} height={600} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    onClick={handleNextProject}
                    className="border-t border-black/10 pt-16 mt-16 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold uppercase tracking-widest opacity-40 block mb-4" style={{ color: project.textColor }}>
                          Projet Suivant
                        </span>
                        <span className="text-5xl md:text-7xl font-black group-hover:text-[#C9A56B] transition-colors tracking-tighter" style={{ color: project.textColor }}>
                          Découvrir la suite
                        </span>
                      </div>
                      <div className="w-24 h-24 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-[#C9A56B] group-hover:text-white transition-all duration-500 group-hover:scale-110">
                        <ArrowRight className="w-10 h-10" />
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
};
