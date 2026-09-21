// Portfolio Data - Shameen Roopasingha

export const PROFILE = {
    name: 'Shameen Roopasingha',
    role: 'Full Stack Developer',
    summary: 'Specialist in React, Next.js, Node.js, and UI/UX animations.',
    tagline: 'VARIANT DETECTED',
};

export interface Experience {
    id: string;
    role: string;
    company: string;
    year: string;
    description: string;
}

export const EXPERIENCE: Experience[] = [
    {
        id: 'exp-1',
        role: 'UI/UX Developer',
        company: 'Ceylon Weighing Machines',
        year: 'Apr 2024 – Dec 2024',
        description: 'Designed user interfaces for weighbridge systems using Adobe XD. Customized VB.Net applications for clients to improve weighbridge operations.',
    },
    {
        id: 'exp-2',
        role: 'Web Developer',
        company: 'Global Cloud Tech Solutions',
        year: 'Jan 2021 – Dec 2022',
        description: 'Developed basic websites using HTML, CSS, PHP, and SQL. Maintained and updated existing web applications for clients.',
    },
    {
        id: 'exp-3',
        role: 'Web Developer',
        company: 'Sanota Pvt Ltd',
        year: 'Jan 2020 – Dec 2020',
        description: 'Built and deployed the company\'s official website using HTML, CSS, and Bootstrap.',
    },
];

export interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
}

export const PROJECTS: Project[] = [
    {
        id: 'proj-1',
        title: 'Pharmacy POS System',
        description: 'Complete point-of-sale system for pharmacy operations with inventory management and billing.',
        techStack: ['Electron', 'React', 'SQLite'],
    },
    {
        id: 'proj-2',
        title: 'WhatsApp POS Bot',
        description: 'Automated WhatsApp bot for processing orders and managing customer interactions.',
        techStack: ['Node.js', 'Twilio', 'Supabase'],
    },
    {
        id: 'proj-3',
        title: 'MERN User System',
        description: 'Full authentication and user management system with role-based access control.',
        techStack: ['React', 'Redux', 'Zod'],
    },
];

export interface Skill {
    name: string;
    level: number; // 0-100
}

export const SKILLS: Skill[] = [
    { name: 'React.js', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Tailwind', level: 88 },
    { name: 'Three.js', level: 70 },
    { name: 'Node.js', level: 82 },
    { name: 'MongoDB', level: 75 },
    { name: 'SQL', level: 72 },
];

export interface Reference {
    id: string;
    name: string;
    company: string;
}

export const REFERENCES: Reference[] = [
    {
        id: 'ref-1',
        name: 'Dilshan Ranasinghe',
        company: 'Delta Capita',
    },
    {
        id: 'ref-2',
        name: 'Uvinda Induwara',
        company: 'OSO PVT LTD',
    },
];
