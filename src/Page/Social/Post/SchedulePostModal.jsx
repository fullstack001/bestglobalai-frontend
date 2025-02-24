import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

// Modal Component for Scheduling
const SchedulePostModal = ({ isOpen, onClose, onSchedule }) => {
  const [scheduleDate, setScheduleDate] = useState(new Date()); // Default to current date and time
  const [timezone, setTimezone] = useState("GMT-10:00"); // Default Hawaii

  const timezones = [
    { label: "(GMT-12:00) International Date Line West", value: "-12:00" },
    { label: "(GMT-11:00) Midway Island, Samoa", value: "-11:00" },
    { label: "(GMT-10:00) Hawaii", value: "-10:00" },
    { label: "(GMT-08:00) Pacific Time (US & Canada)", value: "-08:00" },
    { label: "(GMT-05:00) Eastern Time (US & Canada)", value: "-05:00" },
    { label: "(GMT+00:00) UTC", value: "+00:00" },
    { label: "(GMT+05:30) India Standard Time", value: "+05:30" },
    { label: "(GMT+08:00) China Standard Time", value: "+08:00" },
  ];

  const handleSchedule = () => {
    if (!scheduleDate) {
      toast.error("Please select a date and time.");
      return;
    }

    // Convert selected date to UTC
    const localDate = new Date(scheduleDate);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );
    const isoDate = utcDate.toISOString();

    onSchedule({ scheduleDate: isoDate, timezone });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Schedule Post</h3>

        {/* Date & Time Picker */}
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium mb-2">Schedule For</label>
          <DatePicker
            selected={scheduleDate}
            onChange={(date) => setScheduleDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Timezone Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {timezones.map((tz, index) => (
              <option key={index} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleSchedule}
          >
            Schedule Post
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SchedulePostModal;
