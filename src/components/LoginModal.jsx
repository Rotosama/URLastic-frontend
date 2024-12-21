import React, { useState } from "react";
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
	Typography,
} from "@material-tailwind/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginModal({ open, handleOpen }) {
	const [isLogin, setIsLogin] = useState(true); // Estado para alternar entre login y registro

	return (
		<Dialog open={open} handler={handleOpen}>
			<DialogHeader>{isLogin ? "Login" : "Sign Up"}</DialogHeader>
			<DialogBody divider>
				{isLogin ? (
					<LoginForm
						handleOpen={handleOpen}
						setIsLogin={setIsLogin}
					/>
				) : (
					<RegisterForm
						handleOpen={handleOpen}
						setIsLogin={setIsLogin}
					/>
				)}
			</DialogBody>
			<DialogFooter>
				<Button
					variant="text"
					color="red"
					onClick={handleOpen}
					className="mr-1"
				>
					<span>Cancel</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}
