import prisma from "../utils/prisma.js";

export const getAllPlayers = async (req, res) => {
	try {
		const players = await prisma.player.findMany();
		res.json(players);
	} catch (err) {
		console.error("Erreur lors de la récupération des joueurs:", err);
		res.status(500).json({ error: "Erreur serveur lors de la récupération des joueurs." });
	}
};

// Tu peux aussi ajouter d'autres handlers ici plus tard :
// - getPlayerById
// - createPlayer
// - updatePlayer
// - deletePlayer

export const getPlayerById = async (req, res) => {
	const { id } = req.params;
	try {
		const player = await prisma.player.findUnique({
			where: { id: parseInt(id) },
		});

		if (!player) {
			return res.status(404).json({ error: "Joueur non trouvé" });
		}

		res.json(player);
	} catch (err) {
		console.error("Erreur getPlayerId:", err);
		res.status(500).json({ error: "Erreur serveur" });
	}
};

export const getTopPlayer = async (req, res) => {
	try {
		const players = await prisma.player.findMany({
			orderBy: { potential: "desc" },
			take: 10,
		});
		res.json(players);
	} catch (err) {
		console.error("Erreur getTopPlayer:", err);
		res.status(500).json({ error: "Erreur serveur" });
	}
};

export const searchPlayers = async (req, res) => {
	const { name, age, position, club } = req.query;

	try {
		const players = await prisma.player.findMany({
			...(name && { name: { contains: name, mode: "insensitive" } }),
			...(age && { age: parseInt(age) }),
			...(position && { position: { equals: position } }),
			...(club && { club: { contains: club, mode: "insensitive" } }),
		});

		res.json(players);
	} catch (err) {
		console.error("Erreur searchPlayers:", err);
		res.status(500).json({ error: "Erreur serveur" });
	}
};
