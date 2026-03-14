import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = React.memo(({ question, answer, index }: { question: string, answer: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `faq-content-${index}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`border-b border-anthracite/10 last:border-0 overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-white/50' : 'hover:bg-white/30'}`}
    >
      <button 
        className="w-full py-6 md:py-8 px-4 md:px-8 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 pr-8 ${isOpen ? 'text-anthracite' : 'text-anthracite group-hover:text-anthracite/80'}`}>
          {question}
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-anthracite text-white rotate-180 shadow-md' : 'bg-white border border-gray-200 text-anthracite group-hover:border-anthracite/50'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div 
            id={contentId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 md:px-8 pb-8 text-gray-600 text-base md:text-lg leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export const FAQ = () => {
  const faqs = [
    {
      question: "Pourquoi vos prix sont-ils si accessibles ?",
      answer: "Je suis freelance, je n'ai pas les coûts de structure d'une agence (locaux, commerciaux, RH). De plus, j'ai optimisé mon process de création pour être ultra-efficace. Vous payez pour la qualité du site, pas pour mes frais fixes."
    },
    {
      question: "7 jours, ce n'est pas trop rapide pour être qualitatif ?",
      answer: "Au contraire. La plupart des projets traînent à cause des allers-retours inutiles. Mon process est carré : on valide tout au début, je fonce, on livre. J'utilise des technologies modernes (Webflow, Figma) qui me permettent de concevoir et développer vite et bien."
    },
    {
      question: "Est-ce que le site va vraiment m'apporter des clients ?",
      answer: "Un site ne fait pas de magie, mais c'est un outil puissant. Je construis votre site avec un seul but : la conversion. Structure claire, appels à l'action visibles, réassurance. Si vous avez du trafic, ce site le transformera en contacts."
    },
    {
      question: "Que se passe-t-il après la livraison ?",
      answer: "Vous êtes propriétaire de votre site à 100%. Je vous forme pour modifier les textes et images vous-même. Si vous avez un souci technique, le support est inclus pendant 30 jours. Ensuite, je reste disponible si besoin."
    },
    {
      question: "Travaillez-vous avec des clients hors Île-de-France ?",
      answer: "Oui, absolument ! Tout peut se faire à distance (visio, téléphone). J'ai l'habitude de travailler avec des clients de toute la France et même à l'international."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sand/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">FAQ</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-anthracite mb-6 tracking-tight leading-[1.1]">
                Questions <br className="hidden lg:block" />
                <span className="italic font-light text-sand">Fréquentes.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-10 max-w-md">
                Tout ce que vous devez savoir avant de démarrer notre collaboration. Une question spécifique ? N'hésitez pas à me contacter.
              </p>
              
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 bg-white border border-gray-200 px-8 py-4 rounded-full font-bold text-anthracite hover:border-sand hover:text-sand transition-all duration-300 shadow-sm hover:shadow-md group"
              >
                <MessageCircle className="w-5 h-5" />
                Poser une question
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7">
            <div className="bg-white/90 rounded-[2rem] border border-white p-2 shadow-xl shadow-anthracite/5">
              <div className="bg-white rounded-[1.5rem] overflow-hidden">
                {faqs.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    index={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
