export const SECTION_IDS = [
  'home',
  'profile',
  'experience',
  'work',
  'capabilities',
  'credentials',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const isSectionId = (value: string): value is SectionId =>
  (SECTION_IDS as readonly string[]).includes(value);
