export interface Project {
  id: number;
  title: string;
  description: string;
  /** Live deployment, or '#' when there is nothing public to open. */
  url: string;
  /** Public source, when it exists. */
  repo?: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export interface SkillItem {
  /** Command-line spelling, printed as-is in the terminal output. */
  name: string;
  /** 1 = fundamentos, 4 = avanzado. The word beside the meter is derived from it. */
  level: 1 | 2 | 3 | 4;
}

export interface SkillCategory {
  /** Also the `--flag` a visitor can type into the terminal. */
  id: string;
  /** Read out to assistive tech; the terminal shows the flag, not this. */
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
