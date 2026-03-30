import React, { useEffect, useState, useContext } from "react";
import urlAPI from "../../apiCalls/urlApi";
import { UserContext } from "../../context/UserContext";
import {
	TrashIcon,
	LinkIcon,
	ClipboardDocumentIcon,
	CheckIcon,
	CursorArrowRaysIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
	const { token, userId } = useContext(UserContext);
	const [urls, setUrls] = useState([]);
	const [confirmDelete, setConfirmDelete] = useState(null);
	const [copiedId, setCopiedId] = useState(null);

	useEffect(() => {
		if (!token || !userId) return;
		const fetchUrls = async () => {
			const response = await urlAPI.getAllUrls(token, userId);
			setUrls(response);
		};
		fetchUrls();
	}, [token, userId]);

	const handleDelete = async (urlId) => {
		await urlAPI.deleteUrl(token, urlId);
		setUrls((prev) => prev.filter((u) => u._id !== urlId));
		setConfirmDelete(null);
	};

	const handleCopy = (url) => {
		const fullUrl = `${process.env.REACT_APP_BASE_URL}urls/r/${url.shortenUrl}`;
		navigator.clipboard.writeText(fullUrl);
		setCopiedId(url._id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	return (
		<div className="min-h-[calc(100vh-72px)] bg-[#FFFAF5] px-4 py-12">
			<div className="max-w-5xl mx-auto">
				{/* Header */}
				<div className="flex items-center gap-3 mb-8">
					<h1 className="text-3xl font-extrabold text-[#1C1C1C] tracking-tight">
						My URLs
					</h1>
					<span className="bg-[#FFD150] text-[#1C1C1C] text-xs font-bold px-3 py-1 rounded-full border-2 border-[#1C1C1C] shadow-[2px_2px_0px_#1C1C1C]">
						{urls.length}
					</span>
				</div>

				{/* Confirm delete dialog */}
				{confirmDelete && (
					<div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
						<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[6px_6px_0px_#1C1C1C] p-6 max-w-sm w-full">
							<h3 className="font-bold text-lg text-[#1C1C1C] mb-2">
								Delete this URL?
							</h3>
							<p className="text-sm text-[#6B6B6B] mb-6 break-all">
								{confirmDelete.originalUrl}
							</p>
							<div className="flex gap-3">
								<button
									onClick={() => setConfirmDelete(null)}
									className="flex-1 py-2.5 border-2 border-[#1C1C1C] rounded-xl text-sm font-bold bg-white shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] transition-all"
								>
									Cancel
								</button>
								<button
									onClick={() => handleDelete(confirmDelete._id)}
									className="flex-1 py-2.5 bg-[#F26076] text-white border-2 border-[#1C1C1C] rounded-xl text-sm font-bold shadow-[2px_2px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1C1C1C] transition-all"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				)}

				{urls.length === 0 ? (
					<div className="text-center py-24 text-[#6B6B6B] bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C]">
						<LinkIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
						<p className="font-semibold text-lg mb-1">No URLs yet</p>
						<p className="text-sm">
							Go to the home page and shorten something!
						</p>
					</div>
				) : (
					<div className="bg-white border-2 border-[#1C1C1C] rounded-2xl shadow-[4px_4px_0px_#1C1C1C] overflow-hidden">
						<table className="w-full text-left">
							<thead>
								<tr className="bg-[#458B73]">
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white">
										Original URL
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white">
										Short URL
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap">
										Created
									</th>
									<th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-white whitespace-nowrap">
										Clicks
									</th>
									<th className="px-6 py-4 w-24" />
								</tr>
							</thead>
							<tbody>
								{urls.map((url, index) => (
									<tr
										key={url._id}
										className={`border-t-2 border-[#F0EBE3] ${
											index % 2 === 1
												? "bg-[#FFFAF5]"
												: "bg-white"
										}`}
									>
										<td className="px-6 py-4 max-w-xs">
											<span className="text-sm text-[#1C1C1C] font-medium truncate block">
												{url.originalUrl}
											</span>
										</td>
										<td className="px-6 py-4">
											<a
												href={`${process.env.REACT_APP_BASE_URL}urls/r/${url.shortenUrl}`}
												target="_blank"
												rel="noreferrer"
												className="text-sm font-bold text-[#F26076] hover:underline"
											>
												{url.shortenUrl}
											</a>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="text-sm text-[#6B6B6B]">
												{new Date(url.createdAt).toLocaleDateString()}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#FFD150] text-[#1C1C1C] px-2.5 py-1 rounded-full border-2 border-[#1C1C1C]">
												<CursorArrowRaysIcon className="h-3 w-3" />
												{url.clicks || 0}
											</span>
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1">
												<button
													onClick={() => handleCopy(url)}
													className={`p-2 rounded-lg transition-colors ${
														copiedId === url._id
															? "text-[#458B73] bg-[#458B73]/10"
															: "text-[#BBBBBB] hover:text-[#458B73] hover:bg-[#458B73]/10"
													}`}
													title="Copy short URL"
												>
													{copiedId === url._id ? (
														<CheckIcon className="h-4 w-4" />
													) : (
														<ClipboardDocumentIcon className="h-4 w-4" />
													)}
												</button>
												<button
													onClick={() => setConfirmDelete(url)}
													className="p-2 rounded-lg text-[#BBBBBB] hover:text-[#F26076] hover:bg-[#F26076]/10 transition-colors"
													title="Delete URL"
												>
													<TrashIcon className="h-4 w-4" />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
