import React from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
    return (
        <>
            <Link to={"/login"}>
                <button>Log in</button>
            </Link>
        </>
    );
};

export default LoginButton;
