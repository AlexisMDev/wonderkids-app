import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const PublicRoute = ({ children }) => {
	const { user } = useAuth();

	if (user) {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};

export default PublicRoute;
