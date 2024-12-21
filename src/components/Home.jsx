import React, { useContext, useState } from "react";
import urlAPI from "../apiCalls/urlApi";
import "../assets/home.css";
import { useMessageContext } from "../context/MessageContext";
import { UserContext } from "../context/UserContext";
import ShortenURL from "./ShortenURL";
import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import CollapseDefault from "./CollapseDefault";

const Home = () => {
	const [url, setUrl] = useState("");
	const [urlId, setUrlId] = useState("");
	const { token, userId } = useContext(UserContext);
	const { message, setMessage } = useMessageContext();
	const [showCollapse, setShowCollapse] = useState(false);

	async function cutUrl(event) {
		event.preventDefault();
		const requestedUrl = url;
		const response = await urlAPI.postUrl(token, requestedUrl, userId);
		setUrlId(response._id);
		return response;
	}

	const toggleCollapse = () => {
		setShowCollapse((cur) => !cur);
	};

	return (
		<div className="flex flex-col justify-center items-center">
			{message && (
				<Alert
					className="sm:w-96 md:w-150 lg:w-300 xl:w-300 m-6"
					color={message.color}
					onClose={() => setMessage(null)}
				>
					{message.text}
				</Alert>
			)}
			<Typography color="deep-orange" className="text-center">
				Welcome to the URL shortener service. Here you can shorten your
				long URLs to a more manageable size. Just paste your URL in the
				input field below.
			</Typography>
			<Typography className="m-8">
				<Input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="inputURL mb-4"
				/>
			</Typography>
			<div className="flex flex-col justify-center items-center">
				<Button
					className="mt-4"
					variant="gradient"
					color="deep-orange"
					ripple={true}
					onClick={toggleCollapse}
				>
					Options
				</Button>
				<CollapseDefault open={showCollapse} />
				<Button
					className="mt-4"
					variant="gradient"
					color="deep-orange"
					ripple={true}
					onClick={cutUrl}
				>
					Cut URL
				</Button>
				<div className="mt-8">
					<ShortenURL url={url} urlId={urlId} />
				</div>
			</div>
		</div>
	);
};

export default Home;
