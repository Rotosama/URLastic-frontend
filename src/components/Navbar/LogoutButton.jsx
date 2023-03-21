import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {useUserContext } from "../../context/UserContext"


const LogoutButton = () => {
const UserContext = useUserContext();
const navigate = useNavigate();

function handleLogout () {
    UserContext.setToken('');
    UserContext.setIsLogged(false);
    UserContext.setUserId('');
    navigate('/');
    
}
    return (
        <>
            <Link to={"/"}>
                <button onClick={handleLogout}>Log out</button>
            </Link>
        </>
    );
};

export default LogoutButton;