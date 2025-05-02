import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchPlayers } from "../services/api";

const Dashboard = () => {
	const { token } = useAuth();
	const [players, setPlayers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getPlayers = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchPlayers(token);
				setPlayers(data);
			} catch (error) {
				setError("Une erreur est survenue lors du chargement des joueurs.");
			} finally {
				setLoading(false);
			}
		};

		if (token) getPlayers();
	}, [token]);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Wonderkids</h1>
			{loading && <p className="text-gray-500 italic animate-pulse">Chargement en cours...</p>}
			{error && <p className="text-red-500 font-semibold">{error}</p>}

			{!loading && !error && (
				<ul className="space-y-2">
					{console.log(players)}
					{players.map((player) => {
						return (
							<li key={player.id} className="p-4 bg-white shadow rounded hover:bg-gray-50">
								{player.name} - {player.age} ans - {player.club}
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Dashboard;
