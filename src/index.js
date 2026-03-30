import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";

const root = createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
