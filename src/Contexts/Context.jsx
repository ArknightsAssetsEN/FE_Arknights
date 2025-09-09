import React, { useContext, useEffect, useState } from "react";

const ArknightsContext = React.createContext();

export const ArknightsProvider = ({ children }) => {
  // const [authenticated, setAuthenticated] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    console.log("Dark mode is now:", dark? "Dark" : "Light");
    
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);


  return (
    // <UserContext.Provider value={{authenticated, setAuthenticated, email, setEmail, name, setName, avatar, setAvatar, token, setToken, userObject, setUserObject, }}>
    <ArknightsContext.Provider value={{dark, setDark}}>
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
