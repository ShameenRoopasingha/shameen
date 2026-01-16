import { usePortfolioData } from '@/components/DataProvider';

export interface Profile {
    id: string;
    name: string;
    role: string;
    summary: string;
    tagline: string;
    imageUrl?: string | null;
    colorFilter?: string;
    resumeUrl?: string | null;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    year: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    demoUrl?: string | null;
    repoUrl?: string | null;
    inDevelopment?: boolean;
}

export interface Skill {
    name: string;
    level: number;
}

export interface Reference {
    id: string;
    name: string;
    company: string;
}

export interface Feedback {
    id: string;
    name: string;
    company: string | null;
    message: string;
    rating: number;
    createdAt: Date;
}

// Re-export hooks instead of constants
export function useProfile() {
    return usePortfolioData().profile;
}

export function useExperience() {
    return usePortfolioData().experience;
}

export function useProjects() {
    return usePortfolioData().projects;
}

export function useSkills() {
    return usePortfolioData().skills;
}

export function useReferences() {
    return usePortfolioData().references;
}

export function useFeedbacks() {
    return usePortfolioData().feedbacks;
}

