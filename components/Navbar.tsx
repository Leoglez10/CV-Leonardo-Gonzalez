import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Componente Navbar (Barra de Navegación)
 * Este componente maneja la navegación principal del sitio.
 * Se ha mejorado para usar desplazamiento suave mediante JavaScript.
 */
const Navbar: React.FC = () => {
  // Estado para controlar la visibilidad del menú en dispositivos móviles
  const [isOpen, setIsOpen] = useState(false);

  // Lista de enlaces de navegación.
  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Perfil', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Competencias', href: '#skills' },
    { name: 'Contacto', href: '#contact' },
  ];

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
    }
  };

  return (
    // 'sticky top-0' mantiene la barra pegada arriba al hacer scroll
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logotipo o Nombre */}
          <div className="flex-shrink-0 flex items-center">
            {/* También aplicamos el scroll suave al logo para ir al inicio */}
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="text-xl font-bold text-slate-800 tracking-tight cursor-pointer"
            >
              LE<span className="text-primary-600">GR</span>.
            </a>
          </div>
          
          {/* Menú para Escritorio (oculto en móviles) */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Botón de Menú para Móviles (Hamburguesa) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)} // Alternar estado abierto/cerrado
              className="text-slate-600 hover:text-slate-900 focus:outline-none p-2"
              aria-label="Abrir menú de navegación"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Panel del Menú Móvil (se muestra solo si isOpen es true) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg h-screen sm:h-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-slate-600 hover:text-primary-600 hover:bg-slate-50 block px-3 py-4 rounded-md text-base font-medium border-b border-slate-50 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;