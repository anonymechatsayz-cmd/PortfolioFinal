import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle, ArrowRight, Calendar, Video, ArrowUpRight, ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { BookingModal } from './BookingModal';
import { OptimizedImage } from './OptimizedImage';

export const Contact = () => {
  // Utilisation de Formspree pour l'envoi d'email
  // L'ID du formulaire doit être défini dans le fichier .env (VITE_FORMSPREE_FORM_ID)
  // ou remplacé directement ici si vous n'utilisez pas de variables d'environnement
  const formId = (import.meta as any).env?.VITE_FORMSPREE_FORM_ID || "YOUR_FORM_ID";
  const [state, handleSubmit] = useForm(formId);
  
  const [activeTab, setActiveTab] = useState<'form' | 'call'>('form');
  const [bookingModal, setBookingModal] = useState<{ isOpen: boolean; url: string }>({ isOpen: false, url: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Refonte de site existant');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openBooking = (type: 'discovery' | 'audit') => {
    // URLs de démo Calendly (à remplacer par les vôtres)
    const urls = {
      discovery: "https://calendly.com/clement-franjou/30min", 
      audit: "https://calendly.com/clement-franjou/30min" 
    };
    
    setBookingModal({ 
      isOpen: true, 
      url: urls[type] 
    });
  };

  return (
    <section id="contact" className="py-32 bg-anthracite text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-petrol/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-sand/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="lg:sticky lg:top-32 text-center lg:text-left relative">
            
            {/* Doodles & Stickers */}
            <motion.div 
              initial={{ opacity: 0, rotate: 20, scale: 0 }}
              whileInView={{ opacity: 1, rotate: 10, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-12 right-0 md:right-12 bg-white text-anthracite font-bold py-1.5 px-3 rounded-xl shadow-lg border-2 border-anthracite z-20 transform rotate-12 hidden md:block"
            >
              <span className="flex items-center gap-1 text-sm"><MessageCircle className="w-4 h-4 text-emerald-500" /> On discute ?</span>
            </motion.div>

            <span className="text-sand font-bold tracking-widest uppercase text-sm mb-4 block">Contact</span>
            <h2 className="text-5xl md:text-7xl font-bold font-serif mb-8 leading-tight">Parlons de <br />votre projet.</h2>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <OptimizedImage 
                src="https://i.pravatar.cc/150?u=clement" 
                alt="Clément Franjou" 
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
              />
              <div className="text-left">
                <div className="font-bold text-lg">Clément Franjou</div>
                <div className="text-sand text-sm">Web Designer & Développeur</div>
              </div>
            </div>

            <p className="text-gray-400 text-xl mb-12 leading-relaxed max-w-md mx-auto lg:mx-0">
              Prêt à transformer votre présence en ligne ? Remplissez le formulaire ou réservez un appel découverte.
            </p>
            
            <div className="space-y-6 md:space-y-8 inline-block text-left w-full md:w-auto">
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-petrol transition-colors shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-sand group-hover:text-white transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-1">Email</div>
                  <div className="text-lg md:text-xl font-medium break-all sm:break-normal">clement.franjou@gmail.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-petrol transition-colors shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-sand group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-1">Localisation</div>
                  <div className="text-lg md:text-xl font-medium">Paris & Île-de-France</div>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 group">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-petrol transition-colors shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-sand group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs md:text-sm text-gray-500 uppercase tracking-wider mb-1">Disponibilité</div>
                  <div className="text-lg md:text-xl font-medium">Lun - Ven, 9h - 19h</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 md:p-12 text-anthracite shadow-2xl min-h-[700px] md:min-h-[850px] flex flex-col">
            {/* Toggle Switch */}
            <div className="flex justify-center mb-8 md:mb-10">
              <div className="bg-paper p-1.5 rounded-full inline-flex relative shadow-inner w-full sm:w-auto" role="tablist" aria-label="Type de contact">
                <div 
                  className={`absolute top-1.5 bottom-1.5 rounded-full bg-anthracite shadow-md transition-all duration-300 ease-in-out ${
                    activeTab === 'form' ? 'left-1.5 w-[calc(50%-6px)]' : 'left-[50%] w-[calc(50%-6px)]'
                  }`}
                />
                <button 
                  onClick={() => setActiveTab('form')}
                  role="tab"
                  aria-selected={activeTab === 'form'}
                  aria-controls="contact-form-panel"
                  id="tab-form"
                  className={`relative z-10 flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 ${
                    activeTab === 'form' ? 'text-white' : 'text-gray-500 hover:text-anthracite'
                  }`}
                >
                  Demander un devis
                </button>
                <button 
                  onClick={() => setActiveTab('call')}
                  role="tab"
                  aria-selected={activeTab === 'call'}
                  aria-controls="contact-call-panel"
                  id="tab-call"
                  className={`relative z-10 flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-300 ${
                    activeTab === 'call' ? 'text-white' : 'text-gray-500 hover:text-anthracite'
                  }`}
                >
                  Réserver un appel
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'form' ? (
                <motion.div
                  key="form"
                  role="tabpanel"
                  id="contact-form-panel"
                  aria-labelledby="tab-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col justify-center"
                >
                  {state.succeeded ? (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-12">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                      <h3 className="text-3xl font-bold text-anthracite mb-4">Message envoyé !</h3>
                      <p className="text-gray-600 text-lg mb-8">
                        Merci de votre intérêt. Je reviens vers vous très rapidement (sous 24h).
                      </p>
                      <button 
                        onClick={() => window.location.reload()} 
                        className="text-[#5D7285] font-bold hover:underline flex items-center gap-2"
                      >
                        Envoyer un autre message <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-anthracite mb-2 uppercase tracking-wide">Nom complet</label>
                        <motion.input 
                          whileFocus={{ 
                            scale: 1.01, 
                            borderColor: "#D4A574",
                            boxShadow: "0 0 0 4px rgba(212, 165, 116, 0.1)" 
                          }}
                          transition={{ duration: 0.2 }}
                          type="text" 
                          id="name" 
                          name="name"
                          required
                          className="w-full px-4 py-4 rounded-xl bg-paper border border-gray-200 outline-none transition-all"
                          placeholder="Jean Dupont"
                        />
                        <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-anthracite mb-2 uppercase tracking-wide">Email</label>
                        <motion.input 
                          whileFocus={{ 
                            scale: 1.01, 
                            borderColor: "#D4A574",
                            boxShadow: "0 0 0 4px rgba(212, 165, 116, 0.1)" 
                          }}
                          transition={{ duration: 0.2 }}
                          type="email" 
                          id="email" 
                          name="email"
                          required
                          className="w-full px-4 py-4 rounded-xl bg-paper border border-gray-200 outline-none transition-all"
                          placeholder="jean@gmail.com"
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
                      </div>
                      <div className="relative" ref={dropdownRef}>
                        <label className="block text-sm font-bold text-anthracite mb-2 uppercase tracking-wide">Type de projet</label>
                        <input type="hidden" name="type" value={selectedType} />
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full px-4 py-4 rounded-xl bg-paper border outline-none transition-all text-left flex items-center justify-between ${
                            isDropdownOpen ? 'border-[#D4A574] ring-4 ring-[#D4A574]/10' : 'border-gray-200'
                          }`}
                        >
                          <span className="text-anthracite">{selectedType}</span>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                            >
                              {['Création de site', 'Refonte de site existant', 'Landing Page', 'Autre'].map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => {
                                    setSelectedType(type);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                                    selectedType === type ? 'bg-gray-50 font-medium text-anthracite' : 'text-gray-600'
                                  }`}
                                >
                                  {type}
                                  {selectedType === type && <CheckCircle className="w-4 h-4 text-sand" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-bold text-anthracite mb-2 uppercase tracking-wide">Message</label>
                        <motion.textarea 
                          whileFocus={{ 
                            scale: 1.01, 
                            borderColor: "#D4A574",
                            boxShadow: "0 0 0 4px rgba(212, 165, 116, 0.1)" 
                          }}
                          transition={{ duration: 0.2 }}
                          id="message" 
                          name="message"
                          rows={4}
                          required
                          className="w-full px-4 py-4 rounded-xl bg-paper border border-gray-200 outline-none transition-all resize-none"
                          placeholder="Parlez-moi de votre activité et de vos objectifs..."
                        ></motion.textarea>
                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
                      </div>
                      <motion.button 
                        type="submit"
                        disabled={state.submitting}
                        initial="idle"
                        whileHover={!state.submitting ? "hover" : undefined}
                        whileTap={!state.submitting ? "tap" : undefined}
                        variants={{
                          idle: { scale: 1 },
                          hover: { 
                            scale: 1.02,
                            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                          },
                          tap: { scale: 0.98 }
                        }}
                        className="w-full py-5 bg-anthracite hover:bg-gray-800 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                      >
                        {state.submitting ? (
                          <span>Envoi en cours...</span>
                        ) : (
                          <>
                            Envoyer ma demande 
                            <div className="relative w-5 h-5 overflow-hidden">
                              <motion.div
                                className="absolute inset-0"
                                variants={{
                                  idle: { x: 0, y: 0, opacity: 1 },
                                  hover: {
                                    x: 20,
                                    y: -20,
                                    opacity: 0,
                                    transition: { duration: 0.4, ease: "easeInOut" }
                                  }
                                }}
                              >
                                <Send className="w-5 h-5" />
                              </motion.div>
                              <motion.div
                                className="absolute inset-0"
                                variants={{
                                  idle: { x: -20, y: 20, opacity: 0 },
                                  hover: {
                                    x: 0,
                                    y: 0,
                                    opacity: 1,
                                    transition: { duration: 0.4, ease: "easeInOut" }
                                  }
                                }}
                              >
                                <Send className="w-5 h-5" />
                              </motion.div>
                            </div>
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="call"
                  role="tabpanel"
                  id="contact-call-panel"
                  aria-labelledby="tab-call"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col justify-center"
                >
                  <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-paper rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                      <Video className="w-8 h-8 text-anthracite" />
                    </div>
                    <h3 className="text-2xl font-bold text-anthracite mb-3">Pas de discours commercial</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Juste un échange honnête pour voir si nous sommes faits pour travailler ensemble. Donnons vie à votre vision !
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={() => openBooking('discovery')}
                      className="w-full group flex items-center justify-between p-6 rounded-2xl bg-paper border border-gray-100 hover:border-anthracite/20 hover:shadow-lg transition-all duration-300 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-anthracite group-hover:bg-anthracite group-hover:text-white transition-colors">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-anthracite">Rendez-vous découverte</div>
                          <div className="text-sm text-gray-500 font-medium">15 min • Visio</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-anthracite group-hover:border-anthracite group-hover:text-white transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </button>

                    <button 
                      onClick={() => openBooking('audit')}
                      className="w-full group flex items-center justify-between p-6 rounded-2xl bg-paper border border-gray-100 hover:border-anthracite/20 hover:shadow-lg transition-all duration-300 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-anthracite group-hover:bg-anthracite group-hover:text-white transition-colors">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-anthracite">Audit stratégique</div>
                          <div className="text-sm text-gray-500 font-medium">30 min • Visio</div>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-anthracite group-hover:border-anthracite group-hover:text-white transition-all">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </button>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-400">
                      Les créneaux sont mis à jour en temps réel.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={bookingModal.isOpen} 
        onClose={() => setBookingModal({ ...bookingModal, isOpen: false })} 
        url={bookingModal.url} 
      />
    </section>
  );
};
