import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const newTagline = `TVA AGENT ${Date.now()}`; // Unique timestamped tagline

    await prisma.profile.updateMany({
        data: { tagline: newTagline }
    });

    console.log(`Updated tagline to: ${newTagline}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
