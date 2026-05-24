
import { Project, SkillCategory, Education, SoftSkill, Certification, Testimonial, Experience } from './types';

/**
 * ARCHIVO DE DATOS (Data Source)
 * --------------------------------
 * Este archivo contiene toda la información que se muestra en el portafolio.
 */

// Información personal general
export const personalInfo = {
  name: "Leonardo Elias Gonzalez Rangel",
  role: "Estudiante de Ingeniería en Computación",
  email: "leoeligr10@gmail.com",
  phone: "3322235248",
  location: "Guadalajara, Jalisco",
  linkedin: "https://www.linkedin.com/in/leonardo-elias-gonzalez-rangel-442670289/",
  instagram: "https://www.instagram.com/leoelias.10/",
  facebook: "https://www.facebook.com/leo.elias.505",
  github: "https://github.com/Leoglez10",
  twitter: "https://x.com/leoelias_0",
  about: "Estudiante de Ingeniería en Computación orientado a la arquitectura de software y al desarrollo Full-Stack, con experiencia práctica en aplicaciones web y de escritorio modernas. Apasionado por la inteligencia artificial, soy un usuario activo y promoter del uso de IA para optimizar procesos y mejorar la productividad. Me especializo en depuración de sistemas, mantenimiento de hardware y automatización de flujos de desarrollo. Soy un perfil técnico proactivo, con enfoque en crear soluciones eficientes, escalables y bien ejecutadas."
};

// Experiencia Laboral
export const experiences: Experience[] = [
  {
    id: 1,
    company: "Preparatoria 15 - Universidad de Guadalajara",
    role: "Servicio Social - Desarrollador Full-Stack y Soporte Técnico",
    location: "Guadalajara, México",
    period: "Mar 2026 – Ago 2026",
    duration: "6 meses",
    description: [
      "Desarrollé 2 aplicaciones: sistema de inventario y sistema de préstamo de equipos de cómputo",
      "Soporte técnico integral: mantenimiento de hardware y software, reparación de equipos",
      "Atención a alumnos e instalación de equipos de audio y video",
      "Gestión y generación de reportes automatizados"
    ],
    icon: "Building2"
  },
  {
    id: 2,
    company: "Nexplea S.A. de C.V.",
    role: "Desarrollador Full-Stack",
    location: "Guadalajara, México",
    period: "Feb 2026 – Feb 2026",
    duration: "1 mes",
    description: [
      "Desarrollé sistema de generación de reportes socioeconómicos para clientes de recursos humanos",
      "Implementé autenticación de usuarios, autoguardado en la nube y generación de documentos PDF",
      "Integración con Firebase para manejo de archivos (imágenes y PDFs)",
      "Uso de Docker para despliegue y React con Tailwind CSS para el frontend"
    ],
    icon: "Briefcase"
  },
  {
    id: 3,
    company: "Xignis - Guanajuato Nos Une",
    role: "Desarrollador Frontend",
    location: "Guanajuato, México",
    period: "Abr 2026 – Abr 2026",
    duration: "1 mes",
    description: [
      "Desarrollé página web guanajuatonosune.org para el gobierno de Guanajuato",
      "Implementé formularios y base de datos para recopilación de información ciudadana",
      "Proyecto publicado y mencionado en periódico local"
    ],
    icon: "Globe"
  }
];

