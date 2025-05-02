import path from "path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";

import fs from "fs/promises";

import prisma from "../utils/prisma.js";

// Pour obtenir le chemin absolu en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
	const dataPath = path.join(__dirname, "wonderkids.json");
	const file = await fs.readFile(dataPath, "utf-8");
	const players = JSON.parse(file);

	for (const player of players) {
		await prisma.player.create({
			data: player,
		});
	}

	console.log(`✅ ${players.length} wonderkids imported.`);

	// Ajout d'un utilisateur test en BDD
	const hashedPassword = await bcrypt.hash("password123", 10);
	await prisma.user.create({
		data: {
			email: "test@example.com",
			password: hashedPassword,
		},
	});
	console.log(`✅ user test imported.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
