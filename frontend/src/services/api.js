import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3001/",
});

export const fetchPlayers = async (token) => {
	try {
		const response = await api.get("/api/players", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (err) {
		console.error("Erreur lors de la récupération des joueurs : ", err);
		throw err;
	}
};

export default api;
