import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchPlayers } from "../services/api";
import Spinner from "../components/Spinner";
import ErrorAlert from "../components/ErrorAlert";

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
			{loading && <Spinner message="Chargement des joueurs..." />}
			{error && <ErrorAlert message={error} />}

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
