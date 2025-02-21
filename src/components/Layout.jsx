import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Adjust the path as needed
import Navbar from "./Navbar"; // Adjust the path as needed

const Layout = ({ children, titleText }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 p-3 sm:p-8">
        <Navbar titleText={titleText} toggleSidebar={toggleSidebar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;
