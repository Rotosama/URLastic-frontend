import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <>
            <Link to={"/register"}>
                <button>Register</button>
            </Link>
        </>
    );
};

export default Register;
