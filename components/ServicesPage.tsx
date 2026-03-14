import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Zap, Layers, BarChart3, Plus, Minus } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FluidButton } from './FluidButton';
import { OptimizedImage } from './OptimizedImage';

export interface ServicesPageProps {
  hero: {
    badge: string;
    headline: string;
    subtitle: string;
    image: string;
  };
  features: {
    headline: string;
    items: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  process: {
    headline: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  deliverables: {
    headline: string;
    items: string[];
    image: string;
  };
  faq: {
    question: string;
    answer: string;
  }[];
}

const iconMap = {
  zap: Zap,
  layers: Layers,
  chart: BarChart3,
};

export const ServicesPage = ({ data }: { data: ServicesPageProps }) => {
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
            <motion.div variants={fadeUp} className="flex items-center gap-6">
              <FluidButton className="px-8 py-4 rounded-full bg-[#1A1D29] text-white font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                DEMANDER UN DEVIS <ArrowRight className="w-4 h-4" />
              </FluidButton>
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[500px] rounded-3xl overflow-hidden bg-gray-100 border border-black/5"
          >
            <OptimizedImage src={data.hero.image} alt="Hero" className="w-full h-full object-cover" />
          </motion.div>
        </section>

        {/* Features */}
        <section className="bg-[#1A1D29] text-white py-32 mb-32">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase text-center mb-20 max-w-4xl mx-auto"
            >
              {data.features.headline}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8">
              {data.features.items.map((feature, i) => {
                const Icon = iconMap[feature.icon as keyof typeof iconMap] || iconMap.zap;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center mb-6 text-[#1A1D29]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="container mx-auto px-6 lg:px-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase">
              {data.process.headline}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {data.process.steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 mb-12 last:mb-0 relative"
              >
                {i !== data.process.steps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-[-3rem] w-px bg-gray-200" />
                )}
                <div className="w-12 h-12 shrink-0 bg-[#EAE8FF] text-[#1A1D29] rounded-full flex items-center justify-center font-black text-xl z-10">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="bg-[#F4F4F5] py-32 mb-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-black leading-[0.9] tracking-tighter uppercase mb-10">
                  {data.deliverables.headline}
                </h2>
                <div className="space-y-6">
                  {data.deliverables.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-sand shrink-0 mt-1" />
                      <p className="text-lg font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <OptimizedImage src={data.deliverables.image} alt="Deliverables" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-6 lg:px-12 mb-32 max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase text-center mb-16"
          >
            QUESTIONS FRÉQUENTES
          </motion.h2>
          <div className="space-y-4">
            {data.faq.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
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
              PRÊT À DÉMARRER ?
            </div>
            <h2 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase max-w-4xl mx-auto mb-12">
              DISCUTONS DE VOTRE PROJET
            </h2>
            <FluidButton className="px-10 py-5 rounded-full bg-[#1A1D29] text-white font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform text-lg">
              PRENDRE RENDEZ-VOUS <ArrowRight className="w-5 h-5" />
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
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <h3 className="text-lg font-bold pr-8">{question}</h3>
        <div className="shrink-0 w-8 h-8 rounded-full bg-[#FDFCF8] border border-black/5 flex items-center justify-center text-[#1A1D29]">
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
            <div className="px-6 pb-6 text-gray-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
