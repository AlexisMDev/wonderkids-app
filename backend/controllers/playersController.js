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

export const getPlayers = async (req, res) => {
	try {
		const {
			page = 1,
			limit = 10,
			name = "",
			positions = [],
			nationalities = [],
			potentialMin = 0,
			potentialMax = 100,
		} = req.query;

		const pageNumber = parseInt(page);
		const pageSize = parseInt(limit);
		const skip = (pageNumber - 1) * pageSize;

		// Construction dynamique des filtres
		const where = {
			AND: [
				name ? { name: { contains: name, mode: "insensitive" } } : {},
				positions.length ? { position: { in: Array.isArray(positions) ? positions : [positions] } } : {},
				nationalities.length
					? { nationality: { in: Array.isArray(nationalities) ? nationalities : [nationalities] } }
					: {},
				{
					potential: {
						gte: Number(potentialMin),
						lte: Number(potentialMax),
					},
				},
			],
		};

		const [players, total] = await Promise.all([
			prisma.player.findMany({
				where,
				skip,
				take: pageSize,
				orderBy: { potential: "desc" },
			}),
			prisma.player.count({ where }),
		]);

		res.json({
			players,
			total,
			page: pageNumber,
			totalPages: Math.ceil(total / pageSize),
		});
	} catch (err) {
		res.status(500).json({ error: "Erreur lors de la récupération des joueurs." });
	}
};

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
