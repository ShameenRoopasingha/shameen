import prisma from '@/lib/db'
import { unstable_noStore as noStore } from 'next/cache';

export async function getProfile() {
    noStore();
    const profile = await prisma.profile.findFirst({
        include: { images: true }
    });
    // Fallback if seeded data missing, though it shouldn't be
    if (!profile) {
        return {
            id: 'default',
            name: 'Variant',
            role: 'Unknown',
            summary: 'No data found.',
            tagline: 'TVA',
            imageUrl: '/images/image.png',
            colorFilter: 'tva',
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    return {
        ...profile,
        imageUrl: profile.images.find(img => img.isActive)?.url || '/images/image.png',
        resumeUrl: profile.resumeUrl || null
    };
}

export async function getExperience() {
    noStore();
    return await prisma.experience.findMany({
        orderBy: { startDate: 'desc' }
    });
}

export async function getProjects() {
    noStore();
    const projects = await prisma.project.findMany({
        orderBy: { order: 'asc' }
    });
    return projects;
}

export async function getSkills() {
    noStore();
    return await prisma.skill.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getReferences() {
    noStore();
    return await prisma.reference.findMany({
        orderBy: { order: 'asc' }
    });
}

export async function getFeedbacks() {
    noStore();
    return await prisma.feedback.findMany({
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getAllData() {
    noStore();
    const [profile, experience, projects, skills, references, feedbacks] = await Promise.all([
        getProfile(),
        getExperience(),
        getProjects(),
        getSkills(),
        getReferences(),
        getFeedbacks(),
    ]);

    return {
        profile,
        experience,
        projects,
        skills,
        references,
        feedbacks,
    };
}
