import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const players = [
	{
		name: "Lamine Yamal",
		age: 16,
		nationality: "Spain",
		club: "FC Barcelona",
		position: "Attaquant",
		overall: 75,
		potential: 91,
	},
	{
		name: "Arda Güler",
		age: 18,
		nationality: "Turkey",
		club: "Real Madrid",
		position: "Milieu",
		overall: 73,
		potential: 89,
	},
	{
		name: "Warren Zaïre-Emery",
		age: 17,
		nationality: "France",
		club: "Paris Saint-Germain",
		position: "Milieu",
		overall: 76,
		potential: 90,
	},
	{
		name: "Endrick",
		age: 17,
		nationality: "Brazil",
		club: "Palmeiras / Real Madrid (futur)",
		position: "Attaquant",
		overall: 72,
		potential: 88,
	},
	{
		name: "Rico Lewis",
		age: 19,
		nationality: "England",
		club: "Manchester City",
		position: "Défenseur",
		overall: 75,
		potential: 86,
	},
];

async function main() {
	console.log("🌱 Seeding database...");
	// Ajout des joueurs en BDD
	for (const player of players) {
		await prisma.player.create({ data: player });
	}

	// Ajout d'un utilisateur test en BDD
	const hashedPassword = await bcrypt.hash("password123", 10);
	await prisma.user.create({
		data: {
			email: "test@example.com",
			password: hashedPassword,
		},
	});

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
