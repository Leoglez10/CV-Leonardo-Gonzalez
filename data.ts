import type { Education, Experience, Project, SkillCategory } from './types';

export const personalInfo = {
  name: 'Leonardo Elías González Rangel',
  role: 'Estudiante de Ingeniería en Computación',
  email: 'leoeligr10@gmail.com',
  phone: '+52 33 2223 5248',
  location: 'Guadalajara, México',
  website: 'https://leonardogonzalezcv.netlify.app/',
  linkedin: 'https://www.linkedin.com/in/leonardo-elias-gonzalez-rangel-442670289/',
  instagram: 'https://www.instagram.com/leoelias.10/',
  github: 'https://github.com/Leoglez10',
  about: 'Soy estudiante de Ingeniería en Computación orientado a la arquitectura de software y al desarrollo full-stack. Tengo experiencia práctica en aplicaciones web y de escritorio, depuración de sistemas, mantenimiento de hardware y automatización de flujos con inteligencia artificial. Busco crear soluciones eficientes, escalables y bien ejecutadas.',
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Preparatoria 15 · Universidad de Guadalajara',
    role: 'Servicio Social · Desarrollo full-stack y soporte técnico',
    location: 'Guadalajara, México',
    period: 'Mar — Ago 2026',
    description: [
      'Desarrollo de un sistema de inventario y otro de préstamo de equipos de cómputo.',
      'Mantenimiento y reparación de hardware y software para la comunidad escolar.',
      'Automatización de la gestión y generación de reportes.',
    ],
  },
  {
    id: 2,
    company: 'Nexplea S.A. de C.V.',
    role: 'Desarrollador full-stack',
    location: 'Guadalajara, México',
    period: 'Feb 2026',
    description: [
      'Sistema de generación de reportes socioeconómicos para recursos humanos.',
      'Autenticación, autoguardado en la nube y generación de documentos PDF.',
      'Integración de almacenamiento de imágenes y archivos, con despliegue mediante Docker.',
    ],
  },
  {
    id: 3,
    company: 'Xignis · Guanajuato Nos Une',
    role: 'Desarrollador frontend',
    location: 'Guanajuato, México',
    period: 'Abr 2026',
    description: [
      'Desarrollo de guanajuatonosune.org para el gobierno de Guanajuato.',
      'Implementación de formularios y base de datos para información ciudadana.',
      'Proyecto publicado y mencionado en un periódico local.',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'Análisis de Talento Inteligente',
    description: 'Convierte CV complejos en tableros accionables para apoyar procesos de selección basados en evidencia.',
    url: 'https://hr-intellect-cv-analyzer-mvp-250746262358.us-west1.run.app/',
    repo: 'https://github.com/Leoglez10/HR-intellect',
    tags: ['IA', 'Analytics', 'Recruitment', 'Dashboard'],
    image: '/images/projects/talent-analysis-dashboard.png',
    featured: true,
  },
  {
    id: 2,
    title: 'P15 · Control y Préstamo de Equipos',
    description: 'Aplicación de escritorio multiplataforma para administrar inventario y préstamos de equipo informático.',
    url: '#',
    tags: ['Tauri', 'React', 'Vite', 'SQLite'],
  },
  {
    id: 3,
    title: 'Guanajuato Nos Une',
    description: 'Interfaz web y captura de información ciudadana para una iniciativa del gobierno de Guanajuato.',
    url: 'https://guanajuatonosune.org',
    tags: ['Gobierno', 'Formularios', 'Base de datos'],
  },
  {
    id: 4,
    title: 'Generador Socioeconómicos Nexplea',
    description: 'Sistema privado para generar reportes, guardar avances en la nube y administrar archivos del proceso.',
    url: '#',
    tags: ['React', 'Supabase', 'PDF', 'Docker'],
  },
  {
    id: 5,
    title: 'El Impostor',
    description: 'Juego web móvil de estrategia y deducción, desplegado en contenedores sobre Google Cloud Run.',
    url: 'https://el-impostor-839098521388.us-west1.run.app/',
    repo: 'https://github.com/Leoglez10/el-impostor',
    tags: ['Game dev', 'Cloud Run', 'Docker'],
    image: '/images/projects/el-impostor.png',
    featured: true,
  },
  {
    id: 6,
    title: 'Sala de Urgencias',
    description: 'Sistema administrativo full-stack para registrar y dar seguimiento a pacientes con persistencia en MySQL.',
    url: 'https://saladeurgencias.xo.je/',
    tags: ['MySQL', 'Dashboard', 'Full-stack'],
    image: '/images/projects/sala-urgencias.png',
    featured: true,
  },
  {
    id: 7,
    title: 'Festival de Música',
    description: 'Landing page responsiva construida con SASS y un flujo automatizado de assets con Gulp.',
    url: 'https://festivalmusica-leoglez.netlify.app/',
    tags: ['SASS', 'Gulp', 'Responsive'],
    image: '/images/projects/festival-musica.png',
    featured: true,
  },
  {
    id: 8,
    title: 'Freelancer Personal',
    description: 'Primer portafolio profesional desarrollado con HTML y CSS, centrado en estructura y diseño responsivo.',
    url: 'https://leo-freelancer-proyect.netlify.app/',
    tags: ['HTML', 'CSS', 'Responsive'],
    image: '/images/projects/freelancer-personal.png',
  },
  {
    id: 9,
    title: 'Frontend Store',
    description: 'Maquetación responsiva de una tienda virtual con grilla y páginas de detalle de producto.',
    url: 'https://frontendstore-leo.netlify.app/',
    tags: ['E-commerce', 'HTML', 'CSS'],
    image: '/images/projects/frontend-store.png',
  },
  {
    id: 10,
    title: 'Blog de Café',
    description: 'Sitio editorial enfocado en una lectura cómoda y contenido educativo sobre café.',
    url: 'https://blog-de-cafe-leoeli.netlify.app/',
    tags: ['Blog', 'HTML5', 'UI'],
    image: '/images/projects/blog-de-cafe.png',
  },
  {
    id: 11,
    title: 'Calculadora del Amor',
    description: 'Experimento interactivo de manipulación del DOM y lógica de cadenas en JavaScript.',
    url: 'https://calculadora-del-amor.netlify.app/',
    tags: ['JavaScript', 'DOM', 'Lógica'],
    image: '/images/projects/calculadora-amor.png',
  },
  {
    id: 12,
    title: 'Calculadora IMC',
    description: 'Herramienta web con validación de datos y resultados calculados a partir de peso y altura.',
    url: 'https://calculadora-imc-bmi.netlify.app/',
    tags: ['JavaScript', 'Validación', 'Cálculo'],
    image: '/images/projects/calculadora-imc.png',
  },
  {
    id: 13,
    title: 'Tae Foto · Préstamo de Equipo',
    description: 'Aplicación de escritorio offline para gestionar préstamos de equipo fotográfico y audiovisual en la Preparatoria 15.',
    url: '#',
    repo: 'https://github.com/Leoglez10/Tae-Foto-P15',
    tags: ['Escritorio', 'Offline', 'JavaScript'],
  },
  {
    id: 14,
    title: 'Artecnología',
    description: 'Sitio oficial de un estudio de diseño web y SEO en México, construido con React 19, Tailwind y animación con GSAP.',
    url: '#',
    repo: 'https://github.com/Leoglez10/artecnologia',
    tags: ['React', 'Tailwind', 'GSAP', 'SEO'],
  },
  {
    id: 15,
    title: 'Tone · Sitio oficial',
    description: 'Landing narrativa para presentar la obra, la editorial y el universo creativo del autor Ernesto González.',
    url: '#',
    repo: 'https://github.com/Leoglez10/Tone-pagina',
    tags: ['Landing', 'React', 'Narrativa'],
  },
  {
    id: 16,
    title: 'Mujeres Aliadas · Prototipo',
    description: 'Prototipo navegable de rediseño para cliente, con registro y consulta conectados a Frappe v15 y Frappe CRM.',
    url: '#',
    repo: 'https://github.com/Leoglez10/aliadas-demo',
    tags: ['React', 'Frappe', 'Bun', 'Prototipo'],
  },
  {
    id: 17,
    title: 'Árbol Genealógico',
    description: 'Visor y editor interactivo de un árbol familiar sin backend: el estado completo persiste en localStorage.',
    url: '#',
    repo: 'https://github.com/Leoglez10/arbol-genealogico',
    tags: ['React', 'Vite', 'localStorage'],
  },
  {
    id: 18,
    title: 'Moodle2 · Rediseño CUCEI',
    description: 'Ejercicio de rediseño de la interfaz de Moodle para la plataforma del centro universitario.',
    url: '#',
    repo: 'https://github.com/Leoglez10/Moodle2-CUCEI',
    tags: ['Rediseño', 'UI', 'TypeScript'],
  },
  {
    id: 19,
    title: 'Convertidor de Imágenes',
    description: 'Página para convertir imágenes entre los formatos PNG, JPG y WEBP.',
    url: '#',
    repo: 'https://github.com/Leoglez10/convertidor-imagenes-v1',
    tags: ['JavaScript', 'Imágenes', 'Utilidad'],
  },
];

