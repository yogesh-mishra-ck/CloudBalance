import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../UserContext/SidebarContext";


import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import PersonIcon from '@mui/icons-material/Person';
import CloudIcon from '@mui/icons-material/Cloud';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSelector } from "react-redux";

function Sidebar() {
  const allDashboards = [
    { label: "User Management",icon: <PersonIcon/>, path: 'user-management', admin_readOnly: true },
    { label: "Cost Explorer",icon: <AttachMoneyIcon/>, path: 'cost-explorer', admin_readOnly: false },
    { label: "AWS Services",icon: <CloudIcon/>, path: 'aws-services', admin_readOnly: false },
    { label: "Onboarding",icon: <HowToRegIcon/>, path: 'onboarding', admin_readOnly:true }
  ];
  const role = useSelector((state) => state.loggedInUser.role);
  //phle vo link dalo jo dono me common h i.e Cost Explorer and AWS Services--> ye sirf admin ya read only ke liye nhi h sbke lie h to admin_read===false
  //vrna jinka role(redux se) admin h unhe baad me dalo dashboard type me
  const dashboardTypes = allDashboards.filter( dashType => !dashType.admin_readOnly || (role === 'ADMIN' || role === "READ_ONLY"))
  

  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div
      className={`flex flex-col h-screen border-r pr-2 border-gray-400 gap-2 pt-5 transition-all duration-300
                ${isCollapsed ? "w-24 px-2" : "w-56 px-4"}`}
    >

      {dashboardTypes.map((currentDashboard) => {
        return (
          
          <NavLink
            to={currentDashboard.path}
            key={currentDashboard.label}
            className={({ isActive }) => (
              `flex items-center
                p-1 gap-2 transition-all duration-300
                 rounded-xs
              ${isCollapsed ? "justify-center" : ""}
              ${isActive ? 'border-l-4 bg-blue-200 border-blue-500':'bg-sky-50' }
              `
        )}
          >

            <div className={
              `transition-all duration-300 flex flex-col items-center justify-center
              ${isCollapsed ? ' h-10 w-10': 'h-12 w-11'}
              `
            }>
              {currentDashboard.icon}
            </div>
            
            <h4 className={` transition-all duration-300 overflow-hidden ${isCollapsed ? " w-0 opacity-0" : "w-40 opacity-100"}`}>
              {currentDashboard.label}
            </h4>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Sidebar;
