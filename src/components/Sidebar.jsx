import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo_icon from "../assets/icons/logo.svg";

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <aside className="w-64 p-6 bg-gray-800">
      <div className="mb-8">
        <img src={logo_icon} alt="Logo" className="h-20 w-auto m-auto" />
      </div>
      <nav className="space-y-2">
        <a
          href="/creator"
          className={`block py-2 px-3 rounded  ${
            isActive("/creator") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Dashboard
        </a>
        <a
          href="#tutorials"
          className={`block py-2 px-3 rounded  ${
            isActive("/tutorials") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Tutorials
        </a>
        <a
          href="/myEbooks"
          className={`block py-2 px-3 rounded  ${
            isActive("/myEbooks") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          My Books
        </a>
        <a
          href="#chat"
          className={`block py-2 px-3 rounded  ${
            isActive("#chat") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Chat
        </a>
        <a
          href="/profile"
          className={`block py-2 px-3 rounded  ${
            isActive("/profile") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Profile
        </a>
        <a
          href="/user-management"
          className={`block py-2 px-3 rounded  ${
            isActive("/user-management") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          User Management
        </a>
      </nav>
      <div className="mt-10">
        <button className="w-full bg-blue-600 py-2 rounded text-white">
          Explore Books
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
