import React, { useEffect, useState, Suspense, lazy, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Hero } from './Hero';

// Lazy load below-the-fold components
const Services = lazy(() => import('./Services').then(m => ({ default: m.Services })));
const Portfolio = lazy(() => import('./Portfolio').then(m => ({ default: m.Portfolio })));
const Process = lazy(() => import('./Process').then(m => ({ default: m.Process })));
const About = lazy(() => import('./About').then(m => ({ default: m.About })));
const Testimonials = lazy(() => import('./Testimonials').then(m => ({ default: m.Testimonials })));
const Pricing = lazy(() => import('./Pricing').then(m => ({ default: m.Pricing })));
const FAQ = lazy(() => import('./FAQ').then(m => ({ default: m.FAQ })));
const Contact = lazy(() => import('./Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./Footer').then(m => ({ default: m.Footer })));

export const Home: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback((e: Event) => {
    const customEvent = e as CustomEvent<{ isOpen: boolean }>;
    setIsMobileMenuOpen(customEvent.detail.isOpen);
  }, []);

  useEffect(() => {
    window.addEventListener('mobileMenuToggle', handleMobileMenuToggle);
    return () => {
      window.removeEventListener('mobileMenuToggle', handleMobileMenuToggle);
    };
  }, [handleMobileMenuToggle]);

  useEffect(() => {
    const sections = [
      { id: 'hero', title: 'Clément Franjou | Studio Design & Webflow' },
      { id: 'services', title: 'Services | Clément Franjou' },
      { id: 'portfolio', title: 'Portfolio | Clément Franjou' },
      { id: 'process', title: 'Process | Clément Franjou' },
      { id: 'about', title: 'À Propos | Clément Franjou' },
      { id: 'testimonials', title: 'Témoignages | Clément Franjou' },
      { id: 'pricing', title: 'Tarifs | Clément Franjou' },
      { id: 'faq', title: 'FAQ | Clément Franjou' },
      { id: 'contact', title: 'Contact | Clément Franjou' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              document.title = section.title;
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "-20% 0px -20% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans antialiased selection:bg-petrol selection:text-white bg-anthracite">
      <Navbar />
      <motion.div
        animate={{
          scale: isMobileMenuOpen ? 0.95 : 1,
          opacity: isMobileMenuOpen ? 0.5 : 1,
          borderRadius: isMobileMenuOpen ? '2rem' : '0rem',
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        transformTemplate={({ scale }, generated) => 
          scale === 1 || scale === "1" ? "none" : generated
        }
        className="bg-cream origin-top min-h-screen"
      >
        <main>
          <Hero />
          <Suspense fallback={<div className="h-32 w-full" />}>
            <Services />
            <Portfolio />
            <Process />
            <About />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-32 w-full" />}>
          <Footer />
        </Suspense>
      </motion.div>
    </div>
  );
};
