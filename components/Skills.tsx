
import React from 'react';
import { skillCategories, softSkills } from '../data';
import { BrainCircuit, CheckCircle2, Layout, Server, Database, Cpu } from 'lucide-react';

/**
 * Componente Skills (Competencias)
 * Muestra las habilidades técnicas agrupadas por categorías en tarjetas modernas
 * y las habilidades blandas en una lista lateral.
 */
const Skills: React.FC = () => {

  // Mapeo de strings a componentes de iconos reales de Lucide
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout size={28} className="text-blue-500" />;
      case 'Server': return <Server size={28} className="text-indigo-500" />;
      case 'Database': return <Database size={28} className="text-emerald-500" />;
      case 'Cpu': return <Cpu size={28} className="text-purple-500" />;
      default: return <Layout size={28} />;
    }
  };

  return (
    // 'scroll-mt-20' para ajuste de scroll al navegar desde el menú
    <section id="skills" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Competencias</h2>
          <p className="mt-4 text-xl text-slate-500">
            Stack tecnológico y habilidades profesionales.
          </p>
        </div>

        {/* CONTENEDOR PRINCIPAL: Grid con Habilidades Técnicas a la izquierda (o arriba en móvil) y Soft Skills abajo/derecha */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* COLUMNA IZQUIERDA: Habilidades Técnicas (Ecosistema Tech) */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <span className="bg-primary-100 p-2 rounded-lg mr-3">
                <Cpu size={24} className="text-primary-600" />
              </span>
              Tecnologías y Lenguajes
            </h3>

            {/* Grid de Tarjetas (Frontend, Backend, etc.) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map((category) => (
                <div 
                  key={category.id} 
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Encabezado de la Tarjeta */}
                  <div className="flex items-center mb-4 pb-3 border-b border-slate-200">
                    <div className="bg-white p-2 rounded-lg shadow-sm mr-3 group-hover:scale-110 transition-transform">
                      {getIcon(category.iconName)}
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">{category.title}</h4>
                  </div>

                  {/* Lista de Habilidades dentro de la categoría */}
                  <div className="space-y-4">
                    {category.skills.map((skill, idx) => (
                      <div key={idx} className="relative">
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-semibold text-slate-700">{skill.name}</span>
                          {skill.level && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white text-slate-500 border border-slate-200 shadow-sm">
                              {skill.level}
                            </span>
                          )}
                        </div>
                        {/* Descripción extra (ej: detalles de SQL) */}
                        {skill.description && (
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed bg-white/50 p-2 rounded-md border border-slate-100/50">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: Habilidades Blandas (Soft Skills) */}
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
              <span className="bg-secondary-100 p-2 rounded-lg mr-3">
                <BrainCircuit size={24} className="text-secondary-600" />
              </span>
              Habilidades Blandas
            </h3>
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="space-y-4">
                {softSkills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex items-start group"
                  >
                    <CheckCircle2 className="text-primary-500 mt-0.5 mr-3 flex-shrink-0 group-hover:text-primary-600 transition-colors" size={20} />
                    <span className="text-slate-700 font-medium group-hover:translate-x-1 transition-transform duration-200">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Nota decorativa al final */}
              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-400 italic">
                  "Siempre aprendiendo, siempre mejorando."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
