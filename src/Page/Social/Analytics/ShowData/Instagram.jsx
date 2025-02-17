import React from "react";

const InstagramAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    name,
    username,
    biography,
    followersCount,
    followsCount,
    mediaCount,
    likeCount,
    commentsCount,
    impressionsCount,
    reachCount,
    profilePictureUrl,
    website,
    audienceCity,
    audienceCountry,
    audienceGenderAge,
    audienceCityEngagedAudienceDemographics,
    audienceCountryEngagedAudienceDemographics,
    audienceGenderAgeEngagedAudienceDemographics,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-gray-500">@{username}</p>
          <p className="text-gray-600 mt-2">{biography}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{followersCount}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{followsCount}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{mediaCount}</p>
          <p className="text-gray-500 text-sm">Posts</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Engagement</h3>
        <p>Likes: {likeCount}</p>
        <p>Comments: {commentsCount}</p>
        <p>Impressions: {impressionsCount}</p>
        <p>Reach: {reachCount}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Audience Demographics</h3>
        <div>
          <h4 className="font-semibold">Cities</h4>
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(audienceCity || {}).map(([city, count]) => (
              <li key={city}>
                {city}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Engaged Audience Cities</h4>
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(audienceCityEngagedAudienceDemographics || {}).map(
              ([city, count]) => (
                <li key={city}>
                  {city}: {count}
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Countries</h4>
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(audienceCountry || {}).map(([country, count]) => (
              <li key={country}>
                {country}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Engaged Audience Countries</h4>
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(
              audienceCountryEngagedAudienceDemographics || {}
            ).map(([country, count]) => (
              <li key={country}>
                {country}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Gender & Age</h4>
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(audienceGenderAge || {}).map(([group, count]) => (
              <li key={group}>
                {group}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Engaged Audience Gender & Age</h4>
          <ul className="list-disc list-inside text-gray-500">
            {Object.entries(
              audienceGenderAgeEngagedAudienceDemographics || {}
            ).map(([group, count]) => (
              <li key={group}>
                {group}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 text-center">
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

export default InstagramAnalytics;
