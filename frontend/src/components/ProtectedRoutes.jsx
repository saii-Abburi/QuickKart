import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn === 'true' ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
