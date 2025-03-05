import React, { useState } from "react";
import axios from "axios";
const BackgroundStep = ({ onNext, onPrev }) => {
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [backgroundType, setBackgroundType] = useState("color"); // Default is color

  // Handle file selection for images/videos
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setSelectedBackground({ type, value: fileURL, file });
    }
  };

  const handleNext = () => {
    console.log(selectedBackground?.file);
    if (backgroundType !== "color" && selectedBackground?.file) {
      const formData = new FormData();
      formData.append("file", selectedBackground.file);
      axios
        .post(
          `${process.env.REACT_APP_API_PORT}/api/video/background-upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          console.log({
            type: selectedBackground.type,
            url: res.data.url,
          });

          const background = {
            type: selectedBackground.type,
            url: res.data.url,
          };
          if (backgroundType === "video")
            background.play_style = "fit_to_scene";
          onNext({
            background,
          });
        });
    } else {
      onNext({ background: selectedBackground || null });
    }
  };

  return (
    <div>
      <div className="my-4 flex justify-between">
        <button
          className="mt-4 rounded-xl bg-slate-600 px-4 py-2 text-white"
          onClick={() => onPrev({ background: selectedBackground || null })}
        >
          Prev
        </button>
        <button
          className="mt-4 rounded-xl bg-purple-500 px-4 py-2 text-white"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* Background Color */}
      <div className="my-4 flex flex-col">
        <label className="mb-2 flex items-center text-lg font-bold">
          <input
            type="radio"
            value="color"
            checked={backgroundType === "color"}
            onChange={() => setBackgroundType("color")}
            className="mr-2 h-5 w-5"
          />
          <span className="text-green-500 p-2">Background Color</span>
        </label>
        {backgroundType === "color" && (
          <div className="p-4">
            <p className="text-gray-500">Select a background color:</p>
            <input
              type="color"
              onChange={(e) =>
                setSelectedBackground({ type: "color", value: e.target.value })
              }
              className="mt-2 h-10 w-full border-none"
            />
            {selectedBackground?.type === "color" && (
              <div
                className="mt-4 w-full h-24 rounded-lg"
                style={{ backgroundColor: selectedBackground.value }}
              />
            )}
          </div>
        )}
      </div>

      {/* Background Image Upload */}
      <div className="my-4 flex flex-col">
        <label className="mb-2 flex items-center text-lg font-bold">
          <input
            type="radio"
            value="image"
            checked={backgroundType === "image"}
            onChange={() => setBackgroundType("image")}
            className="mr-2 h-5 w-5"
          />
          <span className="text-green-500 p-2">Background Image</span>
        </label>
        {backgroundType === "image" && (
          <div className="p-4 border-dashed border-2 border-gray-300 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "image")}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="block mx-auto w-52 p-4 text-center cursor-pointer bg-blue-500 hover:bg-blue-200 rounded-lg"
            >
              Click to upload an image
            </label>
            {selectedBackground?.type === "image" && (
              <div className="mt-4">
                <p className="text-gray-500">Preview:</p>
                <img
                  src={selectedBackground.value}
                  alt="Uploaded preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Background Video Upload */}
      <div className="my-4 flex flex-col">
        <label className="mb-2 flex items-center text-lg font-bold">
          <input
            type="radio"
            value="video"
            checked={backgroundType === "video"}
            onChange={() => setBackgroundType("video")}
            className="mr-2 h-5 w-5"
          />
          <span className="text-green-500 p-2">Background Video</span>
        </label>
        {backgroundType === "video" && (
          <div className="p-4 border-dashed border-2 border-gray-300 rounded-lg">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => handleFileUpload(e, "video")}
              className="hidden"
              id="videoUpload"
            />
            <label
              htmlFor="videoUpload"
              className="block mx-auto w-52 p-4 text-center cursor-pointer bg-blue-500 hover:bg-blue-200 rounded-lg"
            >
              Click to upload a video
            </label>
            {selectedBackground?.type === "video" && (
              <div className="mt-4">
                <p className="text-gray-500">Preview:</p>
                <video
                  src={selectedBackground.value}
                  controls
                  className="w-full h-40 rounded-lg"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundStep;
