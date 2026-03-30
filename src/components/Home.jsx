import React, { useContext, useState } from "react";
import urlAPI from "../apiCalls/urlApi";
import { useMessageContext } from "../context/MessageContext";
import { UserContext } from "../context/UserContext";
import ShortenURL from "./ShortenURL";
import CollapseDefault from "./CollapseDefault";
import {
	LinkIcon,
	ScissorsIcon,
	SparklesIcon,
	BoltIcon,
	TagIcon,
	QrCodeIcon,
	Squares2X2Icon,
	LockClosedIcon,
	DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

function isValidUrl(string) {
	try {
		const url = new URL(string);
		return url.protocol === "http:" || url.protocol === "https:";
	} catch {
		return false;
	}
}

const features = [
	{
		icon: BoltIcon,
		color: "#FFD150",
		title: "Easy & Fast",
		description: "Paste your long link and get a shortened URL in seconds. No setup needed.",
	},
	{
		icon: TagIcon,
		color: "#FF9760",
		title: "Custom Aliases",
		description: "Registered users can set a custom name for their links instead of a random code.",
	},
	{
		icon: QrCodeIcon,
		color: "#F26076",
		title: "QR Code",
		description: "Every shortened URL comes with an auto-generated QR code ready to download or share.",
	},
	{
		icon: Squares2X2Icon,
		color: "#458B73",
		title: "Dashboard",
		description: "Manage all your links from a personal dashboard. Copy, delete or customise with one click.",
	},
	{
		icon: LockClosedIcon,
		color: "#F26076",
		title: "Secure",
		description: "Your data is protected. Passwords are encrypted and all traffic runs over HTTPS.",
	},
	{
		icon: DevicePhoneMobileIcon,
		color: "#FFD150",
		title: "Any Device",
		description: "URLastic works seamlessly on smartphones, tablets and desktop browsers.",
	},
];

const Home = () => {
	const [url, setUrl] = useState("");
	const [urlId, setUrlId] = useState("");
	const [urlError, setUrlError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { token, isLogged } = useContext(UserContext);
	const { message, setMessage } = useMessageContext();
	const [showCollapse, setShowCollapse] = useState(false);

	async function cutUrl(event) {
		event.preventDefault();
		if (!url.trim()) return;
		if (!isValidUrl(url)) {
			setUrlError("Please enter a valid URL starting with http:// or https://");
			return;
		}
		setUrlError("");
		setIsLoading(true);
		const response = await urlAPI.postUrl(token, url);
		setIsLoading(false);
		setUrlId(response._id);
	}

	return (
		<div className="min-h-[calc(100vh-72px)] bg-[#FFFAF5] flex flex-col items-center px-4">
			{/* Toast notification */}
			{message && (
				<div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#458B73] text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold flex items-center gap-3">
					{message.text}
					<button
						onClick={() => setMessage(null)}
						className="font-black opacity-70 hover:opacity-100"
					>
						×
					</button>
				</div>
			)}

			{/* Hero section */}
			<div className="flex flex-col items-center w-full max-w-xl py-16 md:py-24">
				{/* Badge */}
				<span className="bg-[#FFD150] text-[#1C1C1C] text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase border-2 border-[#1C1C1C] shadow-[2px_2px_0px_#1C1C1C]">
					✂ URL Shortener
				</span>

				{/* Heading */}
				<h1 className="text-5xl md:text-7xl font-extrabold text-[#1C1C1C] text-center leading-tight mb-4 tracking-tight">
					Make it{" "}
					<span className="text-[#F26076] relative">
						short.
						<span className="absolute -bottom-1 left-0 w-full h-1 bg-[#FFD150] rounded-full" />
					</span>
				</h1>
				<p className="text-[#6B6B6B] text-center text-lg mb-12 max-w-md font-medium">
					Paste your long URL and get a clean, shareable link in seconds.
				</p>

				{/* Form */}
				<div className="w-full">
					<div className={`flex items-center gap-3 bg-white border-2 rounded-2xl px-4 py-3.5 shadow-[4px_4px_0px_#1C1C1C] mb-1 transition-colors ${urlError ? "border-[#F26076]" : "border-[#1C1C1C] focus-within:border-[#F26076]"}`}>
						<LinkIcon className="h-5 w-5 text-[#AAAAAA] flex-shrink-0" />
						<input
							value={url}
							onChange={(e) => {
								setUrl(e.target.value);
								if (urlError) setUrlError("");
							}}
							onKeyDown={(e) => e.key === "Enter" && cutUrl(e)}
							placeholder="https://your-very-long-url.com/..."
							className="flex-1 outline-none text-[#1C1C1C] bg-transparent placeholder-[#BBBBBB] text-sm font-medium"
						/>
					</div>

					{urlError && (
						<p className="text-xs text-[#F26076] font-semibold mb-3 px-1">
							{urlError}
						</p>
					)}

					<div className={`flex gap-3 ${urlError ? "mt-0" : "mt-4"}`}>
						{isLogged && (
							<button
								onClick={() => setShowCollapse((c) => !c)}
								className="px-5 py-3 border-2 border-[#1C1C1C] rounded-xl text-sm font-bold bg-white shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all text-[#1C1C1C]"
							>
								Options
							</button>
						)}
						<button
							onClick={cutUrl}
							disabled={isLoading}
							className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#F26076] text-white border-2 border-[#1C1C1C] rounded-xl text-sm font-bold shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[3px_3px_0px_#1C1C1C]"
						>
							{isLoading ? (
								<>
									<svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
									</svg>
									Shortening...
								</>
							) : (
								<>
									<ScissorsIcon className="h-4 w-4" />
									Shorten URL
								</>
							)}
						</button>
					</div>

					{isLogged && (
						<CollapseDefault open={showCollapse} urlId={urlId} />
					)}

					{urlId && (
						<div key={urlId} className="mt-8 animate-spring-in">
							<ShortenURL url={url} urlId={urlId} />
						</div>
					)}

					{urlId && !isLogged && (
						<div className="mt-4 flex items-start gap-3 bg-white border-2 border-[#1C1C1C] rounded-xl px-4 py-3.5 shadow-[3px_3px_0px_#1C1C1C] animate-spring-in">
							<SparklesIcon className="h-5 w-5 text-[#FF9760] flex-shrink-0 mt-0.5" />
							<p className="text-sm text-[#6B6B6B] font-medium">
								<span className="font-bold text-[#1C1C1C]">
									Create a free account
								</span>{" "}
								to save your URLs, manage them from your dashboard and set
								custom names.
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Features section */}
			<div className="w-full max-w-4xl pb-24">
				<div className="flex items-center gap-4 mb-10">
					<div className="flex-1 h-0.5 bg-[#1C1C1C] opacity-10 rounded-full" />
					<h2 className="text-2xl font-extrabold text-[#1C1C1C] tracking-tight whitespace-nowrap">
						Why URLastic?
					</h2>
					<div className="flex-1 h-0.5 bg-[#1C1C1C] opacity-10 rounded-full" />
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{features.map(({ icon: Icon, color, title, description }) => (
						<div
							key={title}
							className="bg-white border-2 border-[#1C1C1C] rounded-2xl p-5 shadow-[4px_4px_0px_#1C1C1C] flex flex-col gap-3"
						>
							<div
								className="w-10 h-10 rounded-xl border-2 border-[#1C1C1C] flex items-center justify-center flex-shrink-0"
								style={{ backgroundColor: color }}
							>
								<Icon className="h-5 w-5 text-[#1C1C1C]" />
							</div>
							<div>
								<h3 className="text-base font-extrabold text-[#1C1C1C] mb-1">
									{title}
								</h3>
								<p className="text-sm text-[#6B6B6B] font-medium leading-relaxed">
									{description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Decorative dots */}
			<div className="fixed bottom-8 right-8 flex gap-2 opacity-40 pointer-events-none hidden lg:flex">
				<div className="w-3 h-3 rounded-full bg-[#F26076]" />
				<div className="w-3 h-3 rounded-full bg-[#FF9760]" />
				<div className="w-3 h-3 rounded-full bg-[#FFD150]" />
				<div className="w-3 h-3 rounded-full bg-[#458B73]" />
			</div>
		</div>
	);
};

export default Home;
