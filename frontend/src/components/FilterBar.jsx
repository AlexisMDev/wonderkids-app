import { useEffect, useState } from "react";

const positions = ["Gardien", "Défenseur", "Milieu", "Attaquant"];
const nationalities = ["France", "Brésil", "Angleterre", "Espagne", "Allemagne"];

const FilterBar = ({ filters, setFilters }) => {
	const [localFilters, setLocalFilters] = useState(filters);

	useEffect(() => {
		setFilters(localFilters);
	}, [localFilters]);

	const handleCheckboxChange = (type, value) => {
		setLocalFilters((prev) => {
			const currentValue = prev[type];
			const updated = currentValue.includes(value) ? currentValue.filter((v) => v !== value) : [...currentValue, value];
			return { ...prev, [type]: updated };
		});
	};

	return (
		<div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-4">
			<input
				type="text"
				id="search"
				placeholder="Rechercher un joueur"
				className="p-2 border rounded"
				value={localFilters.name}
				onChange={(e) => setLocalFilters({ ...localFilters, name: e.target.value })}
			/>

			<div>
				<h3 className="font-semibold mb-1">Postes</h3>
				<div className="flex flex-wrap gap-3">
					{positions.map((pos) => (
						<label key={pos} className="flex items-center gap-1">
							<input
								type="checkbox"
								checked={localFilters.positions.includes(pos)}
								onChange={() => handleCheckboxChange("positions", pos)}
							/>
							{pos}
						</label>
					))}
				</div>
			</div>

			<div>
				<h3 className="font-semibold mb-1">Nationalités</h3>
				<div className="flex flex-wrap gap-3">
					{nationalities.map((nat) => (
						<label key={nat} className="flex items-center gap-1">
							<input
								type="checkbox"
								checked={localFilters.nationalities.includes(nat)}
								onChange={() => handleCheckboxChange("nationalities", nat)}
							/>
							{nat}
						</label>
					))}
				</div>
			</div>
		</div>
	);
};

export default FilterBar;