// Lista de Proyectos
export const projects: Project[] = [
  {
    id: 9,
    title: "Análisis de Talento Inteligente",
    description: "Transforma CVs complejos en dashboards accionables basados en evidencia real. Optimiza tu proceso de selección sin perder el toque humano.",
    url: "https://hr-intellect-cv-analyzer-mvp-250746262358.us-west1.run.app/",
    tags: ["AI", "Dashboard", "Recruitment", "Analytics"],
    image: "/images/projects/talent-analysis-dashboard.png",
    longDescription: "Una plataforma avanzada que transforma currículums complejos en dashboards visuales y accionables utilizando inteligencia artificial. Diseñada para optimizar el proceso de selección de talento, proporcionando evidencia real y análisis profundo de candidatos sin perder el toque humano esencial en RH.",
    features: [
      "Análisis de CV impulsado por IA",
      "Dashboards interactivos y basados en evidencia",
      "Comparativas de candidatos en tiempo real",
      "Interfaz moderna y optimizada para reclutadores"
    ]
  },
  {
    id: 8,
    title: "Sala de Urgencias (Full Stack)",
    description: "Sistema administrativo completo para urgencias hospitalarias. Gestiona el ingreso y seguimiento de pacientes conectándose a una base de datos real (MySQL).",
    url: "https://saladeurgencias.xo.je/",
    tags: ["MySQL", "Database", "Dashboard", "Data Viz"],
    image: "/images/projects/sala-urgencias.png",
    longDescription: "Una solución integral diseñada para optimizar el flujo de trabajo en una sala de urgencias. El sistema permite al personal médico registrar pacientes, asignar triaje, actualizar estados clínicos en tiempo real y visualizar estadísticas de ocupación. La arquitectura separa la lógica de negocio de la interfaz, asegurando seguridad y escalabilidad.",
    features: [
      "Autenticación segura de usuarios (Médicos/Administrativos)",
      "CRUD completo de Pacientes e Historiales",
      "Dashboard con gráficas de ocupación y tiempos de espera",
      "Conexión persistente a base de datos MySQL remota"
    ]
  },
  {
    id: 7,
    title: "El Impostor (Juego Online)",
    description: "¡Un emocionante juego de estrategia y deducción! Pon a prueba tu astucia para descubrir quién es el impostor en este desafío interactivo.",
    url: "https://el-impostor-839098521388.us-west1.run.app/",
    tags: ["Game Dev", "Google Cloud", "Cloud Run", "Docker"],
    image: "/images/projects/el-impostor.png",
    longDescription: "Juego multijugador asíncrono basado en lógica deductiva. Desarrollado como un experimento para implementar contenedores Docker en Google Cloud Run, garantizando alta disponibilidad y escalabilidad automática según la demanda de jugadores.",
    features: [
      "Despliegue serverless en Google Cloud Run",
      "Contenerización con Docker",
      "Interfaz reactiva y animaciones fluidas",
      "Lógica de juego compleja en el servidor"
    ]
  },
  {
    id: 1,
    title: "Freelancer Personal",
    description: "Página web de portafolio personal diseñada desde cero.",
    url: "https://leo-freelancer-proyect.netlify.app/",
    tags: ["HTML", "CSS", "Responsive Design"],
    image: "/images/projects/freelancer-personal.png",
    longDescription: "Mi primer portafolio profesional, diseñado pixel-perfect para demostrar dominio absoluto de HTML5 y CSS3 moderno sin depender de frameworks. Enfocado en la semántica web y la accesibilidad.",
    features: [
      "Diseño totalmente Responsivo (Mobile First)",
      "Uso de CSS Grid y Flexbox avanzado",
      "Formularios de contacto validados",
      "Optimización de carga y SEO básico"
    ]
  },
  {
    id: 2,
    title: "Frontend Store",
    description: "Tienda virtual simulada con diseño moderno y adaptativo.",
    url: "https://frontendstore-leo.netlify.app/",
    tags: ["E-commerce", "HTML", "CSS", "Grid/Flexbox"],
    image: "/images/projects/frontend-store.png",
    longDescription: "Maquetación de un e-commerce de camisetas para desarrolladores. Este proyecto se centra en la estructura visual de una tienda en línea, presentando productos de manera atractiva y organizada.",
    features: [
      "Grilla de productos responsive",
      "Páginas de detalle de producto",
      "Diseño visual coherente y moderno",
      "Navegación intuitiva"
    ]
  },
  {
    id: 3,
    title: "Blog de Café",
    description: "Blog informativo sobre el mundo del café con enfoque educativo.",
    url: "https://blog-de-cafe-leoeli.netlify.app/",
    tags: ["Blogging", "UI/UX", "HTML5"],
    image: "/images/projects/blog-de-cafe.png",
    longDescription: "Un sitio web enfocado en contenido textual y multimedia sobre la cultura del café. Diseñado para ofrecer una experiencia de lectura cómoda y agradable, con tipografías seleccionadas y espaciados cuidados.",
    features: [
      "Estructura semántica para motores de búsqueda",
      "Integración de imágenes optimizadas",
      "Sección de cursos y talleres",
      "Formulario de suscripción al newsletter"
    ]
  },
  {
    id: 4,
    title: "Festival de Música",
    description: "Landing page para un festival de música ficticio.",
    url: "https://festivalmusica-leoglez.netlify.app/",
    tags: ["SASS", "Gulp", "Performance"],
    image: "/images/projects/festival-musica.png",
    longDescription: "Landing page vibrante para un festival de rock y EDM. Construido utilizando SASS para estilos modulares y Gulp para automatizar tareas como la minificación de código y optimización de imágenes.",
    features: [
      "Galería de fotos optimizada",
      "Animaciones suaves al hacer scroll",
      "Compilación automática de SASS",
      "Optimización de imágenes WebP"
    ]
  },
  {
    id: 5,
    title: "Calculadora del Amor",
    description: "Aplicación divertida para calcular compatibilidad.",
    url: "https://calculadora-del-amor.netlify.app/",
    tags: ["JavaScript", "Logic", "Interactive"],
    image: "/images/projects/calculadora-amor.png",
    longDescription: "Una pequeña aplicación interactiva que utiliza algoritmos simples de string matching para generar un porcentaje de 'compatibilidad' entre dos nombres. Un ejercicio divertido de manipulación del DOM.",
    features: [
      "Lógica de JavaScript en el cliente",
      "Manipulación dinámica del DOM",
      "Interfaz de usuario amigable y colorida"
    ]
  },
  {
    id: 6,
    title: "Calculadora IMC",
    description: "Herramienta de salud para calcular el Índice de Masa Corporal.",
    url: "https://calculadora-imc-bmi.netlify.app/",
    tags: ["JavaScript", "Health", "Math"],
    image: "/images/projects/calculadora-imc.png",
    longDescription: "Herramienta útil para calcular el Índice de Masa Corporal (IMC). Toma inputs de peso y altura, realiza cálculos matemáticos y devuelve la categoría de salud correspondiente según estándares médicos.",
    features: [
      "Validación de datos de entrada",
      "Cálculos matemáticos precisos",
      "Feedback visual inmediato según el resultado"
    ]
  },
  {
    id: 10,
    title: "P15 - Sistema de Control y Préstamo de Equipos",
    description: "Aplicación de escritorio multiplataforma para la administración automatizada de préstamos de equipo informático.",
    url: "#",
    tags: ["Tauri", "React", "Vite", "SQLite", "Desktop"],
    image: "/images/projects/p15-sistema.png",
    longDescription: "Aplicación de escritorio multiplataforma construida con Tauri, React y Vite, integrada con SQLite para la administración automatizada de préstamos de equipo informático de la preparatoria. Incluye control de inventario y generación de reportes.",
    features: [
      "Aplicación de escritorio multiplataforma con Tauri",
      "Base de datos SQLite local",
      "Sistema de inventario automatizado",
      "Generación de reportes de préstamos"
    ]
  },
  {
    id: 11,
    title: "Guanajuato Nos Une",
    description: "Diseño e implementación de interfaz web de alto impacto visual y rendimiento para el gobierno de Guanajuato.",
    url: "https://guanajuatonosune.org",
    tags: ["Government", "Web Design", "Forms", "Database"],
    image: "/images/projects/guanajuato-nos-une.png",
    longDescription: "Página web desarrollada para el gobierno de Guanajuato como parte del proyecto 'Guanajuato Nos Une'. Incluye formularios y base de datos para recopilación de información ciudadana. Proyecto publicado y mencionado en periódico local.",
    features: [
      "Interfaz web de alto impacto visual",
      "Formularios para recopilación de información ciudadana",
      "Base de datos para gestión de datos",
      "Proyecto publicado en periódico local"
    ]
  },
  {
    id: 12,
    title: "Generador SocioEconomicos Nexplea",
    description: "Sistema de generación de reportes socioeconómicos para empresa especializada en reclutamiento y selección de recursos humanos.",
    url: "#",
    tags: ["React", "Tailwind CSS", "Supabase", "PDF"],
    image: "/images/projects/generador-nexplea.png",
    longDescription: "Sistema de generación de reportes socioeconómicos para empresa Nexplea especializada en reclutamiento y selección de recursos humanos, utilizando React, Tailwind CSS y Supabase para una experiencia de usuario fluida y eficiente.",
    features: [
      "Generación automatizada de reportes socioeconómicos",
      "Autenticación de usuarios y autoguardado en la nube",
      "Generación de documentos PDF",
      "Integración con Firebase para manejo de archivos"
    ]
  }
];

