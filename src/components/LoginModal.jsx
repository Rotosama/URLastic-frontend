import React, { useState } from "react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function LoginModal({ open, handleOpen }) {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			size="sm"
			className="bg-[#FFFAF5] !rounded-2xl border-2 border-[#1C1C1C] shadow-[6px_6px_0px_#1C1C1C]"
		>
			<div className="flex items-center justify-between px-6 pt-6 pb-2">
				<div className="flex gap-2">
					<button
						onClick={() => setIsLogin(true)}
						className={`px-4 py-1.5 text-sm font-bold rounded-xl border-2 border-[#1C1C1C] transition-all ${
							isLogin
								? "bg-[#F26076] text-white shadow-[2px_2px_0px_#1C1C1C]"
								: "bg-white text-[#1C1C1C]"
						}`}
					>
						Login
					</button>
					<button
						onClick={() => setIsLogin(false)}
						className={`px-4 py-1.5 text-sm font-bold rounded-xl border-2 border-[#1C1C1C] transition-all ${
							!isLogin
								? "bg-[#F26076] text-white shadow-[2px_2px_0px_#1C1C1C]"
								: "bg-white text-[#1C1C1C]"
						}`}
					>
						Sign Up
					</button>
				</div>
				<button
					onClick={handleOpen}
					className="p-1.5 rounded-lg hover:bg-[#F26076]/10 text-[#6B6B6B] hover:text-[#F26076] transition-colors"
				>
					<XMarkIcon className="h-5 w-5" />
				</button>
			</div>
			<DialogBody>
				{isLogin ? (
					<LoginForm handleOpen={handleOpen} setIsLogin={setIsLogin} />
				) : (
					<RegisterForm
						handleOpen={handleOpen}
						setIsLogin={setIsLogin}
					/>
				)}
			</DialogBody>
		</Dialog>
	);
}
