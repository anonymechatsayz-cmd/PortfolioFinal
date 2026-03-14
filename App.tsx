import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { BookingWidget } from './components/BookingWidget';
import { SEO } from './components/SEO';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { audienceData } from './data/audienceData';
import { servicesData } from './data/servicesData';
import { resourcesData } from './data/resourcesData';

const Home = lazy(() => import('./components/Home').then(m => ({ default: m.Home })));
const ProjectPage = lazy(() => import('./components/ProjectPage').then(m => ({ default: m.ProjectPage })));
const PortfolioPage = lazy(() => import('./components/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));
const ContactPage = lazy(() => import('./components/ContactPage').then(m => ({ default: m.ContactPage })));
const AudiencePage = lazy(() => import('./components/AudiencePage').then(m => ({ default: m.AudiencePage })));
const ServicesPage = lazy(() => import('./components/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ResourcesPage = lazy(() => import('./components/ResourcesPage').then(m => ({ default: m.ResourcesPage })));

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
        <Route path="/audience/artisan" element={<AudiencePage data={audienceData.artisan} />} />
        <Route path="/audience/commerce" element={<AudiencePage data={audienceData.commerce} />} />
        <Route path="/audience/pme" element={<AudiencePage data={audienceData.pme} />} />
        
        <Route path="/services/site-web" element={<ServicesPage data={servicesData.siteWeb} />} />
        <Route path="/services/seo-local" element={<ServicesPage data={servicesData.seoLocal} />} />
        <Route path="/services/refonte" element={<ServicesPage data={servicesData.refonte} />} />
        <Route path="/services/maintenance" element={<ServicesPage data={servicesData.maintenance} />} />
        
        <Route path="/ressources/blog" element={<ResourcesPage data={resourcesData.blog as any} />} />
        <Route path="/ressources/faq" element={<ResourcesPage data={resourcesData.faq as any} />} />
        
        <Route path="/contact" element={<ContactPage />} />
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
