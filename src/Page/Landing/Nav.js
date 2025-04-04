import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import axios from "axios";
import logo_icon from "../../assets/icons/logo.svg";
const apiPort = process.env.REACT_APP_API_PORT;

// Replace with your actual logo path

const Nav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Track scroll position to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${apiPort}/api/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUser();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setUser(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${
        isSticky ? "bg-gray-900 shadow-lg" : "bg-gray-900 shadow-lg"
      }`}
    >
      <div className="container mx-auto text-white p-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo_icon}
            className="w-80"
            alt="Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-500 transition duration-300"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/about-us")}
            className="hover:text-blue-500 transition duration-300"
          >
            About Us
          </button>
          <button
            onClick={() => navigate("/blogs")}
            className="hover:text-blue-500 transition duration-300"
          >
            Blog
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="hover:text-blue-500 transition duration-300"
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/services")}
            className="hover:text-blue-500 transition duration-300"
          >
            Services
          </button>
        </div>
        <div className="hidden md:flex md:relative space-x-6">
          {user ? (
            <div className="">
              <div className="  " onClick={toggleDropdown}>
                <div className="flex items-center justify-center bg-gray-600 rounded-full p-2 w-fit">
                  {user.profileImage ? (
                    <img
                      src={`${apiPort}${user.profileImage}`}
                      alt="Profile"
                      className="profile-image-preview h-8 w-8 cursor-pointer"
                    />
                  ) : (
                    <span className=" px-2 cursor-pointer">{user.fullName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <p className="font-semibold">{user.fullName}</p>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-lg text-white z-10">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <a href="profile">Profile</a>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                    <button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => navigate("/login")}
                className="bg-transparent px-6 py-2 flex space-x-2"
              >
                Sign In
                <FiArrowUpRight className="ml-2 mt-1" />
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-gray-700 px-6 py-2 rounded-lg hover:bg-gray-600 flex space-x-2"
              >
                Sign Up
                <FiArrowUpRight className="ml-2 mt-1" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-24 right-0 bg-gray-800 text-white w-full px-6 py-4 md:hidden z-50">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate("/")}
                className="hover:text-blue-500 transition duration-300"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about-us")}
                className="hover:text-blue-500 transition duration-300"
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/blogs")}
                className="hover:text-blue-500 transition duration-300"
              >
                Blog
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-blue-500 transition duration-300"
              >
                Contact
              </button>

              <button
                onClick={() => navigate("/services")}
                className="hover:text-blue-500 transition duration-300"
              >
                Service
              </button>

              <div className=" mt-2">
                {user ? (
                  <div className="text-center">
                    <div className="  " onClick={toggleDropdown}>
                      <div className="mx-auto text-center items-center justify-center bg-gray-600 rounded-full p-2 w-fit">
                        {user.profileImage ? (
                          <img
                            src={`${apiPort}${user.profileImage}`}
                            alt="Profile"
                            className="profile-image-preview h-8 w-8 cursor-pointer"
                          />
                        ) : (
                          <span>{user.fullName.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <p className="font-semibold">{user.fullName}</p>
                    </div>

                    {isDropdownOpen && (
                      <div className=" mt-2 w-full text-center bg-gray-800 shadow-lg rounded-lg text-white z-10">
                        <div className="px-4 py-2 border-b border-gray-700">
                          <a href="creator">Dashboard</a>
                        </div>
                        <div className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                          <button onClick={handleLogout} className="w-full">
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mb-2 grid">
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-transparent border-2 mb-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-900"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="bg-blue-500 px-6 py-2 rounded-full hover:bg-blue-600"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
