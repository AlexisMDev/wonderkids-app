import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import { fetchPlayers } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import ErrorAlert from "../components/ErrorAlert";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";

const ITEM_PER_PAGE = 10;

const Dashboard = () => {
	const { token } = useAuth();

	const [players, setPlayers] = useState([]);
	const [totalPlayers, setTotalPlayers] = useState(0);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);

	// Extraction des données uniques de la liste des joueurs
	const positions = [...new Set(players.map((p) => p.position))];
	const clubs = [...new Set(players.map((p) => p.club))];
	const nationalities = [new Set(players.map((p) => p.nationality))];

	// State de gestion des filtres
	const [filters, setFilters] = useState({
		name: "",
		positions: [],
		nationalities: [],
		potential: 50,
	});

	const loadPlayers = async () => {
		setLoading(true);
		setError(null);

		try {
			const data = await fetchPlayers({ page: currentPage, limit: 10, filters });
			setPlayers(data.players);
			setTotalPlayers(data.total);
		} catch (error) {
			setError("Une erreur est survenue lors du chargement des joueurs.");
		} finally {
			setLoading(false);
		}
	};
	// Chargement de la liste des wonderkids présents dans la BDD
	useEffect(() => {
		if (token) loadPlayers();
	}, [token, currentPage, filters]);

	const totalPages = Math.ceil(totalPlayers / ITEM_PER_PAGE);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Wonderkids</h1>

			<FilterBar filters={filters} setFilters={setFilters} />

			{error && <ErrorAlert message={error} />}
			{loading && <Spinner message="Chargement des joueurs..." />}

			{!loading && !error && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{players.map((player) => (
						<div key={player.id} className="p-4 bg-white rounded-xl shadow">
							<h2 className="font-semibold text-lg">{player.name}</h2>
							<p className="text-sm text-gray-600">Club : {player.club}</p>
							<p className="text-sm text-gray-600">Nationalité : {player.nationality}</p>
							<p className="text-sm text-gray-600">Position : {player.position}</p>
							<p className="text-sm text-gray-600">Potentiel : {player.potential}</p>
						</div>
					))}
				</div>
			)}
			<Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
		</div>
	);
};

export default Dashboard;
