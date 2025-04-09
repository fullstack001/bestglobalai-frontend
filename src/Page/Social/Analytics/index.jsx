import React, { useState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { Select } from "flowbite-react"; // Import Flowbite's Select component

import Layout from "../../../components/Layout";
import { getSocialProfiles } from "../../../lib/api/ayrshare";
import { getSocailAnalytics } from "../../../lib/api/social";
import Loading from "../../../components/Loading";
import { socialProfiles } from "../../../lib/socialProfile";

import Bluesky from "./ShowData/Bluesky";
import Facebook from "./ShowData/Facebook";
import Instagram from "./ShowData/Instagram";
import Gmb from "./ShowData/Gmb";
import Linkedin from "./ShowData/Linkedin";
import Pinterest from "./ShowData/Pinterest";
import Reddit from "./ShowData/Reddit";
import TikTok from "./ShowData/TikTok";
import Twitter from "./ShowData/Twitter";
import Youtubu from "./ShowData/Youtubu";

const netWorks = [
  { component: Bluesky, key: "bluesky" },
  { component: Facebook, key: "facebook" },
  { component: Instagram, key: "instagram" },
  { component: Gmb, key: "gmb" },
  { component: Linkedin, key: "linkedin" },
  { component: Pinterest, key: "pinterest" },
  { component: Reddit, key: "reddit" },
  { component: TikTok, key: "tiktok" },
  { component: Twitter, key: "twitter" },
  { component: Youtubu, key: "youtube" },
];

// Filter out Telegram from the socialProfiles
const validSocials = socialProfiles.filter((item) => item.name !== "Telegram");

const SocialPostPage = () => {
  const [socials, setSocials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(""); // Store only a single key
  const [analytics, setAnalytics] = useState(null);
  const [fetching, setFetching] = useState(false);

  console.log(analytics);

  const refId = localStorage.getItem("ayrshareRefId");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoading(true);
        const res = await getSocialProfiles();
        const profiles = res.profiles;
        const profile = profiles.find((item) => item.refId === refId);
        if (profile)
          setSocials(
            validSocials.filter((social) =>
              profile.activeSocialAccounts.includes(social.key)
            )
          );
      } catch {
        setSocials(null);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [refId]);

  const CurrentComponent = netWorks.find(
    (network) => network.key === selectedSocial
  )?.component;

  const handleClickAnalytics = async () => {
    if (!selectedSocial) return alert("Please select a social profile");
    setFetching(true);
    try {
      const response = await getSocailAnalytics(selectedSocial);
      setAnalytics({
        status: true,
        data: response.data[selectedSocial],
      });
    } catch (error) {
      console.log(error.response.data.details[selectedSocial]?.message);
      setAnalytics({
        status: false,
        data: error.response.data.details[selectedSocial]?.message,
      });
    } finally {
      setFetching(false);
    }
  };

  return (
    <Layout titleText="Social Analytics">
      {loading ? (
        <Loading
          spinnerSrc="/assets/icons/spinner.svg"
          text="Fetching Social Profile"
        />
      ) : (
        <>
          {!socials ? (
            <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-6">
              <FaExclamationCircle className="mr-2 text-red-600" size={20} />
              <span className="text-sm">
                First enable a network in Social Profile
              </span>
            </div>
          ) : (
            <>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                {/* Flowbite Single Select Dropdown */}
                <div className="w-full sm:w-2/3">
                  <Select
                    id="social-select"
                    value={selectedSocial}
                    onChange={(e) => {
                      setSelectedSocial(e.target.value);
                      setAnalytics(null);
                    }}
                    required
                  >
                    <option value="">Select a Social Profile</option>
                    {socials?.map((social) => (
                      <option key={social.key} value={social.key}>
                        {social.name}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
                  <button
                    className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleClickAnalytics}
                  >
                    Analytics
                  </button>
                </div>
              </div>
              <div>
                {fetching ? (
                  <div className="text-center text-2xl mt-16 w-full">
                    ...Loading
                  </div>
                ) : (
                  analytics &&
                  (analytics.status ? (
                    <div className="mt-6">
                      <CurrentComponent data={analytics.data} />
                    </div>
                  ) : (
                    <div className="text-center text-red-500 mt-16">
                      {analytics.data}
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default SocialPostPage;
