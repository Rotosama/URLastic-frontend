import React, { createContext, useState, useContext } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
	const [message, setMessage] = useState(null);

	return (
		<MessageContext.Provider value={{ message, setMessage }}>
			{children}
		</MessageContext.Provider>
	);
};

export const useMessageContext = () => useContext(MessageContext);
