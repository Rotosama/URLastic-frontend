import React, { useState } from "react";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import loginAPI from "../apiCalls/loginApi";
import AlertMessage from "./AlertMessage";

const LoginForm = ({ handleOpen, setIsLogin }) => {
	const navigate = useNavigate();
	const { setUserId, setToken, setIsLogged } = useUserContext();
	const { setMessage } = useMessageContext();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	async function handleLogin(event) {
		event.preventDefault();
		const response = await loginAPI.loginUser(email, password);
		if (response.error) {
			console.error(response.error);
			setErrorMessage(response.message);
		} else {
			setUserId(response.userId);
			setToken(response.token);
			setIsLogged(true);
			localStorage.setItem("token", response.token);
			localStorage.setItem("userId", response.userId);
			setMessage({ text: response.message, color: "green" });
			navigate("/");
			handleOpen(); // Cierra el modal después de iniciar sesión
		}
	}

	return (
		<Card color="transparent" shadow={false}>
			<Typography variant="h4" color="blue-gray">
				Welcome Back
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				Enter your details to login.
			</Typography>
			{errorMessage && (
				<AlertMessage
					message={errorMessage}
					color="red"
					onClose={() => setErrorMessage("")}
				/>
			)}
			<form
				className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
				onSubmit={handleLogin}
			>
				<div className="mb-1 flex flex-col gap-6">
					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
					>
						Your Email
					</Typography>
					<Input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						size="lg"
						placeholder="name@mail.com"
						className="!border-t-blue-gray-200 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
					/>
					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
					>
						Password
					</Typography>
					<Input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						size="lg"
						placeholder="********"
						className="!border-t-blue-gray-200 focus:!border-t-gray-900"
						labelProps={{
							className: "before:content-none after:content-none",
						}}
					/>
				</div>
				<Button className="mt-6" fullWidth type="submit" color="amber">
					Login
				</Button>
			</form>
			<Typography color="gray" className="mt-4 text-center">
				Don't have an account?{" "}
				<Button
					variant="text"
					color="blue"
					onClick={() => setIsLogin(false)}
				>
					Sign Up
				</Button>
			</Typography>
		</Card>
	);
};

export default LoginForm;
