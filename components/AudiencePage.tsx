import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, Plus, Minus } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FluidButton } from './FluidButton';
import { OptimizedImage } from './OptimizedImage';

export interface AudiencePageProps {
  hero: {
    badge: string;
    headline: string;
    subtitle: string;
    image: string;
  };
  valueProp: {
    badge: string;
    headline: string;
    subtitle: string;
  };
  checklist: {
    headline: string;
    items: string[];
  };
  leadMachine: {
    headline: string;
    stat: string;
    statLabel: string;
    quote: string;
    author: string;
    role: string;
    image: string;
  };
  testimonials: {
    quote: string;
    author: string;
    role: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export const AudiencePage = ({ data }: { data: AudiencePageProps }) => {
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
                LET'S TALK <ArrowRight className="w-4 h-4" />
              </FluidButton>
              <div className="flex items-center gap-2 text-sm font-bold">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span>5/5 - 47 avis</span>
              </div>
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

        {/* Logo Ticker (Placeholder) */}
        <section className="py-10 border-y border-black/5 overflow-hidden flex whitespace-nowrap bg-white mb-32">
          <div className="flex gap-16 animate-marquee items-center opacity-50 font-bold text-xl uppercase tracking-widest">
            <span>Finary</span>
            <span>Lemlist</span>
            <span>TeamOut</span>
            <span>Side</span>
            <span>AllianceBlock</span>
            <span>Finary</span>
            <span>Lemlist</span>
            <span>TeamOut</span>
            <span>Side</span>
            <span>AllianceBlock</span>
          </div>
        </section>

        {/* Value Prop */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="container mx-auto px-6 lg:px-12 text-center max-w-4xl mb-32"
        >
          <motion.div variants={fadeUp} className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 font-mono">
            {data.valueProp.badge}
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-6">
            {data.valueProp.headline}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-gray-600">
            {data.valueProp.subtitle}
          </motion.p>
        </motion.section>

        {/* Checklist */}
        <section className="container mx-auto px-6 lg:px-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-[3rem] p-12 lg:p-20 border border-black/5 shadow-xl max-w-5xl mx-auto"
          >
            <h2 className="text-4xl lg:text-5xl font-black leading-[0.9] tracking-tighter uppercase mb-12 max-w-xl">
              {data.checklist.headline}
            </h2>
            <div className="space-y-6 mb-12">
              {data.checklist.items.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <p className="text-lg font-medium">{item}</p>
                </motion.div>
              ))}
            </div>
            <FluidButton className="px-8 py-4 rounded-full border-2 border-[#1A1D29] text-[#1A1D29] font-bold flex items-center gap-2 hover:bg-[#1A1D29] hover:text-white transition-colors">
              LET'S TALK <ArrowRight className="w-4 h-4" />
            </FluidButton>
          </motion.div>
        </section>

        {/* Lead Machine */}
        <section className="bg-[#EAE8FF] py-32 mb-32 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase text-center mb-20 max-w-4xl mx-auto"
            >
              {data.leadMachine.headline}
            </motion.h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#FDFCF8] rounded-3xl p-10 shadow-xl"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-[#EAE8FF] text-[#1A1D29] font-black text-3xl px-4 py-2 rounded-xl">
                    {data.leadMachine.stat}
                  </div>
                  <div className="font-bold text-sm uppercase tracking-wider">
                    {data.leadMachine.statLabel}
                  </div>
                </div>
                <p className="text-xl font-medium italic mb-8 leading-relaxed">
                  "{data.leadMachine.quote}"
                </p>
                <div>
                  <div className="font-bold">{data.leadMachine.author}</div>
                  <div className="text-sm text-gray-500">{data.leadMachine.role}</div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[600px] rounded-3xl overflow-hidden bg-white border border-black/5 shadow-2xl"
              >
                <OptimizedImage src={data.leadMachine.image} alt="Lead Machine" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="container mx-auto px-6 lg:px-12 mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl font-black leading-[0.9] tracking-tighter uppercase mb-6">
              WHAT OUR CUSTOMERS SAY
            </h2>
            <div className="flex items-center justify-center gap-2 text-sm font-bold">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span>5/5 - 24 reviews</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.testimonials.map((test, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">"{test.quote}"</p>
                <div>
                  <div className="font-bold text-sm">{test.author}</div>
                  <div className="text-xs text-gray-400">{test.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-6 lg:px-12 mb-32">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase sticky top-32">
                QUESTIONS FRÉQUENTES
              </h2>
            </div>
            <div className="space-y-4">
              {data.faq.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
              ))}
            </div>
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
              LET'S F*CKING GO!!!
            </div>
            <h2 className="text-5xl lg:text-7xl font-black leading-[0.9] tracking-tighter uppercase max-w-4xl mx-auto mb-12">
              READY TO SKY ROCKET YOUR BUSINESS?
            </h2>
            <FluidButton className="px-10 py-5 rounded-full bg-[#1A1D29] text-white font-bold inline-flex items-center gap-2 hover:scale-105 transition-transform text-lg">
              LET'S TALK <ArrowRight className="w-5 h-5" />
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
