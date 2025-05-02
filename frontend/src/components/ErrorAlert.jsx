import { AlertTriangle } from "lucide-react";

export default function ErrorAlert({ message = "Une erreur est survenue." }) {
	return (
		<div className="flex items-center gap-3 p-4 rounded-xl bg-red-100 border border-red-300 text-red-700 shadow-sm">
			<AlertTriangle className="w-5 h-5 text-red-500" />
			<span className="text-sm">{message}</span>
		</div>
	);
}
