import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.cabin.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "001",
      maxCapacity: 2,
      regularPrice: 250,
      discount: 50,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-001.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "002",
      maxCapacity: 4,
      regularPrice: 400,
      discount: 50,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-002.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "003",
      maxCapacity: 4,
      regularPrice: 300,
      discount: 0,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-003.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "004",
      maxCapacity: 4,
      regularPrice: 500,
      discount: 50,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-004.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "005",
      maxCapacity: 6,
      regularPrice: 350,
      discount: 0,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-005.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "006",
      maxCapacity: 6,
      regularPrice: 800,
      discount: 100,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-006.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: "007",
      maxCapacity: 8,
      regularPrice: 600,
      discount: 100,
      description: "Small luxury cabin in the woods",
      image: "/file/cabin/cabin-007.jpg",
    },
  });
  await prisma.cabin.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: "008",
      maxCapacity: 10,
      regularPrice: 1400,
      discount: 0,
      description: "Big luxury cabin in the woods",
      image: "/file/cabin/cabin-008.jpg",
    },
  });

  await prisma.setting.upsert({
    where: {
      id: 1,
    },
    update: {},
    create: {
      maxBookingLength: 3,
      minBookingLength: 90,
      maxGuestsPerBooking: 8,
      breakfastPrice: 15,
    },
  });
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
