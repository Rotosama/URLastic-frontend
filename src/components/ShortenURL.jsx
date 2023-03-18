import React from "react";
import { useContext, useState } from "react";
import urlAPI from "../apiCalls/urlApi";
import { UserContext } from "../context/UserContext";
import { useEffect } from "react";
import QRCode from "react-qr-code";

const ShortenURL = (props) => {
    const [shortUrl, setShortUrl] = useState("");
    const { token } = useContext(UserContext);

    useEffect(() => {
        const fetchShortUrl = async (token) => {
            const requestedId = props.urlId;
            const response = await urlAPI.getUrlById(token, requestedId);
            setShortUrl(response.shortenUrl);
        };
        fetchShortUrl();
    }, [props.urlId, token]);

    return (
        <>
            {shortUrl !== undefined ? (
                <div className="short-container">
                    <h4>Congratulations, here's your shortened URL:</h4>
                    <h5>ID: {props.urlId}</h5>
                    <div className="shorturl">
                        <h5>{shortUrl}</h5>
                        <div
                            style={{
                                height: "auto",
                                margin: "0 auto",
                                maxWidth: 64,
                                width: "100%",
                            }}
                        >
                            <QRCode
                                size={512}
                                style={{
                                    height: "auto",
                                    maxWidth: "100%",
                                    width: "100%",
                                }}
                                value={props.url}
                                viewBox={`0 0 256 256`}
                                
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="short-container"></div>
            )}
        </>
    );
};

export default ShortenURL;