// ESTRUCTURA DE HABILIDADES TÉCNICAS (Categorías del CV)
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    iconName: 'Code2',
    skills: [
      { name: "React", level: "Avanzado" },
      { name: "Next.js", level: "Intermedio" },
      { name: "Tailwind CSS (v4)", level: "Avanzado" },
      { name: "JavaScript (ES6+)", level: "Intermedio – Avanzado" },
      { name: "HTML5 / CSS3", level: "Avanzado" },
      { name: "Vite", level: "Intermedio" }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Cloud',
    iconName: 'Server',
    skills: [
      { name: "Python", level: "Intermedio" },
      { name: "PHP", level: "Intermedio" },
      { name: "Node.js", level: "Intermedio" },
      { name: "Supabase", level: "Intermedio" },
      { name: "Firebase", level: "Intermedio" },
      { name: "C / C++", level: "Fundamentos" }
    ]
  },
  {
    id: 'database',
    title: 'Bases de Datos & DevOps',
    iconName: 'Database',
    skills: [
      { name: "PostgreSQL", level: "Intermedio", description: "Consultas SQL, joins, creación de tablas, relaciones" },
      { name: "MySQL", level: "Intermedio", description: "Consultas SQL, joins, creación de tablas, relaciones, índices básicos" },
      { name: "SQLite", level: "Básico" },
      { name: "Docker", level: "Intermedio", description: "Contenerización y despliegue de aplicaciones" },
      { name: "Git / GitHub", level: "Control de versiones" }
    ]
  },
  {
    id: 'ai',
    title: 'Herramientas de IA',
    iconName: 'Terminal',
    skills: [
      { name: "IA Generativa", level: "Avanzado", description: "Amplio manejo de herramientas de IA generativa" },
      { name: "Prompt Engineering", level: "Avanzado", description: "Generación de contenido visual y multimedia con IA" },
      { name: "Automatización con IA", level: "Intermedio", description: "Automatización de procesos con inteligencia artificial" }
    ]
  },
  {
    id: 'hardware',
    title: 'Sistemas & Hardware',
    iconName: 'Server',
    skills: [
      { name: "Linux", level: "Intermedio" },
      { name: "Windows", level: "Avanzado" },
      { name: "Diagnóstico Electrónico", level: "Intermedio", description: "Diagnóstico de componentes de hardware" },
      { name: "Mantenimiento", level: "Avanzado", description: "Mantenimiento de hardware y software" }
    ]
  }
];

