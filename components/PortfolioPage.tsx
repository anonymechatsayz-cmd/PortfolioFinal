import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { OptimizedImage } from './OptimizedImage';

// Custom SVGs for decorations matching the screenshot
const StarSolid = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z" />
  </svg>
);

const StarOutline = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 5 C50 35 65 50 95 50 C65 50 50 65 50 95 C50 65 35 50 5 50 C35 50 50 35 50 5 Z" />
  </svg>
);

export const PortfolioPage = () => {
  const navigate = useNavigate();
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('TOUS');

  const categories = ['TOUS', ...Array.from(new Set(projects.map(p => p.category.toUpperCase())))];

  const filteredProjects = activeFilter === 'TOUS' 
    ? projects 
    : projects.filter(p => p.category.toUpperCase() === activeFilter);

  useEffect(() => {
    document.title = 'Réalisations | Clément Franjou';
    
    // Scroll to top on mount since it's a new page now
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full bg-[#FAFAFA] text-[#1A1A1A]"
    >
      <Navbar />

      <div className="w-full relative z-10">
        
        {/* Header Section */}
        <div className="relative bg-[#F4F3EE] pt-40 pb-32 md:pb-48 px-6 overflow-hidden">
          {/* Breadcrumbs */}
          <div className="container max-w-[1400px] mx-auto relative z-20 mb-8 md:mb-12">
            <div className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Accueil</Link>
              <span>&gt;</span>
              <span className="text-[#1A1A1A]">Réalisations</span>
            </div>
          </div>

          {/* Decorative Stars */}
          <StarSolid className="absolute top-24 left-[10%] md:left-[20%] w-8 h-8 md:w-12 md:h-12 text-[#1A1A1A] transform -rotate-12" />
          <StarOutline className="absolute top-32 right-[10%] md:right-[20%] w-10 h-10 md:w-16 md:h-16 text-[#1A1A1A] transform rotate-12" />
          
          <div className="container max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-block mb-6">
              <span className="font-mono text-xs md:text-sm font-bold tracking-widest uppercase text-[#1A1A1A]">
                + 50 clients accompagnés avec ❤️
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter text-[#1A1A1A] leading-[0.9] mb-8">
              Nos Réalisations
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed">
              Chacune des réalisations du studio est une histoire unique où innovation et créativité se rencontrent pour atteindre vos objectifs business
            </p>
          </div>

          {/* Wavy Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none transform translate-y-[1px]">
            <svg viewBox="0 0 1440 100" className="w-full h-[40px] md:h-[80px]" preserveAspectRatio="none">
              <path d="M0,100 C480,0 960,0 1440,100 Z" fill="#FAFAFA" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <main className="w-full bg-[#FAFAFA] pb-24">
          <div className="container max-w-[1400px] mx-auto px-6 pt-12 md:pt-20 flex flex-col lg:flex-row gap-12 md:gap-20">
            
            {/* Sidebar Filters */}
            <div className="w-full lg:w-56 shrink-0">
              <div className="sticky top-12">
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 text-[#1A1A1A]">
                  FILTRES :
                </h3>
                <div className="flex flex-row lg:flex-col flex-wrap gap-3">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider text-left transition-all duration-300 w-fit ${
                        activeFilter === category 
                          ? 'bg-[#1A1A1A] text-white shadow-md' 
                          : 'bg-[#F0F0F0] text-[#1A1A1A] hover:bg-[#E5E5E5]'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="flex-1">
              <div className="flex justify-end mb-8">
                <p className="text-sm font-medium text-gray-500">
                  <span className="font-bold text-[#1A1A1A]">{filteredProjects.length}</span> réalisation(s) sur <span className="font-bold text-[#1A1A1A]">{projects.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
                  >
                    <Link to={`/projet/${project.id}`} className="block group cursor-pointer">
                      {/* Image Container (Framed look) */}
                      <div className="bg-white p-2 md:p-3 rounded-[1.5rem] md:rounded-[2rem] border border-gray-200 shadow-sm mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md">
                        <motion.div 
                          layoutId={`project-image-${project.id}`}
                          className="w-full aspect-[4/3] rounded-[1rem] md:rounded-[1.5rem] overflow-hidden bg-gray-100 relative"
                        >
                          <OptimizedImage 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover object-top"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                      </div>

                      {/* Project Info */}
                      <div>
                        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 text-[#1A1A1A] group-hover:text-amber-600 transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="px-4 py-1.5 bg-[#F0F0F0] rounded-full text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                            {project.category}
                          </span>
                          <span className="text-sm font-medium text-gray-500">
                            {project.id}.com
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </motion.div>
  );
};
