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
];

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
