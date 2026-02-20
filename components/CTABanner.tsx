import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente CTABanner (Call to Action)
 * Banner visual llamativo que invita al usuario a ponerse en contacto.
 */
const CTABanner: React.FC = () => {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="cta" className="py-20 relative overflow-hidden scroll-mt-20">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-linear-to-r from-primary-950/80 via-primary-900/40 to-primary-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />

      {/* Líneas decorativas */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <ScrollReveal width="100%">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles size={20} className="text-primary-400" />
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">
              Disponible para proyectos
            </span>
            <Sparkles size={20} className="text-primary-400" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            ¿Listo para trabajar{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-primary-600">
              juntos
            </span>
            ?
          </h2>

          <p className="mt-6 text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Si tienes un proyecto en mente, necesitas un desarrollador para tu equipo,
            o simplemente quieres conectar — me encantaría escucharte.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-full text-white bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              Contáctame
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
            <a
              href={`mailto:leoeligr10@gmail.com`}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              Enviar un email
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CTABanner;
