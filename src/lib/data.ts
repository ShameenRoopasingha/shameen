// Centralized Portfolio Data for TVA TemPad OS
import { PORTFOLIO_DATA } from '@/data/portfolio';
export * from '@/types/portfolio';
export { PORTFOLIO_DATA };

export interface Profile {
  name: string;
  role: string;
  summary: string;
  tagline: string;
  variantId: string;
  clearanceLevel: string;
  timelineBranch: string;
  location: string;
  phone: string;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    level: string;
  }>;
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    resumeUrl: string;
  };
}

export const PROFILE: Profile = {
  name: PORTFOLIO_DATA.variant.realName,
  role: PORTFOLIO_DATA.variant.primaryRole,
  summary: PORTFOLIO_DATA.variant.dossierSummary,
  tagline: PORTFOLIO_DATA.variant.operationalStatus,
  variantId: PORTFOLIO_DATA.variant.variantId,
  clearanceLevel: PORTFOLIO_DATA.variant.clearanceLevel,
  timelineBranch: PORTFOLIO_DATA.variant.timelineBranch,
  location: PORTFOLIO_DATA.variant.location,
  phone: PORTFOLIO_DATA.variant.phone,
  education: PORTFOLIO_DATA.variant.education,
  socialLinks: PORTFOLIO_DATA.variant.socialLinks,
};

export interface LegacyExperience {
  id: string;
  role: string;
  company: string;
  year: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  coordinate?: string;
  status?: string;
}

export const EXPERIENCE: LegacyExperience[] = PORTFOLIO_DATA.experiences.map((exp) => ({
  id: exp.id,
  role: exp.role,
  company: exp.company,
  year: exp.period,
  description: exp.summary,
  achievements: exp.achievements,
  technologies: exp.technologies,
  coordinate: exp.coordinate,
  status: exp.status,
}));

export interface LegacyProject {
  id: string;
  codeName?: string;
  title: string;
  category?: string;
  summary?: string;
  description: string;
  problemSolved?: string;
  architectureHighlights?: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  temporalTag?: string;
}

export const PROJECTS: LegacyProject[] = PORTFOLIO_DATA.projects.map((proj) => ({
  id: proj.id,
  codeName: proj.codeName,
  title: proj.title,
  category: proj.category,
  summary: proj.summary,
  description: proj.summary,
  problemSolved: proj.problemSolved,
  architectureHighlights: proj.architectureHighlights,
  techStack: proj.techStack,
  githubUrl: proj.githubUrl,
  liveUrl: proj.liveUrl,
  status: proj.status,
  temporalTag: proj.temporalTag,
}));

export interface Skill {
  name: string;
  level: number;
  category?: string;
  tag?: string;
}

export const SKILLS: Skill[] = PORTFOLIO_DATA.skillGroups.flatMap((group) =>
  group.skills.map((s) => ({
    name: s.name,
    level: s.level,
    category: group.category,
    tag: s.tag,
  }))
);

export interface Reference {
  id: string;
  fileNumber?: string;
  name: string;
  role?: string;
  company: string;
  phone?: string;
  endorsement?: string;
  status?: string;
}

export const REFERENCES: Reference[] = PORTFOLIO_DATA.references.map((ref) => ({
  id: ref.id,
  fileNumber: ref.fileNumber,
  name: ref.name,
  role: ref.role,
  company: ref.organization,
  phone: ref.phone,
  endorsement: ref.endorsement,
  status: ref.verificationStatus,
}));
