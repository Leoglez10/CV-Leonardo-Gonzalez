import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Retraso opcional para efectos escalonados
}

/**
 * Componente ScrollReveal
 * Envuelve cualquier contenido y hace que aparezca suavemente (Fade In + Slide Up)
 * cuando entra en el viewport del usuario.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, width = "fit-content", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el elemento es visible, actualizamos el estado
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Una vez visible, dejamos de observar para que no se anime de nuevo al subir
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px", // Margen para que la animación empiece un poco antes de llegar
        threshold: 0.1, // 10% del elemento visible para disparar
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ width, transitionDelay: `${delay}ms` }}
      className={`transform transition-all duration-1000 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};