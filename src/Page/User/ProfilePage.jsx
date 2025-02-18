import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

const apiPort = process.env.REACT_APP_API_PORT;

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    profileImage: "",
  });

  const [subscription, setSubscription] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    // Fetch the logged-in user's profile
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiPort}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data.user);
        setSubscription(response.data.subscription);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("fullName", profile.fullName);
    formData.append("phoneNumber", profile.phoneNumber);
    if (newImage) formData.append("profileImage", newImage);

    try {
      const response = await axios.put(
        `${apiPort}/api/users/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProfile(response.data); // Update the profile state with the new data
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Layout>
      <div className="profile-page ">
        <h2 className="text-xl mt-2 mb-2">My Profile</h2>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label className="block text-gray-400">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Profile Image</label>
            {profile.profileImage && (
              <img
                src={`${apiPort}${profile.profileImage}`}
                alt="Profile"
                className="profile-image-preview w-28"
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 bg-gray-700 text-gray-200 rounded"
            />
          </div>
          <div className="mb-4">
            <button className="bg-blue-600 px-4 py-2 rounded text-white">
              Update Profile
            </button>
          </div>
          {subscription && (
            <>
              <div className="mb-4">
                <label className="block text-gray-400">Subscripion Plan</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={subscription.plan}
                  className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400">
                  Subscripion Expiry Date
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={subscription.expiryDate.toString().slice(0, 10)}
                  className="mt-1 px-3 py-2 bg-gray-700 text-gray-200 rounded-lg w-full"
                  disabled
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <Link
              to="/plans"
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              {subscription ? "Change Plan" : "Subscribe"}
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ProfilePage;
