import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "../src/context/UserContext";
import { MessageProvider } from "../src/context/MessageContext";
import Home from "./components/Home";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Redirect from "./components/Redirect";

function App() {
	return (
		<div className="App">
			<UserContextProvider>
				<MessageProvider>
					<Router>
						<CustomNavbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<LoginForm />} />
							<Route
								path="/register"
								element={<RegisterForm />}
							/>
							<Route path="/:shortUrl" element={<Redirect />} />
						</Routes>
					</Router>
				</MessageProvider>
			</UserContextProvider>
		</div>
	);
}

export default App;
