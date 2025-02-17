import React from "react";

const FacebookAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    name,
    username,
    about,
    category,
    fanCount,
    followersCount,
    pageFans,
    engagement,
    website,
    verified,
    reactions,
    unreadMessageCount,
    link,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold flex items-center">
        {name} {verified && <span className="ml-2 text-blue-500">✔</span>}
      </h2>
      <p className="text-gray-500">@{username}</p>
      <p className="text-gray-600 mt-2">{about}</p>
      <p className="text-gray-400 text-sm">Category: {category}</p>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{fanCount}</p>
          <p className="text-gray-500 text-sm">Fans</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{followersCount}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{pageFans}</p>
          <p className="text-gray-500 text-sm">Page Likes</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Engagement</h3>
        <p>{engagement?.socialSentence || "No engagement data available"}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Reactions</h3>
        <ul className="list-disc list-inside text-gray-500">
          <li>Likes: {reactions.like}</li>
          <li>Loves: {reactions.love}</li>
          <li>Anger: {reactions.anger}</li>
          <li>Haha: {reactions.haha}</li>
          <li>Wow: {reactions.wow}</li>
          <li>Sorry: {reactions.sorry}</li>
          <li>Total: {reactions.total}</li>
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Messages</h3>
        <p>Unread Messages: {unreadMessageCount}</p>
      </div>

      <div className="mt-4 text-center">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit Facebook Page
        </a>
        <br />
        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 block"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
};

export default FacebookAnalytics;
