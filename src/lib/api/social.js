import axiosInstance from "./axios";
import { logout } from "./auth";

const handleApiError = (error) => {
  if (error.response && error.response.status === 401) {
    console.error("Unauthorized access, signing out...");
    logout();
  } else {
    console.error("API error:", error.message || "Unknown error occurred");
  }
  throw error;
};

export const createUserProfile = async (title) => {
  try {
    const res = await axiosInstance.post(
      "/api/social/create-user-profile",
      title
    );
    return res.data;
  } catch {
    return null;
  }
};

export const socialLinkManage = async () => {
  try {
    const res = await axiosInstance.post("/api/social/social-link-manage");
    return res.data;
  } catch {
    return null;
  }
};

export const postMedia = async (postData) => {
  try {
    const res = await axiosInstance.post("/api/social/post-media", {
      postData: postData,
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSocailAnalytics = async (socials) => {
  try {
    const res = await axiosInstance.post("/api/social/social-analytics", {
      socials: [socials],
    });
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
