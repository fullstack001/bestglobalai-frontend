import React, { useState, useEffect } from "react";
import { createVideo } from "../../../../../lib/api/videoCreate";

const CreateVideoStep = ({ onPrev, videoData }) => {
  const [videoName, setVideoName] = useState(""); // Video name input
  const [showNameInput, setShowNameInput] = useState(true); // Control visibility of name input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Function to create the video (call your backend or API)
  const handleCreateVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call your API to create the video
      const response = await createVideo({ ...videoData, name: videoName });
      setSuccess(true);

      // onVideoCreated(videoUrl); // Trigger callback for next steps
    } catch (error) {
      setError("Failed to create video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Create, Save, and Download Buttons */}
      <div className="flex items-center justify-between">
        {/* Prev Button */}
        <button
          className="rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() => onPrev({ data: "return" })}
        >
          Prev
        </button>

        <div className="flex space-x-4">
          {/* Video Name Input */}
          {showNameInput && (
            <input
              type="text"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              placeholder="Enter video name"
              className="rounded-xl border px-4 py-2 text-gray-800"
            />
          )}

          {/* Create Video Button */}

          <button
            className={`rounded-xl px-4 py-2 text-white ${
              loading ? "bg-gray-400" : "bg-purple-500 hover:bg-purple-600"
            }`}
            disabled={loading || (showNameInput && !videoName.trim())}
            onClick={handleCreateVideo}
          >
            {loading ? "Creating..." : "Create Video"}
          </button>
        </div>
      </div>
      {/* Preview Area */}
      <div className="mb-6">
        <div className="mt-4 flex h-64 w-full  items-center justify-center bg-gray-200 text-center text-lg text-gray-800">
          <p>
            {success
              ? "Video is creating. Please check the status on videos page."
              : "Usually you willll find that the videos take just a few minutes, however if they are longer scripts, they may take 10 minutes or so ! You can check the status of the video in the My videos Page and you will get notification when the vidoe generating will complete."}
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CreateVideoStep;
