import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "../UserContext/SidebarContext";
import aws from "../../assets/aws-serv.png";
import onboarding from "../../assets/onboarding.png";
import costexp from "../../assets//cost-exp.png";
import usermanage from "../../assets/user-manage.png";
function Sidebar() {
  const dashboardTypes = [
    { label: "User Management",icon: usermanage, path: 'user-management' },
    { label: "Cost Explorer",icon: costexp, path: 'cost-explorer' },
    { label: "AWS Services",icon: aws, path: 'aws-services' },
    { label: "Onboarding",icon: onboarding, path: 'onboarding' }
  ];

  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div
      className={`flex flex-col h-screen border-r pr-2 border-gray-400 w-55 [&_img]:h-10 gap-2 pt-5 transition-all duration-300
                ${isCollapsed ? "w-[90px] px-2" : "w-[220px] px-4"}`}
    >
      {dashboardTypes.map((currentDashboard) => {
        return (
          <NavLink
            to={currentDashboard.path}
            key={currentDashboard.label}
            className={({ isActive }) => (
              `flex items-center
                p-2 gap-2 transition-all duration-300
                 rounded-xs
              ${isCollapsed ? "justify-center" : ""}
              ${isActive ? 'border-l-4 bg-blue-200 border-blue-500':'bg-sky-50' }
              `
        )}
          >
            <img src={currentDashboard.icon} alt="" className={
              `transition-all duration-300 object-contain
              ${isCollapsed ? ' h-10 w-10': 'h-12 w-12'}
              `
            }/>
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
