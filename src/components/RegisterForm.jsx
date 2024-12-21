import React, { useState } from "react";
import { Input, Button, Typography, Card } from "@material-tailwind/react";
import registerAPI from "../apiCalls/registerApi";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../context/MessageContext";
import AlertMessage from "./AlertMessage";

const RegisterForm = ({ handleOpen, setIsLogin }) => {
	const { setToken, setIsLogged, setUserId } = useUserContext();
	const { setMessage } = useMessageContext();
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	async function handleRegister(event) {
		event.preventDefault();
		const response = await registerAPI.registerUser(
			firstName,
			lastName,
			email,
			password
		);
		if (response.error) {
			setErrorMessage(response.error.message);
			console.log(errorMessage);
		} else {
			setUserId(response.userId);
			setToken(response.token);
			setIsLogged(true);
			localStorage.setItem("token", response.token);
			localStorage.setItem("userId", response.userId);
			setMessage({ text: response.message, color: "green" });
			navigate("/");
			handleOpen(); // Cierra el modal después de registrarse
		}
	}

	return (
		<Card color="transparent" shadow={false} className="flex items-center">
			<Typography variant="h4" color="blue-gray">
				Create an Account
			</Typography>
			<Typography color="gray" className="mt-1 font-normal">
				Enter your details to register.
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
				onSubmit={handleRegister}
			>
				<div className="mb-1 flex flex-col gap-6">
					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
					>
						First Name
					</Typography>
					<Input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						size="lg"
						placeholder="John"
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
						Last Name
					</Typography>
					<Input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						size="lg"
						placeholder="Doe"
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
					Sign Up
				</Button>
			</form>
			<Typography color="gray" className="mt-4 text-center">
				Already have an account?{" "}
				<Button
					variant="text"
					color="blue"
					onClick={() => setIsLogin(true)}
				>
					Login
				</Button>
			</Typography>
		</Card>
	);
};

export default RegisterForm;
