import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

/**
 * Componente Principal (App)
 * Estructura la aplicación organizando los componentes en orden vertical.
 * El flujo de la página es:
 * 1. Navbar (Menú superior fijo)
 * 2. Hero (Sección de bienvenida)
 * 3. About (Sobre mí / Perfil)
 * 4. Projects (Galería de proyectos)
 * 5. Skills (Competencias)
 * 6. Contact (Pie de página con contacto)
 */
const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </div>
  );
};

export default App;