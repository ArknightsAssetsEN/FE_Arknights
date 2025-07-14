import React, { useContext, useState } from "react";

const ArknightsContext = React.createContext();

export const ArknightsProvider = ({ children }) => {
  // const [authenticated, setAuthenticated] = useState(false);
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState("");
  // const [token, setToken] = useState("");
  // const [userObject, setUserObject] = useState({});
  return (
    // <UserContext.Provider value={{authenticated, setAuthenticated, email, setEmail, name, setName, avatar, setAvatar, token, setToken, userObject, setUserObject, }}>
    <ArknightsContext.Provider value={{}}>
      {children}
    </ArknightsContext.Provider>
  );
};

export const useArknights = () => {
  const context = useContext(ArknightsContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