/**
 * Broad strokes of the kind of work, replacing the per-project listing.
 * Every line is backed by an entry in `experiences` or `projects`.
 */
export const workDomains = [
  {
    id: 'systems',
    title: 'Sistemas internos y de operación',
    body: 'Inventario, préstamo de equipo y generación de reportes en PDF para una preparatoria y para una empresa de recursos humanos. Software que alguien usa todos los días.',
    stack: ['Tauri', 'React', 'SQLite', 'Docker'],
  },
  {
    id: 'clients',
    title: 'Producto web para clientes y gobierno',
    body: 'Sitios, formularios y captura de información ciudadana. Incluye guanajuatonosune.org para el gobierno de Guanajuato, publicado y mencionado en prensa local.',
    stack: ['React', 'Supabase', 'Tailwind', 'SEO'],
  },
  {
    id: 'ai',
    title: 'IA aplicada a procesos reales',
    body: 'Análisis de CV para apoyar selección basada en evidencia, y automatización de flujos internos que antes se hacían a mano.',
    stack: ['IA generativa', 'Analytics', 'Cloud Run'],
  },
  {
    id: 'craft',
    title: 'Interfaces, juegos y utilidades',
    body: 'Juegos web desplegados en contenedores, landings narrativas y herramientas pequeñas que resuelven una sola cosa bien.',
    stack: ['TypeScript', 'GSAP', 'SASS', 'Vite'],
  },
] as const;

