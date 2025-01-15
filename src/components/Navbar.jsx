import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiPort = process.env.REACT_APP_API_PORT;

const Navbar = () => {
  const [user, setUser] = useState(null); // State to hold user information
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
        }
      } catch (error) {        
        console.error("Failed to fetch user data:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">
        Welcome to the ePub Creator Studio
      </h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="h-10 w-10 bg-gray-600 rounded-full flex items-center justify-center">
              {user.profileImage ? (
                <img
                src={`${apiPort}${user.profileImage}`}
                alt="Profile"
                className="profile-image-preview w-28"
                />
              ) : (
                <span>{user.fullName.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <p>{user.fullName}</p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </header>
  );
};

export default Navbar;
