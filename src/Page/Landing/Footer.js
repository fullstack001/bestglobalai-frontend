import React from "react";
import logo_icon from "../../assets/icons/logo.svg"; // Assuming this is your logo file
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      {/* Top Footer Section */}
      <div className="bg-gray-900">
        <div className="max-w-6xl mx-auto px-6 py-12 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {/* Logo Section */}
          <div className="text-center md:text-left">
            <img src={logo_icon} className="w-auto h-20 mx-auto md:mx-0" />
          </div>

          {/* Features Section */}
          <div className="text-gray-200 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Features</h3>
            <a href="" className="text-lg block hover:text-gray-400">
              Social Media Marketing
            </a>
          </div>

          {/* Company Section */}
          <div className="text-gray-200 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Company</h3>
            <a href="" className="text-lg block hover:text-gray-400">
                Company Trust
            </a>
            <a href="" className="text-lg block hover:text-gray-400 mt-2">
              Pricing
            </a>
            <a href="" className="text-lg block hover:text-gray-400 mt-2">
              Blog
            </a>
            <a href="" className="text-lg block hover:text-gray-400 mt-2">
              Contact
            </a>
          </div>

          {/* Support Section */}
          <div className="text-gray-200 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Support</h3>
            <a href="" className="text-lg block hover:text-gray-400">
              FAQ
            </a>
            <a href="" className="text-lg block hover:text-gray-400 mt-2">
              Terms & Condition
            </a>
            <a href="" className="text-lg block hover:text-gray-400 mt-2">
              Privacy Policy
            </a>
            
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <footer className="bg-gray-950 text-center py-8 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-lg">
          <p className="mb-4 md:mb-0">© 2025 AI Marketing Solutions</p>
          <div className="flex gap-4">
            <a
              href="#"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <FaXTwitter className="text-xl" /> Twitter
            </a>
            <a
              href="#"
              className="flex items-center gap-2 hover:text-gray-300 transition"
            >
              <FaInstagram className="text-xl" /> Instagram
            </a>
            <a
              href="#"
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
