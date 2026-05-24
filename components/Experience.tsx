import React from 'react';
import { experiences } from '../data';
import { Briefcase, Building2, Globe, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { GlowingEffect } from './ui/glowing-effect';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Building2': return <Building2 size={24} className="text-blue-400" />;
    case 'Briefcase': return <Briefcase size={24} className="text-indigo-400" />;
    case 'Globe': return <Globe size={24} className="text-emerald-400" />;
    default: return <Briefcase size={24} className="text-primary-400" />;
  }
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 bg-zinc-950/40 scroll-mt-20 relative">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal width="100%">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900/30 border border-primary-700/50 mb-6">
              <Briefcase className="text-primary-500" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Experiencia Laboral</h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-2xl mx-auto">
              Trayectoria profesional y práctica en desarrollo de software
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} width="100%" delay={index * 150}>
              <div className="group relative rounded-2xl border border-white/10 p-1 md:rounded-3xl hover:border-primary-700/50 transition-colors duration-300 h-full cursor-target">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
                <div className="relative bg-zinc-950/50 p-6 sm:p-8 rounded-xl backdrop-blur-sm h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="bg-black/50 p-3 rounded-xl border border-white/10 shadow-inner flex-shrink-0">
                      {getIcon(exp.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300 leading-tight">
                        {exp.role}
                      </h3>
                      <p className="text-primary-400 font-medium text-sm mt-1">{exp.company}</p>
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 mb-5 text-sm text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-zinc-500" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-zinc-500" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Period badge */}
                  <div className="mb-5">
                    <span className="text-xs font-semibold px-3 py-1.5 bg-primary-900/30 text-primary-300 border border-primary-700/50 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2.5 flex-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-zinc-300 text-sm leading-relaxed">
                        <CheckCircle2 size={16} className="text-secondary-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
