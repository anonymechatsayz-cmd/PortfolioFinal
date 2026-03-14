import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string; // URL de votre page de réservation (Calendly, Cal.com, etc.)
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, url }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-anthracite/90 z-[60] flex items-center justify-center p-4 md:p-8"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white w-full max-w-5xl h-[85vh] overflow-hidden rounded-[2rem] shadow-2xl pointer-events-auto relative flex flex-col">
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white z-10">
                <h3 className="text-xl font-bold text-anthracite">Réserver un créneau</h3>
                <button 
                  onClick={onClose}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors group"
                >
                  <X className="w-6 h-6 text-gray-500 group-hover:text-anthracite transition-colors" />
                </button>
              </div>

              {/* Iframe Container */}
              <div className="flex-grow bg-gray-50 relative">
                <iframe 
                  src={url} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Calendrier de réservation"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
