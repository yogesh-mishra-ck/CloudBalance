import Snackbar from "@mui/material/Snackbar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import CostExplorer from "../CostExplorer/CostExplorer";
import UserTable from "../../components/User-Table/UserTable";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

function UserManagement() {
  

  const navigate = useNavigate();
  const location = useLocation();

  const isAddUserPage = location.pathname.includes("add-user");
  const role = useSelector(state => state.loggedInUser.role);

  return (
    <div>
      {!isAddUserPage && (
        <button
          className={`ml-1 px-1 py-1 font-bold text-lg bg-zinc-200 rounded-sm mb-1.5 ${role!=="ADMIN" ? "cursor-not-allowed":"cursor-pointer"}` }
          onClick={() => {
            // if(role !== "ADMIN") return;
            navigate("/dashboard/user-management/add-user", {
            state: { isEditMode: false }
          }
        ) 
        
          }}
          disabled={role !== "ADMIN"}
        >
          Add New User
        </button>
      )}

      {!isAddUserPage && <UserTable />}

      <Outlet />
    </div>
  );
}


export default UserManagement;
