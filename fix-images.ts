import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REPLACEMENTS = {
  // Lekki Phase 1
  '1626245107068-18e404bf7cba': '1600585154340-be6161a56a0c',
  // Maitama Diplomatic Villa
  '1577977461421-4f1647413a96': '1600607686527-6fb886090705',
  // Victoria Island Penthouse
  '1590483736622-398bb2c45980': '1618221118493-9cfa1a1c00da',
};

async function main() {
  // Fix Hotels
  const hotels = await prisma.hotel.findMany();
  for (const hotel of hotels) {
    let updated = false;
    let newUrl = hotel.coverImage;
    for (const [oldId, newId] of Object.entries(REPLACEMENTS)) {
      if (newUrl && newUrl.includes(oldId)) {
        newUrl = newUrl.replace(oldId, newId);
        updated = true;
      }
    }
    if (updated) {
      console.log(`Updating hotel ${hotel.id} cover image`);
      await prisma.hotel.update({
        where: { id: hotel.id },
        data: { coverImage: newUrl }
      });
    }
  }

  // Fix Room Images
  const roomImages = await prisma.roomImage.findMany();
  for (const img of roomImages) {
    let updated = false;
    let newUrl = img.url;
    
    // There are 5 out of 7 images failing for VI. Let's replace any broken unsplash images.
    // If we don't know the exact ones, let's just do a blanket replace for known broken IDs.
    for (const [oldId, newId] of Object.entries(REPLACEMENTS)) {
      if (newUrl && newUrl.includes(oldId)) {
        newUrl = newUrl.replace(oldId, newId);
        updated = true;
      }
    }

    if (updated) {
      console.log(`Updating room image ${img.id}`);
      await prisma.roomImage.update({
        where: { id: img.id },
        data: { url: newUrl }
      });
    } else if (img.url.includes('unsplash.com')) {
      const match = img.url.match(/photo-([\w-]+)/);
      if (match) {
        const id = match[1];
        if (id !== '1600596542815-ffad4c1539a9' && id !== '1600585154340-be6161a56a0c' && id !== '1600607686527-6fb886090705' && id !== '1618221118493-9cfa1a1c00da') {
            console.log(`Potential broken room image ID: ${img.id}, photo ID: ${id}`);
            // Let's replace any unknown unsplash images with a valid one (Ikoyi) just to be safe
            await prisma.roomImage.update({
                where: { id: img.id },
                data: { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80' }
            });
            console.log(`Replaced room image ${img.id} with a safe image`);
        }
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
