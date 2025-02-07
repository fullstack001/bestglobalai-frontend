import axios from "axios";

const baseUrl = "https://api.ayrshare.com";

export const ayrshareAxios = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AYRSHARE_API_KEY}`,
  },
});

export const getSocialProfiles = async () => {
  try {
    const res = await ayrshareAxios.get("/api/profiles");
    return res.data;
  } catch {
    return null;
  }
};
