import React from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Se mantiene para compatibilidad de tipos con los archivos existentes
}

/**
 * Componente ScrollReveal (Modificado)
 * Se ha eliminado el efecto de animación "fade-in/slide-up" al hacer scroll.
 * Ahora este componente actúa simplemente como un contenedor pasivo (div)
 * para mantener la estructura del layout sin aplicar efectos visuales.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, width = "fit-content" }) => {
  return (
    <div style={{ width }}>
      {children}
    </div>
  );
};
