import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, ArrowRight, Star, Sparkles, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

export const GenericPage = ({ title, subtitle, image }: { title: string, subtitle: string, image: string }) => {
  const navigate = useNavigate();
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollContainer });
  
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full bg-[#FDFCF8] text-anthracite"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sand/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[60]">
        <button 
          onClick={() => navigate('/')}
          className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center text-anthracite hover:bg-anthracite hover:text-white transition-all duration-300 border border-black/10 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full relative z-10">
        <div className="w-full min-h-full flex flex-col pt-32 pb-20 px-6 md:px-12">
          <div className="container mx-auto max-w-6xl relative">
            
            {/* Doodles & Stickers */}
            <motion.div 
              initial={{ opacity: 0, rotate: -20, scale: 0 }}
              animate={{ opacity: 1, rotate: -10, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-10 -left-10 md:-left-20 bg-amber-400 text-anthracite font-bold py-2 px-4 rounded-2xl shadow-xl border-2 border-anthracite z-20 transform -rotate-12 hidden md:block"
            >
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Sur-mesure</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotate: 20, scale: 0 }}
              animate={{ opacity: 1, rotate: 15, scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="absolute top-20 -right-5 md:-right-10 bg-white text-anthracite font-bold py-2 px-4 rounded-full shadow-xl border-2 border-anthracite z-20 transform rotate-12 hidden md:block"
            >
              <span className="flex items-center gap-2"><Star className="w-4 h-4 text-sand" /> Local</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16 md:mb-24 max-w-4xl relative z-10"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-anthracite tracking-tighter mb-8 leading-[0.9]">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-medium">
                {subtitle}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden relative shadow-2xl border border-black/5"
            >
              <motion.div style={{ y: heroY }} className="w-full h-[120%] -mt-[10%]">
                <OptimizedImage 
                  src={image} 
                  alt={title} 
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-24 grid md:grid-cols-2 gap-16 items-center"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-anthracite mb-6">Prêt à développer votre activité locale ?</h2>
                <p className="text-lg text-gray-600 mb-8">Nous accompagnons les artisans, commerçants et PME dans leur développement digital. Une approche concrète, sans jargon, orientée vers vos résultats locaux.</p>
                <button onClick={() => navigate('/')} className="inline-flex items-center gap-2 bg-anthracite text-white px-8 py-4 rounded-full font-bold hover:bg-sand transition-colors group">
                  Démarrer un projet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="bg-white p-12 rounded-[2rem] border border-black/5 shadow-xl relative">
                 {/* Doodles & Stickers */}
                 <motion.div 
                   initial={{ opacity: 0, rotate: 15, scale: 0 }}
                   whileInView={{ opacity: 1, rotate: 5, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.5, type: "spring" }}
                   className="absolute -bottom-10 right-10 bg-emerald-400 text-anthracite font-bold py-1.5 px-3 rounded-xl shadow-lg border-2 border-anthracite z-20 transform rotate-12 hidden md:block"
                 >
                   <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4" /> Approuvé</span>
                 </motion.div>

                 <div className="absolute -top-6 -right-6 w-12 h-12 bg-sand rounded-full flex items-center justify-center text-white shadow-lg">
                    <Zap className="w-6 h-6" />
                 </div>
                <blockquote className="text-2xl font-medium text-anthracite italic mb-8">
                  "Un site web qui nous ressemble enfin, et surtout, des clients qui nous trouvent facilement dans notre ville. Un investissement rentabilisé très rapidement."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <OptimizedImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&fm=webp" alt="Artisan" width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-anthracite">Marc D.</div>
                    <div className="text-sm text-gray-500">Artisan Menuisier</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
