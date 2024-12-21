import React from "react";
import { Alert } from "@material-tailwind/react";

const AlertMessage = ({ message, color, onClose }) => {
	return (
		<Alert color={color} onClose={onClose}>
			{message}
		</Alert>
	);
};

export default AlertMessage;
