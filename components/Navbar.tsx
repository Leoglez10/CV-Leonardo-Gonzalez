
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Componente Navbar (Barra de Navegación)
 * Este componente maneja la navegación principal del sitio.
 * Se ha mejorado para usar desplazamiento suave e indicar la sección activa.
 * Incluye mejoras de accesibilidad (ARIA).
 */
const Navbar: React.FC = () => {
  // Estado para controlar la visibilidad del menú en dispositivos móviles
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado para saber cuál es la sección activa actual
  const [activeSection, setActiveSection] = useState('home');

  // Lista de enlaces de navegación.
  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Perfil', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Competencias', href: '#skills' },
    { name: 'Contacto', href: '#contact' },
  ];

  // Efecto para detectar el scroll y actualizar la sección activa
  useEffect(() => {
    const handleScroll = () => {
      // Obtenemos la posición actual del scroll + un offset para la barra
      const scrollPosition = window.scrollY + 100;

      // Iteramos sobre las secciones para ver cuál está visible
      navLinks.forEach((link) => {
        const sectionId = link.href.replace('#', '');
        const section = document.getElementById(sectionId);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Llamamos una vez al montar para setear el estado inicial
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para manejar el clic en los enlaces y hacer scroll suave
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Evita el comportamiento por defecto del enlace (salto brusco)
    
    const targetId = href.replace('#', ''); // Obtiene el ID sin el #
    const element = document.getElementById(targetId);
    
    if (element) {
      // Realiza el desplazamiento suave hacia el elemento
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Cierra el menú móvil si estaba abierto
      setIsOpen(false);
      // Actualizamos manualmente para feedback inmediato
      setActiveSection(targetId);
    }
  };

  return (
    // 'sticky top-0' mantiene la barra pegada arriba al hacer scroll
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all duration-300" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logotipo o Nombre */}
          <div className="flex-shrink-0 flex items-center">
            {/* También aplicamos el scroll suave al logo para ir al inicio */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-xl font-bold text-slate-800 tracking-tight cursor-pointer group"
              aria-label="Ir al inicio - Leonardo Gonzalez"
            >
              LE<span className="text-primary-600 group-hover:text-primary-500 transition-colors">GR</span>.
            </a>
          </div>
          
          {/* Menú para Escritorio (oculto en móviles) */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer relative focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    isActive 
                      ? 'text-primary-600 font-semibold' 
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {/* Indicador visual (punto) para el enlace activo */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full mb-1"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Botón de Menú para Móviles (Hamburguesa) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)} // Alternar estado abierto/cerrado
              className="text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2 rounded-md"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Panel del Menú Móvil (se muestra solo si isOpen es true) */}
      {isOpen && (
        <div 
          id="mobile-menu"
          className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg h-screen sm:h-auto animate-in slide-in-from-top-5 duration-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-3 py-4 rounded-md text-base font-medium border-b border-slate-50 last:border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${
                    isActive
                      ? 'text-primary-700 bg-primary-50 border-l-4 border-l-primary-600'
                      : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
