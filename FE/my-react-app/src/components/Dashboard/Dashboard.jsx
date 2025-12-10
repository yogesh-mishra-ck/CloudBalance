import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import { SidebarContext } from "../UserContext/SidebarContext";
import BreadCrumb from "../BreadCrumb/BreadCrumb";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      <div className="flex flex-col h-screen">  
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto px-6 pt-2 bg-gray-100">
            <BreadCrumb />
            <Outlet />
            <Footer />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}


export default Dashboard;
