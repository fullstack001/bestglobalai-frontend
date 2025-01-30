import React, { useEffect, useState } from "react";

const BackgroundStep = ({ onNext, onPrev }) => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [backgroundType, setBackgroundType] = useState("color"); // New state for background type

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
          onClick={() => onNext({ background: selectedBackground || null })}
        >
          Next
        </button>
      </div>

      <div className="my-4 flex flex-col space-x-4">
        <label className="mb-2 flex items-center text-lg font-bold">
          <input
            type="radio"
            value="color"
            checked={backgroundType === "color"}
            onChange={() => setBackgroundType("color")}
            className="mr-2 h-5 w-5"
          />
          <span className="w-full rounded  bg-blue-200 p-2">
            Color Background
          </span>
        </label>
        {backgroundType === "color" && (
          <div className="rounded-lg border bg-gray-100 p-4">
            <p>Select a color background</p>
            <input
              type="color"
              onChange={(e) =>
                setSelectedBackground({ type: "color", value: e.target.value })
              }
              className="mt-2 h-10 w-full border-none"
            />
          </div>
        )}
      </div>
      <div className="my-4 flex flex-col space-x-4">
        <label className="mb-2  flex items-center text-lg font-bold">
          <input
            type="radio"
            value="image"
            checked={backgroundType === "image"}
            onChange={() => setBackgroundType("image")}
            className="mr-2 h-5 w-5"
          />
          <span className="w-full rounded bg-blue-200 p-2">Image </span>
        </label>
        {backgroundType === "image" && (
          <div className="rounded-lg border bg-gray-100 p-4">
            <p>Comming Soon</p>
            {/* Add image upload component here */}
          </div>
        )}
      </div>
      <div className="my-4 flex flex-col space-x-4">
        <label className="mb-2 flex items-center text-lg font-bold">
          <input
            type="radio"
            value="video"
            checked={backgroundType === "video"}
            onChange={() => setBackgroundType("video")}
            className="mr-2 h-5 w-5"
          />
          <span className="w-full rounded bg-blue-200 p-2">Video </span>
        </label>
        {backgroundType === "video" && (
          <div className="rounded-lg border bg-gray-100 p-4">
            <p>Comming Soon</p>
            {/* Add video upload component here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundStep;
