import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:3001/",
});

// Ajout du token d'auth dans chaque requête
API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const fetchPlayers = async ({ page = 1, limit = 10, position = "" }) => {
	try {
		const response = await API.get("/api/players", {
			params: { page, limit, position },
		});
		return response.data;
	} catch (err) {
		console.error("Erreur lors de la récupération des joueurs : ", err);
		throw err;
	}
};

export default API;
