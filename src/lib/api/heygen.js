import axios from "axios";

const baseUrl = "https://api.heygen.com";

export const heygenApi = axios.create({
    baseURL: baseUrl,
    headers: { "X-Api-Key": process.env.REACT_APP_HEYGEN_API },
});

export const getAvatar = async () => {
    const response = await heygenApi.get("/v2/avatars");
    return response.data.data;
};

export const getVoice = async () => {
    const response = await heygenApi.get("/v2/voices");
    return response.data.data;
};

export const getInteractiveAvatar = async () => {
    const response = await heygenApi.get("/v1/interactive_avatars");
    return response.data.data;
};

export const getAccessToken = async () => {
    const response = await heygenApi.post("/v1/streaming.create_token");
    console.log(response.data);
    return response.data.data.token;
};

export const getVideoDetail = async (
    video_id) => {
    const response = await heygenApi.get(
        `/v1/video_status.get?video_id=${video_id}`,
    );
    return response.data.data;
};

export const getVideoList = async () => {
    const response = await heygenApi.get("/v1/video.list");
    return response.data.data.videos;
};

export const getTranslateLanguage = async () => {
    const response = await heygenApi.get("/v2/video_translate/target_languages");
    return response.data.data.languages;
};

export const getTranslatedVideo = async (transalte_id) => {
    const response = await heygenApi.get(`/v2/video_translate/${transalte_id}`);
    return response.data.data;
};
