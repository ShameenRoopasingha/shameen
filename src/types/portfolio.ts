// Strictly-typed TVA TemPad Portfolio Schema

export type ProjectStatus = 'ACTIVE' | 'VERIFIED' | 'ARCHIVED' | 'CLASSIFIED';

export interface Project {
  id: string;
  codeName: string;
  title: string;
  category: string;
  summary: string;
  problemSolved: string;
  architectureHighlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  status: ProjectStatus;
  temporalTag: string;
}

export interface ExperienceMilestone {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  coordinate: string;
  status: 'VERIFIED' | 'CANONICAL';
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationRecord {
  degree: string;
  institution: string;
  year: string;
  level: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100 voltage matching CV
  tag: string;
}

export interface SkillGroup {
  category: string;
  code: string;
  skills: SkillItem[];
}

export interface ReferenceFile {
  id: string;
  fileNumber: string;
  name: string;
  role: string;
  organization: string;
  phone: string;
  endorsement: string;
  verificationStatus: 'AUTHENTICATED' | 'CLEARED';
}

export interface VariantProfile {
  variantId: string;
  designation: string;
  realName: string;
  clearanceLevel: string;
  primaryRole: string;
  operationalStatus: string;
  dossierSummary: string;
  timelineBranch: string;
  location: string;
  phone: string;
  coreCompetencies: string[];
  education: EducationRecord[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    resumeUrl: string;
  };
}

export interface PortfolioData {
  variant: VariantProfile;
  projects: Project[];
  experiences: ExperienceMilestone[];
  skillGroups: SkillGroup[];
  references: ReferenceFile[];
}
