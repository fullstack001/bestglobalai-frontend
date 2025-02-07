import React from "react";

import { Button } from "flowbite-react";

import { socialLinkManage } from "../../../lib/api/social";
import { socialProfiles } from "../../../lib/socialProfile";

const SocialProfileGrid = ({ activeSocialAccounts, checkSocial }) => {
  const refetchData = () => {
    checkSocial();
  };

  const openLinkWindow = (link) => {
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const newWindow = window.open(
      link,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,toolbar=no,location=no,status=no,menubar=no`
    );

    const interval = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(interval);
        console.log("Window closed! Refetching data...");
        refetchData();
      }
    }, 500);
  };

  const handleSocialAccounts = async () => {
    try {
      const res = await socialLinkManage();
      if (res) {
        const shareLink = res.data.url;
        openLinkWindow(shareLink);
      }
    } catch {
      alert("Network Error");
    }
  };

  return (
    <div className="block p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full mx-auto">
        {socialProfiles.map((profile, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 ${
              profile.key && activeSocialAccounts.includes(profile.key)
                ? "bg-white border-2 border-green-500"
                : "bg-gray-500"
            } shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex items-center gap-4">
              {profile.icon}
              <span className="font-medium text-gray-800">{profile.name}</span>
            </div>
            {profile.key && activeSocialAccounts.includes(profile.key) ? (
              <span className="bg-green-300 font-semibold px-2 rounded-md">
                Linked
              </span>
            ) : (
              <span className="bg-red-300 font-semibold px-2 rounded-md">
                unLinked
              </span>
            )}
          </div>
        ))}
      </div>

      <Button
        className="mx-auto bg-green-600 hover:bg-gray-600 p-3 mt-10"
        onClick={handleSocialAccounts}
      >
        Manage Social Accounts
      </Button>
    </div>
  );
};

export default SocialProfileGrid;
