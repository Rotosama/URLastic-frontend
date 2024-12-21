import axios from "axios";

class registerAPI {
	static async registerUser(firstName, lastName, email, password) {
		const requestUrl = `${process.env.REACT_APP_BASE_URL}register`;
		const requestBody = { firstName, lastName, email, password };

		try {
			const response = await axios.post(requestUrl, requestBody);
			return response.data;
		} catch (error) {
			console.error(error);

			return { error: error.response.data };
		}
	}
}

export default registerAPI;
