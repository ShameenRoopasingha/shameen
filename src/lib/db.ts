import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

// Zod Schemas
export const ProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    summary: z.string(),
    tagline: z.string(),
})

export const ExperienceSchema = z.object({
    id: z.string(),
    role: z.string(),
    company: z.string(),
    year: z.string(),
    description: z.string(),
    order: z.number(),
})

export const ProjectSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    order: z.number(),
})

export const SkillSchema = z.object({
    id: z.string(),
    name: z.string(),
    level: z.number(),
    order: z.number(),
})

export const ReferenceSchema = z.object({
    id: z.string(),
    name: z.string(),
    company: z.string(),
    order: z.number(),
})
