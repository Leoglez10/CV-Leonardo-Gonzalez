export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
}
