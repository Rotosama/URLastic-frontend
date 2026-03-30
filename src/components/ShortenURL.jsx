import React, { useState, useEffect, useRef, useContext } from "react";
import QRCode from "react-qr-code";
import urlAPI from "../apiCalls/urlApi";
import { UserContext } from "../context/UserContext";
import { buildShortUrl } from "../utils/urlHelpers";
import {
	ClipboardDocumentIcon,
	CheckIcon,
	ArrowDownTrayIcon,
	ShareIcon,
} from "@heroicons/react/24/outline";

const ShortenURL = (props) => {
	const [shortUrl, setShortUrl] = useState("");
	const { token } = useContext(UserContext);
	const [copySuccess, setCopySuccess] = useState(false);
	const [shareSuccess, setShareSuccess] = useState(false);
	const qrRef = useRef(null);
	const fullShortUrl = buildShortUrl(shortUrl);

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

	const downloadQR = () => {
		const svg = qrRef.current?.querySelector("svg");
		if (!svg) return;

		const svgData = new XMLSerializer().serializeToString(svg);
		const canvas = document.createElement("canvas");
		const size = 400;
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		const img = new Image();

		img.onload = () => {
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(0, 0, size, size);
			ctx.drawImage(img, 0, 0, size, size);
			const link = document.createElement("a");
			link.download = `urlastic-qr-${shortUrl}.png`;
			link.href = canvas.toDataURL("image/png");
			link.click();
		};

		img.src =
			"data:image/svg+xml;base64," +
			btoa(unescape(encodeURIComponent(svgData)));
	};

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({ url: fullShortUrl });
			} catch {
				// user cancelled
			}
		} else {
			try {
				await navigator.clipboard.writeText(fullShortUrl);
				setShareSuccess(true);
				setTimeout(() => setShareSuccess(false), 2000);
			} catch (err) {
				console.error("Failed to copy:", err);
			}
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
					<div
						ref={qrRef}
						className="p-4 bg-white border-2 border-[#1C1C1C] rounded-xl shadow-[3px_3px_0px_#1C1C1C] mb-4"
					>
						<QRCode
							size={140}
							value={fullShortUrl}
							style={{ height: "auto", maxWidth: "100%", width: "100%" }}
							viewBox="0 0 256 256"
						/>
					</div>

					{/* QR actions */}
					<div className="flex gap-3 w-full">
						<button
							onClick={downloadQR}
							className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border-2 border-[#1C1C1C] rounded-xl text-xs font-bold shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all text-[#1C1C1C]"
						>
							<ArrowDownTrayIcon className="h-4 w-4" />
							Download
						</button>
						<button
							onClick={handleShare}
							className={`flex-1 flex items-center justify-center gap-2 py-2.5 border-2 border-[#1C1C1C] rounded-xl text-xs font-bold shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all ${
								shareSuccess
									? "bg-[#458B73] text-white"
									: "bg-[#FF9760] text-[#1C1C1C]"
							}`}
						>
							{shareSuccess ? (
								<>
									<CheckIcon className="h-4 w-4" />
									Copied!
								</>
							) : (
								<>
									<ShareIcon className="h-4 w-4" />
									Share
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShortenURL;
