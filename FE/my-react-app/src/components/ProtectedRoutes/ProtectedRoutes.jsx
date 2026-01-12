import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "../../utils/axiosInterceptor";
import { loggedInUserInfo } from "../../redux/action/actions";

function ProtectedRoutes() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { id } = useSelector(state=>state.loggedInUser);

  useEffect(()=>{

    const getUserData = async()=>{
       if(id==""){
        const userData = await axiosInstance.get("/user/me");
        const res = userData.data;

        console.log(res);
        dispatch(loggedInUserInfo({
          firstName: res.firstName,
          lastName: res.lastName,
          role: res.role,
          id: res.id
        }))
      }
    }
    getUserData();
   
  },[id,dispatch]);


  // const token = stored ? JSON.parse(stored) : null;
  console.log(token)
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoutes;
