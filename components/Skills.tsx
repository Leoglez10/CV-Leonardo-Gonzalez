import React from 'react';
import { techSkills, softSkills } from '../data';
import { Code2, BrainCircuit, CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Competencias</h2>
          <p className="mt-4 text-xl text-slate-500">
            Habilidades técnicas y aptitudes profesionales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Tech Skills */}
          <div>
            <div className="flex items-center mb-8">
              <Code2 className="text-primary-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">Tecnologías y Lenguajes</h3>
            </div>
            
            <div className="space-y-6">
              {techSkills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-slate-700">{skill.name}</span>
                    <span className="text-sm font-medium text-slate-500">{skill.level}/5</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-primary-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <div className="flex items-center mb-8">
              <BrainCircuit className="text-primary-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-slate-800">Habilidades Blandas</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {softSkills.map((skill) => (
                <div 
                  key={skill.name} 
                  className="flex items-start p-4 bg-secondary-50 rounded-xl border border-secondary-100 hover:border-primary-200 transition-colors"
                >
                  <CheckCircle2 className="text-primary-500 mt-0.5 mr-3 flex-shrink-0" size={20} />
                  <span className="text-slate-700 font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;