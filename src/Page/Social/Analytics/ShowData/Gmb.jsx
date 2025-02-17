import React from "react";

const GMBAnalytics = ({ data }) => {
  if (!data || !data.analytics) {
    return <div className="text-red-500">No data available</div>;
  }

  const {
    businessBookings,
    businessConversations,
    businessDirectionRequests,
    businessFoodOrders,
    businessImpressionsDesktopMaps,
    businessImpressionsDesktopSearch,
    businessImpressionsMobileMaps,
    businessImpressionsMobileSearch,
    callClicks,
    websiteClicks,
  } = data.analytics;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold">Google My Business Analytics</h2>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-lg font-semibold">{businessBookings}</p>
          <p className="text-gray-500 text-sm">Bookings</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{businessConversations}</p>
          <p className="text-gray-500 text-sm">Conversations</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{businessDirectionRequests}</p>
          <p className="text-gray-500 text-sm">Direction Requests</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{businessFoodOrders}</p>
          <p className="text-gray-500 text-sm">Food Orders</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Impressions</h3>
        <ul className="list-disc list-inside text-gray-500">
          <li>Desktop Maps: {businessImpressionsDesktopMaps}</li>
          <li>Desktop Search: {businessImpressionsDesktopSearch}</li>
          <li>Mobile Maps: {businessImpressionsMobileMaps}</li>
          <li>Mobile Search: {businessImpressionsMobileSearch}</li>
        </ul>
      </div>

      <div className="mt-4 text-sm text-gray-600 border-t pt-4">
        <h3 className="font-semibold">Interactions</h3>
        <p>Call Clicks: {callClicks}</p>
        <p>Website Clicks: {websiteClicks}</p>
      </div>
    </div>
  );
};

export default GMBAnalytics;
