import React from 'react';
import { personalInfo } from '../data';
import { Mail, Phone, Linkedin, MapPin, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Contáctame</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md">
              Estoy disponible para proyectos freelance o contratación. 
              Si tienes alguna propuesta o simplemente quieres saludar, no dudes en escribirme.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center text-slate-300">
                <MapPin className="mr-4 text-primary-500" size={20} />
                <span>{personalInfo.location}</span>
              </div>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center text-slate-300 hover:text-white transition-colors">
                <Phone className="mr-4 text-primary-500" size={20} />
                <span>{personalInfo.phone}</span>
              </a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center text-slate-300 hover:text-white transition-colors">
                <Mail className="mr-4 text-primary-500" size={20} />
                <span>{personalInfo.email}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center items-start md:items-end">
             <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full md:w-auto">
                <h3 className="text-xl font-bold mb-4">Conectemos en LinkedIn</h3>
                <p className="text-slate-400 mb-6 text-sm">
                  Mira mi trayectoria profesional completa y mi red de contactos.
                </p>
                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all"
                >
                  <Linkedin className="mr-2" size={20} />
                  Ver Perfil LinkedIn
                </a>
             </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 mt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.</p>
          <p className="mt-2">Diseñado con React & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;