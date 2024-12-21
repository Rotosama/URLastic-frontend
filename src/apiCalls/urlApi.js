import axios from "axios";

class urlAPI {
	static async postUrl(token, originalUrl) {
		const requestUrl = `${process.env.REACT_APP_BASE_URL}urls/`;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.post(
				requestUrl,
				{ originalUrl: originalUrl },
				config
			);

			return response.data;
		} catch (error) {
			console.error(error);
			return error.response.data;
		}
	}

	static async getUrlById(token, urlId) {
		let requestUrl = `${process.env.REACT_APP_BASE_URL}urls/${urlId}`;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.get(requestUrl, urlId, config);
			return response.data;
		} catch (error) {
			console.error(error);
			return error.response.data;
		}
	}

	static async customURL(token, urlId, customURL) {
		let requestUrl = `${process.env.REACT_APP_BASE_URL}urls/${urlId}`;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		try {
			const response = await axios.put(
				requestUrl,
				{ customURL: customURL },
				config
			);
			return response.data;
		} catch (error) {
			console.error(error);
			return error.response.data;
		}
	}
}

export default urlAPI;
