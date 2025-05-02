import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUser({ token });
		}
	}, []);

	const login = (token) => {
		localStorage.setItem("token", token);
		setUser({ token });
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	const value = { user, login, logout, token: user?.token };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
