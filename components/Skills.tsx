import React, { useState } from 'react';
import { skillCategories, softSkills } from '../data';
import { BrainCircuit, CheckCircle2, Code2, Server, Database, Terminal } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import CardSwap, { Card } from './ui/CardSwap';
import MetaBalls from './ui/MetaBalls';
import { useMediaQuery } from '../hooks/use-media-query';
import { GlowingEffect } from './ui/glowing-effect';

/**
 * Componente Skills (Competencias)
 * Muestra las habilidades técnicas y blandas utilizando un CardSwap interactivo en escritorio
 * y un grid optimizado en móviles.
 */
const Skills: React.FC = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Mapeo de strings a componentes de iconos reales de Lucide
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 size={28} className="text-blue-400" />;
      case 'Server': return <Server size={28} className="text-indigo-400" />;
      case 'Database': return <Database size={28} className="text-emerald-400" />;
      case 'Terminal': return <Terminal size={28} className="text-purple-400" />;
      default: return <Code2 size={28} />;
    }
  };

  return (
    // 'scroll-mt-20' para ajuste de scroll al navegar desde el menú
    <section id="skills" className="py-20 bg-zinc-950/40 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Encabezado de la sección */}
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Competencias</h2>
            <p className="mt-4 text-xl text-zinc-400">
              Stack tecnológico y habilidades profesionales.
            </p>
          </div>
        </ScrollReveal>

        {isDesktop ? (
          // --- VISTA ESCRITORIO (MetaBalls + CardSwap) ---
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[600px]">

            {/* Columna Izquierda: MetaBalls Animation */}
            <div className="hidden lg:flex justify-center items-center h-full w-full relative overflow-hidden rounded-3xl bg-zinc-900/30 border border-white/10 min-h-[500px]">
              <MetaBalls
                color="#5227ff"
                cursorBallColor="#ffffff"
                cursorBallSize={2}
                ballCount={15}
                animationSize={30}
                enableMouseInteraction
                enableTransparency={true}
                hoverSmoothness={0.15}
                clumpFactor={1}
                speed={0.3}
              />
            </div>

            {/* Columna Derecha: CardSwap */}
            <div className="flex justify-center lg:justify-end items-center h-full w-full relative overflow-visible lg:translate-y-16">
              <CardSwap
                cardDistance={60}
                verticalDistance={70}
                delay={4000}
                pauseOnHover={true}
                width="360px"
                height="480px"
              >
                {/* Technical Skill Categories as Cards */}
                {skillCategories.map((category) => (
                  <Card key={category.id} customClass="bg-zinc-900 border-zinc-700 p-6 flex flex-col items-center justify-center text-center shadow-2xl">
                    <div className="bg-black/50 p-4 rounded-full mb-4 border border-white/10 shadow-inner">
                      {getIcon(category.iconName)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                    <ul className="space-y-3 w-full text-left">
                      {category.skills.map((skill, idx) => (
                        <li key={idx} className="bg-white/5 rounded-lg p-2 border border-white/5">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-zinc-200 text-sm">{skill.name}</span>
                            {skill.level && <span className="text-[10px] bg-primary-900/50 text-primary-200 px-2 py-0.5 rounded-full">{skill.level}</span>}
                          </div>
                          {skill.description && <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">{skill.description}</p>}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}

                {/* Soft Skills Card */}
                <Card customClass="bg-zinc-900 border-zinc-700 p-6 flex flex-col items-center shadow-2xl">
                  <div className="bg-secondary-900/30 p-4 rounded-full mb-4 border border-white/10">
                    <BrainCircuit size={28} className="text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6">Habilidades Blandas</h3>
                  <ul className="space-y-3 w-full">
                    {softSkills.map((skill, idx) => (
                      <li key={idx} className="flex items-center text-zinc-300">
                        <CheckCircle2 size={16} className="text-secondary-500 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 text-center">
                    <p className="text-xs text-zinc-400 italic">"Siempre aprendiendo."</p>
                  </div>
                </Card>

              </CardSwap>
            </div>
          </div>
        ) : (
          // --- VISTA MÓVIL (Grid de Tarjetas) ---
          <div className="space-y-12">
            {/* Tech Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category, index) => (
                <ScrollReveal key={category.id} width="100%" delay={index * 100}>
                  <div className="relative rounded-2xl border border-white/10 p-1 bg-zinc-900/50 overflow-hidden">
                    <div className="relative bg-zinc-950/80 backdrop-blur-sm rounded-xl p-6 h-full">
                      <div className="flex items-center mb-4 pb-3 border-b border-white/10">
                        <div className="bg-black p-2 rounded-lg shadow-sm mr-3 border border-white/10">
                          {getIcon(category.iconName)}
                        </div>
                        <h3 className="text-lg font-bold text-white">{category.title}</h3>
                      </div>
                      <ul className="space-y-3">
                        {category.skills.map((skill, idx) => (
                          <li key={idx}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-zinc-300 text-sm">{skill.name}</span>
                              {skill.level && <span className="text-[10px] bg-primary-900/30 text-primary-200 px-2 py-0.5 rounded-full border border-primary-500/20">{skill.level}</span>}
                            </div>
                            {skill.description && <p className="text-xs text-zinc-400 line-clamp-2">{skill.description}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Soft Skills Section */}
            <ScrollReveal width="100%" delay={300}>
              <div className="relative rounded-2xl border border-white/10 p-1 bg-secondary-900/10 overflow-hidden">
                <div className="relative bg-zinc-950/80 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-secondary-900/30 p-2 rounded-lg mr-3 border border-secondary-500/20">
                      <BrainCircuit size={24} className="text-secondary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Habilidades Blandas</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {softSkills.map((skill, idx) => (
                      <div key={idx} className="flex items-center text-zinc-300 bg-white/5 p-3 rounded-lg border border-white/5">
                        <CheckCircle2 size={18} className="text-secondary-500 mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;
