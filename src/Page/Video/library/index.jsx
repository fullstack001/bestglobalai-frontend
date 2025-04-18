import { useState, useEffect } from "react";
import {
  getUserVideos,
  deleteVideo,
  getUserTranslates,
} from "../../../lib/api/videoManagement";
import VideoPlayer from "../../../components/VideoPlayer";
import { Modal, Button } from "flowbite-react";
import { getVideoList } from "../../../lib/api/heygen";
import Layout from "../../../components/Layout";
import VideoPreview from "./VideoPreview";
import TranslatePreview from "./TranslatePreview";

export default function VideoLibraryPage() {
  const [originVideos, setOriginVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [translates, setTransaltes] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  useEffect(() => {
    // setInterval(() => {
    //   fetchVideos();
    // }, 20000);
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const videos = await getVideoList();
      const fetchedVideos = await getUserVideos();
      setOriginVideos(videos);
      const existVideos = fetchedVideos.filter((video) =>
        videos.some((fetchVideo) => fetchVideo.video_id === video.video_id)
      );
      setVideos(existVideos);
      const translateVideos = await getUserTranslates();
      console.log(translateVideos);
      setTransaltes(translateVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const setVideo = (video, title) => {
    setSelectedVideo(video);
    setSelectedVideoTitle(title);
  };

  const handleDownload = (video) => {
    const link = document.createElement("a");
    link.href = "video_translate_id" in video ? video.url : video.video_url;

    let fileName = selectedVideoTitle.trim();
    if (!fileName.toLowerCase().endsWith(".mp4")) {
      fileName += ".mp4";
    }

    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const confirmDelete = (videoId) => {
    setVideoToDelete(videoId);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;
    setDeleteLoading(videoToDelete);
    try {
      await deleteVideo(videoToDelete);
      setVideos(videos.filter((video) => video._id !== videoToDelete));
      const videoId =
        "video_translate_id" in selectedVideo
          ? selectedVideo.video_translate_id
          : selectedVideo.id;

      if (videoId === videoToDelete) {
        setSelectedVideo(null);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
    } finally {
      setDeleteLoading(null);
      setModalOpen(false);
      setVideoToDelete(null);
    }
  };

  return (
    <Layout titleText="Video Library">
      <div className="flex min-h-full flex-col md:flex-row mt-3">
        {/* Sidebar for video list with unique background */}
        <div className="w-full overflow-y-auto text-gray-100 p-2 md:w-1/3">
          <h1 className="mb-4 text-2xl font-bold text-gray-100">Videos</h1>
          {loading ? (
            <div className="flex h-1/2 items-center justify-center">
              <p className="text-lg text-gray-500">Loading videos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="flex h-1/2 items-center justify-center">
              <p className="text-lg text-gray-500">No videos available</p>
            </div>
          ) : (
            <div className="grid max-h-1/2 grid-cols-1 gap-4 overflow-y-auto  sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {videos.map((video) => (
                <VideoPreview
                  key={video._id}
                  video_id={video.video_id}
                  setSelectedVideo={setVideo}
                  originVideos={originVideos}
                />
              ))}
            </div>
          )}
          <h1 className="mb-4 text-2xl font-bold text-gray-100">
            Translated Videos
          </h1>
          {loading ? (
            <div className="flex h-1/2 items-center justify-center">
              <p className="text-lg text-gray-500">Loading videos...</p>
            </div>
          ) : translates.length === 0 ? (
            <div className="flex h-1/2 items-center justify-center">
              <p className="text-lg text-gray-500">No videos available</p>
            </div>
          ) : (
            <div className="grid h-1/2 grid-cols-1 gap-4  overflow-y-auto sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {translates.map((video) => (
                <TranslatePreview
                  key={video._id}
                  video_translate_id={video.video_translate_id}
                  setSelectedVideo={setVideo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Main content for selected video with a different background */}
        <div className="w-full bg-white p-4 md:w-2/3">
          {selectedVideo ? (
            <div>
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                {selectedVideoTitle}
              </h2>
              {selectedVideo.status === "completed" ||
              selectedVideo.status === "success" ? (
                <VideoPlayer
                  streamUrl={
                    "video_translate_id" in selectedVideo
                      ? selectedVideo.url
                      : selectedVideo.video_url
                  }
                  title={selectedVideoTitle}
                />
              ) : (
                <div className="flex h-64 items-center justify-center bg-gray-100 text-gray-500">
                  This video is not available now. Status:{" "}
                  {selectedVideo.status}
                </div>
              )}
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleDownload(selectedVideo)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Download
                </button>
                <button
                  onClick={() =>
                    confirmDelete(
                      "video_translate_id" in selectedVideo
                        ? selectedVideo.video_translate_id
                        : selectedVideo.id
                    )
                  }
                  className={`rounded px-4 py-2 text-white ${
                    deleteLoading ===
                    ("video_translate_id" in selectedVideo
                      ? selectedVideo.video_translate_id
                      : selectedVideo.id)
                      ? "bg-gray-400"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  disabled={
                    deleteLoading ===
                    ("video_translate_id" in selectedVideo
                      ? selectedVideo.video_translate_id
                      : selectedVideo.id)
                  }
                >
                  {deleteLoading ===
                  ("video_translate_id" in selectedVideo
                    ? selectedVideo.video_translate_id
                    : selectedVideo.id)
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-50">
              <p className="text-lg text-gray-500">Select a video to play</p>
            </div>
          )}
        </div>

        {/* Modal for delete confirmation */}
        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete this video? This action cannot be
              undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="gray"
              onClick={() => setModalOpen(false)}
              disabled={!!deleteLoading}
            >
              Cancel
            </Button>
            <Button
              color="failure"
              onClick={handleDelete}
              disabled={!!deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
}
