import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PublicRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (token) {
    // If no token, redirect to the login page
    return <Navigate to="/dashboard" />;
  }
  
  // If token exists, render the children components
  return children;
};

export default PublicRoute;