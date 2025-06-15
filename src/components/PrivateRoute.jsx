import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem("token");
  const trial = user?.trial || false;  // Ensure trial is defined
  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage after login
  const isSubscriptionActive = () => {
    if (userRole === "superAdmin") return true;
    if (!user) return false;
    if (!user.subscription || !user.subscription?.expiryDate) {
      return false; // No subscription or expiry date means it's inactive
    }

    const expiryDate = new Date(user.subscription?.expiryDate);
    const currentDate = new Date();

    return expiryDate > currentDate; // Returns true if expiryDate is in the future
  };
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole || "") && !trial) {
    return <Navigate to="/plans" />;
  }

  const restrictedPaths = [
    "/video/create-video",
    "/video/my-videos",
    "/video/video-translation",
    "/social/profile",
    "/social/post",
    "/social/analytics",
    "/followers",
  ];

  if (
    !isSubscriptionActive() &&
    restrictedPaths.includes(window.location.pathname)
  ) {
    return <Navigate to="/plans" replace />;
  }

  return children;
};

export default PrivateRoute;
