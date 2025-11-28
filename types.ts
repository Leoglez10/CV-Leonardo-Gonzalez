export interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  image: string;
}

export interface Skill {
  name: string;
  level: number; // 1 to 5
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