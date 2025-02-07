import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

import { FaUpload } from "react-icons/fa";
import { socialProfiles } from "../../../lib/socialProfile";

const SocialMediaPost = ({ socials }) => {
  const [selectedNetworks, setSelectedNetworks] = useState(socialProfiles);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const enabledSocial = socialProfiles.map((profile) => ({
      ...profile,
      active: socials.includes(profile.key),
    }));

    setSelectedNetworks(enabledSocial);
  }, [socials]); // Added dependency array to ensure it updates correctly

  useEffect(() => {
    const list = selectedNetworks
      .filter((profile) => profile.active)
      .map((profile) => profile.key);
    setPostList(list);
  }, [selectedNetworks]);

  const toggleNetwork = (networkKey) => {
    if (!socials.includes(networkKey)) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">
            {socialProfiles.find((profile) => profile.key === networkKey)?.name}{" "}
            needs to be enabled. Please go to the Social Profile page to set up.
          </div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }
    setSelectedNetworks((prevNetworks) =>
      prevNetworks.map((network) =>
        network.key === networkKey
          ? { ...network, active: !network.active }
          : network
      )
    );
  };

  return (
    <div className="p-6 mt-6 mx-auto bg-white text-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Social Networks</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6 mx-12">
        {selectedNetworks.map((profile) => (
          <div key={profile.key} className="flex items-center  space-x-2">
            {profile.icon}

            <Switch
              checked={profile.active}
              onChange={() => toggleNetwork(profile.key)}
              className={`${
                profile.active ? "bg-blue-500" : "bg-gray-300"
              } relative inline-flex h-6 w-11 items-center rounded-full mx-4`}
            >
              <span className="sr-only">Enable {profile.name}</span>
              <span
                className={`${
                  profile.active ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            {profile.name}
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <div className="p-6 rounded-lg shadow-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="w-full">
          <div>
            <label className="block text-sm font-medium mb-2">Post Title</label>
            <input
              type="text"
              placeholder="Enter post title for YouTube, Reddit"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Subreddit */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Subreddit</label>
            <input
              type="text"
              placeholder="Subreddit (please review the subreddit’s guidelines)"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Reddit Link */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Reddit Link
            </label>
            <input
              type="url"
              placeholder="Reddit link (optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Post Text */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Post Text</label>
            <textarea
              placeholder="Enter post text"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Add Images or a Video
            </label>
            <div className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg py-6 cursor-pointer hover:bg-gray-100">
              <FaUpload className="text-blue-500 text-3xl mb-2" />
              <span className="text-sm text-gray-500">
                Click to Upload or Drag & Drop
              </span>
              <p className="text-sm text-gray-500 mt-2">
                PNG, JPG, GIF, WEBP, MP4, MOV or AVI
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full">
          {/* Additional Options */}
          <h2 className="text-lg font-medium mb-4">Additional Options</h2>
          <div className=" gap-4">
            <label className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                className="rounded border-gray-300 focus:ring-blue-300"
              />
              <span>
                X/Twitter Thread <br />
                Create a thread post for X/Twitter
              </span>
            </label>
            <label className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                className="rounded border-gray-300 focus:ring-blue-300"
              />
              <span>
                YouTube Shorts
                <br />
                Send the video as a YouTube#shorts.
              </span>
            </label>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">
              YouTube Visibility
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300">
              <option>Private</option>
              <option>Public</option>
              <option>Unlisted</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">
              Instagram Post Type
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300">
              <option>Regular Post</option>
              <option>Reel Video</option>
              <option>Story Video or Image</option>
            </select>
          </div>
          <div className="mt-5">
            <label className="block text-sm font-medium mb-2">
              Facebook Post Type
            </label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300">
              <option>Regular Post</option>
              <option>Reel Video</option>
              <option>Story Video or Image</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          Schedule Post
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Post Now
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SocialMediaPost;
