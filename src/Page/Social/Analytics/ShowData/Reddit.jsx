import React from "react";

const RedditAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    acceptFollowers,
    awardeeKarma,
    awarderKarma,
    commentKarma,
    created,
    hasSubscribed,
    hasVerifiedEmail,
    hideFromRobots,
    iconImg,
    id,
    isBlocked,
    isEmployee,
    isFriend,
    isGold,
    isMod,
    linkKarma,
    name,
    profileImageSize,
    profileImageUrl,
    totalKarma,
    url,
    verified,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={profileImageUrl || iconImg}
          alt="Profile"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500">Reddit User ID: {id}</p>
          <p className="text-gray-600">
            Joined: {new Date(created).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{totalKarma}</p>
          <p className="text-gray-500 text-sm">Total Karma</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{commentKarma}</p>
          <p className="text-gray-500 text-sm">Comment Karma</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{linkKarma}</p>
          <p className="text-gray-500 text-sm">Link Karma</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{awardeeKarma}</p>
          <p className="text-gray-500 text-sm">Awardee Karma</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{awarderKarma}</p>
          <p className="text-gray-500 text-sm">Awarder Karma</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Account Details</h3>
        <p>Verified: {verified ? "Yes" : "No"}</p>
        <p>Subscribed: {hasSubscribed ? "Yes" : "No"}</p>
        <p>Email Verified: {hasVerifiedEmail ? "Yes" : "No"}</p>
        <p>Mod Status: {isMod ? "Yes" : "No"}</p>
        <p>Gold Status: {isGold ? "Yes" : "No"}</p>
        <p>Employee: {isEmployee ? "Yes" : "No"}</p>
        <p>Blocked: {isBlocked ? "Yes" : "No"}</p>
        <p>Friend: {isFriend ? "Yes" : "No"}</p>
        <p>Accept Followers: {acceptFollowers ? "Yes" : "No"}</p>
        <p>Hide from Robots: {hideFromRobots ? "Yes" : "No"}</p>
        <p>Profile Image Size: {profileImageSize?.join("x") || "N/A"}</p>
      </div>

      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Reddit Profile
        </a>
      </div>
    </div>
  );
};

export default RedditAnalytics;
