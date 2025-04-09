import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout";
import { getSocialProfiles } from "../../../lib/api/ayrshare";
import { createUserProfile } from "../../../lib/api/social";
import { Modal, Button, Label, TextInput } from "flowbite-react"; // Import Flowbite components
import SocialProfileGrid from "./SocialProfileGrid";

const SocialProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const refId = localStorage.getItem("ayrshareRefId");
  console.log(userProfile);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await getSocialProfiles();
        console.log(res);
        const profiles = res.profiles;
        console.log(refId);
        const profile = profiles.find((item) => item.refId === refId); // Fixed findOne to find
        if (profile) setUserProfile(profile);
      } catch {
        setUserProfile(null);
      }
    };
    getUserProfile();
  }, [refId]);

  const handleCreateProfile = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleSubmitProfile = async () => {
    try {
      const responsive = await createUserProfile({ title }); // Call API with the entered title
      localStorage.setItem("ayrshareRefId", responsive.data.refId);

      setUserProfile(responsive.data);
      setIsModalOpen(false); // Close modal on success
      alert("Profile created successfully!");
    } catch (error) {
      alert("Error creating profile");
      console.error(error);
    }
  };

  const recheck = async () => {
    const newRefId = localStorage.getItem("ayrshareRefId");
    try {
      const res = await getSocialProfiles();
      const profiles = res.profiles;
      const profile = profiles.find((item) => item.refId === newRefId); // Fixed findOne to find
      if (profile) setUserProfile(profile);
    } catch {
      setUserProfile(null);
    }
  };

  return (
    <Layout titleText="Social Profile">
      {userProfile ? (
        <div className="mt-6">
          <SocialProfileGrid
            checkSocial={recheck}
            activeSocialAccounts={userProfile.activeSocialAccounts || []}
          />
        </div>
      ) : (
        <div className="text-center w-full mt-10">
          <div className="max-w-3xl mx-auto bg-purple-600 text-white p-6 rounded-xl shadow-md mb-6">
            <ul className="list-disc list-inside space-y-3 text-left text-sm md:text-base">
              <li>
                <strong>
                  Set up your social profile. This will act as your central
                  control panel.
                </strong>
              </li>
              <li>
                <strong>Set Up Your Business Profiles on Social Media</strong>
                <br />
                On each social media platform (like Facebook, Instagram,
                LinkedIn), make sure you’ve added your{" "}
                <strong>business logo and branding</strong>.
              </li>
              <li>
                <strong>Link Your Social Media Accounts</strong>
                <br />
                Connect your business profiles to your BGAI social profile — all
                in just a few clicks.
              </li>
              <li>
                <strong>Manage Everything from One Place</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>Create and schedule posts</li>
                  <li>Analyze your content performance</li>
                  <li>Stay on brand with your logo and identity</li>
                </ul>
              </li>
            </ul>
          </div>

          <Button
            className="mx-auto bg-green-600 hover:bg-gray-600 p-3"
            onClick={handleCreateProfile}
          >
            Create User Social Profile
          </Button>
        </div>
      )}

      {/* Flowbite Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Create Social Profile</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <TextInput
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button color="green" onClick={handleSubmitProfile}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default SocialProfilePage;
