
import React from 'react';
import { personalInfo } from '../data';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import Grainient from './ui/Grainient';
import RotatingText from './ui/RotatingText';
import { motion } from 'framer-motion';

/**
 * Componente Hero
 * Es la sección principal de bienvenida (Landing).
 * Contiene la presentación con CTAs y animación de scroll.
 */
const Hero: React.FC = () => {

  const roles = [
    "Estudiante de Ingeniería en Computación",
    "Desarrollador Full Stack en formación",
    "Entusiasta de la Tecnología",
    "Creador de Soluciones Digitales"
  ];

  // Función para scroll suave a una sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-transparent pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-screen flex flex-col justify-center overflow-hidden scroll-mt-20">

      {/* Background with Grainient Effect */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <Grainient
          color1="#0f172a"
          color2="#172554"
          color3="#3b82f6"
          timeSpeed={0.6}
          warpStrength={1.2}
          warpFrequency={6}
          warpSpeed={3}
          warpAmplitude={60}
          noiseScale={2.2}
          contrast={1.2}
          className="w-full h-full opacity-80"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-[1]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">

          <ScrollReveal delay={200}>
            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight mb-6 text-center">
              Hola, soy <br />
              <span className="text-primary-500">
                {personalInfo.name}
              </span>
            </h1>
          </ScrollReveal>
        </div>
      </div>

      {/* Rotating Text Replacement */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
        className="w-full mb-8 overflow-hidden relative z-10 py-4 flex items-center justify-center font-bold text-white tracking-tight"
      >
        <motion.span
          layout
          className="text-xl sm:text-2xl md:text-3xl mr-2 sm:mr-3"
        >
          Soy
        </motion.span>
        <RotatingText
          texts={roles}
          mainClassName="text-xl sm:text-2xl md:text-3xl px-2 sm:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg inline-flex shadow-lg shadow-cyan-300/20"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
          transition={{ type: "spring", damping: 20, stiffness: 120 }}
          rotationInterval={4000}
          animatePresenceMode="popLayout"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollToSection('about')}
        aria-label="Desplazarse hacia abajo para descubrir más contenido"
      >
        <span className="text-xs text-zinc-400 uppercase tracking-widest font-medium">Descubre más</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <ChevronDown size={24} className="text-zinc-400" />
        </motion.div>
      </motion.button>



    </section>
  );
};

export default Hero;
