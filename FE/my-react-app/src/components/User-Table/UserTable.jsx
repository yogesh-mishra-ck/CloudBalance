import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

function UserTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(async () => {
          const resp = await axios.get("http://localhost:3000/api/users");
          const retrivedData = resp.data;
          console.log(retrivedData.users);
          const dataWithIsActive = retrivedData.users.map((prev) => ({
            ...prev,
            isActive: false,
          }));
          setData(dataWithIsActive);
          setIsLoading(false);
        }, 200);
      } catch (error) {
        console.log("Error during fetching data" + error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleStatus = (id) => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  return (
    <>
      <main className="h-[1300px] overflow-y-auto">
        <table className="min-w-full table-fixed">
          {isLoading ? (
            <div className="ml-[650px] mt-[300px]">
              <CircularProgress />
            </div>
          ) : (
            <main>
              <thead>
                <tr className="[&_th]:bg-[#f4f6f8] [&_th]:text-gray-700 [&_th]:px-4 [&_th]:py-2 [&_th]:border-b [&_th]:border-gray-300 sticky top-0 transition-all">
                  <th className="w-[150px]">First Name</th>
                  <th className="w-[150px]">Last Name</th>
                  <th className="w-[300px]">Email ID</th>
                  <th className="w-[200px]">Roles</th>
                  <th className="w-[200px]">Last Login</th>
                  <th className="w-[120px]">Actions</th>
                </tr>
              </thead>

              <tbody>
                {data.map((currentUser) => (
                  <tr
                    key={currentUser.email}
                    className="[&_td]:bg-zinc-50 [&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-gray-200 "
                  >
                    <td>{currentUser.firstName}</td>
                    <td>{currentUser.lastName}</td>
                    <td>{currentUser.email}</td>
                    <td>
                      <div className="flex gap-2">
                        {currentUser.roles.map((role, index) => (
                          <span
                            key={index}
                            className="bg-[#e7efff] text-[#1d4ed8] py-1 px-3 rounded-sm text-sm font-medium"
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
                ))}
              </tbody>
            </main>
          )}
        </table>
      </main>
    </>
  );
}

export default UserTable;
