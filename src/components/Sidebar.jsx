import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { openPanel, closePanel } from "../store/openPanelSlice";

import logo_icon from "../assets/icons/logo.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const role = localStorage.getItem("role");
  const isAdmin = role === "admin" || role === "superAdmin";
  const isSuperAdmin = role === "superAdmin";
  const isCreator =
    role === "superAdmin" || role === "admin" || role === "editor";

  const location = useLocation();
  const dispatch = useDispatch();
  const panelActive = useSelector((state) => state.openPanel);

  const handleTogglePanel = (panelType) => {
    if (panelActive === panelType) {
      dispatch(closePanel());
    } else {
      dispatch(openPanel(panelType));
    }
  };

  const isActive = (path) => location.pathname === path;
  return (
    <aside
      className={`fixed lg:static top-0 left-0  w-64 p-6 bg-gray-800 z-50 transform ${
        isOpen ? "translate-x-0 h-full" : "-translate-x-full h-auto"
      } transition-transform duration-300 lg:translate-x-0`}
    >
      <div className="mb-8">
        <Link to="/">
          <img src={logo_icon} alt="Logo" className="h-20 w-auto m-auto" />
        </Link>
        <button
          onClick={() => {
            toggleSidebar();
            dispatch(closePanel());
          }}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <FontAwesomeIcon icon={faClose} size="2x" />
        </button>
      </div>
      <nav className="space-y-2">
        {isCreator && (
          <>
            <Link
              to="/creator"
              className={`block py-2 px-3 rounded  ${
                isActive("/creator") ? "bg-gray-700" : "text-gray-400"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/myEbooks"
              onClick={() => {
                dispatch(closePanel());
              }}
              className={`block py-2 px-3 rounded  ${
                isActive("/myEbooks") ? "bg-gray-700" : "text-gray-400"
              }`}
            >
              My Books
            </Link>
          </>
        )}
        <Link
          to="/explore-ebooks"
          onClick={() => {
            dispatch(closePanel());
          }}
          className={`block py-2 px-3 rounded  ${
            isActive("/explore-ebooks") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Explore Ebooks
        </Link>
        <div className="block">
          <button
            onClick={() => handleTogglePanel("video")}
            className="flex items-center justify-between w-full py-2 px-3 rounded text-left text-gray-400 hover:bg-gray-700"
          >
            <span>Video</span>
            <FontAwesomeIcon
              icon={panelActive === "video" ? faChevronUp : faChevronDown}
            />
          </button>
          {panelActive === "video" && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/video/my-videos"
                className={`block py-2 px-3 rounded ${
                  isActive("/video/my-videos") ? "bg-gray-700" : "text-gray-400"
                }`}
              >
                My Videos
              </Link>
              <Link
                to="/video/create-video"
                className={`block py-2 px-3 rounded ${
                  isActive("/video/create-video")
                    ? "bg-gray-700"
                    : "text-gray-400"
                }`}
              >
                Create Video
              </Link>
              <Link
                to="/video/video-translation"
                className={`block py-2 px-3 rounded ${
                  isActive("/video/video-translation")
                    ? "bg-gray-700"
                    : "text-gray-400"
                }`}
              >
                Video Translation
              </Link>
            </div>
          )}
        </div>

        <div className="block">
          <button
            onClick={() => handleTogglePanel("social")}
            className="flex items-center justify-between w-full py-2 px-3 rounded text-left text-gray-400 hover:bg-gray-700"
          >
            <span>Social Media</span>

            <FontAwesomeIcon
              icon={panelActive === "social" ? faChevronUp : faChevronDown}
            />
          </button>
          {panelActive === "social" && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/social/profile"
                className={`block py-2 px-3 rounded ${
                  isActive("/social/profile") ? "bg-gray-700" : "text-gray-400"
                }`}
              >
                Profile
              </Link>
              <Link
                to="/social/post"
                className={`block py-2 px-3 rounded ${
                  isActive("/social/post") ? "bg-gray-700" : "text-gray-400"
                }`}
              >
                Post
              </Link>
              <Link
                to="/social/analytics"
                className={`block py-2 px-3 rounded ${
                  isActive("/social/analytics")
                    ? "bg-gray-700"
                    : "text-gray-400"
                }`}
              >
                Analytics
              </Link>
            </div>
          )}
        </div>

        {isAdmin && (
          <Link
            to="/user-management"
            onClick={() => {
              dispatch(closePanel());
            }}
            className={`block py-2 px-3 rounded  ${
              isActive("/user-management") ? "bg-gray-700" : "text-gray-400"
            }`}
          >
            User Management
          </Link>
        )}

        {isSuperAdmin && (
          <>
            <Link
              to="/admin/blogs"
              onClick={() => {
                dispatch(closePanel());
              }}
              className={`block py-2 px-3 rounded  ${
                isActive("/admin/blogs") ? "bg-gray-700" : "text-gray-400"
              }`}
            >
              Blogs
            </Link>

            <Link
              to="/admin/contacts"
              onClick={() => {
                dispatch(closePanel());
              }}
              className={`block py-2 px-3 rounded  ${
                isActive("/admin/contacts") ? "bg-gray-700" : "text-gray-400"
              }`}
            >
              Contact Informations
            </Link>

            <Link
              to="/admin/services"
              onClick={() => {
                dispatch(closePanel());
              }}
              className={`block py-2 px-3 rounded  ${
                isActive("/admin/services") ? "bg-gray-700" : "text-gray-400"
              }`}
            >
              Service Orders
            </Link>
          </>
        )}

        <Link
          to="/profile"
          onClick={() => {
            dispatch(closePanel());
          }}
          className={`block py-2 px-3 rounded  ${
            isActive("/profile") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Profile
        </Link>
        <Link
          to="/change-password"
          onClick={() => {
            dispatch(closePanel());
          }}
          className={`block py-2 px-3 rounded  ${
            isActive("/change-password") ? "bg-gray-700" : "text-gray-400"
          }`}
        >
          Change Password
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
