import React, { useState } from 'react';
import { personalInfo } from '../data';
import { ChevronRight, MessageCircle, Mail, X } from 'lucide-react';

/**
 * Componente Hero
 * Es la sección principal de bienvenida (Landing).
 * Contiene la presentación y el modal de contacto.
 */
const Hero: React.FC = () => {
  // Estado para controlar la visibilidad de la ventana emergente (modal)
  const [showModal, setShowModal] = useState(false);

  // Función para construir el enlace de WhatsApp
  const handleWhatsappClick = () => {
    const phoneNumber = "523322235248"; 
    const message = "Hola Leonardo, vi tu portafolio y me gustaría contactarte.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setShowModal(false);
  };

  // Función para construir el enlace de Correo (mailto)
  const handleEmailClick = () => {
    const email = "leoeligr10@gmail.com";
    const subject = "Contacto desde Portafolio Profesional";
    const body = "Hola Leonardo,\n\nMe interesa tu perfil profesional...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowModal(false);
  };

  // Función para scroll suave al perfil
  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Agregamos 'scroll-mt-20' para que si se navega aquí, respete el espacio del header
    <section id="home" className="relative bg-secondary-50 pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtítulo pequeño */}
          <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-4">
            Portafolio Profesional
          </h2>
          
          {/* Título Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6">
            Hola, soy <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">
              {personalInfo.name}
            </span>
          </h1>
          
          {/* Descripción breve */}
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            {personalInfo.role}. Apasionado por el desarrollo web, la optimización y la creación de soluciones digitales funcionales.
          </p>
          
          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* Botón de Contacto: Abre el modal */}
            <button 
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/30 cursor-pointer"
            >
              Contactarme <ChevronRight size={20} className="ml-2" />
            </button>
            
            {/* Botón que lleva a la sección Sobre Mí (Perfil) con scroll suave */}
            <a 
              href="#about"
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Ver Perfil
            </a>
          </div>
        </div>
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* VENTANA EMERGENTE (MODAL) DE CONTACTO */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold text-slate-800 mb-2 text-center">Contáctame</h3>
            <p className="text-slate-500 text-center mb-6">Elige tu medio preferido:</p>

            <div className="space-y-3">
              <button 
                onClick={handleWhatsappClick}
                className="w-full flex items-center justify-center px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg group"
              >
                <MessageCircle className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                WhatsApp
              </button>

              <button 
                onClick={handleEmailClick}
                className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-slate-100 hover:border-primary-500 hover:text-primary-600 text-slate-700 rounded-xl font-medium transition-all group"
              >
                <Mail className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                Enviar Correo
              </button>
            </div>
            
            <p className="text-xs text-slate-400 text-center mt-6">
              Responderé lo antes posible.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;