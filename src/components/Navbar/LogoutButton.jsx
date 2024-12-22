import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { Button } from "@material-tailwind/react";

const LogoutButton = () => {
	const UserContext = useUserContext();
	const navigate = useNavigate();

	function handleLogout() {
		UserContext.setToken("");
		UserContext.setIsLogged(false);
		UserContext.setUserId("");
		navigate("/");
	}
	return (
		<>
			<Button to={"/"}>
				<button onClick={handleLogout}>Log out</button>
			</Button>
		</>
	);
};

export default LogoutButton;
