import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoute = ({ children }) => {
    const { authData} = useAuth();

    return authData ? (
      <>{children}</>
    ) : (
      <Navigate to="/users/login" />
    );
  };
  

export default PrivateRoute;