import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  return token.isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
