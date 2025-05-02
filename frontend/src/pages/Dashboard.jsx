import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import { fetchPlayers } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import ErrorAlert from "../components/ErrorAlert";
import Pagination from "../components/Pagination";

const Dashboard = () => {
	const { token } = useAuth();

	const [players, setPlayers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [position, setPosition] = useState("");

	useEffect(() => {
		const loadPlayers = async () => {
			setLoading(true);
			setError(null);

			try {
				const data = await fetchPlayers({ page, limit: 10, position });
				setPlayers(data.players);
				setTotalPages(data.totalPages);
			} catch (error) {
				setError("Une erreur est survenue lors du chargement des joueurs.");
			} finally {
				setLoading(false);
			}
		};

		if (token) loadPlayers();
	}, [page, position]);

	const handlePageChange = (newPage) => {
		if (newPage !== page) setPage(newPage);
	};

	const handleFilterChange = (e) => {
		setPosition(e.target.value);
		setPage(1);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Wonderkids</h1>

			<div className="mb-4 flex gap-3 items-center">
				<label htmlFor="position" className="text-sm font-medium">
					Filtrer par poste :
				</label>
				<select
					id="position"
					className="p-2 rounded border border-gray-300"
					value={position}
					onChange={handleFilterChange}
				>
					<option value="">Tous</option>
					<option value="Gardien">Gardien</option>
					<option value="Défenseur">Défenseur</option>
					<option value="Milieu">Milieu</option>
					<option value="Attaquant">Attaquant</option>
				</select>
			</div>

			{error && <ErrorAlert message={error} />}
			{loading && <Spinner message="Chargement des joueurs..." />}

			{!loading && !error && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{console.log(players)}
					{players.map((player) => (
						<div key={player.id} className="p-4 bg-white rounded-xl shadow">
							<h2 className="font-semibold text-lg">{player.name}</h2>
							<p className="text-sm text-gray-600">{player.position}</p>
						</div>
					))}
				</div>
			)}
			<Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
		</div>
	);
};

export default Dashboard;
