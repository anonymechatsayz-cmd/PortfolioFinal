import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Phone, Calendar, X } from 'lucide-react';

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { scrollY } = useScroll();
  
  // Show after scrolling 500px
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 500) setIsVisible(true);
      else setIsVisible(false);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          className="fixed bottom-8 right-8 z-[100] hidden md:block"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-4 bg-anthracite text-white pl-6 pr-2 py-2 rounded-full shadow-2xl border border-white/10 group"
          >
            <span className="font-bold tracking-tight">Réserver mon appel</span>
            <div className="w-10 h-10 bg-sand rounded-full flex items-center justify-center text-anthracite group-hover:rotate-12 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
