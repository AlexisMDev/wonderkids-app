import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route path="*" element={<Login />} />
			</Routes>
		</BrowserRouter>
	);
}
