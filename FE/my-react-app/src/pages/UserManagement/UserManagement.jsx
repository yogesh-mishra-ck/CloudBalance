import Snackbar from "@mui/material/Snackbar";
import { Navigate, useNavigate } from "react-router-dom";
import CostExplorer from "../CostExplorer/CostExplorer";
import UserTable from "../../components/User-Table/UserTable";

function UserManagement() {
  
  const navigate = useNavigate();

  return (
    <div>
      <button className="ml-1 px-1 py-1 font-bold text-lg cursor-pointer bg-zinc-200 rounded-sm mb-1.5" onClick={()=> {navigate('/dashboard/add-user')}}>Add New User</button>
      <UserTable/>
    </div>
  );
}

export default UserManagement;
