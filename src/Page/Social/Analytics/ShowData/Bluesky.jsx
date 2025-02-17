import React from "react";

const BlueskyAnalytics = ({ data }) => {
  const { analytics, lastUpdated, nextUpdate } = data;
  const {
    avatar,
    created,
    displayName,
    followersCount,
    followsCount,
    handle,
    id,
    postsCount,
    associated,
    viewer,
  } = analytics;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* User Information */}
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt={`${displayName} Avatar`}
          className="w-16 h-16 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-xl font-semibold">{displayName}</h2>
          <p className="text-gray-500">@{handle}</p>
          <p className="text-sm text-gray-400">ID: {id}</p>
        </div>
      </div>

      {/* Account Details */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">Account Stats</h3>
          <p className="text-gray-600">Followers: {followersCount}</p>
          <p className="text-gray-600">Following: {followsCount}</p>
          <p className="text-gray-600">Posts: {postsCount}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">Associated Features</h3>
          <p className="text-gray-600">Lists: {associated.lists}</p>
          <p className="text-gray-600">
            Feed Generations: {associated.feedgens}
          </p>
          <p className="text-gray-600">
            Starter Packs: {associated.starterPacks}
          </p>
          <p className="text-gray-600">
            Labeler Enabled: {associated.labeler ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {/* Viewer Information */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium">Viewer Information</h3>
        <p className="text-gray-600">Muted: {viewer.muted ? "Yes" : "No"}</p>
        <p className="text-gray-600">
          Blocked by Viewer: {viewer.blockedBy ? "Yes" : "No"}
        </p>
      </div>

      {/* Account Creation & Update Info */}
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">Account Created</h3>
          <p className="text-gray-600">{new Date(created).toLocaleString()}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium">Last Indexed</h3>
          <p className="text-gray-600">
            {new Date(analytics.indexedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Last & Next Update */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium">Update Information</h3>
        <p className="text-gray-600">
          Last Update: {new Date(lastUpdated).toLocaleString()}
        </p>
        <p className="text-gray-600">
          Next Update: {new Date(nextUpdate).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default BlueskyAnalytics;
