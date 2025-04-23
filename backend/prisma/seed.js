import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const players = [
  {
    name: "Lamine Yamal",
    age: 16,
    nationality: "Spain",
    club: "FC Barcelona",
    position: "Winger",
    overall: 75,
    potential: 91,
  },
  {
    name: "Arda Güler",
    age: 18,
    nationality: "Turkey",
    club: "Real Madrid",
    position: "Attacking Midfielder",
    overall: 73,
    potential: 89,
  },
  {
    name: "Warren Zaïre-Emery",
    age: 17,
    nationality: "France",
    club: "Paris Saint-Germain",
    position: "Central Midfielder",
    overall: 76,
    potential: 90,
  },
  {
    name: "Endrick",
    age: 17,
    nationality: "Brazil",
    club: "Palmeiras / Real Madrid (futur)",
    position: "Striker",
    overall: 72,
    potential: 88,
  },
  {
    name: "Rico Lewis",
    age: 19,
    nationality: "England",
    club: "Manchester City",
    position: "Right Back",
    overall: 75,
    potential: 86,
  },
];

async function main() {
  console.log("🌱 Seeding database...");
  for (const player of players) {
    await prisma.player.create({ data: player });
  }
  console.log("✅ Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
