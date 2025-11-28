import React from 'react';
import { personalInfo } from '../data';
import { Download, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-secondary-50 pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-4">
            Portafolio Profesional
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Hola, soy <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">
              {personalInfo.name}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            {personalInfo.role}. Apasionado por el desarrollo web, la optimización y la creación de soluciones digitales funcionales.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/30"
            >
              Contactarme <ChevronRight size={20} className="ml-2" />
            </a>
            <a 
              href="#about"
              className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm"
            >
              Ver Perfil
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50"></div>
    </section>
  );
};

export default Hero;