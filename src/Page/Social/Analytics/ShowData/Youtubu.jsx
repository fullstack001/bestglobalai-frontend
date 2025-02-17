import React from "react";

const YouTubeAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    averageViewDuration,
    averageViewPercentage,
    comments,
    created,
    description,
    dislikes,
    estimatedMinutesWatched,
    hiddenSubscriberCount,
    isLinked,
    likes,
    longUploadsStatus,
    playlistId,
    playlists,
    privacyStatus,
    shares,
    subscriberCount,
    subscribersGained,
    subscribersLost,
    thumbnailUrl,
    title,
    url,
    videoCount,
    videosAddedToPlaylists,
    videosRemovedFromPlaylists,
    viewCount,
    views,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={thumbnailUrl}
          alt="Channel Thumbnail"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-gray-500">{description}</p>
          <p className="text-gray-500">
            Created: {new Date(created).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            Hidden Subscriber Count: {hiddenSubscriberCount ? "Yes" : "No"}
          </p>
          <p className="text-gray-500">Is Linked: {isLinked ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{subscriberCount}</p>
          <p className="text-gray-500 text-sm">Subscribers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{views}</p>
          <p className="text-gray-500 text-sm">Total Views</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{viewCount}</p>
          <p className="text-gray-500 text-sm">Channel Views</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{videoCount}</p>
          <p className="text-gray-500 text-sm">Total Videos</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{shares}</p>
          <p className="text-gray-500 text-sm">Shares</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{comments}</p>
          <p className="text-gray-500 text-sm">Comments</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{likes}</p>
          <p className="text-gray-500 text-sm">Likes</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{dislikes}</p>
          <p className="text-gray-500 text-sm">Dislikes</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{estimatedMinutesWatched}</p>
          <p className="text-gray-500 text-sm">Minutes Watched</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Additional Metrics</h3>
        <p>Avg View Duration: {averageViewDuration}s</p>
        <p>Avg View Percentage: {averageViewPercentage}%</p>
        <p>Subscribers Gained: {subscribersGained}</p>
        <p>Subscribers Lost: {subscribersLost}</p>
        <p>Videos Added to Playlists: {videosAddedToPlaylists}</p>
        <p>Videos Removed from Playlists: {videosRemovedFromPlaylists}</p>
        <p>Long Uploads Status: {longUploadsStatus}</p>
        <p>Privacy Status: {privacyStatus}</p>
        <p>Primary Playlist ID: {playlistId}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Playlists</h3>
        <ul className="list-disc list-inside text-gray-500">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <a
                href={playlist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {playlist.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit YouTube Channel
        </a>
      </div>
    </div>
  );
};

export default YouTubeAnalytics;
