import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import urlAPI from "../../apiCalls/urlApi";
import {
	UserCircleIcon,
	ArrowRightOnRectangleIcon,
	TrashIcon,
	LinkIcon,
	CursorArrowRaysIcon,
	TrophyIcon,
} from "@heroicons/react/24/outline";

const Account = () => {
	const { token, userId, logout } = useContext(UserContext);
	const navigate = useNavigate();

	const [user, setUser] = useState(null);
	const [urls, setUrls] = useState([]);
	const [confirmDelete, setConfirmDelete] = useState(false);

	useEffect(() => {
		if (!token || !userId) return;
		const fetchData = async () => {
			const [userData, urlsData] = await Promise.all([
				urlAPI.getUserById(token, userId),
				urlAPI.getAllUrls(token, userId),
			]);
			setUser(userData);
			setUrls(urlsData || []);
		};
		fetchData();
	}, [token, userId]);

	const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0);
	const topUrl = urls.length
		? urls.reduce((best, u) => ((u.clicks || 0) > (best.clicks || 0) ? u : best), urls[0])
		: null;

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	const handleDeleteAccount = async () => {
		await urlAPI.deleteUser(token, userId);
		logout();
		navigate("/");
	};

	const capitalize = (str) =>
		str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

	return (
		<div className="min-h-[calc(100vh-72px)] bg-[#FFFAF5] px-4 py-12">
			<div className="max-w-xl mx-auto flex flex-col gap-4">

				{/* Profile card */}
				<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] p-6 flex items-center gap-5">
					<div className="w-16 h-16 rounded-2xl bg-[#FFD150] border-2 border-[#1C1C1C] shadow-[3px_3px_0px_#1C1C1C] flex items-center justify-center flex-shrink-0">
						<UserCircleIcon className="h-9 w-9 text-[#1C1C1C]" />
					</div>
					<div className="min-w-0">
						{user ? (
							<>
								<p className="text-xl font-extrabold text-[#1C1C1C] tracking-tight truncate">
									{capitalize(user.firstName)} {capitalize(user.lastName)}
								</p>
								<p className="text-sm text-[#6B6B6B] font-medium truncate">
									{user.email}
								</p>
							</>
						) : (
							<div className="flex flex-col gap-2">
								<div className="h-5 w-36 bg-[#F0EBE3] rounded-full animate-pulse" />
								<div className="h-4 w-48 bg-[#F0EBE3] rounded-full animate-pulse" />
							</div>
						)}
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 gap-4">
					<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] p-5 flex flex-col gap-1">
						<div className="w-9 h-9 rounded-xl bg-[#FF9760] border-2 border-[#1C1C1C] flex items-center justify-center mb-2">
							<LinkIcon className="h-4 w-4 text-[#1C1C1C]" />
						</div>
						<p className="text-3xl font-extrabold text-[#1C1C1C]">
							{urls.length}
						</p>
						<p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
							URLs created
						</p>
					</div>

					<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] p-5 flex flex-col gap-1">
						<div className="w-9 h-9 rounded-xl bg-[#F26076] border-2 border-[#1C1C1C] flex items-center justify-center mb-2">
							<CursorArrowRaysIcon className="h-4 w-4 text-[#1C1C1C]" />
						</div>
						<p className="text-3xl font-extrabold text-[#1C1C1C]">
							{totalClicks}
						</p>
						<p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
							Total clicks
						</p>
					</div>
				</div>

				{/* Top URL */}
				{topUrl && (topUrl.clicks || 0) > 0 && (
					<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] p-5">
						<div className="flex items-center gap-2 mb-3">
							<div className="w-7 h-7 rounded-lg bg-[#FFD150] border-2 border-[#1C1C1C] flex items-center justify-center">
								<TrophyIcon className="h-3.5 w-3.5 text-[#1C1C1C]" />
							</div>
							<p className="text-xs font-bold text-[#6B6B6B] uppercase tracking-widest">
								Most visited
							</p>
						</div>
						<p className="text-sm font-bold text-[#F26076] mb-1">
							/{topUrl.shortenUrl}
						</p>
						<p className="text-xs text-[#6B6B6B] truncate mb-2">
							{topUrl.originalUrl}
						</p>
						<span className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FFD150] text-[#1C1C1C] px-2.5 py-1 rounded-full border-2 border-[#1C1C1C]">
							<CursorArrowRaysIcon className="h-3 w-3" />
							{topUrl.clicks} clicks
						</span>
					</div>
				)}

				{/* Actions */}
				<div className="flex flex-col gap-3 pt-2">
					<button
						onClick={handleLogout}
						className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#1C1C1C] rounded-xl text-sm font-bold shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all text-[#1C1C1C]"
					>
						<ArrowRightOnRectangleIcon className="h-4 w-4" />
						Log out
					</button>

					<button
						onClick={() => setConfirmDelete(true)}
						className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#1C1C1C] rounded-xl text-sm font-bold shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all text-[#F26076]"
					>
						<TrashIcon className="h-4 w-4" />
						Delete account
					</button>
				</div>
			</div>

			{/* Delete account confirm dialog */}
			{confirmDelete && (
				<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
					<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[6px_6px_0px_#1C1C1C] p-6 max-w-sm w-full">
						<h3 className="font-extrabold text-lg text-[#1C1C1C] mb-2">
							Delete your account?
						</h3>
						<p className="text-sm text-[#6B6B6B] mb-6">
							This will permanently delete your account and all your shortened URLs. This action cannot be undone.
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => setConfirmDelete(false)}
								className="flex-1 py-2.5 border-2 border-[#1C1C1C] rounded-xl text-sm font-bold bg-white shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] transition-all"
							>
								Cancel
							</button>
							<button
								onClick={handleDeleteAccount}
								className="flex-1 py-2.5 bg-[#F26076] text-white border-2 border-[#1C1C1C] rounded-xl text-sm font-bold shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] transition-all"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Account;
