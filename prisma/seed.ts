import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PROFILE = {
    name: 'Shameen Roopasingha',
    role: 'Full Stack Developer',
    summary: 'Specialist in React, Next.js, Node.js, and UI/UX animations.',
    tagline: 'VARIANT DETECTED',
};

const EXPERIENCE = [
    {
        role: 'UI/UX Developer',
        company: 'Ceylon Weighing Machines',
        year: 'Apr 2024 – Dec 2024',
        description: 'Designed user interfaces for weighbridge systems using Adobe XD. Customized VB.Net applications for clients to improve weighbridge operations.',
        order: 1,
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-12-31'),
    },
    {
        role: 'Web Developer',
        company: 'Global Cloud Tech Solutions',
        year: 'Jan 2021 – Dec 2022',
        description: 'Developed basic websites using HTML, CSS, PHP, and SQL. Maintained and updated existing web applications for clients.',
        order: 2,
        startDate: new Date('2021-01-01'),
        endDate: new Date('2022-12-31'),
    },
    {
        role: 'Web Developer',
        company: 'Sanota Pvt Ltd',
        year: 'Jan 2020 – Dec 2020',
        description: "Built and deployed the company's official website using HTML, CSS, and Bootstrap.",
        order: 3,
        startDate: new Date('2020-01-01'),
        endDate: new Date('2020-12-31'),
    },
];

const PROJECTS = [
    {
        title: 'Tax Management SaaS Platform (TaxManager)',
        description: 'Complete tax management SaaS platform with dashboard and analytics.',
        techStack: ['Next.js', 'TypeScript', 'Prisma'],
        order: 0,
        demoUrl: 'https://taxmanager.vercel.app/',
    },
    {
        title: 'Pharmacy POS System',
        description: 'Complete point-of-sale system for pharmacy operations with inventory management and billing.',
        techStack: ['Electron', 'React', 'SQLite'],
        order: 1,
        inDevelopment: true,
    },
    {
        title: 'WhatsApp POS Bot',
        description: 'Automated WhatsApp bot for processing orders and managing customer interactions.',
        techStack: ['Node.js', 'Twilio', 'Supabase'],
        order: 2,
    },
    {
        title: 'MERN User System',
        description: 'Full authentication and user management system with role-based access control.',
        techStack: ['React', 'Redux', 'Zod'],
        order: 3,
    },
];

const SKILLS = [
    { name: 'React.js', level: 90, order: 1 },
    { name: 'Next.js', level: 85, order: 2 },
    { name: 'Tailwind', level: 88, order: 3 },
    { name: 'Three.js', level: 70, order: 4 },
    { name: 'Node.js', level: 82, order: 5 },
    { name: 'MongoDB', level: 75, order: 6 },
    { name: 'SQL', level: 72, order: 7 },
];

const REFERENCES = [
    {
        name: 'Dilshan Ranasinghe',
        company: 'Delta Capita',
        order: 1
    },
    {
        name: 'Uvinda Induwara',
        company: 'OSO PVT LTD',
        order: 2
    },
];

async function main() {
    console.log('Start seeding ...')

    // Profile with image
    await prisma.profileImage.deleteMany()
    await prisma.profile.deleteMany()
    const profile = await prisma.profile.create({
        data: {
            ...PROFILE,
            images: {
                create: {
                    url: '/images/image.png',
                    isActive: true,
                }
            }
        },
    })
    console.log('Created Profile with image')

    // Experience
    await prisma.experience.deleteMany()
    for (const exp of EXPERIENCE) {
        await prisma.experience.create({
            data: exp,
        })
    }
    console.log(`Created ${EXPERIENCE.length} Experience entries`)

    // Projects
    await prisma.project.deleteMany()
    for (const proj of PROJECTS) {
        await prisma.project.create({
            data: proj,
        })
    }
    console.log(`Created ${PROJECTS.length} Project entries`)

    // Skills
    await prisma.skill.deleteMany()
    for (const skill of SKILLS) {
        await prisma.skill.create({
            data: skill,
        })
    }
    console.log(`Created ${SKILLS.length} Skill entries`)

    // References
    await prisma.reference.deleteMany()
    for (const ref of REFERENCES) {
        await prisma.reference.create({
            data: ref,
        })
    }
    console.log(`Created ${REFERENCES.length} Reference entries`)

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
