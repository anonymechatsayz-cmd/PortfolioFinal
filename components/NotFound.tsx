import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-anthracite flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-petrol/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sand/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[12rem] md:text-[16rem] font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent leading-none select-none">
            404
          </h1>
          
          <div className="relative -mt-16 md:-mt-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              Page Introuvable
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto mb-12 leading-relaxed">
              Oups ! Il semblerait que vous vous soyez perdu dans le code. Cette page n'existe pas (ou plus).
            </p>
            
            <Link to="/" className="inline-flex items-center gap-3 px-8 py-4 bg-sand text-white rounded-full font-bold shadow-lg hover:bg-amber-600 hover:shadow-xl transition-all group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
