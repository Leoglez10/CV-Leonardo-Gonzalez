
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import CTABanner from './components/CTABanner';
import AnimatedCounters from './components/AnimatedCounters';
import Footer from './components/Footer';
import AccessibilityMenu from './components/AccessibilityMenu';
import TargetCursor from './components/ui/TargetCursor';
import { ArrowUp } from 'lucide-react';

/**
 * Componente Principal (App)
 * Incluye todas las secciones del portafolio, menú de accesibilidad,
 * cursor custom y botón scroll-to-top.
 */
const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative selection:bg-primary-100 selection:text-primary-900">

      <AccessibilityMenu />

      <TargetCursor
        targetSelector="a, button, .cursor-target, input, textarea, select"
        spinDuration={4}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.15}
      />

      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <AnimatedCounters />
        <Projects />
        <Skills />
        <Certifications />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />

      {/* Botón Flotante "Volver Arriba" */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/40 hover:bg-primary-700 hover:scale-110 transition-all duration-300 z-40 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        aria-label="Volver al inicio de la página"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;
