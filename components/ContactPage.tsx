import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const ContactPage = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate form submission
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-anthracite selection:bg-sand selection:text-anthracite flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Info */}
            <motion.div 
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Discutons de votre projet
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase mb-8">
                Prêt à <span className="text-transparent bg-clip-text bg-gradient-to-r from-sand to-amber-600">accélérer</span> ?
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-xl text-gray-600 mb-12 leading-relaxed">
                Que vous ayez une idée précise ou besoin d'être guidé, nous sommes là pour transformer votre vision en réalité digitale performante.
              </motion.p>
              
              <motion.div variants={stagger} className="space-y-8">
                <motion.div variants={fadeUp} className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-black/5 shadow-sm shrink-0">
                    <Mail className="w-6 h-6 text-sand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Email</h3>
                    <a href="mailto:clement.franjou@gmail.com" className="text-gray-600 hover:text-sand transition-colors text-lg">
                      clement.franjou@gmail.com
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeUp} className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-black/5 shadow-sm shrink-0">
                    <Phone className="w-6 h-6 text-sand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Téléphone</h3>
                    <a href="tel:+33123456789" className="text-gray-600 hover:text-sand transition-colors text-lg">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeUp} className="flex items-start gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-black/5 shadow-sm shrink-0">
                    <MapPin className="w-6 h-6 text-sand" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Localisation</h3>
                    <p className="text-gray-600 text-lg">
                      Paris, France<br />
                      <span className="text-sm text-gray-500">Disponible partout en France et à l'international</span>
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            
            {/* Right Column: Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-black/5 shadow-xl relative overflow-hidden"
            >
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 h-full min-h-[400px]"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Message envoyé !</h3>
                  <p className="text-gray-600 text-lg mb-8 max-w-sm">
                    Merci pour votre message. Nous vous recontacterons dans les plus brefs délais (généralement sous 24h).
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="text-sand font-bold hover:text-anthracite transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-bold text-gray-700">Prénom</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-all"
                        placeholder="Jean"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-bold text-gray-700">Nom</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-all"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">Email professionnel</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-5 py-4 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-all"
                      placeholder="jean@entreprise.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-gray-700">Sujet</label>
                    <select 
                      id="subject" 
                      className="w-full px-5 py-4 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-all appearance-none"
                    >
                      <option value="website">Création de site web</option>
                      <option value="redesign">Refonte de site</option>
                      <option value="seo">SEO Local</option>
                      <option value="other">Autre demande</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-gray-700">Message</label>
                    <textarea 
                      id="message" 
                      required
                      rows={4}
                      className="w-full px-5 py-4 bg-gray-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-all resize-none"
                      placeholder="Parlez-nous de votre projet, de vos objectifs..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="w-full bg-anthracite text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-sand transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </span>
                    ) : (
                      <>
                        Envoyer le message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                  
                  <p className="text-xs text-center text-gray-500 mt-4">
                    Vos données sont sécurisées et ne seront jamais partagées.
                  </p>
                </form>
              )}
            </motion.div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};
