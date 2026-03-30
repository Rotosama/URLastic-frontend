import React, { useState, useContext } from "react";
import LoginModal from "../LoginModal";
import { UserContext } from "../../context/UserContext";

const LoginButton = () => {
	const [open, setOpen] = useState(false);
	const { isLogged, setIsLogged, setToken, setUserId } =
		useContext(UserContext);

	const handleOpen = () => {
		if (!isLogged) setOpen(!open);
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
				<button
					onClick={handleLogout}
					className="px-4 py-2 text-sm font-bold text-[#458B73] border-2 border-[#458B73] rounded-xl hover:bg-[#458B73] hover:text-white transition-colors"
				>
					Logout
				</button>
			) : (
				<>
					<button
						onClick={handleOpen}
						className="px-4 py-2 text-sm font-bold text-white bg-[#F26076] border-2 border-[#1C1C1C] rounded-xl shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all"
					>
						Login / Sign Up
					</button>
					<LoginModal open={open} handleOpen={handleOpen} />
				</>
			)}
		</>
	);
};

export default LoginButton;
