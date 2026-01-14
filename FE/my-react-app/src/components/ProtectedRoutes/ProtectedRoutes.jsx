import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axiosInterceptor";
import { loggedInUserInfo } from "../../redux/action/actions";
import { toast } from "sonner";
import CircularProgress from "@mui/material/CircularProgress";

function ProtectedRoutes({ allowedRoles }) {
  // console.log("roles are", allowedRoles)
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { id, role } = useSelector((state) => state.loggedInUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (token && id === "") {
          console.log("running");
          const userData = await axiosInstance.get("/user/me");
          const res = userData.data;

          console.log(res);
          dispatch(
            loggedInUserInfo({
              firstName: res.firstName,
              lastName: res.lastName,
              role: res.role,
              id: res.id,
            })
          );
        }
      } catch (e) {
        console.error(e);
      } finally {

        setLoading(false);
      }
    };
    getUserData();
  }, [id, token, dispatch]);
  
  if (loading) {
    // console.log("the result is",allowedRoles , Array.isArray(allowedRoles)?allowedRoles.includes(role):"");
    console.log("Allowed role ", allowedRoles, " role is ", role)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-3">
        <CircularProgress size={40} color="primary" />
      </div>
    );
  }

  if (!token) return <Navigate to="/login" replace />;


  if (allowedRoles && !allowedRoles.includes(role)){
    return <Navigate to="/notfound" replace />;
  }

  // const token = stored ? JSON.parse(stored) : null;
  console.log(token);
  if(!loading){
    return <Outlet />;
  }
  // return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
