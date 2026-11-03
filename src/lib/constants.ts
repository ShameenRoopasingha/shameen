// TVA TemPad OS Constants & Tokens

export const SECTIONS = [
  'hero',
  'projects',
  'experience',
  'skills',
  'references',
  'contact',
] as const;

export type SectionId = (typeof SECTIONS)[number];

export interface SectionMeta {
  id: SectionId;
  code: string;
  tvaLabel: string;
  recruiterLabel: string;
  hash: string;
  shortcut: string;
}

export const SECTION_METADATA: Record<SectionId, SectionMeta> = {
  hero: {
    id: 'hero',
    code: '[01]',
    tvaLabel: 'VARIANT DOSSIER',
    recruiterLabel: 'OVERVIEW & DIAGNOSTICS',
    hash: '#dossier',
    shortcut: '1',
  },
  projects: {
    id: 'projects',
    code: '[02]',
    tvaLabel: 'TIMEDOOR',
    recruiterLabel: 'PROJECTS & EVIDENCE',
    hash: '#projects',
    shortcut: '2',
  },
  experience: {
    id: 'experience',
    code: '[03]',
    tvaLabel: 'SACRED TIMELINE',
    recruiterLabel: 'EXPERIENCE & ROLES',
    hash: '#experience',
    shortcut: '3',
  },
  skills: {
    id: 'skills',
    code: '[04]',
    tvaLabel: 'CAPABILITY MATRIX',
    recruiterLabel: 'SKILLS & VOLTAGE',
    hash: '#skills',
    shortcut: '4',
  },
  references: {
    id: 'references',
    code: '[05]',
    tvaLabel: 'CHRONO-LOGS',
    recruiterLabel: 'REFERENCES & DOSSIERS',
    hash: '#references',
    shortcut: '5',
  },
  contact: {
    id: 'contact',
    code: '[06]',
    tvaLabel: 'MISSIVES',
    recruiterLabel: 'CONTACT & UPLINK',
    hash: '#contact',
    shortcut: '6',
  },
};

// TVA CRT Palette Tokens (Authentic Cantina Creative / Loki 1970s Monochrome)
export const TVA_COLORS = {
  void: '#120B05', // Warm dark phosphor charcoal (never pure #000000)
  amber: '#FF8C24', // Primary Phosphor Amber
  amberHighlight: '#FFB84D', // Bright hot highlight amber
  amberDim: '#7A4210', // Dimmed/inactive amber
  red: '#FF3B1F', // Nexus Alert Red
  amberGlow: 'rgba(255, 140, 36, 0.4)',
  amberGrid: 'rgba(255, 140, 36, 0.08)',
} as const;

// Animation & Interaction Speeds
export const ANIMATION = {
  steppedDuration: 0.18, // 180ms stepped CRT transition
  typewriterSpeed: 0.02,
  bootSequenceMax: 1.1, // Sub-1.2s boot
} as const;
