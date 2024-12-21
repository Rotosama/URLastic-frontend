import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import LoginModal from "../LoginModal";
import { useUserContext } from "../../context/UserContext";

export default function LoginButton() {
	const [open, setOpen] = useState(false);
	const { isLogged } = useUserContext();

	const handleOpen = () => setOpen(!open);

	return (
		<>
			<Button color="blue" onClick={handleOpen}>
				{isLogged ? "Log out" : "Log In"}
			</Button>
			<LoginModal open={open} handleOpen={handleOpen} />
		</>
	);
}
