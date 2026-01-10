import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { storeUserTable } from "../../redux/action/actions";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInterceptor";
import axiosInstance from "../../utils/axiosInterceptor";
// import { store } from "../../redux/store/store";
// import { toast } from "sonner";

function UserTable() {
  // const data = users;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [localData, setLocalData] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);

  const users = useSelector((state) => state.users);
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  const handleEditClick = (user) => {
    navigate("/dashboard/user-management/add-user", {
      state: { user, isEditMode: true },
    });
  };

  useEffect(() => {
    const initializeData = async () => {
      if (users && users.length) {
        console.log("Using store's cached value");
        setLocalData(users);
        setIsLoading(false);
        return;
      }
      console.log("Fetching data from api...");

      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(
          "/user"

          // headers: {
          //   Authorization: `Bearer ${token}`
          // }
        );
        // const getCookie = (name) => {
        //   return document.cookie
        //     .split('; ')
        //     .find(row => row.startsWith(name + '='))
        //     ?.split('=')[1];
        // };

        // const refreshToken = getCookie('token');
        // console.log("token is " , refreshToken)
        console.log("user table");
        console.log(res);

        const retrivedData = res.data;
        console.log(retrivedData);

        setLocalData(retrivedData);
        setIsLoading(false);
        dispatch(storeUserTable(retrivedData));
      } catch (error) {
        console.log("Error during fetching data" + error);

        setHasFetchError(true);
        setIsLoading(false);
      }
    };
    initializeData();
  }, []);

  const toggleStatus = (activeBefore, id) => {
    const changeActiveStatus = async () => {
      // console.log(activeBefore);
      const res = await axiosInstance.put(`/user/${id}/change-status`);
      const data = res.data;
      console.log(data);
      // console.log(data.isActive);
      // console.log("yo boy")

      setLocalData((prev) => {
        const updated = prev.map((user) =>
          user.id === data.id ? { ...user, userActive: data.userActive } : user
        );

        dispatch(storeUserTable(updated));
        return updated;
      });
    };
    changeActiveStatus();

    // const updatedData = localData.map((user) =>
    //   user.id === id ? { ...user, isActive: !user.isActive } : { ...user }
    // );
    // setLocalData(updatedData);
    // dispatch(storeUserTable(updatedData));
  };

  {
    if (isLoading) {
      return (
        <div className="flex inset-0 justify-center items-center h-screen w-full fixed">
          <CircularProgress />
        </div>
      );
    }

    if (hasFetchError) {
      return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
          <p className="text-gray-700 text-xl font-semibold">
            Unable to load users
          </p>
          <p className="text-gray-500">Server didnt respond</p>
        </div>
      );
    }

    return (
      <main className="flex-1 overflow-y-auto ">
        <table className="w-full max-w-screen mx-auto border-collapse mb-3">
          <thead>
            <tr
              className="[&_th]:bg-[#f4f6f8] [&_th]:text-gray-700 
                     [&_th]:px-4 [&_th]:py-2 [&_th]:border-b 
                     [&_th]:border-gray-300 sticky top-0"
            >
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email ID</th>
              <th>Roles</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {localData.map((currentUser, idx) => (
              <tr
                key={currentUser.id}
                className="[&_td]:bg-zinc-50 [&_td]:px-4 
                       [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-200"
              >
                <td>{currentUser.firstName}</td>
                <td>{currentUser.lastName}</td>
                <td>{currentUser.email}</td>
                <td>{currentUser.role}</td>
                <td>{new Date(currentUser.lastLogin).toLocaleString()}</td>
                <td className="flex items-center gap-4">
                  <div
                    onClick={() => toggleStatus(currentUser.userActive, currentUser.id)}
                    className="cursor-pointer flex"
                  >
                    {currentUser.userActive ? (
                      <ToggleOnIcon
                        fontSize="large"
                        className="text-blue-500"
                      />
                    ) : (
                      <ToggleOffIcon
                        fontSize="large"
                        className="text-gray-500"
                      />
                    )}
                  </div>

                  {
                    //logged in hu to edit option visible h
                    //admin dusre admin ko edit nhi kr skta to
                    //loggedin nhi hu aur admin bhi nhi hu to edit kr skta
                    (currentUser.id == loggedInUser.id ||
                      (currentUser.id !== loggedInUser.id &&
                        currentUser.role !== "ADMIN")) && (
                      <div onClick={() => handleEditClick(currentUser)}>
                        <EditIcon className="cursor-pointer" />
                      </div>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    );
  }
}

export default UserTable;
