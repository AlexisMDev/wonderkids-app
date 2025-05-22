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

export const fetchPlayers = async ({ page = 1, limit = 10, filters = {} }) => {
	const params = new URLSearchParams();

	params.append("page", page);
	params.append("limit", limit);

	if (filters.name) params.append("name", filters.name);
	if (filters.positions && filters.positions.length > 0) {
		filters.positions.forEach((pos) => params.append("positions", pos));
	}
	if (filters.nationalities && filters.nationalities.length > 0) {
		filters.nationalities.forEach((pos) => params.append("nationalities", pos));
	}
	params.append("potentialMin", filters.potentialMin || 0);

	try {
		const response = await API.get(`/api/players?${params.toString()}`);
		return response.data;
	} catch (err) {
		console.error("Erreur lors de la récupération des joueurs : ", err);
		throw err;
	}
};

export default API;
