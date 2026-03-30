import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import LoginButton from "./LoginButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { InboxArrowDownIcon, UserIcon } from "@heroicons/react/24/solid";

export function CustomNavbar() {
	const [openNav, setOpenNav] = React.useState(false);
	const { isLogged } = React.useContext(UserContext);

	React.useEffect(() => {
		const handleResize = () =>
			window.innerWidth >= 960 && setOpenNav(false);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<nav className="bg-white border-b-2 border-[#1C1C1C] sticky top-0 z-50">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Brand */}
				<Link to="/" className="flex items-center gap-1">
					<span className="text-2xl font-extrabold tracking-tight">
						<span className="text-[#F26076]">URL</span>
						<span className="text-[#1C1C1C]">astic</span>
					</span>
				</Link>

				{/* Desktop nav */}
				<div className="hidden lg:flex items-center gap-6">
					{isLogged && (
						<Link
							to="/dashboard"
							className="flex items-center gap-1.5 text-sm font-semibold text-[#1C1C1C] hover:text-[#F26076] transition-colors"
						>
							<InboxArrowDownIcon className="h-4 w-4" />
							Dashboard
						</Link>
					)}
					<Link
						to="/account"
						className="flex items-center gap-1.5 text-sm font-semibold text-[#1C1C1C] hover:text-[#F26076] transition-colors"
					>
						<UserIcon className="h-4 w-4" />
						Account
					</Link>
					<LoginButton />
				</div>

				{/* Mobile hamburger */}
				<button
					className="lg:hidden p-2 rounded-lg border-2 border-[#1C1C1C]"
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon className="h-5 w-5" />
					) : (
						<Bars3Icon className="h-5 w-5" />
					)}
				</button>
			</div>

			{/* Mobile menu */}
			{openNav && (
				<div className="lg:hidden border-t-2 border-[#1C1C1C] bg-white px-4 py-4 flex flex-col gap-4">
					{isLogged && (
						<Link
							to="/dashboard"
							className="flex items-center gap-2 text-sm font-semibold"
							onClick={() => setOpenNav(false)}
						>
							<InboxArrowDownIcon className="h-4 w-4" />
							Dashboard
						</Link>
					)}
					<Link
						to="/account"
						className="flex items-center gap-2 text-sm font-semibold"
						onClick={() => setOpenNav(false)}
					>
						<UserIcon className="h-4 w-4" />
						Account
					</Link>
					<LoginButton />
				</div>
			)}
		</nav>
	);
}

export default CustomNavbar;
