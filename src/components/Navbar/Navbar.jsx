import React from "react";
import "../../assets/navbar.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RegisterButton from "./RegisterButton";
import { Link } from "react-router-dom";
import {useUserContext } from "../../context/UserContext"

const Navbar = () => {
    const userContext = useUserContext();
    return (
        <div className="container-nav">
            <Link to={"/"}>
                <img src="/logo.png" alt="logo" />
            </Link>
            <div className="butons">
                {userContext.isLogged? <LogoutButton /> : <LoginButton/>}
                
                <RegisterButton />
            </div>
        </div>
    );
};

export default Navbar;
