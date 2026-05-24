import React from 'react';
import { personalInfo, education, languages } from '../data';
import { GraduationCap, BookOpen, User, Languages } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GlowingEffect } from './ui/glowing-effect';

/**
 * Componente About (Sobre Mí)
 * Muestra el perfil profesional, educación e idiomas.
 */
const About: React.FC = () => {
  return (
    // 'scroll-mt-20' crea un margen superior al hacer scroll hacia este ID
    <section id="about" className="pt-10 pb-20 bg-zinc-950/40 scroll-mt-20 relative">
      {/* Subtle top gradient for smoother transition from Hero */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado del Perfil */}
        <ScrollReveal width="100%">
          <div className="mb-16">
            <div className="flex items-center mb-4">
              <User className="text-primary-500 mr-2" size={24} />
              <h2 className="text-3xl font-bold text-white">Perfil Profesional</h2>
            </div>

            <div className="relative rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3 cursor-target">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative bg-zinc-950/50 p-6 rounded-xl border-l-4 border-l-primary-500 shadow-sm backdrop-blur-sm">
                <p className="text-zinc-300 text-lg leading-relaxed">
                  {personalInfo.about}
                </p>
              </div>
            </div>

          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Columna Izquierda: Educación */}
          <ScrollReveal width="100%" delay={200}>
            <div>
              <div className="flex items-center mb-8">
                <GraduationCap className="text-primary-500 mr-2" size={24} />
                <h3 className="text-2xl font-bold text-white">Estudios</h3>
              </div>

              {/* Línea de tiempo de estudios */}
              <div className="space-y-8 border-l-2 border-white/10 ml-3 pl-8 relative">
                {education.map((edu, index) => (
                  <div key={index} className="relative">
                    {/* Punto en la línea de tiempo */}
                    <span className="absolute -left-[41px] top-1 bg-black border-4 border-primary-500 w-6 h-6 rounded-full"></span>

                    <h4 className="text-xl font-bold text-zinc-200">{edu.degree}</h4>
                    <p className="text-primary-400 font-medium mb-1">{edu.institution}</p>
                    <p className="text-sm text-zinc-400 mb-2 italic">{edu.period}</p>
                    {/* Lista de detalles si existen */}
                    {edu.details && (
                      <ul className="list-disc list-inside text-zinc-400 text-sm">
                        {edu.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Columna Derecha: Idiomas y Objetivo */}
          <div className="space-y-12">

            {/* Sección de Idiomas */}
            <ScrollReveal width="100%" delay={300}>
              <div>
                <div className="flex items-center mb-6">
                  <Languages className="text-primary-500 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-100">Idiomas</h3>
                </div>
                <div className="grid gap-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="relative rounded-2xl border border-white/10 p-1 cursor-target">
                      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                      <div className="relative flex items-center justify-between bg-zinc-950/50 p-4 rounded-xl backdrop-blur-sm">
                        <span className="font-bold text-zinc-200">{lang.name}</span>
                        <span className="text-sm px-3 py-1 bg-primary-900/30 text-primary-300 border border-primary-700/50 rounded-full font-medium">
                          {lang.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Sección de Objetivo Profesional */}
            <ScrollReveal width="100%" delay={400}>
              <div>
                <div className="flex items-center mb-6">
                  <BookOpen className="text-primary-500 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-100">Objetivo</h3>
                </div>

                <div className="relative rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                  <div className="relative bg-zinc-950/50 p-6 rounded-xl backdrop-blur-sm">
                    <p className="text-zinc-300 leading-relaxed">
                      Integrarme a un equipo tecnológico como desarrollador full-stack donde pueda aplicar mis conocimientos en desarrollo web para contribuir a la innovación y automatización de procesos. Busco aportar soluciones escalables y eficientes que generen impacto positivo en la productividad del equipo, siempre en exploración de nuevas tecnologías y mejores prácticas de desarrollo.
                    </p>
                  </div>
                </div>

              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;