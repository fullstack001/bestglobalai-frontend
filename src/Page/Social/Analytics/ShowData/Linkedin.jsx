import React from "react";

const LinkedInAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    clickCount,
    clicks,
    commentCount,
    engagement,
    followers,
    impressionCount,
    likeCount,
    shareCount,
    uniqueImpressionsCount,
    views,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold">LinkedIn Analytics</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{clickCount}</p>
          <p className="text-gray-500 text-sm">Total Clicks</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{commentCount}</p>
          <p className="text-gray-500 text-sm">Comments</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{likeCount}</p>
          <p className="text-gray-500 text-sm">Likes</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{shareCount}</p>
          <p className="text-gray-500 text-sm">Shares</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{impressionCount}</p>
          <p className="text-gray-500 text-sm">Impressions</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{uniqueImpressionsCount}</p>
          <p className="text-gray-500 text-sm">Unique Impressions</p>
        </div>
        <div>
          <p className="text-lg font-semibold">
            {(engagement * 100).toFixed(2)}%
          </p>
          <p className="text-gray-500 text-sm">Engagement Rate</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Clicks Breakdown</h3>
        {clicks && (
          <ul className="list-disc list-inside text-gray-500">
            <li>
              Careers Page Jobs Clicks:{" "}
              {clicks.careersPageClicks?.careersPageJobsClicks}
            </li>
            <li>
              Careers Page Promo Links Clicks:{" "}
              {clicks.careersPageClicks?.careersPagePromoLinksClicks}
            </li>
            <li>
              Careers Page Employees Clicks:{" "}
              {clicks.careersPageClicks?.careersPageEmployeesClicks}
            </li>
            <li>
              Mobile Careers Page Jobs Clicks:{" "}
              {clicks.mobileCareersPageClicks?.careersPageJobsClicks}
            </li>
            <li>
              Mobile Careers Page Promo Links Clicks:{" "}
              {clicks.mobileCareersPageClicks?.careersPagePromoLinksClicks}
            </li>
            <li>
              Mobile Careers Page Employees Clicks:{" "}
              {clicks.mobileCareersPageClicks?.careersPageEmployeesClicks}
            </li>
          </ul>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Followers</h3>
        <p>
          Organic:{" "}
          {followers.organicFollowerCount ? followers.organicFollowerCount : ""}
        </p>
        <p>Paid: {followers.paidFollowerCount}</p>
        <p>Total: {followers.totalFollowerCount}</p>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Views</h3>
        <p>All Page Views: {views.allPageViews}</p>
        <p>About Page Views: {views.aboutPageViews}</p>
        <p>Overview Page Views: {views.overviewPageViews}</p>
        <p>Desktop Page Views: {views.allDesktopPageViews}</p>
        <p>Mobile Page Views: {views.allMobilePageViews}</p>
      </div>
    </div>
  );
};

export default LinkedInAnalytics;
