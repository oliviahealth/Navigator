import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Check if there's an authenticated status in localStorage
  const initialAuth = JSON.parse(localStorage.getItem('authenticated')) || false;
  const [authenticated, setAuthenticated] = useState(initialAuth);

  const login = () => {
    setAuthenticated(true);
    localStorage.setItem('authenticated', true); // Store in localStorage on login
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.clear(); // Remove from localStorage on logout
  };

  useEffect(() => {
    // Update localStorage when the authenticated state changes
    localStorage.setItem('authenticated', authenticated);
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
