import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

import { socialProfiles } from "../../../lib/socialProfile";
import FileManage from "./FileManage";
import { getMediaUrls } from "./getMediaUrls";
import { getMediaWarning } from "./getMediaWarning";
import PostProgressModal from "./ProgressModal";
import { postMedia } from "../../../lib/api/social";
import SchedulePostModal from "./SchedulePostModal";

const SocialMediaPost = ({ socials }) => {
  const [selectedNetworks, setSelectedNetworks] = useState(socialProfiles);
  const [postList, setPostList] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [postText, setPostText] = useState("");
  const [subreddit, setSubredit] = useState("");
  const [redditLink, setRedditLink] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [twitterThread, setTwitterThread] = useState(false);
  const [youtubeShort, setYoutubeShort] = useState(false);
  const [youtubeVisiblilty, setYoutubeVisibility] = useState("private");
  const [instagramPostType, setInstagramPostType] = useState("regular");
  const [facebookPostType, setFacebookPostType] = useState("regular");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [postProgress, setPostProgress] = useState(false);
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [posting, setPosting] = useState(false);

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

  const clearForm = () => {
    setPostTitle("");
    setSubredit("");
    setRedditLink("");
    setPostText("");
    setMediaFiles([]);
    setTwitterThread(false);
    setYoutubeShort(false);
    setYoutubeVisibility("private");
    setInstagramPostType("Regular Post");
    setFacebookPostType("Regular Post");
    setFetchingUrl(false);
    setPosting(false);
    setPostProgress(false);
  };

  const handlePost = async () => {
    try {
      const mediaWarnings = getMediaWarning(postList, mediaFiles);
      if (mediaWarnings.length > 0) {
        toast.error("Invalid media format.", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      }

      if (postText.length < 1) {
        toast.error("Please enter a post text.", {
          autoClose: 2000,
          hideProgressBar: true,
        });
        return;
      }
      console.log(facebookPostType, "facebookPostType");

      const postOptions = {};

      if (postList.includes("reddit")) {
        //check reddit options
        if (postTitle.length < 1) {
          toast.error("Please enter a post title and subreddit.", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        }

        const redditOptions = {
          title: postTitle, // required
          subreddit: subreddit, // required (no "/r/" needed)
        };
        if (redditLink.length > 1) redditOptions.link = redditLink;
        postOptions.redditOptions = redditOptions;
      }

      if (postList.includes("youtube")) {
        if (postTitle.length < 1) {
          toast.error("Please enter a post title.", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        }
        const youtubeOptions = {
          title: postTitle,
          visibility: youtubeVisiblilty,
          shorts: youtubeShort,
        };
        postOptions.youTubeOptions = youtubeOptions;
      }

      if (postList.includes("facebook")) {
        if (facebookPostType !== "regular") {
          const facebookOptions =
            facebookPostType === "story" ? { stories: true } : { reels: true };
          postOptions.facebookOptions = facebookOptions;
        }
      }

      if (postList.includes("instagram")) {
        if (instagramPostType !== "regular") {
          const instagramOptions =
            instagramPostType === "story"
              ? {
                  stories: true,
                }
              : { reels: true };
          postOptions.instagramOptions = instagramOptions;
        }
      }
      if (postList.includes("gmb")) {
        if (mediaFiles.length > 1) {
          toast.error("Please select only one image for GMB.", {
            autoClose: 2000,
            hideProgressBar: true,
          });
          return;
        } else if (mediaFiles.length === 1) {
          const gmbOptions = {
            isPhotoVideo: true,
          };
          postOptions.gmbOptions = gmbOptions;
        }
      }
      setPostProgress(true);
      setFetchingUrl(true);
      const mediaUrls = await getMediaUrls(mediaFiles);
      setFetchingUrl(false);

      if (postList.includes("twitter")) {
        if (twitterThread) {
          const twitterOptions = {
            thread: twitterThread,
            mediaUrls: mediaUrls,
          };
          postOptions.twitterOptions = twitterOptions;
        }
      }
      const postData = {
        post: postText,
        platforms: postList,
        mediaUrls: mediaUrls,
        ...postOptions,
      };
      if (scheduleDate) {
        postData.scheduleDate = scheduleDate;
      }
      console.log(postData);
      const response = await postMedia(postData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSchedulePost = ({ scheduleDate, timezone }) => {
    setScheduleDate(scheduleDate);
    handlePost();
  };

  return (
    <div className="p-6 mt-6 mx-auto bg-white text-gray-700 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Social Networks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mx-12">
        {selectedNetworks.map((profile) => (
          <div key={profile.key} className="flex items-center  space-x-2">
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
            {profile.icon}
            <div className="md:block hidden">{profile.name}</div>
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <div className="p-6 rounded-lg shadow-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="w-full">
          {(postList.includes("youtube") || postList.includes("reddit")) && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Post Title
              </label>
              <input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                type="text"
                placeholder="Enter post title for YouTube, Reddit"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>
          )}

          {postList.includes("reddit") && (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Subreddit
                </label>
                <input
                  value={subreddit}
                  type="text"
                  onChange={(e) => setSubredit(e.target.value)}
                  placeholder="Subreddit (please review the subreddit’s guidelines)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Reddit Link
                </label>
                <input
                  value={redditLink}
                  type="url"
                  onChange={(e) => setRedditLink(e.target.value)}
                  placeholder="Reddit link (optional)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
            </>
          )}

          {/* Post Text */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">Post Text</label>
            <textarea
              value={postText}
              placeholder="Enter post text"
              rows="4"
              onChange={(e) => setPostText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          {/* File Upload */}
          <FileManage
            postList={postList}
            handleFile={(files) => setMediaFiles(files)}
            mediaFiles={mediaFiles}
          />
        </div>

        {/* Right Section */}
        <div className="w-full">
          {/* Additional Options */}
          <h2 className="text-lg font-medium mb-4">Additional Options</h2>
          <div className=" gap-4">
            {postList.includes("twitter") && (
              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 focus:ring-blue-300"
                  checked={twitterThread}
                  onChange={(e) => setTwitterThread(e.target.checked)}
                />
                <span>
                  X/Twitter Thread <br />
                  Create a thread post for X/Twitter
                </span>
              </label>
            )}
            {postList.includes("youtube") && (
              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 focus:ring-blue-300"
                  checked={youtubeShort}
                  onChange={(e) => setYoutubeShort(e.target.checked)}
                />
                <span>
                  YouTube Shorts
                  <br />
                  Send the video as a YouTube#shorts.
                </span>
              </label>
            )}
          </div>

          {postList.includes("youtube") && (
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                YouTube Visibility
              </label>
              <select
                value={youtubeVisiblilty}
                onChange={(e) => setYoutubeVisibility(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
              </select>
            </div>
          )}

          {postList.includes("instagram") && (
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Instagram Post Type
              </label>
              <select
                value={instagramPostType}
                onChange={(e) => setInstagramPostType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="regular">Regular Post</option>
                <option value="reel">Reel Video</option>
                <option value="story">Story Video or Image</option>
              </select>
            </div>
          )}

          {postList.includes("facebook") && (
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Facebook Post Type
              </label>
              <select
                value={facebookPostType}
                onChange={(e) => setFacebookPostType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value="regular">Regular Post</option>
                <option value="reel">Reel Video</option>
                <option value="story">Story Video or Image</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-start space-x-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          onClick={() => setShowDatePicker(true)}
        >
          Schedule Post
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handlePost}
        >
          Post Now
        </button>
      </div>
      <SchedulePostModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSchedule={handleSchedulePost}
      />
      {/* {showDatePicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
            <Datepicker
              selected={scheduleDate}
              onChange={(date) => setScheduleDate(date.toISOString())}
              showTimeSelect
              dateFormat="Pp"
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                onClick={() => setShowDatePicker(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSchedulePost}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )} */}

      <ToastContainer />
      <PostProgressModal
        postProgress={postProgress}
        fetchingUrl={fetchingUrl}
        posting={posting}
        onClose={() => {
          setPostProgress(false);
          clearForm();
        }}
      />
    </div>
  );
};

export default SocialMediaPost;
