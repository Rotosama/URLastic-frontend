import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "../src/context/UserContext";
import { MessageProvider } from "../src/context/MessageContext";
import Home from "./components/Home";
import CustomNavbar from "./components/Navbar/CustomNavbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Redirect from "./components/Redirect";
import Dashboard from "./components/User/Dashboard";
import Account from "./components/User/Account";
import NotFound from "./components/NotFound";

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
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/account" element={<Account />} />
							<Route
								path="/urls/r/:shortUrl"
								element={<Redirect />}
							/>
							<Route path="/404" element={<NotFound />} />
						</Routes>
					</Router>
				</MessageProvider>
			</UserContextProvider>
		</div>
	);
}

export default App;
