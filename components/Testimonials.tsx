import React from 'react';
import { testimonials } from '../data';
import { Quote, User, MessageSquareQuote } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Testimonials (Testimonios)
 * Muestra testimonios de profesores, compañeros y mentores.
 */

const relationshipColors: Record<string, string> = {
  Profesor: 'bg-blue-900/30 text-blue-300 border-blue-700/50',
  Compañera: 'bg-purple-900/30 text-purple-300 border-purple-700/50',
  Compañero: 'bg-purple-900/30 text-purple-300 border-purple-700/50',
  Mentor: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/50',
  Cliente: 'bg-amber-900/30 text-amber-300 border-amber-700/50',
};

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 scroll-mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900/30 border border-primary-700/50 mb-6">
              <MessageSquareQuote className="text-primary-500" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Lo que dicen de mí
            </h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto">
              Opiniones de quienes han trabajado o estudiado conmigo
            </p>
          </div>
        </ScrollReveal>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} width="100%" delay={index * 150}>
              <div className="group relative rounded-2xl border border-white/10 p-1 md:rounded-3xl hover:border-primary-700/30 transition-colors duration-300 h-full">
                <div className="relative bg-zinc-950/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm flex flex-col h-full">
                  {/* Comillas decorativas */}
                  <Quote
                    size={32}
                    className="text-primary-500/20 mb-4 flex-shrink-0"
                    strokeWidth={1.5}
                  />

                  {/* Texto del testimonio */}
                  <p className="text-zinc-300 leading-relaxed italic flex-grow text-[15px]">
                    "{testimonial.content}"
                  </p>

                  {/* Info del autor */}
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                    {/* Avatar */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                      {testimonial.avatar ? (
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-zinc-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {testimonial.name}
                      </p>
                      <p className="text-zinc-500 text-xs truncate">
                        {testimonial.role}
                      </p>
                    </div>

                    {/* Badge de relación */}
                    <span
                      className={`flex-shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                        relationshipColors[testimonial.relationship] ||
                        'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      {testimonial.relationship}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
