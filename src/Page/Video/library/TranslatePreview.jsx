import { useEffect, useState } from "react";
import { getTranslatedVideo } from "../../../lib/api/heygen";
export default function TranslatePreview({
  video_translate_id,
  setSelectedVideo,
}) {
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVideoDetail = async (video_translate_id) => {
      setLoading(true);
      try {
        const data = await getTranslatedVideo(video_translate_id);
        console.log(data);
        setVideo(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoDetail(video_translate_id);
  }, [video_translate_id]);

  if (error) return null;

  return (
    <div
      className={`video-item h-64 cursor-pointer rounded-lg bg-gray-300 p-2 transition hover:bg-gray-200
      `}
      onClick={() => setSelectedVideo(video, video.title)}
    >
      {loading ? (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Loading...
        </div>
      ) : video?.status === "success" ? (
        <video src={video.url} style={{ width: "300px", height: "200px" }} />
      ) : (
        <div className="flex h-32 items-center justify-center bg-gray-200 text-gray-500">
          Generating...
        </div>
      )}
      <h3 className="mt-2 text-sm font-semibold text-gray-800">
        {video?.title || "Untitled Video"}
      </h3>
    </div>
  );
}
