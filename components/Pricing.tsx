import React, { useRef } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const PricingCard = ({ title, price, features, description, isPopular }: { title: string, price: number, features: string[], description: string, isPopular?: boolean }) => {
  const controls = useAnimation();

  return (
    <motion.div 
      whileHover="hover"
      onHoverStart={() => {
        if (isPopular) {
          controls.start({
            x: "200%",
            transition: { duration: 1.5, ease: "easeInOut" }
          }).then(() => {
             controls.set({ x: "-100%" });
          });
        }
      }}
      initial="rest"
      animate="rest"
      variants={{
        rest: { 
          scale: isPopular ? 1.05 : 1,
          y: 0,
          boxShadow: isPopular ? "0 10px 30px -10px rgba(0,0,0,0.3)" : "0 4px 6px -1px rgba(0,0,0,0.05)",
          borderColor: isPopular ? "rgba(212, 165, 116, 0.3)" : "rgba(243, 244, 246, 1)"
        },
        hover: { 
          scale: isPopular ? 1.08 : 1.03, 
          y: -12,
          boxShadow: isPopular 
            ? "0 30px 60px -12px rgba(0,0,0,0.4)" 
            : "0 20px 25px -5px rgb(0 0 0 / 0.1)",
          borderColor: isPopular ? "rgba(212, 165, 116, 0.8)" : "rgba(229, 231, 235, 1)"
        }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex flex-col rounded-[2.5rem] border transition-colors duration-300 h-full relative cursor-default ${
      isPopular 
        ? 'z-10 bg-[#353740]' 
        : 'bg-white border-gray-100'
    }`}
    >
      {/* Background & Shine Container (Clipped) */}
      <div className={`absolute inset-0 rounded-[2.5rem] overflow-hidden z-0`}>
         {isPopular && (
           <motion.div
             className="absolute inset-0 w-full h-full"
             initial={{ x: "-100%" }}
             animate={controls}
           >
             <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12" />
           </motion.div>
         )}
      </div>

      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sand text-white px-8 py-2 rounded-full text-sm font-bold uppercase tracking-widest shadow-xl shadow-sand/40 z-20">
          Populaire
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
        <h3 className={`text-2xl font-bold mb-2 ${isPopular ? 'text-white' : 'text-anthracite'}`}>{title}</h3>
        <p className={`text-sm mb-8 min-h-[40px] ${isPopular ? 'text-gray-300' : 'text-gray-500'}`}>{description}</p>
        
        <div className="flex items-baseline gap-1 mb-8">
          <span className={`text-5xl font-bold tracking-tight ${isPopular ? 'text-white' : 'text-anthracite'}`}>{price}€</span>
          <span className={`font-medium ${isPopular ? 'text-gray-400' : 'text-gray-400'}`}>HT</span>
        </div>
        
        <div className="flex-grow">
          <ul className="space-y-4 mb-10">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-sand' : 'text-petrol'}`} />
                <span className={`text-sm font-medium ${isPopular ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <a 
          href="#contact" 
          className={`w-full py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all duration-300 group shadow-lg ${
            isPopular 
              ? 'bg-white text-anthracite hover:scale-[1.02] shadow-black/20' 
              : 'bg-[#5D7285] text-white hover:scale-[1.02] shadow-gray-200'
          }`}
        >
          Réserver un appel
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export const Pricing = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sand/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20 relative"
        >
          <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">Tarifs</span>
          <h2 className="text-4xl md:text-6xl font-black font-serif text-anthracite mb-6 tracking-tight">
            Un investissement <br className="hidden md:block" />
            <span className="italic font-light text-sand">transparent.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Des offres claires, sans coûts cachés. Choisissez la formule adaptée à vos ambitions.
          </p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch"
        >
          <motion.div variants={cardVariants} className="h-full">
            <PricingCard 
              title="Essentiel"
              price={490}
              description="Pour démarrer votre présence en ligne avec une vitrine professionnelle."
              features={[
                "Site One-Page (Vitrine)",
                "Design responsive mobile",
                "Formulaire de contact",
                "Hébergement offert 1 an",
                "Livraison 7 jours"
              ]}
            />
          </motion.div>
          
          <motion.div variants={cardVariants} className="h-full">
            <PricingCard 
              title="Professionnel"
              price={790}
              isPopular={true}
              description="L'offre la plus complète pour les PME qui veulent générer des leads."
              features={[
                "Tout du pack Essentiel",
                "Optimisation SEO avancée",
                "Google My Business setup",
                "Analytics & Reporting",
                "Support prioritaire 30j",
                "Formation administration"
              ]}
            />
          </motion.div>
          
          <motion.div variants={cardVariants} className="h-full">
            <PricingCard 
              title="Premium"
              price={1290}
              description="Pour aller plus loin avec des fonctionnalités avancées et sur-mesure."
              features={[
                "Site Multi-pages (jusqu'à 5)",
                "Blog / Actualités",
                "Système de réservation",
                "SEO Local +++",
                "Maintenance 3 mois offerte",
                "Audit concurrentiel"
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
