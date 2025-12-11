
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AccessibilityMenu from './components/AccessibilityMenu'; 
import { ArrowUp } from 'lucide-react';

/**
 * Componente Principal (App)
 * Estructura la aplicación organizando los componentes en orden vertical.
 * Incluye un botón flotante para volver arriba y el menú de accesibilidad.
 */
const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Efecto para mostrar/ocultar el botón de scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si baja más de 400px, muestra el botón
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative selection:bg-primary-100 selection:text-primary-900">
      
      <AccessibilityMenu /> {/* Menú de Accesibilidad flotante */}
      
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Contact />

      {/* Botón Flotante "Volver Arriba" */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/40 hover:bg-primary-700 hover:scale-110 transition-all duration-300 z-40 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Volver al inicio de la página" // ARIA Label mejorado
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default App;
