import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "../src/context/UserContext";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
    return (
        <div className="App">
            <UserContextProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                </Routes>
            </Router>
            </UserContextProvider>
        </div>
    );
}

export default App;
