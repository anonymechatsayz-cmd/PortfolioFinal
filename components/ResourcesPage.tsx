import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, HelpCircle, Plus, Minus } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FluidButton } from './FluidButton';
import { OptimizedImage } from './OptimizedImage';

export interface ResourcesPageProps {
  hero: {
    badge: string;
    headline: string;
    subtitle: string;
    image: string;
  };
  content: {
    type: 'blog' | 'faq';
    items: any[];
  };
}

export const ResourcesPage = ({ data }: { data: ResourcesPageProps }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1D29] font-sans selection:bg-sand selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sand mb-6">
              {data.hero.badge}
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-6">
              {data.hero.headline}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 mb-8 max-w-lg">
              {data.hero.subtitle}
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100 border border-black/5"
          >
            <OptimizedImage src={data.hero.image} alt="Hero" className="w-full h-full object-cover" />
          </motion.div>
        </section>

        {/* Dynamic Content Section */}
        <section className="container mx-auto px-6 lg:px-12 mb-32">
          {data.content.type === 'blog' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.content.items.map((post, i) => (
                <motion.article 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs text-gray-400 mb-3">{post.date}</div>
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm font-bold text-sand group-hover:text-[#1A1D29] transition-colors">
                      LIRE L'ARTICLE <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          {data.content.type === 'faq' && (
            <div className="max-w-3xl mx-auto space-y-4">
              {data.content.items.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#EAE8FF] py-32 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-6"
          >
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 font-mono">
              UNE QUESTION SPÉCIFIQUE ?
            </div>
            <h2 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase max-w-4xl mx-auto mb-12">
              NOUS SOMMES LÀ POUR VOUS RÉPONDRE
            </h2>
            <FluidButton className="px-10 py-5 rounded-full bg-[#1A1D29] text-white font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform text-lg">
              CONTACTEZ-NOUS <ArrowRight className="w-5 h-5" />
            </FluidButton>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start gap-4 p-8 text-left focus:outline-none hover:bg-gray-50 transition-colors"
      >
        <HelpCircle className="w-6 h-6 text-sand shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-bold pr-8">{question}</h3>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full bg-[#FDFCF8] border border-black/5 flex items-center justify-center text-[#1A1D29] mt-1">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-8 pl-18 text-gray-600 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
