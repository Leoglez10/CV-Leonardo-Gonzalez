import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'LEGR.', href: '#home' },
    { name: 'Perfil', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Competencias', href: '#skills' },
    { name: 'Certificaciones', href: '#certifications' },
    { name: 'Contacto', href: '#cta' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setActiveSection(targetId);
    }
  };

  return (
    <header
      className="fixed z-50 transition-all duration-300 top-0 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl shadow-lg md:top-6 md:w-auto md:left-1/2 md:-translate-x-1/2 md:rounded-full md:border md:border-white/10 md:px-6 md:bg-black/30 md:shadow-2xl md:shadow-primary-900/10"
      role="banner"
    >
      <div className="w-full px-4 md:px-1">
        <div className="flex justify-between h-16 items-center">
          <nav className="hidden md:flex space-x-1 lg:space-x-4 items-center" aria-label="Navegación principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              const isLogo = link.name === 'LEGR.';

              if (isLogo) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="mr-6 text-xl font-bold text-white tracking-tight cursor-pointer group px-3 py-2"
                    aria-label="Ir al inicio - LEGR."
                  >
                    LE<span className="text-primary-600 group-hover:text-primary-500 transition-colors">GR</span>.
                  </a>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer relative ${isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 p-2 rounded-md"
              aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-black border-t border-white/10 absolute w-full shadow-lg h-screen sm:h-auto animate-in slide-in-from-top-5 duration-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              const isLogo = link.name === 'LEGR.';
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`block px-3 py-4 rounded-md text-base font-medium border-b border-white/5 last:border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${isActive ? 'text-primary-400 bg-white/5 border-l-4 border-l-primary-500' : 'text-slate-300 hover:text-white hover:bg-white/5'} ${isLogo ? 'font-bold text-xl tracking-tight' : ''}`}
                >
                  {isLogo ? <>LE<span className="text-primary-600">GR</span>.</> : link.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;