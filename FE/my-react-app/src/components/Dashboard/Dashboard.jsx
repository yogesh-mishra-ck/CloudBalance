import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { SidebarContext } from "../UserContext/SidebarContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <div className="flex">
          <Sidebar />
          <main className="pt-2">
            <BreadCrumb/>
            <Outlet />
            <Footer />
          </main>
        </div>

      </div>
    </SidebarContext.Provider>
  );
}

export default Dashboard;
