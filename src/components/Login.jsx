import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import loginAPI from "../apiCalls/loginApi";
import "../assets/login.css";

const LogIn = () => {
    const navigate = useNavigate();

    const userContext = useUserContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLoginSubmit(event) {
        event.preventDefault();
        const response = await loginAPI.loginUser(email, password);
        if (response.error) {
            console.error(response.error);
        } else {
            userContext.setUserId(response.userId);
            userContext.setToken(response.token);
            navigate("/");
        }
    }

    return (
        <section className="login">
            <div className="login-content">
                <form className="login-form" onSubmit={handleLoginSubmit}>
                    <div className="form-title">
                        <h2 className="title-log-in">Log In</h2>
                    </div>
                    <div className="login-inputs">
                        <div className="login-field">
                            <label htmlFor="email" className="title-input">
                                Email :
                            </label>
                        </div>
                        <div>
                            <input
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                                required
                                id="email"
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="password" className="title-input">
                                Password:
                            </label>
                        </div>
                        <div>
                            <input
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                required
                                id="password"
                            />
                        </div>

                        <button
                            className="btn-login"
                            type="submit"
                            style={{ width: "150px" , color:'#ff7e55'}}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="box-register">
                    <h4 className="subtitle-log-in">
                        <Link to="/register" className="text-link">
                            Don't you have an account?<b>Register!</b>
                        </Link>
                    </h4>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
