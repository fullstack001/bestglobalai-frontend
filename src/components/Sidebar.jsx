import React from "react";
import { useLocation } from "react-router-dom";

import logo_icon from "../assets/icons/logo.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <aside className={`fixed lg:static top-0 left-0  w-64 p-6 bg-gray-800 z-50 transform ${
        isOpen ? "translate-x-0 h-full" : "-translate-x-full h-auto"
      } transition-transform duration-300 lg:translate-x-0`}>
      <div className="mb-8">
        <a href="/">
          <img src={logo_icon} alt="Logo" className="h-20 w-auto m-auto" />
        </a>
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 text-gray-400"
        >
          ✕
        </button>
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
          href="/myEbooks"
          className={`block py-2 px-3 rounded  ${
            isActive("/myEbooks") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          My Books
        </a>
        <a
          href="/explore-ebooks"
          className={`block py-2 px-3 rounded  ${
            isActive("/explore-ebooks") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Explore Ebooks
        </a>
        <a
          href="/admin/blogs"
          className={`block py-2 px-3 rounded  ${
            isActive("/admin/blogs") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Blogs
        </a>

        <a
          href="/user-management"
          className={`block py-2 px-3 rounded  ${
            isActive("/user-management") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          User Management
        </a>

        <a
          href="/admin/contacts"
          className={`block py-2 px-3 rounded  ${
            isActive("/admin/contacts") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Contact Informations
        </a>

        <a
          href="/admin/services"
          className={`block py-2 px-3 rounded  ${
            isActive("/admin/services") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Service Orders
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
          href="/change-password"
          className={`block py-2 px-3 rounded  ${
            isActive("/change-password") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Change Password
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
