
import React, { useState, useEffect } from 'react';
import { Accessibility, Type, Sun, ZapOff, Eye, RotateCcw, X } from 'lucide-react';

/**
 * Componente AccessibilityMenu
 * Proporciona un menú flotante para ajustar configuraciones de accesibilidad
 * como tamaño de fuente, contraste y movimiento.
 */
const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    largeText: false,
    highContrast: false,
    reduceMotion: false,
    grayscale: false
  });
  const menuRef = React.useRef<HTMLDivElement>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      const firstFocusable = menuRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const html = document.documentElement;

    if (settings.largeText) html.classList.add('text-large');
    else html.classList.remove('text-large');

    if (settings.highContrast) html.classList.add('high-contrast');
    else html.classList.remove('high-contrast');

    if (settings.reduceMotion) html.classList.add('reduce-motion');
    else html.classList.remove('reduce-motion');

    if (settings.grayscale) html.classList.add('grayscale-mode');
    else html.classList.remove('grayscale-mode');
  }, [settings]);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetSettings = () => {
    setSettings({
      largeText: false,
      highContrast: false,
      reduceMotion: false,
      grayscale: false
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      {/* Botón Flotante Principal */}
      <button
        ref={menuButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-primary-500 transition-transform hover:scale-105"
        aria-label="Opciones de Accesibilidad"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="accessibility-menu"
      >
        <Accessibility size={24} aria-hidden="true" />
      </button>

      {/* Menú de Opciones */}
      {isOpen && (
        <div
          ref={menuRef}
          id="accessibility-menu"
          className="absolute bottom-16 left-0 bg-zinc-950 border border-white/10 shadow-2xl rounded-xl p-4 w-64 animate-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Herramientas de accesibilidad"
        >
          <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Accessibility size={18} /> Accesibilidad
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-500 hover:text-white p-1 rounded-md focus:bg-white/10"
              aria-label="Cerrar menú de accesibilidad"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => toggleSetting('largeText')}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${settings.largeText ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50' : 'hover:bg-white/10 text-zinc-300'
                }`}
            >
              <span className="flex items-center gap-3"><Type size={18} /> Texto Grande</span>
              <div className={`w-4 h-4 rounded-full border ${settings.largeText ? 'bg-primary-500 border-primary-500' : 'border-zinc-600'}`} />
            </button>

            <button
              onClick={() => toggleSetting('highContrast')}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${settings.highContrast ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50' : 'hover:bg-white/10 text-zinc-300'
                }`}
            >
              <span className="flex items-center gap-3"><Sun size={18} /> Alto Contraste</span>
              <div className={`w-4 h-4 rounded-full border ${settings.highContrast ? 'bg-primary-500 border-primary-500' : 'border-zinc-600'}`} />
            </button>

            <button
              onClick={() => toggleSetting('grayscale')}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${settings.grayscale ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50' : 'hover:bg-white/10 text-zinc-300'
                }`}
            >
              <span className="flex items-center gap-3"><Eye size={18} /> Escala de Grises</span>
              <div className={`w-4 h-4 rounded-full border ${settings.grayscale ? 'bg-primary-500 border-primary-500' : 'border-zinc-600'}`} />
            </button>

            <button
              onClick={() => toggleSetting('reduceMotion')}
              className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${settings.reduceMotion ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50' : 'hover:bg-white/10 text-zinc-300'
                }`}
            >
              <span className="flex items-center gap-3"><ZapOff size={18} /> Reducir Movimiento</span>
              <div className={`w-4 h-4 rounded-full border ${settings.reduceMotion ? 'bg-primary-500 border-primary-500' : 'border-zinc-600'}`} />
            </button>

            <button
              onClick={resetSettings}
              className="w-full flex items-center justify-center gap-2 p-2 mt-2 text-sm text-zinc-500 hover:text-white hover:bg-white/10 rounded-lg border border-transparent hover:border-white/10 transition-all"
            >
              <RotateCcw size={14} /> Restablecer todo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityMenu;
