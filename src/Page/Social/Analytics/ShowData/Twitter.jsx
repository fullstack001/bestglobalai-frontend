import React from "react";

const TwitterAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    created,
    description,
    displayName,
    followersCount,
    friendsCount,
    id,
    location,
    mostRecentTweetId,
    name,
    pinnedTweet,
    profileImageUrl,
    protected: isProtected,
    subscriptionType,
    tweetCount,
    url,
    username,
    verified,
    verifiedType,
    website,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-bold">
            {displayName} {verified && <span className="text-blue-500">✔</span>}
          </h2>
          <p className="text-gray-500">@{username}</p>
          <p className="text-gray-600">{description}</p>
          <p className="text-gray-400">Subscription: {subscriptionType}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{followersCount}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{friendsCount}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{tweetCount}</p>
          <p className="text-gray-500 text-sm">Tweets</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{id}</p>
          <p className="text-gray-500 text-sm">Twitter ID</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Account Details</h3>
        <p>Location: {location}</p>
        <p>Created On: {new Date(created).toLocaleDateString()}</p>
        <p>Verified: {verified ? verifiedType : "Not Verified"}</p>
        <p>Protected: {isProtected ? "Yes" : "No"}</p>
        <p>Most Recent Tweet ID: {mostRecentTweetId}</p>
      </div>

      {pinnedTweet && (
        <div className="mt-4 text-sm text-gray-600 border-t pt-4">
          <h3 className="font-semibold">Pinned Tweet</h3>
          <p>{pinnedTweet.text}</p>
          <p>Tweet ID: {pinnedTweet.id}</p>
          <h4 className="font-semibold">Edit History</h4>
          <ul className="list-disc list-inside text-gray-500">
            {pinnedTweet.editHistoryTweetIds.map((tweetId) => (
              <li key={tweetId}>{tweetId}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Twitter Profile
        </a>
      </div>
      <div className="mt-2 text-center">
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default TwitterAnalytics;
