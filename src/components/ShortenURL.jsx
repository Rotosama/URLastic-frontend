import React, { useState, useEffect, useContext } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	Typography,
	Button,
} from "@material-tailwind/react";
import QRCode from "react-qr-code";
import urlAPI from "../apiCalls/urlApi";
import { UserContext } from "../context/UserContext";

const ShortenURL = (props) => {
	const [shortUrl, setShortUrl] = useState("");
	const { token } = useContext(UserContext);
	const [copySuccess, setCopySuccess] = useState(false);

	useEffect(() => {
		const fetchShortUrl = async (token) => {
			const requestedId = props.urlId;
			const response = await urlAPI.getUrlById(token, requestedId);
			setShortUrl(response.shortenUrl);
		};
		if (props.urlId) {
			fetchShortUrl(token);
		}
	}, [props.urlId, token]);

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(
				`${process.env.REACT_APP_BASE_URL}urls/r/${shortUrl}`
			);
			setCopySuccess(true);
			setTimeout(() => setCopySuccess(false), 2000); // Restablecer el mensaje después de 2 segundos
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	return (
		<>
			{shortUrl && props.url && (
				<Card className="mt-6 w-96">
					<CardHeader
						color="blue-gray"
						className="flex justify-center items-center"
					>
						<QRCode
							size={200}
							style={{
								height: "auto",
								maxWidth: "100%",
								width: "100%",
							}}
							value={props.url}
							viewBox={`0 0 256 256`}
						/>
					</CardHeader>
					<CardBody>
						<Typography
							variant="h5"
							color="blue-gray"
							className="mb-2 text-center"
						>
							Share your URL:
						</Typography>
						<Typography color="blue-gray" className="text-center">
							<div className="short-container">
								<h5>ID: {props.urlId}</h5>
								<div className="shorturl">
									<h5>{`${process.env.REACT_APP_BASE_URL}urls/r/${shortUrl}`}</h5>
									<Button
										onClick={copyToClipboard}
										color="amber"
									>
										{copySuccess
											? "Copied!"
											: "Copy to Clipboard"}
									</Button>
								</div>
							</div>
						</Typography>
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default ShortenURL;
