import { useContext } from "react";
import { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  return (
    <UserContext.Provider value={{ userId, token, isLogged, setUserId, setToken, setIsLogged }}>
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