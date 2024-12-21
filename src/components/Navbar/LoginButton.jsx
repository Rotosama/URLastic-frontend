import React, { useState, useContext } from "react";
import { Button } from "@material-tailwind/react";
import LoginModal from "../LoginModal";
import { UserContext } from "../../context/UserContext";

const LoginButton = () => {
	const [open, setOpen] = useState(false);
	const { isLogged, setIsLogged, setToken, setUserId } =
		useContext(UserContext);

	const handleOpen = () => {
		if (!isLogged) {
			setOpen(!open);
		}
	};

	const handleLogout = () => {
		setIsLogged(false);
		setToken(null);
		setUserId(null);
		localStorage.removeItem("token");
		localStorage.removeItem("userId");
	};

	return (
		<>
			{isLogged ? (
				<Button variant="text" color="blue" onClick={handleLogout}>
					Logout
				</Button>
			) : (
				<>
					<Button variant="text" color="blue" onClick={handleOpen}>
						Login
					</Button>
					<LoginModal open={open} handleOpen={handleOpen} />
				</>
			)}
		</>
	);
};

export default LoginButton;
