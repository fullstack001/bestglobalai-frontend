import React, { useState, useEffect } from "react";
import {
  AiOutlineVideoCamera,
  AiOutlineDelete,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FaYoutube, FaGoogleDrive } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { getTranslateLanguage } from "../../../lib/api/heygen";
import { translateVideo } from "../../../lib/api/videoTranslate";
import Layout from "../../../components/Layout";

const VideoTranslatePage = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoLink, setVideoLink] = useState("");
  const [language, setLanguage] = useState("");
  const [uploadOption, setUploadOption] = useState("upload");
  const [languages, setLanguages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    getTranslateLanguage().then((languages) => {
      setLanguages(languages);
    });
  }, []);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);
  };

  const handleTranslate = async () => {
    setError(null);
    setSuccess(false);

    if (uploadOption === "upload" && !videoFile) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please upload a video.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );

      return;
    }
    if (uploadOption === "link" && !videoLink) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please input a video link.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }
    if (!language) {
      toast.error(
        <div className="custom-toast flex">
          <IoCloseCircleOutline className="custom-icon" />
          <div className="mt-4">Please select a language.</div>
        </div>,
        {
          className: "error-toast",
          autoClose: 3000,
          hideProgressBar: true,
        }
      );
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();

    if (uploadOption === "upload" && videoFile) {
      formData.append("file", videoFile);
    } else if (uploadOption === "link") {
      formData.append("video_url", videoLink);
    }

    formData.append("output_language", language);

    try {
      const res = await translateVideo(formData, (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      });

      console.log(res);
      setSuccess(true);
    } catch (error) {
      setError("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout titleText="Translate Video">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="mb-6 text-2xl font-bold">Translate Your Video</h1>

        {/* Select Upload Option */}
        <div className="mb-4 w-full max-w-xl">
          <div className="flex justify-center space-x-4">
            <button
              className={`rounded-lg px-4 py-2 ${
                uploadOption === "upload"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setUploadOption("upload")}
            >
              Video
            </button>
            <button
              className={`rounded-lg px-4 py-2 ${
                uploadOption === "link"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setUploadOption("link")}
            >
              Input Video Link
            </button>
          </div>
        </div>

        {/* Upload Video Section */}
        {uploadOption === "upload" && (
          <div
            className="relative mb-4 w-full max-w-xl rounded-lg border-2 border-dashed border-blue-500 bg-white p-6 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {videoFile ? (
              <div className="flex flex-col items-center">
                {videoPreview && (
                  <video
                    src={videoPreview}
                    className="mb-2 h-24 rounded-md object-cover"
                    controls
                  ></video>
                )}
                <p className="text-lg font-medium text-gray-700">
                  {videoFile.name}
                </p>
                <p className="text-sm text-gray-400">
                  File type: mp4, mov, webm, File size up to 5 GB
                </p>
                <button
                  className="absolute right-4 top-4 text-red-500 hover:text-red-700"
                  onClick={handleDeleteVideo}
                >
                  <AiOutlineDelete className="text-2xl" />
                </button>
                {loading && (
                  <div className="mt-4 w-full">
                    <div className="relative h-4 rounded bg-gray-200">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="absolute h-4 rounded bg-blue-500"
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{`${uploadProgress}%`}</p>
                  </div>
                )}
              </div>
            ) : (
              <label
                htmlFor="video-upload"
                className="block cursor-pointer text-gray-500"
              >
                <input
                  type="file"
                  className="hidden"
                  id="video-upload"
                  accept="video/*"
                  onChange={handleFileUpload}
                />
                <div className="flex flex-col items-center">
                  <AiOutlineVideoCamera className="mb-4 text-4xl text-gray-400" />
                  <p className="text-lg font-medium text-gray-700">
                    Drag and drop video here to upload
                  </p>
                  <p className="text-sm text-gray-400">
                    File type: mp4, mov, webm, File size up to 5 GB
                  </p>
                </div>
              </label>
            )}
          </div>
        )}

        {/* Input Video Link Section */}
        {uploadOption === "link" && (
          <div className="relative mb-4 w-full max-w-xl rounded-lg border-2 border-dashed border-blue-500 bg-white p-6 text-center">
            <h2 className="mb-4 text-lg font-medium text-gray-700">
              Upload through 3rd party URL
            </h2>
            <div className="flex items-center space-x-2 rounded-lg border px-4 py-2">
              <FaGoogleDrive className="text-xl text-green-500" />
              <FaYoutube className="text-xl text-red-500" />
              <input
                type="text"
                placeholder="Paste your video's URL here"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Select Language */}
        <select
          className="text-gray-800"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          {languages.map((lang) => (
            <option value={lang} key={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={handleTranslate}
          className="p-2 bg-green-300 rounded-md mt-3"
        >
          Translate
        </button>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default VideoTranslatePage;
