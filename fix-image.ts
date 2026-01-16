import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Find the currently active broken image
    const brokenImage = await prisma.profileImage.findFirst({
        where: {
            isActive: true,
            url: { contains: 'uploads' }
        }
    });

    if (brokenImage) {
        console.log(`Found broken active image: ${brokenImage.url}, ID: ${brokenImage.id}`);

        // Deactivate it
        await prisma.profileImage.update({
            where: { id: brokenImage.id },
            data: { isActive: false }
        });

        console.log('Successfully marked broken image as inactive.');
    } else {
        console.log('No broken active image found.');
    }

    // Check what is active now (should be nothing, or another image)
    const activeImage = await prisma.profileImage.findFirst({
        where: { isActive: true }
    });

    console.log(`Current active image: ${activeImage ? activeImage.url : 'None (System will use default)'}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
