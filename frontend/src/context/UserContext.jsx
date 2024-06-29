
// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/profile', {
          credentials: 'include', // Include credentials (cookies) in the request
        });
        if (response.ok) {
          const profile = await response.json();
          setUser(profile);
        } else {
          console.error('Failed to fetch user profile', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies) in the request
      });
      setUser(null);
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
