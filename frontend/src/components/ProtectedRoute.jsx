// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the children components
  return children;
};

export default ProtectedRoute;
