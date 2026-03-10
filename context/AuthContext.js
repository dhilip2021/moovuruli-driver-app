import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token) => {
    setUserToken(token);
    setLoading(false);
  };

  const logout = () => {
    setUserToken(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        login,
        logout,
        loading,
        stopLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};