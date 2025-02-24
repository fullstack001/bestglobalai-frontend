import { useEffect, useState } from "react";

import { getVideoDetail } from "../../../lib/api/heygen";

export default function VideoPreview({
  video_id,
  setSelectedVideo,
  originVideos,
}) {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [vidoeDetail, setVideoDetail] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchVideoDetail = async (video_id) => {
      setLoading(true);
      const currentVideo = originVideos.find(
        (item) => item.video_id === video_id
      );
      setVideo(currentVideo);
      if (currentVideo.status === "completed") {
        const res = await getVideoDetail(video_id);
        setVideoDetail(res);
      } else {
        setGenerating(true);
      }
      setLoading(false);
    };
    fetchVideoDetail(video_id);
  }, [video_id, originVideos]);

  return (
    <div
      className={`video-item "bg-gray-300" : "hover:bg-gray-200" h-40 cursor-pointer rounded-lg p-2 transition
      `}
      onClick={() => setSelectedVideo(vidoeDetail, video.video_title)}
    >
      {loading ? (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Loading...
        </div>
      ) : vidoeDetail ? (
        <img
          className="mx-auto"
          src={vidoeDetail?.thumbnail_url}
          alt={"Video thumbnail"}
          width={220}
          height={100}
          style={{ height: "auto" }}
        />
      ) : (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Generating...
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-800">
        {video?.video_title || "Untitled Video"}
      </h3>
    </div>
  );
}
