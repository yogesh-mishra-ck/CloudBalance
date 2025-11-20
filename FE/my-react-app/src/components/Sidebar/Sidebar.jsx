import { NavLink } from "react-router-dom";
import people from "../../assets/people.svg";
import { useContext } from "react";
import { SidebarContext } from "../UserContext/SidebarContext";
function Sidebar() {
  const dashboardTypes = [
    "User Management",
    "Cost Explorer",
    "AWS Services",
    "Onboarding",
  ];

  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div
      className={`flex flex-col h-screen border-r border-gray-400 w-55 [&_img]:h-6 gap-2 pt-5 
                ${isCollapsed ? "w-[7px]" : "w-[220px]"}`}
    >
      {dashboardTypes.map((currentDashboard) => {
        return (
          <NavLink
            key={currentDashboard}
            className={`flex items-center
                p-2 gap-2 transition-all duration-300
                ${isCollapsed ? " transition-all duration-300 w-[50px] border-0" : "border rounded-xs bg-sky-50"}`}
          >
            <img src={people} alt="" />
            <h4 className={`${isCollapsed ? " hidden" : ""}`}>
              {currentDashboard}
            </h4>
          </NavLink>
        );
      })}
    </div>
  );
}

export default Sidebar;