/** Public repository count. Bump it when it drifts; nothing fetches it at runtime. */
export const githubProfile = {
  handle: '@Leoglez10',
  repositories: 25,
  headline: 'Todo el código, a la vista.',
  body: 'Casi todo lo que construyo termina en un repositorio público. Creo en el código abierto porque se aprende leyendo el trabajo de otros, así que dejo el mío disponible para quien quiera revisarlo, aprender de él o levantar un issue.',
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', level: 'Avanzado' },
      { name: 'Next.js', level: 'Intermedio' },
      { name: 'Tailwind CSS', level: 'Avanzado' },
      { name: 'JavaScript', level: 'Intermedio — avanzado' },
      { name: 'HTML / CSS', level: 'Avanzado' },
      { name: 'Vite', level: 'Intermedio' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Cloud',
    skills: [
      { name: 'Python', level: 'Intermedio' },
      { name: 'PHP', level: 'Intermedio' },
      { name: 'Node.js', level: 'Intermedio' },
      { name: 'Supabase', level: 'Intermedio' },
      { name: 'Firebase', level: 'Intermedio' },
      { name: 'C / C++', level: 'Fundamentos' },
    ],
  },
  {
    id: 'data',
    title: 'Datos & DevOps',
    skills: [
      { name: 'PostgreSQL', level: 'Intermedio' },
      { name: 'MySQL', level: 'Intermedio' },
      { name: 'SQLite', level: 'Básico' },
      { name: 'Docker', level: 'Intermedio' },
      { name: 'Git / GitHub', level: 'Control de versiones' },
    ],
  },
  {
    id: 'ai',
    title: 'IA & Automatización',
    skills: [
      { name: 'IA generativa', level: 'Avanzado' },
      { name: 'Prompt engineering', level: 'Avanzado' },
      { name: 'Automatización con IA', level: 'Intermedio' },
    ],
  },
  {
    id: 'systems',
    title: 'Sistemas & Hardware',
    skills: [
      { name: 'Linux', level: 'Intermedio' },
      { name: 'Windows', level: 'Avanzado' },
      { name: 'Diagnóstico electrónico', level: 'Intermedio' },
      { name: 'Mantenimiento', level: 'Avanzado' },
    ],
  },
];

export const education: Education[] = [
  {
    institution: 'CUCEI · Universidad de Guadalajara',
    degree: 'Ingeniería en Computación · Licenciatura en curso',
    period: 'Ene 2023 — presente',
  },
  {
    institution: 'Colegio Unión México',
    degree: 'Bachillerato · Graduado con honores y presea al mejor estudiante de la generación',
    period: 'Finalizado',
  },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'B2 · Intermedio alto' },
];

// The source CV supports this credential; unsupported legacy entries stay omitted.
export const certifications = [
  {
    title: 'Complete Web Development Course',
    hours: '82.5 horas',
    description: 'Formación en desarrollo web moderno, arquitectura cliente-servidor y bases de datos relacionales.',
  },
] as const;
