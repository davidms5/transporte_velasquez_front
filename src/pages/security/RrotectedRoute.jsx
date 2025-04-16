import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../shared/services/auth";

const ProtectedRoute = ({ children, roles }) => {
  const userRole = getUserRole();

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
