import { useContext } from "react";
import { createContext, useState } from "react";
import { useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	const [userId, setUserId] = useState("");
	const [token, setToken] = useState("");
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const savedToken = localStorage.getItem("token");
		const savedUserId = localStorage.getItem("userId");

		if (savedToken && savedUserId) {
			setToken(savedToken);
			setUserId(savedUserId);
			setIsLogged(true);
		}
	}, []);

	const login = (token, userId) => {
		setToken(token);
		setUserId(userId);
		setIsLogged(true);
		localStorage.setItem("token", token);
		localStorage.setItem("userId", userId);
	};

	const logout = () => {
		setToken(null);
		setUserId(null);
		setIsLogged(false);
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
	};

	return (
		<UserContext.Provider
			value={{
				userId,
				token,
				isLogged,
				setUserId,
				setToken,
				setIsLogged,
				login,
				logout,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

const useUserContext = () => {
	return useContext(UserContext);
};

export { UserContext, UserContextProvider, useUserContext };
