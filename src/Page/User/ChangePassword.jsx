import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

const apiPort = process.env.REACT_APP_API_PORT;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirmation password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiPort}/api/users/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to change password. Try again."
      );
    }
  };

  return (
    <Layout>
      <div className="change-password-page mt-8">
        <h2 className="text-xl mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {success && <p className="text-green-500 mb-2">{success}</p>}
          <div className="mb-4">
            <label className="block text-gray-400">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChangePassword;
