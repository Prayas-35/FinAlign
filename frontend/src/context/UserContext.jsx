import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

// Auth provider component
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to set token
  const login = (token) => {
    setToken(token);
    // Store token in cookies
    Cookies.set('token', token, { expires: 7 }); // Cookie expires in 7 days
  };

   // Function to set token
   const signup = (token) => {
    setToken(token);
    // Store token in cookies
    Cookies.set('token', token, { expires: 7 }); // Cookie expires in 7 days
  };

  // Function to remove token
  const logout = () => {
    setToken(null);
    Cookies.remove('token');
  };

  useEffect(() => {
    // Check for token in cookies on initial load
    const tokenFromCookie = Cookies.get('token');
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, login, logout, signup }}>
      {children}
    </UserContext.Provider>
  );
};