import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import registerAPI from "../apiCalls/registerApi";
import "../assets/register.css";

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleRegisterSubmit(event) {
        event.preventDefault();
        const response = await registerAPI.registerUser(
            firstName,
            lastName,
            email,
            password
        );
        if (response.error) {
            console.error(response.error);
        } else {
            navigate("/login");
        }
    }

    return (
        <>
            <section className="register">
                <div className="register-form">
                    <h2 className="title-register">Register as a new user</h2>
                </div>
                <form className="register-form" onSubmit={handleRegisterSubmit}>
                    <div>
                        <label htmlFor="name" className="title-register-input">
                            Name:
                        </label>
                    </div>
                    <div>
                        <input
                            className="register-input"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            required
                            id="name"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="title-register-input"
                        >
                            Last Name:
                        </label>
                    </div>
                    <div>
                        <input
                            className="register-input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            required
                            id="lastname"
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="Email" className="title-register-input">
                            Email:
                        </label>
                    </div>
                    <div>
                        <input
                            className="register-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            required
                            id="email"
                        />
                    </div>

                    <div className="register-field">
                        <label
                            htmlFor="password"
                            className="title-register-input"
                        >
                            Password:
                        </label>
                    </div>
                    <div>
                        <input
                            className="register-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            required
                            id="password"
                        />
                    </div>
                    <div className="box-register-user">
                        <h4 className="subtitle-reg-in">
                            <Link to="/login" className="text-link-register">
                                Do you already have an account? <b>Log in</b>
                            </Link>
                        </h4>
                        <button
                            className="btn-registers"
                            type="submit"
                            style={{ width: "150px", color: "#ff7e55" }}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
