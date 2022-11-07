import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const routineData = [
  {
    name: "Push Ups",
    goal: "Push ups are a great way to build upper body strength.",
  },
];
async function main() {
  console.log(`Start seeding ...`);
  for (const r of routineData) {
    const routine = await prisma.routine.create({
      data: r,
    });
    console.log(`Created routine with id: ${routine.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
