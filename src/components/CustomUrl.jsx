import React, { useState, useContext } from "react";
import urlAPI from "../apiCalls/urlApi";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { UserContext } from "../context/UserContext";

export function CustomUrl() {
	const [url, setUrl] = useState("");
	const [urlId, setUrlId] = useState("");
	const [customName, setCustomName] = useState("");
	const { token, userId } = useContext(UserContext);

	async function modifyUrl(event) {
		event.preventDefault();
		const response = await urlAPI.customURL(token, urlId, customName);
		if (response.error) {
			console.error(response.error);
		} else {
			setUrlId(response._id);
			setUrl(response.shortenUrl);
		}
	}

	return (
		<Card
			color="transparent"
			shadow={true}
			className="p-6 max-w-lg mx-auto flex flex-col flex-wrap items-center"
		>
			<Typography
				variant="h5"
				color="blue-gray"
				className="text-center mb-4"
			>
				Customize your URL
			</Typography>
			<form className="mt-8 mb-2" onSubmit={modifyUrl}>
				<div className="mb-4 flex flex-col gap-6">
					<Typography
						variant="h6"
						color="blue-gray"
						className="-mb-3"
					>
						Enter new ShortURL
					</Typography>
					<Input
						placeholder="example"
						value={customName}
						onChange={(e) => setCustomName(e.target.value)}
						className="!border-t-blue-gray-200 focus:!border-t-gray-900"
					/>
				</div>
				<Button className="mt-6" fullWidth type="submit" color="amber">
					Update
				</Button>
			</form>
			{url && (
				<Typography
					variant="h6"
					color="blue-gray"
					className="text-center mt-4"
				>
					Your customized URL: {url}
				</Typography>
			)}
		</Card>
	);
}
