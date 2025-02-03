import axiosInstance from "./axios";

export const getUserVideos = async () => {
  try {
    const response = await axiosInstance.get("/api/video/get-videos");
    return response.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const getUserTranslates = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/video-management/get-user-translates"
    );
    return response.data.translates;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const deleteVideo = async (videoId) => {
  await axiosInstance.delete(`/api/video/delete-video/${videoId}`);
};
