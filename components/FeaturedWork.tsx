import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects, Project } from '../data/projects';
import { useNavigate } from 'react-router-dom';
import { OptimizedImage } from './OptimizedImage';

const categories = ["Tous", "Hospitality", "Corporate", "Paysagiste", "Design"];

export const FeaturedWork = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(p => 
    activeCategory === "Tous" ? true : p.category === activeCategory
  );

  return (
    <section className="py-24 md:py-32 bg-paper text-anthracite relative" id="portfolio" ref={containerRef}>
      <div className="container max-w-[1400px] mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-sm tracking-[0.2em] uppercase mb-4 block font-bold text-petrol"
          >
            Projets Sélectionnés
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            IMPACT<br/>DIGITAL
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Sidebar Filters (Sticky) */}
          <div className="lg:w-1/4">
            <div className="sticky top-32 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left text-lg md:text-xl font-medium transition-all duration-300 whitespace-nowrap px-4 py-2 lg:p-0 rounded-full lg:rounded-none ${
                    activeCategory === category 
                      ? 'text-petrol lg:translate-x-4 bg-petrol/10 lg:bg-transparent' 
                      : 'text-anthracite/50 hover:text-anthracite hover:translate-x-2'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Projects Grid (Asymmetrical) */}
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {filteredProjects.map((project, index) => {
              // Asymmetrical layout logic: every 3rd item spans full width
              const isLarge = index % 3 === 0;
              
              return (
                <motion.div
                  key={project.id}
                  layoutId={`project-${project.id}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group cursor-pointer flex flex-col ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
                  onClick={() => navigate(`/projet/${project.id}`)}
                >
                  {/* Image Container */}
                  <div className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-cream mb-6 ${isLarge ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[4/5] md:aspect-square'}`}>
                    <OptimizedImage 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-anthracite/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0">
                      <div className="w-16 h-16 rounded-full bg-white text-anthracite flex items-center justify-center shadow-2xl">
                        <ArrowUpRight className="w-8 h-8" />
                      </div>
                    </div>

                    {/* Tags (Visible on hover) */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-white/95 text-anthracite text-xs font-bold px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 group-hover:text-petrol transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-anthracite/60 font-medium">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-mono font-bold text-anthracite/40 uppercase tracking-widest shrink-0">
                      <span>{project.category}</span>
                      <span>—</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
