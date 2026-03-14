import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { X, ArrowRight, ChevronDown, Hammer, Store, Briefcase, MapPin, Laptop, Wrench, BookOpen, HelpCircle, Mail, Sparkles, Star, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuData = {
  audience: [
    { id: 'artisan', label: 'Artisans & BTP', desc: 'Valorisez votre savoir-faire', icon: Hammer, href: '/audience/artisan', color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'commerce', label: 'Commerces & Boutiques', desc: 'Attirez la clientèle locale', icon: Store, href: '/audience/commerce', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'pme', label: 'PME & Indépendants', desc: 'Digitalisez votre activité', icon: Briefcase, href: '/audience/pme', color: 'text-blue-600', bg: 'bg-blue-50' },
  ],
  services: [
    { id: 'vitrine', label: 'Site Vitrine Sur-Mesure', desc: 'Votre image de marque en ligne', icon: Laptop, href: '/services/site-web' },
    { id: 'seo', label: 'Référencement Local (SEO)', desc: 'Soyez premier dans votre ville', icon: MapPin, href: '/services/seo-local' },
    { id: 'refonte', label: 'Refonte & Modernisation', desc: 'Un design qui convertit', icon: Wrench, href: '/services/refonte' },
    { id: 'maintenance', label: 'Maintenance & Sécurité', desc: 'Un site toujours performant', icon: Briefcase, href: '/services/maintenance' },
  ],
  resources: [
    { id: 'blog', label: 'Le Journal', desc: 'Conseils pour votre visibilité', icon: BookOpen, href: '/ressources/blog' },
    { id: 'faq', label: 'Questions Fréquentes', desc: 'Tout sur notre fonctionnement', icon: HelpCircle, href: '/ressources/faq' },
    { id: 'contact', label: 'Nous Contacter', desc: 'Parlons de votre projet', icon: Mail, href: '/contact' },
  ]
};

// --- Animations pour les sous-menus (Cascade Douce) ---
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const staggerItem: any = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
};

// --- Bespoke Desktop Menus ---

const AudienceMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="w-[380px] bg-[#FDFCF8] rounded-[2rem] border border-black/5 shadow-2xl p-4 flex flex-col gap-2 relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-sand/10 rounded-full blur-2xl pointer-events-none" />
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-4 right-4 text-sand/20 pointer-events-none"
    >
      <Star className="w-8 h-8" />
    </motion.div>

    <div className="px-3 pb-2">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pour qui créons-nous ?</h3>
    </div>

    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-2">
      {menuData.audience.map((item) => (
        <motion.div key={item.id} variants={staggerItem}>
          <Link
            to={item.href}
            onClick={closeMenu}
            className="group relative flex items-center gap-4 p-3 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-sm"
          >
            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
              <item.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-anthracite group-hover:text-sand transition-colors flex items-center justify-between">
                {item.label}
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sand" />
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const ServicesMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="w-[600px] bg-[#FDFCF8] rounded-[2rem] border border-black/5 shadow-2xl p-6 flex flex-col relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-sand/5 rounded-full blur-3xl pointer-events-none" />
    <motion.div 
      animate={{ y: [0, -10, 0] }} 
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-6 right-6 text-sand/20 pointer-events-none"
    >
      <Sparkles className="w-12 h-12" />
    </motion.div>

    <div className="flex gap-8">
      {/* Left Column: Services List */}
      <div className="flex-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Nos Expertises</h3>
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-1 gap-y-2">
          {menuData.services.map((item) => (
            <motion.div key={item.id} variants={staggerItem}>
              <Link
                to={item.href}
                onClick={closeMenu}
                className="group relative flex items-start gap-3 p-3 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-sm"
              >
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-sand/10 flex items-center justify-center text-sand group-hover:bg-sand group-hover:text-white transition-colors shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-anthracite group-hover:text-sand transition-colors block">{item.label}</span>
                  <span className="text-xs text-gray-500 block mt-0.5">{item.desc}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Column: Featured/CTA */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="w-[220px] bg-anthracite rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sand/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <Zap className="w-4 h-4 text-sand" />
          </div>
          <h4 className="font-bold text-lg mb-2 leading-tight">Besoin d'un coup de boost ?</h4>
          <p className="text-xs text-white/70 mb-6">Un audit gratuit de votre présence en ligne.</p>
        </div>
        <Link 
          to="/contact" 
          onClick={closeMenu} 
          className="relative z-10 bg-white text-anthracite text-xs font-bold py-2.5 px-4 rounded-xl text-center hover:bg-sand hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          Demander un audit <ArrowRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </div>
  </div>
);

const ResourcesMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="w-[300px] bg-[#FDFCF8] rounded-[2rem] border border-black/5 shadow-2xl p-4 flex flex-col relative overflow-hidden">
    {/* Decorative Elements */}
    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-sand to-transparent opacity-50" />

    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 pt-2">Ressources</h3>
    
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col gap-1">
      {menuData.resources.map((item) => (
        <motion.div key={item.id} variants={staggerItem}>
          <Link
            to={item.href}
            onClick={closeMenu}
            className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white transition-all duration-300 hover:shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-sand group-hover:bg-sand/10 transition-colors shrink-0">
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-bold text-anthracite group-hover:text-sand transition-colors block">{item.label}</span>
              <span className="text-xs text-gray-500 block">{item.desc}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export const Navbar = ({ scrollContainer }: { scrollContainer?: React.RefObject<HTMLElement> }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<keyof typeof menuData | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null); // Pour la pilule glissante
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollY } = useScroll(scrollContainer ? { container: scrollContainer } : undefined);
  const location = useLocation();

  // Dispatch custom event for mobile menu state (to trigger push-back effect in App/Home)
  useEffect(() => {
    const event = new CustomEvent('mobileMenuToggle', { detail: { isOpen: mobileMenuOpen } });
    window.dispatchEvent(event);
    
    // Lock body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  // Hover Bridge Logic (Debounce closing)
  const handleMouseEnter = (menuId: keyof typeof menuData) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(menuId);
    setHoveredLink(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredLink(null);
    }, 150); // 150ms grace period
  };

  // Parallax / Scroll Transforms
  const headerY = useTransform(scrollY, [0, 100], [0, 20]);
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(26, 29, 41, 0)", "rgba(26, 29, 41, 0.85)"]);
  const headerBorder = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);
  const headerShadow = useTransform(scrollY, [0, 100], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0,0,0,0.2)"]);
  
  const textColor = useTransform(scrollY, [0, 100], ["#1A1D29", "#FFFFFF"]);
  const buttonBg = useTransform(scrollY, [0, 100], ["#334155", "#FFFFFF"]);
  const buttonText = useTransform(scrollY, [0, 100], ["#FFFFFF", "#1A1D29"]);
  const logoText = useTransform(scrollY, [0, 100], ["#1A1D29", "#FFFFFF"]);

  const navLinks = [
    { name: 'Vous êtes ?', href: '#audience', id: 'audience', hasMegaMenu: true },
    { name: 'Services', href: '#services', id: 'services', hasMegaMenu: true },
    { name: 'Portfolio', href: '/portfolio', id: 'portfolio', hasMegaMenu: false },
    { name: 'Ressources', href: '#resources', id: 'resources', hasMegaMenu: true },
  ];

  return (
    <>
      <motion.nav
        style={{ y: headerY }}
        className="fixed top-0 left-0 right-0 z-50 py-4"
      >
        <div className="container mx-auto px-6 flex justify-center">
          <motion.div 
            style={{ 
              width: headerWidth, 
              backgroundColor: headerBg, 
              borderColor: headerBorder,
              boxShadow: headerShadow
            }}
            className="bg-white/90 rounded-full border px-4 py-2 md:px-6 md:py-3 flex justify-between items-center transition-all duration-300"
          >
            <Link 
              to="/" 
              className="text-xl font-bold tracking-tight flex items-center gap-2 relative z-10"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <motion.span 
                className="w-8 h-8 bg-sand rounded-full flex items-center justify-center text-anthracite font-bold"
                animate={isLogoHovered ? { scale: 1.1, rotate: -10 } : { scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                C
              </motion.span>
              <motion.span 
                style={{ color: isLogoHovered ? "#D4A574" : logoText }}
                transition={{ duration: 0.2 }}
              >
                Clément Franjou
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center relative z-10" onMouseLeave={handleMouseLeave}>
              {navLinks.map((link) => (
                <div 
                  key={link.id}
                  className="relative px-4 py-2"
                  onMouseEnter={() => {
                    setHoveredLink(link.id);
                    if (link.hasMegaMenu) {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current);
                      setActiveMegaMenu(link.id as keyof typeof menuData);
                    } else {
                      setActiveMegaMenu(null);
                    }
                  }}
                >
                  {/* Sliding Pill Background */}
                  {hoveredLink === link.id && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-sand/10 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {link.hasMegaMenu ? (
                    <motion.button
                      style={{ color: textColor }}
                      className="relative text-sm font-medium transition-colors hover:text-sand flex items-center gap-1 z-10"
                    >
                      {link.name}
                      <motion.div
                        animate={{ rotate: activeMegaMenu === link.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3 h-3 opacity-70" />
                      </motion.div>
                    </motion.button>
                  ) : (
                    <Link to={link.href} className="relative z-10 block">
                      <motion.span
                        style={{ color: textColor }}
                        className="text-sm font-medium transition-colors hover:text-sand flex items-center gap-1"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  )}

                  {/* Mega Menu Dropdown (with Hover Bridge padding) */}
                  {link.hasMegaMenu && (
                    <AnimatePresence>
                      {activeMegaMenu === link.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }}
                          exit={{ opacity: 0, y: 0, transition: { duration: 0.1 } }}
                          className="absolute top-full left-1/2 -translate-x-1/2 pt-6" // Increased pt for hover bridge
                        >
                          {link.id === 'audience' && <AudienceMenu closeMenu={() => { setActiveMegaMenu(null); setHoveredLink(null); }} />}
                          {link.id === 'services' && <ServicesMenu closeMenu={() => { setActiveMegaMenu(null); setHoveredLink(null); }} />}
                          {link.id === 'resources' && <ResourcesMenu closeMenu={() => { setActiveMegaMenu(null); setHoveredLink(null); }} />}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden md:block relative z-10">
              <Link to="/contact">
                <motion.div
                  style={{ backgroundColor: buttonBg, color: buttonText }}
                  className="px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 group relative overflow-hidden ml-4"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "#D4A574", 
                    color: "#FFFFFF",
                    boxShadow: "0 0 20px rgba(212, 165, 116, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    default: { type: "spring", stiffness: 400, damping: 15 },
                    backgroundColor: { duration: 0.2 },
                    color: { duration: 0.2 }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Démarrer un projet
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-sand to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <motion.button 
              className="md:hidden p-2 group relative z-10"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div 
                style={{ color: textColor }}
                className="w-6 h-6 flex flex-col justify-center items-end gap-[5px]"
              >
                <motion.span 
                  className="h-[2px] bg-current rounded-full w-full origin-right"
                  variants={{ hover: { scaleX: 0.6 }, tap: { scaleX: 0.6 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
                <motion.span className="h-[2px] bg-current rounded-full w-full" />
                <motion.span 
                  className="h-[2px] bg-current rounded-full w-full origin-right"
                  variants={{ hover: { scaleX: 0.8 }, tap: { scaleX: 0.8 } }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="menu-main"
            initial={{ opacity: 0, y: '100%' }} // Slide from bottom like iOS sheet
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-anthracite text-white overflow-y-auto custom-scrollbar rounded-t-3xl mt-12 md:mt-0 md:rounded-none"
            style={{ boxShadow: "0 -20px 40px rgba(0,0,0,0.3)" }}
          >
            <div className="p-8 flex flex-col min-h-screen">
              {/* Drag handle for mobile feel */}
              <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-8 md:hidden" />
              
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-bold text-sand">Menu</span>
                <motion.button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-2 hover:text-sand transition-colors bg-white/5 rounded-full"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-2 flex-grow"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.id} variants={staggerItem} className="border-b border-white/10 last:border-0">
                    {link.hasMegaMenu ? (
                      <>
                        <button 
                          onClick={() => setMobileAccordion(mobileAccordion === link.id ? null : link.id)}
                          className="w-full py-4 flex items-center justify-between text-2xl font-medium hover:text-sand transition-colors"
                        >
                          {link.name}
                          <motion.div
                            animate={{ rotate: mobileAccordion === link.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-6 h-6 opacity-50" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {mobileAccordion === link.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-6 flex flex-col gap-4 pl-4 border-l-2 border-sand/30 ml-2 mt-2">
                                {menuData[link.id as keyof typeof menuData].map((subItem: any) => (
                                  <Link 
                                    key={subItem.id} 
                                    to={subItem.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-4 group"
                                  >
                                    <div className={`w-10 h-10 rounded-xl ${subItem.bg || 'bg-white/5'} flex items-center justify-center ${subItem.color || 'text-white/70'} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                                      <subItem.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                      <span className="text-lg font-medium text-white/90 group-hover:text-sand transition-colors">{subItem.label}</span>
                                      <span className="text-sm text-white/50">{subItem.desc}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link 
                        to={link.href} 
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-4 flex items-center justify-between text-2xl font-medium hover:text-sand transition-colors"
                      >
                        {link.name}
                        <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 transition-all" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 pb-8"
              >
                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative overflow-hidden group bg-gradient-to-r from-sand to-amber-600 text-white p-5 rounded-2xl text-center font-bold shadow-lg block"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                    Démarrer un projet <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
