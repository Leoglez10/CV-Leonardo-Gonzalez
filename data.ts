import { Project, Skill, Education, SoftSkill } from './types';

export const personalInfo = {
  name: "Leonardo Elias Gonzalez Rangel",
  role: "Estudiante de Ingeniería en Computación",
  email: "leoeligr10@gmail.com",
  phone: "3322235248",
  location: "Guadalajara, Jalisco",
  linkedin: "https://www.linkedin.com/in/leonardo-elias-gonzalez-rangel-442670289/",
  about: "Estudiante de Ingeniería en Computación con experiencia en desarrollo web y un fuerte interés en la tecnología. Manejo frontend con HTML y CSS, y tengo bases de backend con JavaScript, PHP, Python y MySQL. Me gusta aprender nuevas herramientas, optimizar procesos y mejorar la productividad. Soy una persona curiosa, autodidacta y enfocada en crear soluciones funcionales."
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Freelancer Personal",
    description: "Página web de portafolio personal diseñada desde cero.",
    url: "https://leo-freelancer-proyect.netlify.app/",
    tags: ["HTML", "CSS", "Responsive Design"],
    image: "https://picsum.photos/id/1/600/400" 
  },
  {
    id: 2,
    title: "Frontend Store",
    description: "Tienda virtual simulada con diseño moderno y adaptativo.",
    url: "https://frontendstore-leo.netlify.app/",
    tags: ["E-commerce", "HTML", "CSS", "Grid/Flexbox"],
    image: "https://picsum.photos/id/20/600/400"
  },
  {
    id: 3,
    title: "Blog de Café",
    description: "Blog informativo sobre el mundo del café con enfoque educativo.",
    url: "https://blog-de-cafe-leoeli.netlify.app/",
    tags: ["Blogging", "UI/UX", "HTML5"],
    image: "https://picsum.photos/id/42/600/400"
  },
  {
    id: 4,
    title: "Festival de Música",
    description: "Landing page para un festival de música ficticio.",
    url: "https://festivalmusica-leoglez.netlify.app/",
    tags: ["SASS", "Gulp", "Performance"],
    image: "https://picsum.photos/id/76/600/400"
  },
  {
    id: 5,
    title: "Calculadora del Amor",
    description: "Aplicación divertida para calcular compatibilidad.",
    url: "https://calculadora-del-amor.netlify.app/",
    tags: ["JavaScript", "Logic", "Interactive"],
    image: "https://picsum.photos/id/102/600/400"
  },
  {
    id: 6,
    title: "Calculadora IMC",
    description: "Herramienta de salud para calcular el Índice de Masa Corporal.",
    url: "https://calculadora-imc-bmi.netlify.app/",
    tags: ["JavaScript", "Health", "Math"],
    image: "https://picsum.photos/id/180/600/400"
  }
];

export const techSkills: Skill[] = [
  { name: "HTML / CSS", level: 4, maxLevel: 5 },
  { name: "Python", level: 3, maxLevel: 5 },
  { name: "C / C++", level: 3, maxLevel: 5 },
  { name: "JavaScript", level: 2, maxLevel: 5 },
  { name: "PHP", level: 2, maxLevel: 5 },
  { name: "MySQL", level: 2, maxLevel: 5 }, 
];

export const softSkills: SoftSkill[] = [
  { name: "Resolución de problemas" },
  { name: "Pensamiento lógico" },
  { name: "Trabajo en equipo" },
  { name: "Comunicación efectiva" },
  { name: "Autodidacta y proactivo" },
  { name: "Puntualidad" }
];

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

export const languages = [
  { name: "Español", level: "Lengua materna" },
  { name: "Inglés", level: "B2 – Intermedio superior" }
];