import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(" ");

  useEffect(() => {
    // Lógica para obtener los datos del usuario desde el token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userData = decodedToken.user.username;
      setUser(userData);
    }
  }, []);
  

  return <UserContext.Provider value={{user}}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
