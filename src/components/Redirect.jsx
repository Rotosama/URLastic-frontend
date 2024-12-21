import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import urlAPI from "../apiCalls/urlApi";

const Redirect = () => {
	const { urlId } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchOriginalUrl = async () => {
			try {
				const response = await urlAPI.getUrlById(urlId);
				console.log(response);
				if (response.originalUrl) {
					window.location.href = response.originalUrl;
				} else {
					navigate("/"); // Redirige a la página de inicio si no se encuentra la URL
				}
			} catch (error) {
				console.error("Error fetching original URL:", error);
				navigate("/"); // Redirige a la página de inicio en caso de error
			}
		};
		fetchOriginalUrl();
	}, [urlId, navigate]);

	return <div>Redirecting...</div>;
};

export default Redirect;
