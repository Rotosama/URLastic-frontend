import React, { useState, useContext } from "react";
import urlAPI from "../apiCalls/urlApi";
import { UserContext } from "../context/UserContext";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const CUSTOM_URL_REGEX = /^[a-zA-Z0-9-]+$/;

export function CustomUrl({ urlId }) {
	const [customName, setCustomName] = useState("");
	const [savedUrl, setSavedUrl] = useState("");
	const [error, setError] = useState("");
	const { token } = useContext(UserContext);

	function validate(value) {
		if (value.length < 3) return "Minimum 3 characters.";
		if (value.length > 30) return "Maximum 30 characters.";
		if (!CUSTOM_URL_REGEX.test(value))
			return "Only letters, numbers and hyphens allowed. No spaces or symbols.";
		return "";
	}

	async function modifyUrl(event) {
		event.preventDefault();
		const validationError = validate(customName);
		if (validationError) {
			setError(validationError);
			return;
		}
		setError("");
		const response = await urlAPI.customURL(token, urlId, customName);
		if (response && response.error) {
			setError("Could not update the URL. Try again.");
		} else {
			setSavedUrl(customName);
		}
	}

	return (
		<div>
			<h3 className="text-base font-bold text-[#1C1C1C] mb-1">
				Custom short URL
			</h3>
			<p className="text-xs text-[#6B6B6B] mb-4 font-medium">
				{urlId
					? "Letters, numbers and hyphens only. 3–30 characters."
					: "Shorten a URL first, then set a custom name here."}
			</p>
			<form onSubmit={modifyUrl} className="flex gap-3">
				<input
					placeholder="my-custom-link"
					value={customName}
					onChange={(e) => {
						setCustomName(e.target.value);
						if (error) setError("");
					}}
					disabled={!urlId}
					className={`flex-1 px-4 py-2.5 border-2 rounded-xl text-sm bg-white outline-none transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed ${
						error ? "border-[#F26076]" : "border-[#1C1C1C] focus:border-[#FF9760]"
					}`}
				/>
				<button
					type="submit"
					disabled={!urlId || !customName}
					className="px-5 py-2.5 bg-[#FF9760] text-white font-bold text-sm border-2 border-[#1C1C1C] rounded-xl shadow-[3px_3px_0px_#1C1C1C] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1C1C1C] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-x-0 disabled:translate-y-0 disabled:shadow-[3px_3px_0px_#1C1C1C]"
				>
					Save
				</button>
			</form>
			{error && (
				<p className="mt-2 text-xs text-[#F26076] font-semibold">{error}</p>
			)}
			{savedUrl && !error && (
				<div className="mt-3 flex items-center gap-2 text-sm text-[#458B73] font-semibold">
					<CheckCircleIcon className="h-4 w-4" />
					Short URL updated to:{" "}
					<span className="font-bold">{savedUrl}</span>
				</div>
			)}
		</div>
	);
}
