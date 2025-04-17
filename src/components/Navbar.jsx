import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const apiPort = process.env.REACT_APP_API_PORT;

const Navbar = ({ toggleSidebar, titleText }) => {
  const [user, setUser] = useState(null);
  const [subscriptoin, setSubscription] = useState(null);
  const [trial, setTrial] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${apiPort}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(response.data.user);
          setTrial(response.data.isTrial || false); // Ensure trial is defined
          setSubscription(response.data.subscription || null); // Ensure subscription is defined
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        localStorage.clear();
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const getTrialRemainingDays = () => {
    if (!user?.createdAt) return null;
    console.log(user);
    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const diffMs = 7 * 24 * 60 * 60 * 1000 - (now - createdDate);
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getSubscriptionRemainingDays = () => {
    if (!subscriptoin?.expiryDate) return null;
    const expiry = new Date(subscriptoin.expiryDate);
    const now = new Date();
    const diffMs = expiry - now;
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700">
      <button
        onClick={toggleSidebar}
        className="text-white lg:hidden focus:outline-none"
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>
      <h1 className="text-2xl font-semibold hidden md:block">
        {titleText || "Welcome to the ePub Creator Studio"}
      </h1>

      {user && !user.role === "superAdmin" && (
        <div className="text-sm md:text-base bg-red-500 p-3 rounded-lg shadow-lg hidden md:block animate-pulse">
          {trial && (
            <div className="flex items-center justify-between gap-4">
              <p className="text-white font-semibold">
                🧪 Your Free Trial: {getTrialRemainingDays()} days left
              </p>
              <button
                onClick={() => navigate("/pricing")}
                className="bg-white text-green-600 text-xs px-3 py-1 rounded hover:bg-red-100 transition-all"
              >
                Upgrade Plan
              </button>
            </div>
          )}
          {subscriptoin && (
            <div className="flex  text center md:flex-row md:items-center md:justify-between gap-2 mt-2">
              <p className="text-green-200 font-semibold">
                Your 💳 {subscriptoin.plan} Plan
              </p>
              <p className="text-green-200 font-semibold">
                ⏳ {getSubscriptionRemainingDays()} days left
              </p>
            </div>
          )}
        </div>
      )}

      <div className="relative" ref={dropdownRef}>
        {user ? (
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="h-10 w-10 bg-gray-600 rounded-full overflow-hidden border-2 border-white"
          >
            {user.profileImage ? (
              <img
                src={`${apiPort}${user.profileImage}`}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-white font-semibold text-lg">
                {user.fullName.charAt(0).toUpperCase()}
              </span>
            )}
          </button>
        ) : (
          <div className="h-10 w-10 bg-gray-600 rounded-full animate-pulse"></div>
        )}

        {/* Dropdown */}
        {dropdownOpen && user && (
          <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded shadow-lg z-50">
            <div className="p-4 border-b">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
            <button
              onClick={() => handleNavigation("/profile")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>
            <button
              onClick={() => handleNavigation("/change-password")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
