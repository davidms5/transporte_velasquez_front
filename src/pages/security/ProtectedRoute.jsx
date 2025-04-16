import React from "react";
import { Navigate } from "react-router-dom";
import { getUserRole, isAuthenticated } from "../../shared/services/auth";

const ProtectedRoute = ({ children, roles }) => {
  const userRole = getUserRole();
  //state={{ from: location }}
  if (!isAuthenticated()) {
    return <Navigate to="/" replace/>;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace/>;
  }

  return children;
};

export default ProtectedRoute;
