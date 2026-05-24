import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

/**
 * Componente ScrollReveal
 * Anima los elementos con un efecto fade-in + slide-up al entrar al viewport.
 * Usa Framer Motion `useInView` para detección eficiente.
 * Respeta la preferencia de movimiento reducido del usuario.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, width = "fit-content", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const animationVariant = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : isInView
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 40 };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      initial={{ opacity: 0, y: 40 }}
      animate={animationVariant}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};
