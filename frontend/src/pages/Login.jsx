import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const res = await api.post("/auth/login", { email, password });
			login(res.data.token);
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data?.message || "Erreur lors de la connexion");
		}
	};

	return (
		<div className="min-h-screen flex-items-center justify-center bg-gray-100 px-4">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4">
				<h2 className="text-2xl font-semibold text-center">Connexion</h2>
				{error && <p className="text-red-500 text-sm">{error}</p>}

				<input
					type="email"
					className="w-full p-2 border rounded"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					className="w-full p-2 border rounded"
					placeholder="Mot de passe"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Se connecter</button>
			</form>
		</div>
	);
}
