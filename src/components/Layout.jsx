import React from "react";
import Sidebar from "./Sidebar"; // Adjust the path as needed
import Navbar from "./Navbar"; // Adjust the path as needed

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-8">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
