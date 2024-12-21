import React from "react";
import ReactDOM from "react-dom";
import "./assets/index.css"; // Importa el archivo CSS de Tailwind
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";

document.body.classList.add("bg-gray-200");

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
