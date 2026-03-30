import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useMessageContext } from "../context/MessageContext";
import loginAPI from "../apiCalls/loginApi";

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
			setErrorMessage(response.message);
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
		<form className="px-2 pb-4" onSubmit={handleLogin}>
			{errorMessage && (
				<div className="mb-4 bg-[#F26076]/10 border-2 border-[#F26076] text-[#F26076] text-sm px-4 py-3 rounded-xl font-medium">
					{errorMessage}
				</div>
			)}
			<div className="flex flex-col gap-4">
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
				Login
			</button>
			<p className="text-center text-sm text-[#6B6B6B] mt-4 font-medium">
				No account?{" "}
				<button
					type="button"
					onClick={() => setIsLogin(false)}
					className="font-bold text-[#458B73] hover:underline"
				>
					Sign up
				</button>
			</p>
		</form>
	);
};

export default LoginForm;