// Habilidades Blandas (aparecen como lista)
export const softSkills: SoftSkill[] = [
  { name: "Resolución de problemas" },
  { name: "Pensamiento lógico" },
  { name: "Trabajo en equipo" },
  { name: "Comunicación efectiva" },
  { name: "Autodidacta y proactivo" },
  { name: "Puntualidad" }
];

// Educación
export const education: Education[] = [
  {
    institution: "Centro Universitario de Ciencias Exactas e Ingenierías (CUCEI)",
    degree: "Ingeniería en Computación",
    period: "01/2023 - 07/2027 (En curso)",
    details: ["Guadalajara, Jalisco"]
  },
  {
    institution: "Curso Desarrollo Web Completo",
    degree: "Certificación Técnica",
    period: "82.5 horas",
    details: ["HTML5, CSS3, JS, AJAX, PHP y MySQL"]
  },
  {
    institution: "Preparatoria Colegio Unión México",
    degree: "Bachillerato",
    period: "Graduación con honores",
    details: ["Presea al mejor estudiante"]
  }
];

// Idiomas
export const languages = [
  { name: "Español", level: "Lengua materna" },
  { name: "Inglés", level: "B2 – Intermedio superior" }
];

// Certificaciones y Cursos
export const certifications: Certification[] = [
  {
    id: 1,
    title: "Desarrollo Web Completo",
    issuer: "Udemy",
    date: "2023",
    hours: "82.5 horas",
    skills: ["HTML5", "CSS3", "JavaScript", "AJAX", "PHP", "MySQL"]
  },
  {
    id: 2,
    title: "Google Cloud Platform Fundamentals",
    issuer: "Google Cloud",
    date: "2024",
    skills: ["Cloud Run", "Docker", "Deployment", "GCP"]
  },
  {
    id: 3,
    title: "Git & GitHub para Desarrolladores",
    issuer: "Platzi",
    date: "2024",
    skills: ["Git", "GitHub", "Control de Versiones", "Colaboración"]
  },
  {
    id: 4,
    title: "React: De cero a experto",
    issuer: "Udemy",
    date: "2025",
    skills: ["React", "TypeScript", "Hooks", "Context API"]
  }
];

// Testimonios
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Carlos Martínez",
    role: "Profesor de Programación — CUCEI",
    relationship: "Profesor",
    content: "Leonardo demuestra una capacidad excepcional para resolver problemas complejos. Su dedicación y proactividad lo distinguen como uno de los estudiantes más comprometidos con su aprendizaje."
  },
  {
    id: 2,
    name: "Ana Sofía Ramírez",
    role: "Compañera de Equipo — Proyecto ER",
    relationship: "Compañera",
    content: "Trabajar con Leo es increíble. Siempre busca la mejor solución, se comunica claramente y no tiene miedo de aprender tecnologías nuevas para sacar el proyecto adelante."
  },
  {
    id: 3,
    name: "Ing. Roberto Vega",
    role: "Mentor de Desarrollo Web",
    relationship: "Mentor",
    content: "Desde que empezó el curso, Leonardo mostró una curiosidad genuina por entender el 'por qué' detrás de cada concepto. Su evolución como desarrollador ha sido impresionante."
  }
];
