import { useEffect, useState } from "react";

const positions = ["Gardien", "Défenseur", "Milieu", "Attaquant"];
const nationalities = ["France", "Brésil", "Angleterre", "Espagne", "Allemagne"];

const FilterBar = ({ filters, onFilterChange }) => {
	const [localFilters, setLocalFilters] = useState(filters);

	useEffect(() => {
		onFilterChange(localFilters);
	}, [localFilters]);

	const handleCheckboxChange = (type, value) => {
		const currentValue = localFilters[type];
		const updated = currentValue.includes(value) ? currentValue.filter((v) => v !== value) : [...currentValue, value];
		setLocalFilters((prev) => ({ ...prev, [type]: updated }));
	};

	const handleInputChange = (e) => {
		setLocalFilters((prev) => ({ ...prev, name: e.target.value }));
	};

	return (
		<div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-4">
			<input
				type="text"
				id="search"
				placeholder="Rechercher un joueur"
				className="p-2 border rounded"
				value={localFilters.name}
				onChange={handleInputChange}
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
