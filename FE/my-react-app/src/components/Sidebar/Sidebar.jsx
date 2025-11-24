import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../UserContext/SidebarContext";


import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import PersonIcon from '@mui/icons-material/Person';
import CloudIcon from '@mui/icons-material/Cloud';
import HowToRegIcon from '@mui/icons-material/HowToReg';

function Sidebar() {
  const dashboardTypes = [
    { label: "User Management",icon: <PersonIcon/>, path: 'user-management' },
    { label: "Cost Explorer",icon: <AttachMoneyIcon/>, path: 'cost-explorer' },
    { label: "AWS Services",icon: <CloudIcon/>, path: 'aws-services' },
    { label: "Onboarding",icon: <HowToRegIcon/>, path: 'onboarding' }
  ];

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
              ${isCollapsed ? ' h-10 w-10': 'h-12 w-12'}
              `
            }>
              {currentDashboard.icon}
            </div>
            
            <h4 className={`${isCollapsed ? " hidden" : ""}`}>
              {currentDashboard.label}
            </h4>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Sidebar;
