import React, { useState, useEffect } from "react";
// import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoCloseCircleOutline } from "react-icons/io5";
import ReCAPTCHA from "react-google-recaptcha";

import logo_icon from "../../assets/icons/logo.svg";

const apiPort = process.env.REACT_APP_API_PORT;
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const ResetPasswprdPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });
  const [captchaToken, setCaptchaToken] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");
    setToken(tokenFromUrl);
  }, []);

  console.log(token);

  // Load stored credentials if "Remember Me" was checked

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      await axios.post(`${apiPort}/api/auth/reset-password`, {
        resetToken: token,
        newPassword: formData.password,
        captchaToken,
      });
      toast.success("Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">
            {" "}
            {error.response?.data?.message || "Faild to reset password"}
          </div>
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
    <div className="flex min-h-screen items-center justify-center bg-gray-900 ">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img src={logo_icon} alt="Logo" className="mx-auto h-20 w-auto" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Login into your account</p>
        </div>

        <div className="flex items-center justify-between">
          <hr className="w-20 border-gray-600" />
          <span className="mx-4 text-gray-400">Or continue with</span>
          <hr className="w-20 border-gray-600" />
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="password" className="sr-only">
                New Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                required
                className="appearance-none rounded-md w-full px-3 py-2 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md w-full px-3 py-2 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
              />
            </div>
          </div>

          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
          />

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswprdPage;
