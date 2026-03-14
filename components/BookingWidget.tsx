import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronDown, MessageCircle } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

export const BookingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);

  // Simulated upcoming dates
  const dates = [
    { day: 'jeu.', num: '12' },
    { day: 'ven.', num: '13' },
    { day: 'sam.', num: '14' },
    { day: 'dim.', num: '15' },
    { day: 'lun.', num: '16' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-[#FDFCF8] rounded-2xl shadow-2xl border border-black/5 w-[340px] mb-4 overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="p-4 flex items-start justify-between border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <OptimizedImage 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover border border-black/10"
                  />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#FDFCF8] rounded-full"></div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Alexandre</h4>
                  <p className="text-xs text-gray-500">Head of Sales & SEO</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-2 leading-tight">
                Votre site mérite mieux qu'un joli design
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                30 min pour éplucher votre site, identifier des opportunités et repartir avec des conseils actionnables.
                <br /><br />
                Promis, pas de slides ennuyeuses.
              </p>

              {/* Urgency Banner */}
              <div className="bg-white border border-black/10 rounded-lg p-3 flex justify-between items-center mb-4 shadow-sm">
                <span className="text-xs font-medium text-gray-700">Plus que quelques créneaux restants.</span>
                <span className="text-sm font-bold text-gray-900">03:00</span>
              </div>

              {/* Date Selector */}
              <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
                {dates.map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(idx)}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-14 rounded-lg border transition-all ${
                      selectedDate === idx 
                        ? 'border-[#0A0A0A] bg-[#0A0A0A] text-white shadow-md' 
                        : 'border-black/10 bg-white text-gray-600 hover:border-black/30'
                    }`}
                  >
                    <span className="text-[10px] font-medium uppercase">{date.day}</span>
                    <span className="text-sm font-bold">{date.num}</span>
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button className="w-full bg-[#0A0A0A] text-white rounded-lg py-3 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-md">
                  <Calendar className="w-4 h-4" />
                  Bloquer un créneau
                </button>
                <button className="w-full bg-white text-gray-900 border border-black/10 rounded-lg py-3 text-sm font-bold hover:bg-gray-50 transition-colors">
                  Découvrir la team
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="py-2 text-center border-t border-black/5 bg-black/5">
              <span className="text-[10px] text-gray-500 font-medium">Powered by <strong className="text-gray-700">iClosed</strong></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#0A0A0A] rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-gray-800 transition-colors border border-white/20"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
