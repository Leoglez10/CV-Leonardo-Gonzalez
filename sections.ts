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
