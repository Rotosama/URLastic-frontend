import { useContext } from "react";
import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={{ userId, token, setUserId, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return (
    useContext(UserContext)
  )
};

export { UserContext, UserContextProvider, useUserContext };