export default function Spinner({ message = "Chargement ..." }) {
	return (
		<div className="flex items-center gap-2 text-gray-500">
			<span className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
			<span>{message}</span>
		</div>
	);
}
