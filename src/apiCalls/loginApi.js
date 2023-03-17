import axios from "axios";

class loginAPI {

    static async loginUser(email, password) {
        const requestUrl = `${process.env.REACT_APP_BASE_URL}login`;
        const requestBody = { email, password };
        try {
            const response = await axios.post(requestUrl, requestBody);
            console.log(response.data)
            return response.data;
        }
        catch (error) {  
            console.error(error);
            return error.response.data;
        }
    }
}

export default loginAPI;