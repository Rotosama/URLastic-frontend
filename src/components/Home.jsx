import React, { useContext, useState } from "react";
import urlAPI from "../apiCalls/urlApi";
import "../assets/home.css";
import { UserContext } from "../context/UserContext";
import ShortenURL from "./ShortenURL";

const Home = () => {
    const [url, setUrl] = useState("");
    const { token, userId } = useContext(UserContext);

    async function cutUrl(event) {
        const requestedUrl = url;
        const response = await urlAPI.postUrl(token, requestedUrl, userId);
        return response;
    }

    return (
        <div>
            <div>
                <h2>Insert your URL:</h2>
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="inputURL"
                    type={"text"}
                />
                <br />
                <br />
                <button onClick={cutUrl} style={{ width: "180px" }}>
                    Cut URL
                </button>
                <button style={{ width: "180px" }}>Link Options</button>
                <ShortenURL url={url}/>
            </div>
        </div>
    );
};

export default Home;
