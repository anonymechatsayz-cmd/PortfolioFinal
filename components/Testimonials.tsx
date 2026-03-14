import React, { useState, useRef, useEffect } from 'react';
import { Quote, Star, BadgeCheck, TrendingUp, Zap, Users, Clock } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

const metrics = [
  {
    value: "+150%",
    label: "DE DEMANDES\nDE DEVIS",
  },
  {
    value: "< 1s",
    label: "TEMPS DE\nCHARGEMENT",
  },
  {
    value: "1ère",
    label: "PAGE SUR\nGOOGLE",
  },
  {
    value: "7j",
    label: "POUR LE\nLANCEMENT",
  }
];

const testimonials = [
  {
    quote: "J'avais zéro visibilité avant. En un mois avec le nouveau site, j'ai signé 12 devis. Clément est pro, rapide et toujours dispo.",
    author: "Marc L.",
    role: "Gérant, L.C. Élagage",
    image: "https://i.pravatar.cc/150?u=marc"
  },
  {
    quote: "Un site magnifique qui reflète parfaitement l'ambiance de notre restaurant. Le système de réservation est simple et efficace.",
    author: "Sophie D.",
    role: "Propriétaire, Bistrot Le Marais",
    image: "https://i.pravatar.cc/150?u=sophie"
  },
  {
    quote: "Le retour sur investissement a été immédiat. Mes clients me trouvent enfin sur Google Maps. Merci pour ce travail de qualité.",
    author: "Thomas B.",
    role: "Architecte d'intérieur",
    image: "https://i.pravatar.cc/150?u=thomas"
  },
  {
    quote: "Enfin un développeur qui parle français et pas 'code'. Tout est clair, le site est rapide, et je peux le modifier moi-même.",
    author: "Julie M.",
    role: "Consultante Marketing",
    image: "https://i.pravatar.cc/150?u=julie"
  },
  {
    quote: "Service impeccable. Le site a été livré en avance et le résultat dépasse mes attentes. Je recommande vivement.",
    author: "Pierre A.",
    role: "Artisan Plombier",
    image: "https://i.pravatar.cc/150?u=pierre"
  },
  {
    quote: "Une refonte nécessaire qui a boosté notre image de marque. Les retours de nos patients sont excellents.",
    author: "Dr. Rousseau",
    role: "Chirurgien Dentiste",
    image: "https://i.pravatar.cc/150?u=rousseau"
  }
];

const MetricCard = React.memo(({ metric, index }: { metric: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col items-start px-4 md:px-8 ${index !== metrics.length - 1 ? 'md:border-r border-white/10' : ''} ${index % 2 === 0 ? 'border-r border-white/10 md:border-r' : ''}`}
    >
      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
        {metric.value}
      </h3>
      <div className="text-xs md:text-sm font-bold text-white/60 uppercase tracking-wider whitespace-pre-line leading-relaxed">
        {metric.label}
      </div>
    </motion.div>
  );
});

const TestimonialCard: React.FC<{ quote: string, author: string, role: string, image: string, className?: string }> = React.memo(({ quote, author, role, image, className = "" }) => {
  return (
    <motion.div 
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        boxShadow: "0 20px 40px -5px rgba(212, 165, 116, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 hover:border-sand/40 relative flex flex-col justify-between cursor-default transition-colors duration-300 ${className}`}
    >
      <div className="absolute top-6 right-6 text-sand/10">
        <Quote size={60} className="rotate-180" />
      </div>
      <div className="relative z-10">
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-base md:text-lg text-anthracite font-medium leading-relaxed mb-8">
          "{quote}"
        </p>
        <div className="flex items-center gap-4 mt-auto">
          <OptimizedImage 
            src={image} 
            alt={author} 
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border-2 border-sand/20"
          />
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="font-bold text-anthracite">{author}</div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                <BadgeCheck className="w-3 h-3" />
                <span>Vérifié</span>
              </div>
            </div>
            <div className="text-anthracite/50 text-sm font-medium">{role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.children[0].clientWidth + 16; // 16px is gap-4
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < testimonials.length) {
        setCurrentIndex(newIndex);
      }
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const itemWidth = scrollRef.current.children[0].clientWidth + 16;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <>
      {/* SECTION 1: Metrics / Impact */}
      <section id="impact" className="py-24 md:py-32 bg-anthracite overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-sand font-mono font-bold tracking-[0.3em] uppercase text-xs mb-6 block">04 / LE R.O.I</span>
            <h2 className="text-5xl md:text-7xl font-black font-display text-white leading-[1.1] tracking-tighter mb-6">
              Votre site doit vous rapporter <br className="hidden md:block" />plus qu'il ne vous <span className="text-sand italic font-serif font-light tracking-normal lowercase">coûte.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              Fini les sites vitrines invisibles. Je conçois des machines à conversion ultra-rapides, pensées pour dominer votre marché local et générer des appels tous les jours.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="flex flex-wrap justify-center items-start gap-y-8 md:gap-y-0 max-w-4xl mx-auto">
            {metrics.map((metric, index) => (
              <div key={index} className="w-1/2 md:w-1/4">
                <MetricCard metric={metric} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Testimonials Carousel */}
      <section id="testimonials" className="py-24 md:py-32 bg-paper overflow-hidden">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black font-display text-anthracite leading-[1.1] tracking-tighter">
              Ils m'ont fait <span className="text-sand italic font-serif font-light tracking-normal lowercase">confiance.</span>
            </h2>
          </div>
        </div>

        {/* Desktop View - Marquee */}
        <div className="hidden md:flex relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex animate-scroll pause-on-hover">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="mx-4 w-[450px] flex-shrink-0 h-full">
                <TestimonialCard 
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  image={testimonial.image}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Swipe Carousel */}
        <div className="md:hidden w-full">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-6 gap-4 scroll-pl-6 [&::-webkit-scrollbar]:hidden touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="w-[85vw] flex-shrink-0 snap-start"
              >
                <TestimonialCard 
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  image={testimonial.image}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-sand w-8' : 'bg-anthracite/10 w-2'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
