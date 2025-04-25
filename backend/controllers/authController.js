import prima from "../utils/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { email, password } = req.body;
	try {
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Utilisateur déjà existant" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prima.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		res.status(201).json({ message: "Inscription réussie", user: { id: user.id, email: user.email } });
	} catch (err) {
		res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: "Email ou mot de passe incorrect" });
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(400).json({ message: "Email ou mot de passe incorrect" });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
		res.status(200).json({ message: "Connexion réussie", token });
	} catch (err) {
		res.status(500).json({ message: "Erreur lors de la connexion", error: err.message });
	}
};
