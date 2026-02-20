import React from 'react';
import { certifications } from '../data';
import { Award, ExternalLink, Clock, Building2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Certifications (Certificaciones)
 * Muestra las certificaciones y cursos completados en un grid responsivo.
 */
const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-zinc-950/40 scroll-mt-20 relative">
      {/* Gradiente superior decorativo */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Encabezado de sección */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900/30 border border-primary-700/50 mb-6">
              <Award className="text-primary-500" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Certificaciones
            </h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto">
              Cursos y certificaciones que respaldan mi formación técnica
            </p>
          </div>
        </ScrollReveal>

        {/* Grid de certificaciones */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} width="100%" delay={index * 150}>
              <div className="group relative rounded-2xl border border-white/10 p-1 md:rounded-3xl cursor-target hover:border-primary-700/50 transition-colors duration-300">
                <div className="relative bg-zinc-950/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm h-full">
                  {/* Header de la tarjeta */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-zinc-400">
                        <Building2 size={16} className="text-primary-500 flex-shrink-0" />
                        <span className="text-sm font-medium">{cert.issuer}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <span className="text-xs font-semibold px-3 py-1.5 bg-primary-900/30 text-primary-300 border border-primary-700/50 rounded-full">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  {/* Horas si están disponibles */}
                  {cert.hours && (
                    <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                      <Clock size={14} />
                      <span>{cert.hours}</span>
                    </div>
                  )}

                  {/* Skills/tags de la certificación */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2.5 py-1 bg-white/5 text-zinc-300 rounded-full border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Link a credencial si existe */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-5 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium"
                    >
                      Ver credencial
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
