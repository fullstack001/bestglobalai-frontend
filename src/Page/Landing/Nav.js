import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

import logo_icon from "../../assets/icons/logo.svg"; // Replace with your actual logo path

const Nav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition duration-300 ${
        isSticky ? "bg-gray-900 shadow-lg" : "bg-gray-900 shadow-lg"
      }`}
    >
      <div className="container mx-auto text-white p-5 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo_icon} className="w-80" alt="Logo" />
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
            //   onClick={() => navigate("/about")}
            className="hover:text-blue-500 transition duration-300"
          >
            About
          </button>
          <button
            //   onClick={() => navigate("/blog")}
            className="hover:text-blue-500 transition duration-300"
          >
            Blog
          </button>
          <button
            //   onClick={() => navigate("/contact")}
            className="hover:text-blue-500 transition duration-300"
          >
            Contact
          </button>
        </div>
        <div className="hidden md:flex space-x-6">
          <div className="flex space-x-6">
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
                //   onClick={() => navigate("/about")}
                className="hover:text-blue-500 transition duration-300"
              >
                About
              </button>
              <button
                //   onClick={() => navigate("/blog")}
                className="hover:text-blue-500 transition duration-300"
              >
                Blog
              </button>
              <button
                //   onClick={() => navigate("/contact")}
                className="hover:text-blue-500 transition duration-300"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => navigate("/login")}
                  className="bg-transparent border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-900"
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
