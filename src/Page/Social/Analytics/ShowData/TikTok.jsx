import React from "react";

const TikTokAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    addressClicks,
    appDownloadClicks,
    audienceAges,
    audienceCountries,
    audienceGenders,
    bio,
    bioLinkClicks,
    commentCountPeriod,
    commentCountTotal,
    displayName,
    durationAverage,
    emailClicks,
    followerCount,
    followingCount,
    isBusinessAccount,
    isVerified,
    leadSubmissions,
    likeCountTotal,
    phoneNumberClicks,
    profileViews,
    shareCountPeriod,
    shareCountTotal,
    url,
    userImage,
    username,
    videoCountTotal,
    viewCountPeriod,
    viewCountTotal,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={userImage}
          alt="Profile"
          className="w-16 h-16 rounded-full border border-gray-300"
        />
        <div>
          <h2 className="text-lg font-bold">{displayName}</h2>
          <p className="text-gray-500">{username}</p>
          <p className="text-gray-600">{bio}</p>
          <p className="text-gray-400">
            {isBusinessAccount ? "Business Account" : "Personal Account"}
          </p>
          <p className="text-gray-400">
            {isVerified ? "Verified" : "Not Verified"}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{followerCount}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{durationAverage}</p>
          <p className="text-gray-500 text-sm">Avg Video Duration (s)</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{followingCount}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{likeCountTotal}</p>
          <p className="text-gray-500 text-sm">Total Likes</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{videoCountTotal}</p>
          <p className="text-gray-500 text-sm">Total Videos</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{viewCountTotal}</p>
          <p className="text-gray-500 text-sm">
            Total Views ({viewCountPeriod})
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">{profileViews}</p>
          <p className="text-gray-500 text-sm">Profile Views</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{commentCountTotal}</p>
          <p className="text-gray-500 text-sm">
            Total Comments ({commentCountPeriod})
          </p>
        </div>
        <div>
          <p className="text-lg font-semibold">{shareCountTotal}</p>
          <p className="text-gray-500 text-sm">Shares ({shareCountPeriod})</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Audience Demographics</h3>
        <h4 className="font-semibold">Age Groups</h4>
        <ul className="list-disc list-inside text-gray-500">
          {audienceAges.map(({ age, percentage }) => (
            <li key={age}>
              {age}: {(percentage * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
        <h4 className="font-semibold mt-2">Countries</h4>
        <ul className="list-disc list-inside text-gray-500">
          {audienceCountries.map(({ country, percentage }) => (
            <li key={country}>
              {country}: {(percentage * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
        <h4 className="font-semibold mt-2">Genders</h4>
        <ul className="list-disc list-inside text-gray-500">
          {audienceGenders.map(({ gender, percentage }) => (
            <li key={gender}>
              {gender}: {(percentage * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Clicks & Interactions</h3>
        <p>Address Clicks: {addressClicks}</p>
        <p>App Download Clicks: {appDownloadClicks}</p>
        <p>Bio Link Clicks: {bioLinkClicks}</p>
        <p>Email Clicks: {emailClicks}</p>
        <p>Phone Clicks: {phoneNumberClicks}</p>
        <p>Lead Submissions: {leadSubmissions}</p>
      </div>

      <div className="mt-4 text-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Visit TikTok Profile
        </a>
      </div>
    </div>
  );
};

export default TikTokAnalytics;
