
import React, { useState, useEffect } from 'react';
import { projects } from '../data';
import { Project } from '../types';
import { ExternalLink, X, Info, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Projects (Proyectos)
 * Muestra una galería de proyectos en formato de tarjeta (Grid).
 * Incluye un modal para ver detalles extendidos y funcionalidad de "Ver más".
 */
const Projects: React.FC = () => {
  // Estado para controlar qué proyecto está seleccionado (y mostrar su modal)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Estado para controlar si se muestran todos los proyectos o solo los primeros
  const [showAll, setShowAll] = useState(false);

  // Cantidad de proyectos a mostrar inicialmente
  const INITIAL_LIMIT = 3;

  // Determinar qué proyectos renderizar según el estado
  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_LIMIT);

  // Manejar tecla Escape y bloqueo de scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

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
          {visibleProjects.map((project, index) => (
            <ScrollReveal key={project.id} width="100%" delay={index * 100}>
              <div 
                className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:scale-[1.03] transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full cursor-pointer focus-within:ring-4 focus-within:ring-primary-300"
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                aria-label={`Ver detalles del proyecto ${project.title}`}
              >
                {/* Imagen del proyecto con efecto hover */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <img 
                    src={project.image} 
                    alt="" 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Overlay oscuro que aparece al pasar el mouse */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    
                    {/* Botón Detalles */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Evita doble evento
                        setSelectedProject(project);
                      }}
                      className="inline-flex items-center px-4 py-2 bg-white text-slate-900 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      aria-label={`Detalles de ${project.title}`}
                    >
                      Detalles <Info size={16} className="ml-2" />
                    </button>

                    {/* Botón Ver Demo (Externo) */}
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()} // Evita abrir el modal al ir al link
                      className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white"
                      aria-label={`Ver demo de ${project.title} en nueva pestaña`}
                    >
                      Demo <ExternalLink size={16} className="ml-2" />
                    </a>

                  </div>
                </div>
                
                {/* Detalles del proyecto (Tarjeta Resumen) */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-4 flex-1 text-sm line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Etiquetas de tecnologías */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary-50 text-secondary-900 border border-secondary-100"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Botón Ver Más / Ver Menos */}
        {projects.length > INITIAL_LIMIT && (
          <ScrollReveal width="100%">
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-primary-100"
                aria-expanded={showAll}
              >
                {showAll ? (
                  <>
                    Ver menos <ChevronUp className="ml-2" size={20} />
                  </>
                ) : (
                  <>
                    Ver todos los Proyectos ({projects.length}) <ChevronDown className="ml-2" size={20} />
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal width="100%" delay={300}>
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Todos estos proyectos están desplegados y funcionales en Netlify y Google Cloud.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ============================================================
          MODAL DE DETALLES DEL PROYECTO
      ============================================================ */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Contenedor del Modal */}
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Botón Cerrar Flotante */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-all z-10 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Cerrar detalles del proyecto"
            >
              <X size={20} />
            </button>

            {/* Imagen Principal (Header del Modal) */}
            <div className="relative h-64 sm:h-80 w-full flex-shrink-0 bg-slate-200">
               <img 
                 src={selectedProject.image} 
                 alt="" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                 <div className="p-6 text-white w-full">
                   <h3 id="project-modal-title" className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                   <div className="flex flex-wrap gap-2">
                     {selectedProject.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium border border-white/30">
                         {tag}
                       </span>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

            {/* Cuerpo del Modal */}
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Descripción Extendida */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-primary-500 pl-3">
                  Sobre el proyecto
                </h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Lista de Características (si existen) */}
              {selectedProject.features && selectedProject.features.length > 0 && (
                <div className="bg-secondary-50 rounded-xl p-6 border border-secondary-100">
                  <h4 className="text-lg font-bold text-secondary-900 mb-4">Características Clave</h4>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-slate-700">
                        <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer / Botones de Acción */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
                 <button 
                   onClick={() => setSelectedProject(null)}
                   className="px-6 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors focus:outline-none focus:ring-4 focus:ring-slate-100"
                 >
                   Cerrar
                 </button>
                 <a 
                   href={selectedProject.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-300"
                 >
                   Visitar Sitio Web <ExternalLink size={18} className="ml-2" aria-hidden="true" />
                 </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;
