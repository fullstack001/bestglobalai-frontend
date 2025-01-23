import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/icons/logo.svg";
import ReCAPTCHA from "react-google-recaptcha";

const apiPort = process.env.REACT_APP_API_PORT;
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [captchaToken, setCaptchaToken] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Set the reCAPTCHA token
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please complete the reCAPTCHA.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }
    
    try {
      const response = await axios.post(`${apiPort}/api/auth/signup`, {
        ...formData,
        captchaToken,
      });

      console.log(response);
      navigate("/");
    } catch (error) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">{error.response.data.message}</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-900 min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <img src={logo_icon} alt="Logo" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-2xl font-bold text-white">
            Get Started With Embellisher
          </h2>
          <p className="mt-2 text-sm text-gray-400">Getting started is easy</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="w-1/2 py-2 px-4 bg-white text-gray-900 rounded-md flex items-center justify-center space-x-2">
            <FcGoogle className="text-2xl" />
            <span>Google</span>
          </button>
          <button className="w-1/2 py-2 px-4 bg-white text-gray-900 rounded-md flex items-center justify-center space-x-2">
            <FaFacebook className="rounded-full text-blue-500 text-2xl" />
            <span>Facebook</span>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <hr className="w-20 border-gray-600" />
          <span className="mx-4 text-gray-400">Or continue with</span>
          <hr className="w-20 border-gray-600" />
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Email
              </label>
              <input
                id="fullname"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="appearance-none rounded-md w-full px-3 py-2 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className="appearance-none rounded-md w-full px-3 py-2 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-md w-full px-3 py-2 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm_password" className="sr-only">
                Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                className="appearance-none rounded-md w-full px-3 py-2 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div className="mt-4">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-400">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-sm text-red-500 hover:underline">
              Recover Password
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center text-gray-400">
          <p>
            Don’t have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
