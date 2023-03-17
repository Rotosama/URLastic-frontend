import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <Link to={"/login"}>
                <button>Log in</button>
            </Link>
        </>
    );
};

export default Login;
