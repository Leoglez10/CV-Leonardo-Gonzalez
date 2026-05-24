
export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
  // Campos opcionales para el modal de detalles
  longDescription?: string;
  features?: string[];
  gallery?: string[]; // URLs adicionales de imágenes
}

// Interfaz para un item individual de habilidad (ej: "HTML/CSS")
export interface SkillItem {
  name: string;
  level?: string; // Ej: "Intermedio-Avanzado"
  description?: string; // Ej: "Consultas SQL, joins..." para detalles extra
}

// Interfaz para una categoría completa (ej: "Frontend")
export interface SkillCategory {
  id: string;
  title: string;
  iconName: 'Code2' | 'Server' | 'Database' | 'Terminal' | 'BrainCircuit';
  skills: SkillItem[];
}

// Mantenemos esta por compatibilidad si se usa en otros lados, 
// pero principalmente usaremos SkillCategory ahora.
export interface Skill {
  name: string;
  level: number; 
  maxLevel: number;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  details?: string[];
}

export interface SoftSkill {
  name: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  hours?: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  description: string[];
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  relationship: string;
  content: string;
  avatar?: string;
}
