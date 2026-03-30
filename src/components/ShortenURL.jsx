import React, { useState, useEffect, useContext } from "react";
import QRCode from "react-qr-code";
import urlAPI from "../apiCalls/urlApi";
import { UserContext } from "../context/UserContext";
import {
	ClipboardDocumentIcon,
	CheckIcon,
} from "@heroicons/react/24/outline";

const ShortenURL = (props) => {
	const [shortUrl, setShortUrl] = useState("");
	const { token } = useContext(UserContext);
	const [copySuccess, setCopySuccess] = useState(false);
	const fullShortUrl = `${process.env.REACT_APP_BASE_URL}urls/r/${shortUrl}`;

	useEffect(() => {
		const fetchShortUrl = async () => {
			const response = await urlAPI.getUrlById(token, props.urlId);
			setShortUrl(response.shortenUrl);
		};
		if (props.urlId) fetchShortUrl();
	}, [props.urlId, token]);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(fullShortUrl);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	if (!shortUrl || !props.url) return null;

	return (
		<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] overflow-hidden">
			{/* Top accent bar */}
			<div className="h-2 bg-[#458B73]" />

			<div className="p-6">
				{/* Short URL row */}
				<p className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-2">
					Your short link
				</p>
				<div className="flex items-center gap-3 bg-[#FFFAF5] border-2 border-[#1C1C1C] rounded-xl px-4 py-3 mb-6">
					<span className="flex-1 text-[#1C1C1C] font-semibold text-sm truncate">
						{fullShortUrl}
					</span>
					<button
						onClick={copyToClipboard}
						className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-[#1C1C1C] transition-all shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] flex-shrink-0 ${
							copySuccess
								? "bg-[#458B73] text-white"
								: "bg-[#FFD150] text-[#1C1C1C]"
						}`}
					>
						{copySuccess ? (
							<>
								<CheckIcon className="h-3.5 w-3.5" />
								Copied!
							</>
						) : (
							<>
								<ClipboardDocumentIcon className="h-3.5 w-3.5" />
								Copy
							</>
						)}
					</button>
				</div>

				{/* QR Code */}
				<div className="flex flex-col items-center pt-4 border-t-2 border-dashed border-[#E8E0D8]">
					<p className="text-xs font-bold uppercase tracking-widest text-[#6B6B6B] mb-4">
						QR Code
					</p>
					<div className="p-4 bg-white border-2 border-[#1C1C1C] rounded-xl shadow-[3px_3px_0px_#1C1C1C]">
						<QRCode
							size={140}
							value={fullShortUrl}
							style={{
								height: "auto",
								maxWidth: "100%",
								width: "100%",
							}}
							viewBox="0 0 256 256"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShortenURL;
