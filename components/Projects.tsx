import React from 'react';
import { projects } from '../data';
import { ExternalLink } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Projects (Proyectos)
 * Muestra una galería de proyectos en formato de tarjeta (Grid).
 */
const Projects: React.FC = () => {
  return (
    // 'scroll-mt-20' ajusta la posición de llegada del scroll
    <section id="projects" className="py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Proyectos Personales</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500">
              Una colección de mis trabajos en desarrollo web frontend y herramientas lógicas.
            </p>
          </div>
        </ScrollReveal>

        {/* Rejilla de Proyectos */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} width="100%" delay={index * 100}>
              <div 
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full"
              >
                {/* Imagen del proyecto con efecto hover */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay oscuro que aparece al pasar el mouse */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-white text-slate-900 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Ver Demo <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
                
                {/* Detalles del proyecto */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 flex-1 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Etiquetas de tecnologías */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary-50 text-secondary-900 border border-secondary-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal width="100%" delay={300}>
          <div className="mt-12 text-center">
            <p className="text-slate-500">
              Todos estos proyectos están desplegados y funcionales en Netlify.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;