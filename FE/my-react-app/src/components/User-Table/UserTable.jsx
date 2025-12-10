import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { storeUserTable } from "../../redux/action/actions";
// import { store } from "../../redux/store/store";
// import { toast } from "sonner";

function UserTable() {
  // const data = users;
  const [isLoading, setIsLoading] = useState(true);
  const [localData, setLocalData] = useState([]);
  const [hasFetchError, setHasFetchError] = useState(false);

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

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
        const resp = await axios.get("http://localhost:3000/api/users", {
          timeout: 3000,
        });
        const retrivedData = resp.data;
        const newDataWithActive = retrivedData.users.map((prev) => ({
          ...prev,
          isActive: false,
        }));


        // setTimeout(() => {
        //   setLocalData(newDataWithActive);
        //   setIsLoading(false);
        //   dispatch(storeUserTable(newDataWithActive));
        // }, 1000);
        
        setLocalData(newDataWithActive);
        setIsLoading(false);
        dispatch(storeUserTable(newDataWithActive));
      } catch (error) {
        console.log("Error during fetching data" + error);
        // if (error.code === "ECONNABORTED")
        //   toast.error("Request timed out. Server took too long to respond.");
        // else toast.error("Something went wrong. Please try again.");

        setHasFetchError(true);
        setIsLoading(false);
      }
    };
    initializeData();
  }, []);

  const toggleStatus = (id) => {
    const updatedData = localData.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    setLocalData(updatedData);
    dispatch(storeUserTable(updatedData));
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
      <main className="overflow-y-auto fixed h-full">
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
            {
              localData.map((currentUser) => (
                <tr
                  key={currentUser.email}
                  className="[&_td]:bg-zinc-50 [&_td]:px-4 
                       [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-200"
                >
                  <td>{currentUser.firstName}</td>
                  <td>{currentUser.lastName}</td>
                  <td>{currentUser.email}</td>
                  <td>
                    <div className="flex gap-2">
                      {currentUser.roles.map((role, index) => (
                        <span
                          key={index}
                          className="bg-[#e7efff] text-[#1d4ed8] 
                        py-1 px-3 rounded-sm text-sm font-medium"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{currentUser.lastLogin}</td>
                  <td className="flex items-center gap-4">
                    <div
                      onClick={() => toggleStatus(currentUser.id)}
                      className="cursor-pointer flex"
                    >
                      {currentUser.isActive ? (
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
                    <EditIcon className="cursor-pointer" />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    );
  }
}

export default UserTable;
