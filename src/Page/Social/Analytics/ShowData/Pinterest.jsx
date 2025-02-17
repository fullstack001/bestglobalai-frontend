import React from "react";

const PinterestAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    board,
    clickthrough,
    clickthroughRate,
    closeup,
    closeupRate,
    engagement,
    engagementRate,
    fullScreenPlay,
    fullScreenPlaytime,
    impression,
    outboundClick,
    outboundClickRate,
    pinClick,
    pinClickRate,
    quartile95PercentView,
    save,
    saveRate,
    video10sView,
    videoAvgWatchTime,
    videoMrcView,
    videoStart,
    videoV50WatchTime,
    daily,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold">Pinterest Analytics</h2>

      <div className="mt-4 text-center">
        <img
          src={board.media.imageCoverUrl}
          alt="Board Cover"
          className="w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-xl font-semibold mt-2">{board.name}</h3>
        <p className="text-gray-500">Followers: {board.followerCount}</p>
        <p className="text-gray-500">Pins: {board.pinCount}</p>
        <p className="text-gray-500">Privacy: {board.privacy}</p>
        <p className="text-gray-500">
          Created At: {new Date(board.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{impression}</p>
          <p className="text-gray-500 text-sm">Impressions</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{engagement}</p>
          <p className="text-gray-500 text-sm">Engagements</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{engagementRate}</p>
          <p className="text-gray-500 text-sm">Engagement Rate</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{clickthrough}</p>
          <p className="text-gray-500 text-sm">Clickthroughs</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{clickthroughRate}</p>
          <p className="text-gray-500 text-sm">Clickthrough Rate</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{closeup}</p>
          <p className="text-gray-500 text-sm">Closeups</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{closeupRate}</p>
          <p className="text-gray-500 text-sm">Closeup Rate</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{outboundClick}</p>
          <p className="text-gray-500 text-sm">Outbound Clicks</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{outboundClickRate}</p>
          <p className="text-gray-500 text-sm">Outbound Click Rate</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{save}</p>
          <p className="text-gray-500 text-sm">Saves</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{saveRate}</p>
          <p className="text-gray-500 text-sm">Save Rate</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{pinClick}</p>
          <p className="text-gray-500 text-sm">Pin Clicks</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{pinClickRate}</p>
          <p className="text-gray-500 text-sm">Pin Click Rate</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Video Analytics</h3>
        <p>10s Views: {video10sView}</p>
        <p>Avg Watch Time: {videoAvgWatchTime}s</p>
        <p>Start Views: {videoStart}</p>
        <p>50% Watch Time: {videoV50WatchTime}s</p>
        <p>95% View Completion: {quartile95PercentView}</p>
        <p>Full Screen Plays: {fullScreenPlay}</p>
        <p>Full Screen Playtime: {fullScreenPlaytime}s</p>
        <p>Video MRC Views: {videoMrcView}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Daily Metrics</h3>
        {daily && daily.length > 0 ? (
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(daily[0].metrics).map(([metric, value]) => (
              <li key={metric}>
                {metric.replace(/_/g, " ")}: {value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No daily data available</p>
        )}
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-semibold">Board Thumbnails</h3>
        <div className="flex justify-center space-x-2 mt-2">
          {board.media.pinThumbnailUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Pin Thumbnail"
              className="w-12 h-12 rounded-md"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PinterestAnalytics;
