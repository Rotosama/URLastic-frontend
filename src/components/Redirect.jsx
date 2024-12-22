import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
	const { shortUrl } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUrl = async () => {
			try {
				const response = await axios.get(
					`${process.env.REACT_APP_BASE_URL}/urls/r/${shortUrl}`
				);
				if (response.data.status(404)) {
					navigate("/404");
				}
			} catch (error) {
				console.error("Error fetching the original URL:", error);
				navigate("/404");
			}
		};

		fetchUrl();
	}, [shortUrl, navigate]);

	return <div className="url-not-valid">URL NOT VALID 🥲</div>;
};

export default Redirect;
