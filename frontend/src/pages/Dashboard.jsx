import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchPlayers } from "../services/api";

const Dashboard = () => {
	const { token } = useAuth();
	const [players, setPlayers] = useState([]);

	useEffect(() => {
		const getPlayers = async () => {
			try {
				const data = await fetchPlayers(token);
				setPlayers(data);
			} catch (error) {
				console.error(error);
			}
		};

		if (token) getPlayers();
	}, [token]);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Liste des joueurs</h1>
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
		</div>
	);
};

export default Dashboard;
