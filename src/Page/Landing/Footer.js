import React from "react";
import { useNavigate } from "react-router-dom";

import logo_icon from "../../assets/icons/logo.svg"; // Assuming this is your logo file
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Top Footer Section */}
      <div className="bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-12 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <img
              src={logo_icon}
              className="w-auto h-20 mx-auto md:mx-0 cursor-pointer"
              alt="logo_icon"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Features Section */}
          <div className="text-gray-200 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Features</h3>
            <a
              className="text-lg block hover:text-gray-400"
              href="https://youtu.be/3UW4mZJqo9s"
            >
              Social Media Marketing
            </a>
          </div>

          {/* Company Section */}
          <div className="text-gray-200 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <button className="text-lg block hover:text-gray-400">
              Company Trust
            </button>
            <button
              className="text-lg block hover:text-gray-400 mt-2"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="text-lg block hover:text-gray-400 mt-2"
            >
              Blog
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-lg block hover:text-gray-400 mt-2"
            >
              Contact
            </button>
          </div>

          {/* Support Section */}
          <div className="text-gray-200 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Support</h3>
            <button
              onClick={() => navigate("/faq")}
              className="text-lg block hover:text-gray-400"
            >
              FAQ
            </button>
            <button
              onClick={() => navigate("/terms-and-condition")}
              className="text-lg block hover:text-gray-400 mt-2"
            >
              Terms & Condition
            </button>
            <button
              onClick={() => navigate("/privacy-policy")}
              className="text-lg block hover:text-gray-400 mt-2"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <footer className="bg-gray-950 text-center py-8 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-lg">
          <p className="mb-4 md:mb-0">© 2025 AI Marketing Solutions</p>
          <div className="flex gap-4">
            <a
              href="https://x.com/jim_musgrave"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <FaXTwitter className="text-xl" /> Twitter
            </a>
            <a
              href="https://www.instagram.com/efraimzgraves/"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <FaInstagram className="text-xl" /> Instagram
            </a>
            <a
              href="https://www.youtube.com/@musgrave2"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <FaYoutube className="text-xl" /> YouTube
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
