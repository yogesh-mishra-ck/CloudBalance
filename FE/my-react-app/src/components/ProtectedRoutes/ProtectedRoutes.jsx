import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  // const token = stored ? JSON.parse(stored) : null;
  console.log(token)
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
