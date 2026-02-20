import React, { useState } from 'react';
import { projects } from '../data';
import { ScrollReveal } from './ScrollReveal';
import InfiniteMenu from './ui/InfiniteMenu';
import { useMediaQuery } from '../hooks/use-media-query';
import { ExternalLink } from 'lucide-react';

/**
 * Componente Projects (Proyectos)
 * Muestra los proyectos destacados utilizando un menú infinito 3D en escritorio
 * y una lista vertical optimizada en móviles.
 */
const Projects: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [showAllProjects, setShowAllProjects] = useState(false);

  const items = projects.map((project) => ({
    image: project.image,
    link: project.url,
    title: project.title,
    description: project.description
  }));

  const mobileProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-20 bg-transparent scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Proyectos Personales</h2>
            <p className="mt-4 text-xl text-zinc-400">
              Una colección de mis trabajos más recientes.
            </p>
          </div>
        </ScrollReveal>

        {/*
          Renderizado Condicional:
          - Desktop (lg): InfiniteMenu 3D
          - Mobile/Tablet: Lista Vertical de Tarjetas
        */}
        {isDesktop ? (
          <div className="w-full justify-center flex">
            <div className="relative w-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3 h-[600px] overflow-hidden">
              {/* GlowingEffect is removed as per the provided code edit */}
              <div className="relative bg-zinc-950/30 w-full h-full rounded-xl backdrop-blur-sm overflow-hidden">
                <InfiniteMenu items={items} scale={1} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mobileProjects.map((project, index) => (
                <ScrollReveal key={index} width="100%" delay={index * 100}>
                  <div className="group relative rounded-2xl bg-zinc-900/50 border border-white/10 overflow-hidden hover:border-primary-500/50 transition-colors duration-300">
                    {/* Imagen */}
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* Contenido */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
                      >
                        Ver Proyecto <ExternalLink size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {projects.length > 3 && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                >
                  {showAllProjects ? 'Ver menos' : 'Ver más proyectos'}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;

