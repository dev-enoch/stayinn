import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "Hotel" CASCADE;`);
  console.log("Wiped hotels table successfully!");
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
