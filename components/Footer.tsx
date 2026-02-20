import React from 'react';
import { personalInfo } from '../data';
import { Github, Linkedin, Instagram, Facebook, Mail, Phone, MapPin, Heart } from 'lucide-react';

/**
 * Componente Footer (Pie de página)
 * Footer profesional con navegación rápida, info de contacto y redes sociales.
 */

const footerNavLinks = [
  { name: 'Inicio', href: '#home' },
  { name: 'Perfil', href: '#about' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Competencias', href: '#skills' },
  { name: 'Certificaciones', href: '#certifications' },
  { name: 'Testimonios', href: '#testimonials' },
];

const socialLinks = [
  { name: 'GitHub', href: personalInfo.github, icon: Github },
  { name: 'LinkedIn', href: personalInfo.linkedin, icon: Linkedin },
  { name: 'Instagram', href: personalInfo.instagram, icon: Instagram },
  { name: 'Facebook', href: personalInfo.facebook, icon: Facebook },
];

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid principal — 3 columnas */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Columna 1 — Branding + Redes */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-block text-2xl font-bold tracking-tight mb-4 group"
            >
              LE<span className="text-primary-600 group-hover:text-primary-500 transition-colors">GR</span>.
            </a>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mb-6">
              {personalInfo.role}. Apasionado por crear soluciones web funcionales,
              modernas y accesibles.
            </p>
            {/* Iconos de redes sociales */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visitar ${social.name}`}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary-400 hover:border-primary-700/50 hover:bg-primary-900/20 transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
              {/* Twitter/X con SVG custom */}
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar X (Twitter)"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary-400 hover:border-primary-700/50 hover:bg-primary-900/20 transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Columna 2 — Enlaces rápidos */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Navegación
            </h3>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-zinc-400 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Contacto rápido */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
              Contacto
            </h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-center gap-3 text-zinc-400 text-sm">
                  <MapPin size={16} className="text-primary-500 shrink-0" />
                  <span>{personalInfo.location}</span>
                </div>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Phone size={16} className="text-primary-500 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-zinc-400 hover:text-white text-sm transition-colors duration-200"
                >
                  <Mail size={16} className="text-primary-500 shrink-0" />
                  <span>{personalInfo.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior de copyright */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-xs">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.
          </p>
          <p className="text-zinc-600 text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-red-500" fill="currentColor" /> usando React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
