import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { BookingWidget } from './components/BookingWidget';
import { SEO } from './components/SEO';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';

const Home = lazy(() => import('./components/Home').then(m => ({ default: m.Home })));
const ProjectPage = lazy(() => import('./components/ProjectPage').then(m => ({ default: m.ProjectPage })));
const PortfolioPage = lazy(() => import('./components/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));
const GenericPage = lazy(() => import('./components/GenericPage').then(m => ({ default: m.GenericPage })));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#FAFAF9] text-[#1A1D29]">
    <div className="animate-pulse text-sm font-medium tracking-widest uppercase">Chargement...</div>
  </div>
);

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projet/:id" element={<ProjectPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        
        {/* Nouvelles routes du Mega Menu (Local Business) */}
        <Route path="/audience/artisan" element={<GenericPage title="Artisans & BTP" subtitle="Valorisez votre savoir-faire et rassurez vos futurs clients avec un site professionnel." image="https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/audience/commerce" element={<GenericPage title="Commerces & Boutiques" subtitle="Attirez la clientèle locale directement dans votre boutique grâce à une visibilité optimisée." image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/audience/pme" element={<GenericPage title="PME & Indépendants" subtitle="Digitalisez votre activité et générez des contacts qualifiés en continu." image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        
        <Route path="/services/site-web" element={<GenericPage title="Site Vitrine Sur-Mesure" subtitle="Votre image de marque en ligne, conçue pour marquer les esprits et convertir." image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/services/seo-local" element={<GenericPage title="Référencement Local (SEO)" subtitle="Soyez le premier résultat sur Google quand vos clients cherchent vos services dans votre ville." image="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/services/refonte" element={<GenericPage title="Refonte & Modernisation" subtitle="Modernisation complète de votre interface pour une expérience utilisateur sans friction." image="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/services/maintenance" element={<GenericPage title="Maintenance & Sécurité" subtitle="Un site toujours à jour, performant et protégé contre les failles de sécurité." image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        
        <Route path="/ressources/blog" element={<GenericPage title="Le Journal" subtitle="Conseils, astuces et stratégies pour améliorer votre visibilité locale." image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/ressources/faq" element={<GenericPage title="Questions Fréquentes" subtitle="Toutes les réponses à vos questions sur notre méthodologie et nos tarifs." image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="/contact" element={<GenericPage title="Contactez-nous" subtitle="Prêt à donner vie à votre vision ? Parlons de votre projet." image="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80&w=1600&fm=webp" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      <SEO />
      <CustomCursor />
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <AppRoutes />
      <BookingWidget />
    </SmoothScroll>
  );
};

export default App;
