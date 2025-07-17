import React, { useEffect, useState, useCallback } from "react";
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

// Constants for better maintainability
const POST_TYPES = {
  REGULAR: "regular",
  REEL: "reel",
  STORY: "story",
};

const YOUTUBE_VISIBILITY = {
  PRIVATE: "private",
  PUBLIC: "public",
  UNLISTED: "unlisted",
};

const SOCIAL_PLATFORMS = {
  TWITTER: "twitter",
  YOUTUBE: "youtube",
  REDDIT: "reddit",
  FACEBOOK: "facebook",
  INSTAGRAM: "instagram",
  GMB: "gmb",
};

const VALIDATION_ERRORS = {
  INVALID_MEDIA: "Invalid media format.",
  EMPTY_POST_TEXT: "Please enter a post text.",
  MISSING_TITLE_SUBREDDIT: "Please enter a post title and subreddit.",
  MISSING_TITLE: "Please enter a post title.",
  GMB_MULTIPLE_IMAGES: "Please select only one image for GMB.",
};

/**
 * SocialMediaPost Component
 * Handles posting content to multiple social media platforms with various options
 * @param {Object} props - Component props
 * @param {Array} props.socials - Array of enabled social platform keys
 */
const SocialMediaPost = ({ socials = [] }) => {
  // State for network selection and configuration
  const [selectedNetworks, setSelectedNetworks] = useState(socialProfiles);
  const [postList, setPostList] = useState([]);

  // State for post content
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  // State for platform-specific options
  const [subreddit, setSubredit] = useState("");
  const [redditLink, setRedditLink] = useState("");
  const [twitterThread, setTwitterThread] = useState(false);
  const [youtubeShort, setYoutubeShort] = useState(false);
  const [youtubeVisiblilty, setYoutubeVisibility] = useState(
    YOUTUBE_VISIBILITY.PRIVATE
  );
  const [instagramPostType, setInstagramPostType] = useState(
    POST_TYPES.REGULAR
  );
  const [facebookPostType, setFacebookPostType] = useState(POST_TYPES.REGULAR);

  // State for scheduling and progress
  const [scheduleDate, setScheduleDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [postProgress, setPostProgress] = useState(false);
  const [fetchingUrl, setFetchingUrl] = useState(false);
  const [posting, setPosting] = useState(false);

  /**
   * Initialize selected networks based on enabled socials
   */
  useEffect(() => {
    const enabledSocial = socialProfiles.map((profile) => ({
      ...profile,
      active: socials.includes(profile.key),
    }));
    setSelectedNetworks(enabledSocial);
  }, [socials]);

  /**
   * Update post list when selected networks change
   */
  useEffect(() => {
    const list = selectedNetworks
      .filter((profile) => profile.active)
      .map((profile) => profile.key);
    setPostList(list);
  }, [selectedNetworks]);

  /**
   * Show error toast with custom styling
   * @param {string} message - Error message to display
   */
  const showError = useCallback((message) => {
    toast.error(
      <div className="custom-toast flex">
        <IoCloseCircleOutline className="custom-icon" />
        <div className="mt-4">{message}</div>
      </div>,
      {
        className: "error-toast",
        autoClose: 3000,
        hideProgressBar: true,
      }
    );
  }, []);

  /**
   * Toggle network selection with validation
   * @param {string} networkKey - Key of the network to toggle
   */
  const toggleNetwork = useCallback(
    (networkKey) => {
      if (!socials.includes(networkKey)) {
        const networkName = socialProfiles.find(
          (profile) => profile.key === networkKey
        )?.name;
        showError(
          `${networkName} needs to be enabled. Please go to the Social Profile page to set up.`
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
    },
    [socials, showError]
  );

  /**
   * Reset all form fields to initial state
   */
  const clearForm = useCallback(() => {
    setPostTitle("");
    setSubredit("");
    setRedditLink("");
    setPostText("");
    setMediaFiles([]);
    setTwitterThread(false);
    setYoutubeShort(false);
    setYoutubeVisibility(YOUTUBE_VISIBILITY.PRIVATE);
    setInstagramPostType(POST_TYPES.REGULAR);
    setFacebookPostType(POST_TYPES.REGULAR);
    setFetchingUrl(false);
    setPosting(false);
    setPostProgress(false);
    setScheduleDate(null);
  }, []);

  /**
   * Validate basic post requirements
   * @returns {boolean} - True if validation passes
   */
  const validateBasicPost = useCallback(() => {
    // Check media format compatibility
    const mediaWarnings = getMediaWarning(postList, mediaFiles);
    if (mediaWarnings.length > 0) {
      showError(VALIDATION_ERRORS.INVALID_MEDIA);
      return false;
    }

    // Check post text
    if (postText.length < 1) {
      showError(VALIDATION_ERRORS.EMPTY_POST_TEXT);
      return false;
    }

    return true;
  }, [postList, mediaFiles, postText, showError]);

  /**
   * Validate platform-specific requirements
   * @returns {boolean} - True if validation passes
   */
  const validatePlatformRequirements = useCallback(() => {
    // Reddit validation
    if (postList.includes(SOCIAL_PLATFORMS.REDDIT) && postTitle.length < 1) {
      showError(VALIDATION_ERRORS.MISSING_TITLE_SUBREDDIT);
      return false;
    }

    // YouTube validation
    if (postList.includes(SOCIAL_PLATFORMS.YOUTUBE) && postTitle.length < 1) {
      showError(VALIDATION_ERRORS.MISSING_TITLE);
      return false;
    }

    // GMB validation
    if (postList.includes(SOCIAL_PLATFORMS.GMB) && mediaFiles.length > 1) {
      showError(VALIDATION_ERRORS.GMB_MULTIPLE_IMAGES);
      return false;
    }

    return true;
  }, [postList, postTitle, mediaFiles, showError]);

  /**
   * Build platform-specific options for the post
   * @returns {Object} - Platform options object
   */
  const buildPlatformOptions = useCallback(() => {
    const postOptions = {};

    // Reddit options
    if (postList.includes(SOCIAL_PLATFORMS.REDDIT)) {
      const redditOptions = {
        title: postTitle,
        subreddit: subreddit,
      };
      if (redditLink.length > 0) {
        redditOptions.link = redditLink;
      }
      postOptions.redditOptions = redditOptions;
    }

    // YouTube options
    if (postList.includes(SOCIAL_PLATFORMS.YOUTUBE)) {
      postOptions.youTubeOptions = {
        title: postTitle,
        visibility: youtubeVisiblilty,
        shorts: youtubeShort,
      };
    }

    // Facebook options
    if (
      postList.includes(SOCIAL_PLATFORMS.FACEBOOK) &&
      facebookPostType !== POST_TYPES.REGULAR
    ) {
      postOptions.facebookOptions =
        facebookPostType === POST_TYPES.STORY
          ? { stories: true }
          : { reels: true };
    }

    // Instagram options
    if (
      postList.includes(SOCIAL_PLATFORMS.INSTAGRAM) &&
      instagramPostType !== POST_TYPES.REGULAR
    ) {
      postOptions.instagramOptions =
        instagramPostType === POST_TYPES.STORY
          ? { stories: true }
          : { reels: true };
    }

    // GMB options
    if (postList.includes(SOCIAL_PLATFORMS.GMB) && mediaFiles.length === 1) {
      postOptions.gmbOptions = {
        isPhotoVideo: true,
      };
    }

    return postOptions;
  }, [
    postList,
    postTitle,
    subreddit,
    redditLink,
    youtubeVisiblilty,
    youtubeShort,
    facebookPostType,
    instagramPostType,
    mediaFiles,
  ]);

  /**
   * Handle the posting process with comprehensive error handling
   */
  const handlePost = useCallback(async () => {
    try {
      // Validate basic requirements
      if (!validateBasicPost()) return;
      if (!validatePlatformRequirements()) return;

      // Start progress tracking
      setPostProgress(true);
      setFetchingUrl(true);

      // Upload media files and get URLs
      const mediaUrls = await getMediaUrls(mediaFiles);
      setFetchingUrl(false);
      setPosting(true);

      // Build platform options
      const postOptions = buildPlatformOptions();

      // Add Twitter thread options if applicable
      if (postList.includes(SOCIAL_PLATFORMS.TWITTER) && twitterThread) {
        postOptions.twitterOptions = {
          thread: twitterThread,
          mediaUrls: mediaUrls,
        };
      }

      // Prepare final post data
      const postData = {
        post: postText,
        platforms: postList,
        mediaUrls: mediaUrls,
        ...postOptions,
      };

      // Add schedule date if provided
      if (scheduleDate) {
        postData.scheduleDate = scheduleDate;
      }

      // Execute the post
      const response = await postMedia(postData);

      // Success feedback
      toast.success("Post published successfully!", {
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error posting to social media:", error);
      showError("Failed to post. Please try again.");
      setPostProgress(false);
      setFetchingUrl(false);
      setPosting(false);
    }
  }, [
    validateBasicPost,
    validatePlatformRequirements,
    mediaFiles,
    buildPlatformOptions,
    postList,
    twitterThread,
    postText,
    scheduleDate,
    showError,
  ]);

  /**
   * Handle scheduled post with date and timezone
   * @param {Object} scheduleData - Schedule configuration
   * @param {Date} scheduleData.scheduleDate - Date to schedule post
   * @param {string} scheduleData.timezone - Timezone for scheduling
   */
  const handleSchedulePost = useCallback(
    ({ scheduleDate, timezone }) => {
      setScheduleDate(scheduleDate);
      setShowDatePicker(false);
      handlePost();
    },
    [handlePost]
  );

  /**
   * Handle modal close and form cleanup
   */
  const handleModalClose = useCallback(() => {
    setPostProgress(false);
    clearForm();
  }, [clearForm]);

  return (
    <div className="p-6 mt-6 mx-auto bg-white text-gray-700 rounded-lg shadow-md">
      {/* Social Networks Selection */}
      <h2 className="text-2xl font-semibold mb-4">Social Networks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6 mx-12">
        {selectedNetworks.map((profile) => (
          <div key={profile.key} className="flex items-center space-x-2">
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

      {/* Post Creation Form */}
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <div className="p-6 rounded-lg shadow-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Basic Post Content */}
        <div className="w-full">
          {/* Post Title (for YouTube and Reddit) */}
          {(postList.includes(SOCIAL_PLATFORMS.YOUTUBE) ||
            postList.includes(SOCIAL_PLATFORMS.REDDIT)) && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Post Title *
              </label>
              <input
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                type="text"
                placeholder="Enter post title for YouTube, Reddit"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                required
              />
            </div>
          )}

          {/* Reddit-specific fields */}
          {postList.includes(SOCIAL_PLATFORMS.REDDIT) && (
            <>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Subreddit *
                </label>
                <input
                  value={subreddit}
                  type="text"
                  onChange={(e) => setSubredit(e.target.value)}
                  placeholder="Subreddit (please review the subreddit's guidelines)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Reddit Link (Optional)
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
            <label className="block text-sm font-medium mb-2">
              Post Text *
            </label>
            <textarea
              value={postText}
              placeholder="Enter post text"
              rows="4"
              onChange={(e) => setPostText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* File Upload */}
          <FileManage
            postList={postList}
            handleFile={(files) => setMediaFiles(files)}
            mediaFiles={mediaFiles}
          />
        </div>

        {/* Right Section - Platform-specific Options */}
        <div className="w-full">
          <h2 className="text-lg font-medium mb-4">Additional Options</h2>

          {/* Twitter Options */}
          {postList.includes(SOCIAL_PLATFORMS.TWITTER) && (
            <label className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                className="rounded border-gray-300 focus:ring-blue-300"
                checked={twitterThread}
                onChange={(e) => setTwitterThread(e.target.checked)}
              />
              <span>
                X/Twitter Thread <br />
                <small className="text-gray-500">
                  Create a thread post for X/Twitter
                </small>
              </span>
            </label>
          )}

          {/* YouTube Options */}
          {postList.includes(SOCIAL_PLATFORMS.YOUTUBE) && (
            <>
              <label className="flex items-center space-x-2 mt-6">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 focus:ring-blue-300"
                  checked={youtubeShort}
                  onChange={(e) => setYoutubeShort(e.target.checked)}
                />
                <span>
                  YouTube Shorts <br />
                  <small className="text-gray-500">
                    Send the video as a YouTube#shorts
                  </small>
                </span>
              </label>

              <div className="mt-5">
                <label className="block text-sm font-medium mb-2">
                  YouTube Visibility
                </label>
                <select
                  value={youtubeVisiblilty}
                  onChange={(e) => setYoutubeVisibility(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                >
                  <option value={YOUTUBE_VISIBILITY.PRIVATE}>Private</option>
                  <option value={YOUTUBE_VISIBILITY.PUBLIC}>Public</option>
                  <option value={YOUTUBE_VISIBILITY.UNLISTED}>Unlisted</option>
                </select>
              </div>
            </>
          )}

          {/* Instagram Options */}
          {postList.includes(SOCIAL_PLATFORMS.INSTAGRAM) && (
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Instagram Post Type
              </label>
              <select
                value={instagramPostType}
                onChange={(e) => setInstagramPostType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value={POST_TYPES.REGULAR}>Regular Post</option>
                <option value={POST_TYPES.REEL}>Reel Video</option>
                <option value={POST_TYPES.STORY}>Story Video or Image</option>
              </select>
            </div>
          )}

          {/* Facebook Options */}
          {postList.includes(SOCIAL_PLATFORMS.FACEBOOK) && (
            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">
                Facebook Post Type
              </label>
              <select
                value={facebookPostType}
                onChange={(e) => setFacebookPostType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              >
                <option value={POST_TYPES.REGULAR}>Regular Post</option>
                <option value={POST_TYPES.REEL}>Reel Video</option>
                <option value={POST_TYPES.STORY}>Story Video or Image</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-start space-x-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          onClick={() => setShowDatePicker(true)}
          disabled={postProgress}
        >
          Schedule Post
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
          onClick={handlePost}
          disabled={postProgress}
        >
          {postProgress ? "Posting..." : "Post Now"}
        </button>
      </div>

      {/* Modals and Toast Container */}
      <SchedulePostModal
        isOpen={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onSchedule={handleSchedulePost}
      />

      <PostProgressModal
        postProgress={postProgress}
        fetchingUrl={fetchingUrl}
        posting={posting}
        onClose={handleModalClose}
      />

      <ToastContainer position="top-right" />
    </div>
  );
};

export default SocialMediaPost;
