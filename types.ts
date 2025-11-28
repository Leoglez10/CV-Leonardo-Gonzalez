
export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
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
  iconName: 'Layout' | 'Server' | 'Database' | 'Cpu'; // Nombres de iconos mapeados
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
