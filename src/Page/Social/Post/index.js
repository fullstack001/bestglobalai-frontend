import React, { useState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import Layout from "../../../components/Layout";
import { getSocialProfiles } from "../../../lib/api/ayrshare";
import Loading from "../../../components/Loading";

import SocialMediaPost from "./SocialMediaPost";

const SocialPostPage = () => {
  const [socials, setSocials] = useState(null);
  const [loading, setLoading] = useState(false);

  const refId = localStorage.getItem("ayrshareRefId");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setLoading(true);
        const res = await getSocialProfiles();
        const profiles = res.profiles;
        const profile = profiles.find((item) => item.refId === refId); // Fixed findOne to find
        if (profile) setSocials(profile.activeSocialAccounts);
      } catch {
        setSocials(null);
      } finally {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [refId]);

  return (
    <Layout titleText="Social Post">
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
            <SocialMediaPost socials={socials} />
          )}
        </>
      )}
    </Layout>
  );
};

export default SocialPostPage;
