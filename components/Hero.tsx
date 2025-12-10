
import React, { useState } from 'react';
import { personalInfo } from '../data';
import { ChevronRight, MessageCircle, Mail, X, Download, FileText, Globe } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

/**
 * Componente Hero
 * Es la sección principal de bienvenida (Landing).
 * Contiene la presentación, el modal de contacto y el modal de descarga de CV.
 */
const Hero: React.FC = () => {
  // Estado para controlar la visibilidad de la ventana emergente de Contacto
  const [showContactModal, setShowContactModal] = useState(false);
  
  // Estado para controlar la visibilidad de la ventana emergente de Descarga de CV
  // (Anteriormente era un menú desplegable, ahora es un modal)
  const [showCvModal, setShowCvModal] = useState(false);

  // Función para construir el enlace de WhatsApp
  const handleWhatsappClick = () => {
    const phoneNumber = "523322235248"; 
    const message = "Hola Leonardo, vi tu portafolio y me gustaría contactarte.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setShowContactModal(false);
  };

  // Función para construir el enlace de Correo (mailto)
  const handleEmailClick = () => {
    const email = "leoeligr10@gmail.com";
    const subject = "Contacto desde Portafolio Profesional";
    const body = "Hola Leonardo,\n\nMe interesa tu perfil profesional...";
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowContactModal(false);
  };

  // Función auxiliar para simular descarga y cerrar el modal
  const handleDownloadDemo = (e: React.MouseEvent<HTMLAnchorElement>, fileName: string) => {
    // Verificamos si es un link de demo (rutas relativas simples)
    if (e.currentTarget.getAttribute('href')?.startsWith('/')) {
        console.log(`Intentando descargar: ${fileName}`);
        // Aquí se iniciaría la descarga real si el archivo existe en la carpeta 'public'
    }
    // Cerramos el modal después de que el usuario elija
    setShowCvModal(false);
  };

  return (
    // Agregamos 'scroll-mt-20' para que si se navega aquí, respete el espacio del header
    <section id="home" className="relative bg-secondary-50 pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          
          <ScrollReveal>
            {/* Subtítulo pequeño */}
            <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-4 text-center">
              Portafolio Profesional
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight mb-6 text-center">
              Hola, soy <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-900">
                {personalInfo.name}
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            {/* Descripción breve */}
            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed text-center">
              {personalInfo.role}. Apasionado por el desarrollo web, la optimización y la creación de soluciones digitales funcionales.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            {/* GRUPO DE BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
              
              {/* 1. Botón de Contacto: Abre el modal de contacto */}
              <button 
                onClick={() => setShowContactModal(true)}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/30 cursor-pointer w-full sm:w-auto"
              >
                Contactarme <ChevronRight size={20} className="ml-2" />
              </button>
              
              {/* 2. Botón de Descarga CV: Abre el modal de selección de idioma */}
              <button 
                onClick={() => setShowCvModal(true)}
                className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 shadow-sm cursor-pointer w-full sm:w-auto"
              >
                Descargar CV
                <Download size={20} className="ml-2" />
              </button>

            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      {/* ============================================================
          VENTANA EMERGENTE (MODAL) DE CONTACTO 
      ============================================================ */}
      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowContactModal(false)}
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
          </div>
        </div>
      )}

      {/* ============================================================
          VENTANA EMERGENTE (MODAL) DE DESCARGA DE CV 
      ============================================================ */}
      {showCvModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setShowCvModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="text-primary-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Descargar CV</h3>
              <p className="text-slate-500 mt-2">Selecciona el idioma del documento</p>
            </div>

            <div className="space-y-3">
              {/* Opción Español */}
              <a 
                href="/cv-espanol.pdf" 
                download="CV_Leonardo_Gonzalez_ES.pdf"
                onClick={(e) => handleDownloadDemo(e, "cv-espanol.pdf")}
                className="w-full flex items-center px-4 py-4 bg-white border border-slate-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 text-slate-700 rounded-xl transition-all group"
              >
                <span className="text-2xl mr-4">🇲🇽</span>
                <div className="text-left">
                  <span className="block font-bold">Versión en Español</span>
                  <span className="text-xs text-slate-400 group-hover:text-primary-500">Formato PDF</span>
                </div>
              </a>

              {/* Opción Inglés */}
              <a 
                href="/cv-english.pdf" 
                download="CV_Leonardo_Gonzalez_EN.pdf"
                onClick={(e) => handleDownloadDemo(e, "cv-english.pdf")}
                className="w-full flex items-center px-4 py-4 bg-white border border-slate-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 text-slate-700 rounded-xl transition-all group"
              >
                <span className="text-2xl mr-4">🇺🇸</span>
                <div className="text-left">
                  <span className="block font-bold">English Version</span>
                  <span className="text-xs text-slate-400 group-hover:text-primary-500">PDF Format</span>
                </div>
              </a>
            </div>
            
            <p className="text-xs text-slate-400 text-center mt-6">
              Ambos archivos contienen la misma información profesional.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
