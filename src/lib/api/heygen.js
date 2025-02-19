import axios from "axios";

const baseUrl = "https://api.heygen.com";

export const heygenApi = axios.create({
  baseURL: baseUrl,
  headers: { "X-Api-Key": process.env.REACT_APP_HEYGEN_API },
});

export const getAvatar = async () => {
  try {
    const response = await heygenApi.get("/v2/avatars");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching avatars:", error);
    return [];
  }
};

export const getVoice = async () => {
  try {
    const response = await heygenApi.get("/v2/voices");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching voices:", error);
    return [];
  }
};

export const getInteractiveAvatar = async () => {
  try {
    const response = await heygenApi.get("/v1/interactive_avatars");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching interactive avatars:", error);
    return [];
  }
};

export const getAccessToken = async () => {
  try {
    const response = await heygenApi.post("/v1/streaming.create_token");
    console.log(response.data);
    return response.data.data.token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return "";
  }
};

export const getVideoDetail = async (video_id) => {
  try {
    const response = await heygenApi.get(
      `/v1/video_status.get?video_id=${video_id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    return {};
  }
};

export const getVideoList = async () => {
  try {
    const response = await heygenApi.get("/v1/video.list");
    return response.data.data.videos;
  } catch (error) {
    console.error("Error fetching video list:", error);
    return [];
  }
};

export const getTranslateLanguage = async () => {
  try {
    const response = await heygenApi.get(
      "/v2/video_translate/target_languages"
    );
    return response.data.data.languages;
  } catch (error) {
    console.error("Error fetching languages:", error);
    return [];
  }
};

export const getTranslatedVideo = async (transalte_id) => {
  const response = await heygenApi.get(`/v2/video_translate/${transalte_id}`);
  return response.data.data;
};
