import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const profiles = await prisma.profile.findMany({
        include: { images: true }
    });
    console.log('ALL PROFILE DATA:');
    profiles.forEach(p => {
        console.log(`Name: ${p.name}`);
        console.log(`Active Image URL: ${p.images.find(img => img.isActive)?.url || 'None'}`);
        console.log('All Images:', p.images.map(i => i.url));
        console.log('---');
    });

    if (profiles.length === 0) {
        console.log('No profiles found.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
