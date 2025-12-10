import React from 'react';
import { personalInfo, education, languages } from '../data';
import { GraduationCap, BookOpen, User, Languages } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente About (Sobre Mí)
 * Muestra el perfil profesional, educación e idiomas.
 */
const About: React.FC = () => {
  return (
    // 'scroll-mt-20' crea un margen superior al hacer scroll hacia este ID
    <section id="about" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado del Perfil */}
        <ScrollReveal width="100%">
          <div className="mb-16">
            <div className="flex items-center mb-4">
              <User className="text-primary-600 mr-2" size={24} />
              <h2 className="text-3xl font-bold text-slate-900">Perfil Profesional</h2>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-primary-500 shadow-sm">
              <p className="text-slate-700 text-lg leading-relaxed">
                {personalInfo.about}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Columna Izquierda: Educación */}
          <ScrollReveal width="100%" delay={200}>
            <div>
              <div className="flex items-center mb-8">
                <GraduationCap className="text-primary-600 mr-2" size={24} />
                <h3 className="text-2xl font-bold text-slate-900">Estudios</h3>
              </div>
              
              {/* Línea de tiempo de estudios */}
              <div className="space-y-8 border-l-2 border-slate-200 ml-3 pl-8 relative">
                {education.map((edu, index) => (
                  <div key={index} className="relative">
                    {/* Punto en la línea de tiempo */}
                    <span className="absolute -left-[41px] top-1 bg-white border-4 border-primary-500 w-6 h-6 rounded-full"></span>
                    
                    <h4 className="text-xl font-bold text-slate-800">{edu.degree}</h4>
                    <p className="text-primary-600 font-medium mb-1">{edu.institution}</p>
                    <p className="text-sm text-slate-500 mb-2 italic">{edu.period}</p>
                    {/* Lista de detalles si existen */}
                    {edu.details && (
                      <ul className="list-disc list-inside text-slate-600 text-sm">
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
                  <Languages className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">Idiomas</h3>
                </div>
                <div className="grid gap-4">
                  {languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-800">{lang.name}</span>
                      <span className="text-sm px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                        {lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Sección de Objetivo Profesional */}
            <ScrollReveal width="100%" delay={400}>
              <div>
                <div className="flex items-center mb-6">
                  <BookOpen className="text-primary-600 mr-2" size={24} />
                  <h3 className="text-2xl font-bold text-slate-900">Objetivo</h3>
                </div>
                <p className="text-slate-600 leading-relaxed bg-secondary-50 p-6 rounded-xl border border-secondary-100">
                  Desarrollarme profesionalmente en el área de tecnología, especialmente en proyectos relacionados con desarrollo web, automatización y soporte técnico. Busco aplicar y ampliar mis conocimientos en programación, bases de datos y herramientas modernas, mientras aporto soluciones eficientes y sigo aprendiendo nuevas tecnologías.
                </p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;