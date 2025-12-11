
import React, { useState, useEffect, useCallback } from 'react';
import { personalInfo } from '../data';
import { ChevronRight, MessageCircle, Mail, X, Download, FileText, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
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
  const [showCvModal, setShowCvModal] = useState(false);

  // Estado para mostrar mensaje de retroalimentación temporal en contacto
  const [contactStatus, setContactStatus] = useState<string | null>(null);

  // Estado para el proceso de descarga del CV ('idle' | 'loading' | 'success' | 'error')
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // --- Manejo de la tecla Escape para cerrar modales ---
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (downloadStatus !== 'loading') { // Prevenir cierre accidental durante carga
        setShowContactModal(false);
        setShowCvModal(false);
      }
    }
  }, [downloadStatus]);

  useEffect(() => {
    if (showContactModal || showCvModal) {
      document.addEventListener('keydown', handleKeyDown);
      // Bloquear scroll al abrir modal
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal, showCvModal, handleKeyDown]);

  // Resetear estados al cerrar modales
  useEffect(() => {
    if (!showCvModal) {
      // Pequeño timeout para resetear visualmente después de que cierre la animación
      const timer = setTimeout(() => setDownloadStatus('idle'), 300);
      return () => clearTimeout(timer);
    }
  }, [showCvModal]);


  // --- Lógica del Efecto Typewriter (Máquina de escribir) ---
  const roles = [
    "Estudiante de Ingeniería en Computación", 
    "Desarrollador Full Stack en formación",      
    "Entusiasta de la Tecnología",
    "Creador de Soluciones Digitales"
  ];
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      // Velocidad dinámica
      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        // Pausa al terminar de escribir una frase completa
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        // Pasar a la siguiente frase
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);


  // Función para construir el enlace de WhatsApp
  const handleWhatsappClick = () => {
    const phoneNumber = "523322235248"; 
    const message = "Hola Leonardo, vi tu portafolio y me gustaría contactarte.";
    
    // Mostrar mensaje de éxito
    setContactStatus("Abriendo WhatsApp...");
    
    // Abrir enlace
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Cerrar modal después de 2 segundos
    setTimeout(() => {
      setShowContactModal(false);
      setContactStatus(null);
    }, 2000);
  };

  // Función para construir el enlace de Correo (mailto)
  const handleEmailClick = () => {
    const email = "leoeligr10@gmail.com";
    const subject = "Contacto desde Portafolio Profesional";
    const body = "Hola Leonardo,\n\nMe interesa tu perfil profesional...";
    
    // Mostrar mensaje de éxito
    setContactStatus("Abriendo cliente de correo...");

    // Abrir cliente de correo
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Cerrar modal después de 2 segundos
    setTimeout(() => {
      setShowContactModal(false);
      setContactStatus(null);
    }, 2000);
  };

  // Función para manejar la descarga del CV con feedback visual
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>, fileName: string, fileUrl: string) => {
    e.preventDefault(); // Prevenir navegación inmediata
    setDownloadStatus('loading');

    // Simular tiempo de preparación de descarga (mejor UX)
    setTimeout(() => {
      try {
        // Crear enlace temporal para forzar la descarga
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadStatus('success');

        // Cerrar modal después de mostrar el mensaje de éxito
        setTimeout(() => {
          setShowCvModal(false);
        }, 1500);
      } catch (error) {
        console.error("Error downloading file:", error);
        setDownloadStatus('error');
        // Resetear a idle después de un momento para permitir reintentar
        setTimeout(() => setDownloadStatus('idle'), 2000);
      }
    }, 1500); // 1.5s de simulación de carga
  };

  // Resetear estado al abrir modal de contacto
  const openContactModal = () => {
    setContactStatus(null);
    setShowContactModal(true);
  };

  return (
    // Agregamos 'scroll-mt-20' para que si se navega aquí, respete el espacio del header
    <section id="home" className="relative bg-white pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden scroll-mt-20">
      
      {/* --- FONDO DE CUADRÍCULA (TECH GRID) --- */}
      <div className="absolute inset-0 z-0">
         {/* Patrón de grilla SVG */}
         <svg className="absolute inset-0 w-full h-full text-slate-100" aria-hidden="true">
            <defs>
               <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
               </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
         </svg>
         {/* Degradado para suavizar los bordes */}
         <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
          
          <ScrollReveal delay={200}>
            {/* Título Principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 text-center">
              Hola, soy <br/>
              {/* Se eliminó el degradado/difuminación, ahora es color sólido */}
              <span className="text-primary-600">
                {personalInfo.name}
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            {/* Descripción breve con Efecto Typewriter */}
            <div className="h-20 sm:h-16 mb-6 flex items-center justify-center">
              <p className="text-lg sm:text-2xl md:text-3xl text-slate-600 font-medium leading-relaxed text-center" aria-live="polite">
                <span className="mr-2">Soy</span>
                <span className="text-primary-600 font-bold border-r-4 border-primary-500 pr-1 animate-pulse">
                  {text}
                </span>
              </p>
            </div>
            
            <p className="text-slate-500 mb-10 max-w-2xl mx-auto text-lg">
              Aprender. Crear. Innovar.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            {/* GRUPO DE BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center w-full sm:w-auto">
              
              {/* 1. Botón de Contacto */}
              <button 
                onClick={openContactModal}
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-primary-300"
              >
                Contactarme <ChevronRight size={20} className="ml-2" />
              </button>
              
              {/* 2. Botón de Descarga CV */}
              <button 
                onClick={() => setShowCvModal(true)}
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-lg font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow-md w-full sm:w-auto focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                Descargar CV
                <Download size={20} className="ml-2" />
              </button>

            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Elementos decorativos de fondo (Manchas sutiles) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-[100px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-indigo-200 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

      {/* ============================================================
          VENTANA EMERGENTE (MODAL) DE CONTACTO 
      ============================================================ */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-10 p-1 rounded-full focus:outline-none focus:bg-slate-100"
              aria-label="Cerrar modal de contacto"
            >
              <X size={24} />
            </button>

            {contactStatus ? (
              <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 text-center">{contactStatus}</h3>
              </div>
            ) : (
              <>
                <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 bg-primary-50 rounded-full text-primary-600">
                    <MessageCircle size={32} />
                </div>

                <h3 id="contact-modal-title" className="text-2xl font-bold text-slate-800 mb-2 text-center">Contáctame</h3>
                <p className="text-slate-500 text-center mb-6">Elige tu medio preferido:</p>

                <div className="space-y-3">
                  <button 
                    onClick={handleWhatsappClick}
                    className="w-full flex items-center justify-center px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg group focus:outline-none focus:ring-4 focus:ring-green-200"
                  >
                    <MessageCircle className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                    WhatsApp
                  </button>

                  <button 
                    onClick={handleEmailClick}
                    className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-slate-100 hover:border-primary-500 hover:text-primary-600 text-slate-700 rounded-xl font-medium transition-all group focus:outline-none focus:ring-4 focus:ring-primary-100"
                  >
                    <Mail className="mr-3 group-hover:scale-110 transition-transform" size={24} />
                    Enviar Correo
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
          VENTANA EMERGENTE (MODAL) DE DESCARGA DE CV 
      ============================================================ */}
      {showCvModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-modal-title"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200 overflow-hidden min-h-[400px] flex flex-col justify-center">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>

            <button 
              onClick={() => setShowCvModal(false)}
              disabled={downloadStatus === 'loading'}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Cerrar modal de descarga"
            >
              <X size={20} />
            </button>

            {/* CONTENIDO CONDICIONAL SEGÚN ESTADO DE DESCARGA */}
            {downloadStatus === 'idle' ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center">
                      <FileText className="text-primary-600" size={32} />
                  </div>
                  
                  <h3 id="cv-modal-title" className="text-2xl font-bold text-slate-800">Descargar Currículum</h3>
                  <p className="text-slate-500 mt-2 text-sm">Selecciona el idioma del documento</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href="/cv-espanol.pdf" 
                    onClick={(e) => handleDownload(e, "CV_Leonardo_Gonzalez_ES.pdf", "/cv-espanol.pdf")}
                    className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary-500 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200"
                    aria-label="Descargar Currículum en Español"
                  >
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">🇲🇽</div>
                    <span className="font-bold text-slate-800 group-hover:text-primary-700 transition-colors">Español</span>
                    <span className="text-xs text-slate-500 mt-1 mb-3">Formato PDF</span>
                    
                    <div className="flex items-center text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Descargar <Download size={14} className="ml-1" />
                    </div>
                  </a>

                  <a 
                    href="/cv-english.pdf" 
                    onClick={(e) => handleDownload(e, "CV_Leonardo_Gonzalez_EN.pdf", "/cv-english.pdf")}
                    className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-slate-100 bg-slate-50/50 hover:bg-white hover:border-primary-500 hover:shadow-xl hover:scale-105 transition-all duration-300 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary-200"
                    aria-label="Download CV in English"
                  >
                    <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 select-none">🇺🇸</div>
                    <span className="font-bold text-slate-800 group-hover:text-primary-700 transition-colors">English</span>
                    <span className="text-xs text-slate-500 mt-1 mb-3">PDF Format</span>
                    
                    <div className="flex items-center text-xs font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Download <Download size={14} className="ml-1" />
                    </div>
                  </a>
                </div>
                
                <p className="text-xs text-slate-400 text-center mt-8">
                  Documento actualizado a {new Date().getFullYear()}
                </p>
              </>
            ) : (
              // VISTA DE ESTADO (CARGANDO / ÉXITO / ERROR)
              <div className="flex flex-col items-center justify-center animate-in fade-in duration-300 py-8">
                
                {downloadStatus === 'loading' && (
                  <>
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-primary-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <Loader2 className="relative z-10 text-primary-600 animate-spin" size={64} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Descargando...</h3>
                    <p className="text-slate-500">Por favor espera un momento</p>
                  </>
                )}

                {downloadStatus === 'success' && (
                  <>
                    <div className="relative mb-6">
                       <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50"></div>
                       <CheckCircle className="relative z-10 text-green-500 animate-in zoom-in duration-300" size={64} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">¡Descarga Completada!</h3>
                    <p className="text-slate-500">Gracias por tu interés</p>
                  </>
                )}

                {downloadStatus === 'error' && (
                  <>
                    <div className="relative mb-6">
                       <div className="absolute inset-0 bg-red-100 rounded-full blur-xl opacity-50"></div>
                       <AlertCircle className="relative z-10 text-red-500 animate-in zoom-in duration-300" size={64} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Error en la descarga</h3>
                    <p className="text-slate-500">Por favor intenta de nuevo</p>
                  </>
                )}

              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default Hero;
