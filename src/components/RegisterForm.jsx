import React, { useState } from "react";
import registerAPI from "../apiCalls/registerApi";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../context/MessageContext";

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
		} else {
			setUserId(response.userId);
			setToken(response.token);
			setIsLogged(true);
			localStorage.setItem("token", response.token);
			localStorage.setItem("userId", response.userId);
			setMessage({ text: response.message, color: "green" });
			navigate("/");
			handleOpen();
		}
	}

	return (
		<form className="px-2 pb-4" onSubmit={handleRegister}>
			{errorMessage && (
				<div className="mb-4 bg-[#F26076]/10 border-2 border-[#F26076] text-[#F26076] text-sm px-4 py-3 rounded-xl font-medium">
					{errorMessage}
				</div>
			)}
			<div className="flex flex-col gap-4">
				<div className="flex gap-3">
					<div className="flex-1">
						<label className="block text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-1.5">
							First name
						</label>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="John"
							className="w-full px-4 py-3 border-2 border-[#1C1C1C] rounded-xl text-sm bg-white outline-none focus:border-[#F26076] transition-colors font-medium"
						/>
					</div>
					<div className="flex-1">
						<label className="block text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-1.5">
							Last name
						</label>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Doe"
							className="w-full px-4 py-3 border-2 border-[#1C1C1C] rounded-xl text-sm bg-white outline-none focus:border-[#F26076] transition-colors font-medium"
						/>
					</div>
				</div>
				<div>
					<label className="block text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-1.5">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="name@mail.com"
						className="w-full px-4 py-3 border-2 border-[#1C1C1C] rounded-xl text-sm bg-white outline-none focus:border-[#F26076] transition-colors font-medium"
					/>
				</div>
				<div>
					<label className="block text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-1.5">
						Password
					</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						className="w-full px-4 py-3 border-2 border-[#1C1C1C] rounded-xl text-sm bg-white outline-none focus:border-[#F26076] transition-colors font-medium"
					/>
				</div>
			</div>
			<button
				type="submit"
				className="mt-6 w-full py-3 bg-[#F26076] text-white font-bold text-sm border-2 border-[#1C1C1C] rounded-xl shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all"
			>
				Create account
			</button>
			<p className="text-center text-sm text-[#6B6B6B] mt-4 font-medium">
				Already have an account?{" "}
				<button
					type="button"
					onClick={() => setIsLogin(true)}
					className="font-bold text-[#458B73] hover:underline"
				>
					Login
				</button>
			</p>
		</form>
	);
};

export default RegisterForm;
