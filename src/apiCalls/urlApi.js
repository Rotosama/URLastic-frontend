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
            const response = await axios.post(requestUrl, {originalUrl: originalUrl}, config);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error(error);
            return error.response.data;
        }
    }
}

export default urlAPI;
