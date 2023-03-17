import React from "react";
import "../../assets/navbar.css";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="container-nav">
            <Link to={"/"}>
                <img src="/logo.png" alt="logo" />
            </Link>
            <div className="butons">
                <LoginButton />
                <RegisterButton />
            </div>
        </div>
    );
};

export default Navbar;
