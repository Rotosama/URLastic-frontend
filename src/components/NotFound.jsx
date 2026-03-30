import React from "react";
import { Link } from "react-router-dom";
import { ScissorsIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
	return (
		<div className="min-h-[calc(100vh-72px)] bg-[#FFFAF5] flex flex-col items-center justify-center px-4 text-center">
			<div className="bg-[#F26076] w-24 h-24 rounded-2xl border-2 border-[#1C1C1C] shadow-[4px_4px_0px_#1C1C1C] flex items-center justify-center mb-6">
				<ScissorsIcon className="h-12 w-12 text-white" />
			</div>
			<h1 className="text-8xl font-black text-[#1C1C1C] leading-none mb-2">
				404
			</h1>
			<p className="text-xl font-bold text-[#1C1C1C] mb-2">
				Page not found
			</p>
			<p className="text-[#6B6B6B] mb-10 max-w-sm">
				The link you followed might be broken or the page may have been
				removed.
			</p>
			<Link
				to="/"
				className="px-6 py-3 bg-[#F26076] text-white font-bold text-sm border-2 border-[#1C1C1C] rounded-xl shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all"
			>
				Back to home
			</Link>
		</div>
	);
};

export default NotFound;
